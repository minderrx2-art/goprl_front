<script lang="ts">
    import {
        Card,
        CardContent,
        CardFooter,
        CardHeader,
        CardTitle,
    } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Spinner } from "@/components/ui/spinner";
    import { X } from "@lucide/svelte";
    import { shortenUrl, type ShortenResponse } from "@/lib/shortener";

    let url = $state("");
    let result = $state<ShortenResponse | null>(null);
    let loading = $state(false);

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        result = null;
        loading = true;
        result = await shortenUrl(url);
        loading = false;
    }
</script>

<div class="content space-y-8">
    <Card>
        <CardHeader>
            <CardTitle>Enter URL to shorten</CardTitle>
        </CardHeader>
        <CardContent>
            <form onsubmit={handleSubmit} class="flex gap-2">
                <Input
                    type="text"
                    placeholder="Enter URL to shorten (e.g. https://google.com)"
                    bind:value={url}
                    disabled={loading}
                    onblur={(e) => (e.currentTarget.scrollLeft = 0)}
                />
                <Button type="submit" disabled={loading} class="min-w-32">
                    {#if loading}
                        <Spinner class="mr-2" />
                        Shortening...
                    {:else}
                        Shorten
                    {/if}
                </Button>
            </form>
        </CardContent>
        <CardFooter>
            <p class="text-sm text-muted-foreground">
                Code can be found on <a
                    href="https://github.com/minderrx2-art/goprl"
                    class="hover:text-foreground underline underline-offset-4"
                    >GitHub</a
                >
            </p>
        </CardFooter>
    </Card>

    <div
        class="result-container transition-all duration-500 ease-in-out"
        class:opacity-100={result}
        class:opacity-0={!result}
        class:pointer-events-none={!result}
    >
        <div
            class="p-6 border rounded-xl bg-card text-card-foreground shadow-sm min-h-[110px] flex flex-col justify-center relative"
        >
            {#if result}
                <button
                    class="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                    onclick={() => (result = null)}
                >
                    <X size={18} />
                </button>
                {#if result.short_url}
                    <div
                        class="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
                    >
                        <p class="text-sm font-medium">Your shortened URL:</p>
                        <div class="flex items-center gap-2">
                            <a
                                href={result.short_url}
                                target="_blank"
                                class="text-primary font-semibold hover:underline break-all"
                                >{result.short_url}</a
                            >
                        </div>
                    </div>
                {:else if result.error}
                    <p
                        class="text-destructive font-medium animate-in fade-in duration-500"
                    >
                        {result.error}
                    </p>
                {/if}
            {/if}
        </div>
    </div>
</div>

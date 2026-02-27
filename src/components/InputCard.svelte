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
    import { fly, slide } from "svelte/transition";

    interface ResultEntry {
        response: ShortenResponse;
        originalUrl: string;
    }

    let url = $state("");
    let results = $state<ResultEntry[]>([]);
    let loading = $state(false);

    const { setDisplay }: { setDisplay: (display: boolean) => void } = $props();

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        loading = true;
        const currentUrl = url;
        const res = await shortenUrl(currentUrl);
        if (res) {
            results = [{ response: res, originalUrl: currentUrl }, ...results];
        }
        loading = false;
        url = "";
    }

    function removeResult(index: number) {
        results = results.filter((_, i) => i !== index);
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

    <div class="space-y-4">
        {#each results as res, i (res)}
            <div class="result-container" transition:slide>
                <div
                    in:fly={{ y: -20, duration: 300 }}
                    out:fly={{ y: -20, duration: 200 }}
                >
                    {@render urlCard(res, i)}
                </div>
            </div>
        {/each}
    </div>
</div>

{#snippet urlCard(entry: ResultEntry, index: number)}
    <Card class="relative">
        <button
            class="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            onclick={() => removeResult(index)}
        >
            <X size={18} />
        </button>
        <CardContent>
            {#if entry.response.short_url}
                <div class="space-y-2">
                    <p class="text-sm font-medium">Your shortened URL:</p>
                    <div class="flex items-center gap-2">
                        <a
                            href={entry.response.short_url}
                            target="_blank"
                            class="text-primary font-semibold hover:underline break-all"
                            >{entry.response.short_url}</a
                        >
                    </div>
                </div>
            {:else if entry.response.error}
                <p class="text-destructive font-medium">
                    {entry.response.error}
                </p>
            {/if}
        </CardContent>
        <CardFooter>
            <p class="text-sm text-muted-foreground">
                <button
                    onclick={() => {
                        navigator.clipboard.writeText(
                            entry.response.short_url || "",
                        );
                        setDisplay(true);
                        setTimeout(() => setDisplay(false), 2000);
                    }}
                    class="text-primary font-semibold hover:underline break-all"
                    >Copy to clipboard</button
                >
            </p>
        </CardFooter>
    </Card>
{/snippet}

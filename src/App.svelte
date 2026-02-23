<script lang="ts">
	import "./app.css";
	import { shortenUrl, type ShortenResponse } from "@/lib/shortener";
	import { Button } from "@/components/ui/button";
	import { Input } from "@/components/ui/input";
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "@/components/ui/card";
	import { Spinner } from "@/components/ui/spinner";
	import goLogo from "@/assets/Go-Logo_Blue.svg";
	import svelteLogo from "@/assets/svelte.svg";

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

<main
	class="grow flex flex-col justify-center container max-w-2xl mx-auto px-4 pb-12"
>
	<header class="py-12 text-center flex flex-col items-center">
		<div class="flex items-center justify-center gap-8 mb-2">
			<img src={goLogo} alt="Go Logo" class="h-16 w-auto" />
			<span class="text-4xl font-bold tracking-tight">+</span>
			<img src={svelteLogo} alt="Svelte Logo" class="h-12 w-auto" />
		</div>
		<h1 class="text-4xl font-bold tracking-tight">Free URL Shortener</h1>
		<p class="text-muted-foreground mt-2">Made with GO and Svelte 5</p>
	</header>

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

		{#if result}
			<div
				class="result p-6 border rounded-xl bg-card text-card-foreground shadow-sm animate-in fade-in duration-500"
			>
				{#if result.short_url}
					<div class="space-y-2">
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
					<p class="text-destructive font-medium">{result.error}</p>
				{/if}
			</div>
		{/if}
	</div>
</main>

<style>
	:global(body, #app) {
		height: 100vh;
		margin: 0;
	}

	:global(#app) {
		display: flex;
		flex-direction: column;
	}
</style>

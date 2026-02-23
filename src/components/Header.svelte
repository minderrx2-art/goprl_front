<script lang="ts">
    import goLogo from "@/assets/Go-Logo_Blue.svg";
    import svelteLogo from "@/assets/svelte.svg";
</script>

<header class="py-12 text-center flex flex-col items-center">
    <div class="flex items-center justify-center gap-8 mb-2">
        <img src={goLogo} alt="Go Logo" class="h-16 w-auto" />
        <span class="text-4xl font-bold tracking-tight">+</span>
        <img src={svelteLogo} alt="Svelte Logo" class="h-12 w-auto" />
    </div>
    <h1 class="text-4xl font-bold tracking-tight">Free URL Shortener</h1>
    <p class="text-muted-foreground mt-2">Made with GO and Svelte 5</p>
</header>

<script lang="ts">
    import { spring } from "svelte/motion";

    // Mouse position state
    let mouseX = $state(0);
    let mouseY = $state(0);

    // Spring stores for smoothing
    const coords = spring(
        { x: 0, y: 0 },
        {
            stiffness: 0.08,
            damping: 0.35,
        },
    );

    function handleMouseMove(e: MouseEvent) {
        const { innerWidth, innerHeight } = window;
        // Normalize mouse position to range [-1, 1]
        mouseX = (e.clientX / innerWidth) * 2 - 1;
        mouseY = (e.clientY / innerHeight) * 2 - 1;

        coords.set({ x: mouseX, y: mouseY });
    }

    // Blobs configuration
    const blobs = [
        {
            color: "oklch(0.6 0.2 240 / 25%)", // Go-ish Blue - more opaque
            size: "80vw",
            offset: { x: -10, y: -10 },
            parallax: 75, // Higher movement
        },
        {
            color: "oklch(0.7 0.2 30 / 20%)", // Svelte-ish Orange - more opaque
            size: "75vw",
            offset: { x: 20, y: 15 },
            parallax: 100, // Higher movement
        },
        {
            color: "oklch(0.5 0.15 260 / 20%)", // Deep Blue - more opaque
            size: "85vw",
            offset: { x: -15, y: 25 },
            parallax: -50, // Higher movement
        },
    ];
</script>

<svelte:window onmousemove={handleMouseMove} />

<div
    class="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background"
>
    {#each blobs as blob}
        <div
            class="absolute rounded-full blur-[80px]"
            style:background-color={blob.color}
            style:width={blob.size}
            style:height={blob.size}
            style:left="50%"
            style:top="50%"
            style:transform="translate(calc(-50% + {blob.offset.x}% + {$coords.x *
                blob.parallax}px), calc(-50% + {blob.offset.y}% + {$coords.y *
                blob.parallax}px))"
        ></div>
    {/each}

    <!-- Subtle grid overlay -->
    <div
        class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 40px 40px;"
    ></div>
</div>

<style>
    div {
        will-change: transform;
    }
</style>

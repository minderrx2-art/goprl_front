<script lang="ts">
    import * as Alert from "@/components/ui/alert";
    import { fly } from "svelte/transition";
    const { display }: { display: boolean } = $props();
</script>

<div class="fixed bottom-10 left-0 right-0 flex justify-center z-50">
    {#if display}
        <div
            in:fly={{ y: 20, duration: 300 }}
            out:fly={{ y: 20, duration: 200 }}
        >
            <Alert.Root>
                <Alert.Title>Copied to clipboard</Alert.Title>
            </Alert.Root>
        </div>
    {/if}
</div>

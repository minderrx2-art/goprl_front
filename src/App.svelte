<script lang="ts">
	import "./app.css";
	import InteractiveBackground from "@/components/InteractiveBackground.svelte";
	import Main from "@/components/Main.svelte";
</script>

<InteractiveBackground />
<Main />

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

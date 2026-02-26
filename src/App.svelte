<script lang="ts">
	import "./app.css";
	import Background from "@/components/Background.svelte";
	import Main from "@/components/Main.svelte";
</script>

<Background />
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

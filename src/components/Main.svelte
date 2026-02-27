<script lang="ts">
    import Header from "./Header.svelte";
    import InputCard from "./InputCard.svelte";
    // import Footer from "./Footer.svelte";
    import Info from "./Info.svelte";

    let display = $state(false);

    function setDisplay(flag: boolean) {
        display = flag;
    }
</script>

<main
    class="grow flex flex-col justify-center container max-w-2xl mx-auto px-4 pb-12 relative z-10"
>
    <Header />
    <InputCard {setDisplay} />
    <!-- <Footer /> -->
    <Info {display} />
</main>

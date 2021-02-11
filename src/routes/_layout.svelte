<script lang="ts">
	import { scale } from "svelte/transition";
	import MainNav from '../comp/layout/MainNav.svelte';
	import Footer from '../comp/layout/Footer.svelte';

	export let segment: string | undefined;

  const timeout = 150;
  let show = true;

  const change = () => {
    show = !show;
  };

  $: segment, change();
</script>

<style>
	main {
		position: relative;
		background-color: white;
		box-sizing: border-box;
	}
</style>

<MainNav {segment}/>

{#if show}
  <main
    in:scale={{ duration: timeout, delay: timeout }}
    out:scale={{ duration: timeout }}>
    <slot />
  </main>
  <Footer />
{:else}
  <main
    in:scale={{ duration: timeout, delay: timeout }}
    out:scale={{ duration: timeout }}>
    <slot />
  </main>
  <Footer />
{/if}

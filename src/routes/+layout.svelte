<script lang="ts">
	import './layout.css';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Yanis Wash| Lavage automobile à Bruxelles</title>
</svelte:head>

{@render children()}
<CookieBanner />

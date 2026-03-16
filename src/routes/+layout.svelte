<script lang="ts">
	import './layout.css';
	import favicon from '/assets/svg/Favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

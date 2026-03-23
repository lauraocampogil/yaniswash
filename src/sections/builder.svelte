<script lang="ts">
	import HeroBlock from './hero.svelte';

	let { blocks = [] } = $props();

	const components: Record<string, any> = {
		HeroBlock
	};
</script>

{#each blocks as block}
	{@const Component = components[block.type]}
	{#if Component}
		<Component {...block.props} />
	{/if}
{/each}

<script lang="ts">
	import { HeroBlock, ServicesBlock, ResultatBlock, ReviewsBlock, FAQBlock } from '$sections';

	let { blocks = [] }: { blocks: { type: string; props: Record<string, any> }[] } = $props();

	const components: Record<string, any> = {
		HeroBlock,
		ServicesBlock,
		ResultatBlock,
		ReviewsBlock,
		FAQBlock
	};
</script>

{#each blocks as block}
	{@const Component = components[block.type]}
	{#if Component}
		<!-- @ts-ignore -->
		<Component {...block.props} />
	{/if}
{/each}

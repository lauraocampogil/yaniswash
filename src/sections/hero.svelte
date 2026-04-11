<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { bookingOpen } from '$lib/stores/booking';

	let { title, button, ctaHref } = $props();

	let titleEl = $state<HTMLElement | null>(null);
	let ctaEl = $state<HTMLElement | null>(null);

	onMount(() => {
		const tl = gsap.timeline({ delay: 0.3 });

		tl.fromTo(
			titleEl,
			{ y: 80, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }
		).fromTo(
			ctaEl,
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1.4, ease: 'expo.out' },
			'-=0.4'
		);
	});
</script>

<section
	class="relative min-h-[90vh] overflow-hidden rounded-b-[50px] bg-[url(/assets/images/Background.webp)] bg-cover bg-center xl:min-h-svh xl:rounded-b-[60px] xl:px-20"
>
	<!-- Titre — z-10, derrière le foreground z-20 -->
	<div
		class="absolute top-[25%] right-0 left-0 z-10 flex justify-center px-4 xl:top-[31%] xl:px-10 max-xl:sm:top-[23%]"
	>
		<h1
			bind:this={titleEl}
			style="opacity: 0"
			class="text-center font-druk text-[13vw] leading-none tracking-tight text-white uppercase xl:text-[100px] max-xl:sm:text-[60px] max-xl:md:text-[10vw]"
		>
			{@html title}
		</h1>
	</div>

	<!-- Foreground — z-20, devant le titre -->
	<img
		src="/assets/images/Foreground.webp"
		alt="Lavage de voiture"
		fetchpriority="high"
		class="pointer-events-none absolute top-[60%] left-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 object-cover xl:top-[60%] xl:w-[70%]"
	/>

	<!-- CTA — z-30, devant tout -->
	<div
		bind:this={ctaEl}
		style="opacity: 0"
		class="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 xl:bottom-14"
	>
		<a
			href={ctaHref ?? '#booking'}
			onclick={(e) => {
				e.preventDefault();
				$bookingOpen = true;
			}}
			class="inline-flex items-center rounded-full bg-white px-8 py-3 text-button whitespace-nowrap text-dark shadow-sm hover:bg-primary-accent"
		>
			{button}
		</a>
	</div>
</section>

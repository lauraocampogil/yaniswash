<script lang="ts">
	let { title, button, ctaHref } = $props();
	import { bookingOpen } from '$lib/stores/booking';
</script>

<section
	class="relative min-h-[90vh] overflow-hidden rounded-b-[50px] bg-[url(/assets/images/Background.png)] bg-cover bg-center xl:min-h-svh xl:rounded-b-[60px] xl:px-20"
>
	<!-- Titre -->
	<div
		class="absolute top-[25%] right-0 left-0 z-10 flex justify-center px-4 xl:top-[30%]
           xl:px-10
        max-xl:sm:top-[25%]"
	>
		<h1
			class="text-center font-druk text-[13vw] leading-none tracking-tight text-white uppercase xl:text-[100px] sm:text-[60px] sm:leading-20"
		>
			{@html title}
		</h1>
	</div>

	<!-- Foreground -->
	<img
		src="/assets/images/Foreground.webp"
		alt="Lavage de voiture"
		class="pointer-events-none absolute top-[60%] left-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 object-cover xl:top-[60%] xl:w-[70%]"
	/>

	<!-- CTA -->
	<div class="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 xl:bottom-14">
		<a
			href={ctaHref ?? '#booking'}
			onclick={(e) => {
				e.preventDefault();
				$bookingOpen = true;
			}}
			class="inline-flex items-center rounded-full bg-white px-8 py-3 text-button whitespace-nowrap text-dark shadow-sm"
		>
			{button}
		</a>
	</div>
</section>

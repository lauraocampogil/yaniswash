<script lang="ts">
	let { title, button } = $props();
</script>

<section
	class="relative min-h-screen overflow-hidden rounded-b-[50px] bg-[url(/assets/images/Background.png)] bg-cover bg-center"
>
	<!-- Texto centrado en z-10 -->
	<div class="absolute inset-0 z-10 flex flex-col items-center justify-center">
		<h1 class="text-left font-druk text-mobile-title-3xl text-white uppercase">
			{title}
		</h1>
	</div>

	<!-- Foreground encima del texto en z-20 -->
	<img
		src="/assets/images/Foreground.webp"
		alt=""
		class="pointer-events-none absolute top-1/2 left-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2"
	/>
	<div class="absolute bottom-10 left-1/2 z-30 -translate-x-1/2">
		<a
			href="#booking"
			class="rounded-full bg-white px-8 py-3 text-button whitespace-nowrap text-black"
		>
			{button}
		</a>
	</div>
</section>

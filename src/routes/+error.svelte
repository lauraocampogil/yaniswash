<script lang="ts">
	import { page } from '$app/state';
	import { httpErrors } from '$lib/utils/httpErrors';

	const message =
		httpErrors[page.status as number] ?? page.error?.message ?? 'Une erreur inconnue est survenue.';
</script>

<section class="grid h-dvh place-items-center bg-background">
	<div class="relative flex flex-col items-center px-5 text-center">
		<!-- 404 en arrière-plan -->
		<h1
			class="absolute top-[15%] font-druk text-[30vw] leading-none text-dark/10 select-none xl:text-[300px]"
		>
			{page.status}
		</h1>

		<!-- Mascotte au-dessus du 404 -->
		<img
			src="/assets/svg/mascot/triste.svg"
			alt="Mascotte triste"
			class="relative z-10 mx-auto w-35 md:w-56 lg:w-72"
		/>

		<!-- Message en dessous -->
		<p class="relative z-10 mt-4 mb-8 text-base text-dark/60 md:text-xl lg:text-2xl">
			{message}
		</p>

		<a
			href="/"
			class="relative z-10 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:bg-primary/70"
		>
			Retour à l'accueil
		</a>
	</div>
</section>

<script lang="ts">
	import { page } from '$app/state';
	import { httpErrors } from '$lib/utils/httpErrors';

	const message =
		httpErrors[page.status as number] ?? page.error?.message ?? 'Une erreur inconnue est survenue.';
</script>

<section class="grid h-dvh place-items-center items-center justify-center gap-3 bg-background">
	<div class="text-center">
		<h1 class="text-6xl text-dark md:text-7xl lg:text-8xl">{page.status}</h1>
		<p class="pb-3 text-base text-dark md:pb-5 md:text-xl lg:pb-8 lg:text-2xl">{message}</p>
		<a
			class="button rounded-full bg-primary px-4 py-2 text-white transition-opacity hover:bg-primary/70 sm:px-4 sm:py-2 md:px-4 md:py-3.5"
			href="/">Retour à l'accueil</a
		>
	</div>
</section>

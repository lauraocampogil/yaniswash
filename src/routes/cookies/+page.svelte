<svelte:head>
	<title>Politique de Cookies</title>
	<meta name="description" content="Politique de cookies de YanisWash." />
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="min-h-screen bg-background px-5 py-16 xl:px-20 xl:py-24 3xl:container 3xl:mx-auto">
	<div class="mx-auto max-w-3xl">
		<a
			href="/"
			class="mb-8 inline-flex items-center gap-2 text-sm text-dark/50 transition-colors hover:text-dark"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 256 256"
			>
				<path
					d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"
				/>
			</svg>
			Retour
		</a>

		<h1 class="mb-2 text-mobile-title-2xl font-bold text-dark xl:text-title-2xl">
			Politique de Cookies
		</h1>
		<p class="mb-10 text-sm text-dark/40">Dernière mise à jour : Avril 2026</p>

		<div class="flex flex-col gap-8 text-dark">
			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">Qu'est-ce qu'un cookie ?</h2>
				<p class="text-mobile-body leading-relaxed">
					Un cookie est un petit fichier texte déposé sur votre appareil lorsque vous visitez un
					site web. Il permet au site de mémoriser vos actions et préférences pendant une durée
					déterminée.
				</p>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">Types de cookies utilisés</h2>

				<!-- Nécessaires -->
				<div class="flex flex-col gap-2 rounded-2xl bg-secondary-accent p-5">
					<div class="flex items-center justify-between">
						<h3 class="font-bold text-dark">Cookies nécessaires</h3>
						<span class="rounded-full bg-dark px-3 py-1 text-xs font-semibold text-white"
							>Toujours actifs</span
						>
					</div>
					<p class="text-mobile-body text-dark/70">
						Indispensables au fonctionnement du site. Ne peuvent pas être désactivés.
					</p>
					<ul class="flex flex-col gap-1 pl-4">
						{#each ['Gestion de votre session', 'Mémorisation de vos choix en matière de cookies'] as item}
							<li class="flex items-start gap-2 text-sm text-dark/60">
								<span class="mt-0.5 text-primary">•</span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Fonctionnels -->
				<div class="flex flex-col gap-2 rounded-2xl border border-dark/10 p-5">
					<h3 class="font-bold text-dark">Cookies fonctionnels</h3>
					<p class="text-mobile-body text-dark/70">
						Améliorent votre expérience en mémorisant vos préférences (langue, région).
					</p>
				</div>

				<!-- Analytiques -->
				<div class="flex flex-col gap-2 rounded-2xl border border-dark/10 p-5">
					<h3 class="font-bold text-dark">Cookies analytiques</h3>
					<p class="text-mobile-body text-dark/70">
						Nous aident à comprendre comment les visiteurs interagissent avec le site.
					</p>
					<ul class="flex flex-col gap-1 pl-4">
						<li class="flex items-start gap-2 text-sm text-dark/60">
							<span class="mt-0.5 text-primary">•</span>
							<span>Google Analytics — mesure d'audience</span>
						</li>
					</ul>
				</div>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">Durée de conservation</h2>
				<div class="overflow-hidden rounded-2xl border border-dark/10">
					<table class="w-full text-sm">
						<thead>
							<tr class="bg-secondary-accent">
								<th class="px-4 py-3 text-left font-semibold text-dark">Type</th>
								<th class="px-4 py-3 text-left font-semibold text-dark">Durée</th>
							</tr>
						</thead>
						<tbody>
							{#each [['Cookies nécessaires', 'Session ou 1 an maximum'], ['Cookies fonctionnels', '1 an'], ['Cookies analytiques', '1 an']] as [type, duree], i}
								<tr class="{i % 2 === 0 ? '' : 'bg-secondary-accent/30'} border-t border-dark/5">
									<td class="px-4 py-3 text-dark">{type}</td>
									<td class="px-4 py-3 text-dark/60">{duree}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">Gérer vos préférences</h2>
				<p class="text-mobile-body leading-relaxed">
					Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies :
				</p>
				<ul class="flex flex-col gap-1 pl-4">
					{#each [{ label: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' }, { label: 'Mozilla Firefox', url: 'https://support.mozilla.org/fr/kb/activer-desactiver-cookies' }, { label: 'Safari', url: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac' }, { label: 'Microsoft Edge', url: 'https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' }] as browser}
						<li class="flex items-start gap-2 text-mobile-body">
							<span class="mt-1 text-primary">•</span>
							<a
								href={browser.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-primary underline">{browser.label}</a
							>
						</li>
					{/each}
				</ul>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">Contact</h2>
				<p class="text-mobile-body leading-relaxed">
					Pour toute question concernant notre politique de cookies :<br />
					<a href="mailto:contact@yaniswash.be" class="text-primary underline"
						>contact@yaniswash.be</a
					><br />
					Rue des Maraichers 5, 1070 Bruxelles, Belgique
				</p>
			</section>
		</div>
	</div>
</main>

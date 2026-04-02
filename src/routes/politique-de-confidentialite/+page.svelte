<svelte:head>
	<title>Politique de Confidentialité</title>
	<meta name="description" content="Politique de confidentialité de YanisWash." />
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
			Politique de Confidentialité
		</h1>
		<p class="mb-10 text-sm text-dark/40">Dernière mise à jour: Avril 2026</p>

		<div class="flex flex-col gap-8 text-dark">
			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">1. Responsable du traitement</h2>
				<p class="text-mobile-body leading-relaxed">
					<strong>YanisWash</strong>, représenté par Guiseppe Franco, indépendant en personne
					physique.<br />
					Contact:
					<a href="mailto:unixcreativestudio@gmail.com" class="text-primary underline"
						>unixcreativestudio@gmail.com</a
					>
				</p>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">2. Données personnelles collectées</h2>
				<p class="text-mobile-body leading-relaxed">
					Dans le cadre de son activité, YanisWash collecte les données suivantes:
				</p>
				<ul class="flex flex-col gap-1 pl-4">
					{#each ['Nom et prénom', 'Numéro de téléphone', 'Adresse e-mail', 'Adresse postale (pour les interventions à domicile)', 'Type de véhicule', 'Informations de paiement (traitées par Stripe)'] as item}
						<li class="flex items-start gap-2 text-mobile-body">
							<span class="mt-1 text-primary">•</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">3. Mode de collecte</h2>
				<p class="text-mobile-body leading-relaxed">
					Les données personnelles sont collectées via le formulaire de réservation disponible sur
					le site.
				</p>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">4. Finalités du traitement</h2>
				<ul class="flex flex-col gap-1 pl-4">
					{#each ['Confirmer et gérer les réservations de lavage', 'Contacter le client avant ou après la prestation', 'Traiter les paiements en ligne', "Envoyer des demandes d'avis Google après la prestation"] as item}
						<li class="flex items-start gap-2 text-mobile-body">
							<span class="mt-1 text-primary">•</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">5. Base légale</h2>
				<p class="text-mobile-body leading-relaxed">
					Le traitement des données est fondé sur l'exécution d'un contrat (réservation de service)
					et l'intérêt légitime de YanisWash à gérer son activité commerciale.
				</p>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">6. Durée de conservation</h2>
				<ul class="flex flex-col gap-1 pl-4">
					{#each ['Données de réservation : 3 ans à compter du dernier contact', 'Données clients : durée de la relation commerciale, puis 7 ans pour les obligations légales'] as item}
						<li class="flex items-start gap-2 text-mobile-body">
							<span class="mt-1 text-primary">•</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">7. Destinataires des données</h2>
				<p class="text-mobile-body leading-relaxed">Les données peuvent être partagées avec :</p>
				<ul class="flex flex-col gap-1 pl-4">
					{#each ['Stripe (paiements en ligne) — États-Unis, certifié PCI-DSS', 'Cal.com (gestion des réservations) — Union européenne', 'Google (analytics, calendrier) — avec garanties RGPD'] as item}
						<li class="flex items-start gap-2 text-mobile-body">
							<span class="mt-1 text-primary">•</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">8. Vos droits</h2>
				<p class="text-mobile-body leading-relaxed">
					Conformément au RGPD, vous disposez des droits suivants :
				</p>
				<ul class="flex flex-col gap-1 pl-4">
					{#each ["Droit d'accès à vos données", 'Droit de rectification', "Droit à l'effacement", 'Droit à la limitation du traitement', 'Droit à la portabilité des données', "Droit d'opposition"] as item}
						<li class="flex items-start gap-2 text-mobile-body">
							<span class="mt-1 text-primary">•</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
				<p class="text-mobile-body leading-relaxed">
					Pour exercer ces droits : <a
						href="mailto:yaniswash@gmail.com"
						class="text-primary underline">yaniswash@gmail.com</a
					><br />
					Vous pouvez également introduire une réclamation auprès de l'<a
						href="https://www.autoriteprotectiondonnees.be"
						target="_blank"
						class="text-primary underline">Autorité de protection des données</a
					>.
				</p>
			</section>

			<div class="border-t border-dashed border-dark/10"></div>

			<section class="flex flex-col gap-3">
				<h2 class="text-mobile-title-lg font-bold text-dark">9. Modifications</h2>
				<p class="text-mobile-body leading-relaxed">
					YanisWash se réserve le droit de mettre à jour cette politique à tout moment. Toute
					modification sera publiée sur cette page.
				</p>
			</section>
		</div>
	</div>
</main>

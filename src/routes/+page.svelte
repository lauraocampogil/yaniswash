<script lang="ts">
	import Builder from '$sections/builder.svelte';

	const blocks = [
		{
			type: 'HeaderBlock',
			props: {
				logo: '/assets/svg/Logo-vertical.svg',
				menu: `<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 91.87 18.75"><line x1="2" y1="2" x2="89.87" y2="2" fill="none" stroke="#53423a" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><line x1="30.35" y1="16.73" x2="89.87" y2="16.75" fill="none" stroke="#53423a" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/></svg>`,
				closeButton: '',
				navigation: {
					links: [
						{ label: 'Services', href: '#services' },
						{ label: 'Résultat', href: '#resultat' },
						{ label: 'Reviews', href: '#reviews' },
						{ label: 'FAQ', href: '#faq' }
					]
				},
				button: 'Prendre rendez-vous'
			}
		},
		{
			type: 'HeroBlock',
			props: {
				title: 'Un bon lavage comme il faut.',
				button: 'Réserver un lavage',
				ctaHref: '#contact'
			}
		},
		{
			type: 'ServicesBlock',
			props: {
				title: 'Nos Formules de lavage',
				description:
					"Nous adaptons nos soins selon votre véhicule. Nous prenons le temps qu'il faut.",
				columns: ['Intérieur', 'Extérieur', 'Int + Ext'],
				vehicles: [
					{ label: 'Citadine', interieur: '€40', exterieur: '€40', combined: '€60' },
					{ label: 'Break', interieur: '€40', exterieur: '€40', combined: '€60' },
					{ label: '4*4', interieur: '€50', exterieur: '€50', combined: '€70' },
					{ label: 'Camionnette', interieur: '€50', exterieur: '€50', combined: '€70' }
				],
				extras: [
					{ name: 'Shampooing siège', price: '15€/siège' },
					{ name: 'Traitement cuir', price: '15€/siège' },
					{ name: "Déplacement jusqu'à 25 km", price: '10€' },
					{ name: 'Petit supplément si voiture est très sale', price: '10€' }
				],
				cta: 'Choisir mon lavage',
				ctaHref: '#contact'
			}
		},
		{
			type: 'ResultatBlock',
			props: {
				title: 'Le résultat parle de lui-même',
				description:
					'Nous ne faisons pas de miracle, juste un travail soigné avec de bons produits et un peu de patience.',
				slides: [
					{
						before: '/assets/images/resultat/avant1.jpg',
						after: '/assets/images/resultat/apres1.jpg',
						alt: 'Nettoyage intérieur — coffre'
					},
					{
						before: '/assets/images/resultat/avant2.jpg',
						after: '/assets/images/resultat/apres2.jpg',
						alt: 'Nettoyage intérieur — tapis'
					},
					{
						before: '/assets/images/resultat/avant3.jpg',
						after: '/assets/images/resultat/apres3.jpg',
						alt: 'Nettoyage extérieur — jantes'
					},
					{
						before: '/assets/images/resultat/avant4.jpg',
						after: '/assets/images/resultat/apres4.jpg',
						alt: 'Nettoyage intérieur — tapis'
					},
					{
						before: '/assets/images/resultat/avant5.jpg',
						after: '/assets/images/resultat/apres5.jpg',
						alt: 'Nettoyage intérieur — tapis'
					}
				]
			}
		},
		{
			type: 'ReviewsBlock',
			props: {
				title: 'Ce que disent nos clients',
				description:
					'Votre satisfaction est notre meilleure publicité. Voici quelques mots de personnes qui nous ont fait confiance.',
				stats: {
					note: '5.0',
					total: '+80'
				},
				avatars: ['S', 'D', 'C', 'A', 'F'],
				avis: [
					{
						id: 1,
						name: 'Sam D.',
						text: 'Cela fait deux fois que je fais appel à ses services. Très professionnels et service impeccable d’une gentillesse incroyable. Son travail est 1000 fois mieux que le lavage de luxe et Dieu seul sait combien j’en ai essayé. Je le recommande à 1000 % !!!'
					},
					{
						id: 2,
						name: 'David G.',
						text: "Tout simplement : Ma voiture était encore plus propre qu'en sortie de concession."
					},
					{
						id: 3,
						name: 'Cristian L.',
						text: "La voiture était tellement sale qu'elle est comme ça. Salut, tu fais du bon travail."
					},
					{
						id: 4,
						name: 'Aya R.',
						text: "Vraiment impressionnée par le résultat. L'intérieur était méconnaissable, chaque recoin nettoyé avec soin. On sent que le travail est fait avec le cœur."
					},
					{
						id: 5,
						name: 'Frédéric D.',
						text: "Service rapide, propre et honnête. Ma camionnette de travail n'avait pas été aussi nette depuis des années. Je reviendrai sans hésiter."
					}
				]
			}
		},
		{
			type: 'FAQBlock',
			props: {
				title: 'Questions fréquentes',
				description:
					'Nous savons que confier sa voiture peut soulever des questions. Voici les réponses aux plus courantes.',
				faqs: [
					{
						question: 'Combien de temps dure un lavage ?',
						answer:
							"Entre 1h et 2h30 selon la formule choisie et l'état du véhicule. Nous prenons le temps qu'il faut pour bien faire."
					},
					{
						question: 'Dois-je être présent pendant le lavage ?',
						answer:
							"Non, ce n'est pas obligatoire. Vous pouvez nous laisser les clés et revenir une fois le véhicule prêt."
					},
					{
						question: 'Comment se passe le paiement ?',
						answer:
							"Le paiement s'effectue à la fin de la prestation, en espèces ou par virement bancaire."
					},
					{
						question: 'Travaillez-vous le week-end ?',
						answer:
							'Oui, du lundi au samedi de 8h à 18h. Contactez-nous pour les disponibilités le samedi.'
					},
					{
						question: 'Puis-je annuler ou déplacer mon rendez-vous ?',
						answer:
							"Oui, jusqu'à 24h avant la prestation. Au-delà, nous vous demandons de nous prévenir dès que possible."
					},
					{
						question: 'Ma voiture est vraiment très sale, est-ce un problème ?',
						answer:
							"Non, au contraire — c'est pour ça que nous existons. Un supplément de 10€ peut s'appliquer pour les véhicules très sales ou avec des poils d'animaux."
					},
					{
						question: 'Faut-il vider la voiture avant ?',
						answer: 'Idéalement oui, pour les affaires personnelles. Nous nous occupons du reste.'
					},
					{
						question: 'Vous déplacez-vous partout à Bruxelles ?',
						answer:
							"Oui, dans toute la région bruxelloise et jusqu'à 25 km aux alentours. Au-delà, un supplément de 10€ par tranche de 25 km s'applique."
					}
				]
			}
		},
		{
			type: 'FooterBlock',
			props: {
				logo: '/assets/svg/Logo-horizontal.svg',
				title: 'Lavage automobile à Bruxelles',
				description:
					'Nous prenons soin de votre voiture avec des produits respectueux et un travail soigné.',
				image: '/assets/images/Car.webp',
				socials: [
					{ label: 'Instagram', href: '#insta' },
					{ label: 'Facebook', href: '#facebook' }
				],
				services: {
					title: 'Services',
					links: [
						{ label: 'Citadine', href: '#services' },
						{ label: 'Break', href: '#services' },
						{ label: '4x4 / SUV', href: '#services' },
						{ label: 'Camionnette', href: '#services' }
					],
					button: 'Réserver un lavage'
				},
				contact: {
					title: 'Nous contacter',
					phone: '+0491 73 97 89',
					email: 'contact@yaniswash.be',
					adresse: 'Rue des Maraichers 5, 1070 Bruxelles',
					hours: 'Lun – Sam · 8h – 18h'
				},
				legal: [
					{ label: 'Mentions Légales', href: '#' },
					{ label: 'Politique de confidentialité', href: '#' },
					{ label: 'Cookies', href: '#' }
				],
				copyright: 'RAMDANI SPORT ET SANTÉ © 2026 - Tous droits réservés'
			}
		}
	];
</script>

<Builder {blocks} />

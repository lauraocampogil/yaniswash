<script lang="ts">
	import Builder from '$sections/builder.svelte';
	import Booking from '$sections/booking.svelte';
	import { bookingOpen } from '$lib/stores/booking';

	const blocks = [
		{
			type: 'HeaderBlock',
			props: {
				logo: '/assets/svg/Logo-vertical_blanc.svg',
				logoMobile: '/assets/svg/Logo-vertical_blanc.svg',
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
				instagram: {
					href: 'https://www.instagram.com/yaniswash/',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M11.4881 0C12.66 0.003125 13.2548 0.009375 13.7683 0.0239583L13.9704 0.03125C14.2037 0.0395833 14.4339 0.0499999 14.7121 0.0624999C15.8204 0.114583 16.5766 0.289583 17.2402 0.546875C17.9277 0.811458 18.5068 1.16979 19.086 1.74792C19.6159 2.26847 20.0258 2.89841 20.2871 3.59375C20.5443 4.25729 20.7193 5.01354 20.7714 6.12292C20.7839 6.4 20.7943 6.63021 20.8027 6.86458L20.8089 7.06667C20.8246 7.57917 20.8308 8.17396 20.8329 9.34583L20.8339 10.1229V11.4875C20.8365 12.2473 20.8285 13.0071 20.81 13.7667L20.8037 13.9687C20.7954 14.2031 20.785 14.4333 20.7725 14.7104C20.7204 15.8198 20.5433 16.575 20.2871 17.2396C20.0258 17.9349 19.6159 18.5649 19.086 19.0854C18.5655 19.6153 17.9355 20.0252 17.2402 20.2865C16.5766 20.5437 15.8204 20.7187 14.7121 20.7708L13.9704 20.8021L13.7683 20.8083C13.2548 20.8229 12.66 20.8302 11.4881 20.8323L10.711 20.8333H9.34747C8.58732 20.836 7.82718 20.828 7.06726 20.8094L6.86518 20.8031C6.6179 20.7938 6.37067 20.783 6.12351 20.7708C5.01518 20.7187 4.25893 20.5437 3.59434 20.2865C2.89937 20.0251 2.2698 19.6152 1.74955 19.0854C1.21929 18.565 0.809039 17.935 0.547468 17.2396C0.290176 16.576 0.115176 15.8198 0.0630924 14.7104L0.0318425 13.9687L0.0266343 13.7667C0.00743222 13.0071 -0.00124927 12.2473 0.000592497 11.4875V9.34583C-0.00229073 8.58604 0.00534897 7.82625 0.0235092 7.06667L0.0308009 6.86458C0.0391342 6.63021 0.0495508 6.4 0.0620508 6.12292C0.114134 5.01354 0.289134 4.25833 0.546426 3.59375C0.808607 2.89812 1.21958 2.26816 1.75059 1.74792C2.27054 1.21828 2.89975 0.80841 3.59434 0.546875C4.25893 0.289583 5.01413 0.114583 6.12351 0.0624999C6.40059 0.0499999 6.63184 0.0395833 6.86518 0.03125L7.06726 0.0249999C7.82684 0.0064924 8.58663 -0.00149448 9.34643 0.00104159L11.4881 0ZM10.4173 5.20833C9.03592 5.20833 7.71116 5.75707 6.73441 6.73382C5.75766 7.71057 5.20893 9.03533 5.20893 10.4167C5.20893 11.798 5.75766 13.1228 6.73441 14.0995C7.71116 15.0763 9.03592 15.625 10.4173 15.625C11.7986 15.625 13.1234 15.0763 14.1001 14.0995C15.0769 13.1228 15.6256 11.798 15.6256 10.4167C15.6256 9.03533 15.0769 7.71057 14.1001 6.73382C13.1234 5.75707 11.7986 5.20833 10.4173 5.20833ZM10.4173 7.29167C10.8276 7.2916 11.234 7.37236 11.6132 7.52934C11.9924 7.68633 12.3369 7.91646 12.6271 8.20659C12.9174 8.49672 13.1476 8.84118 13.3047 9.2203C13.4618 9.59942 13.5427 10.0058 13.5428 10.4161C13.5428 10.8265 13.4621 11.2329 13.3051 11.6121C13.1481 11.9912 12.918 12.3358 12.6279 12.626C12.3377 12.9162 11.9933 13.1465 11.6141 13.3036C11.235 13.4607 10.8287 13.5416 10.4183 13.5417C9.5895 13.5417 8.79464 13.2124 8.20859 12.6264C7.62254 12.0403 7.2933 11.2455 7.2933 10.4167C7.2933 9.58786 7.62254 8.79301 8.20859 8.20696C8.79464 7.62091 9.5895 7.29167 10.4183 7.29167M15.8871 3.64583C15.5417 3.64583 15.2105 3.78302 14.9663 4.0272C14.7222 4.27139 14.585 4.60258 14.585 4.94792C14.585 5.29325 14.7222 5.62444 14.9663 5.86863C15.2105 6.11282 15.5417 6.25 15.8871 6.25C16.2324 6.25 16.5636 6.11282 16.8078 5.86863C17.052 5.62444 17.1891 5.29325 17.1891 4.94792C17.1891 4.60258 17.052 4.27139 16.8078 4.0272C16.5636 3.78302 16.2324 3.64583 15.8871 3.64583Z" fill="currentColor"/>
</svg>`
				},
				button: 'Prendre rendez-vous'
			}
		},
		{
			type: 'HeroBlock',
			props: {
				title: 'Un bon lavage comme il faut.',
				button: 'Réserver un lavage',
				ctaHref: '#booking'
			}
		},
		{
			type: 'ServicesBlock',
			props: {
				title: 'Nos Formules de lavage',
				description:
					"Nous adaptons nos soins selon votre véhicule. Nous prenons le temps qu'il faut.",
				columns: ['Intérieur', 'Extérieur', 'Int + Ext'],
				vehicules: [
					{ label: 'Citadine', interieur: '€40', exterieur: '€40', combined: '€60' },
					{ label: 'Break', interieur: '€40', exterieur: '€40', combined: '€60' },
					{ label: '4*4', interieur: '€50', exterieur: '€50', combined: '€70' },
					{ label: 'Camionnette', interieur: '€50', exterieur: '€50', combined: '€70' }
				],
				extras: [
					{ name: 'Shampooing siège', price: '15€/siège' },
					{ name: 'Traitement cuir', price: '15€/siège' },
					{ name: "Déplacement jusqu'à 25 km", price: '10€' },
					{ name: 'Si voiture est très sale', price: '10€' }
				],
				button: 'Choisir mon lavage',
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
						before: '/assets/images/resultat/avant1.webp',
						after: '/assets/images/resultat/apres1.webp',
						alt: 'Nettoyage extérieur — jantes'
					},
					{
						before: '/assets/images/resultat/avant2.webp',
						after: '/assets/images/resultat/apres2.webp',
						alt: 'Nettoyage intérieur — tapis'
					},
					{
						before: '/assets/images/resultat/avant3.webp',
						after: '/assets/images/resultat/apres3.webp',
						alt: 'Nettoyage intérieur — coffre '
					},
					{
						before: '/assets/images/resultat/avant4.webp',
						after: '/assets/images/resultat/apres4.webp',
						alt: 'Nettoyage intérieur — tapis'
					},
					{
						before: '/assets/images/resultat/avant5.webp',
						after: '/assets/images/resultat/apres5.webp',
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
					total: '+5'
				},
				avatars: ['S', 'D', 'C', 'A', 'F'],
				avis: [
					{
						id: 1,
						name: 'Frédéric D.',
						text: "Service rapide, propre et honnête. Ma camionnette de travail n'avait pas été aussi nette depuis des années. Je reviendrai sans hésiter."
					},
					{
						id: 2,
						name: 'David G.',
						text: "Tout simplement: Ma voiture était encore plus propre qu'en sortie de concession."
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
						name: 'Sam D.',
						text: 'Cela fait deux fois que je fais appel à ses services. Très professionnels et service impeccable d’une gentillesse incroyable. Son travail est 1000 fois mieux que le lavage de luxe et Dieu seul sait combien j’en ai essayé. Je le recommande à 1000 % !!!'
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
						question: 'Combien de temps dure un lavage?',
						answer:
							"Entre 1h et 2h30 selon la formule choisie et l'état du véhicule. Nous prenons le temps qu'il faut pour bien faire."
					},
					{
						question: 'Dois-je être présent pendant le lavage?',
						answer:
							"Non, ce n'est pas obligatoire. Vous pouvez nous laisser les clés et revenir une fois le véhicule prêt."
					},
					{
						question: 'Comment se passe le paiement?',
						answer:
							'Vous pouvez régler en ligne lors de la réservation, ou en espèces directement sur place au moment du lavage.'
					},
					{
						question: 'Travaillez-vous le week-end?',
						answer:
							'Oui, du lundi au samedi de 8h à 18h. Contactez-nous pour les disponibilités le samedi.'
					},
					{
						question: 'Puis-je annuler ou déplacer mon rendez-vous?',
						answer:
							"Oui, jusqu'à 24h avant la prestation. Au-delà, nous vous demandons de nous prévenir dès que possible."
					},
					{
						question: 'Ma voiture est vraiment très sale, est-ce un problème?',
						answer:
							"Non, au contraire — c'est pour ça que nous existons. Un supplément de 10€ peut s'appliquer pour les véhicules très sales ou avec des poils d'animaux."
					},
					{
						question: 'Faut-il vider la voiture avant?',
						answer: 'Idéalement oui, pour les affaires personnelles. Nous nous occupons du reste.'
					},
					{
						question: 'Vous déplacez-vous partout à Bruxelles?',
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
				instagram: {
					icon: `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
  <path d="M11.4881 0C12.66 0.003125 13.2548 0.009375 13.7683 0.0239583L13.9704 0.03125C14.2037 0.0395833 14.4339 0.0499999 14.7121 0.0624999C15.8204 0.114583 16.5766 0.289583 17.2402 0.546875C17.9277 0.811458 18.5068 1.16979 19.086 1.74792C19.6159 2.26847 20.0258 2.89841 20.2871 3.59375C20.5443 4.25729 20.7193 5.01354 20.7714 6.12292C20.7839 6.4 20.7943 6.63021 20.8027 6.86458L20.8089 7.06667C20.8246 7.57917 20.8308 8.17396 20.8329 9.34583L20.8339 10.1229V11.4875C20.8365 12.2473 20.8285 13.0071 20.81 13.7667L20.8037 13.9687C20.7954 14.2031 20.785 14.4333 20.7725 14.7104C20.7204 15.8198 20.5433 16.575 20.2871 17.2396C20.0258 17.9349 19.6159 18.5649 19.086 19.0854C18.5655 19.6153 17.9355 20.0252 17.2402 20.2865C16.5766 20.5437 15.8204 20.7187 14.7121 20.7708L13.9704 20.8021L13.7683 20.8083C13.2548 20.8229 12.66 20.8302 11.4881 20.8323L10.711 20.8333H9.34747C8.58732 20.836 7.82718 20.828 7.06726 20.8094L6.86518 20.8031C6.6179 20.7938 6.37067 20.783 6.12351 20.7708C5.01518 20.7187 4.25893 20.5437 3.59434 20.2865C2.89937 20.0251 2.2698 19.6152 1.74955 19.0854C1.21929 18.565 0.809039 17.935 0.547468 17.2396C0.290176 16.576 0.115176 15.8198 0.0630924 14.7104L0.0318425 13.9687L0.0266343 13.7667C0.00743222 13.0071 -0.00124927 12.2473 0.000592497 11.4875V9.34583C-0.00229073 8.58604 0.00534897 7.82625 0.0235092 7.06667L0.0308009 6.86458C0.0391342 6.63021 0.0495508 6.4 0.0620508 6.12292C0.114134 5.01354 0.289134 4.25833 0.546426 3.59375C0.808607 2.89812 1.21958 2.26816 1.75059 1.74792C2.27054 1.21828 2.89975 0.80841 3.59434 0.546875C4.25893 0.289583 5.01413 0.114583 6.12351 0.0624999C6.40059 0.0499999 6.63184 0.0395833 6.86518 0.03125L7.06726 0.0249999C7.82684 0.0064924 8.58663 -0.00149448 9.34643 0.00104159L11.4881 0ZM10.4173 5.20833C9.03592 5.20833 7.71116 5.75707 6.73441 6.73382C5.75766 7.71057 5.20893 9.03533 5.20893 10.4167C5.20893 11.798 5.75766 13.1228 6.73441 14.0995C7.71116 15.0763 9.03592 15.625 10.4173 15.625C11.7986 15.625 13.1234 15.0763 14.1001 14.0995C15.0769 13.1228 15.6256 11.798 15.6256 10.4167C15.6256 9.03533 15.0769 7.71057 14.1001 6.73382C13.1234 5.75707 11.7986 5.20833 10.4173 5.20833ZM10.4173 7.29167C10.8276 7.2916 11.234 7.37236 11.6132 7.52934C11.9924 7.68633 12.3369 7.91646 12.6271 8.20659C12.9174 8.49672 13.1476 8.84118 13.3047 9.2203C13.4618 9.59942 13.5427 10.0058 13.5428 10.4161C13.5428 10.8265 13.4621 11.2329 13.3051 11.6121C13.1481 11.9912 12.918 12.3358 12.6279 12.626C12.3377 12.9162 11.9933 13.1465 11.6141 13.3036C11.235 13.4607 10.8287 13.5416 10.4183 13.5417C9.5895 13.5417 8.79464 13.2124 8.20859 12.6264C7.62254 12.0403 7.2933 11.2455 7.2933 10.4167C7.2933 9.58786 7.62254 8.79301 8.20859 8.20696C8.79464 7.62091 9.5895 7.29167 10.4183 7.29167M15.8871 3.64583C15.5417 3.64583 15.2105 3.78302 14.9663 4.0272C14.7222 4.27139 14.585 4.60258 14.585 4.94792C14.585 5.29325 14.7222 5.62444 14.9663 5.86863C15.2105 6.11282 15.5417 6.25 15.8871 6.25C16.2324 6.25 16.5636 6.11282 16.8078 5.86863C17.052 5.62444 17.1891 5.29325 17.1891 4.94792C17.1891 4.60258 17.052 4.27139 16.8078 4.0272C16.5636 3.78302 16.2324 3.64583 15.8871 3.64583Z" fill="currentColor"/>
</svg>`,
					href: 'https://www.instagram.com/ramdani.sport_et_sante/'
				},
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
					email: 'yaniswash@gmail.com',
					adresse: 'Rue des Maraichers 5, 1070 Bruxelles',
					hours: '8h – 18h'
				},
				legal: [
					{ label: 'Mentions Légales', href: '/mentions-legales' },
					{ label: 'Politique de confidentialité', href: '/politique-de-confidentialite' },
					{ label: 'Cookies', href: '/cookies' }
				]
			}
		}
	];
</script>

<svelte:head>
	<title>YanisWash | Lavage automobile à Bruxelles</title>
</svelte:head>

<Booking bind:isOpen={$bookingOpen} />
<Builder {blocks} />

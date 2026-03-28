<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { bookingOpen } from '$lib/stores/booking';

	let { logo, navigation, button } = $props();

	let menuOpen = $state(false);
	let hidden = $state(false);
	let scrolled = $state(false);
	let lastY = 0;

	let overlayEl = $state<HTMLElement | null>(null);
	let navLinks = $state<(HTMLElement | null)[]>([]);
	let ctaEl = $state<HTMLElement | null>(null);

	// Deux refs pour les deux SVG (header + overlay)
	let line1Header = $state<SVGLineElement | null>(null);
	let line2Header = $state<SVGLineElement | null>(null);

	onMount(() => {
		const handleScroll = () => {
			const currentY = window.scrollY;
			scrolled = currentY > 50;
			if (currentY < 50) {
				hidden = false;
			} else if (currentY > lastY) {
				hidden = true;
			} else {
				hidden = false;
			}
			lastY = currentY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function openMenu() {
		menuOpen = true;

		requestAnimationFrame(() => {
			if (!overlayEl || !ctaEl) return;

			gsap.fromTo(overlayEl, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'expo.out' });

			gsap.fromTo(
				navLinks.filter(Boolean),
				{ x: 60, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.4, ease: 'expo.out', stagger: 0.07, delay: 0.2 }
			);

			gsap.fromTo(
				ctaEl,
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.4, ease: 'expo.out', delay: 0.5 }
			);

			// Anime le burger du header → X
			gsap.to(line1Header, {
				attr: { x1: 20, y1: 4, x2: 4, y2: 20 },
				duration: 0.3,
				ease: 'expo.inOut'
			});
			gsap.to(line2Header, {
				attr: { x1: 4, y1: 4, x2: 20, y2: 20 },
				duration: 0.3,
				ease: 'expo.inOut'
			});
		});
	}

	function closeMenu() {
		if (!overlayEl) return;

		// Anime le X → burger avant de fermer
		gsap.to(line1Header, {
			attr: { x1: 2, y1: 6, x2: 22, y2: 6 },
			duration: 0.3,
			ease: 'expo.inOut'
		});
		gsap.to(line2Header, {
			attr: { x1: 2, y1: 14, x2: 22, y2: 14 },
			duration: 0.3,
			ease: 'expo.inOut'
		});

		gsap.to(overlayEl, {
			x: '100%',
			duration: 0.4,
			ease: 'expo.in',
			onComplete: () => {
				menuOpen = false;
			}
		});
	}

	$effect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
	});
</script>

<header id="header">
	<div
		class="fixed top-0 right-0 left-0 z-200 transition-all duration-300"
		class:hide={hidden}
		class:scrolled-bg={scrolled && !menuOpen}
	>
		<div
			class="flex items-center justify-between px-5 pt-6 pb-2 xl:px-20 xl:pt-4 xl:pb-2 3xl:container 3xl:mx-auto"
		>
			<a href="/">
				<img src={logo} alt="YanisWash" class="h-10 w-fit xl:h-16" />
			</a>

			<nav class="hidden items-center gap-10 xl:flex">
				{#each navigation.links as link}
					<a
						href={link.href}
						class="text-sm font-medium text-white transition-opacity hover:opacity-70"
					>
						{link.label}
					</a>
				{/each}
			</nav>

			<a
				href="#contact"
				onclick={(e) => {
					e.preventDefault();
					$bookingOpen = true;
				}}
				class="hidden items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-dark xl:inline-flex"
			>
				{button}
			</a>

			<!-- Burger animé — toujours visible au dessus de l'overlay -->
			<button
				type="button"
				class="text-white xl:hidden"
				onclick={menuOpen ? closeMenu : openMenu}
				aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
			>
				<svg
					width="24"
					height="20"
					viewBox="0 0 24 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<line
						bind:this={line1Header}
						x1="2"
						y1="6"
						x2="22"
						y2="6"
						stroke="white"
						stroke-width="2.5"
						stroke-linecap="round"
					/>
					<line
						bind:this={line2Header}
						x1="2"
						y1="14"
						x2="22"
						y2="14"
						stroke="white"
						stroke-width="2.5"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>

<!-- Menu mobile overlay — z inférieur au header -->
{#if menuOpen}
	<div
		bind:this={overlayEl}
		class="fixed inset-0 z-100 flex flex-col bg-dark px-5 py-6 pt-20"
		style="transform: translateX(100%)"
	>
		<!-- Liens navigation -->
		<nav class="flex flex-col gap-6 pt-16">
			{#each navigation.links as link, i}
				<a
					href={link.href}
					onclick={() => closeMenu()}
					class="text-mobile-title-xl font-bold text-white"
					style="opacity: 0"
					bind:this={navLinks[i]}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- CTA -->
		<div bind:this={ctaEl} class="pt-8 pb-10" style="opacity: 0">
			<a
				href="#contact"
				onclick={(e) => {
					e.preventDefault();
					$bookingOpen = true;
				}}
				class="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 font-semibold text-dark"
			>
				{button}
			</a>
		</div>
	</div>
{/if}

<style>
	.hide {
		transform: translateY(-100%);
	}

	.scrolled-bg {
		background-color: #151d3c;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}
</style>

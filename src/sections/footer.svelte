<script lang="ts">
	import { bookingOpen } from '$lib/stores/booking';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let { logo, title, description, image, services, contact, legal } = $props();

	let carEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		if (window.innerWidth >= 1280) {
			gsap.fromTo(
				carEl,
				{ x: '40%', opacity: 0 },
				{
					x: '0%',
					opacity: 1,
					duration: 1.8,
					ease: 'expo.out',
					scrollTrigger: { trigger: carEl, start: 'top 60%', once: true }
				}
			);
		} else {
			gsap.set(carEl, { opacity: 1 });
		}
	});
</script>

<footer id="footer" class="rounded-t-[50px] bg-primary">
	<div
		class="grid-section gap-5 rounded-t-[50px] bg-primary px-5 pt-10 pb-0
		xl:gap-x-5 xl:px-20 xl:pt-16
		3xl:container 3xl:mx-auto
		sm:grid sm:grid-cols-8 sm:gap-x-5 sm:gap-y-4
		max-xl:sm:px-8 max-xl:sm:pt-12 max-xl:md:px-10 max-xl:lg:px-12"
	>
		<!-- Logo: sm col 1-3 row 1 / xl col 1-2 row 1 -->
		<div
			class="mb-4
			xl:col-span-2 xl:col-start-1 xl:row-start-1 max-xl:sm:col-span-3
			max-xl:sm:col-start-1 max-xl:sm:row-start-1 max-xl:sm:mb-0"
		>
			<img src={logo} alt="YanisWash" title="YanisWash" class="h-15 w-fit xl:h-20" />
		</div>

		<!-- Titre + description: sm col 1-3 row 2 / xl col 1-2 row 2 -->
		<div
			class="flex flex-col gap-1 pb-5
			xl:col-span-2 xl:col-start-1 xl:row-start-2 xl:self-start
			max-xl:sm:col-span-3 max-xl:sm:col-start-1 max-xl:sm:row-start-2 max-xl:sm:self-start"
		>
			<p class="text-mobile-title-lg font-bold text-white xl:text-title-sm">{title}</p>
			<p class="text-mobile-body text-white">{description}</p>
		</div>

		<!-- Horaires + CTA: sm col 4-5 row 2 / xl col 6 row 2 -->
		<div
			class="flex flex-col gap-1 pb-7
			xl:col-span-1 xl:col-start-6 xl:row-start-2 xl:self-start
			xl:pb-10 max-xl:sm:col-span-2 max-xl:sm:col-start-5 max-xl:sm:row-start-2 max-xl:sm:self-start"
		>
			<p class="font-bold text-white">Lundi - Samedi</p>
			<p class="text-mobile-body text-white">{contact.hours}</p>
			<a
				href="#contact"
				title="Réserver un lavage"
				onclick={(e) => {
					e.preventDefault();
					$bookingOpen = true;
				}}
				class="mt-2 inline-flex w-fit items-center rounded-full bg-white px-2 py-2 text-sm font-semibold text-dark hover:bg-primary-accent"
			>
				{services.button}
			</a>
		</div>

		<!-- Contact: sm col 6-8 row 2 / xl col 7-8 row 2 -->
		<div
			class="flex flex-col gap-1
			xl:col-span-2 xl:col-start-7 xl:row-start-2 xl:self-start
			xl:pb-10 max-xl:sm:col-span-2 max-xl:sm:col-start-7 max-xl:sm:row-start-2 max-xl:sm:self-start"
		>
			<p class="font-bold text-white">{contact.title}</p>
			<div class="flex items-center gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="#ffffff"
					viewBox="0 0 256 256"
				>
					<path
						d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"
					/>
				</svg>
				<span class="text-mobile-body text-white">{contact.phone}</span>
			</div>
			<!-- Email -->
			<div class="flex items-start gap-2 overflow-hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="#ffffff"
					viewBox="0 0 256 256"
					class="mt-0.5 shrink-0"
				>
					<path
						d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"
					/>
				</svg>
				<a
					href={'mailto:' + contact.email}
					class="min-w-0 text-mobile-body wrap-break-word text-white underline-offset-2 hover:underline"
				>
					{contact.email}
				</a>
			</div>
			<div class="flex items-start gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="#ffffff"
					viewBox="0 0 256 256"
					class="mt-0.5 shrink-0"
				>
					<path
						d="M200,224H150.54A266.56,266.56,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25a88,88,0,0,0-176,0c0,31.4,14.51,64.68,42,96.25A266.56,266.56,0,0,0,105.46,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM56,104a72,72,0,0,1,144,0c0,57.23-55.47,105-72,118C111.47,209,56,161.23,56,104Zm112,0a40,40,0,1,0-40,40A40,40,0,0,0,168,104Zm-64,0a24,24,0,1,1,24,24A24,24,0,0,1,104,104Z"
					/>
				</svg>
				<a
					href={'https://maps.google.com/?q=' + encodeURIComponent(contact.adresse)}
					target="_blank"
					rel="noopener noreferrer"
					class="text-mobile-body text-white underline-offset-2 hover:underline"
				>
					{contact.adresse}
				</a>
			</div>
		</div>

		<!-- Image voiture: col 1-8 row 4 -->
		<div
			bind:this={carEl}
			class="-mx-5 mt-6 overflow-hidden px-4
			xl:col-span-8 xl:col-start-1 xl:row-start-4 xl:mx-0
			xl:mt-0 xl:-mb-1 xl:px-0 max-xl:sm:col-span-8 max-xl:sm:col-start-1 max-xl:sm:row-start-4 max-xl:sm:mt-4"
			style="opacity: 0"
		>
			<img src={image} alt="voiture" class="w-full object-contain xl:max-h-95" />
		</div>

		<!-- Legal: col 1-8 row 5 -->
		<div
			class="flex flex-col gap-2 py-4
			max-xl:sm:col-span-8 max-xl:sm:col-start-1 max-xl:sm:row-start-5
			lg:col-span-8 lg:col-start-1 lg:row-start-5 lg:flex-row lg:items-center lg:justify-between lg:py-5"
		>
			<p class="text-xs text-white/60">
				YanisWash © {new Date().getFullYear()} - Tous droits réservés
			</p>
			<div class="flex flex-wrap gap-4 xl:gap-6">
				{#each legal as item}
					<a href={item.href} title={item.label} class="text-xs text-white/60">{item.label}</a>
				{/each}
			</div>
			<a
				href="https://unixcreativestudio.com/index.html"
				target="_blank"
				class="text-xs text-white/60">Made with love by Unix</a
			>
		</div>
	</div>
</footer>

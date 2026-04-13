<script lang="ts">
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import flatpickr from 'flatpickr';
	import { French } from 'flatpickr/dist/l10n/fr.js';

	// ── Disponibilité ──
	let unavailableDates = $state<string[]>([]);
	let availableSlots = $state<Record<string, string[]>>({});

	onMount(async () => {
		const res = await fetch('/api/availability');
		const data = await res.json();
		unavailableDates = data.unavailableDates ?? [];
		availableSlots = data.availableSlots ?? {};
	});

	let availableTimeSlots = $derived.by(() => {
		return availableSlots[form.date] ?? [];
	});

	let dateInputEl = $state<HTMLInputElement | null>(null);
	let flatpickrInstance: any = null;

	let { isOpen = $bindable(false) } = $props();

	let step = $state(1);
	let loading = $state(false);
	let success = $state(false);

	let timeOpen = $state(false);
	let vehicleOpen = $state(false);
	let serviceOpen = $state(false);

	let timeButtonEl = $state<HTMLElement | null>(null);
	let vehicleButtonEl = $state<HTMLElement | null>(null);
	let serviceButtonEl = $state<HTMLElement | null>(null);

	type DropdownPos = { top: number; bottom: number; left: number; width: number; openUp: boolean };
	let dropdownPos = $state<DropdownPos>({ top: 0, bottom: 0, left: 0, width: 0, openUp: false });

	function openDropdown(buttonEl: HTMLElement, which: 'time' | 'vehicle' | 'service') {
		const rect = buttonEl.getBoundingClientRect();
		const spaceBelow = window.innerHeight - rect.bottom;
		const openUp = spaceBelow < 250;
		dropdownPos = {
			top: rect.bottom + 4,
			bottom: window.innerHeight - rect.top + 4,
			left: rect.left,
			width: rect.width,
			openUp
		};
		if (which === 'time') {
			timeOpen = !timeOpen;
			vehicleOpen = false;
			serviceOpen = false;
		}
		if (which === 'vehicle') {
			vehicleOpen = !vehicleOpen;
			timeOpen = false;
			serviceOpen = false;
		}
		if (which === 'service') {
			serviceOpen = !serviceOpen;
			timeOpen = false;
			vehicleOpen = false;
		}
	}

	function closeDropdowns() {
		timeOpen = false;
		vehicleOpen = false;
		serviceOpen = false;
	}

	let form = $state({
		date: '',
		time: '',
		datetime: '',
		vehicle: '',
		service: '',
		domicile: false,
		address: '',
		options: [] as string[],
		name: '',
		email: '',
		phone: '',
		payment: ''
	});

	const prices: Record<string, Record<string, number>> = {
		Citadine: { Intérieur: 40, Extérieur: 40, 'Int + Ext': 60 },
		Break: { Intérieur: 40, Extérieur: 40, 'Int + Ext': 60 },
		'4*4': { Intérieur: 50, Extérieur: 50, 'Int + Ext': 70 },
		Camionnette: { Intérieur: 50, Extérieur: 50, 'Int + Ext': 70 }
	};

	const optionPrices: Record<string, number> = {
		'Shampooing siège': 15,
		'Traitement cuir': 15,
		'Très sale / poils de chien': 10
	};

	const STATION_ADDRESS = 'Rue des Maraichers 5, 1070 Bruxelles';

	// Prix déplacement calculé (sera mis à jour quand on aura Google Maps)
	let deplacement = $state(0);

	let totalPrice = $derived.by(() => {
		let total = 0;
		if (form.vehicle && form.service && prices[form.vehicle]?.[form.service]) {
			total += prices[form.vehicle][form.service];
		}
		form.options.forEach((opt) => {
			total += optionPrices[opt] ?? 0;
		});
		if (form.domicile) total += deplacement;
		return total;
	});

	const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
	const vehicles = ['Citadine', 'Break', '4*4', 'Camionnette'];
	const services = ['Intérieur', 'Extérieur', 'Int + Ext'];

	let overlayEl = $state<HTMLElement | null>(null);
	let contentEl = $state<HTMLElement | null>(null);

	$effect(() => {
		// Recrée flatpickr quand unavailableDates change ou quand isOpen change
		const dates = unavailableDates; // ← reactive dependency

		if (isOpen && dateInputEl) {
			// Détruit l'instance existante si elle existe
			if (flatpickrInstance) {
				flatpickrInstance.destroy();
				flatpickrInstance = null;
			}

			flatpickrInstance = flatpickr(dateInputEl, {
				locale: French,
				dateFormat: 'Y-m-d',
				altInput: true,
				altFormat: 'l j F Y',
				minDate: 'today',
				disable: [...dates],
				onChange: (selectedDates: Date[]) => {
					const date = selectedDates[0];
					if (!date) return;
					const y = date.getFullYear();
					const m = String(date.getMonth() + 1).padStart(2, '0');
					const d = String(date.getDate()).padStart(2, '0');
					form.date = `${y}-${m}-${d}`;
					// Vide l'heure — les nouveaux slots sont différents
					form.time = '';
				}
			});
		}

		if (!isOpen && flatpickrInstance) {
			flatpickrInstance.destroy();
			flatpickrInstance = null;
		}
	});

	$effect(() => {
		if (isOpen && overlayEl && contentEl) {
			gsap.fromTo(overlayEl, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
			gsap.fromTo(
				contentEl,
				{ y: 40, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.4, ease: 'expo.out', delay: 0.1 }
			);
		}
	});

	function close() {
		if (!overlayEl || !contentEl) return;
		closeDropdowns();
		gsap.to(contentEl, { y: 40, opacity: 0, duration: 0.3, ease: 'expo.in' });
		gsap.to(overlayEl, {
			opacity: 0,
			duration: 0.3,
			delay: 0.1,
			onComplete: () => {
				isOpen = false;
				step = 1;
				success = false;
				form = {
					date: '',
					time: '',
					datetime: '',
					vehicle: '',
					service: '',
					domicile: false,
					address: '',
					options: [],
					name: '',
					email: '',
					phone: '',
					payment: ''
				};
				deplacement = 0;
			}
		});
	}

	function nextStep() {
		closeDropdowns();
		if (step < 4) step++;
	}
	function prevStep() {
		closeDropdowns();
		if (step > 1) step--;
	}

	function toggleOption(opt: string) {
		form.options = form.options.includes(opt)
			? form.options.filter((o) => o !== opt)
			: [...form.options, opt];
	}

	async function submit() {
		loading = true;
		try {
			form.datetime = `${form.date}T${form.time}:00`;
			const res = await fetch('/api/booking', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...form, totalPrice, deplacement })
			});
			const result = await res.json();
			if (result.success) {
				if (result.stripeUrl) {
					window.location.href = result.stripeUrl;
				} else {
					success = true;
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.documentElement.style.overflow = 'hidden';
		} else {
			document.documentElement.style.overflow = '';
		}
	});

	// Style commun pour les dropdowns
	function dropdownStyle(pos: DropdownPos) {
		if (pos.openUp) {
			return `bottom: ${pos.bottom}px; left: ${pos.left}px; width: ${pos.width}px; max-height: 240px;`;
		}
		return `top: ${pos.top}px; left: ${pos.left}px; width: ${pos.width}px; max-height: 240px;`;
	}

	// ── Google Places Autocomplete ──
	let addressSuggestions = $state<{ description: string; place_id: string }[]>([]);
	let showSuggestions = $state(false);
	let searchTimeout: ReturnType<typeof setTimeout>;

	async function searchAddress(query: string) {
		if (query.length < 3) {
			addressSuggestions = [];
			showSuggestions = false;
			return;
		}
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(async () => {
			const res = await fetch(`/api/places?input=${encodeURIComponent(query)}`);
			const data = await res.json();
			addressSuggestions = data.predictions ?? [];
			showSuggestions = addressSuggestions.length > 0;
		}, 300);
	}

	function selectAddress(description: string) {
		form.address = description;
		addressSuggestions = [];
		showSuggestions = false;
	}
</script>

{#if isOpen}
	<!-- Portals dropdowns — z-[600] -->
	{#if timeOpen}
		<div
			class="fixed z-600 overflow-y-auto rounded-xl border border-dark/10 bg-white shadow-xl"
			style={dropdownStyle(dropdownPos)}
		>
			{#if availableTimeSlots.length === 0}
				<p class="px-4 py-4 text-center text-sm text-dark/40">Aucun créneau disponible ce jour</p>
			{:else}
				{#each availableTimeSlots as slot}
					<button
						type="button"
						onclick={() => {
							form.time = slot;
							timeOpen = false;
						}}
						class="block w-full cursor-pointer px-4 py-3 text-left text-sm text-dark hover:bg-secondary-accent {form.time ===
						slot
							? 'font-semibold text-primary'
							: ''}"
					>
						{slot}
					</button>
				{/each}
			{/if}
		</div>
	{/if}

	{#if vehicleOpen}
		<div
			class="fixed z-600 overflow-y-auto rounded-xl border border-dark/10 bg-white shadow-xl"
			style={dropdownStyle(dropdownPos)}
		>
			{#each vehicles as v}
				<button
					type="button"
					onclick={() => {
						form.vehicle = v;
						vehicleOpen = false;
					}}
					class="block w-full cursor-pointer px-4 py-3 text-left text-sm text-dark hover:bg-secondary-accent {form.vehicle ===
					v
						? 'font-semibold text-primary'
						: ''}"
				>
					{v}
				</button>
			{/each}
		</div>
	{/if}

	{#if serviceOpen}
		<div
			class="fixed z-600 overflow-y-auto rounded-xl border border-dark/10 bg-white shadow-xl"
			style={dropdownStyle(dropdownPos)}
		>
			{#each services as s}
				<button
					type="button"
					onclick={() => {
						form.service = s;
						serviceOpen = false;
					}}
					class="block w-full cursor-pointer px-4 py-3 text-left text-sm text-dark hover:bg-secondary-accent {form.service ===
					s
						? 'font-semibold text-primary'
						: ''}"
				>
					{s}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Overlay -->
	<div
		bind:this={overlayEl}
		class="fixed inset-0 z-300 flex items-center justify-center bg-dark/60 px-4"
		role="presentation"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
	>
		<div bind:this={contentEl} class="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
			<!-- Close -->
			<button
				aria-label="button"
				type="button"
				onclick={close}
				class="absolute top-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-dark/5 text-dark/50 transition-colors hover:bg-dark/10 hover:text-dark"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="currentColor"
					viewBox="0 0 256 256"
				>
					<path
						d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
					/>
				</svg>
			</button>

			<div class="max-h-[90vh] overflow-y-auto rounded-3xl p-8">
				{#if success}
					<div class="flex flex-col items-center gap-4 py-8 text-center">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-3xl"
						>
							✓
						</div>
						<h2 class="text-mobile-title-2xl font-bold text-dark">Réservation confirmée!</h2>
						<p class="text-sm text-dark/60">Un email de confirmation a été envoyé à {form.email}</p>
						<button
							type="button"
							onclick={close}
							class="mt-4 cursor-pointer rounded-full bg-dark px-8 py-3 font-semibold text-white"
							>Fermer</button
						>
					</div>
				{:else}
					<!-- Header + Steps -->
					<div class="mb-6">
						<h2 class="text-mobile-title-lg font-bold text-dark">Réserver un lavage</h2>
						<p class="text-sm text-dark/50">Sélectionnez votre créneau et vos options</p>
						<div class="mt-4 flex items-center gap-2">
							{#each [1, 2, 3, 4] as s}
								<div class="flex items-center gap-2">
									<div
										class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors
									{step > s
											? 'bg-primary text-white'
											: step === s
												? 'bg-dark text-white'
												: 'bg-dark/10 text-dark/40'}"
									>
										{#if step > s}✓{:else}{s}{/if}
									</div>
									{#if s < 4}<div
											class="h-px w-6 {step > s ? 'bg-primary' : 'bg-dark/10'}"
										></div>{/if}
								</div>
							{/each}
						</div>
					</div>

					<!-- STEP 1 — Date & Heure -->
					{#if step === 1}
						<div class="flex flex-col gap-4">
							<div class="flex flex-col gap-1">
								<label for="date" class="text-sm font-medium text-dark">Date souhaitée</label>
								<input
									bind:this={dateInputEl}
									type="text"
									placeholder="Sélectionner une date"
									readonly
									class="w-full cursor-pointer rounded-xl border border-dark/10 px-4 py-3 text-sm text-dark outline-none focus:border-primary"
								/>
							</div>

							<div class="flex flex-col gap-1">
								<label for="hour" class="text-sm font-medium text-dark">Heure souhaitée</label>
								<button
									bind:this={timeButtonEl}
									type="button"
									onclick={() => openDropdown(timeButtonEl!, 'time')}
									class="flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors
									{timeOpen ? 'border-primary' : 'border-dark/10 hover:border-primary'}
									{form.time ? 'text-dark' : 'text-dark/40'}"
								>
									<span>{form.time || 'Sélectionner une heure'}</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 256 256"
										class="transition-transform {timeOpen ? 'rotate-180' : ''}"
									>
										<path
											d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
										/>
									</svg>
								</button>
							</div>
						</div>

						<!-- STEP 2 — Véhicule -->
					{:else if step === 2}
						<div class="flex flex-col gap-4">
							<div>
								<h3 class="mb-1 font-bold text-dark">Choisissez votre véhicule</h3>
								<p class="text-sm text-dark/50">Confirmez votre véhicule</p>
							</div>
							<div class="flex flex-col gap-1">
								<label for="car" class="text-sm font-medium text-dark">Type de véhicule</label>
								<button
									bind:this={vehicleButtonEl}
									type="button"
									onclick={() => openDropdown(vehicleButtonEl!, 'vehicle')}
									class="flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors
									{vehicleOpen ? 'border-primary' : 'border-dark/10 hover:border-primary'}
									{form.vehicle ? 'text-dark' : 'text-dark/40'}"
								>
									<span>{form.vehicle || 'Sélectionner votre véhicule'}</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 256 256"
										class="transition-transform {vehicleOpen ? 'rotate-180' : ''}"
									>
										<path
											d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
										/>
									</svg>
								</button>
							</div>
						</div>

						<!-- STEP 3 — Service & Options -->
					{:else if step === 3}
						<div class="flex flex-col gap-4">
							<div>
								<h3 class="mb-1 font-bold text-dark">Choisissez votre service</h3>
								<p class="text-sm text-dark/50">Confirmez les détails de votre lavage</p>
							</div>
							<div class="flex flex-col gap-1">
								<label for="service" class="text-sm font-medium text-dark">Service souhaité</label>
								<button
									bind:this={serviceButtonEl}
									type="button"
									onclick={() => openDropdown(serviceButtonEl!, 'service')}
									class="flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors
									{serviceOpen ? 'border-primary' : 'border-dark/10 hover:border-primary'}
									{form.service ? 'text-dark' : 'text-dark/40'}"
								>
									<span>{form.service || 'Sélectionner un service'}</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 256 256"
										class="transition-transform {serviceOpen ? 'rotate-180' : ''}"
									>
										<path
											d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
										/>
									</svg>
								</button>
							</div>

							<!-- Options -->
							<div class="rounded-xl border border-dark/10 p-4">
								<p class="mb-3 text-sm font-semibold text-dark">Options supplémentaires</p>
								<div class="flex flex-col gap-3">
									{#each Object.entries(optionPrices) as [opt, price]}
										<button
											type="button"
											onclick={() => toggleOption(opt)}
											class="flex cursor-pointer items-center justify-between text-left"
										>
											<div class="flex items-center gap-2">
												<div
													class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors
												{form.options.includes(opt) ? 'border-primary bg-primary text-white' : 'border-dark/20'}"
												>
													{#if form.options.includes(opt)}
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="12"
															height="12"
															fill="currentColor"
															viewBox="0 0 256 256"
														>
															<path
																d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"
															/>
														</svg>
													{/if}
												</div>
												<span class="text-sm text-dark">{opt}</span>
											</div>
											<span class="text-sm font-semibold text-dark">€{price}</span>
										</button>
									{/each}

									<!-- Déplacement à domicile -->
									<button
										type="button"
										onclick={() => {
											form.domicile = !form.domicile;
											if (!form.domicile) {
												form.address = '';
												deplacement = 0;
											}
										}}
										class="flex cursor-pointer items-center justify-between text-left"
									>
										<div class="flex items-center gap-2">
											<div
												class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors
											{form.domicile ? 'border-primary bg-primary text-white' : 'border-dark/20'}"
											>
												{#if form.domicile}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="12"
														height="12"
														fill="currentColor"
														viewBox="0 0 256 256"
													>
														<path
															d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"
														/>
													</svg>
												{/if}
											</div>
											<span class="text-sm text-dark">Déplacement à domicile</span>
										</div>
										<span class="text-sm font-semibold text-dark">+€10/25km</span>
									</button>

									<!-- Adresse domicile -->
									{#if form.domicile}
										<div class="relative mt-1 flex flex-col gap-1 pl-7">
											<input
												type="text"
												bind:value={form.address}
												oninput={(e) => searchAddress((e.target as HTMLInputElement).value)}
												onblur={() => setTimeout(() => (showSuggestions = false), 200)}
												placeholder="Votre adresse complète"
												autocomplete="off"
												class="cursor-text rounded-xl border border-dark/10 px-4 py-3 text-sm text-dark outline-none focus:border-primary"
											/>

											{#if showSuggestions && addressSuggestions.length > 0}
												<div
													class="absolute top-full right-0 left-0 z-700 mt-1 overflow-hidden rounded-xl border border-dark/10 bg-white shadow-xl"
												>
													{#each addressSuggestions as suggestion}
														<button
															type="button"
															onmousedown={() => selectAddress(suggestion.description)}
															class="flex w-full cursor-pointer items-start gap-2 px-4 py-3 text-left text-sm text-dark hover:bg-secondary-accent"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																fill="currentColor"
																viewBox="0 0 256 256"
																class="mt-0.5 shrink-0 text-dark/40"
															>
																<path
																	d="M128,16a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,16Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,192Zm40-104H136V72a8,8,0,0,0-16,0v24H104a8,8,0,0,0,0,16h16v72a8,8,0,0,0,16,0V112h32a8,8,0,0,0,0-16Z"
																/>
															</svg>
															<span>{suggestion.description}</span>
														</button>
													{/each}
												</div>
											{/if}

											{#if deplacement > 0}
												<p class="text-xs text-dark/50">Déplacement calculé: +€{deplacement}</p>
											{/if}
										</div>
									{/if}
								</div>
							</div>

							{#if form.vehicle && form.service}
								<div
									class="flex items-center justify-between rounded-xl bg-secondary-accent px-4 py-3"
								>
									<span class="text-sm font-medium text-dark">Total estimé</span>
									<span class="font-bold text-dark">€{totalPrice}</span>
								</div>
							{/if}
						</div>

						<!-- STEP 4 — Coordonnées -->
					{:else if step === 4}
						<div class="flex flex-col gap-3">
							<div>
								<h3 class="mb-1 font-bold text-dark">Vos coordonnées</h3>
								<p class="text-sm text-dark/50">
									Pour vous contacter et confirmer votre réservation
								</p>
							</div>
							<div class="flex flex-col gap-1">
								<label for="name" class="text-sm font-medium text-dark">Prénom</label>
								<input
									type="text"
									bind:value={form.name}
									placeholder="Jean Dupont"
									autocomplete="name"
									class="cursor-text rounded-xl border border-dark/10 px-4 py-3 text-sm text-dark outline-none focus:border-primary"
								/>
							</div>
							<div class="flex flex-col gap-1">
								<label for="email" class="text-sm font-medium text-dark">Email</label>
								<input
									type="email"
									bind:value={form.email}
									placeholder="jean@example.com"
									autocomplete="email"
									class="cursor-text rounded-xl border border-dark/10 px-4 py-3 text-sm text-dark outline-none focus:border-primary"
								/>
							</div>
							<div class="flex flex-col gap-1">
								<label for="phone" class="text-sm font-medium text-dark">Téléphone</label>
								<input
									type="tel"
									bind:value={form.phone}
									placeholder="+32 4XX XX XX XX"
									autocomplete="tel"
									class="cursor-text rounded-xl border border-dark/10 px-4 py-3 text-sm text-dark outline-none focus:border-primary"
								/>
							</div>

							<p class="text-sm font-medium text-dark">Mode de paiement</p>
							<div class="grid grid-cols-2 gap-3">
								<button
									type="button"
									onclick={() => (form.payment = 'cash')}
									class="flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-4 py-4 transition-colors
									{form.payment === 'cash' ? 'border-dark bg-dark text-white' : 'border-dark/10 text-dark'}"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 256 256"
										><path
											d="M184,89.57V84c0-25.08-37.83-44-88-44S8,58.92,8,84v40c0,20.89,26.25,37.49,64,42.46V172c0,25.08,37.83,44,88,44s88-18.92,88-44V132C248,111.3,222.58,94.68,184,89.57ZM232,132c0,13.22-30.79,28-72,28-3.73,0-7.43-.13-11.08-.37C170.49,151.77,184,139,184,124V105.74C213.87,110.19,232,122.27,232,132ZM72,150.25V126.46A183.74,183.74,0,0,0,96,128a183.74,183.74,0,0,0,24-1.54v23.79A163,163,0,0,1,96,152,163,163,0,0,1,72,150.25Zm96-40.32V124c0,8.39-12.41,17.4-32,22.87V123.5C148.91,120.37,159.84,115.71,168,109.93ZM96,56c41.21,0,72,14.78,72,28s-30.79,28-72,28S24,97.22,24,84,54.79,56,96,56ZM24,124V109.93c8.16,5.78,19.09,10.44,32,13.57v23.37C36.41,141.4,24,132.39,24,124Zm64,48v-4.17c2.63.1,5.29.17,8,.17,3.88,0,7.67-.13,11.39-.35A121.92,121.92,0,0,0,120,171.41v23.46C100.41,189.4,88,180.39,88,172Zm48,26.25V174.4a179.48,179.48,0,0,0,24,1.6,183.74,183.74,0,0,0,24-1.54v23.79a165.45,165.45,0,0,1-48,0Zm64-3.38V171.5c12.91-3.13,23.84-7.79,32-13.57V172C232,180.39,219.59,189.4,200,194.87Z"
										></path></svg
									>
									<span class="text-xs font-medium">Espèces</span>
									<span class="text-xs opacity-70">Paiement sur place</span>
								</button>
								<button
									type="button"
									onclick={() => (form.payment = 'online')}
									class="flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-4 py-4 transition-colors
									{form.payment === 'online' ? 'border-dark bg-dark text-white' : 'border-dark/10 text-dark'}"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 256 256"
										><path
											d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"
										></path></svg
									>
									<span class="text-xs font-medium">En ligne</span>
									<span class="text-xs opacity-70">Carte bancaire</span>
								</button>
							</div>

							<div
								class="flex items-center justify-between rounded-xl bg-secondary-accent px-4 py-3"
							>
								<span class="text-sm font-medium text-dark">Total</span>
								<span class="font-bold text-dark">€{totalPrice}</span>
							</div>
						</div>
					{/if}

					<!-- Navigation -->
					<div class="mt-6 flex items-center justify-between">
						<button
							type="button"
							onclick={prevStep}
							class="cursor-pointer rounded-full border border-dark/20 px-6 py-2.5 text-sm font-semibold text-dark {step ===
							1
								? 'invisible'
								: ''}"
						>
							Retour
						</button>
						{#if step < 4}
							<button
								type="button"
								onclick={nextStep}
								disabled={(step === 1 && (!form.date || !form.time)) ||
									(step === 2 && !form.vehicle) ||
									(step === 3 && !form.service)}
								class="cursor-pointer rounded-full bg-dark px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
							>
								Continuer
							</button>
						{:else}
							<button
								type="button"
								onclick={submit}
								disabled={loading ||
									!form.name ||
									!form.email ||
									!form.phone ||
									!form.payment ||
									(form.domicile && !form.address)}
								class="cursor-pointer rounded-full bg-dark px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
							>
								{loading ? 'Envoi...' : 'Confirmer'}
							</button>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

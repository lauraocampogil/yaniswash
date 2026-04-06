<script lang="ts">
	import { bookingOpen } from '$lib/stores/booking';
	let { title, description, columns, vehicules, extras, button, ctaHref } = $props();
	let selectedColumn = $state(0);
	let dropdownOpen = $state(false);

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function selectColumn(i: number) {
		selectedColumn = i;
		dropdownOpen = false;
	}
</script>

<section id="services" class="bg-background">
	<div
		class="grid-section flex flex-col gap-6 px-5 py-9 xl:gap-x-5 xl:gap-y-0 xl:px-20 xl:py-16 3xl:container 3xl:mx-auto sm:grid sm:grid-cols-8 sm:gap-x-5 sm:px-8 sm:py-12 md:px-10 lg:px-12"
	>
		<!-- Header: col 1-3 -->
		<div
			class="flex flex-col gap-3 xl:col-span-3 xl:col-start-1 xl:self-end xl:pb-6 sm:col-span-5 sm:col-start-1 sm:self-end sm:pb-6"
		>
			<h2 class="text-left text-mobile-title-2xl text-dark xl:text-title-2xl">{title}</h2>
			<p class="text-description text-dark">{description}</p>
		</div>

		<!-- Card: col 2-7 -->
		<div
			class="flex flex-col rounded-2xl sm:col-span-6 sm:col-start-2 sm:row-start-2 lg:col-span-6 lg:col-start-2 lg:row-start-2"
		>
			<!-- Header primary-accent mobile -->
			<div class="relative flex items-center rounded-t-2xl bg-primary-accent px-4 py-4 lg:hidden">
				<div class="relative">
					<button
						type="button"
						onclick={toggleDropdown}
						class="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-mobile-button text-dark"
					>
						{columns[selectedColumn]}
						<span class="text-xs">
							{#if dropdownOpen}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<path
										d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"
									/>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="#000000"
									viewBox="0 0 256 256"
								>
									<path
										d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
									/>
								</svg>
							{/if}
						</span>
					</button>

					{#if dropdownOpen}
						<div class="absolute top-full left-0 z-50 mt-1 min-w-40 rounded-lg bg-white shadow-md">
							{#each columns as col, i}
								<button
									type="button"
									onclick={() => selectColumn(i)}
									class="hover:bg-background-alt block w-full px-4 py-3 text-left text-sm text-dark {selectedColumn ===
									i
										? 'font-semibold'
										: ''}"
								>
									{col}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<img
					src="/assets/svg/mascot/heureux.svg"
					alt="mascotte"
					class="absolute -top-4 right-6 w-16 sm:w-20"
				/>
			</div>

			<!-- Header desktop -->
			<div class="relative hidden rounded-t-2xl bg-primary-accent lg:grid lg:grid-cols-4">
				<div class="px-6 py-5"></div>
				{#each columns as col}
					<div
						class="border-l border-dashed border-dark/20 px-6 py-5 text-center text-mobile-title-lg text-dark"
					>
						{col}
					</div>
				{/each}
				<img
					src="/assets/svg/mascot/heureux.svg"
					alt="mascotte"
					class="absolute -top-12 -right-4 w-20"
				/>
			</div>

			<!-- Tabla mobile -->
			<div class="relative grid grid-cols-2 bg-white px-4 lg:hidden">
				<div
					class="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 border-l border-dashed border-dark/20"
				></div>
				{#each vehicules as v, i}
					<div
						class="flex items-center px-4 py-6 font-bold text-dark {i !== 0
							? 'border-t border-dashed border-dark/20'
							: ''}"
					>
						{v.label}
					</div>
					<div
						class="flex items-center justify-center px-4 py-6 text-mobile-body text-dark {i !== 0
							? 'border-t border-dashed border-dark/20'
							: ''}"
					>
						{selectedColumn === 0 ? v.interieur : selectedColumn === 1 ? v.exterieur : v.combined}
					</div>
				{/each}
			</div>

			<!-- Tabla desktop -->
			<div class="hidden bg-white lg:grid lg:grid-cols-4">
				{#each vehicules as v, i}
					<div
						class="flex items-center px-6 py-9 text-mobile-title-lg text-dark {i !== 0
							? 'border-t border-dashed border-dark/20'
							: ''}"
					>
						{v.label}
					</div>
					<div
						class="flex items-center justify-center border-l border-dashed border-dark/20 px-6 py-9 text-dark {i !==
						0
							? 'border-t border-dashed border-dark/20'
							: ''}"
					>
						{v.interieur}
					</div>
					<div
						class="flex items-center justify-center border-l border-dashed border-dark/20 px-6 py-9 text-dark {i !==
						0
							? 'border-t border-dashed border-dark/20'
							: ''}"
					>
						{v.exterieur}
					</div>
					<div
						class="flex items-center justify-center border-l border-dashed border-dark/20 px-6 py-9 text-dark {i !==
						0
							? 'border-t border-dashed border-dark/20'
							: ''}"
					>
						{v.combined}
					</div>
				{/each}
			</div>

			<!-- CTA + Extras -->
			<div class="flex flex-col gap-6 rounded-b-2xl bg-white px-4 pt-6 pb-6 lg:px-6">
				<div class="flex justify-center">
					<a
						href={ctaHref}
						onclick={(e) => {
							e.preventDefault();
							$bookingOpen = true;
						}}
						class="rounded-full bg-dark px-8 py-3 text-button whitespace-nowrap text-white xl:text-button"
					>
						{button}
					</a>
				</div>
				<ul class="flex flex-col gap-2 text-tag text-dark-accent/70 lg:text-sm">
					{#each extras as extra}
						<li>• {extra.name} — {extra.price}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

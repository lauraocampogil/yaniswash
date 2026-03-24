<script lang="ts">
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

<section class="flex flex-col gap-6 bg-background px-4 py-8 xl:px-20 xl:py-16">
	<!-- Header -->
	<div class="flex flex-col gap-3">
		<h2 class="text-left text-mobile-title-2xl text-dark xl:text-title-2xl">{title}</h2>
		<p class="text-description text-dark">{description}</p>
	</div>

	<!-- Card principal -->
	<div class="flex flex-col rounded-2xl">
		<!-- Header primary-accent -->
		<div class="relative flex items-center rounded-t-2xl bg-primary-accent px-4 py-4 xl:hidden">
			<div class="relative">
				<button
					type="button"
					onclick={toggleDropdown}
					class="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-dark shadow-sm"
				>
					{columns[selectedColumn]}
					<span class="text-xs">{dropdownOpen ? '▲' : '▼'}</span>
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
				class="absolute -top-4 right-4 w-16"
			/>
		</div>

		<!-- Desktop: header con columnas -->
		<div class="relative hidden rounded-t-2xl bg-primary-accent xl:grid xl:grid-cols-4">
			<!-- Líneas verticales del header -->
			<div class="px-6 py-5"></div>
			{#each columns as col}
				<div
					class="border-l border-dashed border-dark/20 px-6 py-5 text-center font-semibold text-dark"
				>
					{col}
				</div>
			{/each}
			<img
				src="/assets/svg/mascot/heureux.svg"
				alt="mascotte"
				class="absolute -top-4 right-6 w-20"
			/>
		</div>

		<!-- Tabla mobile: 2 cols -->
		<div class="relative grid grid-cols-2 bg-white px-4 xl:hidden">
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
					class="text-mobile-body flex items-center justify-center px-4 py-6 text-dark {i !== 0
						? 'border-t border-dashed border-dark/20'
						: ''}"
				>
					{selectedColumn === 0 ? v.interieur : selectedColumn === 1 ? v.exterieur : v.combined}
				</div>
			{/each}
		</div>

		<!-- Tabla desktop: 4 cols -->
		<div class="hidden bg-white xl:grid xl:grid-cols-4">
			{#each vehicules as v, i}
				<div
					class="flex items-center px-6 py-6 font-bold text-dark {i !== 0
						? 'border-t border-dashed border-dark/20'
						: ''}"
				>
					{v.label}
				</div>
				<div
					class="flex items-center justify-center border-l border-dashed border-dark/20 px-6 py-6 text-dark {i !==
					0
						? 'border-t border-dashed border-dark/20'
						: ''}"
				>
					{v.interieur}
				</div>
				<div
					class="flex items-center justify-center border-l border-dashed border-dark/20 px-6 py-6 text-dark {i !==
					0
						? 'border-t border-dashed border-dark/20'
						: ''}"
				>
					{v.exterieur}
				</div>
				<div
					class="flex items-center justify-center border-l border-dashed border-dark/20 px-6 py-6 text-dark {i !==
					0
						? 'border-t border-dashed border-dark/20'
						: ''}"
				>
					{v.combined}
				</div>
			{/each}
		</div>

		<!-- CTA + Extras -->
		<div class="flex flex-col gap-4 rounded-b-2xl bg-white px-4 pt-2 pb-6 xl:px-6">
			<div class="flex justify-center">
				<a href={ctaHref} class="rounded-full bg-dark px-8 py-3 font-semibold text-white">
					{button}
				</a>
			</div>
			<ul class="flex flex-col gap-2 text-sm text-dark">
				{#each extras as extra}
					<li>• {extra.name} — {extra.price}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

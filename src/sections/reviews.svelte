<script lang="ts">
	let { title, description, stats, avatars, avis } = $props();

	let currentIndex = $state(0);
	let sliderPosition = $state(50);

	function prev() {
		currentIndex = (currentIndex - 1 + avis.length) % avis.length;
		sliderPosition = 50;
	}

	function next() {
		currentIndex = (currentIndex + 1) % avis.length;
		sliderPosition = 50;
	}
</script>

<section id="avis" class="flex flex-col bg-dark px-5 py-9">
	<div class="flex flex-col gap-3">
		<h2 class="text-mobile-title-2xl text-white">{title}</h2>
		<p class="text-description text-white">{description}</p>
		<div class="flex flex-col items-start pt-6">
			<div class="inline-flex items-center gap-4 rounded-full bg-secondary-accent py-1 pr-2 pl-4">
				<p class="text-mobile-body text-dark">
					<strong>{stats.note}</strong> étoiles | <strong>{stats.total}</strong> avis
				</p>
				<div class="flex">
					{#each avatars as initial}
						<div
							class="-ml-2.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-dark text-body text-white first:ml-0"
						>
							{initial}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<div
		class="flex justify-end gap-2.5 pt-14 pb-3 xl:col-span-1 xl:col-start-7 xl:justify-end xl:self-end xl:pb-4"
	>
		<button
			type="button"
			aria-label="caret-left"
			onclick={prev}
			class="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-accent text-dark shadow-sm"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M16.207 4.293a1 1 0 0 1 0 1.414L9.914 12l6.293 6.293a1 1 0 0 1-1.414 1.414L8.5 13.414a2 2 0 0 1 0-2.828l6.293-6.293a1 1 0 0 1 1.414 0"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
		<button
			type="button"
			aria-label="caret-right"
			onclick={next}
			class="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-accent text-dark shadow-sm"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M7.793 19.707a1 1 0 0 1 0-1.414L14.086 12L7.793 5.707a1 1 0 0 1 1.414-1.414l6.293 6.293a2 2 0 0 1 0 2.828l-6.293 6.293a1 1 0 0 1-1.414 0"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	<!-- Card review active -->
	<div class="flex flex-col gap-3 rounded-2xl bg-white p-5">
		<p class="text-mobile-body text-dark">{avis[currentIndex].text}</p>
		<p class="text-sm font-semibold text-dark">{avis[currentIndex].name}</p>
	</div>
</section>

<script lang="ts">
	let { title, description, stats, avatars, avis } = $props();

	let currentIndex = $state(0);

	function prev() {
		currentIndex = (currentIndex - 1 + avis.length) % avis.length;
	}

	function next() {
		currentIndex = (currentIndex + 1) % avis.length;
	}
</script>

<section id="reviews" class="bg-dark">
	<div
		class="block gap-6 px-5 py-9
    xl:grid-cols-8 xl:gap-x-5 xl:px-20 xl:py-16
    3xl:container 3xl:mx-auto
    sm:grid sm:grid-cols-8 sm:gap-x-5 sm:gap-y-6
    max-xl:sm:px-8 max-xl:sm:py-12"
	>
		<!-- Header: sm col 1-6 / xl col 1-4 -->
		<div
			class="mb-6 flex flex-col gap-3
			xl:col-span-4 xl:col-start-1 xl:self-end sm:col-span-6
			sm:col-start-1 sm:mb-0 sm:self-end"
		>
			<h2 class="text-mobile-title-2xl text-white xl:text-title-2xl">{title}</h2>
			<p class="text-description text-white">{description}</p>
			<div class="flex flex-col items-start pt-4">
				<div class="inline-flex items-center gap-4 rounded-full bg-secondary-accent py-1 pr-2 pl-4">
					<p class="text-mobile-body text-dark">
						<strong>{stats.note}</strong> étoiles | <strong>{stats.total}</strong> avis
					</p>
					<div class="flex">
						{#each avatars as initial}
							<div
								class="-ml-2.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-dark text-mobile-tag font-bold text-white first:ml-0"
							>
								{initial}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Flèches: sm col 7-8 / xl col 7-8 -->
		<div
			class="mb-4 flex justify-end gap-2.5
			xl:col-span-2 xl:col-start-7 xl:self-end xl:pb-1 sm:col-span-2
			sm:col-start-7 sm:mb-0 sm:self-end sm:pb-1"
		>
			<button
				type="button"
				aria-label="caret-left"
				onclick={prev}
				class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-secondary-accent text-dark shadow-sm"
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
				class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-secondary-accent text-dark shadow-sm"
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

		<div
			class="flex flex-col gap-3 rounded-2xl bg-white p-5
    xl:col-span-3 xl:col-start-6 xl:row-start-2
    xl:p-8 max-xl:sm:col-span-5 max-xl:sm:col-start-4 max-xl:sm:row-start-2"
		>
			<p class="text-mobile-body text-dark xl:text-body">{avis[currentIndex].text}</p>
			<p class="text-sm font-semibold text-dark">{avis[currentIndex].name}</p>
		</div>
	</div>
</section>

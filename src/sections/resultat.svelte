<script lang="ts">
	let { title, description, slides } = $props();

	let currentIndex = $state(0);
	let sliderPosition = $state(50);
	let dragging = $state(false);
	let sliderEl: HTMLElement;

	function prev() {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		sliderPosition = 50;
	}

	function next() {
		currentIndex = (currentIndex + 1) % slides.length;
		sliderPosition = 50;
	}

	function onMouseMove(e: MouseEvent) {
		if (!dragging) return;
		const rect = sliderEl.getBoundingClientRect();
		sliderPosition = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
	}

	$effect(() => {
		function handleTouchMove(e: TouchEvent) {
			e.preventDefault();
			const rect = sliderEl.getBoundingClientRect();
			sliderPosition = Math.min(
				100,
				Math.max(0, ((e.touches[0].clientX - rect.left) / rect.width) * 100)
			);
		}

		sliderEl.addEventListener('touchmove', handleTouchMove, { passive: false });
		return () => sliderEl.removeEventListener('touchmove', handleTouchMove);
	});
</script>

<section id="#resultat" class="bg-primary">
	<div
		class="grid-section flex flex-col overflow-hidden px-5 py-9 xl:gap-x-5 xl:gap-y-0 xl:px-20 xl:py-16 3xl:container 3xl:mx-auto"
	>
		<!-- Header: col 1-3 -->
		<div class="flex flex-col gap-3 pb-8 xl:col-span-3 xl:col-start-1 xl:self-end xl:pb-18">
			<h2 class="text-mobile-title-2xl text-white xl:text-title-2xl">{title}</h2>
			<p class="text-description text-white">{description}</p>
		</div>

		<!-- Flèches: col 7, alignées en bas près de l'image -->
		<div
			class="flex justify-end gap-2.5 pb-3 xl:col-span-1 xl:col-start-7 xl:justify-end xl:self-end xl:pb-4"
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

		<!-- Slider: col 2-7, max-h-[500px] -->
		<div
			bind:this={sliderEl}
			role="slider"
			aria-valuenow={sliderPosition}
			aria-valuemin={0}
			aria-valuemax={100}
			tabindex="0"
			class="relative max-h-135 overflow-hidden rounded-2xl select-none xl:col-span-6 xl:col-start-2 xl:row-start-2"
			onmousedown={() => (dragging = true)}
			onmouseup={() => (dragging = false)}
			onmouseleave={() => (dragging = false)}
			onmousemove={onMouseMove}
		>
			<img
				src={slides[currentIndex].after}
				alt={slides[currentIndex].alt}
				class="block h-full w-full object-cover"
			/>

			<div class="absolute inset-0" style="clip-path: inset(0 {100 - sliderPosition}% 0 0)">
				<img
					src={slides[currentIndex].before}
					alt={slides[currentIndex].alt}
					class="h-full w-full object-cover"
				/>
			</div>

			<div
				class="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white"
				style="left: {sliderPosition}%"
			>
				<div
					class="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
						<path
							fill="#151D3C"
							fill-rule="evenodd"
							d="M16.207 4.293a1 1 0 0 1 0 1.414L9.914 12l6.293 6.293a1 1 0 0 1-1.414 1.414L8.5 13.414a2 2 0 0 1 0-2.828l6.293-6.293a1 1 0 0 1 1.414 0"
							clip-rule="evenodd"
						/>
					</svg>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
						<path
							fill="#151D3C"
							fill-rule="evenodd"
							d="M7.793 19.707a1 1 0 0 1 0-1.414L14.086 12L7.793 5.707a1 1 0 0 1 1.414-1.414l6.293 6.293a2 2 0 0 1 0 2.828l-6.293 6.293a1 1 0 0 1-1.414 0"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>
</section>

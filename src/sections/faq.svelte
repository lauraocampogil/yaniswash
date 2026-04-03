<script lang="ts">
	import gsap from 'gsap';

	let { title, description, faqs } = $props();

	let openQuestion = $state<number | null>(null);

	function toggleFaq(index: number, card: HTMLElement) {
		const answerEl = card.querySelector('[data-answer]') as HTMLElement;
		const arrowEl = card.querySelector('[data-arrow]') as HTMLElement;

		gsap.killTweensOf(answerEl);
		gsap.killTweensOf(arrowEl);

		if (openQuestion === index) {
			openQuestion = null;
			gsap.to(arrowEl, { rotation: 0, duration: 0.35, ease: 'expo.inOut' });
			gsap.to(answerEl, { height: 0, opacity: 0, duration: 0.65, ease: 'expo.inOut' });
		} else {
			if (openQuestion !== null) {
				const prevCard = document.querySelector(`[data-card="${openQuestion}"]`) as HTMLElement;
				if (prevCard) {
					const prevAnswer = prevCard.querySelector('[data-answer]') as HTMLElement;
					const prevArrow = prevCard.querySelector('[data-arrow]') as HTMLElement;
					gsap.killTweensOf(prevAnswer);
					gsap.killTweensOf(prevArrow);
					gsap.to(prevArrow, { rotation: 0, duration: 0.35, ease: 'expo.inOut' });
					gsap.to(prevAnswer, { height: 0, opacity: 0, duration: 0.65, ease: 'expo.inOut' });
				}
			}

			openQuestion = index;
			gsap.to(arrowEl, { rotation: 45, duration: 0.45, ease: 'expo.inOut' });
			gsap.fromTo(
				answerEl,
				{ height: 0, opacity: 0 },
				{ height: 'auto', opacity: 1, duration: 0.65, ease: 'expo.inOut' }
			);
		}
	}
</script>

<section
	id="faq"
	class="grid-section bg-background px-5 py-9 xl:gap-x-5 xl:px-20 xl:py-16 3xl:container 3xl:mx-auto sm:px-8 sm:py-12"
>
	<h2
		class="pb-2.5 text-mobile-title-2xl text-dark xl:col-span-4 xl:col-start-1 xl:row-start-1 xl:pb-4 xl:text-title-2xl"
	>
		{title}
	</h2>

	<p
		class="pb-8 text-description text-dark xl:col-span-4 xl:col-start-1 xl:row-start-2 xl:self-start xl:pr-16 xl:pb-0"
	>
		{description}
	</p>

	<div class="flex flex-col gap-3 xl:col-span-4 xl:col-start-5 xl:row-start-2">
		{#each faqs as faq, i}
			<div
				data-card={i}
				role="button"
				tabindex="0"
				class="cursor-pointer rounded-2xl bg-white px-5 py-4"
				onclick={(e) => toggleFaq(i, e.currentTarget as HTMLElement)}
				onkeydown={(e) => e.key === 'Enter' && toggleFaq(i, e.currentTarget as HTMLElement)}
			>
				<div class="flex w-full items-center justify-between gap-4">
					<span class="text-mobile-question font-medium text-dark">{faq.question}</span>
					<span data-arrow={i} class="shrink-0 text-dark">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path
								d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
							/>
						</svg>
					</span>
				</div>

				<div
					data-answer={i}
					class="overflow-hidden text-mobile-body text-dark/70"
					style="height: 0; opacity: 0"
				>
					<p class="pt-3 pb-1">{faq.answer}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

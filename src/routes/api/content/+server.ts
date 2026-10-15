import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';

export async function GET() {
	const headers = { Authorization: `Bearer ${DIRECTUS_TOKEN}` };

	const [
		heroRes,
		servicesRes,
		resultsRes,
		resultsSlidesRes,
		reviewsSectionRes,
		reviewsRes,
		faqSectionRes,
		faqRes,
		footerRes
	] = await Promise.all([
		fetch(`${DIRECTUS_URL}/items/hero`, { headers }),
		fetch(`${DIRECTUS_URL}/items/services_section`, { headers }),
		fetch(`${DIRECTUS_URL}/items/results_section`, { headers }),
		fetch(`${DIRECTUS_URL}/items/results_slides?sort=sort`, { headers }),
		fetch(`${DIRECTUS_URL}/items/reviews_section`, { headers }),
		fetch(`${DIRECTUS_URL}/items/reviews?sort=sort`, { headers }),
		fetch(`${DIRECTUS_URL}/items/faq_section`, { headers }),
		fetch(`${DIRECTUS_URL}/items/faq?sort=sort`, { headers }),
		fetch(`${DIRECTUS_URL}/items/footer_section`, { headers })
	]);

	const [hero, services, results, resultsSlides, reviewsSection, reviews, faqSection, faq, footer] =
		await Promise.all([
			heroRes.json(),
			servicesRes.json(),
			resultsRes.json(),
			resultsSlidesRes.json(),
			reviewsSectionRes.json(),
			reviewsRes.json(),
			faqSectionRes.json(),
			faqRes.json(),
			footerRes.json()
		]);

	return new Response(
		JSON.stringify({
			hero: hero.data,
			services: services.data,
			results: results.data,
			resultsSlides: resultsSlides.data,
			reviewsSection: reviewsSection.data,
			reviews: reviews.data,
			faqSection: faqSection.data,
			faq: faq.data,
			footer: footer.data
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
}

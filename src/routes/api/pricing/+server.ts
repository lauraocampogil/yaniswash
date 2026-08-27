import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';

export async function GET() {
	const [pricingRes, optionsRes] = await Promise.all([
		fetch(`${DIRECTUS_URL}/items/pricing`, {
			headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
		}),
		fetch(`${DIRECTUS_URL}/items/options_pricing`, {
			headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
		})
	]);

	const [pricingData, optionsData] = await Promise.all([pricingRes.json(), optionsRes.json()]);

	return new Response(
		JSON.stringify({
			pricing: pricingData.data ?? [],
			options: optionsData.data ?? []
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
}

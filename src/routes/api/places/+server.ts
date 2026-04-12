import { GOOGLE_PLACES_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const input = url.searchParams.get('input') ?? '';

	if (input.length < 3) {
		return new Response(JSON.stringify({ predictions: [] }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const res = await fetch(
		`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&components=country:be&language=fr&key=${GOOGLE_PLACES_API_KEY}`
	);

	const data = await res.json();

	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' }
	});
};

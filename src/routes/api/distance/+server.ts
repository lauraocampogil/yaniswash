import { GOOGLE_PLACES_API_KEY } from '$env/static/private';

export async function GET({ url }) {
	const origin = url.searchParams.get('origin') ?? '';
	const destination = url.searchParams.get('destination') ?? '';

	const res = await fetch(
		`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=metric&key=${GOOGLE_PLACES_API_KEY}`
	);

	const data = await res.json();
	const element = data.rows?.[0]?.elements?.[0];

	if (element?.status === 'OK') {
		const distance_km = element.distance.value / 1000;
		return new Response(JSON.stringify({ distance_km }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ distance_km: 0 }), {
		headers: { 'Content-Type': 'application/json' }
	});
}

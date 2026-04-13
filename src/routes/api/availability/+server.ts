import { CAL_API_KEY, CAL_EVENT_TYPE_ID } from '$env/static/private';

export async function GET() {
	const res = await fetch(
		`https://api.cal.com/v2/bookings?eventTypeId=${CAL_EVENT_TYPE_ID}&status=accepted&limit=100`,
		{
			headers: {
				Authorization: `Bearer ${CAL_API_KEY}`,
				'cal-api-version': '2024-08-13'
			}
		}
	);

	const data = await res.json();
	const booked: Record<string, string[]> = {};

	for (const booking of data.data ?? []) {
		const dt = new Date(booking.start);
		const date = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
		const time = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
		if (!booked[date]) booked[date] = [];
		booked[date].push(time);
	}

	return new Response(JSON.stringify(booked), {
		headers: { 'Content-Type': 'application/json' }
	});
}

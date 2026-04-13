import { CAL_API_KEY, CAL_EVENT_TYPE_ID } from '$env/static/private';

export async function GET() {
	const res = await fetch(
		`https://api.cal.com/v2/bookings?eventTypeId=${CAL_EVENT_TYPE_ID}&status=upcoming&limit=100`,
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
		if (booking.status === 'cancelled') continue;

		const dt = new Date(booking.start);

		// Convertit en heure Brussels
		const brusselsDT = new Intl.DateTimeFormat('sv-SE', {
			timeZone: 'Europe/Brussels',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		}).format(dt);

		// sv-SE donne format "2026-04-18 09:00"
		const [datePart, timePart] = brusselsDT.split(' ');
		const time = timePart.substring(0, 5); // "09:00"

		console.log(`UTC: ${booking.start} → Brussels: ${datePart} ${time}`);

		if (!booked[datePart]) booked[datePart] = [];
		booked[datePart].push(time);
	}

	console.log('Booked slots:', JSON.stringify(booked));

	return new Response(JSON.stringify(booked), {
		headers: { 'Content-Type': 'application/json' }
	});
}

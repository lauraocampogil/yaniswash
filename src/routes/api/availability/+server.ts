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
		// Convertit UTC → Europe/Brussels
		const dt = new Date(booking.start);

		const brusselsDate = new Intl.DateTimeFormat('fr-BE', {
			timeZone: 'Europe/Brussels',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(dt);

		const brusselsTime = new Intl.DateTimeFormat('fr-BE', {
			timeZone: 'Europe/Brussels',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		}).format(dt);

		// Convertit dd/mm/yyyy → yyyy-mm-dd
		const [day, month, year] = brusselsDate.split('/');
		const date = `${year}-${month}-${day}`;

		// Normalise le format heure (ex: "08:00" ou "8:00" → "08:00")
		const [h, m] = brusselsTime.split(':');
		const time = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;

		if (!booked[date]) booked[date] = [];
		booked[date].push(time);
	}

	return new Response(JSON.stringify(booked), {
		headers: { 'Content-Type': 'application/json' }
	});
}

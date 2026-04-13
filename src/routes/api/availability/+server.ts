import { CAL_API_KEY, CAL_EVENT_TYPE_ID } from '$env/static/private';

export async function GET() {
	const today = new Date();
	const in60days = new Date();
	in60days.setDate(today.getDate() + 60);

	// Récupère les slots disponibles depuis Cal.com
	const slotsRes = await fetch(
		`https://api.cal.com/v2/slots/available?eventTypeId=${CAL_EVENT_TYPE_ID}&startTime=${today.toISOString()}&endTime=${in60days.toISOString()}`,
		{
			headers: {
				Authorization: `Bearer ${CAL_API_KEY}`,
				'cal-api-version': '2024-08-13'
			}
		}
	);

	const slotsData = await slotsRes.json();
	console.log('Slots Cal.com:', JSON.stringify(slotsData, null, 2));

	// slots est un objet { "2026-04-18": [{ time: "2026-04-18T06:00:00.000Z" }, ...] }
	const slots = slotsData.data?.slots ?? {};

	// Dates indisponibles (aucun slot)
	const unavailableDates: string[] = [];

	// Slots disponibles par date { "2026-04-18": ["08:00", "09:30", ...] }
	const availableSlots: Record<string, string[]> = {};

	// Pour chaque jour des 60 prochains jours
	for (let i = 1; i <= 60; i++) {
		const d = new Date(today);
		d.setDate(today.getDate() + i);

		const dateStr = new Intl.DateTimeFormat('sv-SE', {
			timeZone: 'Europe/Brussels',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(d);

		const daySlots = slots[dateStr] ?? [];

		if (daySlots.length === 0) {
			unavailableDates.push(dateStr);
		} else {
			// Convertit les heures UTC en heures Brussels
			availableSlots[dateStr] = daySlots.map((slot: { time: string }) => {
				const dt = new Date(slot.time);
				return new Intl.DateTimeFormat('sv-SE', {
					timeZone: 'Europe/Brussels',
					hour: '2-digit',
					minute: '2-digit',
					hour12: false
				})
					.format(dt)
					.substring(0, 5);
			});
		}
	}

	console.log('unavailableDates:', unavailableDates);
	console.log('availableSlots:', JSON.stringify(availableSlots));

	return new Response(JSON.stringify({ unavailableDates, availableSlots }), {
		headers: { 'Content-Type': 'application/json' }
	});
}

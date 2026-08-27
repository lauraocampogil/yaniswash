import { DIRECTUS_URL, DIRECTUS_TOKEN } from '$env/static/private';

export async function GET() {
	const [bookingsRes, vacationsRes, settingsRes] = await Promise.all([
		fetch(`${DIRECTUS_URL}/items/bookings?filter[status][_neq]=cancelled&fields=datetime`, {
			headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
		}),
		fetch(`${DIRECTUS_URL}/items/vacations`, {
			headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
		}),
		fetch(`${DIRECTUS_URL}/items/settings?limit=1`, {
			headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` }
		})
	]);

	const [bookingsData, vacationsData, settingsData] = await Promise.all([
		bookingsRes.json(),
		vacationsRes.json(),
		settingsRes.json()
	]);

	const settings = settingsData.data?.[0] ?? {
		opening_time: '08:00',
		closing_time: '22:00',
		slot_duration: 120,
		monday: true,
		tuesday: true,
		wednesday: true,
		thursday: true,
		friday: true,
		saturday: true,
		sunday: false
	};

	const workingDays: Record<number, boolean> = {
		0: settings.sunday,
		1: settings.monday,
		2: settings.tuesday,
		3: settings.wednesday,
		4: settings.thursday,
		5: settings.friday,
		6: settings.saturday
	};

	// Créneaux réservés par date
	const booked: Record<string, string[]> = {};
	for (const booking of bookingsData.data ?? []) {
		if (!booking.datetime) continue;
		const dt = new Date(booking.datetime);
		const brusselsDT = new Intl.DateTimeFormat('sv-SE', {
			timeZone: 'Europe/Brussels',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		}).format(dt);
		const [datePart, timePart] = brusselsDT.split(' ');
		const time = timePart.substring(0, 5);
		if (!booked[datePart]) booked[datePart] = [];
		booked[datePart].push(time);
	}

	// Dates bloquées par vacances
	const vacationDates: string[] = [];
	for (const vacation of vacationsData.data ?? []) {
		const start = new Date(vacation.start_date);
		const end = new Date(vacation.end_date);
		for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
			vacationDates.push(
				new Intl.DateTimeFormat('sv-SE', {
					timeZone: 'Europe/Brussels',
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				}).format(d)
			);
		}
	}

	// Génère tous les slots selon les settings
	const openHour = parseInt(settings.opening_time?.substring(0, 2) ?? '8');
	const closeHour = parseInt(settings.closing_time?.substring(0, 2) ?? '20');
	const slotDuration = settings.slot_duration ?? 90;

	const allSlots: string[] = [];
	for (
		let minutes = openHour * 60;
		minutes + slotDuration <= closeHour * 60;
		minutes += slotDuration
	) {
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		allSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
	}

	// Heure actuelle à Bruxelles
	const now = new Date();
	const nowBrussels = new Intl.DateTimeFormat('sv-SE', {
		timeZone: 'Europe/Brussels',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(now);
	const [todayStr, nowTimeStr] = nowBrussels.split(' ');
	const currentMinutes =
		parseInt(nowTimeStr.substring(0, 2)) * 60 + parseInt(nowTimeStr.substring(3, 5));

	// Slots disponibles par date pour les 60 prochains jours
	const unavailableDates: string[] = [];
	const availableSlots: Record<string, string[]> = {};
	const today = new Date();

	for (let i = 0; i <= 60; i++) {
		const d = new Date(today);
		d.setDate(today.getDate() + i);

		const dateStr = new Intl.DateTimeFormat('sv-SE', {
			timeZone: 'Europe/Brussels',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		}).format(d);

		const dayOfWeek = d.getDay();

		// Jour non travaillé ou vacances
		if (!workingDays[dayOfWeek] || vacationDates.includes(dateStr)) {
			unavailableDates.push(dateStr);
			continue;
		}

		const bookedForDay = booked[dateStr] ?? [];
		let available = allSlots.filter((slot) => !bookedForDay.includes(slot));

		// Si c'est aujourd'hui, filtre les créneaux passés
		if (dateStr === todayStr) {
			available = available.filter((slot) => {
				const slotMinutes = parseInt(slot.substring(0, 2)) * 60 + parseInt(slot.substring(3, 5));
				return slotMinutes > currentMinutes;
			});
		}

		if (available.length === 0) {
			unavailableDates.push(dateStr);
		} else {
			availableSlots[dateStr] = available;
		}
	}

	return new Response(JSON.stringify({ unavailableDates, availableSlots }), {
		headers: { 'Content-Type': 'application/json' }
	});
}

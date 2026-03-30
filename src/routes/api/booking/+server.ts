import { CAL_API_KEY, CAL_EVENT_TYPE_ID, STRIPE_PAYMENT_LINK } from '$env/static/private';

export async function POST({ request }) {
	const data = await request.json();

	async function createCalBooking() {
		const response = await fetch('https://api.cal.com/v1/bookings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${CAL_API_KEY}`
			},
			body: JSON.stringify({
				eventTypeId: Number(CAL_EVENT_TYPE_ID),
				start: data.datetime,
				responses: {
					name: data.name,
					email: data.email,
					phone: data.phone,
					location: data.address || 'À la station'
				},
				metadata: {
					vehicle: data.vehicle,
					service: data.service,
					options: data.options?.join(', ') || '',
					payment: data.payment,
					total: data.totalPrice
				},
				timeZone: 'Europe/Brussels',
				language: 'fr'
			})
		});
		return response.json();
	}

	try {
		if (data.payment === 'cash') {
			await createCalBooking();
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		} else {
			// Stripe d'abord — Cal.com après confirmation paiement
			return new Response(JSON.stringify({ success: true, stripeUrl: STRIPE_PAYMENT_LINK }), {
				status: 200
			});
		}
	} catch (error) {
		console.error('Booking error:', error);
		return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
	}
}

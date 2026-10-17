import {
	DIRECTUS_URL,
	DIRECTUS_TOKEN,
	RESEND_API_KEY,
	STRIPE_SECRET_KEY
} from '$env/static/private';

// ─── Templates HTML ───────────────────────────────────────

function emailBase(content: string) {
	return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#151d3c;padding:32px;text-align:center;">
            <img src="https://yaniswash.be/assets/svg/Logo-vertical_blanc.svg" alt="YanisWash" height="60" style="display:block;margin:auto;border:0;" />
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:32px 40px;">
            ${content}
          </td>
        </tr>

<!-- Signature -->
<tr>
  <td style="padding:0;">
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
      <tr>
        <!-- Logo horizontal -->
        <td style="padding:0 15px;background-color:#f5f6ff;width:40%;vertical-align:middle;">
          <img src="https://yaniswash.be/assets/svg/Logo-horizontal.svg" alt="YanisWash" width="140" style="display:block;border:0;max-width:100%;" />
        </td>
        <!-- Infos contact -->
        <td style="padding:20px 15px;vertical-align:middle;background-color:#151d3c;width:60%;">
                  <p style="margin:0 0 6px;font-size:14px;font-family:Arial,sans-serif;">
                    <a href="tel:+32491739789" style="color:#e3e3e3;text-decoration:none;">+32 491 73 97 89</a>
                  </p>
                  <p style="margin:0 0 6px;font-size:14px;font-family:Arial,sans-serif;">
                    <a href="mailto:yaniswash@gmail.com" style="color:#e3e3e3;text-decoration:none;">yaniswash@gmail.com</a>
                  </p>
                  <p style="margin:0 0 6px;font-size:14px;font-family:Arial,sans-serif;">
                    <a href="https://maps.google.com/?q=Rue+des+Maraichers+5,+1070+Bruxelles" style="color:#e3e3e3;text-decoration:none;" target="_blank">Rue des Maraichers 5, 1070 Bruxelles</a>
                  </p>
                  <p style="margin:0;font-size:14px;font-family:Arial,sans-serif;">
                    <a href="https://yaniswash.be" style="color:#8fadff;text-decoration:none;" target="_blank">yaniswash.be</a>
                  </p>
                </td>
              </tr>
            </table>
            <!-- Bannière -->
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#8fadff;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;text-align:center;">
                  <p style="margin:0;font-size:12px;font-weight:600;color:#151d3c;font-family:Arial,sans-serif;">
                    Lavage automobile à Bruxelles — Du lundi au dimanche 8h–22h
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Email 1: Confirmation client ─────────────────────────
function confirmationClientHtml(data: any) {
	return emailBase(`
        <h1 style="margin:0 0 8px;font-size:24px;color:#151d3c;">Réservation confirmée!</h1>
        <p style="margin:0 0 24px;color:#666;font-size:15px;">Bonjour <strong>${data.name}</strong>, votre lavage est bien réservé.</p>
        
        <table width="100%" style="background:#f4f4f8;border-radius:16px;padding:20px;margin-bottom:24px;" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📅 Date</span><br>
            <strong style="color:#151d3c;">${formatDate(data.date)}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">⏰ Heure</span><br>
            <strong style="color:#151d3c;">${data.time}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📍 Lieu</span><br>
            <strong style="color:#151d3c;">${data.domicile && data.address ? data.address : 'Rue des Maraichers 5, 1070 Anderlecht'}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">🚗 Véhicule & service</span><br>
            <strong style="color:#151d3c;">${data.vehicle} — ${data.service}</strong>
          </td></tr>
          ${
						data.options?.length
							? `<tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">➕ Options</span><br>
            <strong style="color:#151d3c;">${data.options.join(', ')}</strong>
          </td></tr>`
							: ''
					}
          <tr><td style="padding:6px 0;border-top:1px solid #e0e0e0;margin-top:8px;">
            <span style="color:#999;font-size:13px;">💶 Total</span><br>
            <strong style="color:#151d3c;font-size:18px;">€${data.totalPrice}</strong>
          </td></tr>
        </table>

        <p style="color:#666;font-size:14px;margin:0 0 24px;">
          Une question ou besoin de modifier votre rendez-vous ?<br>
          Contactez YanisWash directement:
        </p>
        <table cellpadding="0" cellspacing="0"><tr>
          <td>
            <a href="tel:+32491739789" style="display:inline-block;background:#151d3c;color:#fff;text-decoration:none;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;">
              📞 +32 491 73 97 89
            </a>
          </td>
        </tr></table>
    `);
}

// ─── Email 2: Rappel 24h avant ─────────────────────────────
function rappelHtml(data: any) {
	return emailBase(`
        <h1 style="margin:0 0 8px;font-size:24px;color:#151d3c;">Votre lavage est demain !</h1>
        <p style="margin:0 0 24px;color:#666;font-size:15px;">Bonjour <strong>${data.name}</strong>, on vous rappelle votre rendez-vous.</p>
        
        <table width="100%" style="background:#f4f4f8;border-radius:16px;padding:20px;margin-bottom:24px;" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📅 Date</span><br>
            <strong style="color:#151d3c;">${formatDate(data.date)}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">⏰ Heure</span><br>
            <strong style="color:#151d3c;">${data.time}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📍 Lieu</span><br>
            <strong style="color:#151d3c;">${data.domicile && data.address ? data.address : 'Rue des Maraichers 5, 1070 Anderlecht'}</strong>
          </td></tr>
        </table>

        <p style="color:#666;font-size:14px;margin:0 0 8px;">
          Besoin d'annuler ou reporter ? Prévenez-nous <strong>au moins 24h à l'avance</strong> :
        </p>
        <table cellpadding="0" cellspacing="0"><tr>
          <td>
            <a href="tel:+32491739789" style="display:inline-block;background:#151d3c;color:#fff;text-decoration:none;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;">
              📞 +32 491 73 97 89
            </a>
          </td>
        </tr></table>
    `);
}

// ─── Email 3: Google Review ────────────────────────────────
const GOOGLE_REVIEW_LINK = 'https://g.page/r/XXXXXXXX/review'; // ← remplace par le vrai lien

function reviewHtml(data: any) {
	return emailBase(`
        <h1 style="margin:0 0 8px;font-size:24px;color:#151d3c;">Comment s'est passé votre lavage ?</h1>
        <p style="margin:0 0 24px;color:#666;font-size:15px;">
          Bonjour <strong>${data.name}</strong>,<br><br>
          Merci d'avoir choisi YanisWash pour votre <strong>${data.vehicle}</strong> !
          Votre avis aide d'autres clients à nous trouver sur Google 🙏
        </p>
        
        <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>
          <td>
            <a href="${GOOGLE_REVIEW_LINK}" style="display:inline-block;background:#151d3c;color:#fff;text-decoration:none;padding:14px 20px;border-radius:100px;font-size:15px;font-weight:700;">
              ⭐ Laisser un avis Google
            </a>
          </td>
        </tr></table>

        <p style="color:#999;font-size:13px;margin:0;">
          Cela prend moins d'une minute et fait vraiment la différence. Merci !
        </p>
    `);
}

// ─── Email 4: Notification Yanis ──────────────────────────
function notificationYanisHtml(data: any) {
	return emailBase(`
        <h1 style="margin:0 0 8px;font-size:24px;color:#151d3c;">Nouvelle réservation !</h1>
        <p style="margin:0 0 24px;color:#666;font-size:15px;">Un nouveau client vient de réserver.</p>
        
        <table width="100%" style="background:#f4f4f8;border-radius:16px;padding:20px;margin-bottom:24px;" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">👤 Client</span><br>
            <strong style="color:#151d3c;">${data.name}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📧 Email</span><br>
            <strong style="color:#151d3c;">${data.email}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📞 Téléphone</span><br>
            <strong style="color:#151d3c;">${data.phone}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📅 Date & heure</span><br>
            <strong style="color:#151d3c;">${formatDate(data.date)} à ${data.time}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">📍 Lieu</span><br>
            <strong style="color:#151d3c;">${data.domicile && data.address ? `🏠 Domicile — ${data.address}` : '🏪 Station YanisWash'}</strong>
          </td></tr>
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">🚗 Véhicule & service</span><br>
            <strong style="color:#151d3c;">${data.vehicle} — ${data.service}</strong>
          </td></tr>
          ${
						data.options?.length
							? `<tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">➕ Options</span><br>
            <strong style="color:#151d3c;">${data.options.join(', ')}</strong>
          </td></tr>`
							: ''
					}
          <tr><td style="padding:6px 0;">
            <span style="color:#999;font-size:13px;">💳 Paiement</span><br>
            <strong style="color:#151d3c;">${data.payment === 'cash' ? '💵 Espèces sur place' : '💳 En ligne (Stripe)'}</strong>
          </td></tr>
          <tr><td style="padding:10px 0 0;border-top:1px solid #e0e0e0;">
            <span style="color:#999;font-size:13px;">💶 Total</span><br>
            <strong style="color:#151d3c;font-size:20px;">€${data.totalPrice}</strong>
          </td></tr>
        </table>

        <table cellpadding="0" cellspacing="0"><tr>
          <td>
            <a href="http://directus-detgvouevteyensdyeklh8hr.128.140.85.57.sslip.io/admin/settings/flows/c0caa6c5-ef49-41c9-b733-d65a334bc265" style="display:inline-block;background:#151d3c;color:#fff;text-decoration:none;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;">
              Voir sur Directus →
            </a>
          </td>
        </tr></table>
    `);
}

// ─── Helper date ──────────────────────────────────────────
function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString('fr-BE', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// ─── Resend sender ────────────────────────────────────────
async function sendEmail({
	to,
	subject,
	html,
	scheduledAt
}: {
	to: string;
	subject: string;
	html: string;
	scheduledAt?: string;
}) {
	await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${RESEND_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: 'YanisWash <noreply@yaniswash.be>',
			to,
			subject,
			html,
			...(scheduledAt && { scheduled_at: scheduledAt })
		})
	});
}

// ─── Directus booking ─────────────────────────────────────
async function createDirectusBooking(data: any, stripeSessionId?: string) {
	const month = parseInt(data.date.split('-')[1]);
	const offset = month >= 3 && month <= 10 ? '+02:00' : '+01:00';
	const datetime = `${data.date}T${data.time}:00${offset}`;

	console.log('vehicule envoyé:', data.vehicle?.toLowerCase().replace('*', 'x'));

	console.log(
		'Sending to Directus:',
		JSON.stringify({
			name: data.name,
			email: data.email,
			datetime: datetime,
			vehicule: data.vehicle?.toLowerCase().replace('*', 'x'),
			service: data.service,
			options: data.options?.length
				? data.options.map((o: string) =>
						o === 'Shampooing siège' && data.shampooingSeats > 1
							? `Shampooing siège x${data.shampooingSeats}`
							: o
					)
				: []
		})
	);

	const res = await fetch(`${DIRECTUS_URL}/items/bookings`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${DIRECTUS_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: data.name,
			email: data.email,
			phone: data.phone,
			datetime: datetime,
			vehicule: data.vehicle?.toLowerCase().replace('*', 'x') ?? '',
			service:
				data.service === 'Int + Ext'
					? 'int_ext'
					: data.service === 'Intérieur'
						? 'interieur'
						: data.service === 'Extérieur'
							? 'exterieur'
							: data.service,
			options: data.options?.length ? data.options : [],
			domicile: data.domicile,
			address: data.address || '',
			payment: data.payment,
			total: data.totalPrice,
			status: data.payment === 'cash' ? 'confirmed' : 'pending',
			stripe_session_id: stripeSessionId || ''
		})
	});

	const result = await res.json();
	console.log('Directus response:', JSON.stringify(result));
	return result;
}

// ─── Handler principal ────────────────────────────────────
export async function POST({ request }) {
	const data = await request.json();

	console.log('Data reçue:', JSON.stringify(data));

	try {
		if (data.payment === 'cash') {
			const directusResult = await createDirectusBooking(data);

			if (!directusResult.data) {
				console.error('Directus ERREUR:', JSON.stringify(directusResult));
				return new Response(JSON.stringify({ success: false, error: 'Booking failed' }), {
					status: 500
				});
			}

			await sendEmail({
				to: data.email,
				subject: '✅ Réservation confirmée — YanisWash',
				html: confirmationClientHtml(data)
			});

			await sendEmail({
				to: 'yaniswash@gmail.com',
				subject: `Nouvelle réservation — ${data.name}`,
				html: notificationYanisHtml(data)
			});

			await sendEmail({
				to: data.email,
				subject: 'Rappel — Votre lavage est demain !',
				html: rappelHtml(data),
				scheduledAt: new Date(new Date(data.datetime).getTime() - 24 * 60 * 60 * 1000).toISOString()
			});

			await sendEmail({
				to: data.email,
				subject: "⭐ Comment s'est passé votre lavage ?",
				html: reviewHtml(data),
				scheduledAt: new Date(
					new Date(data.datetime).getTime() + 90 * 60 * 1000 + 2 * 60 * 60 * 1000
				).toISOString()
			});

			return new Response(JSON.stringify({ success: true }), { status: 200 });
		} else {
			const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					'payment_method_types[]': 'card',
					mode: 'payment',
					'line_items[0][price_data][currency]': 'eur',
					'line_items[0][price_data][unit_amount]': String(data.totalPrice * 100),
					'line_items[0][price_data][product_data][name]': `YanisWash — ${data.service} (${data.vehicle})`,
					'line_items[0][price_data][product_data][description]': [
						`📅 ${data.date} à ${data.time}`,
						data.domicile ? `📍 ${data.address}` : '📍 Station YanisWash',
						data.options?.length ? `➕ ${data.options.join(', ')}` : ''
					]
						.filter(Boolean)
						.join(' | '),
					'line_items[0][quantity]': '1',
					success_url: 'https://yaniswash.be/booking-success',
					cancel_url: 'https://yaniswash.be',
					customer_email: data.email,
					'metadata[name]': data.name,
					'metadata[phone]': data.phone,
					'metadata[vehicule]': data.vehicule,
					'metadata[service]': data.service,
					'metadata[date]': data.date,
					'metadata[time]': data.time,
					'metadata[domicile]': data.domicile ? 'Oui' : 'Non',
					'metadata[address]': data.address || '',
					'metadata[options]': data.options?.join(', ') || '',
					'metadata[total]': String(data.totalPrice)
				})
			});

			const session = await stripeRes.json();
			console.log('Stripe session:', JSON.stringify(session));

			if (session.url) {
				await createDirectusBooking(data, session.id);

				await sendEmail({
					to: 'yaniswash@gmail.com',
					subject: `🚗 Nouvelle réservation (en ligne) — ${data.name}`,
					html: notificationYanisHtml(data)
				});

				return new Response(JSON.stringify({ success: true, stripeUrl: session.url }), {
					status: 200
				});
			} else {
				throw new Error(`Stripe error: ${JSON.stringify(session)}`);
			}
		}
	} catch (error) {
		console.error('Booking error:', error);
		return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
	}
}

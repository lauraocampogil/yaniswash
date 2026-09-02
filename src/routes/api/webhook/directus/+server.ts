import { RESEND_API_KEY, DIRECTUS_WEBHOOK_SECRET } from '$env/static/private';

function annulationHtml(name: string, date: string, time: string) {
	return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;">
        <tr>
          <td style="background:#151d3c;padding:32px;text-align:center;">
            <img src="https://yaniswash.be/assets/svg/Logo-vertical_blanc.svg" alt="YanisWash" height="60" style="display:block;margin:auto;border:0;" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <h1 style="margin:0 0 8px;font-size:24px;color:#151d3c;">❌ Réservation annulée</h1>
            <p style="margin:0 0 24px;color:#666;font-size:15px;">
              Bonjour <strong>${name}</strong>,<br><br>
              Votre réservation du <strong>${date} à ${time}</strong> a été annulée.
            </p>
            <p style="color:#666;font-size:14px;margin:0 0 24px;">
              Nous nous excusons pour la gêne occasionnée.<br>
              N'hésitez pas à reprendre rendez-vous sur notre site.
            </p>
            <table cellpadding="0" cellspacing="0"><tr>
              <td>
                <a href="https://yaniswash.be" style="display:inline-block;background:#151d3c;color:#fff;text-decoration:none;padding:12px 24px;border-radius:100px;font-size:14px;font-weight:600;">
                  Reprendre rendez-vous →
                </a>
              </td>
            </tr></table>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:0 15px;background-color:#f5f6ff;width:40%;vertical-align:middle;">
                  <img src="https://yaniswash.be/assets/svg/Logo-horizontal.svg" alt="YanisWash" width="140" style="display:block;border:0;max-width:100%;" />
                </td>
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
            <table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#8fadff;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;text-align:center;">
                  <p style="margin:0;font-size:12px;font-weight:600;color:#151d3c;font-family:Arial,sans-serif;">
                    Lavage automobile à Bruxelles — Du lundi au samedi 8h–22h
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

export async function POST({ request }) {
	const secret = request.headers.get('x-webhook-secret');
	if (secret !== DIRECTUS_WEBHOOK_SECRET) {
		return new Response('Unauthorized', { status: 401 });
	}

	const body = await request.json();
	console.log('Directus webhook reçu:', JSON.stringify(body));

	const booking = body.payload;

	if (booking?.status === 'cancelled' && booking?.email) {
		const dt = new Date(booking.datetime);
		const date = dt.toLocaleDateString('fr-BE', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'Europe/Brussels'
		});
		const time = dt.toLocaleTimeString('fr-BE', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/Brussels'
		});

		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'YanisWash <noreply@yaniswash.be>',
				to: booking.email,
				subject: '❌ Votre réservation YanisWash a été annulée',
				html: annulationHtml(booking.name, date, time)
			})
		});

		console.log('Email annulation envoyé à:', booking.email);
	}

	return new Response(JSON.stringify({ received: true }), { status: 200 });
}

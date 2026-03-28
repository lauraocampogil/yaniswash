import {
	RESEND_API_KEY,
	CAL_API_KEY,
	CAL_EVENT_TYPE_ID,
	STRIPE_PAYMENT_LINK
} from '$env/static/private';
import { Resend } from 'resend';
const resend = new Resend(RESEND_API_KEY);

import { readFileSync } from 'fs';
import { resolve } from 'path';

const signatureHtml = readFileSync(resolve('src/lib/email/signature.html'), 'utf-8');

function signature() {
	return signatureHtml;
}

// ─── Templates ───────────────────────────────────────────

function templateClient(data: any) {
	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f5f6ff;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6ff;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(21,29,60,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#8fadff;padding:32px 40px;text-align:center;">
              <img src="https://yaniswash.be/assets/svg/Logo-horizontal.svg" alt="YanisWash" height="48" style="display:block;margin:0 auto 8px;">
              <p style="margin:0;color:#151d3c;font-size:14px;opacity:0.7;">Lavage automobile à Bruxelles</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#151d3c;">Réservation confirmée ✓</h1>
              <p style="margin:0 0 32px;color:#666;font-size:15px;">Bonjour ${data.name}, votre lavage est bien réservé.</p>

              <!-- Récap card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6ff;border-radius:16px;overflow:hidden;margin-bottom:32px;">
                <tr><td style="padding:24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;">
                        <span style="color:#666;font-size:13px;">📅 Date</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;">
                        <strong style="color:#151d3c;font-size:13px;">${new Date(data.datetime).toLocaleDateString('fr-BE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${data.time}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;">
                        <span style="color:#666;font-size:13px;">🚗 Véhicule</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;">
                        <strong style="color:#151d3c;font-size:13px;">${data.vehicle}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;">
                        <span style="color:#666;font-size:13px;">🧹 Service</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;">
                        <strong style="color:#151d3c;font-size:13px;">${data.service}</strong>
                      </td>
                    </tr>
                    ${
											data.options?.length
												? `
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;">
                        <span style="color:#666;font-size:13px;">➕ Options</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;">
                        <strong style="color:#151d3c;font-size:13px;">${data.options.join(', ')}</strong>
                      </td>
                    </tr>`
												: ''
										}
                    ${
											data.address
												? `
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;">
                        <span style="color:#666;font-size:13px;">📍 Adresse</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;">
                        <strong style="color:#151d3c;font-size:13px;">${data.address}</strong>
                      </td>
                    </tr>`
												: ''
										}
                    <tr>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;">
                        <span style="color:#666;font-size:13px;">💳 Paiement</span>
                      </td>
                      <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;">
                        <strong style="color:#151d3c;font-size:13px;">${data.payment === 'cash' ? 'Espèces sur place' : 'Payé en ligne'}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0 0;">
                        <span style="color:#151d3c;font-size:15px;font-weight:800;">Total</span>
                      </td>
                      <td style="padding:12px 0 0;text-align:right;">
                        <span style="color:#8fadff;font-size:20px;font-weight:800;">€${data.totalPrice}</span>
                      </td>
                    </tr>
                  </table>
                </td></tr>
              </table>

              <!-- Info box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#eef3ff;border-radius:12px;margin-bottom:32px;">
                <tr><td style="padding:16px 20px;">
                  <p style="margin:0;color:#151d3c;font-size:13px;line-height:1.6;">
                    💡 <strong>Bon à savoir</strong> — Vous n'avez pas besoin d'être présent pendant le lavage. 
                    Si vous devez annuler ou déplacer votre rendez-vous, prévenez-nous au moins 24h à l'avance.
                  </p>
                </td></tr>
              </table>

              <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">
                À bientôt,<br>
                <strong style="color:#151d3c;">Yanis — YanisWash</strong><br>
                <a href="tel:+0491739789" style="color:#8fadff;text-decoration:none;">+0491 73 97 89</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#151d3c;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:12px;">Yanis Carwash © 2026 — Tous droits réservés</p>
              <p style="margin:0;font-size:12px;">
                <a href="https://yaniswash.be" style="color:#8fadff;text-decoration:none;">yaniswash.be</a>
                &nbsp;·&nbsp;
                <a href="mailto:contact@yaniswash.be" style="color:#8fadff;text-decoration:none;">contact@yaniswash.be</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function templateYanis(data: any) {
	return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f6ff;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6ff;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(21,29,60,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#151d3c;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;">🚗 Nouvelle réservation</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:13px;">${new Date(data.datetime).toLocaleDateString('fr-BE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${data.time}</p>
            </td>
          </tr>

          <!-- Client info -->
          <tr>
            <td style="padding:32px 40px 0;">
              <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#151d3c;text-transform:uppercase;letter-spacing:0.05em;">Client</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6ff;border-radius:12px;">
                <tr><td style="padding:20px;">
                  <p style="margin:0 0 6px;font-size:18px;font-weight:800;color:#151d3c;">${data.name}</p>
                  <p style="margin:0 0 4px;font-size:13px;color:#666;">
                    <a href="mailto:${data.email}" style="color:#8fadff;">${data.email}</a>
                  </p>
                  <p style="margin:0;font-size:13px;color:#666;">
                    <a href="tel:${data.phone}" style="color:#8fadff;">${data.phone}</a>
                  </p>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- Détails -->
          <tr>
            <td style="padding:24px 40px 0;">
              <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#151d3c;text-transform:uppercase;letter-spacing:0.05em;">Détails</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;color:#666;font-size:13px;">Véhicule</td>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;font-weight:700;color:#151d3c;font-size:13px;">${data.vehicle}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;color:#666;font-size:13px;">Service</td>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;font-weight:700;color:#151d3c;font-size:13px;">${data.service}</td>
                </tr>
                ${
									data.options?.length
										? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;color:#666;font-size:13px;">Options</td>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;font-weight:700;color:#151d3c;font-size:13px;">${data.options.join(', ')}</td>
                </tr>`
										: ''
								}
                ${
									data.address
										? `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;color:#666;font-size:13px;">📍 Adresse domicile</td>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;font-weight:700;color:#151d3c;font-size:13px;">${data.address}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;color:#666;font-size:13px;">Distance</td>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;font-weight:700;color:#151d3c;font-size:13px;">${data.distance ?? '—'} km</td>
                </tr>`
										: '<tr><td style="padding:8px 0;border-bottom:1px dashed #cacfe5;color:#666;font-size:13px;">Lieu</td><td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;font-weight:700;color:#151d3c;font-size:13px;">À la station</td></tr>'
								}
                <tr>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;color:#666;font-size:13px;">Paiement</td>
                  <td style="padding:8px 0;border-bottom:1px dashed #cacfe5;text-align:right;font-weight:700;color:#151d3c;font-size:13px;">${data.payment === 'cash' ? '💵 Espèces sur place' : '💳 Payé en ligne'}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0 0;font-size:15px;font-weight:800;color:#151d3c;">Total</td>
                  <td style="padding:12px 0 0;text-align:right;font-size:20px;font-weight:800;color:#8fadff;">€${data.totalPrice}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Google Maps si domicile -->
          ${
						data.address
							? `
          <tr>
            <td style="padding:24px 40px 0;">
              <a href="https://maps.google.com/?q=${encodeURIComponent(data.address)}" 
                style="display:inline-block;background:#8fadff;color:#151d3c;font-weight:700;font-size:14px;padding:12px 24px;border-radius:100px;text-decoration:none;">
                📍 Ouvrir dans Google Maps
              </a>
            </td>
          </tr>`
							: ''
					}

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#999;font-size:12px;">YanisWash — Tableau de bord</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function templateReview(data: any) {
	return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f6ff;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6ff;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(21,29,60,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#8fadff;padding:40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:48px;">⭐</p>
              <h1 style="margin:0;color:#151d3c;font-size:24px;font-weight:800;">Votre avis compte beaucoup</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#151d3c;">Bonjour ${data.name} 👋</p>
              <p style="margin:0 0 32px;color:#666;font-size:15px;line-height:1.6;">
                Merci d'avoir fait confiance à YanisWash pour votre <strong>${data.vehicle}</strong>.<br>
                Votre satisfaction est notre meilleure publicité.
              </p>

              <!-- Stars -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6ff;border-radius:16px;margin-bottom:32px;">
                <tr><td style="padding:32px;text-align:center;">
                  <p style="margin:0 0 16px;font-size:32px;letter-spacing:4px;">⭐⭐⭐⭐⭐</p>
                  <p style="margin:0 0 24px;color:#666;font-size:14px;">Ça vous a pris 30 secondes, mais ça compte énormément pour nous.</p>
                  <a href="https://g.page/r/VOTRE_GOOGLE_REVIEW_LINK/review" 
                    style="display:inline-block;background:#151d3c;color:#ffffff;font-weight:700;font-size:15px;padding:16px 32px;border-radius:100px;text-decoration:none;">
                    ⭐ Laisser un avis Google
                  </a>
                </td></tr>
              </table>

              <p style="margin:0 0 4px;color:#666;font-size:13px;">Un problème ? Contactez-nous directement.</p>
              <p style="margin:0;font-size:13px;">
                <a href="mailto:contact@yaniswash.be" style="color:#8fadff;text-decoration:none;">contact@yaniswash.be</a>
                &nbsp;·&nbsp;
                <a href="tel:+0491739789" style="color:#8fadff;text-decoration:none;">+0491 73 97 89</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#151d3c;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:12px;">Yanis Carwash © 2026 — Tous droits réservés</p>
              <a href="https://yaniswash.be" style="color:#8fadff;text-decoration:none;font-size:12px;">yaniswash.be</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Server ───────────────────────────────────────────────

export async function POST({ request }) {
	const data = await request.json();

	// Email de review — endpoint séparé appelé après le service
	if (data.type === 'review') {
		await resend.emails.send({
			from: 'YanisWash <onboarding@resend.dev>',
			to: 'lolasocampo@gmail.com', // temporaire
			subject: "⭐ Comment s'est passé votre lavage ?",
			html: templateReview(data)
		});
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	}

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

	async function sendEmails() {
		// Email au client
		await resend.emails.send({
			from: 'YanisWash <noreply@yaniswash.be>',
			to: data.email,
			subject: '✓ Réservation confirmée — YanisWash',
			html: templateClient(data)
		});

		// Email à Yanis
		await resend.emails.send({
			from: 'YanisWash <noreply@yaniswash.be>',
			to: 'contact@yaniswash.be',
			subject: `🚗 Nouvelle réservation — ${data.name} — €${data.totalPrice}`,
			html: templateYanis(data)
		});
	}

	try {
		if (data.payment === 'cash') {
			await createCalBooking();
			await sendEmails();
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		} else {
			await sendEmails();
			return new Response(JSON.stringify({ success: true, stripeUrl: STRIPE_PAYMENT_LINK }), {
				status: 200
			});
		}
	} catch (error) {
		console.error('Booking error:', error);
		return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
	}
}

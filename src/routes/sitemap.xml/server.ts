export const GET = async () => {
	const pages = [
		{ url: 'https://yaniswash.be/', priority: '1.0', changefreq: 'weekly' },
		{ url: 'https://yaniswash.be/mentions-legales', priority: '0.3', changefreq: 'yearly' },
		{
			url: 'https://yaniswash.be/politique-de-confidentialite',
			priority: '0.3',
			changefreq: 'yearly'
		},
		{ url: 'https://yaniswash.be/cookies', priority: '0.3', changefreq: 'yearly' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'max-age=3600' }
	});
};

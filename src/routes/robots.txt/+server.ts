export const GET = async () => {
	const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://yaniswash.be/sitemap.xml`;

	return new Response(robots, { headers: { 'Content-Type': 'text/plain' } });
};

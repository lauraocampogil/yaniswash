export const load = async ({ fetch }: { fetch: typeof globalThis.fetch }) => {
    const [contentRes, pricingRes] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/pricing')
    ]);

    const [content, pricing] = await Promise.all([
        contentRes.json(),
        pricingRes.json()
    ]);

    return { content, pricing };
};
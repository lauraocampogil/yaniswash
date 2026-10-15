export const DIRECTUS_PUBLIC_URL =
	'http://directus-detgvouevteyensdyeklh8hr.128.140.85.57.sslip.io';

export function getDirectusImage(
	id: string,
	params?: { width?: number; height?: number; quality?: number; format?: string }
) {
	if (!id) return '';
	const url = new URL(`${DIRECTUS_PUBLIC_URL}/assets/${id}`);
	if (params?.width) url.searchParams.set('width', String(params.width));
	if (params?.height) url.searchParams.set('height', String(params.height));
	if (params?.quality) url.searchParams.set('quality', String(params.quality));
	if (params?.format) url.searchParams.set('format', params.format);
	return url.toString();
}

import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join } from 'path';

const dirs = [
    'static/assets/images/resultat',
    'static/assets/images'
];

for (const dir of dirs) {
    const files = readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
    for (const file of files) {
        const input = join(dir, file);
        const output = join(dir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        await sharp(input)
            .webp({ quality: 82 })
            .resize(1200, null, { withoutEnlargement: true })
            .toFile(output);
        console.log(`✓ ${file} → ${file.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
    }
}
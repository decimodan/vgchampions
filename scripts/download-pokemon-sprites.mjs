/**
 * Descarga los sprites .webp listados en data/pokemon-champions-list.json.
 *
 * Uso: node scripts/download-pokemon-sprites.mjs [dir-salida]
 * Por defecto guarda en public/pokemon-champions/sprites/
 *
 * Requiere red. Respeta el origen (assets.pokemon-zone.com); uso razonable.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const jsonPath = join(root, "data/pokemon-champions-list.json");

const outDirArg = process.argv[2];
const outDir = outDirArg
	? join(root, outDirArg)
	: join(root, "public/pokemon-champions/sprites");

const CONCURRENCY = 4;
const DELAY_MS = 120;

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

async function downloadOne(slug, url) {
	if (!url) {
		console.warn(`Saltando ${slug}: sin imageUrl`);
		return { slug, ok: false, reason: "no-url" };
	}

	const dest = join(outDir, `${slug}.webp`);
	const res = await fetch(url, {
		headers: {
			"User-Agent": "vgchampions-local-import/1.0 (educational; sprite cache)",
		},
	});
	if (!res.ok) {
		return { slug, ok: false, reason: `${res.status}` };
	}
	const buf = Buffer.from(await res.arrayBuffer());
	writeFileSync(dest, buf);
	return { slug, ok: true, bytes: buf.length };
}

const raw = JSON.parse(readFileSync(jsonPath, "utf8"));
const list = raw.pokemon;
if (!Array.isArray(list)) {
	console.error("JSON inválido: falta array pokemon");
	process.exit(1);
}

mkdirSync(outDir, { recursive: true });

let i = 0;
async function worker() {
	while (i < list.length) {
		const idx = i++;
		const item = list[idx];
		await sleep(DELAY_MS * (idx % CONCURRENCY));
		const r = await downloadOne(item.slug, item.imageUrl);
		if (r.ok) {
			process.stdout.write(`\r✓ ${r.slug} (${r.bytes} B)   `);
		} else {
			console.error(`\n✗ ${item.slug}: ${r.reason}`);
		}
	}
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
console.log(`\nListo: ${outDir} (${list.length} archivos intentados)`);

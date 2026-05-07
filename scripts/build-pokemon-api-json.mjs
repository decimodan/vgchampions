/**
 * Construye un manifiesto JSON listo para exponer por API (REST / Workers).
 * Lee data/pokemon-champions-list.json y escribe public/api/pokemon.json
 *
 * Uso: node scripts/build-pokemon-api-json.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const input = join(root, "data/pokemon-champions-list.json");
const outDir = join(root, "public/api");
const outFile = join(outDir, "pokemon.json");

const raw = JSON.parse(readFileSync(input, "utf8"));
const rows = raw.pokemon;

const pokemon = rows.map((p) => ({
	slug: p.slug,
	name: p.name,
	types: p.types,
	usageCount: p.usageCount,
	spriteUrl: `/pokemon-champions/sprites/${p.slug}.webp`,
	remoteIconUrl: p.imageUrl ?? null,
	pagePath: `/pokemon/${p.slug}`,
}));

const payload = {
	meta: {
		generatedAt: new Date().toISOString(),
		count: pokemon.length,
		sourceFile: "data/pokemon-champions-list.json",
	},
	pokemon,
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(payload, null, "\t"));
console.log(`OK: ${pokemon.length} ítems → ${outFile}`);

/**
 * Lee docs/pokemon.html (export de Pokémon Zone) y genera un JSON con slug, nombre,
 * URL del sprite, tipos y conteo de uso.
 *
 * Uso: node scripts/parse-pokemon-html.mjs [ruta-al.html]
 * Salida: data/pokemon-champions-list.json
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const defaultInput = join(root, "docs/allpokemon.html");
const outDir = join(root, "data");
const outFile = join(outDir, "pokemon-champions-list.json");

const inputPath = process.argv[2] ?? defaultInput;

const html = readFileSync(inputPath, "utf8");

// Tarjeta: href con slug fijo y class champs-pokemon-card (orden como en el export).
const cardRe =
	/<a href="\/champions\/pokemon\/([^/]+)\/" class="champs-pokemon-card"[^>]*>([\s\S]*?)<\/a>/g;

/** @type {Array<{ slug: string; name: string; imageUrl: string | null; types: { slug: string; name: string }[]; usageCount: number | null }>} */
const pokemon = [];

let m;
while ((m = cardRe.exec(html)) !== null) {
	const slug = m[1];
	const inner = m[2];

	const imgMatch = inner.match(/<img src="([^"]+)"/);
	const nameMatch = inner.match(
		/<div class="champs-pokemon-card__name">([^<]*)<\/div>/,
	);
	const typeRe =
		/<span class="type-badge type-badge--([a-z]+)">([^<]+)<\/span>/gi;
	const types = [];
	let tm;
	while ((tm = typeRe.exec(inner)) !== null) {
		types.push({ slug: tm[1], name: tm[2].trim() });
	}

	const usageMatch = inner.match(
		/<div class="champs-pokemon-card__usage">(\d+) uses<\/div>/,
	);

	pokemon.push({
		slug,
		name: nameMatch ? nameMatch[1].trim() : slug,
		imageUrl: imgMatch ? imgMatch[1] : null,
		types,
		usageCount: usageMatch ? Number(usageMatch[1], 10) : null,
	});
}

if (pokemon.length === 0) {
	console.error("No se encontraron tarjetas. ¿Cambió el HTML o la ruta?");
	process.exit(1);
}

// Orden estable: por uso descendente (como en la página), luego slug.
pokemon.sort((a, b) => {
	const ua = a.usageCount ?? 0;
	const ub = b.usageCount ?? 0;
	if (ub !== ua) return ub - ua;
	return a.slug.localeCompare(b.slug);
});

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify({ source: inputPath, count: pokemon.length, pokemon }, null, "\t"));
console.log(`OK: ${pokemon.length} Pokémon → ${outFile}`);

import type { PokemonType } from "../data/home";
import { typeColors } from "../data/home";

/** Type slug from HTML/JSON, e.g. `fighting` → theme color hex */
export function typeHexFromSlug(slug: string): string {
	const key = (slug.charAt(0).toUpperCase() + slug.slice(1)) as PokemonType;
	return typeColors[key] ?? "#888888";
}

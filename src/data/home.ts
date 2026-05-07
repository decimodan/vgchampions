/** Placeholder content for the home page; replace with API/CMS later. */

export type PokemonType =
	| "Normal"
	| "Fire"
	| "Water"
	| "Electric"
	| "Grass"
	| "Ice"
	| "Fighting"
	| "Poison"
	| "Ground"
	| "Flying"
	| "Psychic"
	| "Bug"
	| "Rock"
	| "Ghost"
	| "Dragon"
	| "Dark"
	| "Steel"
	| "Fairy";

export const typeColors: Record<PokemonType, string> = {
	Normal: "#A8A878",
	Fire: "#EE8130",
	Water: "#6390F0",
	Electric: "#F7D02C",
	Grass: "#7AC74C",
	Ice: "#96D9D6",
	Fighting: "#C22E28",
	Poison: "#A33EA1",
	Ground: "#E2BF65",
	Flying: "#A98FF3",
	Psychic: "#F95587",
	Bug: "#A6B91A",
	Rock: "#B6A136",
	Ghost: "#735797",
	Dragon: "#6F35FC",
	Dark: "#705746",
	Steel: "#B7B7CE",
	Fairy: "#D685AD",
};

export interface NewsItem {
	tag: string;
	title: string;
	snippet: string;
	date: string;
	badge: { label: string; style: "info" | "ended" | "countdown" };
	imageGradient: string;
}

export const newsItems: NewsItem[] = [
	{
		tag: "Battle Pass",
		title: "Seasonal rewards and VGC-themed cosmetics",
		snippet:
			"New trainer items and profile flair inspired by Regulation H are available for a limited time.",
		date: "May 6, 2026",
		badge: { label: "May 12 – Jun 16", style: "info" },
		imageGradient: "linear-gradient(135deg, #F9C23C 0%, #E8A412 100%)",
	},
	{
		tag: "Events",
		title: "Community ladder night — doubles practice",
		snippet:
			"Open practice sessions every Thursday; bring a team code or borrow a rental.",
		date: "May 4, 2026",
		badge: { label: "Ends in 6d 6h", style: "countdown" },
		imageGradient: "linear-gradient(135deg, #002D4C 0%, #0d4a6e 100%)",
	},
	{
		tag: "Patch",
		title: "Balance notes: Regulation update roundup",
		snippet:
			"A quick read on which cores gained tools and which speed tiers shifted after the latest rules.",
		date: "May 1, 2026",
		badge: { label: "Has ended", style: "ended" },
		imageGradient: "linear-gradient(135deg, #7AC74C 0%, #5a9e35 100%)",
	},
];

export interface UsageMon {
	id: number;
	name: string;
	types: PokemonType[];
	usagePct: number;
	tint: string;
}

export const topByUsage: UsageMon[] = [
	{ id: 977, name: "Dondozo", types: ["Water"], usagePct: 43.2, tint: "rgba(99, 144, 240, 0.18)" },
	{ id: 812, name: "Rillaboom", types: ["Grass"], usagePct: 38.7, tint: "rgba(122, 199, 76, 0.2)" },
	{ id: 727, name: "Incineroar", types: ["Fire", "Dark"], usagePct: 36.1, tint: "rgba(238, 129, 48, 0.15)" },
	{ id: 903, name: "Sneasler", types: ["Fighting", "Poison"], usagePct: 34.0, tint: "rgba(194, 46, 40, 0.12)" },
	{ id: 1000, name: "Gholdengo", types: ["Steel", "Ghost"], usagePct: 31.5, tint: "rgba(183, 183, 206, 0.22)" },
];

export interface PerformingMon {
	id: number;
	name: string;
	types: PokemonType[];
	winRate: number;
	tint: string;
}

export const topPerforming: PerformingMon[] = [
	{ id: 1005, name: "Roaring Moon", types: ["Dragon", "Dark"], winRate: 62.5, tint: "rgba(111, 53, 252, 0.12)" },
	{ id: 1017, name: "Ogerpon-Wellspring", types: ["Grass", "Water"], winRate: 61.2, tint: "rgba(122, 199, 76, 0.16)" },
	{ id: 987, name: "Flutter Mane", types: ["Ghost", "Fairy"], winRate: 60.8, tint: "rgba(247, 208, 44, 0.14)" },
	{ id: 901, name: "Ursaluna-Bloodmoon", types: ["Ground", "Normal"], winRate: 59.4, tint: "rgba(226, 191, 101, 0.2)" },
	{ id: 1002, name: "Chien-Pao", types: ["Dark", "Ice"], winRate: 58.9, tint: "rgba(150, 217, 214, 0.18)" },
];

export interface TournamentRow {
	name: string;
	href: string;
	players: number;
	date: string;
	winner: string;
}

export const recentTournaments: TournamentRow[] = [
	{
		name: "Knoxville Regional",
		href: "#",
		players: 256,
		date: "Apr 26, 2026",
		winner: "Alex Gomez",
	},
	{
		name: "EUIC Special Event",
		href: "#",
		players: 512,
		date: "Apr 18, 2026",
		winner: "James Evans",
	},
	{
		name: "Orlando Regional",
		href: "#",
		players: 312,
		date: "Apr 5, 2026",
		winner: "Paul Chua",
	},
	{
		name: "San Diego Regional",
		href: "#",
		players: 289,
		date: "Mar 22, 2026",
		winner: "Wolfe Glick",
	},
];

export function spriteUrl(id: number): string {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

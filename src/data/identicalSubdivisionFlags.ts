// Answers in one country's Sub-national flags deck that fly the SAME flag.
//
// In the Sub-national flags game a flag shown for one member of a group is just
// as much the flag of the others, so every member is accepted as the answer.
// A quiz question must have exactly one correct answer; where two places really
// do share a flag, the honest fix is to accept both, never to swap in a
// different image or drop one of them.
//
// A member is either a division, by its code ("AE-DU"), or the capital city of
// a division, by "capital:" and that division's code ("capital:UA-32" is Kyiv,
// the capital of Kyiv Oblast). Two kinds of group occur:
//   - one city in two roles: Kyiv is a division of its own (UA-30) and the
//     capital of Kyiv Oblast, so both answers name the same place;
//   - two places with the same design: Ajman and Dubai, or Genoa and Milan,
//     which both fly St George's cross.
//
// Every group is sourced. For two places, each place's flag is documented with
// the same design: the same colours in the same layout (the bundled files may
// differ in shade, as renderings of one design do). For one city in two roles,
// the source names that city as the other division's capital.
// `scripts/check-identical-subdivision-flags.mjs` rasterises every division and
// capital flag the game asks about, and fails the build when two in one country
// look near-identical but are neither grouped here nor listed in the check's
// REVIEWED_DISTINCT, or when a group's flags no longer look alike.

export interface IdenticalFlagGroup {
  /** Answer keys, all in one country: a division code, or "capital:" + a division code. */
  codes: readonly string[];
  /** One sentence on why the flags are the same. */
  note: string;
  /** Where each flag's design, or the shared city, is documented. */
  sources: readonly string[];
}

/** The key of a quiz answer: a division's code, or "capital:" + the code for its capital city. */
export function answerKey(code: string, kind: "division" | "capital"): string {
  return kind === "capital" ? `capital:${code}` : code;
}

/** Splits an answer key back into the division code and the kind of answer. */
export function parseAnswerKey(key: string): { code: string; kind: "division" | "capital" } {
  return key.startsWith("capital:")
    ? { code: key.slice("capital:".length), kind: "capital" }
    : { code: key, kind: "division" };
}

export const IDENTICAL_SUBDIVISION_FLAG_GROUPS: readonly IdenticalFlagGroup[] = [
  // ── The same design flown by two places ──────────────────────────────────
  {
    codes: ["AE-AJ", "AE-DU"],
    note: "Ajman and Dubai both fly a red field with a white bar at the hoist.",
    sources: [
      "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates#Flag_of_each_emirate",
    ],
  },
  {
    codes: ["AE-RK", "AE-SH"],
    note: "Ras Al Khaimah and Sharjah, ruled by two branches of the same house, fly the same flag.",
    sources: [
      "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates#Flag_of_each_emirate",
    ],
  },
  {
    codes: ["CO-NAR", "CO-VID"],
    note: "Vichada’s flag is exactly Nariño’s, in its colours and its proportions.",
    sources: [
      "https://es.wikipedia.org/wiki/Bandera_del_Vichada",
    ],
  },
  {
    codes: ["CO-BOL", "capital:CO-TOL"],
    note: "Bolívar and Ibagué both fly three equal horizontal stripes of yellow, green and red.",
    sources: [
      "https://es.wikipedia.org/wiki/Bandera_de_Bolívar_(Colombia)",
      "https://www.crwflags.com/fotw/flags/co-tolib.html",
    ],
  },
  {
    codes: ["CO-CES", "capital:CO-BOY"],
    note: "Cesar and Tunja both fly three horizontal stripes of green, white and green.",
    sources: [
      "https://es.wikipedia.org/wiki/Bandera_de_Cesar",
      "https://www.crwflags.com/fotw/flags/co-boytu.html",
    ],
  },
  {
    codes: ["capital:CO-ARA", "capital:CO-CAL"],
    note: "Arauca and Manizales both fly three equal horizontal stripes of white, green and red.",
    sources: [
      "https://www.crwflags.com/fotw/flags/co-araar.html",
      "https://www.crwflags.com/fotw/flags/co-cal-m.html",
    ],
  },
  {
    codes: ["CZ-PR", "capital:CZ-ST", "capital:CZ-JC"],
    note: "Prague is a region of its own and the seat of the Central Bohemian Region; České Budějovice flies the same yellow-over-red flag.",
    sources: [
      "https://en.wikipedia.org/wiki/Central_Bohemian_Region",
      "https://cs.wikipedia.org/wiki/Vlajka_Prahy",
      "https://cs.wikipedia.org/wiki/České_Budějovice",
    ],
  },
  {
    codes: ["DE-BW", "capital:DE-BY"],
    note: "Baden-Württemberg and Munich both fly two horizontal stripes, black over gold.",
    sources: [
      "https://de.wikipedia.org/wiki/Flagge_Baden-Württembergs",
      "https://de.wikipedia.org/wiki/München",
    ],
  },
  {
    codes: ["EC-E", "capital:EC-Z"],
    note: "Esmeraldas Province and the canton of Zamora both fly two horizontal stripes, white over green.",
    sources: [
      "https://www.crwflags.com/fotw/flags/ec-e.html",
      "https://zamora.gob.ec/ciudad/simbolos-patrios/",
    ],
  },
  {
    codes: ["FR-2A", "FR-2B"],
    note: "Both Corsican departments are shown with the flag of Corsica; neither has one of its own.",
    sources: [
      "https://fr.wikipedia.org/wiki/Drapeau_de_la_Corse",
    ],
  },
  {
    codes: ["capital:FR-38", "capital:FR-39"],
    note: "Grenoble and Lons-le-Saunier both fly a flag divided vertically, red at the hoist and gold at the fly.",
    sources: [
      "https://partir-ici.fr/les-couleurs-de-grenoble/",
      "https://www.crwflags.com/fotw/flags/fr-39-ls.html",
    ],
  },
  {
    codes: ["capital:IT-AL", "capital:IT-BO", "capital:IT-GE", "capital:IT-MI", "capital:IT-PD", "capital:IT-VA"],
    note: "Alessandria, Bologna, Genoa, Milan, Padua and Varese all fly a red cross on white.",
    sources: [
      "https://www.crwflags.com/fotw/flags/it-al-al.html",
      "https://www.crwflags.com/fotw/flags/it-bolo.html",
      "https://www.crwflags.com/fotw/flags/it-genoa.html",
      "https://www.crwflags.com/fotw/flags/it-lom-m.html",
      "https://www.crwflags.com/fotw/flags/it-padua.html",
      "https://www.crwflags.com/fotw/flags/it-va-va.html",
    ],
  },
  {
    codes: ["capital:IT-AP", "capital:IT-BG", "capital:IT-NA", "capital:IT-RA"],
    note: "Ascoli Piceno, Bergamo, Naples and Ravenna all fly a flag divided vertically, yellow and red.",
    sources: [
      "https://www.crwflags.com/fotw/flags/it-ap-ap.html",
      "https://www.crwflags.com/fotw/flags/it-bg-bg.html",
      "https://www.crwflags.com/fotw/flags/it-napl.html",
      "https://www.crwflags.com/fotw/flags/it-ra-ra.html",
    ],
  },
  {
    codes: ["capital:IT-AT", "capital:IT-CO", "capital:IT-NO", "capital:IT-PV"],
    note: "Asti, Como, Novara and Pavia all fly a white cross on red.",
    sources: [
      "https://www.crwflags.com/fotw/flags/it-asti.html",
      "https://it.wikipedia.org/wiki/Como",
      "https://www.crwflags.com/fotw/flags/it-no-no.html",
      "https://it.wikipedia.org/wiki/Pavia",
    ],
  },
  {
    codes: ["capital:IT-BS", "capital:IT-IS"],
    note: "Brescia and Isernia both fly a flag divided vertically, white and blue.",
    sources: [
      "https://www.crwflags.com/fotw/flags/it-bs-bs.html",
      "https://it.wikipedia.org/wiki/Isernia",
    ],
  },
  {
    codes: ["capital:IT-CE", "capital:IT-CT"],
    note: "Caserta and Catania both fly a flag divided vertically, red and blue.",
    sources: [
      "https://www.crwflags.com/fotw/flags/it-csrta.html",
      "https://www.crwflags.com/fotw/flags/it-ct-ct.html",
    ],
  },
  {
    codes: ["LI-01", "LI-03"],
    note: "Balzers and Gamprin both fly three equal stripes, blue, yellow and blue.",
    sources: [
      "https://www.crwflags.com/fotw/flags/li-ba.html",
    ],
  },
  {
    codes: ["capital:PL-MZ", "capital:PL-LD"],
    note: "Warsaw and Łódź both fly two equal horizontal stripes, gold over red.",
    sources: [
      "https://pl.wikipedia.org/wiki/Warszawa",
      "https://pl.wikipedia.org/wiki/Flaga_Łodzi",
    ],
  },

  // ── One city in two roles: a division of its own, and another's capital ──
  {
    codes: ["capital:BG-22", "capital:BG-23"],
    note: "Sofia is the capital of Sofia City and of the surrounding Sofia Province.",
    sources: [
      "https://en.wikipedia.org/wiki/Sofia_Province",
    ],
  },
  {
    codes: ["BY-HM", "capital:BY-MI"],
    note: "Minsk is a city with its own status and the administrative centre of Minsk Region.",
    sources: [
      "https://en.wikipedia.org/wiki/Minsk_region",
    ],
  },
  {
    codes: ["CO-DC", "capital:CO-CUN"],
    note: "Bogotá, a Capital District of its own, is also the capital of Cundinamarca.",
    sources: [
      "https://en.wikipedia.org/wiki/Cundinamarca_Department",
    ],
  },
  {
    codes: ["ET-AA", "capital:ET-OR"],
    note: "Addis Ababa (Finfinne) is a chartered city of its own, and Oromia’s regional government also sits there.",
    sources: [
      "https://en.wikipedia.org/wiki/Oromia_Region",
    ],
  },
  {
    codes: ["HR-21", "capital:HR-01"],
    note: "The City of Zagreb is a county-level unit of its own and the seat of Zagreb County.",
    sources: [
      "https://en.wikipedia.org/wiki/Zagreb_County",
    ],
  },
  {
    codes: ["HU-BU", "capital:HU-PE"],
    note: "Budapest is the capital city and the seat of Pest County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-NY", "capital:HU-SZ"],
    note: "Nyíregyháza is a city with county rights and the seat of Szabolcs-Szatmár-Bereg County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-BC", "capital:HU-BE"],
    note: "Békéscsaba is a city with county rights and the seat of Békés County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-DE", "capital:HU-HB"],
    note: "Debrecen is a city with county rights and the seat of Hajdú-Bihar County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-SD", "capital:HU-CS"],
    note: "Szeged is a city with county rights and the seat of Csongrád-Csanád County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-GY", "capital:HU-GS"],
    note: "Győr is a city with county rights and the seat of Győr-Moson-Sopron County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-SH", "capital:HU-VA"],
    note: "Szombathely is a city with county rights and the seat of Vas County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-KM", "capital:HU-BK"],
    note: "Kecskemét is a city with county rights and the seat of Bács-Kiskun County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-ZE", "capital:HU-ZA"],
    note: "Zalaegerszeg is a city with county rights and the seat of Zala County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-KV", "capital:HU-SO"],
    note: "Kaposvár is a city with county rights and the seat of Somogy County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-PS", "capital:HU-BA"],
    note: "Pécs is a city with county rights and the seat of Baranya County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-MI", "capital:HU-BZ"],
    note: "Miskolc is a city with county rights and the seat of Borsod-Abaúj-Zemplén County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-ST", "capital:HU-NO"],
    note: "Salgótarján is a city with county rights and the seat of Nógrád County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-TB", "capital:HU-KE"],
    note: "Tatabánya is a city with county rights and the seat of Komárom-Esztergom County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-SK", "capital:HU-JN"],
    note: "Szolnok is a city with county rights and the seat of Jász-Nagykun-Szolnok County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-SF", "capital:HU-FE"],
    note: "Székesfehérvár is a city with county rights and the seat of Fejér County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-VM", "capital:HU-VE"],
    note: "Veszprém is a city with county rights and the seat of Veszprém County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-SS", "capital:HU-TO"],
    note: "Szekszárd is a city with county rights and the seat of Tolna County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["HU-EG", "capital:HU-HE"],
    note: "Eger is a city with county rights and the seat of Heves County.",
    sources: [
      "https://en.wikipedia.org/wiki/Counties_of_Hungary",
    ],
  },
  {
    codes: ["KG-GB", "capital:KG-C"],
    note: "Bishkek is a city with its own status and the capital of Chüy Region.",
    sources: [
      "https://en.wikipedia.org/wiki/Chüy_Region",
    ],
  },
  {
    codes: ["NO-03", "capital:NO-02"],
    note: "Oslo is a county of its own and the administrative centre of Akershus.",
    sources: [
      "https://en.wikipedia.org/wiki/Akershus",
    ],
  },
  {
    codes: ["PG-NCD", "capital:PG-CPM"],
    note: "Port Moresby, the National Capital District, is also the capital of Central Province.",
    sources: [
      "https://en.wikipedia.org/wiki/Central_Province_(Papua_New_Guinea)",
    ],
  },
  {
    codes: ["SB-CT", "capital:SB-GU"],
    note: "Honiara, the Capital Territory, also serves as the capital of Guadalcanal Province.",
    sources: [
      "https://en.wikipedia.org/wiki/Guadalcanal_Province",
    ],
  },
  {
    codes: ["UA-30", "capital:UA-32"],
    note: "Kyiv is a city with special status and the administrative centre of Kyiv Oblast.",
    sources: [
      "https://en.wikipedia.org/wiki/Kyiv_Oblast",
    ],
  },
];

const TWINS: ReadonlyMap<string, readonly string[]> = new Map(
  IDENTICAL_SUBDIVISION_FLAG_GROUPS.flatMap((g) =>
    g.codes.map((key) => [key, g.codes.filter((k) => k !== key)] as const),
  ),
);

/** The other answer keys whose flag is identical to `key`'s; empty when there are none. */
export function identicalFlagTwins(key: string): readonly string[] {
  return TWINS.get(key) ?? [];
}

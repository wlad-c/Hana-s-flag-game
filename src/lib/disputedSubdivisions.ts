import { UNOFFICIAL_SUBDIV_NOTES } from "./unofficialSubdivFlags";
import { hasSubdivisionFlag } from "../api/subdivisions";

/**
 * Subdivision codes whose territory is contested between two or more countries.
 * A disputed subdivision appears in the flag grid of EVERY country that claims it,
 * labelled "(disputed territory)" in each.
 *
 * Values are the detail-panel note text shown when the subdivision is selected.
 *
 * Note: a subdivision can be in both this map and UNOFFICIAL_SUBDIV_NOTES (e.g.
 * GE-AB has an unofficial flag AND is a disputed territory).
 */
export const DISPUTED_SUBDIV_NOTES: Record<string, string> = {
  // Taiwan — self-governing as the Republic of China; claimed by the PRC.
  // Taiwan is not a UN member state; the PRC holds China's UN seat.
  "CN-TW": "Taiwan has been governed by the Republic of China (ROC) since 1949, when the ROC government retreated to the island following the Chinese Civil War. The People's Republic of China (PRC) claims Taiwan as a province and considers itself the sole legitimate government of China. Taiwan is not a UN member state; the PRC holds China's seat in the United Nations. The flag shown is the ROC national flag used by Taiwan's government.",

  // Abkhazia — de facto independent; Georgia claims it; Russia backs independence.
  "GE-AB": "Abkhazia has operated as a de facto independent state since the 1992–1993 war with Georgia. It is recognised as independent by only a handful of countries (Russia, Nicaragua, Venezuela, Nauru, and Syria); Georgia and most of the international community regard it as Georgian territory under occupation. It appears here under Georgia, which holds the internationally recognised claim. The flag shown is the Republic of Abkhazia's own flag; Georgia does not officially recognise it.",

  // Transnistria — the left bank of the Dniester, controlled by the self-proclaimed
  // Pridnestrovian Moldavian Republic since the 1992 war; Moldova claims it (MD-SN).
  "MD-SN": "Transnistria, the strip of Moldova on the left bank of the Dniester, has been controlled since the 1992 war by the self-proclaimed Pridnestrovian Moldavian Republic, which governs from Tiraspol. No member of the United Nations recognises it. Moldova regards the territory as its own, as the administrative-territorial units of the left bank of the Dniester, with a special legal status under its 2005 law. The separatist authorities also control the city of Bender, on the right bank.",

  // Crimea & Sevastopol — Ukrainian ISO codes placed under Russia in the source data.
  // Shown under both Russia (administers) and Ukraine (internationally recognised claim).
  "UA-43": "The Autonomous Republic of Crimea (ISO 3166-2: UA-43) is internationally recognised as Ukrainian territory. Russia annexed it in February–March 2014 in a move rejected by Ukraine, the United Nations General Assembly (Resolution 68/262), and most countries. It is shown here under both Russia (which administers it) and Ukraine (which holds the internationally recognised claim).",
  "UA-40": "Sevastopol (ISO 3166-2: UA-40) is internationally recognised as Ukrainian territory. Russia has administered it as a federal city since its 2014 annexation of Crimea, which is not recognised by Ukraine or the United Nations. It is shown here under both Russia (which administers it) and Ukraine (which holds the internationally recognised claim).",

  // Azad Kashmir & Gilgit-Baltistan — administered by Pakistan; claimed by India.
  // Shown under both Pakistan (administers) and India (claims, as IN-AK~ / IN-GB~).
  "PK-JK": "Azad Jammu and Kashmir is administered by Pakistan as a self-governing territory, but India claims it in full as part of its Union Territory of Jammu and Kashmir. A United Nations-mandated plebiscite on the region's final status has never been held. It is shown here under both Pakistan (which administers it) and India (which claims it).",
  "PK-GB": "Gilgit-Baltistan is administered by Pakistan but claimed by India as part of its Union Territory of Jammu and Kashmir. China also disputes a portion of the territory (the Trans-Karakoram Tract, ceded by Pakistan to China in 1963 but not recognised by India). It is shown here under both Pakistan (which administers it) and India (which claims it).",
  "IN-AK~": "Azad Jammu and Kashmir is administered by Pakistan as a self-governing territory, but India claims it in full as part of its Union Territory of Jammu and Kashmir. A United Nations-mandated plebiscite on the region's final status has never been held. It is shown here under both Pakistan (which administers it) and India (which claims it).",
  "IN-GB~": "Gilgit-Baltistan is administered by Pakistan but claimed by India as part of its Union Territory of Jammu and Kashmir. China also disputes a portion of the territory (the Trans-Karakoram Tract, ceded by Pakistan to China in 1963 but not recognised by India). It is shown here under both Pakistan (which administers it) and India (which claims it).",

  // Western Sahara — Morocco administers; SADR/Polisario Front claims sovereignty.
  // SADR is not a UN member state; the UN lists Western Sahara as a Non-Self-Governing Territory.
  "MA-EH~": "Western Sahara is listed by the United Nations as a Non-Self-Governing Territory. Morocco administers approximately 80% of the territory and considers it its 'Southern Provinces'. The Sahrawi Arab Democratic Republic (SADR), backed by the Polisario Front and recognised by around 40 countries, claims the whole territory. A UN-mandated referendum on self-determination has been repeatedly postponed since 1991. Because SADR is not a UN member state, Western Sahara is shown only under Morocco here. The flag shown is the SADR national flag; Morocco does not officially recognise it.",

  // Northern Cyprus — Türkiye administers; Cyprus and the international community do not recognise TRNC.
  "TR-NC~": "The Turkish Republic of Northern Cyprus (TRNC) was proclaimed in 1983 following Türkiye's 1974 military intervention on the island. It is recognised only by Türkiye; the United Nations, Cyprus, and the rest of the international community regard the territory as part of the Republic of Cyprus under illegal occupation. It is shown here under Türkiye (which administers and recognises it) and under Cyprus (which holds the internationally recognised claim to the whole island).",
  "CY-NC~": "Northern Cyprus has been administered by Türkiye and the self-declared Turkish Republic of Northern Cyprus (TRNC) since Türkiye's 1974 military intervention. The United Nations regards the continued presence of Turkish forces as unlawful (UNSC Resolution 541). Cyprus and virtually all countries other than Türkiye consider Northern Cyprus to be part of the Republic of Cyprus. It is shown here under both Türkiye (which administers it) and Cyprus (which holds the internationally recognised claim). The flag shown is the TRNC flag; the Republic of Cyprus does not officially recognise it.",

  // Kosovo — declared independence from Serbia in 2008; not a UN member state.
  "RS-KM~": "Kosovo declared independence from Serbia in 2008 and is recognised by approximately 100 countries, including the United States and most EU members. Serbia, Russia, China, and others do not recognise it, and Serbia regards the territory as its Autonomous Province of Kosovo and Metohija. Kosovo is not a UN member state; a Security Council resolution on membership has been blocked by Russia and China. It is shown here under Serbia (which claims it). The flag shown is Kosovo's official flag; Serbia does not recognise it.",

  // Somaliland — declared independence from Somalia in 1991; not recognised by any UN member.
  "SO-SL~": "Somaliland declared independence from Somalia in 1991, claiming the territory of the former British Somaliland Protectorate. It operates as a de facto independent state with its own government, military, currency, and democratic elections, but is not recognised by any UN member state. Somalia claims sovereignty over the whole Somali territory, including Somaliland. It is shown here under Somalia (which claims it). The flag shown is the flag of the Republic of Somaliland; Somalia does not recognise it.",
};

/**
 * Maps a disputed/claimed subdivision code to the code of the parent subdivision
 * within the claiming nation's official political hierarchy.
 *
 * When present, the territory is NOT treated as a standalone entity by that nation:
 *   1. FLAG GRID — the entry is hidden (it is covered by its hierarchy parent's card).
 *   2. SUBDIVISION MAP — clicking the territory's landmass redirects to the parent code.
 *   3. GAME — the territory is excluded from game questions (its parent is asked instead).
 *
 * Only the CLAIMING / non-administering nation has a hierarchy parent.
 * The administering nation (e.g. UK for Falklands and Gibraltar) always shows the
 * territory as its own standalone division and is NOT listed here.
 *
 * See CLAUDE.md "Disputed territory neutrality" for the full policy.
 */
export const DISPUTED_TERRITORY_HIERARCHY: Readonly<Record<string, string>> = {
  // Argentina's constitution places the Malvinas / Falkland Islands inside the
  // Province of Tierra del Fuego, Antártida e Islas del Atlántico Sur (AR-V).
  "AR-ML~": "AR-V",

  // Spain's administrative law places Gibraltar in the Province of Cádiz (ES-CA),
  // within the Autonomous Community of Andalusia.
  "ES-GIB~": "ES-CA",

  // India's 1947 Instrument of Accession covers all of the former princely state of
  // Jammu and Kashmir. India's Union Territory of Jammu and Kashmir (IN-JK) includes
  // the Pakistani-administered Azad Jammu and Kashmir.
  "IN-AK~": "IN-JK",

  // Following India's 2019 reorganisation of J&K, the area bordering Gilgit-Baltistan
  // falls within India's Union Territory of Ladakh (IN-LA).
  "IN-GB~": "IN-LA",
};

// Reverse lookup: parent subdivision → set of disputed child codes.
// Used by SubdivisionMap to highlight child polygons when the parent is selected.
const _reverseHierarchy: Record<string, Set<string>> = {};
for (const [child, parent] of Object.entries(DISPUTED_TERRITORY_HIERARCHY)) {
  (_reverseHierarchy[parent] ??= new Set()).add(child);
}
export const DISPUTED_HIERARCHY_CHILDREN_OF: Readonly<Record<string, ReadonlySet<string>>> =
  _reverseHierarchy;

// English short names for countries that have unofficial or disputed-territory flags
// shown in their subdivision grids. Used to build the "not officially recognised by X" label.
const COUNTRY_NAME: Record<string, string> = {
  AR: "Argentina",
  CN: "China",
  CY: "Cyprus",
  ES: "Spain",
  FR: "France",
  GB: "the United Kingdom",
  GE: "Georgia",
  MD: "Moldova",
  MA: "Morocco",
  RS: "Serbia",
  SO: "Somalia",
  TR: "Türkiye",
  ZA: "South Africa",
};

/**
 * Returns the disputed/claimed or unofficial label for a subdivision under a given parent country.
 * If the subdivision is not disputed, returns null.
 */
export function getSubdivisionDisputeLabel(
  code: string,
  typeLabel: string,
  parentCountryCode?: string
): { text: string; isUnofficial: boolean } | null {
  const disputedCodes = new Set(Object.keys(DISPUTED_SUBDIV_NOTES));

  // This label only makes sense when a flag is ACTUALLY displayed.
  const flagShown = hasSubdivisionFlag(code);

  const parent = parentCountryCode?.toUpperCase();
  const parentName = (parent && COUNTRY_NAME[parent]) ?? parent ?? "";
  const unofficialText = parentName
    ? `Flag not officially recognised by ${parentName}`
    : "Unofficial flag";

  // Codes in UNOFFICIAL_SUBDIV_NOTES but not in the disputed set show the
  // "not officially recognised" label — but only when their flag is actually shown.
  if (!disputedCodes.has(code)) {
    if (code in UNOFFICIAL_SUBDIV_NOTES && flagShown) {
      return { text: unofficialText, isUnofficial: true };
    }
    return null;
  }

  // Flag is "unofficial" when displayed under a claimant that does not officially
  // recognise the territory's flag.
  const isUnofficial =
    flagShown && !!parent && ["CN", "ES", "AR", "CY", "MA", "GE", "MD", "RS", "SO"].includes(parent);

  if (isUnofficial) {
    return { text: unofficialText, isUnofficial: true };
  }

  // When no flag is shown, the group heading ("DISPUTED TERRITORY") already
  // communicates the status — a redundant per-card label adds nothing.
  if (!flagShown) {
    return null;
  }

  // Flag is shown and not unofficial — label by type so the card notes the status.
  let text = "disputed territory";
  const type = typeLabel.toLowerCase();
  if (type.includes("claimed")) {
    if (type.includes("state")) {
      text = "claimed state";
    } else {
      text = "claimed territory";
    }
  } else if (type.includes("disputed")) {
    text = "disputed territory";
  }

  return { text, isUnofficial: false };
}


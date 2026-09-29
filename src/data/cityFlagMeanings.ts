/**
 * Sourced city-flag-meaning explanations for the Learn-mode capital-city widget.
 *
 * Rendered by `src/components/FlagMeaning.tsx` (the SAME progressive-disclosure
 * "What this flag means" component the national/subnational flags use, so the
 * look, font, spacing and behaviour are identical) below the capital city's flag
 * in `src/components/CapitalDetails.tsx`.
 *
 * Keyed by the ISO 3166-2 subdivision code whose CAPITAL city the flag belongs
 * to — the same key `CAPITAL_FLAGS` / `CAPITAL_DETAILS` use — because the widget
 * shows a subdivision's capital-city flag. City flags are a distinct category
 * from national/subnational flags (exactly like the capital-flag files), so they
 * live in their own dataset rather than in `flagMeanings.ts`.
 *
 * HARD RULE — see "Flag-meaning explanations must be sourced and must separate
 * myth from fact" in CLAUDE.md. Every entry:
 *   - describes the flag's design + DOCUMENTED symbolism only (never invented,
 *     paraphrased-to-fill, or machine-generated), and
 *   - carries at least one authoritative `sources` citation with a real URL, and
 *   - places any widely-believed-but-false / folk-etymology / disputed claim in
 *     `myths` (claim + sourced reality) so it is shown as myth, NOT as fact.
 *
 * An entry MUST only describe the flag the widget actually shows for that code
 * (the bundled `public/capital-flags/*` file); never describe a variant the app
 * does not display.
 *
 * `scripts/check-city-flag-meanings.mjs` (run by `npm run flags:check` + CI)
 * fails the build if an entry has no description, no source, a source without a
 * valid http(s) URL, or a malformed myth. The check is a safety net, not a
 * substitute for verifying each claim against the cited source by hand.
 *
 * Coverage is an incrementally-growing curated set — a capital whose code has no
 * entry simply renders no disclosure.
 */

import type { FlagMeaning as FlagMeaningData } from "./flagMeanings";

export const CITY_FLAG_MEANINGS: Record<string, FlagMeaningData> = {
  // ── Lisbon — capital of Portugal and of the Lisbon region ───────────────────
  "CH-AR": {
    description:
      "Herisau’s flag shows its arms: a black bear striding upright on white, a golden log on its shoulder. " +
      "Like many places in the region, it goes back to the legend of St Gall, first written down in 771: the " +
      "saint told a bear to fetch wood for his fire, and it came back with a heavy log. The black bear became " +
      "the emblem of the Abbey of St. Gall in the 14th century; the shouldered log first appears on Herisau’s " +
      "seal of 1401, and Herisau kept it.",
    sources: [
      { title: "Das Herisauer Wappen — Gemeinde Herisau (2012)", url: "https://www.herisau.ch/_docn/4590223/Das_Herisauer_Wappen.pdf" },
      { title: "Herisau (Switzerland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ch-ar005.html" },
    ],
  },

  "ID-BA": {
    description:
      "Denpasar’s yellow flag bears the city emblem, which the city explains: the pentagon stands for " +
      "Pancasila; the golden Padmasana shrine of the Jagatnatha temple for the universe as a place of worship, " +
      "and for Denpasar as the seat of government; the keris for a heroic spirit and a city of struggle; the " +
      "split gate (candi bentar) for Denpasar’s own culture and as the gateway to Bali; and the three steps " +
      "for the Tri Kaya Parisudha precept its development rests on. Its 27 grains of rice, 2 chain links and " +
      "9 cotton flowers with 2 leaves spell out the city’s founding date, 27 February 1992.",
    sources: [
      {
        title: "Profil Statistik Gender Kota Denpasar 2024, §3.3 Lambang Kota Denpasar dan Penjelasannya — Pemerintah Kota Denpasar",
        url: "https://www.kb.denpasarkota.go.id/public/uploads/download/download_242210091042_statistik-gender-kota-denpasar-tahun-2024.pdf",
      },
    ],
  },

  "PT-11": {
    description:
      "A field divided into eight alternating black and white triangles (gyronny), bearing in the " +
      "centre the coat of arms of the city of Lisbon: a golden ship (nau) sailing on green-and-white " +
      "waves, flanked by two black ravens, beneath a golden mural crown, on a scroll reading “Muito " +
      "Nobre e Sempre Leal Cidade de Lisboa” (“Most Noble and Ever Loyal City of Lisbon”). The ship " +
      "and the two ravens commemorate Saint Vincent of Saragossa, the city’s patron: in 1173 King " +
      "Afonso I had the saint’s relics carried by ship to Lisbon Cathedral, and by legend ravens had " +
      "guarded his body since his martyrdom and accompanied the vessel — so the arms depict the ship " +
      "that brought the relics, with a raven at prow and stern.",
    sources: [
      {
        title: "Saint Vincent of Saragossa — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Saint_Vincent_of_Saragossa",
      },
      {
        title: "Lisbon — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lisbon",
      },
    ],
  },

  // ── Madrid — capital of the Community of Madrid and of Spain ─────────────────
  "ES-M": {
    description:
      "A crimson (carmesí) field bearing the coat of arms of the city of Madrid: a black bear standing " +
      "on its hind legs to eat from a green strawberry tree (madroño), on a silver field within a blue " +
      "border charged with seven silver stars, the whole ensigned with an open royal crown. The bear " +
      "and the tree descend from a medieval dispute (around 1222) between the town council and the " +
      "clergy over rights to Madrid’s woodland and pasture: the council took the bear reaching up the " +
      "tree, associating itself with the trees and the timber. The seven stars represent the stars of " +
      "the constellation Ursa Major (the Great Bear / Big Dipper) and appear in the earliest designs; " +
      "the crown was added after 1544, when Charles I (Emperor Charles V) granted Madrid the titles " +
      "“Imperial and Crowned”. The crimson of the flag is the traditional colour of the old Crown of " +
      "Castile.",
    sources: [
      {
        title: "Coat of arms of Madrid — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Madrid",
      },
      {
        title: "Flag of the City of Madrid — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Madrid",
      },
    ],
  },

  // ── Rome — capital of Italy and of the Lazio region ─────────────────────────
  "IT-RM": {
    description:
      "A vertical bicolour of dark red (a Tyrian-purple/amaranth shade) at the hoist and golden " +
      "yellow at the fly — the two civic colours of Rome. They continue the city’s medieval heraldic " +
      "tradition: Rome’s coat of arms (officially adopted 1884) is a dark-red shield bearing a golden " +
      "Greek cross and the golden letters SPQR set diagonally. “SPQR” stands for Senatus Populusque " +
      "Romanus (“the Senate and People of Rome”), the formula of the ancient Roman state and, since " +
      "1927, the city’s official motto. The vertical-stripe flag was introduced in 1870, when Rome " +
      "became part of the Kingdom of Italy.",
    sources: [
      { title: "Flag of Rome — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rome" },
    ],
  },

  // ── Barcelona — capital of the Barcelona province and of Catalonia ───────────
  "ES-B": {
    description:
      "A flag quartered from the arms of the city of Barcelona: the first and fourth quarters bear the " +
      "cross of Saint George (a red cross on white), and the second and third bear the four red pallets " +
      "on gold of the Crown of Aragon and the Counts of Barcelona. Saint George (Sant Jordi) is the " +
      "city’s and Catalonia’s patron — the cross was formally established as the city’s badge by 1395 — " +
      "while the red-and-gold bars descend from the House of Barcelona and the Crown of Aragon. The " +
      "citizens’ own emblem, the cross, is placed in the more honourable first and fourth quarters. The " +
      "quartered arms are first documented in 1329.",
    sources: [
      {
        title: "Coat of arms of Barcelona — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Barcelona",
      },
    ],
  },

  // ── Warsaw — capital of Poland and of the Masovian Voivodeship ──────────────
  "PL-MZ": {
    description:
      "A horizontal bicolour of yellow over red — the civic colours of Warsaw. They derive from the " +
      "city’s coat of arms, the Syrenka (the Warsaw Mermaid): a mermaid brandishing a raised sword and " +
      "a round shield on a red field, the city’s guardian and defender of legend. Warsaw’s arms have " +
      "been rendered as a sword-and-shield mermaid since 1622 (an earlier 1390 seal showed a dragon-like " +
      "creature); the present design was fixed in 1938 and restored in 1990.",
    sources: [
      {
        title: "Coat of arms of Warsaw — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Warsaw",
      },
    ],
  },

  // ── Bern — capital of Switzerland and of the canton of Bern ─────────────────
  "CH-BE": {
    description:
      "A red field crossed by a golden (yellow) diagonal band on which a black bear climbs upward — the " +
      "arms shared by the city and canton of Bern. The bear is canting arms: by tradition Duke " +
      "Berthold V of Zähringen vowed to name his new city after the first animal taken on a hunt in the " +
      "surrounding forest, and the first was a bear (German Bär), giving “Bern”. The bear appears on the " +
      "city’s seals from about 1224; live bears have been kept by the city (today at the Bärenpark) for " +
      "centuries.",
    sources: [
      {
        title: "Coat of arms of Bern — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Bern",
      },
    ],
  },

  // ── Munich — capital of the German state of Bavaria ─────────────────────────
  "DE-BY": {
    description:
      "A horizontal bicolour of black over gold — the civic colours of Munich. They come from the " +
      "city’s coat of arms, the Münchner Kindl (“Munich Child”): a young monk in a black cowl trimmed " +
      "with gold, holding a red oath-book. The monk is canting arms — München derives from an Old High " +
      "German phrase meaning “by the monks” (Mönche), referring to the monastic community at the city’s " +
      "origin — so the figure literally depicts the city’s name. Over the centuries the monk was " +
      "increasingly drawn as a child, giving the emblem its name; the current form was standardised in " +
      "1957.",
    sources: [
      {
        title: "Coat of arms of Munich — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Munich",
      },
    ],
  },

  // ── Athens — capital of Greece and of the Attica region ─────────────────────
  "GR-A1": {
    description:
      "A blue field within a gold-and-red border (modelled on the flag of Attica), charged with a white " +
      "cross bearing at its centre a blue disc that shows the head of the goddess Athena in white and " +
      "gold, framed by golden olive branches. Athena is the city’s patron and namesake, and the olive " +
      "her sacred tree — by myth her gift of the olive won her the patronage of the city over Poseidon. " +
      "The municipal flag was adopted in 1995.",
    sources: [
      {
        title: "Athens (Municipality, Greece) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/gr-at-at.html",
      },
    ],
  },

  // ── Edinburgh — capital of Scotland ─────────────────────────────────────────
  "GB-SCT": {
    description:
      "A white field bearing a black triple-towered castle on a rock — Edinburgh Castle, the arms of the " +
      "City of Edinburgh (registered with the Lord Lyon in 1732). The full achievement’s supporters are " +
      "a richly-attired maiden — recalling the castle’s old name Castellum Puellarum, the “Castle of the " +
      "Maidens” — and a doe, for the city’s patron Saint Giles, who by legend lived as a hermit with " +
      "only a doe for company; the crest is an anchor, marking the Lord Provost’s title of Admiral of " +
      "the Firth of Forth. The motto is “Nisi Dominus Frustra” (“Except the Lord [build the house, they " +
      "labour] in vain”), from Psalm 127.",
    sources: [
      {
        title: "Coat of arms of Edinburgh — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Edinburgh",
      },
    ],
  },

  // ── Cardiff — capital of Wales ──────────────────────────────────────────────
  "GB-WLS": {
    description:
      "A white field with a green mount on which a red dragon rears up — the arms of the City of Cardiff, " +
      "granted in 1906. The red dragon is the national emblem of Wales; beside it grows a leek, the " +
      "Welsh floral emblem; and the dragon upholds a red banner charged with three silver chevrons, the " +
      "reputed ensign of Iestyn ap Gwrgant, the last Welsh prince of Glamorgan (11th century). The motto " +
      "is “Y Ddraig Goch Ddyry Gychwyn” (“The Red Dragon Leads the Way”).",
    sources: [
      {
        title: "Cardiff, City of (Glamorganshire) — public-arms reference (DrawShield)",
        url: "https://drawshield.net/reference/public-arms/c/cardiff.html",
      },
      {
        title: "National symbols of Wales — Wikipedia",
        url: "https://en.wikipedia.org/wiki/National_symbols_of_Wales",
      },
    ],
  },

  // ── Belfast — capital of Northern Ireland ───────────────────────────────────
  "GB-NIR": {
    description:
      "A white field bearing a ship in full sail beneath a pile of vair (a heraldic fur), with a bell in " +
      "a canton at the upper hoist — the arms of the City of Belfast (granted 1890, in use from a 1640 " +
      "seal). The ship reflects Belfast’s maritime and shipbuilding heritage; the bell is canting arms, " +
      "punning on the first syllable of “Bel-fast”; and the vair is drawn from the arms of Sir Arthur " +
      "Chichester, founder of modern Belfast. The supporters (a chained wolf and a seahorse) repeat " +
      "these themes — the wolf from the Chichester arms, the seahorse a sea emblem. The motto is “Pro " +
      "Tanto Quid Retribuamus” (“In return for so much, what shall we give back?”), from Psalm 116. " +
      "(This is the flag of the city of Belfast, not the Ulster Banner of Northern Ireland.)",
    sources: [
      {
        title: "Coat of arms of Belfast — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Belfast",
      },
    ],
  },

  // ── Stockholm — capital of Sweden ───────────────────────────────────────────
  "PT-20": {
    description:
      "Ponta Delgada flies the typical Portuguese municipal flag: its arms on plain yellow, adopted in 1946. " +
      "The seven golden arrows on red are the attributes of St Sebastian, the municipal patron — the city grew " +
      "out of the village of São Sebastião. The goshawk (açor) holding a quina, the five-disc Portuguese " +
      "shield, stands for the Azores, whose name it pictures, and appears in most Azorean municipal arms; the " +
      "five-towered crown marks city rank.",
    sources: [
      { title: "Ponta Delgada (Portugal) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pt-pdl.html" },
      { title: "Azores: municipalities (goshawk symbolism) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pt-a-.html" },
    ],
  },

  "SE-AB": {
    description:
      "A blue field bearing the golden, crowned head of Saint Erik — the arms of Stockholm. Erik IX, a " +
      "12th-century king of Sweden, is the patron saint of both the kingdom and its capital; his crowned " +
      "head has identified the city on its seals since the Middle Ages. Blue and gold are also the " +
      "national colours of Sweden.",
    sources: [
      {
        title: "Coat of arms of Stockholm — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Stockholm",
      },
    ],
  },

  // ── San Luis — capital of San Luis Province, Argentina ──────────────────────
  "AR-D": {
    description:
      "A modern minimalist flag divided by a diagonal: the upper celeste (sky-blue) field stands for the " +
      "sky — liberty, loyalty and truth — while the lower green field stands for the sierras that ring the " +
      "city and their vegetation. At the centre a clock tower recalls the city’s landmark tower, and the " +
      "clock’s hands are drawn as a bird in flight, reinforcing the theme of the open sky.",
    sources: [
      {
        title: "La Capital Department, San Luis (Argentina) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ar-d-ca.html",
      },
    ],
  },

  // ── Paraná — capital of Entre Ríos Province, Argentina ──────────────────────
  "AR-E": {
    description:
      "A white field bearing the municipal coat of arms (adopted 1877; the flag was made official in 1994). " +
      "The oval shield is split: the upper half carries the star of Entre Ríos on purple and the clasped " +
      "hands of fraternity on blue, for the province the city belongs to; the lower half shows the city " +
      "itself — the characteristic barranca of La Bajada, the Paraná river at its foot and islands beyond. " +
      "The shield is framed by a sheaf of wheat, a log, an anchor and a piece of local shell-limestone, and " +
      "topped by the Phrygian cap of liberty lit by the Sun of May for the Argentine Republic.",
    sources: [
      {
        title: "Símbolos — Municipalidad de Paraná",
        url: "https://www.parana.gob.ar/gobierno/simbolos.php",
      },
      {
        title: "Bandera de Paraná — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_Paran%C3%A1",
      },
    ],
  },

  // ── Santiago del Estero — capital of Santiago del Estero Province, Argentina ─
  "AR-G": {
    description:
      "A white field — for purity, peace and “parliament” — enclosed by a golden rectangular border that " +
      "stands for straightness on all four sides and for the sun, the first dignity of Argentine heraldry. " +
      "At the centre is the city’s coat of arms, granted by King Felipe II in 1577: a golden castle of three " +
      "towers (wealth, strength and faith) with blue doors and windows (nobility), the waters of the Dulce " +
      "river, and three silver scallop shells for the city’s patron Santiago (St James). A light-blue ribbon " +
      "reads “Muy Noble Ciudad” and the tie bears “Madre de Ciudades” (Mother of Cities), Santiago del Estero " +
      "being the oldest continuously-inhabited city in Argentina.",
    sources: [
      {
        title: "Capital Department, Santiago del Estero (Argentina) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ar-g-cp.html",
      },
    ],
  },

  // ── Resistencia — capital of Chaco Province, Argentina ──────────────────────
  "AR-H": {
    description:
      "Adopted in 2019 from a public competition. Its colours echo the Chaco provincial flag: forest green " +
      "for the territory’s nature, sky-blue for the national flag and for the waters the first Friulian " +
      "immigrants arrived by, and golden yellow from the sun of the national flag. The white square set on " +
      "point in the centre reflects a real feature of the city — its street grid is turned 45° from north, " +
      "so the block corners point to the four cardinal directions, making the plan a compass. Within it the " +
      "“Sol de Resistencia”, a Sun of May rendered as a sculptural form, alludes to Resistencia’s identity as " +
      "“the City of Sculptures”.",
    sources: [
      {
        title: "Bandera de Resistencia — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_Resistencia",
      },
    ],
  },

  // ── San Fernando del Valle de Catamarca — capital of Catamarca, Argentina ───
  "AR-K": {
    description:
      "Adopted in 2005 from an open competition (winning design by Fabián Martinena). The whole flag evokes " +
      "the Catamarcan poncho, the region’s signature weaving: on a white field two blood-red stripes stand " +
      "for the ochre earth and two green guard-bands for the sap that nourishes it, while the central figure " +
      "of eight rectangles imitates the patterns the weavers (teleras) work into a poncho’s borders. The " +
      "dark-brown motif represents the sacred spirit of the mountains, and the cross within it is the Cross " +
      "of America — standing for water and joining the indigenous and Hispanic-Christian strands of the " +
      "province’s culture.",
    sources: [
      {
        title: "Simbología — Municipalidad de San Fernando del Valle de Catamarca",
        url: "https://www.catamarcaciudad.gob.ar/simbologia/",
      },
      {
        title: "Bandera de San Fernando del Valle de Catamarca — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_San_Fernando_del_Valle_de_Catamarca",
      },
    ],
  },

  // ── Formosa — capital of Formosa Province, Argentina ────────────────────────
  "AR-P": {
    description:
      "The flag of the city of Formosa, chosen by public vote in the “Mi Ciudad es Bandera” competition " +
      "(winning design by Matilde E. Cañete and José M. Lezcano). Its centre is the municipal seat — the " +
      "building where the city first took shape and where formoseños still gather — set with the railway " +
      "station and the streets that stand for the city’s growth, the lapacho flower as the emblematic bloom " +
      "of the region, and a sun for rebirth and hope.",
    sources: [
      {
        title: "La Ciudad de Formosa ya tiene su bandera oficial — Diario Exprés",
        url: "https://www.expresdiario.com.ar/la-ciudad-de-formosa-ya-tiene-su-bandera-oficial-un-simbolo-de-identidad-y-pertenencia/",
      },
    ],
  },

  // ── Neuquén — capital of Neuquén Province, Argentina ────────────────────────
  "AR-Q": {
    description:
      "Titled “Confluencia” and first raised in 2010 (designed by Carlos Alberto Juárez), the flag has a " +
      "sky-blue field crossed by two white wavy ribbons that picture the confluence of the Neuquén and Limay " +
      "rivers — the meeting of waters that gives the city its site and its name.",
    sources: [
      {
        title: "Neuquén (ciudad) — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Neuqu%C3%A9n_(ciudad)",
      },
    ],
  },

  // ── Santa Fe — capital of Santa Fe Province, Argentina ──────────────────────
  "AR-S": {
    description:
      "The first official flag of the city of Santa Fe, chosen by public competition. Its celeste and white " +
      "recall Belgrano’s national flag, the sky-blue also standing for the city’s waters — the Paraná and " +
      "Salado rivers and the Setúbal lagoon. It bears the Puente Colgante (hanging bridge) as a symbol of " +
      "union, laurels for the achievements of its people, and a book for the national and provincial " +
      "constitutions — Santa Fe being the “Cradle of the Constitution”, placed at the flag’s centre for that " +
      "reason.",
    sources: [
      {
        title: "Qué significan los símbolos de la bandera de la ciudad de Santa Fe — Aire de Santa Fe",
        url: "https://www.airedesantafe.com.ar/santa-fe/que-significan-los-simbolos-la-bandera-la-ciudad-santa-fe-explicados-un-experto-n636405",
      },
    ],
  },

  // ── Corrientes — capital of Corrientes Province, Argentina ──────────────────
  "AR-W": {
    description:
      "Established by municipal ordinance in 2014. Sky-blue side bands (the colour Belgrano chose for the " +
      "national and provincial flags) frame thin red stripes for federalism and a central white band for God " +
      "and peace. On the white band a setting sun — the sunset seen from the city’s riverfront Costanera — " +
      "carries at its centre the founding Cross of Miracles (Cruz de los Milagros), and seven spear-points " +
      "rise from the base for the “Siete Corrientes”, the seven river points in the city’s old name San Juan " +
      "de Vera de las Siete Corrientes.",
    sources: [
      {
        title: "Bandera de la Ciudad de Corrientes — Municipalidad de Corrientes",
        url: "https://ciudaddecorrientes.gov.ar/informaci-n/bandera-de-la-ciudad-de-corrientes",
      },
      {
        title: "Bandera de la Ciudad de Corrientes — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_la_Ciudad_de_Corrientes",
      },
    ],
  },

  // ── Córdoba — capital of Córdoba Province, Argentina ────────────────────────
  "AR-X": {
    description:
      "Adopted in 2023, the flag of the city of Córdoba has three equal horizontal stripes — red, white and " +
      "yellow — with a golden Jesuit sun on the white centre. Red stands for the courage, strength and " +
      "potential of the cordobés people; white for living together in harmony and for the city’s place as a " +
      "geographic and strategic hub; yellow for joy, energy and liveliness. The golden Jesuit sun recalls " +
      "Córdoba’s historic and cultural legacy and the presence of the Society of Jesus (whose Jesuit Block is " +
      "a UNESCO World Heritage Site).",
    sources: [
      {
        title: "La bandera oficial de la ciudad ya flamea en el cielo cordobés — Municipalidad de Córdoba",
        url: "https://cordoba.gob.ar/la-bandera-oficial-de-la-ciudad-ya-flamea-en-el-cielo-cordobes/",
      },
      {
        title: "Bandera de Córdoba (Argentina) — Wikipedia (es)",
        url: "https://es.wikipedia.org/wiki/Bandera_de_C%C3%B3rdoba_(Argentina)",
      },
    ],
  },

  // ── Sydney — capital of the Australian state of New South Wales ─────────────
  "AU-NSW": {
    description:
      "The flag of the City of Sydney, a banner of the city arms granted in 1908. On a gold-and-blue " +
      "field a three-masted sailing ship recalls the maritime founding of Sydney; the crest is an anchor " +
      "within a mural crown surmounted by a star. As originally granted the supporters were an " +
      "18th-century British seaman and an Aboriginal Australian, and the motto was “I take but I " +
      "surrender” — read as the colony’s claim of the land and its later surrender to the emerging " +
      "Australian nation. (A redesigned version of the arms followed in 1996.)",
    sources: [
      {
        title: "Coat of arms of Sydney — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Sydney",
      },
    ],
  },

  // ── Graz — capital of the Austrian state of Styria ──────────────────────────
  "AT-6": {
    description:
      "A green field bearing a white (silver) panther with red horns, claws and tongue, breathing red " +
      "fire — the Grazer Panther. Graz has borne the panther of Styria since it was the medieval capital " +
      "of the duchy (the Styrian panther appears from the seal of Margrave Ottokar III in 1160); the " +
      "city’s version differs from the state arms in that its panther is crowned. In European heraldry " +
      "the panther is a symbol of strength; the fire-breathing beast is the emblem of Styria and its " +
      "capital.",
    sources: [
      {
        title: "Coat of arms of Styria — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Styria",
      },
      { title: "Graz — Wikipedia", url: "https://en.wikipedia.org/wiki/Graz" },
    ],
  },

  // ── Innsbruck — capital of the Austrian state of Tyrol ──────────────────────
  "AT-7": {
    description:
      "A red field bearing a white bird’s-eye view of the bridge over the river Inn. These are canting " +
      "arms — Innsbruck means “bridge over the Inn” (the river Inn + German Brücke, “bridge”) — so the " +
      "flag literally depicts the city’s name and the crossing that gave the town its importance on the " +
      "trade route. The bridge design has been used since 1267.",
    sources: [
      { title: "Innsbruck — Wikipedia", url: "https://en.wikipedia.org/wiki/Innsbruck" },
    ],
  },

  // ── Salzburg — capital of the Austrian state of Salzburg ────────────────────
  "AT-5": {
    description:
      "A horizontal bicolour of red over white — the traditional colours of Salzburg, taken from the " +
      "arms of the former Prince-Archbishopric of Salzburg. Those arms are parted per pale: a black lion " +
      "on gold and a silver bar on red; the official version of the flag adds them at the centre beneath " +
      "the crown of a Prince of the Holy Roman Empire (added after Salzburg passed to Habsburg rule in " +
      "1816).",
    sources: [
      {
        title: "Salzburg (Austria) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/at-sa.html",
      },
    ],
  },

  // ── Tirana — capital of Albania ─────────────────────────────────────────────
  "AL-11": {
    description:
      "A light-blue field bearing the arms of Tirana: a shield parted per pale red and blue showing, on " +
      "the hoist side, the white Tirana Clock Tower (built 1822, a landmark of the city) and, on the fly " +
      "side, a silver rampant lion, with a golden fleur-de-lis in chief; above the shield rises Tirana " +
      "Castle (the Fortress of Justinian). The lion and fleur-de-lis are the emblem of the medieval " +
      "Skuraj family that ruled central Albania. The arms were adopted by the city council in 2000.",
    sources: [
      {
        title: "Symbols of Tirana — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Symbols_of_Tirana",
      },
      { title: "Flag of Tirana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tirana" },
    ],
  },

  // ── Abu Dhabi — capital of the United Arab Emirates ─────────────────────────
  "AE-AZ": {
    description:
      "A red field with a white rectangle in the upper hoist (canton) — the flag of the Emirate of Abu " +
      "Dhabi. Red was the traditional banner colour of the Trucial emirates; under the 1820 General " +
      "Maritime Treaty with Britain the emirates added white to their plain red flags as a sign of " +
      "peace at sea, and Abu Dhabi carries the white as a canton to distinguish its flag from those of " +
      "the neighbouring emirates.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Dubai — capital of the Emirate of Dubai (UAE) ───────────────────────────
  "AE-DU": {
    description:
      "A red field with a white vertical stripe along the hoist — the flag of the Emirate of Dubai. Red " +
      "was the traditional colour of the Trucial emirates; the white was added under the 1820 General " +
      "Maritime Treaty with Britain as a sign of peaceful intent at sea.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Sharjah — capital of the Emirate of Sharjah (UAE) ───────────────────────
  "AE-SH": {
    description:
      "A red rectangle within a broad white border — the “white-pierced-red” flag of the Emirate of " +
      "Sharjah. This white-bordered red design was the pattern set for the Trucial States under the 1820 " +
      "General Maritime Treaty with Britain (the white signalling peace at sea) and is associated with " +
      "the Al Qawasim, Sharjah’s ruling house.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Ajman — capital of the Emirate of Ajman (UAE) ───────────────────────────
  "AE-AJ": {
    description:
      "A red field with a white vertical stripe along the hoist — the flag of the Emirate of Ajman. As " +
      "with the other Trucial emirates, the red is the traditional field colour and the white was added " +
      "under the 1820 General Maritime Treaty with Britain as a mark of peace at sea.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Umm Al Quwain — capital of the Emirate of Umm Al Quwain (UAE) ────────────
  "AE-UQ": {
    description:
      "A red field with a white vertical stripe along the hoist and a white star and crescent in the red " +
      "— the flag of the Emirate of Umm Al Quwain. The red and white follow the Trucial pattern set by " +
      "the 1820 General Maritime Treaty with Britain (red field, white for peace at sea); the star and " +
      "crescent are a symbol of Islam.",
    sources: [
      {
        title: "Flag of the United Arab Emirates — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates",
      },
      {
        title: "General Maritime Treaty 1820 — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ae1820tr.html",
      },
    ],
  },

  // ── Luanda — capital of Angola ──────────────────────────────────────────────
  "AO-LUA": {
    description:
      "A Portuguese-style municipal flag: the arms of Luanda on a gyronny of eight (eight triangles " +
      "radiating from the centre) in purple and yellow, ensigned with a golden mural crown. In the " +
      "Portuguese municipal-heraldry tradition Angola inherited, the gyronny of eight marks the rank of " +
      "a city (as opposed to a town or village) and the golden five-towered mural crown denotes a city " +
      "municipality.",
    sources: [
      {
        title: "Luanda (Angola) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ao-lu.html",
      },
    ],
  },

  // ── Gyumri — capital of the Shirak Province, Armenia ────────────────────────
  "AM-SH": {
    description:
      "A white field within a golden frame, bearing a red cross and the golden panther of the Bagratid " +
      "dynasty. The red cross stands for the endurance of the people and their Christian faith; the " +
      "golden panther, taken from the arms of the Bagratids, symbolises Armenian independence and " +
      "statehood. The city arms were adopted in 2001 and the flag in 2011.",
    sources: [
      {
        title: "Symbols of Gyumri — City of Gyumri (official)",
        url: "https://www.gyumricity.am/en/gyumri/symbols-of-gyumri",
      },
      {
        title: "Gyumri (Municipality, Armenia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/am-gyumr.html",
      },
    ],
  },

  // ── Kabul — capital of Afghanistan ──────────────────────────────────────────
  "AF-KAB": {
    description:
      "A dark-blue field bearing the white seal of the Kabul municipality: an eagle holding a key above " +
      "the national emblem of Afghanistan, encircled by the municipality’s name, with the dates 1298 " +
      "(1919, the year of Afghan independence from Britain) and 1389 (2010). The dark-blue field sets " +
      "the city flag apart from Afghanistan’s national colours.",
    sources: [
      {
        title: "Kabul (Afghanistan) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/af-kabul.html",
      },
    ],
  },

  // ── Norfolk Island (capital Kingston) — Australian external territory ────────
  "AU-NF": {
    description:
      "A green–white–green vertical triband bearing a green Norfolk Island pine in the central white " +
      "band. The Norfolk Island pine is native to the island and its official tree; the green stands " +
      "for the island’s abundant vegetation and fertile land, and the white for peace and harmony " +
      "between the people and the natural world. The flag was set by the Norfolk Island Flag and Public " +
      "Seal Act 1979 and has flown since 1980.",
    sources: [
      {
        title: "Flag of Norfolk Island — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Norfolk_Island",
      },
    ],
  },

  // ── Darwin — capital of the Northern Territory, Australia ───────────────────
  "AU-NT": {
    description:
      "A green–yellow–red vertical tricolour with the arms of the City of Darwin (granted 1959) on the " +
      "yellow. The shield’s ship marks Darwin’s natural harbour and its founding as a port; the fort " +
      "recalls its origin as a military base defending the British claim to the north; the supporters " +
      "are an Aboriginal man, for the area’s first inhabitants, and a European miner, for the mining " +
      "industry that grew the town; and the encircled star is taken from the arms of Charles Darwin, " +
      "the city’s namesake. The crest’s compass, north highlighted, marks Darwin as Australia’s " +
      "northern city.",
    sources: [
      {
        title: "Coat of arms of Darwin — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Darwin",
      },
    ],
  },

  // ── Brisbane — capital of Queensland, Australia ─────────────────────────────
  "AU-QLD": {
    description:
      "The flag of the City of Brisbane, blue and gold with the city arms. The three caducei (the staff " +
      "of Hermes) stand for commerce — Hermes being the Greek god and protector of trade — reflecting " +
      "Brisbane’s role as a trading port; the stars (mullets) recall the astronomer Sir Thomas Brisbane, " +
      "after whom the city is named, and the Stafford knot his old regiment. Blue represents the sea and " +
      "the Brisbane River, gold the sun and the city’s warm climate.",
    sources: [
      {
        title: "Coat of arms of Brisbane — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Brisbane",
      },
    ],
  },

  // ── Adelaide — capital of South Australia ───────────────────────────────────
  "AU-SA": {
    description:
      "A blue field divided into four quarters by a gold cross surmounted by a red cross, ensigned with " +
      "a golden mural crown (the mark of a municipality) — the arms of the City of Adelaide, granted " +
      "1929. The quarters show a three-masted ship (commerce and the sea link to Britain), a golden " +
      "fleece (the wool trade), a bull’s head (the cattle industry) and a wheatsheaf (agriculture) — the " +
      "foundations of the early city’s economy.",
    sources: [
      {
        title: "Coat of arms of Adelaide — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Adelaide",
      },
    ],
  },

  // ── Melbourne — capital of Victoria, Australia ──────────────────────────────
  "AU-VIC": {
    description:
      "A white (silver) field bearing the red cross of Saint George with a royal crown at its centre, " +
      "and in the four corners a golden fleece, a black bull, a spouting whale and a three-masted ship " +
      "— the arms of the City of Melbourne (approved for the city seal in 1843; granted by letters " +
      "patent in 1940). The fleece, bull, whale and ship stand for wool, tallow and oil — the young " +
      "city’s chief exports — and their transport by sea from Port Phillip; the cross and crown denote " +
      "loyalty to the Crown and Britain.",
    sources: [
      {
        title: "Coat of arms of Melbourne — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Melbourne",
      },
    ],
  },

  // ── Perth — capital of Western Australia ────────────────────────────────────
  "AU-WA": {
    description:
      "The flag of the City of Perth: the red cross of Saint George bearing the city arms at its centre. " +
      "The arms (granted 1926, amended 1949) show black swans — long common on the Swan River, whose " +
      "estuary gave the Swan River Colony that became Perth its name — while a quarter is taken from the " +
      "arms of Perth in Scotland, the city Perth was named after. The gold mural crown marks it as a " +
      "municipality.",
    sources: [
      {
        title: "Coat of arms of Perth — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Perth",
      },
    ],
  },

  // ── Canberra — capital of the Australian Capital Territory and of Australia ──
  "AU-ACT": {
    description:
      "The flag of the Australian Capital Territory, adopted on 25 March 1993 after a public design " +
      "competition. The hoist is a blue panel bearing the five white stars of the Southern Cross; the " +
      "fly is a gold (yellow) panel bearing the coat of arms of the City of Canberra. The blue stands " +
      "for the Canberra sky and the gold for the land. On the Canberra arms the blue and white swans " +
      "represent Aboriginal Australians and European Australians; the castle alludes to Canberra as the " +
      "national capital and the royal crown to the role of the Sovereign; and the shield’s sword of " +
      "justice, parliamentary mace and white rose of York recall the Duke of York (later King George VI) " +
      "opening the first Parliament House in Canberra in 1927. Because Canberra is coextensive with the " +
      "Territory, this flag serves as the capital city’s own flag.",
    sources: [
      {
        title: "Flag of the Australian Capital Territory — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_Australian_Capital_Territory",
      },
      {
        title: "Symbols of the Australian Capital Territory — Department of the Prime Minister and Cabinet",
        url: "https://www.pmc.gov.au/resources/australian-symbols-booklet/state-and-territory-symbols/symbols-australian-capital-territory",
      },
    ],
  },

  // ── Hobart — capital of Tasmania ────────────────────────────────────────────
  "AU-TAS": {
    description:
      "The flag of the City of Hobart, bearing the city’s coat of arms (designed by the architect " +
      "I. G. Anderson in 1951 and first flown in 1953). On the shield a red lion — taken from the flag " +
      "of Tasmania, and placed in the chief (top) to signify Hobart’s standing as the state capital — " +
      "stands above a gold six-pointed star with wavy rays on blue, drawn from the arms of Robert Hobart, " +
      "4th Earl of Buckinghamshire, the Secretary of State for War and the Colonies after whom the city " +
      "was named in 1804. The city’s Latin motto is “Sic Fortis Hobartia Crevit” — “Thus in strength did " +
      "Hobart grow”.",
    sources: [
      {
        title: "Coat of arms of Hobart — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Hobart",
      },
    ],
  },

  // ── Brest — capital of the Brest Region, Belarus ────────────────────────────
  "BY-BR": {
    description:
      "A sky-blue field bearing a silver arrow pointing upward and a silver bow — the arms of Brest, " +
      "adopted in this form on 26 January 1991 and derived from the city’s historic seal. In Belarusian " +
      "civic heraldry silver stands for nobility and valour, and blue for loyalty.",
    sources: [
      { title: "Brest, Belarus — Wikipedia", url: "https://en.wikipedia.org/wiki/Brest,_Belarus" },
    ],
  },

  // ── Gomel (Homyel) — capital of the Gomel Region, Belarus ───────────────────
  "BY-HO": {
    description:
      "A blue field bearing a reclining golden lynx — the arms of Gomel, based on the historic city " +
      "arms of 1855. The lynx, an animal of the region’s forests, is the city’s long-standing emblem.",
    sources: [
      { title: "Gomel — Wikipedia", url: "https://en.wikipedia.org/wiki/Gomel" },
    ],
  },

  // ── Hrodna (Grodno) — capital of the Grodno Region, Belarus ─────────────────
  "BY-HR": {
    description:
      "A blue field bearing the deer of Saint Hubert — a stag with a golden cross rising between its " +
      "antlers — leaping over a silver fence. The emblem refers to the legend of Saint Hubert, patron " +
      "of hunters, who was converted by the vision of a crucifix between a stag’s antlers; it has been " +
      "Grodno’s arms since the city was granted them under Magdeburg rights.",
    sources: [
      { title: "Grodno — Wikipedia", url: "https://en.wikipedia.org/wiki/Grodno" },
    ],
  },

  // ── Mahilyow (Mogilev) — capital of the Mogilev Region, Belarus ─────────────
  "BY-MA": {
    description:
      "A blue field bearing the arms of Mogilev: three silver towers on a green base, with an armoured " +
      "knight standing in the open gate, sword raised, and above the gate the Pahonia (the “Pursuit,” a " +
      "silver mounted knight — the historic emblem of the Grand Duchy of Lithuania). The three towers " +
      "recall the three hills on which the city was founded; the knight in the gate signifies a city " +
      "open to friends but ready to repel any enemy.",
    sources: [
      { title: "Mogilev — Wikipedia", url: "https://en.wikipedia.org/wiki/Mogilev" },
      {
        title: "Mogilyov City (Belarus) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/by-ma-mo.html",
      },
    ],
  },

  // ── Minsk — capital of Belarus ──────────────────────────────────────────────
  "BY-MI": {
    description:
      "A blue field bearing the historic arms of Minsk: the Assumption of the Virgin Mary, flanked by " +
      "two angels and two cherubs. The arms were granted to Minsk in 1591 by King Sigismund III Vasa " +
      "under Magdeburg rights; through every later revision the figure of the Mother of God has always " +
      "remained the heart of the city’s emblem.",
    sources: [
      { title: "Minsk — Wikipedia", url: "https://en.wikipedia.org/wiki/Minsk" },
    ],
  },

  // ── Vitebsk (Viciebsk) — capital of the Vitebsk Region, Belarus ─────────────
  "BY-VI": {
    description:
      "A light-blue field bearing the arms of Vitebsk: the image of the Saviour (Christ) in profile " +
      "above a bare red sword, supported by angels. The Saviour reflects the city’s deep Orthodox " +
      "Christian tradition, and the red sword its defence; the design descends from Vitebsk’s historic " +
      "seal.",
    sources: [
      { title: "Vitebsk — Wikipedia", url: "https://en.wikipedia.org/wiki/Vitebsk" },
    ],
  },

  // ── Belize City — capital of the Belize District, Belize ────────────────────
  "BZ-BZ": {
    description:
      "A white field with red and blue waves along the base — Belize’s national colours — carrying the " +
      "Belize City Council emblem and the motto “Government at your service”. In the emblem a house " +
      "cradled by a pair of hands stands for community development supported by the city government, set " +
      "beneath a ring of stars. The red, white and blue tie the city to the national flag.",
    sources: [
      {
        title: "Belize City — Vexillology Wiki",
        url: "https://vexillology.miraheze.org/wiki/Belize_City",
      },
      {
        title: "Belize City (Belize) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bz-bz-bz.html",
      },
    ],
  },

  // ── Dangriga — capital of the Stann Creek District, Belize ──────────────────
  "BZ-SC": {
    description:
      "A black-white-yellow horizontal tricolour bearing the Dangriga Town Council seal. The three " +
      "colours are those of the Garifuna flag — Dangriga is the cultural capital of the Garifuna (Garinagu) " +
      "people: black for their African ancestry and the hardships they overcame, yellow for their " +
      "Amerindian (Yellow Carib) ancestry and for hope and prosperity (the colour of the grated cassava " +
      "used to make ereba), and white for the Europeans of their history and for the peace they sought.",
    sources: [
      {
        title: "The Garifuna (Belize and Honduras) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/xh-garif.html",
      },
      {
        title: "The Garifuna Flag — Warasa Garifuna Drum School",
        url: "https://www.warasadrumschool.com/garifuna-culture/the-garifuna-flag/",
      },
    ],
  },

  // ── Brussels — capital of Belgium ───────────────────────────────────────────
  "BE-BRU": {
    description:
      "A horizontally divided green-and-red flag bearing a large golden silhouette of the Archangel " +
      "Michael slaying the Devil with a cross-shaped spear — the flag of the City of Brussels. Saint " +
      "Michael is the city’s patron (its cathedral is dedicated to Saints Michael and Gudula), and the " +
      "archangel defeating the dragon, a symbol of the triumph of good over evil, has appeared on the " +
      "city’s seal since the 13th century.",
    sources: [
      {
        title: "Symbols of Brussels — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Symbols_of_Brussels",
      },
      {
        title: "Brussels (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-bxlbr.html",
      },
    ],
  },

  // ── Antwerp — capital of the Antwerp Province, Belgium ──────────────────────
  "BE-VAN": {
    description:
      "A red-white-red horizontal triband — the flag of the City of Antwerp, its colours taken from the " +
      "city arms (a red castle flanked by two white hands). The hands are canting arms tied to the folk " +
      "etymology of the name: the legend of Silvius Brabo, who slew the giant Antigoon and threw his " +
      "severed hand into the river Scheldt — “hand werpen” (“hand-throwing”), giving “Antwerpen”. The " +
      "castle stands for the city itself.",
    sources: [
      {
        title: "Antwerp (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-vanan.html",
      },
    ],
  },

  // ── Leuven — capital of the Flemish Brabant Province, Belgium ───────────────
  "BE-VBR": {
    description:
      "A red-white-red horizontal triband — the civic colours of Leuven, taken from the city arms. By " +
      "legend the red and white recall the blood-stained banks of the river Dyle after the Battle of " +
      "Leuven in 891, in which the East Frankish king Arnulf defeated a Viking army (a legend of the " +
      "same kind told of the flags of Austria and Latvia).",
    sources: [
      { title: "Leuven — Wikipedia", url: "https://en.wikipedia.org/wiki/Leuven" },
    ],
  },

  // ── Hasselt — capital of the Limburg Province, Belgium ──────────────────────
  "BE-VLI": {
    description:
      "A flag of alternating white and green stripes (white-green-white-green-white) — the colours of " +
      "the arms of Hasselt. Those arms halve the golden-and-red bars of the medieval County of Loon " +
      "with a green hazel tree on silver; the hazel tree is canting arms, punning on the city’s name " +
      "(Dutch hazel → Hasselt). The green-and-white stripes derive from that hazel-tree half of the " +
      "shield.",
    sources: [
      {
        title: "Hasselt (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-vlihs.html",
      },
    ],
  },

  // ── Wavre — capital of the Walloon Brabant Province, Belgium ────────────────
  "BE-WBR": {
    description:
      "A white field bearing three green water-lily leaves arranged two-and-one — the flag of Wavre. " +
      "The water-lily leaves are drawn from the city arms and evoke Wavre’s setting in the marshy valley " +
      "of the river Dyle.",
    sources: [
      {
        title: "Wavre (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wbrwv.html",
      },
    ],
  },

  // ── Mons — capital of the Hainaut Province, Belgium ─────────────────────────
  "BE-WHT": {
    description:
      "A red-white-red vertical triband — the flag of the City of Mons, in the traditional red and white " +
      "heraldic colours long associated with the town (an earlier version arranged the same colours as " +
      "horizontal stripes).",
    sources: [
      {
        title: "Mons (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-whtms.html",
      },
    ],
  },

  // ── Liège — capital of the Liège Province, Belgium ──────────────────────────
  "BE-WLG": {
    description:
      "A vertical bicolour of red and yellow — the traditional colours of the city of Liège, seat of the " +
      "former Prince-Bishopric of Liège. The city’s own emblem is the perron: a stone column topped by " +
      "a cross-bearing orb that stood in the market place and came to symbolise Liège’s ancient civic " +
      "liberties and self-government.",
    sources: [
      {
        title: "Perron of Liège — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Perron_of_Li%C3%A8ge",
      },
      {
        title: "Liège (Belgium) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wlg.html",
      },
    ],
  },

  // ── Arlon — capital of the Luxembourg Province, Belgium ─────────────────────
  "BE-WLX": {
    description:
      "A white-and-light-blue flag — a simplification of the arms of Arlon, blazoned “barruly of ten " +
      "argent and azure, a lion gules” (alternating silver and blue bars with a red lion). The oldest " +
      "known seal of Arlon, from 1311, already shows a lion.",
    sources: [
      {
        title: "Arlon (Municipality) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wlxar.html",
      },
    ],
  },

  // ── Namur — capital of the Namur Province and of Wallonia, Belgium ──────────
  "BE-WNA": {
    description:
      "A bicolour of black and yellow — the colours the city of Namur adopted in 1909, long historically " +
      "associated with the town and the County of Namur (as distinct from the black-and-red the province " +
      "later took). The county’s arms are a black lion with a red bend on gold.",
    sources: [
      {
        title: "Namur (Belgium) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/be-wna.html",
      },
    ],
  },

  // ── Sofia — capital of Bulgaria (Sofia city) ────────────────────────────────
  "BG-22": {
    description:
      "A light-blue field bearing the quartered arms of Sofia (created 1900). The quarters show the " +
      "ancient city-goddess Ulpia Serdica (from a Roman coin), the church of St Sofia that gave the city " +
      "its name, a statue of Apollo Medicus for the mineral springs, and Mount Vitosha at whose foot the " +
      "city lies; the small central shield bears a rampant lion — the Bulgarian national emblem — placed " +
      "there to symbolise the continuity between the old capital, Veliko Tarnovo, and the new one. The " +
      "motto reads “Расте, но не старее” (“Ever growing, never aging”).",
    sources: [
      {
        title: "Coat of arms of Sofia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Sofia",
      },
    ],
  },

  // ── Sofia — capital of the Sofia Province, Bulgaria ─────────────────────────
  "BG-23": {
    description:
      "A light-blue field bearing the quartered arms of the city of Sofia (created 1900). The quarters " +
      "show the ancient city-goddess Ulpia Serdica (from a Roman coin), the church of St Sofia that gave " +
      "the city its name, a statue of Apollo Medicus for the mineral springs, and Mount Vitosha at whose " +
      "foot the city lies; the central shield bears the Bulgarian rampant lion, marking the continuity " +
      "between the old capital Veliko Tarnovo and the new one. The motto reads “Расте, но не старее” " +
      "(“Ever growing, never aging”).",
    sources: [
      {
        title: "Coat of arms of Sofia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Sofia",
      },
    ],
  },

  // ── Plovdiv — capital of the Plovdiv Province, Bulgaria ─────────────────────
  "BG-16": {
    description:
      "A light-blue field bearing the arms of Plovdiv: two lions supporting a crown over a shield that " +
      "shows a tower on seven small hillocks and a wavy stripe. The seven hillocks are Plovdiv’s seven " +
      "syenite hills — the city is known as “the City of the Seven Hills” — and the wavy stripe is the " +
      "river Maritsa that flows through it. The ribbon reads “Древен и вечен” (“Ancient and eternal”). " +
      "The arms were adopted in 1997.",
    sources: [
      { title: "Plovdiv — Wikipedia", url: "https://en.wikipedia.org/wiki/Plovdiv" },
    ],
  },

  // ── Ruse — capital of the Ruse Province, Bulgaria ───────────────────────────
  "BG-18": {
    description:
      "A white field bearing the blue arms of Ruse: the city’s Monument of Liberty (a female figure " +
      "holding a sword and pointing north-west toward the free peoples of Europe) above waves for the " +
      "river Danube, beneath a fortress wall that marks the city’s antiquity. The monument, sculpted by " +
      "Arnoldo Zocchi in the early 20th century, became the city’s emblem.",
    sources: [
      {
        title: "Coat of arms and flag — Ruse Municipality",
        url: "https://obshtinaruse.bg/en/coat-of-arms-and-flag",
      },
      {
        title: "Monument of Liberty, Ruse — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Monument_of_Liberty,_Ruse",
      },
    ],
  },

  // ── Stara Zagora — capital of the Stara Zagora Province, Bulgaria ────────────
  "BG-24": {
    description:
      "A green field bearing the arms of Stara Zagora (created 1979): on a red shield topped by a " +
      "fortress wall, a golden lioness with her cub, and below, on green, golden furrows converging " +
      "toward the centre. The lioness and cub are taken from an 11th–12th-century stone relief found in " +
      "the city and stand for the maternal instinct and the city’s continual rebirth; the fortress wall " +
      "marks its ancient standing (drawn from a fortress on Roman Augusta Traiana coins); the furrows " +
      "represent the fertile Stara Zagora plain.",
    sources: [
      {
        title: "City symbols — Stara Zagora Municipality",
        url: "https://www.starazagora.bg/en/city-symbols",
      },
    ],
  },

  // ── Veliko Tarnovo — capital of the Veliko Tarnovo Province, Bulgaria ────────
  "BG-04": {
    description:
      "A purple field bearing the golden arms of Veliko Tarnovo — a crowned lion above the Tsarevets " +
      "fortress. Veliko Tarnovo was the capital of the Second Bulgarian Empire (1185–1393), and Tsarevets " +
      "was its royal and patriarchal citadel and the empire’s strongest fortress; the crowned lion is the " +
      "Bulgarian royal emblem and purple the imperial colour, together marking the city’s standing as the " +
      "medieval capital.",
    sources: [
      {
        title: "Tsarevets (fortress) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Tsarevets_(fortress)",
      },
    ],
  },

  // ── Burgas — capital of the Burgas Province, Bulgaria ───────────────────────
  "BG-02": {
    description:
      "A white field with a blue band along the base, bearing the arms of Burgas: a crowned sea-lion (a " +
      "lion with a fish’s tail) beneath a naval crown. The sea-lion and the naval crown reflect the " +
      "city’s identity as Bulgaria’s principal Black Sea port and the centre of its fishing and " +
      "fish-processing industry.",
    sources: [
      { title: "Burgas — Wikipedia", url: "https://en.wikipedia.org/wiki/Burgas" },
    ],
  },

  // ── Dobrich — capital of the Dobrich Province, Bulgaria ─────────────────────
  "BG-08": {
    description:
      "A flag bearing the arms of Dobrich: on a purple shield topped by a kobilitsa (a yoke-shaped " +
      "ornament popular in the Bulgarian National Revival), a golden sheaf of wheat, with the town’s " +
      "name above in old Bulgarian script. The wheat sheaf stands for the unity and glory of the " +
      "Bulgarian people and for the fecundity of the surrounding Dobrudzha plains; purple is the colour " +
      "of Bulgarian royal glory and sovereignty, and gold the welfare of the townspeople.",
    sources: [
      {
        title: "Coat of Arms — Municipality of Dobrich",
        url: "https://www.dobrich.bg/en/coat-of-arms",
      },
    ],
  },

  // ── Pleven — capital of the Pleven Province, Bulgaria ───────────────────────
  "BG-15": {
    description:
      "A white field bearing the arms of Pleven, centred on the domed St George the Conqueror " +
      "Chapel-Mausoleum. It commemorates the five-month Siege of Pleven (Plevna) in the Russo-Turkish " +
      "War of 1877–78 — a battle decisive for the Liberation of Bulgaria — and the mausoleum holds the " +
      "remains of the Bulgarian, Russian and Romanian soldiers who fell there.",
    sources: [
      {
        title: "Pleven Panorama — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Pleven_Panorama",
      },
      { title: "Siege of Plevna — Wikipedia", url: "https://en.wikipedia.org/wiki/Siege_of_Plevna" },
    ],
  },

  // ── Sliven — capital of the Sliven Province, Bulgaria ───────────────────────
  "BG-20": {
    description:
      "A flag bearing the arms of Sliven, which since 1995 feature the Old Elm of Sliven — a field elm " +
      "over 1,100 years old that still stands in the city centre beside the town hall. The best-known " +
      "landmark of Sliven, the ancient tree stands for endurance, rootedness and the city’s long " +
      "history.",
    sources: [
      { title: "The Old Elm — Wikipedia", url: "https://en.wikipedia.org/wiki/The_Old_Elm" },
      {
        title: "Symbols of Sliven — Sliven Regional Library",
        url: "http://reglibsliven.iradeum.com/sliven/sliven_symbols_en.htm",
      },
    ],
  },

  // ── Shumen — capital of the Shumen Province, Bulgaria ───────────────────────
  "BG-27": {
    description:
      "A green field bearing the golden arms of Shumen, an allegory of the Madara Rider — the early-8th " +
      "century rock relief carved on the cliff near Shumen showing a mounted horseman spearing a lion, " +
      "a dog running behind. Dated to the reign of the Bulgar Khan Tervel and a UNESCO World Heritage " +
      "Site, the Rider is a symbol of victory and of the founding of the Bulgarian state; the speared " +
      "lion represents enemies and chaos subdued.",
    sources: [
      { title: "Madara Rider — Wikipedia", url: "https://en.wikipedia.org/wiki/Madara_Rider" },
    ],
  },

  // ── Vratsa — capital of the Vratsa Province, Bulgaria ───────────────────────
  "BG-06": {
    description:
      "A green field bearing the golden arms of Vratsa, centred on the city’s fortress gate — the narrow " +
      "rock passage that the Romans called Valve (“door of a fortress”) and that gave the town its name " +
      "(from the Slavic vrata, “gate”, with the diminutive -itsa). The gateway, the entrance to the " +
      "Vratsata gorge, is the enduring emblem of the city.",
    sources: [
      { title: "Vratsa — Wikipedia", url: "https://en.wikipedia.org/wiki/Vratsa" },
    ],
  },

  // ── La Paz — administrative capital of Bolivia; capital of the La Paz Dept ───
  "BO-L": {
    description:
      "A horizontal bicolour of carmine over emerald green — the flag of the La Paz department, whose " +
      "capital is the city of La Paz. Created during the La Paz independence uprising of 1809, it is the " +
      "direct predecessor of Bolivia’s national flag: the carmine stands for the blood shed in the war " +
      "of independence and the green for wealth, glory and unity.",
    sources: [
      { title: "Flag of La Paz — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_La_Paz" },
      {
        title: "La Paz department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-l.html",
      },
    ],
  },

  // ── Santa Cruz de la Sierra — capital of the Santa Cruz Department, Bolivia ──
  "BO-S": {
    description:
      "A green-white-green horizontal triband — the flag of the Santa Cruz department, whose capital is " +
      "Santa Cruz de la Sierra. The green stripes stand for the department’s forests and plant wealth, " +
      "and the white stripe for the nobility of its people.",
    sources: [
      {
        title: "Santa Cruz department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-s.html",
      },
    ],
  },

  // ── Cochabamba — capital of the Cochabamba Department, Bolivia ───────────────
  "BO-C": {
    description:
      "A plain celeste (sky-blue) field — the flag of the Cochabamba department, whose capital is " +
      "Cochabamba. The sky-blue is said to symbolise liberty.",
    sources: [
      {
        title: "Cochabamba department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-c.html",
      },
    ],
  },

  // ── Oruro — capital of the Oruro Department, Bolivia ────────────────────────
  "BO-O": {
    description:
      "A plain red field — the flag of the Oruro department, whose capital is Oruro. The red stands for " +
      "courage and bravery.",
    sources: [
      {
        title: "Oruro department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-o.html",
      },
    ],
  },

  // ── Sucre — constitutional capital of Bolivia; capital of Chuquisaca Dept ────
  "BO-H": {
    description:
      "A white field bearing a red ragged saltire — the Cross of Burgundy — ensigned with a crown; the " +
      "flag of the Chuquisaca department, whose capital is Sucre (Bolivia’s constitutional capital). It " +
      "is taken from the banner of the colonial Audiencia de Charcas, which used the Spanish military " +
      "Cross of Burgundy; today the white is read as peace, purity and faith and the red as the blood of " +
      "the fallen.",
    sources: [
      {
        title: "Chuquisaca department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-h.html",
      },
    ],
  },

  // ── Potosí — capital of the Potosí Department, Bolivia ──────────────────────
  "BO-P": {
    description:
      "A flag quartered white and red bearing golden castles and red lions — the arms of Castile and " +
      "León — around a central medallion showing the Cerro Rico, the great silver mountain of Potosí. " +
      "The design descends from the pennant of the Vicuñas, a faction in the 17th-century civil strife " +
      "between Basque and other settlers over the silver of Potosí.",
    sources: [
      {
        title: "Potosí department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-p.html",
      },
    ],
  },

  // ── Trinidad — capital of the Beni Department, Bolivia ──────────────────────
  "BO-B": {
    description:
      "A green field with a red canton bearing a golden cross — the flag of the Beni department, whose " +
      "capital is Trinidad. Since 2007 the flag also carries eight golden five-pointed stars in a ring " +
      "at the centre, one for each of Beni’s eight provinces; the green evokes the forests and plains of " +
      "the Bolivian Amazon lowlands.",
    sources: [
      {
        title: "Beni department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-b.html",
      },
    ],
  },

  // ── Cobija — capital of the Pando Department, Bolivia ───────────────────────
  "BO-N": {
    description:
      "A flag with a green triangle at the hoist bearing a golden star, and a field of white over red — " +
      "the flag of the Pando department, whose capital is Cobija. The white stands for the purity and " +
      "loyalty of the Pando people to the nation and the green for the forest wealth of the north-western " +
      "Bolivian Amazon.",
    sources: [
      {
        title: "List of Bolivian flags — Wikipedia",
        url: "https://en.wikipedia.org/wiki/List_of_Bolivian_flags",
      },
    ],
  },

  // ── Tarija — capital of the Tarija Department, Bolivia ──────────────────────
  "BO-T": {
    description:
      "A horizontal bicolour of red over white — the flag of the Tarija department, whose capital is " +
      "Tarija; it is one of the oldest of Bolivia’s departmental flags, its red-and-white recalling the " +
      "colours under which the region fought in the wars of independence.",
    sources: [
      {
        title: "Tarija Department, Bolivia — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/bo-t.html",
      },
    ],
  },

  // ── Brasília — capital of Brazil (Federal District) ─────────────────────────
  "BR-DF": {
    description:
      "A green field bearing the golden “Cross of Brasília” — four diverging arrows radiating from the " +
      "centre to the four cardinal points. Designed by the poet and heraldist Guilherme de Almeida and " +
      "adopted in 1969, the arrows evoke Brazil’s indigenous heritage (the arrow being their oldest " +
      "emblem) and the strength that spreads outward from the new capital; they also recall the crossing " +
      "of Brasília’s Monumental and Road Axes. White stands for peace and green for the region’s forests, " +
      "while the green and gold are Brazil’s national colours.",
    sources: [
      {
        title: "Flag of the Federal District (Brazil) — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_District_(Brazil)",
      },
    ],
  },

  // ── São Paulo — capital of the São Paulo State, Brazil ──────────────────────
  "BR-SP": {
    description:
      "A white field bearing the red Cross of the Order of Christ, with the city arms on a white " +
      "roundel at the centre. Adopted in 1987, the flag’s cross recalls the city’s founding beside the " +
      "Jesuit college and the Portuguese colonisation of Brazil; white stands for peace and the mixing " +
      "of peoples, red for courage and honour. The arms — an armoured arm holding a banner — represent " +
      "the Bandeirantes who set out from São Paulo to push Brazil’s frontiers inland, under the motto " +
      "“Non Ducor, Duco” (“I am not led, I lead”).",
    sources: [
      {
        title: "Bandeira da cidade de São Paulo — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_da_cidade_de_S%C3%A3o_Paulo",
      },
    ],
  },

  // ── Rio de Janeiro — capital of the Rio de Janeiro State, Brazil ────────────
  "BR-RJ": {
    description:
      "A white field with two blue diagonal stripes forming the cross of Saint Andrew, and the city arms " +
      "at the crossing. Blue and white are the traditional colours of the Portuguese monarchy, marking " +
      "the city’s Portuguese origin. The arms centre on a Manueline armillary sphere (a symbol of the " +
      "universe and of the age of discoveries) pierced by three arrows — the arrows that martyred Saint " +
      "Sebastian, the city’s patron (Rio’s full name is São Sebastião do Rio de Janeiro) — topped by a " +
      "Phrygian cap for the Republic, with silver dolphins for the maritime city. The design dates to " +
      "1908.",
    sources: [
      {
        title: "Bandeira da cidade do Rio de Janeiro — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_da_cidade_do_Rio_de_Janeiro",
      },
    ],
  },

  // ── Salvador — capital of the Bahia State, Brazil ───────────────────────────
  "BR-BA": {
    description:
      "A royal-blue field bearing a white dove with open wings, an olive branch of three green leaves in " +
      "its beak. The dove and olive branch — devised by the city’s founder Tomé de Sousa — allude to the " +
      "biblical dove Noah released, which returned with an olive branch on finding dry land, casting " +
      "Salvador as the firm ground on which the Portuguese could settle; the blue symbolises the hope " +
      "won through the city’s many struggles. The motto reads “Sic illa ad arcam reversa est” (“thus it " +
      "returned to the ark”).",
    sources: [
      {
        title: "Bandeira de Salvador — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Salvador",
      },
    ],
  },

  // ── Recife — capital of the Pernambuco State, Brazil ────────────────────────
  "BR-PE": {
    description:
      "A flag of three vertical columns — blue, white, blue (echoing the Pernambuco state flag; blue for " +
      "the sky and peace). The left column bears a star for the Republic, which Pernambucans trace to " +
      "their 1817 revolution; the central white column carries a crowned Dutch lion (the “Lion of the " +
      "North”, from the arms of Johan Maurits of Nassau and the nickname earned by Pernambuco for its " +
      "history of struggle), a cross for the Portuguese colonisation and the coming of Christianity, and " +
      "the motto “Virtus et Fides” (“Courage and Faith”); the right column bears a sun for the strong " +
      "sunshine of the city.",
    sources: [
      { title: "Bandeira de Recife — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Recife" },
    ],
  },

  // ── Curitiba — capital of the Paraná State, Brazil ──────────────────────────
  "BR-PR": {
    description:
      "A green field with red-and-white bands radiating from a white central rectangle in eight " +
      "directions (an “oitavada” design), the city arms set on the central rectangle. The central " +
      "rectangle represents the city itself and the arms the municipal government; the radiating bands " +
      "stand for municipal authority reaching to every quarter of the territory, and the eight " +
      "trapezoidal figures they form for the rural properties of the municipality. The arms show a " +
      "silver Paraná pine (araucária) on red, with the city’s 1693 foundation date on the scroll.",
    sources: [
      { title: "Bandeira de Curitiba — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Curitiba" },
    ],
  },

  // ── Fortaleza — capital of the Ceará State, Brazil ──────────────────────────
  "BR-CE": {
    description:
      "A white field overlaid with a blue cross of Saint Andrew, the city arms at the centre. The arms " +
      "are canting: on a blue (Portuguese) field a golden castle stands over natural waves — a “fortress” " +
      "for Fortaleza, whose name means fortress (after the Dutch-built Fort Schoonenborch that grew into " +
      "the city) — beneath a golden mural crown, flanked by branches of tobacco and cotton. The motto is " +
      "“Fortitudine” (Latin for strength / fortitude).",
    sources: [
      { title: "Bandeira de Fortaleza — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Fortaleza" },
    ],
  },

  // ── Porto Alegre — capital of the Rio Grande do Sul State, Brazil ───────────
  "BR-RS": {
    description:
      "An all-white field — symbolising peace — bearing the city arms upright at the centre. The arms " +
      "carry the Cross of Christ, for the Portuguese and Christian origin of the people, and a colonial " +
      "gateway (built 1773) shown open, to signify a city open to all, beneath a mural crown marking a " +
      "great city. The motto, “Leal e Valorosa Cidade de Porto Alegre” (“Loyal and Valorous City of " +
      "Porto Alegre”), is the title granted by Emperor Pedro II in 1841 for the city’s loyalty during " +
      "the Ragamuffin War.",
    sources: [
      {
        title: "Bandeira de Porto Alegre — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Porto_Alegre",
      },
    ],
  },

  // ── Belo Horizonte — capital of the Minas Gerais State, Brazil ──────────────
  "BR-MG": {
    description:
      "A white field bearing the city arms at the centre. On a round Portuguese shield (for Brazil’s " +
      "Portuguese origin) a golden rising sun climbs over the green Serra do Curral — the mountain range " +
      "that frames the city and gave it its name (“beautiful horizon”) — on a blue field; a golden chief " +
      "carries a red equilateral triangle, the emblem of the Inconfidência Mineira, the Minas Gerais " +
      "independence conspiracy of 1789. The five-towered golden mural crown marks a state capital.",
    sources: [
      {
        title: "Brasão de Belo Horizonte — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Belo_Horizonte",
      },
    ],
  },

  // ── Manaus — capital of the Amazonas State, Brazil ──────────────────────────
  "BR-AM": {
    description:
      "A beige field — the muddy colour of the Amazon river — bearing the elaborate arms of Manaus, " +
      "designed by Thaumaturgo Vaz in 1906. Crowned by a sun bearing the date 21 November 1889 (when the " +
      "city joined the proclamation of the Republic), the arms depict phases of the city’s history: the " +
      "Meeting of the Waters where the Rio Negro joins the Solimões, a fortress with the Portuguese flag " +
      "for the era of Portuguese rule, and a rubber tree (seringueira) for the rubber boom that made " +
      "Manaus rich.",
    sources: [
      {
        title: "Brasão de Manaus — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Manaus",
      },
    ],
  },

  // ── Belém — capital of the Pará State, Brazil ───────────────────────────────
  "BR-PA": {
    description:
      "A blue field bearing the arms of Belém, created in 1626. Two arms hold baskets of flowers and " +
      "fruit, for the fertility of the surrounding land; an ox and a mule graze with heads raised toward " +
      "a star — evoking the Nativity at Bethlehem (Belém in Portuguese), after which the city is named; " +
      "and a castle alludes to the strength of Portuguese arms and to the founding fort on Guajará Bay.",
    sources: [
      {
        title: "Brasão de Belém (Pará) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Bel%C3%A9m_(Par%C3%A1)",
      },
    ],
  },

  // ── Florianópolis — capital of the Santa Catarina State, Brazil ─────────────
  "BR-SC": {
    description:
      "A white field crossed by two red stripes — the colours of Santa Catarina state — with the city " +
      "arms at the centre. On a Portuguese shield a golden rising sun sits on blue above three silver " +
      "wavy lines for the sea; a central golden escutcheon bordered red bears the Cross of the Order of " +
      "Christ, standing for the island of Santa Catarina on which the city sits. The eight-towered " +
      "golden mural crown marks a state capital.",
    sources: [
      {
        title: "Bandeira de Florianópolis — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Florian%C3%B3polis",
      },
      {
        title: "Brasão de Florianópolis — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Florian%C3%B3polis",
      },
    ],
  },

  // ── Natal — capital of the Rio Grande do Norte State, Brazil ────────────────
  "BR-RN": {
    description:
      "A flag of two horizontal bands, green over white, with the city arms at the centre. The arms " +
      "centre on a golden tailed star (estrela caudada) — the emblem of Natal, alluding to the " +
      "comet-like Star of the Nativity, since “Natal” is Portuguese for Christmas (the city was founded " +
      "on 25 December 1599) — on a blue shield above a scroll reading NATAL. Green stands for hope and " +
      "white for peace.",
    sources: [
      {
        title: "Bandeira de Natal (Rio Grande do Norte) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Natal_(Rio_Grande_do_Norte)",
      },
    ],
  },

  // ── Vitória — capital of the Espírito Santo State, Brazil ───────────────────
  "BR-ES": {
    description:
      "A white field bearing the arms of Vitória. An Iberian shield — of the kind used in Portugal at " +
      "the time of Brazil’s discovery, honouring the first colonisers — rests on two crossed golden " +
      "arrows that stand for the origins of the capixaba people; above it a silver mural crown, its gates " +
      "open, proclaims the hospitality of the people and marks the city’s political standing as a " +
      "capital.",
    sources: [
      {
        title: "Bandeira de Vitória (Espírito Santo) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Vit%C3%B3ria_(Esp%C3%ADrito_Santo)",
      },
    ],
  },

  // ── João Pessoa — capital of the Paraíba State, Brazil ──────────────────────
  "BR-PB": {
    description:
      "A flag of seven horizontal stripes (four white, three red, alternating) crossed by a vertical " +
      "black band bearing three silver mural-crown towers. The red stripes recall the Silveira and " +
      "Leitão families, heroes of the conquest of the Paraíba captaincy; the three crowns stand for the " +
      "city’s three successive historical names — Filipeia, Frederica (Frederikstadt) and Parahyba; and " +
      "the red, black and white honour João Pessoa Cavalcanti de Albuquerque, after whom the city is " +
      "named.",
    sources: [
      {
        title: "Bandeira de João Pessoa — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Jo%C3%A3o_Pessoa",
      },
    ],
  },

  // ── Campo Grande — capital of the Mato Grosso do Sul State, Brazil ──────────
  "BR-MS": {
    description:
      "A blue field with golden and red rays radiating from a central rectangle that bears the city " +
      "arms — designed by the heraldist Arcinoé Antônio Peixoto de Faria and adopted in 1967. The " +
      "rectangle stands for the city and the rays for municipal authority reaching every quarter; the " +
      "arms show an eagle — for power, prosperity and altruism — grasping a berrante (a cattle-herder’s " +
      "horn) that recalls the region’s cattle-ranching economy, beneath a mural crown.",
    sources: [
      {
        title: "Bandeira de Campo Grande (Mato Grosso do Sul) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Campo_Grande_(Mato_Grosso_do_Sul)",
      },
    ],
  },

  // ── São Luís — capital of the Maranhão State, Brazil ────────────────────────
  "BR-MA": {
    description:
      "A yellow field bearing the city arms: on a blue shield, silver stars arranged as the Pleiades — " +
      "the brightest star cluster visible to the naked eye — which cast São Luís as the “Brazilian " +
      "Athens” and honour the Maranhão literary circle (Gonçalves Dias and others). A golden " +
      "eight-towered mural crown marks a state capital, with laurel branches for the people’s virtue.",
    sources: [
      {
        title: "Brasão de São Luís (Maranhão) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_S%C3%A3o_Lu%C3%ADs_(Maranh%C3%A3o)",
      },
    ],
  },

  // ── Cuiabá — capital of the Mato Grosso State, Brazil ───────────────────────
  "BR-MT": {
    description:
      "A flag divided vertically green (at the hoist) and white, with a golden roundel on the dividing " +
      "line bearing the monument that marks the geodesic centre of South America (which lies at Cuiabá). " +
      "Green stands for the palms that are the city’s chief emblem, white for the purity of the cuiabano " +
      "soul, and the gold for Cuiabá’s gold — the mineral wealth on which the city was founded, the " +
      "triangulated base reading as a mound of gold.",
    sources: [
      { title: "Bandeira de Cuiabá — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Cuiab%C3%A1" },
    ],
  },

  // ── Aracaju — capital of the Sergipe State, Brazil ──────────────────────────
  "BR-SE": {
    description:
      "Four horizontal stripes alternating green and gold, with a white canton at the upper hoist " +
      "bearing the city arms. The arms gather the city’s identity: a cross for faith, a weathervane for " +
      "the salt industry, a coconut palm for the coconut harvest, a cogwheel for labour, a seahorse for " +
      "the coast, and a mural crown for the capital, under the motto “Pax et Labor” (“Peace and Work”).",
    sources: [
      { title: "Bandeira de Aracaju — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Aracaju" },
    ],
  },

  // ── Palmas — capital of the Tocantins State, Brazil ─────────────────────────
  "BR-TO": {
    description:
      "A white field — for peace — bearing a golden sun above two narrow parallel blue stripes. The blue " +
      "stripes stand for the rivers Tocantins and Araguaia, vital to the state’s development, and the sun " +
      "for Palmas as the seat of state power. Palmas is Brazil’s youngest state capital, a planned city " +
      "founded in 1989.",
    sources: [
      {
        title: "Lei nº 1.972 — Cria a Bandeira de Palmas (Câmara Municipal de Palmas)",
        url: "https://legislativo.palmas.to.gov.br/media/leis/lei-ordinaria-1972-2013-05-23-20-3-2017-15-14-12.pdf",
      },
    ],
  },

  // ── Teresina — capital of the Piauí State, Brazil ───────────────────────────
  "BR-PI": {
    description:
      "A flag gyronny-in-saltire of white and blue with the city arms at the centre. The arms carry " +
      "black anchors corded in red, for the navigability of the rivers Parnaíba and Poti on which the " +
      "city was founded (when the population moved from the old Vila Velha do Poti); the river Parnaíba " +
      "runs along the base, and the scroll reads “TERESINA” with the foundation date 16 August 1852.",
    sources: [
      { title: "Bandeira de Teresina — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Teresina" },
      { title: "Brasão de Teresina — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Teresina" },
    ],
  },

  // ── Rio Branco — capital of the Acre State, Brazil ──────────────────────────
  "BR-AC": {
    description:
      "A white field bearing the arms of the Baron of Rio Branco — José Maria da Silva Paranhos Júnior, " +
      "the diplomat who secured Acre for Brazil through the 1903 Treaty of Petrópolis, and after whom the " +
      "city is named. The arms carry a crown for nobility, a globe crossed by a red band, and a river, " +
      "with the Baron’s motto “Ubique Patria Memor” (“everywhere mindful of the fatherland”).",
    sources: [
      {
        title: "Brasão de Rio Branco (Acre) — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bras%C3%A3o_de_Rio_Branco_(Acre)",
      },
    ],
  },

  // ── Maceió — capital of the Alagoas State, Brazil ───────────────────────────
  "BR-AL": {
    description:
      "Three horizontal bands — green, white and blue — with the city arms at the centre and a red wavy " +
      "line running across. The white band represents the white-sand restinga of Maceió’s shoreline and " +
      "the red wave the Riacho Salgadinho stream that crosses the city; the arms, created by the " +
      "folklorist Théo Brandão in 1957, show a silver sailing jangada and canoe on the water.",
    sources: [
      { title: "Bandeira de Maceió — Wikipédia", url: "https://pt.wikipedia.org/wiki/Bandeira_de_Macei%C3%B3" },
    ],
  },

  // ── Porto Velho — capital of the Rondônia State, Brazil ─────────────────────
  "BR-RO": {
    description:
      "A flag divided vertically — a narrow gold band at the hoist, a larger blue field beyond — bearing " +
      "three superimposed black cylindrical water towers. Gold stands for the region’s mineral wealth and " +
      "blue for its sky; the Três Caixas d’Água (Three Water Towers) were built for the Madeira–Mamoré " +
      "Railway, around whose works the city of Porto Velho grew.",
    sources: [
      {
        title: "Bandeira de Porto Velho — Wikipédia",
        url: "https://pt.wikipedia.org/wiki/Bandeira_de_Porto_Velho",
      },
    ],
  },

  // ── Goiânia — capital of the Goiás State, Brazil ────────────────────────────
  "BR-GO": {
    description:
      "A green field with a red-and-white cross radiating from a central white panel that bears the city " +
      "arms. On the arms, a blue shield carries a golden cross — for faith and leadership — beneath a " +
      "silver mural crown that marks a state capital, encircled by eight golden sparks for the eight " +
      "original districts of the municipality (Goiânia is a planned city, founded in 1933 to replace the " +
      "old capital as the seat of Goiás).",
    sources: [
      {
        title: "Brasão e Bandeira da Cidade de Goiânia (GO) — Simbolopédia (MBI)",
        url: "https://www.mbi.com.br/mbi/biblioteca/simbolopedia/municipio-goiania-go-br/",
      },
    ],
  },

  // ── Macapá — capital of Amapá, Brazil ───────────────────────────────────────
  "BR-AP": {
    description:
      "A green–yellow–green horizontal field separated by thin white stripes, with the silver " +
      "silhouette of a fortress tower in the centre. The central figure is the Fortaleza de São José " +
      "de Macapá, the 18th-century Portuguese fort around which the city grew, so the flag anchors " +
      "Macapá to its colonial origin; the green and yellow repeat Brazil's national colours.",
    sources: [
      {
        title: "Macapá (Amapá, Brazil) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/br-ap-ma.html",
      },
    ],
  },

  // ── Boa Vista — capital of Roraima, Brazil ──────────────────────────────────
  "BR-RR": {
    description:
      "A green (upper) and yellow (lower) horizontal bicolour with a large white star in the upper " +
      "hoist and a thin white stripe just above the centre line. The green and yellow are Brazil's " +
      "national colours, while the white star and stripe are taken from the flag of Roraima state, " +
      "marking Boa Vista as the state capital.",
    sources: [
      {
        title: "Boa Vista (Roraima, Brazil) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/br-rr-bv.html",
      },
    ],
  },

  // ── Toronto — capital of Ontario, Canada ────────────────────────────────────
  "CA-ON": {
    description:
      "A blue field bearing a white abstract outline of Toronto City Hall — its two curved towers — with " +
      "a red maple leaf between them at the base standing for the domed Council Chamber. The negative " +
      "space above and between the towers forms the letter “T” for Toronto, and the maple leaf links the " +
      "city to Canada. The flag was designed by the 21-year-old student Renato De Santis and adopted in " +
      "1974.",
    sources: [
      { title: "Flag of Toronto — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Toronto" },
    ],
  },

  // ── Quebec City — capital of Quebec, Canada ─────────────────────────────────
  "CA-QC": {
    description:
      "A deep-blue field bearing a golden ship within a crenellated white border. The ship is the " +
      "Don-de-Dieu, the vessel of the city’s founder Samuel de Champlain, marking Quebec as a great " +
      "seaport; the crenellated border recalls the city walls — Quebec is the only walled city in North " +
      "America north of Mexico — and also the fortified town of Brouage in France from which Champlain " +
      "came.",
    sources: [
      { title: "Flag of Quebec City — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Quebec_City" },
    ],
  },

  // ── Winnipeg — capital of Manitoba, Canada ──────────────────────────────────
  "CA-MB": {
    description:
      "A field divided diagonally, light blue at the upper hoist and gold at the lower fly, with the " +
      "city arms on a white disc at the centre. Blue stands for Winnipeg’s clear prairie sky and gold " +
      "for the wheat that was the city’s original economic mainstay. The arms include a gatehouse of " +
      "Fort Garry — the Hudson’s Bay Company post at the confluence of the Red and Assiniboine rivers, " +
      "where the city grew — and the prairie crocus, Manitoba’s floral emblem.",
    sources: [
      { title: "Flag of Winnipeg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Winnipeg" },
      {
        title: "Coat of arms of Winnipeg — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Winnipeg",
      },
    ],
  },

  // ── Halifax — capital of Nova Scotia, Canada ────────────────────────────────
  "CA-NS": {
    description:
      "A blue field bearing a golden saltire (the cross of Saint Andrew), for the Scottish heritage of " +
      "the region and its standing as the capital of Nova Scotia. At the centre a kingfisher — a symbol " +
      "of industry and the oldest civic emblem in the region (1860) — stands for Halifax, flanked by two " +
      "18th-century sailing ships for the neighbouring former city of Dartmouth and the area’s naval " +
      "tradition; the blue is for the harbour, the sea and the lakes.",
    sources: [
      {
        title: "Coat of arms of the Halifax Regional Municipality — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_the_Halifax_Regional_Municipality",
      },
      {
        title: "Halifax Regional Municipality — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ca-ns-hf.html",
      },
    ],
  },

  // ── Iqaluit — capital of Nunavut, Canada ────────────────────────────────────
  "CA-NU": {
    description:
      "A Canadian pale of blue, white and blue bearing the city’s emblem: a stylised two-peaked mountain " +
      "(the Everett Mountains above Frobisher Bay) over stylised fish, with the city’s name in Latin and " +
      "Inuktitut script. “Iqaluit” means “place of many fish” in Inuktitut, and fishing has sustained " +
      "the people of the area for centuries.",
    sources: [
      {
        title: "Iqaluit, Nunavut — Canadian Vexillology",
        url: "https://www.canadianvexillology.com/blog/iqaluitnunavut",
      },
    ],
  },

  // ── Whitehorse — capital of Yukon, Canada ───────────────────────────────────
  "CA-YT": {
    description:
      "A blue field bearing the seal of the City of Whitehorse, which depicts the city’s surroundings — " +
      "mountains and the Yukon River — evoking its setting and its history in river transportation and " +
      "the Klondike Gold Rush (Whitehorse grew as the head of navigation on the Yukon River during the " +
      "1898 gold rush).",
    sources: [
      {
        title: "Coat of arms of Whitehorse, Yukon — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Whitehorse,_Yukon",
      },
    ],
  },

  // ── Edmonton — capital of Alberta, Canada ───────────────────────────────────
  "CA-AB": {
    description:
      "A light-blue field with a white Canadian pale bearing the city arms; white stands for peace and " +
      "blue for the North Saskatchewan River. On the arms, a double-winged wheel marks Edmonton as a " +
      "centre of aviation and the “Gateway to the North” (the southern end of the wartime Alaska " +
      "Highway); an explorer recalls its origin as a fur-trading post, and Athena, goddess of wisdom, " +
      "its universities. Gold evokes the marigold — the city flower — sunny Alberta, and the Klondike " +
      "Gold Rush.",
    sources: [
      { title: "Flag of Edmonton — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Edmonton" },
    ],
  },

  // ── Victoria — capital of British Columbia, Canada ──────────────────────────
  "CA-BC": {
    description:
      "A light-blue field with the city arms at the centre. On the arms a golden “V” for Victoria opens " +
      "upward to suggest the city’s growth; a red inverted triangle above it is the peninsula on which " +
      "Victoria sits, the blue the surrounding sea and a white stripe the surf of the coast. A royal " +
      "crown honours Queen Victoria, the city’s namesake; angel supporters personify “Colonization” and " +
      "“Civilization”, with laurel for those who have served the city.",
    sources: [
      {
        title: "Flag of Victoria, British Columbia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Victoria,_British_Columbia",
      },
    ],
  },

  // ── St. John's — capital of Newfoundland and Labrador, Canada ───────────────
  "CA-NL": {
    description:
      "A white field bearing the city arms, with the motto “Avancez” (French for “Advance”). The shield " +
      "shows the Agnus Dei (the Lamb of God) with Saint George’s banner, for Saint John the Baptist, the " +
      "city’s patron, and the ship Matthew for John Cabot’s voyage. The two mariner supporters bear the " +
      "dates 1497 (Cabot’s landfall) and 1583 (Sir Humphrey Gilbert’s claim of Newfoundland as England’s " +
      "first overseas colony).",
    sources: [
      {
        title: "Coat of arms of St. John's, Newfoundland and Labrador — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_St._John's,_Newfoundland_and_Labrador",
      },
    ],
  },

  // ── Regina — capital of Saskatchewan, Canada ────────────────────────────────
  "CA-SK": {
    description:
      "A horizontal bicolour of blue over gold with a royal crown at the upper hoist. Blue stands for " +
      "the wide prairie sky and gold for the wheat fields central to the region’s economy; the crown " +
      "marks Regina as the provincial capital and puns on its name — Regina is Latin for “queen” (the " +
      "city was named in honour of Queen Victoria).",
    sources: [
      { title: "Flag of Regina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Regina" },
    ],
  },

  // ── Charlottetown — capital of Prince Edward Island, Canada ─────────────────
  "CA-PE": {
    description:
      "A banner of the city arms — a green-and-white shield charged with the coronation crown of Queen " +
      "Charlotte, after whom the city is named — bordered on three sides with alternating green and " +
      "white rectangles.",
    sources: [
      { title: "Flag of Charlottetown — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Charlottetown" },
    ],
  },

  // ── Yellowknife — capital of the Northwest Territories, Canada ──────────────
  "CA-NT": {
    description:
      "A flag bearing the city arms: a mine headframe flanked by a miner’s pick and shovel, with the " +
      "northern lights above. The pick and shovel (and the gold colour) recall the gold-mining boom of " +
      "the 1930s that built the town; the city’s name comes from the Yellowknives Dene, who were named " +
      "for the copper-bladed knives they carried.",
    sources: [
      {
        title: "Coat of arms of Yellowknife — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Yellowknife",
      },
    ],
  },

  // ── Zürich — capital of the canton of Zürich, Switzerland ───────────────────
  "CH-ZH": {
    description:
      "A flag divided diagonally (per bend) into blue and white — the arms of the canton and city of " +
      "Zürich. Popularly the blue is read as the lake and the white as the snow-capped mountains, and " +
      "the diagonal division is taken to represent justice. The blue-and-white is attested from the " +
      "1220s, the diagonal from 1389.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Geneva — capital of the canton of Geneva, Switzerland ───────────────────
  "CH-GE": {
    description:
      "A flag divided vertically: at the hoist a golden half-eagle on black, at the fly a golden key on " +
      "red — the arms of Geneva, adopted in 1387. The half-eagle (from the double eagle of the Holy " +
      "Roman Empire) stands for temporal authority and protection, and the golden key (the Key of Saint " +
      "Peter, patron of the cathedral) for spiritual, ecclesiastical rule; together they symbolise the " +
      "union of secular and religious power.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Basel — capital of the canton of Basel-Stadt, Switzerland ───────────────
  "CH-BS": {
    description:
      "A white field bearing a black Baselstab — the staff (crozier) of the Bishops of Basel, curving to " +
      "the hoist. Used on the city’s coins from the 11th century, it was adopted as the city arms in " +
      "1385, when black came to represent the city (and the same staff in red the bishop).",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Schwyz — capital of the canton of Schwyz, Switzerland ───────────────────
  "CH-SZ": {
    description:
      "A red field with a small white couped cross in the upper hoist. The plain red banner marked Schwyz " +
      "as an imperial free territory with the sovereign power to administer justice; the white cross " +
      "(which soldiers are said to have sewn on at the Battle of Laupen in 1339) became, on a red square, " +
      "the national flag of Switzerland — the country itself taking its name from Schwyz.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Altdorf — capital of the canton of Uri, Switzerland ─────────────────────
  "CH-UR": {
    description:
      "A yellow field bearing the black head of an aurochs — the Uristier — with a red nose-ring, the " +
      "arms of the canton of Uri, here combined with the red and white of the town of Altdorf, the " +
      "cantonal capital. The aurochs is canting arms: the name “Uri” was linked to ûr, the aurochs (the " +
      "wild ox once common in the valley), so the beast’s head puns on the canton’s name.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Zug — capital of the canton of Zug, Switzerland ─────────────────────────
  "CH-ZG": {
    description:
      "A horizontal triband of white, blue and white — the arms of the canton and city of Zug. The " +
      "design descends from the arms of the Habsburgs (a silver fess on red) and of the counts of " +
      "Lenzburg, the town’s medieval lords.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Solothurn — capital of the canton of Solothurn, Switzerland ─────────────
  "CH-SO": {
    description:
      "A flag divided red over white — the colours of Saint Ursus, the patron of Solothurn, by tradition " +
      "a soldier of the Theban Legion. The red-and-white has appeared on the city’s seal since at least " +
      "1394.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Appenzell — capital of the canton of Appenzell Innerrhoden, Switzerland ──
  "CH-AI": {
    description:
      "A white field bearing an upright black bear with red claws and tongue — the arms of Appenzell. " +
      "The bear comes from the legend of the Irish missionary Saint Gallus: rather than fight a bear he " +
      "met in the forest, he shared his bread, and the grateful bear brought him wood to build his " +
      "hermitage, around which the Abbey of St Gallen grew; the bear became the emblem of both St Gallen " +
      "and Appenzell.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Schaffhausen — capital of the canton of Schaffhausen, Switzerland ────────
  "CH-SH": {
    description:
      "A yellow field bearing a black ram leaping from a tower — canting arms for Schaffhausen: the ram " +
      "for German Schaf (“ram/sheep”) and the tower for Haus (“house”). The gold-horned, crowned ram is " +
      "an old emblem of strength and vigour.",
    sources: [
      { title: "Schaffhausen — Wikipedia", url: "https://en.wikipedia.org/wiki/Schaffhausen" },
    ],
  },

  // ── Delémont — capital of the canton of Jura, Switzerland ───────────────────
  "CH-JU": {
    description:
      "A red field bearing a white bishop’s crozier — the emblem of the Prince-Bishopric of Basel, which " +
      "ruled Delémont and the Jura from the 14th century until 1815 (Delémont was a summer residence of " +
      "the prince-bishops). The same crozier appears on the flag of the canton of Jura.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Glarus — capital of the canton of Glarus, Switzerland ───────────────────
  "CH-GL": {
    description:
      "A red field bearing Saint Fridolin — the pilgrim-monk who by tradition christianised the Glarus " +
      "valley — shown walking with his staff and Bible, in black robes with a golden halo. He is the " +
      "only saint depicted on a Swiss cantonal flag.",
    sources: [
      {
        title: "Flags and arms of cantons of Switzerland — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flags_and_arms_of_cantons_of_Switzerland",
      },
    ],
  },

  // ── Aarau — capital of the canton of Aargau, Switzerland ────────────────────
  "CH-AG": {
    description:
      "A black eagle with a red beak and red claws, on gold, beneath a red bar — the arms of the city of " +
      "Aarau (distinct from the Aargau cantonal flag). The eagle is thought to be a canting device: it " +
      "arose from a folk-etymological reading of the city’s name as the “Au (meadow) of the Aar (eagle)”. " +
      "The eagle has been Aarau’s emblem since the Middle Ages, the town having received its charter from " +
      "King Rudolf I of Habsburg in 1283.",
    sources: [
      { title: "Aarau — Geographie.ch", url: "https://geographie.ch/index.php/Aarau" },
      { title: "Datei:Wappen Aarau.svg — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Datei:Wappen_Aarau.svg" },
    ],
  },

  // ── Chur — capital of the canton of Graubünden, Switzerland ─────────────────
  "CH-GR": {
    description:
      "In silver, a three-merloned red city gate, and within the gateway an upright black ibex with red " +
      "horns, hooves and tongue — the arms of the city of Chur. The ibex is the emblem of the Gotteshausbund " +
      "(League of the House of God), originally the arms of the Bishops of Chur, first seen on episcopal " +
      "seals in the 14th century. The red city gate and the ibex’s red arming emphasise the city’s own " +
      "authority.",
    sources: [
      { title: "Das Wappen von Chur — Stadt Chur", url: "https://www.chur.ch/geschichte/5330" },
    ],
  },

  // ── Fribourg — capital of the canton of Fribourg, Switzerland ───────────────
  "CH-FR": {
    description:
      "On blue, a silver crenellated tower with a crenellated forewall to its left descending in two steps, " +
      "and a silver half-ring rising from the base — the arms of the city of Fribourg. The tower, forewall " +
      "and ring have appeared on the city’s seals since the 13th century. The city took the white-castle-on-" +
      "blue flag when city and canton were separated in 1803 (the canton keeps the black-and-white of the " +
      "Zähringen founders).",
    sources: [
      {
        title: "Drapeau et armoiries du canton de Fribourg — Wikipédia",
        url: "https://fr.wikipedia.org/wiki/Drapeau_et_armoiries_du_canton_de_Fribourg",
      },
      { title: "Fribourg (Switzerland) — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Fribourg_(Switzerland)" },
    ],
  },

  // ── Neuchâtel — capital of the canton of Neuchâtel, Switzerland ─────────────
  "CH-NE": {
    description:
      "On gold, a black eagle armed, beaked and tongued red, bearing on its breast a gold shield with a red " +
      "pale charged with three silver chevrons — the arms of the city of Neuchâtel. The eagle is the " +
      "primitive arms of the elder House of Neuchâtel (appearing in 1214); the chevron-pale is the family " +
      "banner defined by Count Louis of Neuchâtel around the mid-14th century, its chevrons evoking the " +
      "gable of the castle shown on the old city seal.",
    sources: [
      {
        title: "Les armoiries de la Ville de Neuchâtel — Société d’histoire et d’archéologie",
        url: "https://imagesdupatrimoine.ch/notices/les-armoiries-de-la-ville-de-neuchatel/",
      },
    ],
  },

  // ── Stans — capital of the canton of Nidwalden, Switzerland ─────────────────
  "CH-NW": {
    description:
      "On red, a rearing ibex divided per fess black over gold — the arms of Stans (its municipal colours " +
      "are black, gold and red). Stans adopted the design in 1901, taking the old Dinghof (manorial-court) " +
      "arms and banner recorded in the Propst’s land-register of 1499 so that, as a cantonal capital, it " +
      "would have its own emblem among the larger Swiss towns.",
    sources: [
      {
        title: "Wappen und Fahnen der Gemeinden des Kantons Nidwalden — Wikipedia (de)",
        url: "https://de.wikipedia.org/wiki/Wappen_und_Fahnen_der_Gemeinden_des_Kantons_Nidwalden",
      },
    ],
  },

  // ── Sarnen — capital of the canton of Obwalden, Switzerland ─────────────────
  "CH-OW": {
    description:
      "On red, a white pair of deer’s antlers with the skull-piece (Grind), enclosing a six-pointed white " +
      "star — the arms of Sarnen, the capital of Obwalden.",
    sources: [
      { title: "Gemeindewappen: Sarnen — Kanton Obwalden", url: "https://www.ow.ch/gemeindewappen/270" },
    ],
  },

  // ── Frauenfeld — capital of the canton of Thurgau, Switzerland ──────────────
  "CH-TG": {
    description:
      "On white, a rearing red lion led on a chain by a woman in a headscarf, also in red — the arms of " +
      "Frauenfeld. The lion stands for the Habsburgs, who held the bailiwick over the town as successors of " +
      "the Kyburgs when the arms first appeared on the seal; the woman is read as the Virgin Mary, patroness " +
      "of Reichenau Abbey, the medieval overlord, whose red-and-white are the shield’s colours. (The name " +
      "Frauenfeld — “women’s field” — makes the woman a canting figure too.)",
    sources: [
      {
        title: "Name und Wappen der Stadt — Stadt Frauenfeld",
        url: "https://www.frauenfeld.ch/portraet/geschichte/name-und-wappen.html/102",
      },
    ],
  },

  // ── Bellinzona — capital of the canton of Ticino, Switzerland ───────────────
  "CH-TI": {
    description:
      "The city flag of Bellinzona bears the biscione — a serpent swallowing a child — the emblem of the " +
      "Visconti Dukes of Milan. It recalls Bellinzona’s medieval history under the Duchy of Milan, whose " +
      "dukes built and held the town’s three castles; the ducal serpent has marked the city’s banner for " +
      "centuries.",
    sources: [
      { title: "Bellinzona — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Bellinzona" },
      { title: "Biscione (araldica) — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Biscione_(araldica)" },
    ],
  },

  // ── Lausanne — capital of the canton of Vaud, Switzerland ───────────────────
  "CH-VD": {
    description:
      "A white-over-red flag — the colours of the city of Lausanne (its shield is blazoned “gules a chief " +
      "argent”, red with a white chief, and is often shown as an equal white-and-red division). The white " +
      "and red recall the arms of the Bishop of Lausanne, the city’s medieval lord; two lions were later " +
      "added as supporters as symbols of power.",
    sources: [
      {
        title: "Les armoiries et les couleurs de Lausanne (1913) — e-periodica",
        url: "https://www.e-periodica.ch/cntmng?pid=cov-001%3A1913%3A51%3A%3A553",
      },
    ],
  },

  // ── Sion — capital of the canton of Valais, Switzerland ─────────────────────
  "CH-VS": {
    description:
      "Party per pale white and red, with two counterchanged six-pointed stars — the arms of Sion. The white " +
      "and red are the colours of the Prince-Bishopric of Sion, borne on the bishops’ banner since the early " +
      "13th century, and the six-pointed stars are the mullets of the Valais arms (whose stars stand for the " +
      "cantonal dizains/districts).",
    sources: [
      {
        title: "Drapeau et armoiries du canton du Valais — Wikipédia",
        url: "https://fr.wikipedia.org/wiki/Drapeau_et_armoiries_du_canton_du_Valais",
      },
    ],
  },

  // ── Santiago — capital of the Región Metropolitana, Chile ───────────────────
  "CL-RM": {
    description:
      "Two vertical bands, blue and gold, charged with the arms of Santiago. The shield — granted by " +
      "Emperor Charles I in 1552 — shows a lion rampant holding a drawn sword on silver, within a blue " +
      "bordure of eight gold scallop shells. The lion honours the courage with which the settlers defended " +
      "the city, and the scallop shells are the emblem of Saint James (Santiago), the city’s patron: it was " +
      "founded in 1541 as Santiago de la Nueva Extremadura, named for the apostle said to have appeared in " +
      "battle on the settlers’ side.",
    sources: [
      { title: "Santiago de Chile — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Santiago_de_Chile" },
      { title: "¿Qué significa el Escudo de Santiago? — Hispanismo Chile", url: "https://hispanismo.cl/patrimonio/que-significa-el-escudo-de-santiago/" },
    ],
  },

  // ── Valparaíso — capital of the Valparaíso Region, Chile ────── (see omitted) ─

  // ── Concepción — capital of the Biobío Region, Chile ────────────────────────
  "CL-BI": {
    description:
      "A gold-and-blue flag bearing the arms of Concepción, granted by royal decree on 5 April 1552: a black " +
      "eagle on gold with a gold sun radiating over its head, a silver crescent at its feet, four gold stars " +
      "to the sides and two branches of flowering lilies on blue. The eagle and sun stand for Emperor " +
      "Charles V — Concepción being an imperial city “on which the sun never set”.",
    sources: [
      { title: "Concepción (Chile) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Concepci%C3%B3n_(Chile)" },
      {
        title: "El poco conocido origen e historia del escudo de armas de Concepción — Diario Concepción",
        url: "https://www.diarioconcepcion.cl/ciudad/2018/10/16/el-poco-conocido-origen-e-historia-del-escudo-de-armas-de-concepcion.html",
      },
    ],
  },

  // ── La Serena — capital of the Coquimbo Region, Chile ───────────────────────
  "CL-CO": {
    description:
      "A red flag bearing the arms of La Serena: a silver field with, in chief, a four-towered castle whose " +
      "battlements spout flames, a bordure with four letters “F” and bundles of inverted arrows at the " +
      "corners, and two griffins as supporters holding a chain. The four F’s are read as the initial of " +
      "Felipe II (under whom the arms were granted) or of the city’s founder Francisco de Aguirre — the " +
      "sources differ.",
    sources: [
      { title: "La Serena — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/La_Serena" },
      { title: "Escudo de La Serena — Del Faro al Puerto", url: "https://delfaroalpuerto.cl/2020/03/19/escudo-de-la-serena/" },
    ],
  },

  // ── Rancagua — capital of the O’Higgins Region, Chile ───────────────────────
  "CL-LI": {
    description:
      "A white flag bearing the city seal of Rancagua. On a red field a golden eagle rises as a phoenix from " +
      "flames, grasping the tree of liberty, flanked by two laurel branches. The arms were granted by " +
      "Bernardo O’Higgins on 27 May 1818 to honour the town after the 1814 Battle of Rancagua: the phoenix " +
      "reborn from its ashes is Rancagua rebuilt, and the red field is the blood its heroes shed for the " +
      "fatherland.",
    sources: [
      {
        title: "El escudo de armas que O’Higgins entregó a la “Heroica ciudad de Rancagua” — El Cachapoal",
        url: "https://elcachapoal.cl/2014/10/01/el-escudo-de-armas-que-ohiggins-entrego-a-la-muy-heroica-ciudad-de-rancagua/",
      },
    ],
  },

  // ── Valdivia — capital of the Los Ríos Region, Chile ────────────────────────
  "CL-LR": {
    description:
      "A white flag charged with a red saltire — a simplified Cross of Burgundy (the ragged red St Andrew’s " +
      "cross of the Spanish Empire). Valdivia, chartered by Emperor Charles V in 1554 as the “very noble and " +
      "very loyal” city, remained a royalist stronghold through the wars of independence, and the cross " +
      "recalls that Hispanic loyalty.",
    sources: [
      { title: "Bandera de Valdivia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Valdivia" },
      { title: "Valdivia commune (Chile) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/cl-vld.html" },
    ],
  },

  // ── Arica — capital of the Arica y Parinacota Region, Chile ─────────────────
  "CL-AP": {
    description:
      "A dark-blue flag bearing the arms of Arica. The colonial shield — protocolised in 1657, after " +
      "Philip II gave Arica the title of “noble, loyal and illustrious City of San Marcos de Arica” in 1570 " +
      "— shows two crowned rampant lions guarding a central charge, a third lion below, and two towers that " +
      "signified the town’s role in the military custody of the Spanish crown.",
    sources: [
      {
        title: "El escudo de armas de la ciudad San Marcos de Arica — El Morrocotudo",
        url: "https://www.elmorrocotudo.cl/noticia/politica/el-escudo-de-armas-de-la-ciudad-san-marcos-de-arica-analisis-del-documento-original",
      },
    ],
  },

  // ── Taipei — capital of Taiwan ──────────────────────────────────────────────
  "CN-TW": {
    description:
      "The flag/emblem of Taipei is built from a brushstroke of the Chinese character 北 (běi, “north”), " +
      "with the characters for Taipei (臺北) forming arrows that point both up and down for eternal " +
      "prosperity; the lines crossing under the arrow stand for the modern city’s criss-crossing bridges and " +
      "its cultural diversity. Its four colours each carry a meaning: red for enthusiasm and lively " +
      "creativity, yellow for warmth and friendliness, green for peace, hope and care for the environment, " +
      "and blue for reason and freedom — a modern, innovative city.",
    sources: [
      { title: "About the Taipei Brand Logo — Taipei Travel (official)", url: "https://www.travel.taipei/en/news/details/18830" },
      { title: "Taipei City — Vexillology Wiki", url: "https://vexillology.miraheze.org/wiki/Taipei_City" },
    ],
  },

  // ── Bogotá — capital of Colombia (and of Cundinamarca) ──────────────────────
  "CO-CUN": {
    description:
      "Yellow over red, with the city arms at the centre — the flag the patriots flew on 20 July 1810. " +
      "Yellow stands for justice, clemency and virtue; red for liberty, health and charity. The arms, " +
      "granted to Santa Fe by Emperor Charles V in 1548, show a crowned black eagle on gold holding a red " +
      "pomegranate (granada) in each talon: the eagle for firmness, the pomegranates for valour.",
    sources: [
      {
        title: "Símbolos de Bogotá — Alcaldía Mayor de Bogotá",
        url: "https://bogota.gov.co/mi-ciudad/simbolos-de-bogota-la-bandera-el-escudo-la-flor-y-el-arbol-de-bogot",
      },
      { title: "Bandera de Bogotá — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Bogot%C3%A1" },
    ],
  },

  // ── Medellín — capital of Antioquia, Colombia ───────────────────────────────
  "CO-ANT": {
    description:
      "White and green horizontal stripes bearing the city arms. White stands for purity and integrity, " +
      "green for hope, abundance and faith. The arms — granted by King Charles II of Spain in 1678 — show, " +
      "on blue, a golden tower between two turrets with the image of Our Lady of Candelaria, the city’s " +
      "patroness, above.",
    sources: [
      { title: "Historia y Símbolos de Medellín — Alcaldía de Medellín", url: "https://www.medellin.gov.co/es/historia-y-simbolos-de-medellin/" },
      { title: "Escudo de Medellín — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Medell%C3%ADn" },
    ],
  },

  // ── Barranquilla — capital of Atlántico, Colombia ───────────────────────────
  "CO-ATL": {
    description:
      "A “cuadrilonga” of three nested rectangles — red (outer), yellow and green (centre) — with a silver " +
      "eight-pointed star at its heart. Red is the blood of the patriots, yellow the sun of liberty, green " +
      "the hope of a worthy homeland; the star, resembling an eight-point compass rose, evokes Barranquilla’s " +
      "seafaring spirit (and the eight confederated provinces). The city council adopted it in 1910, " +
      "honouring the Cartagena flag its patriots first raised.",
    sources: [
      {
        title: "Cumpleaños Barranquilla: significado de la bandera y el escudo — Semana",
        url: "https://www.semana.com/nacion/barranquilla/articulo/cumpleanos-barranquilla-este-es-el-significado-de-la-bandera-y-el-escudo-de-la-ciudad/202254/",
      },
    ],
  },

  // ── Bucaramanga — capital of Santander, Colombia ────────────────────────────
  "CO-SAN": {
    description:
      "Three horizontal stripes — green, yellow, green — with a blue disc edged in red bearing a white " +
      "four-pointed star at the centre. The green stands for hope, the yellow for the wealth and progress " +
      "of the people, the red ring for the blood the people of Santander shed for independence, and the " +
      "four-pointed star for the city open to the four horizons of the fatherland. Adopted in 1958.",
    sources: [
      { title: "Símbolos — Alcaldía de Bucaramanga", url: "https://www.bucaramanga.gov.co/bucaramanga-nuestra-ciudad/simbolos/" },
    ],
  },

  // ── Cali — capital of Valle del Cauca, Colombia ─────────────────────────────
  "CO-VAC": {
    description:
      "Five horizontal stripes — blue, red, white, red, green — with the two red bands narrow. Blue is the " +
      "sky and the seas, red the love for Cali and the blood its patriots shed for liberty on 3 July 1810, " +
      "white the purity of its people and the river that crosses the city, and green the meadows and fields " +
      "around it. Created in 1928 and made official in 1954.",
    sources: [
      { title: "Símbolos — Alcaldía de Santiago de Cali", url: "https://www.cali.gov.co/gobierno/publicaciones/226/simbolos/" },
      { title: "Bandera de Cali — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Cali" },
    ],
  },

  // ── Popayán — capital of Cauca, Colombia ────────────────────────────────────
  "CO-CAU": {
    description:
      "Two yellow (gualdo) bands divided by a blue (azur) stripe, each yellow band charged with four " +
      "Jerusalem crosses. Drawn from the city arms, the flag reads in heraldic terms as “the glory of high " +
      "deeds and noble ideals, adorned by the cross of sacrifice”: yellow for glory, blue for ideals, and the " +
      "Jerusalem crosses for sacrifice in the struggles of faith. Popayán is known as “the White City”.",
    sources: [
      { title: "Símbolos — Alcaldía de Popayán", url: "https://www.popayan.gov.co/MiMunicipio/Paginas/Simbolos.aspx" },
      { title: "Escudo de Popayán — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Popay%C3%A1n" },
    ],
  },

  // ── Cúcuta — capital of Norte de Santander, Colombia ────────────────────────
  "CO-NSA": {
    description:
      "Two equal horizontal bands, black over red (with the city arms added at the centre for official use). " +
      "Black stands for the wealth hidden in the region’s soil and the latent wealth of its people; red for " +
      "heroism and the blood of the patriots. First flown in 1928 and made the city’s official ensign in 1988.",
    sources: [
      { title: "Bandera de Cúcuta — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_C%C3%BAcuta" },
    ],
  },

  // ── Manizales — capital of Caldas, Colombia ─────────────────────────────────
  "CO-CAL": {
    description:
      "Three plain horizontal stripes — white, green and red — standing for the coffee on which the region " +
      "lives: white for the coffee flower, green for the foliage of the plantations, and red for the ripe " +
      "coffee bean. Adopted in 1996.",
    sources: [
      { title: "Manizales (Caldas, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-cal-m.html" },
      { title: "Símbolos — Sociedad de Mejoras Públicas de Manizales", url: "http://www.somepumanizales.org/p/institucional.html" },
    ],
  },

  // ── Pereira — capital of Risaralda, Colombia ────────────────────────────────
  "CO-RIS": {
    description:
      "A central deep-yellow triangle between scarlet side triangles, with the Phrygian Cap of Liberty on " +
      "the yellow. Taken together the flag is read as “with the red blood of the sons of Pereira, liberty " +
      "rises upon the wealth of its soil” — the yellow for liberty and the wealth of the land, the scarlet " +
      "for the blood of its people. Adopted in 1923.",
    sources: [
      { title: "Escudo y Bandera — Concejo de Pereira", url: "https://www.concejopereira.gov.co/es/escudo-y-bandera-PG61" },
      { title: "Pereira (Risaralda, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-ris-p.html" },
    ],
  },

  // ── Armenia — capital of Quindío, Colombia ──────────────────────────────────
  "CO-QUI": {
    description:
      "Three equal horizontal stripes — green, white and yellow. Green stands for the natural wealth and " +
      "vegetation of the department, white for peace, and yellow for its coffee culture. The design dates to " +
      "1927 (by the teacher Rosana Londoño Álzate) and was adopted officially in 2010.",
    sources: [
      { title: "Símbolos de Armenia (Quindío) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/S%C3%ADmbolos_de_Armenia_(Quind%C3%ADo)" },
    ],
  },

  // ── Tunja — capital of Boyacá, Colombia ─────────────────────────────────────
  "CO-BOY": {
    description:
      "Three horizontal stripes — green, white, green. Green stands for the honour, friendship and courtesy " +
      "of the city’s people and for hope and devotion to its progress; white for cleanliness and integrity " +
      "and for greatness and culture. Created in 1939 for the fourth centenary of the city’s Hispanic " +
      "founding.",
    sources: [
      { title: "Bandera — Alcaldía de Tunja", url: "https://www.tunja-boyaca.gov.co/municipio/bandera" },
    ],
  },

  // ── Neiva — capital of Huila, Colombia ──────────────────────────────────────
  "CO-HUI": {
    description:
      "Three horizontal stripes — red, green, yellow — crossed by an indigenous arrow set at 45° pointing to " +
      "the upper hoist. Red is the courage and love of liberty of the huilense people, green a homage to " +
      "work and to the land’s arts and culture (and hope), and yellow the nobility and the mineral wealth of " +
      "the region. The three stripes recall the city’s three foundings (1539, 1551, 1612). Adopted in 1967.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Neiva", url: "https://www.alcaldianeiva.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Pasto — capital of Nariño, Colombia ─────────────────────────────────────
  "CO-NAR": {
    description:
      "A central ultramarine-blue band between two vermilion-red bands, with a gold triangle at the hoist. " +
      "The red stands for highness and strength, the blue for justice, beauty, serenity and loyalty, and the " +
      "gold triangle for the light, power, constancy and nobility of the pastuso people. Designed by " +
      "Ignacio Rodríguez Guerrero.",
    sources: [
      { title: "Bandera de Pasto — Alcaldía de Pasto", url: "https://www.pasto.gov.co/index.php/nuestros-simbolos/bandera-de-pasto" },
    ],
  },

  // ── Santa Marta — capital of Magdalena, Colombia ────────────────────────────
  "CO-MAG": {
    description:
      "A white-and-blue flag. White stands for peace — all united without rancour for this land — and blue " +
      "for the sky, the sea and the silvery horizon of the Sierra Nevada that rises behind the city.",
    sources: [
      { title: "Símbolos — Alcaldía Distrital de Santa Marta", url: "https://www.santamarta.gov.co/vive-en-santa-marta/simbolos" },
    ],
  },

  // ── Villavicencio — capital of Meta, Colombia ───────────────────────────────
  "CO-MET": {
    description:
      "Three horizontal stripes — blue, green, red. Blue stands for the immense sky and the region’s rich " +
      "waters, green for the fertile plains of the Llanos Orientales, and red for the people’s struggle in " +
      "the campaign of liberation. Adopted in 1970.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Villavicencio", url: "https://villavicencio.gov.co/municipio/nuestros-simbolos/" },
    ],
  },

  // ── Ibagué — capital of Tolima, Colombia ────────────────────────────────────
  "CO-TOL": {
    description:
      "Three horizontal stripes — yellow, green, red — echoing the flag of the United Provinces of New " +
      "Granada. Yellow stands for the municipality’s mineral wealth, green for its vegetation and its coffee " +
      "plantations, and red for the blood shed by Ibagué’s heroes in the wars of independence.",
    sources: [
      { title: "Escudo de Ibagué — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Ibagu%C3%A9" },
    ],
  },

  // ── Valledupar — capital of Cesar, Colombia ─────────────────────────────────
  "CO-CES": {
    description:
      "Three horizontal stripes — dark blue, white, red. Blue stands for the sky and the rivers that bathe " +
      "the city, white for the perpetual snows of the Sierra Nevada that watches over it, and red for the " +
      "blood the region’s native peoples shed in its defence.",
    sources: [
      { title: "Símbolos — Concejo de Valledupar", url: "https://concejodevalledupar.gov.co/simbolos/" },
    ],
  },

  // ── Montería — capital of Córdoba, Colombia ─────────────────────────────────
  "CO-COR": {
    description:
      "Quartered red, white, white and blue, with a golden five-pointed star at the centre. The red quarter " +
      "stands for vigour and heroism, the two white quarters for peace, and the blue quarter for the sky and " +
      "space; the gold star is the gold of the great Sinú river. Adopted in 1960.",
    sources: [
      { title: "Símbolos — Alcaldía de Montería", url: "https://www.monteria.gov.co/publicaciones/143/simbolos/" },
    ],
  },

  // ── Riohacha — capital of La Guajira, Colombia ──────────────────────────────
  "CO-LAG": {
    description:
      "A flag in two blues — sky-blue and royal blue — bearing a golden rising sun. The sun rises each " +
      "morning bringing opportunity and a new day; among its rays, seven tall rays honour the Creator and " +
      "the lesser rays stand for humankind under that guidance. Adopted in the 2002 redesign of the city’s " +
      "emblems.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Riohacha", url: "https://www.riohacha-laguajira.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Florencia — capital of Caquetá, Colombia ────────────────────────────────
  "CO-CAQ": {
    description:
      "Three horizontal stripes — green, white, red. Green fills the upper half for the forest wealth of " +
      "Caquetá and the hope of a bright future, white for the morning light and the peace with which the " +
      "land is blessed, and red for the ardent, striving spirit of the caqueteño. Made official in 1964.",
    sources: [
      { title: "Bandera de Florencia (Caquetá) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Florencia_(Caquet%C3%A1)" },
      { title: "Florencia (Caqueta, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-caqfl.html" },
    ],
  },

  // ── Leticia — capital of Amazonas, Colombia ─────────────────────────────────
  "CO-AMA": {
    description:
      "A green field over blue, with a golden sun. Green stands for the semi-virgin jungle and its " +
      "biodiversity, blue for the waters of the Amazon on whose bank the city sits, and the sun for Leticia, " +
      "known as the “City of Light”.",
    sources: [
      { title: "Leticia (Colombia) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Leticia_(Colombia)" },
      { title: "Leticia (Amazonas, Colombia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/co-amalt.html" },
    ],
  },

  // ── Arauca — capital of Arauca, Colombia ────────────────────────────────────
  "CO-ARA": {
    description:
      "Two equal horizontal stripes, green over red. Green stands for the department’s wide plains (llanos), " +
      "red for the blood shed by those who fought for freedom.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Arauca", url: "https://www.arauca-arauca.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
      { title: "Bandera de Arauca — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Arauca" },
    ],
  },

  // ── Yopal — capital of Casanare, Colombia ───────────────────────────────────
  "CO-CAS": {
    description:
      "Three horizontal stripes — red, yellow, green — with the city arms across them. Red stands for the " +
      "blood the brave llaneros shed for freedom, yellow for the wealth of Yopal and the llano, and green " +
      "for the region’s green savannas.",
    sources: [
      { title: "Nuestro municipio — Alcaldía de Yopal", url: "https://www.yopal-casanare.gov.co/municipio/nuestro-municipio" },
    ],
  },

  // ── Quibdó — capital of Chocó, Colombia ─────────────────────────────────────
  "CO-CHO": {
    description:
      "Green (half), red and brown (a quarter each). Green stands for the rainforest surrounding the city — a " +
      "lung of humanity — red for the blood the ancestors shed in the struggle for freedom, and brown in " +
      "homage to the city’s patron, Saint Francis of Assisi. Presented in 1995.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Quibdó", url: "https://www.quibdo-choco.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Inírida — capital of Guainía, Colombia ──────────────────────────────────
  "CO-GUA": {
    description:
      "A green field crossed by blue diagonal bands and charged with a radiant sun. Green stands for the " +
      "region’s nature and growth, the blue bands for its rivers — the “fluvial star” where the Guaviare, " +
      "Atabapo and Inírida meet — and the sun for wealth, strength and human warmth. (Inírida means “Little " +
      "Mirror of the Sun”.)",
    sources: [
      { title: "Inírida — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/In%C3%ADrida" },
    ],
  },

  // ── San José del Guaviare — capital of Guaviare, Colombia ───────────────────
  "CO-GUV": {
    description:
      "Sky-blue and green fields joined by a golden wavy band, with white at the hoist. The blue is the sky " +
      "of the plains giving way to the green of the jungle (and hope); the yellow band is the Guayabero and " +
      "Ariari rivers that unite to form the Guaviare, gold for the wealth they carry; and the white is the " +
      "peace hoped for all Colombia.",
    sources: [
      {
        title: "Nuestros símbolos — Alcaldía de San José del Guaviare",
        url: "https://www.sanjosedelguaviare-guaviare.gov.co/publicaciones/44/nuestros-simbolos/",
      },
    ],
  },

  // ── Mocoa — capital of Putumayo, Colombia ───────────────────────────────────
  "CO-PUT": {
    description:
      "Blue, white and green horizontal stripes within a yellow border, a radiant sun on the white. Blue is " +
      "the sky and rivers and the calm, reflective spirit; white is the peaceful character of the mocoanos, " +
      "the sun standing for the tropical climate and for light and transparency; green is the mountains and " +
      "forests and hope; and the yellow border is the riches around the town — the rivers’ alluvial gold and " +
      "its people’s spirit of work.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Mocoa", url: "https://www.mocoa-putumayo.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── Sincelejo — capital of Sucre, Colombia ──────────────────────────────────
  "CO-SUC": {
    description:
      "Three equal stripes — white, old-glory red and green. White stands for purity, red for passion and " +
      "strength, and green for the richness of nature.",
    sources: [
      { title: "Nuestros Símbolos — Alcaldía de Sincelejo", url: "https://www.alcaldiadesincelejo.gov.co/MiMunicipio/Paginas/Nuestros-Simbolos.aspx" },
    ],
  },

  // ── San José — capital of Costa Rica ────────────────────────────────────────
  "CR-SJ": {
    description:
      "Blue, white and green bands with a row of eleven white stars. Blue is the sky, green is hope and white " +
      "is transparency; the eleven stars stand for the eleven districts of the canton of San José.",
    sources: [
      { title: "Bandera del cantón — Municipalidad de San José", url: "https://www.msj.go.cr/MSJ/Capital/SitePages/bandera_canton.aspx" },
      { title: "Cantón de San José — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Cant%C3%B3n_de_San_Jos%C3%A9" },
    ],
  },

  // ── Alajuela — capital of Alajuela province, Costa Rica ─────────────────────
  "CR-A": {
    description:
      "A white flag bearing the canton’s coat of arms (approved 1908). The shield is split: on the gold half " +
      "a flaming black torch commemorates Juan Santamaría, the Alajuela drummer-boy who died for the country " +
      "at Rivas in 1856; the other half carries the five stripes of the national flag, and a Phrygian cap of " +
      "liberty on a lance crowns the shield. The motto reads “Pro Patria Nostra Sanguis Noster” (For our " +
      "fatherland, our blood).",
    sources: [
      { title: "Escudo de la Ciudad de Alajuela — Escuela Nicolás Aguilar", url: "http://www.escnicol1905.ed.cr/sitionew/index.php/component/content/article/26-alajuela-historica/124-escudo-de-la-ciudad-de-alajuela" },
    ],
  },

  // ── Cartago — capital of Cartago province, Costa Rica ──────────────────────
  "CR-C": {
    description:
      "Red over blue, with the canton arms at the centre. Red stands for the courage and strength of the " +
      "people of Cartago and the sacrifices made in defence of liberty; blue for the sky, peace, faith and " +
      "hope. The arms carry a rampant lion (from the conqueror Juan Vázquez de Coronado’s family) and a " +
      "golden castle, under the motto “Fide et Pace” (By Faith and Peace).",
    sources: [
      { title: "Símbolos — Municipalidad de Cartago", url: "https://patrimoniovirtual.muni-carta.go.cr/Simbolos.aspx" },
    ],
  },

  // ── Heredia — capital of Heredia province, Costa Rica ──────────────────────
  "CR-H": {
    description:
      "Three vertical stripes — yellow (hoist), white and red — with the canton arms on the white. The yellow " +
      "and white are the colours of the Vatican, marking the city’s deep Catholic tradition (yellow and red " +
      "are also the heredianos’ traditional colours). The arms show a silver fort — like the one Fadrique " +
      "Gutiérrez built — on red within blue, with the mottoes “Libertad, Paz, Progreso” and “Heredia”.",
    sources: [
      { title: "Símbolos — Municipalidad de Heredia", url: "https://www.heredia.go.cr/es/el-canton/simbolos" },
    ],
  },

  // ── Puntarenas — capital of Puntarenas province, Costa Rica ────────────────
  "CR-P": {
    description:
      "Diagonal bands of red, white, blue and green with a large orange sun dated “1848”. The red, white and " +
      "blue are the national colours (adopted in 1848) and green stands for the region’s nature; the sun’s " +
      "eleven rays represent the eleven cantons of Puntarenas province. The flag was created in the early " +
      "1990s.",
    sources: [
      { title: "Bandera de la Provincia de Puntarenas — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Archivo:Bandera_de_la_Provincia_de_Puntarenas.svg" },
      { title: "La heráldica de Puntarenas", url: "https://heraldica.website/heraldica/descubre-la-historia-detras-de-la-heraldica-de-puntarenas/" },
    ],
  },

  // ── Havana — capital of Cuba ────────────────────────────────────────────────
  "CU-03": {
    description:
      "A blue field with a yellow border, bearing the city arms. The shield, granted by royal decree in " +
      "1665, shows three silver castles — the fortresses that guarded the port (La Fuerza, El Morro and La " +
      "Punta) — and a golden key on blue, for Havana as the “Key to the Gulf of Mexico”.",
    sources: [
      { title: "Bandera de La Habana — EcuRed", url: "https://www.ecured.cu/Bandera_de_La_Habana" },
      { title: "Escudo de La Habana — EcuRed", url: "https://www.ecured.cu/Escudo_de_La_Habana" },
    ],
  },

  // ── Santa Clara — capital of Villa Clara, Cuba ─────────────────────────────
  "CU-05": {
    description:
      "Three horizontal stripes — blue, white and red — with the city arms at the centre. The shield, under " +
      "a mural crown, shows in its upper half a hill and cay (where the families from Remedios came to found " +
      "the town) with the city key, and in its lower half a bohío (a traditional hut) and a tamarind tree; " +
      "its motto reads “Patria, Prosperidad, Familia”.",
    sources: [
      { title: "Símbolos municipales — Portal del Ciudadano Mi Santa Clara", url: "https://www.misantaclara.gob.cu/nuestra-region/region-cizq/simbolos-municipales" },
    ],
  },

  // ── Cienfuegos — capital of Cienfuegos province, Cuba ──────────────────────
  "CU-06": {
    description:
      "Three vertical stripes — blue, white, red — recalling the French flag and the French origin of the " +
      "founders of the colony of Fernandina de Jagua. A white cross on the blue stripe stands for " +
      "Christianity and the city’s patroness, the Immaculate Conception; the white stripe carries the city " +
      "arms with the motto “Fe, Trabajo y Unión” (Faith, Work and Union); and a white five-pointed star sits " +
      "on the red.",
    sources: [
      { title: "Símbolos locales: La bandera de Cienfuegos — 5 de Septiembre", url: "https://www.5septiembre.cu/simbolos-locales-la-bandera-de-cienfuegos/" },
      { title: "Atributos locales de Cienfuegos — EcuRed", url: "https://www.ecured.cu/Atributos_locales_de_Cienfuegos" },
    ],
  },

  // ── Ostrava — capital of the Moravian-Silesian Region, Czechia ─────────────
  "CZ-MO": {
    description:
      "A blue flag bearing a leaping white (silver) horse with a red saddle-cloth under a gold saddle, and a " +
      "gold rose. The horse is often linked to Ostrava’s position on the old Amber Road trade route (or " +
      "taken from the arms of the town’s first reeve); the gold rose was added under the Olomouc bishop " +
      "Stanislav Thurzo (1497–1560). Blue and white are the city’s colours.",
    sources: [
      { title: "Znak města Ostravy — Statutární město Ostrava", url: "https://ostrava.cz/cs/o-meste/znak-mesta-ostravy" },
      { title: "Vlajka Ostravy — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Vlajka_Ostravy" },
    ],
  },

  // ── Olomouc — capital of the Olomouc Region, Czechia ───────────────────────
  "CZ-OL": {
    description:
      "A blue flag bearing the crowned red-and-silver chequered eagle of Moravia and the gold letters " +
      "S · P · Q · O. Olomouc was the historic Moravian capital, so it carries the Moravian eagle; the " +
      "letters stand for Senatus Populusque Olomucensis (“the Senate and People of Olomouc”), added to the " +
      "arms by Maria Theresa in 1758 to honour the citizens’ resistance during the Prussian sieges.",
    sources: [
      { title: "Znak a vlajka — Statutární město Olomouc / Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Znak_a_vlajka_Olomouce" },
    ],
  },

  // ── Pardubice — capital of the Pardubice Region, Czechia ───────────────────
  "CZ-PA": {
    description:
      "A red flag bearing the front half of a leaping silver horse with a gold bridle — the arms of the " +
      "Lords of Pardubice, used since the 16th century. By the old heraldic legend, Ješek of Pardubice had " +
      "his horse severed in half by a portcullis during a 1158 night assault on Milan and carried the half " +
      "away, earning the half-horse arms for his bravery; the horse stands for strength and endurance and " +
      "the white horse for victorious peace.",
    sources: [
      { title: "Znak města — Parpedie / Statutární město Pardubice", url: "http://www.parpedie.cz/cti-zaznam.php?id=Znak_mesta" },
    ],
  },

  // ── Jihlava — capital of the Vysočina Region, Czechia ──────────────────────
  "CZ-VY": {
    description:
      "A flag divided per bend, white with a red hedgehog above and red with the crowned Bohemian lion " +
      "below. As the oldest royal mining town, Jihlava bears the royal lion; the hedgehog is a canting " +
      "device — the town’s German name Iglau was read from Igel, “hedgehog” — and the hedgehog has become " +
      "the city’s emblem.",
    sources: [
      { title: "Znak a symbol města Jihlavy — Statutární město Jihlava", url: "https://www.jihlava.cz/znak-a-symbol-mesta-jihlavy/d-517486" },
    ],
  },

  // ── Zlín — capital of the Zlín Region, Czechia ─────────────────────────────
  "CZ-ZL": {
    description:
      "Five horizontal stripes — blue, yellow, blue, yellow, blue — with a yellow eight-pointed star on the " +
      "wider central blue stripe. The star is taken from the city arms, which show a golden timber tower with " +
      "an open gate on a green lawn beneath a golden eight-pointed star, on blue.",
    sources: [
      { title: "Symboly a ocenění města — Statutární město Zlín", url: "https://www.zlin.eu/symboly-a-oceneni-mesta" },
    ],
  },

  // ── Liberec — capital of the Liberec Region, Czechia ───────────────────────
  "CZ-LI": {
    description:
      "Two horizontal stripes, red over white, taken from the city arms: a silver shield with a red town " +
      "wall of two towers, an open gate and a portcullis, and above the gate the Redern family shield and a " +
      "lion. Red and white have been Liberec’s colours since the early 19th century.",
    sources: [
      { title: "O vlajce města Liberce — Muzeum Libea", url: "https://www.muzeum-libea.cz/vlajky-a-prapory/o-vlajce-mesta-liberce/" },
    ],
  },

  // ── Prague — capital of Czechia (and seat of the Central Bohemian Region) ──
  "CZ-ST": {
    description:
      "Two horizontal stripes, gold over red, taken from the city arms. The arms show, on red, a golden town " +
      "wall with an open gate and raised portcullis and three golden towers, with a silver armoured arm " +
      "holding a sword emerging from the gate. Emperor Frederick III changed the Old Town’s silver walls to " +
      "gold as a reward for loyalty, and the sword-arm was added by Ferdinand III in 1649 for the city’s " +
      "heroic defence against the Swedish siege.",
    sources: [
      { title: "Vlajka hlavního města Prahy — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Vlajka_hlavn%C3%ADho_m%C4%9Bsta_Prahy" },
      { title: "Znak hlavního města Prahy — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Znak_hlavn%C3%ADho_m%C4%9Bsta_Prahy" },
    ],
  },

  // ── Brno — capital of the South Moravian Region, Czechia ───────────────────
  "CZ-JM": {
    description:
      "Four horizontal stripes — white, red, white, red (the top white stripe half-width) — from the city " +
      "arms, one of the oldest municipal arms in Czechia (on a seal from 1315). By one reading the stripes " +
      "picture the confluence of the Svitava and Svratka rivers south of the city, the narrower Svitava " +
      "shown as the half-width stripe.",
    sources: [
      { title: "Znak města Brna — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Znak_m%C4%9Bsta_Brna" },
    ],
  },

  // ── České Budějovice — capital of the South Bohemian Region, Czechia ───────
  "CZ-JC": {
    description:
      "Two horizontal stripes, gold over red — one of the oldest documented flags in Bohemia (first " +
      "mentioned in 1401). The colours are taken from the city arms: a red shield with a silver crenellated " +
      "wall and three silver towers with golden roofs, and on the middle tower a red shield with the silver " +
      "Bohemian lion.",
    sources: [
      { title: "Symboly města — Statutární město České Budějovice", url: "https://www.c-budejovice.cz/symboly-mesta" },
      { title: "Vlajka Českých Budějovic — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Vlajka_%C4%8Cesk%C3%BDch_Bud%C4%9Bjovic" },
    ],
  },

  // ── Hradec Králové — capital of the Hradec Králové Region, Czechia ─────────
  "CZ-KR": {
    description:
      "The flag’s colours come from the city arms — a red shield with a silver crowned double-tailed lion " +
      "holding a golden letter G. The lion is the Bohemian lion; the G (from the German Grätz / Hradec) has " +
      "marked the city since the Middle Ages; and “Králové” (“of the Queen”) recalls that Hradec Králové was " +
      "one of the dower towns of the Bohemian queens.",
    sources: [
      { title: "Znak města — Statutární město Hradec Králové", url: "https://www.hradeckralove.org/znak-mesta/d-54292" },
    ],
  },

  // ── Karlovy Vary — capital of the Karlovy Vary Region, Czechia ─────────────
  "CZ-KA": {
    description:
      "White over red, bearing the city arms: a silver crowned double-tailed Bohemian lion rising from three " +
      "silver wavy bars that stand for the town’s thermal springs. The spa was founded by and named after " +
      "Emperor Charles IV (“Charles’ Baths”), who by legend found the hot springs during a hunt — hence the " +
      "royal lion above the waters.",
    sources: [
      { title: "Symbolika Karlovarského kraje — Karlovarský kraj", url: "https://www.kr-karlovarsky.cz/karlovarsky-kraj/symboly-zastity/symbolika-karlovarskeho-kraje" },
    ],
  },

  // ── Ústí nad Labem — capital of the Ústí nad Labem Region, Czechia ─────────
  "CZ-US": {
    description:
      "Red, white, red, from the city arms — a red shield with a silver lion adorned with two golden knots. " +
      "King Vladislav II confirmed the arms in 1476, upgrading the earlier green shield to red (a higher " +
      "heraldic rank); the flag itself dates from 1990.",
    sources: [
      { title: "Symboly Ústeckého kraje — Wikipedie (cs)", url: "https://cs.wikipedia.org/wiki/Symboly_%C3%9Asteck%C3%A9ho_kraje" },
    ],
  },

  // ── Stuttgart — capital of Baden-Württemberg, Germany ──────────────────────
  "DE-BW": {
    description:
      "Black over gold, bearing the city arms — a rearing black horse on gold, the “Stuttgarter Rössle”. " +
      "The horse is a canting device: Stuttgart grew from a stud farm and its name comes from “Stutengarten” " +
      "(mare-garden). Black and gold are the city’s colours (the gold from the Württemberg house).",
    sources: [
      { title: "Flagge und Wappen von Stuttgart — Fahnenmast.com", url: "https://www.fahnenmast.com/blog/flagge-und-wappen-von-stuttgart" },
    ],
  },

  // ── Bremen — city-state, Germany ───────────────────────────────────────────
  "DE-HB": {
    description:
      "The “Speckflagge” (bacon flag): at least eight red-and-white stripes with a chequered field at the " +
      "hoist, nicknamed for the streaky-bacon look of the stripes. The colours are those of the medieval " +
      "imperial banner and the Hanseatic League; the Bremen key that appears with the arms is the key of " +
      "Saint Peter, patron of Bremen Cathedral, taken from the city seal of 1366.",
    sources: [
      { title: "Bremer Landessymbole — Landesportal Bremen", url: "https://landesportal.bremen.de/bremer-landessymbole" },
      { title: "Flagge Bremens — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Flagge_Bremens" },
    ],
  },

  // ── Wiesbaden — capital of Hesse, Germany ──────────────────────────────────
  "DE-HE": {
    description:
      "A blue flag with three golden lilies (two above, one below). The lilies were taken as symbols of " +
      "Charlemagne, whom Wiesbaden’s citizens around 1500 believed had founded the city; gold on blue are " +
      "also the colours of the Counts of Nassau. The arms were fixed in 1905.",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Wiesbaden", url: "https://www.wiesbaden.de/en/stadtlexikon/stadtlexikon-a-z/stadtwappen" },
    ],
  },

  // ── Mainz — capital of Rhineland-Palatinate, Germany ───────────────────────
  "DE-RP": {
    description:
      "A red flag bearing the Wheel of Mainz — two six-spoked silver wheels joined by a cross. It is the " +
      "emblem of the Archbishopric and Electorate of Mainz, seen on coins from the 1230s. Its origin is " +
      "uncertain; it is most often linked to Saint Martin, the patron of the city and its cathedral, who is " +
      "shown with the two wheels on the council seal of 1300.",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Mainz", url: "https://www.mainz.de/kultur-und-wissenschaft/stadtgeschichte/stadtwappen.php" },
      { title: "Mainzer Rad — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Mainzer_Rad" },
    ],
  },

  // ── Dresden — capital of Saxony, Germany ───────────────────────────────────
  "DE-SN": {
    description:
      "Black over gold, bearing the city arms — a shield split lengthwise with the black Meissen lion on the " +
      "left and two black bars (the Landsberg pales) on the right. Both were dominion symbols of the Wettins, " +
      "the margraves of Meissen who resided in Dresden; the pales are coloured black (rather than the blue of " +
      "Leipzig’s) to tell the two cities apart. The arms have been used since the early 14th century.",
    sources: [
      { title: "Dresdner Stadtwappen — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Dresdner_Stadtwappen" },
    ],
  },

  // ── Magdeburg — capital of Saxony-Anhalt, Germany ──────────────────────────
  "DE-ST": {
    description:
      "Green over red, bearing the canting city arms of the “Maid and castle” (Magd + Burg) that voice the " +
      "city’s name. On silver a red twin-towered castle with an open golden gate; between the towers a " +
      "green-clad maiden holds a green wreath aloft, her loose hair and cloths marking her as a maiden and " +
      "the wreath standing for purity. The maiden and towers give Magdeburg its colours, green and red.",
    sources: [
      { title: "Das Stadtwappen — Landeshauptstadt Magdeburg", url: "https://www.magdeburg.de/B%C3%BCrger-Stadt/Stadt/Stadtwappen/" },
    ],
  },

  // ── Erfurt — capital of Thuringia, Germany ─────────────────────────────────
  "DE-TH": {
    description:
      "A red flag with a silver six-spoked wheel — the “Erfurt Wheel”, taken from the Wheel of Mainz because " +
      "Erfurt belonged to the Archbishopric of Mainz for over a thousand years (755–1802). By legend the " +
      "humble-born archbishop Willegis, mocked with wheels chalked on his house, answered by having white " +
      "wheels on red painted through all his rooms.",
    sources: [
      { title: "Warum Erfurt ein Wagenrad im Wappen trägt — Erfurt.de", url: "https://www.erfurt.de/ef/de/service/aktuelles/pm/2014/118042.html" },
    ],
  },

  // ── Potsdam — capital of Brandenburg, Germany ──────────────────────────────
  "DE-BB": {
    description:
      "On gold, the red Brandenburg eagle (the “Märkischer Adler”) beneath a red mural crown. The eagle was " +
      "first used as a seal by the Ascanian margrave Otto I in 1170; Potsdam was allowed the gold background " +
      "from 1660, when it became a royal residence, to mark its special standing, and the mural crown denotes " +
      "a city.",
    sources: [
      { title: "Wappen der Stadt Potsdam — Service Brandenburg", url: "https://service.brandenburg.de/service/de/adressen/kommunalverzeichnis/wappen/~wappen-der-stadt-potsdam-336901" },
    ],
  },

  // ── Schwerin — capital of Mecklenburg-Vorpommern, Germany ──────────────────
  "DE-MV": {
    description:
      "Yellow-blue-yellow, bearing the city arms: on blue, a golden armoured horseman — Henry the Lion — " +
      "riding with a lance and three-pointed pennon and a shield charged with a golden lion. Henry the Lion " +
      "founded Schwerin in 1160, and the arms honour the founder (from a seal first attested in 1255).",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Schwerin", url: "https://www.schwerin.de/politik-verwaltung/stadtverwaltung/pressestelle/stadtwappen-00001/" },
    ],
  },

  // ── Hanover — capital of Lower Saxony, Germany ─────────────────────────────
  "DE-NI": {
    description:
      "Red over white — the city colours — bearing the arms: on red, a silver wall with two towers, a golden " +
      "lion between them and, in the open gate, a golden shield with a green cloverleaf (or Marian flower). " +
      "The lion is that of the Welfs, the dynasty that ruled here and long held the British crown; the open " +
      "gate stands for the trade on which the city lived. The arms are known from a seal of 1266.",
    sources: [
      { title: "Flagge und Wappen von Hannover — Fahnenmast.com", url: "https://www.fahnenmast.com/blog/flagge-und-wappen-von-hannover" },
    ],
  },

  // ── Düsseldorf — capital of North Rhine-Westphalia, Germany ────────────────
  "DE-NW": {
    description:
      "Red over white, bearing the city arms — on silver, the red Bergisch lion (double-tailed, blue-crowned) " +
      "holding a blue anchor. The anchor is the city’s oldest emblem, for the citizens’ ties to Rhine " +
      "shipping; the lion is that of the Duchy of Berg, added when Düsseldorf became the duchy’s capital in " +
      "the 16th century.",
    sources: [
      { title: "Stadtwappen — Landeshauptstadt Düsseldorf", url: "https://www.duesseldorf.de/stadtarchiv/stadtgeschichte/aufsaetze/aufsaetze/stadtwappen" },
    ],
  },

  // ── Kiel — capital of Schleswig-Holstein, Germany ──────────────────────────
  "DE-SH": {
    description:
      "A red flag bearing the city arms: a silver nettle-leaf (Nesselblatt) on red with a black boat on it. " +
      "The nettle-leaf on red comes from the Schauenburg counts of Holstein, and each Holstein town added its " +
      "own mark — Kiel chose the boat, which stands for the city’s harbour (and, walled, for its town rights). " +
      "Red and white were chosen as imperial colours over a lion that could read as Danish.",
    sources: [
      { title: "Wappen der Landeshauptstadt Kiel — Landeshauptstadt Kiel", url: "https://www.kiel.de/de/kultur_freizeit/stadtgeschichte/wappen.php" },
      { title: "Kieler Wappen — Wikipedia (de)", url: "https://de.wikipedia.org/wiki/Kieler_Wappen" },
    ],
  },

  // ── Saarbrücken — capital of Saarland, Germany ─────────────────────────────
  "DE-SL": {
    description:
      "The city arms, formed in 1909 when Saarbrücken united three towns, combine an emblem from each: the " +
      "red “St. Johann rose” from St. Johann, a crossed black hammer and mallet (mining) from " +
      "Malstatt-Burbach, and the silver lion on blue of the Counts of Saarbrücken.",
    sources: [
      { title: "Das Wappen Saarbrückens — regionalgeschichte.net", url: "https://www.regionalgeschichte.net/saarland/saarbruecken/einzelaspekte/wappen.html" },
    ],
  },

  // ── Nuuk — capital of Greenland ─────────────────────────────────────────────
  "DK-GL": {
    description:
      "A blue-and-white shield with, in the foreground, the red teachers’ college (the “red siminar”) with " +
      "gold windows and a weathercock, and a yellow kayak paddle on the water before it; Mt Sermitsiaq rises " +
      "behind. The red college stands for education and culture; the paddle for the Greenlanders’ hunting " +
      "way of life and for Nuuk as the seat of Greenland; the three white waves are sea ice and the three " +
      "blue waves the fjord; and the mountain stands for the people of Nuuk.",
    sources: [
      { title: "Coat of arms of Nuuk — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Nuuk" },
    ],
  },

  // ── San Francisco de Macorís — capital of Duarte province, Dominican Rep. ──
  "DO-06": {
    description:
      "The city arms, first presented at a 1907 exhibition where each province was given arms for its main " +
      "industry. Its defining charge is the cacao pod: San Francisco de Macorís, capital of Duarte province, " +
      "is the country’s great cacao producer — the “Land of Cacao”. The design also shows the local mountain " +
      "Loma Quita Espuela with a rising sun, and three white lilies.",
    sources: [
      { title: "Historia del Escudo de San Francisco de Macorís — El Jaya", url: "https://www.eljaya.com/40568/historia-del-escudo-de-san-francisco-de-macoris/" },
    ],
  },

  // ── Santiago de los Caballeros — capital of Santiago province, Dominican Rep. ─
  "DO-25": {
    description:
      "A red shield strewn with silver scallop shells (veneras) beneath a crown. The scallop is the emblem " +
      "of Saint James the Greater (Santiago): the city, founded in 1495 as “Santiago de los Treinta " +
      "Caballeros”, was named for the apostle and for the thirty knights of the Order of Santiago who " +
      "settled it, and King Ferdinand granted it these arms in 1508.",
    sources: [
      { title: "Santiago (República Dominicana) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Santiago_(Rep%C3%BAblica_Dominicana)" },
    ],
  },

  // ── Algiers — capital of Algeria ────────────────────────────────────────────
  "DZ-16": {
    description:
      "The arms of Algiers show a fortress for the Casbah, the old citadel above the city, and a ship for " +
      "the Algerian fleet on which the port’s life depends, flanked by two lions taken from the city’s " +
      "historic gates. A crescent stands for Islam, the state religion, above symbols of the nation’s work — " +
      "a sheaf of corn for agriculture and a cogwheel for industry.",
    sources: [
      { title: "Coat of arms of Algiers — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Algiers" },
    ],
  },

  // ── Quito — capital of Ecuador (and of Pichincha) ──────────────────────────
  "EC-P": {
    description:
      "Three vertical stripes — blue, red, blue — with the city arms at the centre. Blue is the sky of " +
      "Quito, red the blood of its people. The arms show a silver castle with three towers for the city’s " +
      "strength, nobility and loyalty, and the golden cord of Saint Francis hangs from the staff. Made " +
      "official in 1944.",
    sources: [
      { title: "Bandera de Quito — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Quito" },
    ],
  },

  // ── Guayaquil — capital of Guayas, Ecuador ─────────────────────────────────
  "EC-G": {
    description:
      "Five horizontal stripes — three light-blue alternating with two white — and three white stars on the " +
      "central blue stripe. Adopted after the independence of 9 October 1820, the light blue stands for the " +
      "sky and the Guayas river and the white for the peace sought; the three stars are read as the " +
      "provinces of the old Audiencia de Quito (Guayaquil, Cuenca and Quito). The design is attributed to " +
      "José Joaquín de Olmedo.",
    sources: [
      { title: "Bandera de Guayaquil — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Guayaquil" },
    ],
  },

  // ── Cuenca — capital of Azuay, Ecuador ─────────────────────────────────────
  "EC-A": {
    description:
      "Red over golden yellow. The colours echo the flag of Spain, reflecting the city’s Spanish founding; " +
      "Cuenca first carried its own banner in 1590, for the feast of Saint James the Apostle.",
    sources: [
      { title: "Bandera de Cuenca (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Cuenca_(Ecuador)" },
    ],
  },

  // ── Ambato — capital of Tungurahua, Ecuador ────────────────────────────────
  "EC-T": {
    description:
      "Three horizontal stripes — red, green, red. The red bands stand for the rebellious spirit of the " +
      "ambateños, the green for the countryside, its vegetation and the city’s cheer. Adopted in 1954.",
    sources: [
      { title: "Bandera de Ambato — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Ambato" },
    ],
  },

  // ── Loja — capital of Loja province, Ecuador ───────────────────────────────
  "EC-L": {
    description:
      "Five horizontal stripes alternating red, blue and yellow, with the city arms at the centre — the " +
      "colours of the arms granted to the “very noble and very loyal” city by Philip II in 1571. Red is the " +
      "loyalty and sacrifice of the lojanos in the colonial expeditions toward the Amazon, yellow the “city " +
      "of gold” and the land’s riches, and silvery blue the Zamora and Malacatos rivers that flow to the " +
      "Amazon.",
    sources: [
      { title: "Símbolos patrios — Municipio de Loja", url: "https://www.loja.gob.ec/contenido/simbolos-patrios" },
      { title: "Bandera de Loja (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Loja_(Ecuador)" },
    ],
  },

  // ── Riobamba — capital of Chimborazo, Ecuador ──────────────────────────────
  "EC-H": {
    description:
      "Divided along the diagonal — red above, blue below. Red stands for the greatness of the riobambeño " +
      "people, ready to shed their blood; blue for the Ecuadorian sky and the ideal of liberty. Defined in " +
      "1958.",
    sources: [
      { title: "Bandera de Riobamba — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Riobamba" },
    ],
  },

  // ── Ibarra — capital of Imbabura, Ecuador ──────────────────────────────────
  "EC-I": {
    description:
      "Red over white, with the city arms at the centre. The colours come from the royal standard of the " +
      "city’s founder Miguel de Ibarra and the House of Austria, and stand for valour and purity. The design " +
      "dates to 1607 and was made official in 1951.",
    sources: [
      { title: "La bandera y el escudo atesoran el origen de Ibarra — La Hora", url: "https://www.lahora.com.ec/imbabura-carchi/bandera-escudo-ibarra-significado/" },
    ],
  },

  // ── Machala — capital of El Oro, Ecuador ───────────────────────────────────
  "EC-O": {
    description:
      "Three horizontal bands: light blue on top, white in the middle, and the lower band split green (hoist) " +
      "and red (fly). Light blue is the sky and sea, white the purity and peace of the machaleños, green the " +
      "greenness of the fields and their hope, and red the blood of the city’s people. Adopted in 1949.",
    sources: [
      { title: "Bandera de Machala — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Machala" },
    ],
  },

  // ── Portoviejo — capital of Manabí, Ecuador ────────────────────────────────
  "EC-M": {
    description:
      "A flag quartered into four panels. The upper hoist repeats the light-blue-and-white of Guayaquil’s " +
      "flag (without its stars), honouring Guayaquil’s lead in the 1820 independence that Portoviejo joined; " +
      "the upper fly is green for the valley’s exuberance; the lower hoist is red for the blood of local and " +
      "national heroes; and the lower fly is white for the nobility and purity of the city’s people. Created " +
      "in 1968.",
    sources: [
      { title: "Bandera de Portoviejo — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Portoviejo" },
    ],
  },

  // ── Esmeraldas — capital of Esmeraldas province, Ecuador ───────────────────
  "EC-E": {
    description:
      "White over emerald green. White is the whiteness of the clouds that play in the wide sky, and the " +
      "emerald green the fresh colour of the region’s rich, fertile fields and pastures.",
    sources: [
      { title: "Bandera de Esmeraldas (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Esmeraldas_(Ecuador)" },
    ],
  },

  // ── Babahoyo — capital of Los Ríos, Ecuador ────────────────────────────────
  "EC-R": {
    description:
      "A green field with a white diamond bearing the city arms. Green stands for the canton’s crops, " +
      "vegetation and land; the white diamond for the peace and harmony of the city. Adopted in 1948.",
    sources: [
      { title: "Bandera de Babahoyo — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Babahoyo" },
    ],
  },

  // ── Latacunga — capital of Cotopaxi, Ecuador ───────────────────────────────
  "EC-X": {
    description:
      "Yellow over light blue, with the city arms. Taken from Ecuador’s national colours, they are read as " +
      "Peace and Wealth, Spirituality and Beauty. Approved in 1972.",
    sources: [
      { title: "Ordenanza — Bandera de la ciudad de Latacunga (GAD Latacunga)", url: "https://latacunga.gob.ec/images/pdf/Ordenanzas/1_4_ordenanza_bandera_de_la_ciudad.pdf" },
    ],
  },

  // ── Tulcán — capital of Carchi, Ecuador ────────────────────────────────────
  "EC-C": {
    description:
      "Blue over red, with the national emblem in the upper hoist. Blue is the clear Ecuadorian sky, as wide " +
      "as the ideal of liberty Tulcán has always upheld; red is the greatness of a proud people who shed " +
      "their blood for independence and democracy. Adopted in 1949.",
    sources: [
      { title: "Bandera de Tulcán — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Tulc%C3%A1n" },
    ],
  },

  // ── Santo Domingo — capital of Santo Domingo de los Tsáchilas, Ecuador ─────
  "EC-SD": {
    description:
      "Red and green fields divided by a black-and-white diagonal cross, bearing the city arms. The colours " +
      "are those of the traditional Tsáchila “manpe tsanpá” body-painting: red for fire, the blood of the " +
      "ancestors and the achiote dye, and green for the lush region, nature’s renewal and hope. Defined in " +
      "1969.",
    sources: [
      { title: "Bandera de Santo Domingo (Ecuador) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Santo_Domingo_(Ecuador)" },
      { title: "Símbolos — Prefectura de Santo Domingo de los Tsáchilas", url: "https://gptsachila.gob.ec/simbolos/" },
    ],
  },

  // ── Guaranda — capital of Bolívar province, Ecuador ────────────────────────
  "EC-B": {
    description:
      "Three horizontal stripes — red, white, blue. Red is strength and the valiant character of the people " +
      "and the sacrifice of their heroes; white is dignity, honesty, justice and peace; blue is the wide " +
      "horizon and the sky of noble hopes, reflected in the rivers that water the Bolívar countryside. Made " +
      "official in 1984.",
    sources: [
      { title: "Símbolos Cívicos del cantón Guaranda — GAD Guaranda", url: "https://www.guaranda.gob.ec/newsiteCMT/simbolos-civicos-del-canton-guaranda/" },
    ],
  },

  // ── Azogues — capital of Cañar, Ecuador ────────────────────────────────────
  "EC-F": {
    description:
      "Three horizontal stripes — red, white, green — with the city arms. Red stands for valour, white for " +
      "integrity and purity, and green for hope and service. Adopted in 1948.",
    sources: [
      { title: "Bandera de Azogues — GAD Municipal de Azogues", url: "https://www.azogues.gob.ec/portal/index.php/azogues/s%C3%ADmbolos-cantonales/26-bandera-de-azogues" },
    ],
  },

  // ── Puerto Francisco de Orellana (Coca) — capital of Orellana, Ecuador ─────
  "EC-D": {
    description:
      "A yellow triangle at the hoist with green (upper) and black (lower) bands. Yellow stands for the " +
      "richness of the canton’s soil, black for the oil wealth of the Amazonian subsoil, and green for the " +
      "great plant biodiversity and forest and farm richness of the Amazon — and the hope of better days.",
    sources: [
      { title: "Historia y Símbolos — GAD Municipal de Francisco de Orellana", url: "https://orellana.gob.ec/historia_simbolos/" },
    ],
  },

  // ── Tena — capital of Napo, Ecuador ────────────────────────────────────────
  "EC-N": {
    description:
      "Gold over green, with the city arms. Gold stands for the region’s gold wealth, green for the " +
      "abundant, rich flora of the canton.",
    sources: [
      { title: "Símbolos del Cantón — GAD Municipal de Tena", url: "https://tena.gob.ec/index.php/tena/simbolos-del-canton" },
    ],
  },

  // ── Macas — capital of Morona Santiago, Ecuador ────────────────────────────
  "EC-S": {
    description:
      "A green band over a white band, with a white canton at the hoist bearing a gold star. Green stands " +
      "for the vegetal wealth and greenness of the Upano Valley, the gold star for the Virgen Purísima de " +
      "Macas (the city’s patroness), and white for the purity, serenity and peace of the people of Morona.",
    sources: [
      { title: "Símbolos del Cantón Morona — Cultura Macabea", url: "http://culturamacabea.blogspot.com/2010/12/simbolos-del-canton-morona.html" },
    ],
  },

  // ── Nueva Loja (Lago Agrio) — capital of Sucumbíos, Ecuador ────────────────
  "EC-U": {
    description:
      "Three horizontal stripes — light blue, white and green. The light blue stands for the canton’s " +
      "rivers, the white (with seven black stars for the canton’s parishes) for the community, and the green " +
      "for the exuberant Amazon jungle.",
    sources: [
      { title: "Bandera de Lago Agrio — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Lago_Agrio" },
    ],
  },

  // ── Puyo — capital of Pastaza, Ecuador ─────────────────────────────────────
  "EC-Y": {
    description:
      "A flag of four colours — green, white, blue and yellow. Green is the exuberant Amazon vegetation, " +
      "white the mist that wraps the city, blue (in curves) the river that bathes it, and yellow the wealth " +
      "of the land.",
    sources: [
      { title: "Bandera — Municipio de Pastaza (Puyo)", url: "https://puyo.gob.ec/articulo-tag/bandera/" },
    ],
  },

  // ── Tallinn — capital of Estonia ────────────────────────────────────────────
  "EE-37": {
    description:
      "Three blue and three white equal horizontal stripes. The blue stripes derive from the three blue " +
      "lions of Tallinn’s (and Estonia’s) medieval arms and stand for strength and bravery; the white " +
      "stripes stand for peace, freedom and integrity. The design served as the standard of the city’s " +
      "medieval merchant fleet.",
    sources: [
      { title: "Flag of Tallinn — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tallinn" },
    ],
  },

  // ── Tartu — capital of Tartu County, Estonia ───────────────────────────────
  "EE-78": {
    description:
      "White over red, with the city arms — granted by the Polish king Stephen Báthory in 1584. The arms " +
      "show a silver city wall with a gate and two towers on red; in the gateway a silver star above a " +
      "chain, and over the wall crossed silver keys and a sword. The keys and sword are the attributes of " +
      "Tartu’s patron saints Peter and Paul, and the open gate marks it as a Hanseatic trading town.",
    sources: [
      { title: "The Flag and the Coat of Arms of Tartu — Tartu linn", url: "https://tartu.ee/en/flag-and-coat-of-arms-of-tartu" },
    ],
  },

  // ── Pärnu — capital of Pärnu County, Estonia ───────────────────────────────
  "EE-67": {
    description:
      "A white Nordic (offset) cross on blue. The flag (approved 1934) takes the cross from the city arms, " +
      "which descend from Pärnu’s oldest seal of 1361 showing God’s hand holding a cross and a key — the " +
      "cross a relic said to have survived the Dome Church fire, the key the symbol of the town’s bylaws.",
    sources: [
      { title: "Symbols — Pärnu linn", url: "https://parnu.ee/en/home/symbols-of-parnu" },
    ],
  },

  // ── Viljandi — capital of Viljandi County, Estonia ─────────────────────────
  "EE-84": {
    description:
      "Light blue over white — the colours of the city arms, which show a white-and-gold rose on a blue " +
      "field.",
    sources: [
      { title: "Viljandi, City of (Estonia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-vilja.html" },
    ],
  },

  // ── Võru — capital of Võru County, Estonia ─────────────────────────────────
  "EE-86": {
    description:
      "Yellow, green, yellow — the colours of the city arms, a green spruce on gold. Empress Catherine II " +
      "confirmed the arms for the new county town in 1788, the spruce standing for the tree that grows " +
      "abundantly around Võru.",
    sources: [
      { title: "Sümboolika — Võru linn", url: "https://www.voru.ee/sumboolika" },
      { title: "Võru vapp — Vikipeedia (et)", url: "https://et.wikipedia.org/wiki/V%C3%B5ru_vapp" },
    ],
  },

  // ── Cairo — capital of Egypt ────────────────────────────────────────────────
  "EG-C": {
    description:
      "The governorate emblem shows a mosque with the city’s name in Kufic script, set in a ring within a " +
      "stylised city gate. The mosque stands for Cairo’s wealth of historic Islamic architecture — the " +
      "Citadel and its great mosques among them.",
    sources: [
      { title: "Cairo (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-cai.html" },
    ],
  },

  // ── Alexandria — capital of Alexandria Governorate, Egypt ──────────────────
  "EG-ALX": {
    description:
      "The flag bears a stylised image of the Lighthouse of Alexandria — the Pharos, one of the Seven " +
      "Wonders of the Ancient World, built under Ptolemy II in the 3rd century BC. It is the civic emblem of " +
      "Alexandria and stands for the city’s maritime heritage and its old renown as a great centre of trade " +
      "and learning.",
    sources: [
      { title: "Lighthouse of Alexandria — Wikipedia", url: "https://en.wikipedia.org/wiki/Lighthouse_of_Alexandria" },
      { title: "Alexandria (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-alx.html" },
    ],
  },

  // ── Giza — capital of Giza Governorate, Egypt ──────────────────────────────
  "EG-GZ": {
    description:
      "The governorate emblem shows the three Pyramids of Giza framed by papyrus, with a minaretted mosque — " +
      "Giza being the home of the Pyramids and the Great Sphinx.",
    sources: [
      { title: "al-Jizah (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-jiz.html" },
    ],
  },

  // ── Aswan — capital of Aswan Governorate, Egypt ────────────────────────────
  "EG-ASN": {
    description:
      "On light blue, a golden emblem of a wheel with zig-zag waves and power pylons drawn from it — a " +
      "reference to the hydro-electricity generated by the Aswan Dam, the governorate’s defining work.",
    sources: [
      { title: "Aswan (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-asw.html" },
    ],
  },

  // ── Luxor — capital of Luxor Governorate, Egypt ────────────────────────────
  "EG-LX": {
    description:
      "The flag shows the temple of Karnak with its avenue of sphinxes, and above it the golden funerary " +
      "mask of Tutankhamun, found intact in the Valley of the Kings — Luxor being the site of ancient " +
      "Thebes.",
    sources: [
      { title: "Luxor (Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-lux.html" },
    ],
  },

  // ── Suez — capital of Suez Governorate, Egypt ──────────────────────────────
  "EG-SUZ": {
    description:
      "A red flame within a cogwheel: the cogwheel for the governorate’s strong industry and the flame for " +
      "its oil and gas — Suez being a major centre of Egypt’s petroleum industry.",
    sources: [
      { title: "Suez (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-sue.html" },
    ],
  },

  // ── Benha — capital of Qalyubia Governorate, Egypt ─────────────────────────
  "EG-KB": {
    description:
      "On green, an emblem of a mosque set within a half-cogwheel above and a half-wreath of grain below — " +
      "for the governorate’s industry (the cogwheel), the agriculture of its Nile-Delta land (the grain), " +
      "and its religious life (the mosque).",
    sources: [
      { title: "al-Qalyubiyah (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-qal.html" },
    ],
  },

  // ── Kafr el-Sheikh — capital of Kafr el-Sheikh Governorate, Egypt ──────────
  "EG-KFS": {
    description:
      "On turquoise — for the governorate’s Mediterranean coast — an emblem of a Pharaonic-style sailing " +
      "ship above three wavy lines, flanked by two ears of grain. The three waves are the governorate’s " +
      "waters (the Mediterranean, Lake Burullus and the Nile), the grain its agriculture, and the ship " +
      "recalls the 1956 naval Battle of Burullus.",
    sources: [
      { title: "Flag of Kafr El Sheikh Governorate — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kafr_El_Sheikh_Governorate" },
      { title: "Kafr el-Sheikh (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-kaf.html" },
    ],
  },

  // ── Sohag — capital of Sohag Governorate, Egypt ────────────────────────────
  "EG-SHG": {
    description:
      "On dark green, the head of a pharaoh wearing the Pschent — the double crown of Upper and Lower " +
      "Egypt — for this Upper-Egyptian governorate on the Nile.",
    sources: [
      { title: "Sawhaj (Governorate, Egypt) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/eg-g-saw.html" },
      { title: "Sohag Governorate — Wikipedia", url: "https://en.wikipedia.org/wiki/Sohag_Governorate" },
    ],
  },

  // ── Albacete — capital of Albacete province, Spain ─────────────────────────
  "ES-AB": {
    description:
      "A crimson field with the city arms — three silver towers set in a triangle, surmounted by a bat, " +
      "beneath a marquis’ crown. The bat evolved from an eagle shown on the town’s 16th-century arms (the " +
      "eagle appears by 1568); the reason for the beast is itself lost to history. Adopted 1992.",
    sources: [
      { title: "Bandera de Albacete — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Albacete" },
    ],
  },

  // ── Cádiz — capital of Cádiz province, Spain ───────────────────────────────
  "ES-CA": {
    description:
      "A crimson field with the city arms: Hercules in a lion skin between two lions, flanked by the two " +
      "Pillars of Hercules inscribed PLUS and ULTRA, with the motto “Hercules Fundator Gadium " +
      "Dominatorque”. By legend Hercules founded Cádiz and split the pillars to form the Strait of Gibraltar.",
    sources: [
      { title: "Escudo de Cádiz — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_C%C3%A1diz" },
    ],
  },

  // ── Cáceres — capital of Cáceres province, Spain ───────────────────────────
  "ES-CC": {
    description:
      "A party shield: on red a golden three-towered castle, and on silver a crowned rampant lion. Queen " +
      "Isabella the Catholic ordered in 1477 that Cáceres unite the two into a single seal — the castle of " +
      "Castile and the lion of León.",
    sources: [
      { title: "Escudo de Cáceres — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_C%C3%A1ceres" },
    ],
  },

  // ── Córdoba — capital of Córdoba province, Spain ───────────────────────────
  "ES-CO": {
    description:
      "A crimson field — from the “Purple Banner of Castile” whose colour the city adopted — bearing the " +
      "city seal, a view of Córdoba from across the Guadalquivir showing the Roman bridge, the Mosque‑" +
      "Cathedral and the Albolafia water-wheel.",
    sources: [
      { title: "Símbolos de Córdoba — Ayuntamiento de Córdoba", url: "https://sites.google.com/site/simbolosdecordoba/comarca-de-cordoba/cordoba" },
    ],
  },

  // ── Granada — capital of Granada province, Spain ───────────────────────────
  "ES-GR": {
    description:
      "Two vertical stripes, crimson at the mast and green, with the city arms at the centre. The red and " +
      "green recall the Nasrid dynasty that ruled Granada; the arms show the Catholic Monarchs, Ferdinand " +
      "and Isabella, enthroned — for the city they took in 1492. The flag was restored in 1980.",
    sources: [
      { title: "Bandera de Granada (España) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Granada_(Espa%C3%B1a)" },
    ],
  },

  // ── Alicante — capital of Alicante province, Spain ─────────────────────────
  "ES-A": {
    description:
      "Divided vertically, white at the mast and blue at the fly, with the city arms in the centre. It began " +
      "as an 1845 naval signal flag and was adopted by the city in 1893; blue stands for justice and " +
      "loyalty, white for purity. The arms show the golden castle of Santa Bárbara on Mount Benacantil, the " +
      "white rock (Greek “Akra Leuka”) beaten by the blue sea.",
    sources: [
      { title: "La bandera de Alicante — Ayuntamiento de Alicante", url: "https://www.alicante.es/es/contenidos/bandera-alicante" },
    ],
  },

  // ── Almería — capital of Almería province, Spain ───────────────────────────
  "ES-AL": {
    description:
      "A white field with the red cross of Saint George and the city arms. The cross comes from the Genoese " +
      "banner — Genoa’s fleet helped Alfonso VII take Almería in 1147 — and the city kept it after the " +
      "Catholic Monarchs’ reconquest in 1489; the arms’ quarters honour the kingdoms that shared in the " +
      "conquest (Castile, León, Aragón, Navarre and Granada).",
    sources: [
      { title: "Bandera de Almería — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Almer%C3%ADa" },
    ],
  },

  // ── Ávila — capital of Ávila province, Spain ───────────────────────────────
  "ES-AV": {
    description:
      "A crimson field with the city arms — a golden castle from which the young King Alfonso VII looks out, " +
      "with the motto “Ávila del Rey” recalling the city’s loyalty to that king in his minority. The arms " +
      "were granted around 1130–1135; the crimson stands for the blood of the city’s defenders.",
    sources: [
      { title: "Escudo de Ávila — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_%C3%81vila" },
    ],
  },

  // ── Badajoz — capital of Badajoz province, Spain ───────────────────────────
  "ES-BA": {
    description:
      "A crimson field — the colour of the Kingdom of León, into which Badajoz was incorporated in 1230 — " +
      "with the city arms: a golden lion (the emblem of León, granted by Alfonso IX), a silver column " +
      "bearing “PLUS ULTRA” (for the frontier city, granted under Charles I), and three silver waves for the " +
      "Guadiana river.",
    sources: [
      { title: "Bandera de la Ciudad de Badajoz — Ayuntamiento de Badajoz", url: "https://www.aytobadajoz.es/es/ayto/bandera" },
    ],
  },

  // ── Bilbao — capital of Biscay, Spain ──────────────────────────────────────
  "ES-BI": {
    description:
      "A white flag with a red square in the upper hoist. It is an old distinguishing flag of Bilbao’s " +
      "merchant ships, taken up by the town and its council in 1845.",
    sources: [
      { title: "La bandera de Bilbao — Periódico Bilbao", url: "https://periodicobilbao.com/bandera-bilbao/" },
    ],
  },

  // ── Burgos — capital of Burgos province, Spain ─────────────────────────────
  "ES-BU": {
    description:
      "Two horizontal stripes, red over brown, with the city arms in the centre. The arms show, on green, " +
      "the crowned bust of King Ferdinand III in a purple mantle charged with three golden castles, flanked " +
      "by two shields of gold castles above a gate between two towers.",
    sources: [
      { title: "Escudo — Ayuntamiento de Burgos", url: "https://www.aytoburgos.es/escudo-e-himno/-/asset_publisher/5USVljaB20f0/content/id/477891" },
    ],
  },

  // ── Cuenca — capital of Cuenca province, Spain ─────────────────────────────
  "ES-CU": {
    description:
      "A red field with a golden chalice and an eight-pointed white star beneath a royal crown. The arms " +
      "recall the reconquest of Cuenca by Alfonso VIII in 1177: the star for the start of the siege on 6 " +
      "January (Epiphany), and the chalice of Saint Matthew for the city’s fall on 21 September, the saint’s " +
      "feast day.",
    sources: [
      { title: "Escudo de Cuenca — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Cuenca" },
    ],
  },

  // ── Castellón de la Plana — capital of Castellón, Spain ────────────────────
  "ES-CS": {
    description:
      "The yellow-and-red bars of the Senyera with a green band at the mast and the city arms beside it. The " +
      "arms — the Aragonese bars beneath a silver castle — are a canting device: “Castelló” means “little " +
      "castle”. The flag was fixed for the city’s 700th anniversary in 1952.",
    sources: [
      { title: "Bandera de Castellón de la Plana — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Castell%C3%B3n_de_la_Plana" },
    ],
  },

  // ── Girona — capital of Girona province, Spain ─────────────────────────────
  "ES-GI": {
    description:
      "The gold-and-red bars of the Senyera — the arms of the Crown of Aragón, which Girona has borne since " +
      "the 13th century — with a small shield of wavy red-and-silver bars said to stand for the four rivers " +
      "(Ter, Onyar, Güell and Galligants) that meet at the city.",
    sources: [
      { title: "Escudo de Gerona — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Gerona" },
    ],
  },

  // ── Jaén — capital of Jaén province, Spain ─────────────────────────────────
  "ES-J": {
    description:
      "An indigo field with the city arms — the quartered castle-and-lion of Castile and León that Ferdinand " +
      "III granted after taking the city. He also gave Jaén a crimson pennant of Castile with the title " +
      "“guardian and defence of the kingdoms of Castile”; over time that crimson darkened to today’s indigo.",
    sources: [
      { title: "Bandera de Jaén — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Ja%C3%A9n" },
    ],
  },

  // ── Lleida — capital of Lleida province, Spain ─────────────────────────────
  "ES-L": {
    description:
      "A crimson field with the city arms: on gold the four red bars of the Crown of Aragón, over all a " +
      "green stalk bearing three silver fleurs-de-lis. The lilies are canting — the old name “Lerita” was " +
      "linked to “liri”, the Catalan for fleur-de-lis — and the Aragón bars were added when the city came " +
      "under royal rule.",
    sources: [
      { title: "Escudo de Lérida — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_L%C3%A9rida" },
    ],
  },

  // ── León — capital of León province, Spain ─────────────────────────────────
  "ES-LE": {
    description:
      "A crimson field bearing the city arms — on silver, the purple lion of León, one of the oldest " +
      "heraldic devices in Europe (the purple tint is documented in 13th-century armorials).",
    sources: [
      { title: "Símbolos de León — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/S%C3%ADmbolos_de_Le%C3%B3n" },
    ],
  },

  // ── Lugo — capital of Lugo province, Spain ─────────────────────────────────
  "ES-LU": {
    description:
      "A white flag with the city arms held by two golden lions: a silver tower on blue, surmounted by a " +
      "golden chalice with a radiant host between two praying angels, and a border with the motto “Hoc hic " +
      "mysterium fidei firmiter profitemur” — “here we firmly profess this mystery of faith”, for the " +
      "perpetual exposition of the Blessed Sacrament in Lugo’s cathedral.",
    sources: [
      { title: "Bandera de Lugo (ciudad) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Lugo_(ciudad)" },
    ],
  },

  // ── Málaga — capital of Málaga province, Spain ─────────────────────────────
  "ES-MA": {
    description:
      "Divided vertically, purple at the mast and green, with the city arms. The Catholic Monarchs granted " +
      "the arms after taking Málaga in 1487: on red, the city and the hilltop fortress of Gibralfaro with " +
      "the walled enclosure where Christian captives were held.",
    sources: [
      { title: "Escudo y bandera de la ciudad — Ayuntamiento de Málaga", url: "https://www.malaga.eu/identidad/escudo-y-bandera-de-la-ciudad/" },
    ],
  },

  // ── Pamplona — capital of Navarre, Spain ───────────────────────────────────
  "ES-NA": {
    description:
      "A green field with the city arms: on blue a silver lion beneath a royal crown, bordered by the golden " +
      "chains of Navarre. King Charles III the Noble granted the arms and flag in the 1423 “Privilege of the " +
      "Union” that joined Pamplona’s three rival boroughs into one city.",
    sources: [
      { title: "El Escudo de Pamplona — Ayuntamiento de Pamplona", url: "https://www.pamplona.es/ayuntamiento/varios/el-escudo-de-pamplona" },
    ],
  },

  "ES-SE": {
    description:
      "A crimson field bearing the city’s golden “NO·DO” device — the letters NO and DO flanking a skein of " +
      "wool (a madeja). Read as “No madeja do”, it puns on “No me ha dejado” (“It has not forsaken me”), the " +
      "motto tradition credits King Alfonso X the Wise, who kept Seville loyal during his son’s revolt. The " +
      "crimson recalls the Pendón de San Fernando, the banner of Ferdinand III who took the city in 1248.",
    sources: [
      { title: "Bandera de Sevilla — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Sevilla" },
      { title: "NO8DO — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/NO8DO" },
    ],
  },

  "ES-V": {
    description:
      "The Reial Senyera: four red bars on gold — the arms of the Crown of Aragon — with, at the hoist, a blue " +
      "strip topped by a crown. Valencia’s flag adds this crowned blue band to the bare Aragonese bars as a " +
      "royal distinction granted to the city, said to date from its conquest by King Jaume I in 1238.",
    sources: [
      { title: "Señera de Valencia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Se%C3%B1era_valenciana" },
    ],
  },

  "ES-Z": {
    description:
      "A crimson field bearing the city arms — a golden lion rampant, crowned. The lion is that of the kings of " +
      "León and Castile: Alfonso VII, who held Zaragoza in the 1130s, is traditionally cited as the source of " +
      "the charge, which stands for strength and nobility.",
    sources: [
      { title: "Escudo de Zaragoza — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Zaragoza" },
    ],
  },

  "ES-TO": {
    description:
      "A crimson (carmesí) field bearing the black double-headed Imperial eagle behind the quartered city arms " +
      "of castles and lions, ensigned with a crown and encircled by the collar of the Order of the Golden " +
      "Fleece. The double-headed eagle marks Toledo as the imperial capital of Charles V, granted for the " +
      "city’s loyalty to the Habsburg crown.",
    sources: [
      { title: "Escudo de Toledo — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Toledo" },
    ],
  },

  "ES-VA": {
    description:
      "A crimson field bearing the city arms: five golden flames encircled by eight castles, ensigned with a " +
      "crown and ringed by the cross of the Order of San Fernando. The eight castles mark Valladolid’s bond to " +
      "the Crown of Castile; the five flames are read by some authors as recalling the great fire that ravaged " +
      "the city in 1561.",
    sources: [
      { title: "Bandera de Valladolid — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Valladolid" },
    ],
  },

  "ES-SA": {
    description:
      "A red field bearing the quartered city arms: a stone bridge over the river Tormes crossed by a black " +
      "bull, with a fig tree — the emblems of Salamanca’s Roman bridge and its territory — quartered with the " +
      "red-and-gold bars of the Crown, ensigned with the royal crown.",
    sources: [
      { title: "Salamanca (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Salamanca" },
    ],
  },

  "ES-S": {
    description:
      "A white-over-blue horizontal bicolour bearing the city arms: the Torre del Oro of Seville and the ship " +
      "of Admiral Ramón de Bonifaz breaking the chains that barred the Guadalquivir at the conquest of Seville " +
      "in 1248, with the two crowned heads of Santander’s patron saints, Emeterio and Celedonio.",
    sources: [
      { title: "Escudo de Santander — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Santander" },
    ],
  },

  "ES-SG": {
    description:
      "A sky-blue field bearing the city arms — the silver two-tier Roman aqueduct, Segovia’s defining monument, " +
      "surmounted by a human head set on rocks (marking the frontier land the city led in repopulating during " +
      "the Reconquista), ensigned with the royal crown. The flag’s field was changed from purple to sky blue in " +
      "the 1980s and fixed by the 2011 protocol regulation.",
    sources: [
      { title: "Bandera de Segovia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Segovia" },
      { title: "Escudo de Segovia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Segovia" },
    ],
  },

  "ES-T": {
    description:
      "A golden field charged with four wavy red bars — a variant of the Senyal Reial of the Crown of Aragon, " +
      "attested in the city’s council records since the 14th century. The bars are rendered wavy at Tarragona " +
      "as an allusion to the sea on which the port city stands.",
    sources: [
      { title: "Escudo de Tarragona — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Tarragona" },
    ],
  },

  "ES-VI": {
    description:
      "A white field crossed by a red saltire (St Andrew’s cross), bearing the city arms — a castle topped by " +
      "watchful ravens above a green mount, the fortress that names Gasteiz. The saltire design was adopted in " +
      "1922; the arms carry the motto “Haec est victoria quae vincit” (“This is the victory that conquers”), a " +
      "play on the name Vitoria given the town by King Sancho VI in 1181.",
    sources: [
      { title: "Vitoria (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Vitoria" },
    ],
  },

  "ES-CE": {
    description:
      "A gyronny of black and white — the ancient flag of Saint Vincent, better known as the flag of Lisbon, in " +
      "the colours of the Dominican Order — charged with the city arms: the five blue Portuguese escutcheons " +
      "(the quinas) within a red border of golden castles. The design records that Ceuta was Portuguese from " +
      "1415 until it passed to the Spanish crown in 1640, keeping Lisbon’s banner as its own.",
    sources: [
      { title: "Bandera de Ceuta — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Ceuta" },
    ],
  },

  "ES-GC": {
    description:
      "A field bearing the city arms granted by Queen Joanna in 1506: a castle and lion for the direct rule of " +
      "the Crown of Castile, a tower recalling the town’s fortifications, waves for the surrounding ocean, and " +
      "palm trees flanked by dogs — the palms alluding to the victories over Drake (1595) and van der Does " +
      "(1599) and, with the dogs, to the name of the Canary (“Dog”) Islands.",
    sources: [
      { title: "Las Palmas de Gran Canaria — Símbolos de Canarias", url: "https://simbolosdecanarias.proel.net/index.php/esp/islas/gran-canaria/las-palmas-de-gran-canaria" },
      { title: "Las Palmas de Gran Canaria — Flags of the World", url: "https://www.crwflags.com/fotw/flags/es-gc-lp.html" },
    ],
  },

  "ES-GU": {
    description:
      "A purple (morado) field — the colour of Castile’s medieval banners — bearing the city arms: a walled " +
      "medieval town with church towers and a castle beneath a night sky of moon and stars, and before it, on a " +
      "green meadow, an armed knight leading a host of foot soldiers. The rider is the town’s “juez” (judge), " +
      "the people’s magistrate who carried the city standard at the head of civic processions.",
    sources: [
      { title: "Escudo de Guadalajara (España) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Guadalajara_(Espa%C3%B1a)" },
      { title: "El escudo de Guadalajara — Herrera Casado", url: "https://www.herreracasado.com/1980/09/20/el-escudo-de-guadalajara/" },
    ],
  },

  "ES-H": {
    description:
      "A light-blue field bearing the city arms on silver: a green olive tree flanked by a golden castle and a " +
      "black anchor, encircled by the motto “Portus maris et terrae custodia” (“Port of the sea and sentinel of " +
      "the land”). The castle stands for the city’s fortifications and the anchor for its maritime life as an " +
      "Atlantic port.",
    sources: [
      { title: "Escudo de Huelva — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Huelva" },
    ],
  },

  "ES-OR": {
    description:
      "A blue field bearing the city arms on silver: a five-arched golden bridge over blue-and-silver waves — " +
      "the great bridge over the river Miño — flanked by a golden castle and a golden lion holding a sword, the " +
      "emblems of Castile and León, ensigned with the royal crown.",
    sources: [
      { title: "Escudo de Orense — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Orense" },
    ],
  },

  "ES-P": {
    description:
      "A crimson field bearing the quartered city arms: on blue, a golden fleur-de-lis “Cross of Victory” — " +
      "granted by King Alfonso VIII to Bishop Tello Téllez de Meneses for Palencia’s part in the 1212 victory " +
      "at Las Navas de Tolosa — quartered with a golden three-towered castle on red for the Kingdom of Castile, " +
      "ensigned with the royal crown.",
    sources: [
      { title: "Escudo de Palencia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Palencia" },
    ],
  },

  "ES-SO": {
    description:
      "A white field bearing the city arms: on red, a silver castle from whose keep rises the crowned bust of a " +
      "king — Alfonso VIII of Castile, sheltered by Soria’s nobles in his childhood — with the silver border " +
      "carrying the motto “Soria pura, cabeza de Extremadura”. The red field stands for the blood shed by the " +
      "city’s knights, and “cabeza de Extremadura” marks Soria as the chief frontier town of the Reconquista.",
    sources: [
      { title: "Escudo de Soria — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Soria" },
    ],
  },

  "ES-SS": {
    description:
      "A white field with a France-blue square at the upper hoist — the maritime ensign a royal order gave the " +
      "port of San Sebastián in the early 19th century, which the city later adopted as its flag (officialised " +
      "1999). The blue stands for the sea and the white for the peace and unity of the city’s people.",
    sources: [
      { title: "Bandera de Donostia/San Sebastián — Ayto. (via Comprarbanderas)", url: "https://www.comprarbanderas.es/bandera-san-sebastian-id328.html" },
      { title: "Escudo de San Sebastián — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_San_Sebasti%C3%A1n" },
    ],
  },

  "ES-ZA": {
    description:
      "The Seña Bermeja: nine horizontal bands ending in points — eight red and one green. The eight red bands " +
      "are said to stand for the eight victories of the Lusitanian leader Viriato over Rome; the green band was " +
      "added by King Ferdinand the Catholic to reward Zamora’s loyalty at the Battle of Toro (1476).",
    sources: [
      { title: "Bandera de Zamora — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Zamora" },
    ],
  },

  "ET-HA": {
    description:
      "The flag of the Harari Region — of which Harar is the capital and only city — a white field crossed by red " +
      "and green bands bearing the regional seal. White stands for peace, equality and justice; red for the " +
      "Harari people’s struggle and sacrifice for their rights and freedom; green for agricultural development. " +
      "In the seal a pigeon marks peace and democracy, a scale justice and equality, the Jugol (the walled " +
      "city’s traditional architecture) Harari history and culture, and a plough, wheat and coffee branch the " +
      "region’s farming, food self-sufficiency and coffee economy.",
    sources: [
      { title: "Description of the Harari Regional Flag (Hareri National League) — Wikimedia file page", url: "https://en.wikipedia.org/wiki/File:Harari_Flag.svg" },
    ],
  },

  "FI-07": {
    description:
      "A gold field bearing Kokkola’s emblem: a black tar barrel with red flames rising from both ends and the " +
      "bung. Granted when King Gustavus II Adolphus chartered the town in 1620, it records the tar-burning and " +
      "tar trade that made Kokkola one of Finland’s wealthiest export ports into the 19th century.",
    sources: [
      { title: "Kokkola — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Kokkola" },
    ],
  },

  "FI-10": {
    description:
      "A green field bearing Rovaniemi’s arms: a silver pall (a Y-shaped fork) with a golden flame in the upper " +
      "corner. The pall stands for the meeting of the two rivers — the Kemijoki and the Ounasjoki — at " +
      "Rovaniemi; the flame is a torch of enlightenment and of the city’s rebuilding after its wartime " +
      "destruction. Adopted 1956.",
    sources: [
      { title: "Rovaniemi — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Rovaniemi" },
    ],
  },

  "FI-11": {
    description:
      "A red field bearing Tampere’s arms, all in gold: a wavy bar for the Tammerkoski rapids that run through " +
      "the city and once powered its mills, above it a hammer (in the form of a T) for its industry, and below " +
      "a caduceus for commerce. Designed by Olof Eriksson, 1960.",
    sources: [
      { title: "Tampere — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Tampere" },
    ],
  },

  "FI-12": {
    description:
      "A red field bearing the golden Vasa emblem — a sheaf or bundle (Swedish “vase”), the badge of the royal " +
      "House of Vasa — which the town took when it was renamed Vaasa by royal charter in 1611. Below it hangs " +
      "the Cross of Liberty with swords and laurel, an augmentation granted for Vaasa’s role as the “white” " +
      "capital during the 1918 civil war.",
    sources: [
      { title: "Vaasan vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Vaasan_vaakuna" },
    ],
  },

  "FI-13": {
    description:
      "Joensuu’s banner of arms, divided into red, white and black by two lines: an embattled (castle-wall) line " +
      "above, for the city’s position near Finland’s eastern border, and a wavy line below, for the Pielisjoki " +
      "river on which it stands. The red-and-black colouring is that of Karelian heraldry. Adopted 1957.",
    sources: [
      { title: "Joensuun vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Joensuun_vaakuna" },
    ],
  },

  "FI-14": {
    description:
      "A red field bearing Oulu’s arms: a golden four-towered castle with blue gates above a salmon on the water. " +
      "The castle recalls Oulu Castle, built in 1590 at the town’s founding site on the Oulujoki, and the salmon " +
      "the river’s great salmon fishery, long the city’s economic mainstay. Adopted 1954.",
    sources: [
      { title: "Oulun vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Oulun_vaakuna" },
    ],
  },

  "FI-17": {
    description:
      "A gold field bearing a crowned black bear’s head — Pori’s emblem since a 17th-century seal, a canting " +
      "reference to the city’s Swedish name Björneborg (“Bear Fortress”). The city is still nicknamed “Bear " +
      "City”; the arms of its founder, Duke John, carried the motto “Deus protector noster”.",
    sources: [
      { title: "Pori — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Pori" },
    ],
  },

  "FI-18": {
    description:
      "A blue field bearing Helsinki’s arms: a golden boat riding silver waves, with a golden crown above it. " +
      "The vessel recalls the arrival of Swedish settlers to found the town by sea in 1550 and its long life as " +
      "a Baltic port; the crown is a mark of honour. Present design by A. W. Rancken, 1951.",
    sources: [
      { title: "Helsingin vaakuna — Wikipedia (fi)", url: "https://fi.wikipedia.org/wiki/Helsingin_vaakuna" },
    ],
  },

  "FI-19": {
    description:
      "A blue banner of arms bearing a golden letter “A” — a monogram of the Virgin Mary, the city’s patroness — " +
      "flanked and surmounted by four silver fleurs-de-lis. Turku, the oldest city in Finland and its medieval " +
      "capital, has borne this Marian device (from its Swedish name Åbo) since the Middle Ages.",
    sources: [
      { title: "Turku (Finland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/fi-ls853.html" },
    ],
  },

  "FI-AX": {
    description:
      "Mariehamn’s arms: a blue field with a golden anchor, beneath a gold chief bearing three green linden " +
      "leaves. The anchor stands for the town’s seafaring and its great age of sail (Mariehamn was long home to " +
      "one of the world’s last commercial sailing fleets); the linden leaves for the lime-tree-lined esplanades " +
      "that distinguish the town. Confirmed 1951.",
    sources: [
      { title: "Mariehamn — coat of arms (Wikipedia)", url: "https://en.wikipedia.org/wiki/Mariehamn" },
    ],
  },

  "GB-GI": {
    description:
      "The flag of Gibraltar — a banner of the city’s arms: a white field above a red band, charged with a " +
      "three-towered red castle from whose gate hangs a golden key. Granted by a royal warrant of Queen " +
      "Isabella I of Castile in 1502, the castle stands for the fortress of Gibraltar and the key for its command " +
      "of the strait — “the key to the Mediterranean”. It is the only British Overseas Territory flag that bears " +
      "no Union Jack.",
    sources: [
      { title: "Flag of Gibraltar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Gibraltar" },
    ],
  },

  "GB-JE": {
    description:
      "The parish flag of Saint Helier: two crossed gold axes on a blue field. The axes commemorate the " +
      "beheading of Saint Helier — the patron saint of Jersey, from whom the parish and the island's capital " +
      "take their name — by Saxon pirates in AD 555, and together with the blue field recall his martyrdom and " +
      "his hermitage by the sea.",
    sources: [
      { title: "St Helier, Bailiwick of Jersey — Flags of the World", url: "https://www.crwflags.com/fotw/flags/je-xhe.html" },
    ],
  },

  "GB-BM": {
    description:
      "The flag of the City of Hamilton, Bermuda: a banner of the city's coat of arms — a golden sailing ship " +
      "(the Resolution) on a blue field, flanked by three cinquefoils (shown gold on the arms, white on the " +
      "flag). The full shield is supported by a mermaid and a heraldic seahorse and carries the city's motto, " +
      "'Hamilton sparsa collegit' ('Hamilton has assembled the scattered').",
    sources: [
      { title: "Hamilton, Bermuda — Wikipedia", url: "https://en.wikipedia.org/wiki/Hamilton,_Bermuda" },
    ],
  },

  "GR-B": {
    description:
      "The flag of Thessaloniki: divided vertically white and blue, with a golden disc at the centre bearing the " +
      "likeness of Alexander the Great taken from an ancient coin, and the top edge of the white part drawn as " +
      "battlements for the city’s walls. Alexander’s image ties the city to the Macedonian world into which it " +
      "was founded (c. 315 BC); the present design was adopted in 2006.",
    sources: [
      { title: "Salonica (Municipality, Greece) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gr-mh-tl.html" },
    ],
  },

  "FR-01": {
    description:
      "Bourg-en-Bresse’s banner of arms: party per pale of green and black, with a silver budded cross over all. " +
      "The green and black were granted in 1382 by Amadeus VI of Savoy (the “Green Count”); the silver cross of " +
      "the Order of Saint Maurice was added in the 16th century to mark Bresse’s return to Savoy.",
    sources: [
      { title: "Armoiries de Bourg-en-Bresse — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=1692" },
    ],
  },

  "FR-04": {
    description:
      "Digne-les-Bains’ arms: on blue a golden fleur-de-lis, with a small red cross above, two facing silver " +
      "letters “L” at the sides and a golden “D” below. The fleur-de-lis recalls the counts of Provence of the " +
      "House of Anjou, the cross the town’s bishopric, the “D” stands for Digne and the two “L”s were added under " +
      "King Louis XIV.",
    sources: [
      { title: "Armoiries de Digne-les-Bains — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=2150" },
    ],
  },

  "FR-05": {
    description:
      "A blue-and-yellow vertical bicolour taken from the arms of Gap. The arms — granted by the king in the 17th " +
      "century when the town was walled — show four turrets standing for the shared rule of the city: the two " +
      "roofed towers for the bishop’s (ecclesiastical) power and the two open ones for the civil power.",
    sources: [
      { title: "Drapeaux et armoiries de Gap — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1795:drapeaux-de-gap" },
    ],
  },

  "FR-06": {
    description:
      "Nice’s arms on a white field: a red crowned eagle with lowered wings, perched on a green three-peaked " +
      "mount rising from a silver-and-blue sea. The eagle marks Nice’s allegiance to the House of Savoy (red for " +
      "Amadeus VII, the “Red Count”, under whose protection the city placed itself in 1388); the three hills " +
      "stand for stability, and the sea for Nice’s Mediterranean port. The blazon dates from 1502.",
    sources: [
      { title: "Armoiries de Nice — Provence 7", url: "https://www.provence7.com/portails/identites/armoiries-de-nice/" },
    ],
  },

  "FR-08": {
    description:
      "A blue-yellow-red vertical tricolour of the colours in which Charleville-Mézières was built — blue slate, " +
      "ochre ashlar and red brick — also drawn from the city arms. Those arms join the older arms of Charleville " +
      "(with the sun of the Gonzaga dukes who founded the town) and of Mézières, the two towns having merged in " +
      "1966.",
    sources: [
      { title: "Drapeau de Charleville-Mézières — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1054:drapeau-de-charleville-mezieres" },
    ],
  },

  "FR-09": {
    description:
      "The arms of the Counts of Foix: gold with three red pallets. They are a cadency of the four red pallets of " +
      "the counts of Barcelona and kings of Aragon — the Foix line claimed descent from Barcelona as a junior " +
      "branch, and so bore three pallets instead of four. The arms are attested from the 12th century, among the " +
      "oldest in France.",
    sources: [
      { title: "Comté de Foix — Héraldique européenne", url: "http://www.heraldique.org/2011/07/provinces-de-france-comte-de-foix.html" },
    ],
  },

  "FR-13": {
    description:
      "The flag of Marseille: a silver (white) field bearing an azure cross — “d’argent à la croix d’azur”, " +
      "attested since the 13th century. Tradition traces the blue cross to the banner flown over Marseille’s " +
      "harbour in the crusading age to mark it a safe haven for pilgrims bound for the Holy Land; the blue is " +
      "that of the House of Anjou, which then ruled Provence.",
    sources: [
      { title: "Armoiries de Marseille — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Marseille" },
    ],
  },

  "FR-18": {
    description:
      "A green-and-red flag in the livery colours of King Charles VII, who made Bourges his capital during the " +
      "Hundred Years’ War (the “King of Bourges”). His livery was green, white and red, and he granted two of " +
      "those colours to his loyal city. The city arms proper show three silver rams — for the Berry wool and " +
      "cloth trade — beneath a blue chief of three golden fleurs-de-lis marking Berry as a royal apanage.",
    sources: [
      { title: "Drapeaux de Bourges — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=98" },
      { title: "Bourges — Armes et devise (Ville de Bourges)", url: "https://www.ville-bourges.fr/site/la-ville_armes-devise" },
    ],
  },

  "FR-21": {
    description:
      "Dijon’s arms: a plain red field — the city’s oldest arms — beneath a divided chief granted by Duke Philip " +
      "the Bold in 1391 for the city’s loyalty. The chief joins modern Burgundy (blue strewn with golden " +
      "fleurs-de-lis, for the Valois dukes close to the French crown) and ancient Burgundy (bendy gold and blue, " +
      "for the earlier Capetian ducal house that made Dijon its seat).",
    sources: [
      { title: "Dijon — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=4034" },
    ],
  },

  "FR-22": {
    description:
      "Saint-Brieuc’s arms: on blue a golden griffin, armed, beaked and tongued red. The griffin — joining the " +
      "lion’s courage to the eagle’s vigilance — stands for the union of the houses of Penthièvre and Montfort " +
      "in Breton history; the arms were formally granted to the city in 1698.",
    sources: [
      { title: "Saint-Brieuc — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=4196" },
    ],
  },

  "FR-25": {
    description:
      "Besançon’s arms: a black eagle on gold, clutching two red columns across its wings. The eagle marks the " +
      "city as a free imperial city of the Holy Roman Empire (adopted in the late 13th century); the two columns " +
      "recall the ancient columns that once stood on the hill of the citadel and evoke the Pillars of Hercules, " +
      "the personal emblem of Emperor Charles V, who granted the present arms in 1537.",
    sources: [
      { title: "Armoiries de Besançon — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Besan%C3%A7on" },
    ],
  },

  "FR-26": {
    description:
      "Valence’s arms: on red a silver cross charged at its centre with a blue tower, with two griffin supporters. " +
      "The cross stands for the city’s ancient bishopric and the tower for comital power — the bishop of Valence " +
      "was also its count — while the griffins carry the motto “Unguibus et rostro” (“with claws and beak”), for " +
      "the city’s tenacious defence.",
    sources: [
      { title: "Valence — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=5236" },
    ],
  },

  "FR-2A": {
    description:
      "A blue-and-white flag in the colours of Ajaccio’s arms: on blue, a silver column crowned, between two " +
      "lions. The column is that of the Colonna family, whose name the device puns on; the Genoese Senate " +
      "granted the arms in 1575, and the original greyhounds were later changed to lions as a mark of the city’s " +
      "growing independence from Genoa.",
    sources: [
      { title: "Drapeaux d’Ajaccio — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1161:drapeaux-dajaccio" },
    ],
  },

  "FR-31": {
    description:
      "A red field bearing the golden Occitan cross of Toulouse — a cross cléchée (its arms pierced like a key’s " +
      "bit), voided, and tipped with twelve “pommettes” (little discs). It is the cross of the Counts of " +
      "Toulouse, appearing on the seal of Raymond VI in 1211 and thereafter the arms of the city and of " +
      "Languedoc; the twelve discs are popularly linked to the twelve months or the twelve Apostles.",
    sources: [
      { title: "Croix occitane — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Croix_occitane" },
    ],
  },

  "FR-33": {
    description:
      "Bordeaux’s arms: a silver castle (the old Grosse-Cloche gate) above a silver crescent on the waves of the " +
      "Garonne, with the leopard of England, beneath a blue chief of golden fleurs-de-lis. The crescent is the " +
      "river’s bend that gives Bordeaux its nickname “Port de la Lune”; the leopard recalls three centuries of " +
      "English rule, and the fleurs-de-lis its return to France in 1453. The motto “Lilia sola regunt lunam, " +
      "undas, castra, leonem” reads the shield — the lilies alone rule the moon, the waves, the fort and the lion.",
    sources: [
      { title: "Blason de Bordeaux — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Bordeaux" },
    ],
  },

  "FR-34": {
    description:
      "Montpellier’s arms: on blue, Our Lady enthroned holding the Christ Child, with the silver letters “A” and " +
      "“M” (Ave Maria) above and, below, a silver shield charged with a red roundel. The Virgin and the blue " +
      "field proclaim the city’s Marian patronage (from 1204); the red roundel is the emblem of the Guilhem " +
      "lords who ruled Montpellier until then.",
    sources: [
      { title: "Montpellier — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=12019" },
    ],
  },

  "FR-35": {
    description:
      "Rennes’ arms: a field paly of silver and black, beneath a silver chief strewn with five black ermine " +
      "spots. The ermine is the emblem of Brittany, marking the city as its historic capital; the black-and-white " +
      "pales are said to recall the wooden palisades that defended Rennes through its many sieges. The design " +
      "dates from 1580, when Rennes became the seat of the Breton parliament.",
    sources: [
      { title: "Rennes — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=13838" },
    ],
  },

  "FR-37": {
    description:
      "Tours’ canting arms: three silver towers (for the name Tours) with red roofs and weathervanes, beneath a " +
      "blue chief of three golden fleurs-de-lis. The fleurs-de-lis mark Tours as a loyal “good town” of the " +
      "French crown; the motto “Sustentant lilia turres” (“the towers uphold the lilies”) expresses that " +
      "fidelity. The towers echo those of the basilica of Saint-Martin.",
    sources: [
      { title: "Tours — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=14324" },
    ],
  },

  "FR-38": {
    description:
      "Grenoble’s flag is two vertical bands, red at the hoist and gold in the fly, in the colours of the city’s " +
      "arms: gold with three red roses. The historian Auguste Bouchayer read the roses as the emblems of three " +
      "martyr saints, standing for the three powers that governed the medieval city: the bishop, the Dauphin and " +
      "the elected consuls. An older reading, by the Jesuit heraldist Ménestrier, linked them to the golden roses " +
      "the Pope blessed in Lent. The arms appear on a 1575 engraving and were registered in the Armorial général " +
      "de France on 13 June 1698.",
    sources: [
      { title: "Les couleurs de Grenoble — Partir ici (Auvergne-Rhône-Alpes Tourisme)", url: "https://partir-ici.fr/les-couleurs-de-grenoble/" },
      { title: "Armoiries de Grenoble — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Grenoble" },
    ],
  },

  "FR-39": {
    description:
      "A red-and-gold flag in the colours of Lons-le-Saunier’s arms, which unite the gold-and-red arms of the " +
      "Chalon-Orange princes — to whom the town belonged — with a silver half recalling the salt springs that " +
      "gave the town its name (a “saunier” is a salt-worker), the source of its medieval wealth.",
    sources: [
      { title: "Lons-le-Saunier — Heraldry of the World", url: "https://www.heraldry-wiki.com/heraldrywiki/index.php?title=Lons-le-Saunier" },
    ],
  },

  "FR-42": {
    description:
      "Saint-Étienne’s arms: on blue, two golden palms crossed in saltire with a royal crown above and three " +
      "silver crosses. The palms and crosses recall Saint Stephen (Saint Étienne), the first Christian martyr, " +
      "stoned around AD 36 — the palm being the emblem of martyrdom; the crown marks the townspeople’s wish to " +
      "answer directly to the king, and the blue their attachment to the French crown.",
    sources: [
      { title: "Armoiries — Archives municipales de Saint-Étienne", url: "https://archives.saint-etienne.fr/histoires-stephanoises-1/tranches-dhistoire/histoire-de-la-ville-et-de-son-administration/armoiries" },
    ],
  },

  "FR-43": {
    description:
      "A yellow-and-blue flag in the colours of Le Puy-en-Velay’s arms — blue strewn with golden fleurs-de-lis, " +
      "charged with a silver eagle. The eagle is a canting emblem for Le Puy (from the Latin podium, a raised " +
      "place), said to have been granted by Hugh Capet in 992; the fleurs-de-lis were added by King Louis IX " +
      "(Saint Louis) in 1254.",
    sources: [
      { title: "Armoiries du Puy-en-Velay — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&id=1003:armoiries-du-puy-en-velay" },
    ],
  },

  "FR-44": {
    description:
      "Nantes’ arms: on red, a golden ship dressed with ermine, sailing a green sea of silver waves, beneath an " +
      "ermine chief. The ship stands for the city’s Atlantic and Loire trade; the ermine for the Duchy of " +
      "Brittany, whose capital Nantes was; and the green sea for the Loire. The golden nef took this form after " +
      "the funeral of Anne of Brittany in 1514.",
    sources: [
      { title: "Nantes — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=13894" },
    ],
  },

  "FR-45": {
    description:
      "A yellow-and-red flag in the colours of Orléans’ arms — red with three silver “lily-hearts” beneath a " +
      "blue chief of three golden fleurs-de-lis. The lily-hearts and the royal “chief of France” tie the city to " +
      "the crown; their symbolism is linked to Joan of Arc’s deliverance of Orléans in 1429, and the motto “Hoc " +
      "vernant lilia corde” (“by this heart the lilies flower”) was granted by Louis XII.",
    sources: [
      { title: "Orléans — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=9784" },
    ],
  },

  "FR-47": {
    description:
      "Agen’s arms, party per pale on red: a silver eagle holding a scroll lettered “AGEN”, and a golden " +
      "three-towered castle. The eagle — an imperial emblem — is traditionally linked to the memory of " +
      "Charlemagne, who favoured the Agenais; the castle stands for the town’s fortifications. The arms are " +
      "attested from the 13th century.",
    sources: [
      { title: "Armoiries d’Agen — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=948:armoiries-dagen" },
    ],
  },

  "FR-49": {
    description:
      "Angers’ arms: on red a silver key set upright, beneath a blue chief of two golden fleurs-de-lis. The key " +
      "marks Angers as the chief stronghold of Anjou, guarding the frontier against then-independent Brittany; " +
      "the fleurs-de-lis mark it as a royal apanage. The arms are among the oldest in France, attested in the " +
      "13th century.",
    sources: [
      { title: "Armoiries — Archives patrimoniales de la ville d’Angers", url: "https://archives.angers.fr/aide-memoire/angers-en-dates/emblemes-et-devises/armoiries/index.html" },
    ],
  },

  "FR-56": {
    description:
      "Vannes’ arms: on red a silver ermine passant, collared and leashed. The red recalls the ancient kingdom " +
      "of Bro-Waroch of which Vannes was the capital; the ermine is the emblem of Brittany, popularised by Duke " +
      "John IV, who founded the chivalric Order of the Ermine at Vannes in 1381 with the motto “À ma vie”.",
    sources: [
      { title: "Blason de Vannes — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Vannes" },
    ],
  },

  "FR-57": {
    description:
      "Metz’s flag: party per pale of white and black — the “baucent”, the black-and-white banner the burghers " +
      "raised against the noble families and flew as the arms of the Republic of Metz when the city freed itself " +
      "from its bishop in the 13th century. A Messine couplet reads the colours as white for the life granted to " +
      "the good and black for the death dealt to the wicked.",
    sources: [
      { title: "Le blason de Metz — Sapiens", url: "https://sapiens-france.fr/blogs/blasons-des-villes-de-france/le-blason-de-metz-signification-et-histoire" },
    ],
  },

  "FR-63": {
    description:
      "Clermont-Ferrand’s arms: on blue, a red cross bordered gold with a golden fleur-de-lis in each quarter. " +
      "The cross and fleurs-de-lis were the arms of the city’s bishop, its lord until the 16th century; the cross " +
      "is often linked to the First Crusade, preached at Clermont by Pope Urban II in 1095, and the fleurs-de-lis " +
      "to the bishopric’s ties to the kings of France.",
    sources: [
      { title: "Clermont-Ferrand — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=6166" },
    ],
  },

  "FR-67": {
    description:
      "Strasbourg’s flag: silver with a red bend. It reverses the bishop’s arms (“de gueules à la bande " +
      "d’argent”) after the burghers’ victory at Hausbergen in 1262, marking the city’s emancipation from its " +
      "bishop and its rise as a free imperial city; the silver field also echoes the town’s Roman name, " +
      "Argentoratum.",
    sources: [
      { title: "Blason de Strasbourg — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Strasbourg" },
    ],
  },

  "FR-68": {
    description:
      "Colmar’s arms: party per pale red and green, with a golden mace set diagonally across the division. The " +
      "mace stands for municipal justice and authority, and puns on the city’s name — Kolben (mace in Alemannic) " +
      "against Columbaria, Colmar’s Latin name; a local legend has Hercules leave his club behind here. Red and " +
      "green have been the city’s civic colours since the late Middle Ages.",
    sources: [
      { title: "L’histoire du blason de Colmar — Ville de Colmar", url: "https://www.colmar.fr/blason" },
    ],
  },

  "FR-69": {
    description:
      "Lyon’s arms: on red a silver lion, beneath a blue chief of three golden fleurs-de-lis. The lion comes from " +
      "the medieval counts of Lyon; the blue “chief of France” with its lilies was granted after Lyon joined the " +
      "kingdom of France (1312), and the arms have stood essentially unchanged for five centuries.",
    sources: [
      { title: "Armoiries de Lyon — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Armoiries_de_Lyon" },
    ],
  },

  "FR-71": {
    description:
      "Mâcon’s arms: on red three silver annulets (rings), beneath a blue chief of three golden fleurs-de-lis. " +
      "The blue chief strewn with royal lilies is the “chief of France”, a mark of honour tying the city to the " +
      "French crown.",
    sources: [
      { title: "Armoiries de Mâcon — emblemes.free.fr", url: "http://emblemes.free.fr/site/index.php?option=com_content&view=article&id=1145:armoiries-de-macon" },
    ],
  },

  "FR-73": {
    description:
      "Chambéry’s arms: on red a silver cross — the cross of Savoy — with a golden star in the upper hoist. As " +
      "the historic capital of the Duchy of Savoy, Chambéry bears the dukes’ own arms (the Savoy cross, taken " +
      "from the Order of Saint John under Amadeus V in 1315), “differenced” by the addition of the golden star.",
    sources: [
      { title: "Chambéry — Armorial de France", url: "https://armorialdefrance.fr/page_blason.php?ville=5437" },
    ],
  },

  "FR-74": {
    description:
      "A red flag quartered by the white cross of Savoy — the region Annecy belongs to — charged with the silver " +
      "trout that is the town’s own emblem. The trout evokes Lake Annecy and the river Thiou, and the fishing " +
      "that was central to the medieval town’s economy.",
    sources: [
      { title: "Blason d’Annecy : la truite d’argent — Ville d’Annecy", url: "https://www.annecy-ville.fr/2022/12/truite-argent-histoire-armoiries-annecy/" },
    ],
  },

  "FR-83": {
    description:
      "Toulon’s arms: a gold cross on blue. The blue evokes the Mediterranean sky and sea of this great naval " +
      "port; the gold cross is a Christian and crusading emblem, echoing the arms of neighbouring Provençal " +
      "ports such as Marseille and Fréjus. The motto is “Concordia parva crescunt” (“by concord small things " +
      "grow”); the arms are attested from 1494.",
    sources: [
      { title: "Blason de Toulon — Wikipédia (fr)", url: "https://fr.wikipedia.org/wiki/Blason_de_Toulon" },
    ],
  },

  "GE-AJ": {
    description:
      "Batumi’s flag: a blue field with three white stripes, bearing the city arms — a shield divided by a wavy " +
      "line, with three golden bezants (coins) on red above a silver base. The bezants stand for trade and the " +
      "wavy line and crossed anchors for Batumi’s life as Georgia’s chief Black Sea port on the coast of Adjara.",
    sources: [
      { title: "Batumi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-batu.html" },
    ],
  },

  "GE-IM": {
    description:
      "Kutaisi’s flag: quartered green and blue, with a large golden Georgian cross patty in the centre and a " +
      "small one in each quarter. Gold stands for nobility, green for freedom and hope, blue for greatness; the " +
      "colours come from Vakhushti Bagrationi’s 18th-century arms for Imereti, and the blue also recalls the sea " +
      "by which the Argonauts reached ancient Colchis, whose capital Aia is identified with Kutaisi. Adopted 2009.",
    sources: [
      { title: "Kutaisi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-kuta.html" },
    ],
  },

  "GE-KA": {
    description:
      "Telavi’s flag: divided red over blue with a white winged horse across it. The horse is Merani, the " +
      "mythical steed of the Romantic poet Nikoloz Baratashvili’s poem — a Georgian Pegasus symbolising freedom " +
      "and the soaring spirit. Telavi is the heart of Kakheti, Georgia’s “Wine Land”, whose vineyards its arms " +
      "also celebrate. Adopted 2011.",
    sources: [
      { title: "Telavi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-tela.html" },
    ],
  },

  "GE-MM": {
    description:
      "Mtskheta’s flag reverses the national five-cross flag — a red field with a white Georgian cross patty " +
      "touching the edges and a smaller white cross in each canton. The Christian crosses befit Mtskheta, the " +
      "ancient royal and spiritual capital of Georgia where Saint Nino brought Christianity and the country was " +
      "baptised in the 4th century.",
    sources: [
      { title: "Mtskheta (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-mtsk.html" },
    ],
  },

  "GE-RL": {
    description:
      "Ambrolauri’s flag: purple over white with a white Georgian cross. The purple stands for the red " +
      "Khvanchkara wine that made this Racha town famous — pressed from the local Aleksandrouli and Mujuretuli " +
      "grapes — and the city arms add the 17th-century Machabeli watchtower of its old centre.",
    sources: [
      { title: "Ambrolauri (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-ambr.html" },
    ],
  },

  "GE-SZ": {
    description:
      "Zugdidi’s flag: quartered blue and purple by a golden cross, with a purple shield at its centre bearing " +
      "the golden Robe of the Most Holy Mother of God over a wavy silver base. The Robe is the venerated relic " +
      "kept at Zugdidi and borne each 2 July to the cathedral; the city was the seat of the Dadiani princes of " +
      "Samegrelo.",
    sources: [
      { title: "Zugdidi (Georgia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ge-zugd.html" },
    ],
  },

  "GW-GA": {
    description:
      "Gabú’s arms (under its colonial name Nova Lamego): on red, a silver antique sword with a gold hilt " +
      "flanked by two Fula swords, within a silver border of four Portuguese shields alternating with four red " +
      "crescents. The swords mark the region’s martial tradition and the crescents its Fula, largely Muslim, " +
      "population; the shields the Portuguese administration. Granted 1968.",
    sources: [
      { title: "Concelho de Gabú — Heráldica Cívica", url: "https://www.heraldicacivica.pt/gui-gabu.html" },
    ],
  },

  "GW-OI": {
    description:
      "Farim’s arms: on gold, three black heads each with a red ribbon about the hair, beneath a silver mural " +
      "crown of four towers. The gold field stands for wealth and the three heads for the town’s people; the " +
      "arms were granted in 1968 under Portuguese municipal heraldry.",
    sources: [
      { title: "Concelho de Farim — Heráldica Cívica", url: "https://www.heraldicacivica.pt/gui-farim.html" },
    ],
  },

  "GT-CQ": {
    description:
      "Chiquimula’s flag: white and green, with the departmental arms on the white. White stands for the " +
      "indigenous peoples and the Spanish settlers who shaped its traditions; green for the fertile soils, hills " +
      "and mineral wealth. The arms show the Volcán Ipala with an open book above it — the inhabitants’ openness " +
      "to learning.",
    sources: [
      { title: "Banderas y escudos del oriente — Aprende Guatemala", url: "https://aprende.guatemala.com/cultura-guatemalteca/banderas-de-los-departamentos-del-oriente-de-guatemala/" },
    ],
  },

  "GT-ES": {
    description:
      "Escuintla’s flag: green and white, bearing the city arms. Green stands for the department’s nature — its " +
      "rivers, beaches and wildlife — and white for its people. The arms show a palm tree (Escuintla is “the city " +
      "of palms”), a sixteen-rayed sun for its hot climate, and the Nahuatl name “Izcuintlán” on a green ribbon.",
    sources: [
      { title: "Bandera y escudo de Escuintla — Mundo Chapín", url: "https://mundochapin.com/2018/04/bandera-y-escudo-del-departamento-de-escuintla/66522/" },
    ],
  },

  "GT-GU": {
    description:
      "Guatemala City bears the arms of Santiago de los Caballeros de Guatemala, granted by Queen Joanna in 1532: " +
      "above, Saint James (Santiago) on horseback — the city’s patron — and below, the three volcanoes Agua, " +
      "Fuego (erupting) and Acatenango, with crosses for the country’s evangelisation; the border carries eight " +
      "gold scallop shells, the badge of Saint James’s pilgrims.",
    sources: [
      { title: "Escudo de la ciudad de Guatemala — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_la_ciudad_de_Guatemala" },
    ],
  },

  "GT-HU": {
    description:
      "Huehuetenango’s flag: alternating red and yellow stripes with a stepped pyramid at the centre. The red and " +
      "yellow recall the Guatemalan national flags of 1851–71; the pyramid is the ruins of Zaculeu, the shrine " +
      "and capital of the pre-Columbian Mam Maya kingdom that stood here.",
    sources: [
      { title: "Huehuetenango Department (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-hu.html" },
    ],
  },

  "GT-IZ": {
    description:
      "Izabal’s flag (its capital is Puerto Barrios): green, white and blue, with the arms on the white. Green is " +
      "for the fertile, mineral-rich land, white for peace, and blue for the department’s waters — Lake Izabal " +
      "and its rivers. The arms are shaped like a ship’s wheel for the region’s ports, enclosing a ship, an " +
      "aeroplane, a lorry and the interoceanic railway that linked Puerto Barrios to the Pacific.",
    sources: [
      { title: "Bandera y escudo de Izabal — Mundo Chapín", url: "https://mundochapin.com/2018/06/bandera-y-escudo-del-departamento-de-izabal/75658/" },
    ],
  },

  "GT-JA": {
    description:
      "Jalapa’s flag: red, yellow and green, with the arms at the centre. Red recalls the Santa Marta earthquake, " +
      "yellow the department’s volcanoes, green its forests. The arms show a green mountain (the volcanoes), a " +
      "ploughed field for its farming, a hoe with laurel for triumph and olive branches for peace, and seven " +
      "golden stars for the seven municipalities.",
    sources: [
      { title: "Bandera y escudo de Jalapa — Mundo Chapín", url: "https://mundochapin.com/2019/01/bandera-y-escudo-del-departamento-de-jalapa/88983/" },
    ],
  },

  "GT-JU": {
    description:
      "Jutiapa’s flag: a white field with the arms at the centre. White stands for the department’s history and " +
      "its Maya, Garífuna and Xinca peoples. The arms show the Cerro de la Cruz above a green valley of crops for " +
      "its fertile fields, with books and a horn of plenty and a rising sun for its steady development, ringed by " +
      "laurel for triumph.",
    sources: [
      { title: "Bandera y escudo de Jutiapa — Mundo Chapín", url: "https://mundochapin.com/2019/04/bandera-y-escudo-de-jutiapa/88989/" },
    ],
  },

  "GT-PE": {
    description:
      "Petén’s flag (its capital, Flores, sits on an island in Lake Petén Itzá): green, white and sky-blue. Green " +
      "is hope and the forest, white purity and peace, sky-blue the lakes, justice and loyalty. The arms show a " +
      "Maya pyramid for the ruins of Tikal and El Mirador, Lake Petén Itzá, and coffee and palm plants for the " +
      "land’s fertility. Adopted 1998.",
    sources: [
      { title: "Símbolos Patrios de Petén — simbolospatrios.org", url: "https://simbolospatrios.org/guatemala/peten/" },
    ],
  },

  "GT-QZ": {
    description:
      "Quetzaltenango’s flag: blue, white and red. Blue stands for the department’s springs, lagoons and rivers " +
      "and for freedom; white for its K’iche’ and Mam peoples and for peace; red for valour. The flag recalls the " +
      "short-lived State of Los Altos, of which Quetzaltenango was the capital until 1840; its arms bear the " +
      "Quetzal and the Santa María volcano.",
    sources: [
      { title: "Bandera y escudo de Quetzaltenango — Mundo Chapín", url: "https://mundochapin.com/2019/03/bandera-y-escudo-de-quetzaltenango/88995/" },
    ],
  },

  "GT-SA": {
    description:
      "Antigua Guatemala bears the arms of Santiago de los Caballeros — the same granted by Queen Joanna in 1532 " +
      "and shared with the modern capital, since Antigua was the country’s capital until an earthquake destroyed " +
      "it in 1773. Saint James rides above the three volcanoes Agua, Fuego and Acatenango, within a border of the " +
      "gold scallop shells of Saint James’s pilgrims.",
    sources: [
      { title: "Escudo de armas de la Ciudad de Guatemala y Antigua Guatemala — Aprende Guatemala", url: "https://aprende.guatemala.com/cultura-guatemalteca/general/escudo-de-armas-de-la-ciudad-de-guatemala-antigua-guatemala/" },
    ],
  },

  "GT-SM": {
    description:
      "San Marcos’s flag: green, yellow and red, with the arms on the yellow. Green stands for its ecosystems and " +
      "the volcanoes Tajumulco and Tacaná, yellow for its mineral soils, tropical coast and beaches, and red for " +
      "the labour of the ancestors who founded its settlements. The arms show a green volcano on a sky-blue field " +
      "for those two peaks.",
    sources: [
      { title: "Bandera y escudo de San Marcos — Mundo Chapín", url: "https://mundochapin.com/2019/02/bandera-y-escudo-de-san-marcos/89012/" },
    ],
  },

  "GT-SO": {
    description:
      "Sololá’s flag: green and yellow, with the arms on the yellow. Green stands for the department’s diverse " +
      "nature and yellow for its riches and its indigenous traditions. The arms picture Lake Atitlán with its " +
      "volcanoes (Tolimán, Atitlán and San Pedro), a green valley, a village and a figure of its people, ringed " +
      "with the words “Sololá, tierra del paisaje” (“Sololá, land of the landscape”).",
    sources: [
      { title: "Símbolos Patrios de Sololá — simbolospatrios.org", url: "https://simbolospatrios.org/guatemala/solola/" },
    ],
  },

  "HN-CM": {
    description:
      "A yellow flag bearing Comayagua’s colonial arms, centred on the black double-headed eagle of the " +
      "Habsburgs. Comayagua — founded as Nueva Valladolid — was the first capital of Honduras and received its " +
      "arms under the Spanish crown; the imperial eagle marks that Habsburg heritage of the colonial city.",
    sources: [
      { title: "Escudos españoles de ciudades hispanoamericanas — La América Española", url: "https://laamericaespanyola.com/2025/05/29/escudos-espanoles-de-ciudades-hispanoamericanas/" },
    ],
  },

  "HN-CR": {
    description:
      "San Pedro Sula’s flag bears interlocking gears and a thrush (zorzal). The gears stand for the union of the " +
      "city’s energies driving its development — San Pedro Sula is Honduras’s industrial capital — and the " +
      "thrush for the cheerful, warm spirit of its people.",
    sources: [
      { title: "Significado del Escudo de San Pedro Sula", url: "http://patronatodelbarrio-riodepiedras.blogspot.com/2008/01/escudo-de-san-pedro-sula-honduras.html" },
    ],
  },

  "HN-FM": {
    description:
      "Tegucigalpa’s flag (also used by the department of Francisco Morazán): blue over yellow with two white " +
      "stars. The arms — designed in 1935 by the Spanish herald Vicente de Cadenas y Vicent — show a silver mine " +
      "and a mill wheel for the city’s colonial silver-mining origins (Tegucigalpa means “silver hill”), with a " +
      "lion for strength and nobility.",
    sources: [
      { title: "Heráldica de Tegucigalpa — heraldica.website", url: "https://heraldica.website/heraldica/heraldica-de-tegucigalpa-simbolos-e-historia-de-la-capital-hondurena/" },
    ],
  },

  "HR-01": {
    description:
      "Zagreb’s flag bears the city arms: on blue, a white three-towered fortress with an open golden gate on a " +
      "green hill, a golden six-pointed star at upper right and a silver crescent at upper left. The hill is " +
      "Gradec, the medieval town; the open gate signifies the hospitality and protectiveness of Zagreb’s people; " +
      "the star and crescent are ancient Slavic symbols (of the deities Lada and Lelj). Adopted in its modern " +
      "form in 1896.",
    sources: [
      { title: "Coat of arms of Zagreb — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Zagreb" },
    ],
  },

  "HR-04": {
    description:
      "Karlovac’s flag bears the city arms, which recall its origin as a star-shaped fortress. The town was built " +
      "from nothing in 1579 by Archduke Charles II of Inner Austria — hence “Karlovac”, Charles’s town — as a " +
      "six-pointed star fort guarding the Habsburg lands against the Ottomans, a geometric plan still legible in " +
      "the old town today.",
    sources: [
      { title: "Karlovac — Wikipedia", url: "https://en.wikipedia.org/wiki/Karlovac" },
    ],
  },

  "HR-08": {
    description:
      "Rijeka’s flag bears the city arms: a black double-headed eagle standing on a rock, holding a jug from " +
      "which water pours endlessly into the sea. “Rijeka” means “river”, and the flowing water is the Rječina on " +
      "which the city stands, under the motto “Indeficienter” (“inexhaustibly”); the imperial eagle and arms were " +
      "granted by Emperor Leopold I in 1659.",
    sources: [
      { title: "Rijeka’s two-headed eagle — Rijeka 2020", url: "https://rijeka2020.eu/en/rijekas-two-headed-eagle/" },
    ],
  },

  "HR-03": {
    description:
      "Sisak’s flag bears the town arms: the three-towered “Stari grad” fortress above the three rivers at whose " +
      "confluence Sisak stands — the Odra meeting the Kupa, and the Kupa the Sava — with a ship sailing on the " +
      "Kupa below. The arms were granted in 1838 when Sisak became a free merchant town, marking its role as a " +
      "fortified river port.",
    sources: [
      { title: "Sisak (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-sk-sk.html" },
    ],
  },

  "HR-05": {
    description:
      "Varaždin’s flag is striped red and white from the town arms — among the oldest in Europe — granted by King " +
      "Matthias Corvinus in 1464 for the loyalty of its people. The arms show an angel with golden hair and red " +
      "wings holding a shield with a blue-roofed, cross-topped tower between a golden star and crescent; the " +
      "angel signifies dignity and honour.",
    sources: [
      { title: "Coat of arms — City of Varaždin", url: "https://varazdin.hr/en/coat-arms/" },
    ],
  },

  "HR-06": {
    description:
      "Koprivnica’s flag: blue with the town arms — a white embattled tower without gates, a golden royal crown " +
      "above it, and a double golden fleur-de-lis at either side. Crown and fleurs-de-lis are the emblems of the " +
      "House of Anjou, which granted Koprivnica the status of a free royal town.",
    sources: [
      { title: "Koprivnica (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-kc-kc.html" },
    ],
  },

  "HR-07": {
    description:
      "Bjelovar’s flag bears the town arms: a fortress with soldiers. Bjelovar was laid out as a planned " +
      "garrison town around 1760 for the Habsburg Military Frontier, and its arms record that origin as a " +
      "fortress town whose soldiers guarded the frontier.",
    sources: [
      { title: "Bjelovar — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Bjelovar" },
    ],
  },

  "HR-11": {
    description:
      "Požega’s flag bears the town arms: on blue, a three-towered town wall surmounted by a golden eagle with " +
      "spread wings, a silver star and crescent, and a golden radiating sun. In use since about 1702 and granted " +
      "by Empress Maria Theresa in 1765 when Požega became a free royal town, the arms befit the town of the " +
      "“Vallis Aurea” (Golden Valley).",
    sources: [
      { title: "Požega (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-pz-pz.html" },
    ],
  },

  "HR-02": {
    description:
      "Krapina’s flag: red with the town arms — a blue shield of three stone towers, the centre one tallest, " +
      "behind a white defensive wall. The towers stand for Krapina’s medieval fortifications; the design derives " +
      "from a 12th-century town seal.",
    sources: [
      { title: "Krapina (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-kr-kr.html" },
    ],
  },

  "HR-12": {
    description:
      "Slavonski Brod’s arms: a golden heron holding a fish in its beak and a scroll in its claw, standing over a " +
      "wavy bar — the river Sava, on which the town is a major port — with a crescent and five golden six-pointed " +
      "stars above. The arms have been used since before 1820.",
    sources: [
      { title: "Slavonski Brod (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-sb-sb.html" },
    ],
  },

  "HR-13": {
    description:
      "Zadar’s arms: on red, Saint Chrysogonus (Sveti Krševan) — the city’s patron — as a golden armoured knight " +
      "with a golden halo, riding a black horse, holding a shield and a lance with a banner, above white " +
      "embattled walls and blue waves. The charging saint-horseman became the emblem of the pride of the commune " +
      "of Zadar.",
    sources: [
      { title: "Zadar (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-za-za.html" },
    ],
  },

  "HR-14": {
    description:
      "Osijek’s arms bear the Tvrđa — the great Baroque star fortress the Habsburgs raised on the Drava after " +
      "taking Osijek from the Ottomans in 1687 (built 1712–15). The largest fortress ensemble in Croatia, the " +
      "Tvrđa is the city’s defining emblem.",
    sources: [
      { title: "Tvrđa — Wikipedia", url: "https://en.wikipedia.org/wiki/Tvr%C4%91a" },
    ],
  },

  "HR-15": {
    description:
      "Šibenik’s arms show its patron, the Archangel Saint Michael, in a white tunic and red cloak with wings " +
      "displayed, holding a golden orb and a golden spear with which he slays a black devil beneath him. Saint " +
      "Michael became the dominant symbol of the Šibenik commune in the Middle Ages, and the city’s fortress and " +
      "oldest church bear his name.",
    sources: [
      { title: "Šibenik — Heraldry of the World", url: "https://www.heraldry-wiki.com/heraldrywiki/index.php?title=%C5%A0ibenik" },
    ],
  },

  "HR-16": {
    description:
      "Vukovar’s arms: two silver towers on a wall joined by an arch over an open gate, with a maiden in a green " +
      "gown holding a blue shield charged with a golden lion. The towers stand for strength and protection and " +
      "the lion for bravery; the arms took this form in 1871, when Old and New Vukovar were united.",
    sources: [
      { title: "Vukovar (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-vu-vu.html" },
    ],
  },

  "HR-17": {
    description:
      "Split’s flag: navy blue, with the city’s name repeated and stylised into the bell tower of the Cathedral " +
      "of Saint Domnius rising above the old town. The historic arms showed the walls of Diocletian’s Palace " +
      "with that campanile behind them; the traditional colours are white for the city and blue for the sea.",
    sources: [
      { title: "Flag of Split — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Split" },
    ],
  },

  "HR-19": {
    description:
      "Dubrovnik’s flag: a white field with a golden border bearing the figure and initials (S·B) of Saint " +
      "Blaise (Sveti Vlaho), the city’s patron since the 10th century, who holds a model of the walled city. The " +
      "old Republic of Ragusa also flew a flag inscribed “Libertas” (freedom), adopted when it abolished the " +
      "slave trade in 1418.",
    sources: [
      { title: "Flag of Dubrovnik — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Dubrovnik" },
    ],
  },

  "HR-20": {
    description:
      "Čakovec’s arms: on blue, a silver embattled wall and tower between two golden six-pointed stars. They are " +
      "the arms of the Ernusth de Csáktornya family, lords of Čakovec from the 15th century and later inherited " +
      "by the Zrinski — canting arms, since “Csáktornya” means “Csáky’s tower”.",
    sources: [
      { title: "Čakovec (Croatia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hr-ck-ck.html" },
    ],
  },

  "HU-BK": {
    description:
      "Kecskemét’s flag bears the city arms — red with a golden goat. The goat is canting: the name Kecskemét " +
      "comes from Hungarian “kecske” (goat), and the animal recalls the pastoral, stock-raising heritage of this " +
      "town on the Great Plain.",
    sources: [
      { title: "Kecskemét — Wikipedia", url: "https://en.wikipedia.org/wiki/Kecskemet" },
    ],
  },

  "HU-BZ": {
    description:
      "Miskolc’s arms: on red, the crowned and haloed bust of King Saint Stephen holding the orb and sceptre, " +
      "crested with a hajdú herdsman bearing wheat sheaves and a grape cluster (for the region’s farming and " +
      "wine) and supported by a lion and a griffin. The design goes back to medieval town seals and was granted " +
      "royal sanction by Francis Joseph I in 1909.",
    sources: [
      { title: "Miskolc — History (City of Miskolc)", url: "https://www.miskolc.hu/en/life-city/city-information/history-miskolc" },
    ],
  },

  "HU-CS": {
    description:
      "Szeged’s arms, granted by Charles III in 1719: a blue field crossed by silver bars for the Tisza and " +
      "Maros rivers that meet at the city, a golden sun for Szeged the “city of sunshine” and its endless renewal " +
      "(it rebuilt itself after the great flood of 1879), and a lamb (Agnus Dei) in the crest.",
    sources: [
      { title: "Szeged (Hungary) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hu-cs-sg.html" },
    ],
  },

  "HU-FE": {
    description:
      "Székesfehérvár’s arms show a walled castle with an open gate. The town — whose name means “white castle " +
      "with the seat (throne)” — was the coronation and burial city of the medieval Hungarian kings; the open " +
      "gate signifies that the royal city welcomes all as its guests.",
    sources: [
      { title: "Székesfehérvár — Wikipedia", url: "https://en.wikipedia.org/wiki/Sz%C3%A9kesfeh%C3%A9rv%C3%A1r" },
    ],
  },

  "HU-HB": {
    description:
      "Debrecen’s arms: the Lamb of God (Agnus Dei) with a banner, standing on two books — the Old and New " +
      "Testaments, and a nod to the “Calvinist Rome’s” famous book culture — beneath a phoenix rising from " +
      "flames, added by King Rudolf in 1600 as a symbol of the city’s endless renewal. Debrecen became a free " +
      "royal town in 1693.",
    sources: [
      { title: "Debrecen — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Debrecen" },
    ],
  },

  "HU-HE": {
    description:
      "Eger’s arms centre on its triple-towered castle — the fortress that in 1552 held out under István Dobó " +
      "against a vast Ottoman army. A rampant unicorn holds a sword with a snake twined on it (faith defeating " +
      "treachery), a sun and star mark day and night, and an eagle with a gospel stands for Saint John, patron of " +
      "the Archdiocese of Eger.",
    sources: [
      { title: "Eger — Wikipedia", url: "https://en.wikipedia.org/wiki/Eger" },
    ],
  },

  "HU-BA": {
    description:
      "Pécs’s flag, blue over gold, carries the city’s historic seal, whose Latin legend names it the free royal " +
      "city of “Quinque Ecclesiae” — “Five Churches”. The medieval name (also the German Fünfkirchen) recalls " +
      "the five early Christian basilicas from whose remains the town’s churches were built; Pécs was a great " +
      "religious centre with a bishopric founded in 1009.",
    sources: [
      { title: "Pécs — Wikipedia", url: "https://en.wikipedia.org/wiki/P%C3%A9cs" },
    ],
  },

  "HU-GS": {
    description:
      "Győr’s arms show the city’s patron, Saint Stephen, beside its old castle on a red field crossed by three " +
      "silver waves — the three rivers that meet at Győr: the Danube, the Rába and the Rábca. Under communist " +
      "rule the saint was replaced by a cogwheel, hammer and candle for local industry; the historic arms were " +
      "restored in 1990.",
    sources: [
      { title: "Győr — Heraldry of the World", url: "https://www.heraldry-wiki.com/heraldrywiki/index.php?title=Gy%C5%91r" },
    ],
  },

  "HU-PE": {
    description:
      "Budapest’s flag bears the city arms: on red, two castles divided by a wavy white band — the Danube — with " +
      "a single-towered castle above for Pest and a three-towered castle below for Buda and Óbuda, the three " +
      "towns united in 1873; a lion and a griffin support the shield beneath the Holy Crown. The flag’s red and " +
      "green triangular border was added in 2011.",
    sources: [
      { title: "Coat of arms of Budapest — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Budapest" },
    ],
  },

  "HU-VA": {
    description:
      "Szombathely’s arms: on blue, a silver castle with an open, cross-topped gate and a many-windowed tower, " +
      "with a golden star and a silver crescent flanking it. Szombathely stands on Roman Savaria, the birthplace " +
      "of Saint Martin of Tours, the city’s patron.",
    sources: [
      { title: "Szombathely — Wikipedia", url: "https://en.wikipedia.org/wiki/Szombathely" },
    ],
  },

  "HU-ZA": {
    description:
      "Zalaegerszeg’s flag is light blue with the city arms and the town’s name in gold below. The arms show " +
      "Saint Mary Magdalene, a whip beneath her feet, reaching out with a laurel wreath toward a stylised castle. " +
      "The present design was adopted in 1992.",
    sources: [
      { title: "Zalaegerszeg (Hungary) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hu-za-zg.html" },
    ],
  },

  "ID-JB": {
    description:
      "Bandung’s flag: three horizontal bands of green, yellow and blue (2:1:2). Green stands for coolness and " +
      "prosperity, yellow (gold) for the welfare and nobility of the people, and blue for loyalty. The colours " +
      "were fixed in 1953.",
    sources: [
      { title: "Bendera Kota Bandung — Wikipedia (id)", url: "https://id.wikipedia.org/wiki/Bendera_Kota_Bandung" },
    ],
  },

  "ID-JI": {
    description:
      "Surabaya’s emblem centres on a shark (sura) and a crocodile (baya) — the two beasts whose legendary " +
      "battle names the city, standing for courage in the face of danger from sea and land (the motto is “Berani " +
      "menghadapi bahaya yang datang mengancam”). Above them rises the Tugu Pahlawan, the Heroes’ Monument to " +
      "the battle of 10 November 1945 that made Surabaya the “City of Heroes”.",
    sources: [
      { title: "Kota Surabaya — Wikipedia (id)", url: "https://id.wikipedia.org/wiki/Kota_Surabaya" },
    ],
  },

  "ID-GO": {
    description:
      "Gorontalo’s emblem is a winged shield with the city’s name on a ribbon — its people’s aspirations soaring " +
      "like an eagle. A lotus of five petals and a coconut palm with five leaves and five fruits stand for the " +
      "five principles of Pancasila; the coconut also marks copra as Gorontalo’s main product, the lotus peace " +
      "and purity, the rice and cotton a just and prosperous society, and the chain the city’s unity with all of " +
      "Indonesia.",
    sources: [
      { title: "Arti Lambang — Pemerintah Kota Gorontalo", url: "https://kominfo.gorontalokota.go.id/page/arti-lambang" },
    ],
  },

  "ID-SA": {
    description:
      "Manado’s flag is white, bearing the city’s coat of arms. On the shield, a Manguni owl in flight stands " +
      "for the native culture of the Minahasa people. The coconut palms carry dates in their counts: the right " +
      "palm’s fronds and leaves stand for the Proclamation of Indonesia’s independence in 1945, and the rings of " +
      "the trunks, the two palms and the left palm’s fronds, with the red-and-white flags on either side, stand " +
      "for the Red-and-White Action of 14 February 1946, which defended the sovereignty of the proclaimed " +
      "republic. Each palm’s five nuts stand for Pancasila. The sea marks Manado as a port and trading centre, " +
      "and the mountains its terrain. The motto, Si Tou Timou Tumou Tou, means “people live to humanise others”.",
    sources: [
      { title: "Ini Arti Bentuk dan Warna Lambang Kota Manado — iNews Sulut, citing the Manado city government (Indonesian)", url: "https://www.inews.id/regional/sulut/ini-arti-bentuk-dan-warna-lambang-kota-manado" },
      { title: "North Sulawesi city flags — Flags of the World", url: "https://www.crwflags.com/fotw/flags/id-sa-c.html" },
    ],
  },

  "ID-JA": {
    description:
      "Jambi’s emblem, on a sky-blue shield, carries the Keris Siginjai — the heirloom dagger whose holder was " +
      "recognised as ruler of the old Kingdom of Jambi — and a pair of white geese with the Perahu Kajang Lako " +
      "boat, from the founding legend of Orang Kayo Hitam. Two white stars flanking the city’s name stand for its " +
      "many peoples and faiths.",
    sources: [
      { title: "Arti Lambang — Pemerintahan Kota Jambi", url: "https://jambikota.go.id/tentang/profil/arti_lambang" },
    ],
  },

  "ID-JT": {
    description:
      "Semarang’s emblem gathers symbols of the city’s identity, its revolutionary tradition and its national " +
      "spirit: the Tugu Muda for the citizens’ heroism in the “Five-Day Battle” against Japanese troops in 1945, " +
      "a hill and temple for its upland “kota atas”, water and a fortress wall for its port, a shield for the " +
      "people’s strength, rice and cotton for prosperity, and a fish for the fisheries Semarang has long been " +
      "known for.",
    sources: [
      { title: "Arti Lambang — Pemerintah Kota Semarang", url: "https://semarangkota.go.id/p/31/arti_lambang" },
    ],
  },

  "ID-SB": {
    description:
      "Padang’s emblem (motto “Padang Kota Tercinta”, Padang Beloved City) is a shield-like trapezium recalling a " +
      "buffalo, bearing a rangkiang (the Minangkabau rice barn, for cultural integrity), Mount Padang and the " +
      "sea with five rows of waves for this Pancasila-guided coastal city, and a Minang club and keris for the " +
      "defence of the homeland and ancestral honour.",
    sources: [
      { title: "Arti Lambang Kota Padang — Zona Hobi Saya", url: "https://www.zonahobisaya.web.id/2022/12/arti-lambang-pemerintah-kota-padang.html" },
    ],
  },

  "ID-SN": {
    description:
      "Makassar’s emblem: a white shield (purity) bearing a five-sailed Pinisi ship — Makassar an ancient " +
      "maritime centre — with rice and coconut for prosperity and a fortress (Fort Rotterdam) behind for the " +
      "city’s glory; the red, white and orange border stands for the unity and greatness of Indonesia. Its motto " +
      "is “Sekali Layar Terkembang, Pantang Biduk Surut Ke Pantai” — once the sail is spread, the boat never " +
      "turns back.",
    sources: [
      { title: "Logo Kota Makassar — Portal Resmi Pemkot Makassar", url: "https://makassarkota.go.id/logo-kota-makassar-2/" },
    ],
  },

  "ID-SU": {
    description:
      "Medan’s emblem: a five-pointed national star over a five-part shield (Pancasila), with a wreath of 17 " +
      "rice grains and 8 cotton flowers and a sharpened bamboo behind — 17 August 1945 and the fight for " +
      "independence — and the city’s five great export crops (sisal, tea, rubber, palm oil and Deli tobacco) for " +
      "its prosperity as a trading centre.",
    sources: [
      { title: "Lambang Kota Medan — Portal Resmi Pemko Medan", url: "https://portal.medan.go.id/menu/selayang-pandang/lambang-kota-medan" },
    ],
  },

  "ID-YO": {
    description:
      "Yogyakarta’s emblem (adopted 1953) has an 18:25 ratio recalling the start of Prince Diponegoro’s war in " +
      "1825. Around the shield stand the Tugu — the city’s landmark — a gunungan for its culture, a caged banyan " +
      "for democracy, a bull for courage and a keris for struggle, with a golden star, rice and cotton for " +
      "prosperity; the colours read black for eternity, gold for nobility, white for purity, red for courage and " +
      "green for prosperity.",
    sources: [
      { title: "Lambang dan Identitas — Pemerintah Kota Yogyakarta", url: "https://jogjakota.go.id/page/lambang-dan-identitas" },
    ],
  },

  "ID-AC": {
    description:
      "Banda Aceh’s emblem (1962): a mosque dome and the Gunongan for the city’s Islamic faith and heritage — " +
      "Aceh is the “Serambi Mekkah”, the Verandah of Mecca — with rice and pepper for prosperity, a rencong (the " +
      "Acehnese dagger) for heroism in the fight for independence, and the Student-City monument for learning and " +
      "the spirit of 1945. Yellow stands for majesty.",
    sources: [
      { title: "Arti Lambang Kota Banda Aceh — Zona Hobi Saya", url: "https://www.zonahobisaya.web.id/2023/06/arti-lambang-kota-banda-aceh-yang-dapat.html" },
    ],
  },

  "ID-KB": {
    description:
      "Pontianak’s emblem centres on a mosque dome — the city was founded in 1771 with the building of a mosque — " +
      "crossed by the line of the Equator, for Pontianak is the one big city the Equator runs through (the “Kota " +
      "Khatulistiwa”). Rubber and coconut leaves (23 and 10, for the 23 October founding) flank five rising rays " +
      "for Pancasila, with the Kapuas river below.",
    sources: [
      { title: "Arti dan Gambar dari Lambang Kota Pontianak — Diskominfo Kota Pontianak", url: "https://diskominfo.pontianak.go.id/berita/arti-dan-gambar-dari-lambang-kota-pontianak" },
    ],
  },

  "ID-KI": {
    description:
      "Samarinda’s emblem: a green shield (fertility) with three currents of the Mahakam river and its bridge " +
      "(tranquility and unity), two pesut — the rare Mahakam river dolphins — 21 rice grains for the city’s " +
      "founding on 21 January 1968, cotton flowers, and a golden boat; the “tepian” (riverbank) marks Samarinda " +
      "as a timber-industry city, under the motto “Teduh, Rapi, Aman, Nyaman”.",
    sources: [
      { title: "Makna Lambang — Portal Resmi Kota Samarinda", url: "https://samarindakota.go.id/laman/makna-lambang" },
    ],
  },

  "ID-LA": {
    description:
      "Bandar Lampung’s emblem is crowned by the golden Siger, the Lampung ceremonial headdress that stands for " +
      "greatness and refined culture. A shield of white over blue shows the city of land and sea; a royal " +
      "umbrella of 45 segments and rice and pepper counted 17 and 6 mark the dates 17-8-1945 and the city’s " +
      "founding on 17 June 1682, and a jukung boat with a figure marks it a city of trade and services. The " +
      "motto is “Ragom Gawi” (working together).",
    sources: [
      { title: "Arti Lambang Kota Bandar Lampung", url: "https://smpn6bandarlampung.blogspot.com/2015/05/arti-lambang-kota-bandar-lampung-kita.html" },
    ],
  },

  "ID-MA": {
    description:
      "Ambon’s emblem shows a belang manggurebe — a traditional Maluku racing boat — paddled by five people, for " +
      "dynamic forward motion through gotong-royong (mutual help) and the five principles of Pancasila. A grey " +
      "fort names the city, three mountains recall the Trikora campaign, the parang and salawaku (sword and " +
      "shield) are the people’s weapons of independence, and sago and coconut are Maluku’s age-old livelihood. " +
      "The motto is “Bersatu Manggurebe Maju”.",
    sources: [
      { title: "Lambang Pemerintah — Kota Ambon", url: "https://ambon.go.id/lambang-pemerintah/" },
    ],
  },

  "ID-BB": {
    description:
      "Pangkal Pinang’s emblem: a five-sided blue shield (Pancasila) bearing a globe outlined in tin — for the " +
      "tin-mining that built the city — a betel-nut (pinang) tree that gives the city its name, and a “tudung " +
      "saji” food-cover for its cultured, cooperative society. The numbers 17-9-1757 mark its founding on 17 " +
      "September 1757.",
    sources: [
      { title: "Arti Lambang Daerah — Pemerintah Kota Pangkalpinang", url: "https://website.pangkalpinangkota.go.id/arti-lambang-daerah/" },
    ],
  },

  "ID-BE": {
    description:
      "Bengkulu’s emblem is a heart-shaped shield of five corners — the city as the heart of Bengkulu province, " +
      "on the foundation of Pancasila. Within it a star stands for belief in God, a cerana for high culture, a " +
      "rudus (a Malay sword) for heroism, the Rafflesia arnoldii for Bengkulu’s natural wonder, and rice and " +
      "coffee for its prosperity.",
    sources: [
      { title: "Lambang Daerah dan Artinya — Pemerintah Kota Bengkulu", url: "https://profil.bengkulukota.go.id/lambang-daerah-dan-artinya/" },
    ],
  },

  "ID-BT": {
    description:
      "Serang’s emblem is a hexagonal shield for the six districts that formed the city, bearing a five-pointed " +
      "star for belief in God and the Kaibon gate — a landmark of the Banten Sultanate — marking Serang as the " +
      "capital of Banten and a gateway to prosperity. Yellow is nobility, green the land’s riches, red courage.",
    sources: [
      { title: "Arti Lambang Kota Serang — Pemerintah Kota Serang", url: "https://serangkota.go.id/pages/arti-lambang-kota-serang" },
    ],
  },

  "ID-KR": {
    description:
      "Tanjungpinang’s emblem carries the gonggong — the spiral sea-snail of the surrounding Riau Islands " +
      "waters, a source of Malay pride and the city’s icon — expressing Tanjungpinang’s deep bond with the sea " +
      "and its marine riches.",
    sources: [
      { title: "Serba-serbi Gonggong, Simbol Kota Tanjungpinang — Good News From Indonesia", url: "https://www.goodnewsfromindonesia.id/infographic/serba-serbi-gonggong-simbol-kota-tanjungpinang" },
    ],
  },

  "ID-NB": {
    description:
      "Mataram’s emblem: a five-sided shield (Pancasila) with a five-pointed star for faith in God, a seven-link " +
      "chain for the people’s unity, rice and cotton counted 31 and 8 for the city’s founding on 31 August, and " +
      "the koak-kaok bird — a local heron — for discipline and dynamism. Its blue, gold and white read as " +
      "aspiration, glory and purity.",
    sources: [
      { title: "Merah Putih… — Pemerintah Kota Mataram", url: "https://web.mataramkota.go.id/merah-putih-simbol-keberanian-kesucian-dan-pemersatu-bangsa/" },
    ],
  },

  "ID-NT": {
    description:
      "Kupang’s emblem: rice and cotton for social justice, a chain for the representation of all its people, a " +
      "golden five-pointed star for noble aspirations, and a Sasando — the Rotenese stringed instrument — for the " +
      "region’s culture, with the year 1996 for the city’s founding and a Helong-language motto, “Lil Au Nol " +
      "Dael Banan” (“Build me with a sincere heart”).",
    sources: [
      { title: "Arti Lambang — K2S Kota Kupang", url: "https://k2skupang.org/detailpost/arti-lambang" },
    ],
  },

  "ID-PA": {
    description:
      "Jayapura’s emblem is a five-cornered shield uniting the city’s roles as a centre of government, trade, " +
      "industry, education, tourism and sport. Bands of dark green, navy and red stand for its hills, the open " +
      "sea and its position on the border with Papua New Guinea; green is the wealth of the land, blue that of " +
      "the sea, and yellow its high ideals.",
    sources: [
      { title: "Arti Logo Kota Jayapura — Zona Hobi Saya", url: "https://www.zonahobisaya.web.id/2024/06/arti-logo-kota-jayapura-di-timur-nkri.html" },
    ],
  },

  "ID-RI": {
    description:
      "Pekanbaru’s emblem is a shield formed as a city gate — five gateways for Pancasila — ringed by a chain " +
      "for the people’s unity. A winged wheel marks the city’s dynamic growth, a rubber tree and an oil derrick " +
      "its life as a trading and port city exporting forest produce and oil, a bamboo spear its heroism, and " +
      "rice and cotton its prosperity.",
    sources: [
      { title: "Lambang Kota Pekanbaru — Pemerintah Kota Pekanbaru", url: "https://www.pekanbaru.go.id/p/menu/profil-kota/lambang-kota-pekanbaru" },
    ],
  },

  "ID-SS": {
    description:
      "Palembang’s emblem centres on a Rumah Limas, the tiered Palembang noble house, with an unopened jasmine " +
      "(melati) flower above for harmony and welfare and the Ampera Bridge over the Musi river — the city’s icon, " +
      "its very design drawn from the Rumah Limas. A triangle for Bukit Siguntang and counts of 17 and 8 recall " +
      "the 17 August proclamation of independence.",
    sources: [
      { title: "Lambang — Situs Resmi Pemerintah Kota Palembang", url: "https://tapem.palembang.go.id/?gos=lambang&id=lambang" },
    ],
  },

  "ID-ST": {
    description:
      "Palu’s emblem: a golden five-pointed star for Pancasila, a brown Sou Raja — the traditional “Great House” " +
      "of the Palu chiefs and their council — its 12 pillars and 10 steps marking the city’s founding, and a " +
      "white winding line for the rivers of Palu set in its valley between two mountains, with rice and cotton " +
      "for prosperity. The motto is “Maliu Ntinuvu” (sincere dedication in unity).",
    sources: [
      { title: "Arti Lambang — Pemerintah Kota Palu", url: "https://palukota.go.id/arti-lambang/" },
    ],
  },

  "IT-AL": {
    description:
      "Alessandria’s flag: a silver field with a red cross, borne since 1175 to mark the lifting of Frederick " +
      "Barbarossa’s siege of the young city. The arms show two angels holding a scroll — “Deprimit elatos levat " +
      "Alexandria stratos” (“Alessandria humbles the proud and raises the humble”) — the motto given by Pope " +
      "Alexander III, after whom the city is named.",
    sources: [
      { title: "Stemma del Comune di Alessandria — Comuni-Italiani", url: "https://www.comuni-italiani.it/006/003/stemma.html" },
    ],
  },

  "IT-AN": {
    description:
      "Ancona’s flag: a red field with a couped golden (Greek) cross. The city arms add the “cavaliere dorico”, " +
      "an armed knight for the warrior spirit of the Anconetani — by tradition the emperor Trajan, who enlarged " +
      "Ancona’s harbour and made it Italy’s “gate to the East”.",
    sources: [
      { title: "Il cavaliere dorico nello stemma di Ancona — AnconaToday", url: "https://www.anconatoday.it/social/cavalaiere-dorico-simbolo-citta-ancona-stemma.html" },
    ],
  },

  "IT-AP": {
    description:
      "Ascoli Piceno’s flag is a yellow-and-red vertical bicolour in the city’s colours. Its arms show a " +
      "travertine castle with Ghibelline battlements — two open arches beneath a five-arched gallery, flanked by " +
      "two towers of unequal height — on red.",
    sources: [
      { title: "Stemma di Ascoli Piceno — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Ascoli_Piceno" },
    ],
  },

  "IT-AQ": {
    description:
      "L’Aquila’s flag is party green and black, bearing the city arms: a crowned black Swabian eagle (aquila) " +
      "on silver, ringed by the motto “Immota manet” (“it remains unmoved” — from Virgil, of the deep-rooted " +
      "oak) and the mysterious trigram PHS. The green gonfalone carries the arms of the city’s four Quarters. " +
      "Recognised in 1937.",
    sources: [
      { title: "Stemma dell’Aquila — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_dell%27Aquila" },
    ],
  },

  "IT-AR": {
    description:
      "Arezzo’s crimson flag bears the city emblem: a black rearing horse (“cavallo inalberato”), turned to the " +
      "fly, on silver. The horse stands for valour and an intrepid spirit; it was taken as the arms of the " +
      "Aretine state in the 14th century and has been the city’s symbol ever since.",
    sources: [
      { title: "Stemma del Comune di Arezzo — Comuni-Italiani", url: "https://www.comuni-italiani.it/051/002/stemma.html" },
    ],
  },

  "IT-AT": {
    description:
      "Asti’s flag: a red field with a white cross. The cross dates from the age of the Crusades — Asti sent " +
      "citizens to the Holy Land in 1202 and 1209 — and echoes the white-on-red of the Knights Hospitaller of " +
      "Saint John, established at Asti’s San Pietro in Consavia from 1260.",
    sources: [
      { title: "Bandiera di Asti — Bandiere.it", url: "https://www.bandiere.it/bandiera-asti" },
    ],
  },

  "IT-AV": {
    description:
      "Avellino’s arms, on a sky-blue field, show the Paschal Lamb (Agnus Dei) with its banner resting on a " +
      "red-bound book. Taken from the arms of the church of Avellino, the lamb was also the emblem of the wool " +
      "guild whose renowned dark-blue Avellino cloth flourished in the 16th century.",
    sources: [
      { title: "Stemma del Comune di Avellino — Comuni-Italiani", url: "https://www.comuni-italiani.it/064/008/stemma.html" },
    ],
  },

  "IT-BA": {
    description:
      "Bari’s flag is a white-and-red vertical bicolour. The colours are read as white for pure religious zeal " +
      "and red for the blood the citizens would shed to defend their faith; tradition traces them to the 9th " +
      "century, when Bari adopted white and red to profess its Christian devotion under Saracen rule. Fixed " +
      "officially in 1935.",
    sources: [
      { title: "Stemma di Bari — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Bari" },
    ],
  },

  "IT-BG": {
    description:
      "Bergamo’s flag is a yellow-and-red vertical bicolour, the city’s colours since the 15th century. Yellow " +
      "stands for the wealth of the Bergamo country (and the Guelphs), red for the courage and sacrifice of its " +
      "people (and the Ghibellines); the arms are party yellow, red and purple, the Comune’s traditional colours.",
    sources: [
      { title: "Bandiera di Bergamo — Bandiere.it", url: "https://www.bandiere.it/bandiera-bergamo" },
    ],
  },

  "IT-BI": {
    description:
      "Biella’s flag and arms: a gold field with a bear walking at the foot of a tree on a green meadow, beneath " +
      "a comital crown. The bear — the fierce beast of the Biellese valleys, against which the people defended " +
      "themselves and their herds — was chosen because the eagle was already Aosta’s and Novara’s and the lion " +
      "unknown to these mountain folk; it is attested from the mid-14th century.",
    sources: [
      { title: "Stemma del Comune di Biella — Comuni-Italiani", url: "https://www.comuni-italiani.it/096/004/stemma.html" },
    ],
  },

  "IT-BL": {
    description:
      "Belluno’s flag and arms: on blue, a golden cross with two red dragons facing each other in the upper " +
      "quarters. The red dragon is an emblem of military valour inherited from around the year 1000, when " +
      "Belluno was a stronghold of the Saxon (Ottonian) dynasty, whose war-standard bore the red dragon.",
    sources: [
      { title: "Lo stemma della città di Belluno — Comune di Belluno", url: "https://archivio.comune.belluno.it/wp-content/uploads/2012/09/facciamo-il-punto-sullo-stemma-di-Belluno-aggiornato-2007.pdf" },
    ],
  },

  "IT-BN": {
    description:
      "Benevento’s flag carries the city colours; its arms, party red and silver, bear a rearing boar. It is the " +
      "Calydonian boar of Greek myth, whose tusks legend says were carried to Benevento by its founder Diomedes " +
      "on his way home from the Trojan War — the city’s emblem since the Middle Ages.",
    sources: [
      { title: "Stemma del Comune di Benevento — Comuni-Italiani", url: "https://www.comuni-italiani.it/062/008/stemma.html" },
    ],
  },

  "IT-BO": {
    description:
      "Bologna’s arms bear a red cross on silver — the Comune — beside the popolo’s shield of blue lettered " +
      "“Libertas” in gold. The freedom banner was given to Bologna by Florence in 1376 when the city drove out " +
      "the papal legate, and “Libertas” has been its watchword ever since.",
    sources: [
      { title: "Stemma di Bologna — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Bologna" },
    ],
  },

  "IT-BR": {
    description:
      "Brindisi’s arms: originally a stag’s head — the Messapian name of the city (BRVNDA, “stag’s head”, which " +
      "the shape of its harbour resembles) — to which two columns were added in 1845 for the Roman columns that " +
      "marked the end of the Appian Way at Brindisi; the column signifies constancy and steadfast resistance.",
    sources: [
      { title: "Descrizione dello stemma e del gonfalone — Provincia di Brindisi", url: "https://www.provincia.brindisi.it/index.php/storia-e-tradizioni/la-storia-della-provincia-in-generale/descrizione-dello-stemma-e-del-gonfalone" },
    ],
  },

  "IT-BS": {
    description:
      "Brescia’s flag is a white-and-blue bicolour in the city colours; its arms bear a blue lion rampant on " +
      "silver, the ancient civic lion. Brescia is called the “Leonessa d’Italia” (Lioness of Italy), a name given " +
      "by the poet Carducci for its lion-hearted ten-day resistance to the Austrians in 1849.",
    sources: [
      { title: "Stemma del Comune di Brescia — Comuni-Italiani", url: "https://www.comuni-italiani.it/017/029/stemma.html" },
    ],
  },

  "IT-BT": {
    description:
      "Andria’s arms: on blue, a crowned lion climbing a cut oak branch. The lion stands for strength, courage " +
      "and sovereignty — the traditional emblem of the loyal city that styled itself Andria “fidelis”.",
    sources: [
      { title: "Stemma del Comune di Andria — Comuni-Italiani", url: "https://www.comuni-italiani.it/110/001/stemma.html" },
    ],
  },

  "IT-BZ": {
    description:
      "Bolzano’s flag is party red and white, from the city arms — silver with a red band charged with a golden " +
      "six-pointed star, granted in 1381 by Duke Leopold III of Austria. The white and red echo the Austrian " +
      "colours; the golden star is read as the Stella Maris, for the Madonna, patron of the city’s cathedral.",
    sources: [
      { title: "Stemma di Bolzano — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Bolzano" },
    ],
  },

  "IT-CA": {
    description:
      "Cagliari’s flag is a blue-and-red bicolour in the city colours. Its arms quarter the cross of Savoy with " +
      "a silver three-towered castle on a sea-washed rock — the medieval fortified quarter of Castello, whose " +
      "great towers (San Pancrazio, dell’Elefante and dell’Aquila) still crown the city.",
    sources: [
      { title: "Stemma del Comune di Cagliari — Comuni-Italiani", url: "https://www.comuni-italiani.it/092/009/stemma.html" },
    ],
  },

  "IT-CB": {
    description:
      "Campobasso’s flag is divided per bend red and blue, for the two medieval confraternities that ruled the " +
      "city — red for the Crociati (Crusaders) and blue for the Trinitari. Its arms show six Guelph-battlemented " +
      "towers beneath a marquis’s crown, for the six towers that once guarded the city’s gates.",
    sources: [
      { title: "Bandiera di Campobasso — Bandiere.it", url: "https://www.bandiere.it/bandiera-campobasso" },
    ],
  },

  "IT-CE": {
    description:
      "Caserta’s flag carries the city colours; its arms show a golden Ghibelline-battlemented tower on green " +
      "mountains, lit by a golden rising sun, and two golden cornucopias — the horn of plenty of the “Campania " +
      "felix”, for the abundance and fertility of the land.",
    sources: [
      { title: "Stemma del Comune di Caserta — Comuni-Italiani", url: "https://www.comuni-italiani.it/061/022/stemma.html" },
    ],
  },

  "IT-CH": {
    description:
      "Chieti’s red flag bears the city arms: on blue, the hero Achilles armed on a rearing horse, within a " +
      "border quartered by a white cross with a golden key in each part for the city’s four gates. Achilles was " +
      "adopted as Chieti’s patron from the legend deriving its ancient name Teate from Theti (Thetis, his mother).",
    sources: [
      { title: "Stemma del Comune di Chieti — Comuni-Italiani", url: "https://www.comuni-italiani.it/069/022/stemma.html" },
    ],
  },

  "IT-CI": {
    description:
      "Carbonia’s arms: on blue, a miner’s lamp atop a bank of coal. The city — its name means “coal town” — was " +
      "founded in the late 1930s to house the workers of the Sulcis coal mines, and the arms, granted in 1939, " +
      "record that mining vocation.",
    sources: [
      { title: "Carbonia — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Carbonia" },
    ],
  },

  "IT-CL": {
    description:
      "Caltanissetta’s arms: on red, a golden three-towered castle under an antique crown, with a helmeted " +
      "warrior’s head emerging from the right tower and a hand grasping a sword from the left — an emblem of the " +
      "fortified city’s martial defence.",
    sources: [
      { title: "Stemma del Comune di Caltanissetta — Comuni-Italiani", url: "https://www.comuni-italiani.it/085/004/stemma.html" },
    ],
  },

  "IT-CO": {
    description:
      "Como’s flag is red with a white cross — the Ghibelline cross of a city loyal to the Empire (Guelph cities " +
      "like Milan bear the reverse, a red cross on white). The gonfalone also carries the motto “Libertas”, from " +
      "the banner the women of Como wove for the city after Garibaldi freed it in 1859.",
    sources: [
      { title: "Como e il suo Stemma — Incuriosire.it", url: "https://www.incuriosire.it/como-e-il-suo-stemma/" },
    ],
  },

  "IT-CR": {
    description:
      "Cremona’s flag is barry of red and silver; its arms add an arm holding a golden ball. The ball recalls " +
      "the annual tribute of a solid gold ball that Cremona owed the Empire, and the champion Giovanni Baldesio " +
      "(“Zanen de la Bala”), who won a duel that freed the city of it — “fortitudo mea in brachio”, my strength " +
      "is in my arm.",
    sources: [
      { title: "Stemma di Cremona — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Cremona" },
    ],
  },

  "IT-CS": {
    description:
      "Cosenza’s arms: on blue, a golden mountain of seven peaks — the seven hills that surround the ancient " +
      "city. Adopted by tradition in 1222, when Emperor Frederick II came to Cosenza, the seven hills stand for " +
      "the citizens’ strength and their resolve to defend their freedoms.",
    sources: [
      { title: "Cosa rappresenta la bandiera di Cosenza — Tele Cosenza", url: "https://www.telecosenza.it/cosa-rappresenta-la-bandiera-di-cosenza-il-significato-dello-stemma-628/" },
    ],
  },

  "IT-CT": {
    description:
      "Catania’s flag carries the city colours; its emblem is the Liotru, a black elephant carved from lava. " +
      "Catania took the elephant as its symbol in 1239, when Frederick II raised it to a royal city; legend held " +
      "the statue to be magical, protecting the city from the eruptions of Mount Etna.",
    sources: [
      { title: "Fontana dell’Elefante — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Fontana_dell%27Elefante" },
    ],
  },

  "IT-CZ": {
    description:
      "Catanzaro’s arms: on silver, a crowned imperial eagle holding a blue scroll with the motto “Sanguinis " +
      "effusione” (“with the shedding of blood”), a red shield on its breast bearing the three green hills the " +
      "city stands on. The eagle was granted by Charles V for the citizens’ fierce defence against the French " +
      "siege of 1528; the city’s colours are yellow and red.",
    sources: [
      { title: "Stemma di Catanzaro — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Catanzaro" },
    ],
  },

  "IT-EN": {
    description:
      "Enna’s arms: on blue, a golden three-towered castle bearing three golden ears of wheat, set on the breast " +
      "of a crowned double-headed eagle. The three towers stand for the old Castrogiovanni as city of light and " +
      "wisdom, of peace and plenty, and mother of Sicily; the wheat recalls Enna as the sacred land of Ceres at " +
      "the island’s heart.",
    sources: [
      { title: "Lo Stemma — Libero Consorzio Comunale di Enna", url: "https://www.provincia.enna.it/pagina133801_lo-stemma.html" },
    ],
  },

  "IT-FC": {
    description:
      "Cesena’s arms: per fess black and silver within an indented border, beneath the Angevin chief (blue with " +
      "golden fleurs-de-lis and a red lambel). The black and white mark the peace between Ghibellines and " +
      "Guelphs and have been Cesena’s colours since the 14th-century Malatesta age; the Angevin chief marks its " +
      "Guelph loyalty.",
    sources: [
      { title: "Stemma del Comune di Cesena — Comuni-Italiani", url: "https://www.comuni-italiani.it/040/007/stemma.html" },
    ],
  },

  "IT-FE": {
    description:
      "Ferrara’s arms: a shield party black over silver, ensigned with a ducal crown recalling the city’s time " +
      "as a duchy. Ferrara was the seat of the House of Este, whose own emblem was a white eagle on blue.",
    sources: [
      { title: "Stemma di Ferrara — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Ferrara" },
    ],
  },

  "IT-FG": {
    description:
      "Foggia’s flag is red over blue — fire over water — and its arms show three flames rising from and " +
      "reflected in the sea. Some read them for the land itself (water just below ground, fierce heat above); by " +
      "tradition they recall the three flames that revealed the buried holy image of the Madonna dei Sette Veli, " +
      "the city’s Icona Vetere.",
    sources: [
      { title: "Lo stemma della città — Mangano Foggia", url: "https://manganofoggia.it/lo-stemma-della-citta/" },
    ],
  },

  "IT-FI": {
    description:
      "Florence’s flag is white with a red lily (the “giglio”, in fact a stylised iris). The lily has been the " +
      "city’s emblem since the Middle Ages; under the Ghibellines it was a white lily on red, but in 1251 the " +
      "victorious Guelphs reversed the colours to a red lily on white, and so it has remained.",
    sources: [
      { title: "Stemma di Firenze — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Firenze" },
    ],
  },

  "IT-FM": {
    description:
      "Fermo’s arms are quartered: a silver cross on red (for the Crusades and the city’s fidelity to the pope) " +
      "and a black imperial eagle on gold (taken when Fermo turned Ghibelline), crested by an arm holding a ball " +
      "— the “mero e misto impero” (full jurisdiction) granted the city by Gregory IX in 1229. Its motto: “Firmum " +
      "firmae fidei” (Fermo, of firm faith).",
    sources: [
      { title: "Stemma di Fermo — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Fermo" },
    ],
  },

  "IT-GE": {
    description:
      "Genoa’s flag is the cross of Saint George — a red cross on white. Genoa took Saint George as its patron " +
      "and standard-bearer at the First Crusade (1099) and flew his cross on its ships as a maritime republic; " +
      "the red cross signifies the Passion of Christ and victory.",
    sources: [
      { title: "Croce di San Giorgio — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Croce_di_San_Giorgio" },
    ],
  },

  "IT-GO": {
    description:
      "Gorizia’s arms are those of the medieval County of Gorizia: party per bend, a golden lion passant over " +
      "the line on blue, and three red bends on silver. The lion was the emblem of the counts who ruled Gorizia " +
      "until it passed to the Habsburgs.",
    sources: [
      { title: "Stemma del Comune di Gorizia — Comuni-Italiani", url: "https://www.comuni-italiani.it/031/007/stemma.html" },
    ],
  },

  "IT-GR": {
    description:
      "Grosseto’s arms: on red, a silver griffin holding a silver sword. The griffin — a winged mythical beast — " +
      "evokes the city’s Etruscan origins and, as a Christ-symbol, its faith; the red field marks the Ghibelline " +
      "party Grosseto long followed.",
    sources: [
      { title: "Stemma di Grosseto — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Grosseto" },
    ],
  },

  "IT-IM": {
    description:
      "Imperia’s arms join its two founding towns, united in 1923: on red, four silver towers with the chief of " +
      "Genoa for Porto Maurizio, and on silver an olive tree with the chief of Savoy for Oneglia. The olive " +
      "stands for the oil-growing Riviera on which the city lives.",
    sources: [
      { title: "Stemma del Comune di Imperia — Comuni-Italiani", url: "https://www.comuni-italiani.it/008/031/stemma.html" },
    ],
  },

  "IT-IS": {
    description:
      "Isernia’s arms: on blue, the monogram “IS” formed by a serpent coiled about a staff. The staff — read as a " +
      "sceptre — marks the city’s standing as a free royal city (granted by Charles V in 1519); the serpent " +
      "stands for the vigilance and prudence of its people.",
    sources: [
      { title: "Stemma del Comune di Isernia — Comuni-Italiani", url: "https://www.comuni-italiani.it/094/023/stemma.html" },
    ],
  },

  "IT-LC": {
    description:
      "Lecco’s arms: on blue — the colour of the sky and of the lake — a golden lion rampant, for the city’s " +
      "strength, courage and pride.",
    sources: [
      { title: "Stemma del Comune di Lecco — Comuni-Italiani", url: "https://www.comuni-italiani.it/097/042/stemma.html" },
    ],
  },

  "IT-LE": {
    description:
      "Lecce’s arms show a tree and a she-wolf. The tree is the holm-oak (leccio) of the dense woods from which " +
      "Roman Lupiae took its modern name, an emblem of resilience; the she-wolf recalls the city’s Roman kinship " +
      "and stands for strength and watchful protection.",
    sources: [
      { title: "La Lupa di Lecce — storia e significato", url: "https://www.lavecchiaosteriatotu.it/la-lupa-di-lecce-storia-e-significato-del-simbolo-della-citta/" },
    ],
  },

  "IT-LI": {
    description:
      "Livorno’s arms: on red, a two-towered fortress rising from the sea, the right tower flying a silver banner " +
      "lettered “FIDES” — for the loyalty (fides) the Livornesi showed the Medici, who built the port city. The " +
      "tower also recalls the medieval Mastio di Matilde and the initial of Livorno.",
    sources: [
      { title: "Stemma del Comune di Livorno — Comuni-Italiani", url: "https://www.comuni-italiani.it/049/009/stemma.html" },
    ],
  },

  "IT-LO": {
    description:
      "Lodi’s flag is a red cross on gold. The arms are usually derived from those attributed to the Emperor " +
      "Constantine (a gold cross on red) with the colours reversed; some instead link them to the age of the " +
      "First Crusade.",
    sources: [
      { title: "Stemma di Lodi — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Lodi" },
    ],
  },

  "IT-LT": {
    description:
      "Latina was founded in 1932 as “Littoria”, the chief new town of the great reclamation of the Pontine " +
      "Marshes, and renamed Latina in 1946. Its arms recall that origin: golden ears of wheat rising from the " +
      "drained black-and-silver marsh, for the fields won from the swamp.",
    sources: [
      { title: "Stemma della Città di Latina — Agraldica", url: "http://www.agraldica.it/" },
    ],
  },

  "IT-LU": {
    description:
      "Lucca’s flag is party per pale white and red; its arms are blue with the word “LIBERTAS” in gold across " +
      "the centre. The motto records Lucca’s long life as an independent republic — one of the few Italian " +
      "city-states to keep its freedom, between powerful Florence and Pisa, down to the Napoleonic age.",
    sources: [
      { title: "Stemma del Comune di Lucca — Comuni-Italiani", url: "https://www.comuni-italiani.it/046/017/stemma.html" },
    ],
  },

  "IT-MB": {
    description:
      "Monza’s arms: on blue, the Iron Crown (Corona Ferrea) and the cross of King Berengar, ringed by the motto " +
      "“Est sedes Italiae Regni Modoetia magni” (“Monza is the seat of the great Kingdom of Italy”). The Iron " +
      "Crown, kept in Monza’s cathedral, holds an iron band said to be from a nail of the Crucifixion, and " +
      "crowned the kings of Italy.",
    sources: [
      { title: "Stemma di Monza — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Monza" },
    ],
  },

  "IT-MC": {
    description:
      "Macerata’s arms: red quartered by two black fillets, with a silver cross in the first and fourth quarters " +
      "and a silver millstone (mola) in the second and third — the millstone a canting reference to the city’s " +
      "name.",
    sources: [
      { title: "Macerata diventa città — Notiziario Araldico", url: "https://www.notiziarioaraldico.info/2022041918187/macerata-diventa-citta/" },
    ],
  },

  "IT-ME": {
    description:
      "Messina’s flag is red with a golden cross reaching the edges (adopted 1988); the arms add two vine " +
      "branches with golden grapes. The red and gold are the colours of the Crown of Aragon that long ruled " +
      "Sicily; tradition, without historical proof, traces the gold cross on red to late antiquity.",
    sources: [
      { title: "Stemma di Messina — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Messina" },
    ],
  },

  "IT-MI": {
    description:
      "Milan’s flag is white with a red cross. Adopted in the 12th century as a sign of the commune’s autonomy " +
      "from the Empire, it is the red cross of the Crusaders on their white robes; the city’s patron Saint " +
      "Ambrose is shown bearing it, and it was the banner of the Duchy of Milan from 1395 to 1797.",
    sources: [
      { title: "Simboli di Milano — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Simboli_di_Milano" },
    ],
  },

  "IT-MN": {
    description:
      "Mantua’s arms: on silver, a red cross with, in the first quarter, the bust of Virgil — the poet born at " +
      "Mantua. The red cross has been the city’s emblem since the 12th century, when the Empire recognised the " +
      "commune.",
    sources: [
      { title: "Stemma di Mantova — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Mantova" },
    ],
  },

  "IT-MO": {
    description:
      "Modena’s arms: on gold, a blue cross behind two crossed augers (trivelle), with the motto “Avia pervia” " +
      "(“the impassable made passable”). The augers stand for the boring of wells, an emblem of the city’s tenacity " +
      "in making the hardest way easy — reaching the water and riches of the Modenese underground.",
    sources: [
      { title: "Stemma di Modena — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Modena" },
    ],
  },

  "IT-MS": {
    description:
      "Massa’s flag bears the arms of the Cybo-Malaspina, the princes who made it their capital (“Massa Cybea”): " +
      "the flowering thorn of the Malaspina and the cross and chequed band of the Cybo, with the Medici balls at " +
      "the heart — the marriage of the three houses in Alberico I, a prince of the Holy Roman Empire.",
    sources: [
      { title: "Massa (Italia) — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Massa_(Italia)" },
    ],
  },

  "IT-MT": {
    description:
      "Matera’s arms: an ox with three ears of wheat in its mouth, an “M” above, and the motto “Bos lassus " +
      "firmius figit pedem” (“the tired ox plants its foot the firmer”). The gentle, hard-working ox and the " +
      "wheat stand for the city’s farming and herding; the motto warns that a patient people, worn by abuses, " +
      "will in the end resist.",
    sources: [
      { title: "Lo stemma di Matera ed il suo significato — WikiMatera", url: "https://www.wikimatera.it/guida-di-matera/la-storia-millenaria-di-matera/lo-stemma-di-matera-ed-il-suo-significato/" },
    ],
  },

  "IT-NA": {
    description:
      "Naples’ flag is party per fess gold over red. The gold stands for the sun that lights and quickens " +
      "nature, the red for the purple robe of kings and great men; the two colours have marked the city since at " +
      "least a parchment of 1325.",
    sources: [
      { title: "Stemma di Napoli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Napoli" },
    ],
  },

  "IT-NU": {
    description:
      "Nuoro’s arms bring together an ox, a mountain and a sun — the mountain being Monte Ortobene, the granite " +
      "peak the Nuoresi hold sacred and simply call “su Monte” (“the Mountain”), the soul of the city that rises " +
      "above it.",
    sources: [
      { title: "Stemma del Comune di Nuoro — Comuni-Italiani", url: "https://www.comuni-italiani.it/091/051/stemma.html" },
    ],
  },

  "IT-PA": {
    description:
      "Palermo’s flag is red (porpora) with a golden eagle, its wings spread, lettered “S.P.Q.P.” — Senatus " +
      "PopulusQue Panormitanus, “the Senate and People of Palermo”. The eagle, an emblem of nobility and of the " +
      "power of Rome, has been the city’s device since the Middle Ages.",
    sources: [
      { title: "Stemma di Palermo — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Palermo" },
    ],
  },

  "IT-PC": {
    description:
      "Piacenza’s arms: quartered, a silver square on red and a she-wolf on silver. The she-wolf is the " +
      "Capitoline wolf of Rome, for Piacenza’s standing as the first Roman colony (founded in 218 BC with " +
      "Cremona); the square is read as the Roman camp (castrum). Its banner styles the city “Primogenita " +
      "d’Italia”, Italy’s firstborn.",
    sources: [
      { title: "Stemma del Comune di Piacenza — Comuni-Italiani", url: "https://www.comuni-italiani.it/033/032/stemma.html" },
    ],
  },

  "IT-PD": {
    description:
      "Padua’s flag is silver with a red cross — the “biancoscudata”, the city’s emblem since the 12th century " +
      "and the Lombard League. The red is read for the blood shed in defence of liberty, the white for faith and " +
      "justice.",
    sources: [
      { title: "Bandiera Biancoscudata di Padova — PadovaClick", url: "https://www.padovaclick.com/notizie/visitare/bandiera-biancoscudata-di-padova-storia-e-origini.php" },
    ],
  },

  "IT-PE": {
    description:
      "Pescara’s arms record the 1927 union of two towns across the river: a golden pale down the middle is the " +
      "river Pescara, a tower with a church stands for the old borgo of Pescara, and a battlemented castle for " +
      "Castellammare Adriatico on the far bank. Its motto calls the city the “gate of the Abruzzi”.",
    sources: [
      { title: "Stemma di Pescara — La Cultura Italica", url: "https://www.culturaitalica.it/blogs/stemmi-delle-citta-ditalia/stemma-di-pescara-storia-e-significato" },
    ],
  },

  "IT-PG": {
    description:
      "Perugia’s flag is red with a crowned silver griffin. The griffin — half lion, half eagle — joins the " +
      "strength of the king of beasts to the vigilance of the king of birds, standing for nobility, courage and " +
      "wisdom; of Etruscan descent, it has been the city’s emblem since the Middle Ages.",
    sources: [
      { title: "Stemma del Comune di Perugia — Comuni-Italiani", url: "https://www.comuni-italiani.it/054/039/stemma.html" },
    ],
  },

  "IT-PI": {
    description:
      "Pisa’s flag is red with a white “croce pisana” — a cross with arms that widen and end in little discs. " +
      "The red banner was granted the maritime republic by Barbarossa; the white cross, added later, marks the " +
      "Pisan people, their Christian faith (Pisa was a keen Crusader) and their communal liberty.",
    sources: [
      { title: "Stemma e bandiera di Pisa — Progetto Regioni", url: "https://progettoregioni.wordpress.com/2009/01/19/stemma-e-la-bandiera-di-pisa/" },
    ],
  },

  "IT-PN": {
    description:
      "Pordenone’s arms show an open gate over waves — for Portus Naonis, the “port of the Noncello”, which gives " +
      "the city its name. The open river-gate marks its life as a port trading down to Venice and the Adriatic; " +
      "two golden crowns record the full judicial authority it enjoyed.",
    sources: [
      { title: "Stemma della città — Comune di Pordenone", url: "https://www.comune.pordenone.it/it/citta/scopri/stemma" },
    ],
  },

  "IT-PO": {
    description:
      "Prato’s arms: red strewn with golden lilies (fiordalisi) beneath the Angevin chief — blue with three " +
      "golden fleurs-de-lis and a red rake. The Angevin chief is a Guelph badge granted by the House of Anjou to " +
      "cities loyal to it.",
    sources: [
      { title: "Stemma e gonfalone del Comune di Prato — Comune di Prato", url: "https://www.comune.prato.it/it/per-i-cittadini/cittadinanza/immagine-coordinata-prato/stemma-e-gonfalone/pagina1147.html" },
    ],
  },

  "IT-PR": {
    description:
      "Parma’s arms: a blue cross on gold beneath a ducal crown, with the motto “Hostis turbetur quia Parmam " +
      "Virgo tuetur” (“let the enemy tremble, for the Virgin guards Parma”), from the vow made when the city broke " +
      "Frederick II’s siege in 1248. The cross dates to the commune (once silver on red); the Farnese dukes gave " +
      "it their gold and blue.",
    sources: [
      { title: "Stemma del Comune di Parma — Comuni-Italiani", url: "https://www.comuni-italiani.it/034/027/stemma.html" },
    ],
  },

  "IT-PT": {
    description:
      "Pistoia’s arms are chequy of silver and red, supported by two bears in chequy cloaks. The chessboard is " +
      "linked to the game of chess as a mock-battle — a claim of the city’s martial standing against rival " +
      "Florence — and the fierce bear was set up in answer to Florence’s lion, the Marzocco.",
    sources: [
      { title: "Stemma di Pistoia — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Pistoia" },
    ],
  },

  "IT-PU": {
    description:
      "Pesaro’s flag carries the city’s arms: a golden oak on blue, crossed by two pairs of clasped hands and " +
      "a scroll with the motto “Perpetua et firma fidelitas” (steadfast and lasting loyalty), above a base " +
      "quartered white and red. Duke Guidobaldo II della Rovere gave the city his family’s oak — rovere — a " +
      "few days before he died in Pesaro in 1574, asking for it to be set above the white-and-red quarters " +
      "with the clasped hands and the motto, and to be named the city’s Lord and Father.",
    sources: [
      { title: "Pesaro § Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Pesaro#Simboli" },
    ],
  },

  "IT-PV": {
    description:
      "Pavia’s arms: on red, a white Latin cross flanked by the letters “C O · P P” — for Commune Papiae, the " +
      "Comune of Pavia (Papia was the city’s Latin name). The arms go back before 1300.",
    sources: [
      { title: "Stemma del Comune di Pavia — Comuni-Italiani", url: "https://www.comuni-italiani.it/018/110/stemma.html" },
    ],
  },

  "IT-PZ": {
    description:
      "Potenza’s arms: on blue, a crowned golden lion on a red bend with three silver stars above. The lion is " +
      "the city’s ancient emblem — “the lions do not retreat” — laurel for glory and oak for strength framing " +
      "the shield.",
    sources: [
      { title: "Lo Stemma della Città di Potenza — Comune di Potenza", url: "https://www.comune.potenza.it/?p=26" },
    ],
  },

  "IT-RA": {
    description:
      "Ravenna’s arms: fields of gold and red with two counter-rampant lions facing a green pine tree at the " +
      "centre. The gold-and-red descend from the Da Polenta lords (their red eagle and the golden Lion of Saint " +
      "Mark); the pine recalls Ravenna’s famous pineta, the pine forest along its shore.",
    sources: [
      { title: "Stemma del Comune di Ravenna — Comuni-Italiani", url: "https://www.comuni-italiani.it/039/014/stemma.html" },
    ],
  },

  "IT-RC": {
    description:
      "Reggio Calabria’s arms show Saint George spearing the dragon above a kneeling, crowned maiden. The city " +
      "took Saint George as patron after a legend that he aided Count Roger in battle; the motto styles it “Urbs " +
      "Rhegina… fidelissima, provinciae prima mater et caput” — the noble, most faithful city, first mother and " +
      "head of the province.",
    sources: [
      { title: "Stemma di Reggio Calabria — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Reggio_Calabria" },
    ],
  },

  "IT-RE": {
    description:
      "Reggio Emilia’s arms: on silver, a red cross cantoned by the letters S·P·Q·R, under a mural crown. Reggio " +
      "is also the birthplace of the Italian tricolour, first proclaimed here on 7 January 1797 by the Cispadane " +
      "Republic.",
    sources: [
      { title: "Stemma del Comune di Reggio Emilia — Comuni-Italiani", url: "https://www.comuni-italiani.it/035/033/stemma.html" },
    ],
  },

  "IT-RI": {
    description:
      "Rieti’s arms: red above with a knight and a woman handing him a standard, and blue below with a net and " +
      "three fish for the waters and fishing of the Velino. Rieti is traditionally the “Umbilicus Italiae”, the " +
      "geographic navel of Italy named by its ancient son Varro.",
    sources: [
      { title: "Stemma di Rieti — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Rieti" },
    ],
  },

  "IT-RO": {
    description:
      "Rovigo’s arms bear the winged Lion of Saint Mark with an open book above a golden tower — the mark of the " +
      "city’s long belonging to the Republic of Venice.",
    sources: [
      { title: "Bandiera di Rovigo — Bandiere.it", url: "https://www.bandiere.it/bandiera-rovigo" },
    ],
  },

  "IT-SA": {
    description:
      "Salerno’s arms: party per fess, blue above with Saint Matthew, the city’s patron, and barry of gold and " +
      "red below — the arms of Hungary, given by Charles II of Anjou, king of Naples. Saint Matthew was set on " +
      "the shield after a storm was believed to have destroyed Barbarossa’s pirate fleet threatening the city in " +
      "1544.",
    sources: [
      { title: "Stemma di Salerno — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Salerno" },
    ],
  },

  "IT-SI": {
    description:
      "Siena’s civic banner is the balzana: a shield parted per fess, silver (white) above and black below. " +
      "Tradition ties the two colours to the black and white smoke that rose from the horses of Senio and Aschio " +
      "(Senius and Aschius), the legendary founders and sons of Remus, as they fled and founded the city. Alongside " +
      "the balzana the city uses the lupa — the she-wolf suckling the twins — echoing Siena’s claimed Roman origin.",
    sources: [
      { title: "Stemma di Siena — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Siena" },
    ],
  },

  "IT-SO": {
    description:
      "Sondrio’s arms, on an azure field, show two silver swords with gold hilts crossed point-upward with two " +
      "green palm branches, and a gold fleur-de-lis in chief. The crossed swords and palms recall the martyrdom of " +
      "the city’s patrons, Saints Gervasius and Protasius, while the fleur-de-lis marks Sondrio’s historic Guelph " +
      "allegiance under the Vitani, who opposed Como’s Rusconi from the twelfth century.",
    sources: [
      { title: "Sondrio — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Sondrio" },
    ],
  },

  "IT-SP": {
    description:
      "La Spezia’s arms, on blue, show a crenellated tower standing on a green three-peaked mount and surmounted by " +
      "a crowned black eagle with spread wings. The tower derives from the insignia of the medieval Podesteria of " +
      "Carpena, from which La Spezia won its independence, and stands for the fortifications guarding the gulf; the " +
      "three-peaked mount evokes the city’s hills, and the crowned eagle signifies power and sovereignty.",
    sources: [
      { title: "Stemma di La Spezia — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/La_Spezia" },
    ],
  },

  "IT-SR": {
    description:
      "Syracuse flies a green gonfalone bearing its arms: an eagle with a turreted tower on its breast. The eagle " +
      "stands for command, power and victory and Syracuse’s tie to imperial authority — the city is said to have " +
      "asked Henry VI of Swabia to add the eagle to the Swabian arms — while the tower is the surviving charge of " +
      "the older city arms. The present arms and green banner were granted by royal decree of 8 December 1942.",
    sources: [
      { title: "Stemma di Siracusa — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Siracusa" },
    ],
  },

  "IT-SS": {
    description:
      "Sassari’s arms, granted by King Carlo Emanuele III in 1767, are quartered: the first and fourth quarters " +
      "bear Savoy (a silver cross on red), the second and third a red crenellated castle on gold. The castles " +
      "recall the Giudicato di Torres and the ancient Turris Libisonis (Porto Torres); the Savoy cross marks the " +
      "city’s passage to the House of Savoy. Two horses support the shield, honouring the medieval podestà " +
      "Cavallino de Honestis, and the gonfalone is a richly gold-embroidered red cloth.",
    sources: [
      { title: "Stemma di Sassari — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Sassari" },
    ],
  },

  "IT-SV": {
    description:
      "Savona’s municipal flag is a horizontal triband of red, white and red — the civic colours drawn from its " +
      "arms, which show a silver pale on red beneath a gold chief charged with a rising black eagle with spread " +
      "wings. The arms were entered in the Heraldic Register in 1938.",
    sources: [
      { title: "Stemma di Savona — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Savona" },
    ],
  },

  "IT-TA": {
    description:
      "Taranto’s arms, on blue, show the young sea-god Taras riding a dolphin, nude, a billowing cloth on one arm " +
      "and a trident in the other, beneath a red chief bearing a gold scallop shell flanked by the Greek letters " +
      "spelling ΤΑΡΑΣ (Taras). The image is taken from the coins of Magna Graecia struck at the city’s height: the " +
      "dolphin recalls the two seas that embrace Taranto and its maritime life, the trident divine power over the " +
      "waters, and Taras is the mythical founder and eponym of the city.",
    sources: [
      { title: "Stemma di Taranto — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Taranto" },
    ],
  },

  "IT-TN": {
    description:
      "Trento flies a flag of three horizontal stripes — yellow, light blue, yellow — charged with the Aquila di " +
      "San Venceslao (Eagle of Saint Wenceslaus): a black spread eagle, beaked and armed, its wings set with gold " +
      "trefoil stems and its body strewn with red flames. King John of Luxembourg granted the eagle to the " +
      "prince-bishopric at Breslau in 1339; it has been the city’s emblem since 1407 and signals Trento’s tie to " +
      "the Holy Roman Empire and its prince-bishops.",
    sources: [
      { title: "Aquila di San Venceslao — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Aquila_di_San_Venceslao" },
      { title: "Trento — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Trento" },
    ],
  },

  "IT-TO": {
    description:
      "Turin’s flag is azure divided by a white cross into four quarters, a gold bull rampant in each, and the year " +
      "1706 — the banner carried by the civic militia during the Siege of Turin in the War of the Spanish " +
      "Succession, when the city held out. The bull is canting arms (arma parlante): toro for Torino, echoing the " +
      "city’s name and, by legend, the ancient Taurini. The city arms proper are a single gold furious bull with " +
      "silver horns on blue.",
    sources: [
      { title: "Stemma di Torino — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Torino" },
    ],
  },

  "IT-CN": {
    description:
      "Cuneo’s municipal flag is a cloth divided white and red — the city’s civic colours. Its arms, granted in " +
      "1936, are a Savoy quartering (including Savoy modern, a silver cross on red) recalling the House of Savoy " +
      "that ruled the city; the crown is accompanied by the motto Ferendo (‘by enduring’). The motto marks Cuneo’s " +
      "reputation as the ‘city of the seven sieges’, its arms tied to the heroic defence of 1557.",
    sources: [
      { title: "Cuneo — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Cuneo" },
    ],
  },

  "IT-NO": {
    description:
      "Novara’s arms, recognised in 1928, are simply a silver cross on a red shield — the badge shared by many " +
      "medieval Italian cities of the Ghibelline (pro-imperial) party during the struggle between Empire and " +
      "Papacy. The city gonfalone is a white cloth richly worked in gold.",
    sources: [
      { title: "Novara — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Novara" },
    ],
  },

  "IT-TP": {
    description:
      "Trapani’s arms, on red, show a gold three-arched bridge bearing five towers over a wavy blue-and-silver sea, " +
      "surmounted by a gold sickle laid fesswise. The sickle is canting: the city’s Greek name Drepanon means " +
      "‘sickle’, for the curved, sickle-shaped promontory on which Trapani sits. The five towers stand for the " +
      "city’s old defensive fortifications and the sea for its maritime life.",
    sources: [
      { title: "Stemma di Trapani — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Trapani" },
    ],
  },

  "IT-TR": {
    description:
      "Terni flies a vertical bicolour of green and red — the civic colours taken from its arms, which show the " +
      "Thyrus (Tiro), a green winged, scaled dragon crowned in gold, rampant on red. The dragon recalls the " +
      "legendary local hero who slew a monster terrorising the valley; the arms carry the motto " +
      "‘Thyrus et amnis dederunt signa Teramnis’ — the dragon and the river (the Nera) gave Terni its emblems.",
    sources: [
      { title: "Terni — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Terni" },
    ],
  },

  "IT-TS": {
    description:
      "Trieste bears on a red gothic shield a silver halberd — the alabarda di San Sergio. By legend the weapon " +
      "fell from the sky onto the city’s main square on the day in 336 that Saint Sergius was martyred in Persia, " +
      "the heavenly sign he had promised his fellow Christians in Trieste. The halberd, long kept in the treasury " +
      "of San Giusto cathedral, has served as the city’s emblem since the thirteenth century (it appears on coins " +
      "struck 1237–1253).",
    sources: [
      { title: "Stemma di Trieste — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Trieste" },
    ],
  },

  "IT-TV": {
    description:
      "Treviso’s white-and-blue flag carries its arms: a red shield with a silver cross, two eight-pointed silver " +
      "stars in the upper corners. In Italian heraldry the silver cross signals the city’s medieval Guelph " +
      "(pro-papal) allegiance; the branches of oak and laurel tied with a tricolour ribbon are later honours.",
    sources: [
      { title: "Treviso — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Treviso" },
    ],
  },

  "IT-UD": {
    description:
      "Udine’s black-and-white flag carries its arms: a silver shield with a black chevron, crested by a rising " +
      "silver horse. These are the arms of the Savorgnan, the leading medieval family of Udine, adopted as the " +
      "city’s own; the arms were formally granted in 1939.",
    sources: [
      { title: "Udine — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Udine" },
    ],
  },

  "IT-VA": {
    description:
      "Varese flies a white flag charged with a red cross — the Cross of Saint George, and the city’s red-and-white " +
      "colours. Its fuller arms are red with a silver pale above and plain silver below, ensigned with the figure " +
      "of Saint Victor (San Vittore), the city’s patron, bearing a red-cross banner and a martyr’s palm.",
    sources: [
      { title: "Bandiera di Varese — Bandiere.it", url: "https://www.bandiere.it/bandiera-varese" },
      { title: "Varese — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Varese" },
    ],
  },

  "IT-VE": {
    description:
      "Venice’s red gonfalone bears the winged Lion of Saint Mark: a gold lion, haloed, one paw resting on an open " +
      "book reading ‘PAX TIBI MARCE EVANGELISTA MEUS’ (Peace be with you, Mark, my Evangelist). The lion is Saint " +
      "Mark, the city’s patron; the halo marks his sanctity, the book his gospel and the peace of the Republic. In " +
      "honour of Venice’s republican past the shield is crowned not with a mural crown but with the doge’s horned " +
      "cap (corno ducale).",
    sources: [
      { title: "Stemma di Venezia — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Venezia" },
    ],
  },

  "IT-VI": {
    description:
      "Vicenza is the only Italian municipality that uses the national tricolour as its civic banner, with the city " +
      "arms — a silver cross on red — on the white central band. The city adopted the tricolour by council vote in " +
      "1866 after being awarded its first gold medal for military valour; a second medal followed, and the banner " +
      "receives the ceremonial honours of a war flag.",
    sources: [
      { title: "Vicenza — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Vicenza" },
    ],
  },

  "IT-VR": {
    description:
      "Verona’s arms are a gold cross on a blue field. The device was adopted around the mid-thirteenth century, " +
      "when Verona was a free commune, replacing an earlier white cross on red; the gold and blue are drawn from " +
      "the banner of the Veronese guilds (the ‘arti’) and became the city’s heraldic colours.",
    sources: [
      { title: "Verona — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Verona" },
    ],
  },

  "IT-VT": {
    description:
      "Viterbo’s flag shows the city colours, blue and gold (yellow), taken from its arms: on azure, a crowned gold " +
      "lion standing on a green field before a red-fruited palm. The lion recalls Viterbo’s Roman origin as " +
      "Castrum Herculis (Fort of Hercules); the palm was taken as a trophy from the rival town of Ferento, which " +
      "Viterbo destroyed in 1172, so the lion is shown ‘collared’ to the palm.",
    sources: [
      { title: "Stemma di Viterbo — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Stemma_di_Viterbo" },
    ],
  },

  "IT-VV": {
    description:
      "Vibo Valentia’s arms, on a quartered gold-and-red shield with a blue chief, combine three green mounts " +
      "charged with a rampant lion and two cornucopias (horns of plenty) with an owl-topped staff — symbols of " +
      "abundance and of wisdom. The shield is crowned with a ducal coronet and bears the motto S.P.Q.V. " +
      "(Senatus Populusque Vibonensis); the city flag is a cloth split azure and red from the shield’s colours.",
    sources: [
      { title: "Vibo Valentia — Simboli — Wikipedia (it)", url: "https://it.wikipedia.org/wiki/Vibo_Valentia" },
    ],
  },

  // ── Japan — prefectural-capital city emblems (市章) ─────────────────────────
  "JP-01": {
    description:
      "Sapporo’s emblem, adopted in 1911, layers several meanings. The outer hexagon is a six-petalled snow " +
      "crystal, symbol of Hokkaidō; the inner circular figure stylises the character 「札」 (satsu) of Sapporo and " +
      "doubles as the katakana 「ロ」 (ro); and the central star recalls the Big Dipper — the ‘north’ — while forming " +
      "the katakana 「ホ」 (ho). Read together the parts spell ‘Ho-ro’, for Hokkaidō and Sapporo.",
    sources: [
      { title: "札幌市徽章 — City of Sapporo (official)", url: "https://www.city.sapporo.jp/ncms/reiki/d1w_reiki_nonframe/H144909140800A/H144909140800A_j.html" },
    ],
  },

  "JP-02": {
    description:
      "Aomori’s emblem, adopted in 2005, stylises the character 「青」 (ao) of the city’s name: the circle is the " +
      "‘moon’ (月) element of 青, and the seven points of the star are the remainder of the character, likened to " +
      "the Big Dipper (北斗七星) — marking Aomori as the northern tip of Honshū.",
    sources: [
      { title: "市のシンボル — City of Aomori (official)", url: "https://www.city.aomori.aomori.jp/shiseijouhou/aomorishi-konnamati/symbol/index.html" },
    ],
  },

  "JP-03": {
    description:
      "Morioka’s emblem is two lozenges crossed at right angles, a mark borne on the jingasa helmets of the domain " +
      "era. The lozenge refers to the Nanbu clan’s descent from the Kai Genji; it is also read as a stylised " +
      "folded crane, echoing the Nanbu ‘crane’ crest. Morioka grew as the castle town of the Nanbu.",
    sources: [
      { title: "市章と市のシンボル — City of Morioka (official)", url: "https://www.city.morioka.iwate.jp/shisei/morioka_profile/1009294.html" },
    ],
  },

  "JP-04": {
    description:
      "Sendai’s emblem, fixed in 1933, is based on the ‘three-line’ crest (三ツ引両, mitsu-hikiryō) of the Date clan, " +
      "the city’s founding lords, worked so as to form the character 「仙」 (sen) of Sendai. Having no prescribed " +
      "colour, it is popularly shown in green for the ‘City of Trees’ (杜の都).",
    sources: [
      { title: "紋章 — City of Sendai (official)", url: "https://www.city.sendai.jp/chosatoke/shise/toke/gaikyo/monsho.html" },
    ],
  },

  "JP-05": {
    description:
      "Akita’s emblem, adopted in 1928, combines a target bearing the ‘arrow-stop’ form (矢留, yadome) — a device of " +
      "the Satake clan, former lords of the Akita domain — with the character 「田」 (ta) of the city’s name.",
    sources: [
      { title: "市章と市のシンボル — City of Akita (official)", url: "https://www.city.akita.lg.jp/shisei/shokai/1027566.html" },
    ],
  },

  "JP-06": {
    description:
      "Yamagata’s emblem, adopted in 1954, forms the character 「山」 (yama) of the city’s name. Its three inner " +
      "strokes stand for liberty, equality and fraternity, the outer circle for unity, and the sharp lower angle " +
      "for firm resolve.",
    sources: [
      { title: "市の概要 — City of Yamagata (official)", url: "https://www.city.yamagata-yamagata.lg.jp/shiseijoho/yamagatajoho/1008447.html" },
    ],
  },

  "JP-07": {
    description:
      "Fukushima’s emblem arranges nine 「フ」 (fu) and four 「マ」 (ma) — the katakana of フクシマ (Fukushima) — within a " +
      "frame, expressing great development contained within the city’s four bounds.",
    sources: [
      { title: "市章 — City of Fukushima (official)", url: "https://www.city.fukushima.fukushima.jp/soshiki/3/1006/1/828.html" },
    ],
  },

  "JP-08": {
    description:
      "Mito’s emblem, adopted in 1933, stylises the character 「水」 (mi) of the city’s name, spreading vigorously in " +
      "all directions, with three 「ト」 (to) forming its core — together reading ミト (Mito). (The plum, for which " +
      "Mito’s Kairaku-en garden is famous, is the city’s tree, not part of the emblem.)",
    sources: [
      { title: "水戸市の紋章 — City of Mito (official)", url: "https://www.city.mito.lg.jp/page/4007.html" },
    ],
  },

  "JP-09": {
    description:
      "Utsunomiya’s emblem, adopted in 1911, combines a tortoise-shell hexagon (亀甲) with the character 「宮」 " +
      "(miya): Utsunomiya Castle was known as Kamegaoka — ‘tortoise-hill’ — Castle. It signifies the homeland’s " +
      "long glory and endless development.",
    sources: [
      { title: "市章・市の花・市の木 — City of Utsunomiya (official)", url: "https://www.city.utsunomiya.lg.jp/shisei/gaiyo/symbol/1007488.html" },
    ],
  },

  "JP-10": {
    description:
      "Maebashi’s emblem, adopted in 1909, is the ‘ring’ (輪貫, wanuki) taken from the horse-insignia (umajirushi) " +
      "of the Matsudaira clan, the former lords of the Maebashi domain — rendered as a simple open circle.",
    sources: [
      { title: "市の木・市の花・市章 — City of Maebashi (official)", url: "https://www.city.maebashi.gunma.jp/soshiki/seisaku/kohobrand/gyomu/3/2/3775.html" },
    ],
  },

  "JP-11": {
    description:
      "Saitama’s emblem is a modern mark built on the initial ‘S’ of the city’s name, drawn as arcs that curve to " +
      "embrace the citizens — a widening circle of harmony (和) advancing together into the future. Its green " +
      "stands for harmony with the rich nature of the Minuma paddy fields. The mark dates from the city’s founding " +
      "in 2001.",
    sources: [
      { title: "さいたま市章 — City of Saitama (official)", url: "https://www.city.saitama.lg.jp/006/012/001/007/p034488.html" },
    ],
  },

  "JP-12": {
    description:
      "Chiba’s emblem, adopted in 1921, is drawn from the ‘moon-and-star’ (月星) crest of the medieval Chiba clan, " +
      "the city’s founders, with the character 「千」 (sen) of Chiba set into it. The Chiba clan venerated Myōken — " +
      "the deified Pole Star and Big Dipper — and shared the moon-star crest as a mark of their unity.",
    sources: [
      { title: "千葉市のプロフィール — City of Chiba (official)", url: "https://www.city.chiba.jp/sogoseisaku/shichokoshitsu/kohokocho/prfindex.html" },
    ],
  },

  "JP-14": {
    description:
      "Yokohama’s emblem, the ‘Hama mark’, was created for the 50th anniversary of the port’s opening in 1909. It " +
      "stacks the two katakana ハ (ha) and マ (ma) of ‘Hama’ into a single near-diamond figure — shown red on white " +
      "— a device long cherished as the symbol of the port city.",
    sources: [
      { title: "き章・市の花 — City of Yokohama (official)", url: "https://www.city.yokohama.lg.jp/city-info/yokohamashi/gaiyo/kisyo.html" },
    ],
  },

  "JP-15": {
    description:
      "Niigata’s emblem, adopted in 1908, centres the numeral 「五」 (five) on an anchor and tops it with a " +
      "‘snow-ring’. The anchor marks Niigata as a port, and the five stands for the five treaty ports opened under " +
      "the 1858 (Ansei 5) commercial treaty — Hakodate, Niigata, Kanagawa, Hyōgo and Nagasaki — of which Niigata " +
      "is one.",
    sources: [
      { title: "新潟市民のシンボルマーク — City of Niigata (official)", url: "https://www.city.niigata.lg.jp/shisei/gaiyo/profile/koho_simbol/index.html" },
    ],
  },

  "JP-16": {
    description:
      "Toyama’s emblem places the character 「富」 (the ‘tomi’ of Toyama) within a chrysanthemum crest carried down " +
      "from the Toyama-domain era, when it served as the badge of the domain founded by Maeda Toshitsugu; it is " +
      "read as the city’s fortunes extending in every direction. On the city flag the emblem stands above a white " +
      "band evoking the snows of the Tateyama range.",
    sources: [
      { title: "富山県の市町村章一覧（富山市） — Wikipedia (ja)", url: "https://ja.wikipedia.org/wiki/富山県の市町村章一覧" },
    ],
  },

  "JP-17": {
    description:
      "Kanazawa’s emblem, adopted in 1891, sets the character 「金」 (kin) of Kanazawa inside the ‘plum-bloom’ " +
      "(梅鉢, umebachi) crest of the Maeda family, lords of the Kaga domain. The plum honours the Maeda and " +
      "Sugawara no Michizane — the ‘Tenjin’ deity famed for his love of plum blossom — and the plum is also the " +
      "city’s tree.",
    sources: [
      { title: "市章・市の木 — City of Kanazawa (official)", url: "https://www4.city.kanazawa.lg.jp/soshikikarasagasu/kohokochoka/gyomuannai/5/5/8/2074.html" },
    ],
  },

  "JP-18": {
    description:
      "Fukui’s emblem, adopted in 1926, combines the ‘well-frame’ (井桁, igeta) — for the ‘Fuku well’ within Fukui " +
      "Castle that gave the city its name — with 「北」 (kita) from Fukui’s older name Kita-no-shō (North Estate), " +
      "keeping the old while pointing to new development.",
    sources: [
      { title: "市章・市の花と木 — City of Fukui (official)", url: "https://www.city.fukui.lg.jp/fukuisi/prezen/symbol/city_flower.html" },
    ],
  },

  "JP-19": {
    description:
      "Kōfu’s emblem, adopted in 1906, is the ‘split diamond’ (割菱, waribishi) crest of the Takeda clan who ruled " +
      "from here, enclosing a tortoise-shell (亀甲). The tortoise-shell is a pictograph of 「甲」 and a token of " +
      "longevity; its joined limbs form 「本」, and since an old dictionary glosses ‘府 means 本 (foundation)’, it " +
      "stands for the 「府」 of Kōfu. The diamond’s grape-purple recalls the city’s famed grapes, the white ground " +
      "peace.",
    sources: [
      { title: "甲府市のシンボル — City of Kōfu (official)", url: "https://www.city.kofu.yamanashi.jp/koho/shise/gaiyo/profile/symbol.html" },
    ],
  },

  "JP-20": {
    description:
      "Nagano’s emblem simplifies the initial character 「長」 (naga) of the city’s name into a circular, modern " +
      "form. It is shown in ‘bamboo-blue’ (青竹色), a blend of blue — sky and clear water — and green — trees and " +
      "plants — symbolising a city that develops in harmony with its rich nature, through the concord and unity of " +
      "its people.",
    sources: [
      { title: "シンボル — City of Nagano (official)", url: "https://www.city.nagano.nagano.jp/n042000/contents/p004108.html" },
    ],
  },

  "JP-21": {
    description:
      "Gifu’s emblem, adopted in 1909, is the character 「井」 from the district’s old name Ino-kuchi (井の口). When " +
      "Oda Nobunaga took the area he renamed it ‘Gifu’, spreading the name nationwide; the city keeps the older " +
      "「井」 as its symbol in memory of that history.",
    sources: [
      { title: "市のシンボル（市章） — City of Gifu (official)", url: "https://www.city.gifu.lg.jp/info/syoukai/1006141/1006143.html" },
    ],
  },

  "JP-22": {
    description:
      "Shizuoka’s emblem, adopted in 2003 when the city was re-founded, is built on the initial ‘S’ shared by " +
      "Shizuoka, Shimizu and the new city, drawn to express a rich cityscape where nature and urban life are in " +
      "harmony.",
    sources: [
      { title: "市章 — City of Shizuoka (official)", url: "https://www.city.shizuoka.lg.jp/s2547/s005366.html" },
    ],
  },

  "JP-23": {
    description:
      "Nagoya’s emblem is the ‘maruhachi’ — a figure 「八」 (hachi) within a circle — the combined mark used by the " +
      "Owari Tokugawa house, chosen as the city emblem in 1907. The circle is read as infinite, harmonious " +
      "expansion and the 八 as a supporting, ever-widening form: the city growing without limit.",
    sources: [
      { title: "八マーク — City of Nagoya (official)", url: "https://www.city.nagoya.jp/kankou/category/33-3-0-0-0-0-0-0-0-0.html" },
    ],
  },

  "JP-24": {
    description:
      "Tsu’s emblem, adopted in 2006 after ten municipalities merged, is a modern mark based on the kana つ (tsu). " +
      "Its green stands for the land’s greenery and its blue for the waves of Ise Bay, expressing a bright, lively " +
      "future built on the region’s nature, human ties and history.",
    sources: [
      { title: "新「津市」市章デザイン決定 — City of Tsu (official)", url: "https://www.info.city.tsu.mie.jp/gappei/jokyo/dai43kai/sisyou.html" },
    ],
  },

  "JP-25": {
    description:
      "Ōtsu’s emblem, in its present form from 1958, stylises 「大ツ」 (Ōtsu): the 「大」 forms a bird taking flight " +
      "and the 「ツ」 the sweep of Lake Biwa, together symbolising the advance of the international " +
      "culture-and-tourism city.",
    sources: [
      { title: "市章・市民憲章・市民の歌 — City of Ōtsu (official)", url: "https://www.city.otsu.lg.jp/soshiki/005/1202/g/otsucity/1390611704637.html" },
    ],
  },

  "JP-26": {
    description:
      "Kyoto’s emblem, adopted in 1960, sets a stylised character 「京」 (kyō) within a gosho-guruma — the ox-drawn " +
      "carriage of the Heian court — ringed with karakusa arabesque. It is rendered in gold and in the purple that " +
      "stands for the ancient capital.",
    sources: [
      { title: "京都市のあらまし（紋章） — City of Kyoto (official)", url: "https://www.city.kyoto.lg.jp/sogo/page/0000015587.html" },
    ],
  },

  "JP-27": {
    description:
      "Osaka’s emblem is the miotsukushi (澪標), a wooden channel-marker once set in the shallows of Naniwa Bay to " +
      "show ships the safe fairway. Long celebrated as the ‘city of water’, Osaka — whose prosperity rested on its " +
      "waterways and shipping — took the marker as its emblem in the Meiji era.",
    sources: [
      { title: "市名・市章・市歌 — City of Osaka (official)", url: "https://www.city.osaka.lg.jp/seisakukikakushitsu/page/0000010271.html" },
    ],
  },

  "JP-28": {
    description:
      "Kobe’s emblem, adopted in 1907, stylises the katakana カ (ka) of ‘Kaube’ (カウベ), the old spelling of Kōbe. " +
      "It also evokes the fan — Kobe’s harbour was called the ‘fan port’, its old Hyōgo and Kōbe harbours " +
      "resembling two fans — and carries the suggestion of an anchor. It is shown white on the green city flag.",
    sources: [
      { title: "神戸のシンボル（市章・花） — City of Kobe (official)", url: "https://www.city.kobe.lg.jp/a57337/shise/about/energy/symbol.html" },
    ],
  },

  "JP-29": {
    description:
      "Nara’s emblem, adopted in 1903, is shaped as the Nara yae-zakura (八重桜, double cherry blossom) long " +
      "associated with the city, with the character 「奈」 at its centre. The 「示」 part of 奈 is figured as the " +
      "‘three lights’ (三光) — sun, moon and star — recalling the legend that a bush warbler was taught the " +
      "‘three-light’ call at Mount Mikasa.",
    sources: [
      { title: "市章・市旗 — City of Nara (official)", url: "https://www.city.nara.lg.jp/soshiki/3/2223.html" },
    ],
  },

  "JP-30": {
    description:
      "Wakayama’s emblem, adopted in 1908, combines the three mountains that ring the city with a white arrow " +
      "driving through them — the momentum of Wakayama’s growth and its citizens’ energy — around a double circle " +
      "that stylises the katakana カ (ka), its outer ring standing for ワ (wa), of ‘Waka-yama’.",
    sources: [
      { title: "和歌山市き章 — City of Wakayama (official)", url: "https://www.city.wakayama.wakayama.jp/shisei/wakayama/1001005/1001036.html" },
    ],
  },

  "JP-31": {
    description:
      "Tottori’s emblem, adopted in 1915, overlays the circle (○) and lozenge (◇) marks used as seals in the old " +
      "Inaba-Hōki (因伯) domain and sets the character 「鳥」 (tori) in small-seal script within them. The circle was " +
      "taken to stand for the literary arts and the lozenge for the martial — their union expressing the balanced " +
      "development of the city.",
    sources: [
      { title: "鳥取市の記章 — City of Tottori (official)", url: "https://www.city.tottori.lg.jp/www/contents/1191225738718/index.html" },
    ],
  },

  "JP-32": {
    description:
      "Matsue’s emblem stylises the character 「松」 (matsu, pine) of the city’s name: the outer ring stands for " +
      "Kameda, the hill of the castle site, and the inner figure for pine needles.",
    sources: [
      { title: "徽章（市章） — City of Matsue (official)", url: "https://www.city.matsue.lg.jp/soshikikarasagasu/somubu_somuka/shinogaiyo/3076.html" },
    ],
  },

  "JP-33": {
    description:
      "Okayama’s emblem, adopted in 1900, stylises the character 「岡」 (oka) at its centre, ringed by the hills — " +
      "Ishiyama, Tenjinyama — that gave the city its name; it expresses boundless development in every direction, " +
      "the white cross standing for purity and limitless expansion.",
    sources: [
      { title: "市章・市民憲章 — City of Okayama (official)", url: "https://www.city.okayama.jp/shisei/0000020691.html" },
    ],
  },

  "JP-34": {
    description:
      "Hiroshima’s emblem, adopted in 1896, is drawn from the ‘three-pull’ (三つ引, mitsu-hiki) banner of the former " +
      "Geishū (Hiroshima) domain, its three bars given flowing curves to represent the city’s rivers — symbolising " +
      "Hiroshima as a ‘water capital’ (水都) on its delta.",
    sources: [
      { title: "市章 — City of Hiroshima (official)", url: "https://www.city.hiroshima.lg.jp/shisei/gaiyo/1021752/1020296.html" },
    ],
  },

  "JP-35": {
    description:
      "Yamaguchi’s emblem, adopted in 1944, forms the city’s name 「山口」: the round 口 becomes a circle read as the " +
      "sun, and 山 a bird flying toward it, while the bold ring expresses an all-embracing spirit and the citizens’ " +
      "cooperation in the city’s growth.",
    sources: [
      { title: "山口市の「市章」 — City of Yamaguchi (official)", url: "https://www.city.yamaguchi.lg.jp/soshiki/3/5633.html" },
    ],
  },

  "JP-36": {
    description:
      "Tokushima’s emblem, adopted in 1909, sets the character 「市」 (shi, city) beneath the ‘komochi-suji’ striped " +
      "device that was the badge of the Tokushima domain, all made into a circle — signifying that Tokushima city " +
      "is the hub of Tokushima prefecture.",
    sources: [
      { title: "市章・市の花・市の木 — City of Tokushima (official)", url: "https://www.city.tokushima.tokushima.jp/shisei/tokushima_shi/shisho.html" },
    ],
  },

  "JP-37": {
    description:
      "Takamatsu’s emblem, adopted in 1894, places the character 「高」 (taka) — in the style once flown on the " +
      "domain’s official-ship banners — within a lozenge of four pine needles that pun on the ‘matsu’ (松, pine) of " +
      "Takamatsu. Its pine-green prays for the city’s enduring prosperity.",
    sources: [
      { title: "ミニ知識（市章） — City of Takamatsu (official)", url: "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/profile/shokai/mini.html" },
    ],
  },

  "JP-38": {
    description:
      "Matsuyama’s emblem combines pine (松) and mountain (山) to write the city’s name 「松山」 — the work of the " +
      "Matsuyama-born painter Shimomura Izan. The name itself recalls the pine-clad castle hill on which Katō " +
      "Yoshiaki built Matsuyama Castle in 1603.",
    sources: [
      { title: "市章 — City of Matsuyama (official)", url: "https://www.city.matsuyama.ehime.jp/shisei/matsuyama/sisyohanauta/sisyou.html" },
    ],
  },

  "JP-39": {
    description:
      "Kōchi’s emblem, adopted in 1920, is a stylisation of the character 「高」 (kō), the first character of Kōchi.",
    sources: [
      { title: "高知県の市町村章一覧（高知市） — Wikipedia (ja)", url: "https://ja.wikipedia.org/wiki/高知県の市町村章一覧" },
    ],
  },

  "JP-40": {
    description:
      "Fukuoka’s emblem, adopted in 1909, is built from nine katakana フ (fu): six arranged into a triple-lozenge " +
      "with three smaller フ between them. Nine フ read as ‘fu-ku’ — 福, good fortune (fu also carrying the sense of " +
      "luck) — a wish that much good fortune come to the city’s people.",
    sources: [
      { title: "市章 — City of Fukuoka (official)", url: "https://www.city.fukuoka.lg.jp/shisei/profile/02.html" },
    ],
  },

  "JP-41": {
    description:
      "Saga’s emblem, adopted in 2006 when the enlarged city was formed, is a modern stylisation of the initial " +
      "‘S’ of Saga, in blue and green — the fourth city emblem in Saga’s history.",
    sources: [
      { title: "佐賀県の市町村章一覧（佐賀市） — Wikipedia (ja)", url: "https://ja.wikipedia.org/wiki/佐賀県の市町村章一覧" },
    ],
  },

  "JP-42": {
    description:
      "Nagasaki’s emblem, adopted in 1900, shapes the cursive character 「長」 (naga) as folded cranes set in a star " +
      "— evoking Nagasaki’s nickname the ‘Port of the Crane’ (鶴の港). The five 「市」 characters within record that " +
      "Nagasaki was one of the five ports opened in the Ansei era (with Hakodate, Niigata, Yokohama and Kōbe).",
    sources: [
      { title: "長崎市のシンボル — City of Nagasaki (official)", url: "https://www.city.nagasaki.lg.jp/page/2364.html" },
    ],
  },

  "JP-43": {
    description:
      "Kumamoto’s emblem, adopted in 1969, stylises the hiragana 「く」 (ku), the first syllable of the city’s name, " +
      "closed into a bold circle — expressing a city that prizes harmony and drives vigorously toward future " +
      "development.",
    sources: [
      { title: "熊本市のプロフィール（市章） — City of Kumamoto (official)", url: "https://www.city.kumamoto.jp/hpkiji/pub/detail.aspx?c_id=5&id=1928" },
    ],
  },

  "JP-44": {
    description:
      "Ōita’s emblem, adopted in 1965, is a stylisation of the name 「大分」 (Ōita); its rounded form signifies the " +
      "city’s harmonious, well-rounded development.",
    sources: [
      { title: "市章 — City of Ōita (official)", url: "https://www.city.oita.oita.jp/o001/shisejoho/annai/1118204545748.html" },
    ],
  },

  "JP-45": {
    description:
      "Miyazaki’s emblem stylises the character 「宮」 (miya) of the city’s name: the outer circle stands for peace " +
      "and the knot at its centre for unity.",
    sources: [
      { title: "市の市章・花など（シンボル） — City of Miyazaki (official)", url: "https://www.city.miyazaki.miyazaki.jp/city/public_relations/relations/366.html" },
    ],
  },

  "JP-46": {
    description:
      "Kagoshima’s emblem combines the Shimazu family crest — the ‘cross within a circle’ (丸に十の字) of the lords " +
      "of Satsuma — with the character 「市」, four arrows radiating out to symbolise the city developing in every " +
      "direction. On the city flag the black emblem stands above a red silhouette of Sakurajima, the volcano that " +
      "overlooks the city.",
    sources: [
      { title: "市の花・木、市の紋章 — City of Kagoshima (official)", url: "https://www.city.kagoshima.lg.jp/soumu/shichoshitu/kouhou/shokai/monsho.html" },
    ],
  },

  "JP-47": {
    description:
      "Naha’s emblem, adopted in 1921, arranges the katakana 「ナハ」 (Naha) into a circular form, expressing the " +
      "city’s endless development.",
    sources: [
      { title: "市のシンボル・市歌・憲章 — City of Naha (official)", url: "https://www.city.naha.okinawa.jp/admin/cityhall/profile/symbol.html" },
    ],
  },

  "KG-C": {
    description:
      "Bishkek’s flag is blue, bearing the city arms in a white disc: a fortress silhouette — for Pishpek, which " +
      "began as a fortress, standing for the strength of governing power — with the name «Бишкек» beneath a jagged " +
      "mountain line, and on the fortress wall a white snow leopard (irbis) set in a square within a circle. The " +
      "irbis, an ancient Kyrgyz totem, stands for courage, will and endurance; the square and circle for the unity " +
      "of space and time. Adopted in 1994.",
    sources: [
      { title: "Флаг города Бишкек — Геральдика.ру", url: "https://geraldika.ru/s/4636" },
      { title: "Герб Бишкека — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/Герб_Бишкека" },
    ],
  },

  "KG-O": {
    description:
      "Osh flies a flag divided by a zigzag line between blue above and white below, charged with a red tündük — " +
      "the crown of a yurt’s roof. The broken dividing line stands for the sacred mountain Sulayman-Too that rises " +
      "over the city; blue signifies aspiration and freedom, white perfection and justice. Adopted in 2012.",
    sources: [
      { title: "Флаг города Ош — Геральдика.ру", url: "https://geraldika.ru/symbols/31884" },
    ],
  },

  "KG-Y": {
    description:
      "Karakol’s flag is sky-blue — for purity, the open sky and Lake Issyk-Kul, on whose shore the city stands — " +
      "bearing the central charge of the city arms: a rising sun with a horned deer’s head above wave silhouettes. " +
      "The waves stand for Lake Issyk-Kul and the Karakol river, the sun for warmth and light and water for life, " +
      "and the deer’s head for beauty and nobility.",
    sources: [
      { title: "Атрибуты — мэрия города Каракол (official)", url: "https://msukarakol.ucoz.org/index/atributy/0-10" },
    ],
  },

  "KZ-ATY": {
    description:
      "Atyrau’s flag carries the city arms on a white field between blue borders. The disc is quartered green and " +
      "gold — the two colours standing for Asia and Europe, which meet at Atyrau where the Ural river divides the " +
      "continents — over a compass-star; below, two sturgeon flank an oil derrick, for the Caspian fisheries and " +
      "the oil industry on which the city lives, all ringed with Kazakh ornament. Adopted in 1999.",
    sources: [
      { title: "Герб города Атырау — Геральдика.ру", url: "https://geraldika.ru/s/19605" },
    ],
  },

  "KZ-KUS": {
    description:
      "Kostanay’s flag bears the city arms on blue: on a shield parted azure and gold, a green inescutcheon with a " +
      "four-sailed mill for the city’s processing industry; a rising sun above; two golden eagles supporting a " +
      "scroll with the founding year 1879; and below, spools of thread for the light and chemical industries. " +
      "Approved in 1990.",
    sources: [
      { title: "Герб Костаная — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/Герб_Костаная" },
    ],
  },

  "KZ-PAV": {
    description:
      "Pavlodar’s emblem, adopted in 2015, is round, in the national colours. At its centre the name «Павлодар» is " +
      "washed by the waves of the Irtysh river; above sits a shańyraq — the crown of a yurt — from which the sun’s " +
      "rays spread over an industrial skyline, for energy and development; a cog-wheel at the base marks the " +
      "city’s industry; and a border of Kazakh ornament stands for continuity, tradition and culture.",
    sources: [
      { title: "Герб города Павлодара — Геральдика.ру", url: "https://geraldika.ru/s/10763" },
    ],
  },

  "KR-41": {
    description:
      "Suwon’s civic mark combines the Seobuk Gongsimdon — the northwest watchtower of Suwon Hwaseong fortress — " +
      "with a square, the square read as a ‘window’ opening onto a new future and the ‘land’ where citizens’ " +
      "happiness unfolds; the fortress wall and the watchtower’s banner are simplified into a modern form. Its " +
      "Royal Blue recalls the traditional Korean blue of kings and progressive spirit — and King Jeongjo, who " +
      "built Hwaseong in a spirit of reform and pragmatism — while its Smart Blue marks Suwon leading the future " +
      "as a high-tech, carbon-neutral city.",
    sources: [
      { title: "문장(CI)·시기 — City of Suwon (official)", url: "https://www.suwon.go.kr/sw-www/www05/www05-03/www05-03-07.jsp" },
    ],
  },

  "KR-42": {
    description:
      "Chuncheon’s civic mark joins the English initial ‘C’ with a heart, for a city full of communal love, in " +
      "blue tones that stand for Chuncheon’s clean sky and its blue river water. It expresses the vision of a " +
      "happy city building trust, happiness and love among its people.",
    sources: [
      { title: "시의 상징 — City of Chuncheon (official)", url: "https://www.chuncheon.go.kr/cityhall/about-chuncheon/introduction/symbol/" },
    ],
  },

  "KR-45": {
    description:
      "Jeonju’s civic mark shows a hapjukseon — the traditional Jeonju folding fan — opening dynamically. Its " +
      "elements stand for Jeonju as a city of tradition and history, a green natural-environment city, and a " +
      "future media and high-tech city; the fan’s sweeping motion expresses a creative cultural city where " +
      "tradition and future advance together on a foundation of history. The hapjukseon is a signature of " +
      "Jeonju’s traditional culture.",
    sources: [
      { title: "전주의 상징 CI — City of Jeonju (official)", url: "https://www.jeonju.go.kr/index.9is?contentUid=ff8080818990c349018b041a9e5a3a6a" },
    ],
  },

  "KR-47": {
    description:
      "Andong’s civic mark renders the city as the heart of the Confucian-scholar (seonbi) spirit and Korean " +
      "traditional culture through a taegeuk image, while reflecting its setting on the clean upper reaches of the " +
      "Nakdong river. Drawn in the traditional five cardinal colours (obangsaek) and forming a dynamic infinity " +
      "(∞) shape, its central red and blue form Andong’s ‘ㅇ’ and the taegeuk of a cultural centre, while the left " +
      "green (Andong’s ‘ㄷ’) and blue evoke the ‘mountain-taegeuk and water-taegeuk’ of the upper Nakdong.",
    sources: [
      { title: "안동마크 — City of Andong (official)", url: "https://www.andong.go.kr/portal/contents.do?mId=0301030200" },
    ],
  },

  "KR-48": {
    description:
      "Changwon’s civic mark forms the ‘C’ of Changwon as three winged figures spinning together — the city as " +
      "‘a core city bringing new hope to Korea’. Blue stands for the sea (growth and hope), orange for the city " +
      "(passion and creativity) and green for nature (life and balance); at the centre, people join hands and " +
      "turn together, for citizens of one heart advancing through harmony, balance and collaboration.",
    sources: [
      { title: "심벌마크 — Changwon City (official)", url: "https://www.changwon.go.kr/cwportal/10671/10708/10710.web" },
    ],
  },

  "KR-46": {
    description:
      "Muan County’s mark rests on a yellow-ochre square for the red-clay (hwangto) land that is the root of Muan " +
      "life; a circle at the right — a blue disc lined to read as a rising sun — stands for community and the " +
      "dynamism of Muan’s development; the blue waves below are the West Sea and the Yeongsan river, giving the " +
      "design its direction and energy; and the green leaf stands for Muan’s clean environment.",
    sources: [
      { title: "무안의 상징 상징마크 — Muan County (official)", url: "https://www.muan.go.kr/www/abountmuan/symbol" },
    ],
  },

  "LB-BA": {
    description:
      "Beirut’s arms carry two emblems of the city’s past: a Phoenician galley with a horse-head prow riding " +
      "gold-edged blue waves, for the great Phoenician port Beirut once was; and a large open book inscribed " +
      "‘BERYTUS NUTRIX LEGUM’ (Beirut, mother of laws) in Latin and Arabic, for the famed Law School of Beirut, " +
      "the first of the Roman Empire. A mural crown tops the shield.",
    sources: [
      { title: "Municipality of Beirut — Flags of the World (FOTW)", url: "https://www.crwflags.com/fotw/flags/lb-be-be.html" },
    ],
  },

  "LK-11": {
    description:
      "The seal of the Colombo Municipal Council shows a coconut palm before the Kelani river and Adam’s Peak. The " +
      "coconut palm — long the region’s main crop and a Sri Lankan emblem of prosperity and usefulness — stands " +
      "for the coastal city, and above it runs the Latin motto NON NOBIS, ‘not for ourselves’.",
    sources: [
      { title: "Seal of Colombo — Wikipedia (en)", url: "https://en.wikipedia.org/wiki/Seal_of_Colombo" },
    ],
  },

  "LT-AL": {
    description:
      "Alytus bears a white heraldic rose on red — the arms granted with Magdeburg rights by King Stephen Báthory " +
      "in 1581. In heraldry the rose is an emblem of hope and joy.",
    sources: [
      { title: "Coat of arms — Alytus city municipality (official)", url: "https://alytus.lt/en/about-alytus/coat-of-arms" },
    ],
  },

  "LT-KL": {
    description:
      "Klaipėda’s arms, on red, show a stone castle beneath which sits a boat, with four stars about the towers. " +
      "The castle is the city’s main fortress — Memel Castle — with its two guard towers; the boat stands for the " +
      "shipping and shipbuilding of the port. The design was restored from the old Memel town seals of 1446, 1605 " +
      "and 1618.",
    sources: [
      { title: "Coat of arms of Klaipėda — Wikipedia (en)", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Klaip%C4%97da" },
    ],
  },

  "LT-KU": {
    description:
      "Kaunas bears a white aurochs with a golden cross between its horns on a deep-red field. The aurochs has been " +
      "the city’s symbol since about 1400; its heraldic seal, from the reign of Grand Duke Vytautas, is the oldest " +
      "known city seal in the Grand Duchy of Lithuania.",
    sources: [
      { title: "Kaunas city municipality Coat of Arms (official)", url: "https://en.kaunas.lt/city/coat-of-arms" },
    ],
  },

  "LT-MR": {
    description:
      "Marijampolė’s arms depict Saint George on horseback slaying the dragon. Saint George is a leading patron " +
      "saint in Lithuania, his cult spreading in the fifteenth century; the mounted saint stands for the triumph " +
      "of good over evil.",
    sources: [
      { title: "Marijampolė — Heraldry of the World", url: "https://www.heraldry-wiki.com/heraldrywiki/wiki/Marijampol%C4%97" },
    ],
  },

  "LT-PN": {
    description:
      "Panevėžys shows a red brick city gate on a silver field. The mural gate is the classic sign of town rights; " +
      "the present arms were approved in 1993.",
    sources: [
      { title: "Panevėžys — Wikipedia (en)", url: "https://en.wikipedia.org/wiki/Panev%C4%97%C5%BEys" },
    ],
  },

  "LT-SA": {
    description:
      "Šiauliai’s arms, granted by King Stanisław August Poniatowski in 1791, combine three charges: a black bear — " +
      "the emblem of Samogitia, the region — the golden Eye of Providence, and a red bull, the emblem of the " +
      "Poniatowski family who granted them.",
    sources: [
      { title: "The coat of arms of Šiauliai city (official)", url: "https://www.visitsiauliai.lt/en/sightseeing-places/the-coat-of-arms-of-siauliai-city/" },
    ],
  },

  "LT-TA": {
    description:
      "Tauragė’s arms show hunting horns — the horns of the aurochs. They are canting arms: the name Tauragė joins " +
      "tauras (aurochs) and ragas (horn); the horns also recall the region’s old hunting tradition and its " +
      "struggles.",
    sources: [
      { title: "Coat of arms — Tauragė district municipality (official)", url: "https://taurage.lt/en/about-taurage/coat-of-arms/" },
    ],
  },

  "LT-TE": {
    description:
      "Telšiai’s arms, on blue, show Saint Stanislaus — the bishop of Kraków — raising Piotrowin from the grave, a " +
      "miracle attributed to the saint. The arms were granted to Telšiai together with its town rights in 1791.",
    sources: [
      { title: "Coat of arms — Telšiai District Municipality (official)", url: "https://telsiai.lt/apie-rajona/herbas?lang=en" },
    ],
  },

  "LT-UT": {
    description:
      "Utena bears a golden horseshoe and a silver eight-pointed star on blue. The horseshoe is an old emblem of " +
      "luck and protection; the star — a ‘spark’ — stands for light and hope and a fast-growing city; and the " +
      "blue field for loyalty, justice and truth. Utena’s arms are first recorded in 1599, when it received " +
      "Magdeburg rights.",
    sources: [
      { title: "Utenos herbas — Wikipedia (lt)", url: "https://lt.wikipedia.org/wiki/Utenos_herbas" },
    ],
  },

  "LT-VL": {
    description:
      "Vilnius bears Saint Christopher — the ‘Christ-bearer’ — wading through water with the infant Jesus on his " +
      "shoulder. The image was chosen to mark Vilnius’s role in the Christianisation of Lithuania.",
    sources: [
      { title: "Coat of arms of Vilnius — Wikipedia (en)", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Vilnius" },
    ],
  },

  "LU-D": {
    description:
      "Diekirch flies a flag divided yellow over blue, the colours of its municipal arms — a burely (barred) field " +
      "of gold and azure bearing a crowned gold lion above a red tower rising from the base, beneath a mural crown " +
      "of three towers. The arms were adopted in 1986.",
    sources: [
      { title: "Diekirch — Flags of the World (FOTW)", url: "https://crwflags.com/fotw/flags/lu-die.html" },
    ],
  },

  "LV-002": {
    description:
      "Aizkraukle’s arms show three golden oak leaves over the silver Daugava on blue, with three silver stars. " +
      "The oak leaves stand for the turbines of the Pļaviņi hydroelectric station, turned by the Daugava; the " +
      "three stars for Latvia’s three historic lands — Latgale, Kurzeme and Vidzeme; and the silver band for the " +
      "river itself.",
    sources: [
      { title: "Aizkraukles ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Aizkraukles_%C4%A3erbonis" },
    ],
  },

  "LV-005": {
    description:
      "Aloja’s arms are of linden (lime) leaves — two green leaves on silver above, one silver leaf on green below " +
      "— a play on the town, long associated with the linden tree. The arms were approved in 1998.",
    sources: [
      { title: "Alojas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Alojas_%C4%A3erbonis" },
    ],
  },

  "LV-007": {
    description:
      "Alūksne’s arms show two crossed swords beneath an open book lettered ‘A.D. 1689’. The book is the first " +
      "Bible translated into Latvian, the work of the pastor Ernst Glück, who made it in Alūksne; the swords " +
      "recall the battles the town saw through its history.",
    sources: [
      { title: "Alūksnes ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Al%C5%ABksnes_%C4%A3erbonis" },
    ],
  },

  "LV-013": {
    description:
      "Baldone’s arms show a red squirrel holding pine cones on silver, with three golden drops on blue above. " +
      "Baldone grew as a spa around its medicinal springs, and the squirrel — the figure of the sanatorium’s " +
      "spring fountain — with the golden drops stands for those healing waters.",
    sources: [
      { title: "Baldones ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Baldones_%C4%A3erbonis" },
    ],
  },

  "LV-015": {
    description:
      "Balvi’s arms bear a black wolf’s head on red, beneath a rising white sun of ten rays. The wolf — the town’s " +
      "emblem since 1938 — stands for strength and perseverance, for the way it follows its quarry long and " +
      "patiently.",
    sources: [
      { title: "Balvu ģerbonis — neogeo.lv (Latvian civic heraldry)", url: "https://neogeo.lv/dzivnieki-latvijas-gerbonos/" },
    ],
  },

  "LV-016": {
    description:
      "Bauska bears a golden lion rampant on red — the lion of the Duchy of Courland, to which the town belonged — " +
      "with a small shield on its breast divided in the Latvian national colours to mark the town’s place in " +
      "Latvia. The arms were confirmed in 1925.",
    sources: [
      { title: "Bauskas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Bauskas_%C4%A3erbonis" },
    ],
  },

  "LV-018": {
    description:
      "Brocēni’s shield is divided by a stepped diagonal: the dark-blue upper half is Lake Ciecere, bearing a " +
      "white water lily on a green leaf, and the silver lower half stands for the town’s valuable raw materials, " +
      "its limestone and clay. The arms were adopted in 2000.",
    sources: [
      { title: "Brocēnu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Broc%C4%93nu_%C4%A3erbonis" },
    ],
  },

  "LV-021": {
    description:
      "Cesvaine bears, on green, a golden horseshoe-brooch (pakavsakta) — the traditional Latgalian clasp — for " +
      "the town’s past and its ancient inhabitants, the Latgalians. The arms were adopted in 1999.",
    sources: [
      { title: "Cesvaines ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Cesvaines_%C4%A3erbonis" },
    ],
  },

  "LV-022": {
    description:
      "Cēsis bears, on blue, a red brick wall of five towers with a raised black portcullis — for Cēsis Castle — " +
      "and above it a warrior in white holding a raised gold-hilted sword and a round grey shield. The warrior " +
      "recalls Cēsis’s past as a town of knights and the residence of the Master of the Livonian Order. The arms " +
      "were confirmed in 1925.",
    sources: [
      { title: "Cēsu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/C%C4%93su_%C4%A3erbonis" },
    ],
  },

  "LV-024": {
    description:
      "Dagda bears, on gold, a red phoenix rising from red flames, with a black trefoil cross in the upper corner " +
      "for religion. The phoenix and flames recall the several fires that destroyed the town, from which it each " +
      "time rose again. The arms were adopted in 1997.",
    sources: [
      { title: "Dagdas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Dagdas_%C4%A3erbonis" },
    ],
  },

  "LV-026": {
    description:
      "Dobele’s shield follows the Latvian flag’s division — red parted by a silver bar — with a white, " +
      "gold-hilted sword laid across all three bands toward the upper corner, for the Semigallians’ struggle " +
      "against the German crusaders. The arms were confirmed in 1925.",
    sources: [
      { title: "Dobeles ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Dobeles_%C4%A3erbonis" },
    ],
  },

  "LV-003": {
    description:
      "Aizpute bears, on silver, a red brick wall with a raised gate and three golden stars above the tower. The " +
      "brick wall — carried over from the town’s Russian-Empire-era arms — stands for Aizpute’s ancient history. " +
      "The arms were confirmed in 1925.",
    sources: [
      { title: "Aizputes ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Aizputes_%C4%A3erbonis" },
    ],
  },

  "LV-032": {
    description:
      "Grobiņa bears, on black, a silver crane standing on one leg and holding a golden stone in its raised foot. " +
      "It comes from the town seal granted by Duke Friedrich Casimir of Courland in 1697: should the crane fall " +
      "asleep, the stone drops and wakes it — a classic emblem of vigilance.",
    sources: [
      { title: "Grobiņas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Grobi%C5%86as_%C4%A3erbonis" },
    ],
  },

  "LV-033": {
    description:
      "Gulbene bears a silver swan swimming on black — canting arms, for gulbis (‘swan’) is the root of the town’s " +
      "name. The swan was taken from a relief on the façade of the old Vecgulbene manor tavern.",
    sources: [
      { title: "Gulbenes ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Gulbenes_%C4%A3erbonis" },
    ],
  },

  "LV-034": {
    description:
      "Iecava’s arms combine a saltire cross — for the town’s place at a meeting of important roads — with a " +
      "golden bell, tied to the Dzelzāmurs copper forges and to the history of Iecava’s church and its schools; " +
      "the bell calls people to work and wishes that Iecava’s good name resound far.",
    sources: [
      { title: "Iecavas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Iecavas_%C4%A3erbonis" },
    ],
  },

  "LV-035": {
    description:
      "Ikšķile bears, on red, a silver cross quartering the shield, with a golden brick wall in the upper corner. " +
      "The wall stands for the first stone building in the Baltic lands — the stone church built at Ikšķile by " +
      "Bishop Meinhard.",
    sources: [
      { title: "Ikšķiles ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Ik%C5%A1%C4%B7iles_%C4%A3erbonis" },
    ],
  },

  "LV-043": {
    description:
      "Kandava bears, on silver, a green oak branch of three leaves and three golden acorns — emblems of strength " +
      "— celebrating the town’s setting in the ancient Abava valley beneath Oakhill.",
    sources: [
      { title: "Kandavas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Kandavas_%C4%A3erbonis" },
    ],
  },

  "LV-046": {
    description:
      "Koknese bears, on purple within a gold border, a silver crescent and, above to the right, a golden key " +
      "crossed by a silver bishop’s crozier. These charges — signs of the bishop’s authority over the town — " +
      "already appear on Koknese’s seal of 1496.",
    sources: [
      { title: "Kokneses ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Kokneses_novada_%C4%A3erbonis" },
    ],
  },

  "LV-050": {
    description:
      "Kuldīga bears, on red, the wheel of Saint Catherine — the spiked breaking-wheel of her martyrdom. Saint " +
      "Catherine is the town’s patron; the fuller arms show her crowned, holding the wheel and prayer beads in " +
      "one hand and a sword in the other.",
    sources: [
      { title: "Kuldīgas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Kuld%C4%ABgas_%C4%A3erbonis" },
    ],
  },

  "LV-052": {
    description:
      "Ķekava’s shield is parted by a cloud-line into blue and silver — the colours of Vidzeme and Zemgale, the " +
      "two regions the town straddles — with a gold eight-pointed star carried over from the parish arms, " +
      "standing for excellence, independence, care, vigilance and striving upward.",
    sources: [
      { title: "Ķekavas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/%C4%B6ekavas_%C4%A3erbonis" },
    ],
  },

  "LV-054": {
    description:
      "Limbaži bears, on silver, a red town wall of two towers with an open gate showing a lion’s head, and " +
      "between the towers a bishop’s crozier and a cross set saltirewise — recalling the medieval Livonian town " +
      "and its bishopric.",
    sources: [
      { title: "Limbažu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Limba%C5%BEu_%C4%A3erbonis" },
    ],
  },

  "LV-056": {
    description:
      "Līvāni bears, on blue, a silver pale with a small silver hawk above it.",
    sources: [
      { title: "Līvānu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/L%C4%ABv%C4%81nu_%C4%A3erbonis" },
    ],
  },

  "LV-057": {
    description:
      "Lubāna bears, above, a golden duck swimming on blue — for the duck-hunting on Lake Lubāns, the great lake " +
      "beside the town — and below, three wavy silver bars on blue for the lake’s waters. The arms were adopted " +
      "in 2000.",
    sources: [
      { title: "Lubānas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Lub%C4%81nas_%C4%A3erbonis" },
    ],
  },

  "LV-059": {
    description:
      "Madona bears a golden rooster’s head on red. The rooster is read as a bringer of light, its crowing the " +
      "herald of sunrise and the end of night.",
    sources: [
      { title: "Madonas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Madonas_%C4%A3erbonis" },
    ],
  },

  "LV-067": {
    description:
      "Ogre bears, on silver, three black pine trees standing on a blue wavy line — the pinewoods for which Ogre " +
      "is known, above the river that gives the town its name.",
    sources: [
      { title: "Ogres ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Ogres_%C4%A3erbonis" },
    ],
  },

  "LV-068": {
    description:
      "Olaine’s shield is divided diagonally silver and green. On the silver stand three red blood-drops, for " +
      "health and life — the town is home to the Olainfarm pharmaceutical works — and on the green a black " +
      "cranberry sprig with silver leaves and red berries, for the peat bogs of the Olaine district.",
    sources: [
      { title: "Olaines ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Olaines_%C4%A3erbonis" },
    ],
  },

  "LV-084": {
    description:
      "Rūjiena’s shield carries, below on red, a golden sheaf of grain for prosperity, and above on gold, three " +
      "blue flax-flowers — for the town’s well-developed growing and working of flax.",
    sources: [
      { title: "Rūjienas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/R%C5%ABjienas_%C4%A3erbonis" },
    ],
  },

  "LV-086": {
    description:
      "Salacgrīva’s arms show silver bands for the sea and the Salaca river that flows into it, and across them a " +
      "black anchor that both joins the river’s two banks and marks the port at its mouth.",
    sources: [
      { title: "Salacgrīvas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Salacgr%C4%ABvas_%C4%A3erbonis" },
    ],
  },

  "LV-088": {
    description:
      "Saldus bears, on blue, a silver timber castle of three towers standing on a silver base — its design likely " +
      "drawn from the 12-metre Curonian hillfort at the southern end of Lake Saldus.",
    sources: [
      { title: "Saldus ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Saldus_%C4%A3erbonis" },
    ],
  },

  "LV-071": {
    description:
      "Pāvilosta’s shield bears, above on red, three golden lilies from the arms of the Lilienfeld family, long " +
      "tied to the town’s history, and below on silver, a red bent pine tree rising from red stones — the pine " +
      "and the stones being old symbols of Pāvilosta.",
    sources: [
      { title: "Pāvilostas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/P%C4%81vilostas_%C4%A3erbonis" },
    ],
  },

  "LV-074": {
    description:
      "Priekule bears, on blue, a golden winged figure — the ‘Priekule Icarus’, the town’s own emblem — with " +
      "silver wings, and six silver five-pointed stars above.",
    sources: [
      { title: "Priekules ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Priekules_%C4%A3erbonis" },
    ],
  },

  "LV-089": {
    description:
      "Saulkrasti — the ‘sun coast’ — bears in its upper field a half golden sun on blue, its rays alternating " +
      "straight beams with an oak-leaf crown, for light, life and eternal movement; below lies the green shore.",
    sources: [
      { title: "Saulkrastu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Saulkrastu_%C4%A3erbonis" },
    ],
  },

  "LV-072": {
    description:
      "Pļaviņas bears a green shield crossed by a silver diagonal band with a second, narrower silver band beside " +
      "it — the two standing for the Daugava and its tributary the Aiviekste, which meet near the town. The arms " +
      "were confirmed in 1936.",
    sources: [
      { title: "Pļaviņu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/P%C4%BCavi%C5%86u_%C4%A3erbonis" },
    ],
  },

  "LV-091": {
    description:
      "Sigulda’s shield is divided diagonally, silver above and green below; along the division lie three green " +
      "leaves on the silver and three silver bird-cherry (ieva) blossoms on the green. The arms were confirmed in " +
      "1938.",
    sources: [
      { title: "Siguldas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Siguldas_%C4%A3erbonis" },
    ],
  },

  "LV-093": {
    description:
      "Skrunda bears a green shield with a silver T-shaped chief carrying the black silhouette of the bridge over " +
      "the Venta river, and across the green a silver, gold-hilted sword set diagonally. The arms were adopted in " +
      "1998.",
    sources: [
      { title: "Skrundas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Skrundas_%C4%A3erbonis" },
    ],
  },

  "LV-094": {
    description:
      "Smiltene bears, on blue, three golden mountain peaks with three silver birds flying above them.",
    sources: [
      { title: "Smiltenes ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Smiltenes_%C4%A3erbonis" },
    ],
  },

  "LV-097": {
    description:
      "Talsi bears, on gold, a green hill for the town — which spreads across nine hills — from which a bare arm " +
      "reaches out holding a green wreath, emblems of strength and power.",
    sources: [
      { title: "Talsu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Talsu_%C4%A3erbonis" },
    ],
  },

  "LV-099": {
    description:
      "Tukums bears, on silver, a green hill crowned with three green firs.",
    sources: [
      { title: "Tukuma ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Tukuma_%C4%A3erbonis" },
    ],
  },

  "LV-101": {
    description:
      "Valka’s arms show a warrior — his garments marked with fire-crosses (ugunskrusti) — standing at the gates " +
      "of an ancient Latvian hillfort.",
    sources: [
      { title: "Valkas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Valkas_%C4%A3erbonis" },
    ],
  },

  "LV-107": {
    description:
      "Viesīte bears five acorns, red on the gold field and gold on the red — acorns standing for strength and " +
      "fertility, and recalling the great oak grove the town once had. The arms were confirmed in 1938.",
    sources: [
      { title: "Viesītes ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Vies%C4%ABtes_%C4%A3erbonis" },
    ],
  },

  "LV-108": {
    description:
      "Viļaka bears, below, a hedgehog in natural colours — for the many hedgehogs around the town — beneath a " +
      "golden chief with three blue flax-flowers, for the townspeople’s old craft of growing and working flax. " +
      "The arms were confirmed in 1996.",
    sources: [
      { title: "Viļakas ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Vi%C4%BCakas_%C4%A3erbonis" },
    ],
  },

  "LV-109": {
    description:
      "Viļāni bears a golden honeycomb above a golden bee — the bee and honey standing for diligence and " +
      "industrious work. The arms were confirmed in 1938.",
    sources: [
      { title: "Viļānu ģerbonis — Wikipedia (lv)", url: "https://lv.wikipedia.org/wiki/Vi%C4%BC%C4%81nu_%C4%A3erbonis" },
    ],
  },

  "MD-BA": {
    description:
      "Bălți’s arms are a shield striped in twelve silver and blue — canting arms, for the name Bălți is the " +
      "plural of baltă, a shallow pond, and the town lies among such ponds. Across it stands an archer, kept from " +
      "the town’s first arms of 1930, and a silver mural crown of seven towers marks its status as an old " +
      "municipality.",
    sources: [
      { title: "Stema Bălțiului — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_B%C4%83l%C8%9Biului" },
    ],
  },

  "MD-CL": {
    description:
      "Călărași bears a silver horseman (călăraș) galloping, a staff in his hand, with four golden crosses — " +
      "canting arms, for a călăraș was a mounted frontier soldier, echoing the district’s name. The arms were " +
      "approved in 2014.",
    sources: [
      { title: "Raionul Călărași — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Raionul_C%C4%83l%C4%83ra%C8%99i" },
    ],
  },

  "MD-CT": {
    description:
      "Cantemir bears a white mute swan with a red beak on green, floating on a silver base, and above it a golden " +
      "shield with a blackbird singing on a branch. The swan stands for the Prut meadow and the district’s waters " +
      "— the silver base being the heraldic colour of water — and was a local emblem before the arms were " +
      "formalised.",
    sources: [
      { title: "Stema raionului — Consiliul Raional Cantemir (official)", url: "https://www.cantemir.md/stema-raionului/" },
    ],
  },

  "MD-CS": {
    description:
      "Căușeni’s arms show a red portal framing the Church of the Assumption on gold, flanked by two golden lions, " +
      "over a crenellated silver-and-black base bearing a golden eight-rayed star. The church is the district’s " +
      "famous medieval monument.",
    sources: [
      { title: "Stema și Drapelul Raionului — Consiliul Raional Căușeni (official)", url: "https://causeni.md/raionul-causeni/stema-raionului/" },
    ],
  },

  "MD-CU": {
    description:
      "Chișinău bears a golden eagle with lowered wings on blue, carrying the arms of Moldavia on its breast, " +
      "beneath a mural crown of seven towers for the seven hills on which the city stands.",
    sources: [
      { title: "Stema Chișinăului — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_Chi%C8%99in%C4%83ului" },
    ],
  },

  "MD-FL": {
    description:
      "Florești bears, on red, two crossed silver swords points-down with two Greek crosses, and four golden " +
      "lilies. The swords and crosses come from the arms of the Costin family — home of the great chronicler " +
      "Miron Costin — while the lilies play on the city’s name (from flori, ‘flowers’).",
    sources: [
      { title: "Simbolurile orașului Florești — Primăria Florești (official)", url: "https://primariafloresti.md/simbolurile-orasului-stema-drapelul-or-floresti/" },
    ],
  },

  "MD-GL": {
    description:
      "Glodeni bears, on blue, the golden flaming sword of Saint Michael the Archangel point down, flanked by two " +
      "silver angel’s wings. The emblem was adopted in 2018.",
    sources: [
      { title: "Glodeni (stemă) — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Glodeni,_Moldova" },
    ],
  },

  "MD-NI": {
    description:
      "Nisporeni’s arms and flag centre on a windmill against a blue frame — blue for the sky, air and wind. " +
      "Nisporeni lies in one of the windiest parts of Bessarabia, and its old windmills, known here since the " +
      "nineteenth century, inspired the arms adopted in 2005.",
    sources: [
      { title: "Raionul Nisporeni — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Raionul_Nisporeni" },
    ],
  },

  "MD-OR": {
    description:
      "Orhei’s flag carries two eight-pointed stars — one gold, one silver — taken from one of the town’s " +
      "medieval seals. They stand for the unbroken continuity of the settlement from Old Orhei (Orheiul Vechi) to " +
      "the present town.",
    sources: [
      { title: "Simbolurile orașului — Primăria Orhei (official)", url: "https://orhei.md/index.php?id=666&l=ro&pag=page" },
    ],
  },

  "MD-UN": {
    description:
      "Ungheni’s flag has nine stripes alternating red and black with a white triangle at the hoist. Red is for " +
      "blood and the hard fate of the villages along the Prut, black for the earth, and the nine stripes for the " +
      "nine settlements that formed the town — Ungheni and eight villages. The white triangle stands for the river " +
      "Prut and the town’s name, ‘the angle on the Prut’ (unghi, ‘angle’).",
    sources: [
      { title: "Simbolurile orașului — Ungheni (official)", url: "https://ungheni.md/simbolurile-orasului/" },
    ],
  },

  "MD-SO": {
    description:
      "Soroca’s arms are a red shield halved: on one side a silver crenellated fortress — the citadel Stephen the " +
      "Great raised at the Dniester ford — and on the other a black Tatar’s head impaled on a silver lance, for " +
      "the town’s long struggles against the Tatars. On the flag the arms stand above a wavy band for the river " +
      "Dniester.",
    sources: [
      { title: "Stema municipiului Soroca — Observatorul de Nord", url: "https://observatorul.md/stema-actuala-a-municipiului-soroca-a-fi-sau-a-nu-fi" },
    ],
  },

  "MD-HI": {
    description:
      "Hîncești flies a blue flag with a golden rampant lion — crowned, tongued and clawed red — holding a golden " +
      "axe. The lion comes from the arms of the Manuc-Bei family and the axe from the Hâncu family, the two houses " +
      "that built up the town; together they show the lion set to work, clearing the forest and raising the city " +
      "with its timber.",
    sources: [
      { title: "Simbolurile orașului — Primăria Hîncești (official)", url: "https://primariahincesti.md/simbolurile-orasului/" },
    ],
  },

  "MD-ED": {
    description:
      "Edineț’s flag bears the golden trident of the Cupcici family. In 1431 Prince Alexander the Good of Moldavia " +
      "granted Ivan Cupcici the land here — fourteen villages and empty ground to settle — and the family’s " +
      "trident became the town’s emblem.",
    sources: [
      { title: "Edineț — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Edine%C8%9B" },
    ],
  },

  "MD-TA": {
    description:
      "Taraclia’s flag carries the white, green and red of the Bulgarians — the town was settled by Bessarabian " +
      "Bulgarians — and a golden rampant lion, the emblem of Bulgarian autonomy in southern Bessarabia, taken from " +
      "the seals of the community’s old institutions.",
    sources: [
      { title: "Raionul Taraclia — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Raionul_Taraclia" },
    ],
  },

  "MD-CM": {
    description:
      "Cimișlia flies a blue-yellow-blue triband. The blue is the colour of the sky, of infinity and of a peaceful, " +
      "free life; the yellow stands for the wealth of grain, for Cimișlia’s prosperity once rested on its cereal " +
      "trade. Its arms — a balance weighing an ear of grain, with the ‘danga’ brand of the Tatar Ciumeci tribe " +
      "whose name the town bears — were left off the flag to keep the design simple.",
    sources: [
      { title: "Flag of Cimișlia — Wikipedia (en)", url: "https://en.wikipedia.org/wiki/Flag_of_Cimi%C8%99lia" },
    ],
  },

  "MD-IA": {
    description:
      "Ialoveni flies a deep-red cloth crossed by seven white waves. The burgundy is for the town’s wine — Ialoveni " +
      "is old vineyard country — and the white waves for the Ișnovăț river that runs through it. Its arms set a " +
      "golden wine cup on the same wavy red-and-silver field.",
    sources: [
      { title: "Ialoveni — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Ialoveni" },
    ],
  },

  "MD-FA": {
    description:
      "Fălești flies a green flag with a white band across the middle bearing three black ducks swimming toward " +
      "the hoist. The ducks — and the reeds of its arms — recall the marshes that once made this wetland country " +
      "rich in waterfowl and game; green and white stand for that landscape of water and reeds.",
    sources: [
      { title: "Fălești — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/F%C4%83le%C8%99ti" },
    ],
  },

  "MD-BS": {
    description:
      "Basarabeasca flies green-yellow-red-yellow-green stripes with a winged golden wheel on the central red " +
      "band. The winged wheel is the emblem of the railway, for Basarabeasca grew up as a great rail junction; the " +
      "gold is for prosperity and the green for the farmland of southern Moldova.",
    sources: [
      { title: "Basarabeasca — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Basarabeasca" },
    ],
  },

  "MD-BR": {
    description:
      "Briceni flies a cloth quartered in alternating yellow and red — the colours of its arms, whose panels carry " +
      "red roses and silver razors. The razor is canting: the name Briceni comes from ‘brici’, the Romanian word " +
      "for a razor, while the roses stand for the region’s natural beauty.",
    sources: [
      { title: "Briceni — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Briceni" },
    ],
  },

  "MD-DO": {
    description:
      "Dondușeni flies a green-white-green flag with a red brick water tower on the white band. The tower stands " +
      "for the town’s infrastructure and growth, while its arms add a winged railway wheel for the 1893 railway " +
      "that gave rise to Dondușeni; green is for the surrounding country, white for peace.",
    sources: [
      { title: "Dondușeni — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Dondu%C8%99eni" },
    ],
  },

  "MD-GA": {
    description:
      "Comrat — the seat of Gagauzia — bears a black horse on its arms, from which the town takes its name: Comrat " +
      "is the Gagauz ‘Kömür at’, ‘black horse’, a Nogai-Tatar emblem of wealth. It is set among ears of wheat for " +
      "the region’s farming, with the town’s cathedral.",
    sources: [
      { title: "Comrat — Wikipedia (en)", url: "https://en.wikipedia.org/wiki/Comrat" },
    ],
  },

  // ── Nuuk — capital of Sermersooq and of Greenland ──────────────────────────
  "GL-SM": {
    description:
      "Nuuk's arms — used identically on the town flag — are set on a blue-and-white field. The red " +
      "building at the centre is the ‘red siminar’, Nuuk's teachers' training college (Ilinniarfissuaq), " +
      "with gold windows and a weathercock; it stands for education and culture. In the water before it " +
      "floats a yellow kayak paddle, for the hunting way of life of Greenland's indigenous people — and, " +
      "the arms' authors noted, for Nuuk being ‘the true power of Greenland’, its capital. Three sets of " +
      "waves, growing as they reach the building, run beneath it: the blue waves are the fjord by Nuuk, " +
      "the white waves the sea ice. Rising behind is Mt Sermitsiaq (‘a piece of ice’), the distinctive " +
      "peak that is the civic symbol of the town. The arms were created by Ejner Heilmann and Sven Tito " +
      "Achmen and copyrighted in 1986.",
    sources: [
      { title: "Coat of arms of Nuuk — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Nuuk" },
    ],
  },

  // ── Podgorica — the capital city of Montenegro ─────────────────────────────
  "ME-16": {
    description:
      "Podgorica's flag bears, in blue on white, the stylised ‘broken line’ from the city arms — a single " +
      "continuous emblem that fuses the capital's landmarks: Nemanja's town (the Ribnica fortress), the " +
      "clock tower, the Gorica-hill monument, and the city's gates and bridges. In the full arms a silver " +
      "shield stands for the city's wealth of water (six rivers and Lake Skadar, the largest lake in " +
      "Southern Europe), two blue stripes for the ancient settlements of Doclea and Meteon, and two silver " +
      "lions — from the old arms of Božidar Vuković-Podgoričanin — support the shield.",
    sources: [
      { title: "Coat of arms of Podgorica — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Podgorica" },
    ],
  },

  // ── Bar — capital of Bar Municipality, Montenegro ──────────────────────────
  "ME-02": {
    description:
      "Bar's flag carries the colours of its arms: a blue ground for the Adriatic Sea and Lake Skadar, " +
      "between which the municipality lies; two gold stripes for the settlements of the two basins — " +
      "Crmnica in the Skadar basin and the settlements of the Adriatic coast; and a central green stripe " +
      "for the mountain massif that separates the two basins.",
    sources: [
      { title: "Грб Бара — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Бара" },
    ],
  },

  // ── Berane — capital of Berane Municipality, Montenegro ────────────────────
  "ME-03": {
    description:
      "Berane's arms show, on white, the silhouette of the Đurđevi Stupovi monastery — the endowment of " +
      "Stefan Prvoslav and the spiritual and cultural centre of this part of Montenegro — with the " +
      "mountains Bjelasica and Cmiljevica behind it; below, on blue, two wavy lines stand for the river " +
      "Lim, in whose basin the whole municipality lies.",
    sources: [
      { title: "Грб Берана — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Берана" },
    ],
  },

  // ── Danilovgrad — capital of Danilovgrad Municipality, Montenegro ──────────
  "ME-07": {
    description:
      "Danilovgrad's arms gather the town's landmarks: the silhouette of Mount Maganik above the blue arch " +
      "of the Bridge of Vojvoda Mirko, over wavy lines for the river Zeta that runs through the town.",
    sources: [
      { title: "Грб Даниловграда — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Даниловграда" },
    ],
  },

  // ── Mojkovac — capital of Mojkovac Municipality, Montenegro ────────────────
  "ME-11": {
    description:
      "Mojkovac's arms recall its history: a coin bearing mining symbols for the medieval mining and mint " +
      "town of Brskovo nearby; the river Tara between the mountains Sinjajevina and Bjelasica; and, above " +
      "the town's name, the monument to the fallen of the Battle of Mojkovac (1916).",
    sources: [
      { title: "Грб Мојковца — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Мојковца" },
    ],
  },

  // ── Plav — capital of Plav Municipality, Montenegro ────────────────────────
  "ME-13": {
    description:
      "Plav's arms bring together the town's emblems: the historic Redžepagić Tower and an evergreen tree " +
      "beneath three mountain peaks, the meadows of the Plav basin, and, below, wavy lines for Plav Lake; " +
      "the Roman numeral XIII marks the 13th century, when the settlement arose.",
    sources: [
      { title: "Грб Плава — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Плава" },
    ],
  },

  // ── Pljevlja — capital of Pljevlja Municipality, Montenegro ────────────────
  "ME-14": {
    description:
      "Pljevlja's arms, in white on blue, show the town's clock tower (sahat-kula) with the town hall " +
      "behind it and an arched bridge over the Tara — the crossing that links Pljevlja to the rest of " +
      "Montenegro; three lines at the base stand for the three rivers that run through the town (Breznica, " +
      "Ćehotina and Vezišnica), and the blue with the white-and-red border alludes to the pan-Slavic " +
      "makeup of the population.",
    sources: [
      { title: "Грб Пљеваља — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Пљеваља" },
    ],
  },

  // ── Plužine — capital of Plužine Municipality, Montenegro ──────────────────
  "ME-15": {
    description:
      "Plužine's arms show, on the dividing line, the white silhouette of Piva Monastery — one of the most " +
      "renowned monasteries of the Serbian Orthodox Church — above a lower field that stylises the rivers " +
      "Piva and Tara with their canyons, Piva Lake, and the hydro-electric dam that formed the lake.",
    sources: [
      { title: "Грб Плужина — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Плужина" },
    ],
  },

  // ── Rožaje — capital of Rožaje Municipality, Montenegro ────────────────────
  "ME-17": {
    description:
      "Rožaje's arms, adopted in 2011, carry meanings set out in the town statute: the Ganića Tower for the " +
      "town's cultural heritage; two deer antlers for the region's wildlife; green for the natural riches " +
      "of Rožaje; the river Ibar; a sun for light and enlightenment; and a pair of hands for the youth and " +
      "future of the town.",
    sources: [
      { title: "Грб Рожаја — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Рожаја" },
    ],
  },

  // ── Herceg Novi — capital of Herceg Novi Municipality, Montenegro ──────────
  "ME-08": {
    description:
      "Herceg Novi's arms centre on a blue shield bearing a silver stone tower — battlemented, with a " +
      "window and a doorway — set between two silver lilies (fleurs-de-lis); above sits a golden mural " +
      "crown of three merlons, and gold griffins support the shield. The tower carries forward the town's " +
      "seal of 1883; the two lilies are a heraldic stand-in for Herceg Novi's cypress trees and, in " +
      "heraldry, signify richness of vegetation; and the griffins stand for strength, leadership and " +
      "courage, their gold marking the town's cultural heritage.",
    sources: [
      { title: "Грб Херцег Новог — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Херцег_Новог" },
      { title: "Symbols — hercegnovi.me (official)", url: "https://hercegnovi.me/en/o-gradu/symengmeni" },
    ],
  },

  // ── Bijelo Polje — capital of Bijelo Polje Municipality, Montenegro ────────
  "ME-04": {
    description:
      "Bijelo Polje's arms are a red shield within a blue frame. At the centre a white open book carries a " +
      "white rising sun; below the book, three white wavy lines stand for the river Lim and its " +
      "tributaries, which flow through the town.",
    sources: [
      { title: "Грб Бијелог Поља — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Бијелог_Поља" },
    ],
  },

  // ── Kotor — capital of Kotor Municipality, Montenegro ──────────────────────
  "ME-10": {
    description:
      "Kotor's arms are a triangular shield of three fields. In the upper (dexter) silver field stands " +
      "Saint Tryphon, the patron of Kotor, in a silver robe and red cloak with a golden halo; in the upper " +
      "(sinister) red field is a silver stone tower, for the city's defence; and in the lower silver field " +
      "a red lion in a fighting leap (salient) — the medieval lion held to be the oldest heraldic emblem of " +
      "the Bay of Kotor (Boka Kotorska).",
    sources: [
      { title: "Грб Котора — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Котора" },
    ],
  },

  // ── Cetinje — the Old Royal Capital of Montenegro ──────────────────────────
  "ME-06": {
    description:
      "Cetinje — Montenegro's Old Royal Capital (Prijestonica) — flies the krstaš barjak, the historic " +
      "Montenegrin cross banner: a red field bordered in white bearing a white cross whose arms broaden " +
      "toward the ends, centred where the field's diagonals meet. (The city's separate coat of arms bears " +
      "an open book for the Oktoih — the oldest book printed in the South Slavic lands — the peak of Mount " +
      "Lovćen, and the bell tower of Cetinje Monastery.)",
    sources: [
      { title: "Zvanični simboli Prijestonice Cetinje — cetinje.me (official)", url: "http://www.cetinje.me/cetinje/site_mne/public/index.php/index/artikli?id=7" },
    ],
  },

  // ── Nikšić — capital of Nikšić Municipality, Montenegro ────────────────────
  "ME-12": {
    description:
      "Nikšić's arms are a dark-blue medieval shield with a double gold border. Across the top rise the " +
      "towers of Bedem, the city's old fortress; at the centre is an architectural view of Trg slobode " +
      "(Freedom Square) bearing the banner of Vučji Do — the 1876 battle the Montenegrins won nearby — and " +
      "beneath it stands the Montenegrin lion.",
    sources: [
      { title: "Грб Никшића — Википедија (sr)", url: "https://sr.wikipedia.org/wiki/Грб_Никшића" },
    ],
  },

  // ── Ulcinj — capital of Ulcinj Municipality, Montenegro ────────────────────
  "ME-20": {
    description:
      "Ulcinj's arms gather, in gold, the symbols characteristic of the town: its old town — the ancient " +
      "stone fortress on the seashore — with a sun above it; an olive branch in fruit for the area's " +
      "agriculture; and, on the sea below, an old Illyrian (Liburnian) boat with a wolf's head turned " +
      "toward it, recalling Ulcinj's ancient Illyrian maritime past. A gold border frames the whole.",
    sources: [
      { title: "Grb Ulcinja — Wikipedija (sh)", url: "https://sh.wikipedia.org/wiki/Grb_Ulcinja" },
    ],
  },

  // ── Arequipa — capital of Arequipa, Peru ───────────────────────────────────
  "PE-ARE": {
    description:
      "Arequipa's arms centre on the Misti, the volcano over the city, with the river Chili and trees " +
      "beside it for the region's countryside. Golden lions stand for bravery and a warrior spirit, and " +
      "eight fleurs-de-lis for nobility and purity.",
    sources: [
      { title: "Escudo de Arequipa — arequipaperu.org", url: "https://www.arequipaperu.org/escudo" },
    ],
  },

  // ── Trujillo — capital of La Libertad, Peru ────────────────────────────────
  "PE-LAL": {
    description:
      "Trujillo's arms were granted by King Carlos I of Spain in 1537. On the blue shield stand two columns " +
      "over waves of water, a crown between them, and the letter K — for ‘Karolus’, the king's name — while " +
      "above sits a griffin, the mythical half-eagle, half-lion.",
    sources: [
      { title: "Escudo de Trujillo (Perú) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Trujillo_(Per%C3%BA)" },
    ],
  },

  // ── Cajamarca — capital of Cajamarca, Peru ─────────────────────────────────
  "PE-CAJ": {
    description:
      "Cajamarca — titled ‘Ciudad de Cajamarca la Grande’ — bears in its arms half of a black eagle, for " +
      "the swiftness of the Spanish conquest here (where Atahualpa was seized), and a palm branch for " +
      "victory and the city's fidelity to the crown.",
    sources: [
      { title: "El escudo de Cajamarca — cajamarca-sucesos.com", url: "https://www.cajamarca-sucesos.com/cajamarca/Sintesis%20historica%20de%20Cajamarca/el_escudo_de_cajamarca.htm" },
    ],
  },

  // ── Piura — capital of Piura, Peru ─────────────────────────────────────────
  "PE-PIU": {
    description:
      "Piura's arms, granted by Emperor Carlos V in 1537, show a winged fist reaching from the clouds and " +
      "holding a golden balance before a three-towered castle — the Archangel Saint Michael, patron of San " +
      "Miguel de Piura, weighing souls.",
    sources: [
      { title: "Escudo de Piura — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Piura" },
    ],
  },

  // ── Tacna — capital of Tacna, Peru ─────────────────────────────────────────
  "PE-TAC": {
    description:
      "Tacna's arms bear a golden rampant lion for the warrior, watchful and sovereign spirit of its " +
      "people, charged with a pomegranate — a local fruit — for abundance and unity, all framed by the " +
      "title ‘Heroica Ciudad de San Pedro de Tacna’.",
    sources: [
      { title: "Oficializan el escudo de Tacna — Diario Correo", url: "https://diariocorreo.pe/peru/oficializan-el-escudo-de-tacna-287341/" },
    ],
  },

  // ── Callao — capital of the Callao Region, Peru ────────────────────────────
  "PE-CAL": {
    description:
      "Callao's arms centre on the Real Felipe, the great 18th-century fortress guarding the port. The " +
      "‘chalaco’ emblem descends from the Callao medal struck in 1821, and the castle stands as guardian of " +
      "the nation and of the port-city's heroic spirit.",
    sources: [
      { title: "Escudo del Callao — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_del_Callao" },
    ],
  },

  // ── Chachapoyas — capital of Amazonas, Peru ───────────────────────────────
  "PE-AMA": {
    description:
      "Chachapoyas' city flag, adopted in 1988, has three horizontal bands. The red stands for the blood " +
      "shed by the Chachapoyans; the green for the Pampa de Higos Urco and the hills that ring the city; " +
      "and the light blue for peace and tranquillity. The golden sun on the blue band is the rising sun.",
    sources: [
      { title: "Bandera de Chachapoyas — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Chachapoyas" },
    ],
  },

  // ── Huaraz — capital of Áncash, Peru ──────────────────────────────────────
  "PE-ANC": {
    description:
      "Huaraz flies its coat of arms on the clear blue of its sky. The shield is split diagonally: one half " +
      "shows the nevado Vallunaraju of the Cordillera Blanca for the region's natural wealth and beauty, the " +
      "other the pre-Inca Wilcahuaín temple for its cultural and historical heritage. A condor rising from " +
      "flames represents the Andean fauna and the city's renewal after its earthquakes; a helmet honours " +
      "Sebastián de Torres, the first encomendero, and quenual branches stand for the local flora.",
    sources: [
      { title: "Huaraz (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Huaraz" },
    ],
  },

  // ── Chiclayo — capital of Lambayeque, Peru ────────────────────────────────
  "PE-LAM": {
    description:
      "Chiclayo's light-blue flag — the blue for the purity and tranquillity of its people and its waters — " +
      "carries the city arms. The golden tumi (ceremonial knife) recalls the glorious pre-Hispanic past; the " +
      "cross the Catholic identity taken on at the Conquest; sugar cane and rice the fertile valleys and their " +
      "agriculture; and an alcatraz (pelican) flying over stylised waves the region's historic guano wealth " +
      "from its offshore islands.",
    sources: [
      { title: "Chiclayo (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Chiclayo" },
    ],
  },

  // ── Huancayo — capital of Junín, Peru ─────────────────────────────────────
  "PE-JUN": {
    description:
      "Huancayo's flag is two vertical stripes — dark green at the hoist, white at the fly. The green stands " +
      "for hope and the vegetation of the Mantaro Valley that surrounds the city; the white for peace.",
    sources: [
      { title: "Bandera de Huancayo — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Huancayo" },
    ],
  },

  // ── Puno — capital of Puno, Peru ──────────────────────────────────────────
  "PE-PUN": {
    description:
      "Puno's flag is celeste over white. The celeste is for the region's natural sky and for Lake Titicaca, " +
      "which dominates Puno's landscape and was sacred to its pre-Inca cultures; the white is a sign of " +
      "loyalty and peace, and of the dignity and generous character of the punenos.",
    sources: [
      { title: "Bandera de Puno — Gobierno Regional de Puno (punoperu.org)", url: "https://www.punoperu.org/bandera" },
    ],
  },

  // ── Cerro de Pasco — capital of Pasco, Peru ───────────────────────────────
  "PE-PAS": {
    description:
      "Cerro de Pasco's flag bears the arms of the “Ciudad Real de Minas” (Royal City of Mines), the " +
      "title the Spanish Crown granted the settlement in 1639 in recognition of its extraordinary mineral " +
      "wealth. The city is still known as the mining capital of Peru, and its arms stand for that long " +
      "silver-, copper- and zinc-mining heritage.",
    sources: [
      { title: "Cerro de Pasco (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Cerro_de_Pasco" },
    ],
  },

  // ── Pucallpa — capital of Ucayali, Peru ───────────────────────────────────
  "PE-UCA": {
    description:
      "Pucallpa flies a white flag charged with the provincial arms of Coronel Portillo. The shield presents " +
      "the city as an “ecological port” — its motto “Puerto de la Selva” (Port of the Jungle) — " +
      "through three natural elements of the Amazon: water, sun and plants. The flag also joins the banners of " +
      "the conurbated districts of Yarinacocha and Manantay to mark their shared urban identity.",
    sources: [
      { title: "Pucallpa (Símbolos) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Pucallpa" },
    ],
  },

  // ── Panama City — capital of Panamá Province and of Panama ─────────────────
  "PA-8": {
    description:
      "Panama City's arms were granted by Charles I of Spain in 1521, when Panamá was raised to a city. On " +
      "a gold field they show the yoke and bundle of arrows of the Catholic Monarchs, two caravels for the " +
      "discovery of the trade route across the isthmus, and a star for the southern pole, within a border " +
      "of the castles and lions of Castile and León. The original was lost when Henry Morgan sacked the " +
      "city in 1671; the present version was reconstructed in 1992 from the 1521 description.",
    sources: [
      { title: "Escudo de la Ciudad de Panamá — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_la_Ciudad_de_Panam%C3%A1" },
    ],
  },

  // ── Port Moresby — seat of Central Province and capital of Papua New Guinea ─
  "PG-CPM": {
    description:
      "Port Moresby flies the emblem of the National Capital District Commission (NCDC) on a yellow field: a " +
      "black silhouette of a lakatoi — the traditional double-masted sailing canoe of the local Motu people — " +
      "ringed by the words “National Capital District Commission” and “NCDC”. The lakatoi carried the Hiri " +
      "trade voyages along the Papuan coast and is still celebrated each year at the Hiri Moale Festival; on " +
      "the flag it stands for the city's maritime heritage and its Motu-Koita traditional landowners.",
    sources: [
      { title: "Port Moresby (Papua New Guinea) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-nc.html" },
    ],
  },

  // ── Bangued — capital of Abra, Philippines ────────────────────────────────
  "PH-ABR": {
    description:
      "Bangued flies its municipal seal on a white field. The circular shape stands for the resiliency, " +
      "versatility and cohesiveness of the townspeople; the inner ring in the red, white and blue of the " +
      "national flag marks Bangued as part of the Republic of the Philippines; and a sunburst of 31 rays — " +
      "one for each of the town's 31 barangays — expresses the people's optimism and hope, with the map of " +
      "Bangued at its core.",
    sources: [
      { title: "Municipality of Bangued — Province of Abra (official)", url: "https://abra.gov.ph/municipalities/bangued/" },
    ],
  },

  // ── Cabadbaran — capital of Agusan del Norte, Philippines ──────────────────
  "PH-AGN": {
    description:
      "Cabadbaran City's seal reads its symbolism outward: a golden rope for the Cabadbaranons' shared " +
      "aspiration for progress and prosperity; two white stars for their hospitable and peace-loving nature; " +
      "thirty-one red stars for the city's 31 barangays; a blue strip for its abundant potable water; and a " +
      "green map of the city for its agriculture, mineral resources and protected watershed. The date 2007 " +
      "marks Cabadbaran's conversion into a city.",
    sources: [
      { title: "Cabadbaran City Seal — City Government of Cabadbaran (official)", url: "http://cabadbaranadn.gov.ph/cbr/index.php/cabadbaran-city-seal/" },
    ],
  },

  // ── Baler — capital of Aurora, Philippines ────────────────────────────────
  "PH-AUR": {
    description:
      "Baler's municipal seal marks the town and its province as coastal, set on the Pacific; the sun and its " +
      "rays at the centre stand for the barangays at the heart of the town. Baler is the capital of Aurora, " +
      "the province named for Aurora Aragón Quezon, who was born there.",
    sources: [
      { title: "Official Seal — Municipality of Baler (official)", url: "https://baler.gov.ph/official-seal/" },
    ],
  },

  // ── Tagbilaran — capital of Bohol, Philippines ────────────────────────────
  "PH-BOH": {
    description:
      "Tagbilaran City's seal depicts the Sandugo — the blood compact of 16 March 1565 between the Boholano " +
      "chieftain Datu Sikatuna and the Spanish Miguel López de Legazpi, one of the first treaties of " +
      "friendship in the islands. The ship marks where Legazpi landed and the pact was sealed, and the whole " +
      "device proclaims Tagbilaran the “City of Peace and Friendship”.",
    sources: [
      { title: "Tagbilaran — Wikipedia", url: "https://en.wikipedia.org/wiki/Tagbilaran" },
      { title: "Provincial Symbols of Bohol — bohol.ph", url: "https://www.bohol.ph/article35.html" },
    ],
  },

  // ── Cebu City — capital of Cebu, Philippines ──────────────────────────────
  "PH-CEB": {
    description:
      "Cebu City's seal (adopted 1972) is built on the pavilion that shelters Magellan's Cross, planted in " +
      "1521 — a symbol of the city's Catholic faith and its role as the first Christian settlement in the " +
      "archipelago. Behind it a crossed spear and bolo recall Lapu-Lapu's warriors, who defeated Magellan at " +
      "the Battle of Mactan, standing for Cebuano defiance of foreign rule; and the 80 black-and-white " +
      "checkered tiles below count the city's 80 barangays.",
    sources: [
      { title: "Seal of Cebu City — Wikipedia", url: "https://en.wikipedia.org/wiki/Seal_of_Cebu_City" },
    ],
  },

  // ── Virac — capital of Catanduanes, Philippines ───────────────────────────
  "PH-CAT": {
    description:
      "Virac's seal packs the town's identity into a shield derived from the Catanduanes provincial arms: " +
      "rice, corn, coconut, abaca and banana for its main crops; a sailfish and the sea for its fishing " +
      "wealth; the Macaco Spring for the first settlement “Vidak” the Spaniards found; a “V” for the name " +
      "Virac; the Samdong flower (burak) from which that name is said to derive; and an abaca cord binding it " +
      "all for the unity of the people.",
    sources: [
      { title: "Official Seal — Municipality of Virac (official)", url: "https://virac-catanduanes.gov.ph/official-seal/" },
    ],
  },

  // ── Tagum — capital of Davao del Norte, Philippines ───────────────────────
  "PH-DAV": {
    description:
      "Tagum City's gold seal carries a four-pointed brown star quartered into the city's economy: a fish for " +
      "aquaculture, purple flowers for the cut-flower sector, durian, bananas and young coconuts for its " +
      "high-value crops, and purple interlocking gears for the modernisation of its infrastructure. The gold " +
      "field speaks of the city's “golden image” — its precious-metals and jewellery trade and its rich " +
      "ethnic and cultural heritage — and the brown compass lines dividing the star mark its dynamism across " +
      "many industries.",
    sources: [
      { title: "Seal of Tagum — Wikipedia", url: "https://en.wikipedia.org/wiki/Seal_of_Tagum" },
    ],
  },

  // ── Tacloban — capital of Leyte, Philippines ──────────────────────────────
  "PH-LEY": {
    description:
      "Tacloban City's seal maps its setting on the San Juanico Strait. The right half is the Leyte side, " +
      "where the city stands; the left half is Samar, the city's major supplier of farm and marine goods; and " +
      "between them lies the scenic strait itself. A galleon recalls Ferdinand Magellan's ship and the first " +
      "Christian Mass, held in 1521 on nearby Limasawa.",
    sources: [
      { title: "Official Seal of Tacloban City — City Government of Tacloban (official)", url: "https://tacloban.gov.ph/tacloban-city-seal/" },
    ],
  },

  // ── Digos — capital of Davao del Sur, Philippines ─────────────────────────
  "PH-DAS": {
    description:
      "Digos City's seal (dated September 8, 2000, its cityhood) gathers the city's assets in a circle: " +
      "Mount Apo in light green at the top for its flora and fauna, grey buildings below for its " +
      "infrastructure, a blue patch for the sea and a green one for agriculture, and an acid-blue highway " +
      "running to a gold machinery gear for economic stability. An artistic band of indigenous design cuts " +
      "across the circle for the pioneering tribes who eased the settlement of later Christian migrants.",
    sources: [
      { title: "Digos — Wikipedia", url: "https://en.wikipedia.org/wiki/Digos" },
    ],
  },

  // ── San Fernando — capital of Pampanga, Philippines ───────────────────────
  "PH-PAM": {
    description:
      "San Fernando's seal is crowned by a giant lantern (parol), the magnificent Christmas lantern for which " +
      "the city — the “Christmas Capital of the Philippines” — is world-famous, and which as the parol recalls " +
      "the Star of Bethlehem. Stars stand for the city's progress and development; the dominant red, white and " +
      "blue are the national colours, while the yellow and green recall the Fernandinos' part in the 1986 EDSA " +
      "Revolution that restored democracy.",
    sources: [
      { title: "Seal of the City of San Fernando — City Government of San Fernando (Pampanga, official)", url: "https://cityofsanfernando.gov.ph/seal-of-the-city-of-san-fernando/" },
    ],
  },

  // ── Puerto Princesa — capital of Palawan, Philippines ─────────────────────
  "PH-PLW": {
    description:
      "Puerto Princesa's seal is dominated by the Palawan peacock-pheasant (tandikan), the rare bird endemic " +
      "to the island that features in the culture of Palawan's indigenous peoples and now serves as a flagship " +
      "species for conserving the province's threatened wildlife. Its plumage is spread symmetrically as a " +
      "royal backdrop to the bird's silhouette, head feathers raised — a fitting nod to the city's “princess” " +
      "name.",
    sources: [
      { title: "Puerto Princesa — Wikipedia", url: "https://en.wikipedia.org/wiki/Puerto_Princesa" },
    ],
  },

  // ── Cabarroguis — capital of Quirino, Philippines ─────────────────────────
  "PH-QUI": {
    description:
      "Cabarroguis's municipal seal reads in its colours and charges: the yellow denotes the people's hopes " +
      "and optimism that the municipality will reach its full economic growth, a sun stands for integrity, and " +
      "a dove for peace.",
    sources: [
      { title: "The Municipal Seal — Municipality of Cabarroguis (official)", url: "https://cabarroguis.gov.ph/municipality/the-lgu-official-seal/" },
    ],
  },

  // ── Cagayan de Oro — capital of Misamis Oriental, Philippines ──────────────
  "PH-MSR": {
    description:
      "Cagayan de Oro's seal plays on its name — “Cagayan of Gold”: a golden cornucopia and gold coins recall " +
      "the gold panned here in Spanish times; two Spanish galleons stand for the maritime trade the port " +
      "carried on even before the Spaniards arrived; a coconut and a pineapple are its two chief exports; and " +
      "three stars stand for the three island groups of the Philippines.",
    sources: [
      { title: "Cagayan de Oro — Wikipedia", url: "https://en.wikipedia.org/wiki/Cagayan_de_Oro" },
      { title: "Coat of arms of Cagayan de Oro — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Cagayan_de_Oro" },
    ],
  },

  // ── Maasin — capital of Southern Leyte, Philippines ───────────────────────
  "PH-SLE": {
    description:
      "Maasin City's seal (dated August 10, 2000, its cityhood) centres a rising sun for the city's rise amid " +
      "challenges and its progress, red for passion and courage; a shield for protection from calamity and " +
      "disorder, blue for loyalty; a Millennium Cross marking Maasin as the “First City of the New Millennium” " +
      "and its people's faith; green fields for its farming and care for the environment; and an encircling " +
      "rope for the strength and unity of the people — and for abaca, a major product.",
    sources: [
      { title: "Symbols of the City — City Government of Maasin (official profile)", url: "https://maasincity.gov.ph/index.php/about/profile" },
    ],
  },

  // ── Islamabad — capital of the Islamabad Capital Territory & of Pakistan ───
  "PK-IS": {
    description:
      "Islamabad's flag is built on Pakistan's national flag: a white crescent and five-pointed star on a " +
      "green field. The crescent stands for progress, the star for light and knowledge, and the green for " +
      "Islam and the nation's Muslim majority. Here the design is set on the diagonal with an added black " +
      "section, so the capital territory's flag reads as its own while still echoing the national colours.",
    sources: [
      { title: "Flag of Pakistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pakistan" },
    ],
  },

  // ── Wrocław — capital of Lower Silesia (Dolnośląskie), Poland ──────────────
  "PL-DS": {
    description:
      "Wrocław's flag is red over yellow — the city's heraldic colours since 1530. Yellow stood for the " +
      "authority of the town, red for the authority of the emperor; both are drawn from the city arms, whose " +
      "central charge is a silver dish bearing the severed head of St John the Baptist, patron of Wrocław " +
      "cathedral.",
    sources: [
      { title: "Flaga Wrocławia — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Flaga_Wroc%C5%82awia" },
    ],
  },

  // ── Bydgoszcz — capital of Kuyavia-Pomerania (Kujawsko-Pomorskie), Poland ──
  "PL-KP": {
    description:
      "Bydgoszcz flies its arms on a white-red-blue field: a red battlemented wall with three towers, blue " +
      "roofs and golden finials, and an open golden gate. The three towers are traditionally read as the " +
      "town's three former gates — Poznańska, Kujawska and Gdańska — and the councillors decreed the gate be " +
      "shown always open, a sign that Bydgoszcz gladly welcomes its guests.",
    sources: [
      { title: "Herb Bydgoszczy — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Bydgoszczy" },
    ],
  },

  // ── Zielona Góra — capital of Lubusz (Lubuskie), Poland ───────────────────
  "PL-LB": {
    description:
      "Zielona Góra's flag sets a yellow stripe at the hoist against horizontal white and green. The yellow " +
      "recalls the city's medieval ties to the Silesian Piasts, whose arms bore a golden field; the white " +
      "stands for its long textile-weaving tradition; and the green for the grapevines and wine-making for " +
      "which Zielona Góra — the northernmost vineyard region in Poland — is famous.",
    sources: [
      { title: "Herb Zielonej Góry — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Zielonej_G%C3%B3ry" },
    ],
  },

  // ── Łódź — capital of Łódź (Łódzkie), Poland ──────────────────────────────
  "PL-LD": {
    description:
      "Łódź flies gold over red charged with a golden boat and oar — for the name Łódź itself, which means " +
      "“boat”. Approved in 1936 as “a golden boat with an oar in a red field”, it puns on the city's name and " +
      "recalls the legend of the settler who, crossing the forest marshes, ended his journey and made his " +
      "home in his boat.",
    sources: [
      { title: "Herb Łodzi — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_%C5%81odzi" },
    ],
  },

  // ── Lublin — capital of Lublin (Lubelskie), Poland ────────────────────────
  "PL-LU": {
    description:
      "Lublin flies its arms on red: a silver goat with golden horns and hooves climbing a green grapevine " +
      "from green turf. The goat upon the vine — both attributes of the goddess Venus, and so of nature's " +
      "fertility — stands for strength, independence and fertility, while the red field is for strength and " +
      "power.",
    sources: [
      { title: "Herb Lublina — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Lublina" },
    ],
  },

  // ── Kraków — capital of Lesser Poland (Małopolskie), Poland ───────────────
  "PL-MA": {
    description:
      "Kraków's flag is white over blue. White is for purity and blue for the waters of the Vistula, and both " +
      "derive from the White Eagle on a blue field in the city arms — a red brick wall with three towers and " +
      "an open gate for the town's municipal rights, with the crowned White Eagle in the gateway marking " +
      "Kraków's royal standing as a capital.",
    sources: [
      { title: "Flaga Krakowa — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Flaga_Krakowa" },
    ],
  },

  // ── Opole — capital of Opole (Opolskie), Poland ───────────────────────────
  "PL-OP": {
    description:
      "Opole's arms, on blue, join half a golden Upper-Silesian eagle to half a golden cross with trefoiled " +
      "ends. The eagle (gold on blue) comes from the arms of the Opole-Racibórz dukes; the half-cross recalls " +
      "the relics of the Holy Cross given to Opole's church in 1024, which became a symbol of the city.",
    sources: [
      { title: "Herb Opola — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Opola" },
    ],
  },

  // ── Białystok — capital of Podlaskie, Poland ──────────────────────────────
  "PL-PD": {
    description:
      "Białystok's arms are divided in fess: on the red upper half a crowned silver eagle, on the golden lower " +
      "half the Lithuanian Pogoń — an armoured knight on a silver horse with sword raised. The White Eagle of " +
      "Poland above the Pogoń of Lithuania reflect the city's place between the two; the arms in this form " +
      "were granted by Tsar Alexander I in 1809.",
    sources: [
      { title: "Herb Białegostoku — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Bia%C5%82egostoku" },
    ],
  },

  // ── Rzeszów — capital of Subcarpathia (Podkarpackie), Poland ──────────────
  "PL-PK": {
    description:
      "Rzeszów flies a silver cavalier's cross on blue. The cross — the kind once awarded to knights for " +
      "courage in battle — stands for bravery and knightly valour, and the blue field for fidelity and " +
      "loyalty. The cavalier's cross has been Rzeszów's arms since at least the 15th century.",
    sources: [
      { title: "Herb Rzeszowa — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Rzeszowa" },
    ],
  },

  // ── Gdańsk — capital of Pomerania (Pomorskie), Poland ─────────────────────
  "PL-PM": {
    description:
      "Gdańsk flies a red flag bearing a golden open crown above two silver crosses in pale. The two crosses " +
      "stand for the city's Christian heritage and its readiness to defend the faith (a legacy of its " +
      "Hanseatic arms); the crown for the privileges and autonomy granted by the Kings of Poland — confirmed " +
      "in 1457 by Kazimierz IV Jagiellończyk, who also gave Gdańsk the right to seal in red wax, hence the " +
      "red field, itself a colour of courage and freedom.",
    sources: [
      { title: "Flaga Gdańska — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Flaga_Gda%C5%84ska" },
    ],
  },

  // ── Kielce — capital of Holy Cross (Świętokrzyskie), Poland ───────────────
  "PL-SK": {
    description:
      "Kielce flies a red flag with the golden letters “CK” beneath a golden crown. CK stands for " +
      "“Civitas Kielcensis”, the city and citizens of Kielce, and the crown for power — a reminder of the " +
      "town's founding under Cardinal Frederick Jagiellon around the year 1500.",
    sources: [
      { title: "Herb Kielc — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Kielc" },
    ],
  },

  // ── Olsztyn — capital of Warmia-Masuria (Warmińsko-Mazurskie), Poland ─────
  "PL-WN": {
    description:
      "Olsztyn's flag sets a golden scallop shell over a white wavy line on blue. The scallop is the " +
      "attribute of St James the Greater, patron of the city's oldest parish, who appears in Olsztyn's arms; " +
      "the wavy line stands for water, for the city's setting on the Łyna river amid its many lakes.",
    sources: [
      { title: "Flaga Olsztyna — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Flaga_Olsztyna" },
    ],
  },

  // ── Poznań — capital of Greater Poland (Wielkopolskie), Poland ────────────
  "PL-WP": {
    description:
      "Poznań flies one of Poland's richest civic arms on white: a wall with three towers and a gate for the " +
      "city's municipal rights, with crossed keys in the gateway for its autonomy. On the side towers stand " +
      "Saints Peter (with a key) and Paul (with a sword), patrons of Poznań's cathedral, the oldest in " +
      "Poland; above the gate a Polish eagle recalls the royal dignity of Przemysł II, who was crowned king " +
      "and whose seat was Poznań; and stars and crescents flank the whole.",
    sources: [
      { title: "Herb Poznania — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Poznania" },
    ],
  },

  // ── Szczecin — capital of West Pomerania (Zachodniopomorskie), Poland ─────
  "PL-ZP": {
    description:
      "Szczecin's arms bear a crowned red griffin's head, with golden crown and beak, on blue. The griffin is " +
      "the emblem of the Griffin dynasty (Gryfici) that ruled the Duchy of Pomerania — a creature of strength " +
      "and agility long favoured by knights — and remains the best-known symbol of the city.",
    sources: [
      { title: "Herb Szczecina — Wikipedia (pl)", url: "https://pl.wikipedia.org/wiki/Herb_Szczecina" },
    ],
  },

  // ── Aveiro — capital of Aveiro district, Portugal ─────────────────────────
  "PT-01": {
    description:
      "Aveiro's gyronny banner carries the city arms: on a green field a silver eagle charged on its breast " +
      "with an escutcheon of the national quinas, a golden sun to the right and a silver moon to the left, " +
      "encircled by the collar of the Order of the Tower and Sword and topped by a five-tower mural crown.",
    sources: [
      { title: "Armas da Cidade — Câmara Municipal de Aveiro", url: "https://www.cm-aveiro.pt/municipio/historia/armas-da-cidade" },
    ],
  },

  // ── Beja — capital of Beja district, Portugal ─────────────────────────────
  "PT-02": {
    description:
      "Beja's arms set a black bull's head, seen from the front, beside a towered wall. The bull's head — on " +
      "the city's arms since its earliest days — stands for strength, endurance and the agricultural wealth of " +
      "the Alentejo plains around Beja.",
    sources: [
      { title: "Heráldica do Município de Beja — Heráldica Cívica", url: "https://www.heraldicacivica.pt/bja.html" },
    ],
  },

  // ── Évora — capital of Évora district, Portugal ───────────────────────────
  "PT-07": {
    description:
      "Évora's gold shield shows the knight Geraldo Geraldes “Sem Pavor” (the Fearless) galloping on a black " +
      "horse, a bloodied silver sword raised, above two severed heads — a man's and a woman's. It commemorates " +
      "Geraldo's night assault that wrested Évora from the Moors, the heads being the Moorish rulers he slew. " +
      "The motto reads “Mui Nobre e Sempre Leal Cidade de Évora”; the gyronny field of red and gold is read as " +
      "blood and gold.",
    sources: [
      { title: "Heráldica — Câmara Municipal de Évora", url: "https://www.cm-evora.pt/municipe/evora/heraldica/" },
    ],
  },

  // ── Faro — capital of Faro district, Portugal ─────────────────────────────
  "PT-08": {
    description:
      "Faro's arms are a homage to the Mother of Christ. A sea-facing walled town rises from wavy water; above " +
      "it a golden eight-pointed star and the image of Our Lady of the Conception — patron of Portugal since " +
      "1646 — in a golden resplendor, flanked by escutcheons of the quinas recalling that Faro belonged to the " +
      "Crown and the Queen's House. The blue field is the sky and celestial love.",
    sources: [
      { title: "Heráldica — Câmara Municipal de Faro", url: "https://www.cm-faro.pt/pt/menu/16/heraldica.aspx" },
    ],
  },

  // ── Leiria — capital of Leiria district, Portugal ─────────────────────────
  "PT-10": {
    description:
      "Leiria's arms place a red castle on a gold field, flanked by two green pine trees — each topped by a " +
      "black raven — rising from a green terrace, with two red eight-pointed stars above and three wavy " +
      "silver-and-blue bands below for the river Lis. The gold signifies loyalty and constancy, the red castle " +
      "victories, and the pines the great Leiria pinewood.",
    sources: [
      { title: "Heráldica do Município de Leiria — Heráldica Cívica", url: "https://www.heraldicacivica.pt/lra.html" },
    ],
  },

  // ── Portalegre — capital of Portalegre district, Portugal ─────────────────
  "PT-12": {
    description:
      "Portalegre's silver shield bears a black battlemented wall between two black towers (lit in gold) with a " +
      "golden gate, the quinas of Portugal in chief. The two towers recall the city's historic defences. Its " +
      "yellow-and-black banner reads its colours: yellow for nobility, faith and fidelity, black for the earth, " +
      "firmness and honesty.",
    sources: [
      { title: "Heráldica do Município de Portalegre — Heráldica Cívica", url: "https://www.heraldicacivica.pt/ptg.html" },
    ],
  },

  // ── Porto — capital of Porto district, Portugal ───────────────────────────
  "PT-13": {
    description:
      "Porto's arms show Our Lady of Vandoma with the Child between two towers on blue — the Virgin's " +
      "protection over the city, and the towers its fortress strength and municipal autonomy. The arms were " +
      "once crowned by a green dragon on a ducal crown, an ancient emblem of the “Invicta” (Unvanquished) " +
      "city; in the 1940s the dragon gave way to a five-castle mural crown.",
    sources: [
      { title: "Porto — Wikipédia (pt)", url: "https://pt.wikipedia.org/wiki/Porto" },
    ],
  },

  // ── Santarém — capital of Santarém district, Portugal ─────────────────────
  "PT-14": {
    description:
      "Santarém's blue shield carries a silver castle, open and lit in red, its central tower charged with the " +
      "“old quinas” of Portugal — a reference to King Afonso Henriques, who took Santarém from the Moors in " +
      "1147. Heraldically the blue is charity, zeal and loyalty, the silver humility and richness, and the red " +
      "wars and victories.",
    sources: [
      { title: "Heráldica — Município de Santarém", url: "https://www.cm-santarem.pt/o-municipio/caraterizacao-santarem/heraldica-santarem" },
    ],
  },

  // ── Funchal — capital of Madeira, Portugal ────────────────────────────────
  "PT-30": {
    description:
      "Funchal's arms are built on Madeira's sugar wealth: five golden sugar loaves arranged in a cross, with " +
      "four golden bunches of grapes, each on a blue escutcheon bearing five silver plates in saltire, beneath " +
      "a five-tower mural crown. Sugar cane reached Madeira in 1425 and its sugar — once reckoned the best in " +
      "the world — enriched the island for centuries.",
    sources: [
      { title: "Heráldica — Câmara Municipal do Funchal", url: "https://www.funchal.pt/municipio/historia/heraldica/" },
    ],
  },

  // ── Villarrica — capital of Guairá, Paraguay ──────────────────────────────
  "PY-4": {
    description:
      "Villarrica del Espíritu Santo carries arms flanked by the Pillars of Hercules with the motto “Plus " +
      "Ultra” and topped by a royal crown. The four quarters bear two rampant lions and two towers — echoing " +
      "the arms of the Spanish city of Toledo — and at the centre a dove for the Holy Spirit (Espíritu " +
      "Santo), for whom the city is named.",
    sources: [
      { title: "Villarrica (Paraguay) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Villarrica_(Paraguay)" },
    ],
  },

  // ── Encarnación — capital of Itapúa, Paraguay ─────────────────────────────
  "PY-7": {
    description:
      "Encarnación's arms are built of stones that spell its department's Guaraní name, Itapúa — itá (stone) " +
      "and pu'ã (raised), a “sonorous stone”. From a stone wall rises a rustic cross of bare timbers for the " +
      "Christian faith; the lower point marks south on the compass rose; two pillars flank the arch as stone " +
      "masts recalling the artistry of the ancestors of the southern Jesuit reductions; and a lapacho, the " +
      "region's most prized timber, stands at the upper left.",
    sources: [
      { title: "Encarnación (Paraguay) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Encarnaci%C3%B3n_(Paraguay)" },
    ],
  },

  // ── Arad — capital of Arad county, Romania ────────────────────────────────
  "RO-AR": {
    description:
      "Arad's shield is split by a wavy silver band. Above, on blue, two silver fortifications under an armed " +
      "arm holding a sword, with the motto “Via Veritas Vita”; below, on red, the episcopal insignia of mitre, " +
      "cross and crosiers. The fortress evokes the city's role in defensive battles, the wavy band the rivers " +
      "that cross Arad county — the Mureș and the White Criș — and the cross the region's long religious " +
      "heritage.",
    sources: [
      { title: "Stema municipiului Arad — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Arad" },
    ],
  },

  // ── Bacău — capital of Bacău county, Romania ──────────────────────────────
  "RO-BC": {
    description:
      "Bacău's arms show, above on red (the colour of Moldavia), the Virgin — Maica Precista, protector of the " +
      "city — and below on blue a stag and a fir tree, the city's oldest heraldic symbols. The band dividing " +
      "the two stands for Bacău's constructive vocation and its aspirations, and the seven-tower mural crown " +
      "for its rank as county seat.",
    sources: [
      { title: "Stema municipiului Bacău — Consiliul Județean Bacău", url: "https://www.csjbacau.ro/dm_cj/portalweb.nsf/AllByUNID/heraldica-00002202" },
    ],
  },

  // ── Oradea — capital of Bihor county, Romania ─────────────────────────────
  "RO-BH": {
    description:
      "Oradea's divided shield shows above, on blue, a Latin cross held by a silver winged archangel and a " +
      "golden crowned lion with a forked tail; below, on red, a gold fortress of five bastions enclosing an " +
      "open book. The crowned lion stands for the defensive struggle led by the voivodes through the ages, and " +
      "the seven-tower mural crown for the city's rank as county seat.",
    sources: [
      { title: "Stema municipiului Oradea — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Oradea" },
    ],
  },

  // ── Bistrița — capital of Bistrița-Năsăud county, Romania ─────────────────
  // ── Brașov — capital of Brașov county, Romania ────────────────────────────
  "RO-BV": {
    description:
      "Brașov's blue shield bears a tree trunk with silver roots rising from a golden crown — a “speaking” " +
      "device, the crown recalling the city's Latin name Corona and its German name Kronstadt. The crown's " +
      "tradition dates from the 14th century; the thirteen roots stand for the thirteen communes of Țara " +
      "Bârsei (the Burzenland) and the trunk for the city's bond with them and its enduring strength.",
    sources: [
      { title: "Stema municipiului Brașov — Primăria Municipiului Brașov", url: "https://www.brasovcity.ro/file-zone/proiecte/hotarare/Stema2022/4.%20Raport%20de%20specialitate%20stema%20Brasov.pdf" },
    ],
  },

  // ── Constanța — capital of Constanța county, Romania ──────────────────────
  "RO-CT": {
    description:
      "Constanța's arms carry two figures drawn from an ancient sculpture unearthed in the city in 1962 — the " +
      "goddess Fortuna and the god Pontos — emblematic of the unbroken continuity between ancient Tomis and " +
      "modern Constanța, above three wavy silver bands for the sea. The seven-tower mural crown marks its rank " +
      "as a county-seat municipality.",
    sources: [
      { title: "Municipiul Constanța are o nouă stemă — Primăria Municipiului Constanța", url: "https://primaria-constanta.ro/anunt-pmc/municipiul-constanta-are-o-noua-stema/" },
    ],
  },

  // ── Galați — capital of Galați county, Romania ────────────────────────────
  "RO-GL": {
    description:
      "Galați's shield, cut by a wavy silver band, shows above on blue a black two-masted ship with silver " +
      "sails, and below two silver fish (on red) and a black caduceus (on gold). The ship marks Galați as a " +
      "great Danube port, documented since the 15th century; the fish its fisheries; and the caduceus — the " +
      "staff of Mercury, god of commerce — the intense trade that by 1711 made it the foremost commercial " +
      "centre on the whole Danube.",
    sources: [
      { title: "Stema municipiului Galați — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Gala%C8%9Bi" },
    ],
  },

  // ── Deva — capital of Hunedoara county, Romania ───────────────────────────
  "RO-HD": {
    description:
      "Deva's arms show above, on red, a golden horseman in antique dress carrying the Dacian standard (the " +
      "wolf-headed serpent) — King Decebalus, for the high Dacian civilisation — and below, on blue, a silver " +
      "fortress between a golden sun and a silver crescent. The fortress evokes the medieval citadel under " +
      "which the town grew, and the sun and crescent its lively life as a chief town of Hunedoara county.",
    sources: [
      { title: "Stema municipiului Deva — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Deva" },
    ],
  },

  // ── Miercurea Ciuc — capital of Harghita county, Romania ──────────────────
  "RO-HR": {
    description:
      "Miercurea Ciuc flies three blue forget-me-not flowers (nu-mă-uita) rising from a red heart — a device " +
      "taken from the town's 18th-century seal. The heart stands for the generosity of the townspeople and " +
      "the forget-me-nots for their honesty.",
    sources: [
      { title: "Stema municipiului Miercurea Ciuc — Ziar Harghita", url: "https://ziarharghita.ro/stema-municipiului-miercurea-ciuc-afost-adoptata-de-guvern" },
    ],
  },

  // ── Bucharest — seat of Ilfov county & capital of Romania ─────────────────
  "RO-IF": {
    description:
      "Bucharest's arms (shown for Ilfov, whose seat it is) place St Demetrius — the city's patron, a military " +
      "saint in Roman dress with spear and cross — on the breast of a golden eagle that holds a cross in its " +
      "beak and a sword and sceptre in its claws, beneath an open crown, over the motto “Patria și Dreptul " +
      "Meu” (Fatherland and My Right). The eagle stands for the Latin origin and continuity of the Romanian " +
      "people, and the open crown is that of Mircea the Old, under whom Bucharest became a residence-capital " +
      "of Wallachia.",
    sources: [
      { title: "Stema municipiului București — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Bucure%C8%99ti" },
    ],
  },

  // ── Iași — capital of Iași county, Romania ────────────────────────────────
  "RO-IS": {
    description:
      "Iași's red shield holds a silver citadel, and upon it a red escutcheon with a black horse galloping " +
      "beneath an open golden crown — the medieval seal-emblem of Iași, attested in 1609, symbol of the old " +
      "voivodal town. Above, rising from the mural crown, the aurochs head of Moldavia marks the three " +
      "centuries Iași served as Moldavia's capital.",
    sources: [
      { title: "Stema municipiului Iași — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Ia%C8%99i" },
    ],
  },

  // ── Ploiești — capital of Prahova county, Romania ─────────────────────────
  "RO-PH": {
    description:
      "Ploiești's blue shield shows two golden lions uprooting a silver oak, set on a red sash reading " +
      "“M.V.V.”. The device is taken from the seal of Mihai Viteazul (Michael the Brave — Voievod), who " +
      "founded the city; the lions tearing the oak from the ground commemorate the toil of the first settlers, " +
      "who cleared the forest year by year to build and enlarge their town.",
    sources: [
      { title: "Stema municipiului Ploiești — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Ploie%C8%99ti" },
    ],
  },

  // ── Sibiu — capital of Sibiu county, Romania ──────────────────────────────
  "RO-SB": {
    description:
      "Sibiu's red shield bears two crossed silver swords, points downward, supporting an open golden crown " +
      "and piercing a golden water-lily triangle. The downward swords signify, by medieval custom, the taking " +
      "of the land and the citizens' will to defend the town and their rights; the foliate “corona regia” " +
      "marks Sibiu as a free royal town on the King's Land (fundus regius); the red field its local autonomy; " +
      "and the water-lily triangle its civic solidarity.",
    sources: [
      { title: "Stema Sibiului — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_Sibiului" },
    ],
  },

  // ── Timișoara — capital of Timiș county, Romania ──────────────────────────
  "RO-TM": {
    description:
      "Timișoara's red flag bears a silver cross — the banner flown from the water-tower in the city's coat of " +
      "arms, which recalls that Timișoara was the first city in Europe with a centralised drinking-water " +
      "supply. The fuller arms also carry the golden lion and bridge of Oltenia, tying this Banat city to the " +
      "Romanian lands, and a tricolour for the anti-communist Revolution that began here in December 1989.",
    sources: [
      { title: "Stema municipiului Timișoara — Wikipedia (ro)", url: "https://ro.wikipedia.org/wiki/Stema_municipiului_Timi%C8%99oara" },
    ],
  },

  // ── Subotica — capital of North Bačka district, Serbia ────────────────────
  "RS-01": {
    description:
      "Subotica's arms show, above on blue, the Virgin Mary in scarlet with the Christ child, before whom St " +
      "Theresa of Ávila reaches out in the habit of a barefoot Carmelite; below, a golden lion rampant holding " +
      "a sword. They date from Subotica's elevation to a free royal city in 1779; St Theresa is patroness of " +
      "the city and its cathedral, and the arms reflect its Habsburg (Maria Theresa) and Catholic heritage.",
    sources: [
      { title: "Grb i zastava grada — Grad Subotica (official)", url: "https://subotica.ls.gov.rs/grb-i-zastava-grada/?pismo=lat" },
    ],
  },

  // ── Zrenjanin — capital of Central Banat district, Serbia ─────────────────
  "RS-02": {
    description:
      "Zrenjanin's arms are a stylised Assumption of the Virgin: Mary in white and light blue, ringed by " +
      "winged angel heads and radiating heavenly light on an oval silver-bordered shield. They were granted in " +
      "1769, when Maria Theresa raised Bečkerek to a market town — the settlement's oldest church having been " +
      "dedicated to the Assumption of the Holy Virgin.",
    sources: [
      { title: "Grb Zrenjanina — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%97%D1%80%D0%B5%D1%9A%D0%B0%D0%BD%D0%B8%D0%BD%D0%B0" },
    ],
  },

  // ── Kikinda — capital of North Banat district, Serbia ─────────────────────
  "RS-03": {
    description:
      "Kikinda flies a red shield with a golden arm brandishing a sabre on which a severed Ottoman head is " +
      "impaled, a heart below. The device was adopted with the founding of the Velika Kikinda District in " +
      "1774, when the region was settled by frontier soldiers who had fought in the wars against Ottoman rule.",
    sources: [
      { title: "Grb Kikinde — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%9A%D0%B8%D0%BA%D0%B8%D0%BD%D0%B4%D0%B0" },
    ],
  },

  // ── Pančevo — capital of South Banat district, Serbia ─────────────────────
  "RS-04": {
    description:
      "Pančevo's Renaissance shield shows a two-towered fortress with an open gate in which an armoured knight " +
      "stands with a lance, and below it two wavy stripes for the rivers Danube and Tamiš, beneath a five-tower " +
      "crown. The fortress stands for the city's strength and defence and the knight for its warrior tradition, " +
      "while the two rivers were vital to Pančevo's growth.",
    sources: [
      { title: "Odluka o upotrebi imena, grba i zastave grada Pančeva (official)", url: "http://demo.paragraf.rs/demo/combined/Old/t/t2009_09/t09_0191.htm" },
    ],
  },

  // ── Novi Sad — capital of South Bačka district, Serbia ────────────────────
  "RS-06": {
    description:
      "Novi Sad's arms — its emblem since it became a free royal city in 1748 — carry three towers, the wavy " +
      "Danube over a green field, and Noah's dove with an olive branch. The three towers recall the city's " +
      "origin as a border fortress by Petrovaradin; the Danube and the dove its rebirth after the Turkish wars " +
      "and past floods, and its hope for a better future.",
    sources: [
      { title: "Grb Novog Sada — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%9D%D0%BE%D0%B2%D0%BE%D0%B3_%D0%A1%D0%B0%D0%B4%D0%B0" },
    ],
  },

  // ── Sremska Mitrovica — capital of Srem district, Serbia ──────────────────
  "RS-07": {
    description:
      "Sremska Mitrovica's arms show three mounds at the top, one of them aflame for struggle and the fallen; " +
      "a Roman fortress with a Roman soldier bearing shield and spear, for the city built on the ruins of " +
      "ancient Sirmium; and a green field with a wavy line for the plains of Srem and the Danube. The " +
      "inscriptions name it “Civitas Sancti Demetrii”, the City of St Demetrius — its patron, martyred at " +
      "Sirmium.",
    sources: [
      { title: "Sremska Mitrovica — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%A1%D1%80%D0%B5%D0%BC%D1%81%D0%BA%D0%B0_%D0%9C%D0%B8%D1%82%D1%80%D0%BE%D0%B2%D0%B8%D1%86%D0%B0" },
    ],
  },

  // ── Valjevo — capital of Kolubara district, Serbia ────────────────────────
  "RS-09": {
    description:
      "Valjevo's arms are ringed by red, blue and white flags — the colours of the Serbian flag — recalling " +
      "the people's long struggle for their identity, together with the double-headed white eagle of Serbia. " +
      "The eagle ties Valjevo to the First Serbian Uprising: it appears on Karađorđe's seal of 1806 and on the " +
      "1813 plaque of voivode Jakov Nenadović at the Kličevac powder-magazine near the town.",
    sources: [
      { title: "Odluka o grbu i zastavi grada Valjeva (official)", url: "http://demo.paragraf.rs/demo/combined/Old/t/t2010_10/t10_0359.htm" },
    ],
  },

  // ── Smederevo — capital of Podunavlje district, Serbia ────────────────────
  "RS-10": {
    description:
      "Smederevo's emblem carries six white discs (grapes), the great Smederevo fortress, and blue-and-white " +
      "bands for the Danube, over a ribbon reading 1430. That is the year Despot Đurađ Branković completed the " +
      "fortress, when Smederevo became the capital of the Serbian Despotate — which it remained until 1439.",
    sources: [
      { title: "Grb Smedereva — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%A1%D0%BC%D0%B5%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%B0" },
    ],
  },

  // ── Požarevac — capital of Braničevo district, Serbia ─────────────────────
  "RS-11": {
    description:
      "Požarevac flies, on orange, a stylised sword, the Kličevac idol and an olive branch above three lines " +
      "for the three rivers the city reaches — the Velika Morava, the Mlava and the Danube. The Kličevac idol, " +
      "a celebrated Bronze-Age statue of a sun-and-beauty god, stands between the sword of war and the olive " +
      "branch of peace.",
    sources: [
      { title: "Odluka o grbu i zastavi grada Požarevca (official)", url: "http://demo.paragraf.rs/demo/combined/Old/t/t2013_05/t05_0181.htm" },
    ],
  },

  // ── Kragujevac — capital of Šumadija district, Serbia ─────────────────────
  "RS-12": {
    description:
      "Kragujevac flies a heraldic kraguj — a natural-coloured eagle poised for flight, a pun on the city's " +
      "name — standing on a cut oak branch, the sacred tree of the Slavs. A silver cross with four firesteels " +
      "(ocila) recalls Kragujevac's standing as a centre of Serbia and a former Serbian capital.",
    sources: [
      { title: "Simboli grada — Grad Kragujevac (official)", url: "https://kragujevac.ls.gov.rs/tekst/sr/195/simboli-grada.php" },
    ],
  },

  // ── Zaječar — capital of Zaječar district, Serbia ─────────────────────────
  "RS-15": {
    description:
      "Zaječar's arms carry a Roman imperial helmet for the palace of Felix Romuliana at nearby Gamzigrad, the " +
      "cultural emblem of the town; a fountain for the health and life of the Gamzigrad spa; and above, the " +
      "blue Timok flowing through green valleys past a fortress that meets the rising sun — the town as a " +
      "frontier stronghold. The red margin stands for the blood of its known and unknown heroes.",
    sources: [
      { title: "Grb opštine Zaječar — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%BE%D0%BF%D1%88%D1%82%D0%B8%D0%BD%D0%B5_%D0%97%D0%B0%D1%98%D0%B5%D1%87%D0%B0%D1%80" },
    ],
  },

  // ── Užice — capital of Zlatibor district, Serbia ──────────────────────────
  "RS-16": {
    description:
      "Užice's shield, divided blue and gold, carries three silver eagles taken from the arms of the medieval " +
      "lords Vojinović-Altomanović, above a citadel. The base shows the mountain landscape and the river " +
      "Đetinja, together with the ruj (smoke tree) that is characteristic of the Užice region.",
    sources: [
      { title: "Grb Užica — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%A3%D0%B6%D0%B8%D1%86%D0%B0" },
    ],
  },

  // ── Kraljevo — capital of Raška district, Serbia ──────────────────────────
  "RS-18": {
    description:
      "Kraljevo flies a red shield with seven golden royal crowns — for the seven kings crowned at the nearby " +
      "Žiča monastery, from which the town takes its name, “Kraljevo”, the King's town. The great arms add a " +
      "silver falcon and the motto “Nama dobro a nikome zlo” (good to us, evil to none).",
    sources: [
      { title: "Odluka o grbu i zastavi grada Kraljeva (official)", url: "http://demo.paragraf.rs/demo/combined/Old/t/t2009_09/t09_0118.htm" },
    ],
  },

  // ── Kruševac — capital of Rasina district, Serbia ─────────────────────────
  "RS-19": {
    description:
      "Kruševac's emblem bears the year 1371 — when Prince Lazar built the town, of river-stone (krušac, from " +
      "which its name derives), as his capital. From here medieval Serbia was governed in the years before the " +
      "Battle of Kosovo.",
    sources: [
      { title: "Grb Kruševca — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%9A%D1%80%D1%83%D1%88%D0%B5%D0%B2%D1%86%D0%B0" },
    ],
  },

  // ── Niš — capital of Nišava district, Serbia ──────────────────────────────
  "RS-20": {
    description:
      "Niš's arms are built on the Niš Fortress, the great citadel on the Nišava that is the city's chief " +
      "landmark and its emblem.",
    sources: [
      { title: "Grb Niša — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%9D%D0%B8%D1%88%D0%B0" },
    ],
  },

  // ── Pirot — capital of Pirot district, Serbia ─────────────────────────────
  "RS-22": {
    description:
      "Pirot's emblem shows the pattern of the Pirot ćilim, the traditional flat-woven wool carpet — a " +
      "protected craft — for which the town is celebrated.",
    sources: [
      { title: "Grb Pirota — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%9F%D0%B8%D1%80%D0%BE%D1%82%D0%B0" },
    ],
  },

  // ── Leskovac — capital of Jablanica district, Serbia ──────────────────────
  "RS-23": {
    description:
      "Leskovac's arms carry a red double-headed eagle on silver, recalling Stefan Nemanja's winning of " +
      "Dubočica from Byzantium — the red eagle being the Byzantine mark of the despots that the Nemanjić " +
      "rulers bore. The blue field alludes to the Morava, gold to holiness; a cross of plaited cord joins the " +
      "cross of faith to the gajtan (braid) craft from which Leskovac's textile industry grew; and golden " +
      "hazelnuts pun on the name Leskovac (leska, the hazel).",
    sources: [
      { title: "Grb Leskovca — Wikipedia (sr)", url: "https://sr.wikipedia.org/sr-el/%D0%93%D1%80%D0%B1_%D0%9B%D0%B5%D1%81%D0%BA%D0%BE%D0%B2%D1%86%D0%B0" },
    ],
  },

  // ── Vranje — capital of Pčinja district, Serbia ───────────────────────────
  "RS-24": {
    description:
      "Vranje flies a golden ocilo — the firesteel-cross of the Serbian state arms — shaped to suggest the " +
      "letter V for Vranje, on blue beneath a silver mural crown whose crenellations reflect the city's " +
      "population; the flag itself is yellow, quartered by a red cross.",
    sources: [
      { title: "Novi grb i zastava — RTS", url: "https://www.rts.rs/lat/vesti/srbija-danas/1463810/novi-grb-i-zastava-.html" },
    ],
  },

  // ── Pristina — seat of Kosovo and Metohija (claimed by Serbia) ────────────
  "RS-KM~": {
    description:
      "Pristina's flag bears the “Goddess on the Throne” (Hyjnesha në Fron), the Neolithic terracotta " +
      "figurine of the Vinča culture unearthed near the city. Pristina has adopted this ancient seated figure " +
      "as its emblem and a symbol of the region's deep prehistoric heritage.",
    sources: [
      { title: "Pristina — Wikipedia", url: "https://en.wikipedia.org/wiki/Pristina" },
    ],
  },

  // ── Barnaul — capital of Altai Krai, Russia ───────────────────────────────
  "RU-ALT": {
    description:
      "Barnaul's arms show a silver smelting furnace amid rocks on green. The city grew up around the " +
      "Demidov (later imperial) silver-smelting works, and the furnace stands for that silver industry, the " +
      "rocks for the ore of the Altai mountains.",
    sources: [
      { title: "Герб Барнаула — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%91%D0%B0%D1%80%D0%BD%D0%B0%D1%83%D0%BB%D0%B0" },
    ],
  },

  // ── Blagoveshchensk — capital of Amur Oblast, Russia ──────────────────────
  "RU-AMU": {
    description:
      "Blagoveshchensk's name means “Good News” — the Annunciation (Благовещение). Its flag, descended from " +
      "the 1878 arms of the Amur Province, carries a silver band for the Amur river on whose bank the city " +
      "stands, golden stars for that “Good News”, and green for the region's abundance and freedom.",
    sources: [
      { title: "Символика города Благовещенска — Благовещенская городская Дума (official)", url: "https://www.blagduma.ru/symbol" },
    ],
  },

  // ── Astrakhan — capital of Astrakhan Oblast, Russia ───────────────────────
  "RU-AST": {
    description:
      "Astrakhan flies a golden royal crown and a silver sword — once an eastern sabre — on blue, beneath the " +
      "Astrakhan cap. The crown recalls the former statehood of the Astrakhan khanate, annexed to Russia in " +
      "1556; the sabre guards that crown and the southern frontier, pointing to where the danger to Russia " +
      "came from.",
    sources: [
      { title: "Герб Астрахани — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%90%D1%81%D1%82%D1%80%D0%B0%D1%85%D0%B0%D0%BD%D0%B8" },
    ],
  },

  // ── Belgorod — capital of Belgorod Oblast, Russia ─────────────────────────
  "RU-BEL": {
    description:
      "Belgorod flies a golden lion beneath a silver eagle in flight, on blue. The device comes from the " +
      "banner of the Belgorod Regiment that fought at the Battle of Poltava in 1709: the lion, for strength " +
      "and courage, is Russia, and the eagle fleeing above it is Sweden — the Russian victory of Poltava.",
    sources: [
      { title: "Герб Белгорода — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%91%D0%B5%D0%BB%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0" },
    ],
  },

  // ── Bryansk — capital of Bryansk Oblast, Russia ───────────────────────────
  "RU-BRY": {
    description:
      "Bryansk's arms show a golden mortar on its carriage with pyramids of cannonballs, on red over green. " +
      "They stand for the Bryansk Arsenal, which for two centuries cast the artillery of the Russian army.",
    sources: [
      { title: "Герб Брянска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%91%D1%80%D1%8F%D0%BD%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Ivanovo — capital of Ivanovo Oblast, Russia ───────────────────────────
  "RU-IVA": {
    description:
      "Ivanovo flies a young woman at a spinning wheel on blue — for the textile industry that made the city " +
      "the “Russian Manchester” and the textile capital of the country.",
    sources: [
      { title: "Герб Иванова — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D0%B0" },
    ],
  },

  // ── Petropavlovsk-Kamchatsky — capital of Kamchatka Krai, Russia ──────────
  "RU-KAM": {
    description:
      "Petropavlovsk-Kamchatsky flies three fire-breathing volcanoes — the “home volcanoes” Koryaksky, " +
      "Avachinsky and Kozelsky that overlook the city — above the blue of Avacha Bay, the great harbour on " +
      "which the port was founded.",
    sources: [
      { title: "Герб Петропавловска-Камчатского — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%BF%D0%B0%D0%B2%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B0-%D0%9A%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%BE%D0%B3%D0%BE" },
    ],
  },

  // ── Nalchik — capital of Kabardino-Balkaria, Russia ───────────────────────
  "RU-KB": {
    description:
      "Nalchik flies a green horseshoe, points up, ringed by a blue fir wreath and enclosing a half-risen sun " +
      "charged with the two-peaked Mount Elbrus. Nalchik means “little horseshoe”: the city sits in a " +
      "half-ring of surrounding mountains, and the horseshoe also stands for protection and rebirth, the " +
      "green for one of the greenest, most scenic cities of the North Caucasus.",
    sources: [
      { title: "Герб Нальчика — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9D%D0%B0%D0%BB%D1%8C%D1%87%D0%B8%D0%BA%D0%B0" },
    ],
  },

  // ── Krasnodar — capital of Krasnodar Krai, Russia ─────────────────────────
  "RU-KDA": {
    description:
      "Krasnodar's arms centre on a golden fortress beneath the Russian double-headed eagle, with the " +
      "monogram of Catherine II and the mace and banners of the Black Sea Cossack Host. The fortress is " +
      "Yekaterinodar, founded in 1793 on the Kuban land Catherine had granted the Cossacks — the city renamed " +
      "Krasnodar in 1920.",
    sources: [
      { title: "Герб Краснодара — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%D0%B0" },
    ],
  },

  // ── Kemerovo — capital of Kemerovo Oblast, Russia ─────────────────────────
  "RU-KEM": {
    description:
      "Kemerovo's arms place a chemical retort within a golden gearwheel and ears of wheat, on black and red " +
      "— for the coal, the chemical industry and the mining of the Kuzbass, and the farming around it. The " +
      "black stands for the region's coal.",
    sources: [
      { title: "Герб Кемерова — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D0%B5%D0%BC%D0%B5%D1%80%D0%BE%D0%B2%D0%B0" },
    ],
  },

  // ── Kaliningrad — capital of Kaliningrad Oblast, Russia ───────────────────
  "RU-KGD": {
    description:
      "Kaliningrad flies a silver single-masted ship — a Petrine-era koch flying a St Andrew's pennant — above " +
      "a wavy band of twelve golden bezants on blue. The ship stands for the maritime history of old " +
      "Königsberg, and the twelve golden discs for amber, marking Kaliningrad as the heart of the amber land.",
    sources: [
      { title: "Герб Калининграда — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D0%B0" },
    ],
  },

  // ── Kurgan — capital of Kurgan Oblast, Russia ─────────────────────────────
  "RU-KGN": {
    description:
      "Kurgan flies a green field with two silver kurgans — the ancient burial mounds that stand by the city " +
      "and give it its name (kurgan means “burial mound”). The arms were granted in 1785; the green stands for " +
      "fertility and life.",
    sources: [
      { title: "Герб Кургана — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D1%83%D1%80%D0%B3%D0%B0%D0%BD%D0%B0" },
    ],
  },

  // ── Khabarovsk — capital of Khabarovsk Krai, Russia ───────────────────────
  "RU-KHA": {
    description:
      "Khabarovsk's shield is upheld by a white-breasted bear and an Amur tiger — the beasts endemic to the " +
      "Amur land and the city's guardians (the tiger for valour, the bear for strength and foresight). A " +
      "forked cross marks the city's site where the Ussuri flows into the Amur, and a fish its people's chief " +
      "trade of fishing.",
    sources: [
      { title: "Герб Хабаровска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A5%D0%B0%D0%B1%D0%B0%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Khanty-Mansiysk — capital of Khanty-Mansi Autonomous Okrug, Russia ────
  "RU-KHM": {
    description:
      "Khanty-Mansiysk flies a white Siberian crane (sterkh) with outspread wings for the city's purity and " +
      "unique setting; three emerald firs shaped like chum-tents against a golden hemisphere for the taiga " +
      "that surrounds it; and three snowflakes for the long northern winter.",
    sources: [
      { title: "Герб Ханты-Мансийска — bankgorodov.ru", url: "https://bankgorodov.ru/place/hanti-mansiisk/gerb" },
    ],
  },

  // ── Kirov — capital of Kirov Oblast, Russia ───────────────────────────────
  "RU-KIR": {
    description:
      "Kirov flies a golden field with a hand emerging from a cloud, drawing a bow and arrow, and a red cross " +
      "above. From the old arms of Vyatka, the bow-armed hand stands for the Vyatchane's tactic of swift, " +
      "small raiding parties; the red cross added later gives the hand-from-the-cloud the sense of divine " +
      "providence.",
    sources: [
      { title: "Герб Кирова — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D0%B0_(%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C)" },
    ],
  },

  // ── Abakan — capital of Khakassia, Russia ─────────────────────────────────
  "RU-KK": {
    description:
      "Abakan's shield is split blue and green: the blue for the sky and the Yenisei, bearing three golden " +
      "ancient stone idols that recall Abakan's unrivalled collection of prehistoric stelae; the green for the " +
      "surrounding steppe; and over them a golden zharok (globe-flower) for the “ever-blooming city”.",
    sources: [
      { title: "Герб Абакана — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%90%D0%B1%D0%B0%D0%BA%D0%B0%D0%BD%D0%B0" },
    ],
  },

  // ── Elista — capital of Kalmykia, Russia ──────────────────────────────────
  "RU-KL": {
    description:
      "Elista flies a white lotus — in Buddhist Kalmykia the symbol of spiritual purity, rebirth and " +
      "prosperity. Its five upper petals stand for the five continents and its four lower petals for the four " +
      "points of the compass, together expressing the Kalmyk people's openness to the world.",
    sources: [
      { title: "Герб Элисты — Геральдикум", url: "https://www.heraldicum.ru/russia/subjects/towns/elista.htm" },
    ],
  },

  // ── Kaluga — capital of Kaluga Oblast, Russia ─────────────────────────────
  "RU-KLU": {
    description:
      "Kaluga flies a wavy silver band for the Oka river, crowned by the Imperial crown, on blue — arms " +
      "granted by Catherine II in 1777, the crown marking the city's rank as seat of a governorship. A Sputnik " +
      "and the motto “Cradle of Cosmonautics” were later added for Konstantin Tsiolkovsky, who lived and " +
      "worked in Kaluga.",
    sources: [
      { title: "Герб Калуги — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D0%B0%D0%BB%D1%83%D0%B3%D0%B8" },
    ],
  },

  // ── Syktyvkar — capital of the Komi Republic, Russia ──────────────────────
  "RU-KO": {
    description:
      "Syktyvkar flies a golden bear lying in its den on blue — from the historic arms of Ust-Sysolsk, a " +
      "“symbol of foresight and strength” chosen for the bears that once filled the surrounding forests. In " +
      "the modern arms the bear is the city's talisman and the guardian of its traditions, framed by Komi " +
      "ornament.",
    sources: [
      { title: "Герб Сыктывкара — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A1%D1%8B%D0%BA%D1%82%D1%8B%D0%B2%D0%BA%D0%B0%D1%80%D0%B0" },
    ],
  },

  // ── Kostroma — capital of Kostroma Oblast, Russia ─────────────────────────
  "RU-KOS": {
    description:
      "Kostroma flies a golden galley with furled sails and ten oarsmen, flying the Imperial standard, on " +
      "blue. It commemorates Empress Catherine II's voyage down the Volga in 1767 aboard a galley built for " +
      "the journey, during which she visited Kostroma.",
    sources: [
      { title: "Герб Костромы — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%BC%D1%8B" },
    ],
  },

  // ── Petrozavodsk — capital of the Republic of Karelia, Russia ─────────────
  "RU-KR": {
    description:
      "Petrozavodsk's arms show three iron hammers on a field striped green and gold, “in token of the " +
      "abundance of ores and the many ironworks of the region”; above, a hand from a cloud holds a shield " +
      "with four chained cannonballs, for the frontier town's constant need of defence. Petrozavodsk — " +
      "“Peter's ironworks” — was founded by Peter the Great.",
    sources: [
      { title: "Герб Петрозаводска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B7%D0%B0%D0%B2%D0%BE%D0%B4%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Kursk — capital of Kursk Oblast, Russia ───────────────────────────────
  "RU-KRS": {
    description:
      "Kursk flies a silver field with a blue diagonal band bearing three flying partridges — first recorded " +
      "in the banner-armorial of 1730, for the partridges that once abounded in the Kursk lands.",
    sources: [
      { title: "Герб Курска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Krasnoyarsk — capital of Krasnoyarsk Krai, Russia ─────────────────────
  "RU-KYA": {
    description:
      "Krasnoyarsk flies a red shield with a golden lion holding a golden spade in one paw and a golden sickle " +
      "in the other — the lion for might and courage, the spade for the region's mining wealth and the sickle " +
      "for its agriculture.",
    sources: [
      { title: "Герб Красноярска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Gatchina — seat of Leningrad Oblast, Russia ───────────────────────────
  "RU-LEN": {
    description:
      "Gatchina's arms carry the imperial monogram of Paul I — placed there as a mark of the emperor's " +
      "special favour, Gatchina being his residence — on the breast of a double-headed eagle, over a Maltese " +
      "star (Paul was Grand Master of the Order of Malta). The eagle stands for power and foresight.",
    sources: [
      { title: "Герб Гатчины — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%93%D0%B0%D1%82%D1%87%D0%B8%D0%BD%D1%8B" },
    ],
  },

  // ── Lipetsk — capital of Lipetsk Oblast, Russia ───────────────────────────
  "RU-LIP": {
    description:
      "Lipetsk flies a great emerald linden tree on gold — a canting device for the city's name, from lipa, " +
      "the linden. In heraldry the linden stands for cordiality and goodwill, and for life itself.",
    sources: [
      { title: "Герб Липецка — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9B%D0%B8%D0%BF%D0%B5%D1%86%D0%BA%D0%B0" },
    ],
  },

  // ── Magadan — capital of Magadan Oblast, Russia ───────────────────────────
  "RU-MAG": {
    description:
      "Magadan flies a golden deer leaping across a red field above two golden stars — the deer for the " +
      "region's two great industries, gold mining and reindeer herding. The wavy base marks Magadan as the " +
      "sea gateway to Kolyma.",
    sources: [
      { title: "Герб Магадана — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D0%B3%D0%B0%D0%B4%D0%B0%D0%BD" },
    ],
  },

  // ── Yoshkar-Ola — capital of the Mari El Republic, Russia ─────────────────
  "RU-ME": {
    description:
      "Yoshkar-Ola flies a silver elk with golden antlers and hooves on blue, crowned with Mari national " +
      "ornament. The elk — “king of the Mari forests” — stands for nobility and strength and for the rich " +
      "woods and meadows around the city; the first arms, with a cow elk, were granted by Catherine II in " +
      "1781.",
    sources: [
      { title: "Герб Йошкар-Олы — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%99%D0%BE%D1%88%D0%BA%D0%B0%D1%80-%D0%9E%D0%BB%D1%8B" },
    ],
  },

  // ── Saransk — capital of the Republic of Mordovia, Russia ─────────────────
  "RU-MO": {
    description:
      "Saransk flies a red fox running beneath three arrows on silver — recalling the old local trade of " +
      "hunting fur-bearing game. The fox stands for shrewdness and foresight, the red for courage, the silver " +
      "for wisdom and peace.",
    sources: [
      { title: "Герб Саранска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A1%D0%B0%D1%80%D0%B0%D0%BD%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Naryan-Mar — capital of the Nenets Autonomous Okrug, Russia ───────────
  "RU-NEN": {
    description:
      "Naryan-Mar flies a silver reindeer head on red, over a blue base with two silver fish — the reindeer " +
      "head for the Nenets' chief occupation of reindeer herding, the fish and water for their fishing. White " +
      "stands for purity, blue for the waters, red for courage.",
    sources: [
      { title: "Герб Нарьян-Мара — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9D%D0%B0%D1%80%D1%8C%D1%8F%D0%BD-%D0%9C%D0%B0%D1%80%D0%B0" },
    ],
  },

  // ── Nizhny Novgorod — capital of Nizhny Novgorod Oblast, Russia ───────────
  "RU-NIZ": {
    description:
      "Nizhny Novgorod flies a red deer walking on silver — for majesty, wisdom and nobility. Its antlers " +
      "came to be read as the two rivers, the Volga and the Oka, that meet at the city, and their tines as its " +
      "districts.",
    sources: [
      { title: "Герб Нижнего Новгорода — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9D%D0%B8%D0%B6%D0%BD%D0%B5%D0%B3%D0%BE_%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0" },
    ],
  },

  // ── Novosibirsk — capital of Novosibirsk Oblast, Russia ───────────────────
  "RU-NVS": {
    description:
      "Novosibirsk's arms cross a blue band with silver waves — the river Ob — with a black-and-silver band " +
      "for the Trans-Siberian Railway; at their meeting a golden bridge marks the structure around which the " +
      "city grew. Two black sables, from the historic arms of Siberia, support the shield.",
    sources: [
      { title: "Герб Новосибирска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Omsk — capital of Omsk Oblast, Russia ─────────────────────────────────
  "RU-OMS": {
    description:
      "Omsk flies part of a fortified brick line on silver, beneath the motto “This is the chief fortress”. It " +
      "recalls Omsk's role as the principal stronghold of the Siberian defensive Line; the arms were confirmed " +
      "by Catherine II in 1785.",
    sources: [
      { title: "Герб Омска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9E%D0%BC%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Orenburg — capital of Orenburg Oblast, Russia ─────────────────────────
  "RU-ORE": {
    description:
      "Orenburg's golden field is split by a wavy blue band for the river Ural; above it the double-headed " +
      "imperial eagle stands for state power and the city's service to the Fatherland, and below a blue St " +
      "Andrew's cross for the city's loyalty. The arms were granted in 1782.",
    sources: [
      { title: "Герб Оренбурга — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9E%D1%80%D0%B5%D0%BD%D0%B1%D1%83%D1%80%D0%B3%D0%B0" },
    ],
  },

  // ── Perm — capital of Perm Krai, Russia ───────────────────────────────────
  "RU-PER": {
    description:
      "Perm flies a silver walking bear carrying a golden Gospel on its back, with a silver cross above, on " +
      "red. The device comes from Perm's seal on Ivan the Terrible's Great State Seal of 1577: the bear stands " +
      "for the old wildness of the land's people, and the cross and Gospel for their enlightenment through the " +
      "Christian faith.",
    sources: [
      { title: "Герб Перми — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9F%D0%B5%D1%80%D0%BC%D0%B8" },
    ],
  },

  // ── Penza — capital of Penza Oblast, Russia ───────────────────────────────
  "RU-PNZ": {
    description:
      "Penza flies three golden sheaves — of wheat, barley and millet — on golden earth in a green field, for " +
      "the rich farming of the Penza land. The device was taken from the emblem of the Penza Regiment.",
    sources: [
      { title: "Герб Пензы — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9F%D0%B5%D0%BD%D0%B7%D1%8B" },
    ],
  },

  // ── Vladivostok — capital of Primorsky Krai, Russia ───────────────────────
  "RU-PRI": {
    description:
      "Vladivostok flies a golden Ussuri tiger climbing a silver rocky slope on green — the tiger for valour " +
      "and courage, its upward climb for the city's continuous growth, and the green for the forest wealth of " +
      "the Primorye.",
    sources: [
      { title: "Герб Владивостока — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%B2%D0%BE%D1%81%D1%82%D0%BE%D0%BA%D0%B0" },
    ],
  },

  // ── Pskov — capital of Pskov Oblast, Russia ───────────────────────────────
  "RU-PSK": {
    description:
      "Pskov flies a golden leopard (bars) on blue, blessed by a hand that emerges from a cloud above. The " +
      "leopard stands for the Pskovians' readiness to meet any foe fully armed, and their courage; the " +
      "blessing hand for the protection of heaven. The arms were settled in 1781.",
    sources: [
      { title: "Герб Пскова — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9F%D1%81%D0%BA%D0%BE%D0%B2%D0%B0" },
    ],
  },

  // ── Rostov-on-Don — capital of Rostov Oblast, Russia ──────────────────────
  "RU-ROS": {
    description:
      "Rostov-on-Don's arms carry a fortress tower and a trophy of arms, recalling the city's founding as the " +
      "fortress of St Dmitry of Rostov in 1749, raised to guard the frontier against the raids of nomad " +
      "peoples.",
    sources: [
      { title: "Герб Ростова-на-Дону — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2%D0%B0-%D0%BD%D0%B0-%D0%94%D0%BE%D0%BD%D1%83" },
    ],
  },

  // ── Ryazan — capital of Ryazan Oblast, Russia ─────────────────────────────
  "RU-RYA": {
    description:
      "Ryazan flies a standing prince in a red cloak, green cap and boots, a silver sword in one hand and its " +
      "scabbard in the other — the collective image of Ryazan's warriors and their commander (popularly Grand " +
      "Prince Oleg Ivanovich), guardians of a long-embattled frontier land.",
    sources: [
      { title: "Герб Рязани — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A0%D1%8F%D0%B7%D0%B0%D0%BD%D0%B8" },
    ],
  },

  // ── Yakutsk — capital of the Sakha Republic (Yakutia), Russia ─────────────
  "RU-SA": {
    description:
      "Yakutsk flies a black eagle in flight, one wing raised and one lowered, holding a red sable in its " +
      "claws, on silver. The eagle stands for power and foresight, the sable for the fur-wealth of the Yakut " +
      "land, and the silver field for the purity of the region.",
    sources: [
      { title: "Герб Якутска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%AF%D0%BA%D1%83%D1%82%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Yuzhno-Sakhalinsk — capital of Sakhalin Oblast, Russia ────────────────
  "RU-SAK": {
    description:
      "Yuzhno-Sakhalinsk's arms carry a symbolic key upheld by two bears on a curving ribbon. The key stands " +
      "for the city's strategic position and the beginning of its growth; its bow and a flower reproduce the " +
      "ornament on ceramics found at an ancient island settlement; and the bear is a symbol of strength revered " +
      "by the island's ancient peoples.",
    sources: [
      { title: "Герб Южно-Сахалинска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%AE%D0%B6%D0%BD%D0%BE-%D0%A1%D0%B0%D1%85%D0%B0%D0%BB%D0%B8%D0%BD%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Samara — capital of Samara Oblast, Russia ─────────────────────────────
  "RU-SAM": {
    description:
      "Samara flies a white goat standing on green grass, on blue — a device suggested by the herds of saiga " +
      "antelope that once roamed the Samara steppe. The goat stands for prosperity, leadership, courage and " +
      "independence.",
    sources: [
      { title: "Герб Самары — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%8B" },
    ],
  },

  // ── Saratov — capital of Saratov Oblast, Russia ───────────────────────────
  "RU-SAR": {
    description:
      "Saratov flies three silver sterlets, their heads to the centre, on blue — a sign of “the great " +
      "abundance of such fish in this land”. The sterlet is a royal fish; the arms were adopted in 1781.",
    sources: [
      { title: "Герб Саратова — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A1%D0%B0%D1%80%D0%B0%D1%82%D0%BE%D0%B2%D0%B0" },
    ],
  },

  // ── Smolensk — capital of Smolensk Oblast, Russia ─────────────────────────
  "RU-SMO": {
    description:
      "Smolensk flies the bird Gamayun perched on a black cannon with a golden carriage, on silver. The cannon " +
      "recalls the city's long history of battles, and the Gamayun — a bird of paradise — stands for happiness, " +
      "peace and renewal.",
    sources: [
      { title: "Герб Смоленска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A1%D0%BC%D0%BE%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Stavropol — capital of Stavropol Krai, Russia ─────────────────────────
  "RU-STA": {
    description:
      "Stavropol's arms turn on a golden cross that reflects its name — Stavropol, Greek for “city of the " +
      "cross”. The cross quarters the shield among a golden fortress on a mountain (the city's founding as a " +
      "frontier fortress in 1777), a flame rising from a chalice, an Orthodox church, and a Cossack horseman.",
    sources: [
      { title: "Герб Ставрополя — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A1%D1%82%D0%B0%D0%B2%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8F" },
    ],
  },

  // ── Yekaterinburg — capital of Sverdlovsk Oblast, Russia ──────────────────
  "RU-SVE": {
    description:
      "Yekaterinburg flies a silver mine-shaft — a well-frame with a windlass — and a smelting furnace with " +
      "red fire within, on a shield split green and gold. The mine and furnace stand for the city's mining and " +
      "metalworking, and the two colours for the divide between Europe and Asia that runs through the Urals.",
    sources: [
      { title: "Герб Екатеринбурга — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3%D0%B0" },
    ],
  },

  // ── Kazan — capital of the Republic of Tatarstan, Russia ──────────────────
  "RU-TA": {
    description:
      "Kazan flies the Zilant — a black crowned dragon with red wings, on white. It comes from the Tatar " +
      "legend of Zilant, the serpent-king who dwelt where Kazan now stands; the dragon's tied tail signifies " +
      "its taming. The arms were confirmed in 1781.",
    sources: [
      { title: "Герб Казани — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D0%B8" },
    ],
  },

  // ── Tambov — capital of Tambov Oblast, Russia ─────────────────────────────
  "RU-TAM": {
    description:
      "Tambov flies a golden beehive with three golden bees above it, on blue. The bees stand for " +
      "industriousness, thrift and order, and the hive for the common home in which each has their place — " +
      "together for the diligence, harmony and prosperity of Tambov.",
    sources: [
      { title: "Герб Тамбова — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A2%D0%B0%D0%BC%D0%B1%D0%BE%D0%B2%D0%B0" },
    ],
  },

  // ── Tomsk — capital of Tomsk Oblast, Russia ───────────────────────────────
  "RU-TOM": {
    description:
      "Tomsk flies a silver horse rearing on green — for historical continuity and economic might, the silver " +
      "for devotion to good and purity. The horse has stood on the city's arms since 1785.",
    sources: [
      { title: "Герб Томска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A2%D0%BE%D0%BC%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Tula — capital of Tula Oblast, Russia ─────────────────────────────────
  "RU-TUL": {
    description:
      "Tula flies a silver sword-blade over two crossed blades, with two golden hammers above and below, on " +
      "red. The blades stand for defence and the hammers for the labour of Tula's generations of smiths and " +
      "gunsmiths, the red for military valour — Tula being Russia's historic arms-making city.",
    sources: [
      { title: "Герб Тулы — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A2%D1%83%D0%BB%D1%8B" },
    ],
  },

  // ── Tver — capital of Tver Oblast, Russia ─────────────────────────────────
  "RU-TVE": {
    description:
      "Tver flies a golden throne on red, bearing a royal crown on a green cushion. The throne and crown form " +
      "a coronation emblem standing for power in the old Russian tradition; the crown is identified with the " +
      "Cap of Monomakh, the ancient Russian coronation regalia.",
    sources: [
      { title: "Герб Твери — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A2%D0%B2%D0%B5%D1%80%D0%B8" },
    ],
  },

  // ── Kyzyl — capital of the Tuva Republic, Russia ──────────────────────────
  "RU-TY": {
    description:
      "Kyzyl's golden device marks the city as the geographic centre of Asia — a globe and a stele, with wings " +
      "for soaring and prosperity, together reading as a sun and a flower for the people's bond with nature. At " +
      "its base a heart marks the birth of the Yenisei, where two rivers meet within the city.",
    sources: [
      { title: "Герб Кызыла — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9A%D1%8B%D0%B7%D1%8B%D0%BB%D0%B0" },
    ],
  },

  // ── Tyumen — capital of Tyumen Oblast, Russia ─────────────────────────────
  "RU-TYU": {
    description:
      "Tyumen flies a golden-masted river ship (a doshchanik) on a silver river — “in token that from this " +
      "city begins the navigation of the rivers of all Siberia”. A beaver and a fox as supporters mark " +
      "Tyumen's role as a centre of the fur trade. The arms were confirmed in 1785.",
    sources: [
      { title: "Герб Тюмени — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D0%B8" },
    ],
  },

  // ── Izhevsk — capital of the Udmurt Republic, Russia ──────────────────────
  "RU-UD": {
    description:
      "Izhevsk flies a shield split silver and blue, bearing counterchanged pincers and, over them, an arrow. " +
      "The arrow stands for striving to the heights and the pincers for the city's openness — together the " +
      "“trinity” of the human being, their labour (Izhevsk being a great arms- and metal-working city) and " +
      "nature.",
    sources: [
      { title: "Герб Ижевска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%98%D0%B6%D0%B5%D0%B2%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Ulyanovsk — capital of Ulyanovsk Oblast, Russia ───────────────────────
  "RU-ULY": {
    description:
      "Ulyanovsk flies a silver column on golden earth beneath a golden crown — a device from the old arms of " +
      "Simbirsk (the city's former name). The column stands for the steadfastness of the people's self-rule " +
      "and the crown for the city's self-government.",
    sources: [
      { title: "Герб Ульяновска — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A3%D0%BB%D1%8C%D1%8F%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%B0" },
    ],
  },

  // ── Volgograd — capital of Volgograd Oblast, Russia ───────────────────────
  "RU-VGG": {
    description:
      "Volgograd's arms are read in two halves. Above, on red — for the blood shed in its defence — golden " +
      "crenellations descend as a stylised fortress on the Volga, beside the Gold Star medal and ribbon of a " +
      "Hero City (for the Battle of Stalingrad). Below, on the blue of the Volga, a golden gearwheel and sheaf " +
      "of wheat for the city's industry and fertile land.",
    sources: [
      { title: "Герб Волгограда — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%92%D0%BE%D0%BB%D0%B3%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D0%B0" },
    ],
  },

  // ── Vladimir — capital of Vladimir Oblast, Russia ─────────────────────────
  "RU-VLA": {
    description:
      "Vladimir flies a golden lion rampant, an iron crown on its head, holding a long silver cross, on red — " +
      "one of the oldest devices in Russian heraldry, borne since the 12th century by the Vladimir-Suzdal " +
      "princes. The lion stands for strength and princely power, the silver cross for nobility, wisdom and the " +
      "Christian faith.",
    sources: [
      { title: "Герб Владимира — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D0%B0" },
    ],
  },

  // ── Vologda — capital of Vologda Oblast, Russia ───────────────────────────
  "RU-VLG": {
    description:
      "Vologda flies, on red, a right hand in golden robing reaching from a silver cloud, holding a golden orb " +
      "and a silver sword. The hand with the sword stands for justice and the defence of the Fatherland, and " +
      "the orb for statehood — recalling the tradition that Ivan the Terrible wished to make Vologda his " +
      "capital.",
    sources: [
      { title: "Герб Вологды — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%92%D0%BE%D0%BB%D0%BE%D0%B3%D0%B4%D1%8B" },
    ],
  },

  // ── Voronezh — capital of Voronezh Oblast, Russia ─────────────────────────
  "RU-VOR": {
    description:
      "Voronezh's shield is split: a double-headed eagle on gold, granted to the city for its services to the " +
      "Russian state, and on red a golden mountain from whose silver vessel the river Voronezh pours out — the " +
      "vessel of water for the river and the fertility of the land.",
    sources: [
      { title: "Герб Воронежа — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D0%B0" },
    ],
  },

  // ── Salekhard — capital of the Yamalo-Nenets Autonomous Okrug, Russia ─────
  "RU-YAN": {
    description:
      "Salekhard flies a fox, reproducing the historic arms of the Obdorsk principality (first granted in 1731 " +
      "under Empress Anna, as a fox holding an arrow). The fox stands for intelligence, cunning and " +
      "resilience; Yamal was long a “storehouse of soft goods”, the furs by which tribute was levied and " +
      "trade carried on.",
    sources: [
      { title: "Герб Салехарда — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A1%D0%B0%D0%BB%D0%B5%D1%85%D0%B0%D1%80%D0%B4%D0%B0" },
    ],
  },

  // ── Yaroslavl — capital of Yaroslavl Oblast, Russia ───────────────────────
  "RU-YAR": {
    description:
      "Yaroslavl flies a silver bear standing upright, holding a golden poleaxe, on silver. By legend the bear " +
      "recalls the she-bear that Yaroslav the Wise slew on this spot; it stands for might and courage, and the " +
      "poleaxe for princely power and order. The arms were confirmed in 1778.",
    sources: [
      { title: "Герб и флаг Ярославля — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%B8_%D1%84%D0%BB%D0%B0%D0%B3_%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D0%BB%D1%8F" },
    ],
  },

  // ── Birobidzhan — capital of the Jewish Autonomous Oblast, Russia ─────────
  "RU-YEV": {
    description:
      "Birobidzhan's arms show, on blue, a green hill for the sopki that ring the city, over three wavy blue " +
      "bands for its two rivers — the Bira and the Bidzhan, whose names the city joins in its own.",
    sources: [
      { title: "Герб Биробиджана — Геральдикум", url: "https://www.heraldicum.ru/russia/subjects/towns/birobij.htm" },
    ],
  },

  // ── Chita — capital of Zabaykalsky Krai, Russia ───────────────────────────
  "RU-ZAB": {
    description:
      "Chita flies a golden field with an eight-stake palisade of red and green, and above it a red buffalo " +
      "head with silver eyes and tongue. The buffalo head stands for the cattle-raising of the Transbaikal " +
      "people, the silver eyes and tongue for the Daurian silver mines and the gold field for its gold mines; " +
      "the eight stakes recall the eight ostrogs (stockade forts) of the 17th-century Russian settlement of " +
      "Transbaikalia.",
    sources: [
      { title: "Герб Читы — Wikipedia (ru)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%A7%D0%B8%D1%82%D1%8B" },
    ],
  },

  // ── Nyköping — capital of Södermanland County, Sweden ─────────────────────
  "SE-D": {
    description:
      "Nyköping flies a red tower on white, from the city's oldest seal of 1359. It depicts the Nyköping " +
      "Fortress, begun in the 13th century, which became the strongest castle in Sweden.",
    sources: [
      { title: "Nyköping — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Nyk%C3%B6ping" },
    ],
  },

  // ── Jönköping — capital of Jönköping County, Sweden ───────────────────────
  "SE-F": {
    description:
      "Jönköping flies a silver castle over blue water on red — a device from the city's medieval seals (the " +
      "oldest around 1370), for the fortress that was central to the town's history.",
    sources: [
      { title: "Jönköping — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/J%C3%B6nk%C3%B6ping" },
    ],
  },

  // ── Malmö — capital of Skåne County, Sweden ───────────────────────────────
  "SE-M": {
    description:
      "Malmö flies a red griffin's head crowned in gold — the griffin of Pomerania, granted to the city in " +
      "1437 by the Danish King Eric of Pomerania. The griffin, with a lion's body and an eagle's head, was a " +
      "sign of power and majesty.",
    sources: [
      { title: "Malmö — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Malm%C3%B6" },
    ],
  },

  // ── Östersund — capital of Jämtland County, Sweden ────────────────────────
  "SE-Z": {
    description:
      "Östersund flies a silver elk (moose) head on blue — the elk of the Jämtland forests around the city, a " +
      "sign of strength.",
    sources: [
      { title: "Östersund — Wikipedia", url: "https://en.wikipedia.org/wiki/%C3%96stersund" },
    ],
  },

  // ── Banská Bystrica — capital of the Banská Bystrica Region, Slovakia ──────
  "SK-BC": {
    description:
      "Banská Bystrica's flag carries the red and white of the city arms, which date from the late 13th " +
      "century and are thought to derive from the red-and-silver bars of the Árpád dynasty of Hungary.",
    sources: [
      { title: "Banská Bystrica — Heraldry of the World", url: "https://www.heraldry-wiki.com/heraldrywiki/index.php?title=Bansk%C3%A1_Bystrica" },
    ],
  },

  // ── Bratislava — capital of the Bratislava Region & of Slovakia ───────────
  "SK-BL": {
    description:
      "Bratislava's flag carries the white and red of the city arms — a silver three-towered fortress with a " +
      "raised portcullis on red, granted by Sigismund of Luxembourg in 1436. Despite appearances it is a " +
      "general image of a medieval town, not Bratislava Castle as is often supposed.",
    sources: [
      { title: "Coat of arms of Bratislava — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Bratislava" },
    ],
  },

  // ── Nitra — capital of the Nitra Region, Slovakia ─────────────────────────
  "SK-NI": {
    description:
      "Nitra's flag carries the blue and white of the city arms, known from 15th-century seals: a figure " +
      "bearing the double cross of Hungary. The arms are linked to St Ladislaus, the holy Hungarian king who " +
      "by legend died at Nitra.",
    sources: [
      { title: "Nitra — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Nitra" },
    ],
  },

  // ── Prešov — capital of the Prešov Region, Slovakia ───────────────────────
  "SK-PV": {
    description:
      "Prešov's flag carries the red and white of the city arms. The oldest arms bore a strawberry — a pun on " +
      "the city's Hungarian name Eperjes (eper, “strawberry”) — later joined by three roses.",
    sources: [
      { title: "Prešov — Heraldry of the World", url: "https://www.heraldry-wiki.com/wiki/Pre%C5%A1ov" },
    ],
  },

  // ── Trnava — capital of the Trnava Region, Slovakia ───────────────────────
  "SK-TA": {
    description:
      "Trnava flies a wheel, the city's emblem since the early 14th century. Its spokes form the Greek letters " +
      "I and X for Jesus Christ — the wheel once bore the head of Jesus at its centre.",
    sources: [
      { title: "Trnava — Wikipedia", url: "https://en.wikipedia.org/wiki/Trnava" },
    ],
  },

  // ── Trenčín — capital of the Trenčín Region, Slovakia ─────────────────────
  "SK-TC": {
    description:
      "Trenčín's flag carries the red and white of the city arms, which since the 14th century show the Lamb " +
      "of God (Agnus Dei) — the emblem of St John the Baptist, the city's patron saint.",
    sources: [
      { title: "Trenčín — Heraldry of the World", url: "https://www.heraldry-wiki.com/heraldrywiki/index.php?title=Tren%C4%8D%C3%ADn" },
    ],
  },

  // ── Žilina — capital of the Žilina Region, Slovakia ───────────────────────
  "SK-ZI": {
    description:
      "Žilina flies a golden double cross (cross of Lorraine) with roots below and two golden stars, on green. " +
      "It is thought to derive from the emblem of Andrew III, the last king of the Árpád dynasty, who bore a " +
      "double-armed cross with celestial bodies.",
    sources: [
      { title: "Žilina — Wikipedia", url: "https://en.wikipedia.org/wiki/%C5%BDilina" },
    ],
  },

  // ── Bled — seat of the Municipality of Bled, Slovenia ─────────────────────
  "SI-003": {
    description:
      "Bled's arms paint the town's own famous landscape: on the lake sits Bled Island with the pilgrimage " +
      "church of the Assumption of Mary and its Belfry of Wishes, while a high cliff on the right carries the " +
      "citadel (Bled Castle) — the three icons that make the resort instantly recognisable. The flag is a " +
      "blue-white-blue vertical triband with the arms centred.",
    sources: [
      { title: "Bled (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-003.html" },
    ],
  },

  // ── Bovec — seat of the Municipality of Bovec, Slovenia ───────────────────
  "SI-006": {
    description:
      "Bovec shows a golden chamois leaping over a snow-capped mountain from which an S-shaped river issues — " +
      "the mountain and the leaping chamois stand for the high peaks around the Bovec basin and the valleys of " +
      "the Trenta and Koritnica, while the river is the emerald Soča (Isonzo). The flag carries a diagonal of " +
      "'Soča blue' and white with the arms in the white field.",
    sources: [
      { title: "Bovec (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-006.html" },
    ],
  },

  // ── Celje — seat of the City Municipality of Celje, Slovenia ──────────────
  "SI-011": {
    description:
      "Celje bears three golden six-pointed stars on blue — the arms of the medieval Counts of Celje, the most " +
      "powerful Slovene noble house. Those same three stars were later taken into the coat of arms of Slovenia " +
      "itself, so the town flag carries a national emblem in its original setting. The flag is a yellow-and-blue " +
      "bicolour with the stars centred.",
    sources: [
      { title: "Celje (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-011.html" },
    ],
  },

  // ── Črnomelj — seat of the Municipality of Črnomelj, Slovenia ─────────────
  "SI-017": {
    description:
      "Črnomelj shows a red castle tower — with a gateway, three windows in the upper storey and four " +
      "crenellations — on a black shield edged red. The tower is taken directly from the town's own seal of " +
      "1587. The flag is white and green with the arms in the centre.",
    sources: [
      { title: "Občina Črnomelj — Wikipedija", url: "https://sl.wikipedia.org/wiki/Ob%C4%8Dina_%C4%8Crnomelj" },
    ],
  },

  // ── Domžale — seat of the Municipality of Domžale, Slovenia ───────────────
  "SI-023": {
    description:
      "Domžale carries three interwoven golden ears of grain on blue. They commemorate the straw-plaiting and " +
      "straw-hat industry — including Panama hats — on which the town's 19th-century prosperity was built; the " +
      "ears evoke that heritage rather than depicting hats literally. The flag repeats the interwoven ears in " +
      "yellow on blue.",
    sources: [
      { title: "Domžale (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-023.html" },
    ],
  },

  // ── Jesenice — seat of the Municipality of Jesenice, Slovenia ─────────────
  "SI-041": {
    description:
      "Jesenice shows a silver medieval iron mark on a cobalt-blue field. The blue stands for the river Sava, " +
      "and the stylised iron sign recalls the town's centuries-old ironworking tradition; the same mark also " +
      "reads as the letter 'J' for Jesenice. The flag is a silver field bearing the arms.",
    sources: [
      { title: "Jesenice (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-041.html" },
    ],
  },

  // ── Kamnik — seat of the Municipality of Kamnik, Slovenia ─────────────────
  "SI-043": {
    description:
      "Kamnik's arms echo a town seal of about 1277–1309: the crowned figure of Veronika of Kamnik — half " +
      "woman, half serpent from local legend — set in a white embattled tower, flanked at its base by two green " +
      "dragons, with a star and a crescent alongside. The flag is horizontally divided blue over white with the " +
      "arms in the middle.",
    sources: [
      { title: "Kamnik (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-043.html" },
    ],
  },

  // ── Kočevje — seat of the Municipality of Kočevje, Slovenia ───────────────
  "SI-048": {
    description:
      "Kočevje's arms — granted by Emperor Frederick III in 1471 — show a fortified town behind a white " +
      "palisade on blue, with the town's patron saint standing in red vestments and a golden halo, holding a " +
      "book and the knife of his martyrdom. The design commemorates the town's medieval origins as a walled " +
      "settlement. The flag is a blue-white-blue vertical triband with the arms on the white stripe.",
    sources: [
      { title: "Kočevje (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-048.html" },
    ],
  },

  // ── Koper — seat of the City Municipality of Koper, Slovenia ──────────────
  "SI-050": {
    description:
      "Koper shows a golden stylized sun — straight and wavy rays in shades of yellow — on a blue field. The " +
      "sun is based on an old stone carving preserved in the town and is Koper's long-standing civic emblem; " +
      "the current faceless design was adopted in 1997. The flag is the same blue field with the yellow sun " +
      "centred.",
    sources: [
      { title: "Koper (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-050.html" },
    ],
  },

  // ── Kranj — seat of the City Municipality of Kranj, Slovenia ──────────────
  "SI-052": {
    description:
      "Kranj shows a red eagle with outstretched wings on a white (silver) field, based on the town seal of " +
      "1530. The eagle recalls Kranj's standing as the historic centre of Carniola (Kranjska), the Slovene " +
      "heartland province. The flag is white over burgundy-red with the arms across the divide.",
    sources: [
      { title: "Kranj (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-052.html" },
    ],
  },

  // ── Ljubljana — capital of Slovenia and seat of its City Municipality ─────
  "SI-061": {
    description:
      "Ljubljana shows a white city tower with black gate and windows, rising from three green mounds on red, " +
      "with a green dragon sitting atop it. The dragon is the city's emblem, tied to the legend of Jason and the " +
      "Argonauts slaying a marsh monster near the Ljubljana marshes. The flag is white and green — colours " +
      "associated with Ljubljana since the 19th century — with the arms centred.",
    sources: [
      { title: "Ljubljana (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-061.html" },
    ],
  },

  // ── Maribor — seat of the City Municipality of Maribor, Slovenia ──────────
  "SI-070": {
    description:
      "Maribor's arms show a white fortified gateway with an open door and raised portcullis flanked by two " +
      "guard towers on red, with a silver dove descending between them. The dove represents the Holy Spirit " +
      "descending over the town; the design goes back to Maribor's 14th-century civic seal, and the red-and-" +
      "silver scheme is read in heraldry as law, strength, courage, dignity and love. The flag is a white-and-" +
      "red vertical bicolour with the arms centred.",
    sources: [
      { title: "Maribor (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-070.html" },
    ],
  },

  // ── Novo Mesto — seat of the City Municipality of Novo Mesto, Slovenia ────
  "SI-085": {
    description:
      "Novo Mesto's arms depict its founder, Archduke Rudolf IV of Habsburg — who granted the town its charter " +
      "in 1365 — robed in red on a golden throne, holding a blue orb and a golden banner, in a silver shield. " +
      "The figure records the town's foundation by the House of Habsburg. The flag is quartered yellow (with the " +
      "arms) and red with a white diagonal band.",
    sources: [
      { title: "Novo Mesto (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-085.html" },
    ],
  },

  // ── Postojna — seat of the Municipality of Postojna, Slovenia ─────────────
  "SI-094": {
    description:
      "Postojna's arms, granted by Emperor Franz Joseph I in 1909, are party per fess blue and red bearing a " +
      "silver eagle, with an olm (Proteus anguinus) in the base. The eagle stands for civic dignity and the " +
      "blind cave-dwelling olm — the 'human fish' of the Postojna Cave — for the karst cave system the town is " +
      "famous for. The flag is bordeaux-red with the emblem at the hoist.",
    sources: [
      { title: "Postojna (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-094.html" },
    ],
  },

  // ── Puconci — seat of the Municipality of Puconci, Slovenia ───────────────
  "SI-097": {
    description:
      "Puconci's shield stacks the region's two landscapes: a golden wheat ear on yellow for the flat, fertile " +
      "Ravensko lowland, an orange sun over green hills for the rolling Goričko, and an apple on red for the " +
      "area's traditional fruit-growing and friendship — 'where the lowlands and the hills shake hands'. The " +
      "flag is a yellow-and-green vertical bicolour with the arms.",
    sources: [
      { title: "Puconci (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-097.html" },
    ],
  },

  // ── Sevnica — seat of the Municipality of Sevnica, Slovenia ───────────────
  "SI-110": {
    description:
      "Sevnica shows a linden tree rising from a green base on blue, with two skylarks on its lower branches, " +
      "beneath a white mural crown. The lime/linden is a Slovene national tree and the larks come from local " +
      "folk tradition; the mural crown marks the town's municipal status. The flag is white bordered green with " +
      "the arms.",
    sources: [
      { title: "Sevnica (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-110.html" },
    ],
  },

  // ── Šmarje pri Jelšah — seat of the Municipality, Slovenia ────────────────
  "SI-124": {
    description:
      "The quartered arms of Šmarje pri Jelšah combine blue-and-white diagonal stripes with a pair of gold-and-" +
      "blue ox-horns for the Gaisruck family, who held Jelše castle, and a black alder branch with green leaves — a canting pun on " +
      "jelša ('alder'), the tree the place is named for. The flag repeats the blue-and-white diagonal with the " +
      "arms centred.",
    sources: [
      { title: "Šmarje pri Jelšah (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-124.html" },
    ],
  },

  // ── Trbovlje — seat of the Municipality of Trbovlje, Slovenia ─────────────
  "SI-129": {
    description:
      "Trbovlje's emblem is pure mining town: a black miner's ore wagon on green (the valley) below two chimneys " +
      "and a stylised ore heap against a blue sky, recording the coal-mining and heavy industry that built the " +
      "town from 1850. The flag is a blue-black-green triband with the ore-heap symbol across the black stripe.",
    sources: [
      { title: "Trbovlje (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-129.html" },
    ],
  },

  // ── Tržič — seat of the Municipality of Tržič, Slovenia ───────────────────
  "SI-131": {
    description:
      "Tržič shows a silver masoned wall with four battlements and loopholes on blue. The white walls evoke the " +
      "surrounding snowy mountains and skiing, the gateways stand for the town's hospitality, and the blue for " +
      "height, depth and wisdom, at the confluence of the Mošenik and Bistrica streams. The flag is a blue-and-" +
      "white embattled vertical division.",
    sources: [
      { title: "Tržič (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-131.html" },
    ],
  },

  // ── Velenje — seat of the City Municipality of Velenje, Slovenia ──────────
  "SI-133": {
    description:
      "Velenje's arms show a white skyscraper rising from embattled roofs — deliberately joining the old " +
      "(medieval fortified walls) and the new (the modern planned town rebuilt around its coal-mining industry). " +
      "The green-yellow-white palette is read as youth and optimism. The flag is a green-and-yellow vertical " +
      "bicolour with the arms on the axis.",
    sources: [
      { title: "Velenje (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-133.html" },
    ],
  },

  // ── Bistrica ob Sotli — seat of the Municipality, Slovenia ────────────────
  "SI-149": {
    description:
      "Bistrica ob Sotli shows a golden crown topped by a blue eagle on a shield. The crown alludes to Kunšperk " +
      "(historically Königsberg), the market village the municipality grew around, and the eagle to the nearby " +
      "Orlica hills (Slovene orlica, 'eagle'). The blue flag carries the arms above a row of yellow squares for " +
      "the municipality's villages, yellow and blue standing for earth and sky.",
    sources: [
      { title: "Bistrica ob Sotli (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-149.html" },
    ],
  },

  // ── Braslovče — seat of the Municipality of Braslovče, Slovenia ───────────
  "SI-151": {
    description:
      "Braslovče's quartered arms carry the letters H and S — for 'Heiliger Sebastian' (St Sebastian), whose " +
      "brotherhood has existed in the town since 1545 — together with a sickle and an ox-yoke for the area's " +
      "farming heritage. The red-and-white colours come from the Counts of Celje (Žovnek/Sanneck). The flag is " +
      "quartered red and white with the arms centred.",
    sources: [
      { title: "Braslovče (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-151.html" },
    ],
  },

  // ── Cerkvenjak — seat of the Municipality of Cerkvenjak, Slovenia ─────────
  "SI-153": {
    description:
      "Cerkvenjak's diagonally divided shield shows the church of St Anthony with its surrounding buildings on " +
      "blue below, and an apple and a bunch of grapes on green above. The church is a canting pun on the name " +
      "(from cerkovnik, the church verger/sexton), while the fruit and vines mark the wine- and fruit-growing " +
      "countryside. The flag is light blue with the arms centred.",
    sources: [
      { title: "Cerkvenjak (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-153.html" },
    ],
  },

  // ── Grad — seat of the Municipality of Grad, Slovenia ─────────────────────
  "SI-158": {
    description:
      "Grad shows a silver two-towered fort with a golden crown above and a golden Latin cross below, on blue " +
      "over a green base. The fort is a canting pun on the name — grad means 'castle' — and refers to Grad " +
      "Castle, the largest in Slovenia; the crown recalls the Széchy nobles who built it and the cross stands " +
      "for faith. The flag is a green-yellow-green horizontal triband with the arms.",
    sources: [
      { title: "Grad (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-158.html" },
    ],
  },

  // ── Zgornje Jezersko — seat of the Municipality of Jezersko, Slovenia ─────
  "SI-163": {
    description:
      "Jezersko's arms bring together a sheep — the distinctive Jezersko-Solčava breed — the peaks of Kočna and " +
      "Grintovec as seen from the valley, and the Čedca waterfall, the highest in Slovenia. The flag is a blue-" +
      "white-green horizontal triband with the arms centred.",
    sources: [
      { title: "Jezersko (Slovenia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/si-163.html" },
    ],
  },

  // ── Dili — capital of Timor-Leste and its Dili municipality ───────────────
  "TL-DI": {
    description:
      "Dili flies a white-and-green gyronny of eight (eight triangles radiating from the centre) charged with the " +
      "city's coat of arms: a silver sandalwood tree — Timor's historic export — on a red field, flanked by two " +
      "bundled war-trophies, beneath a golden mural crown of five towers that marks the city's rank as a capital. " +
      "The arms were formalised under Portuguese rule (1962; an earlier 1952 version showed coffee plants in " +
      "place of the trophies).",
    sources: [
      { title: "Díli District (East Timor) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/tl-dil.html" },
    ],
  },

  // ── Istanbul — seat of Istanbul Province, Turkey ──────────────────────────
  "TR-34": {
    description:
      "Istanbul flies the flag of its Metropolitan Municipality — the city emblem (designed by Metin Edremit in " +
      "1969) in white on a blue field. The emblem packs the city's identity into one badge: the Bosphorus along " +
      "the base, which splits the city and joins Europe to Asia; historic city walls to either side; mosques and " +
      "minarets for the famous skyline; and seven triangles in the centre for the seven hills on which Istanbul " +
      "was built.",
    sources: [
      { title: "İstanbul Metropolitan Municipality — Flags of the World", url: "https://www.crwflags.com/fotw/flags/tr-34-is.html" },
    ],
  },

  // ── Santa Ana — capital of Santa Ana department, El Salvador ──────────────
  "SV-SA": {
    description:
      "Santa Ana's arms (adopted 1964) picture two of the department's natural landmarks — Lake Coatepeque and " +
      "the Ilamatepec (Santa Ana) volcano — surmounted by the number 44, which honours the '44 valientes " +
      "santaneños', the local men of the 1894 Revolution of the 44 that overthrew the dictator Carlos Ezeta.",
    sources: [
      { title: "Escudo de Santa Ana (El Salvador) — Wikipedia", url: "https://es.wikipedia.org/wiki/Escudo_de_Santa_Ana_(El_Salvador)" },
    ],
  },

  // ── Sonsonate — capital of Sonsonate department, El Salvador ──────────────
  "SV-SO": {
    description:
      "Sonsonate's arms (created 1943) are dense with local history on a vermilion field that stands for the " +
      "blood shed at the battles of Acaxual and Tacuxcalco between the indigenous people and the Spanish. Above, " +
      "blue-and-white stripes echo the national flag and a torch stands for guidance and liberty; the Izalco " +
      "volcano, the Pacific sea and coconut palms give the region's geography and crops; an arrow recalls the " +
      "warrior Atonal who fought the conquistador Pedro de Alvarado, and a bust of Atonal anchors the base, " +
      "flanked by indigenous warriors and Spanish conquistadors.",
    sources: [
      { title: "Escudo de Sonsonate — Wikipedia", url: "https://es.wikipedia.org/wiki/Escudo_de_Sonsonate" },
    ],
  },

  // ── San Salvador — capital of El Salvador and its department ───────────────
  "SV-SS": {
    description:
      "San Salvador's arms carry a diagonal white-and-blue banner — the colours of the old Central American " +
      "federation, standing for loyalty and service to the capital's people — on a silver shield for purity and " +
      "faith, wreathed by a crown of twenty laurels for triumph and rebirth. A ribbon bears the year 1834, when " +
      "San Salvador was made capital of the Federal Republic of Central America.",
    sources: [
      { title: "Escudo de San Salvador — Wikipedia", url: "https://es.wikipedia.org/wiki/Escudo_de_San_Salvador" },
    ],
  },

  // ── Rayong — capital of Rayong province, Thailand ─────────────────────────
  "TH-21": {
    description:
      "Rayong's flag carries the provincial seal, which shows Ko Samet — the island off Rayong's coast, famed for " +
      "its beaches and for the statues of characters from the epic poems of the poet Sunthon Phu, Rayong's most " +
      "celebrated son.",
    sources: [
      { title: "Rayong province — Wikipedia", url: "https://en.wikipedia.org/wiki/Rayong_province" },
    ],
  },

  // ── Khon Kaen — capital of Khon Kaen province, Thailand ───────────────────
  "TH-40": {
    description:
      "Khon Kaen's flag carries the provincial seal: the stupa of Phra That Kham Kaen, believed to hold relics of " +
      "the Buddha, framed by a banyan tree on one side and a golden shower tree (the provincial flower, whose Thai " +
      "name means 'providing support and preventing decline') on the other.",
    sources: [
      { title: "Khon Kaen province — Wikipedia", url: "https://en.wikipedia.org/wiki/Khon_Kaen_province" },
    ],
  },

  // ── Chiang Mai — capital of Chiang Mai province, Thailand ─────────────────
  "TH-50": {
    description:
      "Chiang Mai's flag carries the provincial seal: a white elephant in a glass pavilion. The white elephant — a " +
      "royal symbol in Thailand — recalls the one that ruler Thammalangka of Chiang Mai gave to King Rama II of " +
      "Bangkok, while the pavilion marks the 1477 council held here to review the Buddhist scriptures (the " +
      "Tripitaka).",
    sources: [
      { title: "Chiang Mai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chiang_Mai_province" },
    ],
  },

  // ── Lampang — capital of Lampang province, Thailand ───────────────────────
  "TH-52": {
    description:
      "Lampang's flag carries the provincial seal: a white rooster at the entrance to the Phra That Lampang Luang " +
      "temple. By local legend, when the Buddha visited, the god Indra turned himself into a white rooster to wake " +
      "the townsfolk so they would rise to pay their respects.",
    sources: [
      { title: "Lampang province — Wikipedia", url: "https://en.wikipedia.org/wiki/Lampang_province" },
    ],
  },

  // ── Chiang Rai — capital of Chiang Rai province, Thailand ─────────────────
  "TH-57": {
    description:
      "Chiang Rai's flag carries the provincial seal, which shows a white elephant — the royal symbol of Thailand. " +
      "It recalls the founding legend of the city by King Mangrai, who is said to have chosen the site because his " +
      "elephant favoured the spot.",
    sources: [
      { title: "Chiang Rai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chiang_Rai_province" },
    ],
  },

  // ── Tak — capital of Tak province, Thailand ───────────────────────────────
  "TH-63": {
    description:
      "Tak's flag carries the provincial seal: King Naresuan mounted on a royal elephant, pouring consecrated " +
      "water on the ground — the ceremonial act declaring independence. It commemorates the 1584 war with Burma, " +
      "when Tak was the first border town to be freed from Burmese control.",
    sources: [
      { title: "Tak province — Wikipedia", url: "https://en.wikipedia.org/wiki/Tak_province" },
    ],
  },

  // ── Krabi — capital of Krabi province, Thailand ───────────────────────────
  "TH-81": {
    description:
      "Krabi's flag carries the provincial seal: two crossed ancient swords (a krabi is an old Siamese sword, " +
      "which the province's name puns on) before the Andaman Sea and the Khao Phanom Bencha mountain, the " +
      "province's highest peak.",
    sources: [
      { title: "Krabi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Krabi_province" },
    ],
  },

  // ── Arusha — capital of Arusha region, Tanzania ───────────────────────────
  "TZ-01": {
    description:
      "Arusha's flag is white within a narrow blue-and-green border, bearing the city's municipal emblem built " +
      "around the Arusha clock tower — the town's best-known landmark, popularly said to mark the midpoint " +
      "between Cairo and Cape Town — with the city name above and the motto below.",
    sources: [
      { title: "Arusha (Tanzania) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/tz-arus.html" },
    ],
  },

  // ── Mwanza — capital of Mwanza region, Tanzania ───────────────────────────
  "TZ-18": {
    description:
      "Mwanza City Council flies a light-blue flag bearing its municipal emblem, whose central charge is a water " +
      "(fish) eagle — a fitting symbol for a port city on the shore of Lake Victoria.",
    sources: [
      { title: "Mwanza (Tanzania) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/tz-mwan.html" },
    ],
  },

  // ── Lutsk — capital of Volyn Oblast, Ukraine ──────────────────────────────
  "UA-07": {
    description:
      "Lutsk's arms show Saint Nicholas in silver-and-gold episcopal robes, barefoot with a golden halo, holding a " +
      "cross and an open book, on a red field. Red is the historical colour of Volhynia (courage and valour), and " +
      "the design revives the city's own seals of 1565–1616.",
    sources: [
      { title: "Coat of arms of Lutsk — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Луцька" },
    ],
  },

  // ── Dnipro — capital of Dnipropetrovsk Oblast, Ukraine ────────────────────
  "UA-09": {
    description:
      "Luhansk’s flag is light blue with the city’s arms at the centre. The arms, restored by the city council in " +
      "1992 from the imperial-era design, show a black blast furnace with red flames between two black hammers " +
      "on gold; the furnace stands for the metallurgy that shaped the city’s founding and growth.",
    sources: [
      { title: "Прапор Луганська — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Прапор_Луганська" },
      { title: "Герб Луганська — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Луганська" },
    ],
  },

  "UA-12": {
    description:
      "Dnipro's arms are built around the seal of the Kodak Palanka, the Cossack administrative district whose " +
      "fortress once stood near the city. Adopted in 2001, it deliberately roots the modern city in its Cossack " +
      "past rather than its imperial founding.",
    sources: [
      { title: "Dnipro — Wikipedia", url: "https://en.wikipedia.org/wiki/Dnipro" },
    ],
  },

  // ── Zhytomyr — capital of Zhytomyr Oblast, Ukraine ────────────────────────
  "UA-14": {
    description:
      "Donetsk’s flag is divided blue over black, the colours of the city’s shield, with its arms at the " +
      "centre. The blue stands for the grandeur and beauty of the city’s architecture and greenery, the black " +
      "for its rich coal reserves and their intensive mining. The arms, approved in 1995, keep the 1968 design " +
      "of a golden hand holding a miner’s hammer.",
    sources: [
      { title: "Прапор Донецька — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Прапор_Донецька" },
      { title: "Герб Донецька — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Донецька" },
    ],
  },

  "UA-18": {
    description:
      "Zhytomyr's arms show a white fortress — an open gate below three crenellated towers — on blue. The " +
      "fortification recalls the city's medieval role as a defensive stronghold. The current arms were adopted in " +
      "1991.",
    sources: [
      { title: "Coat of arms of Zhytomyr — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Житомира" },
    ],
  },

  // ── Ivano-Frankivsk — capital of Ivano-Frankivsk Oblast, Ukraine ──────────
  "UA-26": {
    description:
      "Ivano-Frankivsk shows a silver city gate with golden doors and three towers on blue, with the Archangel " +
      "Michael standing in the gateway, sword raised and shield in hand, as the city's heavenly protector. The " +
      "gate goes back to the arms granted in 1663 to the fortress-town; the modern version dates from 1995.",
    sources: [
      { title: "Coat of arms of Ivano-Frankivsk — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Івано-Франківська" },
    ],
  },

  // ── Kyiv — capital of Ukraine ─────────────────────────────────────────────
  "UA-32": {
    description:
      "Kyiv bears the Archangel Michael — patron and defender of the city — in silver with a flaming sword and " +
      "shield on a blue field. The image goes back to the seals of the grand princes of Kievan Rus'; it was " +
      "restored as the city's arms in 1995 after the Soviet emblem was dropped.",
    sources: [
      { title: "Coat of arms of Kyiv — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Kyiv" },
    ],
  },

  // ── Simferopol — capital of the Autonomous Republic of Crimea, Ukraine ────
  "UA-43": {
    description:
      "Simferopol's arms are split by a silver wavy band — the Salgir river — with a golden bee on blue above and " +
      "a golden two-handled Greek cup on red below. The bee puns on the city's Greek name ('city of usefulness') " +
      "and Potemkin's original beehive proposal, while the cup recalls the ancient settlement of Scythian Neapolis.",
    sources: [
      { title: "Coat of arms of Simferopol — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Сімферополя" },
    ],
  },

  // ── Lviv — capital of Lviv Oblast, Ukraine ────────────────────────────────
  "UA-46": {
    description:
      "Lviv shows a golden lion walking through the open gate of a stone wall with three towers, on blue — an " +
      "emblem based on the city's mid-14th-century seal. The lion also puns on the city's name (from Lev, 'lion'), " +
      "and the city long bore the Latin motto Semper fidelis ('always faithful').",
    sources: [
      { title: "Lviv — Wikipedia", url: "https://en.wikipedia.org/wiki/Lviv" },
    ],
  },

  // ── Poltava — capital of Poltava Oblast, Ukraine ──────────────────────────
  "UA-53": {
    description:
      "Poltava carries a golden bow with a downward-pointing arrow, ringed by four six-pointed golden stars, on a " +
      "crimson field. The lowered arrow signals readiness to defend peaceful labour rather than to attack, and the " +
      "four stars stand for the four points of the compass. Adopted 1993, it revives the Cossack-era arms.",
    sources: [
      { title: "Coat of arms of Poltava — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Полтави" },
    ],
  },

  // ── Rivne — capital of Rivne Oblast, Ukraine ──────────────────────────────
  "UA-56": {
    description:
      "Rivne shows a silver tower pierced by three gateways, standing on a green base against blue. The three gates " +
      "signify the city's historic entrances from three directions; green stands for hope and abundance, blue for " +
      "beauty. The design revives an arms recorded in 1796 and was readopted in 1990.",
    sources: [
      { title: "Coat of arms of Rivne — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Рівного" },
    ],
  },

  // ── Sumy — capital of Sumy Oblast, Ukraine ────────────────────────────────
  "UA-59": {
    description:
      "Sumy bears three black pouches (Ukrainian sumy) with golden buttons and red straps on a silver field — a " +
      "canting emblem on the city's name, and a reference to the sacks carried by the Cossacks of the Sumy " +
      "Regiment. The arms date from 1781 and were readopted in 1991.",
    sources: [
      { title: "Coat of arms of Sumy — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Сум" },
    ],
  },

  // ── Ternopil — capital of Ternopil Oblast, Ukraine ────────────────────────
  "UA-61": {
    description:
      "Ternopil shows a silver Old Castle (Staryi Zamok) with, above it, the Leliwa emblem — a golden six-pointed " +
      "star over an upturned crescent — on blue. The Leliwa is the arms of the town's founder, Jan Tarnowski, and " +
      "the castle recalls the fortress he raised in 1540. Adopted 1992.",
    sources: [
      { title: "Coat of arms of Ternopil — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Тернополя" },
    ],
  },

  // ── Kharkiv — capital of Kharkiv Oblast, Ukraine ──────────────────────────
  "UA-63": {
    description:
      "Kharkiv places a crossed caduceus (Mercury's staff) and cornucopia on a green shield — the caduceus for " +
      "commerce and trade, the horn of plenty for agricultural abundance, together marking the city's historic " +
      "economy. The design mirrors an 1878 version and was restored in 1995.",
    sources: [
      { title: "Coat of arms of Kharkiv — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Kharkiv" },
    ],
  },

  // ── Kherson — capital of Kherson Oblast, Ukraine ──────────────────────────
  "UA-65": {
    description:
      "Kherson shows the golden gates of the Kherson Fortress above two crossed golden anchors — one commercial, " +
      "one naval — on blue, marking the Black Sea port's trading and military maritime role; the year 1778 records " +
      "its founding. Adopted 2005.",
    sources: [
      { title: "Coat of arms of Kherson — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Херсона" },
    ],
  },

  // ── Cherkasy — capital of Cherkasy Oblast, Ukraine ────────────────────────
  "UA-71": {
    description:
      "Cherkasy's divided shield shows a Cossack in red with a rifle on his shoulder, sabre and powder-horn at his " +
      "belt, on blue above, and a silver galloping horse on red below. The Cossack marks the city's central place " +
      "in the birth of Ukrainian Cossackdom; the horse (echoing the 1852 arms) stands for courage and speed. " +
      "Adopted 1995.",
    sources: [
      { title: "Coat of arms of Cherkasy — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Черкас" },
    ],
  },

  // ── Chernihiv — capital of Chernihiv Oblast, Ukraine ──────────────────────
  "UA-74": {
    description:
      "Chernihiv bears a black crowned eagle holding a long golden cross on a silver field. The cross stands for " +
      "the deep influence of Christianity in the city's long history, and the single (not double) eagle set it " +
      "apart from Moscow's arms after 1672. Readopted 1992.",
    sources: [
      { title: "Coat of arms of Chernihiv — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Чернігова" },
    ],
  },

  // ── Chernivtsi — capital of Chernivtsi Oblast, Ukraine ────────────────────
  "UA-77": {
    description:
      "Chernivtsi shows an open silver fortified gateway, crenellated and studded with stones, on a red field, " +
      "with the Ukrainian trident (tryzub) set in the opening and crossed laurel branches tied in blue-and-yellow " +
      "below. The gate stands for the city, the stones for its enduring character.",
    sources: [
      { title: "Coat of arms of Chernivtsi — Wikipedia (uk)", url: "https://uk.wikipedia.org/wiki/Герб_Чернівців" },
    ],
  },

  // ── Salto — capital of Salto department, Uruguay ──────────────────────────
  "UY-SA": {
    description:
      "Salto's arms (approved 1927) are an oval divided in three: a rising golden sun over an anvil, hammer and " +
      "bundle of rods on white — for industry and labour; the goddess Minerva on blue — for wisdom; and a " +
      "waterfall on silver below — the great rapids ('salto') on the Uruguay River that give the city its name. " +
      "Olive and oak branches frame the shield.",
    sources: [
      { title: "Escudo de Salto — Wikipedia", url: "https://es.wikipedia.org/wiki/Escudo_de_Salto" },
    ],
  },

  // ── Maracay — capital of Aragua state, Venezuela ──────────────────────────
  "VE-D": {
    description:
      "Maracay (Girardot municipality) flies green, white and indigo-blue stripes with the city arms at the " +
      "centre. Green is hope and the mountains ringing the city, white is faith and purity (recalling the " +
      "beatified María de San José of coastal Choroní), and indigo blue is justice and the sea, lake and rivers " +
      "that border the municipality. First raised in 2001 for the city's tercentenary.",
    sources: [
      { title: "La Bandera — Alcaldía de Girardot (official)", url: "http://www.alcaldiagirardot.gob.ve/index.php?option=com_content&view=article&id=119&Itemid=732" },
    ],
  },

  // ── San Carlos — capital of Cojedes state, Venezuela ──────────────────────
  "VE-H": {
    description:
      "San Carlos (San Carlos de Austria) flies green, yellow and orange horizontal stripes with the colonial " +
      "façade of the Casa La Blanquera on the yellow band and the municipal arms in the green. Green is 'the " +
      "rebirth of hope', yellow the wealth of the land and rivers, and orange the dusk over the plains. Adopted " +
      "1994.",
    sources: [
      { title: "San Carlos, Cojedes (Venezuela) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ve-h-sc.html" },
    ],
  },

  // ── Barquisimeto — capital of Lara state, Venezuela ───────────────────────
  "VE-K": {
    description:
      "Barquisimeto's flag (1990) uses grey, yellow and red for the Río Turbio, the sun, and the city's famous " +
      "sunsets, and carries the image of the Obelisco de Barquisimeto, the city's best-known monument.",
    sources: [
      { title: "Barquisimeto — Wikipedia", url: "https://es.wikipedia.org/wiki/Barquisimeto" },
    ],
  },

  // ── Mérida — capital of Mérida state, Venezuela ───────────────────────────
  "VE-L": {
    description:
      "Mérida's flag is divided into eight fields around a central Santiago (St James) cross, honouring the " +
      "city's full name, Santiago de los Caballeros de Mérida. Each field carries a different colour; the city " +
      "has not officially revealed the meaning of the individual colours.",
    sources: [
      { title: "Bandera de Mérida (Venezuela) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_M%C3%A9rida_(Venezuela)" },
    ],
  },

  // ── Maturín — capital of Monagas state, Venezuela ─────────────────────────
  "VE-N": {
    description:
      "Maturín flies red, yellow and blue vertical stripes: red for the blood and sacrifice of the city's " +
      "heroes, yellow for local wealth, and blue for the region's waters. Ten stars on the red stripe stand for " +
      "the municipality's parishes, and a black silhouette of the cacique Maturín — the indigenous leader the " +
      "city is named for — faces the hoist. Adopted 2006.",
    sources: [
      { title: "Maturín, Monagas (Venezuela) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ve-n-ma.html" },
    ],
  },

  // ── Guanare — capital of Portuguesa state, Venezuela ──────────────────────
  "VE-P": {
    description:
      "Guanare's flag (1991) is split by a diagonal from lower hoist to upper fly: a sky-blue triangle for the " +
      "spiritual depth and thought of the guanareño people, and a yellow triangle for the municipality's " +
      "economic production, with the city arms in the upper hoist canton.",
    sources: [
      { title: "Guanare, Portuguesa (Venezuela) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ve-p-gu.html" },
    ],
  },

  // ── Valencia — capital of Carabobo state, Venezuela ───────────────────────
  "VE-G": {
    description:
      "Valencia flies yellow, red and green vertical stripes with the city arms on the red. Yellow is the " +
      "constancy and enterprise of the Valencians who made it an industrial centre, red the blood of the " +
      "indigenous Tacarigua and of the patriots at the Battle of Carabobo (1821), and green hope and the land's " +
      "fertility. Adopted 2009.",
    sources: [
      { title: "Bandera de Valencia (Venezuela) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Valencia_(Venezuela)" },
    ],
  },

  // ── Maracaibo — capital of Zulia state, Venezuela ─────────────────────────
  "VE-V": {
    description:
      "Maracaibo flies white, red and blue horizontal stripes with the city arms in the upper hoist. Taken from " +
      "the banner of Saint Sebastian, the city's patron, white is the saint's purity and red the blood of his " +
      "martyrdom; the blue stripe (added 1997) honours Lake Maracaibo, 500 years after its European sighting.",
    sources: [
      { title: "Bandera de Maracaibo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Maracaibo" },
    ],
  },

  // ── Phoenix — capital of Arizona, USA ─────────────────────────────────────
  "US-AZ": {
    description:
      "Phoenix flies a white phoenix — wings curving up to almost close a circle — on a maroon field. The " +
      "mythical bird reborn from ashes stands for the city, which took its name for rising on the ruins of an " +
      "ancient Hohokam settlement; the maroon nods to the Greek word phoinix, which also means purple. Adopted " +
      "1990.",
    sources: [
      { title: "Flag of Phoenix, Arizona — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Phoenix,_Arizona" },
    ],
  },

  // ── Denver — capital of Colorado, USA ─────────────────────────────────────
  "US-CO": {
    description:
      "Denver's flag is a landscape in the abstract: a yellow disc on a blue field above a white zigzag of " +
      "snow-capped peaks, over a red field. The yellow disc is the gold in Colorado's hills, red the 'colored' " +
      "earth the state is named for, and the disc's central position marks Denver's place within the state; the " +
      "zigzag honours Colorado's Native American heritage. Designed by a schoolgirl, Margaret Overbeck, and " +
      "adopted 1926.",
    sources: [
      { title: "Flag of Denver — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Denver" },
    ],
  },

  // ── Sacramento — capital of California, USA ───────────────────────────────
  "US-CA": {
    description:
      "Sacramento's flag has two shades of blue split by a wavy line, with a green and a gold half-oblong at the " +
      "corners. The blues are the Sacramento and American rivers that meet at the city, green its farming, and " +
      "gold the miners of the Gold Rush for which Sacramento was the gateway. Adopted 1989.",
    sources: [
      { title: "Flag of Sacramento, California — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sacramento,_California" },
    ],
  },

  // ── Atlanta — capital of Georgia, USA ─────────────────────────────────────
  "US-GA": {
    description:
      "Atlanta flies its seal in gold on blue: a phoenix rising from flames with the motto 'Resurgens' ('rising " +
      "again') and the dates 1847 (incorporation) and 1865. The reborn bird is the city's emblem for its " +
      "rebuilding after it was burned in the Civil War.",
    sources: [
      { title: "Flag of Atlanta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Atlanta" },
    ],
  },

  // ── Honolulu — capital of Hawaii, USA ─────────────────────────────────────
  "US-HI": {
    description:
      "Honolulu flies the city seal on a yellow field — the yellow taken from the golden ʻilima flower, symbol " +
      "of the island of Oʻahu. The seal carries the red-white-blue stripes of Hawaii's own flag, a rising sun " +
      "for a new era, a central star for Hawaii, and a pūloʻuloʻu (a tabu ball-and-staff) marking sacred " +
      "authority from the days of the monarchy. Adopted 1960.",
    sources: [
      { title: "Flag of Honolulu — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Honolulu" },
    ],
  },

  // ── Des Moines — capital of Iowa, USA ─────────────────────────────────────
  "US-IA": {
    description:
      "Des Moines flies a dark-blue field — for the Des Moines River — bearing three white arched bridges (the " +
      "Grand, Locust and Walnut Street bridges) that link the city's east and west banks, with a red trapezoid " +
      "at the hoist. Adopted 1974.",
    sources: [
      { title: "Flag of Des Moines, Iowa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Des_Moines,_Iowa" },
    ],
  },

  // ── Indianapolis — capital of Indiana, USA ────────────────────────────────
  "US-IN": {
    description:
      "Indianapolis flies a white star in a red circle on dark blue, with a white ring from which four white " +
      "stripes run out to the edges. The star is the Soldiers' and Sailors' Monument and the city's rank as state " +
      "capital, the ring is Monument Circle at the city's heart, and the four stripes are the four arms of " +
      "Meridian and Market Streets running north, south, east and west; red is the drive for progress. Adopted " +
      "1963.",
    sources: [
      { title: "Flag of Indianapolis — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Indianapolis" },
    ],
  },

  // ── Boston — capital of Massachusetts, USA ────────────────────────────────
  "US-MA": {
    description:
      "Boston flies its city seal on a 'Continental blue' field. The seal, framed by the Latin motto 'Sicut " +
      "patribus, sit Deus nobis' — 'As with our fathers, may God be with us' — shows a view of the city; the " +
      "city's fuller standard adds the trimountain, the three original hills Boston was built on, on its reverse. " +
      "Adopted 1917.",
    sources: [
      { title: "Flag of Boston — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Boston" },
    ],
  },

  // ── Annapolis — capital of Maryland, USA ──────────────────────────────────
  "US-MD": {
    description:
      "Annapolis's flag is modelled on the personal badge of Queen Anne, for whom the city is named: a crown " +
      "above a thistle (Scotland) and a rose (England) growing from a single stem, for the 1707 union of the two " +
      "kingdoms in her reign. The city's motto translates 'I have lived free and will die so'. Adopted 1965.",
    sources: [
      { title: "Annapolis, Maryland — Wikipedia", url: "https://en.wikipedia.org/wiki/Annapolis,_Maryland" },
    ],
  },

  // ── Columbus — capital of Ohio, USA ───────────────────────────────────────
  "US-OH": {
    description:
      "Columbus flies a yellow-white-red vertical triband — the colours of Spain, which funded Christopher " +
      "Columbus's voyages — with the city seal on a blue disc. The seal carries a ship of Columbus's fleet, an " +
      "eagle, the Ohio Statehouse dome for the capital, seventeen stars (Ohio was the 17th state) and buckeye " +
      "leaves for the state tree. Adopted 1929.",
    sources: [
      { title: "Flag of Columbus, Ohio — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Columbus,_Ohio" },
    ],
  },

  // ── Nashville — capital of Tennessee, USA ─────────────────────────────────
  "US-TN": {
    description:
      "Nashville flies a blue field with a gold bar at the fly and the city-county seal at the centre. By the " +
      "adopting resolution, blue stands for the courage and conviction of the city's leaders through its history, " +
      "and gold for the richness of its land and resources. Modelled on the Tennessee state flag; adopted 1963.",
    sources: [
      { title: "Flag of Nashville, Tennessee — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nashville,_Tennessee" },
    ],
  },

  // ── Salt Lake City — capital of Utah, USA ─────────────────────────────────
  "US-UT": {
    description:
      "Salt Lake City's 'Sego Flag' (2020) has two bars of blue and white for the water and the salt of the " +
      "Great Salt Lake on whose shore the city stands, with a golden sego lily — Utah's state flower, prized for " +
      "surviving the arid climate — in the canton. Its three petals nod to Salt Lake City being the only " +
      "three-word state-capital name.",
    sources: [
      { title: "Flag of Salt Lake City — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Salt_Lake_City" },
    ],
  },

  // ── Richmond — capital of Virginia, USA ───────────────────────────────────
  "US-VA": {
    description:
      "Richmond's flag centres on a figure of a canal boatman, recalling the James River and Kanawha Canal that " +
      "made the city a 19th-century transport hub — the waterway George Washington championed to link the " +
      "Chesapeake with the Ohio valley.",
    sources: [
      { title: "Richmond, Virginia — Wikipedia", url: "https://en.wikipedia.org/wiki/Richmond,_Virginia" },
    ],
  },

  // ── Madison — capital of Wisconsin, USA ───────────────────────────────────
  "US-WI": {
    description:
      "Madison flies a light-blue field with a white diagonal stripe for the isthmus between Lakes Mendota and " +
      "Monona, crossed by a black cross that stands both for the four lakes around the city and for the " +
      "cross-shaped Wisconsin State Capitol, with a gold circle for the Capitol dome. Adopted 1962 (the central " +
      "emblem revised in 2018).",
    sources: [
      { title: "Flag of Madison, Wisconsin — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Madison,_Wisconsin" },
    ],
  },

  // ── San Juan — capital of Puerto Rico, USA ────────────────────────────────
  "US-PR": {
    description:
      "San Juan's flag bears the city's coat of arms — granted by the Catholic Monarchs in 1511, among the oldest " +
      "in the Americas: a silver Lamb of God (Agnus Dei) holding a red banner and resting on a book, standing on a " +
      "green island for Puerto Rico, with the letters F and I on either side for King Ferdinand and Queen " +
      "Isabella. The lamb is Saint John the Baptist, the city's patron and the source of its name (San Juan " +
      "Bautista). Adopted on its orange field in 1948.",
    sources: [
      { title: "Bandera de San Juan (Puerto Rico) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_San_Juan_(Puerto_Rico)" },
    ],
  },

  // ── Hagåtña — capital of Guam, USA ────────────────────────────────────────
  "US-GU": {
    description:
      "Hagåtña's flag is a pictorial scene of the capital village on a red field — red because Hagåtña means " +
      "'their bloodline', for the clans who settled it. It gathers a golden rising sun for Guam, the village's " +
      "rolling hills and limestone cliffs, the caves where Japanese soldiers hid in World War II, the ancient " +
      "chief Quipuha, the Dulce Nombre de María (Agana) Basilica for the Catholic Church, the Plaza de España for " +
      "the Spanish era, and latte stones for pre-war Chamorro building and strength.",
    sources: [
      { title: "Hagåtña (Guam) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gu-hagat.html" },
    ],
  },

  // ── Oklahoma City — capital of Oklahoma, USA ──────────────────────────────
  "US-OK": {
    description:
      "Oklahoma City flies its seal — a quartered red-and-white shield behind a counterchanged cross — on a white " +
      "field with a red border. Its charges tell the city's story: a plow for the pioneer farming of Oklahoma " +
      "Territory, a hatchet and stake for the '89ers who staked land claims in the 1889 Land Run, an atom for an " +
      "industrial and scientific future, and a peace pipe with an eagle-feather pendant for Native American " +
      "councils and high aims, wreathed in oak for the historic Council Grove. Adopted 1994.",
    sources: [
      { title: "Oklahoma City, Oklahoma — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-okokc.html" },
    ],
  },

  // ── Albany — capital of New York, USA ─────────────────────────────────────
  "US-NY": {
    description:
      "Albany flies orange-white-blue stripes with the city arms at the centre. The stripes are the colours of " +
      "the flag Henry Hudson's Dutch sponsors flew when he reached the area in 1609, marking Albany's origin as " +
      "the Dutch trading post of Fort Orange. On the arms, a beaver felling a tree stands for the fur trade, " +
      "wheat sheaves for farming, and a Dutch sloop for the city's role as a Hudson River port.",
    sources: [
      { title: "Albany, New York — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ny-al.html" },
    ],
  },

  // ── Trenton — capital of New Jersey, USA ──────────────────────────────────
  "US-NJ": {
    description:
      "Trenton flies a flag divided blue at the hoist and gold at the fly, with the city seal in the centre. The " +
      "seal's three wheat sheaves and a horse's head stand for the farming country of the area's original " +
      "English Quaker settlers — fitting for the capital of the 'Garden State' — and blue and gold have been the " +
      "city's colours since 1909 (buff being a traditional New Jersey colour).",
    sources: [
      { title: "Trenton, New Jersey — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-njtrt.html" },
    ],
  },

  // ── Harrisburg — capital of Pennsylvania, USA ─────────────────────────────
  "US-PA": {
    description:
      "Harrisburg flies a dark-blue flag bearing a white keystone — Pennsylvania is the 'Keystone State' — with " +
      "the State Capitol dome rising inside it. A gold roundel stands for William Penn and a fleur-de-lis for " +
      "Dauphin County, and three gold crescents below come from the arms of John Harris, the city's founder and " +
      "namesake.",
    sources: [
      { title: "Harrisburg, Pennsylvania — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-pahrb.html" },
    ],
  },

  // ── Raleigh — capital of North Carolina, USA ──────────────────────────────
  "US-NC": {
    description:
      "Raleigh flies red-white-red vertical stripes — the colours of Sir Walter Raleigh, the Elizabethan " +
      "courtier the city is named for — with the city seal on the white: a green oak for Raleigh's nickname the " +
      "'City of Oaks', dated 1792 for its founding. The flag's reverse bears Sir Walter's own arms, whose stag " +
      "puns on the name Raleigh ('meadow of the deer').",
    sources: [
      { title: "Raleigh, North Carolina — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-nc-ra.html" },
    ],
  },

  // ── Lansing — capital of Michigan, USA ────────────────────────────────────
  "US-MI": {
    description:
      "Lansing flies its seal on white: the Michigan State Capitol dome — half black-on-white, half " +
      "white-on-black, for the diversity of the community — against a purple sky (the city's emotional warmth) " +
      "with an orange sun for hope and opportunity, green trees for its neighbourhoods, and the Grand River in " +
      "white for a commitment to the environment. Adopted 1994.",
    sources: [
      { title: "Lansing, Michigan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-milan.html" },
    ],
  },

  // ── Jefferson City — capital of Missouri, USA ─────────────────────────────
  "US-MO": {
    description:
      "Jefferson City flies a red-white-blue flag with the Missouri State Capitol dome and a star for its role " +
      "as state capital, two undulating white stripes for the city's railroad tracks and bridges, and waves for " +
      "the Missouri River. The colours echo the Missouri and US flags. Adopted 2025.",
    sources: [
      { title: "Jefferson City, Missouri — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-mojef.html" },
    ],
  },

  // ── Helena — capital of Montana, USA ──────────────────────────────────────
  "US-MT": {
    description:
      "Helena flies a blue flag with a white disc bearing a black fire-watchtower and the motto 'Guardian of the " +
      "Gulch' over 1881. The tower — built after the young gold-rush town's devastating fires — is Helena's " +
      "emblem of survival and pride; 'the Gulch' is Last Chance Gulch, where gold was struck in 1864, and 1881 " +
      "marks the city's incorporation.",
    sources: [
      { title: "Helena, Montana — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-mthel.html" },
    ],
  },

  // ── Columbia — capital of South Carolina, USA ─────────────────────────────
  "US-SC": {
    description:
      "Columbia's flag (2020) is a deep-blue field crossed by a diagonal sweep of lighter blue and white for the " +
      "Saluda and Broad rivers that meet at the city to form the Congaree, with a six-pointed star in the canton " +
      "for the state capital and for the city's resilience after it was burned in 1865.",
    sources: [
      { title: "Columbia, South Carolina — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-sccol.html" },
    ],
  },

  // ── Austin — capital of Texas, USA ────────────────────────────────────────
  "US-TX": {
    description:
      "Austin flies a white flag with a shield in red-white-red (echoing the Texas and US flags), a crest taken " +
      "from the arms of Stephen F. Austin — the 'Father of Texas' the city is named for — and an ancient oil " +
      "lamp for knowledge, a nod to the University of Texas, with the State Capitol dome behind. Adopted 1919.",
    sources: [
      { title: "Austin, Texas — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-txaus.html" },
    ],
  },

  // ── Olympia — capital of Washington, USA ──────────────────────────────────
  "US-WA": {
    description:
      "Olympia flies a white flag bearing an oval view of the Washington State Capitol against the snow-capped " +
      "Olympic Mountains above the waters of Puget Sound — the setting of the state capital at the Sound's " +
      "southern end — with 'City of Olympia' alongside. Adopted 1988.",
    sources: [
      { title: "Olympia, Washington — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-waoly.html" },
    ],
  },

  // ── Baton Rouge — capital of Louisiana, USA ───────────────────────────────
  "US-LA": {
    description:
      "Baton Rouge flies a crimson flag — for the 'Rouge' in its name — with the city name in white script and a " +
      "shield of the three powers whose flags once flew over it: a fleur-de-lis for France and a castle tower " +
      "for Spain above, and a Union Jack (St George's and St Andrew's crosses) for Britain below. Adopted 1995.",
    sources: [
      { title: "Baton Rouge, Louisiana — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-la-br.html" },
    ],
  },

  // ── Providence — capital of Rhode Island, USA ─────────────────────────────
  "US-RI": {
    description:
      "Providence flies a dark-blue flag with the city seal in a white disc. The seal pictures the city's 1636 " +
      "founding: Narragansett people greeting Roger Williams as he arrives by canoe, having left Massachusetts " +
      "for religious freedom — 'Founded 1636', 'Incorporated 1832'. Blue and white are the traditional colours of " +
      "the colony. Adopted 1915.",
    sources: [
      { title: "Providence, Rhode Island — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ripro.html" },
    ],
  },

  // ── Salem — capital of Oregon, USA ────────────────────────────────────────
  "US-OR": {
    description:
      "Salem's flag (2022) is a white field with a pink cherry blossom and a gold star — for the state capital and " +
      "Salem's old nickname the 'Cherry City' — above a blue band for the Willamette River that runs through the " +
      "city.",
    sources: [
      { title: "Salem, Oregon — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-orslm.html" },
    ],
  },

  // ── Hartford — capital of Connecticut, USA ────────────────────────────────
  "US-CT": {
    description:
      "Hartford flies a blue flag with the city arms in a white disc: a hart (a stag) fording a stream — a pun " +
      "on the city's name, from Hertford in England — with a grapevine taken from Connecticut's state seal and " +
      "an eagle above, under the Latin motto 'Post Nubila Phoebus' ('after the clouds, the sun'). Adopted 1983.",
    sources: [
      { title: "Hartford, Connecticut — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ct-hf.html" },
    ],
  },

  // ── Jackson — capital of Mississippi, USA ─────────────────────────────────
  "US-MS": {
    description:
      "Jackson flies a green field crossed by a white cross — the city styles itself the 'Crossroads of the " +
      "South' — with a golden star at the centre for its role as state capital, over a light-blue disc for the " +
      "city's place on the Pearl River. Green stands for growth, the land and the magnolia. Adopted 1993.",
    sources: [
      { title: "Jackson, Mississippi — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ms-jx.html" },
    ],
  },

  // ── Carson City — capital of Nevada, USA ──────────────────────────────────
  "US-NV": {
    description:
      "Carson City flies a white-blue-white triband with the city seal on the blue: the Nevada State Capitol, a " +
      "golden eagle for the settlers' strength and perseverance, a Pony Express rider (the 1860 mail service that " +
      "helped open the territory), and a Virginia & Truckee Railroad locomotive, with 'CC' for the U.S. Mint that " +
      "once struck coins here. Adopted 1992.",
    sources: [
      { title: "Carson City, Nevada — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-nv-cc.html" },
    ],
  },

  // ── Montgomery — capital of Alabama, USA ──────────────────────────────────
  "US-AL": {
    description:
      "Montgomery's flag (in use since 1952) is divided diagonally, grey at the hoist and red at the fly, with a " +
      "blue diagonal stripe bearing seven white stars and a gold laurel wreath. The colours recall the Civil War, " +
      "in which Montgomery was the Confederacy's first capital: grey for Confederate uniforms, red for Alabama, " +
      "blue for the 'blue and grey', and the seven stars for the seven original Confederate states.",
    sources: [
      { title: "Montgomery, Alabama — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-al-mm.html" },
    ],
  },

  // ── Santa Fe — capital of New Mexico, USA ─────────────────────────────────
  "US-NM": {
    description:
      "Santa Fe flies the city seal — a shield of the three nations that have governed the city: the Mexican " +
      "eagle and serpent on a cactus (1821), the castle and lion of Spain (1610), and the stars and stripes of " +
      "the United States (1846), ringed by the city's full Spanish name, 'La Villa Real de la Santa Fe de San " +
      "Francisco de Asís' — the Royal Town of the Holy Faith of St Francis of Assisi, its patron. Adopted 1915.",
    sources: [
      { title: "Santa Fe, New Mexico — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-nmsfe.html" },
    ],
  },

  // ── Lincoln — capital of Nebraska, USA ────────────────────────────────────
  "US-NE": {
    description:
      "Lincoln's 'All Roads Lead to Lincoln' flag (2022) uses intersecting lines to evoke at once a sunrise, the " +
      "State Capitol and an aerial view of downtown, with a central beacon for the city's hope and its welcome as " +
      "a safe harbour for newcomers. Teal green stands for parks and trails, deep blue for the groundwater " +
      "aquifers, and gold for a bright future.",
    sources: [
      { title: "Lincoln, Nebraska — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ne-li.html" },
    ],
  },

  // ── Charleston — capital of West Virginia, USA ────────────────────────────
  "US-WV": {
    description:
      "Charleston flies a yellow flag bordered in light blue with the city arms: the State Capitol dome (dated " +
      "1794) for the capital, a crossed rifle and arrow for the frontier fort the city grew from, a river " +
      "sternwheeler for its trade at the meeting of two rivers, a pick and shovel on black for coal, and a " +
      "cogwheel for industry — the old 'Cog City'. Adopted 1970.",
    sources: [
      { title: "Charleston, West Virginia — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-wvcha.html" },
    ],
  },

  // ── Cheyenne — capital of Wyoming, USA ────────────────────────────────────
  "US-WY": {
    description:
      "Cheyenne flies a white flag with a brown border and a central roundel bearing a brown bison — echoing " +
      "Wyoming's state flag — with 'The Equality State', Wyoming's nickname for granting women the vote first " +
      "(1869), and 1867, the year of the city's first charter.",
    sources: [
      { title: "Cheyenne, Wyoming — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-wyche.html" },
    ],
  },

  // ── Little Rock — capital of Arkansas, USA ────────────────────────────────
  "US-AR": {
    description:
      "Little Rock flies a white flag with a blue and a green stripe crossing in a gold-edged Scandinavian cross " +
      "and the city seal at the crossing. Blue is the Arkansas River that borders the city, green its fields, " +
      "parks and forests, gold its economic promise, and white optimism; the seal shows a rock mound — 'la petite " +
      "roche', the little rock the city is named for. Adopted 1988.",
    sources: [
      { title: "Little Rock, Arkansas — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ar-lr.html" },
    ],
  },

  // ── Concord — capital of New Hampshire, USA ───────────────────────────────
  "US-NH": {
    description:
      "Concord flies a blue-white-blue vertical triband bearing a red Concord Coach — the famous stagecoach first " +
      "built in the city in 1827 by Downing and Abbott, which carried travellers across the American West. Blue is " +
      "New Hampshire's state colour. Adopted 1979.",
    sources: [
      { title: "Concord, New Hampshire — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-nhccd.html" },
    ],
  },

  // ── Bismarck — capital of North Dakota, USA ───────────────────────────────
  "US-ND": {
    description:
      "Bismarck flies white and red stripes with a gold border and, at the hoist, a blue disc holding a white " +
      "star ringed by gold wheat — the star for Bismarck as capital of an agricultural state, the wheat for its " +
      "farming. A ribbon across the flag stands for Interstate 94 running through North Dakota. Adopted 1986.",
    sources: [
      { title: "Bismarck, North Dakota — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ndbis.html" },
    ],
  },

  // ── Pierre — capital of South Dakota, USA ─────────────────────────────────
  "US-SD": {
    description:
      "Pierre flies the city seal on white: a scene of early Pierre with a Missouri River steamboat and a steam " +
      "locomotive for the 'growing mechanization of the West', wheat sheaves and grasslands for the farming " +
      "economy, and a sunset over the hills for Pierre as the 'gateway to the West'. Incorporated 1883; the seal " +
      "was coloured and made into a flag in 1989.",
    sources: [
      { title: "Pierre, South Dakota — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-sdpie.html" },
    ],
  },

  // ── Juneau — capital of Alaska, USA ───────────────────────────────────────
  "US-AK": {
    description:
      "Juneau flies a light-blue flag with green mountain-and-tree silhouettes for its far-northern, mountainous " +
      "setting, a gold star for its capital status and its gold-mining past, and a wavy dark-blue bar for the " +
      "Pacific waters the city sits on, labelled 'Alaska's Capital City'. Adopted 1983.",
    sources: [
      { title: "Juneau, Alaska — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-ak-ju.html" },
    ],
  },

  // ── Boise — capital of Idaho, USA ─────────────────────────────────────────
  "US-ID": {
    description:
      "Boise flies a blue flag with the city logo: the Idaho State Capitol dome for the capital, flanked by trees " +
      "for the city's motto 'City of Trees' — a nod to its name, from the French 'les bois', 'the woods'. Adopted " +
      "2001.",
    sources: [
      { title: "Boise, Idaho — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-idboi.html" },
    ],
  },

  // ── Montpelier — capital of Vermont, USA ──────────────────────────────────
  "US-VT": {
    description:
      "Montpelier's flag (2017) shows a navy sky over rolling green hills with a circle of fourteen golden stars " +
      "— for Vermont's fourteen counties and its place as the fourteenth state — the ring also echoing the " +
      "golden dome of the Vermont State House.",
    sources: [
      { title: "Montpelier, Vermont — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-vtmpr.html" },
    ],
  },

  // ── Dover — capital of Delaware, USA ──────────────────────────────────────
  "US-DE": {
    description:
      "Dover flies a white flag with a gold diamond holding the city seal, whose trefoil (three-lobed leaf) " +
      "stands for the three places tied to the city: Kent County (William Penn's arms), the state of Delaware " +
      "(its seal), and Dover in England (St Martin on horseback), which gave the city its name. A ribbon reads " +
      "'Capital of the First State' — Delaware being first to ratify the Constitution. Adopted 1972.",
    sources: [
      { title: "Dover, Delaware — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-de-dv.html" },
    ],
  },

  // ── Springfield — capital of Illinois, USA ────────────────────────────────
  "US-IL": {
    description:
      "Springfield flies a dark-blue flag with a large red star (bordered white) ringed by twenty white stars. " +
      "The twenty stars are the states in the Union before Illinois joined, and the central red star is " +
      "Springfield, capital of Illinois — the 21st state. Designed for a 1916 contest conceived by the poet " +
      "Vachel Lindsay.",
    sources: [
      { title: "Springfield, Illinois — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-il-sp.html" },
    ],
  },

  // ── Augusta — capital of Maine, USA ───────────────────────────────────────
  "US-ME": {
    description:
      "Augusta flies a flag divided diagonally blue over green, with the city seal in the centre: an Abenaki " +
      "figure in a canoe looking to Fort Western (established 1754) and the State House, which marks Augusta's " +
      "role as Maine's capital. Adopted 1961.",
    sources: [
      { title: "Augusta, Maine — Flags of the World", url: "https://www.crwflags.com/fotw/flags/us-me-au.html" },
    ],
  },

  // ── Szekszárd — capital of Tolna County, Hungary ──────────────────────────
  "HU-TO": {
    description:
      "Szekszárd's arms show a red fortified tower on blue — recalling the Benedictine abbey that became the " +
      "town's church after the Ottoman period — charged with a golden bunch of grapes above a hanging bell, and " +
      "flanked by golden wheat and a grapevine. The grapes, vine and grape-leaf crown celebrate Szekszárd's noted " +
      "wine region, the bell its church, and the wheat its farming.",
    sources: [
      { title: "Szekszárd — Wikipédia (hu)", url: "https://hu.wikipedia.org/wiki/Szeksz%C3%A1rd" },
    ],
  },

  // ── Virovitica — capital of Virovitica-Podravina County, Croatia ──────────
  "HR-10": {
    description:
      "Virovitica flies a white flag bearing the town's arms: a golden lion, sword raised, standing on the green " +
      "hill of Bilogora on a red field. Red stands for magnanimity, freedom, love and progress, green for " +
      "strength, hope and the surrounding hills, gold for a fortunate era, and the lion for courage. The arms were " +
      "adopted in 1994 and the flag in 1995.",
    sources: [
      { title: "Virovitica — Heimer, Flags & Arms of the Modern Era (Croatia)", url: "https://zeljko-heimer-fame.from.hr/hrvat/hr-vt1.html" },
    ],
  },

  // ── La Chorrera — capital of Panamá Oeste Province, Panama ─────────────────
  "PA-10": {
    description:
      "La Chorrera's flag bears the Cascada del Chorro, the waterfall for which the town is named — Spanish " +
      "settlers called it ‘La Chorrera’ for its chorros (falls). The green of the field stands for the " +
      "region's natural wealth.",
    sources: [
      { title: "Cascada del chorro — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Cascada_del_chorro" },
    ],
  },

  // ── Chitré — capital of Herrera Province, Panama ───────────────────────────
  "PA-6": {
    description:
      "Chitré's flag carries five stars for the five corregimientos of the district: three gold stars on " +
      "the blue band for Monagrillo, Chitré and La Arena, and two blue stars on the gold band for Llano " +
      "Bonito and San Juan Bautista.",
    sources: [
      { title: "En Chitré recuerdan el significado de la bandera — La Prensa (Panamá)", url: "https://www.prensa.com/locales/Chitre-recuerdan-significado-bandera_0_2695980521.html" },
    ],
  },

  // ── Muscat — capital of the Muscat Governorate and of Oman ─────────────────
  "OM-MA": {
    description:
      "Muscat flies a plain red banner — the historic flag of the Sultanate of Muscat, flown as early as " +
      "the 8th century and kept until Sultan Qaboos introduced Oman's modern flag in 1970. Red was the " +
      "traditional colour of the ruling Al Bu Said dynasty on the coast, set apart from the white flag of " +
      "the Ibadi Imamate of the interior; in today's national flag that red is read as the battles fought " +
      "against foreign invaders.",
    sources: [
      { title: "Flag of Oman — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Oman" },
      { title: "Sultanate of Muscat and Oman until 1970 — Flags of the World", url: "https://www.crwflags.com/fotw/flags/om_musca.html" },
    ],
  },

  // ── Invercargill — capital of Southland, New Zealand ───────────────────────
  "NZ-STL": {
    description:
      "Invercargill's flag carries the city council's logo, unveiled in 2009: three green strokes that echo " +
      "the ‘blade of grass’ sculpture outside the council building and together read as a stylised ‘ICC’ — " +
      "Invercargill City Council.",
    sources: [
      { title: "Council logo — Invercargill City Council (official)", url: "https://icc.govt.nz/your-council/council-logo/" },
      { title: "Invercargill symbols — Te Ara Encyclopedia of New Zealand", url: "https://teara.govt.nz/en/artwork/21716/invercargill-symbols" },
    ],
  },

  // ── Wellington — capital of the Wellington Region and of New Zealand ───────
  "NZ-WGN": {
    description:
      "Wellington's flag is gold with a black cross and, at its centre in a blue disc, a sailing ship (a " +
      "lymphad) bearing a dolphin on its sail — both taken from the city's coat of arms.",
    sources: [
      { title: "Flag of Wellington — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wellington" },
    ],
  },

  // ── Christchurch — capital of Canterbury, New Zealand ──────────────────────
  "NZ-CAN": {
    description:
      "Christchurch's arms (granted 1949) carry four ships (lymphads) for the ‘First Four Ships’ — the " +
      "Charlotte Jane, Randolph, Sir George Seymour and Cressy — that brought the Canterbury settlers to " +
      "Lyttelton in 1850; a bishop's mitre, for the city founded as a Church of England settlement and made " +
      "a bishop's see; and, at the base, a fleece and a wheatsheaf for wool and grain, over wavy blue bars " +
      "for water.",
    sources: [
      { title: "Coat of arms of the City of Christchurch — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_the_City_of_Christchurch" },
    ],
  },

  // ── Nelson — capital of the Nelson Region, New Zealand ─────────────────────
  "NZ-NSN": {
    description:
      "Nelson's flag joins a bishop's mitre — Nelson is a cathedral city, seat of its bishop since 1858 — " +
      "wavy blue and white bands for the city beside the sea, and a black cross taken from the arms of " +
      "Admiral Lord Nelson, after whom the city is named.",
    sources: [
      { title: "Flag of the City of Nelson — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_City_of_Nelson" },
    ],
  },

  // ── Napier — capital of Hawke's Bay, New Zealand ───────────────────────────
  "NZ-HKB": {
    description:
      "Napier's flag bears three red roses from the arms of Lord Napier and Ettrick — a descendant of Sir " +
      "Charles Napier, for whom the city is named — a golden fleece for the wool industry of which Napier " +
      "is a great centre, and blue waves for the sea.",
    sources: [
      { title: "Napier (New Zealand) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/nz-nap.html" },
    ],
  },

  // ── Dunedin — capital of Otago, New Zealand ────────────────────────────────
  "NZ-OTA": {
    description:
      "Dunedin's arms take their castle from the arms of Edinburgh, whose Gaelic name (Dùn Èideann) the " +
      "city bears. A green band across the shield is the farming country of Otago — a golden ram's head for " +
      "its wool and mutton and golden sheaves for its grain — and a ship recalls the settlers' arrival.",
    sources: [
      { title: "Coat of Arms, Dunedin City — Te Ara Encyclopedia of New Zealand", url: "https://teara.govt.nz/en/1966/27241/coat-of-arms-dunedin-city" },
    ],
  },

  // ── Hamilton — capital of Waikato, New Zealand ─────────────────────────────
  "NZ-WKO": {
    description:
      "Hamilton's arms picture the ebb and flow of the Waikato River that runs through the city, with oxen " +
      "for the green pastures and the city's place as a farming centre; the shield is supported by two " +
      "pūkeko, the native swamp-hens of the Waikato wetlands.",
    sources: [
      { title: "Coat of arms of Hamilton, New Zealand — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Hamilton,_New_Zealand" },
    ],
  },

  // ── Kathmandu — capital of Bagmati Province and of Nepal ───────────────────
  "NP-BA": {
    description:
      "Kathmandu's flag (adopted 2006) is red with a large white sword. The sword is that of Manjushri, " +
      "who — in the Swayambhu Purana — clove the gorge at Chobhar to drain the lake that filled the valley, " +
      "making Kathmandu habitable; the old city is itself said to have been laid out in the shape of a " +
      "khadga (an ancient sword). Red is held an auspicious colour across Nepal's cultures and religions.",
    sources: [
      { title: "Kathmandu (Nepal) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/np-kathm.html" },
    ],
  },

  // ── Bergen — capital of Vestland, Norway ───────────────────────────────────
  "NO-12": {
    description:
      "Bergen's arms come from the city's old seal: a walled castle with a gate standing on golden hills — " +
      "the hills read as Bergen's seven hills.",
    sources: [
      { title: "Coat of arms of Bergen — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Bergen" },
    ],
  },

  // ── Trondheim — capital of Trøndelag, Norway ───────────────────────────────
  "NO-16": {
    description:
      "Trondheim has no formal coat of arms; its flag instead bears the golden ‘Trondheim rose’ on red. The " +
      "rose — a dog-rose found in mediaeval sources as a symbol of Saint Olav — has stood for the city " +
      "since at least the 16th century.",
    sources: [
      { title: "Flag of Trondheim — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Trondheim" },
    ],
  },

  // ── Assen — capital of Drenthe, Netherlands ────────────────────────────────
  "NL-DR": {
    description:
      "Assen's flag is a white-and-blue horizontal bicolour, its colours taken from the city's coat of " +
      "arms: blue is the shield's field, and white the mantle of the crowned image of the Virgin Mary that " +
      "the arms bear.",
    sources: [
      { title: "Vlag van Assen — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Assen" },
    ],
  },

  // ── Lelystad — capital of Flevoland, Netherlands ───────────────────────────
  "NL-FL": {
    description:
      "Lelystad's flag is prince-yellow with a cobalt-blue hexagon at the centre bearing a white lily from " +
      "the city's arms. The lily is a canting emblem for Cornelis Lely, the engineer of the Zuiderzee Works " +
      "after whom the city is named; the blue hexagon around it stands for the basalt blocks that armour " +
      "Flevoland's dykes.",
    sources: [
      { title: "Vlag van Lelystad — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Lelystad" },
    ],
  },

  // ── Leeuwarden — capital of Friesland, Netherlands ─────────────────────────
  "NL-FR": {
    description:
      "Leeuwarden's city flag is four horizontal bands of blue and yellow, adopted in 1947, the colours " +
      "drawn from the city's coat of arms. (A newer municipal flag, adopted in 2019, instead bears the " +
      "city's golden lion.)",
    sources: [
      { title: "Vlag van Leeuwarden — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Leeuwarden" },
    ],
  },

  // ── Groningen — capital of Groningen province, Netherlands ─────────────────
  "NL-GR": {
    description:
      "Groningen's city flag is three horizontal bands of white, green and white — the city's colours, " +
      "taken (like its coat of arms) from the arms of the mediaeval Groningen prefects.",
    sources: [
      { title: "Vlag van Groningen (stad) — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Groningen_(stad)" },
    ],
  },

  // ── Maastricht — capital of Limburg, Netherlands ───────────────────────────
  "NL-LI": {
    description:
      "Maastricht's flag is a red field bearing a white five-pointed star — the ‘Star of Maastricht’, " +
      "standing for the city's independence, its tradition, and the important role it has played through " +
      "the centuries.",
    sources: [
      { title: "Vlag van Maastricht — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Maastricht" },
    ],
  },

  // ── Zwolle — capital of Overijssel, Netherlands ────────────────────────────
  "NL-OV": {
    description:
      "Zwolle's flag is blue with a white cross. The colours are those of Saint Michael, the city's patron: " +
      "blue was taken as Michael's colour because, in the Book of Revelation, the archangel leads the " +
      "heavenly host against the devil.",
    sources: [
      { title: "Vlag van Zwolle — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Zwolle" },
    ],
  },

  // ── Middelburg — capital of Zeeland, Netherlands ───────────────────────────
  "NL-ZE": {
    description:
      "Middelburg's flag is red bearing the same golden tower as its coat of arms — a double tower (a tower " +
      "topped by a smaller one). It stands for the historic castle (burcht) set between two others, which " +
      "gave Middelburg — the ‘middle burgh’ — its name.",
    sources: [
      { title: "Vlag van Middelburg — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Middelburg" },
    ],
  },

  // ── Haarlem — capital of North Holland, Netherlands ────────────────────────
  "NL-NH": {
    description:
      "Haarlem's flag is red bearing a white sword with a gold hilt, a short broad-armed white cross above " +
      "it, and two white six-pointed stars to either side. The red field recalls the city's part in the " +
      "capture of Damietta (Damiate) during the Fifth Crusade; the sword stands for the valour and the " +
      "honour that Emperor Frederick II gave Haarlem after that campaign; the silver cross, granted by the " +
      "Patriarch of Jerusalem, is protection; and the four stars are the city's bond with the sea and " +
      "shipping.",
    sources: [
      { title: "Vlag van Haarlem — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Haarlem" },
    ],
  },

  // ── Arnhem — capital of Gelderland, Netherlands ────────────────────────────
  "NL-GE": {
    description:
      "Arnhem's flag is white over blue with a double-headed eagle in counter-changed colours at the hoist. " +
      "Both the two colours and the eagle are taken from the city's coat of arms.",
    sources: [
      { title: "Vlag van Arnhem — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Arnhem" },
    ],
  },

  // ── Utrecht — capital of Utrecht province, Netherlands ─────────────────────
  "NL-UT": {
    description:
      "Utrecht's flag is white over red with a red canton bearing a white cross. It joins two older " +
      "banners: the white-and-red bicolour of the Archbishopric of Utrecht and the white cross on red of " +
      "the Sticht, the prince-bishop's temporal domain.",
    sources: [
      { title: "Vlag van Utrecht (stad) — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Utrecht_(stad)" },
    ],
  },

  // ── The Hague — capital of South Holland, Netherlands ──────────────────────
  "NL-ZH": {
    description:
      "The Hague's flag is a bicolour of yellow over green — the city's colours, drawn from its coat of " +
      "arms, which bears a stork (‘ooievaar’). The stork has been woven into the city's symbolism since the " +
      "Middle Ages and is taken as a sign of good fortune.",
    sources: [
      { title: "Vlag van Den Haag — Wikipedia (nl)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Den_Haag" },
    ],
  },

  // ── Managua — capital of the Managua Department and of Nicaragua ───────────
  "NI-MN": {
    description:
      "Managua's flag is white — for peace — with a gold fringe, bearing the city's arms (adopted 1944) " +
      "between the legends ‘Ciudad de Managua’ and ‘Julio 24, 1846’, the day the Leal Villa de Santiago de " +
      "Managua was raised to a city. The shield shows a crowned rampant lion resting a paw on a globe, " +
      "ringed by the old title ‘Leal Villa de Santiago de Managua’; the motto reads ‘Aquí nos ilumina un " +
      "sol que no declina’ (‘Here a sun that never sets shines on us’).",
    sources: [
      { title: "Escudo de Managua — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Managua" },
      { title: "Bandera de Managua — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Bandera_de_Managua" },
    ],
    myths: [
      {
        claim: "The lion on Managua's arms is a symbol of Spanish nobility.",
        reality:
          "The historian Clemente Guido Martínez read the lion's cut paw as a deliberate mark that Managua " +
          "was criollo — home-born — rather than of noble Spanish rank.",
      },
    ],
  },

  // ── Jinotega — capital of Jinotega Department, Nicaragua ───────────────────
  "NI-JI": {
    description:
      "Jinotega's flag has three vertical stripes. The vermilion red at the hoist is the region's ripe " +
      "coffee — its chief crop and the engine of its economy — and the vigour and valour of its people; " +
      "the zinc-white centre is their yearning for peace; and the emerald green at the fly is the " +
      "production and abundance of its natural resources.",
    sources: [
      { title: "Símbolos — Alcaldía de Jinotega (official)", url: "https://web.alcaldiajinotega.gob.ni/simbolos/" },
    ],
  },

  // ── Calabar — capital of Cross River State, Nigeria ────────────────────────
  "NG-CR": {
    description:
      "Calabar's flag is a red-over-green field crossed by a yellow cross (in the St George's manner), with " +
      "a yellow star in the upper hoist. The red, green and yellow are the Pan-African colours; the cross " +
      "stands for Christianity, long established in Calabar; and the star for the unity of the region's " +
      "peoples.",
    sources: [
      { title: "Calabar (Nigeria) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ng%7Dcal.html" },
    ],
  },

  // ── Windhoek — capital of the Khomas Region and of Namibia ─────────────────
  "NA-KH": {
    description:
      "The City of Windhoek's flag carries its logo — a stylised blue rendering of the Windhoek aloe " +
      "(Aloe littoralis), the plant that stands at the centre of the city's coat of arms and is emblematic " +
      "of the Namibian capital. The city's motto is ‘Suum Cuique’, Latin for ‘to each their own’.",
    sources: [
      { title: "Windhoek — Wikipedia", url: "https://en.wikipedia.org/wiki/Windhoek" },
    ],
  },

  // ── Mexicali — capital of Baja California, Mexico ──────────────────────────
  "MX-BCN": {
    description:
      "Mexicali's arms (adopted 1968) picture the desert border city and its valley: the field is split " +
      "diagonally between ochre desert and the blue Gulf of California, divided by a red line for the " +
      "Colorado River. A red half-sun stands for the region's heritage, the Cerro del Centinela rises in " +
      "the desert, cotton above it marks the valley's farming, and a cog and an atom stand for industry and " +
      "science. The border motto ‘Tierra Cálida’ (‘warm land’) speaks both of the fierce heat and of the " +
      "warmth of the people.",
    sources: [
      { title: "Mexicali (Baja California) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/mx-bc-ml.html" },
    ],
  },

  // ── Chihuahua City — capital of Chihuahua, Mexico ──────────────────────────
  "MX-CHH": {
    description:
      "Chihuahua's arms show, against a blue sky, the three hills that ring the state capital — El Coronel, " +
      "Santa Rosa and Grande — and, before them, a mine winch (malacate) for the region's mining, a stretch " +
      "of the city's colonial Aqueduct, and a mezquite tree of the northern desert.",
    sources: [
      { title: "Escudo de Chihuahua — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Chihuahua" },
    ],
  },

  // ── Tuxtla Gutiérrez — capital of Chiapas, Mexico ──────────────────────────
  "MX-CHP": {
    description:
      "Tuxtla Gutiérrez took as its arms, in 1941, the pre-Columbian glyph of its Nahuatl name: a standing " +
      "rabbit over a three-toothed jaw, drawn as in the Codex Mendoza. Together the two signs read " +
      "‘Tochtlan’ — ‘place of abundant rabbits’ — the name the Mexica gave this land of Zoque settlements.",
    sources: [
      { title: "Escudo de Tuxtla Gutiérrez — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Tuxtla_Gutiérrez" },
    ],
  },

  // ── Toluca de Lerdo — capital of the State of México ───────────────────────
  "MX-MEX": {
    description:
      "Toluca's arms set, on a red field, the outline of the State of México and the toponymic glyph " +
      "Tolutepetl — the hill that gives the city its name — beside the snow-capped Nevado de Toluca " +
      "(Xinantécatl) volcano.",
    sources: [
      { title: "Escudo de Toluca — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Toluca" },
    ],
  },

  // ── Morelia — capital of Michoacán, Mexico ─────────────────────────────────
  "MX-MIC": {
    description:
      "Morelia's arms are three gold quarters, each bearing a crowned king robed in purple with a sceptre. " +
      "The three crowns stand for the city's three founders — Juan de Alvarado, Juan de Villaseñor and Luis " +
      "de León Romano — who laid out the city (then Valladolid) in 1541.",
    sources: [
      { title: "Símbolos de Morelia — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Símbolos_de_Morelia" },
    ],
  },

  // ── Cuernavaca — capital of Morelos, Mexico ────────────────────────────────
  "MX-MOR": {
    description:
      "Cuernavaca's arms are the pre-Columbian glyph of ‘Cuauhnáhuac’ (‘next to the trees’), from which the " +
      "Spanish name Cuernavaca comes: a brown tree trunk with three branches in dark-green foliage and four " +
      "red roots, cut on one side in the shape of a mouth from which issues a grey speech-scroll — the " +
      "Nahuatl sign that spells the town's name.",
    sources: [
      { title: "Cuernavaca — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Cuernavaca" },
    ],
  },

  // ── Guadalajara — capital of Jalisco, Mexico ───────────────────────────────
  "MX-JAL": {
    description:
      "Guadalajara's arms — granted by Emperor Charles V in 1539 — are a blue shield with two golden lions " +
      "rampant leaning on a golden pine tree. The lions stand for the city's warrior, watchful and generous " +
      "spirit — vigilance, sovereignty, majesty and bravery — and the pine for perseverance; the city flag " +
      "sets the arms on a blue-gold-blue field.",
    sources: [
      { title: "Escudo de Guadalajara (Jalisco) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_Guadalajara_(Jalisco)" },
    ],
  },

  // ── Mérida — capital of Yucatán, Mexico ────────────────────────────────────
  "MX-YUC": {
    description:
      "Mérida's arms were granted by King Philip III in 1618. The shield is parted in two: a golden castle " +
      "on blue, and a golden lion rampant on green — the castle and lion of the arms of Mérida in Spain, " +
      "after which the Yucatán city was named. It is titled the ‘Very Noble and Very Loyal City of Mérida’.",
    sources: [
      { title: "Escudo de armas de Mérida (México) — Wikipedia (es)", url: "https://es.wikipedia.org/wiki/Escudo_de_armas_de_Mérida_(México)" },
    ],
  },

  // ── Erdenet — capital of Orkhon Province, Mongolia ─────────────────────────
  "MN-035": {
    description:
      "Erdenet's emblem shows a white snow lion — a symbol of happiness — reaching for three droplets " +
      "coloured green, blue and red for the natural world, ringed by protective flames, with the city's " +
      "name (ЭРДЭНЭТ) above. Erdenet, built around one of the world's largest copper mines, takes its name " +
      "from the Mongolian for ‘with treasure’.",
    sources: [
      { title: "Mongol district flags — Flags of the World", url: "https://www.crwflags.com/fotw/flags/mn-distr.html" },
    ],
  },

  // ── Radoviš — capital of Radoviš Municipality, North Macedonia ─────────────
  "MK-64": {
    description:
      "Radoviš's arms are silver bearing the ‘Radoviš cross’ — a rare cross form found on the town's Church " +
      "of St Elias and taken as its distinctive emblem — within a red municipal border and beneath a golden " +
      "mural crown that marks the town's city status (the greater arms add a wreath of green mulberry " +
      "leaves). The red and white are the commonest colours of Macedonian folk costume, read as blood shed " +
      "for freedom and hope for a brighter future, and also acknowledge the Turkish community, the " +
      "municipality's largest minority.",
    sources: [
      { title: "Општински симболи — radovis.gov.mk (official)", url: "https://radovis.gov.mk/општински-симболи" },
      { title: "Macedonian Heraldic Society — heraldika.org.mk", url: "https://heraldika.org.mk/en/registar/" },
    ],
  },

  // ── Ohrid — capital of Ohrid Municipality, North Macedonia ─────────────────
  "MK-58": {
    description:
      "Ohrid's arms are dominated by the walls of Samuel's Fortress (Samoilova tvrdina), the medieval " +
      "stronghold above the town that is a defining part of Ohrid's — and Macedonia's — cultural heritage, " +
      "set over the waters of Lake Ohrid. The arms date from the 1950s and were registered as an official " +
      "municipal symbol in 1967, a rarity for a Macedonian municipality.",
    sources: [
      { title: "Грб на Општина Охрид — Википедија (mk)", url: "https://mk.wikipedia.org/wiki/Грб_на_Општина_Охрид" },
      { title: "Грб и знаме — ohrid.gov.mk (official)", url: "https://ohrid.gov.mk/грб-и-знаме/" },
    ],
  },

  // ── Bitola — capital of Bitola Municipality, North Macedonia ───────────────
  "MK-04": {
    description:
      "Bitola's arms (adopted 2006) draw on the city's ancient and natural setting: the classical city of " +
      "Heraclea Lyncestis nearby — evoked by the meander (Greek-key) pattern and by the rounded lower part " +
      "of the shield, which recalls Heraclea's white amphitheatre — and a red-and-gold field standing for " +
      "the sunlit peaks of the Pelister molika pines and the golden grain of the Pelagonia plain. Its " +
      "colours are read as blue for civil society and democracy, red for life and tradition, gold for " +
      "spiritual wealth, and white for moral purity.",
    sources: [
      { title: "Грб на Општина Битола — Википедија (mk)", url: "https://mk.wikipedia.org/wiki/Грб_на_Општина_Битола" },
    ],
  },

  // ── Štip — capital of Štip Municipality, North Macedonia ───────────────────
  "MK-83": {
    description:
      "Štip's arms are a shield showing the Isar Fortress, the old citadel on the hill above the town; the " +
      "modern name ‘Штип’ (Štip) runs along the top and the town's ancient name ‘Astibo’ along the bottom.",
    sources: [
      { title: "Грб на Општина Штип — Википедија (mk)", url: "https://mk.wikipedia.org/wiki/Грб_на_Општина_Штип" },
    ],
  },

  // ── Strumica — capital of Strumica Municipality, North Macedonia ───────────
  "MK-73": {
    description:
      "Strumica's arms are a gold-and-blue shield of four fields: a golden cross for the 6th-century " +
      "monastery of St Leontius at nearby Vodoča; a sun; the Tsar's Towers (Carevi Kuli) — the fortress on " +
      "the hill above Strumica — beneath three stars; and a carnival mask for the famous Strumica Carnival.",
    sources: [
      { title: "Грб на Општина Струмица — Википедија (mk)", url: "https://mk.wikipedia.org/wiki/Грб_на_Општина_Струмица" },
    ],
  },

  // ── Amman — capital of the Amman Governorate and of Jordan ─────────────────
  "JO-AM": {
    description:
      "Amman's flag carries the Greater Amman Municipality logo, launched in 2009 for the city's centennial: " +
      "the name عمّان (‘Amman’) in bold, open-ended Arabic lettering set among seven multi-coloured hills. " +
      "The seven hills recall the tradition that Amman — like Rome — first grew up on seven jabals (hills), " +
      "and the bright colours stand for the modern city's diversity and vibrancy. (The older municipal " +
      "emblem it replaced was a green field with a golden triple archway under three crescents.)",
    sources: [
      { title: "Municipality of Greater Amman — Flags of the World", url: "https://www.crwflags.com/fotw/flags/jo-amman.html" },
    ],
  },

  // ── Reykjavík — capital region and capital of Iceland ──────────────────────
  "IS-1": {
    description:
      "Reykjavík's arms show, on a blue shield, two white high-seat pillars (öndvegissúlur) rising above " +
      "white waves. They recall the city's founding legend: Ingólfur Arnarson, reckoned Iceland's first " +
      "permanent settler, cast the carved wooden pillars from his high seat into the sea as he approached " +
      "the coast, vowing to make his home wherever they drifted ashore — which turned out to be the bay of " +
      "Reykjavík. The blue field and the waves are that sea, which carried the pillars to the site. The " +
      "arms were designed by the artist Halldór Pétursson in 1951 and adopted in 1957.",
    sources: [
      { title: "Icelandic heraldry — Wikipedia", url: "https://en.wikipedia.org/wiki/Icelandic_heraldry" },
      { title: "History of Reykjavík — Visit Reykjavík", url: "https://visitreykjavik.is/history-reykjavik" },
    ],
  },

  // ── Jerusalem — capital of the Jerusalem District and of Israel ────────────
  "IL-JM": {
    description:
      "Jerusalem's flag carries the city emblem (adopted 1950) between two blue bands: a shield bearing " +
      "the Lion of Judah — the emblem of the biblical Tribe of Judah, whose kingdom had Jerusalem as its " +
      "capital, standing for strength and leadership — set against a stylised pattern of large stones that " +
      "represents the Western Wall (the Kotel). Flanking the shield are two olive branches, which, as on " +
      "Israel's national emblem, stand for peace and goodwill.",
    sources: [
      { title: "Emblem of Jerusalem — Wikipedia", url: "https://en.wikipedia.org/wiki/Emblem_of_Jerusalem" },
      { title: "Jerusalem (Israel) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/il-jerus.html" },
    ],
  },

  // ── Tel Aviv — capital of the Tel Aviv District, Israel ────────────────────
  "IL-TA": {
    description:
      "Tel Aviv-Yafo's emblem, created for the city's 25th anniversary in 1934 through a competition won by " +
      "the artist Nachum Gutman, sits on a white flag between two blue bands. A lighthouse recalls the old " +
      "port of Tel Aviv, for years the gateway through which immigrants entered the country. Seven stars " +
      "above it echo Theodor Herzl's vision of a seven-hour working day for the future Jewish state. The " +
      "Hebrew inscription is from the Book of Jeremiah (31:4): ‘Again I will build you, and you shall be " +
      "built, O virgin of Israel.’",
    sources: [
      { title: "Emblem of Tel Aviv-Yafo — Wikipedia", url: "https://en.wikipedia.org/wiki/Emblem_of_Tel_Aviv-Yafo" },
      { title: "Tel Aviv-Yafo (Israel) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/il-tlviv.html" },
    ],
  },

  // ── Haifa — capital of the Haifa District, Israel ──────────────────────────
  "IL-HA": {
    description:
      "Haifa's arms — designed by Esther Berlin-Yo'el and adopted in 1936 — are the only Israeli municipal " +
      "arms formally registered at the College of Arms in London (in the 1930s, under the British Mandate). " +
      "On an azure shield they show Haifa as a port: two lighthouses marking the harbour entrance and a " +
      "passenger ship for maritime commerce, with an olive branch of peace cutting across. The trilingual " +
      "name (Hebrew, Arabic, English) runs beneath.",
    sources: [
      { title: "Haifa (Israel) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/il-haifa.html" },
    ],
    myths: [
      {
        claim: "The red shape at the top of Haifa's arms is a crown.",
        reality:
          "It is the silhouette of El-Burj, the old fortress that once stood on the site of the city hall and " +
          "was demolished long ago — not a heraldic crown, though it is often taken for one.",
      },
    ],
  },

  // ── Beersheba — capital of the Southern District, Israel ───────────────────
  "IL-D": {
    description:
      "Beersheba's emblem (adopted 1973, designed by Hezi Mor) is shown in blue on a light-blue field, the " +
      "national colours. Its centre is an eshel — a tamarisk tree — recalling Abraham, who ‘planted a " +
      "tamarisk tree at Beersheba’ (Genesis 21:33) and welcomed travellers in its shade; here the tamarisk " +
      "is drawn raising bricks, for the building and development of the modern city. The emblem's twelve " +
      "pillars and tower stand for the twelve tribes of Israel and the ingathering of the exiles who came " +
      "to the city from across the world.",
    sources: [
      { title: "Be'er Sheva (Israel) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/il-bshva.html" },
    ],
  },

  // ── Nicosia — capital of the Nicosia District and of Cyprus ─────────────────
  "CY-01": {
    description:
      "Nicosia's flag is white bearing the municipal emblem, a stylised rendering of the star-shaped " +
      "Venetian walls that have girdled the old city since the 1560s, when the Venetians rebuilt the " +
      "fortifications as a ring of heart-shaped bastions. The emblem draws the walls as a curvilinear " +
      "octagon with a blue outer edge and an orange (yellow) interior — blue and yellow being the " +
      "municipality's colours — its points and arrow-shaped elements evoking the bastions. At the centre, " +
      "in a ringed disc, is an abstract white dove: a peace dove standing for the hope of reunification of " +
      "Nicosia, the last divided capital in Europe, split between the Republic of Cyprus and the Turkish-" +
      "controlled north since 1974. The emblem and flag were adopted in the early 1970s.",
    sources: [
      { title: "Symbols of Nicosia — Wikipedia", url: "https://en.wikipedia.org/wiki/Symbols_of_Nicosia" },
      { title: "Nicosia (Municipality, Cyprus) — Flags of the World", url: "https://www.fotw.info/flags/cy-nico.html" },
    ],
  },

  // ── Johor Bahru — capital of the state of Johor, Malaysia ───────────────────
  "MY-01": {
    description:
      "The flag of the Johor Bahru City Council (Majlis Bandaraya Johor Bahru): a horizontal tricolour " +
      "of red over white over blue, with a yellow crescent and five-pointed star centred on the white " +
      "band. The crescent and star are the emblem of Islam, the state religion of Johor, whose capital " +
      "the city is.",
    sources: [
      {
        title: "Johor Bahru City Council (Johore, Malaysia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-j-jbc.html",
      },
      {
        title: "Flag and coat of arms of Johor — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_and_coat_of_arms_of_Johor",
      },
    ],
  },

  // ── George Town — capital of the state of Penang, Malaysia ──────────────────
  "MY-07": {
    description:
      "A white field bearing the arms of the Penang Island City Council. The areca-nut palm on the crest " +
      "refers to the origin of the island’s name — Pulau Pinang, “areca-nut palm island”; the wavy " +
      "blue-and-white lines are the seas around the island, five of each for the five principles of " +
      "Malaysia’s national philosophy (the Rukun Negara) and Penang’s five administrative districts; two " +
      "dolphins support the shield, under the motto “Memimpin Sambil Berkhidmat” (“Leading We Serve”).",
    sources: [
      {
        title: "Coat of arms of Penang — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Penang",
      },
    ],
  },

  // ── Ipoh — capital of the state of Perak, Malaysia ──────────────────────────
  "MY-08": {
    description:
      "A flag bearing the arms of the Ipoh City Council. The two tree trunks are the ipoh tree that gave " +
      "the city its name; two tigers, from Malaysia’s federal coat of arms, flank the shield. Within it a " +
      "fortress recalls Kota Dato’ Laksamana, whose builder is held to have founded the first settlement " +
      "at Ipoh; a blue wavy line is the Kinta River that divides Ipoh’s Old and New Towns; a yellow band " +
      "is the limestone hills around the city; a crescent marks Islam as the official religion; and three " +
      "vertical stripes at the base are taken from the flag of Perak, Ipoh’s state.",
    sources: [
      {
        title: "Logo MBI — Ipoh City Council (official)",
        url: "https://www.mbi.gov.my/en/korporat/logo-mbi",
      },
    ],
  },

  // ── Shah Alam — capital of the state of Selangor, Malaysia ──────────────────
  "MY-10": {
    description:
      "A blue field bearing the arms of the Shah Alam City Council (Majlis Bandaraya Shah Alam) at the " +
      "hoist, with a blue-and-white arabesque geometric pattern toward the fly. On the emblem a tiger — " +
      "each animal armed with a spear — stands for the council’s role as the city’s enforcement " +
      "authority, and a deer for loyalty to the Ruler and the nation and readiness to defend Malay " +
      "sovereignty and the Constitution; the orchid is Shah Alam’s official flower, chosen for its " +
      "“Garden City” concept. A crescent and five-pointed star mark Islam as the official religion and " +
      "the sovereignty of the Ruler and nation, the five points recalling the Pillars of Islam, and the " +
      "geometric pattern the council’s core development objectives. Red and yellow are the state colours " +
      "of Selangor; white stands for cleanliness and purity in the council’s service, and blue for calm " +
      "and peace — efficient, precise and friendly service.",
    sources: [
      {
        title: "Logo Rasmi MBSA — Shah Alam City Council (official)",
        url: "https://www.mbsa.gov.my/ms-my/mbsa/kenalimbsa/profil/Halaman/logo_rasmi.aspx",
      },
      {
        title: "Selangor (Shah Alam City Council) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-selan.html",
      },
    ],
  },

  // ── Seremban — capital of the state of Negeri Sembilan, Malaysia ──────────
  "MY-05": {
    description:
      "The flag of the Seremban City Council (Majlis Bandaraya Seremban), proclaimed a city council on " +
      "1 January 2020: vertical bands of yellow, black and red with the council's emblem on the black. " +
      "Yellow, black and red are the official colours of Negeri Sembilan, and on the emblem they mark the " +
      "council as serving under the patronage of the state's ruler, the Yang di-Pertuan Besar. The " +
      "emblem's shield stands for the council protecting the community and driving the city's " +
      "development; its carved awan larat motif for Negeri Sembilan's customs and culture; its two " +
      "unsheathed kris for courage, strength and integrity — and, as national heritage, for the heritage " +
      "the council preserves; and its finely striped pennants for a council that keeps progressing.",
    sources: [
      {
        title: "Seremban City Council (Negeri Sembilan, Malaysia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-05-se.html",
      },
      {
        title: "Logo MBS — Majlis Bandaraya Seremban (official)",
        url: "https://www.mbs.gov.my/ms/mbs/profil/logo",
      },
    ],
  },

  // ── Kota Kinabalu — capital of the state of Sabah, Malaysia ─────────────────
  "MY-12": {
    description:
      "The flag of Kota Kinabalu City Hall, first raised at midnight on 1 February 2000 as Kota Kinabalu " +
      "was proclaimed a city. State officials chose Mount Kinabalu — at 4,095 m South-East Asia's " +
      "highest mountain — as the image to represent Sabah's capital: it stands as a dark-blue silhouette " +
      "in the light-blue canton, beside red and white bars and above bands of yellow and green. The same " +
      "mountain silhouette represents the state itself on the flag of Sabah.",
    sources: [
      {
        title: "Kota Kinabalu (Sabah, Malaysia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-sb-kk.html",
      },
      { title: "Flag of Sabah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sabah" },
    ],
  },

  // ── Kuala Lumpur — capital of the Federal Territory of Kuala Lumpur and of Malaysia ──
  "MY-14": {
    description:
      "A white field crossed by a broad blue horizontal band through the centre, with three red stripes " +
      "on the white above the band and three on the white below it; in the blue band at the hoist sit a " +
      "yellow crescent and a yellow fourteen-pointed star. Adopted on 14 May 1990 to mark the centenary " +
      "of Kuala Lumpur City Hall (DBKL) as the city’s local authority, it was designed by DBKL architect " +
      "Azmi Ahmad Termizi as a distinct variant of Malaysia’s national flag, the Jalur Gemilang. " +
      "According to the Malaysian Ministry of Information the colours stand for: red — the city’s courage " +
      "and strength; blue — the unity of its multiracial citizens; yellow — sovereignty; and white — " +
      "cleanliness and beauty. The crescent and the fourteen-pointed star are carried over from the " +
      "national flag, where they represent Islam and the unity of the thirteen states with the federal " +
      "government.",
    sources: [
      {
        title: "Flag and coat of arms of Kuala Lumpur — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_and_coat_of_arms_of_Kuala_Lumpur",
      },
    ],
  },

  // ── Putrajaya — capital of the Federal Territory of Putrajaya (federal administrative capital) ──
  "MY-16": {
    description:
      "Three vertical bands — blue, a double-width yellow centre, and blue — with the coat of arms of " +
      "Malaysia in the yellow band, adopted on 1 February 2001, when Putrajaya became a federal " +
      "territory. The national arms at the centre stand for Putrajaya as the administrative centre of " +
      "Malaysia's federal government.",
    sources: [
      {
        title: "Flag of the Federal Territories — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_Territories",
      },
      {
        title: "Identiti Putrajaya — Wikipedia Bahasa Melayu",
        url: "https://ms.wikipedia.org/wiki/Identiti_Putrajaya",
      },
    ],
  },

  // ── Maykop — capital of the Republic of Adygea, Russia ──────────────────────
  "RU-AD": {
    description:
      "A red field bearing, in gold, the emblem from Maykop's coat of arms: a herald's staff (posokh, an " +
      "emblem of wisdom and authority) topped by three apple-tree leaves, resting on a rhombus from which " +
      "two curling vine-stems grow, and at its centre two facing bull's heads with long curved horns. The " +
      "apple-tree leaves reference the city's Adyghe name, “myekъuape” (“valley of apple trees”), and stand " +
      "for fertility and a good harvest; the bull's heads reproduce the golden bull figurines unearthed in " +
      "1897 from the Maykop kurgan (now in the Hermitage), a find that gave its name to the Bronze Age " +
      "\"Maykop culture\" and here stands for the city's diligence and antiquity. The heraldic design was " +
      "first adopted in 1972 (authors A. Parshin and A. Vins) and re-confirmed on 28 February 2005.",
    sources: [
      { title: "Герб Майкопа — Википедия (Wikipedia)", url: "https://ru.wikipedia.org/wiki/Герб_Майкопа" },
      { title: "Герб города Майкоп — Геральдика.ру", url: "https://geraldika.ru/s/104" },
    ],
  },

  // ── Gorno-Altaysk — capital of the Altai Republic, Russia ───────────────────
  "RU-AL": {
    description:
      "An azure (blue) field bearing, in gold, a bow, a spear and a stone axe — tools of hunting and labour " +
      "used by prehistoric peoples of the Altai. They reference the Ulalinka site within the city, one of " +
      "the oldest archaeological monuments of its kind in Russia, whose ancient quartzite tools gave the " +
      "coat of arms its unique theme among Russian cities. In heraldry, azure represents watercourses and a " +
      "clear sky, and also exalted aspiration, sincerity and virtue. The design was first adopted on 20 " +
      "March 1997 and re-registered in the State Heraldic Register of the Russian Federation (arms No. " +
      "12844, flag No. 12845) on 28 January 2020.",
    sources: [
      {
        title: "Флаг и герб Горно-Алтайска — Циклопедия (Cyclowiki)",
        url: "https://cyclowiki.org/wiki/Флаг_и_герб_Горно-Алтайска",
      },
      { title: "Флаг города Горно-Алтайск — Геральдика.ру", url: "https://geraldika.ru/s/42316" },
    ],
  },

  // ── Ufa — capital of the Republic of Bashkortostan, Russia ──────────────────
  "RU-BA": {
    description:
      "A silver (white) field over a green base, with a running marten of natural brown fur crossing the " +
      "green ground toward the flagpole. The marten is one of Russia's oldest civic emblems, first recorded " +
      "on a mid-17th-century seal of the Ufa administrative office and formally granted by Empress Catherine " +
      "II on 8 June 1782. It recalls the marten and sable furs the Bashkirs once paid the Russian tsar as " +
      "yasak (fur tribute), and its poised, upright stance stands for wealth, pride and dignity. Silver " +
      "symbolises faith, sincerity and nobility; green stands for abundance, joy, freedom and peace. The " +
      "modern coat of arms was confirmed in 2006 and the flag in 2007.",
    sources: [
      { title: "Герб Уфы — Википедия (Wikipedia)", url: "https://ru.wikipedia.org/wiki/Герб_Уфы" },
      { title: "Флаг города Уфа — Геральдика.ру", url: "https://geraldika.ru/s/18993" },
    ],
  },

  // ── Ulan-Ude — capital of the Republic of Buryatia, Russia ──────────────────
  "RU-BU": {
    description:
      "Two vertical bands — blue at the hoist, yellow at the fly. In the blue band sits a gold Soyombo: a " +
      "flame of three tongues over a sun-disc over a crescent moon, the traditional Buryat and Mongolic " +
      "emblem of eternal life, marking the city's status as capital of the Buryat republic. In the yellow " +
      "band a green cornucopia crossed diagonally with a black caduceus (Mercury's staff) is carried over " +
      "from the city's historic coat of arms, granted by Empress Catherine II in the 18th century to mark " +
      "Verkhneudinsk (Ulan-Ude's former name) as Transbaikalia's leading centre of trade and fairs. The flag " +
      "was adopted by city council decision No. 261-32 of 20 October 2005.",
    sources: [
      { title: "Герб Улан-Удэ — Википедия (Wikipedia)", url: "https://ru.wikipedia.org/wiki/Герб_Улан-Удэ" },
      {
        title: "Флаг Улан-Удэ — описание, символика, дата утверждения — ruwiki",
        url: "https://ru.ruwiki.ru/wiki/Флаг_Улан-Удэ",
      },
    ],
  },

  // ── Grozny — capital of the Chechen Republic, Russia ────────────────────────
  "RU-CE": {
    description:
      "A green field with, along the bottom edge, three narrow bands — red, white and red — separated from " +
      "the green by a white line. At the centre stands a white mosque with green window and door openings, " +
      "blue domes and a yellow spire bearing a crescent, flanked by a pair of minarets — the city's " +
      "principal civic emblem, marking Grozny's standing as a major centre of Islamic worship and learning " +
      "in the North Caucasus. The flag was approved on 22 September 2010 and entered in the State Heraldic " +
      "Register of the Russian Federation under No. 6267.",
    sources: [
      {
        title: "Городская символика — Мэрия города Грозный (Grozny city administration)",
        url: "https://grozmer.ru/groznyi/gorodskaja-simvolika.html",
      },
    ],
    myths: [
      {
        claim:
          "Grozny's flag or coat of arms depicts a wolf (Borz), the emblem of Chechen national identity.",
        reality:
          "The wolf was the central symbol of Chechnya's earlier, unrecognised Ichkeria-era flag and coat " +
          "of arms (and lent its name, “Borz”, to a rifle produced in Grozny), but it does not appear on " +
          "the city of Grozny's own current official flag or arms, whose sole central figure is the mosque " +
          "described above.",
      },
    ],
  },

  // ── Cheboksary — capital of the Chuvash Republic, Russia ────────────────────
  "RU-CU": {
    description:
      "A white field bearing, at its centre, the city's coat of arms: a shield parted red-over-blue — the " +
      "colours of the former RSFSR and Chuvash ASSR flags — with three silver oak-tree silhouettes styled in " +
      "Chuvash ornamental pattern on the red chief, and five silver ducks in flight on the blue base. The oak, " +
      "a tree favoured in Chuvash tradition, stands for strength, endurance and permanence; the five ducks — " +
      "a device already recorded in Cheboksary's 1781 heraldic description as a city \"abounding in ducks\" — " +
      "are a traditional emblem of the city read as a striving toward freedom, initiative and the attainment " +
      "of one's goals. The Soviet-era version of the arms was adopted on 3 March 1969 and reconfirmed in " +
      "1998 and 2009.",
    sources: [
      { title: "Герб Чебоксар — Википедия (Wikipedia)", url: "https://ru.wikipedia.org/wiki/Герб_Чебоксар" },
      { title: "Герб Чебоксар — Heraldicum.ru", url: "https://www.heraldicum.ru/russia/subjects/towns/ceboksar.htm" },
    ],
  },

  // ── Cherkessk — capital of the Republic of Karachay-Cherkessia, Russia ──────
  "RU-KC": {
    description:
      "A white field bearing, at its centre, the city's coat of arms: a red shield charged with a golden " +
      "stele — a monument standing for the enduring friendship of the peoples living in Cherkessk. At the " +
      "top of the shield, four gold battlements carry the digits “1825”, the city's founding year; the " +
      "shield's base is crossed by three narrow blue bands for the three rivers that run through the city — the Kuban, the " +
      "Abazinka and the Ovechka. The coat of arms was adopted by city Duma decision No. 245 of 18 July 2001.",
    sources: [
      { title: "Герб города Черкесск — Геральдика.ру", url: "https://geraldika.ru/s/1917" },
      {
        title: "Герб города Черкесска — Официальный портал мэрии города Черкесска",
        url: "https://cherkessk09.ru/gerb-goroda-cherkessk.html",
      },
    ],
  },

  // ── Chelyabinsk — capital of Chelyabinsk Oblast, Russia ──────────────────────
  "RU-CHE": {
    description:
      "Three unequal horizontal bands — gold, a silver band patterned as masoned fortress stonework, and " +
      "green — with a gold laden camel at the centre, reproduced from the city's coat of arms. The masoned " +
      "silver band recalls that Chelyabinsk began life as a Russian fortress, founded on 13 September 1736; " +
      "the camel, walking beside the wall and carrying its load, marks the city as \"abounding in goods\" " +
      "brought from Central Asia, a prediction made by the region's founder, geographer V. N. Tatishchev, " +
      "that Chelyabinsk would become a great trading centre. The original coat of arms was granted on 8 June " +
      "1782 (its upper field then bearing Ufa's arms, marking the city's place in Ufa Governorate); gold " +
      "represents strength, generosity and wealth, silver nobility, purity and sincerity. The modern flag was " +
      "adopted by the Chelyabinsk city Duma in May 2002.",
    sources: [
      { title: "Герб Челябинска — Циклопедия (Cyclowiki)", url: "https://cyclowiki.org/wiki/Герб_Челябинска" },
      { title: "Герб Челябинска — Heraldicum.ru", url: "https://www.heraldicum.ru/russia/subjects/towns/celabin.htm" },
    ],
  },

  // ── Anadyr — capital of Chukotka Autonomous Okrug, Russia ───────────────────
  "RU-CHU": {
    description:
      "A blue field with a narrow white wavy stripe along the bottom edge, standing for the coastal waters " +
      "of the Anadyr Estuary. Above it stands the city's golden-yellow bear, turned to face the viewer's " +
      "right and holding a red fish head-upward in its paws — a device drawn from the coat of arms designed " +
      "by artist Sergei Voronin and adopted by the city council on 19 October 1989, marking Anadyr's " +
      "importance as a fishing centre on Chukotka's Bering Sea coast.",
    sources: [
      {
        title: "Геральдика — Администрация городского округа Анадырь (Anadyr city administration)",
        url: "https://anadyr-adm.ru/administration/heraldry",
      },
      { title: "Герб Анадыря — Знание.Вики", url: "https://znanierussia.ru/articles/Герб_Анадыря" },
    ],
  },

  // ── Makhachkala — capital of the Republic of Dagestan, Russia ───────────────
  "RU-DA": {
    description:
      "A red field with a narrow blue base patterned as waves running toward the viewer's right, standing " +
      "for the Caspian Sea. Above the waves rises a silver fortress of three battlemented towers linked by " +
      "walls — recalling the remains of ancient fortifications that once ran from the settlement of Tarki to " +
      "the Caspian shore; the middle tower's gate arch is green, for the city's openness and hospitality, and " +
      "bears the cipher of Peter the Great, commemorating the city's historic name, Port-Petrovsk, and Peter " +
      "I's 1722 Persian Campaign encampment near Tarki. Above the fortress a sixteen-rayed solar sign, its " +
      "rays curved in the sun's course, stands for warmth, prosperity and a bright future. The flag was " +
      "adopted on 15 December 2006 and entered in the State Heraldic Register of the Russian Federation " +
      "under No. 2785.",
    sources: [
      { title: "Герб Махачкалы — Википедия (Wikipedia)", url: "https://ru.wikipedia.org/wiki/Герб_Махачкалы" },
      {
        title: "Символика — Администрация города Махачкалы (Makhachkala city administration)",
        url: "https://admkala.gosuslugi.ru/o-munitsipalnom-obrazovanii/simvolika/",
      },
    ],
  },

  // ── Magas — capital of the Republic of Ingushetia, Russia ───────────────────
  "RU-IN": {
    description:
      "A red field bearing the city's coat of arms: against the Caucasus mountains, a Vainakh battle tower " +
      "stands on a central vertical axis, symbolising both ancient and modern Ingushetia, flanked by Mount " +
      "Stolovaya (“Mat-Loam”) on one side and Mount Kazbek (“Bashloam”) on the other. Above the mountains and " +
      "tower, a half-disc of the sun at its zenith sends down seven straight rays — the sun's high position " +
      "reflecting Ingushetia's name for itself as a \"sunny land\", and echoing Magas's own name, traditionally " +
      "read as \"city of the sun\". A small solar sign below stands for the eternal motion of sun and earth. " +
      "The design echoes Magas's centrepiece, the 100-metre Tower of Concord on Alania Square, built in the " +
      "form of a medieval Ingush battle tower. The coat of arms was approved by decree of the President of " +
      "the Republic of Ingushetia on 11 October 2008.",
    sources: [
      {
        title: "Символика. Республика Ингушетия — Национальный банковский совет (heraldic register)",
        url: "https://nbcrs.org/regions/respublika-ingushetiya/simvolika",
      },
    ],
  },

  // ── Irkutsk — capital of Irkutsk Oblast, Russia ──────────────────────────────
  "RU-IRK": {
    description:
      "Two blue vertical bands flanking a white centre band, on which runs the coat of arms' central figure: " +
      "a babr (the Yakut word for a Siberian tiger) carrying a red sable in its jaws, framed by stylised green " +
      "cedar branches. The babr, watchful and running, stands for Irkutsk's role at the heart of Siberia's " +
      "fur trade; the sable it carries represents the most valuable fur that drove the region's commerce and " +
      "settlement. The coat of arms restores the historic design first granted in 1790 (readopted by city " +
      "Duma decision No. 165-гД of 27 February 1996); heraldic silver stands for truthfulness and purity, red " +
      "for courage and fearlessness.",
    sources: [
      { title: "Герб Иркутска — Википедия (Wikipedia)", url: "https://ru.wikipedia.org/wiki/Герб_Иркутска" },
    ],
    myths: [
      {
        claim:
          "The animal on Irkutsk's coat of arms is a beaver (\"бобр\"/bobr) — as it was even officially " +
          "described for over a century.",
        reality:
          "The animal is a babr — a Yakut/Siberian word for tiger — but 19th-century heraldic officials in " +
          "St Petersburg, unfamiliar with the regional word, mistook it for a mistranscription of \"бобр\" " +
          "(bobr, beaver). Baron B. V. Köhne's 1859 heraldic reform, formalised by an 1878 Senate decree, " +
          "officially redescribed the creature as \"a black running beaver\" and later artists duly gave it a " +
          "beaver's flat tail and webbed hind feet — producing a mythical tiger-beaver hybrid. Russia's State " +
          "Heraldic Council restored \"babr\" to the official blazon only in 1997, though the beaver-like tail " +
          "remains in the design as a historical artifact of the error.",
      },
    ],
  },

  // ── Arkhangelsk — capital of Arkhangelsk Oblast, Russia ──────────────────────
  "RU-ARK": {
    description:
      "A white field crossed by a light-blue diagonal band (a saltire, in the pattern of Russia's naval " +
      "ensign, marking Arkhangelsk's standing as Russia's oldest maritime province) bearing a gold shield at " +
      "its centre: the Archangel Michael, in blue armour with a red shield and a flaming sword, defeating a " +
      "black devil at his feet. Local legend holds that Michael's victory took place near the city, which " +
      "takes its name from the monastery dedicated to him, and that he still watches over it. Gold represents " +
      "sanctity, abundance and might; red, authority and courage; blue, beauty and grandeur. The flag was " +
      "adopted on 23 September 2009, using the sky-blue of Michael's armour on the oblast arms as the " +
      "saltire's colour to distinguish it from the Russian Navy's ensign.",
    sources: [
      { title: "Герб Архангельска — Знание.Вики", url: "https://znanierussia.ru/articles/Герб_Архангельска" },
      {
        title: "Флаг Архангельской области — Википедия (Wikipedia)",
        url: "https://ru.wikipedia.org/wiki/Флаг_Архангельской_области",
      },
    ],
  },

};

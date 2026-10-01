/**
 * Sourced flag-meaning explanations for the Learn-mode flag widget.
 *
 * Rendered by `src/components/FlagMeaning.tsx` as a progressive-disclosure
 * ("What this flag means") expander below the flag image, for BOTH national
 * flags (keyed by ISO 3166-1 alpha-2, e.g. "BR") and subnational flags (keyed
 * by ISO 3166-2 subdivision code, e.g. "GB-SCT").
 *
 * HARD RULE — see "Flag-meaning explanations must be sourced and must separate
 * myth from fact" in CLAUDE.md. Every entry:
 *   - describes the flag's design + DOCUMENTED symbolism only (never invented,
 *     paraphrased-to-fill, or machine-generated), and
 *   - carries at least one authoritative `sources` citation with a real URL, and
 *   - places any widely-believed-but-false / folk-etymology / disputed claim in
 *     `myths` (claim + sourced reality) so it is shown as myth, NOT as fact.
 *
 * `scripts/check-flag-meanings.mjs` (run by `npm run flags:check` + CI) fails
 * the build if an entry has no description, no source, a source without a valid
 * http(s) URL, or a malformed myth. The check is a safety net, not a substitute
 * for verifying each claim against the cited source by hand.
 *
 * Coverage is an incrementally-growing curated set (same philosophy as the city
 * overlay's test set) — a flag with no entry simply renders no disclosure.
 */

export interface FlagMeaningSource {
  /** Human-readable citation title, e.g. "Flag of Brazil — Wikipedia". */
  title: string;
  /** Authoritative URL. Must be a real http(s) link. */
  url: string;
  /** Optional publisher, e.g. "Government of South Africa". */
  publisher?: string;
}

export interface FlagMyth {
  /** The widely-believed but false, unproven, or retro-fitted claim. */
  claim: string;
  /** What the cited record actually says. */
  reality: string;
}

export interface FlagMeaning {
  /** Factual description of the design and its documented symbolism. */
  description: string;
  /** Myth-vs-fact notes. Optional, but where a well-known myth exists it MUST live here. */
  myths?: FlagMyth[];
  /** At least one authoritative citation (enforced non-empty). */
  sources: FlagMeaningSource[];
}

export const FLAG_MEANINGS: Record<string, FlagMeaning> = {
  // ── National flags ──────────────────────────────────────────────────────
  BR: {
    description:
      "A blue disc depicting a starry sky (which includes the Southern Cross) spanned by a " +
      "curved white band bearing the national motto “Ordem e Progresso” (“Order and " +
      "Progress”), set within a yellow rhombus on a green field. When the republic was " +
      "proclaimed in 1889 the green field and yellow rhombus were kept from the previous imperial " +
      "flag (slightly modified in hue and shape); a blue circle of white five-pointed stars " +
      "replaced the arms of the Empire. The star pattern reflects the sky over Rio de Janeiro on " +
      "the morning of 15 November 1889, each star stands for a Brazilian federal unit, and each is " +
      "sized by the apparent magnitude of the real star it represents. The motto derives from " +
      "Auguste Comte’s positivist maxim, “L’amour pour principe et l’ordre pour " +
      "base; le progrès pour but” (“Love as a principle and order as the basis; " +
      "progress as the goal”).",
    myths: [
      {
        claim: "The green stands for Brazil’s forests and the yellow for its gold.",
        reality:
          "A nationalist reinterpretation deliberately popularised in 1889 to erase the flag’s " +
          "monarchical origin. The colours were inherited from the imperial flag, where the green " +
          "represented the House of Braganza of Emperor Pedro I and the yellow the House of Habsburg " +
          "of his wife, Empress Maria Leopoldina.",
      },
    ],
    sources: [
      { title: "Flag of Brazil — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Brazil" },
    ],
  },

  JP: {
    description:
      "The Nisshōki (“sun-mark flag”), popularly called the Hinomaru (“circle of " +
      "the sun”): a white field bearing a single crimson-red disc in the centre. The disc " +
      "represents the sun, echoing Japan’s name Nihon/Nippon, “origin of the sun” or " +
      "“Land of the Rising Sun,” and its long association with the sun goddess Amaterasu. " +
      "The design has been used on banners for centuries and was designated the national merchant " +
      "flag in 1870; it was given statutory status as the national flag in 1999.",
    sources: [
      { title: "Flag of Japan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Japan" },
    ],
  },

  FR: {
    description:
      "A vertical tricolour of blue, white and red. Blue and red are the traditional colours of " +
      "Paris; white was the colour of the House of Bourbon and the king. The flag arose from the " +
      "revolutionary cockade of 1789, which combined the blue and red of the Paris militia with the " +
      "royal white, and was fixed in its modern vertical form during the French Revolution.",
    myths: [
      {
        claim:
          "The three colours stand for the revolutionary ideals liberté (blue), égalité " +
          "(white) and fraternité (red).",
        reality:
          "A popular later association, not the flag’s documented origin: the colours come from " +
          "the Paris cockade (blue and red) combined with the royal/Bourbon white.",
      },
    ],
    sources: [
      { title: "Flag of France — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_France" },
    ],
  },

  US: {
    description:
      "Thirteen horizontal red-and-white stripes for the thirteen original colonies, and a blue " +
      "canton (the “union”) bearing fifty white five-pointed stars, one for each state. As " +
      "states were admitted the number of stars grew, while the stripe count returned to thirteen in " +
      "1818 to honour the founding colonies.",
    myths: [
      {
        claim:
          "The red officially means valour, the white purity, and the blue vigilance/justice on the " +
          "flag.",
        reality:
          "Those meanings were assigned by Charles Thomson to the colours of the Great Seal in 1782, " +
          "not to the flag. No symbolic meaning for the flag’s colours was recorded when it was " +
          "adopted in 1777.",
      },
    ],
    sources: [
      {
        title: "Flag of the United States — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_United_States",
      },
    ],
  },

  CA: {
    description:
      "The Maple Leaf flag: a red field with a white square (a “Canadian pale”) at its " +
      "centre bearing a single red eleven-pointed maple leaf. Red and white had been proclaimed " +
      "Canada’s official colours by King George V in 1921, and the maple leaf is a long-standing " +
      "national emblem. The flag was adopted in 1965.",
    myths: [
      {
        claim: "The maple leaf’s eleven points stand for provinces, territories, or other entities.",
        reality:
          "The number of points has no symbolic meaning. An eleven-point leaf was chosen because it " +
          "stayed clearest and least blurred in wind-tunnel tests of the design.",
      },
    ],
    sources: [
      { title: "Flag of Canada — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Canada" },
    ],
  },

  IN: {
    description:
      "The Tiranga (“tricolour”): horizontal bands of saffron (top), white (middle) and " +
      "India green (bottom), with a navy-blue 24-spoke Ashoka Chakra (wheel of dharma) at the " +
      "centre. In the interpretation given to the Constituent Assembly by S. Radhakrishnan, the " +
      "saffron denotes courage and sacrifice, the white peace and truth, and the green faith and " +
      "growth, while the chakra represents law, righteousness and ceaseless motion.",
    myths: [
      {
        claim: "The saffron band represents Hindus and the green band represents Muslims.",
        reality:
          "The Constituent Assembly explicitly rejected any communal or religious reading of the " +
          "colours, stressing that the flag has no such meaning.",
      },
    ],
    sources: [
      { title: "Flag of India — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_India" },
    ],
  },

  ZA: {
    description:
      "A horizontal bicolour of red (top) and blue (bottom) separated by a central green " +
      "horizontal Y (a “pall”) bordered in white, with a black triangle bordered in gold " +
      "at the hoist. Adopted in 1994, its converging Y-shape is officially described as symbolising " +
      "the coming together of the country’s diverse peoples and their shared road ahead.",
    myths: [
      {
        claim: "Each colour of the South African flag has a specific official meaning.",
        reality:
          "The South African government states that no universal symbolism is attached to the " +
          "individual colours; only the converging design carries an official meaning.",
      },
    ],
    sources: [
      {
        title: "National flag — Government of South Africa",
        url: "https://www.gov.za/about-sa/national-symbols/national-flag",
        publisher: "Government of South Africa",
      },
      { title: "Flag of South Africa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Africa" },
    ],
  },

  IE: {
    description:
      "A vertical tricolour of green, white and orange. In the flag’s official symbolism the " +
      "green represents the Gaelic and Roman Catholic tradition of Ireland, the orange represents " +
      "the followers of William of Orange (Irish Protestants and unionists), and the white between " +
      "them signifies a lasting peace and truce between the two traditions. It was introduced by " +
      "Thomas Francis Meagher in 1848.",
    sources: [
      { title: "Flag of Ireland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ireland" },
    ],
  },

  DE: {
    description:
      "A horizontal tricolour of black, red and gold. Germany’s constitution (Basic Law) simply " +
      "states that the federal flag is black, red and gold and assigns no official meaning to the " +
      "individual colours. The colours are commonly traced to the black uniforms, red facings and " +
      "gold buttons of the Lützow Free Corps volunteers of the Napoleonic Wars, and were carried by " +
      "the liberal-nationalist movement of the 19th century.",
    myths: [
      {
        claim:
          "The colours officially mean the “blackness of servitude, through bloody battles, to the " +
          "golden light of freedom,” or derive definitively from the Lützow Free Corps.",
        reality:
          "These are popular interpretations, not official doctrine — no meaning is assigned in law — " +
          "and historians treat the Lützow-uniform origin as one plausible theory among several rather " +
          "than a settled fact.",
      },
    ],
    sources: [
      { title: "Flag of Germany — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Germany" },
    ],
  },

  IT: {
    description:
      "A vertical tricolour of green, white and red, first adopted by the Cispadane Republic in 1797. " +
      "Italian Jacobins are documented as choosing green (in place of the French blue) to represent " +
      "nature and, by extension, natural rights, equality and freedom. The colours became emblematic " +
      "of Italian identity through the Napoleonic era and the Risorgimento.",
    myths: [
      {
        claim:
          "The colours depict the landscape: green for the plains/hills, white for the Alpine snow, " +
          "and red for the blood of war.",
        reality:
          "A popular interpretation with no official endorsement. The documented rationale for the " +
          "colours is philosophical (nature, natural rights, equality, freedom), not geographic.",
      },
    ],
    sources: [
      { title: "Flag of Italy — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Italy" },
    ],
  },

  AR: {
    description:
      "Three horizontal bands of light blue, white and light blue, with the golden Sun of May (a " +
      "face surrounded by 32 alternating straight and wavy rays) on the central white band of the " +
      "official flag. General Manuel Belgrano raised it in 1812; the colours came from the national " +
      "cockade, and the Sun of May (added 1818) reproduces the emblem on Argentina’s first coin of 1813.",
    myths: [
      {
        claim: "The light blue and white represent the sky, the clouds and the sun.",
        reality:
          "A popular reading — reinforced by patriotic songs — that historians generally reject. The " +
          "colours are attributed to the national cockade, and scholarly explanations link them to " +
          "Bourbon loyalty (the ribbon of the Order of Charles III) or the arms of Buenos Aires.",
      },
    ],
    sources: [
      { title: "Flag of Argentina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Argentina" },
    ],
  },

  ES: {
    description:
      "Three horizontal stripes of red, yellow and red, the yellow being twice the height of each red " +
      "stripe (giving the nickname la Rojigualda). The coat of arms sits on the yellow band. The " +
      "colours derive from the heraldic traditions of the medieval kingdoms that formed Spain — the " +
      "yellow from the Crown of Aragon, the red from Castile. The design was chosen by Charles III as " +
      "a naval ensign by royal decree in 1785 and extended to all the armed forces in 1843.",
    myths: [
      {
        claim: "The red stripes stand for blood and the yellow for the sand of the bullring.",
        reality:
          "A popular saying with no historical basis. The colours trace to the heraldry of the " +
          "kingdoms of Aragon and Castile.",
      },
    ],
    sources: [
      { title: "Flag of Spain — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Spain" },
    ],
  },

  PT: {
    description:
      "A field of green (hoist) and red (fly) with the national coat of arms — a white shield on a " +
      "yellow armillary sphere — over the boundary. In the official symbolism the red represents " +
      "sacrifice and the blood of those who defended the nation, and the green represents hope (also " +
      "chosen to distinguish the flag from the old royal standard). The armillary sphere recalls the " +
      "Age of Discoveries; the five small blue shields are traditionally associated with the Five " +
      "Wounds of Christ. Adopted in 1911 after the republican revolution, using the red and green of " +
      "the Portuguese Republican Party.",
    myths: [
      {
        claim:
          "The five blue shields commemorate five Moorish kings defeated by Afonso I at the Battle of " +
          "Ourique in 1139.",
        reality:
          "Regarded as a pure legend: the number of bezants on each shield varied over long periods, " +
          "and the story is first recorded only in the 15th century.",
      },
    ],
    sources: [
      { title: "Flag of Portugal — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Portugal" },
    ],
  },

  NL: {
    description:
      "A horizontal tricolour of red, white and blue. In heraldic tradition the red is associated with " +
      "bravery and strength, the white with peace and honesty, and the blue with vigilance, loyalty " +
      "and justice. The flag descends from the late-16th-century Prince’s Flag of orange-white-blue " +
      "(after the livery of William of Orange); red gradually replaced orange over the 17th century as " +
      "the Republic distanced itself from the House of Orange, and red-white-blue was reaffirmed by " +
      "royal decree in 1937.",
    myths: [
      {
        claim: "The Dutch flag has always been red, white and blue.",
        reality:
          "The original flag was orange-white-blue; the top stripe became red during the 17th century.",
      },
    ],
    sources: [
      { title: "Flag of the Netherlands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Netherlands" },
    ],
  },

  BE: {
    description:
      "A vertical tricolour of black, yellow and red (with unusual proportions close to 13:15). The " +
      "colours are taken from the arms of the Duchy of Brabant — a red-tongued, red-clawed gold lion " +
      "on a black field. The horizontal tricolour of the 1830 Belgian Revolution was changed to " +
      "vertical stripes by the National Congress in 1831 and written into the Constitution.",
    sources: [
      { title: "Flag of Belgium — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Belgium" },
    ],
  },

  SE: {
    description:
      "A blue field bearing a yellow Nordic (off-centre) cross, which traditionally represents " +
      "Christianity. The blue and gold are drawn from the Swedish royal coat of arms, recorded from " +
      "the late 13th century. A blue cloth with a yellow cross is documented from the early 16th " +
      "century and first described in law in 1562; the modern design was fixed by the Flag Law of 1906.",
    myths: [
      {
        claim: "King Eric IX adopted the flag after seeing a golden cross in the sky in 1157.",
        reality:
          "A piece of folklore with no historical documentation; the flag’s recorded origin lies in " +
          "the royal arms, not a vision.",
      },
    ],
    sources: [
      { title: "Flag of Sweden — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sweden" },
    ],
  },

  DK: {
    description:
      "The Dannebrog: a white Nordic cross on a red field. A banner with a white-on-red cross is " +
      "documented in use by the kings of Denmark from the 14th century, and it holds the Guinness " +
      "record as the oldest continuously used national flag.",
    myths: [
      {
        claim:
          "The flag fell from the sky during the Battle of Lyndanisse (Lindanise) in Estonia in 1219, " +
          "granting victory to King Valdemar II.",
        reality:
          "A legend first recorded in 16th-century writings, echoing a wider Christian tradition of " +
          "miraculous crosses — not a documented historical event.",
      },
    ],
    sources: [
      { title: "Flag of Denmark — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Denmark" },
    ],
  },

  GR: {
    description:
      "Nine equal horizontal stripes alternating blue and white, with a white cross on a blue canton; " +
      "the cross represents the Greek Orthodox Christian faith. The blue-and-white cross design was " +
      "adopted by the First National Assembly in 1822; the striped form was standardised in its " +
      "current proportions in 1978. Greek law has never fixed an exact shade of blue.",
    myths: [
      {
        claim:
          "The nine stripes stand for the nine syllables of the motto “Eleftheria i Thanatos” " +
          "(“Freedom or Death”).",
        reality:
          "A popular but unconfirmed interpretation; others link the nine stripes to Greece’s regions " +
          "or to the sky and sea. No official meaning is recorded.",
      },
    ],
    sources: [
      { title: "Flag of Greece — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Greece" },
    ],
  },

  CH: {
    description:
      "A white cross on a square red field, the cross arms one-sixth longer than they are wide. The " +
      "white cross began as a field mark to identify Confederate soldiers, documented from the Battle " +
      "of Laupen (1339), and was formally adopted by the Swiss Diet by 1540. It received a legal " +
      "definition in 1889 and precise proportions in 2017.",
    myths: [
      {
        claim: "The cross was always a religious (Christian) symbol.",
        reality:
          "It originated as practical military identification; the Christian reading was applied " +
          "retrospectively (notably in the Federal Council’s 1889 description), and the competing " +
          "origin legends have no definitive historical support.",
      },
    ],
    sources: [
      { title: "Flag of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Switzerland" },
    ],
  },

  MX: {
    description:
      "A vertical tricolour of green, white and red with the national coat of arms — a golden eagle " +
      "on a nopal cactus devouring a serpent — on the white stripe. The emblem depicts the Aztec " +
      "legend of the founding of Tenochtitlan, the sign marking where the Mexica were to build their " +
      "capital. The tricolour dates from independence (1821); the current design was fixed in 1968.",
    myths: [
      {
        claim: "The colours have fixed official meanings (e.g. green = hope, white = unity, red = blood).",
        reality:
          "The meanings ascribed to the colours have changed over time, and current Mexican flag law " +
          "assigns them no official symbolism.",
      },
    ],
    sources: [
      { title: "Flag of Mexico — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mexico" },
    ],
  },

  PL: {
    description:
      "Two equal horizontal bands, white over red. The colours are heraldic: they come from the White " +
      "Eagle of Poland (and the white knight, the Pahonia, of Lithuania) set on a red shield in the " +
      "arms of the Polish-Lithuanian Commonwealth. White and red were declared national colours in " +
      "1831 and the flag was officially adopted in 1919.",
    sources: [
      { title: "Flag of Poland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Poland" },
    ],
  },

  TR: {
    description:
      "A red field bearing a white crescent and star, set slightly left of centre. The star-and-" +
      "crescent is an Ottoman and Turkic emblem — it appeared on Ottoman flags from the late 18th or " +
      "early 19th century and the white crescent-and-star was standardised in 1844. The Republic of " +
      "Türkiye kept the Ottoman design in 1923, and it was fixed by the Turkish Flag Law of 1936.",
    myths: [
      {
        claim:
          "The design shows the reflection of the moon and a star in a pool of blood of soldiers " +
          "fallen in battle.",
        reality:
          "A romantic origin story that is not historically documented. The star-and-crescent is an " +
          "inherited Ottoman/Turkic emblem and — contrary to common belief — predates its association " +
          "with Islam.",
      },
    ],
    sources: [
      { title: "Flag of Turkey — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Turkey" },
    ],
  },

  RU: {
    description:
      "A horizontal tricolour of white, blue and red, introduced by Peter the Great in the 1690s and " +
      "later a source of the Pan-Slavic colours. Under Alexander III the colours were officially read " +
      "as white for nobility and frankness, blue for faithfulness and honesty, and red for courage " +
      "and love.",
    myths: [
      {
        claim:
          "The three stripes stand for the three “Russias”: White (Belarus), Little (Ukraine) and " +
          "Great Russia.",
        reality:
          "A common unofficial interpretation with no historical verification; it is not the flag’s " +
          "documented origin.",
      },
    ],
    sources: [
      { title: "Flag of Russia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Russia" },
    ],
  },

  CN: {
    description:
      "A red field with five golden stars in the canton — one large star with four smaller stars " +
      "arced toward it. The red symbolises the communist revolution; the large star represents the " +
      "Chinese Communist Party and the four smaller stars the unity of the Chinese people under its " +
      "leadership (originally the four social classes of Mao’s “New Democracy”). Designed by Zeng " +
      "Liansong and first raised on 1 October 1949.",
    myths: [
      {
        claim: "The five stars represent China’s five largest ethnic groups.",
        reality:
          "A misconception that confuses this flag with the earlier “Five Races Under One Union” flag " +
          "of the Beiyang government (1912–1928). The stars stand for the Party and the people it leads.",
      },
    ],
    sources: [
      { title: "Flag of China — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_China" },
    ],
  },

  KR: {
    description:
      "The Taegeukgi: a white field bearing a central red-and-blue taegeuk (yin-yang) circle, with " +
      "four black trigrams from the I Ching in the corners. The white field stands for peace and " +
      "purity; the taegeuk represents the balance of yin (blue) and yang (red); and the four trigrams " +
      "represent heaven, earth, water and fire, together expressing harmony and movement. Adopted in " +
      "1883 under the Joseon dynasty.",
    sources: [
      { title: "Flag of South Korea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Korea" },
    ],
  },

  GB: {
    description:
      "The Union Flag (Union Jack): the red cross of Saint George (England) over the white saltire of " +
      "Saint Andrew (Scotland) and the red saltire of Saint Patrick (Ireland), combined on a blue " +
      "field. James I first united the English and Scottish crosses in 1606; the Irish saltire was " +
      "added in 1801. Wales is not represented because it had already been incorporated into the " +
      "Kingdom of England before the first Union Flag was created.",
    myths: [
      {
        claim: "The flag may only be called the “Union Jack” when flown at sea.",
        reality:
          "Although “jack” has a maritime origin, official bodies including the Flag Institute accept " +
          "both “Union Jack” and “Union Flag” for the flag in any context.",
      },
    ],
    sources: [
      { title: "Union Jack — Wikipedia", url: "https://en.wikipedia.org/wiki/Union_Jack" },
    ],
  },

  AU: {
    description:
      "A blue field with the Union Jack in the canton, a large white seven-pointed Commonwealth " +
      "(Federation) Star below it, and the five stars of the Southern Cross in the fly. The " +
      "Commonwealth Star’s points stand for the six federating colonies plus a seventh (added 1908) " +
      "for the territories; the Southern Cross is the constellation that marks the southern sky. The " +
      "design came from a 1901 public competition after federation.",
    myths: [
      {
        claim:
          "The four main stars of the Southern Cross officially stand for the moral virtues justice, " +
          "prudence, temperance and fortitude.",
        reality:
          "That association was the personal intent of one of the winning designers, Ivor Evans — it " +
          "is not part of the flag’s official symbolism.",
      },
    ],
    sources: [
      { title: "Flag of Australia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Australia" },
    ],
  },

  VN: {
    description:
      "A red field with a large gold five-pointed star at the centre. The red represents revolution " +
      "and the blood of the struggle; the gold star stands for the nation, its five points " +
      "traditionally taken to represent the workers, peasants, soldiers, intellectuals and traders " +
      "united under the Communist Party. First raised in 1940 and adopted in 1945; the star’s points " +
      "were straightened in 1955.",
    myths: [
      {
        claim: "The flag was definitively designed by the revolutionary Nguyễn Hữu Tiến.",
        reality:
          "Authorship is disputed; Vietnam’s Ministry of Culture reported in 2001 that there is no " +
          "documentation confirming Tiến as the designer.",
      },
    ],
    sources: [
      { title: "Flag of Vietnam — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vietnam" },
    ],
  },

  ID: {
    description:
      "Two equal horizontal bands, red over white, called Sang Saka Merah-Putih. The red represents " +
      "courage (and the body) and the white purity (and the spirit); the red-and-white pairing goes " +
      "back to banners of the 13th-century Majapahit empire. Adopted at the declaration of " +
      "independence in 1945.",
    myths: [
      {
        claim: "Indonesia copied its flag from Monaco (which is near-identical).",
        reality:
          "The two flags resemble each other by coincidence (they differ slightly in shade and " +
          "proportion). Indonesia’s red-and-white derives from its own Majapahit-era heritage, " +
          "long predating the modern comparison.",
      },
    ],
    sources: [
      { title: "Flag of Indonesia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Indonesia" },
    ],
  },

  TH: {
    description:
      "The Trairong (“tricolour”): five horizontal stripes of red, white, blue, white, red, the " +
      "central blue stripe double width. The colours follow the “Nation–Religion–King” theme — red " +
      "for the nation and people, white for religion (Buddhism), and blue for the monarchy (also the " +
      "auspicious colour of King Vajiravudh, Rama VI, who introduced it in 1917).",
    myths: [
      {
        claim:
          "King Vajiravudh created the symmetric design after seeing the old elephant flag flown " +
          "upside-down.",
        reality:
          "A popular legend rather than documented fact; what is recorded is the 1917 adoption and " +
          "the king’s role in the design.",
      },
    ],
    sources: [
      { title: "Flag of Thailand — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Thailand" },
    ],
  },

  PH: {
    description:
      "A horizontal bicolour of royal blue over red, with a white equilateral triangle at the hoist " +
      "bearing a golden eight-rayed sun and three five-pointed stars. The eight rays represent the " +
      "eight provinces that first rose in the 1896 revolution; the three stars stand for the island " +
      "groups of Luzon, the Visayas and Mindanao; the white triangle represents the Katipunan and " +
      "the ideals of liberty, equality and fraternity. Uniquely, the flag is inverted — red above " +
      "blue — to signify a state of war. First flown in 1898.",
    sources: [
      { title: "Flag of the Philippines — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Philippines" },
    ],
  },

  PK: {
    description:
      "A dark green field with a white crescent and five-pointed star, and a white vertical stripe at " +
      "the hoist (one-quarter of the flag). The green represents Pakistan’s Muslim majority and the " +
      "white stripe its religious minorities; the crescent represents progress and the star light " +
      "and knowledge. Based on the All-India Muslim League flag and adopted in 1947, days before " +
      "independence.",
    sources: [
      { title: "Flag of Pakistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pakistan" },
    ],
  },

  EG: {
    description:
      "Three horizontal bands of red, white and black with the golden Eagle of Saladin on the white " +
      "band. In the symbolism of the 1952 revolution the red recalls the struggle and blood shed " +
      "against colonial rule, the white the bright/peaceful future, and the black the end of a dark " +
      "period of oppression. The current design was adopted in 1984.",
    myths: [
      {
        claim: "The red-white-black tricolour is uniquely Egyptian.",
        reality:
          "It is the Arab Liberation Flag that spread from Egypt’s 1952 revolution; Iraq, Sudan, " +
          "Syria and Yemen use closely related red-white-black designs.",
      },
    ],
    sources: [
      { title: "Flag of Egypt — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Egypt" },
    ],
  },

  NG: {
    description:
      "A vertical triband of green, white, green. The green bands represent Nigeria’s agriculture and " +
      "natural wealth and the white band peace and unity. The design won a 1959 national competition " +
      "by Taiwo Akinkunmi and was adopted at independence in 1960; the committee removed a red sun " +
      "from his original entry.",
    sources: [
      { title: "Flag of Nigeria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nigeria" },
    ],
  },

  KE: {
    description:
      "Horizontal bands of black, red and green separated by thin white fimbriations, with a red, " +
      "white and black Maasai shield over two crossed white spears at the centre. The black " +
      "represents the people, the red the blood shed in the struggle for independence, the green the " +
      "land, and the white peace; the shield and spears stand for the defence of freedom. Adopted at " +
      "independence in 1963.",
    sources: [
      { title: "Flag of Kenya — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kenya" },
    ],
  },

  ET: {
    description:
      "A horizontal tricolour of green, yellow and red with a blue disc bearing a golden pentagram " +
      "and rays at the centre. The green stands for labour and development, the yellow for hope and " +
      "justice, and the red for sacrifice; the blue disc represents peace and the star the unity of " +
      "Ethiopia’s peoples. The current emblem dates from 1996 (modified 2009).",
    myths: [
      {
        claim: "Ethiopia’s green-yellow-red are “Pan-African” colours borrowed from elsewhere.",
        reality:
          "The reverse is true: Ethiopia is the source of the Pan-African colours. After it kept its " +
          "independence (notably at Adwa in 1896), newly independent African states adopted green, " +
          "yellow and red in homage to it.",
      },
    ],
    sources: [
      { title: "Flag of Ethiopia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ethiopia" },
    ],
  },

  KW: {
    description:
      "A horizontal triband of green, white and red with a black trapezium at the hoist. The colours " +
      "come from a classical poem by Safi al-Din al-Hilli, in which white stands for the Arabs’ " +
      "deeds, green for their lands, red for their swords and black for their battles. Adopted in " +
      "1961; it is the only national flag whose charge is an acute trapezium.",
    sources: [
      { title: "Flag of Kuwait — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kuwait" },
    ],
  },

  SA: {
    description:
      "A green field bearing, in white, the Islamic declaration of faith (the Shahada) in Thuluth " +
      "script above a horizontal sword. The green is associated with Islam and the sword with " +
      "justice and strength. Because the Shahada is sacred, the flag is never lowered to half-mast " +
      "and is woven with two mirrored sides so the text reads correctly from both. Standardised in 1973.",
    myths: [
      {
        claim: "The flag was designed by Hafiz Wahba.",
        reality:
          "A common misattribution; the King Abdulaziz Foundation records that the design was " +
          "finalised by the Shura Council, not a single individual.",
      },
    ],
    sources: [
      { title: "Flag of Saudi Arabia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saudi_Arabia" },
    ],
  },

  CO: {
    description:
      "Three horizontal bands of yellow (the top half), blue and red. In the official reading the " +
      "yellow stands for the nation’s riches, sovereignty and the sun, the blue for the sky and the " +
      "seas and rivers, and the red for the blood shed for independence. The colour scheme was " +
      "created by Francisco de Miranda and adopted by Colombia in 1861.",
    myths: [
      {
        claim:
          "Miranda chose the colours after a 1785 conversation with Goethe about warm/cool colours " +
          "and light.",
        reality:
          "A romantic anecdote attributed to Miranda; he also cited more concrete inspirations, such " +
          "as a similarly-coloured flag in a Genoa fresco and the standard of Hamburg’s civic guard.",
      },
    ],
    sources: [
      { title: "Flag of Colombia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Colombia" },
    ],
  },

  CL: {
    description:
      "Two horizontal bands, white over red, with a blue square canton bearing a single white " +
      "five-pointed star (La Estrella Solitaria). Officially the blue represents the sky and the " +
      "Pacific, the white the snow of the Andes, and the red the blood shed for independence; the " +
      "star is a guide to progress and honour, linked to Venus in Mapuche tradition. Adopted in 1817.",
    myths: [
      {
        claim: "The Chilean flag was voted the “most beautiful flag in the world” in Belgium in 1907.",
        reality:
          "A popular legend with internal errors (it misdescribes Belgium’s geography) and no " +
          "reliable evidence; it is not a documented event.",
      },
    ],
    sources: [
      { title: "Flag of Chile — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Chile" },
    ],
  },

  PE: {
    description:
      "A vertical triband of red, white, red. Officially the red represents the blood of those who " +
      "fell for independence and the white represents purity and peace. First decreed by José de San " +
      "Martín in 1820; the current vertical form was standardised in 1825.",
    myths: [
      {
        claim:
          "San Martín chose red and white after seeing (or dreaming of) red-and-white parihuana " +
          "flamingos.",
        reality:
          "A popular story; the real reasons for the colours are not documented. One scholarly " +
          "suggestion is that he combined the colours of his Chilean and Argentine allies.",
      },
    ],
    sources: [
      { title: "Flag of Peru — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Peru" },
    ],
  },

  CU: {
    description:
      "Five horizontal stripes (three blue, two white) with a red equilateral triangle at the hoist " +
      "bearing a white five-pointed star. The three blue stripes stand for the three divisions into " +
      "which Cuba was then split, the white for the purity of the patriotic cause, and the red " +
      "triangle — with Masonic influence — for strength and the ideals of liberty, equality and " +
      "fraternity; the star represents the independent nation. Designed in 1849 and adopted in 1902.",
    sources: [
      { title: "Flag of Cuba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cuba" },
    ],
  },

  IL: {
    description:
      "A white field with two horizontal blue stripes and a blue Star of David (Magen David) at the " +
      "centre. The design is based on the tallit, the Jewish prayer shawl, and the Star of David is a " +
      "long-standing Jewish symbol. Adopted by the Zionist movement in 1897 and as the national flag " +
      "in 1948.",
    myths: [
      {
        claim:
          "The two blue stripes represent the Nile and the Euphrates, signalling a plan to expand " +
          "between those rivers.",
        reality:
          "A documented misconception, refuted by scholars: the stripes reproduce the bands of the " +
          "prayer shawl, not rivers.",
      },
    ],
    sources: [
      { title: "Flag of Israel — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Israel" },
    ],
  },

  IR: {
    description:
      "A horizontal tricolour of green, white and red with the red national emblem — a stylised form " +
      "of the word “Allah” made of four crescents and a sword — at the centre, and the Takbir " +
      "(“God is greatest”) written 22 times in white Kufic script along the inner edges of the green " +
      "and red bands, recalling 22 Bahman, the date of the 1979 revolution. Green, white and red are " +
      "traditional Iranian colours. Adopted in 1980, replacing the earlier Lion and Sun flag.",
    sources: [
      { title: "Flag of Iran — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iran" },
    ],
  },

  UA: {
    description:
      "Two equal horizontal bands, blue over yellow. Blue and yellow have been associated with " +
      "Ukrainian heraldry since at least the 15th century; the bicolour was adopted by the Supreme " +
      "Ruthenian Council in Lviv in 1848, used by the independence movements of 1917–1921, banned " +
      "under Soviet rule, and officially restored in 1992.",
    myths: [
      {
        claim: "Officially, the blue represents the sky and the yellow a field of wheat.",
        reality:
          "A widespread and evocative interpretation, but not an official one — the colours’ " +
          "documented origin is heraldic, not a depiction of sky and wheat.",
      },
    ],
    sources: [
      { title: "Flag of Ukraine — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ukraine" },
    ],
  },

  NO: {
    description:
      "A red field with a white-bordered blue Nordic (off-centre) cross. Designed by Fredrik Meltzer " +
      "in 1821, it combined red, white and blue as “colours of freedom” (echoing the French, Dutch " +
      "and American flags): the red recalled Norway’s union with Denmark and the blue the new Swedish " +
      "dynasty, while the cross follows Nordic and Christian tradition.",
    sources: [
      { title: "Flag of Norway — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Norway" },
    ],
  },

  FI: {
    description:
      "A white field with a blue Nordic cross. The blue is said to represent Finland’s thousands of " +
      "lakes and its sky, and the white the snow that covers the land in winter. The design was " +
      "chosen by competition after independence and adopted in 1918.",
    myths: [
      {
        claim: "The blue-cross flag is an ancient, medieval Finnish design.",
        reality:
          "It was standardised only in the early 20th century, emerging from a modern 1918 design " +
          "competition (with a ~1860 concept by the poet Zachris Topelius as an inspiration).",
      },
    ],
    sources: [
      { title: "Flag of Finland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Finland" },
    ],
  },

  IS: {
    description:
      "A blue field with a white-bordered red Nordic cross. The colours are read as Iceland’s " +
      "landscape: blue for the mountains and the surrounding ocean, white for ice and snow, and red " +
      "for volcanic fire. A blue-and-white flag appeared in the 1890s; the red cross was added in " +
      "1915, and the design became official when Iceland became a republic in 1944.",
    sources: [
      { title: "Flag of Iceland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iceland" },
    ],
  },

  AT: {
    description:
      "A horizontal triband of red, white, red — among the oldest national symbols still in use. It " +
      "derives from the arms of the Babenberg dynasty (a silver band on a red field), first recorded " +
      "on a seal of 1230.",
    myths: [
      {
        claim:
          "The flag comes from Duke Leopold V’s surcoat, soaked red with blood in battle except for " +
          "a white band left by his belt.",
        reality:
          "A colourful legend (recorded from about 1260), separate from — and later than — the " +
          "documented 1230 heraldic origin.",
      },
    ],
    sources: [
      { title: "Flag of Austria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Austria" },
    ],
  },

  RO: {
    description:
      "A vertical tricolour of blue, yellow and red, read as liberty (blue), justice (yellow) and " +
      "fraternity (red). The colours crystallised in the uprisings of 1821 and the 1848 revolution " +
      "and were standardised by the 1866 constitution. The flag is almost identical to Chad’s, which " +
      "developed independently.",
    myths: [
      {
        claim: "Romania simply borrowed the French tricolour.",
        reality:
          "The individual colours have independent roots in Romanian heraldry dating back centuries " +
          "before their combination as a national flag.",
      },
    ],
    sources: [
      { title: "Flag of Romania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Romania" },
    ],
  },

  HU: {
    description:
      "A horizontal tricolour of red, white and green. In the interpretation set out in the 2012 " +
      "constitution the red stands for strength, the white for fidelity and the green for hope. The " +
      "colours come from the medieval Hungarian coat of arms (they appear on seal cords from at least " +
      "the 15th century); the tricolour itself dates from the revolution of 1848.",
    myths: [
      {
        claim:
          "The colours mean the blood shed for the homeland (red), freedom (white) and the country’s " +
          "pastures (green).",
        reality:
          "A romantic-era folk interpretation. The documented origin is heraldic — the colours of the " +
          "coat of arms — with the official meanings (strength, fidelity, hope) set only later.",
      },
    ],
    sources: [
      { title: "Flag of Hungary — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hungary" },
    ],
  },

  CZ: {
    description:
      "Two horizontal bands, white over red, with a blue isosceles triangle at the hoist. The white " +
      "is associated with Bohemia, the red with Moravia and the blue with sovereignty (originally " +
      "with Slovakia). Designed by Jaroslav Kursa and adopted in 1920 — the blue triangle was added " +
      "to distinguish the plain white-over-red from Poland’s flag. It is the former Czechoslovak " +
      "flag, kept by the Czech Republic when Czechoslovakia split in 1993.",
    sources: [
      { title: "Flag of the Czech Republic — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Czech_Republic" },
    ],
  },

  HR: {
    description:
      "Three horizontal bands of red, white and blue (the Pan-Slavic colours) with the national coat " +
      "of arms at the centre: the red-and-white checkerboard shield, the šahovnica, topped by a crown " +
      "of five smaller shields for the historical regions of Croatia, Dubrovnik, Dalmatia, Istria and " +
      "Slavonia. The tricolour dates from 1848; the current design was adopted in 1990, replacing the " +
      "communist-era red star.",
    sources: [
      { title: "Flag of Croatia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Croatia" },
    ],
  },

  RS: {
    description:
      "A horizontal tricolour of red, blue and white — the Pan-Slavic colours — with the coat of arms " +
      "toward the hoist on the state flag. The tricolour has represented Serbia since 1835.",
    myths: [
      {
        claim:
          "Serbs created their flag by flying the Russian flag upside-down at a celebration.",
        reality:
          "The colours were adopted through official channels — set out in Serbia’s 1835 constitution " +
          "and permitted by an Ottoman decree — not by inverting another country’s flag.",
      },
    ],
    sources: [
      { title: "Flag of Serbia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Serbia" },
    ],
  },

  BG: {
    description:
      "A horizontal tricolour of white, green and red. It was first adopted in 1879 after Bulgaria’s " +
      "liberation in the Russo-Turkish War, and the same colours have been used ever since (a state " +
      "emblem was added in the hoist during the communist era and removed in 1990).",
    sources: [
      { title: "Flag of Bulgaria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bulgaria" },
    ],
  },

  LV: {
    description:
      "A dark carmine-red field crossed by a narrow white stripe (the red bands each twice the height " +
      "of the white). It is among the oldest flags in the world: a red banner with a white stripe " +
      "carried by warriors from Cēsis is recorded in the Rhymed Chronicle of Livonia describing a " +
      "battle of 1279.",
    myths: [
      {
        claim:
          "The flag comes from a mortally wounded Latgalian chief wrapped in a white sheet, its edges " +
          "stained red with his blood while the centre stayed white.",
        reality:
          "A folk legend, unverified. What is documented is the flag’s 13th-century use in the Rhymed " +
          "Chronicle; the actual origin of the design is unknown.",
      },
    ],
    sources: [
      { title: "Flag of Latvia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Latvia" },
    ],
  },

  LT: {
    description:
      "A horizontal tricolour of yellow, green and red. Officially the yellow symbolises the sun and " +
      "prosperity, the green the forests, countryside, freedom and hope, and the red the blood and " +
      "bravery of those who died for Lithuania. The colours were drawn from traditional folk weaving " +
      "and dress, and the design was settled by a commission in 1918.",
    myths: [
      {
        claim: "The flag was created by a single designer.",
        reality:
          "It was the work of a commission — Jonas Basanavičius, Antanas Žmuidzinavičius and Tadas " +
          "Daugirdas — who finalised the yellow-green-red tricolour in 1918.",
      },
    ],
    sources: [
      { title: "Flag of Lithuania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lithuania" },
    ],
  },

  EE: {
    description:
      "A horizontal tricolour of blue, black and white (sinimustvalge). In the popular interpretation " +
      "the blue is the sky, the black the soil and the homeland, and the white purity and hard work. " +
      "The colours began with a Tartu university students’ society, whose first flag was consecrated " +
      "in 1884, decades before Estonian independence in 1918.",
    myths: [
      {
        claim: "The colours carry an official symbolic meaning.",
        reality:
          "Estonia’s Flag Act specifies only the technical colours; the sky/soil/purity reading is a " +
          "cultural interpretation that developed after the flag was adopted.",
      },
    ],
    sources: [
      { title: "Flag of Estonia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Estonia" },
    ],
  },

  BY: {
    description:
      "An unequal bicolour of red (upper two-thirds) over green (lower third), with a red-on-white " +
      "decorative pattern taken from traditional Belarusian textiles running vertically at the hoist. " +
      "In the official reading the red represents freedom and the sacrifice of the nation’s " +
      "forefathers and the green represents life. It is adapted from the 1951 Soviet-era republican " +
      "flag (with the hammer, sickle and star removed), approved by a 1995 referendum and revised in " +
      "2012. A historical white-red-white flag is also used, notably by the opposition.",
    sources: [
      { title: "Flag of Belarus — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Belarus" },
    ],
  },

  SK: {
    description:
      "A horizontal tricolour of white, blue and red (the Pan-Slavic colours) with the national coat " +
      "of arms toward the hoist: a white double cross on three blue hills, within a narrow white " +
      "border. The double cross is a Christian symbol, and the modern arms (adopted with the flag in " +
      "1992) are based on a 14th-century coat of arms.",
    sources: [
      { title: "Flag of Slovakia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Slovakia" },
    ],
  },

  AL: {
    description:
      "A red field with a black double-headed eagle at the centre. The red is associated with " +
      "bravery, strength and bloodshed, and the black double-headed eagle represents the Albanian " +
      "people; it derives from the Byzantine imperial eagle adopted by the national hero Skanderbeg " +
      "in the 15th century. Established as the national flag at independence in 1912 (a communist-era " +
      "star above the eagle was removed in 1992).",
    sources: [
      { title: "Flag of Albania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Albania" },
    ],
  },

  MK: {
    description:
      "A red field with a stylised golden-yellow sun of eight broadening rays reaching the edges. The " +
      "sun stands for the “new sun of Liberty” of the national anthem. The current design (by " +
      "Miroslav Grčev) was adopted in 1995, replacing the 1992 flag that bore the ancient Vergina " +
      "Sun — a change made to settle a dispute with Greece over that symbol.",
    sources: [
      { title: "Flag of North Macedonia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Macedonia" },
    ],
  },

  MT: {
    description:
      "A vertical bicolour of white (hoist) and red, with the George Cross — edged in red — in the " +
      "upper hoist corner of the white band. King George VI awarded the George Cross to Malta in 1942 " +
      "for its people’s bravery in the Second World War, and it was added to the flag in 1943.",
    myths: [
      {
        claim:
          "The white and red come from Count Roger of Sicily, who in 1091 tore his red-and-white " +
          "banner to give the Maltese their colours.",
        reality:
          "This story has been debunked as a 19th-century myth; the colours more likely derive from " +
          "the white-cross-on-red flag of the Knights of Malta.",
      },
    ],
    sources: [
      { title: "Flag of Malta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malta" },
    ],
  },

  CY: {
    description:
      "A white field bearing a copper-coloured silhouette of the island of Cyprus above two green " +
      "olive branches. The copper colour refers to the island’s copper deposits (from which its name " +
      "derives) and the olive branches to peace between its Greek and Turkish communities. It was " +
      "designed to be deliberately neutral — avoiding the blue and red of the Greek and Turkish flags " +
      "— and was adopted at independence in 1960.",
    sources: [
      { title: "Flag of Cyprus — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cyprus" },
    ],
  },

  SI: {
    description:
      "A horizontal tricolour of white, blue and red with the national coat of arms in the upper " +
      "hoist: Mount Triglav (Slovenia’s highest peak) in white, two wavy blue lines for the sea and " +
      "rivers, and three golden stars taken from the arms of the medieval Counts of Celje. Adopted " +
      "for independent Slovenia in 1991.",
    myths: [
      {
        claim: "The white, blue and red are simply the Pan-Slavic colours.",
        reality:
          "Although commonly linked to the Pan-Slavic palette, the colours actually derive from the " +
          "medieval arms of the Duchy of Carniola.",
      },
    ],
    sources: [
      { title: "Flag of Slovenia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Slovenia" },
    ],
  },

  LU: {
    description:
      "A horizontal tricolour of red, white and light blue, taken from the arms of the House of " +
      "Luxembourg (a red lion on a white-and-blue striped field). Standardised in 1848 and defined in " +
      "law in 1993.",
    myths: [
      {
        claim: "Luxembourg’s flag is identical to that of the Netherlands.",
        reality:
          "They differ: Luxembourg’s blue is a lighter shade and its flag is longer in proportion. " +
          "The 1993 law fixed the brighter blue specifically to avoid confusion.",
      },
    ],
    sources: [
      { title: "Flag of Luxembourg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Luxembourg" },
    ],
  },

  MD: {
    description:
      "A vertical tricolour of blue, yellow and red — echoing Romania’s colours in a reflection of " +
      "the two countries’ shared heritage — with the national coat of arms on the yellow band: a " +
      "golden eagle holding an Orthodox cross in its beak and a shield bearing an aurochs’ head with a " +
      "star, a rose and a crescent. Adopted in 1990. Until 2010 it was one of the few flags whose " +
      "reverse differed from its front (the coat of arms showed only on one side); the reverse is now " +
      "a mirror image.",
    sources: [
      { title: "Flag of Moldova — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Moldova" },
    ],
  },

  BA: {
    description:
      "A blue field with a yellow right-angled triangle and a row of white stars along its " +
      "hypotenuse. The triangle’s three points stand for the country’s three main peoples — Bosniaks, " +
      "Croats and Serbs — and its shape echoes the map of the country; the stars represent Europe and " +
      "are meant to be infinite, so they are cut off top and bottom. The blue and yellow are neutral, " +
      "European colours. The flag was imposed in 1998 by the international High Representative after " +
      "parliament could not agree, and it deliberately avoids references to earlier Bosnian symbols.",
    sources: [
      { title: "Flag of Bosnia and Herzegovina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bosnia_and_Herzegovina" },
    ],
  },

  MC: {
    description:
      "Two equal horizontal bands, red over white, from the heraldic colours of the ruling House of " +
      "Grimaldi (documented from at least 1339). The current flag was adopted in 1881. It is nearly " +
      "identical to Indonesia’s flag, differing mainly in proportion.",
    sources: [
      { title: "Flag of Monaco — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Monaco" },
    ],
  },

  LI: {
    description:
      "Two horizontal bands, blue over red, with a gold crown in the upper hoist. The blue represents " +
      "the sky and the red the evening fires lit in the country’s houses; the crown represents the " +
      "principality and the unity of the people and ruling house. The crown was added in 1937 after " +
      "the 1936 Berlin Olympics revealed that Liechtenstein’s flag was identical to Haiti’s.",
    sources: [
      { title: "Flag of Liechtenstein — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Liechtenstein" },
    ],
  },

  AD: {
    description:
      "A vertical tricolour of blue, yellow and red (the yellow band slightly wider) with the national " +
      "coat of arms at the centre. The colours combine those of France (blue and red) with those of " +
      "Catalonia and the County of Foix (red and yellow), reflecting Andorra’s status as a " +
      "co-principality. The arms’ four quarters stand for the Bishop of Urgell, the Count of Foix, " +
      "Catalonia and Béarn, under the motto Virtus Unita Fortior (“united virtue is stronger”). The " +
      "tricolour dates from 1866.",
    myths: [
      {
        claim: "The flag was designed by Napoleon III.",
        reality:
          "Often credited to him, but it may actually be the work of Guillem d’Areny-Plandolit, whose " +
          "1866 reforms coincided with its adoption.",
      },
    ],
    sources: [
      { title: "Flag of Andorra — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Andorra" },
    ],
  },

  GH: {
    description:
      "Horizontal bands of red, gold and green with a black five-pointed star in the centre. The red " +
      "represents the blood of those who died in the struggle for independence, the gold the " +
      "country’s mineral wealth, and the green its forests and natural riches. The black star is a " +
      "symbol of African emancipation, taken from Marcus Garvey’s Black Star Line. Designed by " +
      "Theodosia Okoh and adopted at independence in 1957.",
    sources: [
      { title: "Flag of Ghana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ghana" },
    ],
  },

  SN: {
    description:
      "A vertical tricolour of green, yellow and red — the Pan-African colours of continental unity — " +
      "with a green five-pointed star on the central band. The green carries religious meaning (in " +
      "Islam, the colour of the Prophet) as well as hope and fertility; the yellow stands for wealth " +
      "and for the arts and knowledge; and the red for the blood and sacrifice of the nation. The " +
      "star recalls the ideogram of the former Mali Federation flag. Adopted in 1960.",
    sources: [
      { title: "Flag of Senegal — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Senegal" },
    ],
  },

  DZ: {
    description:
      "Two equal vertical halves, green (hoist) and white, with a red star and crescent over the " +
      "centre line. The green represents Islam and the white purity; the red star and crescent are " +
      "Islamic symbols. Adopted at independence in 1962.",
    myths: [
      {
        claim: "The design first appeared spontaneously during the independence war.",
        reality:
          "It has earlier precedents: the same green-and-white flag with a red star and crescent was " +
          "displayed at May Day parades in 1919–1920, and Émilie Busquant is credited with sewing a " +
          "version in 1934.",
      },
    ],
    sources: [
      { title: "Flag of Algeria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Algeria" },
    ],
  },

  MA: {
    description:
      "A red field with a green five-pointed interlaced star (the pentagram, or Seal of Solomon) at " +
      "the centre. The red is the historic colour of the ruling Alaouite dynasty, which claims " +
      "descent from the Prophet Muhammad, and the green star is associated with the five pillars of " +
      "Islam. Morocco’s flag had been plain red until Sultan Yusef added the green pentagram by " +
      "decree in 1915 to make it distinctive, especially at sea.",
    sources: [
      { title: "Flag of Morocco — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Morocco" },
    ],
  },

  TN: {
    description:
      "A red field with a central white disc bearing a red crescent and five-pointed star. The red is " +
      "associated with the blood of martyrs, and the crescent and star with the unity of Muslims and " +
      "the Five Pillars of Islam. The design dates from the reign of Bey Hussein II and was adopted " +
      "in 1831.",
    myths: [
      {
        claim: "The crescent and star are purely Islamic symbols.",
        reality:
          "The crescent may descend from ancient Carthage — it appears on Punic artefacts from the " +
          "region — so it predates its later Islamic association.",
      },
    ],
    sources: [
      { title: "Flag of Tunisia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tunisia" },
    ],
  },

  LY: {
    description:
      "A horizontal triband of red, black (double height) and green, with a white crescent and star " +
      "on the black band. Its designer, Omar Faiek Shennib, described the red as the blood shed for " +
      "freedom, the black as the dark years of Italian occupation and the green as the nation’s " +
      "agricultural wealth. Adopted for the Kingdom of Libya in 1951, it was restored in 2011 after " +
      "the fall of Gaddafi, whose plain all-green flag (1977–2011) had been the world’s only " +
      "single-colour national flag.",
    sources: [
      { title: "Flag of Libya — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Libya" },
    ],
  },

  SD: {
    description:
      "A horizontal red-white-black tricolour with a green triangle at the hoist — the Arab Liberation " +
      "colours. The red stands for struggle and sacrifice, the white for peace and the anti-colonial " +
      "White Flag League, the black for Sudan itself (whose name means “land of the black people”), " +
      "and the green for Islam and agriculture. Adopted in 1970.",
    myths: [
      {
        claim: "This flag has been Sudan’s since independence in 1956.",
        reality:
          "Sudan’s first flag (1956–1970) was a blue-yellow-green tricolour for the Nile, the desert " +
          "and the farmland; the current Arab Liberation design replaced it only in 1970.",
      },
    ],
    sources: [
      { title: "Flag of Sudan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sudan" },
    ],
  },

  RW: {
    description:
      "A horizontal tricolour of blue, yellow and green with a golden sun in the upper fly. The blue " +
      "represents happiness and peace, the yellow economic development and the green hope of " +
      "prosperity, while the sun stands for unity and enlightenment. Adopted in 2001 to replace the " +
      "earlier red-yellow-green flag, which had become associated with the 1994 genocide.",
    sources: [
      { title: "Flag of Rwanda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rwanda" },
    ],
  },

  UG: {
    description:
      "Six horizontal bands alternating black, yellow and red, with a white disc at the centre bearing " +
      "a grey crowned crane. The black stands for the people, the yellow for Africa’s sunshine and the " +
      "red for brotherhood; the crowned crane — a former military badge, shown with one leg raised — " +
      "symbolises the country moving forward. Adopted at independence in 1962.",
    sources: [
      { title: "Flag of Uganda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Uganda" },
    ],
  },

  TZ: {
    description:
      "A green upper triangle and a blue lower triangle divided by a black, gold-edged diagonal band. " +
      "The green represents the land and agriculture, the black the Swahili people, the blue the " +
      "Indian Ocean and the country’s lakes and rivers, and the gold edging its mineral wealth. " +
      "Adopted in 1964, when Tanganyika and Zanzibar united, combining elements of their two flags.",
    sources: [
      { title: "Flag of Tanzania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tanzania" },
    ],
  },

  ZW: {
    description:
      "Seven horizontal stripes (green, yellow, red and black, mirrored) with a white triangle at the " +
      "hoist bearing a red star and the golden Zimbabwe Bird. The green stands for agriculture, the " +
      "yellow for mineral wealth, the red for the blood of the liberation struggle and the black for " +
      "the Black majority; the white triangle is peace, the red star national aspirations, and the " +
      "Zimbabwe Bird is the soapstone emblem of the ruins of Great Zimbabwe. Adopted in 1980.",
    sources: [
      { title: "Flag of Zimbabwe — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Zimbabwe" },
    ],
  },

  MZ: {
    description:
      "Horizontal green, black and yellow bands with white fimbriations and a red triangle at the " +
      "hoist bearing a yellow star on which sit an open book, a hoe and an AK-47 rifle. The red is " +
      "anti-colonial resistance, the green the land, the black Africa, the yellow mineral wealth and " +
      "the white peace; the star is internationalism, and the book, hoe and rifle stand for education, " +
      "production and defence. Adopted in 1983, it is the only national flag depicting a modern firearm.",
    sources: [
      { title: "Flag of Mozambique — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mozambique" },
    ],
  },

  AO: {
    description:
      "A horizontal bicolour of red over black with a yellow emblem — a half cogwheel, a machete and a " +
      "star. The red recalls the blood shed under colonial rule and in war, and the black stands for " +
      "Africa; the cogwheel represents industrial workers, the machete the peasantry and agriculture, " +
      "and the star internationalism. Adopted at independence in 1975, based on the flag of the MPLA " +
      "movement.",
    sources: [
      { title: "Flag of Angola — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Angola" },
    ],
  },

  ML: {
    description:
      "A vertical tricolour of green, yellow and red — the Pan-African colours — read as fertility, " +
      "mineral wealth and independence. Adopted in 1961; the earlier 1959 flag carried a black human " +
      "figure (a kanaga) on the yellow band, which was removed after opposition in the mostly Muslim " +
      "country. It is the mirror image of Guinea’s flag.",
    sources: [
      { title: "Flag of Mali — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mali" },
    ],
  },

  BF: {
    description:
      "A horizontal bicolour of red over green with a yellow five-pointed star at the centre — the " +
      "Pan-African colours. The red stands for the revolution, the green for agricultural wealth and " +
      "hope, and the yellow star for the guiding light of the revolution. Adopted in 1984 when Thomas " +
      "Sankara renamed the country from Upper Volta to Burkina Faso, replacing the old black-white-red " +
      "tricolour.",
    sources: [
      { title: "Flag of Burkina Faso — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Burkina_Faso" },
    ],
  },

  CM: {
    description:
      "A vertical tricolour of green, red and yellow — the Pan-African colours — with a gold star on " +
      "the red band. The green stands for the southern forests, the yellow for the sun and the " +
      "savannas of the north, and the red for unity, of which the central star is the emblem. Adopted " +
      "in 1975, replacing the federal flag that bore two stars for East and West Cameroon.",
    sources: [
      { title: "Flag of Cameroon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cameroon" },
    ],
  },

  ZM: {
    description:
      "A green field with an orange African fish eagle in flight over a block of three vertical " +
      "stripes — red, black and orange — at the fly. The green stands for agriculture and natural " +
      "resources, the red for the struggle for freedom, the black for the Zambian people and the " +
      "orange for mineral wealth (copper); the eagle represents freedom and rising above the nation’s " +
      "problems. Adopted at independence in 1964.",
    sources: [
      { title: "Flag of Zambia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Zambia" },
    ],
  },

  CI: {
    description:
      "A vertical tricolour of orange, white and green. In the 1959 explanation the orange stands for " +
      "the land and the blood of a young people, the white for peace and the green for hope in the " +
      "future. Adopted at independence in 1960.",
    myths: [
      {
        claim: "It is the same as the flag of Ireland.",
        reality:
          "Ireland’s flag carries the same three colours in the reverse order (green–white–orange) " +
          "and a different proportion; the two are distinct flags often confused for one another.",
      },
    ],
    sources: [
      { title: "Flag of Ivory Coast — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ivory_Coast" },
    ],
  },

  SO: {
    description:
      "A light blue field with a single white five-pointed star. The blue was chosen in tribute to " +
      "the United Nations, which oversaw Somalia’s path to independence; the star’s five points stand " +
      "for the regions where Somalis form the majority — Somalia, Somaliland, Djibouti, the Somali " +
      "region of Ethiopia and north-eastern Kenya. Designed by Mohammed Awale Liban and adopted in 1954.",
    sources: [
      { title: "Flag of Somalia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Somalia" },
    ],
  },

  MR: {
    description:
      "A green field with a gold star and crescent, bordered by a red stripe at top and bottom. The " +
      "green and the gold star and crescent stand for Islam; the red stripes, added in 2017, " +
      "commemorate the blood shed by those who fought for independence from France. The original " +
      "flag dates from 1959.",
    sources: [
      { title: "Flag of Mauritania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mauritania" },
    ],
  },

  TD: {
    description:
      "A vertical tricolour of indigo blue, yellow and red — combining the French tricolour form with " +
      "the Pan-African colours. The blue evokes the sky, hope and Lake Chad, the yellow the sun and " +
      "the Sahara, and the red progress and the blood shed for independence. Adopted in 1959.",
    myths: [
      {
        claim: "Chad copied its flag from Romania (the two are almost identical).",
        reality:
          "The designs arose independently. Romania’s tricolour is much older, but for years it " +
          "carried a communist emblem; once that was removed in 1989 the two became nearly " +
          "indistinguishable. Chad raised the matter at the UN in 2004 and neither country changed.",
      },
    ],
    sources: [
      { title: "Flag of Chad — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Chad" },
    ],
  },

  ER: {
    description:
      "A red isosceles triangle pointing from the hoist to the fly, with a green triangle above and a " +
      "blue triangle below, and a gold olive wreath on the red near the hoist. The green stands for " +
      "agriculture, the blue for the sea and its wealth, and the red for the blood of the " +
      "independence struggle; the olive wreath is taken from Eritrea’s 1952 flag. Adopted in 1995.",
    sources: [
      { title: "Flag of Eritrea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Eritrea" },
    ],
  },

  SS: {
    description:
      "A horizontal black, red and green tricolour with white fimbriations and a blue triangle at the " +
      "hoist bearing a gold star. The black stands for the people, the red for the blood shed for " +
      "freedom, the green for the land and its wealth, the white for peace, the blue for the waters of " +
      "the Nile and the gold star for the unity of the states. Adopted in 2005 and kept at " +
      "independence in 2011.",
    sources: [
      { title: "Flag of South Sudan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Sudan" },
    ],
  },

  MG: {
    description:
      "A white vertical band at the hoist with two horizontal bands, red over green, in the fly. On " +
      "adoption the colours were declared to mean purity (white), sovereignty (red) and hope (green); " +
      "the red and white also recall the historical Merina monarchy. Adopted in 1958.",
    sources: [
      { title: "Flag of Madagascar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Madagascar" },
    ],
  },

  BW: {
    description:
      "A light blue field crossed by a black horizontal stripe edged in white. The blue stands for " +
      "water and rain — precious in a dry country, and the source of the national motto Pula (“rain”) " +
      "— while the black-and-white stripe stands for racial harmony and echoes the zebra, the national " +
      "animal. It was deliberately designed without Pan-African colours to contrast with " +
      "apartheid-era South Africa. Adopted at independence in 1966.",
    sources: [
      { title: "Flag of Botswana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Botswana" },
    ],
  },

  NE: {
    description:
      "A horizontal tricolour of orange, white and green with an orange disc at the centre. The " +
      "colours are commonly read as the Sahara in the north (orange), purity and the River Niger " +
      "(white) and the fertile south (green), with the disc as the sun, though these meanings are " +
      "not officially confirmed. Adopted in 1959.",
    myths: [
      {
        claim: "The colours have fixed, officially-defined meanings.",
        reality:
          "Official sources have never confirmed the symbolism; the sun/Sahara/river readings are " +
          "widespread interpretations rather than documented fact.",
      },
    ],
    sources: [
      { title: "Flag of Niger — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Niger" },
    ],
  },

  LR: {
    description:
      "Eleven horizontal red and white stripes with a blue square canton bearing a single white " +
      "five-pointed star. The eleven stripes stand for the signatories of Liberia’s 1847 Declaration " +
      "of Independence; the red is courage and the white moral excellence; the lone star marks " +
      "Africa’s first independent republic on the blue of the continent. Its resemblance to the flag " +
      "of the United States is deliberate — Liberia was founded by freed African Americans. Adopted " +
      "in 1847.",
    sources: [
      { title: "Flag of Liberia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Liberia" },
    ],
  },

  GA: {
    description:
      "Three equal horizontal bands of green, yellow and blue. The green stands for the country’s " +
      "forests and natural resources, the yellow for the Equator that crosses Gabon and for the sun, " +
      "and the blue for the Atlantic Ocean. Adopted in 1960, replacing a version that had carried the " +
      "French tricolour in the canton.",
    sources: [
      { title: "Flag of Gabon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Gabon" },
    ],
  },

  CF: {
    description:
      "Four horizontal bands — blue, white, green and yellow — crossed by a vertical red band, with a " +
      "gold star in the upper hoist. Its designer, Barthélemy Boganda, combined the blue and white of " +
      "France with the green and yellow of Africa, bound together by the central red band, which he " +
      "called the symbol of the blood shared by all. Adopted in 1958.",
    sources: [
      { title: "Flag of the Central African Republic — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Central_African_Republic" },
    ],
  },

  GN: {
    description:
      "A vertical tricolour of red, yellow and green — the Pan-African colours, aligned with the " +
      "national motto “Work, Justice, Solidarity.” In President Sékou Touré’s explanation the red is " +
      "the blood of martyrs and the labour of the people, the yellow the country’s gold and the sun, " +
      "and the green its vegetation. Adopted in 1958; it is the mirror image of Mali’s flag.",
    sources: [
      { title: "Flag of Guinea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guinea" },
    ],
  },

  TG: {
    description:
      "Five alternating horizontal stripes of green and yellow with a red canton bearing a white " +
      "five-pointed star. In the Pan-African scheme the green stands for agriculture and hope, the " +
      "yellow for mineral wealth, the red for the blood of independence and the white star for peace " +
      "and purity. Designed by the artist Paul Ahyi and adopted in 1960.",
    myths: [
      {
        claim: "The flag’s proportions were laid out using the golden ratio.",
        reality:
          "Unverified — vexillologists disagree on its exact ratio (estimates range from 3:5 to 2:3), " +
          "so the golden-ratio claim is not established fact.",
      },
    ],
    sources: [
      { title: "Flag of Togo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Togo" },
    ],
  },

  BJ: {
    description:
      "A green vertical band at the hoist with two horizontal bands, yellow over red, in the fly — the " +
      "Pan-African colours, echoing Ethiopia. The green represents hope and renewal, the red the " +
      "courage of the ancestors and the yellow the nation’s treasures. Adopted in 1959 and restored " +
      "in 1990 after the Marxist period’s green flag with a red star.",
    sources: [
      { title: "Flag of Benin — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Benin" },
    ],
  },

  SL: {
    description:
      "Three horizontal bands of green, white and blue. The green stands for agriculture and the " +
      "country’s mountains and natural resources, the white for unity and justice, and the blue for " +
      "the natural harbour of Freetown and a hope of contributing to world peace. Adopted at " +
      "independence in 1961.",
    sources: [
      { title: "Flag of Sierra Leone — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sierra_Leone" },
    ],
  },

  GM: {
    description:
      "Three horizontal bands of red, blue and green separated by thin white stripes. The blue stands " +
      "for the River Gambia running through the country, the red for the sun and the savannah, the " +
      "green for the forests and farmland, and the white stripes for unity and peace. Designed by " +
      "Louis Thomasi and adopted at independence in 1965; it is deliberately free of any political " +
      "party’s colours.",
    sources: [
      { title: "Flag of The Gambia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Gambia" },
    ],
  },

  NA: {
    description:
      "A white-edged red diagonal band running from the lower hoist to the upper fly, dividing a blue " +
      "triangle (with a twelve-rayed golden sun) from a green triangle. The red stands for the people " +
      "and their determination, the white for peace and unity, the green for vegetation and the blue " +
      "for the sky and the Atlantic; the sun’s twelve rays represent the country’s main ethnic groups. " +
      "Adopted at independence in 1990.",
    sources: [
      { title: "Flag of Namibia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Namibia" },
    ],
  },

  LS: {
    description:
      "A horizontal tricolour of blue, white and green with a black mokorotlo — a Basotho straw hat — " +
      "at the centre. The blue stands for rain and the sky, the white for peace and the green for " +
      "prosperity, and the hat represents the Basotho nation. Adopted in 2006, replacing a " +
      "military-themed flag to emphasise peace.",
    sources: [
      { title: "Flag of Lesotho — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lesotho" },
    ],
  },

  SZ: {
    description:
      "Horizontal bands of blue, yellow and red (the red widest) with a black-and-white Nguni shield, " +
      "two spears and a fighting staff across the centre. The red stands for past battles, the blue " +
      "for peace and stability and the yellow for the country’s resources; the shield’s black and " +
      "white represent people of different colours living in peace. Adopted in 1968, based on a " +
      "military flag of King Sobhuza II from 1941.",
    sources: [
      { title: "Flag of Eswatini — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Eswatini" },
    ],
  },

  MW: {
    description:
      "Horizontal bands of black, red and green with a red rising sun on the black band. The black " +
      "represents the people of Africa, the red the blood of the struggle for freedom and the green " +
      "the land, while the rising sun stands for the dawn of hope and freedom. Adopted in 1964; a " +
      "2010 redesign (a full white sun) was widely rejected and the original was restored in 2012.",
    sources: [
      { title: "Flag of Malawi — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malawi" },
    ],
  },

  KM: {
    description:
      "Four horizontal stripes — yellow, white, red and blue — with a green triangle at the hoist " +
      "bearing a white crescent and four white stars. The four stripes and four stars each stand for " +
      "the islands of the archipelago (Grande Comore, Mohéli, Anjouan and Mayotte, the last " +
      "administered by France but claimed by the Comoros); the crescent and green reflect the " +
      "country’s Islamic faith. Adopted in 2001.",
    sources: [
      { title: "Flag of the Comoros — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Comoros" },
    ],
  },

  CD: {
    description:
      "A sky-blue field with a yellow five-pointed star in the upper hoist and a red diagonal band " +
      "edged in yellow. The blue stands for peace, the red for the blood of the country’s martyrs, " +
      "the yellow for its wealth and the star for a bright future. Adopted in 2006, reviving the " +
      "design used just after independence (1966–1971).",
    sources: [
      { title: "Flag of the Democratic Republic of the Congo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Democratic_Republic_of_the_Congo" },
    ],
  },

  CG: {
    description:
      "A diagonal Pan-African design: a green upper triangle and red lower triangle divided by a " +
      "yellow band running from the lower hoist to the upper fly. The green stands for the country’s " +
      "agriculture and forests and the yellow for the friendship and nobility of its people. Adopted " +
      "in 1959, dropped under the Marxist republic, and restored in 1991; it is the only Pan-African " +
      "flag with a diagonal layout.",
    sources: [
      { title: "Flag of the Republic of the Congo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_the_Congo" },
    ],
  },

  DJ: {
    description:
      "A horizontal bicolour of light blue over light green with a white triangle at the hoist bearing " +
      "a red star. The blue stands for the sky and sea and for the Issa (Somali) people, the green for " +
      "the earth and for the Afar people, the white for peace, and the red star for unity and the " +
      "sacrifices of independence. Adopted at independence in 1977.",
    sources: [
      { title: "Flag of Djibouti — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Djibouti" },
    ],
  },

  BI: {
    description:
      "A white saltire dividing the field into red panels (top and bottom) and green panels (sides), " +
      "with a white disc at the centre bearing three red, green-outlined six-pointed stars. The white " +
      "stands for peace, the green for hope and development and the red for the struggle for freedom; " +
      "the three stars stand for the motto “Unity, Work, Progress” and for the country’s three " +
      "peoples — the Hutu, the Twa and the Tutsi. Adopted in 1967.",
    sources: [
      { title: "Flag of Burundi — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Burundi" },
    ],
  },

  CV: {
    description:
      "A blue field with a horizontal band of white-red-white below the centre and a ring of ten " +
      "yellow stars near the hoist. The blue stands for the sky and sea, the white and red for the " +
      "people’s desire for peace and their nation-building effort, and the ten stars — arranged in a " +
      "circle for unity — for the ten islands of the archipelago. Adopted in 1992, replacing the " +
      "earlier flag that resembled Guinea-Bissau’s.",
    sources: [
      { title: "Flag of Cape Verde — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cape_Verde" },
    ],
  },

  GQ: {
    description:
      "A horizontal tricolour of green, white and red with a blue triangle at the hoist and the coat " +
      "of arms (a silk-cotton tree and six stars) on the white band. The green stands for natural " +
      "resources and agriculture, the blue for the sea linking the mainland and the islands, the " +
      "white for peace and the red for the fighters for independence. Dating from independence in " +
      "1968 and restored in 1979.",
    sources: [
      { title: "Flag of Equatorial Guinea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Equatorial_Guinea" },
    ],
  },

  ST: {
    description:
      "A horizontal green-yellow-green triband with a red triangle at the hoist and two black stars on " +
      "the yellow band. The green, yellow and red are the Pan-African colours of the independence " +
      "movement; the triangle stands for equality and the two black stars for the country’s two " +
      "islands, São Tomé and Príncipe. Adopted at independence in 1975.",
    sources: [
      { title: "Flag of São Tomé and Príncipe — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe" },
    ],
  },

  GW: {
    description:
      "A red vertical band at the hoist bearing a black star, with horizontal yellow and green bands " +
      "in the fly — the Pan-African colours popularised by Ghana and Ethiopia. The black star stands " +
      "for African unity, the yellow for the savannas, the green for the forests and the red for the " +
      "blood of the independence struggle. Based on the flag of the PAIGC and adopted in 1973.",
    sources: [
      { title: "Flag of Guinea-Bissau — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guinea-Bissau" },
    ],
  },

  SC: {
    description:
      "Five oblique bands — blue, yellow, red, white and green — radiating from the lower hoist " +
      "corner. The blue stands for the sky and sea, the yellow for the sun, the red for the people " +
      "and their unity, the white for social justice and harmony, and the green for the land. Adopted " +
      "in 1996; the colours combine those of the country’s two main political parties.",
    sources: [
      { title: "Flag of Seychelles — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Seychelles" },
    ],
  },

  MU: {
    description:
      "Four equal horizontal bands of red, blue, yellow and green. The red stands for the struggle for " +
      "freedom, the blue for the Indian Ocean around the island, the yellow for the light of " +
      "independence and the green for the island’s year-round vegetation. Adopted at independence in " +
      "1968; the four colours were also chosen to represent the country’s main communities and " +
      "parties, to help unite the nation.",
    sources: [
      { title: "Flag of Mauritius — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mauritius" },
    ],
  },

  NP: {
    description:
      "The world’s only non-rectangular national flag: two stacked crimson pennants with a blue " +
      "border, the upper bearing a white crescent moon and the lower a white twelve-rayed sun. The " +
      "crimson is the colour of bravery and of the national flower, and the blue stands for peace; " +
      "the moon and sun express the hope that Nepal will endure as long as they do, and are also " +
      "linked to the country’s Hindu and Buddhist traditions. Standardised in 1962, when the faces " +
      "were removed from the sun and moon.",
    sources: [
      { title: "Flag of Nepal — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nepal" },
    ],
  },

  LK: {
    description:
      "A golden lion holding a kastane sword on a dark red field, with a gold bo (bodhi) leaf in each " +
      "corner and two vertical stripes — orange and green — at the hoist, all within a gold border. " +
      "The lion stands for the Sinhalese people and courage; the four bo leaves for Buddhism and the " +
      "virtues of loving-kindness, compassion, sympathetic joy and equanimity; the orange stripe for " +
      "the Tamils and the green for the Muslim Moors. Adopted in 1948, with the bo leaves added in 1972.",
    sources: [
      { title: "Flag of Sri Lanka — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sri_Lanka" },
    ],
  },

  BD: {
    description:
      "A dark green field with a red disc set slightly toward the hoist, so that it appears centred " +
      "when the flag is flying. The green stands for the land and its vitality, and the red disc for " +
      "the sun rising over Bengal and the blood shed in the 1971 Liberation War. Adopted in 1972; the " +
      "wartime version had also shown a yellow map of the country inside the disc, which was then " +
      "removed.",
    sources: [
      { title: "Flag of Bangladesh — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bangladesh" },
    ],
  },

  KH: {
    description:
      "Blue and red horizontal bands (the red double width) with a white image of Angkor Wat, outlined " +
      "in black, at the centre. The blue stands for royalty, the red for the nation and the white " +
      "temple for religion and the country’s heritage. Cambodia is one of the very few nations whose " +
      "flag depicts a building. First adopted in 1948 and restored in 1993 with the monarchy.",
    sources: [
      { title: "Flag of Cambodia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cambodia" },
    ],
  },

  MY: {
    description:
      "Fourteen alternating red and white stripes with a blue canton bearing a yellow crescent and a " +
      "fourteen-pointed star. The fourteen stripes and fourteen points stand for the thirteen states " +
      "and the federal government; the crescent is Islam, the yellow the sovereignty of the Malay " +
      "rulers, the blue the unity of the people, the red bravery and the white purity. Adopted in 1963.",
    sources: [
      { title: "Flag of Malaysia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malaysia" },
    ],
  },

  SG: {
    description:
      "A horizontal bicolour of red over white with a white crescent and a ring of five white stars in " +
      "the upper hoist. The red stands for universal brotherhood and equality and the white for " +
      "purity and virtue; the crescent represents a young nation on the rise, and the five stars the " +
      "ideals of democracy, peace, progress, justice and equality. Adopted in 1959.",
    myths: [
      {
        claim: "The crescent and stars make it an Islamic flag.",
        reality:
          "The design is deliberately multicultural: the crescent answered the wish of the " +
          "Malay-Muslim community and the stars that of the Chinese majority, so the symbol is " +
          "intentionally inclusive rather than tied to one group.",
      },
    ],
    sources: [
      { title: "Flag of Singapore — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Singapore" },
    ],
  },

  MN: {
    description:
      "A vertical triband of red, blue and red with the golden Soyombo symbol on the hoist band. The " +
      "blue stands for the eternal blue sky and the red for progress and prosperity; the Soyombo is a " +
      "composite emblem of fire, sun, moon, earth, water and a yin-yang of two fish. Adopted in 1992, " +
      "when the communist star above the Soyombo was removed.",
    sources: [
      { title: "Flag of Mongolia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mongolia" },
    ],
  },

  MM: {
    description:
      "A horizontal tricolour of yellow, green and red with a large white five-pointed star in the " +
      "centre. The yellow stands for unity and wisdom, the green for peace and fertility and the red " +
      "for courage and decisiveness, while the white star represents the union of the country. Adopted " +
      "in 2010, echoing earlier nationalist tricolours.",
    sources: [
      { title: "Flag of Myanmar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Myanmar" },
    ],
  },

  JO: {
    description:
      "Horizontal black, white and green bands joined by a red chevron at the hoist bearing a white " +
      "seven-pointed star, based on the flag of the 1916 Arab Revolt. The black, white and green " +
      "recall the Abbasid, Umayyad and Fatimid/Rashidun caliphates; the red chevron stands for the " +
      "Hashemite dynasty and Arab freedom; and the star’s seven points for the seven verses of the " +
      "opening chapter of the Qur’an. Adopted in 1928.",
    sources: [
      { title: "Flag of Jordan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Jordan" },
    ],
  },

  LB: {
    description:
      "A horizontal red-white-red triband (the white band double height) with a green cedar tree in " +
      "the centre touching both red stripes. The red stands for the blood shed for independence, the " +
      "white for peace and the snow of the mountains, and the cedar for immortality, resilience and " +
      "holiness. Adopted in 1943.",
    sources: [
      { title: "Flag of Lebanon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lebanon" },
    ],
  },

  AE: {
    description:
      "A red vertical band at the hoist with three horizontal bands of green, white and black — the " +
      "Pan-Arab colours. The red stands for sacrifice and energy, the green for growth and " +
      "prosperity, the white for peace and the black for dignity and strength. Designed by Abdullah " +
      "Al Maainah and adopted at the federation’s formation in 1971.",
    sources: [
      { title: "Flag of the United Arab Emirates — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_United_Arab_Emirates" },
    ],
  },

  QA: {
    description:
      "A maroon field with a white serrated band of nine points at the hoist; it is the only national " +
      "flag more than twice as wide as it is tall. The white stands for peace (from the 19th-century " +
      "treaties) and the nine points for Qatar as the ninth of the “reconciled emirates” under the " +
      "1916 treaty with Britain. Adopted in 1971.",
    myths: [
      {
        claim: "The maroon is simply red dye that faded to purple in the desert sun.",
        reality:
          "Qatar deliberately kept the deep maroon: while a faded-dye story is often told, the colour " +
          "was retained to reflect the region’s historic purple-dye heritage.",
      },
    ],
    sources: [
      { title: "Flag of Qatar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Qatar" },
    ],
  },

  BH: {
    description:
      "A white band at the hoist separated from a red field by five white triangles forming a " +
      "serrated line. The red is the traditional colour of the Gulf states and the white recalls the " +
      "19th-century peace treaties; the five points stand for the five pillars of Islam. The " +
      "five-point design was adopted in 2002 (reduced from an earlier eight).",
    sources: [
      { title: "Flag of Bahrain — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bahrain" },
    ],
  },

  OM: {
    description:
      "White and green horizontal bands with a red band running along the hoist and across the top " +
      "(forming a “T”), and the national emblem — a khanjar dagger over two crossed swords — in the " +
      "upper hoist. The white stands for peace and the Imams, the green for the fertile Jabal Akhdar " +
      "mountains and the red for the battles against foreign invaders. Adopted in 1970.",
    sources: [
      { title: "Flag of Oman — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Oman" },
    ],
  },

  IQ: {
    description:
      "A horizontal red-white-black tricolour — the Pan-Arab colours of al-Hilli’s verse — with the " +
      "Takbir (“God is greatest”) in green Kufic script across the white band. Adopted in 2008, when " +
      "the three green stars of the earlier flag were removed.",
    myths: [
      {
        claim: "The 2008 flag broke completely with Saddam Hussein–era symbolism.",
        reality:
          "The Takbir it keeps was itself added under Saddam in 1991; the 2008 change removed the " +
          "three stars but retained that inscription.",
      },
    ],
    sources: [
      { title: "Flag of Iraq — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iraq" },
    ],
  },

  YE: {
    description:
      "A horizontal red-white-black tricolour — the Arab Liberation colours. The red stands for unity " +
      "and the blood of martyrs, the white for a bright future and the black for the dark past. " +
      "Adopted in 1990 at the unification of North and South Yemen, dropping the distinct emblems the " +
      "two states had used.",
    sources: [
      { title: "Flag of Yemen — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Yemen" },
    ],
  },

  KZ: {
    description:
      "A turquoise field with a golden sun above a soaring golden steppe eagle, and a vertical golden " +
      "“koshkar-muiz” (ram’s-horns) ornament along the hoist. The blue stands for unity and the wide " +
      "sky, the sun and its rays for prosperity and life, the eagle for freedom and the nation’s " +
      "aspirations, and the ornament for the art and culture of the Kazakh people. Adopted in 1992.",
    sources: [
      { title: "Flag of Kazakhstan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kazakhstan" },
    ],
  },

  UZ: {
    description:
      "Horizontal bands of azure, white and green separated by thin red stripes, with a white crescent " +
      "and small white stars in the upper hoist. The azure is commonly linked to the sky and to " +
      "Turkic heritage, the white to peace, the green to nature and the red stripes to the life-force; " +
      "the crescent marks the new republic. Adopted in 1991. The government has not fixed a single " +
      "official meaning for the elements.",
    sources: [
      { title: "Flag of Uzbekistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Uzbekistan" },
    ],
  },

  KG: {
    description:
      "A red field with a yellow sun of forty rays, and at its centre a red tündük — the crown of a " +
      "yurt seen from below. The forty rays stand for the forty clans united in legend by the hero " +
      "Manas, and the tündük for the family home and the unity of the people. Adopted in 1992; in " +
      "2023 the sun’s wavy rays were straightened.",
    sources: [
      { title: "Flag of Kyrgyzstan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kyrgyzstan" },
    ],
  },

  AZ: {
    description:
      "A horizontal tricolour of blue, red and green with a white crescent and eight-pointed star on " +
      "the red band. The blue stands for the country’s Turkic heritage, the red for progress and the " +
      "building of a modern state, and the green for Islam; the crescent and star are Islamic symbols. " +
      "First adopted in 1918 and restored in 1991.",
    sources: [
      { title: "Flag of Azerbaijan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Azerbaijan" },
    ],
  },

  GE: {
    description:
      "The Five Cross Flag: a white field with a large central red cross reaching all four edges and a " +
      "small red Bolnisi cross in each quarter. The crosses reflect Georgia’s Christian heritage and " +
      "are variously read as the Five Holy Wounds or as Christ and the Four Evangelists. A medieval " +
      "banner of the Kingdom of Georgia, it was readopted as the national flag in 2004.",
    sources: [
      { title: "Flag of Georgia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Georgia_(country)" },
    ],
  },

  AM: {
    description:
      "A horizontal tricolour of red, blue and orange. By the 2006 law the red stands for the Armenian " +
      "Highland and the people’s struggle for survival, the blue for the peaceful sky, and the orange " +
      "for the creative talent and hard work of the Armenian people. First adopted in 1918 and " +
      "restored in 1990.",
    myths: [
      {
        claim: "The three colours were given these meanings by the flag’s designer.",
        reality:
          "Its designer offered no official symbolism; the meanings were interpreted later (and " +
          "codified in 2006). A popular rainbow/Mount Ararat reading is likewise a later gloss.",
      },
    ],
    sources: [
      { title: "Flag of Armenia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Armenia" },
    ],
  },

  TM: {
    description:
      "A green field with a red-carpet vertical stripe near the hoist bearing five carpet guls above " +
      "two crossed olive branches, and a white crescent with five stars alongside. The five guls " +
      "stand for the five major Turkmen tribes and the five stars for the five provinces; the crescent " +
      "and green field evoke the clear sky, Islam and prosperity, and the olive branches Turkmenistan’s " +
      "neutrality. One of the most intricate national flags; adopted in 1992, with the current form " +
      "from 2001.",
    sources: [
      { title: "Flag of Turkmenistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Turkmenistan" },
    ],
  },

  TJ: {
    description:
      "A horizontal red, white and green tricolour (the white band widest) with a gold crown beneath " +
      "an arc of seven stars at the centre. The red stands for unity and sacrifice, the white for " +
      "purity and the country’s cotton, and the green for nature and Islam; the crown recalls the " +
      "Samanid dynasty (and the word tâj, “crown”) and the seven stars stand for perfection and " +
      "happiness. Adopted in 1992.",
    sources: [
      { title: "Flag of Tajikistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tajikistan" },
    ],
  },

  BT: {
    description:
      "A flag divided diagonally from the lower hoist to the upper fly — yellow above, orange below — " +
      "with a white Druk (thunder dragon) holding jewels along the divide. The yellow stands for the " +
      "king and secular authority, the orange for Buddhism, and the white dragon for the country " +
      "itself (Druk Yul, the “Land of the Thunder Dragon”) and purity; the jewels represent wealth. " +
      "The current design dates from 1969.",
    sources: [
      { title: "Flag of Bhutan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bhutan" },
    ],
  },

  MV: {
    description:
      "A red field with a green rectangle bearing a white crescent. The red stands for the blood and " +
      "sacrifice of the nation’s heroes, the green for peace and prosperity, and the crescent for " +
      "Islam, the state religion. Adopted at independence in 1965.",
    sources: [
      { title: "Flag of the Maldives — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Maldives" },
    ],
  },

  BN: {
    description:
      "A yellow field crossed by black and white diagonal stripes with the red national crest at the " +
      "centre. The yellow stands for the Sultan, the white and black stripes for his two chief " +
      "ministers, and the crest — whose upraised hands signify unity — for the protection of the " +
      "state. Adopted in 1959.",
    sources: [
      { title: "Flag of Brunei — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Brunei" },
    ],
  },

  TL: {
    description:
      "A red field with a black triangle at the hoist bearing a white five-pointed star, over a larger " +
      "yellow triangle. In the constitution the black stands for the obscurantism to be overcome, the " +
      "yellow for the country’s wealth, the red for the struggle for liberation and the white star — " +
      "“the light that guides” — for peace. Adopted at the restoration of independence in 2002.",
    sources: [
      { title: "Flag of East Timor — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_East_Timor" },
    ],
  },

  KP: {
    description:
      "A broad central red band edged with thin white stripes between blue bands top and bottom, with " +
      "a red five-pointed star in a white disc near the hoist. In the official reading the red stands " +
      "for revolutionary spirit, the white for purity and the blue for sovereignty and peace, while " +
      "the red star stands for socialism. Adopted in 1948.",
    sources: [
      { title: "Flag of North Korea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Korea" },
    ],
  },

  AF: {
    description:
      "A white field bearing the Shahada — the Islamic declaration of faith — in black. The white is " +
      "said to stand for the purity of faith and government and the black text for the creed itself. " +
      "This flag of the Islamic Emirate was adopted in 2021; the former Islamic Republic’s " +
      "black-red-green tricolour is still used internationally and by the opposition, so the flag’s " +
      "status is disputed.",
    sources: [
      { title: "Flag of Afghanistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Afghanistan" },
    ],
  },

  SY: {
    description:
      "A horizontal tricolour of green, white and black with three red stars on the white band. The " +
      "green, white and black recall the Rashidun, Umayyad and Abbasid periods, and the three stars " +
      "were originally taken to stand for regions of the country. This is Syria’s 1930s independence " +
      "flag, revived during the civil war and restored as the national flag in 2025 after the fall of " +
      "the Assad government.",
    sources: [
      { title: "Flag of Syria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Syria" },
    ],
  },

  VE: {
    description:
      "A horizontal tricolour of yellow, blue and red with an arc of eight white stars on the blue " +
      "band. The yellow stands for the wealth of the land, the blue for the Caribbean Sea separating " +
      "Venezuela from Spain, and the red for the blood of independence. The eight stars stand for the " +
      "seven provinces that signed the 1811 declaration plus Guayana, added by Bolívar’s decree of " +
      "1817. The tricolour is Francisco de Miranda’s.",
    sources: [
      { title: "Flag of Venezuela — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Venezuela" },
    ],
  },

  EC: {
    description:
      "A horizontal tricolour of yellow (double height), blue and red — the colours of Gran Colombia, " +
      "from Miranda’s flag — with the coat of arms at the centre showing Mount Chimborazo, the Guayas " +
      "river with a steamship and a condor. The yellow stands for the country’s riches, the blue for " +
      "the sky, sea and rivers, and the red for the blood of its heroes. Adopted in 1860.",
    sources: [
      { title: "Flag of Ecuador — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ecuador" },
    ],
  },

  BO: {
    description:
      "A horizontal tricolour of red, yellow and green, with the coat of arms on the state flag. The " +
      "red stands for the blood shed by the country’s heroes, the yellow for its mineral wealth and " +
      "the green for fertility and hope. Adopted in 1851. Since 2009 the indigenous Wiphala — a square " +
      "rainbow-chequered banner of the Andean peoples — is a co-official national flag flown beside it.",
    sources: [
      { title: "Flag of Bolivia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bolivia" },
    ],
  },

  UY: {
    description:
      "Nine alternating white and blue horizontal stripes with a golden Sun of May in the upper hoist " +
      "canton. The nine stripes stand for the nine original departments of Uruguay and the sun for " +
      "the May Revolution of 1810. Adopted in 1830; an earlier version had nineteen stripes, reduced " +
      "to nine for clarity at a distance.",
    sources: [
      { title: "Flag of Uruguay — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Uruguay" },
    ],
  },

  PY: {
    description:
      "A horizontal red-white-blue triband whose colours were inspired by the French tricolour and " +
      "the ideals of liberty. It is the only national flag in the world with a different emblem on " +
      "each side: the national coat of arms on the front and the treasury seal on the back. Adopted " +
      "in 1842.",
    sources: [
      { title: "Flag of Paraguay — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Paraguay" },
    ],
  },

  GY: {
    description:
      "The Golden Arrowhead: a green field with a long gold triangle (edged white) and a shorter red " +
      "triangle (edged black) pointing toward the fly. The green stands for agriculture and forests, " +
      "the gold for mineral wealth, the red for zeal and nation-building, the black for endurance and " +
      "the white for the country’s rivers. Designed by the vexillologist Whitney Smith and adopted at " +
      "independence in 1966.",
    sources: [
      { title: "Flag of Guyana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guyana" },
    ],
  },

  SR: {
    description:
      "Horizontal bands of green, white, red, white and green (the red the widest) with a gold star " +
      "at the centre. The green stands for the fertility of the land, the white for freedom and " +
      "justice and the red for progress; the gold star stands for unity and a golden future. Adopted " +
      "at independence in 1975.",
    sources: [
      { title: "Flag of Suriname — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Suriname" },
    ],
  },

  PA: {
    description:
      "A flag quartered into a white canton with a blue star, a red upper-fly, a blue lower-hoist and " +
      "a white lower-fly with a red star. The blue and red were meant to represent the country’s two " +
      "historic political parties and the white the peace between them; the blue star stands for " +
      "honesty and purity and the red star for authority and law. Designed by María de la Ossa de " +
      "Amador in 1903.",
    sources: [
      { title: "Flag of Panama — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Panama" },
    ],
  },

  GT: {
    description:
      "Sky-blue and white vertical bands (blue at the sides) with the coat of arms at the centre: a " +
      "resplendent quetzal, a scroll dated 15 September 1821, crossed rifles and swords and a laurel " +
      "wreath. The blue stands for justice and loyalty (and the two oceans) and the white for purity " +
      "and peace; the quetzal is liberty, the scroll independence, the rifles defence, the swords " +
      "honour and the laurel victory. The blue and white come from the Federal Republic of Central " +
      "America. Adopted in 1871.",
    sources: [
      { title: "Flag of Guatemala — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guatemala" },
    ],
  },

  BZ: {
    description:
      "A blue field with a red band top and bottom and a white disc bearing the coat of arms, in which " +
      "two woodcutters — one of Mestizo and one of African descent — flank a mahogany tree with " +
      "logging tools, above the motto Sub Umbra Floreo (“In the shade I flourish”). It is the only " +
      "national flag with people as a central element. The blue honours one main party and the red " +
      "borders the other. Adopted at independence in 1981.",
    sources: [
      { title: "Flag of Belize — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Belize" },
    ],
  },

  HN: {
    description:
      "A horizontal blue-white-blue triband with five blue stars arranged in an X on the white band. " +
      "The blue stands for the Pacific and the Caribbean and the sky, and the white for the land and " +
      "peace; the five stars represent the five states of the former Federal Republic of Central " +
      "America and the hope that they might one day reunite. Adopted in 1866.",
    sources: [
      { title: "Flag of Honduras — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Honduras" },
    ],
  },

  NI: {
    description:
      "A horizontal blue-white-blue triband with the coat of arms at the centre: a triangle enclosing " +
      "five volcanoes, a rising sun, a cap of liberty and a rainbow. The blue stands for the two " +
      "oceans and the sky and the white for peace; the five volcanoes represent the five Central " +
      "American states. Adopted in 1908, it is one of the few national flags to include the colour " +
      "purple (in the rainbow).",
    sources: [
      { title: "Flag of Nicaragua — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nicaragua" },
    ],
  },

  SV: {
    description:
      "A horizontal blue-white-blue triband with the national coat of arms in the centre. The blue " +
      "stands for the sky and the oceans on either side of Central America and the white for peace. " +
      "Its design descends from the flag of the Federal Republic of Central America; adopted in 1912.",
    sources: [
      { title: "Flag of El Salvador — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_El_Salvador" },
    ],
  },

  CR: {
    description:
      "Five horizontal stripes — blue, white, red, white, blue, with the red band double width — and " +
      "the coat of arms on the state flag. The colours echo the ideals of the French Revolution: the " +
      "blue for the sky and opportunity, the white for peace and wisdom, and the red for the warmth " +
      "and blood of the people. The red stripe was added in 1848 at the suggestion of Pacífica " +
      "Fernández.",
    sources: [
      { title: "Flag of Costa Rica — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Costa_Rica" },
    ],
  },

  HT: {
    description:
      "Two horizontal bands, blue over red, with the coat of arms on a white panel (on the state " +
      "flag). The blue and red stand for the union of Haiti’s Black and mixed-race citizens; the arms " +
      "show a royal palm crowned with a cap of liberty over weapons, beneath the motto L’Union fait " +
      "la Force (“Unity makes strength”). First adopted in 1806 and restored in 1986.",
    myths: [
      {
        claim:
          "Dessalines made the flag in 1803 by tearing the white out of the French tricolour, which " +
          "Catherine Flon then sewed together.",
        reality:
          "A cherished national story; the design in fact evolved over time, and the coat of arms was " +
          "not added until 1937 (partly to distinguish it from Liechtenstein’s similar blue-red flag).",
      },
    ],
    sources: [
      { title: "Flag of Haiti — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Haiti" },
    ],
  },

  DO: {
    description:
      "A white cross that divides the flag into four rectangles — blue and red above, red and blue " +
      "below — with the coat of arms at the centre. The blue stands for liberty, the white cross for " +
      "salvation and the red for the blood of the heroes. The arms uniquely include an open Bible, " +
      "making it the only national flag to depict one. First hoisted in 1844.",
    sources: [
      { title: "Flag of the Dominican Republic — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Dominican_Republic" },
    ],
  },

  JM: {
    description:
      "A gold saltire dividing the flag into two green triangles (top and bottom) and two black " +
      "triangles (at the hoist and fly). The black stands for the strength and creativity of the " +
      "people, the gold for sunshine and natural wealth and the green for the land and hope. Since " +
      "Mauritania changed its flag in 2017, Jamaica’s has been the only national flag with no red, " +
      "white or blue. Adopted in 1962.",
    sources: [
      { title: "Flag of Jamaica — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Jamaica" },
    ],
  },

  TT: {
    description:
      "A red field with a white-edged black diagonal band running from the upper hoist to the lower " +
      "fly. The red stands for the warmth and energy of the people and the sun, the black for their " +
      "strength and dedication and the wealth of the land, and the white for the sea, purity and " +
      "equality. Adopted at independence in 1962.",
    sources: [
      { title: "Flag of Trinidad and Tobago — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Trinidad_and_Tobago" },
    ],
  },

  BS: {
    description:
      "Aquamarine and gold horizontal bands with a black triangle at the hoist. The aquamarine stands " +
      "for the surrounding sea, the gold for the sun and the land, and the black triangle for the " +
      "vigour, unity and enterprise of the Bahamian people. Adopted at independence in 1973.",
    sources: [
      { title: "Flag of the Bahamas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Bahamas" },
    ],
  },

  BB: {
    description:
      "A vertical triband of blue, gold and blue with a black broken trident head on the gold band. " +
      "The blue stands for the sea and sky and the gold for the sand; the trident is that of the " +
      "colonial-era emblem, and breaking off its shaft symbolises Barbados’s break from colonial " +
      "rule. Adopted at independence in 1966.",
    sources: [
      { title: "Flag of Barbados — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Barbados" },
    ],
  },

  GD: {
    description:
      "A red border with six yellow stars, green and yellow triangles meeting at the centre, a " +
      "seventh star on a red disc, and a nutmeg at the hoist. The seven stars stand for the country’s " +
      "seven parishes and the nutmeg for its famous spice crop; the green is for vegetation, the " +
      "yellow for sunshine and wisdom and the red for courage and unity. Adopted in 1974.",
    sources: [
      { title: "Flag of Grenada — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Grenada" },
    ],
  },

  LC: {
    description:
      "A cerulean-blue field with a gold triangle set in front of a white-edged black triangle. The " +
      "blue stands for the sky and the sea and the triangles for the Pitons, Saint Lucia’s twin " +
      "volcanic peaks; the gold is for sunshine and prosperity and the black and white for the " +
      "harmony of the island’s peoples. Adopted in 1967.",
    sources: [
      { title: "Flag of Saint Lucia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint_Lucia" },
    ],
  },

  VC: {
    description:
      "Three vertical bands of blue, gold (the widest) and green, with three green diamonds arranged " +
      "in a V on the gold. The diamonds stand for the islands as the “Gems of the Antilles” and their " +
      "V for Saint Vincent; the blue is the sky and sea, the gold the warmth and the sand, and the " +
      "green the vegetation. Adopted in 1985.",
    sources: [
      { title: "Flag of Saint Vincent and the Grenadines — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint_Vincent_and_the_Grenadines" },
    ],
  },

  DM: {
    description:
      "A green field with a cross of yellow, black and white stripes and a central red disc bearing a " +
      "Sisserou parrot ringed by ten green stars. The green is the island’s vegetation and the cross " +
      "the Christian faith, its three colours standing for the indigenous people, the fertile soil " +
      "and the pure water; the ten stars are the ten parishes and the parrot is the national bird. " +
      "Adopted in 1978, it is one of the few national flags to contain purple.",
    sources: [
      { title: "Flag of Dominica — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Dominica" },
    ],
  },

  AG: {
    description:
      "A red field with an inverted V of black, blue and white bands and a golden rising sun on the " +
      "black. The rising sun stands for the dawn of a new era; the black for African heritage, the " +
      "blue for hope and the Caribbean Sea and the red for the energy of the people; the yellow, blue " +
      "and white together stand for the sun, sea and sand, and the V for victory. Adopted in 1967.",
    sources: [
      { title: "Flag of Antigua and Barbuda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Antigua_and_Barbuda" },
    ],
  },

  KN: {
    description:
      "A green upper triangle and red lower triangle divided by a yellow-edged black diagonal band " +
      "bearing two white stars. The green stands for the fertile land, the red for the fight against " +
      "slavery and colonialism, the black for African heritage and the yellow for year-round " +
      "sunshine; the two stars stand for hope and liberty and for the two islands. Adopted at " +
      "independence in 1983.",
    sources: [
      { title: "Flag of Saint Kitts and Nevis — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint_Kitts_and_Nevis" },
    ],
  },

  NZ: {
    description:
      "A blue ensign with the Union Jack in the canton and the four red, white-edged stars of the " +
      "Southern Cross in the fly. The blue evokes the sea and sky, the Southern Cross New Zealand’s " +
      "place in the South Pacific, and the Union Jack its historical ties to Britain. Given statutory " +
      "status in 1902; referendums in 2015–2016 considered a silver-fern design but voters chose to " +
      "keep this flag.",
    sources: [
      { title: "Flag of New Zealand — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Zealand" },
    ],
  },

  FJ: {
    description:
      "A light-blue ensign with the Union Jack in the canton and the shield of Fiji’s coat of arms in " +
      "the fly. The light blue stands for the Pacific Ocean, so central to island life; the shield " +
      "shows a British lion with a cocoa pod above panels of sugar cane, a coconut palm, a dove of " +
      "peace and bananas. Adopted in 1970 and kept after Fiji became a republic; a proposed redesign " +
      "was abandoned in 2016.",
    sources: [
      { title: "Flag of Fiji — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Fiji" },
    ],
  },

  PG: {
    description:
      "A flag split diagonally: a red upper triangle with a golden Raggiana bird-of-paradise in flight " +
      "and a black lower triangle with the five white stars of the Southern Cross. Red, black and " +
      "gold are traditional colours of Papua New Guinea; the bird stands for the country’s tribal " +
      "culture and emergence into nationhood and the constellation for its place in the southern " +
      "hemisphere. Designed by the schoolgirl Susan Karike and adopted in 1971.",
    sources: [
      { title: "Flag of Papua New Guinea — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Papua_New_Guinea" },
    ],
  },

  WS: {
    description:
      "A red field with a blue canton bearing the five white stars of the Southern Cross. The red is " +
      "commonly read as courage, the white as purity and the blue as freedom, while the Southern " +
      "Cross marks Samoa’s place in the South Pacific. The design dates from 1948–49 and was kept at " +
      "independence in 1962.",
    sources: [
      { title: "Flag of Samoa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Samoa" },
    ],
  },

  TO: {
    description:
      "A red field with a white canton bearing a red couped cross. The cross and the red stand for " +
      "Christianity and the blood of Christ shed at the crucifixion, and the white for purity. Adopted " +
      "in 1875 and protected by the constitution so that it can never be changed; the red field was " +
      "added because an earlier white flag with a red cross was too like the Red Cross emblem.",
    sources: [
      { title: "Flag of Tonga — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tonga" },
    ],
  },

  VU: {
    description:
      "Red and green horizontal bands with a black, gold-edged Y-shape (pall) at the hoist, on which a " +
      "gold boar’s tusk encloses two crossed namele fern fronds. The red stands for the blood that " +
      "unites people, the green for the richness of the islands and the black for the Melanesian " +
      "ni-Vanuatu people; the Y traces the layout of the islands, the boar’s tusk stands for " +
      "prosperity and tradition and the fern fronds for peace. Adopted at independence in 1980.",
    sources: [
      { title: "Flag of Vanuatu — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vanuatu" },
    ],
  },

  SB: {
    description:
      "A yellow diagonal stripe dividing a blue upper triangle from a green lower triangle, with five " +
      "white stars in the blue. The blue stands for the water — rivers, rain and the ocean — the " +
      "green for the land and the yellow for the sun; the five stars stood for the five original " +
      "provinces. Adopted in 1977; the number of stars has been kept even as more provinces were added.",
    sources: [
      { title: "Flag of the Solomon Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Solomon_Islands" },
    ],
  },

  KI: {
    description:
      "A red upper half with a gold frigatebird flying over a rising sun, and a blue lower half with " +
      "three white wavy stripes. The frigatebird stands for power, freedom and the command of the sea, " +
      "the rising sun for Kiribati’s position on the Equator (its seventeen rays for the sixteen " +
      "Gilbert Islands plus Banaba), and the three waves for the three island groups. Adopted in 1979.",
    sources: [
      { title: "Flag of Kiribati — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kiribati" },
    ],
  },

  TV: {
    description:
      "A light-blue ensign with the Union Jack in the canton and nine yellow stars laid out like the " +
      "map of the country’s nine islands. The blue stands for the Pacific Ocean. Adopted in 1978; a " +
      "1996 redesign that reduced the flag to eight stars was reversed after public protest, restoring " +
      "the nine stars in 1997.",
    sources: [
      { title: "Flag of Tuvalu — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tuvalu" },
    ],
  },

  NR: {
    description:
      "A blue field with a narrow gold stripe across the centre and a white twelve-pointed star just " +
      "below it near the hoist. The blue is the Pacific Ocean, the gold stripe the Equator and the " +
      "star Nauru itself, lying just south of the line; the star’s twelve points stand for the " +
      "island’s twelve original tribes. Adopted at independence in 1968.",
    sources: [
      { title: "Flag of Nauru — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nauru" },
    ],
  },

  MH: {
    description:
      "A blue field crossed by orange and white stripes that widen from the lower hoist to the upper " +
      "fly, with a white 24-pointed star in the canton. The blue is the ocean and the rising stripes " +
      "the Equator; the white stands for the Ratak (sunrise) chain and peace and the orange for the " +
      "Ralik (sunset) chain and courage. The star’s 24 points are the electoral districts, its four " +
      "longer rays the main cultural centres — the most points on any national flag’s star. Adopted " +
      "in 1979.",
    sources: [
      { title: "Flag of the Marshall Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Marshall_Islands" },
    ],
  },

  FM: {
    description:
      "A light-blue field with four white five-pointed stars in a diamond. The blue stands for the " +
      "Pacific Ocean and the four stars for the federation’s four states — Yap, Chuuk, Pohnpei and " +
      "Kosrae. Adopted in 1978, developed from the earlier Trust Territory flag.",
    sources: [
      { title: "Flag of the Federated States of Micronesia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Federated_States_of_Micronesia" },
    ],
  },

  PW: {
    description:
      "A light-blue field with a golden-yellow disc set slightly toward the hoist. The blue stands for " +
      "the ocean and the move to self-government, and the disc for the full moon, regarded in Palauan " +
      "culture as the best time for fishing, harvesting and celebration; it is placed off-centre so it " +
      "looks centred when the flag flies. Adopted in 1981.",
    myths: [
      {
        claim: "The disc is a tribute to Japan’s Rising Sun flag.",
        reality:
          "The designer denied any link: the disc is the moon, not the sun, and its off-centre " +
          "placement and lunar meaning set it apart from the Japanese design.",
      },
    ],
    sources: [
      { title: "Flag of Palau — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Palau" },
    ],
  },

  VA: {
    description:
      "Two vertical bands of yellow and white, the white charged with the crossed gold and silver keys " +
      "of Saint Peter beneath the papal tiara. The yellow and white are the papal colours; the keys " +
      "are the keys of heaven given to Saint Peter and the tiara the authority of the papacy. Adopted " +
      "in 1929 with the founding of Vatican City, modelled on the earlier Papal States flag.",
    myths: [
      {
        claim: "The papal tiara on the flag is lined in red.",
        reality:
          "The lining is white; a red-lined version circulated widely online for years but is an " +
          "error, not the official flag.",
      },
    ],
    sources: [
      { title: "Flag of Vatican City — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vatican_City" },
    ],
  },

  PS: {
    description:
      "A horizontal black-white-green tricolour with a red triangle at the hoist — the Pan-Arab " +
      "colours of the 1916 Arab Revolt flag. The black, white and green recall the Abbasid, Umayyad " +
      "and Fatimid periods and the red the Hashemites and Arab unity. Adopted as the flag of the " +
      "Palestinian people by the PLO in 1964.",
    myths: [
      {
        claim: "The flag’s designer and precise origin are firmly established.",
        reality:
          "They are disputed: competing accounts credit a 1909 Istanbul literary society, the 1911 " +
          "Young Arab Society and the British official Mark Sykes, and the record is a matter of " +
          "dispute and mythology.",
      },
    ],
    sources: [
      { title: "Flag of Palestine — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Palestine" },
    ],
  },

  LA: {
    description:
      "A horizontal red-blue-red triband (the blue band double height) with a white disc at the " +
      "centre. In the designer’s explanation the red stands for the blood shed by the Lao people in " +
      "their struggle, the blue for the Mekong River and the nation’s prosperity, and the white disc " +
      "for the full moon over the Mekong and the unity of the people. Created in 1945 and readopted " +
      "in 1975.",
    sources: [
      { title: "Flag of Laos — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Laos" },
    ],
  },

  ME: {
    description:
      "A red field within a gold border, with the national coat of arms — a golden double-headed " +
      "eagle bearing a lion — at the centre. Drawn from Montenegro’s historical royal banners, it was " +
      "adopted in 2004 as the country asserted a distinct identity before its 2006 independence.",
    sources: [
      { title: "Flag of Montenegro — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Montenegro" },
    ],
  },

  SM: {
    description:
      "Two horizontal bands, white over light blue, with the coat of arms at the centre: three towers " +
      "on Monte Titano within oak and laurel wreaths, beneath a crown and the motto Libertas " +
      "(“Liberty”). The white stands for peace (and the snow of the mountain) and the blue for " +
      "liberty and the sky; the three towers are the fortifications of Monte Titano. The arms were " +
      "standardised in 1862.",
    sources: [
      { title: "Flag of San Marino — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_San_Marino" },
    ],
  },

  // ── Subnational flags (keyed by ISO 3166-2 code) ────────────────────────
  "GB-SCT": {
    description:
      "The Saltire, or Saint Andrew’s Cross: a white diagonal cross on a blue field. Saint " +
      "Andrew, Scotland’s patron saint, is traditionally said to have been martyred on an " +
      "X-shaped cross, which the flag depicts. It is one of the oldest national flags still in use.",
    myths: [
      {
        claim:
          "The flag originates from a white saltire appearing in the sky before the Battle of " +
          "Athelstaneford in 832.",
        reality:
          "This is a founding legend, not verified history: King Óengus is said to have seen " +
          "white saltire-shaped clouds against the blue sky and taken them as Saint Andrew’s " +
          "blessing before victory. The story is recorded only in much later sources.",
      },
    ],
    sources: [
      { title: "Flag of Scotland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Scotland" },
    ],
  },

  "GB-WLS": {
    description:
      "Y Ddraig Goch (“the Red Dragon”): a red dragon passant on a field divided white " +
      "over green. The red dragon is an ancient emblem of Wales, linked in medieval legend to the " +
      "tale of the fighting red and white dragons and to the kings of Gwynedd; the white-and-green " +
      "field are the livery colours of the Tudor dynasty. It was granted official status in 1959.",
    sources: [
      { title: "Flag of Wales — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wales" },
    ],
  },

  "GL": {
    description:
      "Erfalasorput (“our flag”): a white band over a red band bearing a large disc offset toward " +
      "the hoist, its top half red and its bottom half white — each half the reverse of the band " +
      "behind it. Its designer, Thue Christiansen, described it as the Greenlandic landscape and the " +
      "low sun: white for the ice sheet and glaciers that cover most of the island, red for the " +
      "ocean, the red half-disc for the sun sinking into the sea, and the white half-disc for the " +
      "icebergs and pack ice. The red and white are also the colours of the Danish flag, marking " +
      "Greenland’s place within the Kingdom of Denmark. Adopted 21 June 1985.",
    sources: [
      { title: "Flag of Greenland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Greenland" },
    ],
  },

  "DK-GL": {
    description:
      "Erfalasorput (“our flag”): a white band over a red band bearing a large disc offset toward " +
      "the hoist, its top half red and its bottom half white — each half the reverse of the band " +
      "behind it. Its designer, Thue Christiansen, described it as the Greenlandic landscape and the " +
      "low sun: white for the ice sheet and glaciers that cover most of the island, red for the " +
      "ocean, the red half-disc for the sun sinking into the sea, and the white half-disc for the " +
      "icebergs and pack ice. The red and white are also the colours of the Danish flag, marking " +
      "Greenland’s place within the Kingdom of Denmark. Adopted 21 June 1985.",
    sources: [
      { title: "Flag of Greenland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Greenland" },
    ],
  },

  "BM": {
    description:
      "A British Red Ensign defaced with Bermuda’s coat of arms: a red lion holding a shield that shows the ship " +
      "Sea Venture wrecking on the island’s reefs in 1609 — the shipwreck that led to Bermuda’s settlement — " +
      "under the motto Quo Fata Ferunt (“whither the fates carry [us]”).",
    sources: [
      { title: "Flag of Bermuda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bermuda" },
    ],
  },

  "MO": {
    description:
      "A green field with a white lotus above the Governor Nobre de Carvalho bridge and stylised water, beneath an " +
      "arc of five golden stars. Green is the Macao SAR; the lotus is its floral emblem, standing for purity; the " +
      "bridge and water are its geography and its life as a port; and the five gold stars echo China’s flag, " +
      "marking Macau as part of China. First flown at the 1999 handover.",
    sources: [
      { title: "Flag of Macau — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Macau" },
    ],
  },

  "MS": {
    description:
      "A British Blue Ensign with Montserrat’s arms in the fly: a woman in green — Erin, the figure of Ireland — " +
      "holding a golden harp and embracing a cross. The Irish symbols recall the island’s many settlers of Irish " +
      "descent, which give it the name “the Emerald Isle of the Caribbean”.",
    sources: [
      { title: "Flag of Montserrat — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Montserrat" },
    ],
  },

  "PR": {
    description:
      "Five horizontal stripes alternating red and white with a blue equilateral triangle at the hoist bearing a " +
      "single white five-pointed star. The lone star stands for the island itself; the three sides of the triangle " +
      "for the executive, legislative and judicial branches of government; the blue for the sky and coastal waters; " +
      "the red stripes for the blood of the patriots; and the white stripes for liberty, victory and peace. The " +
      "design dates from 1895 and was adopted as the official flag of the Commonwealth in 1952.",
    sources: [
      { title: "Flag of Puerto Rico — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Puerto_Rico" },
    ],
  },

  "SH": {
    description:
      "A British Blue Ensign with the Union Flag in the canton and Saint Helena's coat of arms in the fly. The arms " +
      "show a three-masted sailing ship approaching the island's rocky, cliff-lined coast — recalling the colony's " +
      "seal and its role as a mid-Atlantic port of call — beneath the wirebird (the Saint Helena plover), the " +
      "island's endemic national bird. The arms carry the motto “Loyal and Unshakeable.”",
    sources: [
      { title: "Coat of arms of Saint Helena — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Saint_Helena" },
    ],
  },

  "SX": {
    description:
      "A white triangle at the hoist bearing the territory's coat of arms, with horizontal bands of red over blue. " +
      "The red, white and blue evoke both the Dutch and the French flags, reflecting the island shared by the two " +
      "nations. The arms show the courthouse of Philipsburg, the border monument marking the Dutch–French frontier " +
      "and the orange-tinted yellow sage flower, crested by a pelican and the motto “Semper progrediens” — always " +
      "progressing.",
    sources: [
      { title: "Flag of Sint Maarten — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sint_Maarten" },
    ],
  },

  "TW": {
    description:
      "A red field with a blue canton bearing a white sun of twelve rays — the “Blue Sky, White Sun.” The twelve " +
      "rays stand for the twelve two-hour periods of the traditional day and the twelve months, a call to constant " +
      "progress; the red field was added by Sun Yat-sen for the blood of the revolutionaries who overthrew the Qing " +
      "dynasty. The three colours are also read for the Three Principles of the People — blue for nationalism and " +
      "liberty, white for democracy and equality, red for the people's livelihood and fraternity.",
    sources: [
      { title: "Flag of the Republic of China — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_China" },
    ],
  },

  "WF": {
    description:
      "The locally-used flag of Wallis and Futuna: a red field bearing a white square in which sits a red saltire, " +
      "set toward the upper fly, with the French Tricolour in the canton to mark the territory's status as a French " +
      "overseas collectivity. It is unofficial — France recognises no regional flag, so the Tricolour remains the " +
      "official flag — and is flown at events such as the Pacific Games.",
    sources: [
      { title: "Flag of Wallis and Futuna — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wallis_and_Futuna" },
    ],
  },

  "XN": {
    description:
      "A white field with a red crescent and star between two horizontal red stripes — the flag of the Turkish " +
      "Republic of Northern Cyprus, based on the flag of Turkey with the colours reversed and two red bars added. No " +
      "official meaning is recorded, though the star and crescent are commonly read as a sign of Turkish identity, " +
      "the red for the Turkish Cypriots and the white for peace. It was adopted in 1984.",
    sources: [
      { title: "Flag of Northern Cyprus — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Northern_Cyprus" },
    ],
  },

  "XS": {
    description:
      "Three horizontal bands of green, white and red: the green bears the Shahada, the Islamic declaration of " +
      "faith, in white, reflecting the central place of Islam in Somaliland; the white band, with a black " +
      "five-pointed star at its centre, stands for peace, purity and the unity of the people; and the red for the " +
      "sacrifices made in the struggle for self-determination. It was adopted in 1996.",
    sources: [
      { title: "Flag of Somaliland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Somaliland" },
    ],
  },

  "US-TX": {
    description:
      "The Lone Star Flag: a blue vertical band at the hoist bearing a single white five-pointed " +
      "star, beside two horizontal bars, white over red. The single star gives Texas its nickname, " +
      "the “Lone Star State.” The design was adopted by the Republic of Texas in 1839.",
    myths: [
      {
        claim: "The colours officially mean loyalty (blue), purity (white) and bravery (red).",
        reality:
          "This interpretation is popular but was not part of the 1839 law that adopted the flag; " +
          "the statute assigned no meaning to the colours. The meanings were attached later by " +
          "custom.",
      },
    ],
    sources: [
      { title: "Flag of Texas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Texas" },
    ],
  },

  "US-AK": {
    description:
      "Eight gold stars on a dark blue field: the seven stars of the Big Dipper plus a larger North " +
      "Star. The blue stands for the sky, the sea and Alaska’s forget-me-not flower, the Big Dipper " +
      "for strength (it forms part of Ursa Major, the Great Bear) and the North Star for Alaska’s " +
      "far-northern position. It was designed in 1927 by a schoolboy, Benny Benson, in a territorial " +
      "contest.",
    myths: [
      {
        claim: "Benny Benson was 13 years old when he designed the flag.",
        reality: "He was in fact 14 at the time; the “13-year-old” version is a common retelling.",
      },
    ],
    sources: [
      { title: "Flag of Alaska — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alaska" },
    ],
  },

  "US-HI": {
    description:
      "Eight horizontal white, red and blue stripes for Hawaii’s eight main islands, with the British " +
      "Union Jack in the canton — the only U.S. state flag to contain another country’s flag. The " +
      "Union Jack reflects close ties with Britain in the early 19th century; the flag dates from the " +
      "Kingdom of Hawaii and was standardised in 1845.",
    myths: [
      {
        claim: "King Kamehameha I deliberately combined the British and American flags to please both powers.",
        reality:
          "A frequently-repeated but unverified account; what is documented is the strong British " +
          "naval influence on the design, not a specific diplomatic intention.",
      },
    ],
    sources: [
      { title: "Flag of Hawaii — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hawaii" },
    ],
  },

  "US-NM": {
    description:
      "A red Zia sun symbol on a yellow field, in the red and yellow of old Spain. The Zia sun’s four " +
      "groups of rays stand for the four directions, the four seasons, the four times of day and the " +
      "four stages of life. Adopted in 1925.",
    myths: [
      {
        claim: "The sacred Zia symbol was freely given for use on the flag.",
        reality:
          "It was adopted without the consent of the Zia Pueblo, who later objected; a 2012 state " +
          "memorial acknowledged the appropriation.",
      },
    ],
    sources: [
      { title: "Flag of New Mexico — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Mexico" },
    ],
  },

  "US-MD": {
    description:
      "The quartered arms of the Calvert family (gold and black) and the Crossland family (red and " +
      "white, with a bottony cross) — the personal heraldry of the Barons Baltimore, Maryland’s " +
      "founders. It is the only U.S. state flag based on genuine English heraldry. Adopted in 1904.",
    myths: [
      {
        claim: "The two halves were simply an aesthetic choice.",
        reality:
          "During the Civil War the Calvert colours were linked to Unionists and the Crossland cross " +
          "to Confederate sympathisers; combining them is read as a gesture of reconciliation.",
      },
    ],
    sources: [
      { title: "Flag of Maryland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Maryland" },
    ],
  },

  "US-SC": {
    description:
      "A blue field with a white palmetto tree and a white crescent. The palmetto commemorates the " +
      "palmetto-log fort on Sullivan’s Island that withstood British cannon fire in 1776; the blue " +
      "and the crescent come from the uniforms and cap badges of the Revolutionary militia.",
    myths: [
      {
        claim: "The crescent is a moon.",
        reality:
          "It is not a lunar symbol but a gorget-shaped emblem taken from the silver crescent badge " +
          "on the militia’s caps.",
      },
    ],
    sources: [
      { title: "Flag of South Carolina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Carolina" },
    ],
  },

  "US-OH": {
    description:
      "The Ohio Burgee — the only non-rectangular U.S. state flag, a swallowtail pennant of red and " +
      "white stripes with a blue triangle bearing 17 stars around a red-and-white disc. The stripes " +
      "stand for roads and waterways, the triangle for hills and valleys, the 17 stars for Ohio as " +
      "the 17th state and the “O” for its name and the buckeye. Adopted in 1902.",
    myths: [
      {
        claim: "The design copied the Cuban, Filipino or Japanese flags it was compared to.",
        reality:
          "Its designer drew on Civil War cavalry guidons; the foreign-flag comparisons were made by " +
          "the press after the fact.",
      },
    ],
    sources: [
      { title: "Flag of Ohio — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ohio" },
    ],
  },

  "US-AZ": {
    description:
      "Thirteen red and gold rays of a setting sun over a blue lower half, with a copper-coloured " +
      "star at the centre. The thirteen rays stand for the original colonies, the red and gold recall " +
      "Spanish colonial banners, the blue matches the U.S. flag and the copper star marks Arizona as " +
      "the country’s leading copper producer. Adopted in 1917.",
    myths: [
      {
        claim: "An earlier sun design was changed so the flag would not resemble Japan’s.",
        reality:
          "A popular story with no support in the record; the state credits Spanish colonial " +
          "influence for the rayed-sun design.",
      },
    ],
    sources: [
      { title: "Flag of Arizona — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Arizona" },
    ],
  },

  "US-CO": {
    description:
      "Blue, white and blue horizontal stripes with a red “C” filled by a gold disc. The blue is the " +
      "sky, the gold the sunshine, the white the snow-capped Rockies and the red the state’s ruddy " +
      "earth; the C stands at once for Colorado (Spanish for “ruddy/red”), for its centennial " +
      "statehood and for the columbine flower. Adopted in 1911.",
    sources: [
      { title: "Flag of Colorado — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Colorado" },
    ],
  },

  "US-TN": {
    description:
      "A red field with a blue vertical bar at the fly and a blue disc bearing three white stars. The " +
      "three stars stand for Tennessee’s three Grand Divisions — East, Middle and West — and the " +
      "circle for their unity. Designed by LeRoy Reeves and adopted in 1905.",
    myths: [
      {
        claim: "The three stars mean Tennessee was the third state to join the Union.",
        reality:
          "That claim (from a 1917 magazine article) is incorrect; the designer stated the stars " +
          "represent the three Grand Divisions.",
      },
    ],
    sources: [
      { title: "Flag of Tennessee — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tennessee" },
    ],
  },

  "US-RI": {
    description:
      "A white field with a gold anchor encircled by thirteen gold stars and a blue ribbon bearing " +
      "the state motto, “Hope.” The anchor and motto — long used on the colony’s seal — echo a " +
      "biblical image of hope, and the thirteen stars stand for the original colonies (Rhode Island " +
      "being the 13th to ratify the Constitution). Adopted in 1897.",
    sources: [
      { title: "Flag of Rhode Island — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rhode_Island" },
    ],
  },

  "US-PR": {
    description:
      "Five red and white stripes with a blue triangle at the hoist bearing a single white star. It " +
      "was created in 1895 by exiles in New York as a mirror of the Cuban flag, in solidarity between " +
      "the two independence movements; the star is the island, the triangle the three branches of " +
      "government, the red stripes the blood that sustains them and the white the rights of the people.",
    myths: [
      {
        claim: "The shade of blue is fixed and meaningless.",
        reality:
          "The original left the blue unspecified, and the shade has become political — light blue is " +
          "associated with independence, dark blue (used since 1952) with statehood — so the colour " +
          "chosen can signal a viewpoint.",
      },
    ],
    sources: [
      { title: "Flag of Puerto Rico — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Puerto_Rico" },
    ],
  },

  "US-MN": {
    description:
      "A dark-blue field shaped like the state at the hoist bearing a white eight-pointed star, beside " +
      "a light-blue fly. The dark blue stands for the shape of Minnesota and the night sky, the star " +
      "for the state motto L’Étoile du Nord (“the Star of the North”) and the light blue for the " +
      "state’s abundant waters. Adopted in 2024, replacing the former seal flag.",
    myths: [
      {
        claim: "The new flag was made to resemble Somalia’s flag.",
        reality:
          "State officials call the resemblance coincidental, noting that several U.S. state flags " +
          "happen to echo foreign ones (Iowa and France, Texas and Chile).",
      },
    ],
    sources: [
      { title: "Flag of Minnesota — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Minnesota" },
    ],
  },

  "US-UT": {
    description:
      "A gold beehive inside a hexagon on a white band, between a blue sky above and red canyon-rock " +
      "below, with a white star. The beehive is Utah’s emblem of industry and the hexagon its " +
      "honeycomb of collective effort; the blue is the sky, the red the desert rock and the star the " +
      "state’s tribal nations. Adopted in 2024 as the new state flag.",
    myths: [
      {
        claim: "The star stands for Utah being the 45th state.",
        reality:
          "The five-pointed star specifically honours Utah’s five original tribal nations (Navajo, " +
          "Shoshone, Goshute, Paiute and Ute), though it also alludes to statehood.",
      },
    ],
    sources: [
      { title: "Flag of Utah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Utah" },
    ],
  },

  "US-MS": {
    description:
      "The “New Magnolia” flag: a white magnolia blossom ringed by twenty white stars and one gold " +
      "star on a navy field between gold and red bands, with the motto “In God We Trust.” The magnolia " +
      "is the state flower and a symbol of hospitality and rebirth, the twenty stars mark Mississippi " +
      "as the 20th state and the gold star honours its Native American peoples. Adopted in 2021 to " +
      "replace the flag that had carried a Confederate battle emblem.",
    sources: [
      { title: "Flag of Mississippi — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mississippi" },
    ],
  },

  "US-DC": {
    description:
      "Three red stars over two red bars on white — an armorial banner of the coat of arms of George " +
      "Washington’s family. Adopted in 1938 for the District named after the first president.",
    myths: [
      {
        claim: "The bars and stars stand for Congress and the commissioners ruling the District.",
        reality:
          "That reading arose from residents’ frustration at having no vote; the design is simply the " +
          "Washington family heraldry.",
      },
    ],
    sources: [
      { title: "Flag of Washington, D.C. — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Washington,_D.C." },
    ],
  },

  "US-IN": {
    description:
      "A gold torch with rays, ringed by nineteen stars, on a blue field. The torch stands for liberty " +
      "and enlightenment and its rays for their far-reaching influence; the nineteen stars mark " +
      "Indiana as the 19th state, with the large star above the torch standing for Indiana itself. " +
      "Designed by Paul Hadley for the state’s 1916 centennial and adopted in 1917.",
    sources: [
      { title: "Flag of Indiana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Indiana" },
    ],
  },

  "US-AL": {
    description:
      "A crimson St Andrew’s cross (saltire) on a white field. Adopted in 1895.",
    myths: [
      {
        claim: "The flag was definitively created to honour the Confederate battle flag.",
        reality:
          "This is disputed: the adopting legislation records no such intent, and historians disagree " +
          "on whether the saltire was meant to evoke the battle flag or was simply a new design for a " +
          "planned exposition.",
      },
    ],
    sources: [
      { title: "Flag of Alabama — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alabama" },
    ],
  },

  "US-AR": {
    description:
      "A red field with a large white diamond bordered in blue and 25 stars, the word “ARKANSAS” " +
      "within, and four larger stars. The diamond marks Arkansas as the only U.S. state that has " +
      "produced diamonds and the 25 border stars its place as the 25th state; of the four inner " +
      "stars, the three below stand for the nations that once held the land (France, Spain and the " +
      "United States) and the 1803 Louisiana Purchase. Adopted in 1913.",
    myths: [
      {
        claim: "The star above the state’s name has no particular meaning.",
        reality:
          "It was added in 1923–24 specifically to represent the Confederacy, a documented feature of " +
          "the design.",
      },
    ],
    sources: [
      { title: "Flag of Arkansas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Arkansas" },
    ],
  },

  "US-AS": {
    description:
      "A red-edged white triangle pointing to the hoist on a blue field, bearing a bald eagle that " +
      "holds a uatogi (war club) and a fue (fly-whisk staff). The eagle stands for the United States " +
      "and the two Samoan emblems for traditional chiefly authority. Adopted in 1960, on the " +
      "60th anniversary of U.S. sovereignty over the territory.",
    sources: [
      { title: "Flag of American Samoa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_American_Samoa" },
    ],
  },

  "US-GA": {
    description:
      "Red, white and red bands with a blue canton bearing the state coat of arms in a ring of " +
      "thirteen stars and the motto “In God We Trust.” The thirteen stars mark Georgia as one of the " +
      "original colonies and the arms’ arch and pillars its constitution and three branches of " +
      "government; the design is modelled on the first national flag of the Confederacy, the “Stars " +
      "and Bars.” Adopted in 2003.",
    sources: [
      { title: "Flag of Georgia (U.S. state) — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Georgia_(U.S._state)" },
    ],
  },

  "US-GU": {
    description:
      "A blue field with a red border and a central almond-shaped seal — its shape recalling ancient " +
      "Chamorro sling stones — showing a flying proa in Hagåtña Bay, a coconut palm and the word " +
      "“GUAM.” The red border was added in 1948 to commemorate the suffering of the Japanese " +
      "occupation during the Second World War.",
    sources: [
      { title: "Flag of Guam — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guam" },
    ],
  },

  "US-VI": {
    description:
      "A white field with a simplified U.S. eagle between the letters V and I, holding a laurel sprig " +
      "in one talon and three blue arrows in the other. The eagle stands for the United States, the " +
      "laurel for victory and — unlike the thirteen arrows of the national arms — the three arrows for " +
      "the territory’s three main islands, Saint Croix, Saint Thomas and Saint John. Adopted in 1921.",
    sources: [
      { title: "Flag of the U.S. Virgin Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_United_States_Virgin_Islands" },
    ],
  },

  "US-NC": {
    description:
      "A blue union with a white star between gold letters N and C, two gold scrolls dated “May 20th " +
      "1775” and “April 12th 1776,” and red-over-white bars. The dates commemorate the Halifax " +
      "Resolves of 1776 and the Mecklenburg Declaration said to have been made in 1775. Adopted in 1885.",
    myths: [
      {
        claim: "The Mecklenburg Declaration of 20 May 1775 is firmly established history.",
        reality:
          "Its existence is doubted by most historians — no original text survives and the account " +
          "appeared decades later — yet the date remains on the flag.",
      },
    ],
    sources: [
      { title: "Flag of North Carolina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Carolina" },
    ],
  },

  "CA-QC": {
    description:
      "The Fleurdelisé: a white cross on a blue field with a white fleur-de-lis in each quarter. The " +
      "blue stands for heaven and the fleurs-de-lis for Québec’s French and Catholic heritage — they " +
      "derive from banners honouring the Virgin Mary carried by French-Canadian militia in the 18th " +
      "century. Adopted in 1948, the first provincial flag in Canada.",
    sources: [
      { title: "Flag of Quebec — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Quebec" },
    ],
  },

  "CA-BC": {
    description:
      "The Union Jack topped by a gold crown, above a golden setting sun over wavy blue and white " +
      "stripes. The Union Jack marks British Columbia’s colonial origins and the crown its status as " +
      "a Crown colony; the setting sun reflects the province’s place as Canada’s westernmost, and the " +
      "wavy stripes its position between the Pacific Ocean and the mountains. Adopted in 1960.",
    sources: [
      { title: "Flag of British Columbia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_British_Columbia" },
    ],
  },

  "CA-NL": {
    description:
      "An abstract design in blue, white, red and gold by the artist Christopher Pratt. The blue " +
      "stands for the sea, the white for snow and ice, the red for human effort and the gold for " +
      "confidence in the future; the two red triangles represent mainland Labrador and the island of " +
      "Newfoundland, and the gold arrow points to a brighter future. Adopted in 1980.",
    sources: [
      { title: "Flag of Newfoundland and Labrador — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Newfoundland_and_Labrador" },
    ],
  },

  "CA-NS": {
    description:
      "A blue Saint Andrew’s saltire on white — the reverse of Scotland’s colours — charged with the " +
      "royal arms of Scotland, a red lion on gold. It reflects the province’s name and heritage as " +
      "“New Scotland,” and is the oldest provincial flag in Canada (in use from 1858 and granted by " +
      "royal warrant in 1929).",
    sources: [
      { title: "Flag of Nova Scotia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nova_Scotia" },
    ],
  },

  "CA-ON": {
    description:
      "A Red Ensign with the Union Jack in the canton and the Ontario shield in the fly — a red Saint " +
      "George’s Cross above three gold maple leaves on green. Adopted in 1965 to preserve the Red " +
      "Ensign after Canada replaced it nationally with the Maple Leaf flag.",
    sources: [
      { title: "Flag of Ontario — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ontario" },
    ],
  },

  "CA-NU": {
    description:
      "Gold and white fields divided by a red inuksuk, with a blue star in the upper fly. The inuksuk " +
      "is the traditional Inuit stone marker used for guidance, and the blue star is Niqirtsuituq, the " +
      "North Star, standing for the guidance of the sky and the wisdom of elders; the gold, white and " +
      "blue evoke the riches of land, snow and sky. Adopted when Nunavut was created in 1999.",
    sources: [
      { title: "Flag of Nunavut — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nunavut" },
    ],
  },

  "CA-MB": {
    description:
      "A Red Ensign with the Union Jack in the canton and the Manitoba shield — a bison standing on a " +
      "rock beneath a Saint George’s Cross. Adopted in 1966 to keep the Red Ensign after it was " +
      "dropped nationally.",
    myths: [
      {
        claim: "The flag was chosen through a public design competition.",
        reality:
          "It was not: after the bruising national flag debate there was no public contest — " +
          "provincial officials simply adopted the Red Ensign format.",
      },
    ],
    sources: [
      { title: "Flag of Manitoba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Manitoba" },
    ],
  },

  "CA-AB": {
    description:
      "An ultramarine-blue field bearing the provincial shield: a Saint George’s Cross above a " +
      "landscape of the Rocky Mountains, foothills, prairie and wheat. The shield comes from a 1907 " +
      "royal warrant; the flag was adopted in 1968.",
    sources: [
      { title: "Flag of Alberta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alberta" },
    ],
  },

  "CA-SK": {
    description:
      "A green upper half and gold lower half with the provincial shield (a red lion above three " +
      "wheat sheaves) and a western red lily in the fly. The green stands for the forested north, the " +
      "gold for the grain fields of the south and the lily for the provincial flower. Adopted in 1969.",
    sources: [
      { title: "Flag of Saskatchewan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saskatchewan" },
    ],
  },

  "CA-NB": {
    description:
      "An armorial banner of New Brunswick’s arms: a gold lion on a red band above a gold galley " +
      "(lymphad) on blue and white waves. The lion reflects ties to England and to Brunswick, and the " +
      "ship the province’s shipbuilding heritage and the vessels of the Loyalists. Adopted in 1965.",
    sources: [
      { title: "Flag of New Brunswick — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Brunswick" },
    ],
  },

  "CA-NT": {
    description:
      "Blue-white-blue vertical bands with the territorial shield on the white: a white fox for the " +
      "fur trade, gold bars for minerals, a wavy blue line for the Arctic Ocean and Northwest Passage " +
      "and a diagonal tree line dividing green forest from red tundra. The white stands for snow and " +
      "ice and the blue for the territory’s waters. Adopted in 1969.",
    sources: [
      { title: "Flag of the Northwest Territories — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Northwest_Territories" },
    ],
  },

  "CA-YT": {
    description:
      "Green, white and blue vertical panels with the territorial coat of arms above a wreath of " +
      "fireweed on the white. The green stands for the forests, the white for snow and the blue for " +
      "the lakes and rivers; the fireweed is Yukon’s floral emblem. Adopted in 1967.",
    sources: [
      { title: "Flag of Yukon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Yukon" },
    ],
  },

  "AU-NSW": {
    description:
      "A British Blue Ensign defaced with the state badge: a white disc bearing a red Saint George’s " +
      "Cross with a golden lion at the centre and a gold eight-pointed star on each arm. The lion " +
      "reflects the colony’s English origins. Adopted in 1876, replacing a design thought too like " +
      "Victoria’s.",
    sources: [
      { title: "Flag of New South Wales — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_South_Wales" },
    ],
  },

  "AU-QLD": {
    description:
      "A British Blue Ensign defaced with the state badge — a light-blue Maltese cross with a royal " +
      "crown at its centre, on a white disc. Adopted in 1876, it replaced an earlier badge showing " +
      "Queen Victoria’s head that was too hard to reproduce on bunting.",
    myths: [
      {
        claim: "The crown on the badge changed automatically when King Charles III acceded in 2022.",
        reality:
          "It did not: Queensland has chosen to keep the St Edward’s Crown of the 1963 design rather " +
          "than switch to the Tudor Crown.",
      },
    ],
    sources: [
      { title: "Flag of Queensland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Queensland" },
    ],
  },

  "AU-SA": {
    description:
      "A British Blue Ensign defaced with the state badge: a piping shrike with outstretched wings on " +
      "a gold disc representing the sun. Adopted in 1904, replacing an earlier badge that resembled " +
      "other colonies’ designs.",
    myths: [
      {
        claim: "The bird on the badge is a distinct species called the “piping shrike.”",
        reality:
          "“Piping shrike” is a traditional South Australian name; the bird is more commonly known as " +
          "the white-backed magpie.",
      },
    ],
    sources: [
      { title: "Flag of South Australia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Australia" },
    ],
  },

  "AU-WA": {
    description:
      "A British Blue Ensign defaced with the state badge — a native black swan on a gold disc, facing " +
      "the hoist. The swan stands for Western Australia, recalling the Swan River Colony. The badge " +
      "dates from 1870; the swan was turned to face the hoist in 1953 to follow flag convention.",
    sources: [
      { title: "Flag of Western Australia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Western_Australia" },
    ],
  },

  "AU-VIC": {
    description:
      "A British Blue Ensign defaced with the state badge: the five stars of the Southern Cross " +
      "beneath a St Edward’s Crown. Adopted in 1877, it was the first Australian colonial flag to use " +
      "the Southern Cross.",
    sources: [
      { title: "Flag of Victoria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Victoria_(state)" },
    ],
  },

  "AU-TAS": {
    description:
      "A British Blue Ensign defaced with the state badge — a red lion passant on a white disc. " +
      "Adopted in 1876; there is no official record of how the lion came to be chosen.",
    sources: [
      { title: "Flag of Tasmania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tasmania" },
    ],
  },

  "AU-NT": {
    description:
      "A black panel at the hoist bearing the white Southern Cross, beside an ochre panel with a " +
      "stylised white Sturt’s desert rose. It uses the Territory’s official colours of black, white " +
      "and ochre — the only Australian state or territory flag without blue — and the desert rose’s " +
      "seven petals stand for the six states plus the Northern Territory. Designed by Robert Ingpen " +
      "for self-government in 1978.",
    sources: [
      { title: "Flag of the Northern Territory — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Northern_Territory" },
    ],
  },

  "AU-ACT": {
    description:
      "Vertical blue and gold panels — Canberra’s colours — the blue bearing the white Southern Cross " +
      "and the gold the city’s coat of arms. Adopted in 1993, drawn from a community design competition.",
    sources: [
      { title: "Flag of the Australian Capital Territory — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Australian_Capital_Territory" },
    ],
  },

  "CH-ZH": {
    description:
      "A blue and white flag divided diagonally, in use since the 1220s. The diagonal split (and its " +
      "former red Schwenkel pennant) is one of the oldest of the Swiss cantonal arms.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-BE": {
    description:
      "A black bear climbing a diagonal yellow band on a red field. The bear is canting arms for Bern " +
      "(Bär), the city’s emblem since the Middle Ages (recorded from 1289).",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-LU": {
    description:
      "A field divided blue and white — set vertically in the coat of arms but horizontally on the " +
      "flag, a difference that comes from the canton’s medieval gonfalon banner. Documented from 1386.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-UR": {
    description:
      "A black bull’s head on a gold field — canting arms for Uri (from Latin urus, the aurochs). It " +
      "was carried into medieval battles including Morgarten in 1315.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SZ": {
    description:
      "A plain red field with a small white cross in the upper hoist. Schwyz gave both its name and " +
      "its red colour to the Swiss Confederation; in 1480 Pope Sixtus IV linked the red to the " +
      "Passion of Christ.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-OW": {
    description:
      "A field divided red and white with a single key. The single (rather than double) key was fixed " +
      "in 1816 to distinguish Obwalden from Nidwalden.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-NW": {
    description:
      "A red field with a double key — the keys of Saint Peter — derived from 15th-century seals.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-GL": {
    description:
      "A red field bearing Saint Fridolin, the pilgrim who brought Christianity to the region, in use " +
      "since 1388; the current design dates from 1959.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-ZG": {
    description:
      "A white field crossed by a single blue horizontal stripe — one of the earliest documented " +
      "cantonal designs, recorded in 1319.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-FR": {
    description:
      "A field divided black over white (per fess), first recorded in 1478 as Fribourg gained its " +
      "independence from Savoy.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SO": {
    description:
      "A field divided red over white, documented from 1443.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-BS": {
    description:
      "A white field with a black bishop’s crozier, the Baselstab, adopted as a heraldic emblem in " +
      "1385 from earlier civic seals.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-BL": {
    description:
      "A white field with a red crozier bearing seven crockets, adopted in 1834; the staff is turned " +
      "to face the opposite way from Basel-Stadt’s to mark the two half-cantons’ separation.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SH": {
    description:
      "A gold field with a black ram — canting arms for Schaffhausen (Schaf, “sheep/ram”), documented " +
      "from 1218; the ram was given a crown in 1512.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-AR": {
    description:
      "A white field with a black rampant bear flanked by the letters V and R (for Ussere Rhoden, the " +
      "“outer districts”). The bear comes from the Abbey of Saint Gall; the design dates from after " +
      "the Reformation-era split of the Appenzell districts.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-SG": {
    description:
      "A green field with a silver fasces (a bundle of rods). It was created in 1803, when the canton " +
      "was assembled from previously separate territories under the Helvetic Republic.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-GR": {
    description:
      "Three historical arms combined in one shield, adopted in 1933, standing for the Three Leagues " +
      "that united to form the canton of Graubünden (the Grisons).",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-TG": {
    description:
      "A field divided diagonally white and green with two gold lions, created in 1803 from the arms " +
      "of the House of Kyburg (the gold-on-white being an intentional break with the usual heraldic " +
      "colour rule).",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-TI": {
    description:
      "A field divided red and blue, designed in 1803. Neither its designer nor its intended " +
      "symbolism was recorded.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-VD": {
    description:
      "A green and white flag bearing the motto “Liberté et Patrie” (“Liberty and Homeland”) in gold. " +
      "Adopted in 1803, it derives from the flag of the Vaudois uprising against Bernese rule.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-VS": {
    description:
      "A field divided vertically white and red with thirteen stars, formalised in 1815. The stars " +
      "stand for the districts (dizains) of the canton; the thirteenth was added when Valais joined " +
      "the restored Swiss Confederation in 1815.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-NE": {
    description:
      "A green, white and red flag with a small white Swiss cross in the canton, adopted in 1857 from " +
      "the flag of the 1848 republican revolution that ended Neuchâtel’s status as a Prussian " +
      "principality.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-GE": {
    description:
      "A shield divided per pale: half a gold imperial eagle and half a gold key of Saint Peter, " +
      "representing Geneva’s medieval status as both a free imperial city and an episcopal seat. " +
      "Documented from the 15th century.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },

  "CH-JU": {
    description:
      "A shield divided per pale: a red bishop’s crozier on white, and red-and-white stripes whose " +
      "seven bands stand for the historic districts of the Bernese Jura. Designed in 1943 and adopted " +
      "when the canton was created in 1979.",
    sources: [
      { title: "Flags and coats of arms of cantons of Switzerland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_and_coats_of_arms_of_cantons_of_Switzerland" },
    ],
  },












  "BR-SP": {
    description:
      "Thirteen black and white horizontal stripes with a red canton bearing a white disc, the blue " +
      "map of Brazil and four stars. The stripes stand for the days and nights the bandeirante " +
      "pioneers fought, the red for their blood and the disc for the strength they brought. Designed " +
      "in 1888 and made official in 1946.",
    sources: [
      { title: "Flag of São Paulo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_S%C3%A3o_Paulo_(state)" },
    ],
  },

  "BR-MG": {
    description:
      "A white field with a red triangle and the Latin motto “Libertas Quæ Sera Tamen” (“Liberty, " +
      "even if delayed,” from Virgil). It recalls the Inconfidência Mineira of 1789; the triangle is " +
      "read as the Holy Trinity and the red as revolution. Adopted in 1963.",
    sources: [
      { title: "Flag of Minas Gerais — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Minas_Gerais" },
    ],
  },

  "BR-BA": {
    description:
      "Four white and red horizontal stripes with a blue canton bearing a white triangle. The triangle " +
      "recalls the Inconfidência and Freemasonry, and the red, white and blue echo the 1798 Revolt of " +
      "the Tailors. Adopted in 1960.",
    sources: [
      { title: "Flag of Bahia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bahia" },
    ],
  },

  "BR-PE": {
    description:
      "A blue band over a white one bearing a rainbow, a sun with a star and a red cross. It " +
      "commemorates the Pernambucan Revolt of 1817: the blue is the sky, the white peace, the rainbow " +
      "union, the sun strength and the cross faith in justice. Adopted in 1917.",
    sources: [
      { title: "Flag of Pernambuco — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pernambuco" },
    ],
  },

  "BR-PR": {
    description:
      "A green field crossed by a white diagonal band for the Tropic of Capricorn, with a blue circle " +
      "showing the Southern Cross framed by branches of Paraná pine and yerba mate. The design " +
      "expresses the state’s geography and natural heritage.",
    sources: [
      { title: "Flag of Paraná — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Paran%C3%A1_(state)" },
    ],
  },

  "BR-PA": {
    description:
      "A red field with a white diagonal band and a blue star. The band stands for the Equator and the " +
      "Amazon River, the star (Spica) for Pará on the national flag, and the red for the blood of the " +
      "Cabanagem revolt. Adopted in 1890.",
    sources: [
      { title: "Flag of Pará — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Par%C3%A1" },
    ],
  },

  "BR-ES": {
    description:
      "A tricolour of blue, white and pink with the motto “Trabalha e Confia” (“Work and Trust,” from " +
      "Saint Ignatius of Loyola). The colours come from the mantle of Our Lady of Victory, the " +
      "capital’s patron: blue for harmony, white for peace and pink for happiness.",
    sources: [
      { title: "Flag of Espírito Santo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Esp%C3%ADrito_Santo" },
    ],
  },

  "BR-SC": {
    description:
      "A red and white field with a green lozenge and the state arms at the centre. The green lozenge " +
      "stands for Saint Catherine of Alexandria, the state’s patron; there is no official meaning for " +
      "the red and white. Adopted in 1953.",
    sources: [
      { title: "Flag of Santa Catarina — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santa_Catarina" },
    ],
  },

  "BR-CE": {
    description:
      "A green field with a yellow rhombus and a white disc bearing the state arms, adapted from " +
      "Brazil’s national flag. The arms carry a fort and lighthouse, seven stars for the state’s " +
      "regions and the four classical elements; the dove and jangada boat recall the Jangadeiros’ " +
      "strike, which helped Ceará abolish slavery early.",
    sources: [
      { title: "Flag of Ceará — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cear%C3%A1" },
    ],
  },

  "BR-MT": {
    description:
      "A blue field with a white rhombus enclosing a green sphere and a yellow star. The blue recalls " +
      "the Rio de Janeiro sky the night the republic was proclaimed, the rhombus positivism and " +
      "purity, the sphere hope and nature, and the star (Sirius) wealth and the bandeirantes.",
    sources: [
      { title: "Flag of Mato Grosso — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mato_Grosso" },
    ],
  },

  "BR-MS": {
    description:
      "A green upper and blue lower triangle split by a white diagonal band, with a yellow star. It " +
      "won a 1979 design contest; the government changed the students’ original ochre field — meant " +
      "for the state’s red Terra Roxa soil — to blue to match the national colours.",
    sources: [
      { title: "Flag of Mato Grosso do Sul — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mato_Grosso_do_Sul" },
    ],
  },

  "BR-GO": {
    description:
      "Four green and four yellow stripes with a blue canton bearing the five stars of the Southern " +
      "Cross. The green stands for the House of Braganza and the yellow for the House of Habsburg — " +
      "the dynasties of Brazil’s imperial family. Adopted in 1919.",
    sources: [
      { title: "Flag of Goiás — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Goi%C3%A1s" },
    ],
  },

  "BR-MA": {
    description:
      "Nine white, red and black stripes with a blue canton bearing a white star. The three stripe " +
      "colours stand for the state’s Indigenous, Afro-Brazilian and white peoples, and the star " +
      "(Beta Scorpii) for Maranhão on the national flag. Adopted in 1889.",
    sources: [
      { title: "Flag of Maranhão — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Maranh%C3%A3o" },
    ],
  },

  "BR-AM": {
    description:
      "White and red bands with a blue canton bearing sixty-two silver stars in seven rows: a large " +
      "central star for the capital, Manaus, and sixty-one smaller stars, one for each of the state's " +
      "other municipalities; white is hope, blue the sky and red the overcoming of hardship. The canton " +
      "originally carried only twenty-five stars (for the municipalities existing in 1897, when the " +
      "design was adopted); Law 8.469 of 14 July 2026 expanded it to sixty-two stars to represent every " +
      "municipality Amazonas has today, and set the flag to update automatically whenever the state's " +
      "municipal count changes.",
    sources: [
      { title: "Flag of Amazonas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Amazonas_(Brazilian_state)" },
      { title: "Amazonas oficializa nova bandeira com 62 estrelas após sanção de lei — Rios de Notícias", url: "https://www.riosdenoticias.com.br/amazonas-oficializa-nova-bandeira-com-62-estrelas-apos-sancao-de-lei/" },
    ],
  },

  "BR-SE": {
    description:
      "Green and yellow stripes with a blue canton bearing five white stars. The five stars stand for " +
      "the state’s main rivers — the Sergipe, São Francisco, Real, Vaza-Barris and Japaratuba — and " +
      "the green and gold for integration with Brazil.",
    sources: [
      { title: "Flag of Sergipe — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sergipe" },
    ],
  },

  "BR-AC": {
    description:
      "A field split diagonally, yellow above with a red star and green below. The red “Altaneira” " +
      "star stands for the blood of those who fought to annex Acre to Brazil, the yellow for the " +
      "land’s riches and the green for hope.",
    sources: [
      { title: "Flag of Acre — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Acre" },
    ],
  },

  "BR-RN": {
    description:
      "A green and white field with the state coat of arms, designed by the folklorist Luís da Câmara " +
      "Cascudo. The arms depict the state’s economy and geography — coconut and carnauba palms, " +
      "sugarcane and cotton, jangada fishing boats and salt pans.",
    sources: [
      { title: "Flag of Rio Grande do Norte — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rio_Grande_do_Norte" },
    ],
  },

  "BR-PB": {
    description:
      "A red field over black bearing the word “Nego” (“I refuse”). It was adopted in 1930 to honour " +
      "the assassinated governor João Pessoa — whose “no” rejected the era’s power-sharing politics; " +
      "the red stands for his blood and the black for the people’s mourning and struggle.",
    sources: [
      { title: "Flag of Paraíba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Para%C3%ADba" },
    ],
  },

  "BR-PI": {
    description:
      "Thirteen green and yellow stripes with a blue canton bearing a white star and the date " +
      "“13 de Março de 1823.” The yellow is mineral wealth and the green hope; the star (Antares) " +
      "stands for Piauí on the national flag, and the date marks the Battle of Jenipapo.",
    sources: [
      { title: "Flag of Piauí — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Piau%C3%AD" },
    ],
  },

  "BR-TO": {
    description:
      "A blue upper and yellow lower triangle split by a white diagonal band bearing a gold sun. The " +
      "sun stands for a land where dawn comes for all, the white for peace, the blue for its waters " +
      "and the gold for mineral wealth.",
    sources: [
      { title: "Flag of Tocantins — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tocantins" },
    ],
  },

  "BR-RO": {
    description:
      "A blue upper half with a white star over a green band, with yellow at the sides. It presents " +
      "Rondônia as “the newest star in the sky of the Union” (the star Muliphein); the blue is the " +
      "sky, the green the roads that opened the state to settlement, and the yellow its resources.",
    sources: [
      { title: "Flag of Rondônia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rond%C3%B4nia" },
    ],
  },

  "BR-AP": {
    description:
      "Horizontal blue, green and yellow bands with a green triangle at the hoist showing the fortress " +
      "of São José de Macapá. Green stands for the rainforest and hope, yellow for the union and the " +
      "soil, blue for justice and the sky, white for peace, and the black line for those who died for " +
      "the region.",
    sources: [
      { title: "Flag of Amapá — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Amap%C3%A1" },
    ],
  },

  "BR-RR": {
    description:
      "Diagonal blue, white and green bands with a narrow red band and a gold star. The green stands " +
      "for the forests, the gold star for mineral wealth (the star Wezen, for Roraima on the national " +
      "flag), the white for peace and the blue for the sky; the red band marks the Equator.",
    sources: [
      { title: "Flag of Roraima — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Roraima" },
    ],
  },

  "BR-DF": {
    description:
      "A white field with a green-and-gold “Cross of Brasília” of four arrows pointing to the cardinal " +
      "directions. The white stands for peace and the vastness of Brazil; the converging arrows " +
      "evoke Indigenous heritage, the central seat of power at Brasília and the Southern Cross.",
    sources: [
      { title: "Flag of the Federal District (Brazil) — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Federal_District_(Brazil)" },
    ],
  },

  "AR-A": {
    description:
      "A burgundy field bearing the provincial arms — a light-blue shield with a Sun of May and a " +
      "six-pointed star, ringed by 23 gold gaucho spurs for the province’s departments. The burgundy " +
      "and black recall the Salta poncho of Güemes’s “Infernales” cavalry in the war of independence. " +
      "Adopted in 1997.",
    sources: [
      { title: "Flag of Salta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Salta_Province" },
    ],
  },

  "AR-B": {
    description:
      "Blue over green, split by a thin red line, with half a sun and sunflower and a half cogwheel. " +
      "The green stands for the farmland, the blue for the rivers, the red for federalism, the " +
      "sunflower for agriculture and the cogwheel for industry. It won a 1997 contest among the " +
      "province’s schoolchildren.",
    sources: [
      { title: "Flag of Buenos Aires Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Province_of_Buenos_Aires" },
    ],
  },

  "AR-E": {
    description:
      "A blue-white-blue field with a red diagonal, based on José Artigas’s flag of the League of the " +
      "Free Peoples. Artigas added the red — the colour of federalism — to Belgrano’s blue and white " +
      "to distinguish his forces during the war of independence.",
    sources: [
      { title: "Flag of Entre Ríos Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Entre_R%C3%ADos_Province" },
    ],
  },

  "AR-F": {
    description:
      "A white field with the city’s coat of arms: a black crowned eagle holding a Calatrava cross, " +
      "with four eaglets at its feet. Established by the city’s founder Juan de Garay in 1580, the " +
      "eagle and crown stand for the Spanish monarchy, the cross for the Order of Calatrava and " +
      "evangelism, and the eaglets for cities founded in the same period.",
    sources: [
      { title: "Flag of Buenos Aires — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Autonomous_City_of_Buenos_Aires" },
    ],
  },

  "AR-G": {
    description:
      "Five vertical light-blue and white stripes with a red central square bearing a golden sun and " +
      "the red Cross of Saint James. The blue and white are the national colours, the red stands for " +
      "the Federalist Party that won the province its autonomy, and the cross for its Spanish and " +
      "Catholic heritage.",
    sources: [
      { title: "Flag of Santiago del Estero Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santiago_del_Estero_Province" },
    ],
  },

  "AR-J": {
    description:
      "A light-blue, white, light-blue triband that uniquely shows different faces: the coat of arms " +
      "on the front and the Sun of May on the back. It was painted by the people of San Juan in 1816 " +
      "as a gift to the Army of the Andes as it formed for the crossing to Chile.",
    sources: [
      { title: "Flag of San Juan Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_San_Juan_Province,_Argentina" },
    ],
  },

  "AR-N": {
    description:
      "A red, blue and white horizontal tricolour in the tradition of Artigas: the red for the blood " +
      "shed for freedom, the blue for the resolve toward a republic and the white for greatness. It " +
      "descends from Andrés Guacurarí’s 1815 adaptation of the League of the Free Peoples flag and " +
      "was restored in 1992.",
    sources: [
      { title: "Flag of Misiones Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Misiones_Province" },
    ],
  },

  "AR-P": {
    description:
      "Light-blue, white and gold horizontal stripes with nine stars and a garland of bay leaves " +
      "marking the Tropic of Capricorn, which crosses the province. It won a provincial competition " +
      "and was adopted in 1991.",
    sources: [
      { title: "Flag of Formosa Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Formosa_Province" },
    ],
  },

  "AR-Q": {
    description:
      "A light-blue, white, light-blue triband (the national colours) with the provincial emblem on " +
      "the white: a monkey-puzzle tree, the Lanín volcano, a poinsettia and sixteen stars for the " +
      "departments, within a laurel wreath. Adopted in 1989.",
    sources: [
      { title: "Flag of Neuquén Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Neuqu%C3%A9n_Province" },
    ],
  },

  "AR-R": {
    description:
      "Blue, white and green horizontal stripes with a black canton of thirteen stars for the " +
      "province’s departments. The blue stands for justice and its water, the black canton for the " +
      "Río Negro (“Black River”) that gives the province its name, the white for unity and the green " +
      "for hope and fertile land.",
    sources: [
      { title: "Flag of Río Negro Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_R%C3%ADo_Negro_Province" },
    ],
  },

  "AR-S": {
    description:
      "A red, white and blue vertical triband with the provincial arms (crossed arrows, a spear and a " +
      "half-sun). The white and blue are the national colours and the red is Artigas’s colour of " +
      "federalism; the design was fixed by Governor Estanislao López in 1822.",
    sources: [
      { title: "Flag of Santa Fe Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santa_Fe_Province" },
    ],
  },

  "AR-T": {
    description:
      "A light-blue stripe between two white ones — a “negative” of the Argentine flag. It reproduces " +
      "a war-of-independence flag of Belgrano, hidden in a church after the 1813 Battle of Ayohuma and " +
      "rediscovered in 1883; the province adopted it in 2010.",
    sources: [
      { title: "Flag of Tucumán — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tucum%C3%A1n" },
    ],
  },

  "AR-W": {
    description:
      "A light-blue, white, light-blue triband with a blue triangle at the hoist, the provincial motto " +
      "and coat of arms. Adopted in 1986, it combines an earlier flag bearing the 1821 arms with " +
      "another carrying an 1823 hoist triangle.",
    sources: [
      { title: "Flag of Corrientes Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Corrientes_Province" },
    ],
  },

  "AR-X": {
    description:
      "A red, white and light-blue triband with a golden Sun of May of 32 rays. The white and blue are " +
      "the national colours and the sun refers both to the Sol de Mayo and to the Jesuit emblem, " +
      "standing for the province’s autonomy and its ties to the League of the Free Peoples.",
    sources: [
      { title: "Flag of Córdoba Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_C%C3%B3rdoba_Province,_Argentina" },
    ],
  },

  "AR-Y": {
    description:
      "A white field with the coat of arms of the Assembly of the Year XIII. This is the very flag " +
      "General Belgrano donated to the city of Jujuy in 1813 to honour its people’s courage at the " +
      "Battles of Tucumán and Salta; it became the provincial flag in 1994.",
    sources: [
      { title: "Flag of Jujuy Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Jujuy_Province" },
    ],
  },

  "AR-Z": {
    description:
      "A flag showing a Sun of May, the peak of Mount Fitz Roy (Cerro Chaltén, sacred to the Aónikenk " +
      "people), waves of the Atlantic and the Southern Cross. It was chosen from 149 entries in a " +
      "competition and adopted in 2000.",
    sources: [
      { title: "Flag of Santa Cruz Province — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santa_Cruz_Province,_Argentina" },
    ],
  },

  "CO-ANT": {
    description:
      "A white band over a green one. The white stands for purity, integrity and triumph and the " +
      "green for the department’s mountains, hope and wealth. The design originated at the University " +
      "of Antioquia and became official in 1962.",
    sources: [
      { title: "Flag of Antioquia Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Antioquia_Department" },
    ],
  },

  "CO-BOL": {
    description:
      "A horizontal tricolour of yellow, green and red. The yellow stands for wealth and abundance, " +
      "the green for hope for the future and the red for valour and the blood of patriots; the flag’s " +
      "precise origin has been lost.",
    sources: [
      { title: "Flag of Bolívar Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bol%C3%ADvar_Department" },
    ],
  },

  "CO-BOY": {
    description:
      "Green, white and red horizontal stripes with the wide red band at the centre. The green stands " +
      "for faith, service and the fertile countryside, the white for love of the homeland and unity, " +
      "and the central red for those who died in the wars of independence — above all at the Battle of " +
      "Boyacá. Adopted 1967–68.",
    sources: [
      { title: "Flag of Boyacá Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Boyac%C3%A1_Department" },
    ],
  },

  "CO-SAN": {
    description:
      "A red stripe at the hoist bearing eight stars, alongside green, gold and black bands. The red " +
      "stands for nobility and bravery, the green for loyalty and hope, and the gold and black for the " +
      "region’s natural resources — gold, coal and petroleum.",
    sources: [
      { title: "Flag of Santander Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Santander_Department" },
    ],
  },

  "CO-MAG": {
    description:
      "Six alternating red and blue bands with a large star formed of thirty small white stars, " +
      "standing for the department’s twenty-nine municipalities and its one district.",
    sources: [
      { title: "Flag of Magdalena Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Magdalena_Department" },
    ],
  },

  "CO-CES": {
    description:
      "A white band between two green bands. The green stands for the department’s fertile vegetation " +
      "and the white for the hope of peace.",
    sources: [
      { title: "Flag of Cesar Department — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cesar_Department" },
    ],
  },

  "BR-RJ": {
    description:
      "A blue and white field bearing the state coat of arms, whose emblems include an eagle and " +
      "mountains. Adopted in 1965, it was kept unchanged after the state merged with Guanabara in 1975.",
    sources: [
      { title: "Flag of Rio de Janeiro — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rio_de_Janeiro_(state)" },
    ],
  },

  "BR-RS": {
    description:
      "Green, red and yellow horizontal stripes with the state arms at the centre. The green and " +
      "yellow stand for Brazil and the red for the revolution and courage of the province; the design " +
      "comes from the flag of the Riograndense Republic of the 1836–45 Farroupilha revolt and was " +
      "re-established in 1966.",
    sources: [
      { title: "Flag of Rio Grande do Sul — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rio_Grande_do_Sul" },
    ],
  },

  "BR-AL": {
    description:
      "A vertical tricolour of red, white and blue — echoing the French flag and the ideals of the " +
      "Revolution — with the state arms at the centre. The arms show three shells for three historic " +
      "towns, three fish for the main lagoons and the fishing industry, sugarcane and cotton, and a " +
      "silver star.",
    sources: [
      { title: "Flag of Alagoas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Alagoas" },
    ],
  },

  "MY-01": {
    description:
      "A navy-blue field with a red canton bearing a white crescent and five-pointed star. The blue " +
      "stands for the state, the red for the warriors who defend Johor, and the crescent and star for " +
      "Islam and the ruler.",
    sources: [
      { title: "Flag of Johor — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Johor" },
    ],
  },

  "MY-02": {
    description:
      "A red field with the state arms at the hoist: a yellow shield for the ruler’s authority, a " +
      "green crescent for Islam and a wreath of rice stalks for the state’s agriculture. Adopted in " +
      "1912.",
    sources: [
      { title: "Flag of Kedah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kedah" },
    ],
  },

  "MY-03": {
    description:
      "A red field with a white emblem of a crescent and star between two kris and spears. The red " +
      "stands for the honesty of the people and ruler and the white for the sanctity of the Sultan; " +
      "the crescent and star are Islam. Adopted in 1924.",
    sources: [
      { title: "Flag of Kelantan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kelantan" },
    ],
  },

  "MY-04": {
    description:
      "Red and white bands with a blue canton bearing a yellow crescent and star — the national " +
      "colours, with the crescent and star for Islam. Adopted in 1957, before Malayan independence.",
    sources: [
      { title: "Flag of Malacca — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malacca" },
    ],
  },

  "MY-05": {
    description:
      "A yellow field with a canton split diagonally, red over black. The yellow stands for the ruler " +
      "(Yang di-Pertuan Besar), the red for the people and the black for the four traditional " +
      "chiefs (undang), reflecting the state’s Minangkabau heritage. Adopted in 1895.",
    sources: [
      { title: "Flag of Negeri Sembilan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Negeri_Sembilan" },
    ],
  },

  "MY-06": {
    description:
      "Two horizontal bands, white over black. The white stands for the Sultan and the black for the " +
      "bendahara (chief minister) and the people. Adopted in 1903.",
    sources: [
      { title: "Flag of Pahang — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pahang" },
    ],
  },

  "MY-07": {
    description:
      "Light-blue, white and yellow vertical bands with an areca-nut palm on the white. The blue " +
      "stands for the sea around the island, the white for peace and the yellow for prosperity.",
    sources: [
      { title: "Flag of Penang — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Penang" },
    ],
  },

  "MY-08": {
    description:
      "Three horizontal bands of white, yellow and black for the royal hierarchy: white for the " +
      "Sultan, yellow for the crown prince (Raja Muda) and black for the next heir (Raja Di Hilir). " +
      "Adopted in 1879.",
    sources: [
      { title: "Flag of Perak — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Perak" },
    ],
  },

  "MY-09": {
    description:
      "A yellow band over a dark-blue one. The yellow stands for the Raja of Perlis and the blue for " +
      "the people; the yellow set above the blue signifies the close bond between ruler and people.",
    sources: [
      { title: "Flag of Perlis — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Perlis" },
    ],
  },

  "MY-10": {
    description:
      "A field quartered red and yellow with a white crescent and star in the canton. The red stands " +
      "for bravery and the yellow for royalty; the crescent and star are Islam. In its current form " +
      "since 1965.",
    sources: [
      { title: "Flag of Selangor — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Selangor" },
    ],
  },

  "MY-11": {
    description:
      "A black field within a thick white border, with a white crescent and star at the centre. The " +
      "white stands for the Sultan and the black for the people; the white border represents the " +
      "Sultan’s duty to protect his subjects, and the crescent and star are Islam. Adopted in 1953.",
    sources: [
      { title: "Flag of Terengganu — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Terengganu" },
    ],
  },

  "MY-12": {
    description:
      "Horizontal blue, white and red bands with a dark-blue silhouette of Mount Kinabalu on a " +
      "light-blue canton. The blues stand for peace, unity and strength, the white for purity and " +
      "justice and the red for courage; Mount Kinabalu represents the state. Adopted in 1988.",
    sources: [
      { title: "Flag of Sabah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sabah" },
    ],
  },

  "MY-13": {
    description:
      "Called Ibu Pertiwi (“Motherland”): a yellow field crossed by black and red diagonal bars with " +
      "a yellow nine-pointed star. The yellow stands for the rule of law and unity, the red for " +
      "courage and the black for natural resources; the nine points recall Sarawak’s original nine " +
      "divisions. Adopted in 1988.",
    sources: [
      { title: "Flag of Sarawak — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sarawak" },
    ],
  },

  "MY-14": {
    description:
      "A blue field with red and white stripes and a yellow crescent and fourteen-pointed star — a " +
      "variant of the national flag for the federal capital. The red stands for courage, the blue for " +
      "the unity of its people, the yellow for sovereignty and the white for cleanliness. Adopted in " +
      "1990.",
    sources: [
      { title: "Flag of Kuala Lumpur — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kuala_Lumpur" },
    ],
  },

  "MY-15": {
    description:
      "Three equal horizontal bands of red, white and blue, with a yellow crescent and fourteen-pointed " +
      "star on the white. The red stands for courage — Labuan becoming a Federal Territory within the " +
      "Federation of Malaysia; the white for purity, sincerity and earnestness; the blue for the unity of " +
      "a multiracial people living together in peace and prosperity; and the yellow for the sovereignty " +
      "of the constitutional monarchy and for upholding the Rukun Negara, the national philosophy. The " +
      "crescent and star stand for Islam as the official religion, and the star's fourteen points for " +
      "the states and the federal government united in the Federation.",
    sources: [
      {
        title: "Identiti, Bendera dan jata Labuan — Wikipedia Bahasa Melayu",
        url: "https://ms.wikipedia.org/wiki/Identiti,_Bendera_dan_jata_Labuan",
      },
      {
        title: "Labuan (Malaysia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-labua.html",
      },
    ],
  },

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
      {
        title: "Putrajaya (Malaysia) — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/my-pj.html",
      },
    ],
  },

  "DE-BW": {
    description:
      "A black band over a gold one. The colours were drawn in 1952 from the flags of the states that " +
      "merged to form Baden-Württemberg — Baden’s yellow-and-red and Württemberg’s black-and-red.",
    sources: [
      { title: "Flag of Baden-Württemberg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Baden-W%C3%BCrttemberg" },
    ],
  },

  "DE-BY": {
    description:
      "White and blue, shown either as horizontal bands or as a field of lozenges. Both are the " +
      "colours of the Wittelsbach dynasty, which ruled Bavaria from 1180 to 1918; the lozenge " +
      "pattern’s exact origin is disputed.",
    sources: [
      { title: "Flag of Bavaria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bavaria" },
    ],
  },

  "DE-BE": {
    description:
      "A white field with red stripes at top and bottom and a black bear striding across it. The bear " +
      "is a canting emblem for Berlin, used on the city’s seals and coins since the late 12th century.",
    sources: [
      { title: "Flag of Berlin — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Berlin" },
    ],
  },

  "DE-BB": {
    description:
      "A red band over a white one, with the red eagle (the Märkischer Adler) on the state flag. The " +
      "red and white are the historic colours of the Margraviate of Brandenburg, restored when the " +
      "state was re-established in 1990.",
    sources: [
      { title: "Flag of Brandenburg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Brandenburg" },
    ],
  },

  "DE-HB": {
    description:
      "The Speckflagge (“bacon flag”): at least eight alternating red and white horizontal stripes, " +
      "checked at the hoist. The red and white are Bremen’s Hanseatic colours; the origin of the " +
      "colours themselves is not documented.",
    sources: [
      { title: "Flag of Bremen — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bremen" },
    ],
  },

  "DE-HH": {
    description:
      "A red field with a white three-towered castle, the arms of the Hanseatic city of Hamburg. The " +
      "castle appears on the city’s seals from as early as 1241 and became the flag design in 1751.",
    sources: [
      { title: "Flag of Hamburg — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hamburg" },
    ],
  },

  "DE-HE": {
    description:
      "A red band over a white one, from the red-and-white barry lion of the Ludowingian dynasty, " +
      "which passed to the House of Hesse in 1247.",
    sources: [
      { title: "Flag of Hesse — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hesse" },
    ],
  },

  "DE-MV": {
    description:
      "Five horizontal stripes — blue, white, yellow, white and red — designed in 1991 to combine the " +
      "blue-and-white of Western Pomerania with the blue-yellow-red of Mecklenburg, the two regions " +
      "that make up the state.",
    sources: [
      { title: "Flag of Mecklenburg-Vorpommern — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Mecklenburg-Vorpommern" },
    ],
  },

  "DE-NI": {
    description:
      "The German black-red-gold with the state arms — a white Saxon steed on red — toward the hoist. " +
      "Adopted in 1951 as a neutral flag for a state assembled from the formerly separate lands of " +
      "Hanover, Brunswick, Oldenburg and Schaumburg-Lippe.",
    sources: [
      { title: "Flag of Lower Saxony — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Lower_Saxony" },
    ],
  },

  "DE-NW": {
    description:
      "A horizontal tricolour of green, white and red, combining the colours of the former Prussian " +
      "provinces the state was built from — the Rhineland and Westphalia. The state arms show the " +
      "Rhine, the Westphalian horse and the rose of Lippe.",
    sources: [
      { title: "Flag of North Rhine-Westphalia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Rhine-Westphalia" },
    ],
  },

  "DE-RP": {
    description:
      "The German black-red-gold tricolour with the state coat of arms in the upper hoist. Adopted in " +
      "1948.",
    sources: [
      { title: "Flag of Rhineland-Palatinate — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Rhineland-Palatinate" },
    ],
  },

  "DE-SL": {
    description:
      "The German black-red-gold tricolour bearing the arms of Saarland, whose quarters stand for the " +
      "four historic territories of the region — Nassau-Saarbrücken, the Archbishopric of Trier, the " +
      "Duchy of Lorraine and Palatinate-Zweibrücken.",
    sources: [
      { title: "Flag of Saarland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saarland" },
    ],
  },

  "DE-SN": {
    description:
      "A white band over a green one — the colours established for the Kingdom of Saxony in 1815. No " +
      "deeper symbolism is documented beyond their long use as the state colours.",
    sources: [
      { title: "Flag of Saxony — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saxony" },
    ],
  },

  "DE-ST": {
    description:
      "A yellow band over a black one, from the black-and-yellow of the former Prussian Province of " +
      "Saxony; the order was reversed in 1991 to avoid confusion with Baden-Württemberg.",
    sources: [
      { title: "Flag of Saxony-Anhalt — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saxony-Anhalt" },
    ],
  },

  "DE-SH": {
    description:
      "A horizontal tricolour of blue, white and red, combining the colours of Schleswig (blue, with " +
      "two lions) and Holstein (red and white, with a nettle leaf), the two duchies that make up the " +
      "state.",
    sources: [
      { title: "Flag of Schleswig-Holstein — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Schleswig-Holstein" },
    ],
  },

  "DE-TH": {
    description:
      "A white band over a red one, from the heraldic colours of the Ludowingian rulers of the " +
      "medieval Landgraviate of Thuringia.",
    sources: [
      { title: "Flag of Thuringia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Thuringia" },
    ],
  },

  "US-CA": {
    description:
      "The Bear Flag: a California grizzly walking on a patch of grass, with a red star, a red bottom " +
      "stripe and the words “California Republic” on a white field. It descends from the banner of the " +
      "1846 Bear Flag Revolt; the red star echoes an earlier 1836 “Lone Star” independence flag.",
    sources: [
      { title: "Flag of California — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_California" },
    ],
  },

  "US-WA": {
    description:
      "A green field with the state seal bearing a portrait of George Washington — the only U.S. state " +
      "flag with a green field and the only one depicting a president. The green stands for the " +
      "forests of western Washington and the gold seal for the wheat country of the east. Adopted 1923.",
    sources: [
      { title: "Flag of Washington — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Washington_(state)" },
    ],
  },

  "US-OR": {
    description:
      "A navy-blue flag with the state seal and 33 stars (Oregon being the 33rd state) on the front " +
      "and a gold beaver, the state animal, on the back — the last U.S. state flag with a different " +
      "design on each side.",
    sources: [
      { title: "Flag of Oregon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Oregon" },
    ],
  },

  "US-NJ": {
    description:
      "A buff (tan) field with the state arms — the goddesses Liberty and Ceres flanking a shield of " +
      "three ploughs, beneath a horse’s head. The buff colour comes from the facings George Washington " +
      "ordered in 1779 for the uniforms of the New Jersey Continental Line.",
    sources: [
      { title: "Flag of New Jersey — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Jersey" },
    ],
  },

  "US-WY": {
    description:
      "A blue field with white and red borders and a white bison branded with the state seal. The " +
      "bison is the “monarch of the plains,” the red border honours Native Americans and the pioneers, " +
      "and the blue stands for fidelity and justice. Adopted 1917.",
    sources: [
      { title: "Flag of Wyoming — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wyoming" },
    ],
  },

  "US-NY": {
    description:
      "A dark-blue field with the state arms: Liberty (treading on a crown) and Justice flanking a " +
      "Hudson River landscape, beneath the motto “Excelsior” (“ever upward”).",
    sources: [
      { title: "Flag of New York — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_York_(state)" },
    ],
  },

  "US-VT": {
    description:
      "A blue field with the state arms — a pine tree, a red cow and sheaves of wheat, the Green " +
      "Mountains and a deer’s head — standing for the state’s forests, farming and wildlife. Adopted " +
      "1923.",
    sources: [
      { title: "Flag of Vermont — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vermont" },
    ],
  },

  "US-FL": {
    description:
      "A white field with a red saltire and the state seal (a Seminole woman scattering flowers, a " +
      "steamboat, a sabal palm and sun rays). The red bars were added by amendment in 1900; no single " +
      "reason for them was ever documented.",
    sources: [
      { title: "Flag of Florida — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Florida" },
    ],
  },

  "US-KS": {
    description:
      "A blue field with the state seal — a sunflower above a scene of a rising sun, a steamboat, " +
      "wagon trains and bison — beneath 34 stars for Kansas as the 34th state and the motto “Ad astra " +
      "per aspera” (“to the stars through difficulties”).",
    sources: [
      { title: "Flag of Kansas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kansas" },
    ],
  },

  "US-LA": {
    description:
      "A blue field with a white pelican tearing its breast to feed its young (with three drops of " +
      "blood) and the motto “Union, Justice, Confidence.” The “pelican in her piety” is an old " +
      "symbol of self-sacrifice and devotion.",
    sources: [
      { title: "Flag of Louisiana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Louisiana" },
    ],
  },

  "US-MA": {
    description:
      "A white field bearing the state arms — an Algonquian figure holding a bow with a downward " +
      "(peaceful) arrow and a single star for statehood. A public redesign process was under way as " +
      "of 2024.",
    sources: [
      { title: "Flag of Massachusetts — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Massachusetts" },
    ],
  },

  "US-PA": {
    description:
      "A blue field with the state arms: a ship for commerce, a plough for agriculture and three wheat " +
      "sheaves for prosperity, flanked by two horses and topped by an eagle, with the motto “Virtue, " +
      "Liberty and Independence.”",
    sources: [
      { title: "Flag of Pennsylvania — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Pennsylvania" },
    ],
  },

  "US-MI": {
    description:
      "A blue field with the state arms — an elk and a moose flanking a shield of a sunrise over a " +
      "peninsula, a bald eagle above — with the mottos “Tuebor” (“I will defend”) and “Si quaeris " +
      "peninsulam amoenam circumspice” (“If you seek a pleasant peninsula, look about you”).",
    sources: [
      { title: "Flag of Michigan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Michigan" },
    ],
  },

  "US-ME": {
    description:
      "A blue field with the state arms — a farmer and a sailor beside a shield showing a moose " +
      "resting under a pine tree — with the North Star and the motto “Dirigo” (“I lead”).",
    sources: [
      { title: "Flag of Maine — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Maine" },
    ],
  },

  "US-CT": {
    description:
      "A blue field with a white shield of three grapevines and the motto “Qui transtulit sustinet” " +
      "(“He who transplanted sustains”), recalling the colony’s founding settlers.",
    sources: [
      { title: "Flag of Connecticut — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Connecticut" },
    ],
  },

  "US-IL": {
    description:
      "A white field with the Great Seal of Illinois — a bald eagle on a boulder holding a shield of " +
      "stars and stripes, with the dates 1818 and 1868 and the motto “State Sovereignty, National " +
      "Union.”",
    sources: [
      { title: "Flag of Illinois — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Illinois" },
    ],
  },

  "US-VA": {
    description:
      "A blue field with the state seal — Virtus, personifying virtue, standing over a defeated tyrant " +
      "— beneath the motto “Sic Semper Tyrannis” (“Thus always to tyrants”).",
    sources: [
      { title: "Flag of Virginia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Virginia" },
    ],
  },

  "US-MO": {
    description:
      "Red, white and blue horizontal stripes with the state arms in a blue band of 24 stars, for " +
      "Missouri as the 24th state. Red stands for valour, white for purity and blue for vigilance and " +
      "justice; the tricolour also recalls the state’s French Louisiana heritage.",
    sources: [
      { title: "Flag of Missouri — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Missouri" },
    ],
  },

  "US-DE": {
    description:
      "A colonial-blue field with a buff diamond bearing the state arms (a ship, an ox, wheat, a " +
      "farmer and a soldier) and the date December 7, 1787 — the day Delaware became the first state " +
      "to ratify the Constitution. The colours recall Washington’s uniform.",
    sources: [
      { title: "Flag of Delaware — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Delaware" },
    ],
  },

  "US-WI": {
    description:
      "A blue field with the state arms — a sailor and a yeoman flanking a shield of a plough, tools " +
      "and an anchor for farming, mining, manufacturing and navigation — with the motto “Forward” and " +
      "a badger crest.",
    sources: [
      { title: "Flag of Wisconsin — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wisconsin" },
    ],
  },

  "US-OK": {
    description:
      "A sky-blue field with an Osage buffalo-skin war shield hung with seven eagle feathers, crossed " +
      "by a peace pipe and an olive branch. The shield covered by symbols of peace expresses a united " +
      "people’s love of peace.",
    sources: [
      { title: "Flag of Oklahoma — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Oklahoma" },
    ],
  },

  "US-NV": {
    description:
      "A cobalt-blue field with a silver star, sprays of sagebrush and a gold scroll reading “Battle " +
      "Born.” The motto recalls Nevada’s admission during the Civil War (1864) and the silver star its " +
      "nickname, the Silver State.",
    sources: [
      { title: "Flag of Nevada — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nevada" },
    ],
  },

  "US-SD": {
    description:
      "A sky-blue field with the state seal ringed by golden sun-rays and the words “South Dakota — " +
      "The Mount Rushmore State.” The sun stands for the state’s plentiful sunshine and the seal for " +
      "its farming, mining and river trade.",
    sources: [
      { title: "Flag of South Dakota — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Dakota" },
    ],
  },

  "US-MT": {
    description:
      "A blue field with the Great Seal — mountains and the Great Falls of the Missouri, with a " +
      "plough, pick and shovel for agriculture and mining — beneath the motto “Oro y Plata” (“Gold " +
      "and Silver”).",
    sources: [
      { title: "Flag of Montana — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Montana" },
    ],
  },

  "US-ID": {
    description:
      "A blue field with the state seal — the only U.S. state seal designed by a woman, Emma Edwards " +
      "Green — showing a miner and a woman for equality, liberty and justice, an elk’s head, and the " +
      "motto “Esto Perpetua” (“Let it be perpetual”).",
    sources: [
      { title: "Flag of Idaho — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Idaho" },
    ],
  },

  "US-ND": {
    description:
      "A blue field with a bald eagle holding an olive branch and a sheaf of seven arrows, copied from " +
      "the regimental banner carried by North Dakota troops in the Spanish-American and " +
      "Philippine-American Wars.",
    sources: [
      { title: "Flag of North Dakota — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_North_Dakota" },
    ],
  },

  "US-NE": {
    description:
      "A blue field with the state seal — a blacksmith, a steamboat on the Missouri, sheaves of wheat " +
      "and a railroad running toward the Rocky Mountains — beneath the motto “Equality Before the " +
      "Law.”",
    sources: [
      { title: "Flag of Nebraska — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Nebraska" },
    ],
  },

  "US-WV": {
    description:
      "A white field with a blue border and the state arms: a farmer and a miner beside a boulder " +
      "dated June 20, 1863 (statehood), with crossed rifles and a liberty cap, wreathed in " +
      "rhododendron and the motto “Montani Semper Liberi” (“Mountaineers Are Always Free”).",
    sources: [
      { title: "Flag of West Virginia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_West_Virginia" },
    ],
  },

  "US-KY": {
    description:
      "A blue field with the state seal — two men embracing beneath the motto “United We Stand, " +
      "Divided We Fall,” with sprigs of goldenrod. The figures stand for the unity of frontiersmen " +
      "and statesmen (popularly, though not officially, Daniel Boone and Henry Clay).",
    sources: [
      { title: "Flag of Kentucky — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kentucky" },
    ],
  },

  "US-IA": {
    description:
      "A blue, white and red vertical tricolour recalling the French flag and Iowa’s French colonial " +
      "heritage, with an eagle bearing the motto “Our Liberties We Prize and Our Rights We Will " +
      "Maintain.” Blue stands for loyalty and justice, white for purity and red for courage.",
    sources: [
      { title: "Flag of Iowa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Iowa" },
    ],
  },

  "US-NH": {
    description:
      "A blue field with the state seal — the frigate Raleigh under construction at Portsmouth beside " +
      "a granite boulder — ringed by a laurel wreath and nine stars for New Hampshire as the ninth " +
      "state to ratify the Constitution.",
    sources: [
      { title: "Flag of New Hampshire — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_New_Hampshire" },
    ],
  },

  "US-MP": {
    description:
      "A dark-blue field, for the Pacific Ocean, with a white star for the United States over a grey " +
      "latte stone representing the Chamorro people, all encircled by a mwarmwar flower garland for " +
      "the Carolinian people. Adopted in 1985.",
    sources: [
      { title: "Flag of the Northern Mariana Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Northern_Mariana_Islands" },
    ],
  },

  "JP-13": {
    description:
      "An Edo-purple field bearing the white Tokyo Metropolitan crest — a six-rayed sun with a dot at " +
      "the centre, marking Tokyo as the metaphorical heart of Japan and its rays as development in all " +
      "directions. Adopted in 1964.",
    sources: [
      { title: "Flag of Tokyo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tokyo" },
    ],
  },

  "JP-01": {
    description:
      "A navy-blue field with a red seven-pointed star. The star, a modern reworking of the historic " +
      "seven-pointed “North Star,” stands for Hokkaido’s pioneering spirit; the blue represents the " +
      "northern seas and sky and the white the region’s snow. Adopted in 1967.",
    sources: [
      { title: "Flag of Hokkaido — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hokkaido" },
    ],
  },

  "JP-34": {
    description:
      "A crimson field with a white stylised katakana “ヒ” (hi, for Hiroshima); the emblem’s " +
      "overlapping circles express the prefecture’s growth and development.",
    sources: [
      { title: "Flag of Hiroshima Prefecture — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hiroshima_Prefecture" },
    ],
  },

  "JP-47": {
    description:
      "A white field with three stacked circles, red around white around red. The emblem stands for " +
      "the ocean, peace and development, with the central white circle forming the letter “O” for " +
      "Okinawa.",
    sources: [
      { title: "Flag of Okinawa Prefecture — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Okinawa_Prefecture" },
    ],
  },


  "JP-11": {
    description:
      "A white field bearing a red disc formed of 16 comma-shaped magatama jewels arranged in a ring. " +
      "The magatama allude to the “saki-mitama” (fortunate spirit) from which the name Saitama derives, " +
      "and the emblem as a whole stands for the sun, development, passion and strength. Adopted 1964.",
    sources: [
      { title: "埼玉県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%9F%BC%E7%8E%89%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-16": {
    description:
      "A white field with a green emblem: the hiragana “と” (to) set within the outline of Mount " +
      "Tateyama, expressing the prefecture’s leap toward the great sky. The emblem was designated 1957; " +
      "the current white-ground version has been used since 1989.",
    sources: [
      { title: "富山県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%AF%8C%E5%B1%B1%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-19": {
    description:
      "A purple field — for the prefecture’s grapes — with a white trapezoid evoking the silhouette of " +
      "Mount Fuji, standing for purity and honest nature. Within it, three “人” (person) characters form " +
      "the kanji “山” (mountain), and curved lines express flow and endless advancement. Adopted 1966.",
    sources: [
      { title: "山梨県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B1%B1%E6%A2%A8%E7%9C%8C%E6%97%97" },
    ],
  },


  "JP-22": {
    description:
      "A blue field — for the sky and the Pacific — bearing a stylised map of the prefecture: Mount " +
      "Fuji, the Izu Peninsula, Suruga Bay and Cape Omaezaki. The orange stands for bright sunlight and " +
      "the passion and unity of the people. Chosen from 6,915 public entries; adopted 1968.",
    sources: [
      { title: "静岡県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%9D%99%E5%B2%A1%E7%9C%8C%E6%97%97" },
    ],
  },




  "JP-29": {
    description:
      "A white field with a dark-red emblem based on the kana “ナ” (na): the outer ring stands for the " +
      "nature of “Mahoroba” Yamato and the inner ring for the spirit of harmony (“wa”) from Prince " +
      "Shōtoku’s Seventeen-Article Constitution; the horizontal axis expresses ceaseless progress in " +
      "government. Adopted 1968.",
    sources: [
      { title: "奈良県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%A5%88%E8%89%AF%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-32": {
    description:
      "A brown field with a gold emblem: four kana “マ” (ma) combined to read “Shima” (island) and form " +
      "a cloud-shaped ring, standing for the unity of the people and the prefecture’s harmonious " +
      "development. Adopted 1968.",
    sources: [
      { title: "島根県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B3%B6%E6%A0%B9%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-36": {
    description:
      "An indigo field — for Tokushima’s famous indigo dyeing — with a yellow emblem based on the kana " +
      "“とく” (toku) in an Asuka-period style, standing for the prefecture’s harmony, unity, soaring " +
      "spirit and development. Adopted 1966.",
    sources: [
      { title: "徳島県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%BE%B3%E5%B3%B6%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-39": {
    description:
      "A maroon field with a white circular emblem combining the “土” of the old province name Tosa, the " +
      "kana for “tosa,” and the “こ” of Kōchi; a sword-point rising from the circle signifies progress " +
      "while the ring stands for peace and cooperation. Adopted 1953.",
    sources: [
      { title: "高知県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%AB%98%E7%9F%A5%E7%9C%8C%E6%97%97" },
    ],
  },




  "JP-43": {
    description:
      "An eggplant-brown field with a white emblem: the kana “ク” (ku) shaped like the island of Kyūshū, " +
      "with an inner circle marking Kumamoto’s position at its centre. Adopted 1966.",
    sources: [
      { title: "熊本県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%86%8A%E6%9C%AC%E7%9C%8C%E6%97%97" },
    ],
  },



  "JP-46": {
    description:
      "A white field with a red-and-black emblem: the Satsuma and Ōsumi peninsulas stylised into a " +
      "circle with an indentation for Shibushi Bay, and a red disc at the centre for the volcano " +
      "Sakurajima. Adopted 1967.",
    sources: [
      { title: "鹿児島県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%B9%BF%E5%85%90%E5%B3%B6%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-27": {
    description:
      "A blue field with a white emblem based on the letter “O,” derived from Toyotomi Hideyoshi’s " +
      "gourd-shaped battle standard; its branching form expresses hope, prosperity and harmony. " +
      "Adopted in 1968 (blue field from 1984).",
    sources: [
      { title: "大阪府旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%A4%A7%E9%98%AA%E5%BA%9C%E6%97%97" },
    ],
  },

  "JP-26": {
    description:
      "A reddish-purple field with a stylised character “京” (Kyō) formed as a human figure among six " +
      "petals, representing the unity and strength of the prefecture’s people. Adopted in 1976.",
    sources: [
      { title: "京都府旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E9%83%BD%E5%BA%9C%E6%97%97" },
    ],
  },

  "JP-23": {
    description:
      "A crimson field with a white emblem stylising the kana あ・い・ち (a-i-chi) as rising, sun-lit " +
      "wave crests, expressing the Pacific-facing prefecture’s drive toward international development. " +
      "Adopted in 1950.",
    sources: [
      { title: "愛知県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%84%9B%E7%9F%A5%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-14": {
    description:
      "A red-and-white flag whose white central emblem is the kanji “神” (kami) of Kanagawa rendered " +
      "in a symmetrical, stylised form. Adopted in 1948.",
    sources: [
      { title: "神奈川県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-20": {
    description:
      "An orange field with a white emblem — the katakana “ナ” (na) drawn as a bird flying over a " +
      "mountain lake. The orange stands for sunlight on the land and the white for the snow of “the " +
      "roof of Japan” and the honest character of its people. Adopted in 1967.",
    sources: [
      { title: "長野県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%95%B7%E9%87%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-02": {
    description:
      "A white field with a deep-green emblem shaped like the outline of the prefecture. The white " +
      "stands for an infinitely expanding universe and the green for ceaseless hope and progress. " +
      "Adopted in 1961.",
    sources: [
      { title: "青森県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%9D%92%E6%A3%AE%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-03": {
    description:
      "A greenish-grey field with a white stylised kanji “岩” (iwa, “rock”), expressing the " +
      "prefecture’s progress toward a prosperous, comfortable homeland. Adopted in 1965.",
    sources: [
      { title: "岩手県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B2%A9%E6%89%8B%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-04": {
    description:
      "A blue-green field with a white emblem stylising the kana “み” (mi) from the leaf of the " +
      "Japanese bush clover, the prefectural flower; its three leaves stand for eternal development, " +
      "the people’s harmony and love of homeland. Adopted in 1966.",
    sources: [
      { title: "宮城県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%AE%AE%E5%9F%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-05": {
    description:
      "A white field with a reddish-brown katakana “ア” (a), its dynamic form expressing the " +
      "prefecture’s leap forward and development. Adopted in 1959.",
    sources: [
      { title: "秋田県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A7%8B%E7%94%B0%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-06": {
    description:
      "A blue field with a white emblem of three peaks, standing for the kanji “山” (mountain) and the " +
      "Mogami River; the white evokes the snow and frost-flowers of Mount Zao and the honest " +
      "character of residents. Adopted in 1971.",
    sources: [
      { title: "山形県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B1%B1%E5%BD%A2%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-07": {
    description:
      "An orange-red field with a white circular emblem stylising the kana “ふ” (fu), representing " +
      "civic harmony and unity and the prefecture’s progress (its shape also evoking a peach). " +
      "Adopted in 1968.",
    sources: [
      { title: "福島県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B3%B6%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-08": {
    description:
      "A blue field with a white spiral emblem stylising a rosebud, the prefectural flower, expressing " +
      "advancement, creativity, dynamism and development. Adopted in 1991.",
    sources: [
      { title: "茨城県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E8%8C%A8%E5%9F%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-09": {
    description:
      "A yellow-green field with a white emblem stylising the kanji “栃” with an archaic “木” (tree) " +
      "radical, expressing dynamic, energetic advancement. Adopted in 1964.",
    sources: [
      { title: "栃木県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%A0%83%E6%9C%A8%E7%9C%8C%E6%97%97" },
    ],
  },






















  "RU-AL": {
    description:
      "Horizontal bands of white and blue separated by narrow white and blue stripes. Blue stands for " +
      "the purity of Altai’s sky, mountains, rivers and lakes; white for eternity, the striving for " +
      "rebirth, and the love and accord of the peoples of the Altai Republic. First adopted 1992.",
    sources: [
      { title: "Флаг Республики Алтай — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8_%D0%90%D0%BB%D1%82%D0%B0%D0%B9" },
    ],
  },



  "RU-ARK": {
    description:
      "A white field crossed diagonally by an azure saltire, with the region’s coat of arms at the " +
      "centre. Adopted 2009 — though critics note the blue saltire echoes the naval St Andrew’s cross " +
      "rather than the Archangel Michael for whom the region is named, and it has not received federal " +
      "heraldic registration.",
    sources: [
      { title: "Флаг Архангельской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D1%80%D1%85%D0%B0%D0%BD%D0%B3%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },



  "RU-BEL": {
    description:
      "A blue cross divides the field into four quarters — white, red, green and black — with the " +
      "region’s coat of arms in the white quarter. White stands for the chalk deposits and dairy and " +
      "sugar production; red for the blood shed by defenders of the frontier from the 16th–20th " +
      "centuries; green for the fertility of the land; black for the rich chernozem soil and minerals. " +
      "Adopted 2000.",
    sources: [
      { title: "Флаг Белгородской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D0%B5%D0%BB%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-BRY": {
    description:
      "A burgundy field bearing the region’s coat of arms. The burgundy recalls the colour of the " +
      "banners under which the army and partisans fought to liberate the Bryansk region during the " +
      "Second World War. Adopted 1998.",
    sources: [
      { title: "Флаг Брянской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D1%80%D1%8F%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },



  "RU-CHE": {
    description:
      "A red field with a narrow yellow stripe low across it, bearing a white camel laden with yellow " +
      "packs. The camel — an enduring, noble beast — stands for wisdom, patience and fidelity; red for " +
      "life, courage and the region’s metallurgy; the yellow stripe for the Ural Mountains and their " +
      "mineral wealth; white for nobility and justice. Adopted 2001.",
    sources: [
      { title: "Флаг Челябинской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D0%B5%D0%BB%D1%8F%D0%B1%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },



  "RU-DA": {
    description:
      "Three equal horizontal bands of green, blue and red. Green stands for the fertility of the land " +
      "and for Islam; blue for the Caspian Sea and the greatness of the Dagestani people; red for " +
      "democracy, reason and the courage of the people of this mountain country. Adopted 2003.",
    sources: [
      { title: "Флаг Дагестана — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%94%D0%B0%D0%B3%D0%B5%D1%81%D1%82%D0%B0%D0%BD%D0%B0" },
    ],
  },




  "RU-KAM": {
    description:
      "A white-over-blue field with an emblem in the hoist: three black volcanoes with silver, flaming " +
      "peaks and, behind them, a red-and-silver rising sun ringed by an indigenous ornament of red and " +
      "blue triangles. The volcanoes and rising sun evoke Kamchatka’s active volcanic landscape and its " +
      "peoples. Adopted 2010.",
    sources: [
      { title: "Флаг Камчатского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BC%D1%87%D0%B0%D1%82%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },



  "RU-KDA": {
    description:
      "Three horizontal bands of blue, crimson and green with the krai’s gold coat of arms at the " +
      "centre. The colours repeat those of the flag of the Kuban People’s Republic, regarded as the " +
      "national flag of the Kuban Cossacks. Adopted 1995.",
    sources: [
      { title: "Флаг Краснодарского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-AD": {
    description:
      "A green field charged with twelve gold stars and three crossed gold arrows; nine stars form a " +
      "bow-like arc and three sit in a row. Green stands for life, nature and Islam; gold for a bright " +
      "peaceful future and an abundant grain harvest. The twelve stars are the twelve historical " +
      "provinces of Circassia and the three arrows their unity and martial spirit. Based on a historic " +
      "Circassian flag; adopted 1992.",
    sources: [
      { title: "Флаг Адыгеи — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D0%B4%D1%8B%D0%B3%D0%B5%D0%B8" },
    ],
  },

  "RU-ALT": {
    description:
      "A red field with a blue vertical band at the hoist bearing a stylised yellow ear of wheat, and " +
      "the krai’s coat of arms at the centre. The wheat ear stands for agriculture, the region’s " +
      "leading economic sector; the layout derives from the 1954 RSFSR flag. Adopted 2000.",
    sources: [
      { title: "Флаг Алтайского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D0%BB%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-AMU": {
    description:
      "A broad red band over a white wavy stripe and a blue band. Red stands for the rich history of " +
      "the Amur region and the martial and labour feats of its people; the blue band, with its four " +
      "waves, for the waters and the might of the great Amur River along the region’s southern border. " +
      "Adopted 1999 (present form 2008).",
    sources: [
      { title: "Флаг Амурской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D0%BC%D1%83%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-AST": {
    description:
      "A light-blue field bearing a gold royal crown — an arch of three leaf-shaped points over a gold " +
      "mitre topped by an orb and cross — above a silver eastern sabre with a gold hilt, point to the " +
      "fly. These are the historic charges of Astrakhan’s arms. Adopted 2001; the law gives the " +
      "heraldic description without assigning a separate meaning to each element.",
    sources: [
      { title: "Флаг Астраханской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%90%D1%81%D1%82%D1%80%D0%B0%D1%85%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-BA": {
    description:
      "Three horizontal bands of blue, white and green with a gold ring at the centre enclosing a " +
      "seven-petalled kurai flower. Blue stands for clarity, virtue and purity of thought; white for " +
      "peace, openness and readiness to cooperate; green for freedom and the eternity of life. The " +
      "kurai is a symbol of friendship, its seven petals the seven clans that founded the unity of the " +
      "peoples of Bashkortostan. Adopted 1992.",
    sources: [
      { title: "Флаг Башкортостана — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D0%B0%D1%88%D0%BA%D0%BE%D1%80%D1%82%D0%BE%D1%81%D1%82%D0%B0%D0%BD%D0%B0" },
    ],
  },

  "RU-BU": {
    description:
      "Horizontal bands of blue, white and yellow, with a gold Soyombo — crescent, sun and three " +
      "flames — in the hoist. Blue is the national colour of the Buryats and the Eternal Blue Sky " +
      "(Khukhe Munkhe Tengri), standing for fidelity; white for high morals, happiness, peace and " +
      "unity; gold for the spiritual principle and Tibetan Buddhism. The three flames mean past, " +
      "present and future generations. Adopted 1992.",
    sources: [
      { title: "Флаг Бурятии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%91%D1%83%D1%80%D1%8F%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-CE": {
    description:
      "Horizontal bands of green, white and red with a white vertical band of Chechen national " +
      "ornament at the hoist, the whole edged in gold fringe. The design was modelled on the flag of " +
      "Tatarstan; the article gives the layout but no official per-colour meaning. Adopted 2004.",
    sources: [
      { title: "Флаг Чечни — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D0%B5%D1%87%D0%BD%D0%B8" },
    ],
  },

  "RU-CHU": {
    description:
      "A blue field with a white triangle based on the hoist enclosing a yellow ring around the Russian " +
      "national colours. The triangle is the Chukotka Peninsula, Russia’s far north-eastern extremity; " +
      "white the Arctic snows and clean fragile land; blue the two oceans — Arctic and Pacific — that " +
      "wash it; the yellow ring the sun that rises first over Russia here, an indigenous drum (yarar), " +
      "and the region’s gold mining. Adopted 1997.",
    sources: [
      { title: "Флаг Чукотского автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D1%83%D0%BA%D0%BE%D1%82%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-CU": {
    description:
      "A field of yellow over a narrow dark-red band along the foot, charged with the dark-red “Tree of " +
      "Life” and, above it, “Three Suns.” Yellow is the sun-filled space of the Chuvash people (and in " +
      "heraldry wealth, justice and strength); dark red the Chuvash land. The Tree of Life expresses the " +
      "people’s striving for spiritual harmony and the unity of peoples; the three eight-pointed suns " +
      "mean “Were, Are, Will Be.” Adopted 1992.",
    sources: [
      { title: "Флаг Чувашии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A7%D1%83%D0%B2%D0%B0%D1%88%D0%B8%D0%B8" },
    ],
  },

  "RU-IN": {
    description:
      "A white field with a green stripe along the top and bottom edges and a red solar sign of three " +
      "curved rays at the centre. White stands for the purity of the people’s thoughts and deeds; green " +
      "for the awakening of nature, the land’s fertility and Islam; red for their centuries-long " +
      "struggle to survive on their ancestral land in peace. The sun’s three rays turn with the Earth, " +
      "meaning eternal motion, creation and prosperity. Designed 1993, adopted 1999.",
    sources: [
      { title: "Флаг Ингушетии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%98%D0%BD%D0%B3%D1%83%D1%88%D0%B5%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-IRK": {
    description:
      "Vertical bands of blue, white and blue, the white one bearing a black babr (a legendary Siberian " +
      "tiger) running toward the hoist with a red sable in its jaws within an open green cedar wreath. " +
      "Blue stands for the region’s waters — Lake Baikal and the Angara; white for purity, modesty and " +
      "Siberian snows; the green cedar for hope and the region’s forest wealth; the red sable for " +
      "courage and valour. Adopted 1997.",
    sources: [
      { title: "Флаг Иркутской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-IVA": {
    description:
      "A field split vertically red (hoist) and blue (fly), crossed low by three narrow silver stripes, " +
      "with the region’s coat of arms above them. The colours and metal repeat those of the arms’ " +
      "heraldic field, and the design is said to express the unity and interaction of the region’s " +
      "people. Adopted 1998.",
    sources: [
      { title: "Флаг Ивановской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KB": {
    description:
      "Three equal bands of blue-grey, white and green, with a central roundel — divided blue-grey and " +
      "green — bearing a white Mount Elbrus. Blue-grey stands for the boundless pure sky and waters (a " +
      "colour honoured among Turkic peoples); white for peace, purity and Islam; green for fertility " +
      "and natural beauty, also honoured in Islam and by the Kabardians. Adopted 1994.",
    sources: [
      { title: "Флаг Кабардино-Балкарии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%B1%D0%B0%D1%80%D0%B4%D0%B8%D0%BD%D0%BE-%D0%91%D0%B0%D0%BB%D0%BA%D0%B0%D1%80%D0%B8%D0%B8" },
    ],
  },

  "RU-KC": {
    description:
      "Three equal bands of light blue, green and red, the green one bearing a pale roundel with a sun " +
      "rising behind mountains. Officially light blue stands for peace and good intentions; green for " +
      "nature, fertility, youth and wisdom; red for the warmth and closeness between peoples. An " +
      "unofficial reading ties the three colours to the region’s Turkic, Adyghe and Slavic peoples. " +
      "Adopted 1994.",
    sources: [
      { title: "Флаг Карачаево-Черкесии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D1%80%D0%B0%D1%87%D0%B0%D0%B5%D0%B2%D0%BE-%D0%A7%D0%B5%D1%80%D0%BA%D0%B5%D1%81%D0%B8%D0%B8" },
    ],
  },

  "RU-KGD": {
    description:
      "Three horizontal bands of red, yellow and blue, with a white crenellated castle and the gold " +
      "monogram of Empress Elizabeth Petrovna in the upper hoist. The castle is drawn from the region’s " +
      "coat of arms and recalls Elizabeth’s historical tie to the territory; the law gives no separate " +
      "meaning for each colour band. Adopted 2006.",
    sources: [
      { title: "Флаг Калининградской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BB%D0%B8%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KGN": {
    description:
      "White over emerald-green over white, the green band bearing two silver mounds (kurgans) one " +
      "behind the other, taken from the region’s arms. The mounds refer to the region’s name (kurgan " +
      "means “burial mound”) and its geography and history. Adopted 1997.",
    sources: [
      { title: "Флаг Курганской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%83%D1%80%D0%B3%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KHA": {
    description:
      "White over blue with a green isosceles triangle at the hoist. White stands for purity, modesty " +
      "and a peaceful sky; blue for beauty, grandeur and the region’s vast waters; green for hope, " +
      "abundance, the unique flora and fauna and the boundless taiga. Adopted 1994.",
    sources: [
      { title: "Флаг Хабаровского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A5%D0%B0%D0%B1%D0%B0%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-KHM": {
    description:
      "A blue-cyan band over a green band, with a white vertical stripe at the hoist bearing a white " +
      "“Siberian crown” of stylised deer antlers from the region’s arms. Blue stands for the region’s " +
      "water; green for the taiga; white for the snow that lies seven months a year, the antlers " +
      "recalling the reindeer-herding Khanty and Mansi peoples. Adopted 1995.",
    sources: [
      { title: "Флаг Ханты-Мансийского автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A5%D0%B0%D0%BD%D1%82%D1%8B-%D0%9C%D0%B0%D0%BD%D1%81%D0%B8%D0%B9%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-KIR": {
    description:
      "A broad white band over narrow green and blue bands, with the region’s red-outlined heraldic " +
      "shield at the centre. White stands for purity of moral principles, goodness and snowy winters; " +
      "green for hope, health, and the fertility and forest wealth of the land; blue for loyalty and " +
      "honesty and for the Vyatka River that united the region’s people. Adopted 2003.",
    sources: [
      { title: "Флаг Кировской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KK": {
    description:
      "Blue, white and red horizontal bands — echoing the Russian tricolour — with a green vertical " +
      "band at the hoist bearing a gold solar (solstice) sign. Green is the traditional colour of " +
      "Siberia, standing for the eternity of life, revival and the friendship of Khakassia’s peoples; " +
      "the solar sign honours the ancient peoples who carved it on stone monuments found only in " +
      "Khakassia. Adopted 2003.",
    sources: [
      { title: "Флаг Хакасии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A5%D0%B0%D0%BA%D0%B0%D1%81%D0%B8%D0%B8" },
    ],
  },

  "RU-KL": {
    description:
      "A golden-yellow field with a blue disc at the centre enclosing a white nine-petalled lotus. The " +
      "five upper petals stand for the five continents and the four lower petals for the four cardinal " +
      "directions, expressing the Kalmyk people’s wish for friendship and cooperation with all peoples " +
      "of the world. Adopted 1993.",
    sources: [
      { title: "Флаг Калмыкии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BB%D0%BC%D1%8B%D0%BA%D0%B8%D0%B8" },
    ],
  },

  "RU-KLU": {
    description:
      "A red band over a green band separated by a narrow silver stripe, with a gold imperial crown on " +
      "the red. Red stands for love of the homeland, courage and blood shed against invaders; the " +
      "silver stripe for pure noble thoughts, the Oka River and the girdle of the Virgin; green — the " +
      "arms’ main colour — for peace, nature, youth and eternal life; the crown for imperial authority. " +
      "Adopted 2004.",
    sources: [
      { title: "Флаг Калужской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D0%BB%D1%83%D0%B6%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KO": {
    description:
      "Three equal horizontal bands of blue, green and white. Blue stands for the celestial principle " +
      "and the boundless expanse of the northern spaces; green for the vast taiga (the “parma”) that is " +
      "the Komi people’s chief wealth and traditional environment; white for the whiteness of snow, the " +
      "severe beauty of nature and the region’s far-northern position. Adopted 1991 (confirmed 1997).",
    sources: [
      { title: "Флаг Коми — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%BE%D0%BC%D0%B8" },
    ],
  },

  "RU-KEM": {
    description:
      "A red field with a blue vertical band at the hoist bearing the region’s coat of arms. The arms " +
      "carry a pick and hammer for one of Russia’s major coal- and metal-mining regions and, on a red " +
      "Order-of-Lenin ribbon, the year 1943 of the oblast’s founding. Adopted 2002; present form 2020, " +
      "after the region was renamed Kemerovo Oblast–Kuzbass.",
    sources: [
      { title: "Flag of Kemerovo Oblast — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kemerovo_Oblast" },
    ],
  },

  "RU-KOS": {
    description:
      "Two red vertical bands at the edges and a blue band at the centre bearing a gold ship — the main " +
      "charge of the region’s coat of arms, recalling Empress Catherine II’s river voyage to Kostroma. " +
      "Adopted 2006.",
    sources: [
      { title: "Флаг Костромской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%BE%D1%81%D1%82%D1%80%D0%BE%D0%BC%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KR": {
    description:
      "Three equal horizontal bands of red, light blue and green. Red stands for the strength and " +
      "courage of the people and their red-on-white embroidery; light blue for the republic’s lakes " +
      "and rivers, its greatness and beauty; green for nature and the hope and faith in happiness. " +
      "Adopted 1993.",
    sources: [
      { title: "Флаг Карелии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D0%B0%D1%80%D0%B5%D0%BB%D0%B8%D0%B8" },
    ],
  },

  "RU-KRS": {
    description:
      "Five horizontal stripes — red, silver, gold, black, red — with the region’s coat of arms at the " +
      "centre. The red stands for the bravery and blood of the inhabitants in severe trials; black for " +
      "the fertile chernozem soil; gold for the grain fields; silver for the historic Kursk shield and " +
      "the purity of the people’s thoughts. The palette draws on the 1858–83 imperial banner. Adopted " +
      "1996.",
    sources: [
      { title: "Флаг Курской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%83%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-KYA": {
    description:
      "A red field bearing the krai’s coat of arms at the centre — a golden lion holding a spade and a " +
      "sickle, for the region’s mining and agriculture. The law specifies the design without assigning " +
      "a separate meaning to the red field. Adopted 2000.",
    sources: [
      { title: "Флаг Красноярского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D1%8F%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-LEN": {
    description:
      "A white field with the region’s coat of arms and, along the foot, wavy stripes of red, light " +
      "blue and white. The main colours repeat the Russian tricolour to show the region’s unity with " +
      "the country; the waves stand for its position on the Gulf of Finland and its 1,800 lakes and " +
      "25,000 rivers. The arms carry a fortress wall, a silver anchor and a gold key. Adopted 1997.",
    sources: [
      { title: "Флаг Ленинградской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9B%D0%B5%D0%BD%D0%B8%D0%BD%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-LIP": {
    description:
      "A red field with a golden linden tree standing on five green hills. This is a “canting” flag — " +
      "the linden (lipa) names Lipetsk — and stands for cordiality and life; the five green hills are " +
      "the region and the four neighbours from whose lands it was formed in 1954, and the fertile " +
      "chernozem soil; red is the labour of its metallurgists and machine-builders. Adopted 2003.",
    sources: [
      { title: "Флаг Липецкой области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9B%D0%B8%D0%BF%D0%B5%D1%86%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-MAG": {
    description:
      "A scarlet field with the region’s coat of arms in the upper hoist over a blue V-shaped stripe " +
      "with two white wavy bands. The arms show gold and silver ingots with a geologist’s hammer and " +
      "pick (mining), a dam and aircraft (energy and transport) and three fish (fishing) — the region’s " +
      "chief industries. Adopted 2001.",
    sources: [
      { title: "Флаг Магаданской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%B0%D0%B3%D0%B0%D0%B4%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ME": {
    description:
      "A white (silver) field with a red vertical band of Mari ornament at the hoist and the state coat " +
      "of arms at the centre. White is an ancient Mari symbol of purity, goodness and good intent; the " +
      "arms bear a rearing red bear — protector of the forest — with sword and hammer, a shield with " +
      "the Mari cross of fertility, and a crown stylising the letter “M.” Adopted 2011.",
    sources: [
      { title: "Флаг Марий Эл — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%B0%D1%80%D0%B8%D0%B9_%D0%AD%D0%BB" },
    ],
  },

  "RU-MO": {
    description:
      "Three horizontal bands of dark red, white and dark blue, the white one bearing a dark-red " +
      "eight-pointed solar rosette — a symbol of the sun in Mordovian folk ornament. Adopted 1995. The " +
      "law specifies the sun sign but gives no separate meaning for each colour band.",
    sources: [
      { title: "Флаг Мордовии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D0%BE%D1%80%D0%B4%D0%BE%D0%B2%D0%B8%D0%B8" },
    ],
  },

  "RU-MUR": {
    description:
      "A broad blue band over a narrow red one, the blue bearing a golden aurora borealis of rays " +
      "spreading upward from a triple arc. The northern lights are the characteristic natural " +
      "phenomenon of this Arctic region. Adopted 2004.",
    sources: [
      { title: "Флаг Мурманской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9C%D1%83%D1%80%D0%BC%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-NEN": {
    description:
      "Horizontal bands of white, blue and green, the blue one edged with a traditional Northern " +
      "ornament of white and blue rafters — the “khor lambei” (reindeer antlers) of the Nenets. Silver " +
      "stands for nobility, purity and truthfulness; azure for magnanimity, fidelity and the sky; green " +
      "for hope, abundance, freedom and the meadow grass. Adopted 2003.",
    sources: [
      { title: "Флаг Ненецкого автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%B5%D0%BD%D0%B5%D1%86%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-NGR": {
    description:
      "Vertical bands of blue, white and red — recalling the flag of France — with the region’s " +
      "heraldic shield on the white. The shield shows a gold throne bearing a candelabrum and cross " +
      "sceptre and archbishop’s staff, flanked by two black bears, over two white fish — the historic " +
      "arms of Veliky Novgorod. Adopted 2007.",
    sources: [
      { title: "Флаг Новгородской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%BE%D0%B2%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-NIZ": {
    description:
      "A white field bearing the region’s coat of arms — a crowned red deer walking toward the hoist, " +
      "with black hooves and antlers, the historic emblem of Nizhny Novgorod, set on ermine ornament. " +
      "Adopted 2005.",
    sources: [
      { title: "Флаг Нижегородской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%B8%D0%B6%D0%B5%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-NVS": {
    description:
      "Five vertical bands of red, white, blue, white and green, with two black sables holding a gold " +
      "loaf and salt across the centre. White stands for purity, faith and the harsh Siberian winter; " +
      "green for hope, abundance and the region’s natural wealth; red for courage and the heroism of " +
      "its defenders; blue for the Ob River and the many lakes covering nearly a third of the region. " +
      "Adopted 2003.",
    sources: [
      { title: "Флаг Новосибирской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-OMS": {
    description:
      "Two red vertical bands at the edges and a white band at the centre carrying a wavy blue stripe. " +
      "Red stands for valour, fearlessness, life, mercy and love; white for nobility, purity and " +
      "justice and the Siberian climate; the wavy blue stripe for the Irtysh, the region’s main river, " +
      "and for beauty and grandeur. Adopted 2003.",
    sources: [
      { title: "Флаг Омской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9E%D0%BC%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ORE": {
    description:
      "A red field bearing the full coat of arms of Orenburg Oblast at the centre. Adopted 1997; the " +
      "law specifies the design without assigning a separate meaning to the red field.",
    sources: [
      { title: "Флаг Оренбургской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9E%D1%80%D0%B5%D0%BD%D0%B1%D1%83%D1%80%D0%B3%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-PER": {
    description:
      "A white cross divides the field into four quarters — red and blue above, blue and red below — " +
      "with the krai’s coat of arms at the centre. White stands for purity, goodness and the peaceful, " +
      "clean thoughts of the people; blue for the warmth of human relations and the waters of the Kama " +
      "and the region’s many rivers and lakes; red for the bravery of the inhabitants. Adopted 2007.",
    sources: [
      { title: "Флаг Пермского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D0%B5%D1%80%D0%BC%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-PNZ": {
    description:
      "Bands of green and yellow bearing the region’s coat of arms — three gold wheat sheaves bound " +
      "with crimson ribbons. Green stands for nature, forests, fertility and health; yellow for the " +
      "fields, wisdom, light and an abundant harvest. Adopted 2022, replacing a 2002 flag that showed " +
      "the Saviour-Not-Made-by-Hands.",
    sources: [
      { title: "Флаг Пензенской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D0%B5%D0%BD%D0%B7%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-PRI": {
    description:
      "A field divided diagonally by a white stripe into a red upper triangle at the hoist and a blue " +
      "lower one, with a gold walking Amur tiger in the upper hoist. Red stands for the courage, " +
      "valour and sacrifice of the region’s people; blue for honesty, loyalty and the beauty of the " +
      "sea; the white stripe for purity and the unity of the region with Russia. The Amur tiger is the " +
      "region’s heraldic emblem. Adopted 1995.",
    sources: [
      { title: "Флаг Приморского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D1%80%D0%B8%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-PSK": {
    description:
      "A light-blue field bearing the charges of the Pskov arms — a gold leopard (bars) beneath a hand " +
      "issuing from a cloud — with a white vertical band of the traditional Pskov “begunets” brick " +
      "ornament at the hoist. Adopted 2018; the law gives the design without a separate meaning for " +
      "each element.",
    sources: [
      { title: "Флаг Псковской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%9F%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ROS": {
    description:
      "Horizontal bands of blue, yellow and red with a white vertical stripe at the hoist. The three " +
      "bands come from the 1918 Don Cossack flag, where they stood for the union of the region’s three " +
      "peoples — the Don Cossacks (blue), the Kalmyks (yellow) and the Russians (red); the white stripe, " +
      "added in 1996, stands for the region’s unity with Russia. Adopted 1996.",
    sources: [
      { title: "Флаг Ростовской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-RYA": {
    description:
      "Horizontal bands of white, yellow and red, the yellow one bearing the standing prince from the " +
      "region’s arms. Gold stands for wealth, justice and, in Orthodox tradition, eternity and " +
      "holiness; red for courage and strength; white for purity and spirituality. The prince recalls " +
      "St Oleg of Ryazan, builder and protector of the land. Adopted 2000.",
    sources: [
      { title: "Флаг Рязанской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A0%D1%8F%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SA": {
    description:
      "A broad blue field with a central white disc, over narrow bands of white, red and green. The " +
      "white disc on blue is the Arctic sun at its zenith and the continuity of generations — the Sakha " +
      "considered themselves “children of the white sun”; blue is honour and loyalty; white the beauty " +
      "and severity of the North; red loyalty to the homeland; green the brief Yakut summer and the " +
      "taiga. Adopted 1992.",
    sources: [
      { title: "Флаг Якутии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%AF%D0%BA%D1%83%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-SAK": {
    description:
      "A sea-wave blue field (blue with an emerald tint) bearing the white outlines of Sakhalin Island " +
      "and the Kuril Islands set diagonally — the territory that forms the united Sakhalin Oblast. One " +
      "of the few flags to depict a map of its territory. Adopted 1995.",
    sources: [
      { title: "Флаг Сахалинской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D1%85%D0%B0%D0%BB%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SAM": {
    description:
      "Three horizontal bands of red, white and blue with the region’s coat of arms at the centre. " +
      "White stands for nobility and candour; blue for loyalty, honesty and virtue; red for courage, " +
      "boldness and love. The colours echo the historic Samara Banner carried in the Slavic peoples’ " +
      "struggle against Ottoman rule. Adopted 1998.",
    sources: [
      { title: "Флаг Самарской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SAR": {
    description:
      "A white band over a red band (2:1), with the region’s coat of arms — three silver sturgeons — " +
      "within a wreath of oak, laurel and wheat on the white. Adopted 2001; the law specifies the " +
      "design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Флаг Саратовской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D1%80%D0%B0%D1%82%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SE": {
    description:
      "Three equal horizontal bands of white, red and gold. White stands for moral and spiritual " +
      "purity; red for courage, strength and honour; gold for abundance, well-being and prosperity. The " +
      "three correspond to the three-part structure of ancient society reflected in the Ossetian Nart " +
      "epic. Adopted 1994.",
    sources: [
      { title: "Флаг Северной Осетии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D0%BE%D0%B9_%D0%9E%D1%81%D0%B5%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-SMO": {
    description:
      "A red field with two yellow stripes low across it and the region’s abbreviated coat of arms " +
      "(shield and crown) in the upper hoist. Red is the field of battle — Smolensk land being a great " +
      "historical battlefield; the yellow is the colour of the birds Gamayun and the Phoenix, for a " +
      "city that twice rose from the ashes (1812 and 1941–45), and forms a scheme of the Order of " +
      "Lenin. Adopted 1998.",
    sources: [
      { title: "Флаг Смоленской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%BC%D0%BE%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-SPE": {
    description:
      "A red field bearing the historic arms of the city: two crossed silver anchors — one sea, one " +
      "river, for the maritime and river port — behind a gold sceptre topped by the double-headed " +
      "eagle. Adopted 1992; it was the first territorial flag entered in Russia’s State Heraldic " +
      "Register.",
    sources: [
      { title: "Флаг Санкт-Петербурга — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%D0%B0" },
    ],
  },

  "RU-STA": {
    description:
      "A gold field with a white cross and the region’s coat of arms at its centre. Gold marks a sunny " +
      "southern land of golden grain and golden fleece, standing for richness and fertility; the white " +
      "cross recalls the name Stavropol (Greek for “city of the cross”), the region’s Orthodox role in " +
      "the North Caucasus, and its crossroads position. Adopted 1997.",
    sources: [
      { title: "Флаг Ставропольского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D1%82%D0%B0%D0%B2%D1%80%D0%BE%D0%BF%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "RU-SVE": {
    description:
      "A broad white band over a blue band, with a narrow white stripe above a green band along the " +
      "foot. White stands for purity; blue for sincerity and honour; green for freedom and the wealth " +
      "of Ural nature. The white and blue also echo the Russian flag. Adopted 2005.",
    sources: [
      { title: "Флаг Свердловской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A1%D0%B2%D0%B5%D1%80%D0%B4%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TA": {
    description:
      "Green over red, separated by a thin white stripe. Green stands for the greenery of spring and " +
      "rebirth; white for purity; red for the maturity, energy, strength and life of the peoples of " +
      "Tatarstan. Adopted 1991.",
    sources: [
      { title: "Флаг Татарстана — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%B0%D1%82%D0%B0%D1%80%D1%81%D1%82%D0%B0%D0%BD%D0%B0" },
    ],
  },

  "RU-TAM": {
    description:
      "Two equal vertical bands of red and blue with the region’s coat of arms at the centre. Red " +
      "stands for the courage, resilience and solidarity of the inhabitants and recalls historic " +
      "Russian banners; blue for the grandeur, natural beauty and purity of the Tambov land and for " +
      "loyalty to tradition. Adopted 2005.",
    sources: [
      { title: "Флаг Тамбовской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%B0%D0%BC%D0%B1%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TOM": {
    description:
      "A white field bearing the region’s coat of arms at the centre. The white and green of the arms " +
      "and flag are traditional Siberian colours — green for the forest, white for the snow. Adopted " +
      "1997.",
    sources: [
      { title: "Флаг Томской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%BE%D0%BC%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TUL": {
    description:
      "A red field bearing the charges of the region’s arms: a horizontal white sword blade over two " +
      "crossed sword blades, accompanied above and below by gold hammers — emblems of Tula’s historic " +
      "arms and armaments industry. Adopted 2005.",
    sources: [
      { title: "Флаг Тульской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D1%83%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TVE": {
    description:
      "A red central panel bearing the region’s emblem, flanked by two gold vertical bands. The emblem " +
      "is a throne with a high back bearing the Cap of Monomakh on a green cushion — the historic arms " +
      "of the Principality of Tver, approved by Catherine II in 1780. Adopted 1996.",
    sources: [
      { title: "Флаг Тверской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-TY": {
    description:
      "A blue field with a yellow wedge at the hoist from which white diagonal stripes run to meet in a " +
      "central white band. Blue stands for the pure boundless sky and the valour and harmony of the " +
      "Tuvans; white for purity, nobility and the milk-tea offered to guests; gold for wealth, justice " +
      "and the region’s Buddhist and shamanist faiths. The diagonal stripes are the Biy-Khem and " +
      "Kaa-Khem rivers meeting to form the Yenisei at Kyzyl. Adopted 1992.",
    sources: [
      { title: "Флаг Тывы — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D1%8B%D0%B2%D1%8B" },
    ],
  },

  "RU-TYU": {
    description:
      "Three horizontal bands of white, blue and green with a red triangle at the hoist and three " +
      "yellow crowns shaped as deer antlers on the blue band. The antler-crowns are a traditional " +
      "ornament of the region’s northern peoples, the first taken from the region’s coat of arms. " +
      "Adopted 1995 (present form 2008).",
    sources: [
      { title: "Флаг Тюменской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A2%D1%8E%D0%BC%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-UD": {
    description:
      "Three equal vertical bands of black, white and red, the white one bearing a red eight-pointed " +
      "solar “cross-arrow.” Black stands for earth and stability; white for the cosmos and purity of " +
      "moral principles; red for the sun and life. The solar sign is a traditional amulet believed to " +
      "guard its bearer from misfortune. Adopted 1993.",
    sources: [
      { title: "Флаг Удмуртии — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A3%D0%B4%D0%BC%D1%83%D1%80%D1%82%D0%B8%D0%B8" },
    ],
  },

  "RU-ULY": {
    description:
      "A blue field with a white column on a pedestal, topped by the Imperial Crown with blue ribbons " +
      "to the sides — the historic emblem of Simbirsk (now Ulyanovsk), a symbol of statehood and " +
      "steadfastness. Adopted 2013.",
    sources: [
      { title: "Флаг Ульяновской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%A3%D0%BB%D1%8C%D1%8F%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VGG": {
    description:
      "A red field bearing a white image of the Motherland Calls statue of Mamayev Kurgan, with two " +
      "blue vertical stripes at the hoist. Red recalls the historic Tsaritsyn regiments and the courage " +
      "and sacrifice of the region’s defenders; the statue embodies the heroism of the Battle of " +
      "Stalingrad; the two blue stripes are the Volga and the Don. Adopted 2000.",
    sources: [
      { title: "Флаг Волгоградской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%92%D0%BE%D0%BB%D0%B3%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VLA": {
    description:
      "A red field bearing the gold coat of arms of Vladimir — a crowned lion rampant — with a " +
      "light-blue band at the hoist carrying a gold hammer and sickle. Based on the RSFSR flag, it " +
      "unusually combines Soviet emblems with the region’s historic crowned lion. Adopted 1999.",
    sources: [
      { title: "Флаг Владимирской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VOR": {
    description:
      "A red field with a gold mountain of stones issuing from the hoist, on whose slope a white " +
      "overturned pitcher pours white water. The pitcher and water stand for the fertility of the land " +
      "and the Voronezh River and the diligence of the people; the gold mountain for the steep right " +
      "bank of Voronezh and for abundance. Drawn from the city’s 1781 arms. Adopted 2005.",
    sources: [
      { title: "Флаг Воронежской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D0%B5%D0%B6%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-VLG": {
    description:
      "A white field with a red vertical band at the fly and, in the upper hoist, the region’s red seal " +
      "charge — a hand emerging from a cloud holding an orb and a sword, with a crown above. Adopted " +
      "1997.",
    sources: [
      { title: "Flag of Vologda Oblast — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Vologda_Oblast" },
    ],
  },

  "RU-YAN": {
    description:
      "A bright blue-cyan field with a white “Deer Horns” ornament, framed by red and blue bands, along " +
      "the foot. Blue stands for the sea, sky and Yamal’s natural gas; white for purity, independence " +
      "and the long severe winters; the reindeer-antler ornament for the herding life of the region’s " +
      "indigenous peoples on the white snows. Adopted 1996.",
    sources: [
      { title: "Флаг Ямало-Ненецкого автономного округа — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%AF%D0%BC%D0%B0%D0%BB%D0%BE-%D0%9D%D0%B5%D0%BD%D0%B5%D1%86%D0%BA%D0%BE%D0%B3%D0%BE_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BE%D0%BA%D1%80%D1%83%D0%B3%D0%B0" },
    ],
  },

  "RU-YAR": {
    description:
      "A yellow field bearing a black bear standing on its hind legs and holding a white axe on its " +
      "shoulder — the historic emblem of Yaroslavl, matching the figure on the region’s coat of arms. " +
      "Adopted 2001.",
    sources: [
      { title: "Флаг Ярославской области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%AF%D1%80%D0%BE%D1%81%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-YEV": {
    description:
      "A white field with a horizontal rainbow of seven narrow bands across the centre. White stands " +
      "for purity; the rainbow is a biblical symbol of peace, happiness and good, and its seven stripes " +
      "recall the seven candles of the menorah and the seven days of creation — a nod to the region’s " +
      "Jewish heritage. Adopted 1996.",
    sources: [
      { title: "Флаг Еврейской автономной области — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%95%D0%B2%D1%80%D0%B5%D0%B9%D1%81%D0%BA%D0%BE%D0%B9_%D0%B0%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "RU-ZAB": {
    description:
      "Green over red bands with a yellow triangle at the hoist. Yellow stands for the boundless " +
      "steppe; green for the taiga and its rich wildlife; red for the region’s energy and mineral " +
      "resources. The layout derives from a palisade element on the 1859 arms of Zabaykalsky Oblast. " +
      "Adopted 2009.",
    sources: [
      { title: "Флаг Забайкальского края — Википедия", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%B3_%D0%97%D0%B0%D0%B1%D0%B0%D0%B9%D0%BA%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_%D0%BA%D1%80%D0%B0%D1%8F" },
    ],
  },

  "JP-10": {
    description:
      "A purple field with a white emblem: the old form of the kanji “群” (gun, “group”) drawn as a " +
      "circle for the harmony of the people, framed by three white crescents for the Jōmō Three " +
      "Mountains (Akagi, Haruna and Myōgi) expressing an advancing Gunma. Purple recalls the refined " +
      "culture of the ancient Kōzuke province. Adopted 1968 for the Meiji centennial.",
    sources: [
      { title: "群馬県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%BE%A4%E9%A6%AC%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-12": {
    description:
      "A sky-blue field — for hope and development — bearing the prefectural emblem in white edged with " +
      "a thin yellow border evoking the rapeseed blossom (nanohana), the prefectural flower. The emblem, " +
      "dating to 1909, combines the kana “チ” and “ハ” (chi-ha). Flag adopted 1963.",
    sources: [
      { title: "千葉県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%8D%83%E8%91%89%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-15": {
    description:
      "A red field with a gold emblem: a stylised kanji “新” (shin, “new”) above a circle flanked by the " +
      "kana “ガ” and “タ” (ga-ta) set like a necklace, expressing harmony, hope and the prefecture’s " +
      "smooth development. Adopted 1963.",
    sources: [
      { title: "新潟県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%96%B0%E6%BD%9F%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-17": {
    description:
      "A blue field with a white emblem: the kanji “石川” (Ishikawa) stylised into the shape of the Noto " +
      "Peninsula. The blue stands for the Sea of Japan and the prefecture’s greenery, clean water and " +
      "clear air. Ishikawa sets no separate emblem, so this flag design also serves as its emblem. " +
      "Adopted 1972.",
    sources: [
      { title: "石川県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%9F%B3%E5%B7%9D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-18": {
    description:
      "A navy-blue field with a white emblem combining the kana “フ,” “ク” and “イ” (fu-ku-i) into a " +
      "circle said to resemble young leaves sprouting between two leaves, carrying the wish for the " +
      "prefecture’s development. One of the oldest prefectural emblems. Adopted 1952.",
    sources: [
      { title: "福井県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A6%8F%E4%BA%95%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-21": {
    description:
      "A white field with a green emblem: an abbreviated kanji “岐” (gi) enclosed in a circle, the green " +
      "standing for the beauty of the prefecture’s nature. The emblem was designated 1932; the flag " +
      "arose as a de-facto standard through use.",
    sources: [
      { title: "岐阜県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B2%90%E9%98%9C%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-24": {
    description:
      "A blue-green field — combining the green of the mountains with the blue of the roughly " +
      "1,000-km coastline — with a white emblem: the hiragana “み” (mi) shaped as an upward arrow for " +
      "the prefecture’s advancement, and a circle at lower left for the world-renowned pearl " +
      "cultivation of Ago Bay. Adopted 1964.",
    sources: [
      { title: "三重県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E4%B8%89%E9%87%8D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-25": {
    description:
      "A light-blue field for the surface of Lake Biwa, with a white emblem combining the kana “シ” and " +
      "“ガ” (shi-ga) in a circle for harmony; the inner circle is Lake Biwa and the wings the " +
      "prefecture’s leap forward. Emblem designated 1957; flag adopted 1968.",
    sources: [
      { title: "滋賀県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%BB%8B%E8%B3%80%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-28": {
    description:
      "A cerulean-blue field with a white kanji “兵” (hyō) drawn as waves, representing a prefecture " +
      "that faces both the Sea of Japan and the Seto Inland Sea. Cerulean stands for youth, white for " +
      "brightness and sincerity. Adopted 1964.",
    sources: [
      { title: "兵庫県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%85%B5%E5%BA%AB%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-30": {
    description:
      "A white field with a dark navy-blue emblem: the kana “ワ” (wa) drawn as a fan, standing for the " +
      "limitless development of the Kishū region toward tomorrow and the progressive spirit of the " +
      "people. Adopted 1969.",
    sources: [
      { title: "和歌山県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%92%8C%E6%AD%8C%E5%B1%B1%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-31": {
    description:
      "A navy-blue field with a white emblem: a flying bird formed from the hiragana “と” (to), standing " +
      "for freedom, peace and the prefecture’s progress toward the future. Adopted 1968 for the Meiji " +
      "centennial.",
    sources: [
      { title: "鳥取県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%B3%A5%E5%8F%96%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-33": {
    description:
      "An eggplant-navy field with a gold emblem: the kanji “岡” (oka, “hill”) drawn as a circle, " +
      "standing for the unity of the people and the prefecture’s development and advancement. Adopted " +
      "1967.",
    sources: [
      { title: "岡山県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B2%A1%E5%B1%B1%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-35": {
    description:
      "A deep reddish-brown (ebicha) and white flag whose emblem combines the kanji “山” and “口” " +
      "(Yamaguchi) into a circle for the unity and advancement of the people, with a bird flying toward " +
      "the sun. Adopted 1962 for the prefecture’s 90th anniversary.",
    sources: [
      { title: "山口県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%B1%B1%E5%8F%A3%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-37": {
    description:
      "An olive-green field with a white emblem based on the kana “カ” (ka) combined with the " +
      "prefecture’s mountain ranges and olive leaves — a symbol of peace — expressing its blessed " +
      "nature and development. Adopted 1977.",
    sources: [
      { title: "香川県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%A6%99%E5%B7%9D%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-38": {
    description:
      "A flag bearing the blossom of the mikan (mandarin orange), the prefectural flower, on a green " +
      "and yellow field: the white petals stand for simplicity and purity, green for peace and hope, " +
      "and yellow for happiness. Adopted 1952.",
    sources: [
      { title: "愛媛県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%84%9B%E5%AA%9B%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-40": {
    description:
      "A blue field with a white emblem combining the kana “ふ” and “く” (fu-ku) drawn as plum blossoms, " +
      "the prefectural flower, standing for peace, the prefecture’s development, and the harmony and " +
      "progress of its people. Adopted 1966.",
    sources: [
      { title: "福岡県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E7%A6%8F%E5%B2%A1%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-41": {
    description:
      "A deep-green field bearing a stylised camphor-tree (kusu) flower, the prefectural flower: white " +
      "petals for public integrity and purity, crimson stamens and pistils for sincerity and passion, " +
      "the six petals expressing harmony and vigorous development. Adopted 1968.",
    sources: [
      { title: "佐賀県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E4%BD%90%E8%B3%80%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-42": {
    description:
      "A water-blue field with a white emblem based on the letter “N,” deformed into a dove for peace " +
      "with a sphere for the bright sea, sky and earth, expressing the prefecture’s international " +
      "character. Adopted 1991, replacing an earlier crane mark used from 1925.",
    sources: [
      { title: "長崎県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E9%95%B7%E5%B4%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-44": {
    description:
      "A white field with a red emblem of three kanji “大” (dai) joined into a ring like a rising sun. " +
      "The three characters stand for integrity, diligence and friendship; the ring for harmony, peace " +
      "and cooperation. Red is the sincerity of the people, white peace and equality. Adopted 1956.",
    sources: [
      { title: "大分県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%A4%A7%E5%88%86%E7%9C%8C%E6%97%97" },
    ],
  },

  "JP-45": {
    description:
      "A green field — for the fertile land — with three yellow diamonds set diagonally, forming the " +
      "kana “ミ” (mi) and depicting sunlight pouring down on the prefecture’s soil. Adopted 1964.",
    sources: [
      { title: "宮崎県旗 — Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E5%AE%AE%E5%B4%8E%E7%9C%8C%E6%97%97" },
    ],
  },

  "UA-05": {
    description:
      "A blue field with a red stripe along the top and bottom edges, bearing at the centre a golden sun " +
      "(the emblem of Podilia) and a silver cross with a blue shield holding a silver crescent (the " +
      "emblem of eastern Podilia/Bratslav). Blue is the historic colour of the Podilian land; the red " +
      "stripes recall the Bratslav Voivodeship; the two blue edges also stand for the Dniester and " +
      "Southern Bug rivers. Adopted 1997.",
    sources: [
      { title: "Прапор Вінницької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-07": {
    description:
      "A red field — the colour of ripe cherries — with a white cross reaching to the edges, and a " +
      "historic 15th–18th-century cross emblem in the upper hoist. Developed from the historical " +
      "traditions of the Volyn region. Adopted 1997.",
    sources: [
      { title: "Прапор Волинської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%92%D0%BE%D0%BB%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-12": {
    description:
      "A field divided by a diagonal band into blue (upper hoist) and white (lower fly), reproducing " +
      "graphic elements of the oblast’s lesser coat of arms. Adopted 2002.",
    sources: [
      { title: "Прапор Дніпропетровської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%94%D0%BD%D1%96%D0%BF%D1%80%D0%BE%D0%BF%D0%B5%D1%82%D1%80%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-14": {
    description:
      "A flag split into an upper blue half with a golden 12-rayed rising sun and a lower black half " +
      "with five vertical golden ovals. The upper field stands for the east of Ukraine; the lower for " +
      "coal, the earth and the night-time Sea of Azov with golden reflections. Adopted 1999.",
    sources: [
      { title: "Прапор Донецької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%94%D0%BE%D0%BD%D0%B5%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-09": {
    description:
      "A cobalt-blue field with a circular emblem in the upper hoist: a ring of stars — 17 gold and 14 " +
      "white for the oblast’s 17 districts and 14 cities — around a small shield bearing the oblast’s " +
      "coat of arms. Adopted 1998.",
    sources: [
      { title: "Прапор Луганської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9B%D1%83%D0%B3%D0%B0%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-18": {
    description:
      "A red field with a yellow cross reaching the edges and the coat of arms of the city of Zhytomyr " +
      "at the centre. Adopted 2003.",
    sources: [
      { title: "Прапор Житомирської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-21": {
    description:
      "Blue over yellow with the oblast’s quartered coat of arms in the hoist — three gold bars on blue " +
      "and a red bear on silver. The blue and yellow have long regional roots (recorded from 1709 and " +
      "used by Carpathian Ukraine in 1919); the bear derives from the 1920 arms of Subcarpathian " +
      "Ruthenia. Adopted 2009.",
    sources: [
      { title: "Прапор Закарпатської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%97%D0%B0%D0%BA%D0%B0%D1%80%D0%BF%D0%B0%D1%82%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-23": {
    description:
      "A crimson field bearing the oblast’s full coat of arms — a Cossack with sabre and musket, with " +
      "the mace, bunchuk and other Cossack symbols of authority. Crimson was the main colour of the " +
      "Zaporozhian Cossack banners and today symbolises Cossackdom itself. Adopted 2001.",
    sources: [
      { title: "Прапор Запорізької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%97%D0%B0%D0%BF%D0%BE%D1%80%D1%96%D0%B7%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-26": {
    description:
      "A white field with a black crowned jackdaw (kavka) facing the hoist — the region’s historic " +
      "emblem — flanked by red-black bands at the hoist and blue-yellow bands at the fly. The striped " +
      "bands embody the region’s traditions of struggle for Ukrainian independence. Adopted 2001.",
    sources: [
      { title: "Прапор Івано-Франківської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%86%D0%B2%D0%B0%D0%BD%D0%BE-%D0%A4%D1%80%D0%B0%D0%BD%D0%BA%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-30": {
    description:
      "A blue field bearing the figure of the Archangel Michael — the city’s patron saint — with a " +
      "flaming sword and shield, framed by a gold fringed band. Adopted 1995, restoring the city’s " +
      "historic heraldic emblem.",
    sources: [
      { title: "Прапор Києва — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9A%D0%B8%D1%94%D0%B2%D0%B0" },
    ],
  },

  "UA-32": {
    description:
      "Three vertical bands of blue, yellow and blue, the yellow one bearing St George slaying the " +
      "dragon — the figure from the oblast’s coat of arms. Adopted 1999.",
    sources: [
      { title: "Прапор Київської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9A%D0%B8%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-35": {
    description:
      "Two vertical bands of crimson and yellow, the crimson one bearing a yellow eagle. The eagle " +
      "stands for courage, insight and strength and for the native land inherited from ancestors; gold " +
      "for wealth and justice; crimson for dignity and might. Adopted 1998.",
    sources: [
      { title: "Прапор Кіровоградської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9A%D1%96%D1%80%D0%BE%D0%B2%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-40": {
    description:
      "A red field bearing the coat of arms of the city of Sevastopol at the centre. Adopted 2000.",
    sources: [
      { title: "Прапор Севастополя — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A1%D0%B5%D0%B2%D0%B0%D1%81%D1%82%D0%BE%D0%BF%D0%BE%D0%BB%D1%8F" },
    ],
  },

  "UA-43": {
    description:
      "Three horizontal bands — a narrow blue at the top, a broad white in the middle and a narrow red " +
      "at the foot. Adopted 1992 as the flag of the Autonomous Republic of Crimea within Ukraine; the " +
      "law states the design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Прапор Автономної Республіки Крим — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%90%D0%B2%D1%82%D0%BE%D0%BD%D0%BE%D0%BC%D0%BD%D0%BE%D1%97_%D0%A0%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D1%96%D0%BA%D0%B8_%D0%9A%D1%80%D0%B8%D0%BC" },
    ],
  },

  "UA-46": {
    description:
      "A blue field bearing the oblast’s coat of arms — a golden crowned lion. Adopted 2001.",
    sources: [
      { title: "Прапор Львівської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9B%D1%8C%D0%B2%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-48": {
    description:
      "A white band over yellow and blue bands, the lower blue one with a wavy upper edge, and the " +
      "oblast’s small coat of arms at the centre. White stands for purity and the region’s shipbuilding " +
      "and maritime traditions; yellow for the fertile steppe soil; blue for water, stability and " +
      "loyalty, the wave for the Black Sea and the Southern Bug and Inhul rivers. Adopted 2026.",
    sources: [
      { title: "Прапор Миколаївської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-51": {
    description:
      "Three vertical bands of yellow, blue and white, the blue one bearing the oblast’s coat of arms " +
      "(without crown). Adopted 2002.",
    sources: [
      { title: "Прапор Одеської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9E%D0%B4%D0%B5%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-53": {
    description:
      "A blue field with a yellow Cossack cross, modelled on the banner of the Poltava Regiment of the " +
      "Zaporozhian Host. Adopted 2000.",
    sources: [
      { title: "Прапор Полтавської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%9F%D0%BE%D0%BB%D1%82%D0%B0%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-56": {
    description:
      "Five horizontal stripes — white, yellow, light blue, yellow, white — with the oblast’s coat of " +
      "arms in a yellow cartouche at the centre. White is the colour of the cloth; the light blue and " +
      "yellow are the colours of Ukraine’s national flag. Adopted 2005.",
    sources: [
      { title: "Прапор Рівненської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-59": {
    description:
      "A blue field bearing the oblast’s coat of arms at the centre. Adopted 2000.",
    sources: [
      { title: "Прапор Сумської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A1%D1%83%D0%BC%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-61": {
    description:
      "A blue field with a crossed yellow sword and key beneath three white towers — the charges of the " +
      "oblast’s arms. Adopted 2003.",
    sources: [
      { title: "Прапор Тернопільської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A2%D0%B5%D1%80%D0%BD%D0%BE%D0%BF%D1%96%D0%BB%D1%8C%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-63": {
    description:
      "A crimson field bearing the oblast’s coat of arms at the centre, representing the history and " +
      "traditions of the region. Adopted 1999.",
    sources: [
      { title: "Прапор Харківської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A5%D0%B0%D1%80%D0%BA%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-65": {
    description:
      "Three horizontal bands of blue, white and blue (the white twice as wide), with the oblast’s coat " +
      "of arms on the white band near the hoist. Adopted 2001.",
    sources: [
      { title: "Прапор Херсонської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A5%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-68": {
    description:
      "Two vertical bands, blue at the hoist and red at the fly, with the oblast’s coat of arms at the " +
      "centre: a gold sun and two wheat stalks over a blue-and-red shield. The sun is the traditional " +
      "symbol of Podilia; the red comes from the arms of Volyn; the wheat stalks stand for the region’s " +
      "farming and form the letter “Kh” of its name. Adopted 2002.",
    sources: [
      { title: "Прапор Хмельницької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A5%D0%BC%D0%B5%D0%BB%D1%8C%D0%BD%D0%B8%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-71": {
    description:
      "A blue field with the oblast’s coat of arms at the centre and a yellow fringe on three sides. " +
      "Blue symbolises celestial height and dignity. Adopted 2000.",
    sources: [
      { title: "Прапор Черкаської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A7%D0%B5%D1%80%D0%BA%D0%B0%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-74": {
    description:
      "A green field with a white horizontal band across the centre and the oblast’s coat of arms in " +
      "the upper hoist. Green stands for the Polissia and forest-steppe; the white band for the Desna " +
      "River. The arms bear the black double-headed eagle of the historic Chernihiv principality. " +
      "Adopted 2000.",
    sources: [
      { title: "Прапор Чернігівської області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B3%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },

  "UA-77": {
    description:
      "A green field with a white falcon at the centre and blue and yellow stripes along the top and " +
      "bottom edges. The falcon is the protective symbol of Bukovina — beauty, courage and wisdom — " +
      "drawn from a heraldic find at Zamchysche; green is the green Bukovina and rebirth; the blue and " +
      "yellow bands are Ukraine’s colours and the Prut and Dniester rivers and the grain fields. " +
      "Adopted 2001.",
    sources: [
      { title: "Прапор Чернівецької області — Вікіпедія", url: "https://uk.wikipedia.org/wiki/%D0%9F%D1%80%D0%B0%D0%BF%D0%BE%D1%80_%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D0%B5%D1%86%D1%8C%D0%BA%D0%BE%D1%97_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%96" },
    ],
  },















  "HR-01": {
    description:
      "Five horizontal stripes alternating green and white, with a central emblem showing the " +
      "Manduševac spring (the historic well of Zagreb’s main square) together with the Croatian " +
      "chequy shield, the marten of Slavonia and the leopard of Dalmatia; green and white lines at the " +
      "lower hoist stand for the Sava and Kupa rivers.",
    sources: [
      { title: "Zastava Zagrebačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Zagreba%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-17": {
    description:
      "A golden band at the hoist (one third) and a blue field (two thirds), with the county’s coat of " +
      "arms — the golden crown of King Zvonimir on blue — set in the gold. The crown is drawn from a " +
      "relief in the baptistery of the Cathedral of St Domnius in Split and recalls medieval Croatian " +
      "kingship.",
    sources: [
      { title: "Zastava Splitsko-dalmatinske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Splitsko-dalmatinske_%C5%BEupanije" },
    ],
  },

  "HR-18": {
    description:
      "A blue-green field bearing the county’s coat of arms: a golden goat facing the hoist with red " +
      "hooves and horns on a blue shield — the historic emblem of the Istrian peninsula.",
    sources: [
      { title: "Zastava Istarske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Istarske_%C5%BEupanije" },
    ],
  },

  "HR-05": {
    description:
      "Five horizontal stripes alternating red and white, with the county’s coat of arms on the hoist " +
      "half. The arms combine a crowned red eagle, gold stars over wavy silver-and-blue bands, a walled " +
      "tower, and a central shield with a green hill, wheel and deer. The county’s historic arms were " +
      "granted by Empress Maria Theresa in 1763.",
    sources: [
      { title: "Zastava Varaždinske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Vara%C5%BEdinske_%C5%BEupanije" },
    ],
  },

  "HR-19": {
    description:
      "A horizontal bicolour of red over white with the county’s gold-bordered coat of arms at the " +
      "centre, its own red-and-white division aligned to the flag’s. Adopted 1996.",
    sources: [
      { title: "Zastava Dubrovačko-neretvanske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Dubrova%C4%8Dko-neretvanske_%C5%BEupanije" },
    ],
  },

  "HR-02": {
    description:
      "A horizontal bicolour of dark red over golden yellow, edged top and bottom with narrow gold " +
      "stripes, and the county’s gold-bordered coat of arms at the centre. The article gives the design " +
      "without assigning a separate meaning to each colour.",
    sources: [
      { title: "Zastava Krapinsko-zagorske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Krapinsko-zagorske_%C5%BEupanije" },
    ],
  },

  "HR-03": {
    description:
      "A blue field with a thin red-and-white stripe along the top edge and the county’s coat of arms " +
      "at the centre: a stork — for the Lonjsko Polje wetlands famed for its storks — and a downward " +
      "sword standing for the people’s defensive resolve and readiness for peace.",
    sources: [
      { title: "Zastava Sisačko-moslavačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Sisa%C4%8Dko-moslava%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-04": {
    description:
      "A horizontal bicolour of dark red over golden yellow with the county’s coat of arms at the " +
      "centre. The article gives the design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Zastava Karlovačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Karlova%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-06": {
    description:
      "A red-and-blue flag bearing the county’s quartered coat of arms, edged in gold. The quarters " +
      "represent its constituent regions: a rooster for Podravina and Đurđevac, a trefoil for Prigorje, " +
      "a double cross for Križevci, and a double lily from the arms of Koprivnica.",
    sources: [
      { title: "Zastava Koprivničko-križevačke županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Koprivni%C4%8Dko-kri%C5%BEeva%C4%8Dke_%C5%BEupanije" },
    ],
  },

  "HR-08": {
    description:
      "A blue field with a narrow white stripe near the top and bottom edges and the county’s coat of " +
      "arms at the centre. The arms combine twenty alternating red and silver squares, a fortified " +
      "coastal town below green mountains, and a sailing ship flying the Croatian flag with a golden " +
      "Frankopan star — evoking the county’s coast (Primorje) and highlands (Gorski Kotar).",
    sources: [
      { title: "Zastava Primorsko-goranske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Primorsko-goranske_%C5%BEupanije" },
    ],
  },

  "HR-09": {
    description:
      "A white field with a blue stripe above and below the centre, bearing the county’s coat of arms: " +
      "a golden Velebit degenia — a rare alpine flower endemic to the region — on a blue heart-shaped " +
      "shield, standing for the area’s natural heritage.",
    sources: [
      { title: "Zastava Ličko-senjske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Li%C4%8Dko-senjske_%C5%BEupanije" },
    ],
  },

  "HR-10": {
    description:
      "A blue-white-blue horizontal field with the county’s gold-bordered coat of arms at the centre: " +
      "a marten running between two silver bands, a gold six-pointed star above and a gold anchor " +
      "below, on red. The marten is the historic emblem of the Croatian lands; the anchor recalls the " +
      "region’s riverine (Drava) heritage.",
    sources: [
      { title: "Zastava Virovitičko-podravske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Viroviti%C4%8Dko-podravske_%C5%BEupanije" },
    ],
  },

  "HR-11": {
    description:
      "A horizontal field with green at the top and bottom quarters and yellow in the middle half, " +
      "bearing the county’s coat of arms on the yellow. The article gives the design without assigning " +
      "a separate meaning to each colour.",
    sources: [
      { title: "Zastava Požeško-slavonske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Po%C5%BEe%C5%A1ko-slavonske_%C5%BEupanije" },
    ],
  },

  "HR-12": {
    description:
      "A blue-white-blue field crossed by a diagonal red-and-silver band for the River Sava, with the " +
      "county’s coat of arms at the centre. The silver band is the Sava, a symbol of fertility and " +
      "wealth; the running marten ties the region to Slavonia and Croatia; the five gold stars are " +
      "historic Croatian symbols.",
    sources: [
      { title: "Zastava Brodsko-posavske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Brodsko-posavske_%C5%BEupanije" },
    ],
  },

  "HR-13": {
    description:
      "A field divided by a wavy line, white above and blue below, with the county’s gold-bordered " +
      "coat of arms at the centre: a green olive branch with gold fruit above (the region’s agriculture) " +
      "and the white Church of the Holy Cross below (its historic and religious heritage).",
    sources: [
      { title: "Zastava Zadarske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Zadarske_%C5%BEupanije" },
    ],
  },

  "HR-14": {
    description:
      "A white field with two blue bands running its length and the county’s coat of arms at the " +
      "centre. The arms show two silver bands (the Drava and Danube rivers) on blue, a silver " +
      "three-arched bridge with a tower, a gold cross, star and anchor, and a gold marten on red.",
    sources: [
      { title: "Zastava Osječko-baranjske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Osje%C4%8Dko-baranjske_%C5%BEupanije" },
    ],
  },

  "HR-15": {
    description:
      "A blue field — for the sea — with two silver stripes along the edges for the River Krka, and the " +
      "county’s coat of arms at the centre: a gold medieval Croatian royal crown and an Old-Croatian " +
      "sword on a red shield.",
    sources: [
      { title: "Zastava Šibensko-kninske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_%C5%A0ibensko-kninske_%C5%BEupanije" },
    ],
  },

  "HR-16": {
    description:
      "Longitudinal stripes of gold and white with a scalloped (dentilated) lower edge, and the " +
      "county’s coat of arms at the centre: three silver bands for the Danube, Bosut and Sava rivers on " +
      "blue, and a resting deer with a golden collar beside a Slavonian oak — the natural wealth of the " +
      "region.",
    sources: [
      { title: "Zastava Vukovarsko-srijemske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Vukovarsko-srijemske_%C5%BEupanije" },
    ],
  },

  "HR-20": {
    description:
      "A horizontal tricolour of red, white and blue with a gold six-pointed star centred on the blue " +
      "band. The article gives the design without assigning a separate meaning to each colour.",
    sources: [
      { title: "Zastava Međimurske županije — Wikipedija", url: "https://hr.wikipedia.org/wiki/Zastava_Me%C4%91imurske_%C5%BEupanije" },
    ],
  },

















  "NL-DR": {
    description:
      "A white field with two red horizontal stripes, and between them a black castle tower flanked by " +
      "six red five-pointed stars (three on each side). Red and white are the traditional Saxon colours and those " +
      "of the Archbishopric of Utrecht, which once ruled Drenthe; the six stars are the six historic " +
      "dingspelen (judicial districts) and allude to the Star of Bethlehem in the province’s arms; the " +
      "tower is Coevorden Castle, seat of the bishop’s law. Adopted 1947 — the first official Dutch " +
      "provincial flag.",
    sources: [
      { title: "Vlag van Drenthe — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Drenthe" },
    ],
  },

  "NL-FR": {
    description:
      "Seven diagonal bands, alternating cobalt-blue and white, the white bands bearing seven red " +
      "“pompeblêden” (water-lily leaves) arranged 2-3-2. The seven leaves stand for the Seven Frisian " +
      "Sea Lands (and “seven” connotes “many”); the white diagonal bands are Friesland’s streams and " +
      "lakes and the blue the waters themselves. Adopted 1957.",
    sources: [
      { title: "Vlag van Friesland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Friesland" },
    ],
  },

  "NL-ZE": {
    description:
      "A blue field with three white wavy bands and the crowned coat of arms of Zeeland — a lion rising " +
      "from the waves — at the centre. The wavy bands are read either as the sea and the province’s " +
      "constant struggle against the water or as its resistance to Spanish forces; the arms have been " +
      "used since 1440. Adopted 1949.",
    sources: [
      { title: "Vlag van Zeeland (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Zeeland_(provincie)" },
    ],
  },

  "NL-GE": {
    description:
      "A horizontal tricolour of blue, yellow and black. The colours come from the province’s arms: " +
      "blue for the field of the golden lion of the Duchy of Gelre, and gold and black for the lion of " +
      "the Duchy of Jülich, joined to Gelre’s arms in the 14th century. Adopted 1953.",
    sources: [
      { title: "Vlag van Gelderland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Gelderland" },
    ],
  },

  "NL-GR": {
    description:
      "A white cross bordered green over a field quartered red and blue. The white-and-green cross is " +
      "for the city of Groningen and its central role; the red and blue quarters come from the flag of " +
      "the Ommelanden (whose blue bands were the districts Hunsingo, Fivelingo and Westerkwartier); the " +
      "cross form alludes to Scandinavian trade ties. Adopted 1950.",
    sources: [
      { title: "Vlag van Groningen (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Groningen_(provincie)" },
    ],
  },

  "NL-FL": {
    description:
      "A dark-blue band over a light-green band separated by a narrow wavy yellow stripe, with a white " +
      "fleur-de-lis in the upper hoist. Blue is the water from which the province was reclaimed; green " +
      "the flat meadow landscape; yellow the ripening grain and rapeseed; the fleur-de-lis comes from " +
      "the arms of engineer Cornelis Lely, initiator of the Zuiderzee works. Adopted 1989.",
    sources: [
      { title: "Vlag van Flevoland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Flevoland" },
    ],
  },

  "NL-NB": {
    description:
      "A chequerboard of 24 red and white squares in four rows of six — the “Brabants Bont” pattern. " +
      "The red and white are the medieval colours of the Duchy of Brabant. In use since the Middle " +
      "Ages, revived and officially adopted 1959.",
    sources: [
      { title: "Vlag van Noord-Brabant — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Noord-Brabant" },
    ],
  },

  "NL-NH": {
    description:
      "A horizontal tricolour of yellow, red and blue, taken from the province’s arms, which combine " +
      "Holland (yellow and red) with West-Friesland (yellow and blue); yellow sits on top because it " +
      "appears in both. Adopted 1958.",
    sources: [
      { title: "Vlag van Noord-Holland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Noord-Holland" },
    ],
  },

  "NL-OV": {
    description:
      "Five horizontal stripes — red, yellow, blue, yellow, red — the blue one drawn as three waves. " +
      "The yellow and red are the colours of Holland, marking the historic tie to it; the wavy blue " +
      "stripe is the river IJssel. Adopted 1948.",
    sources: [
      { title: "Vlag van Overijssel — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Overijssel" },
    ],
  },

  "NL-UT": {
    description:
      "A white band over a red band with a red canton at the hoist bearing a white cross. It combines " +
      "two historic flags — the white-red bicolour of the Archdiocese of Utrecht and the white cross on " +
      "red of the Sticht of Utrecht. Adopted 1952.",
    sources: [
      { title: "Vlag van Utrecht (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Utrecht_(provincie)" },
    ],
  },

  "NL-ZH": {
    description:
      "A yellow field bearing a red lion with a black outline — the banner of the arms of South " +
      "Holland. Yellow and red are the historic colours of Holland, the lion the emblem of the Counts " +
      "of Holland since the Crusades. Adopted 1986, replacing a 1948 yellow-red-yellow tricolour.",
    sources: [
      { title: "Vlag van Zuid-Holland — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Zuid-Holland" },
    ],
  },

  "NL-AW": {
    description:
      "A light-blue field with a red four-pointed star fimbriated white in the upper hoist and two " +
      "yellow stripes across the lower half. Blue is the surrounding sea; yellow abundance and " +
      "solidarity (and the island’s gold and aloe); the four-pointed star the four points of the " +
      "compass and the diverse origins of Arubans; the white border peace and the beaches. Adopted 1976.",
    sources: [
      { title: "Flag of Aruba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Aruba" },
    ],
  },

  "NL-CW": {
    description:
      "A blue field with a yellow horizontal stripe below the middle and two white five-pointed stars " +
      "in the canton. The upper and lower blue are sky and sea, divided by the yellow of the bright " +
      "sun; the two stars are Curaçao and Klein Curaçao, their five points the five continents its " +
      "people descend from. Adopted 1984.",
    sources: [
      { title: "Flag of Curaçao — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cura%C3%A7ao" },
    ],
  },

  "NL-SX": {
    description:
      "A white triangle at the hoist bearing the country’s coat of arms, with horizontal bands of red " +
      "and blue. Blue is the sea and sky, red the blood of Sint Maarteners; the arms carry the yellow " +
      "sage flower, the courthouse of Philipsburg, the Dutch-French border monument and a pelican over " +
      "a sun, with the motto “Semper progrediens.” Adopted 1985.",
    sources: [
      { title: "Flag of Sint Maarten — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sint_Maarten" },
    ],
  },

  "NL-BQ1": {
    description:
      "A yellow band in the upper hoist and a dark-blue band in the lower fly, divided by a white " +
      "diagonal bearing a black ship’s compass and a red six-pointed star. Blue is the sea, yellow the " +
      "sun, white the sky; the compass is Bonaire’s seafaring people and the four cardinal directions; " +
      "the star’s six points are the island’s six original villages. Adopted 1981.",
    sources: [
      { title: "Flag of Bonaire — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bonaire" },
    ],
  },

  "NL-BQ2": {
    description:
      "Two red triangles at top and two blue triangles at bottom around a central white diamond bearing " +
      "a yellow star. The star is the island of Saba; red, white and blue mark the link with the " +
      "Netherlands — red for courage, unity and strength, white for peace, blue for the sea. Adopted " +
      "1985.",
    sources: [
      { title: "Flag of Saba — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saba_(island)" },
    ],
  },

  "NL-BQ3": {
    description:
      "Four red-edged blue polygons around a white diamond that holds the green silhouette of the " +
      "island, topped by a gold star. The star is unity; the blue the surrounding ocean; the green the " +
      "volcano “the Quill”; the red the flamboyant tree tied to Emancipation Day; the white diamond a " +
      "former waterfall named in the anthem “Golden Rock.” Adopted 2004.",
    sources: [
      { title: "Flag of Sint Eustatius — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sint_Eustatius" },
    ],
  },



  "BE-BRU": {
    description:
      "A blue field with a stylised yellow iris (Iris pseudacorus). The yellow iris symbolises Brussels: " +
      "it grew in the marshes on which the city was founded, is said to have guided the Dukes of Brabant " +
      "across flooded ground, and featured on the scepter of the Carolingian founders of the city. " +
      "First adopted 1991; present stylised version 2015.",
    sources: [
      { title: "Flag of the Brussels-Capital Region — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Brussels-Capital_Region" },
    ],
  },

  "BE-VAN": {
    description:
      "A field of 24 squares (red, white, yellow and blue) set diagonally. The colours are those of the " +
      "province’s three main cities — Antwerp (red and white), Mechelen (yellow and red) and Turnhout " +
      "(white and blue) — with Antwerp’s colours emphasised in the centre rows. Adopted 1996.",
    sources: [
      { title: "Vlag van Antwerpen (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Antwerpen_(provincie)" },
    ],
  },

  "BE-VBR": {
    description:
      "A black field with a yellow lion with red tongue and claws and a central heart-shield of red " +
      "with a white bar. The lion is the historic lion of the Duchy of Brabant, standing for strength, " +
      "courage and royal dignity; the heart-shield carries the colours of the capital, Leuven. Adopted " +
      "1995.",
    sources: [
      { title: "Vlag van Vlaams-Brabant — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Vlaams-Brabant" },
    ],
  },

  "BE-VOV": {
    description:
      "A green field with four white horizontal stripes and a black lion with red tongue and claws. The " +
      "green stands for the province’s environmental character; the four white stripes are its four " +
      "major rivers (Scheldt, Leie, Dender and Durme); the black lion is the historic lion of the " +
      "County of Flanders. Adopted 1998.",
    sources: [
      { title: "Vlag van Oost-Vlaanderen — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Oost-Vlaanderen" },
    ],
  },

  "BE-VLI": {
    description:
      "A white field with a red double-tailed crowned lion holding a shield of ten yellow-and-red bars. " +
      "The red lion is that of the medieval Duchy of Limburg (the second tail added by Walram III in " +
      "1221 for his two territories); the barred shield is the historic County of Loon, which covered " +
      "much of the province. Adopted 1996.",
    sources: [
      { title: "Vlag van Limburg (Belgische provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Limburg_(Belgische_provincie)" },
    ],
  },

  "BE-VWV": {
    description:
      "A field quartered blue and yellow in twelve pieces with a red heart-shield across the centre. " +
      "The colours derive from the province’s historic arms. Adopted 1997.",
    sources: [
      { title: "Vlag van West-Vlaanderen — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_West-Vlaanderen" },
    ],
  },

  "BE-WBR": {
    description:
      "A black field with a gold Brabant lion with red tongue and claws facing the hoist, wearing a " +
      "gold cap bearing two facing red Walloon roosters. The lion is the historic Duchy of Brabant and " +
      "the former united province of Brabant; the two roosters mark the Walloon Region in which the " +
      "province lies. Adopted 1995 at the split of Brabant.",
    sources: [
      { title: "Vlag van Waals-Brabant — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Waals-Brabant" },
    ],
  },

  "BE-WHT": {
    description:
      "A yellow field quartered with lions: black in the upper hoist and lower fly, red in the upper " +
      "fly and lower hoist. Drawn from the province’s arms, it combines the black lion of the County of " +
      "Hainaut with the red lion of the County of Holland, whose rulers were once shared. Used since " +
      "1815 as the province’s de-facto flag (never formally adopted).",
    sources: [
      { title: "Vlag van Henegouwen — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Henegouwen" },
    ],
  },

  "BE-WLG": {
    description:
      "A banner of the province’s arms in five parts: the gold perron of Liège on red (the medieval " +
      "symbol of justice of the Prince-Bishopric), the red-white-red of Bouillon, the red-and-yellow " +
      "bars of Loon, three green lions for Verviers, and three horns for the County of Horn. Used as the " +
      "province’s de-facto flag.",
    sources: [
      { title: "Vlag van Luik (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Luik_(provincie)" },
    ],
  },

  "BE-WLX": {
    description:
      "Three equal horizontal stripes of red, white and light blue with the provincial coat of arms at " +
      "the centre. The colours are taken from the flag of the Grand Duchy of Luxembourg, from which the " +
      "province was separated in 1839. Adopted 1955.",
    sources: [
      { title: "Vlag van Luxemburg (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Luxemburg_(provincie)" },
    ],
  },

  "BE-WNA": {
    description:
      "Two vertical bands of black and red, taken from the province’s arms: black for the Namur lion " +
      "and red for the diagonal bar across its shield. Adopted 1953.",
    sources: [
      { title: "Vlag van Namen (provincie) — Wikipedia", url: "https://nl.wikipedia.org/wiki/Vlag_van_Namen_(provincie)" },
    ],
  },

  "PT-20": {
    description:
      "A blue band at the hoist and a white field, over which nine gold stars arch above a gold " +
      "goshawk (açor) with outspread wings; the Portuguese shield sits in the canton. Blue and white " +
      "are the traditional Portuguese colours of the constitutional monarchy; the nine stars are the " +
      "archipelago’s nine islands; the goshawk gives the Azores their name; the shield marks Azorean " +
      "Portuguese patriotism. Adopted 1979.",
    sources: [
      { title: "Flag of the Azores — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Azores" },
    ],
  },

  "PT-30": {
    description:
      "A vertical triband of blue, gold and blue with the red Cross of the Order of Christ on the gold. " +
      "Blue stands for the sea and for nobility and serenity; gold for the mild climate and for wealth, " +
      "faith and constancy; the cross recalls that Madeira was discovered by knights of Henry the " +
      "Navigator, Grand Master of the Order of Christ, which owned and settled the islands. Adopted 1978.",
    sources: [
      { title: "Flag of Madeira — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Madeira" },
    ],
  },

  "MT-03": {
    description:
      "An armoured arm holding a sword for the victory over the Ottomans in the Great Siege of 1565, with " +
      "an olive branch for peace and a palm for victory (motto “Victrix Palmam Fero”) — canting arms for " +
      "Città Vittoriosa; the four-towered crown marks Birgu as a former capital of the Knights.",
    sources: [
      { title: "Il-Birgu (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-03.html" },
    ],
  },

  "MT-05": {
    description:
      "A banner of the council’s arms: white, with a blue inverted chevron and a blue olive branch. The " +
      "olive branch is there because olive growing is of great economic importance to the village, whose " +
      "name, Birżebbuġa, means “well of olives” in Maltese. It replaced the council’s first flag, blue with " +
      "a gold chain around the edge and two crossed gold keys.",
    sources: [
      { title: "Birżebbuġa (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-15.html" },
      { title: "Birżebbuġa — Wikipedia", url: "https://en.wikipedia.org/wiki/Bir%C5%BCebbu%C4%A1a" },
    ],
  },

  "MT-06": {
    description:
      "A green cotton plant on gold — the arms of the Cotoner Grand Masters, who built the Cottonera Lines " +
      "of fortifications around the Three Cities that give Bormla its title, Città Cospicua.",
    sources: [
      { title: "Bormla / Cospicua (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-05.html" },
    ],
  },

  "MT-09": {
    description:
      "A red lion and a winged arm with a sword, both taken from the arms of Grand Master Manoel de " +
      "Vilhena, who built up Floriana as a suburb of Valletta.",
    sources: [
      { title: "Floriana (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-18.html" },
    ],
  },

  "MT-10": {
    description:
      "A heraldic fountain — a white and blue wavy disc — as canting arms for Fontana, “fountain”.",
    sources: [
      { title: "Il-Fontana, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-19.html" },
    ],
  },

  "MT-14": {
    description:
      "A gold star on blue and the red Dwejra tower (built in 1651 under Grand Master de Paule) on white. " +
      "L-Għarb takes its name from the Arabic for “west/sunset”, as it lies at the western tip of Gozo, and " +
      "its motto “In extremo vigilat” calls it a sentinel at the borderline.",
    sources: [
      { title: "L-Għarb, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-23.html" },
    ],
  },

  "MT-20": {
    description:
      "A black saltire with five silver scallops on gold — the arms of Grand Master Claude de la Sengle, " +
      "who founded and gave his name to the city of Senglea.",
    sources: [
      { title: "L-Isla / Senglea (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-04.html" },
    ],
  },

  "MT-27": {
    description:
      "A banner of the council’s arms: green, with a white wedge pointing down from the top edge and three " +
      "blue wavy lines across it. The wedge stands for Marsaskala’s bay, and the green on either side for the " +
      "land that surrounds it.",
    sources: [
      { title: "Marsaskala (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-35.html" },
    ],
  },

  "MT-29": {
    description:
      "A banner of the arms of Mdina, Malta’s old capital: white and red, divided vertically. These are " +
      "Malta’s own colours: the plain white-and-red bicolour was the islands’ unofficial flag until the " +
      "George Cross was added in 1943. Mdina may have linked its colours to Count Roger I of Sicily as early " +
      "as the late Middle Ages.",
    myths: [
      {
        claim:
          "Count Roger I of Sicily gave Malta its red and white in 1091, tearing a piece off his chequered " +
          "red-and-white banner so that he could tell the Maltese fighting for him from the Arab defenders.",
        reality:
          "The story is dismissed as a myth, probably of the 19th century, though perhaps older, because " +
          "Mdina associated its colours with Roger’s in the late Middle Ages. The red flag with a white " +
          "cross of the Knights of St John is a more likely source of the Maltese red and white.",
      },
    ],
    sources: [
      { title: "L-Imdina (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-02.html" },
      { title: "Flag of Malta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Malta" },
      { title: "List of flags of Malta — Wikipedia", url: "https://en.wikipedia.org/wiki/List_of_flags_of_Malta" },
    ],
  },

  "MT-30": {
    description:
      "A banner of the council’s arms: blue, with a gold chevron and a white six-pointed star above it. It " +
      "keeps the pattern of the village’s historical arms (white, with a gold star and a red chevron, still " +
      "used by the local football club) in new colours, after the heraldist Sir Adrian Strickland objected " +
      "that the old version put two metals, gold and white, together. According to the council’s 1994 " +
      "booklet on its arms, the star refers to King David, and the blue is the colour of the Virgin Mary " +
      "and also stands for the sea.",
    sources: [
      { title: "Il-Mellieħa (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-37.html" },
    ],
  },

  "MT-31": {
    description:
      "A trilithon for the neolithic temples near the village, above white and blue waves.",
    sources: [
      { title: "L-Imġarr (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-38.html" },
    ],
  },

  "MT-32": {
    description:
      "A red cross for the Catholic faith of the locals, a golden circle for the Rotunda — Mosta's great " +
      "domed parish church and its landmark — and a blue star for Our Lady, the town's patron, whose feast " +
      "falls on 15 August.",
    sources: [
      { title: "Il-Mosta (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-39.html" },
    ],
  },

  "MT-40": {
    description:
      "Two crossed gold swords for the village's military past — the former English barracks — ringed by " +
      "the thirteen coastal watch-towers built by Grand Master de Redin.",
    sources: [
      { title: "Pembroke (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-46.html" },
    ],
  },

  "MT-41": {
    description:
      "A pelican in her piety, feeding her young with her own blood — a symbol of Christ's sacrifice and a " +
      "crypto-canting reference to the village's name, Pietà (“piety”).",
    sources: [
      { title: "Tal-Pietà (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-47.html" },
    ],
  },

  "MT-42": {
    description:
      "A golden Gozo boat on rough water for the village's harbour (qala = “bay”), with the motto “In " +
      "Tempestate Perfugium” (a haven from storms).",
    sources: [
      { title: "Il-Qala, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-48.html" },
    ],
  },

  "MT-43": {
    description:
      "Five red crescents in saltire — the arms of Grand Master Pinto, who raised Qormi to the rank of " +
      "city in 1743.",
    sources: [
      { title: "Ħal Qormi (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-06.html" },
    ],
  },

  "MT-45": {
    description:
      "The triple-mount of the historic arms of Gozo (three hills rising above the sea), beneath the " +
      "letters “VR” for Victoria Regina — added when Queen Victoria's 1887 jubilee gave the city its name.",
    sources: [
      { title: "Victoria / Rabat, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-11.html" },
    ],
  },

  "MT-47": {
    description:
      "A blue band on silver with the motto “Sine Macula” (without stain), for the village's name — its " +
      "pure air, or its people's escape from a plague (safi = clean, pure).",
    sources: [
      { title: "Ħal Safi (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-51.html" },
    ],
  },

  "MT-49": {
    description:
      "A paschal lamb, the attribute of St John the Baptist — canting arms, since San Ġwann means “St " +
      "John”.",
    sources: [
      { title: "San Ġwann (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-53.html" },
    ],
  },

  "MT-50": {
    description:
      "St Lawrence's gridiron between two palms of martyrdom, for the village's patron saint.",
    sources: [
      { title: "San Lawrenz, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-54.html" },
    ],
  },

  "MT-51": {
    description:
      "Wavy lines for the bay, a snake for the viper that bit St Paul without harming him (Acts 28), and a " +
      "sword for the new faith and the saint's martyrdom.",
    sources: [
      { title: "San Pawl il-Baħar / St Paul's Bay (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-55.html" },
    ],
  },

  "MT-52": {
    description:
      "A sheaf of wheat and two sickles for the village's farming heritage and its harvest.",
    sources: [
      { title: "Ta' Sannat, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-56.html" },
    ],
  },

  "MT-53": {
    description:
      "A golden sun on black — canting arms for St Lucy, whose name comes from the Latin lux, “light”.",
    sources: [
      { title: "Santa Luċija (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-57.html" },
    ],
  },

  "MT-56": {
    description:
      "A star for the Stella Maris — Our Lady, Star of the Sea, who guides seafarers safely to harbour — " +
      "in the silver and red of Malta.",
    sources: [
      { title: "Tas-Sliema (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-59.html" },
    ],
  },

  "MT-57": {
    description:
      "Quarters of boulders (braġġ, for the hamlet of Ibraġ) and trenches (swieqi, for the main village), " +
      "with a saltire for St Andrew.",
    sources: [
      { title: "Is-Swieqi (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-60.html" },
    ],
  },

  "MT-58": {
    description:
      "A bird on a golden ship's wheel, for Ta' Xbiex being Malta's main yacht marina.",
    sources: [
      { title: "Ta' Xbiex (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-61.html" },
    ],
  },

  "MT-61": {
    description:
      "An apse of the Ġgantija temples in gold — a symbolic representation of the neolithic temple goddess.",
    sources: [
      { title: "Ix-Xagħra, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-63.html" },
    ],
  },

  "MT-62": {
    description:
      "A red fess between two thistles — canting arms, since Xewkija comes from xewk, “thorns”.",
    sources: [
      { title: "Ix-Xewkija, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-64.html" },
    ],
  },

  "MT-63": {
    description:
      "Three gold wheat-ears — canting arms, xgħajra being a Maltese word for grain — with a battery " +
      "recalling that the town grew up around an English coastal battery in the Second World War.",
    sources: [
      { title: "Ix-Xgħajra (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-65.html" },
    ],
  },

  "MT-64": {
    description:
      "An engrailed white saltire on red — the arms of Grand Master Ferdinand von Hompesch, for whom the " +
      "town is styled Città Hompesch.",
    sources: [
      { title: "Ħaż-Żabbar (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-08.html" },
    ],
  },

  "MT-65": {
    description:
      "A canting olive branch (żebbuġ = olive) above the nine gold mascles of Grand Master de Rohan, who " +
      "raised the village to a city.",
    sources: [
      { title: "Ħaż-Żebbuġ (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-07.html" },
    ],
  },

  "MT-66": {
    description:
      "An olive tree for the village's important olive-growing and for its name, which means “olive”.",
    sources: [
      { title: "Iż-Żebbuġ, Gozo (Malta) — Flags of the World", url: "https://crwflags.com/fotw/flags/mt-66.html" },
    ],
  },

  "PA-1": {
    description:
      "Divided diagonally yellow over green, with the letter “B” and three white stars for the province's " +
      "three districts. Designed in 1987.",
    sources: [
      { title: "Bocas del Toro (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-boc.html" },
    ],
  },

  "PA-3": {
    description:
      "Light-blue, white and gold stripes with the provincial arms. Light-blue is the sea that bathes the " +
      "coast, white the people's wish for peace and concord, and gold the province's resources; the arms " +
      "carry a 15th-century caravel for Columbus's discovery and a phoenix rising from flames for the " +
      "province's rebirth after it was destroyed in 1885 and 1915.",
    sources: [
      { title: "Colón (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-col.html" },
    ],
  },

  "PA-4": {
    description:
      "Divided diagonally red over green with thirteen white stars in a ring for the province's thirteen " +
      "districts. The red and green date from a brief 1965 independence movement that proclaimed a " +
      "“Chiriquí republic”; an alternate version shapes the colour line as a mountain for the Cordillera " +
      "de Talamanca.",
    sources: [
      { title: "Chiriquí (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-chiri.html" },
    ],
  },

  "PA-6": {
    description:
      "Yellow and blue bands with the provincial map and seven blue stars in an arc for the province's " +
      "seven districts — Chitré, Las Minas, Los Pozos, Ocú, Parita, Pesé and Santa María. Adopted 2013.",
    sources: [
      { title: "Herrera (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-her.html" },
    ],
  },

  "PA-7": {
    description:
      "Orange, black and white with the province's name and seven stars for its seven districts — Guararé, " +
      "Las Tablas, Los Santos, Macaracas, Pedasí, Pocrí and Tonosí. Adopted 2011.",
    sources: [
      { title: "Los Santos (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-los.html" },
    ],
  },

  "PA-9": {
    description:
      "A blue flag with the province's map and twelve stars in a horseshoe for its twelve districts. The " +
      "blue stands for the province's two coasts — Veraguas is the only Panamanian province reaching both " +
      "the Atlantic and the Pacific.",
    sources: [
      { title: "Veraguas (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-ver.html" },
    ],
  },

  "PA-10": {
    description:
      "A green triangle at the hoist for the province's fertile green mountains and its people's hope, " +
      "yellow stripes for the sun and a white stripe for peace and unity, with five stars for its " +
      "districts — Arraiján, La Chorrera, Capira, Chame and San Carlos. Adopted 2015.",
    sources: [
      { title: "Panamá Oeste (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-po.html" },
    ],
  },

  "PA-EM": {
    description:
      "Green, yellow and blue stripes: green for the comarca's natural wealth and abundant wildlife, " +
      "yellow for the people's customs and traditions handed to each new generation, and blue for the " +
      "great network of rivers that runs through their territory.",
    sources: [
      { title: "Emberá-Wounaan (Panama) — Flags of the World", url: "https://crwflags.com/fotw/flags/pa-emb.html" },
    ],
  },

  "HU-GY": {
    description:
      "The city arms on the flag: an old castle for Győr's history and three white stripes for its three " +
      "rivers — the Danube, the Rába and the Rábca — beside a cog-wheel and hammer for its industry and a " +
      "pen for its cultural traditions. The blue and red edges take the arms' colours.",
    sources: [
      { title: "Győr (Hungary) — Flags of the World", url: "https://crwflags.com/fotw/flags/hu-gyor.html" },
    ],
  },

  "AD-02": {
    description:
      "The parish emblem on white: the map of Andorra with Canillo picked out, two crossed laurel branches " +
      "and the Romanesque church of Sant Joan de Caselles rising behind the map.",
    sources: [
      { title: "Canillo (Andorra) — Flags of the World", url: "https://crwflags.com/fotw/flags/ad-100.html" },
    ],
  },

  "AD-03": {
    description:
      "The parish arms: a white mountain for the parish's terrain and gold keys for its authority, on a " +
      "purple band, with stars above.",
    sources: [
      { title: "Encamp (Andorra) — Flags of the World", url: "https://crwflags.com/fotw/flags/ad-200.html" },
    ],
  },

  "AD-04": {
    description:
      "The parish arms, party per pale: blue wavy pales for its streams and the red-and-gold chequy of the " +
      "counts of Foix, with a pine for La Massana's forests.",
    sources: [
      { title: "La Massana (Andorra) — Flags of the World", url: "https://crwflags.com/fotw/flags/ad-400.html" },
    ],
  },

  "AD-05": {
    description:
      "The parish arms gather emblems of Ordino's life: a fir tree for its landscape, a church for its " +
      "heritage, a cow for its pastoral tradition, an open book for learning, and a flower and a waterfall " +
      "for its nature.",
    sources: [
      { title: "Ordino (Andorra) — Flags of the World", url: "https://crwflags.com/fotw/flags/ad-300.html" },
    ],
  },

  "AD-06": {
    description:
      "The parish arms: four red pallets on gold — the arms of the counts of Foix — with green branches " +
      "for nature tied in a ribbon of Andorra's national colours.",
    sources: [
      { title: "Sant Julià de Lòria (Andorra) — Flags of the World", url: "https://crwflags.com/fotw/flags/ad-600.html" },
    ],
  },

  "AD-07": {
    description:
      "The parish arms: a holm oak for the sunny side of the valley and an oak for the shady side, three " +
      "blue wavy bands for the three Valira rivers (Valira del Nord, Valira d'Orient and the Gran Valira), " +
      "and green for the mountains and meadows.",
    sources: [
      { title: "Andorra la Vella (Andorra) — Flags of the World", url: "https://crwflags.com/fotw/flags/ad-500.html" },
    ],
  },

  "AD-08": {
    description:
      "The parish emblem: a stone bridge for the local landmark and a mineral-spring fountain — canting " +
      "for “les Escaldes”, the boiling thermal waters that name the parish — within a wreath.",
    sources: [
      { title: "Escaldes-Engordany (Andorra) — Flags of the World", url: "https://crwflags.com/fotw/flags/ad-700.html" },
    ],
  },

  "CR-G": {
    description:
      "Blue, white and green stripes with a red triangle at the hoist. The red triangle is the heart of " +
      "the Guanacastecans — their warmth, courage and joy; blue is the clear sky, white the province's " +
      "fertility and peace, and green the Guanacaste tree that names it, with its pastures, crops and the " +
      "work of farmer and cattleman. Made in 1974 for the 150th anniversary of Nicoya's annexation to " +
      "Costa Rica.",
    sources: [
      { title: "Guanacaste (Costa Rica) — Flags of the World", url: "https://crwflags.com/fotw/flags/cr-g.html" },
    ],
  },

  "CR-P": {
    description:
      "A flag of red, white, blue, green and orange with the province's emblem. Red is the mixed heritage " +
      "of its people, white peace and fraternity, blue the Pacific coast, green its rich natural resources " +
      "and orange the dynamism of the Puntarenians; the emblem's eleven rays are the province's eleven " +
      "cantons and “1848” the year the Comarca of Puntarenas was founded.",
    sources: [
      { title: "Puntarenas (Costa Rica) — Flags of the World", url: "https://crwflags.com/fotw/flags/cr-p.html" },
    ],
  },

  "CR-L": {
    description:
      "A blue and white flag bearing the province's arms: a sailing ship for this maritime province, a key " +
      "for its Caribbean seaport, a fruit tree for its banana crop, and a wreath of laurel and coffee for " +
      "peace and its harvest.",
    sources: [
      { title: "Limón (Costa Rica) — Flags of the World", url: "https://crwflags.com/fotw/flags/cr-l.html" },
    ],
  },

  "EC-D": {
    description:
      "Horizontal white, green and yellow with a black vertical stripe at the hoist and four stars. White " +
      "is the peaceful Amazonian people, green the biodiversity of the rainforest, yellow the province's " +
      "gold, and the black stripe the oil drawn from its soil; the four stars are its cantons.",
    sources: [
      { title: "Orellana (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-v.html" },
    ],
  },

  "EC-E": {
    description:
      "A bicolour whose green stripe stands for the province's name — Esmeraldas means “emeralds”.",
    sources: [
      { title: "Esmeraldas (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-e.html" },
    ],
  },

  "EC-F": {
    description:
      "Blue, yellow and red stripes with the arms on the yellow. Blue is the loftiness of the province's " +
      "ideals, yellow its farming and mineral wealth, and red the enthusiasm and faith of its people. In " +
      "the arms a moon recalls the Cañari ancestral deity, wheat and laurel its farming, a capulí tree " +
      "love of homeland, a torch its aspirations, and the stars its cantons.",
    sources: [
      { title: "Cañar (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-f.html" },
    ],
  },

  "EC-I": {
    description:
      "Red, white and green stripes with a blue triangle, usually charged with the arms. In the arms four " +
      "stars are the province's four cantons, Mount Imbabura the loftiness of its people's thought, a lake " +
      "the province's scenery, a cornucopia its crops, and laurel and olive branches its triumph and peace.",
    sources: [
      { title: "Imbabura (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-i.html" },
    ],
  },

  "EC-M": {
    description:
      "Green, white and red with a red triangle and stars. Green is the fertility of the Manabí earth, red " +
      "the blood shed in the liberal deeds of General Eloy Alfaro, and white the peace and work the " +
      "province longs for; the stars are its cantons.",
    sources: [
      { title: "Manabí (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-m.html" },
    ],
  },

  "EC-P": {
    description:
      "A yellow and red vertical bicolour, usually charged with the arms. In the arms a sun with nine stars " +
      "marks the nine cantons that first formed the province, two green heights the La Marca mountains " +
      "where pre-Columbian peoples held the equinox festival, the Mitad del Mundo monument the 1736–37 " +
      "geodesic mission that measured the Earth, and a condor Ecuador and valour.",
    sources: [
      { title: "Pichincha (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-p.html" },
    ],
  },

  "EC-SD": {
    description:
      "A flag rich in Tsáchila symbolism: red is fire, ancestral blood and achiote dye; green the region's " +
      "lush vegetation and hope; white light and purity; black austerity and the huito plant; yellow gold " +
      "and wealth. A white saltire is the four roads in the pattern of the Tsáchila men's dress, a sun the " +
      "people's heritage with rays for their water, and a hummingbird their multi-ethnic culture — its 17 " +
      "feathers the 17 months their province took to be created.",
    sources: [
      { title: "Santo Domingo de los Tsáchilas (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-k.html" },
    ],
  },

  "EC-SE": {
    description:
      "Green over golden-yellow with the arms and six stars. Green is the ocean that washes the coast, " +
      "yellow the province's mineral resources, and the six stars its parishes.",
    sources: [
      { title: "Santa Elena (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-j.html" },
    ],
  },

  "EC-T": {
    description:
      "Red, green and red stripes with the arms on the green. Red is the tenacious nature of the people " +
      "and green the happiness of its fields; the arms show the Tungurahua volcano, the ford of the river " +
      "Topo and cinnamon with cornucopias for the province's abundance as a gateway to Amazonia.",
    sources: [
      { title: "Tungurahua (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-t.html" },
    ],
  },

  "EC-X": {
    description:
      "A red-over-blue flag with the province's arms, which carry the volcano Cotopaxi, seven towers for " +
      "its seven cantons, wheat and a bull for its farming and herds, forest and water for its resources, " +
      "and a pre-Hispanic sun.",
    sources: [
      { title: "Cotopaxi (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-x.html" },
    ],
  },

  "EC-Y": {
    description:
      "Green and yellow quarters — green for the province's natural fertility, yellow for its resources in " +
      "gold and water.",
    sources: [
      { title: "Pastaza (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-y.html" },
    ],
  },

  "EC-Z": {
    description:
      "White, green and yellow stripes — white for peace among its people, green for the flora of the " +
      "Amazon basin, and yellow for the province's gold.",
    sources: [
      { title: "Zamora-Chinchipe (Ecuador) — Flags of the World", url: "https://crwflags.com/fotw/flags/ec-z.html" },
    ],
  },

  "MX-BCS": {
    description:
      "A white field bearing the state coat of arms at the centre. Adopted 2017 as the state’s first " +
      "official flag; the law specifies the white field and the arms without assigning a separate " +
      "colour symbolism.",
    sources: [
      { title: "Bandera de Baja California Sur — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Baja_California_Sur" },
    ],
  },

  "MX-DUR": {
    description:
      "A white field bearing the coat of arms of Durango at the centre. Adopted 2014; the law specifies " +
      "the white field and the arms without assigning a separate colour symbolism.",
    sources: [
      { title: "Bandera de Durango — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Durango" },
    ],
  },

  "MX-GUA": {
    description:
      "A white field with a gold border bearing the coat of arms of Guanajuato — Saint Faith with " +
      "chalice and cross over a scallop shell and laurel, under the royal crown of Castile. White " +
      "stands for freedom, peace and harmony; gold for the region’s mining wealth. Adopted 2023 for the " +
      "state’s bicentenary.",
    sources: [
      { title: "Bandera de Guanajuato — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Guanajuato" },
    ],
  },

  "MX-GRO": {
    description:
      "A white field bearing the coat of arms of Guerrero at the centre. Adopted 2019; the law " +
      "specifies the white field and the arms without assigning a separate colour symbolism.",
    sources: [
      { title: "Bandera de Guerrero — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Guerrero" },
    ],
  },

  "MX-JAL": {
    description:
      "Two equal vertical bands of blue and gold with the state coat of arms — two lions and a golden " +
      "pine on blue — between them. Gold stands for doing good to the poor, blue for serving the rulers " +
      "and fostering agriculture; the colours derive from the Kingdom of Galicia and Guadalajara’s " +
      "original arms. Adopted 2011 (first officialised 2008, the first Mexican state flag).",
    sources: [
      { title: "Bandera de Jalisco — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Jalisco" },
    ],
  },

  "MX-QUE": {
    description:
      "A white field bearing the coat of arms of Querétaro at the centre. Adopted 2015; the law " +
      "specifies the white field and the arms without assigning a separate colour symbolism.",
    sources: [
      { title: "Bandera de Querétaro — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Quer%C3%A9taro" },
    ],
  },

  "MX-ROO": {
    description:
      "A white field bearing the coat of arms of Quintana Roo at the centre. Adopted 2013 as the " +
      "state’s first official flag; the law specifies the white field and the arms without a separate " +
      "colour symbolism.",
    sources: [
      { title: "Bandera de Quintana Roo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Quintana_Roo" },
    ],
  },

  "MX-TLA": {
    description:
      "A field divided diagonally, red at the hoist and white, with the state coat of arms at the " +
      "centre. The red and white are the colours that have identified the Tlaxcaltecs since " +
      "pre-Hispanic times — associated with the war-god Camaxtli and the Teochichimeca — and echo the " +
      "arms of Castile and León. Adopted 2016, the second Mexican state flag with a distinctive design.",
    sources: [
      { title: "Bandera de Tlaxcala — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Tlaxcala" },
    ],
  },

  "MX-YUC": {
    description:
      "A green field with five white stars at the hoist and, at the fly, three horizontal stripes of " +
      "red, white and red. Green stands for the Maya people (from “ya’ax,” green, and the sacred ceiba " +
      "tree); the five stars were the five departments of independent Yucatán and now mean freedom, " +
      "equality, identity, peace and progress; the red and white stripes mark three historical eras. " +
      "Based on the 1841 Republic of Yucatán flag; officialised as the state flag in 2024.",
    sources: [
      { title: "Bandera de Yucatán — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Yucat%C3%A1n" },
    ],
  },

  "MX-DIF": {
    description:
      "The city's coat of arms on a plain field (the state has no separate legislated flag). The arms, " +
      "granted by royal decree in 1523, show a blue shield for the lake on which the city was founded, a " +
      "golden castle approached by three stone bridges with a lion beside each, all bordered by ten green " +
      "nopal (prickly-pear) pads recalling the city's Aztec origin.",
    sources: [
      { title: "Mexico City — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-cx.html" },
    ],
  },

  "MX-COL": {
    description:
      "The state coat of arms on a white field. The shield bears the glyph of “Colliman” (from colli, " +
      "hill or volcano, and ma, place), flanked by hibiscus and black indigo snakes; jaguars stand over " +
      "sea-shells and waves and the Volcano of Colima rises below. The motto reads “El temple del brazo " +
      "es vigor en la tierra” (the temper of the arm is vigour upon the land).",
    sources: [
      { title: "Colima — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-cl.html" },
    ],
  },

  "MX-HID": {
    description:
      "The state coat of arms — designed in 1922 by the muralist Diego Rivera — on a white field. It " +
      "celebrates Hidalgo's role in independence: the blue banner of the Virgin of Guadalupe that Padre " +
      "Hidalgo raised, the Dolores bell rung to proclaim independence, a liberty cap for the freedom won " +
      "in 1821, a war drum for the three great movements (Independence, Reform and Revolution), and " +
      "mine-shaft openings for the state's mining.",
    sources: [
      { title: "Hidalgo — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-hg.html" },
    ],
  },

  "MX-MEX": {
    description:
      "The state coat of arms on a white field, in three parts. Patria: the national eagle with the " +
      "Xinantécatl volcano and the Pyramid of the Sun. Libertad: a cannon for the 1810 Battle of Monte de " +
      "las Cruces. Trabajo y Cultura: corn, an open book and industrial tools, with sixteen bees for the " +
      "state's judicial districts.",
    sources: [
      { title: "State of Mexico — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-em.html" },
    ],
  },

  "MX-MIC": {
    description:
      "The state coat of arms on a white field. Its crest is the pre-Hispanic glyph for Michoacán, from " +
      "the Nahuatl michin (fish) and can (place) — “the place of the fishermen”.",
    sources: [
      { title: "Michoacán — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-mi.html" },
    ],
  },

  "MX-NLE": {
    description:
      "The state coat of arms on a white field. A lion stands for “Nuevo León” (New León, after León in " +
      "Spain); the Cerro de la Silla (Saddle Hill) and Santa Catarina river of the capital Monterrey rise " +
      "under a red dawn sky; the San Francisco monastery recalls the first Spanish settlement, the " +
      "Fundidora steel-mill chimneys the state's industry, and bees its work ethic.",
    sources: [
      { title: "Nuevo León — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-nl.html" },
    ],
  },

  "MX-PUE": {
    description:
      "The state coat of arms on a white field. A factory, river and cog-wheel stand for progress, a dam " +
      "and power plant for electricity, an arm raising a rifle over fire for the 1910 Revolution, farmland " +
      "for agriculture, the date “5 MAYO 1862” for the victory at the Battle of Puebla, and two feathered " +
      "serpents (Quetzalcóatl) recalling the Toltec past.",
    sources: [
      { title: "Puebla — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-pu.html" },
    ],
  },

  "MX-SLP": {
    description:
      "The state coat of arms on a white field: the hill of San Pedro on a field barred gold and silver " +
      "for the wealth of its mines, with Saint Louis IX of France — the city's patron — at the summit. " +
      "The “Potosí” in the name likens its mines to the rich silver of Potosí in Bolivia.",
    sources: [
      { title: "San Luis Potosí — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-si.html" },
    ],
  },

  "MX-SON": {
    description:
      "The state coat of arms on a white field, quartered for Sonora's life and economy: a Yaqui dancing " +
      "the Deer Dance for its indigenous tradition, a mine entrance with pick and shovel for mining, " +
      "wheat and a sickle for farming, a cow's head for ranching, and the state's coast with a tuna for " +
      "its fisheries.",
    sources: [
      { title: "Sonora — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-so.html" },
    ],
  },

  "MX-TAM": {
    description:
      "The state coat of arms on a white field, quartered for Tamaulipas's economy: crops for its " +
      "agriculture, the arms of the Count of Sierra Gorda who colonised the region, livestock and wildlife " +
      "(bull, deer and goat), and a lower field gathering its industries — fishing, farming, energy and " +
      "manufacturing.",
    sources: [
      { title: "Tamaulipas — Flags of the World", url: "https://crwflags.com/fotw/flags/mx-tm.html" },
    ],
  },




  "ES-AL": {
    description:
      "A white flag with a purple cross of Saint George and the provincial arms. The cross recalls the " +
      "Christian reconquest of Almería, which Genoese troops are said to have aided; the shield bears the " +
      "silver Genoese cross on red for that role, within a border gathering the emblems of the old Spanish " +
      "kingdoms — Castile, León, Aragón, Navarre and Granada.",
    sources: [
      { title: "Almería (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-an-al.html" },
    ],
  },

  "ES-GR": {
    description:
      "A green flag — the green of al-Andalus and of the Nasrid standards taken in the war of Granada — " +
      "with the provincial arms. Their pomegranate is a canting emblem (granada means “pomegranate”), " +
      "added to the royal arms after the reconquest of 1492; the border of castles and lions stands for " +
      "the province's historic territories.",
    sources: [
      { title: "Granada (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-an-gr.html" },
    ],
  },

  "ES-H": {
    description:
      "A blue flag with the provincial arms: a three-towered fortress inscribed “Portus maris et terrae " +
      "custodia” (guardian of sea and land), three caravels for Columbus's 1492 voyage that sailed from " +
      "Huelva's shores, a caduceus of Mercury for commerce and a cornucopia for abundance.",
    sources: [
      { title: "Huelva (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-an-h.html" },
    ],
  },

  "ES-J": {
    description:
      "A green flag — for the province's olive groves, fields and countryside — with the provincial arms. " +
      "Their central Holy Face (the veil of Veronica) stands for the “Holy Kingdom of Jaén”, within a " +
      "border of castles and lions for its historic territories.",
    sources: [
      { title: "Jaén (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-an-j.html" },
    ],
  },

  "ES-MA": {
    description:
      "A white flag with a blue border, taken from the old flag of the Maritime Province of Málaga, " +
      "bearing the provincial arms. One half shows the city's own arms; the other, twelve red and gold " +
      "stripes for the twelve judicial districts that make up the rest of the province.",
    sources: [
      { title: "Málaga (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-an-ma.html" },
    ],
  },

  "ES-SE": {
    description:
      "A green flag with the provincial arms, which honour three saints of Seville — King (Saint) " +
      "Ferdinand III, who took the city in 1248, and the brothers Saint Isidore and Saint Leander, its " +
      "great bishops — surrounded by a collar of shields for the province's district-capital towns.",
    sources: [
      { title: "Seville (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-an-se.html" },
    ],
  },

  "ES-HU": {
    description:
      "A white flag with a red cross and the provincial arms, which gather the emblems of its historic " +
      "districts — among them Jaca's patriarchal cross with the four Moorish kings' heads, and Huesca's " +
      "silver horseman with the motto “Urbs Victrix Osca” (Huesca the victorious).",
    sources: [
      { title: "Huesca (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-ar-hu.html" },
    ],
  },

  "ES-TE": {
    description:
      "A white flag with a red cross and the provincial arms: the red-and-gold bars of the old Kingdom of " +
      "Aragón, the silver star and bull of Teruel, Santa María of Albarracín, the castle of Alcañiz, and " +
      "at the centre Saint George — patron of Aragón — spearing the dragon.",
    sources: [
      { title: "Teruel (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-ar-te.html" },
    ],
  },

  "ES-Z": {
    description:
      "A white flag with the red cross of Saint George and the provincial arms, which quarter the Sobrarbe " +
      "oak and cross, Saint George's cross with four Moorish heads, and the red-and-gold bars of Aragón, " +
      "over the silver Pillar (Pilar) of Zaragoza.",
    sources: [
      { title: "Zaragoza (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-ar-z.html" },
    ],
  },

  "ES-CA": {
    description:
      "A green flag with the provincial arms. Their border quarters the arms of Castile and León, and the " +
      "twelve fields of the shield each stand for a judicial district of the province — among them Cádiz " +
      "with Hercules and his lions for the city's legendary founder, and the Pillars of Hercules with the " +
      "motto “Plus Ultra” framing the whole.",
    sources: [
      { title: "Cádiz (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-an-ca.html" },
    ],
  },

  "ES-LE": {
    description:
      "A crimson (purple) flag bearing the provincial arms — a silver field with a purple crowned lion " +
      "rampant, the canting emblem of the old Kingdom of León (león means “lion”).",
    sources: [
      { title: "León (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cl-le.html" },
    ],
  },

  "ES-BU": {
    description:
      "A purple flag bearing the provincial arms. They show King (Saint) Ferdinand III — for Burgos as " +
      "the historic capital and court of Castile — the three castles on his robe standing for the lands " +
      "of Lara, Muño and Cellorigo, beside the gold castle on red of Castile, all within a border of " +
      "sixteen castles for the many towns gathered into the province.",
    sources: [
      { title: "Burgos (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cl-bu.html" },
    ],
  },

  "ES-SA": {
    description:
      "A purple flag bearing the provincial arms, which quarter the emblems of its judicial districts — " +
      "Ciudad Rodrigo's Roman columns, Béjar's bees, Peñaranda de Bracamonte's towers and Vitigudino's " +
      "sword and cross — around an inescutcheon for the city of Salamanca with its Roman bridge, bull and " +
      "fig tree.",
    sources: [
      { title: "Salamanca (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cl-sa.html" },
    ],
  },

  "ES-SG": {
    description:
      "A crimson flag with the provincial arms, a patchwork of the arms of its judicial districts — " +
      "Sepúlveda's castle and keys, Cuéllar's collared horse, Riaza's two trout and Santa María de Nieva's " +
      "lily vase — around an inescutcheon for the city of Segovia with its Roman aqueduct.",
    sources: [
      { title: "Segovia (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cl-sg.html" },
    ],
  },

  "ES-TO": {
    description:
      "A green flag with the provincial arms: a black double-headed eagle and the quartered arms of " +
      "Castile and León, crowned with the Imperial crown of the old Kingdom of Toledo — the imperial city " +
      "of Emperor Charles V — with the collar of the Golden Fleece and the Pillars of Hercules bearing the " +
      "motto “Plus Ultra”.",
    sources: [
      { title: "Toledo (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cm-to.html" },
    ],
  },

  "ES-BA": {
    description:
      "A blue flag with the provincial arms (adopted 1868): a silver column for the Pillars of Hercules " +
      "bearing the scroll “Plus Ultra” (“further beyond”, the device of Spain's overseas expansion), " +
      "flanked by a red lion for strength.",
    sources: [
      { title: "Badajoz (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-ex-ba.html" },
    ],
  },

  "ES-AV": {
    description:
      "A red flag with the provincial arms, which quarter the emblems of its judicial districts — Arenas " +
      "de San Pedro's burning castle, Piedrahíta's crow, Arévalo's bareback knight, Cebreros's zebra and " +
      "El Barco de Ávila's bridge — with the capital's own arms showing the cathedral, King Alfonso and " +
      "the motto “Ávila del Rey”.",
    sources: [
      { title: "Ávila (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cl-av.html" },
    ],
  },

  "ES-VI": {
    description:
      "A crimson flag with the provincial arms: a castle on a rock for the fortified land, an armed arm " +
      "with a sword and the motto “En aumento de la justicia contra malhechores” (“for the increase of " +
      "justice against wrongdoers”), and a red lion for valour.",
    sources: [
      { title: "Álava (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-pv-vi.html" },
    ],
  },

  "ES-SS": {
    description:
      "A white flag with the provincial arms: three green yew trees — an emblem of Gipuzkoa in its seals " +
      "since the 1400s — over silver and blue waves for the sea. The older arms also bore twelve golden " +
      "cannons for the French guns captured at the battle of Velate in 1512.",
    sources: [
      { title: "Gipuzkoa (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-pv-ss.html" },
    ],
  },


  "ES-BI": {
    description:
      "A carmine-red flag with the provincial arms: on a silver field, the Oak of Gernika beneath a Latin " +
      "cross. The oak stands for the traditional liberties of the Basque people, whose laws and privileges " +
      "were sworn beneath that tree; a border of red saltires frames the shield.",
    sources: [
      { title: "Bizkaia (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-pv-bi.html" },
    ],
  },

  "ES-A": {
    description:
      "A white and blue flag with the provincial arms: in the upper half the red-and-gold pallets of the " +
      "Crown of Aragón and old Kingdom of Valencia, and below a golden castle on a rock above the sea — " +
      "the coastal stronghold that gives the province its name.",
    sources: [
      { title: "Alicante (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-vc-a.html" },
    ],
  },

  "ES-OR": {
    description:
      "Eleven white discs on a dark-blue field, standing for the rivers that gave rise to the province's " +
      "natural regions (comarcas).",
    sources: [
      { title: "Ourense (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-ga-ou.html" },
    ],
  },

  "ES-L": {
    description:
      "The provincial arms gather the emblems of its nine historic judicial districts — among them " +
      "Solsona's castle and sun, the double-headed eagle of Pallars, the enthroned Virgin of Seu d'Urgell " +
      "and the stag of Cervera — most quartered with the four red bars of Catalonia.",
    sources: [
      { title: "Lleida (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-ct-l.html" },
    ],
  },

  "ES-CS": {
    description:
      "The provincial arms: a silver three-towered castle — a canting emblem, since Castellón means " +
      "“little castle” — over the four red bars of the old Kingdom of Aragón.",
    sources: [
      { title: "Castellón (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-vc-cs.html" },
    ],
  },

  "ES-CR": {
    description:
      "A red flag with the provincial arms, made up of ten shields for the capitals of its judicial " +
      "districts — rich in the crosses of the military orders that settled La Mancha (Calatrava, Santiago " +
      "and Saint John) — around the capital's own arms, a crowned king enthroned within a walled city.",
    sources: [
      { title: "Ciudad Real (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cm-cr.html" },
    ],
  },

  "ES-P": {
    description:
      "A purple flag with the provincial arms, gathering the emblems of its judicial districts — " +
      "Frechilla's eagle, Cervera's stags, Saldaña's “Ave María” saltire, Astudillo's bull and star, " +
      "Carrión's cart and lion and Baltanás's towers — around the capital's cross and castle, with the " +
      "motto “Armas y Ciencia” (Arms and Science).",
    sources: [
      { title: "Palencia (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cl-p.html" },
    ],
  },

  "ES-SO": {
    description:
      "A purple flag with the provincial arms, a patchwork of its judicial districts — Ágreda's vine, " +
      "Almazán's fig tree, Medinaceli's mounted knight and Osma's castle — around an inescutcheon with " +
      "King Alfonso VIII, and the motto “Soria pura, cabeza de Extremadura”.",
    sources: [
      { title: "Soria (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cl-so.html" },
    ],
  },

  "ES-CU": {
    description:
      "The provincial arms combine Castile's castle and lion with the emblems of Cuenca's 1177 " +
      "reconquest — a chalice for Saint Matthew, on whose feast the city was taken, and a star for the " +
      "Epiphany day the siege began, on a red field for the blood of that victory — with a pine tree for " +
      "youth and liberty and a gold field recalling the royal Charter (Fuero) of Cuenca.",
    sources: [
      { title: "Cuenca (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cm-cu.html" },
    ],
  },

  "ES-GU": {
    description:
      "The provincial arms gather the heraldry of its nine judicial-district capitals — among them Molina " +
      "de Aragón's millstones, Sigüenza's castle and eagle, Atienza's lion, and the capital Guadalajara's " +
      "walled gate with a mounted warrior bearing a banner.",
    sources: [
      { title: "Guadalajara (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cm-gu.html" },
    ],
  },

  "ES-AB": {
    description:
      "A red flag with the provincial arms: the two crossed keys of Alcaraz, the winged hand and sword of " +
      "the Manuel family (first lords of Villena), the sword-cross of the Order of Santiago, and at the " +
      "centre Albacete's three towers crowned by a bat.",
    sources: [
      { title: "Albacete (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-cm-ab.html" },
    ],
  },

  "ES-LU": {
    description:
      "A red and blue flag with the provincial arms, taken from the cathedral seal of Lugo: a chalice and " +
      "host for the cathedral's privilege of perpetually displaying the Blessed Sacrament, and a castle " +
      "with two lions for the town's Roman walls and the valour of its people through many sieges.",
    sources: [
      { title: "Lugo (Spain) — Flags of the World", url: "https://crwflags.com/fotw/flags/es-ga-lu.html" },
    ],
  },

  "ES-O": {
    description:
      "A blue field with a yellow Victory Cross (Cruz de la Victoria) toward the hoist, the Greek " +
      "letters Alpha and Omega hanging from its arms. The cross is the one tradition says King Pelagius " +
      "carried at Covadonga (722), regarded as the start of the Reconquista, later gilded by Alfonso " +
      "III in 908 and kept in Oviedo Cathedral. Adopted 1990.",
    sources: [
      { title: "Flag of Asturias — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Asturias" },
    ],
  },


  "ES-S": {
    description:
      "Two equal horizontal stripes, white over red, with the region’s coat of arms at the centre. The " +
      "bicolour derives from the 1845 ship-registration flag of the maritime province of Santander (the " +
      "province coextensive with Cantabria). The arms were made official in 1981.",
    sources: [
      { title: "Flag of Cantabria — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Cantabria" },
    ],
  },


  "ES-NA": {
    description:
      "A red field bearing the coat of arms of Navarre — gold chains around a central emerald on red, " +
      "beneath a royal crown. Red comes from the field of the arms; the chains symbolise the historic " +
      "Kingdom of Navarre. Design created 1910, adopted 1982.",
    sources: [
      { title: "Flag of Navarre — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Navarre" },
    ],
  },


  "ES-LO": {
    description:
      "Four horizontal bands of red, white, green and yellow with the coat of arms at the centre — the " +
      "flag of La Rioja (the province of Logroño). Red is the wine, white the rivers and sky, green the " +
      "fields and forests, yellow the land and monuments. Adopted 1982.",
    sources: [
      { title: "Flag of La Rioja (Spain) — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_La_Rioja_(Spain)" },
    ],
  },

  "ES-M": {
    description:
      "A crimson field with seven white five-pointed stars set four-and-three. Crimson is the colour of " +
      "Castile, to which Madrid has always belonged; the seven stars stand for the historic districts " +
      "of the province and echo the constellation of the Bear (Ursa Major/Minor) from the city’s arms. " +
      "Adopted 1983.",
    sources: [
      { title: "Flag of the Community of Madrid — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Community_of_Madrid" },
    ],
  },

  "ES-MU": {
    description:
      "A crimson field with four gold castles in the upper hoist and seven royal crowns in the lower " +
      "fly. The castles recall the region’s history as a contested frontier and the four lordships it " +
      "was first divided into; the seven crowns were granted by successive kings (five by Alfonso X in " +
      "1281, and one each in 1361 and 1709) for Murcia’s loyalty. Adopted 1983.",
    sources: [
      { title: "Flag of the Region of Murcia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Region_of_Murcia" },
    ],
  },

  "ES-CE": {
    description:
      "A black-and-white gyronny (radiating triangles) with the city’s coat of arms on a central " +
      "shield. The gyronny copies the flag of Lisbon, commemorating Portugal’s 1415 conquest of Ceuta; " +
      "the arms carry Portuguese castles and escutcheons from the city’s time under Portugal until it " +
      "chose to remain Spanish in 1640. Adopted 1995.",
    sources: [
      { title: "Flag of Ceuta — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ceuta" },
    ],
  },

  "ES-ML": {
    description:
      "A pale-blue field bearing the coat of arms of Melilla. The arms are those of the Ducal House of " +
      "Medina Sidonia, which funded the 1497 capture of the city, with the Pillars of Hercules as " +
      "supporters and the motto “Non Plus Ultra.” Adopted 1995.",
    sources: [
      { title: "Flag of Melilla — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Melilla" },
    ],
  },

  "ES-B": {
    description:
      "A banner of the province’s arms: the red St George’s cross of the city of Barcelona combined " +
      "with the four red bars of Aragon on gold, rendered as horizontal stripes. Established by royal " +
      "ordinance in 1871 and approved by the provincial council in 1874.",
    sources: [
      { title: "Flag of the Province of Barcelona — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Province_of_Barcelona" },
    ],
  },

  "ES-PM": {
    description:
      "Four red bars on gold (the Senyera of the Crown of Aragon) with a purple canton at the hoist " +
      "bearing a white five-towered castle. The four bars mark the historic tie to the Crown of Aragon; " +
      "the castle on purple derives from the flag of the medieval Kingdom of Mallorca. Adopted 1983.",
    sources: [
      { title: "Flag of the Balearic Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Balearic_Islands" },
    ],
  },

  "VE-V": {
    description:
      "Two equal horizontal bands, blue over black, with a yellow sun crossed by a white diagonal " +
      "lightning bolt at the centre. Blue is the waters of Lake Maracaibo; black the state’s petroleum " +
      "wealth; the yellow sun marks Maracaibo as the “beloved city of the sun”; the white bolt is the " +
      "Catatumbo Lightning. Adopted 1991.",
    sources: [
      { title: "Bandera del estado Zulia — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Zulia" },
    ],
  },

  "VE-L": {
    description:
      "Three triangles — emerald green at the hoist, white in the centre and sky-blue at the fly — with " +
      "a red five-pointed star on the white. Green is the beauty of the mountains, valleys and " +
      "agriculture; white the purity and the snows of the Sierra de Mérida (Pico Bolívar); blue the sky " +
      "and the route to Lake Maracaibo; the red star marks Mérida as a founding province of independent " +
      "Venezuela and the patriots’ blood. Adopted 1996.",
    sources: [
      { title: "Bandera del estado Mérida — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_M%C3%A9rida" },
    ],
  },

  "VE-G": {
    description:
      "A wine-red (vinotinto) field with a thin green stripe low across it, interrupted by a yellow sun " +
      "around the Arch of Carabobo. Vinotinto is the blood shed by patriots on the field of Carabobo; " +
      "blue tones its maritime outlet at Puerto Cabello; the sun the light that overcomes darkness; the " +
      "green stripe its farming and ecology; the arch commemorates the decisive 1821 Battle of Carabobo.",
    sources: [
      { title: "Bandera del estado Carabobo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Carabobo" },
    ],
  },

  "VE-B": {
    description:
      "Three equal horizontal bands of blue, yellow and green with the black-outlined silhouette of the " +
      "state at the centre. Blue is the seas, rivers and skies; yellow the warmth of the state and its " +
      "people; green its natural wealth; the black outline its petroleum. Adopted 1999.",
    sources: [
      { title: "Bandera del estado Anzoátegui — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Anzo%C3%A1tegui" },
    ],
  },

  "VE-D": {
    description:
      "Four triangles — red at top and bottom, yellow at the sides — with the state coat of arms at the " +
      "centre. Yellow stands for the tropical climate and for nobility and charity; red for strength, " +
      "valour and fidelity and the blood of the independence heroes. Adopted 1993.",
    sources: [
      { title: "Bandera del estado Aragua — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Aragua" },
    ],
  },

  "VE-E": {
    description:
      "Three horizontal bands of green, white and blue with a red square, and a central emblem of a " +
      "seven-rayed sun, a path/pyramid and a palm. Green is the savanna, white its vastness, blue the " +
      "sky, red the warrior past and independence sacrifice; the seven-rayed sun is the seven provinces " +
      "of the old Captaincy General, and the sun-path-palm express the essence of “Barinidad.” Adopted " +
      "1997.",
    sources: [
      { title: "Bandera del estado Barinas — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Barinas" },
    ],
  },

  "VE-C": {
    description:
      "Three horizontal bands of yellow, blue and green with a white triangle at the hoist bearing the " +
      "state arms, and seven white stars on the blue band. Yellow is the sun; blue the Apure River that " +
      "names the state; green the plains (llanos); the white triangle integrity; the seven stars the " +
      "state’s seven municipalities. Adopted 1996.",
    sources: [
      { title: "Bandera del estado Apure — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Apure" },
    ],
  },

  "VE-F": {
    description:
      "A yellow field with a green circle and three blue horizontal stripes bearing eight white stars, " +
      "with the state arms in the upper hoist. Yellow is the state’s mineral wealth; the green circle " +
      "its vegetation; the blue stripes its rivers; seven stars are the seven provinces that declared " +
      "independence and the eighth is Guayana Province, added by Bolívar to the national flag in 1817. " +
      "Adopted 2000.",
    sources: [
      { title: "Bandera del estado Bolívar — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Bol%C3%ADvar" },
    ],
  },

  "VE-I": {
    description:
      "A blue field for sky and sea with a red band across the top bearing the motto “Muera la tiranía " +
      "y viva la libertad,” a radiant sun in the upper hoist and a white moon in the lower fly. It is " +
      "based on Francisco de Miranda’s 1806 flag; the rising sun is American liberty dawning and the " +
      "waning moon Spain’s declining power. Adopted 2006.",
    sources: [
      { title: "Bandera del estado Falcón — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Falc%C3%B3n" },
    ],
  },

  "VE-H": {
    description:
      "Three horizontal bands — a broad orange, a black and a blue — with a gold sun. Orange stands for " +
      "the wealth of the soil and the people’s faith, constancy and courage; black for iron, science " +
      "and industry; blue for the firmament and the state’s waters; the gold sun commemorates the 1813 " +
      "Battle of Taguanes, its rays the lances of the independence fighters. Adopted 1997.",
    sources: [
      { title: "Bandera del estado Cojedes — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Cojedes" },
    ],
  },

  "VE-J": {
    description:
      "Four horizontal bands of blue, white, yellow and green with a central emblem of the state map, " +
      "Los Morros de San Juan, a bull’s head and rice and sorghum branches. Blue is the sky; white the " +
      "purity of the llanero soul; yellow the farming and cattle wealth; green the land in the rainy " +
      "season; the fifteen stars the state’s municipalities. Adopted 1995.",
    sources: [
      { title: "Bandera del estado Guárico — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Gu%C3%A1rico" },
    ],
  },

  "VE-M": {
    description:
      "Three horizontal bands of black, red and yellow, based on Francisco de Miranda’s 1800 flag. The " +
      "three colours stand for the three peoples who fought with Miranda — black for Africans, red for " +
      "the mixed “pardos,” yellow for the indigenous; the black band bears a rising sun with cacao " +
      "branches and “Libertad o Muerte,” and six white stars mark the state’s subregions. Adopted 2006.",
    sources: [
      { title: "Bandera del estado Miranda — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Miranda" },
    ],
  },

  "VE-K": {
    description:
      "A red field divided by a setting sun rising from a horizontal line two-thirds down, its rays " +
      "formed of yellow and silver stripes. Adopted 2000; the decree gives the heraldic design without " +
      "assigning a separate meaning to each element.",
    sources: [
      { title: "Bandera del estado Lara — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Lara" },
    ],
  },

  "VE-O": {
    description:
      "Three horizontal bands — yellow with a white semicircle, green with three white stars, and dark " +
      "blue. Yellow is the tropical sky and Caribbean wealth; the white semicircle unity and purity; " +
      "green the vegetation and life; blue the Caribbean Sea; the three stars the state’s three islands " +
      "— Margarita, Coche and Cubagua. Adopted 1998.",
    sources: [
      { title: "Bandera del estado Nueva Esparta — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Nueva_Esparta" },
    ],
  },

  "VE-P": {
    description:
      "Three horizontal bands of blue, white and green with a yellow sun on the blue. Blue is the " +
      "firmament and the plainsman’s spirit; white pristine purity and the union of the material and " +
      "spiritual; green the state’s natural and agricultural wealth; the yellow sun — inspired by " +
      "aboriginal geometric art — power, riches and creative energy. Adopted 1996.",
    sources: [
      { title: "Bandera del estado Portuguesa — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Portuguesa" },
    ],
  },

  "VE-S": {
    description:
      "Three equal horizontal bands of yellow, black and red. Yellow is the wealth of the land, law and " +
      "the wisdom of the people; black the hardships overcome and the state’s oil and coal, bearing " +
      "four stars for the cantons of 1864 (San Cristóbal, Lobatera, San Antonio and La Grita) and " +
      "coffee branches; red the bravery and the blood of the independence heroes. Adopted 1997.",
    sources: [
      { title: "Bandera del estado Táchira — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_T%C3%A1chira" },
    ],
  },

  "VE-T": {
    description:
      "A red band over a white band with a green triangle at the hoist enclosing a white star and a " +
      "dove. Red is the blood shed for the nation and the 1813 “War to the Death” decree; white the " +
      "humanising peace treaties signed at Trujillo in 1820 and a call to friendship; the green " +
      "triangle the verdant Andean land and its farming. Adopted 1994.",
    sources: [
      { title: "Bandera del estado Trujillo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Trujillo" },
    ],
  },

  "VE-R": {
    description:
      "A field of white and light blue with the state coat of arms above and fifteen stars below. " +
      "White symbolises the loyalty and purity of the Grand Marshal of Ayacucho, Antonio José de Sucre; " +
      "light blue the salt waters around the state and its fishing; the fifteen stars its municipalities. " +
      "Adopted 1965.",
    sources: [
      { title: "Bandera del estado Sucre — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Sucre" },
    ],
  },

  "VE-U": {
    description:
      "Three diagonal stripes of red, blue and white with a central roundel of yellow, blue and green. " +
      "Red is the indomitable spirit of the indigenous peoples who resisted the conquest and fought for " +
      "the province’s autonomy; the blue and yellow honour the national flag and the state’s waters; in " +
      "the roundel yellow is the sun and the soil’s wealth, blue the sky and green the earth.",
    sources: [
      { title: "Bandera del estado Yaracuy — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Yaracuy" },
    ],
  },

  "VE-Y": {
    description:
      "Light blue over a narrow green over dark blue, with a dark-blue triangle at the hoist holding a " +
      "green map of the state and four white stars on the upper band. Light blue is the sky and the " +
      "people’s hopes, the four stars the state’s four municipalities; green the forests and ecosystem; " +
      "dark blue the many arms of the Orinoco; the triangle is the river delta and the Greek letter " +
      "delta that names the state. Adopted 2004.",
    sources: [
      { title: "Bandera del estado Delta Amacuro — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Delta_Amacuro" },
    ],
  },

  "VE-N": {
    description:
      "A light-blue field with three superimposed horizontal bands of blue, green and black and a " +
      "yellow sun on the green, charged with the black silhouette of the independence heroine Juana " +
      "Ramírez under an arc of thirteen white stars. Adopted 2002.",
    sources: [
      { title: "Flag of Monagas — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Monagas" },
    ],
  },

  "VE-X": {
    description:
      "A white field over a blue stripe, with four vertical stripes of yellow, red, white and blue at " +
      "the hoist; a sun on the white and four blue stars. The design is the 1797 flag of Gual and " +
      "España: the sun is the Homeland; the four stars the four provinces of the old Captaincy General " +
      "(Cumaná, Guayana, Maracaibo and Caracas); the four vertical stripes the peoples of Venezuela — " +
      "whites, pardos, blacks and indigenous. Adopted 2012 (state renamed La Guaira in 2019).",
    sources: [
      { title: "Bandera del estado Vargas — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Vargas" },
    ],
  },

  "VE-Z": {
    description:
      "A multicolour flag bearing the Autana tepui, seven stars, a Yanomami face and the state map. " +
      "Blue is nobility and the Amazonian rivers; white purity and freedom; green the vast forests and " +
      "biodiversity; red the indigenous heritage; yellow light, wealth and life; brown the mineral-rich " +
      "land. The seven stars mark the state’s seven municipalities and the Yanomami face its aboriginal " +
      "peoples. Adopted 2002.",
    sources: [
      { title: "Bandera del estado Amazonas — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_estado_Amazonas" },
    ],
  },

  "BO-S": {
    description:
      "Three horizontal stripes, green-white-green. The green stripes stand for the department’s " +
      "vegetation and forests; the white stripe for the nobility of its people. Created 1864.",
    sources: [
      { title: "Bandera de Santa Cruz (Bolivia) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Santa_Cruz_(Bolivia)" },
    ],
  },

  "BO-L": {
    description:
      "Two horizontal stripes, ponceau red over emerald green, first raised in the La Paz revolution of " +
      "1809. Red is the blood of the fifteen-year independence war and green the region's vegetation and " +
      "hope; the colours were those of the Lanza brothers and the rebel army of the Audiencia de Charcas.",
    sources: [
      { title: "La Paz (Bolivia) — Flags of the World", url: "https://crwflags.com/fotw/flags/bo-l.html" },
    ],
  },

  "BO-C": {
    description:
      "A light-blue (celeste) flag — celeste for freedom — the banner Cochabambans carried at the Battle " +
      "of Aroma in the independence war. Its arms add scales for the people's love of justice, wheat for " +
      "the richness of their fields, and a sword for their courage.",
    sources: [
      { title: "Cochabamba (Bolivia) — Flags of the World", url: "https://crwflags.com/fotw/flags/bo-c.html" },
    ],
  },

  "BO-B": {
    description:
      "Eight golden stars in a ring on a green field. The eight stars are the department's eight " +
      "provinces; the green is the Beni's lush land, its emblem of hope and abundance.",
    sources: [
      { title: "Beni (Bolivia) — Flags of the World", url: "https://crwflags.com/fotw/flags/bo-b.html" },
    ],
  },

  "BO-H": {
    description:
      "A white field with a red Burgundian (saltire) cross, from the banner of the Audiencia de Charcas. " +
      "White stands for peace, purity and faith, red for the blood shed by America and Alto Perú in the " +
      "struggle for freedom.",
    sources: [
      { title: "Chuquisaca (Bolivia) — Flags of the World", url: "https://crwflags.com/fotw/flags/bo-h.html" },
    ],
  },

  "BO-O": {
    description:
      "A red flag — red for courage and bravery — the colour carried in the independence war by Oruro's " +
      "leaders Sebastián Pagador and Barrón. It is often shown with a yellow border and the department's " +
      "arms.",
    sources: [
      { title: "Oruro (Bolivia) — Flags of the World", url: "https://crwflags.com/fotw/flags/bo-o.html" },
    ],
  },

  "BO-N": {
    description:
      "A white and green flag, born from the flag of the “Columna del Porvenir”, the Bolivian Amazon " +
      "volunteers of the Chaco War. White stands for peace, generosity and integrity, green for the " +
      "rainforest and the hope of a new century.",
    sources: [
      { title: "Pando (Bolivia) — Flags of the World", url: "https://crwflags.com/fotw/flags/bo-n.html" },
    ],
  },

  "CO-QUI": {
    description:
      "Three equal vertical stripes of green, yellow and purple. Green stands for the department’s " +
      "abundant vegetation and agriculture; yellow for the gold of the Quimbaya culture and its " +
      "economy; purple for the coffee cherry at ripe harvest, the region’s chief product. Adopted 1972.",
    sources: [
      { title: "Bandera del Quindío — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_Quind%C3%ADo" },
    ],
  },

  "CO-LAG": {
    description:
      "Two equal horizontal stripes, green over white. Green symbolises the hope of the farmers in " +
      "sowing and raising their crops; white the purity of the indigenous population and the " +
      "department’s sea salt and pearls. Adopted 1966.",
    sources: [
      { title: "Bandera de La Guajira — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_La_Guajira" },
    ],
  },

  "CO-RIS": {
    description:
      "An emerald-green field with fourteen silver stars in an arc. The fourteen stars are the " +
      "department’s fourteen municipalities; the green stands for the fertility of its land and its " +
      "agricultural vocation. Adopted 1969.",
    sources: [
      { title: "Bandera de Risaralda — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Risaralda" },
    ],
  },

  "CO-ARA": {
    description:
      "Two equal horizontal stripes, red over green. Red stands for the blood shed by those who fought " +
      "for freedom; green for the vast plains (llanos). Adopted 1979.",
    sources: [
      { title: "Bandera de Arauca (departamento) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Arauca_(departamento)" },
    ],
  },

  "CO-CAS": {
    description:
      "A field divided diagonally, red above and green below, with a yellow eight-pointed sun at the " +
      "centre. Red is the blood of the independence heroes; green the department’s plains and natural " +
      "resources; the sun the warmth and fertility of the llanos, its eight points one for each letter " +
      "of “Casanare.”",
    sources: [
      { title: "Bandera de Casanare — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Casanare" },
    ],
  },

  "CO-SUC": {
    description:
      "Two equal horizontal stripes, green over white. Green symbolises prosperity, white peace. " +
      "Adopted 1974.",
    sources: [
      { title: "Bandera de Sucre (Colombia) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Sucre_(Colombia)" },
    ],
  },

  "CO-CAQ": {
    description:
      "Seven horizontal stripes alternating white and green, with sixteen stars for the department’s " +
      "municipalities. Green stands for the forest wealth and the people’s hope for the future; white " +
      "for the clarity of morning and peace. Adopted 1974.",
    sources: [
      { title: "Bandera de Caquetá — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Caquet%C3%A1" },
    ],
  },

  "CO-PUT": {
    description:
      "Three horizontal stripes of black, green and white. Black is the department’s petroleum (its " +
      "“black gold”); green the hope and the virgin forests that cover almost all of it; white the " +
      "peaceful character of its people.",
    sources: [
      { title: "Bandera de Putumayo — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Putumayo" },
    ],
  },

  "CO-VID": {
    description:
      "Two equal horizontal stripes, yellow over green. Yellow represents the wealth of the territory; " +
      "green the plains and the forested part of the department.",
    sources: [
      { title: "Bandera de Vichada — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Vichada" },
    ],
  },

  "CO-DC": {
    description:
      "Two horizontal stripes, yellow over red, with the city’s coat of arms at the centre. Yellow " +
      "stands for justice, clemency, virtue and benignity; red for liberty, health and charity. The " +
      "colours derive from a historic revolutionary armband worn in the city. Adopted 1952.",
    sources: [
      { title: "Bandera de Bogotá — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Bogot%C3%A1" },
    ],
  },

  "CO-AMA": {
    description:
      "Three horizontal stripes — green, mustard-yellow and white, edged in black — bearing black " +
      "figures of an indigenous warrior drawing a bow and a leaping jaguar on the green, and a " +
      "five-pointed star for the capital Leticia on the yellow. Adopted 1974.",
    sources: [
      { title: "Bandera del Amazonas (Colombia) — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_Amazonas_(Colombia)" },
    ],
  },

  "CO-GUA": {
    description:
      "Three equal horizontal stripes of yellow, blue and green. Yellow stands for the department’s " +
      "mineral wealth (gold, diamonds, amethysts and more); blue for its waters — “Guainía” means " +
      "“land of many waters” — and its many rivers and lakes; green for the biodiversity of its forests " +
      "and savannas.",
    sources: [
      { title: "Bandera de Guainía — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Guain%C3%ADa" },
    ],
  },

  "CO-GUV": {
    description:
      "Three equal horizontal stripes of green, white and blue with the departmental coat of arms at " +
      "the centre. Green stands for the wealth and effort of the settlers; white for peace and honest " +
      "work; blue for the Guayabero and Ariari rivers that join to form the Guaviare.",
    sources: [
      { title: "Bandera del Guaviare — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_del_Guaviare" },
    ],
  },

  "CO-VAU": {
    description:
      "Two equal horizontal stripes, white over green, with a rubber-tree leaf at the centre. White " +
      "stands for the purity of the indigenous peoples; green for the jungle and natural resources; the " +
      "rubber leaf for the rubber whose exploitation shaped the department’s history. Adopted 1984.",
    sources: [
      { title: "Bandera de Vaupés — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Vaup%C3%A9s" },
    ],
  },

  "UY-CA": {
    description:
      "A white field crossed by nine light-blue stripes and one red stripe. The nine blue stripes " +
      "recall Uruguay’s 1828–1830 second national flag, whose nine stripes stood for the nine " +
      "departments of the time (Canelones among them); the red stripe echoes the red band of the flag " +
      "of Artigas, honouring his ideals. Adopted 2010.",
    sources: [
      { title: "Bandera de Canelones — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_Canelones" },
    ],
  },

  "AR-C": {
    description:
      "A white field bearing the historic coat of arms of the city drawn by Juan de Garay: a crowned " +
      "black eagle with four smaller mixed eagles (hawks) and a red cross. The great eagle represents " +
      "the Spanish conquest, the crown the Spanish monarchy, the red cross the evangelisation, and the " +
      "four small eagles the four cities founded in the era — Santa Fe, Buenos Aires, Corrientes and " +
      "Concepción del Bermejo. Adopted 1995.",
    sources: [
      { title: "Bandera de la Ciudad Autónoma de Buenos Aires — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_la_Ciudad_Aut%C3%B3noma_de_Buenos_Aires" },
    ],
  },

  "AR-D": {
    description:
      "A white field bearing the provincial coat of arms at the centre. Adopted 1988; the law specifies " +
      "a white flag with the provincial shield and does not assign a separate meaning to the field.",
    sources: [
      { title: "Bandera de la provincia de San Luis — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_la_provincia_de_San_Luis" },
    ],
  },

  "AR-M": {
    description:
      "A white-and-light-blue (celeste) flag reproducing the flag of the Army of the Andes, which " +
      "General José de San Martín created in Mendoza for the campaigns that liberated Chile and Peru. " +
      "Adopted 1992.",
    sources: [
      { title: "Bandera de la provincia de Mendoza — Wikipedia", url: "https://es.wikipedia.org/wiki/Bandera_de_la_provincia_de_Mendoza" },
    ],
  },









































  "GB-ENG": {
    description:
      "A red cross on a white field — the Cross of St George. Red crosses marked English soldiers from " +
      "the late 13th century, and Edward III made St George England’s special patron around 1348; by " +
      "1552 the St George’s flag was the only saint’s banner permitted in public. It has become the " +
      "popular flag of England, especially at sporting events.",
    sources: [
      { title: "Flag of England — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_England" },
    ],
  },








  "FR-73": {
    description:
      "A white cross reaching the edges on a red field — the arms of the Counts and Dukes of Savoy " +
      "(“de gueules à la croix d’argent”). The cross is first documented on a 1143 seal of Count " +
      "Amédée III and became the permanent Savoyard emblem under Amédée V in the 14th century. It has " +
      "no official standardisation.",
    sources: [
      { title: "Drapeau de la Savoie — Wikipédia", url: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Savoie" },
    ],
  },

  "FR-2A": {
    description:
      "A black Moor’s head in profile wearing a white headband, on a white field — the flag of Corsica, " +
      "used for both Corsican departments. The Moor’s head appears on a 1281 seal of Peter III of " +
      "Aragon and was taken up by Pasquale Paoli as a symbol of Corsican resistance; the headband was " +
      "raised from the eyes to the brow in 1755. Adopted as the regional flag in 1980.",
    sources: [
      { title: "Drapeau de la Corse — Wikipédia", url: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Corse" },
    ],
  },

  "FR-2B": {
    description:
      "A black Moor’s head in profile wearing a white headband, on a white field — the flag of Corsica, " +
      "used for both Corsican departments. The emblem appears on a 1281 Aragonese seal and became a " +
      "symbol of Corsican resistance under Pasquale Paoli, who in 1755 moved the headband up to the " +
      "brow. Adopted as the regional flag in 1980.",
    sources: [
      { title: "Drapeau de la Corse — Wikipédia", url: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Corse" },
    ],
  },

  "TH-13": {
    description:
      "A navy-blue and white flag bearing the provincial seal: a pink lotus with two rice stalks " +
      "bending over it, standing for the fertility of the province. The lotus also gives the province " +
      "its name — after citizens presented King Rama II with lotus flowers on his 1815 visit, he " +
      "renamed the town Pathum Thani, “lotus-flower town.”",
    sources: [
      { title: "Pathum Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Pathum_Thani_province" },
    ],
  },

  "TH-14": {
    description:
      "A navy-blue flag with a light-blue central band bearing the provincial seal: a pavilion " +
      "enshrining a conch shell on a pedestal tray, with the provincial tree behind. By tradition King " +
      "Ramathibodi I found a beautiful conch buried at the spot and chose it for his capital, building " +
      "a pavilion over the shell.",
    sources: [
      { title: "Phra Nakhon Si Ayutthaya province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phra_Nakhon_Si_Ayutthaya_province" },
    ],
  },

  "TH-50": {
    description:
      "A light-blue flag bearing the provincial seal: a white elephant in a glass pavilion. The white " +
      "elephant commemorates the one offered by Thammalangka, a ruler of Chiang Mai, to his overlord " +
      "King Rama II; the glass pavilion alludes to the Buddhist flourishing of the region, recalling " +
      "the 1477 review of the Tripitaka.",
    sources: [
      { title: "Chiang Mai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chiang_Mai_province" },
    ],
  },

  "TH-20": {
    description:
      "A flag bearing the provincial seal, which shows the hill Khao Sam Muk with a sala (open " +
      "pavilion) holding a statue of the goddess Chao Mae Sam Muk, the local deity who by tradition " +
      "protects the seafarers and people of the coast.",
    sources: [
      { title: "Chonburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chonburi_province" },
    ],
  },

  "TH-40": {
    description:
      "A flag bearing the provincial seal, which shows the stupa of Phra That Kham Kaen — believed to " +
      "hold relics of the Buddha — flanked by a banyan tree and a golden-shower tree, the latter’s Thai " +
      "name meaning “providing support and preventing decline.”",
    sources: [
      { title: "Khon Kaen province — Wikipedia", url: "https://en.wikipedia.org/wiki/Khon_Kaen_province" },
    ],
  },

  "TH-80": {
    description:
      "A flag bearing the provincial seal, which shows the Phra Boromathat chedi of Wat Phra Mahathat " +
      "encircled by the twelve animals of the zodiac. Each animal stood for one of the tributary " +
      "city-states of the historical Nakhon Si Thammarat kingdom, whose sway once ran from Chumphon " +
      "south to Pahang.",
    sources: [
      { title: "Nakhon Si Thammarat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Si_Thammarat_province" },
    ],
  },

  "TH-57": {
    description:
      "A flag bearing the provincial seal, which shows a white elephant — the royal symbol. It recalls " +
      "the legend that King Mangrai founded Chiang Rai on the spot because his elephant favoured the " +
      "place.",
    sources: [
      { title: "Chiang Rai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chiang_Rai_province" },
    ],
  },

  "TH-11": {
    description:
      "A flag bearing the provincial seal, which shows Phra Samut Chedi — a pagoda raised on an island " +
      "in the Chao Phraya in King Rama II’s reign and the province’s most important Buddhist site. The " +
      "name Samut Prakan means “sea fortress,” recalling its role as a fortified river port.",
    sources: [
      { title: "Samut Prakan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Samut_Prakan_province" },
    ],
  },

  "TH-12": {
    description:
      "A flag bearing the provincial seal, which depicts earthenware — the traditional pottery for " +
      "which Nonthaburi has long been known, representing the province’s craft heritage.",
    sources: [
      { title: "Nonthaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nonthaburi_province" },
    ],
  },

  "TH-83": {
    description:
      "A flag bearing the provincial seal, which shows the Two Heroines Monument within a Thai kranok " +
      "border. The monument honours Thao Thep Krasattri and Thao Si Sunthon, the sisters who rallied " +
      "Phuket’s defence against a Burmese invasion in 1785. In use since 1985.",
    sources: [
      { title: "Phuket province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phuket_province" },
    ],
  },

  "TH-21": {
    description:
      "A flag bearing the provincial seal, which depicts the island of Ko Samet off the Rayong coast — " +
      "the island celebrated, together with the poet Sunthon Phu, in the province’s motto.",
    sources: [
      { title: "Rayong province — Wikipedia", url: "https://en.wikipedia.org/wiki/Rayong_province" },
    ],
  },

  "TH-22": {
    description:
      "A flag bearing the provincial seal, which shows a rabbit within a haloed moon. The moon canting " +
      "the province’s name — “Chantha” means moon, so Chanthaburi is “city of the moon” — and the " +
      "rabbit (the shape Thai folklore sees in the moon) conveys the peace and tranquillity of the " +
      "province.",
    sources: [
      { title: "Chanthaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chanthaburi_province" },
    ],
  },

  "TH-84": {
    description:
      "A flag bearing the provincial seal, which shows the pagoda of Wat Phra Borommathat Chaiya, a " +
      "historic Srivijaya-era stupa some 1,200 years old and the province’s foremost religious " +
      "monument.",
    sources: [
      { title: "Surat Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Surat_Thani_province" },
    ],
  },

  "TH-51": {
    description:
      "A flag bearing the provincial seal, which shows the gold-covered chedi of Wat Phra That " +
      "Hariphunchai, the city’s principal temple since Mon times, said to enshrine a relic of the " +
      "Buddha.",
    sources: [
      { title: "Lamphun province — Wikipedia", url: "https://en.wikipedia.org/wiki/Lamphun_province" },
    ],
  },

  "TH-52": {
    description:
      "A flag bearing the provincial seal, which shows a white rooster in the gateway of Wat Phra That " +
      "Lampang Luang. By legend, when the Buddha visited, the god Indra turned himself into a white " +
      "rooster to wake the people so they would pay their respects.",
    sources: [
      { title: "Lampang province — Wikipedia", url: "https://en.wikipedia.org/wiki/Lampang_province" },
    ],
  },

  "TH-90": {
    description:
      "A flag bearing the provincial seal, which shows a conch shell on a phan (offering tray) with " +
      "glass decorations. By the most accepted account the emblem derives from a decoration on the " +
      "jacket of the Prince of Songkhla.",
    sources: [
      { title: "Songkhla province — Wikipedia", url: "https://en.wikipedia.org/wiki/Songkhla_province" },
    ],
  },

  "TH-31": {
    description:
      "A flag bearing the provincial seal, which shows the Phanom Rung sanctuary, a Khmer-style Hindu " +
      "temple to Shiva built between the 9th and 12th centuries when the Khmer Empire held the region.",
    sources: [
      { title: "Buriram province — Wikipedia", url: "https://en.wikipedia.org/wiki/Buriram_province" },
    ],
  },

  "TH-32": {
    description:
      "A flag bearing the provincial seal, which shows the god Indra on his white three-headed elephant " +
      "Airavata, based on a carving at a famous Khmer temple in the province — apt for a province known " +
      "for both its Khmer temples and its elephants.",
    sources: [
      { title: "Surin province — Wikipedia", url: "https://en.wikipedia.org/wiki/Surin_province" },
    ],
  },

  "TH-34": {
    description:
      "A flag bearing the provincial seal, which shows a lotus flower in a pond — alluding to the " +
      "province’s name, which means “royal city of the lotus.”",
    sources: [
      { title: "Ubon Ratchathani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ubon_Ratchathani_province" },
    ],
  },

  "TH-16": {
    description:
      "A flag bearing the provincial seal, which shows the god Vishnu before Phra Prang Sam Yot, the " +
      "Khmer “Sanctuary of the Three Towers.” It recalls King Narai, who in 1664 fortified Lopburi as " +
      "an alternative capital when Ayutthaya was threatened by a Dutch blockade.",
    sources: [
      { title: "Lopburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Lopburi_province" },
    ],
  },

  "TH-19": {
    description:
      "A flag bearing the provincial seal, which shows the temple of Wat Phra Phutthabat. A 17th-century " +
      "hunter found a footprint-shaped pool taken to be the Buddha’s footprint (Phra Phutthabat), and a " +
      "temple was built over the spot.",
    sources: [
      { title: "Saraburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Saraburi_province" },
    ],
  },

  "TH-33": {
    description:
      "A flag bearing the provincial seal, which shows Prasat Hin Ban Samo, a Khmer temple about a " +
      "thousand years old in the Prang Ku area of the province.",
    sources: [
      { title: "Sisaket province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sisaket_province" },
    ],
  },

  "TH-15": {
    description:
      "A flag bearing the provincial seal, which shows golden ears of rice in a bowl of water, " +
      "standing for the fertility of Ang Thong as one of the country’s major rice-producing provinces.",
    sources: [
      { title: "Ang Thong province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ang_Thong_province" },
    ],
  },

  "TH-24": {
    description:
      "A flag bearing the provincial seal, which shows the hall of Wat Sothonwararam enshrining " +
      "Luangpho Phutthasothon, the province’s most revered Buddha image.",
    sources: [
      { title: "Chachoengsao province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chachoengsao_province" },
    ],
  },

  "TH-26": {
    description:
      "A flag bearing the provincial seal, which shows an elephant holding an ear of rice in its trunk, " +
      "with straw, trees and clouds. It stands for the province’s fertile rice fields and forests and " +
      "its natural beauty.",
    sources: [
      { title: "Nakhon Nayok province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Nayok_province" },
    ],
  },

  "TH-18": {
    description:
      "A flag bearing the provincial seal, which shows a dharma wheel (dhammachakka) with a mountain " +
      "behind it, referring to the Dhammachak Buddha image at Wat Thammamun, built on a mountainside.",
    sources: [
      { title: "Chai Nat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chai_Nat_province" },
    ],
  },

  "TH-23": {
    description:
      "A flag bearing the provincial seal, which shows the sea with the Khao Banthat mountain range " +
      "behind — Trat being a coastal province known as “the city of half a hundred islands.”",
    sources: [
      { title: "Trat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Trat_province" },
    ],
  },

  "TH-25": {
    description:
      "A red-and-yellow flag bearing the provincial seal, which shows the Bodhi tree — for the first " +
      "Bodhi tree planted about 2,000 years ago at Wat Si Maha Phot. Red stands for the land and yellow " +
      "for Buddhism.",
    sources: [
      { title: "Prachinburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Prachinburi_province" },
    ],
  },

  "TH-27": {
    description:
      "A flag bearing the provincial seal, which shows the sun rising over the Khmer ruins of Prasat " +
      "Khao Noi Si Chomphu — the rising sun marking the province’s eastern position — with a Buddha " +
      "image in a lotus pond below, alluding to the sacred ponds that give Sa Kaeo its name.",
    sources: [
      { title: "Sa Kaeo province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sa_Kaeo_province" },
    ],
  },

  "TH-35": {
    description:
      "A flag bearing the provincial seal, which shows two mythical lions (singha) facing the chedi " +
      "Phra That Anon at Wat Maha That, over a lotus flower. The lions recall the founding legend that " +
      "a lion emerged from the forest when the site was chosen, giving the old name Ban Singha Tha.",
    sources: [
      { title: "Yasothon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Yasothon_province" },
    ],
  },

  "TH-36": {
    description:
      "A flag bearing the provincial seal, which shows a triangular banner — a symbol of victory in " +
      "war.",
    sources: [
      { title: "Chaiyaphum province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chaiyaphum_province" },
    ],
  },

  "TH-41": {
    description:
      "A flag bearing the provincial seal, which shows Vaiśravaṇa (Thao Wessuwan), the Heavenly King of " +
      "the North — fitting for a province whose name means “northern city.”",
    sources: [
      { title: "Udon Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Udon_Thani_province" },
    ],
  },

  "TH-42": {
    description:
      "A flag bearing the provincial seal, which shows the stupa of Phra That Si Song Rak, built in " +
      "1560 by King Maha Chakkraphat of Ayutthaya and King Sai Setthathirath of Lan Xang as a symbol of " +
      "friendship between the two kingdoms.",
    sources: [
      { title: "Loei province — Wikipedia", url: "https://en.wikipedia.org/wiki/Loei_province" },
    ],
  },

  "TH-43": {
    description:
      "A flag bearing the provincial seal, which shows a pond with a clump of bamboo beside it; the " +
      "bamboo stands for the stability, glory and continuity of this peaceful and fertile land.",
    sources: [
      { title: "Nong Khai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nong_Khai_province" },
    ],
  },

  "TH-45": {
    description:
      "A flag bearing the provincial seal, which shows the shrine of the city pillar standing in the " +
      "artificial lake Bueng Phlan Chai; its guardian spirit, Mahesak, is revered by local people.",
    sources: [
      { title: "Roi Et province — Wikipedia", url: "https://en.wikipedia.org/wiki/Roi_Et_province" },
    ],
  },

  "TH-46": {
    description:
      "A flag bearing the provincial seal, which shows a pond of black water before the Phu Phan " +
      "mountains — the black water canting the name Kalasin (“black water”), and the pond and clouds " +
      "standing for the province’s fertility.",
    sources: [
      { title: "Kalasin province — Wikipedia", url: "https://en.wikipedia.org/wiki/Kalasin_province" },
    ],
  },

  "TH-47": {
    description:
      "A flag bearing the provincial seal, which shows Phra That Choeng Chum, a Lao-style chedi raised " +
      "in the Ayutthaya period over an older Khmer prang — reflecting the region’s layered Khmer and " +
      "Lao heritage.",
    sources: [
      { title: "Sakon Nakhon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sakon_Nakhon_province" },
    ],
  },

  "TH-48": {
    description:
      "A flag bearing the provincial seal, which shows the pagoda of Phra That Phanom — a revered " +
      "stupa, Khmer in origin and rebuilt in Lao style after it collapsed in 1675.",
    sources: [
      { title: "Nakhon Phanom province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Phanom_province" },
    ],
  },

  "TH-49": {
    description:
      "A flag bearing the provincial seal, which shows the Prasat Song Nang Sathit palace with a " +
      "moonstone on a tray inside it — the moonstone alluding to the province’s name, Mukdahan.",
    sources: [
      { title: "Mukdahan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Mukdahan_province" },
    ],
  },

  "TH-44": {
    description:
      "A flag bearing the provincial seal, which shows a tree before rice fields, symbolising the " +
      "richness of the province’s natural resources.",
    sources: [
      { title: "Maha Sarakham province — Wikipedia", url: "https://en.wikipedia.org/wiki/Maha_Sarakham_province" },
    ],
  },

  "TH-55": {
    description:
      "A flag bearing the provincial seal, which shows a sacred Usupharat bull carrying the stupa of " +
      "Phra That Chae Haeng. The bull recalls the legend that the ruler of Nan came to mark the border " +
      "with neighbouring Phrae riding a bovine.",
    sources: [
      { title: "Nan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nan_province" },
    ],
  },

  "TH-65": {
    description:
      "A flag bearing the provincial seal, which shows Phra Phuttha Chinnarat, one of the most revered " +
      "and beautiful Buddha images in Thailand, enshrined at Wat Phra Si Rattana Mahathat.",
    sources: [
      { title: "Phitsanulok province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phitsanulok_province" },
    ],
  },

  "TH-64": {
    description:
      "A flag bearing the provincial seal, which shows King Ramkhamhaeng the Great seated on the " +
      "Manangkhasila throne — the Sukhothai king who created the Thai script and made Theravada " +
      "Buddhism the state religion.",
    sources: [
      { title: "Sukhothai province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sukhothai_province" },
    ],
  },

  "TH-73": {
    description:
      "A flag bearing the provincial seal, which shows Phra Pathommachedi, a great stupa and Buddhist " +
      "centre since the 6th century, topped by a royal crown for King Mongkut, who rebuilt it in 1860.",
    sources: [
      { title: "Nakhon Pathom province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Pathom_province" },
    ],
  },

  "TH-70": {
    description:
      "A flag bearing the provincial seal, which shows the royal sword above royal sandals on a phan " +
      "(tray). It reflects the name Ratchaburi, “city of the king,” linked to the birthplace of King " +
      "Rama I.",
    sources: [
      { title: "Ratchaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ratchaburi_province" },
    ],
  },

  "TH-71": {
    description:
      "A flag bearing the provincial seal, which shows the three stupas on Bantadthong Mountain that " +
      "give their name to the Three Pagodas Pass, the mountain route to Myanmar.",
    sources: [
      { title: "Kanchanaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Kanchanaburi_province" },
    ],
  },

  "TH-72": {
    description:
      "A flag bearing the provincial seal, which shows the 1592 elephant duel fought in Suphan Buri " +
      "between King Naresuan the Great and the Burmese crown prince.",
    sources: [
      { title: "Suphan Buri province — Wikipedia", url: "https://en.wikipedia.org/wiki/Suphan_Buri_province" },
    ],
  },

  "TH-76": {
    description:
      "A flag bearing the provincial seal, which shows the Khao Wang palace behind rice fields flanked " +
      "by two coconut palms, standing for the province’s main crops.",
    sources: [
      { title: "Phetchaburi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phetchaburi_province" },
    ],
  },

  "TH-77": {
    description:
      "A flag bearing the provincial seal, which shows the Kuha Karuhas pavilion, built for King " +
      "Chulalongkorn’s visit to the Phraya Nakhon Cave, with the island of Ko Lak in Prachuap Bay " +
      "behind it.",
    sources: [
      { title: "Prachuap Khiri Khan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Prachuap_Khiri_Khan_province" },
    ],
  },

  "TH-92": {
    description:
      "A flag bearing the provincial seal, which shows a lighthouse over sea waves, marking Trang as a " +
      "historic seaport trading with foreign countries; the waves also echo the province’s undulating " +
      "hill-and-plain landscape.",
    sources: [
      { title: "Trang province — Wikipedia", url: "https://en.wikipedia.org/wiki/Trang_province" },
    ],
  },

  "TH-93": {
    description:
      "A flag bearing the provincial seal, which shows the 177-metre Khao Ok Thalu mountain — the " +
      "pierced peak that is the emblem of the province.",
    sources: [
      { title: "Phatthalung province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phatthalung_province" },
    ],
  },

  "TH-94": {
    description:
      "A flag bearing the provincial seal, which shows the cannon Phraya Tani (Sri Pattani in Malay), " +
      "cast in Pattani and taken to Bangkok in 1785, where it now stands before the Ministry of " +
      "Defence.",
    sources: [
      { title: "Pattani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Pattani_province" },
    ],
  },

  "TH-95": {
    description:
      "A flag bearing the provincial seal, which shows a miner with simple tools — hoes, crowbars and " +
      "baskets — recalling Yala’s origins as a tin- and tungsten-mining town.",
    sources: [
      { title: "Yala province — Wikipedia", url: "https://en.wikipedia.org/wiki/Yala_province" },
    ],
  },

  "TH-96": {
    description:
      "A flag bearing the provincial seal, which shows a sailing boat with a white elephant on its " +
      "sail. The white elephant — a royal symbol — commemorates Phra Sri Nararat Rajakarini, an " +
      "elephant caught here and presented to the king.",
    sources: [
      { title: "Narathiwat province — Wikipedia", url: "https://en.wikipedia.org/wiki/Narathiwat_province" },
    ],
  },

  "TH-81": {
    description:
      "A flag bearing the provincial seal, which shows two ancient crossed swords (krabi) before the " +
      "Andaman Sea and Khao Phanom Bencha, the province’s highest mountain. The sword (krabi) gives the " +
      "province its name.",
    sources: [
      { title: "Krabi province — Wikipedia", url: "https://en.wikipedia.org/wiki/Krabi_province" },
    ],
  },

  "TH-54": {
    description:
      "A flag bearing the provincial seal, which shows a horse together with the stupa of Phra That Cho " +
      "Hae. The horse recalls the legend that the ruler of Phrae came riding a horse (while Nan’s came " +
      "on a buffalo) to divide their lands; the stupa was added to the design in 1940.",
    sources: [
      { title: "Phrae province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phrae_province" },
    ],
  },

  "TH-56": {
    description:
      "A flag bearing the provincial seal, which shows the revered Buddha image Phra Chao Ton Luang of " +
      "Wat Si Khom Kham, backed by seven flames for the glory of the Buddha, with an alms bowl and two " +
      "ears of rice before it.",
    sources: [
      { title: "Phayao province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phayao_province" },
    ],
  },

  "TH-53": {
    description:
      "A flag bearing the provincial seal, which shows the mondop of Wat Phra Thaen Sila At, built over " +
      "a laterite block said to have been used by the Buddha in seeking enlightenment.",
    sources: [
      { title: "Uttaradit province — Wikipedia", url: "https://en.wikipedia.org/wiki/Uttaradit_province" },
    ],
  },

  "TH-60": {
    description:
      "A flag bearing the provincial seal, which shows a wiman — a mythological heavenly castle — " +
      "alluding to the province’s name, Nakhon Sawan, “heavenly city.”",
    sources: [
      { title: "Nakhon Sawan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nakhon_Sawan_province" },
    ],
  },

  "TH-67": {
    description:
      "A flag bearing the provincial seal, which shows a diamond on a mountain — diamonds being found " +
      "in the province — above tobacco plants, one of its crops.",
    sources: [
      { title: "Phetchabun province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phetchabun_province" },
    ],
  },

  "TH-66": {
    description:
      "A flag bearing the provincial seal, which shows a pond — recalling Phichit’s old name Mueang Sa " +
      "Luang, “city of the royal pond” — with a banyan tree for Wat Pho Prathap Chang, built in the " +
      "1660s by King Luang Sorasak, born between a banyan and a sacred fig.",
    sources: [
      { title: "Phichit province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phichit_province" },
    ],
  },

  "TH-63": {
    description:
      "A flag bearing the provincial seal, which shows King Naresuan on a royal elephant pouring " +
      "consecrated water on the ground to declare independence — commemorating Tak as the first border " +
      "town freed from Burmese control in the 1584 war.",
    sources: [
      { title: "Tak province — Wikipedia", url: "https://en.wikipedia.org/wiki/Tak_province" },
    ],
  },

  "TH-62": {
    description:
      "A flag bearing the provincial seal, which shows city walls topped by diamonds — the name " +
      "Kamphaeng Phet means “diamond wall,” after the strong ramparts that once guarded the Ayutthaya " +
      "kingdom’s frontier with Burma.",
    sources: [
      { title: "Kamphaeng Phet province — Wikipedia", url: "https://en.wikipedia.org/wiki/Kamphaeng_Phet_province" },
    ],
  },

  "TH-61": {
    description:
      "A flag bearing the provincial seal, which shows the pavilion atop Khao Sakae Krang at Wat Sangkat " +
      "Rattana Khiri, housing a statue of Thongdi (father of King Rama I) and a Buddha footprint.",
    sources: [
      { title: "Uthai Thani province — Wikipedia", url: "https://en.wikipedia.org/wiki/Uthai_Thani_province" },
    ],
  },

  "TH-58": {
    description:
      "A flag bearing the provincial seal, which shows an elephant in water, recalling the province’s " +
      "origins as an elephant-training centre — set up in the 1820s–40s when Lord Kaeo was sent to " +
      "catch elephants for the ruler of Chiang Mai.",
    sources: [
      { title: "Mae Hong Son province — Wikipedia", url: "https://en.wikipedia.org/wiki/Mae_Hong_Son_province" },
    ],
  },

  "TH-86": {
    description:
      "A flag bearing the provincial seal, which shows a fortune-bringing thewada on a lotus pedestal " +
      "between two fig trees, with a fort and two watchtowers behind — a reference to the camp where " +
      "the province’s warriors mustered before battle.",
    sources: [
      { title: "Chumphon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Chumphon_province" },
    ],
  },

  "TH-85": {
    description:
      "A flag bearing the provincial seal, which shows a castle on a hill — Ratana Rangsan Palace on " +
      "Niwetkhiri Hill, where King Chulalongkorn (Rama V) stayed on his 1890 visit to Ranong.",
    sources: [
      { title: "Ranong province — Wikipedia", url: "https://en.wikipedia.org/wiki/Ranong_province" },
    ],
  },

  "TH-10": {
    description:
      "A flag bearing the seal of Bangkok, which shows the Hindu god Indra riding through the clouds on " +
      "Airavata (Erawan), the divine white elephant, holding his vajra. Based on a painting by Prince " +
      "Naris, it echoes the city’s ceremonial name as a “city of angels” erected at Indra’s behest.",
    sources: [
      { title: "Bangkok — Wikipedia", url: "https://en.wikipedia.org/wiki/Bangkok" },
    ],
  },

  "TH-17": {
    description:
      "A flag bearing the provincial seal, which commemorates the Bang Rachan stand: when the Burmese " +
      "marched on Ayutthaya in 1765, eleven leaders and the villagers of Bang Rachan held them off for " +
      "five months. The current seal (2004) depicts the eleven heroes.",
    sources: [
      { title: "Sing Buri province — Wikipedia", url: "https://en.wikipedia.org/wiki/Sing_Buri_province" },
    ],
  },

  "TH-37": {
    description:
      "A flag bearing the provincial seal, which shows Phra Mongkhon Ming Muang (Phra Yai, the “Big " +
      "Buddha”), a 20-metre statue among the most sacred images in Amnat Charoen.",
    sources: [
      { title: "Amnat Charoen province — Wikipedia", url: "https://en.wikipedia.org/wiki/Amnat_Charoen_province" },
    ],
  },

  "TH-38": {
    description:
      "A flag bearing the provincial seal, which shows Phu Thok, a mountain in Si Wilai district whose " +
      "Isan-language name means “lonely mountain.”",
    sources: [
      { title: "Bueng Kan province — Wikipedia", url: "https://en.wikipedia.org/wiki/Bueng_Kan_province" },
    ],
  },

  "TH-39": {
    description:
      "A flag bearing the provincial seal, which shows King Naresuan in a shrine — commemorating his " +
      "1574 visit to gather troops against Burma — with a lotus pond behind (the water lily being the " +
      "provincial flower).",
    sources: [
      { title: "Nong Bua Lamphu province — Wikipedia", url: "https://en.wikipedia.org/wiki/Nong_Bua_Lamphu_province" },
    ],
  },

  "TH-82": {
    description:
      "A flag bearing the provincial seal, which shows the Phu Khao Chang mountains behind the city " +
      "hall, with a tin dredge for the province’s historic tin-mining industry.",
    sources: [
      { title: "Phang Nga province — Wikipedia", url: "https://en.wikipedia.org/wiki/Phang_Nga_province" },
    ],
  },

  "TH-74": {
    description:
      "A flag bearing the provincial seal, which shows a Chinese junk off the coast with a factory and " +
      "smoking chimney behind — together standing for the province’s old trading tradition and its " +
      "local industries.",
    sources: [
      { title: "Samut Sakhon province — Wikipedia", url: "https://en.wikipedia.org/wiki/Samut_Sakhon_province" },
    ],
  },

  "TH-75": {
    description:
      "A flag bearing the provincial seal, which shows a drum over a river between coconut palms. The " +
      "Thai word for drum, klong, alludes to the Mae Klong River and the province’s former name Mae " +
      "Klong; the palms stand for its coconut farming.",
    sources: [
      { title: "Samut Songkhram province — Wikipedia", url: "https://en.wikipedia.org/wiki/Samut_Songkhram_province" },
    ],
  },

  "TH-91": {
    description:
      "A flag bearing the provincial seal, which shows the sea deity Phra Samut Thewa seated on his " +
      "rock in the sea against a sunset — the setting sun standing for the Andaman Sea to the west of " +
      "the province.",
    sources: [
      { title: "Satun province — Wikipedia", url: "https://en.wikipedia.org/wiki/Satun_province" },
    ],
  },

  "ID-AC": {
    description:
      "A green flag bearing the province’s Pancacita (“Five Ideals”) emblem in a pentagon shaped like a " +
      "traditional kopiah. Its five symbols are the scales (justice), rencong daggers (heroism), rice, " +
      "cotton and factory chimneys (welfare), a mosque dome (harmony) and a book and pen (prosperity), " +
      "together expressing Aceh’s Islamic faith and learning. White is purity, yellow and green " +
      "prosperity. Adopted 2007; the choice of a distinct flag remains politically contested.",
    sources: [
      { title: "Flag of Aceh — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Aceh" },
    ],
  },

  "ID-JB": {
    description:
      "A green flag bearing the West Java emblem: a kujang (Sundanese blade) whose five holes are the " +
      "Pancasila, flanked by 17 rice stalks and 8 cotton blossoms (for 17 August, independence day), " +
      "over mountains, rivers, paddy grids and the Jatiluhur dam. Green is fertility, yellow nobility, " +
      "blue peace, red courage, black steadfastness, white purity; the motto reads “Gemah Ripah Repeh " +
      "Rapih.”",
    sources: [
      { title: "Lambang Jawa Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jawa_Barat" },
    ],
  },

  "ID-BA": {
    description:
      "A flag bearing the Bali emblem, a dark-blue pentagon holding a gold five-pointed star (belief in " +
      "God), the Margarana heroes’ temple and a split candi bentar gate, a red padma lotus (the throne " +
      "of Shiva), rice and cotton for prosperity, a chain for unity and fans for Balinese arts. Blue is " +
      "tolerance, gold nobility, red heroism, white purity; the motto is “Bali Dwipa Jaya.”",
    sources: [
      { title: "Lambang Bali — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Bali" },
    ],
  },

  "ID-JT": {
    description:
      "A flag bearing the Central Java emblem, shaped like a kendi (water vessel) on a pentagonal base " +
      "(Pancasila). It holds the silhouette of Borobudur (the region’s cultural identity), twin " +
      "mountains and waters (unity of people and government, and life), a five-pointed star " +
      "(divinity), and rice and cotton (prosperity), with red-and-white ornament for the national " +
      "spirit. Motto: “Prasetya Ulah Sakti Bhakti Praja.”",
    sources: [
      { title: "Lambang Jawa Tengah — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jawa_Tengah" },
    ],
  },

  "ID-JI": {
    description:
      "A flag bearing the East Java emblem: a star (divinity), the Tugu Pahlawan heroes’ monument " +
      "(heroism in the independence war), a volcano (striving for a just society), a temple gate (the " +
      "ideals of struggle), rice and cotton (food and clothing), rivers and fields (prosperity) and a " +
      "gear and chain (strength and development). Motto: “Jer Basuki Mawa Beya” — success requires " +
      "sacrifice. In use since 1966.",
    sources: [
      { title: "Lambang Jawa Timur — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jawa_Timur" },
    ],
  },

  "ID-JK": {
    description:
      "A flag bearing the Jakarta emblem, a five-pointed shield (Pancasila) holding a gate and the " +
      "National Monument (Monas) — for the capital’s grandeur and its role as the nation’s gateway — " +
      "with rice and cotton (welfare), sea waves (its port and coast) and a gold binding (unity). Gold " +
      "is nobility, red heroism, white purity, blue the open sky. Motto: “Jaya Raya.”",
    sources: [
      { title: "Lambang DKI Jakarta — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Daerah_Khusus_Ibukota_Jakarta" },
    ],
  },

  "ID-SU": {
    description:
      "A flag bearing the heart-shaped North Sumatra emblem: a woman planting rice among palm, rubber " +
      "and tobacco with fish, below the five peaks of the Bukit Barisan (noble society and mutual " +
      "cooperation) and a gold star, held by a fist on a chain. The 17 cotton bolls, 8 web-angles and " +
      "45 rice grains mark 17 August 1945.",
    sources: [
      { title: "Lambang Sumatera Utara — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sumatera_Utara" },
    ],
  },

  "ID-SB": {
    description:
      "A flag bearing the West Sumatra emblem: the silhouette of a Minangkabau rumah gadang with its " +
      "horn-shaped gonjong roof and a tiered mosque roof, a star for belief in God, and three white " +
      "waves for social dynamism — together standing for a people firm in religion and adat. Motto: " +
      "“Tuah Sakato.”",
    sources: [
      { title: "Lambang Sumatera Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sumatera_Barat" },
    ],
  },

  "ID-SS": {
    description:
      "A flag bearing the South Sumatra emblem: a five-petalled lotus (courage and justice, and the " +
      "sacred flower of the old Srivijaya kingdom), nine rivers (the “Batang Hari Sembilan” that name " +
      "the province), the Ampera Bridge, and a mountain, under a traditional roof whose 17 peaks, 8 " +
      "rows and 45 tiles mark independence in 1945. Motto: “Bersatu Teguh.”",
    sources: [
      { title: "Lambang Sumatera Selatan — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sumatera_Selatan" },
    ],
  },

  "ID-RI": {
    description:
      "A flag bearing the Riau emblem: a yellow lancang sailing boat with white sails riding a " +
      "five-layered wave (the five principles of Pancasila), a keris dagger tipped with a serindit " +
      "bird for wisdom and heroism, and framing rice and cotton for prosperity. A chain of 45 links " +
      "marks 1945, the year of Indonesian independence.",
    sources: [
      { title: "Lambang Riau — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Riau" },
    ],
  },

  "ID-JA": {
    description:
      "A flag bearing the pentagonal Jambi emblem (the pentagon for Pancasila): a mosque for faith, " +
      "the Keris Siginjai recalling the struggle against colonial rule, and a gong for democratic " +
      "consensus, with a betel cerana for sincerity. Its motto “Sepucuk Jambi Sembilan Lurah” — one " +
      "Jambi, nine districts — stands for the unity of the province’s nine river regions.",
    sources: [
      { title: "Lambang Jambi — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Jambi" },
    ],
  },

  "ID-LA": {
    description:
      "A flag bearing the Lampung emblem: a golden siger (the traditional bridal crown) for cultural " +
      "dignity above a shield with a tiered parasol sheltering the people, flanked by 45 rice stalks " +
      "and 17 pepper leaves for the province’s harvests. Its motto “Sang Bumi Ruwa Jurai” means one " +
      "land of two traditions — the Saibatin and Pepadun peoples.",
    sources: [
      { title: "Lambang Lampung — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Lampung" },
    ],
  },

  "ID-BE": {
    description:
      "A flag bearing the Bengkulu emblem: a gold star for belief in God above a shield with two " +
      "crossed rudus daggers for heroism, the giant Rafflesia arnoldii flower of the province, and " +
      "rice and coffee for prosperity. Its 18 waves, 11 coffee leaves and further counts encode 18 " +
      "November 1968, the day Bengkulu became a province.",
    sources: [
      { title: "Lambang Bengkulu — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Bengkulu" },
    ],
  },

  "ID-BB": {
    description:
      "A flag bearing the five-sided Bangka Belitung emblem (the pentagon for Pancasila): a map of " +
      "the green islands in a light-blue sea, a grey tin ingot for the wealth that has sustained the " +
      "islands for over three centuries, and rice and pepper for prosperity. The 27 rice grains and " +
      "31 pepper corns mark Law 27/2000 that made it Indonesia’s 31st province. Motto: “Serumpun Sebalai.”",
    sources: [
      { title: "Lambang Kepulauan Bangka Belitung — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Kepulauan_Bangka_Belitung" },
    ],
  },

  "ID-YO": {
    description:
      "A flag bearing the Yogyakarta golong-gilig emblem: a gold star for belief in God over a red " +
      "shield holding the white Tugu monument crowned with jasmine, winged by feathers counting 9 " +
      "and 8 for Sultan Hamengkubuwono IX and Paku Alam VIII, and framed by rice and cotton for " +
      "welfare. Its Javanese motto encodes 1876/1945; the regional motto is “Hamemayu Hayuning Bawana.”",
    sources: [
      { title: "Lambang Daerah Istimewa Yogyakarta — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Daerah_Istimewa_Yogyakarta" },
    ],
  },

  "ID-KB": {
    description:
      "A flag bearing the five-sided West Kalimantan emblem (the pentagon for Pancasila): a white " +
      "talawang shield with a crossed mandau sword and keris for ancestral heritage, a line for the " +
      "equator that crosses the province, and an ever-burning flame for an unquenchable fighting " +
      "spirit, framed by 45 rice stalks and 17 cotton blooms for 1945. Its Sanskrit motto “Akçaya” " +
      "means “never perishing.”",
    sources: [
      { title: "Lambang Kalimantan Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Kalimantan_Barat" },
    ],
  },

  "ID-KS": {
    description:
      "A flag bearing the South Kalimantan emblem: a gold star for belief in God over a shield holding " +
      "a black Banjar “Bubungan Tinggi” high-roofed house for the region’s culture, an eight-pointed " +
      "diamond for its wealth, and rice and rubber for its farming and tapping livelihoods. Its motto " +
      "“Waja sampai kaputing” means to stay strong as steel from beginning to end.",
    sources: [
      { title: "Lambang Kalimantan Selatan — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Kalimantan_Selatan" },
    ],
  },

  "ID-KT": {
    description:
      "A flag bearing the talawang-shield Central Kalimantan emblem: a belanga vessel holding a coiled " +
      "knotted root for strength and solidarity, a star for belief in God, a tingang (hornbill) for " +
      "greatness, a mandau sword for Dayak glory and a sumpitan blowpipe for peace, with rice and " +
      "cotton for prosperity. Its Sangen motto “Isen Mulang” means “never retreat.”",
    sources: [
      { title: "Lambang Kalimantan Tengah — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Kalimantan_Tengah" },
    ],
  },

  "ID-KI": {
    description:
      "A flag bearing the five-sided East Kalimantan emblem: a star for belief in God over a hexagonal " +
      "talawang shield for peace, a mandau sword and a sumpit blowpipe for the people’s struggle, and " +
      "drops of oil and dammar resin for the province’s abundant natural wealth. Its Banjar motto " +
      "“Ruhui Rahayu” means truly peaceful and harmonious.",
    sources: [
      { title: "Lambang Kalimantan Timur — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Kalimantan_Timur" },
    ],
  },

  "ID-KR": {
    description:
      "A flag bearing the Riau Islands emblem: a gold star for devotion to God, a yellow boat with " +
      "white sail for the islanders’ maritime life, a serindit-headed seven-curve keris for courage, " +
      "and rice and cotton for prosperity. Its 32 chain links mark the 32nd province, and the counts " +
      "of grains and waves encode 2002 and 1 July 2004. Motto: “Berpancang Amanah, Bersauh Marwah.”",
    sources: [
      { title: "Lambang Kepulauan Riau — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Kepulauan_Riau" },
    ],
  },

  "ID-GO": {
    description:
      "A flag bearing the heart-shaped Gorontalo emblem for loyalty and protection: a star for high " +
      "ideals, an open book for learning, a coconut tree for steady progress, the wings of the endemic " +
      "maleo bird, and rice and cotton for welfare. The 16 maleo feathers and the chain and grain " +
      "counts encode 16 February 2000, when the province was formed.",
    sources: [
      { title: "Lambang Gorontalo — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Gorontalo" },
    ],
  },

  "ID-BT": {
    description:
      "A flag bearing the Banten emblem: a star for belief in God over the tower of the Great Mosque " +
      "of Banten and the Kaibon gate — the sultanate’s gateway to global trade — above black mountains, " +
      "a blue sea and the endemic Javan rhinoceros for determination in justice, framed by 17 rice " +
      "stalks and 8 cotton blooms for 1945. Motto: “Iman Taqwa” (faith and piety).",
    sources: [
      { title: "Lambang Banten — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Banten" },
    ],
  },

  "ID-SA": {
    description:
      "A flag bearing the five-sided North Sulawesi emblem (the pentagon and five coconuts for " +
      "Pancasila): coconut, clove, nutmeg, rice and corn for the province’s mainstay crops, with the " +
      "counts of kernels, fronds and grains encoding both 23 September 1964, when the province was " +
      "formed, and 17 August 1945, Indonesia’s independence.",
    sources: [
      { title: "Lambang Sulawesi Utara — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sulawesi_Utara" },
    ],
  },

  "ID-SG": {
    description:
      "A flag bearing the five-sided Southeast Sulawesi emblem (the pentagon for Pancasila): the head " +
      "of the endemic anoa for perseverance and agility above a shield in four colours for the founding " +
      "regions — green Kendari, brown Kolaka nickel, yellow Muna teak and black Buton asphalt — with " +
      "rice, cotton and a 27-link chain encoding 27 April 1964 and 17 August 1945.",
    sources: [
      { title: "Lambang Sulawesi Tenggara — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sulawesi_Tenggara" },
    ],
  },

  "ID-SN": {
    description:
      "A flag bearing the South Sulawesi emblem: a gold star for belief in God over a white mountain, " +
      "a badik dagger and green ricefields, and a shield showing Fort Somba Opu with a pinisi ship for " +
      "the seafaring spirit of Makassar, with coconut, hoe and gear for farming and industry, framed " +
      "by 17 rice stalks and 8 cotton blooms for 1945. Its Lontara motto “Toddo’ Puli” means steadfast.",
    sources: [
      { title: "Lambang Sulawesi Selatan — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sulawesi_Selatan" },
    ],
  },

  "ID-ST": {
    description:
      "A flag bearing the heart-shaped Central Sulawesi emblem: a star for belief in God and firm " +
      "ideals, a coconut tree for the crop that underpins the people’s welfare, and rice and cotton " +
      "for prosperity. The counts of cotton petals, rice grains and waves encode 13 April 1964, when " +
      "the province was established.",
    sources: [
      { title: "Lambang Sulawesi Tengah — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sulawesi_Tengah" },
    ],
  },

  "ID-SR": {
    description:
      "A flag bearing the West Sulawesi emblem: a star for belief in God and a white Balenga Leta " +
      "vessel holding fourteen gold meanders for the historic Mandar kingdoms, a forward-facing sandeq " +
      "boat for progress over five waves for the founding districts, a black trisula for courage and " +
      "knowledge, and rice and jasmine for refinement. Motto: “Mellete Diatonganan” (pursuing truth).",
    sources: [
      { title: "Lambang Sulawesi Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Sulawesi_Barat" },
    ],
  },

  "ID-MA": {
    description:
      "A flag bearing the three-cornered Maluku shield: sago and coconut palms for the islands’ staple " +
      "food and farming, pearls, nutmeg and cloves for the famed spice and sea wealth, a spear for the " +
      "warrior spirit, and a boat on the sea for perpetual unity. Its motto “Siwa Lima” means “ours " +
      "together” — belonging to all.",
    sources: [
      { title: "Lambang Maluku — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Maluku" },
    ],
  },

  "ID-MU": {
    description:
      "A flag bearing the five-sided North Maluku emblem: a star for belief in God over a mountain for " +
      "forest wealth and a sea for unity, with rice, cloves, nutmeg and palm for prosperity and the " +
      "crossed salawaku shield and parang machete for heroism. Its motto “Marimoi Ngone Futuru” means " +
      "“united we are strong.”",
    sources: [
      { title: "Lambang Maluku Utara — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Maluku_Utara" },
    ],
  },

  "ID-NB": {
    description:
      "A flag bearing the West Nusa Tenggara emblem: a star for Pancasila over the smoking peak of " +
      "Mount Rinjani, a mosque dome for the people’s devotion, and a Sumbawa deer for the local fauna, " +
      "framed by rice and cotton whose counts mark 14 August 1958, when the province was formed, with " +
      "a chain for the 1945 independence.",
    sources: [
      { title: "Lambang Nusa Tenggara Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Nusa_Tenggara_Barat" },
    ],
  },

  "ID-NT": {
    description:
      "A flag bearing the five-sided East Nusa Tenggara emblem (the pentagon for Pancasila): a star " +
      "for the greatness of God, the Komodo dragon found only in the province, a spear for glory and " +
      "a banyan tree for enduring unity, framed by rice and cotton whose counts mark 20 December 1958, " +
      "when the province was established.",
    sources: [
      { title: "Lambang Nusa Tenggara Timur — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Nusa_Tenggara_Timur" },
    ],
  },

  "ID-PA": {
    description:
      "A flag bearing the official five-sided Papua government emblem (the pentagon for Pancasila): " +
      "three pillars on stacked stones recalling the Trikora campaign and the 1969 act of integration, " +
      "three snow-capped mountains for Papua’s highlands, and rice and cotton counted 17 and 8 for " +
      "1945. Its motto “Karya Swadaya” means self-reliant work. (This is the provincial coat of arms, " +
      "not the Morning Star flag.)",
    sources: [
      { title: "Lambang Papua — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Papua" },
    ],
  },

  "ID-PB": {
    description:
      "A flag bearing the official five-sided West Papua government emblem (the pentagon for Pancasila): " +
      "a white star for God, a tree and fish for forest and marine wealth, a red refinery tower for " +
      "mineral riches, and a cassowary head marking the province at Papua’s ‘bird’s-head’. The 12 and " +
      "10 sago-frond pairs encode 12 October 1999, its founding. Motto: “Cintaku Negeriku” (my love, " +
      "my country).",
    sources: [
      { title: "Lambang Papua Barat — Wikipedia (Indonesian)", url: "https://id.wikipedia.org/wiki/Lambang_Papua_Barat" },
    ],
  },

  "HU-BA": {
    description:
      "The county coat of arms on the flag: on a blue field over a green base, a silver four-turreted " +
      "fortress (for county rank) whose gate holds a shield with the letters L and J; below, two men " +
      "carry a huge cluster of grapes slung on a pole — the biblical grapes of Canaan, here a sign of " +
      "Baranya’s fertile vineyards and its ‘heveng’ harvest tradition.",
    sources: [
      { title: "Baranya vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Baranya_v%C3%A1rmegye" },
    ],
  },

  "HU-BK": {
    description:
      "The county coat of arms on the flag: a shield joining the two predecessor counties — Saint Paul " +
      "the Apostle with sword and book (for old Bács-Bodrog) and an armoured knight with a sabre (for " +
      "Pest-Pilis-Solt-Kiskun) — over wavy silver-and-blue bars for the Danube and the Tisza, the two " +
      "rivers between which Bács-Kiskun lies.",
    sources: [
      { title: "Bács-Kiskun vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/B%C3%A1cs-Kiskun_v%C3%A1rmegye" },
    ],
  },

  "HU-BE": {
    description:
      "The county coat of arms on the flag: on the blue half a golden lion rampant on a green triple " +
      "mount, holding three wheat stalks and a silver sabre and gazing up at the Holy Crown; on the " +
      "green half three silver bands for the county’s three rivers — the White, Black and Sebes Körös.",
    sources: [
      { title: "Békés vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/B%C3%A9k%C3%A9s_v%C3%A1rmegye" },
    ],
  },

  "HU-BZ": {
    description:
      "The county coat of arms on the flag: a shield quartered for the four historic counties merged " +
      "in 1950 — a crowned silver falcon (Borsod), golden grapes with angels (Abaúj), a crowned " +
      "double-tailed lion with a scale (Gömör) and a silver castle (Zemplén) — crested by a crowned " +
      "black eagle.",
    sources: [
      { title: "Borsod-Abaúj-Zemplén vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Borsod-Aba%C3%BAj-Zempl%C3%A9n_v%C3%A1rmegye" },
    ],
  },

  "HU-CS": {
    description:
      "The county coat of arms on the flag: a quartered shield joining three historic counties — Saint " +
      "Gellért with the Danube (Csanád), a golden lion, a black turul bird, and a silver bastion with " +
      "a human-faced sun and a cornucopia (Torontál) — over a small inescutcheon of a black eagle above " +
      "three silver waves for old Csongrád.",
    sources: [
      { title: "Csongrád-Csanád vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Csongr%C3%A1d-Csan%C3%A1d_v%C3%A1rmegye" },
    ],
  },

  "HU-FE": {
    description:
      "The county coat of arms on the flag: Saint Stephen, Hungary’s first king, in golden robes " +
      "kneeling before the Virgin and Child and offering up the Holy Crown, sceptre and sword — the " +
      "legendary dedication of the country to Mary — with the county’s red-and-silver bars and a silver " +
      "double cross on a crowned green mount.",
    sources: [
      { title: "Fejér vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Fej%C3%A9r_v%C3%A1rmegye" },
    ],
  },

  "HU-GS": {
    description:
      "The county coat of arms on the flag: a shield joining its three founding counties — golden " +
      "twin-tailed lions holding a crown on a triple mound (Moson) and an armoured knight with a sword " +
      "(Sopron) on the blue upper half, and three silver waves on the red lower half (Győr) — beneath " +
      "a golden county crown.",
    sources: [
      { title: "Győr-Moson-Sopron vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Gy%C5%91r-Moson-Sopron_v%C3%A1rmegye" },
    ],
  },

  "HU-HB": {
    description:
      "The county coat of arms on the flag: two shields side by side for the counties merged in 1950 — " +
      "Bihar’s wheat sheaves and grapes above three silver fish among reeds (its farming and waters), " +
      "and Hajdú’s blue shield ringed by a dragon with an armoured arm holding sabre and pistol (its " +
      "warrior heritage).",
    sources: [
      { title: "Hajdú-Bihar vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Hajd%C3%BA-Bihar_v%C3%A1rmegye" },
    ],
  },

  "HU-HE": {
    description:
      "The county coat of arms on the flag: on a blue field a stork with a green serpent in its beak " +
      "and a grapevine in its raised claw. The stork stands for Heves as a ‘shield of Christianity’, " +
      "the serpent for its healing waters and mining, and the grapes for its famed wine hills; blue is " +
      "faith and green is hope.",
    sources: [
      { title: "Heves vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Heves_v%C3%A1rmegye" },
    ],
  },

  "HU-JN": {
    description:
      "The county coat of arms on the flag: a shield for its three founding peoples — a stork (Heves " +
      "és Külső-Szolnok), a double-tailed lion with a crescent and star (the Nagykun), and a horseman " +
      "sounding the Horn of Lehel (the Jász) — over silver bands for the Tisza, Zagyva and Körös rivers.",
    sources: [
      { title: "Jász-Nagykun-Szolnok vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/J%C3%A1sz-Nagykun-Szolnok_v%C3%A1rmegye" },
    ],
  },

  "HU-KE": {
    description:
      "The county coat of arms on the flag: two shields for the counties merged in 1950 — an armoured " +
      "knight fending off a bear with his sword (Komárom’s martial tradition) and Saint Adalbert " +
      "enthroned with three lances of his martyrdom and a crosier (Esztergom, the old ecclesiastical " +
      "seat).",
    sources: [
      { title: "Komárom-Esztergom vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Kom%C3%A1rom-Esztergom_v%C3%A1rmegye" },
    ],
  },

  "HU-NO": {
    description:
      "The county coat of arms on the flag: on a blue field over green ground a silver-armoured knight " +
      "with a raised sword, leaning on a shield of Hungary’s arms. The soldier recalls Nógrád’s long " +
      "role as a frontier and fortress land — from the medieval castles through the Ottoman wars — and " +
      "appears already on a 1551 county seal.",
    sources: [
      { title: "Nógrád vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/N%C3%B3gr%C3%A1d_v%C3%A1rmegye" },
    ],
  },

  "HU-PE": {
    description:
      "The county coat of arms on the flag: on a blue field a golden lion rampant on a green triple " +
      "mound, holding an open golden crown and a cross-topped orb — the royal regalia. The arms date " +
      "from the 1659 union of Pest, Pilis and Solt counties around the historic heart of the kingdom.",
    sources: [
      { title: "Pest vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Pest_v%C3%A1rmegye" },
    ],
  },

  "HU-SO": {
    description:
      "The county coat of arms on the flag: on a blue field an armoured hand holding a vine heavy with " +
      "ripe grapes for the region’s viticulture, over a crown for the Somogy people’s loyalty to king " +
      "and crown, crested by a red-and-silver chequered eagle. Granted in 1498, it was the first " +
      "Hungarian county arms.",
    sources: [
      { title: "Somogy vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Somogy_v%C3%A1rmegye" },
    ],
  },

  "HU-SZ": {
    description:
      "The county coat of arms on the flag: three historic county shields joined together — Szabolcs " +
      "(wheat ears, fish, tree trunk and a drawn bow), Szatmár (a crab, a cannon tower and a pike for " +
      "its wine hills, oak forests and rivers) and Bereg (a silver cross, grapes, a bear and two trout) " +
      "— under a jewelled county crown.",
    sources: [
      { title: "Szabolcs-Szatmár-Bereg vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Szabolcs-Szatm%C3%A1r-Bereg_v%C3%A1rmegye" },
    ],
  },

  "HU-TO": {
    description:
      "The county coat of arms on the flag: Saint Stephen — Hungary’s first king, in whose reign Tolna " +
      "was founded — enthroned with sceptre and orb beneath angels bearing the Holy Crown, with the " +
      "young Saint Emeric holding lilies and a shield of Hungary’s arms alongside. Granted anew by " +
      "Leopold I in 1699 after Ottoman rule.",
    sources: [
      { title: "Tolna vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Tolna_v%C3%A1rmegye" },
    ],
  },

  "HU-VA": {
    description:
      "The county coat of arms on the flag: on a blue field a tall silver bastion on a green mound, " +
      "crowned by an ostrich holding a horseshoe — a pun on the name Vas (‘iron’) and its old title " +
      "‘Iron Castle County’ — with a chalice of golden grapes above for the region’s wine.",
    sources: [
      { title: "Vas vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Vas_v%C3%A1rmegye" },
    ],
  },

  "HU-VE": {
    description:
      "The county coat of arms on the flag: on a blue field a silver three-towered castle on a green " +
      "triple mound for the old episcopal seat of Veszprém, the central tower sprouting oak branches " +
      "with golden acorns for the Bakony hills, flanked by a crescent and a six-pointed star.",
    sources: [
      { title: "Veszprém vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Veszpr%C3%A9m_v%C3%A1rmegye" },
    ],
  },

  "HU-ZA": {
    description:
      "The county coat of arms on the flag: on a blue field a silver bar crossed by a black arrow for " +
      "the Zala River flowing west to east, with an open golden crown above for the historic role and " +
      "pride of Zala’s common nobility; the blue stands for sky, water and loyalty.",
    sources: [
      { title: "Zala vármegye — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Zala_v%C3%A1rmegye" },
    ],
  },

  "HU-BU": {
    description:
      "The city coat of arms on the flag: a red shield split by a white wavy band for the Danube — a " +
      "single golden tower above for Pest and a three-towered golden castle below for Buda and Óbuda, " +
      "the cities the river joined into Budapest — beneath the Holy Crown, flanked by a lion and a " +
      "griffin.",
    sources: [
      { title: "Budapest címere — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Budapest_c%C3%ADmere" },
    ],
  },

  "HU-DE": {
    description:
      "The city coat of arms on the flag: on a blue field a green palm tree for growth and a white " +
      "Lamb of God standing on two open books, holding a cross-staff with a red banner — the emblem of " +
      "Debrecen as the ‘Calvinist Rome’, its faith and learning — crested by a phoenix rising for " +
      "renewal.",
    sources: [
      { title: "Debrecen címere — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Debrecen_c%C3%ADmere" },
    ],
  },

  "HU-MI": {
    description:
      "The city coat of arms on the flag: Saint Stephen, Hungary’s first king, in purple robes with " +
      "sceptre and orb, crested by a hajdú frontier soldier bearing wheat and grapes for the region’s " +
      "farming and vineyards, the shield flanked by a golden lion and griffin. Adopted 1909, restored " +
      "1990.",
    sources: [
      { title: "Miskolc címere — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Miskolc_c%C3%ADmere" },
    ],
  },

  "HU-PS": {
    description:
      "The city coat of arms on the flag: a walled city with four gates and a central cathedral tower, " +
      "set among three green peaks — the central Mecsek crowned in gold, flanked by Aranyhegy and " +
      "Tettye — with a stream, a six-pointed star and a crescent, and the supporters Loyalty and " +
      "Industry. Granted by Maria Theresa in 1780.",
    sources: [
      { title: "Pécs címere — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/P%C3%A9cs_c%C3%ADmere" },
    ],
  },

  "HU-EG": {
    description:
      "The city coat of arms on the flag: on a blue field a three-bastioned fortress wall — Eger’s " +
      "famous castle — a silver unicorn holding a sword entwined by a serpent (faith overcoming " +
      "deceit), and an eagle with an open book for Saint John, patron of the Eger archdiocese, with a " +
      "star and half-sun for day and night.",
    sources: [
      { title: "Eger címere — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Eger_c%C3%ADmere" },
    ],
  },

  "HU-SN": {
    description:
      "The city coat of arms on the flag: a red shield with a three-towered fortified wall for the " +
      "walled medieval city, two crowned haloed heads and an olive branch, and the inscription " +
      "“Civitas Fidelissima” — the Most Loyal City — earned when Sopron voted in 1921 to stay with " +
      "Hungary.",
    sources: [
      { title: "Sopron — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Sopron" },
    ],
  },

  "HU-KV": {
    description:
      "The city coat of arms on the flag: on a blue field a silver gate-fortress of ashlar stone with " +
      "a raised portcullis on a green triple mound, three crenellated towers above. The gated castle " +
      "is a pun on the name Kaposvár — ‘gate’ (kapu) and ‘castle’ (vár) — the 13th-century fort on the " +
      "Kapos River.",
    sources: [
      { title: "Kaposvár — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Kaposv%C3%A1r" },
    ],
  },

  "HU-SH": {
    description:
      "The city coat of arms on the flag: a fortified gate with a section of wall and a small tower " +
      "above it, the tower flanked by a star and a crescent moon. The design goes back to a 1734 civic " +
      "seal of Szombathely, the ancient Roman Savaria; the walled gate stands for civic defence.",
    sources: [
      { title: "Szombathely — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Szombathely" },
    ],
  },

  "HU-NY": {
    description:
      "The city coat of arms on the flag: on a blue field a white church with a silver star among " +
      "birch trees — a rebus of the name Nyíregyháza, ‘house among the birches’ (nyír = birch) — over " +
      "a red field where an arm holds golden wheat for the region’s farming.",
    sources: [
      { title: "Nyíregyháza — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Ny%C3%ADregyh%C3%A1za" },
    ],
  },

  "HU-SS": {
    description:
      "The city coat of arms on the flag: on a blue field a red stone fortress-tower recalling the " +
      "Benedictine abbey of Szekszárd, a golden grape cluster above and a bell below, flanked by wheat " +
      "and a vine of noble grapes — emblems of the town’s famed red-wine country.",
    sources: [
      { title: "Szekszárd — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Szeksz%C3%A1rd" },
    ],
  },

  "HU-ZE": {
    description:
      "The city coat of arms on the flag: Mary Magdalene, the city’s patron, holding a cross with a " +
      "whip at her feet for the Penitent Magdalene, against fortress walls recalling Zalaegerszeg’s " +
      "16th–17th-century defences during the Ottoman wars.",
    sources: [
      { title: "Zalaegerszeg — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Zalaegerszeg" },
    ],
  },

  "HU-ST": {
    description:
      "The city coat of arms on the flag: a divided shield — three silver wavy lines on black for the " +
      "Salgó, Tarján and Pécskő streams (and the region’s mining), and a black eagle on a green triple " +
      "mound for the Tarján conquering tribe — beneath a battlement crown standing for the three " +
      "castles around Salgótarján.",
    sources: [
      { title: "Salgótarján — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Salg%C3%B3tarj%C3%A1n" },
    ],
  },

  "HU-DU": {
    description:
      "The city coat of arms on the flag: a quartered shield — a silver Lamb of God with a banner for " +
      "the medieval village of Dunapentele, a red-and-silver chequered field for the planned industrial " +
      "city, and a silver Roman capital for ancient Intercisa — on blue fields for the Danube from which " +
      "Dunaújváros (‘Danube New Town’) takes its name.",
    sources: [
      { title: "Dunaújváros — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Duna%C3%BAjv%C3%A1ros" },
    ],
  },

  "HU-BC": {
    description:
      "The city coat of arms on the flag: a lion holding two wheat stalks for the region’s rich " +
      "wheatlands, with a fish below recalling the old Fehér-Körös river that once flowed through the " +
      "town, and a grapevine above the crown for the 19th-century vineyards that later vanished to " +
      "phylloxera.",
    sources: [
      { title: "Békéscsaba — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/B%C3%A9k%C3%A9scsaba" },
    ],
  },

  "HU-HV": {
    description:
      "The city coat of arms on the flag: on a light-blue field a golden faced sun with a silver " +
      "crescent moon opposite, and below an armoured arm holding three silver arrows pointing up — a " +
      "martial emblem crested by a helm with a noble crown.",
    sources: [
      { title: "Hódmezővásárhely — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/H%C3%B3dmez%C5%91v%C3%A1s%C3%A1rhely" },
    ],
  },

  "HU-VM": {
    description:
      "The city coat of arms on the flag: on a red field over green a silver horse bearing an armoured " +
      "knight with a sword, crested by a hussar rising from a crown. Red stands for blood and life and " +
      "the town’s war-torn past, green for nature and culture, and the crown for Veszprém’s municipal " +
      "self-government.",
    sources: [
      { title: "Veszprém — Wikipédia (Hungarian)", url: "https://hu.wikipedia.org/wiki/Veszpr%C3%A9m" },
    ],
  },

  "SE-M": {
    description:
      "The county arms as a banner: on a red field a crowned golden griffin’s head. The griffin comes " +
      "from the old arms of Malmö, granted in 1437 by Eric of Pomerania (a Pomeranian griffin); the " +
      "provincial arms of Skåne were formed from it in 1660, and the 1997 county arms reversed the " +
      "tinctures to gold-on-red.",
    sources: [
      { title: "Scania — Wikipedia", url: "https://en.wikipedia.org/wiki/Scania" },
    ],
  },

  "SE-W": {
    description:
      "The county arms as a banner: on a blue field two golden Dalecarlian arrows (dalpilar) crossed in " +
      "saltire points upward, with a crown above. The crossed arrows appear on Dalarna’s seals from " +
      "1525 and became the arms in 1560; the ducal crown marks the historic title Duke of Dalarna.",
    sources: [
      { title: "Dalarna — Wikipedia", url: "https://en.wikipedia.org/wiki/Dalarna" },
    ],
  },

  "SE-I": {
    description:
      "The county arms as a banner: on a blue field a silver ram walking, holding a red banner with " +
      "five tails on a golden cross-staff — the Paschal-Lamb-style ‘Gute ram’ of Gotland. The arms " +
      "were granted about 1560 and adopted by the county in 1936.",
    sources: [
      { title: "Gotland — Wikipedia", url: "https://en.wikipedia.org/wiki/Gotland" },
    ],
  },

  "SE-AB": {
    description:
      "The county arms as a banner, combining the arms of its three constituent parts: the crowned " +
      "head of Saint Eric — patron of Stockholm — for the City of Stockholm, a black griffin on gold " +
      "for Södermanland, and a golden royal orb (riksäpple) on red for Uppland.",
    sources: [
      { title: "Coat of arms of Stockholm — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Stockholm" },
      { title: "Södermanland — Wikipedia", url: "https://en.wikipedia.org/wiki/S%C3%B6dermanland" },
      { title: "Uppland — Wikipedia", url: "https://en.wikipedia.org/wiki/Uppland" },
    ],
  },

  "SE-BD": {
    description:
      "The county arms as a banner, quartering the arms of its two historic provinces: a running " +
      "reindeer among golden stars on blue for Västerbotten, and the red club-bearing wildman wrapped " +
      "in birch leaves on silver for Lapland — the old heraldic figure of the untamed north.",
    sources: [
      { title: "Västerbotten — Wikipedia", url: "https://en.wikipedia.org/wiki/V%C3%A4sterbotten" },
      { title: "Lapland (Sweden) — Wikipedia", url: "https://en.wikipedia.org/wiki/Lapland_(Sweden)" },
    ],
  },

  "SE-AC": {
    description:
      "The county arms as a banner, combining the arms of three provinces: a running reindeer among " +
      "golden stars on blue for Västerbotten, the red club-bearing wildman on silver for Lapland, and " +
      "three silver salmon on blue — the middle one swimming against the others — for Ångermanland’s " +
      "spawning rivers.",
    sources: [
      { title: "Västerbotten — Wikipedia", url: "https://en.wikipedia.org/wiki/V%C3%A4sterbotten" },
      { title: "Lapland (Sweden) — Wikipedia", url: "https://en.wikipedia.org/wiki/Lapland_(Sweden)" },
      { title: "Ångermanland — Wikipedia", url: "https://en.wikipedia.org/wiki/%C3%85ngermanland" },
    ],
  },

  "SE-C": {
    description:
      "The county arms as a banner: on a red field a golden royal orb (riksäpple) gemmed and topped " +
      "with a silver cross — the arms of Uppland, the province Uppsala County covers. The orb is the " +
      "globus cruciger, an emblem of sovereignty, marking Uppland’s historic rank as a duchy.",
    sources: [
      { title: "Uppland — Wikipedia", url: "https://en.wikipedia.org/wiki/Uppland" },
    ],
  },

  "SE-D": {
    description:
      "The county arms as a banner: on a gold field a black griffin rampant with red beak, tongue and " +
      "claws — the arms of Södermanland, granted in 1560 and given to Södermanland County in 1940.",
    sources: [
      { title: "Södermanland — Wikipedia", url: "https://en.wikipedia.org/wiki/S%C3%B6dermanland" },
    ],
  },

  "SE-S": {
    description:
      "The county arms as a banner: on a silver field a blue eagle displayed with red beak and claws " +
      "— the arms of Värmland, the province Värmland County covers.",
    sources: [
      { title: "Värmland — Wikipedia (Swedish)", url: "https://sv.wikipedia.org/wiki/V%C3%A4rmland" },
    ],
  },

  "SE-T": {
    description:
      "The county arms as a banner, combining the arms of three provinces: red with golden crossed " +
      "arrows between silver roses for Närke (the peasants’ favoured weapon), a blue eagle on silver " +
      "for Värmland, and silver with blue fire-mountains flaming red for Västmanland’s mines.",
    sources: [
      { title: "Närke — Wikipedia", url: "https://en.wikipedia.org/wiki/N%C3%A4rke" },
      { title: "Värmland — Wikipedia (Swedish)", url: "https://sv.wikipedia.org/wiki/V%C3%A4rmland" },
      { title: "Västmanland — Wikipedia", url: "https://en.wikipedia.org/wiki/V%C3%A4stmanland" },
    ],
  },

  "SE-U": {
    description:
      "The county arms as a banner: on a silver field three blue mounts each issuing red flames — the " +
      "‘fire-mountains’ of Västmanland, standing for its mining districts (Sala, Lindesberg and " +
      "Norberg/Skinnskatteberg).",
    sources: [
      { title: "Västmanland — Wikipedia", url: "https://en.wikipedia.org/wiki/V%C3%A4stmanland" },
    ],
  },

  "SE-E": {
    description:
      "The county arms as a banner: on a red field a golden griffin with dragon’s wings, rampant " +
      "between four silver roses — the arms of Östergötland, granted in 1884 from two 16th-century " +
      "seals.",
    sources: [
      { title: "Östergötland — Wikipedia", url: "https://en.wikipedia.org/wiki/%C3%96sterg%C3%B6tland" },
    ],
  },

  "SE-F": {
    description:
      "The county arms as a banner, combining Sweden’s three golden crowns (the lesser state arms) with " +
      "the arms of the town of Jönköping — a silver three-towered castle on red rising from wavy blue " +
      "water — formalised for Jönköping County in 1942.",
    sources: [
      { title: "Jönköping County — Wikipedia", url: "https://en.wikipedia.org/wiki/J%C3%B6nk%C3%B6ping_County" },
    ],
  },

  "SE-G": {
    description:
      "The county arms as a banner: on a gold field over a green mount the red Småland lion holding a " +
      "black crossbow — the martial emblem of Småland, the province Kronoberg County lies in, granted " +
      "in 1569.",
    sources: [
      { title: "Småland — Wikipedia", url: "https://en.wikipedia.org/wiki/Sm%C3%A5land" },
    ],
  },

  "SE-H": {
    description:
      "The county arms as a banner, quartering the arms of two provinces: the red Småland lion holding " +
      "a crossbow on gold, and a golden red-antlered hart on blue for Öland — the island that was a " +
      "royal game park.",
    sources: [
      { title: "Småland — Wikipedia", url: "https://en.wikipedia.org/wiki/Sm%C3%A5land" },
      { title: "Öland — Wikipedia", url: "https://en.wikipedia.org/wiki/%C3%96land" },
    ],
  },

  "SE-K": {
    description:
      "The county arms as a banner: on a blue field a golden uprooted oak tree (for Blekinge’s oak " +
      "forests) charged with Sweden’s three crowns up the trunk — marking the former Danish province’s " +
      "passing to Sweden in 1658; arms granted in 1660.",
    sources: [
      { title: "Blekinge — Wikipedia", url: "https://en.wikipedia.org/wiki/Blekinge" },
    ],
  },

  "SE-N": {
    description:
      "The county arms as a banner: on a blue field a silver lion rampant with red tongue and claws — " +
      "the arms of Halland, created in 1660 after the province passed to Sweden, echoing the lion of " +
      "the 14th-century duke Bengt Algotsson.",
    sources: [
      { title: "Halland — Wikipedia", url: "https://en.wikipedia.org/wiki/Halland" },
    ],
  },

  "SE-X": {
    description:
      "The county arms as a banner, quartering the arms of two provinces: a red elk on silver strewn " +
      "with blue roundels for Gästrikland, and a golden goat on black for Hälsingland — the goat " +
      "recalling the province’s old goat-herding economy.",
    sources: [
      { title: "Gästrikland — Wikipedia", url: "https://en.wikipedia.org/wiki/G%C3%A4strikland" },
      { title: "Hälsingland — Wikipedia", url: "https://en.wikipedia.org/wiki/H%C3%A4lsingland" },
    ],
  },

  "SE-Y": {
    description:
      "The county arms as a banner, combining the arms of two provinces: three silver salmon on blue — " +
      "the middle one swimming against the others — for Ångermanland’s spawning rivers, and blue, " +
      "silver and red wavy bars for Medelpad, the land between the Ljungan and Indalsälven rivers.",
    sources: [
      { title: "Ångermanland — Wikipedia", url: "https://en.wikipedia.org/wiki/%C3%85ngermanland" },
      { title: "Medelpad — Wikipedia", url: "https://en.wikipedia.org/wiki/Medelpad" },
    ],
  },

  "SE-Z": {
    description:
      "The county arms as a banner, combining two provinces: on blue a silver moose with a golden " +
      "falcon striking its back and a golden hound rearing before it — Jämtland caught between hunters " +
      "(popularly, between Norway and Sweden) — and on silver a black sledgehammer with tongs and " +
      "hammers for Härjedalen’s ironworking heritage.",
    sources: [
      { title: "Jämtland — Wikipedia", url: "https://en.wikipedia.org/wiki/J%C3%A4mtland" },
      { title: "Härjedalen — Wikipedia", url: "https://en.wikipedia.org/wiki/H%C3%A4rjedalen" },
    ],
  },

  "SE-O": {
    description:
      "The county arms as a banner, quartering four arms: the Swedish lion holding a three-crowns " +
      "shield for the city of Gothenburg, a red castle for Bohuslän (Bohus fortress), a red ox on " +
      "silver for Dalsland, and the black-and-gold counterchanged lion between two stars for " +
      "Västergötland.",
    sources: [
      { title: "Västra Götaland County — Wikipedia", url: "https://en.wikipedia.org/wiki/V%C3%A4stra_G%C3%B6taland_County" },
      { title: "Bohuslän — Wikipedia", url: "https://en.wikipedia.org/wiki/Bohusl%C3%A4n" },
      { title: "Dalsland — Wikipedia", url: "https://en.wikipedia.org/wiki/Dalsland" },
      { title: "Västergötland — Wikipedia", url: "https://en.wikipedia.org/wiki/V%C3%A4sterg%C3%B6tland" },
    ],
  },

  "AT-6": {
    description:
      "The state arms on the white-and-green flag: on a green field the silver Styrian Panther, a " +
      "heraldic beast with red horns and claws that breathes fire from its mouth. It has been Styria’s " +
      "emblem since the duchy was created in 1180 — one of Europe’s oldest state symbols, essentially " +
      "unchanged for over 750 years.",
    sources: [
      { title: "Steirischer Panther — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Steirischer_Panther" },
    ],
  },

  "AT-2": {
    description:
      "The state arms on the flag: a shield split between three black lions on gold — inherited from " +
      "the Babenberg dukes — and a silver bar on red, the Austrian Bindenschild marking Carinthia’s " +
      "ties to Austria. The small (shield-only) version appears on the state flag.",
    sources: [
      { title: "Kärntner Wappen — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/K%C3%A4rntner_Wappen" },
    ],
  },

  "AT-3": {
    description:
      "The state arms on the flag: on a blue field five golden eagles (two facing pairs and one turned) " +
      "beneath a golden mural crown. The eagles are the emblem of ‘old’ Austria — recorded from about " +
      "1330 at Klosterneuburg — and are nicknamed the ‘lark arms’ (Lerchenwappen) from a historic " +
      "misreading of the birds.",
    sources: [
      { title: "Wappen Niederösterreichs — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_Nieder%C3%B6sterreichs" },
    ],
  },

  "AT-7": {
    description:
      "The state arms on the flag: on a silver field the red Tyrolean Eagle, gold-crowned with golden " +
      "wing-clasps ending in trefoils and a green wreath behind its head. The eagle has stood for the " +
      "County of Tyrol since the 13th century, from the Counts of Tirol near Meran.",
    sources: [
      { title: "Tiroler Adler — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Tiroler_Adler" },
    ],
  },

  "AT-4": {
    description:
      "The state arms on the flag: a shield split between a golden eagle with red tongue and claws on " +
      "black, and three red-and-silver bars. The eagle — once shown holding scales for the office of " +
      "the regional judge ‘above the Enns’ — has marked Upper Austria since the 14th century.",
    sources: [
      { title: "Wappen Oberösterreichs — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_Ober%C3%B6sterreichs" },
    ],
  },

  "AT-5": {
    description:
      "The state arms on the flag: a shield split between a golden lion rampant on black and a silver " +
      "bar on red. The two halves come from the historic arms of the Archbishopric of Salzburg, which " +
      "ruled the land as an ecclesiastical principality until 1803.",
    sources: [
      { title: "Wappen Salzburgs — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_Salzburgs" },
    ],
  },

  "AT-8": {
    description:
      "The state arms on the flag: on a silver field the red Montfort church banner (a gonfalon with " +
      "three fringed pendants and three rings) — the war emblem of the medieval Counts of Montfort, " +
      "whose name means ‘strong mountain’. It is the only Austrian state arms with no heraldic animal.",
    sources: [
      { title: "Wappen Vorarlbergs — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_Vorarlbergs" },
    ],
  },

  "AT-9": {
    description:
      "The state arms on the flag: a silver cross on a red shield. The cross — in the red-and-silver of " +
      "the crusading Knights of St John — is recorded on a Vienna coin as early as 1278; the city " +
      "adopted this simple cross shield as its main arms in 1925 after the double eagle of the empire.",
    sources: [
      { title: "Wappen Wiens — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_Wiens" },
    ],
  },

  "AT-1": {
    description:
      "The state arms on the flag: on a gold field a red crowned eagle standing on a black rock, with " +
      "two black crosses above and a small red-and-fur breast shield. The eagle recalls the Counts of " +
      "Mattersdorf-Forchtenstein and the breast shield the Counts of Güssing — combined in 1922 to mark " +
      "Burgenland’s union with Austria after 1921.",
    sources: [
      { title: "Wappen des Burgenlandes — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_des_Burgenlandes" },
    ],
  },

  "FI-18": {
    description:
      "The regional arms as a banner: on a blue field between two silver wavy bars a golden boat with a " +
      "rudder. The boat stands for Uusimaa’s seafaring coast and the wavy bars for its rivers; the arms " +
      "date from the late 16th century (attested 1599).",
    sources: [
      { title: "Uusimaa — Wikipedia", url: "https://en.wikipedia.org/wiki/Uusimaa" },
    ],
  },

  "FI-17": {
    description:
      "The regional arms as a banner: on a field parted blue over gold a black crowned bear rampant " +
      "holding a silver sword in both paws, with two silver seven-pointed stars above — the bear being " +
      "the historic emblem of Satakunta.",
    sources: [
      { title: "Satakunta — Wikipedia", url: "https://en.wikipedia.org/wiki/Satakunta" },
    ],
  },

  "FI-19": {
    description:
      "The regional arms as a banner: on a red field a golden crowned knight’s tournament helm — the " +
      "arms of the historic province of Finland Proper. The helmet is read as the court of the Duke of " +
      "Finland, and marks the region’s role as the old administrative centre of the land.",
    sources: [
      { title: "Southwest Finland — Wikipedia", url: "https://en.wikipedia.org/wiki/Southwest_Finland" },
    ],
  },

  "FI-13": {
    description:
      "The regional arms as a banner: two armoured arms fighting beneath a golden crown — one holding a " +
      "straight sword, the other an eastern scimitar. The duelling weapons stand for Karelia’s place " +
      "between the Swedish (western sword) and Russian (eastern scimitar) realms; the arms date from " +
      "1562.",
    sources: [
      { title: "Coat of arms of the Province of Karelia — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_the_Province_of_Karelia" },
    ],
  },

  "FI-02": {
    description:
      "The regional arms as a banner: two armoured arms fighting beneath a golden crown — one with a " +
      "straight western sword, the other with an eastern scimitar — the historic arms of Karelia, " +
      "symbolising the province caught between the Swedish and Russian realms.",
    sources: [
      { title: "Coat of arms of the Province of Karelia — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_the_Province_of_Karelia" },
    ],
  },

  "FI-11": {
    description:
      "The regional arms as a banner: on a gold field a red fur crown (lakio). The fur crown recalls " +
      "Pirkanmaa’s medieval fur trade — the wealth of the pirkkalaiset traders — while gold for " +
      "Satakunta and red for Häme mark the two historic provinces the region grew from.",
    sources: [
      { title: "Pirkanmaan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Pirkanmaan_vaakuna" },
    ],
  },

  "FI-10": {
    description:
      "The regional arms as a banner: on a red field a wild man (villimies) in natural colour bearing a " +
      "golden club on his shoulder, with green garlands at his brow and waist — the ‘wild north’ figure " +
      "first used on Charles IX’s coins in 1606, standardised as Lapland’s arms in 1963.",
    sources: [
      { title: "Lapin maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Lapin_maakunnan_vaakuna" },
    ],
  },

  "FI-09": {
    description:
      "The regional arms as a banner: a divided shield with a leaping silver salmon on blue above and a " +
      "blue fishing net on silver below. Both honour the Kymijoki river that runs through Kymenlaakso — " +
      "long famous as a salmon river — the design drawn from the old seal of the Kymi hundred.",
    sources: [
      { title: "Kymenlaakson vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Kymenlaakson_vaakuna" },
    ],
  },

  "FI-05": {
    description:
      "The regional arms as a banner: on a gold field a green bar with six points along its top edge " +
      "and wavy points below — the points standing for Kainuu’s vast forests and the wavy edge for its " +
      "waterways, together recalling a history of forestry and log-floating.",
    sources: [
      { title: "Kainuun vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Kainuun_vaakuna" },
    ],
  },

  "FI-12": {
    description:
      "The regional arms as a banner: on a red field the golden Vasa sheaf of arrows below a gold chief " +
      "bearing four running red martens. The Vasa sheaf comes from the city of Vaasa and the royal " +
      "house of Vasa; the martens recall Ostrobothnia’s historic 1576 arms.",
    sources: [
      { title: "Pohjanmaan maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Pohjanmaan_maakunnan_vaakuna" },
    ],
  },

  "FI-03": {
    description:
      "The regional arms as a banner: on a blue field three running silver martens with black-tipped " +
      "tails, taken from old Ostrobothnia’s arms. The marten, a fur animal, stands for purity and — as " +
      "valuable fur — for prosperity.",
    sources: [
      { title: "Etelä-Pohjanmaan maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Etel%C3%A4-Pohjanmaan_maakunnan_vaakuna" },
    ],
  },

  "FI-04": {
    description:
      "The regional arms as a banner: on a black field a drawn golden bow with a silver string and " +
      "arrow — the Savonian bow, the historic emblem of Savonia, here drawn in the older (reversed) " +
      "direction that makes Southern Savonia’s arms a noted exception.",
    sources: [
      { title: "Etelä-Savon maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Etel%C3%A4-Savon_maakunnan_vaakuna" },
    ],
  },

  "FI-06": {
    description:
      "The regional arms as a banner: on a red field a walking golden lynx with black ear-tufts, three " +
      "silver stars above and four silver roses below. The lynx recalls the animal’s abundance in Häme " +
      "and the importance of hunting it in the Middle Ages; the arms go back to 1560.",
    sources: [
      { title: "Kanta-Hämeen maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Kanta-H%C3%A4meen_maakunnan_vaakuna" },
    ],
  },

  "FI-15": {
    description:
      "The regional arms as a banner: on a black field a drawn golden bow with a silver string and " +
      "arrow — the Savonian bow, recalling Northern Savonia’s role as the easternmost march of the " +
      "Swedish realm before 1617; the arms date from 1560.",
    sources: [
      { title: "Pohjois-Savon maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Pohjois-Savon_maakunnan_vaakuna" },
    ],
  },

  "FI-16": {
    description:
      "The regional arms as a banner: on a blue field a golden mermaid (the water-spirit Vellamo) with " +
      "a golden cuckoo above. Vellamo stands for Päijät-Häme’s lakes and ridges, and the cuckoo for the " +
      "region’s Karelian people; adopted in 1997.",
    sources: [
      { title: "Päijät-Hämeen maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/P%C3%A4ij%C3%A4t-H%C3%A4meen_maakunnan_vaakuna" },
    ],
  },

  "FI-07": {
    description:
      "The regional arms as a banner: on a blue field a silver marten with gold claws looking back, " +
      "with five silver cross-nails (three above, two below). The marten comes from old Ostrobothnia’s " +
      "1562 arms; the five nails stand for the region’s five original parishes and its craftsmanship.",
    sources: [
      { title: "Keski-Pohjanmaan maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Keski-Pohjanmaan_maakunnan_vaakuna" },
    ],
  },

  "FI-08": {
    description:
      "The regional arms as a banner: on a silver field a black capercaillie (wood grouse) with red " +
      "markings — Central Finland’s provincial bird since 1985; its black, silver and red are the old " +
      "colours of the region’s student association.",
    sources: [
      { title: "Keski-Suomen maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Keski-Suomen_maakunnan_vaakuna" },
    ],
  },

  "FI-14": {
    description:
      "The regional arms as a banner: on a blue field six running silver martens with black tail-tips, " +
      "set 2:2:2 — the fur animal that made Ostrobothnia’s medieval wealth. The six-marten design is the " +
      "crownless historic Ostrobothnia arms, adopted by Northern Ostrobothnia in 1997.",
    sources: [
      { title: "Pohjois-Pohjanmaan maakunnan vaakuna — Wikipedia (Finnish)", url: "https://fi.wikipedia.org/wiki/Pohjois-Pohjanmaan_maakunnan_vaakuna" },
    ],
  },

  "NO-18": {
    description:
      "The county arms as a banner: on a gold field a black Nordland boat (nordlandsbåt) with mast and " +
      "square sail — the traditional fishing craft of the coast. The black is the tar the boats were " +
      "coated with, and the gold field refers to the sun. Arms, flag and seal were fixed in 1965.",
    sources: [
      { title: "Nordland — Wikipedia", url: "https://en.wikipedia.org/wiki/Nordland" },
      { title: "Nordlands fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Nordlands_fylkesv%C3%A5pen" },
    ],
  },

  "NO-11": {
    description:
      "The county arms as a banner: on a blue field a silver pointed cross, modelled on the old stone " +
      "cross at Sola — Norway’s oldest national monument, raised about 1028 in memory of the chieftain " +
      "Erling Skjalgsson. Granted 1974.",
    sources: [
      { title: "Rogaland — Wikipedia", url: "https://en.wikipedia.org/wiki/Rogaland" },
    ],
  },

  "NO-15": {
    description:
      "The county arms as a banner: on a blue field three golden Viking ships, one for each of the " +
      "county’s districts — Sunnmøre, Romsdal and Nordmøre — for the region’s seafaring and " +
      "shipbuilding; their masts form crosses for the county’s strong Christian tradition. The county " +
      "council adopted the arms in 1978; they were never formally approved.",
    sources: [
      { title: "Møre og Romsdal — Wikipedia", url: "https://en.wikipedia.org/wiki/M%C3%B8re_og_Romsdal" },
      { title: "Møre og Romsdals fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/M%C3%B8re_og_Romsdals_fylkesv%C3%A5pen" },
      { title: "Møre og Romsdal — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-15.html" },
    ],
  },

  "NO-03": {
    description:
      "The city arms (seal) as a banner: Saint Hallvard, Oslo’s patron, enthroned on a lion throne with " +
      "his martyr’s attributes — a millstone and three arrows — and a woman at his feet, the innocent he " +
      "died defending. He became the city’s patron under King Olaf III in the 11th century.",
    sources: [
      { title: "Oslo — Wikipedia", url: "https://en.wikipedia.org/wiki/Oslo" },
    ],
  },

  // ── Østfold — county of Norway (batch 8d) ──
  "NO-31": {
    description:
      "The county arms as a banner: three gold sunbeams rising diagonally on red. The sunrise stands for the " +
      "county’s name and position — “øst” means east. FOTW notes the heraldic convention that straight rays " +
      "stand for light and wavy ones for heat. Approved in 1958 and taken back into use when Østfold was " +
      "re-established in 2024.",
    sources: [
      { title: "Østfolds fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/%C3%98stfolds_fylkesv%C3%A5pen" },
      { title: "Østfold (Norway) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-01.html" },
    ],
  },

  // ── Akershus — county of Norway (batch 8d) ──
  "NO-32": {
    description:
      "The county arms as a banner: a white stepped gable on blue, the outline of Akershus Castle, which " +
      "gave the county its name. Approved in 1987 and taken back into use when Akershus was re-established " +
      "in 2024.",
    sources: [
      { title: "Akershus’ fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Akershus%E2%80%99_fylkesv%C3%A5pen" },
      { title: "Akershus (Norway) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-02.html" },
    ],
  },

  // ── Buskerud — county of Norway (batch 8d) ──
  "NO-33": {
    description:
      "The county arms as a banner: a blue bear on silver (white), for the county’s forests. The colours " +
      "recall two of its industries: the blue-colour works (Blaafarveverket) at Modum and the silver mines at " +
      "Kongsberg. Drawn by Hallvard Trætteberg, approved in 1966 and taken back into use in 2024.",
    sources: [
      { title: "Buskeruds fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Buskeruds_fylkesv%C3%A5pen" },
      { title: "Buskerud (Norway) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-06.html" },
    ],
  },

  // ── Vestfold — county of Norway (batch 8d) ──
  "NO-39": {
    description:
      "The county arms as a banner: a gold royal crown on red, for Vestfold’s link with Norway’s early royal " +
      "line — in the 9th century Vestfold was a kingdom, and Harald Fairhair, from whom later kings claimed " +
      "descent, came from its dynasty. Approved in 1970; the redrawn arms returned when Vestfold was " +
      "re-established in 2024.",
    sources: [
      { title: "Vestfolds fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Vestfolds_fylkesv%C3%A5pen" },
      { title: "Vestfold (Norway) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-07.html" },
    ],
  },

  // ── Agder — county of Norway (batch 8d) ──
  "NO-42": {
    description:
      "The county arms as a banner: a gold oak tree on red. When Aust-Agder and Vest-Agder merged in 2020, " +
      "the new arms took Aust-Agder’s colours and Vest-Agder’s oak. The county says the oak has deep " +
      "historical meaning for the region, was an important trade and export good, and was once a meeting " +
      "place for decision-makers, so it stands for wisdom and solidity.",
    sources: [
      { title: "Agders fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Agders_fylkesv%C3%A5pen" },
      { title: "Agder (Norway) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-agder.html" },
    ],
  },

  // ── Trøndelag — county of Norway (batch 8d) ──
  "NO-50": {
    description:
      "The county arms as a banner: a gold cross with flared arms on white, for Saint Olaf. The sagas say he " +
      "carried a white shield “on which the holy cross was laid with gold” at the Battle of Stiklestad in " +
      "1030 (Heimskringla). Drawn by Hallvard Trætteberg for Nord-Trøndelag in 1957, it became the arms of " +
      "the merged Trøndelag county in 2018.",
    sources: [
      { title: "Trøndelags fylkesvåpen [Nord-Trøndelag fylkesvåpen] — Steinkjerleksikonet", url: "https://www.steinkjerleksikonet.no/trondelags_fylkesvapen_nord_trondelag_fylkesvapen" },
      { title: "Trøndelags fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Tr%C3%B8ndelags_fylkesv%C3%A5pen" },
    ],
  },

  // ── Troms — county of Norway (batch 8d) ──
  "NO-55": {
    description:
      "The county arms as a banner: a gold griffin on red. The griffin was the emblem of the Bjarkøy family, " +
      "who ruled in Troms in the Middle Ages; the earliest known seal behind the design is Bjarne " +
      "Erlingsson’s of 1303. Drawn by Hallvard Trætteberg, approved in 1960 and taken back into use when " +
      "Troms was re-established in 2024.",
    sources: [
      { title: "Troms’ fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Troms%E2%80%99_fylkesv%C3%A5pen" },
      { title: "Troms (Norway) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-19.html" },
    ],
  },

  // ── Finnmark — county of Norway (batch 8d) ──
  "NO-56": {
    description:
      "The county arms as a banner: a gold castle on black, for Vardøhus Fortress and the defence of " +
      "Norway’s eastern border. It was also read as a sign of Finnmark rising again after its destruction in " +
      "the Second World War. Drawn by Hallvard Trætteberg, approved in 1967 and kept when Finnmark was " +
      "re-established in 2024.",
    sources: [
      { title: "Finnmarks fylkesvåpen — Wikipedia (no)", url: "https://no.wikipedia.org/wiki/Finnmarks_fylkesv%C3%A5pen" },
      { title: "Finnmark (Norway) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/no-20.html" },
    ],
  },

  "LR-MO": {
    description:
      "The county flag: a blue upper half for Montserrado being Liberia’s first county and a red lower " +
      "half for the blood shed in the wars between the settlers and native peoples, with a central " +
      "circle of trees for farming and the soil, and the Liberian flag in the canton.",
    sources: [
      { title: "Montserrado County — Wikipedia", url: "https://en.wikipedia.org/wiki/Montserrado_County" },
    ],
  },

  "BY-BR": {
    description:
      "The region arms on the flag: a shield of blue over red topped by a fortress wall, with a golden " +
      "bison (żubr). The bison — Belarus’s largest animal, native to the Białowieża Forest — stands for " +
      "the region’s wealth, strength and constancy; the wall recalls the 13th-century Kamyenyets Tower " +
      "and Brest’s heroic past, and red is courage.",
    sources: [
      { title: "Герб Брестской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%91%D1%80%D0%B5%D1%81%D1%82%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "BY-HO": {
    description:
      "The region arms on the flag: a green shield split into nine by a silver cross, with a small blue " +
      "inescutcheon bearing Gomel’s golden reclining lynx. The cross’s arms carry the old emblems of the " +
      "region’s historic towns — Turaŭ’s archer, Rahačoŭ’s horn, Mazyr’s eagle and Rechytsa’s horseman — " +
      "the nine fields standing for the region’s variety.",
    sources: [
      { title: "Герб Гомельской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%93%D0%BE%D0%BC%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "BY-HR": {
    description:
      "The region arms on the flag: on a red field a golden aurochs/bison (zubr) beneath a golden mural " +
      "crown, framed by oak branches and a blue St Andrew’s ribbon. The arms revive the 1878 arms of the " +
      "Grodno Governorate; the bison stands for the region’s strength and wildlife.",
    sources: [
      { title: "Герб Гродненской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "BY-VI": {
    description:
      "The region arms on the flag: on a red field the silver mounted knight ‘Pahonia’ (the Pursuit) " +
      "with a raised sword, his shield bearing the golden six-pointed Cross of Saint Euphrosyne of " +
      "Polotsk. The rider descends from the arms of the old Vitebsk Voivodeship.",
    sources: [
      { title: "Герб Витебской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%92%D0%B8%D1%82%D0%B5%D0%B1%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "BY-MA": {
    description:
      "The region arms on the flag: on a gold field a blue oval with the Mahilioŭ-Bratsk icon of the " +
      "Mother of God (for divine protection of the land), over three green hills bearing three red " +
      "wheat ears whose 21 grains stand for the oblast’s 21 districts.",
    sources: [
      { title: "Герб Могилёвской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9C%D0%BE%D0%B3%D0%B8%D0%BB%D1%91%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "BY-MI": {
    description:
      "The region arms on the flag: on a gold field three blue wavy bars for the region’s many rivers " +
      "and lakes, with the arms of the city of Minsk in the upper corner, beneath a golden crown. The " +
      "design revives elements of Minsk city’s 1591 arms and the 1878 governorate arms.",
    sources: [
      { title: "Герб Минской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%D0%BE%D0%B9_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B8" },
    ],
  },

  "BY-HM": {
    description:
      "The city arms on the flag: the Ascension of the Virgin Mary — Mary standing on a silver cloud " +
      "with hands raised in blessing, flanked by two kneeling angels and cherubim with golden haloes. " +
      "The arms were granted to Minsk with its Magdeburg rights by King Sigismund III Vasa in 1591.",
    sources: [
      { title: "Герб Минска — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/%D0%93%D0%B5%D1%80%D0%B1_%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%D0%B0" },
    ],
  },

  "AM-ER": {
    description:
      "The city flag: on white the seal of Yerevan — a crowned lion on orange holding a shield with " +
      "Mount Ararat, Armenia’s national symbol, and half of the Armenian eternity sign — surrounded by " +
      "twelve small red triangles for the twelve historic capitals of Armenia. Its colours are those of " +
      "the national flag.",
    sources: [
      { title: "Yerevan — Wikipedia", url: "https://en.wikipedia.org/wiki/Yerevan" },
    ],
  },


  "LI-11": {
    description:
      "Vaduz flies three stripes, red, white and red, in the proportions 1:1:2, usually as a long " +
      "vertical banner. The flag was granted in 1932 together with the municipality’s first coat of arms, " +
      "whose red field with a white bar it follows. When Prince Franz Joseph II granted new arms on 26 July " +
      "1978, he confirmed the flag unchanged. The new arms are quartered: a red princely hat on silver " +
      "stands for the princely residence, and a silver church flag on red commemorates the Counts of " +
      "Werdenberg-Sargans, who laid the foundation stone of the country’s statehood in 1342.",
    sources: [
      { title: "Coat of arms and flag — Gemeinde Vaduz (official)", url: "https://www.vaduz.li/en/vaduz/portrait/coat-of-arms-and-flag" },
      { title: "Vaduz (Liechtenstein) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/li-vz.html" },
    ],
  },

  "LI-07": {
    description:
      "The commune arms on the flag: a shield split blue and red (Liechtenstein’s colours) by a silver " +
      "pale, a golden wheat ear on the blue for Schaan’s farming and a silver wavy bar on the red for " +
      "the Rhine along its western edge.",
    sources: [
      { title: "Schaan — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Schaan" },
    ],
  },

  "LI-09": {
    description:
      "The commune arms on the flag: on a blue field three silver scythe blades one above another — the " +
      "arms of the Edlen von Trisun, the oldest local noble family (first recorded 1273), the scythes " +
      "also recalling Triesen’s farming heritage.",
    sources: [
      { title: "Triesen — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Triesen" },
    ],
  },

  "LI-10": {
    description:
      "The commune arms on the flag: on a blue field a golden bell over a golden three-peaked mountain. " +
      "The bell is the Theodul bell of the chapel at Masescha, built soon after the Walser settlers " +
      "arrived around 1300, and the peaks mark Triesenberg as the principality’s mountain commune.",
    sources: [
      { title: "Triesenberg — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Triesenberg" },
    ],
  },

  "LI-04": {
    description:
      "The commune arms on the flag: a shield diagonally divided black and gold, bearing a golden key " +
      "and sword crossed in a saltire — the key of Saint Peter and the sword of Saint Paul, the parish " +
      "patrons of Mauren.",
    sources: [
      { title: "Mauren (Liechtenstein) — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Mauren_(Liechtenstein)" },
    ],
  },

  "LI-06": {
    description:
      "The commune arms on the flag: on a red field a blue silver-edged wavy bar for the Rhine, with a " +
      "golden stalked ear of grain near the base for the grain fields of the Ruggeller Riet wetland — " +
      "Ruggell’s farming heritage.",
    sources: [
      { title: "Ruggell — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Ruggell" },
    ],
  },

  "LI-05": {
    description:
      "The commune arms on the flag: a shield divided diagonally white and green with a six-pointed " +
      "golden star — the arms of Planken, the smallest of Liechtenstein’s communes.",
    sources: [
      { title: "Planken — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Planken" },
    ],
  },

  "LI-08": {
    description:
      "The commune arms on the flag: a field divided three times black and gold with a crenellated " +
      "lower edge — the arms of the medieval lords of Schellenberg (recorded in the 1340 Zürich " +
      "armorial), whose seat was on the Eschnerberg.",
    sources: [
      { title: "Schellenberg — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Schellenberg" },
    ],
  },

  "SM-01": {
    description:
      "The castle arms on the flag: on a blue field three green oak trees (cerri) rooted on a golden " +
      "three-peaked hill. The oaks refer to Acquaviva’s old name, Montecerreto — the ‘mount of oaks’.",
    sources: [
      { title: "Acquaviva (San Marino) — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Acquaviva_(San_Marino)" },
    ],
  },

  "SM-06": {
    description:
      "The castle arms on the flag: an emblem showing Borgo Maggiore at the foot of Monte Titano with " +
      "its clock tower — depicting the town’s position below the capital and its landmark tower.",
    sources: [
      { title: "Borgo Maggiore — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Borgo_Maggiore" },
    ],
  },

  "SM-02": {
    description:
      "The castle arms on the flag: on a blue field a red ostrich feather curved to the right; the arms " +
      "of Chiesanuova, fixed by decree in 1997.",
    sources: [
      { title: "Chiesanuova (San Marino) — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Chiesanuova_(San_Marino)" },
    ],
  },

  "SM-03": {
    description:
      "The castle arms on the flag: a wolf walking and a ruined tower on a mountain top — the wolf a pun " +
      "on Domagnano’s old name Montelupo (‘wolf mount’), and the broken tower the Malatesta stronghold " +
      "taken by San Marino in 1463.",
    sources: [
      { title: "Domagnano — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Domagnano" },
    ],
  },

  "SM-04": {
    description:
      "The castle arms on the flag: on a gold field an uprooted beech tree in natural colour. The beech " +
      "(faggio) is a canting emblem for Faetano, whose name comes from the beech woods of the area.",
    sources: [
      { title: "Faetano — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Faetano" },
    ],
  },

  "SM-05": {
    description:
      "The castle arms on the flag: on a gold field three red roses with gold centres — the arms of " +
      "Fiorentino.",
    sources: [
      { title: "Fiorentino (San Marino) — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Fiorentino_(San_Marino)" },
    ],
  },

  "SM-08": {
    description:
      "The castle arms on the flag: on a blue field three red roses with green stems fanning out from a " +
      "golden three-peaked mountain — the greenery evoking the wooded, garden-like hills that give " +
      "Montegiardino (‘garden mount’) its name.",
    sources: [
      { title: "Montegiardino — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Montegiardino" },
    ],
  },

  "SM-07": {
    description:
      "The castle flag bears San Marino’s arms: on blue, three silver towers — Guaita, Cesta and Montale " +
      "— on the three green peaks of Monte Titano, each tower topped by an ostrich-feather vane, within " +
      "an oak-and-laurel wreath. The motto “Libertas” (liberty) recalls the republic’s tradition as a " +
      "refuge for the persecuted.",
    sources: [
      { title: "Coat of arms of San Marino — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_San_Marino" },
    ],
  },

  "SM-09": {
    description:
      "The castle arms on the flag: on a blue field a square red tower with three Ghibelline " +
      "(swallow-tailed) battlements — the arms of Serravalle.",
    sources: [
      { title: "Serravalle (San Marino) — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Serravalle_(San_Marino)" },
    ],
  },

  "AE-AZ": {
    description:
      "The emirate flag: a red field with a white rectangle at the canton. Under the 1820 maritime " +
      "treaty with Britain the coastal sheikhdoms added white to the old red flag as a sign of the " +
      "maritime truce (the ‘Trucial States’); Abu Dhabi kept a mostly-red flag with just a white " +
      "corner to set itself apart from the Qawasim emirates.",
    sources: [
      { title: "Flag of Abu Dhabi — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Abu_Dhabi" },
    ],
  },

  "AE-DU": {
    description:
      "The emirate flag: red with a white vertical bar at the hoist (the ‘White-Red Halved’). It was " +
      "adopted to distinguish Dubai (and Ajman) from the white-pierced-red flag of the Qawasim, the " +
      "white marking the maritime truce with Britain under the 1820 treaty.",
    sources: [
      { title: "Flag of Dubai — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Dubai" },
    ],
  },

  "AE-AJ": {
    description:
      "The emirate flag: red with a white vertical bar at the hoist — the same ‘White-Red Halved’ design " +
      "as Dubai, marking Ajman apart from the Qawasim emirates; the white records the 1820 maritime " +
      "truce with Britain.",
    sources: [
      { title: "List of flags of the United Arab Emirates — Wikipedia", url: "https://en.wikipedia.org/wiki/List_of_flags_of_the_United_Arab_Emirates" },
    ],
  },

  "AE-SH": {
    description:
      "The emirate flag: a large red rectangle on white (the ‘White Pierced Red’). Under the 1820 " +
      "treaty this was the intended flag for all the Trucial States; it became the flag of the Qawasim " +
      "federation, to which Sharjah belongs.",
    sources: [
      { title: "Flag of Sharjah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sharjah" },
    ],
  },

  "AE-RK": {
    description:
      "The emirate flag: a large red rectangle on white — the ‘White Pierced Red’ Qawasim flag, shared " +
      "with Sharjah because Ras Al Khaimah is ruled by the same house; the white records the 1820 " +
      "maritime truce with Britain.",
    sources: [
      { title: "Flag of Sharjah — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sharjah" },
    ],
  },

  "AE-UQ": {
    description:
      "The emirate flag: red with a white bar at the hoist and a large white star and crescent in the " +
      "centre. The white follows the Trucial-States pattern that distinguishes the emirates’ flags, and " +
      "the star and crescent stand for Islam.",
    sources: [
      { title: "List of flags of the United Arab Emirates — Wikipedia", url: "https://en.wikipedia.org/wiki/List_of_flags_of_the_United_Arab_Emirates" },
    ],
  },


  "CN-HK": {
    description:
      "The region flag: on a red field a white five-petal Bauhinia × blakeana flower, each petal " +
      "bearing a red star. The bauhinia — native to Hong Kong — stands for the territory, red for " +
      "China (the same red as the national flag), and the five stars echo China’s flag, marking Hong " +
      "Kong as part of China under ‘one country, two systems’.",
    sources: [
      { title: "Flag of Hong Kong — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Hong_Kong" },
    ],
  },

  "CN-MO": {
    description:
      "The region flag: on a green field a white lotus (Macau’s floral emblem) above a stylised " +
      "Governador Nobre de Carvalho Bridge and white waves for Macau’s life as a port, crowned by an " +
      "arc of five golden stars echoing China’s flag — the bond with its sovereign state. Adopted at " +
      "the 1999 handover.",
    sources: [
      { title: "Flag of Macau — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Macau" },
    ],
  },

  "PE-AMA": {
    description:
      "A red and white flag charged with a red triangle at the hoist and a green triangle at the fly. The " +
      "red is a tribute to the martyrs who gave their lives for freedom and national sovereignty, the " +
      "green stands for the region's Amazonian territory and a new dawn of hope, and the white for peace " +
      "and the integration of its people.",
    sources: [
      { title: "Amazonas (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-z.html" },
    ],
  },

  "PE-ARE": {
    description:
      "A garnet-red (grenado) field bearing the city's coat of arms. The arms were granted by Emperor " +
      "Charles V and include a small banner lettered “Karlos” recalling the emperor.",
    sources: [
      { title: "Arequipa (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-3.html" },
    ],
  },

  "PE-CAL": {
    description:
      "A light-blue field with the region's coat of arms. In the arms a golden castle tower recalls " +
      "Callao's fortifications and a sun bears 28 rays; the motto reads “La fiel y generosa Ciudad del " +
      "Callao, Asilo de las Leyes y de la Libertad” (the loyal and generous City of Callao, refuge of Law " +
      "and Liberty). The blue is commonly understood as the sea of this coastal port, though not " +
      "officially documented.",
    sources: [
      { title: "Callao (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-cl.html" },
    ],
  },

  "PE-LAM": {
    description:
      "Yellow over red — the colours of the ancient Lambayeque culture — with the regional shield. In the " +
      "shield, five blue waves stand for the sea and its wealth, an American carob tree for the region's " +
      "natural resources, and a torch with the motto “Lucis gloriam et honoris” for honour and learning.",
    sources: [
      { title: "Lambayeque (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-q.html" },
    ],
  },

  "PE-LIM": {
    description:
      "A white field — for integration and peace — bearing the region's emblem, a geometric design " +
      "resembling the Andean cross that stands for union, fellowship and time. Its nine coloured shapes " +
      "each represent one of the region's provinces.",
    sources: [
      { title: "Lima Region (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-l.html" },
    ],
  },

  "PE-MDD": {
    description:
      "A green field crossed by a yellow diagonal stripe. Green is the region's lush vegetation and " +
      "tropical forests teeming with life, and yellow its mineral wealth — the gold washed from the " +
      "alluvial beds of its rivers.",
    sources: [
      { title: "Madre de Dios (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-d.html" },
    ],
  },

  "PE-PAS": {
    description:
      "Three diagonal stripes — yellow, green and red — for the region's three provinces. Yellow is Pasco " +
      "and its mining heritage (Pasco was named Peru's “Mining Capital” in 1960), green is Oxapampa, the " +
      "region's lung and hope, and red is Daniel Carrión, for the blood its people shed fighting for the " +
      "land.",
    sources: [
      { title: "Pasco (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-2.html" },
    ],
  },

  "PE-PUN": {
    description:
      "A flag bearing a stepped chakana (Andean cross) in green and blue and a sun with thirteen rays for " +
      "the thirteen provinces of Puno. Adopted through a regional contest in 2012.",
    sources: [
      { title: "Puno (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-7.html" },
    ],
  },

  "PE-SAM": {
    description:
      "Wavy stripes of green, orange, light blue and white with the region's arms. Green is sustainable " +
      "development and the department's geography, orange the youth of all ages and passion, light blue " +
      "(celeste) social responsibility, and white the light of peace and hope; the wavy stripes stand for " +
      "dynamism and freedom.",
    sources: [
      { title: "San Martín (Peru) — Flags of the World", url: "https://crwflags.com/fotw/flags/pe-o.html" },
    ],
  },

  "UY-AR": {
    description:
      "Red, white and blue for the flag of José Gervasio Artigas, the revolutionary hero the department " +
      "is named for. The displaced red triangle marks Artigas's border with two nations, Argentina and " +
      "Brazil; the lower blue stripe is its waterways; and the oval stands for the wealth of its land, " +
      "especially its agate stones.",
    sources: [
      { title: "Artigas (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-ar.html" },
    ],
  },

  "UY-CO": {
    description:
      "A white flag with the department arms. In the blue chief the stars of the Southern Cross mark the " +
      "region's place on the Río de la Plata; a golden wheat-sheaf recalls that here agriculture and " +
      "civilisation first took root, its four ears the cardinal points; and a bee sits on the white.",
    sources: [
      { title: "Colonia (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-co.html" },
    ],
  },

  "UY-DU": {
    description:
      "A blue flag with a large twelve-pointed star for the department's central position in the country " +
      "(and its founding on 12 October 1821), ringed by eighteen smaller stars for Uruguay's other " +
      "departments; a lamp within the star is light, energy and hope, and light-blue stripes are the " +
      "rivers Yí and Negro.",
    sources: [
      { title: "Durazno (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-du.html" },
    ],
  },

  "UY-FD": {
    description:
      "Red and white with the department arms. Red is strength and courage, white purity and liberty; the " +
      "arms carry symbols of independence — a hand breaking chains, a rider for the Battle of Sarandí, and " +
      "the Piedra Alta, the stone where Uruguay's independence was declared.",
    sources: [
      { title: "Florida (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-fd.html" },
    ],
  },

  "UY-FS": {
    description:
      "Quartered red and sky-blue with the arms on a white oval within a golden cross. The cross recalls " +
      "the Trinitarians who named the region; bolas stand for the fight for independence, cattle for " +
      "ranching, wheat for farming, and the Gruta del Palacio cave for the department's prehistory. Motto: " +
      "“Labor improba omnia vincit” (constant work conquers all).",
    sources: [
      { title: "Flores (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-fe.html" },
    ],
  },

  "UY-LA": {
    description:
      "Three bands of red, white and blue for the flag of the Orientals led by Juan Antonio Lavalleja in " +
      "the fight for independence, with a green triangle for the Cerro Arequita hill and, behind it, " +
      "Uruguay's Sun of May.",
    sources: [
      { title: "Lavalleja (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-lv.html" },
    ],
  },

  "UY-MA": {
    description:
      "A white flag with the historic arms of Maldonado (granted 1803): a whale for those once seen off " +
      "its coast, a fortress for the town's founding as a military post, and an anchor for the colonists " +
      "who crossed the ocean to settle there.",
    sources: [
      { title: "Maldonado (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-ma.html" },
    ],
  },

  "UY-PA": {
    description:
      "Blue-white-blue bands with thin red stripes, from the “Flag of the League of Free Peoples” flown in " +
      "Artigas's camp in 1815. On the white lies the mburucuyá (passion flower), its three pistils " +
      "standing for the three historic defences of Paysandú.",
    sources: [
      { title: "Paysandú (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-pa.html" },
    ],
  },

  "UY-RN": {
    description:
      "Blue-white-blue bands with, on the white, waves for the Uruguay River and life, an anchor for the " +
      "port of Fray Bentos, a sun for the nation, and an ear of wheat for agriculture.",
    sources: [
      { title: "Río Negro (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-rn.html" },
    ],
  },

  "UY-RO": {
    description:
      "A blue, red and white triband in the colours of the Artigas flag, with a battlemented white shield " +
      "showing the Santa Teresa Fortress in gold and flanked by palms of the local environment; above it " +
      "shines Uruguay's Sun of May, for Rocha as the easternmost department, where the sun first rises.",
    sources: [
      { title: "Rocha (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-ro.html" },
    ],
  },

  "UY-RV": {
    description:
      "The department arms — a tree for the region's nature and the Cerro del Marco hill — over a red " +
      "stripe lettered “RIVERA”, beside the nine blue and white stripes of the Uruguayan flag.",
    sources: [
      { title: "Rivera (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-ri.html" },
    ],
  },

  "UY-SA": {
    description:
      "A flag bearing the department arms: a rising golden sun for the future, an anvil, hammer and bundle " +
      "of rods for labour, the goddess Minerva for wisdom and prudence, and a waterfall for the city of " +
      "Salto (whose name means “waterfall”), with olive and oak branches for peace and nobility and the " +
      "motto “Trabajo – Sabiduría – Prudencia”.",
    sources: [
      { title: "Salto (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-st.html" },
    ],
  },

  "UY-SJ": {
    description:
      "Red and blue Artiguist bands with forty white stars for the forty families that founded San José " +
      "de Mayo, and Uruguay's Sun of May. Red is the blood shed for independence and blue the motherland's " +
      "sky.",
    sources: [
      { title: "San José (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-sj.html" },
    ],
  },

  "UY-SO": {
    description:
      "Blue, red and white bands in the colours of the Artigas flag, inscribed “Aquí nació la Patria” " +
      "(here the fatherland was born) for the department's place in Uruguay's founding.",
    sources: [
      { title: "Soriano (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-so.html" },
    ],
  },

  "UY-TT": {
    description:
      "A white flag with four blue waves for the department's rivers, a golden half-sun for its eastern " +
      "position, a silver raven in flight for the Quebrada de los Cuervos ravine, and a zucaré plant in " +
      "green and red for the native land.",
    sources: [
      { title: "Treinta y Tres (Uruguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/uy-tt.html" },
    ],
  },

  "UZ-QR": {
    description:
      "The republic flag: blue, gold and green stripes edged with red, and on the blue a white crescent " +
      "with five stars. Blue is water and sky, gold the Karakalpak people and their deserts, green " +
      "nature and renewal; the crescent and stars are for Islam, the five stars for Karakalpakstan’s " +
      "five oldest cities. Adopted 1992.",
    sources: [
      { title: "Flag of Karakalpakstan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Karakalpakstan" },
    ],
  },

  "UZ-TK": {
    description:
      "A white field bearing the round arms of Tashkent city in the centre: a dark-blue disc with a blue " +
      "arch in gold collars, snow-capped mountains and a golden flat-bread (non) above them, a plane tree " +
      "whose trunk is encircled by two white rivers, orange grapes and flowers, and the gold motto “Kuch " +
      "adolatdadir” (“Strength is in justice”) with the city name on an arched ribbon. The flat-bread, the " +
      "grapes and the harvest stand for agriculture, the land and labour; the snow-capped peaks and the " +
      "plane tree for the nature of Tashkent.",
    sources: [
      { title: "Tashkent City (Uzbekistan) — Flags of the World", url: "https://crwflags.com/fotw/flags/uz-tashk.html" },
    ],
  },

  "PY-5": {
    description:
      "The national colours — red, white and blue horizontal stripes — with five green stars across the " +
      "centre, the middle star larger than the rest. The five stars are said to refer to Caaguazú being " +
      "the fifth department in Paraguay's territorial order.",
    sources: [
      { title: "Caaguazú (Paraguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/py-05.html" },
    ],
  },

  "PY-7": {
    description:
      "Three horizontal stripes — green, white and red — the white the broadest. Green is hope and the " +
      "department's farming wealth (soy, wheat, rice and forests) that make Itapúa a breadbasket; the " +
      "wide white stripe is peace and the people's industrious, peaceable spirit; red is labour and the " +
      "red earth, the strength of a people built through work.",
    sources: [
      { title: "Itapúa (Paraguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/py-07.html" },
    ],
  },

  "PY-11": {
    description:
      "The national colours — red, white and blue — charged with green stars. Red stands for justice, " +
      "white for peace and blue for freedom; the stars represent the department's nineteen municipalities.",
    sources: [
      { title: "Central (Paraguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/py-11.html" },
    ],
  },

  "PY-ASU": {
    description:
      "Red bands with a white central stripe bearing the city's coat of arms. The red recalls the field " +
      "of the Spanish royal arms on the colonial banner of Asunción's Cabildo (city hall); the arms carry " +
      "the Virgin of the Assumption, Saint Blas, a castle and supporters reflecting the city's Spanish " +
      "colonial heritage.",
    sources: [
      { title: "Asunción City (Paraguay) — Flags of the World", url: "https://crwflags.com/fotw/flags/py-as.html" },
    ],
  },


  "SV-CA": {
    description:
      "A field divided blue and red by a narrow white S-shaped band. The S is the initial of Sensuntepeque, " +
      "the department's capital, and its winding form stands for the ideal of peace.",
    sources: [
      { title: "Cabañas (El Salvador) — Flags of the World", url: "https://crwflags.com/fotw/flags/sv-ca.html" },
    ],
  },

  "SV-CH": {
    description:
      "Three horizontal stripes — blue, white and green — the department name in gold on the white, and a " +
      "white plough on the green. Blue is the sky and El Salvador, white is peace, and green the mountains " +
      "and crops; the plough marks Chalatenango as a farming region.",
    sources: [
      { title: "Chalatenango (El Salvador) — Flags of the World", url: "https://crwflags.com/fotw/flags/sv-ch.html" },
    ],
  },

  "SV-SM": {
    description:
      "Three horizontal stripes — red, white and blue — with the department emblem in the centre. Red is " +
      "the brotherly love of the people of San Miguel, white the wish for a firm and lasting peace, and " +
      "blue the liberty inherited from their ancestors.",
    sources: [
      { title: "San Miguel (El Salvador) — Flags of the World", url: "https://crwflags.com/fotw/flags/sv-sm.html" },
    ],
  },

  "SV-SA": {
    description:
      "Thirteen blue and white stripes with coffee branches laid out as a laurel wreath. The thirteen " +
      "stripes stand for the municipalities that make up the department, and the coffee branches for its " +
      "wealth and principal crop.",
    sources: [
      { title: "Santa Ana (El Salvador) — Flags of the World", url: "https://crwflags.com/fotw/flags/sv-sa.html" },
    ],
  },

  "SV-SO": {
    description:
      "A green, white and blue flag with the department arms. Green stands for Sonsonate's many fields, " +
      "while the white and blue are in veneration of the national flag.",
    sources: [
      { title: "Sonsonate (El Salvador) — Flags of the World", url: "https://crwflags.com/fotw/flags/sv-so.html" },
    ],
  },

  "SV-US": {
    description:
      "A blue, white and green flag scattered with yellow stars. Blue is the sky and the sea that washes " +
      "the department, white is peace and harmony, and green the fertility of the soil; the twenty-three " +
      "stars are its municipalities — one large star for the capital and three medium stars for the three " +
      "founding municipalities.",
    sources: [
      { title: "Usulután (El Salvador) — Flags of the World", url: "https://crwflags.com/fotw/flags/sv-us.html" },
    ],
  },

  "FR-01": {
    description:
      "The department arms as a banner: a shield quartered for the four historic lands that make up the " +
      "Ain — the ermine lion of Bresse, the morailles and lion of the Pays de Gex, the fleurs-de-lis and " +
      "red baton of Dombes, and the ermine lion of Bugey — with the silver cross of Bourg-en-Bresse over " +
      "all.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-02": {
    description:
      "The department arms as a banner: joined arms of Ponthieu (gold with three blue bands) and " +
      "Champagne (blue with gold potent cotises), crossed by a silver wavy bar for the river Aisne that " +
      "names the department.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-03": {
    description:
      "The department arms as a banner: on blue strewn with golden fleurs-de-lis a red bend — the arms " +
      "of the Bourbonnais, the historic province (and cradle of the House of Bourbon) from which the " +
      "Allier was formed.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-04": {
    description:
      "The department arms as a banner: the Angevin arms of Provence — a golden fleur-de-lis with a red " +
      "label on blue — over a white indented base evoking the Alpine peaks of Alpes-de-Haute-Provence.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-05": {
    description:
      "The department arms as a banner: party of the clechée cross of the Marquisate of Provence (red) " +
      "and the blue dolphin of the Dauphiné (gold), beneath a blue chief strewn with fleurs-de-lis — the " +
      "two historic lands meeting in the Hautes-Alpes.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-06": {
    description:
      "The department arms as a banner: on silver a red crowned eagle rising from a three-peaked " +
      "mountain over the sea — the historic arms of the County of Nice, the eagle and mountains " +
      "standing for the territory.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-07": {
    description:
      "The department arms as a banner: on blue strewn with golden fleurs-de-lis, a golden border set " +
      "with eight blue escutcheons — the arms of the Vivarais, the historic province that became the " +
      "Ardèche.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-08": {
    description:
      "The department arms as a banner: on blue a silver bend between golden potent cotises, a silver " +
      "escutcheon charged with a black boar at the centre, and a red chief with three golden rakes — " +
      "regional emblems of the Ardennes (adopted 1950).",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-09": {
    description:
      "The department arms as a banner: gold with three red pales for the County of Foix, and a blue " +
      "escutcheon bearing a silver bell for the Couserans — the two historic lands of the Ariège.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-10": {
    description:
      "The department arms as a banner: on blue a silver bend between golden potent cotices (from the " +
      "arms of Champagne) beneath a silver wavy chief — the white (Latin ‘alba’) a play on the name of " +
      "the river Aube.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-11": {
    description:
      "The department arms as a banner: on red the golden clechée cross of Languedoc within a " +
      "crenellated silver border evoking the ramparts of Carcassonne — the arms of the Aude.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-12": {
    description:
      "The department arms as a banner: on red a golden lion-leopard — the historic arms of the " +
      "Rouergue, the old county that became the Aveyron.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-13": {
    description:
      "The department arms as a banner: the Angevin arms of Provence — a golden fleur-de-lis with a red " +
      "label on blue — set in an inverted gusset that stands for the delta where the Rhône meets the sea, " +
      "giving Bouches-du-Rhône (‘mouths of the Rhône’) its name.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-14": {
    description:
      "The department arms as a banner: a wavy division of blue (for the sea) over the two golden " +
      "leopards of Normandy — the historic province the Calvados belongs to.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-15": {
    description:
      "The department arms as a banner: on gold the red green-fringed gonfanon of Auvergne, over a blue " +
      "inescutcheon with a golden bend and six silver scallop shells for the viscounty of Aurillac — the " +
      "arms of the Cantal.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-16": {
    description:
      "The department arms as a banner: joined arms of the house of Angoulême (blue with fleurs-de-lis " +
      "and a silver label) and the Taillefer counts (lozengy gold and red), crossed by a silver wavy bar " +
      "for the river Charente.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-17": {
    description:
      "The department arms as a banner: a wavy division joining Saintonge (blue with a silver mitre and " +
      "three golden fleurs-de-lis) and Aunis (red with a golden crowned partridge), the wave standing " +
      "for the Charente — the two historic lands of Charente-Maritime.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-18": {
    description:
      "The department arms as a banner: blue strewn with golden fleurs-de-lis within a red engrailed " +
      "border — the arms of Berry — crossed by a silver wavy fess for the river Cher.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-19": {
    description:
      "The department arms as a banner: a shield quartered for four historic Limousin lordships — " +
      "Comborn (two red leopards on gold), Ventadour (chequy red and gold), Turenne (gold and red " +
      "cotices) and Limoges (three blue lioncels on gold) — adopted for the Corrèze in 1975.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-21": {
    description:
      "The department arms as a banner: a golden field beneath a chief of Burgundy (old Burgundy’s " +
      "fleurs-de-lis border and the gold-and-blue bendy of the duchy). The gold field is a play on the " +
      "name Côte-d’Or (‘golden slope’).",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-22": {
    description:
      "The department arms as a banner: a shield divided by an indented line into blue and Breton ermine " +
      "— the ermine of Brittany with blue for the sea, fitting the name Côtes-d’Armor (‘coasts of the " +
      "sea’).",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-23": {
    description:
      "The department arms as a banner: blue strewn with golden fleurs-de-lis, a red bend charged with " +
      "three silver lioncels — the historic arms of La Marche, the county that became the Creuse.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-24": {
    description:
      "The department arms as a banner: on red three golden lioncels with blue crowns — the historic " +
      "arms of the Périgord, the old county that became the Dordogne.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-25": {
    description:
      "The department arms as a banner: a wavy division joining Franche-Comté (blue billetty with a " +
      "golden crowned lion) and a golden field with a blue wavy fess for the river Doubs that names the " +
      "department.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-26": {
    description:
      "The department arms as a banner: a shield quartered for four historic lands of the Drôme — the " +
      "blue dolphin of the Dauphiné, the besants of Saint-Vallier, the bends of the Adhémar de Monteil, " +
      "and the ermine of Mévouillon.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-27": {
    description:
      "The department arms as a banner: the two golden leopards of Normandy on red above blue with " +
      "golden fleurs-de-lis and a red-and-silver compony bend for the County of Évreux — the two lands " +
      "of the Eure.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-28": {
    description:
      "The department arms as a banner: a wavy division joining the Orléanais (blue with fleurs-de-lis " +
      "and a silver label) and the Perche (silver with three red chevrons) — the two historic lands of " +
      "Eure-et-Loir.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-29": {
    description:
      "The department arms as a banner: the black lion of Léon (on gold) beside the silver ram of " +
      "Cornouaille (on blue), beneath a silver chief with five ermine spots for Brittany — the arms of " +
      "Finistère since 1975.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-30": {
    description:
      "The department arms as a banner: on red the golden clechée cross of Languedoc, beneath an " +
      "engrailed silver chief that evokes the arches of the Pont du Gard — the arms of the Gard.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-32": {
    description:
      "The department arms as a banner: on silver a red lion — the historic arms of the Armagnac, the " +
      "old county that forms most of the Gers.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-33": {
    description:
      "The department arms as a banner: gyronny of silver and blue (a play on the name Gironde) beneath " +
      "a red chief bearing a golden leopard for Guyenne — the arms of the Gironde.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-34": {
    description:
      "The department arms as a banner: on silver a red roundel charged with the golden clechée cross of " +
      "Languedoc — the cross of the counts of Toulouse over the field of Montpellier, the arms of the " +
      "Hérault.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-35": {
    description:
      "The department arms as a banner: Breton ermine with two blue wavy pales for its two rivers, the " +
      "Ille and the Vilaine, which name the department.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-36": {
    description:
      "The department arms as a banner: on blue three silver wavy twin-bars for its rivers with a silver " +
      "castle (the Château Raoul of Châteauroux), under a gold chief within a red engrailed border — the " +
      "arms of the Indre.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-37": {
    description:
      "The department arms as a banner: blue strewn with golden fleurs-de-lis within a red-and-silver " +
      "compony border — the historic arms of the Touraine, the province of Indre-et-Loire.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-38": {
    description:
      "The department arms as a banner: a wavy division of blue with a silver wavy fess (the river Isère) " +
      "over the blue dolphin of the Dauphiné on gold — the arms of the Isère.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-39": {
    description:
      "The department arms as a banner: Franche-Comté (blue billetty with a golden crowned lion) over an " +
      "indented red-and-gold base evoking the Jura mountains that name the department.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-40": {
    description:
      "The department arms as a banner: on gold a red fess bearing a golden leopard for Guyenne, " +
      "accompanied by three black pine cones for the great pine forest of the Landes.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-41": {
    description:
      "The department arms as a banner: a wavy division joining the Orléanais (blue with fleurs-de-lis " +
      "and a silver label) and a golden field with a blue fleur-de-lis, the wave standing for the Loire " +
      "— the arms of Loir-et-Cher.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-42": {
    description:
      "The department arms as a banner: on red a golden dolphin — the historic arms of the Forez, the " +
      "old county at the heart of the Loire department.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-43": {
    description:
      "The department arms as a banner: on red a silver arm issuing from a blue cloud — the historic " +
      "arms of the Velay, the old land around Le Puy that forms the Haute-Loire.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-44": {
    description:
      "The department arms as a banner: a quartered shield combining the arms of the department’s main " +
      "towns — including the golden ship of Nantes on blue — adopted in 1930 for Loire-Atlantique.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-45": {
    description:
      "The department arms as a banner: on blue a silver wavy bar and three golden fleurs-de-lis — the " +
      "arms of the Orléanais, the wave standing for the little river Loiret that names the department.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-46": {
    description:
      "The department arms as a banner: on red a silver six-arched bridge — recalling the fortified " +
      "Valentré bridge of Cahors — the arms of the Quercy, the old province of the Lot.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-47": {
    description:
      "The department arms as a banner: a quartered shield combining the arms of the department’s main " +
      "towns — including a silver eagle for Agen — officially adopted for Lot-et-Garonne in 2003.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-48": {
    description:
      "The department arms as a banner: a party shield with a blue field of golden fleurs-de-lis — the " +
      "historic arms of the Gévaudan, the old land that forms the Lozère.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-49": {
    description:
      "The department arms as a banner: the arms of Anjou — blue strewn with golden fleurs-de-lis — with " +
      "the double-barred patriarchal ‘Cross of Anjou’, the historic emblem of Maine-et-Loire.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-50": {
    description:
      "The department arms as a banner: a wavy division of blue and red bearing the two golden leopards " +
      "of Normandy, the wave standing for the sea that all but surrounds the Manche (‘the Channel’).",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-51": {
    description:
      "The department arms as a banner: the arms of Champagne — on blue a silver fess (band) between " +
      "golden potent cotises — the fess standing for the river Marne that names the department.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-52": {
    description:
      "The department arms as a banner: the arms of Champagne turned upright — on blue a silver pale " +
      "between golden potent vergettes — the pale standing for the upper Marne, giving Haute-Marne its " +
      "name.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-53": {
    description:
      "The department arms as a banner: on blue a golden leopard between two golden fleurs-de-lis — " +
      "arms drawn from Anjou, Normandy and Brittany, the lands meeting in the Mayenne.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-54": {
    description:
      "The department arms as a banner: the arms of Lorraine — on gold a red bend charged with three " +
      "silver alerions (eaglets) — the two flanking cotices standing for the rivers Meurthe and Moselle.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-55": {
    description:
      "The department arms as a banner: on blue strewn with cross-crosslets two golden barbel fish back " +
      "to back — the arms of Bar (the Barrois), the old duchy that forms the Meuse.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-56": {
    description:
      "The department arms as a banner: a wavy division of Breton ermine and blue — the ermine of " +
      "Brittany with blue for the sea, fitting the name Morbihan (Breton for ‘little sea’).",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-57": {
    description:
      "The department arms as a banner: a shield quartering the arms of Metz, Lorraine, Bar and " +
      "Luxembourg — the historic lands meeting in the Moselle — adopted in 1948.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-58": {
    description:
      "The department arms as a banner: bendy of gold and blue within a red engrailed border — the arms " +
      "of the Nivernais, the old county that became the Nièvre.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-60": {
    description:
      "The department arms as a banner: a diagonal division joining Ponthieu (gold with three blue " +
      "bands) and the Île-de-France (blue strewn with golden fleurs-de-lis) — the two lands of the Oise.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-61": {
    description:
      "The department arms as a banner: the two golden leopards of Normandy on red above the blue and " +
      "golden fleurs-de-lis of Alençon — the arms of the Orne.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-62": {
    description:
      "The department arms as a banner: on blue strewn with golden fleurs-de-lis a red label in chief — " +
      "the arms of Artois, joined with the Boulonnais to form the Pas-de-Calais.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-63": {
    description:
      "The department arms as a banner: the red green-fringed gonfanon of Auvergne on gold, with a " +
      "griffin — the arms of the Puy-de-Dôme, formed from lower Auvergne.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-64": {
    description:
      "The department arms as a banner: a shield quartered for its four Basque and Béarnais lands — the " +
      "golden chains of Lower Navarre, the arms of Béarn, of Labourd, and a golden lion for Soule (on " +
      "red) — the arms of the Pyrénées-Atlantiques.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-65": {
    description:
      "The department arms as a banner: on gold two red leopard-lions — the historic arms of Bigorre, " +
      "the old county that became the Hautes-Pyrénées.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-66": {
    description:
      "The department arms as a banner: on gold four red pales — the Catalan bars, the arms of the " +
      "Roussillon, which forms the Pyrénées-Orientales.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-69": {
    description:
      "The department arms as a banner: a party shield with the silver lion of the Lyonnais (on red) and " +
      "the black lion of the Beaujolais (on gold) — the two lands of the Rhône, joined in 1911.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-70": {
    description:
      "The department arms as a banner: Franche-Comté — on blue strewn with golden billets a golden " +
      "crowned lion — beneath a wavy chief for the river Saône that names the Haute-Saône.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-71": {
    description:
      "The department arms as a banner: on gold two blue wavy pales for the rivers Saône and Loire, " +
      "under a chief drawn from the arms of Burgundy — the arms of Saône-et-Loire.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-72": {
    description:
      "The department arms as a banner: on blue strewn with golden fleurs-de-lis within a red border, a " +
      "silver lion — the historic arms of Maine, the province of the Sarthe.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  // ── Northern Ireland (GB) ──────────────────────────────────────────────

  "GB-NIR": {
    description:
      "The Ulster Banner: a red cross of St George on white — Northern Ireland's " +
      "link to the United Kingdom — charged with a white six-pointed star for the " +
      "six counties, the Red Hand of Ulster (a historic Gaelic symbol of the province), " +
      "and St Edward's Crown representing loyalty to the British monarchy. Used officially " +
      "1953–1972; no official flag has replaced it since the 1973 abolition of the " +
      "Northern Ireland government.",
    sources: [
      { title: "Ulster Banner — Wikipedia", url: "https://en.wikipedia.org/wiki/Ulster_Banner" },
    ],
  },

  // ── Akrotiri and Dhekelia (GB) ─────────────────────────────────────────

  "GB-AKD": {
    description:
      "The Dhekelia Garrison Flag: a green field charged with two gold lions passant guardant, " +
      "derived from the unofficial flag flown in British colonial Cyprus, which in turn drew on " +
      "the arms of King Richard I of England — who conquered Cyprus in 1191 and founded the medieval " +
      "Kingdom of Cyprus. It has no official status; the Sovereign Base Areas have never been granted " +
      "arms by the College of Arms, so the territory's legally recognised flag is the plain Union Jack.",
    sources: [
      {
        title: "Flag of Akrotiri and Dhekelia — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_Akrotiri_and_Dhekelia",
      },
      {
        title: "Cyprus: Sovereign Base Areas (United Kingdom) — Flags of the World",
        url: "https://www.fotw.info/flags/cy%5Esba.html",
      },
    ],
  },

  // ── Saint Helena (GB) ────────────────────────────────────────────────────

  "GB-SH": {
    description:
      "A Blue Ensign — the Union Jack in the canton on a blue field, marking Saint " +
      "Helena as a British Overseas Territory — defaced in the fly with the shield " +
      "from the territory's coat of arms, authorised in 1984. The shield's top third " +
      "shows the wirebird (the Saint Helena plover, the island's endemic national " +
      "bird, found nowhere else on Earth), and the bottom two-thirds depict a coastal " +
      "scene taken from the colony's historic seal: a three-masted sailing ship " +
      "flying the flag of England, with the island's mountainous coastline behind it. " +
      "The full arms (not shown on the flag) carry the motto 'Loyal and unshakable' " +
      "beneath a figure of Helena of Constantinople, the island's namesake, holding " +
      "the cross she is credited with rediscovering.",
    sources: [
      { title: "Flag of Saint Helena — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint_Helena" },
      { title: "Coat of arms of Saint Helena — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Saint_Helena" },
    ],
  },

  // ── Bermuda (GB) ─────────────────────────────────────────────────────────

  "GB-BM": {
    description:
      "A British Red Ensign — the Union Jack in the canton on a red field — defaced in the fly with " +
      "the coat of arms of Bermuda, first adopted in 1910 (the arms enlarged in a 1999 redesign). " +
      "Bermuda is unusual among British Overseas Territories in flying a RED ensign ashore (most use a " +
      "blue ensign); the arms show a red lion — taken from the Royal Arms of England — holding a shield " +
      "that depicts the 1609 wreck of the Sea Venture, the ship whose stranding on Bermuda's reefs led " +
      "to the island's settlement, beneath the Latin motto 'Quo Fata Ferunt' ('Whither the Fates Carry').",
    sources: [
      { title: "Flag of Bermuda — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Bermuda" },
    ],
  },

  // ── Prince Edward Island (CA) ──────────────────────────────────────────

  "CA-PE": {
    description:
      "An armorial banner of the provincial arms, bordered on three sides by alternating " +
      "red and white rectangles. The chief shows a golden lion passant guardant on red, " +
      "from the Royal Arms of England, referencing Prince Edward, Duke of Kent. Below, " +
      "a large oak tree represents Great Britain and three oak saplings represent the " +
      "province's three counties (Kings, Queens, and Prince).",
    sources: [
      { title: "Flag of Prince Edward Island — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Prince_Edward_Island" },
    ],
  },

  // ── Pakistan provinces ─────────────────────────────────────────────────

  "PK-PB": {
    description:
      "A dark-green flag bearing the provincial emblem in white: five wavy lines for " +
      "the five rivers (Indus, Chenab, Jhelum, Ravi, Sutlej) that give Punjab its " +
      "name ('Land of Five Waters' in Persian), flanked by wheat stalks for the " +
      "province's fertile agriculture, with a crescent and star for Pakistan's Islamic " +
      "heritage. A scroll reads 'Government of Punjab' in Shahmukhi Punjabi.",
    sources: [
      { title: "Flag of Punjab, Pakistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Punjab,_Pakistan" },
    ],
  },

  "PK-KP": {
    description:
      "A dark-green flag with the provincial seal: Jamrud Fort — the historic guardian " +
      "of the Khyber Pass — against a backdrop of mountains, with a crescent and star " +
      "above for the Muslim-majority province's Islamic heritage. A scroll below bears " +
      "the province's official name in Urdu. The green-and-white colour scheme reflects " +
      "the Pakistani national colours.",
    sources: [
      { title: "Flag of Khyber Pakhtunkhwa — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Khyber_Pakhtunkhwa" },
    ],
  },

  "PK-SD": {
    description:
      "A dark-green flag (adopted 2005) bearing the Sindh provincial emblem in white, made " +
      "up of the province's four major crops — cotton, rice, wheat and sugar cane — for the " +
      "agriculture of the fertile Indus valley, above a crescent-shaped scroll reading " +
      "\"Government of Sindh\" in Urdu and Sindhi. The white-and-dark-green scheme is the " +
      "Pakistani national colours, reflecting the country's Islamic heritage.",
    sources: [
      { title: "Flag of Sindh — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Sindh" },
    ],
  },

  "PK-BA": {
    description:
      "A dark-green flag (adopted 23 May 2005) whose emblem shows the stylised mountains of " +
      "the province's barren terrain and a camel — Balochistan's principal traditional means " +
      "of transport and its official provincial animal. The white-and-dark-green scheme is the " +
      "Pakistani national colours.",
    sources: [
      { title: "Flag of Balochistan, Pakistan — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Balochistan,_Pakistan" },
    ],
  },

  "FR-74": {
    description:
      "Haute-Savoie has no flag of its own and uses the traditional flag of Savoy: a white cross " +
      "reaching the edges on a red field, the arms of the Counts and Dukes of Savoy. This version, with " +
      "“Haute-Savoie” written along the cross’s horizontal arm, is sometimes flown to tell the " +
      "department apart from neighbouring Savoie, for instance at sports events. The department is " +
      "named “Upper Savoy” after the former Duchy of Savoy, which became part of France in 1860.",
    sources: [
      { title: "Haute-Savoie (Department, France) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/fr-74.html" },
      { title: "Drapeau de la Savoie — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Drapeau_de_la_Savoie" },
    ],
  },

  "FR-76": {
    description:
      "The department arms as a banner: on red the two golden leopards of Normandy with a silver wavy " +
      "band between them for the river Seine — the arms of the Seine-Maritime.",
    sources: [
      { title: "Seine-Maritime — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Seine-Maritime" },
    ],
  },

  "FR-80": {
    description:
      "The department arms as a banner: a quartered shield of the fleurs-de-lis of France and three " +
      "golden lions (for the Ponthieu and Amiénois lands), crossed by a silver bar — the arms of " +
      "Picardy, the historic province of the Somme.",
    sources: [
      { title: "Somme (département) — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Somme_(d%C3%A9partement)" },
    ],
  },

  "FR-81": {
    description:
      "The department arms as a banner: on gold a red chief-pale (a T-shape for ‘Tarn’) charged with the " +
      "golden clechée Occitan cross of Languedoc — the historic province of the Tarn.",
    sources: [
      { title: "Tarn (département) — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Tarn_(d%C3%A9partement)" },
    ],
  },

  "FR-86": {
    description:
      "The department arms as a banner: on red a silver wavy pale for the river Vienne, accompanied by " +
      "five golden castles set in a saltire — the arms of the Vienne, drawn from the Poitou.",
    sources: [
      { title: "Vienne (département) — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Vienne_(d%C3%A9partement)" },
    ],
  },

  "FR-88": {
    description:
      "The department arms as a banner: silver mantled in green with three uprooted fir trees for the " +
      "forested Vosges mountains, beneath a golden chief bearing a red bend with three silver alerions " +
      "— the arms of Lorraine, to which most of the department belonged.",
    sources: [
      { title: "Vosges (département) — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Vosges_(d%C3%A9partement)" },
    ],
  },

  "FR-89": {
    description:
      "The department arms as a banner: on gold a blue pall (Y-shape), beneath a chief joining Burgundy " +
      "(blue with fleurs-de-lis and a compony border) and the gold-and-blue bendy of the duchy — the " +
      "composite arms of the Yonne.",
    sources: [
      { title: "Yonne (département) — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Yonne_(d%C3%A9partement)" },
    ],
  },

  "FR-84": {
    description:
      "The department arms as a banner: a quartered shield for the lands that make up the Vaucluse — the " +
      "crossed keys of Saint Peter for the papal Comtat Venaissin, the fleur-de-lis with a red label for " +
      "France, an orange branch for the principality of Orange, and three golden keys — with a hunting " +
      "horn in the chief.",
    sources: [
      { title: "Vaucluse (département) — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Vaucluse_(d%C3%A9partement)" },
    ],
  },

  "FR-90": {
    description:
      "The department arms as a banner: on blue three golden twin-bars with a golden crenellated tower " +
      "over all — the arms of the county of Belfort joined with the tower of the town, for the Territoire " +
      "de Belfort.",
    sources: [
      { title: "Territoire de Belfort — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Territoire_de_Belfort" },
    ],
  },

  "FR-91": {
    description:
      "The department arms as a banner: on blue a silver wavy bend for the river Essonne, a golden " +
      "radiant sun above, and golden fleurs-de-lis below for the Île-de-France — the arms of the " +
      "Essonne.",
    sources: [
      { title: "Blason département fr Essonne — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Essonne.svg" },
    ],
  },

  "FR-83": {
    description:
      "The department arms as a banner: on blue a golden fleur-de-lis with a red label over a golden " +
      "base (chaussé) — the arms of Provence, of which the Var was the eastern part.",
    sources: [
      { title: "Blason département fr Var — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Var.svg" },
    ],
  },

  "FR-77": {
    description:
      "The department arms as a banner: on blue strewn with golden fleurs-de-lis, two silver wavy fesses " +
      "for the two rivers that name the department, the Seine and the Marne — the arms of Seine-et-Marne " +
      "on the field of the Île-de-France.",
    sources: [
      { title: "Blason département fr Seine-et-Marne — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Seine-et-Marne.svg" },
    ],
  },

  "FR-78": {
    description:
      "The department arms as a banner: on blue strewn with golden fleurs-de-lis (for the Île-de-France), " +
      "two silver wavy bends for the department’s rivers — the arms of the Yvelines.",
    sources: [
      { title: "Blason département fr Yvelines — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Yvelines.svg" },
    ],
  },

  "FR-79": {
    description:
      "The department arms as a banner: on red two silver wavy bars for the two Sèvres rivers that name " +
      "the department, accompanied by five golden towers set 2-1-2 — the arms of the Deux-Sèvres.",
    sources: [
      { title: "Blason département fr Deux-Sèvres — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Deux-S%C3%A8vres.svg" },
    ],
  },

  "FR-82": {
    description:
      "The department arms as a banner: a divided shield of a golden leopard on red (for Guyenne, the " +
      "Quercy) and the golden clechée Occitan cross of Languedoc on red — the two historic lands of " +
      "Tarn-et-Garonne.",
    sources: [
      { title: "Blason département fr Tarn-et-Garonne — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Tarn-et-Garonne.svg" },
    ],
  },

  "FR-87": {
    description:
      "The department arms as a banner: an ermine field within a red border, crossed by a blue wavy fess " +
      "for the river Vienne — the arms of the Haute-Vienne.",
    sources: [
      { title: "Blason département fr Haute-Vienne — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Haute-Vienne.svg" },
    ],
  },

  "FR-85": {
    description:
      "The department arms as a banner: on silver a red crowned double heart topped with a cross — the " +
      "‘Vendéen heart’, the Sacred-Heart emblem worn by the Catholic-Royalist insurgents of the 1793 " +
      "Vendée uprising — within a border alternating fleurs-de-lis and castles.",
    sources: [
      { title: "Blason département fr Vendée — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Vend%C3%A9e.svg" },
    ],
  },

  "FR-92": {
    description:
      "The department arms as a banner: a party shield of a golden fleur-de-lis and a silver ship, both " +
      "on blue, beneath a silver chief with a blue wavy fess — the fleur-de-lis for the Île-de-France, " +
      "the ship and wave for the Seine that names the Hauts-de-Seine.",
    sources: [
      { title: "Blason département fr Hauts-de-Seine — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Hauts-de-Seine.svg" },
    ],
  },

  "FR-93": {
    description:
      "The department arms as a banner: on blue golden fleurs-de-lis (for the Île-de-France) above a red " +
      "field where a silver wing embraces three golden wheat ears, a silver gear over the division — " +
      "the wheat for farming and the gear for industry in the Seine-Saint-Denis.",
    sources: [
      { title: "Blason département fr Seine-Saint-Denis — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Seine-Saint-Denis.svg" },
    ],
  },

  "FR-94": {
    description:
      "The department arms as a banner: on blue strewn with golden fleurs-de-lis a silver inverted wavy " +
      "chevron over a gold base — the fleurs-de-lis for the Île-de-France and the wavy chevron for the " +
      "river Marne that names the Val-de-Marne.",
    sources: [
      { title: "Blason département fr Val-de-Marne — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Val-de-Marne.svg" },
    ],
  },

  "FR-95": {
    description:
      "The department arms as a banner: on red a silver wavy diagonal band for the river Oise, with a " +
      "golden alerion (eaglet) above and an anchored cross below, within a blue border of ten golden " +
      "fleurs-de-lis for the Île-de-France — the arms of the Val-d’Oise.",
    sources: [
      { title: "Blason département fr Val-d'Oise — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Val-d%27Oise.svg" },
    ],
  },

  "FR-59": {
    description:
      "The department arms as a banner: on gold a black lion with red claws and tongue — the Lion of " +
      "Flanders, the arms of the historic County of Flanders from which the Nord was formed.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-67": {
    description:
      "The department arms as a banner: on red a silver bend flanked by two flowered cotises — the arms " +
      "of Lower Alsace, the historic land of the Bas-Rhin.",
    sources: [
      { title: "Armorial des départements de France — Wikipédia (French)", url: "https://fr.wikipedia.org/wiki/Armorial_des_d%C3%A9partements_de_France" },
    ],
  },

  "FR-68": {
    description:
      "The department arms as a banner: on red a golden bend accompanied by six golden crowns (three " +
      "above, three inverted below) — the arms of Upper Alsace, the historic land of the Haut-Rhin.",
    sources: [
      { title: "Blason département fr Haut-Rhin — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Blason_d%C3%A9partement_fr_Haut-Rhin.svg" },
    ],
  },

  "FR-PF": {
    description:
      "The collectivity flag: two red bands around a white band bearing the emblem of French Polynesia " +
      "— a Polynesian outrigger canoe (pirogue) riding blue-and-white waves beneath a golden sun, with " +
      "five figures for the five island groups (Society, Tuamotu, Gambier, Marquesas and Austral). Red " +
      "and white are traditional Polynesian colours.",
    sources: [
      { title: "Flag of French Polynesia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_French_Polynesia" },
    ],
  },

  "FR-PM": {
    description:
      "The collectivity flag (unofficial): on blue the golden ship Grande Hermine, in which Jacques " +
      "Cartier reached Saint-Pierre in 1536, over waves; the hoist carries the Basque, Breton and Norman " +
      "flags for the three homelands most islanders descend from.",
    sources: [
      { title: "Flag of Saint-Pierre and Miquelon — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Saint-Pierre_and_Miquelon" },
    ],
  },

  "FR-NC": {
    description:
      "The Kanak (FLNKS) flag: blue, red and green bands with a yellow disc bearing a black flèche " +
      "faîtière — the carved spire that crowns Kanak houses. Blue is the sky and sea, red the blood " +
      "shed in the independence struggle and Kanak unity, green the land and the ancestors within it, " +
      "and the disc is the sun.",
    sources: [
      { title: "Flags of New Caledonia — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_of_New_Caledonia" },
    ],
  },

  "FR-WF": {
    description:
      "The collectivity flag (unofficial, 1985): a red field with a white square bearing a red saltire " +
      "(cross) at the fly, and the French tricolour in the canton. It is the territory’s de-facto flag; " +
      "on official occasions the French flag is flown.",
    sources: [
      { title: "Flag of Wallis and Futuna — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Wallis_and_Futuna" },
    ],
  },

  "FR-BL": {
    description:
      "The collectivity arms: a shield bearing the Three Crowns of Sweden, recalling the island’s time " +
      "as a Swedish colony (1784–1878), when King Gustav III made Gustavia a free port. (France " +
      "recognises no official regional flag.)",
    sources: [
      { title: "Saint Barthélemy — Wikipedia", url: "https://en.wikipedia.org/wiki/Saint_Barth%C3%A9lemy" },
    ],
  },

  "FR-MF": {
    description:
      "The collectivity emblem on a white flag: a brown pelican in flight over a hibiscus flower and a " +
      "rising sun, above a “Saint-Martin” banner — the emblem of the French collectivity of Saint-Martin. " +
      "(France recognises no official regional flag.)",
    sources: [
      { title: "Saint Martin (France) — Wikipedia", url: "https://en.wikipedia.org/wiki/Saint_Martin_(France)" },
    ],
  },

  "FR-TF": {
    description:
      "The official flag of the French Southern and Antarctic Lands (TAAF), adopted 23 February 2007: a " +
      "blue field with the French Tricolour in the canton, and the letters \"T.A.A.F\" styled as a white " +
      "anchor monogram in the fly, surrounded by five white five-pointed stars. The five stars are " +
      "popularly associated with TAAF's five administrative districts — Adélie Land, Crozet, Kerguelen, " +
      "Saint-Paul and Amsterdam, and the Scattered Islands — though this link is not stated in the " +
      "official adoption decree. An earlier 1958 version, made for the territory's first senior " +
      "administrator, carried three stars instead of five.",
    sources: [
      {
        title: "Flag of the French Southern and Antarctic Lands — Wikipedia",
        url: "https://en.wikipedia.org/wiki/Flag_of_the_French_Southern_and_Antarctic_Lands",
      },
      {
        title: "French Southern and Antarctic Lands (Overseas Territory, France) — Flags of the World",
        url: "https://www.fotw.info/flags/tf.html",
      },
    ],
  },

  "FR-YT": {
    description:
      "Mayotte has no flag of its own — as a French overseas department the Tricolour is its national " +
      "flag — but its departmental council flies a banner bearing the department's coat of arms (adopted " +
      "1982) on a white field, captioned 'DÉPARTEMENT DE MAYOTTE'. The arms' blue and red are drawn from " +
      "the French flag, with two yellow ylang-ylang flowers (the plant behind Mayotte's perfume industry) " +
      "on a white crescent moon, and carry the Shimaore motto 'Ra Hachiri' ('We are vigilant').",
    sources: [
      { title: "Flag and coat of arms of Mayotte — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_and_coat_of_arms_of_Mayotte" },
    ],
  },

  // ── Somaliland (unofficial, shown under Somalia) ────────────────────────

  "SO-SL~": {
    description:
      "A tricolour of green, white and red with a black five-pointed star centred on the white band, " +
      "adopted by referendum-approved constitution on 31 May 2001 (first flown 1996). The green band " +
      "carries the Shahada — the Islamic declaration of faith — in white Arabic script, affirming Islam's " +
      "role in Somaliland's identity; the white band and its black star stand for peace, purity and unity; " +
      "the red band represents the struggle and sacrifice of the independence movement. Because the " +
      "Shahada is inscribed on it, the flag may never be flown at half-mast — doing so is treated as " +
      "desecration, the same protocol observed for the flags of Afghanistan, Saudi Arabia and Iraq.",
    sources: [
      { title: "Flag of Somaliland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Somaliland" },
    ],
  },


  "IT-AL": {
    description:
      "The provincial arms (gonfalone): a shield combining the arms of the province’s chief towns — " +
      "Asti, Novi, Tortona, Acqui and Casale — around the central arms of Alessandria itself (silver " +
      "with a red cross); composed from the 1912 royal decree.",
    sources: [
      { title: "Provincia di Alessandria — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Alessandria" },
    ],
  },

  "IT-AN": {
    description:
      "The provincial arms (gonfalone): on blue a bent flesh-coloured arm holding a sprig of " +
      "strawberry-tree (corbezzolo) with two golden berries — a canting emblem, the plant of Monte " +
      "Conero whose Greek name kómaros gives Ancona its association.",
    sources: [
      { title: "Provincia di Ancona — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Ancona" },
    ],
  },

  "IT-AR": {
    description:
      "The provincial arms (gonfalone): over all a black horse on silver for the city of Arezzo, on a " +
      "quartered field showing the rivers Arno and Tiber as old men with oars, Monte Falterona, and the " +
      "white ox of the Val di Chiana. Motto: “Intra Tevere et Arno” (between the Tiber and the Arno).",
    sources: [
      { title: "Provincia di Arezzo — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Arezzo" },
    ],
  },


  "IT-AQ": {
    description:
      "The provincial arms (gonfalone): on blue a silver eagle with lowered wings, gold-crowned in the " +
      "antique style, standing on the two outer peaks of a golden three-peaked mountain. The eagle is a " +
      "canting emblem for L’Aquila (‘the eagle’) and the peaks the Apennines; the arms come from the old " +
      "province of Abruzzo Ulteriore II.",
    sources: [
      { title: "Provincia dell'Aquila — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_dell%27Aquila" },
    ],
  },


  "IT-AV": {
    description:
      "The provincial arms (gonfalone): per fess, a golden gemmed crown on red above a silver field — " +
      "the arms of the Province of Avellino, recognised in 1938.",
    sources: [
      { title: "Provincia di Avellino — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Avellino" },
    ],
  },

  "IT-CR": {
    description:
      "The provincial arms (gonfalone): a shield joining its chief towns — Cremona (barry red and " +
      "silver with an arm holding a golden ball), Crema (a hand with a sword between deer horns) and " +
      "Casalmaggiore (a town gate on blue). Granted by royal decree in 1938.",
    sources: [
      { title: "Provincia di Cremona — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Cremona" },
    ],
  },

  "IT-CO": {
    description:
      "The provincial arms (gonfalone): a silver cross on red with the motto “Libertas” for Como " +
      "itself, a golden gemmed cross of Rovenna ringed by four stars for the lands once separated from " +
      "Como (Sondrio, Varese, Lecco and Ticino), and a golden interlace recalling the medieval Como " +
      "master builders (Magistri cumacini).",
    sources: [
      { title: "Provincia di Como — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Como" },
    ],
  },

  "IT-CN": {
    description:
      "The provincial arms (gonfalone): a quartered shield of the four former district capitals — " +
      "Cuneo (silver with red bars and a cross), Alba (a red cross with the letters ALBA), Saluzzo (a " +
      "gold Gothic S on blue and silver) and Mondovì (a silver cross over three mountains on red).",
    sources: [
      { title: "Provincia di Cuneo — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Cuneo" },
    ],
  },

  "IT-FE": {
    description:
      "The provincial arms (gonfalone): a shield combining the arms of its three original district " +
      "capitals — Ferrara, Cento and Comacchio — adopted in its present form in 1943.",
    sources: [
      { title: "Provincia di Ferrara — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Ferrara" },
    ],
  },

  "IT-IM": {
    description:
      "The provincial arms (gonfalone): a shield of three parts for the towns that formed Imperia — " +
      "four silver towers on red for Porto Maurizio, a green olive tree on silver for Oneglia, and a " +
      "crowned golden lion on a palm on red for Sanremo. Granted by royal decree in 1927.",
    sources: [
      { title: "Provincia di Imperia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Imperia" },
    ],
  },

  "IT-FR": {
    description:
      "The provincial arms (gonfalone): on blue a golden lion holding a silver dagger, with two golden " +
      "cornucopiae of fruit and grain below. The lion comes from Frosinone’s own arms (the old Papal " +
      "State), the dagger for the martial Volsci, and the cornucopiae from the Terra di Lavoro for the " +
      "land’s plenty. Motto: “Ferocior ad bellandum.”",
    sources: [
      { title: "Provincia di Frosinone — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Frosinone" },
    ],
  },

  "IT-LE": {
    description:
      "The provincial arms (gonfalone): on gold four red pales of the Crown of Aragon, over all a " +
      "dolphin leaping head-down and biting a silver crescent — the crescent for the Ottoman threat and " +
      "the dolphin for the Salento’s resistance to Turkish raids.",
    sources: [
      { title: "Provincia di Lecce — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Lecce" },
    ],
  },

  "IT-MN": {
    description:
      "The provincial arms (gonfalone): a shield combining the emblems of Mantua, Bozzolo and " +
      "Castiglione delle Stiviere — the towns of the province — replacing an earlier version that bore " +
      "the Gonzaga eagle.",
    sources: [
      { title: "Provincia di Mantova — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Mantova" },
    ],
  },

  "IT-MO": {
    description:
      "The provincial arms (gonfalone): on a black field a golden lion rampant — the arms of the " +
      "Province of Modena.",
    sources: [
      { title: "Provincia di Modena (stemma) — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Provincia_di_Modena-Stemma.svg" },
    ],
  },

  "IT-PR": {
    description:
      "The provincial arms (gonfalone): a shield parted by a thin blue line — a blue cross on gold, and " +
      "six blue fleurs-de-lis (3-2-1) on gold — the arms of the Province of Parma, granted in 2001.",
    sources: [
      { title: "Provincia di Parma (stemma) — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Provincia_di_Parma-Stemma.svg" },
    ],
  },

  "IT-LI": {
    description:
      "The provincial arms (gonfalone): the arms of the city of Livorno surmounted by the flag of the " +
      "island of Elba — together standing for the mainland-and-island territory of the province, as " +
      "granted by royal decree in 1902.",
    sources: [
      { title: "Provincia di Livorno — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Livorno" },
    ],
  },

  "IT-AT": {
    description:
      "The provincial arms (gonfalone): on red a silver cross — the historic arms of Asti, carried on " +
      "the province’s red banner.",
    sources: [
      { title: "Provincia di Alessandria — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Alessandria" },
    ],
  },

  "IT-PD": {
    description:
      "The provincial arms (gonfalone): on silver the red cross of Padua, bordered by seven small " +
      "shields for the province’s historic district capitals — Este, Cittadella, Monselice, Montagnana, " +
      "Camposampiero, Conselve and Piove di Sacco. Granted in 2003.",
    sources: [
      { title: "Provincia di Padova — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Padova" },
    ],
  },

  "IT-VR": {
    description:
      "The provincial arms (gonfalone): on red a silver ladder of five rungs set vertically — the " +
      "‘scala’ of the Della Scala (Scaligeri) family who ruled Verona, a canting emblem (scala = " +
      "ladder). Motto: “nec descendere, nec morari.”",
    sources: [
      { title: "Provincia di Verona — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Verona" },
    ],
  },

  "LT-VL": {
    description:
      "The county arms as a banner: on red a silver armoured knight on a black horse — the Vytis, " +
      "brandishing a spear, a blue shield with a golden double cross at his shoulder — within a blue " +
      "border of ten double crosses. The mounted knight has stood for Vilnius and the Grand Duchy of " +
      "Lithuania since Grand Duke Algirdas’s seal of 1366.",
    sources: [
      { title: "Vilniaus apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Vilniaus_apskrities_herbas" },
    ],
  },

  "AR-H": {
    description:
      "The province flag: green, white and light-blue vertical stripes; on the white a golden 32-ray " +
      "sun of Argentina above a plough ringed by 25 five-pointed stars. Green is the Chaco forest, the " +
      "plough the tilling of virgin land (the province’s first livelihood), and the 25 stars its " +
      "departments.",
    sources: [
      { title: "Bandera de la provincia del Chaco — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_la_provincia_del_Chaco" },
    ],
  },

  "LT-KU": {
    description:
      "The county arms as a banner: on red a silver aurochs head with a golden cross between its horns, " +
      "within a blue border of ten double crosses. The aurochs comes from the arms of Kaunas, the " +
      "county’s centre; the border marks county rank.",
    sources: [
      { title: "Kauno apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Kauno_apskrities_herbas" },
    ],
  },

  "LT-KL": {
    description:
      "The county arms as a banner: on red a golden three-towered wall over a silver wavy base, within " +
      "a blue border of ten double crosses. The castle and red-and-gold come from Klaipėda’s arms (from " +
      "a 13th-century seal); the wavy base is the Baltic Sea.",
    sources: [
      { title: "Klaipėdos apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Klaip%C4%97dos_apskrities_herbas" },
    ],
  },

  "LT-SA": {
    description:
      "The county arms as a banner: on silver a black bear with red tongue, teeth and claws, within a " +
      "blue border of ten double crosses. The bear is the emblem of Samogitia (Žemaitija), the region " +
      "Šiauliai belongs to — here without the Samogitian bear’s chain.",
    sources: [
      { title: "Šiaulių apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/%C5%A0iauli%C5%B3_apskrities_herbas" },
    ],
  },

  "LT-PN": {
    description:
      "The county arms as a banner: on silver over a red masonry base a black armoured knight with a " +
      "sword and a blue shield bearing a golden double cross, within a blue border of ten double " +
      "crosses. The knight is from the 16th-century seal of the historic Upytė land, and the masonry " +
      "base recalls Upytė itself.",
    sources: [
      { title: "Panevėžio apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Panev%C4%97%C5%BEio_apskrities_herbas" },
    ],
  },

  "LT-AL": {
    description:
      "The county arms as a banner: on blue a silver armoured knight holding a golden halberd and a " +
      "silver shield, within a blue border of ten double crosses — the arms drawn from the historic " +
      "Trakai land that Alytus County overlaps.",
    sources: [
      { title: "Alytaus apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Alytaus_apskrities_herbas" },
    ],
  },

  "LT-MR": {
    description:
      "The county arms as a banner: on red a silver sower scattering golden grain, within a blue border " +
      "of ten double crosses. The sower is Marijampolė’s farming heritage, the ‘golden thoughts’ also " +
      "standing for the spread of knowledge in a region famed for its scholars.",
    sources: [
      { title: "Marijampolės apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Marijampol%C4%97s_apskrities_herbas" },
    ],
  },

  "LT-TA": {
    description:
      "The county arms as a banner: on red a golden lynx rampant with a silver sword and a shield " +
      "bearing a red hunting horn, within a blue border of ten double crosses. The lynx stands for " +
      "alertness and defence, the red for blood shed for Lithuania, and the horn for Tauragė.",
    sources: [
      { title: "Tauragės apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Taurag%C4%97s_apskrities_herbas" },
    ],
  },

  "LT-TE": {
    description:
      "The county arms as a banner: on red a black bear with silver tongue, teeth and claws wearing a " +
      "chained collar, within a blue border of ten double crosses — the chained bear of Samogitia " +
      "(Žemaitija), the region of Telšiai.",
    sources: [
      { title: "Telšių apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Tel%C5%A1i%C5%B3_apskrities_herbas" },
    ],
  },

  "LT-UT": {
    description:
      "The county arms as a banner: on red a silver horse with a golden eight-pointed star above, " +
      "within a blue border of ten double crosses. The horse honours the region’s equestrian tradition " +
      "and the warrior’s mount; the star is taken from the arms of Utena city.",
    sources: [
      { title: "Utenos apskrities herbas — Wikipedia (Lithuanian)", url: "https://lt.wikipedia.org/wiki/Utenos_apskrities_herbas" },
    ],
  },

  "AR-K": {
    description:
      "The province flag (2011, the last Argentine province to adopt one): a light-blue-and-white upper " +
      "field over a blood-red lower stripe, within a gold border, charged with an Inca-inspired sun and an " +
      "olive wreath. The sky-blue and white evoke the national flag and the Virgin’s mantle; the red is " +
      "“the mixture of our blood”; the wreath’s 16 leaves are the province’s 16 departments; the gold " +
      "border is its inherited cultural wealth.",
    sources: [
      { title: "Bandera de la Provincia de Catamarca — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_la_Provincia_de_Catamarca" },
    ],
  },

  "AR-L": {
    description:
      "The province flag (1994): the Argentine light-blue/white/light-blue triband with the provincial arms " +
      "on the centre. In the arms a rising sun marks the dawn of a new province joining Argentina; crossed " +
      "indigenous lances and an indigenous figure honour the region’s original peoples; wheat sheaves stand " +
      "for the plains’ fertility and a caldén tree for its native woodland; a blue-and-white ribbon signals " +
      "integration into the nation.",
    sources: [
      { title: "Bandera de la Provincia de La Pampa — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_la_Provincia_de_La_Pampa" },
    ],
  },

  "AR-U": {
    description:
      "The province flag (2005): a light-blue field bearing a dark-blue cogwheel crossed by a yellow band, " +
      "a white sawtooth line above and a wavy white line below, with a 16-rayed rising sun. The cogwheel is " +
      "industry; the 16 sun-rays are the province’s 16 departments; the upper line is the Andes and the " +
      "lower wavy line the Atlantic; light-blue is sky, yellow the farm harvest, dark-blue justice and " +
      "loyalty, white purity and faith.",
    sources: [
      { title: "Bandera de Chubut — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_Chubut" },
    ],
  },

  "AR-V": {
    description:
      "The province flag (1999): a blue and an orange field split by a soaring white albatross. The orange " +
      "recalls the fire that named Tierra del Fuego and traces the outline of the Argentine part of the Isla " +
      "Grande; the white albatross is the local fauna and freedom in flight; the blue is the sea and sky and " +
      "carries the Southern Cross, whose stars also stand for the South Atlantic islands Argentina claims.",
    sources: [
      { title: "Bandera de la provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_la_provincia_de_Tierra_del_Fuego,_Ant%C3%A1rtida_e_Islas_del_Atl%C3%A1ntico_Sur" },
    ],
  },
  "CO-CAL": {
    description:
      "The department flag: two equal vertical bands, yellow at the hoist and green at the fly. Yellow " +
      "stands for nobility, wealth, constancy and wisdom; green for the foliage of the coffee bushes, the " +
      "freshness and fertility of the fields, and hope for the department’s prosperity.",
    sources: [
      { title: "Bandera de Caldas — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_Caldas" },
    ],
  },

  "CO-CHO": {
    description:
      "The department flag: three horizontal stripes, green over yellow over blue. Green is the wealth of " +
      "Chocó’s forests and jungles; yellow the gold of its lands and mines; blue the abundance of its waters " +
      "and the two oceans (Pacific and Caribbean) that border the department.",
    sources: [
      { title: "Bandera del Chocó — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_del_Choc%C3%B3" },
    ],
  },

  "CO-COR": {
    description:
      "The department flag (1951): three equal horizontal stripes, blue over white over green. Blue is the " +
      "Sinú and San Jorge rivers, their wetlands and the Caribbean Sea; white is peace and concord; green " +
      "the wide green plains, savannas and mountains of the territory.",
    sources: [
      { title: "Bandera de Córdoba (Colombia) — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_C%C3%B3rdoba_(Colombia)" },
    ],
  },

  "CO-CUN": {
    description:
      "The department flag: three vertical stripes of sky-blue, golden-yellow and red, dating to 1813 when " +
      "Antonio Nariño raised it over the Free State of Cundinamarca. The yellow and red descend from the " +
      "old Spanish arms granted to the province of Santa Fe; the sky-blue was added for the mantle of the " +
      "Virgin Mary.",
    sources: [
      { title: "Bandera de Cundinamarca — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_Cundinamarca" },
    ],
  },

  "CO-HUI": {
    description:
      "The department flag (1952): three equal horizontal stripes, white over green over yellow. White is " +
      "the department’s snow-capped peaks and the honesty of its people; green the exuberance of the Huila " +
      "land and hope for a better future; yellow the ripening ears of the harvest, fruit of its people’s " +
      "labour.",
    sources: [
      { title: "Bandera del Huila — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_del_Huila" },
    ],
  },

  "CO-MET": {
    description:
      "The department flag (1970): seventeen equal horizontal stripes — nine green enclosing eight white. " +
      "The count is symbolic: it marks Meta’s rank as the seventeenth department created in the Republic.",
    sources: [
      { title: "Bandera del Meta — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_del_Meta" },
    ],
  },

  "CO-NAR": {
    description:
      "The department flag: two equal horizontal bands, yellow over green. Yellow stands for magnanimity, " +
      "generosity, wealth and constancy — for Nariño specifically the riches of its mines, the ripened " +
      "grain and patriotic hearts; green for honour, abundance and fertility — the fecundity of the fields " +
      "and ever-renewing hope on the southern horizons.",
    sources: [
      { title: "Bandera de Nariño (Colombia) — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_Nari%C3%B1o_(Colombia)" },
    ],
  },

  "CO-NSA": {
    description:
      "The department flag (1978): two horizontal stripes, red over black, with four gold stars in a " +
      "lozenge. Red is heroism and the blood of the patriots; black the oil drawn from the region. The " +
      "three lower stars are the provinces (Cúcuta, Pamplona, Ocaña) split from Santander to form the new " +
      "department; the top star marks the north as its cardinal position.",
    sources: [
      { title: "Bandera de Norte de Santander — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_de_Norte_de_Santander" },
    ],
  },

  "CO-TOL": {
    description:
      "The department flag (1968): two horizontal stripes, wine-red over yellow. The wine-red is the blood " +
      "shed by Tolima’s heroes in the wars of independence; the yellow is the department’s mineral wealth.",
    sources: [
      { title: "Bandera del Tolima — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_del_Tolima" },
    ],
  },

  "CO-VAC": {
    description:
      "The department flag (1960): two equal horizontal stripes of sky-blue and white within a silver " +
      "border, attributed to independence leader José María Cabal. Sky-blue stands for frankness, honesty " +
      "and loyalty; white for peace, beauty and purity; the silver border for integrity and innocence. " +
      "Tradition ties the blue-and-white to a vision of the Virgin of the Immaculate Conception.",
    sources: [
      { title: "Bandera del Valle del Cauca — Wikipedia (Spanish)", url: "https://es.wikipedia.org/wiki/Bandera_del_Valle_del_Cauca" },
    ],
  },
  "LV-RIX": {
    description:
      "The city arms as a banner: on silver a red brick wall with two towers and an open gate, a golden " +
      "lion’s head in the gateway, crossed keys under a golden cross, and a crown above; two golden lions " +
      "support the shield. The fortified towers and open gate stand for the city’s independence and " +
      "strength; the lion’s head for its citizens’ courage; the crossed keys for Saint Peter’s protection; " +
      "the cross for the Livonian Order’s authority; the crown was added under Swedish rule for the " +
      "sovereign’s power over Riga.",
    sources: [
      { title: "Rīgas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/R%C4%ABgas_%C4%A3erbonis" },
    ],
  },

  "LV-DGV": {
    description:
      "The city arms: on blue a silver wavy bar, a golden lily above and a detached silver embattled brick " +
      "wall at the base. The wavy bar is the Daugava river that runs through the city; the lily is the " +
      "Virgin Mary, the city’s patroness; the embattled wall recalls the old Dinaburg (Daugavpils) castle.",
    sources: [
      { title: "Daugavpils ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Daugavpils_%C4%A3erbonis" },
    ],
  },

  "LV-LPX": {
    description:
      "The city arms: on silver a red Courland lion with a forked tail clasping a green linden tree. The red " +
      "lion is the heraldic beast of Courland (the Duchy of Courland and Semigallia), tying the city to its " +
      "region; the linden tree stands for Liepāja itself. Granted 1625, current form confirmed 1925.",
    sources: [
      { title: "Liepājas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Liep%C4%81jas_%C4%A3erbonis" },
    ],
  },

  "LV-JEL": {
    description:
      "The city arms: on a purple field an elk’s head in natural colour bearing Latvia’s small state arms " +
      "(without stars) on its neck. The elk is the heraldic symbol of Zemgale, the region Jelgava lies in; " +
      "the state shield marks the city’s belonging to Latvia. Granted 1573, current form confirmed 1925.",
    sources: [
      { title: "Jelgavas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Jelgavas_%C4%A3erbonis" },
    ],
  },

  "LV-JUR": {
    description:
      "The city arms: a shield parted by a wavy line, silver waves below and a blue field above, with a " +
      "silver seagull in flight and three golden five-pointed stars. The seagull and waves are the seaside " +
      "resort city on the Gulf of Riga; the three stars mark its belonging to Latvia.",
    sources: [
      { title: "Jūrmalas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/J%C5%ABrmalas_%C4%A3erbonis" },
    ],
  },

  "LV-REZ": {
    description:
      "The city arms: on a sky-blue field a golden griffin holding a shield in Latvia’s national colours. " +
      "The griffin — power, valour and speed — is the emblem of Latgale, whose cultural centre is Rēzekne; " +
      "in place of the griffin’s usual sword it holds the red-white-red shield to mark the city’s allegiance " +
      "to Latvia. Designed by Rihards Zariņš, adopted 1925, restored 2000.",
    sources: [
      { title: "Rēzeknes ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/R%C4%93zeknes_%C4%A3erbonis" },
    ],
  },

  "LV-VEN": {
    description:
      "The city arms: on a purple field diapered with silver, a silver hunting horn with golden mouthpiece, " +
      "band and rim, surmounted by a golden cross. The charges date from the Livonian period and mark " +
      "Ventspils as a city within the Order’s state.",
    sources: [
      { title: "Ventspils ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Ventspils_%C4%A3erbonis" },
    ],
  },
  "LV-016": {
    description:
      "The municipality arms (from the town of Bauska): on red a golden lion bearing on its breast a small " +
      "red shield with a silver bar in the national-flag colours. The golden lion is the symbol of the " +
      "Duchy of Courland; the small red-and-silver shield marks the town’s belonging to Latvia. Adopted 1925.",
    sources: [
      { title: "Bauskas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Bauskas_%C4%A3erbonis" },
    ],
  },

  "LV-022": {
    description:
      "The municipality arms (from the town of Cēsis): on blue a red embattled brick wall with five towers " +
      "and an open portcullis gate, and above it a white-clad soldier with a raised sword and shield. The " +
      "wall stands for Cēsis Castle; the soldier for the town’s history as a knights’ town and seat of the " +
      "master of the Livonian Order. The seal dates to 1383; arms confirmed 1925.",
    sources: [
      { title: "Cēsu ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/C%C4%93su_%C4%A3erbonis" },
    ],
  },

  "LV-026": {
    description:
      "The municipality arms (from the town of Dobele): on red a silver bar in the national-flag colours " +
      "crossed by a golden-hilted sword. The sword stands for the Semigallians’ resistance against the " +
      "German crusaders. Adopted 1925.",
    sources: [
      { title: "Dobeles ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Dobeles_%C4%A3erbonis" },
    ],
  },

  "LV-033": {
    description:
      "The municipality arms (from the town of Gulbene): on black a swimming silver swan. The swan puns on " +
      "the town’s name (gulbis = “swan”); the image was drawn from a bas-relief on the façade of the old " +
      "Vecgulbene manor inn. Adopted 1938, restored 1989.",
    sources: [
      { title: "Gulbenes ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Gulbenes_%C4%A3erbonis" },
    ],
  },

  "LV-047": {
    description:
      "The municipality arms (from the town of Krāslava): on blue a silver boat with a raised sail and five " +
      "oars. The boat is navigation on the Daugava; the five oars stand for the five main peoples of the " +
      "town — Latvians, Russians, Belarusians, Poles and Jews. Adopted 1925.",
    sources: [
      { title: "Krāslavas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Kr%C4%81slavas_%C4%A3erbonis" },
    ],
  },

  "LV-050": {
    description:
      "The municipality arms (from the town of Kuldīga): on red Saint Catherine of Alexandria, the town’s " +
      "patroness, with a martyr’s crown, a stylised breaking-wheel and a rosary in her right hand and a " +
      "sword in her left. The wheel recalls her martyrdom; the imagery follows a relief over the side door " +
      "of Kuldīga’s St Catherine’s Church. Adopted 1938.",
    sources: [
      { title: "Kuldīgas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Kuld%C4%ABgas_%C4%A3erbonis" },
    ],
  },
  "LV-054": {
    description:
      "The municipality arms (from the town of Limbaži): on silver a red brick wall with two turrets and a " +
      "central dome, an open portcullis gate below the middle turret with a golden lion’s head behind it, " +
      "and a golden cross and bishop’s crozier crossed above. The design echoes Riga’s arms, marking the " +
      "town’s historic belonging to the Archbishopric of Riga. Adopted 1928.",
    sources: [
      { title: "Limbažu ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Limba%C5%BEu_%C4%A3erbonis" },
    ],
  },

  "LV-056": {
    description:
      "The municipality arms (from the town of Līvāni): on blue a silver band below and a silver hawk with " +
      "outspread wings above. The bands mark the confluence of the Dubna into the Daugava where the town " +
      "stands; the hawk is the town’s guardian and a symbol of high flight. Established 1938, current form 1996.",
    sources: [
      { title: "Līvānu ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/L%C4%ABv%C4%81nu_%C4%A3erbonis" },
    ],
  },

  "LV-058": {
    description:
      "The municipality arms (from the town of Ludza): on silver a red embattled brick wall, above it a " +
      "black key crossed by a golden-hilted sword. The wall stands for Ludza Castle; the key for the town’s " +
      "border location; the sword for the battles fought around Ludza. Adopted 1925.",
    sources: [
      { title: "Ludzas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Ludzas_%C4%A3erbonis" },
    ],
  },

  "LV-067": {
    description:
      "The municipality arms (from the town of Ogre): on blue three black pines rooted on a silver wavy bar. " +
      "The pines stand for the pine forests around Ogre; the wavy bar is the river Ogre. Adopted 1938.",
    sources: [
      { title: "Ogres ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Ogres_%C4%A3erbonis" },
    ],
  },
  "LV-068": {
    description:
      "The municipality arms (from the town of Olaine): a shield divided silver and green; on the silver " +
      "three red drops of blood, on the green a black cranberry sprig with silver leaves and two red " +
      "berries. The blood-drops mark the Olainfarm pharmaceutical works (health and life); the cranberry " +
      "the peat bogs of the region — together the industries that built the town. Adopted 1998.",
    sources: [
      { title: "Olaines ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Olaines_%C4%A3erbonis" },
    ],
  },

  "LV-073": {
    description:
      "The municipality arms (from the town of Preiļi): on gold a black raven in profile with a golden eye. " +
      "The raven — a symbol of wisdom, courage and strength and a noted counsellor in folklore — is drawn " +
      "from the arms of the von der Borch family, Preiļi’s long-time owners. Adopted 1938.",
    sources: [
      { title: "Preiļu ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Prei%C4%BCu_%C4%A3erbonis" },
    ],
  },

  "LV-080": {
    description:
      "The municipality arms: on red four silver strands woven together into a plait. Red places the " +
      "municipality in the Vidzeme region; the silver stands for wisdom, prudence and purity; the four " +
      "woven strands are its four constituent territories (Garkalne, Ropaži and Stopiņi parishes and " +
      "Vangaži town), the weave their shared history and future. Adopted 2022.",
    sources: [
      { title: "Ropažu novada ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Ropa%C5%BEu_novada_%C4%A3erbonis" },
    ],
  },

  "LV-087": {
    description:
      "The municipality arms (from the town of Salaspils): a shield divided gold and blue; on the gold a " +
      "green leafy ash tree, on the blue a silver brick wall with a gateway. The ash is the National " +
      "Botanic Garden; the blue is the Daugava; the walled gate recalls the castle that stood on Mārtiņsala " +
      "island. Adopted 1996.",
    sources: [
      { title: "Salaspils ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Salaspils_%C4%A3erbonis" },
    ],
  },

  "LV-088": {
    description:
      "The municipality arms (from the town of Saldus): on blue a silver wooden castle with towers on a " +
      "silver base. The timber fort recalls the Saldus hillfort, a Curonian stronghold at the south end of " +
      "Saldus Lake. Adopted 1925.",
    sources: [
      { title: "Saldus ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Saldus_%C4%A3erbonis" },
    ],
  },

  "LV-089": {
    description:
      "The municipality arms (from the town of Saulkrasti): a shield with, below, four silver and five green " +
      "pales, and above, a golden half-sun on blue. The four silver pales are the rivers Aģe, Pēterupe, " +
      "Inčupe and Ķīšupe; the five green ones the villages that merged to form the town; the half-sun puns " +
      "on the name (saule = “sun”). Adopted 1998.",
    sources: [
      { title: "Saulkrastu ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Saulkrastu_%C4%A3erbonis" },
    ],
  },
  "LV-091": {
    description:
      "The municipality arms (from the town of Sigulda): a shield divided diagonally, silver above and green " +
      "below, with three green leaves on the silver and three silver five-petalled ivy blossoms on the " +
      "green. The flora together stand for the natural beauty of Sigulda. Adopted 1938.",
    sources: [
      { title: "Siguldas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Siguldas_%C4%A3erbonis" },
    ],
  },

  "LV-094": {
    description:
      "The municipality arms (from the town of Smiltene): on blue three golden hills below and three silver " +
      "falcons flying to the right above. The hills are Smiltene’s Jāņu kalns, Lazdu kalns and Pilskalns; " +
      "the falcons stand for strong spirit, strength and lofty goals. Adopted 1925.",
    sources: [
      { title: "Smiltenes ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Smiltenes_%C4%A3erbonis" },
    ],
  },

  "LV-097": {
    description:
      "The municipality arms (from the town of Talsi): on gold a green hill from which rises a natural-" +
      "coloured hand holding a green wreath. The hill stands for Talsi, a town spread over nine hills; the " +
      "wreath is a symbol of strength and power, the rising hand the town’s ascent. Adopted 1925.",
    sources: [
      { title: "Talsu ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Talsu_%C4%A3erbonis" },
    ],
  },

  "LV-099": {
    description:
      "The municipality arms (from the town of Tukums): on silver a green hill bearing three green firs. The " +
      "hill is the Tukums mound; the three firs stand for the natural wealth of the town. The design dates " +
      "to 1837, confirmed by the Russian emperor in 1846 and re-confirmed by Latvia in 1925.",
    sources: [
      { title: "Tukuma ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Tukuma_%C4%A3erbonis" },
    ],
  },

  "LV-101": {
    description:
      "The municipality arms (from the town of Valka): on green an armoured hand issuing from a cloud and " +
      "holding a golden-hilted curved sword, with three golden stars. The armoured hand and sword stand for " +
      "knightly power; the cloud puns on the German name Wolke; the three stars, added in 1925, stand for " +
      "the Latvian Republic. The design goes back to 1590.",
    sources: [
      { title: "Valkas ģerbonis — Wikipedia (Latvian)", url: "https://lv.wikipedia.org/wiki/Valkas_%C4%A3erbonis" },
    ],
  },
  "IT-BA": {
    description:
      "The province arms: quartered per saltire (a St Andrew’s cross) blue and silver, with a golden " +
      "bishop’s crosier over all. The crosier stands for Saint Nicholas, patron of Bari; the arms continue " +
      "those of the historic Terra di Bari province.",
    sources: [
      { title: "Provincia di Bari — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Bari" },
    ],
  },

  "IT-CZ": {
    description:
      "The province arms (royal decree 1938): quartered per saltire — the first and third gold with four " +
      "red pales, the second and fourth silver with a black cross potent. The arms are shared with the " +
      "province of Reggio Calabria: both descend from the medieval Calabria Ulteriore, later split into a " +
      "Prima and a Seconda province.",
    sources: [
      { title: "Provincia di Catanzaro — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Catanzaro" },
    ],
  },
  "IT-CH": {
    description:
      "The province arms (royal decree 1938): on gold a natural boar’s head surmounted by a red yoke pierced " +
      "and nailed in silver. The boar’s head is a long-standing emblem of the Abruzzo; the yoke recalls the " +
      "region’s ancient peoples.",
    sources: [
      { title: "Provincia di Chieti — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Chieti" },
    ],
  },

  "IT-GO": {
    description:
      "The province arms: per bend, the first blue with a crowned golden lion, the second barry of silver " +
      "and red. It repeats the arms of the medieval County of Gorizia: the lion stood for the counts’ " +
      "authority, the red-and-silver bars for their vassalage to the Patriarchate of Aquileia. Recognised " +
      "1929.",
    sources: [
      { title: "Provincia di Gorizia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Gorizia" },
    ],
  },

  "IT-IS": {
    description:
      "The province arms: quartered, combining the arms of its four chief towns — Isernia (a silver " +
      "S-shaped serpent holding a baton of command on blue), Agnone (a golden hippogriff seizing an antique " +
      "letter A on red), Venafro (three silver bands on black) and Frosolone (a dove and a letter F with a " +
      "star, gold on blue).",
    sources: [
      { title: "Provincia di Isernia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Isernia" },
    ],
  },

  "IT-KR": {
    description:
      "The province arms: divided in three — on blue six golden eight-pointed stars in two rows; on gold a " +
      "black anchor with a red stock; on green seven golden ears of wheat bound in red — an anchor for the " +
      "Ionian port city and ears of wheat for its farmland.",
    sources: [
      { title: "Provincia di Crotone — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Crotone" },
    ],
  },
  "IT-FI": {
    description:
      "The arms (Florence’s civic arms, carried by the metropolitan city): on a silver field an open red " +
      "lily (the giglio). The lily has stood for Florence since the 11th century; in 1251 the ruling Guelphs " +
      "inverted the older white-on-red to red-on-white to set themselves apart from the exiled Ghibellines. " +
      "It is often linked to the wild iris that grew around the city and to the Roman name Florentia.",
    sources: [
      { title: "Stemma di Firenze — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Stemma_di_Firenze" },
    ],
  },

  "IT-GR": {
    description:
      "The arms (from the city of Grosseto): a griffin on a red shield, later given a sword. The griffin, a " +
      "winged mythical beast, evokes the Etruscan origins of the Grosseto people; the sword is traditionally " +
      "tied to 1328, when the city withstood the siege of Ludwig of Bavaria.",
    sources: [
      { title: "Grosseto — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Grosseto" },
    ],
  },
  "IT-LC": {
    description:
      "The province arms: per pale and per fess — a green field with a red six-petalled Alpine flower, a " +
      "silver field with a red cross (the Visconti of Milan), and a blue field with a golden lion. The " +
      "Alpine flower is local craft tradition, the cross the Visconti lordship, the blue the lake and the " +
      "lion the people’s tenacity.",
    sources: [
      { title: "Provincia di Lecco — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Lecco" },
    ],
  },

  "IT-LO": {
    description:
      "The province arms: per pale, the first green with a silver bendlet-sinister, the second red with a " +
      "golden bend.",
    sources: [
      { title: "Provincia di Lodi — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Lodi" },
    ],
  },

  "IT-LT": {
    description:
      "The province arms (presidential decree 1954): a sky field crossed by a green band edged silver and " +
      "charged with three ears of wheat, a black-windowed tower on three hills above and an anchor in a " +
      "rough sea below. The green band is the wheat-growing Pontine plain dividing sea from mountain; the " +
      "tower recalls the hill towns and their watchtowers, the anchor the coast’s maritime past.",
    sources: [
      { title: "Provincia di Latina — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Latina" },
    ],
  },

  "IT-MB": {
    description:
      "The province arms (presidential decree 2022): on green a silver Celtic triskele meeting at the point " +
      "of honour. It draws on the Celtic root of “Brianza” (brig, “hill”) and on the local rivers, the " +
      "triskele’s three arms evoking the waterways that divide the territory.",
    sources: [
      { title: "Provincia di Monza e della Brianza — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Monza_e_della_Brianza" },
    ],
  },
  "IT-CE": {
    description:
      "The province arms: on blue two golden cornucopias crossed at the base and passed through a " +
      "marquess’s crown, the right one heaped with ears of wheat and the left with fruit. The overflowing " +
      "horns of plenty stand for the fertility of the Terra di Lavoro, the historic land Caserta inherited.",
    sources: [
      { title: "File:Provincia di Caserta-Stemma.svg — Wikimedia Commons (blazon)", url: "https://commons.wikimedia.org/wiki/File:Provincia_di_Caserta-Stemma.svg" },
    ],
  },
  "IT-MI": {
    description:
      "The metropolitan-city arms: on blue a golden sun with wavy and pointed rays and a silver crescent " +
      "moon, beneath a silver chief charged with a red cross — the historic cross of the comune of Milan.",
    sources: [
      { title: "Città metropolitana di Milano — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Citt%C3%A0_metropolitana_di_Milano" },
    ],
  },

  "IT-MS": {
    description:
      "The province arms: on blue a natural chain of mountains rising from the base, above it a silver " +
      "crescent surmounted by a golden star. The motto is “Extollunt marmora lunam” (the marbles exalt the " +
      "moon), a reference to the province’s famous Carrara marble.",
    sources: [
      { title: "Provincia di Massa-Carrara — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Massa-Carrara" },
    ],
  },

  "IT-NA": {
    description:
      "The metropolitan-city arms: on gold a black rampant horse — the historic emblem of Naples, the " +
      "unbridled “Corsiero del Sole”.",
    sources: [
      { title: "Città metropolitana di Napoli — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Citt%C3%A0_metropolitana_di_Napoli" },
    ],
  },

  "IT-OR": {
    description:
      "The province arms: on silver a stylised uprooted green leafy tree.",
    sources: [
      { title: "Provincia di Oristano — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Oristano" },
    ],
  },

  "IT-MT": {
    description:
      "The arms (from the city of Matera): on blue a standing silver ox with three ears of wheat in its " +
      "mouth and a fleuron crown on its horns, topped by a letter M, all in gold. The ox with the wheat is " +
      "canting arms — the Greek for wheat with the ox forms “Mather-Eros”, echoing Matera; the crown marks " +
      "the city as a free royal town of the Regio Demanio. Motto: “Bos lassus firmius figit pedem” (the " +
      "tired ox plants its foot more firmly), recalling the 1514 revolt.",
    sources: [
      { title: "Matera — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Matera" },
    ],
  },
  "IT-PC": {
    description:
      "The province arms: on red a silver die (a square block), ensigned with the golden provincial crown " +
      "wreathed in oak and laurel with golden berries.",
    sources: [
      { title: "Provincia di Piacenza — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Piacenza" },
    ],
  },

  "IT-PE": {
    description:
      "The province arms: per pale — the first a sky field with a river rising from three mountains and " +
      "flowing to a sea on which a sailing boat rides (the province from mountains to coast); the second " +
      "green with a natural boar, alluding to the theory that “Abruzzo” derives from the Latin aper (boar).",
    sources: [
      { title: "Provincia di Pescara — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Pescara" },
    ],
  },

  "IT-PG": {
    description:
      "The province arms (from the city of Perugia): on red a silver griffin passant, crowned and armed in " +
      "gold. The griffin has been Perugia’s emblem since the 11th century and reproduces an Etruscan bronze " +
      "over the door of the Palazzo dei Priori.",
    sources: [
      { title: "Provincia di Perugia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Perugia" },
    ],
  },

  "IT-PN": {
    description:
      "The province arms: on blue with a golden border, the goddess Concordia holding an olive sprig in her " +
      "right hand and a cornucopia of fruit in her left. Motto: “Concordia parvae res crescunt” (in harmony " +
      "small things grow), from Sallust — the province’s ideal of concord and prosperity.",
    sources: [
      { title: "Provincia di Pordenone — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Pordenone" },
    ],
  },
  "IT-PA": {
    description:
      "The arms (from the city of Palermo): on red a golden Roman eagle with open wings holding in its " +
      "talons a band with the letters S.P.Q.P. — Senatus Populusque Panormitanus, “the Senate and People of " +
      "Palermo”, on the Roman model.",
    sources: [
      { title: "Palermo — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Palermo" },
    ],
  },

  "IT-PI": {
    description:
      "The arms (from the city of Pisa): on red a white Pisan cross — a cross patty with forked ends studded " +
      "with twelve small spheres. Red and the Pisan cross have marked the city’s arms since the medieval " +
      "republic.",
    sources: [
      { title: "Pisa — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Pisa" },
    ],
  },

  "IT-PU": {
    description:
      "The province arms (royal decree 1938): per pale, Pesaro and Urbino combined — Pesaro’s golden oak of " +
      "the Della Rovere with the motto “Perpetua et firma fidelitas”, and Urbino’s three golden bends with a " +
      "black eagle, from the Montefeltro. The two halves join the arms of the province’s historic ducal houses.",
    sources: [
      { title: "Provincia di Pesaro e Urbino — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Pesaro_e_Urbino" },
    ],
  },

  "IT-RA": {
    description:
      "The province arms (from the city of Ravenna): on gold a red eagle.",
    sources: [
      { title: "Provincia di Ravenna — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Ravenna" },
    ],
  },
  "IT-RC": {
    description:
      "The arms (from the city of Reggio Calabria, carried by the metropolitan city): on blue, all in gold, " +
      "Saint George on horseback spearing the dragon, beside him a kneeling crowned maiden haloed with rays " +
      "of light, ringed by the motto “Urbs Rhegina nobilis insignis fidelissima provinciae prima mater et " +
      "caput” and topped by an Aragonese royal crown.",
    sources: [
      { title: "Reggio Calabria — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Reggio_Calabria" },
    ],
  },
  "IT-PO": {
    description:
      "The arms (from the city of Prato): on red strewn with golden lilies, an Angevin chief. The design " +
      "dates from 1313, when Prato put itself under the protection of King Robert of Anjou, and has been the " +
      "city’s emblem since the 13th century.",
    sources: [
      { title: "Prato — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Prato_(Italia)" },
    ],
  },

  "IT-PZ": {
    description:
      "The arms (from the city of Potenza, decree 1942): on blue a golden crowned lion resting on a lowered " +
      "red band, with three silver stars in the chief.",
    sources: [
      { title: "Potenza — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Potenza_(Italia)" },
    ],
  },
  "IT-RI": {
    description:
      "The province arms: on red a red band edged gold bearing the letters S.P.Q.S. (Senatus Populusque " +
      "Sabinus) alternating with three groups of interlaced gold rings. Motto: “Tota Sabina Civitas” (all " +
      "Sabina as one community).",
    sources: [
      { title: "Provincia di Rieti — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Rieti" },
    ],
  },

  "IT-RN": {
    description:
      "The province arms: a sky field with a golden four-masted sailing ship, red-trimmed, riding a wavy " +
      "silver-and-blue sea. The vessel is taken from a bas-relief by Agostino di Duccio in Rimini’s Tempio " +
      "Malatestiano.",
    sources: [
      { title: "Provincia di Rimini — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Rimini" },
    ],
  },

  "IT-SA": {
    description:
      "The province arms: on blue a silver Cross of Amalfi, adopted by the province in 2010 from the arms of " +
      "the former maritime republic of Amalfi.",
    sources: [
      { title: "Provincia di Salerno — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Salerno" },
    ],
  },
  "IT-RE": {
    description:
      "The arms (from the city of Reggio Emilia): on silver a red cross cantoned by the letters S.P.Q.R., " +
      "recalling the city’s Roman origin under the consul Marcus Aemilius Lepidus. Motto: “Pace belloque " +
      "fidelis” (faithful in peace and war).",
    sources: [
      { title: "Reggio Emilia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Reggio_Emilia" },
    ],
  },

  "IT-RM": {
    description:
      "The arms (from Rome, carried by the metropolitan city Roma Capitale): a pointed purple shield with a " +
      "golden Greek cross and the golden letters S.P.Q.R. set bendwise, topped by a gold crown. S.P.Q.R. — " +
      "Senatus Populusque Romanus — is the ancient formula for the Senate and People of Rome.",
    sources: [
      { title: "Roma — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Roma" },
    ],
  },

  "IT-RO": {
    description:
      "The province arms (from the city of Rovigo): per pale — the first blue with a natural loopholed wall " +
      "of three towers surmounted by a silver passant Lion of Saint Mark (Venetian rule); the second per " +
      "fess silver and green for the fertile Polesine plain.",
    sources: [
      { title: "Rovigo — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Rovigo" },
    ],
  },
  "IT-SO": {
    description:
      "The province arms: quartered, combining the emblems of its historic towns — Bormio, Tirano (a castle " +
      "with the imperial eagle of the Visconti Venosta), Morbegno (keys and sword for Saints Peter and " +
      "Paul), Chiavenna (crossed keys) and Sondrio (crossed swords and palms for the soldier-martyrs " +
      "Gervasius and Protasius, with the lily of the Masegra captains).",
    sources: [
      { title: "Provincia di Sondrio — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Sondrio" },
    ],
  },

  "IT-SP": {
    description:
      "The province arms: on blue a natural stone tower of two Ghibelline-battlemented tiers on a green " +
      "three-peaked mount, bearing a crowned black eagle, beneath a black chief with a silver crescent and " +
      "an eight-pointed golden star. The crescent and the motto “Civium Romanorum colonia” recall the " +
      "ancient Roman colony of Luni.",
    sources: [
      { title: "Provincia della Spezia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_della_Spezia" },
    ],
  },

  "IT-SR": {
    description:
      "The province arms: on green a silver bend flanked by the two faces of the ancient silver Demareteion " +
      "coin of Syracuse — the obverse with the legend ΣΥΡΑΚΟΣΙΟΝ, the reverse with a flying Victory crowning " +
      "a chariot team above a running lion.",
    sources: [
      { title: "Libero consorzio comunale di Siracusa — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Libero_consorzio_comunale_di_Siracusa" },
    ],
  },

  "IT-SS": {
    description:
      "The province arms (royal decree 1938): quartered — the first and fourth blue with a silver cross (the " +
      "Savoy cross), the second and third red with a golden battlemented tower (the Tower of the Judicate of " +
      "Torres).",
    sources: [
      { title: "Provincia di Sassari — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Sassari" },
    ],
  },

  "IT-SV": {
    description:
      "The province arms: a sky field with a caravel under full sail on a wavy silver-and-blue sea, and a " +
      "silver scroll with the motto “Par paribus”. The ship celebrates the province’s maritime past — " +
      "Savona’s historic port and Noli’s standing as a maritime republic.",
    sources: [
      { title: "Provincia di Savona — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Savona" },
    ],
  },

  "IT-TN": {
    description:
      "The autonomous province’s emblem is the eagle of Saint Wenceslas, adopted from the seal granted to " +
      "Bishop Nicolò da Bruna in 1339 and still the symbol of Trentino today.",
    sources: [
      { title: "Provincia autonoma di Trento — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_autonoma_di_Trento" },
    ],
  },

  "IT-TV": {
    description:
      "The province arms: on blue a silver bar bearing the black name TARVISIUM, above it a Guelph-" +
      "battlemented castle of three towers. It derives from the seal of the capital city, Treviso; the " +
      "inscription round the shield names the bounds of the Marca Trevigiana.",
    sources: [
      { title: "Provincia di Treviso — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Treviso" },
    ],
  },
  "IT-TO": {
    description:
      "The arms (from the city of Turin, carried by the metropolitan city): on a blue shield a golden " +
      "rampant bull with silver horns, ensigned with a comital crown. The bull is canting — it stands for " +
      "the ancient Taurini people from whom the city takes its name.",
    sources: [
      { title: "Torino — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Torino" },
    ],
  },

  "IT-TP": {
    description:
      "The arms (from the city of Trapani): on red a golden bridge of towers on a wavy sea, surmounted by a " +
      "golden sickle laid fesswise. The sickle is canting — the Greek Drépanon, “sickle”, named the city for " +
      "the crescent-shaped peninsula on which it sits.",
    sources: [
      { title: "Trapani — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Trapani" },
    ],
  },

  "IT-VB": {
    description:
      "The province arms: per fess — above, on red a golden key palewise flanked by two silver three-peaked " +
      "mountains; below, on silver three half-wavy blue bands. The mountains are the Alps, the key the " +
      "Simplon Pass as Italy’s gateway, the waves the province’s many lakes and the arms of the Borromeo " +
      "family long tied to the territory.",
    sources: [
      { title: "Provincia del Verbano-Cusio-Ossola — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_del_Verbano-Cusio-Ossola" },
    ],
  },
  "IT-VA": {
    description:
      "The province arms: silver quartered by a slender red cross — the first quarter Saint Victor (patron " +
      "of Varese), the second a rooster (Gallarate), the third a flaming letter B (Busto Arsizio), the " +
      "fourth a castle (Saronno). The four charges reflect the province’s polycentric structure around its " +
      "chief towns.",
    sources: [
      { title: "Provincia di Varese — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Varese" },
    ],
  },


  "IT-VV": {
    description:
      "The province arms: divided in three — on gold a black tau cross, on blue the upper part of a silver " +
      "Doric column, on red a golden lion. The Doric column recalls the area’s Greek colonisation; the tau " +
      "cross is a mark characteristic of Calabria; the lion alludes to the capital’s former name, Monteleone " +
      "Calabro.",
    sources: [
      { title: "Provincia di Vibo Valentia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Provincia_di_Vibo_Valentia" },
    ],
  },
  "IT-VE": {
    description:
      "The arms (from the city of Venice, carried by the metropolitan city): on blue the golden winged and " +
      "haloed Lion of Saint Mark, seated face-on, holding an open silver book inscribed “PAX TIBI MARCE " +
      "EVANGELISTA MEUS” (Peace to you, Mark, my Evangelist). The lion is the emblem of Saint Mark, patron " +
      "of Venice and of its former maritime republic.",
    sources: [
      { title: "Venezia — Wikipedia (Italian)", url: "https://it.wikipedia.org/wiki/Venezia" },
    ],
  },

  // ── South Sudan states ─────────────────────────────────────────────────────
  // Designs from the official state flags and Flags of the World (FOTW). Only
  // Eastern Equatoria's colours/emblem carry a documented meaning; for the other
  // states the emblem (an animal or resource) is described as depicted — no
  // symbolic meaning is asserted beyond what the source states.
  "SS-EC": {
    description:
      "A green field bearing a white disc that contains a black rhinoceros — the state emblem — with " +
      "“CENTRAL EQUATORIA” arched above and “STATE” below. Central Equatoria is the state surrounding " +
      "the national capital, Juba.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
    ],
  },
  "SS-EE": {
    description:
      "Four horizontal stripes of yellow, black and red charged with a green oval that bears a cheetah. " +
      "Yellow stands for the state’s mineral resources, black for its African inhabitants and red for the " +
      "blood shed in the liberation struggle; the green oval represents vegetation and agriculture, and the " +
      "cheetah the pace of the state’s development.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
    ],
  },
  "SS-EW": {
    description:
      "A green field bearing a green disc charged with a pineapple, the state emblem. Western Equatoria, in " +
      "South Sudan’s fertile southern “green belt”, is one of the country’s main crop- and fruit-growing " +
      "regions.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
      { title: "Western Equatoria — Wikipedia", url: "https://en.wikipedia.org/wiki/Western_Equatoria" },
    ],
  },
  "SS-JG": {
    description:
      "A white field bearing a roundel in which a white long-horned ox stands on green ground beneath a blue " +
      "sky, with a “JONGLEI STATE” scroll below. Cattle are central to the pastoral life of Jonglei’s Dinka, " +
      "Nuer and Murle communities.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
      { title: "Jonglei — Wikipedia", url: "https://en.wikipedia.org/wiki/Jonglei" },
    ],
  },
  "SS-LK": {
    description:
      "A light-blue field bearing a white disc that shows a shoebill standing in wetland, with a “LAKES " +
      "STATE” scroll below. (An earlier version placed the emblem in a green roundel on a white field.)",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
    ],
  },
  "SS-BN": {
    description:
      "A white field bearing the state arms: a grey crowned crane standing in a pale-blue disc within a " +
      "laurel wreath, over a yellow scroll carrying the state’s name in Arabic and a “NORTHERN BAHR EL " +
      "GHAZAL STATE” banner.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
    ],
  },
  "SS-BW": {
    description:
      "A white field bearing a blue disc in which a golden sunburst surrounds a white inner circle showing a " +
      "gazelle on green ground — the emblem of Western Bahr el Ghazal.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
    ],
  },
  "SS-NU": {
    description:
      "A blue field bearing a brown traditional shield charged with a crossed spear and arrow, over a white " +
      "scroll with the state’s name in Arabic (أعالي النيل, “Upper Nile”). The state takes its name from the " +
      "upper reaches of the White Nile that run through it.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
      { title: "Upper Nile (state) — Wikipedia", url: "https://en.wikipedia.org/wiki/Upper_Nile_(state)" },
    ],
  },
  "SS-UY": {
    description:
      "A yellow field bearing a black oil-drilling derrick topped by a flame, flanked by a green wreath, above " +
      "a “UNITY STATE” scroll. The derrick reflects Unity — home to the Bentiu oilfields — as one of South " +
      "Sudan’s principal oil-producing states.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
      { title: "Unity (state) — Wikipedia", url: "https://en.wikipedia.org/wiki/Unity_(state)" },
    ],
  },
  "SS-WR": {
    description:
      "A white field bearing the state arms: a white long-horned bull’s head above stylised water within a " +
      "pale-blue disc and a laurel wreath, over a “WARRAP STATE” scroll. Warrap is a cattle-herding region of " +
      "the Bahr el Ghazal.",
    sources: [
      { title: "State and County flags of South Sudan — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ss-state.html" },
    ],
  },

  // ── Papua New Guinea provinces ─────────────────────────────────────────────
  // Provincial flag symbolism documented per-province by Flags of the World (FOTW).
  "PG-CPM": {
    description:
      "A blue and red field bearing a lakatoi (traditional canoe) silhouette, one large star and five smaller " +
      "stars. The lakatoi represents tradition and sits over the blue, which is the sea; the large star stands " +
      "for the province and the five small stars for its five districts, over the red, which is the land.",
    sources: [
      { title: "Central Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-ce.html" },
    ],
  },
  "PG-CPK": {
    description:
      "A flag carrying the bird of paradise and Southern Cross of the national flag together with two red " +
      "spears, a white chain and a yellow coffee branch. The two red spears represent leadership, the white " +
      "chain unity, and the coffee branch the province’s main cash crop.",
    sources: [
      { title: "Simbu (Chimbu) Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-si.html" },
    ],
  },
  "PG-EBR": {
    description:
      "A green diagonal stripe separates a black upper field bearing the four white stars of the Southern " +
      "Cross from a red lower field, with a central disc showing two traditional masks — the Duk-duk mask of " +
      "the Tolai secret society and the fire-dance mask of the Baining — amid shell money. The masks stand for " +
      "the province’s indigenous cultures.",
    sources: [
      { title: "East New Britain Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-en.html" },
    ],
  },
  "PG-EHG": {
    description:
      "Red and green triangles behind a large yellow six-pointed star bearing Nokondi — a legendary one-legged " +
      "man of local folklore — holding a coffee branch, encircled by eight smaller stars. The six points stand " +
      "for the six districts, the eight small stars for the local government councils, and the coffee branch " +
      "for the main cash crop.",
    sources: [
      { title: "Eastern Highlands Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-eh.html" },
    ],
  },
  "PG-EPW": {
    description:
      "Black and green triangles bearing a Dendrobium engae orchid — the provincial flower. The black recalls " +
      "the national flag and the green represents the region’s vegetation.",
    sources: [
      { title: "Enga Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-eg.html" },
    ],
  },
  "PG-ESW": {
    description:
      "Quartered red and green, with a yellow bird of paradise on the red and, on the green, a haus tambaran " +
      "(spirit house), crocodile, shark, kundu and garamut drums, a spear and a lime pot. The bird of paradise " +
      "recalls the national flag; the haus tambaran represents the hill and plains people, the crocodile the " +
      "river people and the shark the coast people, while the drums, spear and lime pot stand for culture.",
    sources: [
      { title: "East Sepik Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-es.html" },
    ],
  },
  "PG-GPK": {
    description:
      "A blue field with two crocodiles flanking a central disc: a white seagull over red above the Southern " +
      "Cross over black. The crocodiles represent the province’s rivers, the seagull its people and the " +
      "Southern Cross its five original districts.",
    sources: [
      { title: "Gulf Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-gu.html" },
    ],
  },
  "PG-HLA": {
    description:
      "Horizontal yellow, green and black stripes bearing a traditional Hela hat on the green, a red bird of " +
      "paradise on the yellow, and five white stars in a crescent on the black. The bird of paradise stands " +
      "for Papua New Guinea; the four larger stars represent the sons and the small star the daughter of Hela " +
      "(Hewa), the ancestor from whom, by oral tradition, the Huli descend.",
    sources: [
      { title: "Hela Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-he.html" },
    ],
  },
  "PG-JWK": {
    description:
      "Dark green over gold, divided by a white diagonal stripe, bearing a bird of paradise, a gerupeng " +
      "(traditional headdress), a kundu drum and spear, and four stars. The bird of paradise shows Jiwaka is " +
      "part of PNG; the gerupeng is the province’s own emblem; the kundu and spear stand for Highlands " +
      "identity; the four stars for the Jimi, North Waghi, South Waghi and Kambia peoples; green for the " +
      "province’s forests and resources, gold for its fertile land and the white stripe for its rivers.",
    sources: [
      { title: "Jiwaka Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-ji.html" },
    ],
  },
  "PG-MBA": {
    description:
      "Green and white stripes at the hoist and a square divided into blue and red triangles bearing a golden " +
      "star. Green stands for plants, white for beaches, blue for the sea and red for festivals; the star " +
      "represents the Eastern Star (a seafarer’s guide) and the Christian missionaries.",
    sources: [
      { title: "Milne Bay Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-mb.html" },
    ],
  },
  "PG-MPL": {
    description:
      "Three horizontal stripes — green, yellow and blue — bearing a white bird of paradise, white pig’s " +
      "tusks, a kundu drum and spears. Green is for vegetation, yellow for the Markham Valley and blue for the " +
      "sea; the bird of paradise stands for animal life, the pig’s tusks for traditional exchange, the drum " +
      "for festivals and the spears for traditional warfare.",
    sources: [
      { title: "Morobe Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-mo.html" },
    ],
  },
  "PG-MPM": {
    description:
      "Red, yellow and black horizontal stripes recalling the national flag, with a white canton bearing a " +
      "memorial to the WWII coast-watchers, flanked by coconut-palm branches and a slit drum, and six white " +
      "stars. The palm branches stand for agriculture, the slit drum for tradition and the six stars for the " +
      "six districts.",
    sources: [
      { title: "Madang Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-md.html" },
    ],
  },
  "PG-MRL": {
    description:
      "Brown and blue triangles bearing a yellow Manus friarbird (the “Chauka”) and five green snails. Brown " +
      "stands for the inland people and blue for the island people; the Chauka — which by tradition heralds " +
      "dawn and dusk and warns of danger — and the snail are both unique to Manus, and the five snails " +
      "represent its five regions.",
    sources: [
      { title: "Manus Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-ma.html" },
    ],
  },
  "PG-NCD": {
    description:
      "A yellow field bearing a circular emblem with a lakatoi (the traditional canoe of the local Motu " +
      "people) and the words “National Capital District Commission / NCDC”. The National Capital District is " +
      "Port Moresby, the national capital.",
    sources: [
      { title: "National Capital District (Port Moresby) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-nc.html" },
    ],
  },
  "PG-NIK": {
    description:
      "A blue and orange field bearing the Southern Cross on the blue and a paradise-drongo silhouette on the " +
      "orange. Blue is the sea and the Southern Cross a guide to seafarers and marker of the seasons; the " +
      "paradise drongo is a bird found only in New Ireland.",
    sources: [
      { title: "New Ireland Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-ni.html" },
    ],
  },
  "PG-NPP": {
    description:
      "A green field bearing a gold strip of tapa (bark cloth) with red and black markings and a yellow Queen " +
      "Alexandra’s birdwing butterfly. The tapa cloth represents culture, the butterfly (the world’s largest, " +
      "native to the province) wildlife, and the green vegetation.",
    sources: [
      { title: "Oro (Northern) Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-or.html" },
    ],
  },
  "PG-NSB": {
    description:
      "A blue field with a central black disc ringed by a jagged white circle and green, bearing a red-and-" +
      "white upei (traditional hat). Blue is the Pacific Ocean, the green the rich island, the jagged white " +
      "ring shell money, and the black disc the islanders’ skin colour, of which they are proud; the upei is " +
      "worn by young men at the passage from adolescence to manhood.",
    sources: [
      { title: "Bougainville / North Solomons — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-ns.html" },
    ],
  },
  "PG-SAN": {
    description:
      "Black and red triangles bearing a gold bird of paradise over the red, and six stars above a light-blue " +
      "setting sun with yellow rays. The setting sun gives the province its name — sandaun is Tok Pisin for " +
      "“sunset” (the west) — and the six stars stand for its six original districts (Aitape, Lumi, Nuku, " +
      "Telefomin, Vanimo and Green River).",
    sources: [
      { title: "Sandaun (West Sepik) Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-sa.html" },
    ],
  },
  "PG-SHM": {
    description:
      "Red and green triangles separated by a black stripe, bearing seven white stars, a yellow cassowary head " +
      "and two yellow spears. The seven stars stand for the seven districts, the cassowary for traditional " +
      "exchange and the spears for defence.",
    sources: [
      { title: "Southern Highlands Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-sh.html" },
    ],
  },
  "PG-WBK": {
    description:
      "A blue field, for the sea, bearing a white, brown and gold conch shell beside the national flag. The " +
      "conch shell represents communication.",
    sources: [
      { title: "West New Britain Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-wn.html" },
    ],
  },
  "PG-WHM": {
    description:
      "A white stripe divides a green upper triangle from a black lower one, with the provincial emblem and " +
      "stars. The white stands for peace, the green for vegetation and the black recalls the national flag; " +
      "the stars represent the province’s three geographic regions.",
    sources: [
      { title: "Western Highlands Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-wh.html" },
    ],
  },
  "PG-WPD": {
    description:
      "Black and red borders frame a gold square bearing the provincial emblem — a headdress of white crane " +
      "wing feathers with a bow and arrows. The crane feathers represent unity and the bow and arrows " +
      "tradition.",
    sources: [
      { title: "Western (Fly River) Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pg-we.html" },
    ],
  },

  // ── Ethiopia regions & chartered cities ────────────────────────────────────
  // Designs and (where documented) symbolism from Flags of the World (FOTW).
  "ET-TI": {
    description:
      "A red field bearing a yellow star and the regional emblem. The yellow represents fertility, hope and " +
      "security; the red the history of the Tigrayan people, patriotism and sacrifice; and the star equality " +
      "and unity with all the peoples of the world.",
    sources: [
      { title: "Tigray National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-ti.html" },
    ],
  },
  "ET-AM": {
    description:
      "A golden field crossed by a broad red diagonal charged with a golden star, with the regional emblem (a " +
      "crowned lion holding a cross, in the Solomonic tradition). The yellow stands for the Amhara people’s " +
      "hope of economic and social prosperity, the red for their sacrifice and struggle for peace, democracy " +
      "and freedom, and the star for their hope of living with other peoples in unity, love and caring.",
    sources: [
      { title: "Amhara National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-am.html" },
    ],
  },
  "ET-OR": {
    description:
      "A horizontal red, white and black tricolour bearing an oda (sycamore fig) tree. In Oromo tradition the " +
      "three colours stand for time — black for the past, red for the present and white for the future — and " +
      "the oda is the tree under which Gada leaders gather for traditional assembly.",
    sources: [
      { title: "Oromiya National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-or.html" },
    ],
  },
  "ET-AF": {
    description:
      "A red triangle at the hoist with horizontal blue, white and green stripes, bearing the regional emblem " +
      "with a traditional dagger. The green stands for fertility, the blue for the region’s water and mineral " +
      "wealth and the white for peace and stability; the dagger (jile) is a traditional Afar implement.",
    sources: [
      { title: "Afar National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-af.html" },
    ],
  },
  "ET-SO": {
    description:
      "A horizontal green, white and dark-red tricolour with a light-blue triangle at the hoist bearing a " +
      "white star — the design restored in 2018, echoing the star-and-blue of the Somali flag. (A 2008–2018 " +
      "version used a yellow triangle with a camel.)",
    sources: [
      { title: "Somali National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-so.html" },
    ],
  },
  "ET-BE": {
    description:
      "A horizontal tricolour of black, gold and green with a red triangle at the hoist (later given a white " +
      "border). The colours are a rearrangement of the neighbouring Sudanese flag’s, with gold in place of " +
      "white.",
    sources: [
      { title: "Benishangul/Gumuz National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-be.html" },
    ],
  },
  "ET-GA": {
    description:
      "Four horizontal stripes of black, green, white and red with a black five-pointed star on the white " +
      "stripe — a design associated with the region’s diversity.",
    sources: [
      { title: "Gambela National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-ga.html" },
    ],
  },
  "ET-SI": {
    description:
      "A horizontal green, blue and red tricolour with white fimbriation between the stripes and five " +
      "five-pointed stars arranged in a circle on the central blue stripe.",
    sources: [
      { title: "Sidama Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-sid.html" },
    ],
  },
  "ET-HA": {
    description:
      "Unequal horizontal stripes — white, red, white, green, white, the central white being the broadest — " +
      "bearing the regional emblem on the central stripe.",
    sources: [
      { title: "Harari National Regional State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-ha.html" },
    ],
  },
  "ET-SN": {
    description:
      "A horizontal blue, white and red tricolour bearing the regional state emblem at the centre. (This is " +
      "the flag of the former Southern Nations, Nationalities and Peoples’ Region.)",
    sources: [
      { title: "Southern Nations, Nationalities and Peoples’ Region — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-sn.html" },
    ],
  },
  "ET-AA": {
    description:
      "A white field bearing the emblem of the Addis Ababa city administration at the centre. Addis Ababa is " +
      "Ethiopia’s capital and a self-governing chartered city.",
    sources: [
      { title: "Addis Ababa Administrative Region — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-aa.html" },
    ],
  },
  "ET-DD": {
    description:
      "A pale-grey field bearing the emblem of the Dire Dawa city administration at the centre. Dire Dawa is a " +
      "self-governing chartered city.",
    sources: [
      { title: "Dire Dawa Administrative Council — Flags of the World", url: "https://www.crwflags.com/fotw/flags/et-dd.html" },
    ],
  },

  // ── Solomon Islands provinces ──────────────────────────────────────────────
  // Designs and (where documented) symbolism from Flags of the World (FOTW).
  "SB-CE": {
    description:
      "A dark-blue field, for the encircling Pacific, with six white six-pointed stars in the canton for the " +
      "province’s parishes (Aeaun, Mbanika, Nggela, Russell, Savo and Tulagi) and, in the fly, an oval emblem " +
      "showing a lagoon with two palm-clad islands.",
    sources: [
      { title: "Central Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-ct.html" },
    ],
  },
  "SB-CH": {
    description:
      "Horizontal blue, yellow, green, red and black stripes bearing white stars and a white disc with a black " +
      "Kuvojo (the Choiseul crested pigeon, a bird endemic to the island and now presumed extinct). Blue " +
      "stands for the Pacific, yellow for the land of Choiseul, green for its flora, red for its fauna and " +
      "black for the Melanesian people; the stars represent the island’s four church districts.",
    sources: [
      { title: "Choiseul Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-ch.html" },
    ],
  },
  "SB-GU": {
    description:
      "A brown field bearing a central emblem with a white zigzag band and a black eagle. The island’s name " +
      "was given by the Spanish explorer Álvaro de Mendaña after his home town of Guadalcanal in Spain.",
    sources: [
      { title: "Guadalcanal Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-gu.html" },
    ],
  },
  "SB-IS": {
    description:
      "A yellow and green field with a hoist triangle, bearing a blue disc that contains an axe.",
    sources: [
      { title: "Isabel Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-is.html" },
    ],
  },
  "SB-MK": {
    description:
      "Horizontal blue, white and red stripes with the national flag in the upper hoist canton and, where the " +
      "white stripes meet, a yellow disc bearing an urn and seven purple stars.",
    sources: [
      { title: "Makira and Ulawa Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-mk.html" },
    ],
  },
  "SB-ML": {
    description:
      "A red, white and blue horizontal tricolour with the national flag in the canton and, in the fly, an " +
      "orange-bordered white disc bearing a flying eagle that clutches a sword.",
    sources: [
      { title: "Malaita Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-ml.html" },
    ],
  },
  "SB-RB": {
    description:
      "Three vertical stripes of light blue, white and light blue, with a black naval crown of three pirogues " +
      "(outrigger canoes) on the white. The light blue stands for the Pacific and Lake Te Nggano, and the " +
      "white for peace between the province’s Polynesian people and the wider Melanesian Solomon Islands.",
    sources: [
      { title: "Rennell and Bellona Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-rb.html" },
    ],
  },
  "SB-TE": {
    description:
      "A red field with the national flag in the canton and two white five-pointed stars in the fly.",
    sources: [
      { title: "Temotu Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-te.html" },
    ],
  },
  "SB-WE": {
    description:
      "A field divided by a diagonal wave into black above and green below.",
    sources: [
      { title: "Western Province — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-we.html" },
    ],
  },
  "SB-CT": {
    description:
      "A white field bearing the seal of the Honiara City Council — green, yellow and green bars with a white " +
      "star, ringed by the council’s name — for the national capital.",
    sources: [
      { title: "Honiara — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sb-honia.html" },
    ],
  },

  // ── Liberia counties ───────────────────────────────────────────────────────
  // Liberia's county flags were introduced in 1965 under President Tubman; each
  // bears the national flag in the canton, and their quilt-like designs carry
  // documented symbolism. Designs and symbolism from Flags of the World (FOTW).
  "LR-NI": {
    description:
      "The national flag in the canton with a central globe on bands of colour. The red, white and blue stand " +
      "for valour, purity and fidelity; the globe represents Nimba County; the brown is for the county’s iron-" +
      "ore deposits, the green for its forests and the light blue for the sky.",
    sources: [
      { title: "Nimba County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-ni.html" },
    ],
  },
  "LR-GB": {
    description:
      "A very dark blue field with the national flag in the canton and four alternating dark-red and blue " +
      "stripes in the fly. The dark blue stands for loyalty, and the four stripes for the four Grand Bassa men " +
      "who signed Liberia’s Declaration of Independence.",
    sources: [
      { title: "Grand Bassa County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-gb.html" },
    ],
  },
  "LR-GG": {
    description:
      "The national flag in the canton above a rising mountain on white and blue. The new county “rises like " +
      "its namesake mountain”; the white stands for purity of heart and the blue for peace and prosperity.",
    sources: [
      { title: "Grand Gedeh County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-gg.html" },
    ],
  },
  "LR-CM": {
    description:
      "A white field of peace and purity bearing the green outline of the county, with the national flag in " +
      "the canton.",
    sources: [
      { title: "Grand Cape Mount County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-cm.html" },
    ],
  },
  "LR-SI": {
    description:
      "A white field with a green cross behind the national flag in the canton. The white and green stand for " +
      "purity and the county’s tropical forests.",
    sources: [
      { title: "Sinoe County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-si.html" },
    ],
  },
  "LR-LO": {
    description:
      "The national flag in the canton with a central emblem of an arm holding a fagot (a bundle of sticks). " +
      "The arm and fagot symbolise unity, across the county’s forests and the Lofa River.",
    sources: [
      { title: "Lofa County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-lo.html" },
    ],
  },
  "LR-MY": {
    description:
      "Thirteen horizontal stripes with the national flag in the canton and an emblem of a tree and a " +
      "lighthouse on a cliff. The design recalls the Republic of Maryland, which flew yellow stripes before it " +
      "joined Liberia in 1857.",
    sources: [
      { title: "Maryland County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-my.html" },
    ],
  },
  "LR-RI": {
    description:
      "A blue, white and blue horizontal triband with the national flag in the canton, the central white band " +
      "bearing an orange sun, a green tree and a brown hut. The county was created in 1984 from part of Grand " +
      "Bassa.",
    sources: [
      { title: "River Cess County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-ri.html" },
    ],
  },
  "LR-BM": {
    description:
      "A purple field with the national flag in the canton and a light-blue roundel showing a brown mount with " +
      "five green trees.",
    sources: [
      { title: "Bomi County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-bm.html" },
    ],
  },
  "LR-MG": {
    description:
      "Green over red with the national flag in the canton and a roundel — blue over white over green — bearing " +
      "a brown beehive and a white flower.",
    sources: [
      { title: "Margibi County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-mg.html" },
    ],
  },
  "LR-GK": {
    description:
      "A white field with green and yellow bands at the hoist and fly and the national flag in the canton, " +
      "bearing a brown tree with seven green leaves on a green base.",
    sources: [
      { title: "Grand Kru County — Flags of the World", url: "https://www.crwflags.com/fotw/flags/lr-gk.html" },
    ],
  },

  // ── South Africa provinces ─────────────────────────────────────────────────
  // The game shows each province's coat of arms (only Mpumalanga also has a
  // distinct flag). Arms and symbolism registered with the South African Bureau
  // of Heraldry; descriptions from Flags of the World (FOTW).
  "ZA-FS": {
    description:
      "The provincial arms feature a charging cheetah in pursuit of its prey — evoking the open plains of the " +
      "Free State.",
    sources: [
      { title: "Free State — Flags of the World", url: "https://www.crwflags.com/fotw/flags/za-fs.html" },
    ],
  },
  "ZA-MP": {
    description:
      "Mpumalanga (“the place where the sun rises”) is the one province with its own flag as well as arms. The " +
      "arms have a green base with the Latin motto “Omnia Labor Vincit” (“Work conquers all”); the crest’s rays " +
      "stand for both the rising sun and the peaks of the Drakensberg, with a Barberton daisy and black " +
      "diamonds for the province’s coal, and two kudus as supporters; the shield’s gold-over-green division " +
      "represents the Highveld escarpment above the Lowveld.",
    sources: [
      { title: "Mpumalanga — Flags of the World", url: "https://www.crwflags.com/fotw/flags/za-mp.html" },
    ],
  },

  "NG-OS": {
    description:
      "Osun State's coat of arms sets a lion on a bed of ferns for Yoruba nobility, dignity and courage, " +
      "above a Y-shaped device for the Niger and Benue rivers linking Osun to the Nigerian federation. A " +
      "chief's sword (Ida) stands for the authority of the Obas and a mace for the legislature and the power " +
      "of the people, while the Ori Olokun bust represents the shared origin of the Yoruba and their skill in " +
      "the arts, ringed by a garland for chivalry and triumph. Indigo in the shield's upper half recalls the " +
      "Adire cloth traditional to Yorubaland, and ruby red in the lower half signifies nobility.",
    sources: [
      { title: "Osun Fact File: The Coat of Arms — Osun State Official Website", url: "https://www.osunstate.gov.ng/2017/01/osun-fact-file-coat-arms/" },
    ],
  },
  "NG-LA": {
    description:
      "Lagos State's coat of arms, designed in 1967, shows the white cap “Keremesi” worn by chiefs of the " +
      "Oba of Lagos's cabinet, a symbol of traditional authority, resting beneath Akoko leaves — used at the " +
      "installation of Obas and chiefs across Yoruba land to signify longevity. Coconut trees and green " +
      "grass stand for the state's agricultural history and its coconut produce, while a wheel on a red " +
      "field represents Lagos's status as Nigeria's industrial hub and its power generation.",
    sources: [
      { title: "Lagos State Coat Of Arms: Meaning Of The Logo — Nigerian Search Guide", url: "https://nigeriansearchguide.com/lagos-state-coat-of-arms-meaning-of-the-logo/" },
    ],
  },
  "PH-NER": {
    description:
      "Negros Oriental's seal shows the Cuernos de Negros mountain range, the Provincial Capitol standing " +
      "for local governance, and the portals of Silliman University for the province's importance as a " +
      "centre of education. Its lower portion depicts the province's key industries — lumber, coconut and " +
      "sugar milling — beneath the motto “Via, Veritas, Vita” (Way, Truth, Life).",
    sources: [
      { title: "Explain the meaning of the official seal of Negros Oriental — Brainly", url: "https://brainly.com/question/19561007" },
    ],
  },
  "PH-NSA": {
    description:
      "Northern Samar's seal uses tangerine for the cheerfulness and optimism of its people, yellow for " +
      "golden harvests and abundant resources, and white for transparent governance. A torch stands for the " +
      "provincial government's commitment to education, and a rope encircling the emblem represents " +
      "equality before the law and unity for peace and development.",
    sources: [
      { title: "Northern Samar — Official provincial seal, Wikipedia", url: "https://en.wikipedia.org/wiki/Northern_Samar#Official_provincial_seal" },
    ],
  },
  "PH-BAS": {
    description:
      "Basilan's seal is shaped like a rhombus, following the outline of the province's main island, with a " +
      "bolo knife and a rising sun over the sea — the bolo a traditional working and defence tool of the " +
      "island's people, and the sunrise standing for new beginnings.",
    sources: [
      { title: "#JuanPhilippines: Autonomous Region in Muslim Mindanao (ARMM) — Timow's Turf", url: "https://timowsturf.wordpress.com/side-project-juanphilippines/juanphilippines-autonomous-region-in-muslim-mindanao-armm/" },
    ],
  },
  "PH-MSC": {
    description:
      "Misamis Occidental's seal is divided by a diagonal band. Its upper-left portion stands for the seat " +
      "of the provincial government; a coconut tree, nut and bolo mark the coconut as the province's " +
      "primary product; rice fields in front of Mount Malindang show rice as its principal staple crop; and " +
      "the sea with a sailboat tells of its rich fishing grounds in the Mindanao Sea, Iligan Bay and " +
      "Panguil Bay. The diagonal band carries corn and banana, the province's other principal staple crops.",
    sources: [
      { title: "Symbols of the State, Republic of the Philippines — Bureau of Local Government (1975), Internet Archive", url: "https://archive.org/details/SymbolsOfTheStateRepublicOfThePhilippines" },
    ],
  },

  "PH-PAN": {
    description:
      "Pangasinan's name means “place of salt-making”, and its seal reflects that directly: the lower third " +
      "shows salt being cooked over a fire, the source of the province's historic livelihood. The upper third " +
      "shows the Provincial Capitol and two sailboats, and the centre shows milkfish over waves beside a " +
      "triangle of bricks — the province's fishing industry and its salt trade side by side.",
    sources: [
      {
        title: "An Ordinance Adopting the Official Seal and the Official Flag of the Province of Pangasinan",
        url: "https://www.pangasinan.gov.ph/issuances/an-ordinance-adopting-the-official-seal-and-the-official-flag-of-the-province-of-pangasinan/",
      },
    ],
  },
  "PH-BAN": {
    description:
      "Bataan's seal centres a flaming sword symbolising the bravery of the soldiers and guerrilla fighters " +
      "who defended the province during the Second World War. Its red and blue panels recall the battles " +
      "fought on Bataan's soil and the peace that followed, and three gold stars stand for the three " +
      "geographic regions of the province whose sons joined the resistance.",
    sources: [
      { title: "Seal of the week: Bataan — Behold Bataan", url: "https://beholdbataan.ph/seal-of-the-week-bataan/" },
    ],
  },
  "PH-CAV": {
    description:
      "Cavite's seal — an escudo (shield) standing for bravery and fortitude, in red, white, blue and a gold " +
      "sun with rays — marks the province's role as one of the first to rise in arms against Spanish rule in " +
      "the 1896 revolution. A white triangle bearing the letters KKK, for the Katipunan revolutionary " +
      "society, is set over the red portion of the shield.",
    sources: [
      {
        title: "Province of Cavite Official Seal",
        url: "http://chonzskypedia.blogspot.com/2012/09/province-of-cavite-official-seal.html",
      },
    ],
  },
  "PH-QUE": {
    description:
      "Quezon Province's seal bears a bust of Manuel L. Quezon, the first president of the Philippine " +
      "Commonwealth, after whom the province (formerly Tayabas) was renamed in 1946. The provincial " +
      "government readopted this original design of the seal by Executive Order No. 6 of 2022.",
    sources: [
      { title: "Seal of Quezon — Provincial Government of Quezon", url: "https://quezon.gov.ph/seal/" },
      { title: "Quezon — Wikipedia", url: "https://en.wikipedia.org/wiki/Quezon_province" },
    ],
  },
  "PH-LAG": {
    description:
      "Laguna's flag is a yellow field bearing the provincial shield above four stars. On the provincial " +
      "seal, the coconut trees stand for the province's main product — Laguna was then the second-largest " +
      "coconut producer in the Philippines — and the waterfall for its foremost tourist attraction, the " +
      "world-famous Pagsanjan Falls.",
    sources: [
      { title: "Symbols of the State, Republic of the Philippines — Bureau of Local Government (1975), Internet Archive", url: "https://archive.org/details/SymbolsOfTheStateRepublicOfThePhilippines" },
      { title: "Flags of the provinces of the Philippines — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_of_provinces_of_the_Philippines" },
    ],
  },
  "PH-ALB": {
    description:
      "Albay's seal shows a high-flying bird native to the province, standing for the hopes and aspirations " +
      "of its people, in front of Mayon Volcano. The smoke rising from Mayon is a sign of life and the " +
      "province's vibrant existence, and the streak of light on the volcano's shoulder stands for the " +
      "artistry of the Albayanos, noted for their talents in the arts. The fields below depict the " +
      "province's agricultural economy.",
    sources: [
      { title: "Symbols of the State, Republic of the Philippines — Bureau of Local Government (1975), Internet Archive", url: "https://archive.org/details/SymbolsOfTheStateRepublicOfThePhilippines" },
    ],
  },
  "PH-BOH": {
    description:
      "Bohol's flag divides blue and red diagonally with white between them — blue for nobility, white for " +
      "purity, red for courage. Its seal depicts the Sandugo, the 1565 blood compact between the Spanish " +
      "conquistador Miguel López de Legazpi and the Boholano chieftain Datu Sikatuna, read as a symbol of " +
      "the Boholano love of peace; the Chocolate Hills stand for the province's natural beauty, the green " +
      "background for its agriculture, and a single star for Carlos P. Garcia, the only Philippine president " +
      "the province has produced.",
    sources: [
      { title: "List of Bohol provincial symbols — Wikipedia", url: "https://en.wikipedia.org/wiki/List_of_Bohol_provincial_symbols" },
    ],
  },
  "PH-NUV": {
    description:
      "Nueva Vizcaya's seal shows two bundles of rice (palay) over a green field, representing the " +
      "province's abundant rice harvests, beneath three mountains standing for the Cordillera, Caraballo and " +
      "Sierra Madre ranges that surround the province.",
    sources: [
      { title: "Seal and flag of Nueva Vizcaya — Wikipedia", url: "https://en.wikipedia.org/wiki/Seal_and_flag_of_Nueva_Vizcaya" },
    ],
  },
  "PH-RIZ": {
    description:
      "Rizal's seal centres a portrait of Dr. José Rizal, the national hero the province is named for, " +
      "beneath a sun, a wreath of laurel leaves and a dove standing for the peace and tranquility the " +
      "province enjoys, and a crown for the Rizaleño devotion to Our Lady of Peace and Good Voyage, whose " +
      "image is enshrined at Antipolo Cathedral.",
    sources: [
      { title: "Official Seal — Pililla Rizal Official Website", url: "https://pilillarizal.gov.ph/official-seal/" },
    ],
  },
  "PH-SOR": {
    description:
      "The date 1894 on Sorsogon's seal is the year the province was separated from Albay and took the name " +
      "Sorsogon. The present seal was published by the provincial government in 2019.",
    sources: [
      { title: "Sorsogon — Wikipedia", url: "https://en.wikipedia.org/wiki/Sorsogon" },
      { title: "File:Sorsogon Provincial Seal.png — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Sorsogon_Provincial_Seal.png" },
    ],
  },
  "PH-ILN": {
    description:
      "Ilocos Norte's seal shows Paoay Church, a symbol of Ilocano resilience, alongside the Bangui wind " +
      "turbines for the province's pioneering role in Southeast Asian renewable energy and the Patapat " +
      "Viaduct for its natural and engineered landmarks. Garlic, rice stalks and tobacco leaves, carried over " +
      "from the earlier seal, stand for the province's agriculture and food self-sufficiency.",
    sources: [
      { title: "Gov. Imee Marcos unveils new I. Norte corporate seal — Tawid News Magazine", url: "https://tawidnewsmag.com/gov-imee-marcos-unveils-new-i-norte-corporate-seal/" },
    ],
  },
  "PH-LEY": {
    description:
      "Leyte's seal shows Freedom Park at Palo, commemorating General Douglas MacArthur's 1944 landing " +
      "during the liberation of the Philippines, alongside a white cross for Ferdinand Magellan's stop on " +
      "the island in 1521, its letter L standing for Leyte. Stars ringing the inner circle represent the " +
      "province's 41 towns, and an eternal flame honours the soldiers who died in the Second World War.",
    sources: [
      { title: "Official Provincial Seal of Leyte", url: "https://www.scribd.com/doc/247916084/Seal-Explanations" },
    ],
  },
  "PH-AUR": {
    description:
      "Aurora's seal writes the province's name in forest green, since 70% of Aurora is covered by forest, " +
      "beneath a sun of eight rays for continuous growth across the province's eight municipalities, each " +
      "represented by its own colour band. The Dimadimalangat Reef marks the capital, Baler; a fishing boat " +
      "and the sea reflect the province's Pacific coastline; and coconut fronds and rice sheaves stand for " +
      "its main agricultural products.",
    sources: [
      { title: "Provincial Seal of Aurora, Philippines", url: "https://www.aurora.ph/seal.html" },
    ],
  },
  "PH-MAD": {
    description:
      "Marinduque's seal sets an outline of the island inside a heart-shaped shield. The province calls " +
      "itself “the Heart of the Philippines”: the island is heart-shaped and is considered the geographical " +
      "centre of the Philippine archipelago.",
    sources: [
      { title: "Marinduque — Wikipedia", url: "https://en.wikipedia.org/wiki/Marinduque" },
      { title: "Logo (Province and Centennial) — Province of Marinduque", url: "https://marinduque.gov.ph/logo-province-and-centennial/" },
    ],
  },
  "PH-MDC": {
    description:
      "Occidental Mindoro's seal centres a tamaraw head, urging protection of the endangered wild buffalo " +
      "found only on Mindoro island, above rice fields and two mountains for mainland Mindoro and the Lubang " +
      "island group. A green field stands for the province's forests, and the shield's gold recalls the " +
      "province's name — from the Spanish “Mina de Oro”, mine of gold.",
    sources: [
      { title: "Seal of Occidental Mindoro — Wikipedia", url: "https://en.wikipedia.org/wiki/Seal_of_Occidental_Mindoro" },
    ],
  },
  "PH-MDR": {
    description:
      "Oriental Mindoro's seal centres a tamaraw, the rare wild buffalo found only on the island of " +
      "Mindoro. Its fifteen stars represent the province's fifteen towns, and two dots the two provinces of " +
      "the island, Oriental and Occidental Mindoro. Green stands for the province's verdant hills and " +
      "mountains, red for the bravery of its people during the revolution against Spain, the " +
      "Philippine–American War and the Japanese occupation, and golden yellow for gold deposits.",
    sources: [
      { title: "Official Logo — Provincial Planning and Development Office, Oriental Mindoro", url: "https://ppdo.ormindoro.gov.ph/official-logo/" },
      { title: "Symbols of the State, Republic of the Philippines — Bureau of Local Government (1975), Internet Archive", url: "https://archive.org/details/SymbolsOfTheStateRepublicOfThePhilippines" },
    ],
  },
  "PH-QUI": {
    description:
      "Quirino's seal shows the Sierra Madre range to the east and the Caraballo and Mamparang ranges to the " +
      "south, trees for the province's place in the upper Cagayan River watershed, bundled rice, tobacco and " +
      "corn for its three main crops, and water below for the Cagayan River and its tributaries flowing " +
      "toward Aparri.",
    sources: [
      { title: "Provincial Seal and the Physical Profile of the Province — I Love Quirino", url: "http://ilovequirinoprov.blogspot.com/2013/07/provincial-seal-and-physical-profile-of.html" },
    ],
  },
  "PH-ROM": {
    description:
      "Romblon's seal is a small blue circle, for the sea around the archipelago, inside a white band " +
      "naming the province. At its centre, a white shield holds 17 green human figures linking arms for the " +
      "province's 17 municipalities, their green for its ecological and agricultural resources. They " +
      "surround a marble craftsman with a marble mortar and pestle, for the marble industry, a fish for " +
      "fishing and a coconut for copra, before Mount Guiting-Guiting and a rising sun for the Divine " +
      "Providence of abundant natural resources.",
    sources: [
      { title: "Romblon — Provincial seal, Wikipedia", url: "https://en.wikipedia.org/wiki/Romblon#Provincial_seal" },
    ],
  },
  "PH-ISA": {
    description:
      "Isabela's seal — named for Queen Isabella II of Spain, in whose reign the province was created — sets " +
      "rice and corn at its centre for its status as the country's rice granary and a leading corn producer, " +
      "alongside a device for engineering standing for the province's fast-growing industrialisation.",
    sources: [
      { title: "Isabela PPO Seal — Isabela Police Provincial Office", url: "https://isabelappo.pro2.pnp.gov.ph/2022/05/17/isabela-ppo-seal/" },
    ],
  },
  "PH-NEC": {
    description:
      "Negros Occidental's seal, first approved in 1950, shows the active Kanlaon Volcano and the sugarcane " +
      "fields that have made the province the country's leading sugar producer at the top, the Provincial " +
      "Capitol at the centre, and the province's fishing industry at the base.",
    sources: [
      { title: "The seal / coat of arms of Negros Occidental — Philippines Heraldry", url: "https://x.com/duasmoon_/status/1701468179606983153" },
    ],
  },
  "PH-DAO": {
    description:
      "Davao Oriental's official seal takes the citadel shape of Spanish-era heraldry, its red, white and " +
      "blue standing for the sovereignty of the Republic and azure blue for the Philippine sky and the " +
      "province's aspiration to liberty and freedom.",
    sources: [
      { title: "File:Official Seal of Davao Oriental.svg — Wikimedia Commons", url: "https://commons.wikimedia.org/wiki/File:Official_Seal_of_Davao_Oriental.svg" },
    ],
  },
  "PH-ABR": {
    description:
      "Abra's seal shows a prancing stallion over a mountain gorge with a meandering river and terraced " +
      "fields — the province's name comes from the Spanish “abra” (gorge, pass or breach), first used for " +
      "the gap above Banaoang where the Abra River cuts through to the sea, and the seal's mountains, river " +
      "and fields reflect that rugged terrain alongside the province's agriculture.",
    sources: [
      { title: "Abra (province) — Wikipedia", url: "https://en.wikipedia.org/wiki/Abra_(province)" },
    ],
  },
  "PH-APA": {
    description:
      "Apayao's seal shows flying birds for the joy of the province's 1995 separation from Kalinga, red and " +
      "blue — the dominant colours of the Philippine flag — for its alignment with national government " +
      "programmes, a beaded border for the ancient culture of its tribes and their wish to preserve it, and " +
      "a cord encircling the seal for the cooperation and unity of its people.",
    sources: [
      { title: "About Apayao — Apayao Ipasindayaw", url: "https://apayao.gov.ph/background" },
    ],
  },
  "PH-BEN": {
    description:
      "Benguet's seal, approved in 1968, depicts the province's resources and industries: a miner's pick and " +
      "headgear for mining, the Ambuklao dam spillway for hydroelectric energy, terraced gardens and " +
      "vegetables for agriculture, a “kayabang” basket for indigenous handicraft, and pine-covered mountains " +
      "for eco-tourism. At the centre sits a “gangsa” gong, for the distinct indigenous culture of the " +
      "Benguet people, beneath the motto “Unity, Industry, Prosperity”.",
    sources: [
      { title: "About the Province — Province of Benguet", url: "https://benguet.gov.ph/about-the-province/" },
    ],
  },
  "PH-KAL": {
    description:
      "Kalinga's seal sets the province's five highest mountain peaks along its top, above the “laga” " +
      "backstrap-woven textile that is central to Kalinga craft and now taught in local schools, and the base " +
      "of a traditional “byanga” cooking vessel. A kalasag (shield) stands for the strength of Kalinga " +
      "warriors defending their community.",
    sources: [
      { title: "What is new in the NEW Kalinga Provincial Seal? — Guru Press Cordillera", url: "https://www.gurupress-cordillera.com/post/enhanced-kalinga-provincial-seal-approved" },
    ],
  },
  "PH-LUN": {
    description:
      "La Union's seven-pointed shield divides into four: an upper blue triangle shows three clasped hands " +
      "for the people united from parts of Pangasinan, Ilocos and Benguet when the province was formed in " +
      "1850; a red panel shows cotton and tobacco for the province's cash crops; another red panel shows a " +
      "native spinning wheel for its weaving industry; and a lower blue triangle shows a ship's wheel for the " +
      "fishing and maritime trade centred on the port of San Fernando. The motto reads “Love, Union, Concord”.",
    sources: [
      { title: "La Union Seal — Provincial Government of La Union", url: "https://launion.gov.ph/la-union-seal/" },
    ],
  },
  "PH-SLE": {
    description:
      "Southern Leyte's flag sets a green field — for agriculture, the province's main industry — behind a " +
      "cross formed by white stripes, recalling the first Catholic Mass held on Philippine soil at nearby " +
      "Limasawa island in 1521, framed by abaca and coconut leaves for the province's two major crops and " +
      "four orchid flowers native to Leyte. Its seal depicts a handclasp between a native Filipino and a " +
      "Spaniard, standing for the hospitality the islanders showed Magellan's expedition, beside a cross and " +
      "galleons marking that first Mass and the arrival of Christianity.",
    sources: [
      { title: "Provincial Flag — Province of Southern Leyte", url: "https://southernleyte.gov.ph/provincial-flag/" },
    ],
  },
  "PH-AGN": {
    description:
      "Agusan del Norte's seal recalls the old province of Agusan, once known as “Manobo Country”: a " +
      "Manobo brass shield, two crosses and Manobo garment colours (red, green, yellow, black) mark the " +
      "province's indigenous origins. Above them, a factory represents the wallboard, lumber and forest " +
      "products industries, and a symbol of mining stands for operations along the Diwata mountain range; " +
      "the waling-waling orchid, jackfruit, magcono tree and hornbill are the province's official flower, " +
      "fruit, tree and bird.",
    sources: [
      { title: "ADNPPO Seal and Symbolism — Agusan del Norte Police Provincial Office", url: "https://adnppo.pro13.pnp.gov.ph/adnppo-seal-and-symbolism/" },
    ],
  },
  "PH-AGS": {
    description:
      "Agusan del Sur's seal depicts trees standing for the province's natural wealth as a timber corridor, " +
      "beside a wheel and a factory representing the Agusanon people's resilience in adopting new ways of " +
      "producing goods and services.",
    sources: [
      { title: "Provincial Seal of Agusan del Sur — Provincial Government of Agusan del Sur", url: "https://agusandelsur.gov.ph/the-province-of-agusan-del-sur-1__trashed/provincial-seal/" },
    ],
  },
  "PH-SCO": {
    description:
      "South Cotabato's shield-shaped seal — the shape of the seal of the Republic — shows Mount Matutum, " +
      "the province's landmark; a factory for its industrial potential; rice, corn, pineapple, coconut and " +
      "banana, its principal products; rice stacks for the individual farmer's main produce; a plow, the " +
      "Filipino farmer's indispensable implement; and cattle for the province's vast pasture and grazing " +
      "lands.",
    sources: [
      { title: "Symbols of the State, Republic of the Philippines — Bureau of Local Government (1975), Internet Archive", url: "https://archive.org/details/SymbolsOfTheStateRepublicOfThePhilippines" },
    ],
  },
  "PH-SUK": {
    description:
      "Sultan Kudarat's flag carries its seal's central emblem, which combines the Baybayin syllables “su” " +
      "and “ku” for the province's name, between a panicle of rice and a frond of African oil palm — two of " +
      "the province's leading crops.",
    sources: [
      { title: "Flags of the provinces of the Philippines — Wikipedia", url: "https://en.wikipedia.org/wiki/Flags_of_provinces_of_the_Philippines" },
      { title: "Sultan Kudarat — Economy, Wikipedia", url: "https://en.wikipedia.org/wiki/Sultan_Kudarat#Economy" },
    ],
  },
  "PH-PAM": {
    description:
      "Pampanga's own flag colours — kundiman (red), aluntian (green) and dilo (yellow) — are one of the " +
      "eight rays of the sun on the Philippine national flag, honouring Pampanga as one of the eight " +
      "provinces that rose first against Spanish rule in 1896. Red stands for Pangulu, upper Pampanga; green " +
      "for Paroba, lower Pampanga; and yellow for Mount Arayat, the extinct volcano at the province's centre.",
    sources: [
      {
        title: "23 Official Seals of Pampanga Province, its Towns and Cities — The Kapampangan Listorian",
        url: "http://kaplistorian.blogspot.com/2016/11/25-23-official-seals-of-pampanga.html",
      },
    ],
  },
  "RO-BH": {
    description:
      "Bihor County's coat of arms, adopted in 1998 and corrected in 2013, quarters a castle for the " +
      "medieval Castle of Bihor with five wheat stalks and a bunch of grapes for the county's agriculture, " +
      "over a band bearing three fish for its rivers and fisheries. A scroll bears the opening words of " +
      "Romania's national anthem, “Deșteaptă-te, române!” — corrected in the 2013 redesign after a local " +
      "teacher discovered the earlier version had mistakenly rendered the text in the Greek alphabet rather " +
      "than Latin or Cyrillic.",
    sources: [
      { title: "Bihor County — Wikipedia", url: "https://en.wikipedia.org/wiki/Bihor_County" },
    ],
  },
  "RO-MM": {
    description:
      "Mureș County's coat of arms bears a scale, the heraldic sign of social justice, standing for the " +
      "balance and temperance of the county's people and the role of trade in social progress, above silver " +
      "bands representing the county's rich river network and, in particular, the Mureș River from which it " +
      "takes its name.",
    sources: [
      { title: "The Coat of Arms of Romania — Mureș County Council", url: "https://en.cjmures.ro/county/symbols/the-coat-of-arms-of-romania/" },
    ],
  },

  "PH-AKL": {
    description:
      "Aklan's provincial seal, adopted with the province's own 1956 creation, shows a sailboat and wavy " +
      "lines for its coastal fishing communities, corn for the interior's staple crops, and coconut palms " +
      "for its agroforestry — a shield Flags of the World reads as illustrating the province's economy " +
      "directly, citing the Philippines' own \"Symbols of the State\" reference on local-government seals.",
    sources: [
      {
        title: "Philippines Provincial Flags: Western Visayas — Flags of the World",
        url: "https://www.crwflags.com/fotw/flags/ph-vi.html",
      },
    ],
  },
  "KR-11": {
    description:
      "Seoul's flag, adopted 28 October 1996, is white with the city's official logo: the Hangul word " +
      "서울 (Seoul) drawn as a green mountain, a red sun and the blue Han River, joined by free brush " +
      "strokes. Its motifs come from Jeong Seon's landscape painting of the sun rising over Mongmyeoksan " +
      "(today's Namsan) and Kim Hong-do's genre painting of a dancing boy, and together they form a lively " +
      "human figure for a people-centred city. The green mountain stands for love of the environment, the " +
      "red sun for the vision and hope of the future, and the blue Han River for history and vitality.",
    sources: [
      { title: "서울특별시기 — 위키백과", url: "https://ko.wikipedia.org/wiki/서울특별시기" },
    ],
  },

  "KR-26": {
    description:
      "Busan's flag, adopted 17 May 2023, is white with the city's official logo above the words " +
      "부산광역시 and BUSAN METROPOLITAN CITY. The three-dimensional logo takes the initials B and S of " +
      "Busan as its motif, for the city's values and vision. Per the city government, its violet-magenta " +
      "and blue-cyan pairings stand for the embrace and harmony of Busan's citizens, and the flowing " +
      "three-dimensional colours for the city's past, present and future joined as one. It replaced the " +
      "1995 flag, a blue field with the city's silver emblem.",
    sources: [
      { title: "부산광역시기 — 위키백과", url: "https://ko.wikipedia.org/wiki/부산광역시기" },
    ],
  },

  "KR-27": {
    description:
      "Daegu's flag, adopted 10 October 1996 and revised 29 December 2001, carries the city's official logo — three triangles and an oval — on a green field. Korean Wikipedia's dedicated flag article explains the shapes as Palgongsan, the mountain that rings the city, and the Nakdong River that runs through it, together expressing a forward-looking, outward-reaching Daegu.",
    sources: [
      { title: "대구광역시기 — 위키백과", url: "https://ko.wikipedia.org/wiki/대구광역시기" },
    ],
  },
  "KR-28": {
    description:
      "Incheon's flag, adopted 8 April 1996, shows the city's official logo — combining the Hangul consonant ㅇ (from \"Incheon\"), the Hanja character 川 (\"cheon\", stream) and a wave motif — on a white field, per Korean Wikipedia's dedicated flag article. Together they represent ceaseless movement and the city's limitless potential as a trading hub whose port and airport move goods, services and information, and as Northeast Asia's gateway to the world.",
    sources: [
      { title: "인천광역시기 — 위키백과", url: "https://ko.wikipedia.org/wiki/인천광역시기" },
    ],
  },
  "KR-29": {
    description:
      "Gwangju's flag, adopted 1 November 2000, centres the city's official logo on a white field: an orange circle for the sun and four white curves for people and for \"gwang\" (光, light) — the city's own name. Korean Wikipedia's dedicated flag article gives the sun and human figures as the design's core motifs, with a navy trapezoid and orange parallelogram beneath.",
    sources: [
      { title: "광주광역시기 — 위키백과", url: "https://ko.wikipedia.org/wiki/광주광역시기" },
    ],
  },
  "KR-30": {
    description:
      "Daejeon's symbol mark, explained on the city's own government site, uses green petal shapes standing for farmland, home ground and the mugunghwa (rose of Sharon, Korea's national flower); the overall form evokes the Hanja character 大 (\"great\", Daejeon's own first syllable) and dynamic, outward growth — expressing the city's ambition to lead as Korea's hub of land, transport, administration, science, culture and logistics.",
    sources: [
      { title: "심벌마크 — 대전광역시청", url: "https://www.daejeon.go.kr/drh/DrhContentsHtmlView.do?menuSeq=1711" },
    ],
  },
  "KR-31": {
    description:
      "Ulsan's flag, adopted 1 January 1995, carries the city's official logo on a white field: a teal dragon clutching a red yeouiju (a wish-fulfilling jewel) as it soars, per Korean Wikipedia's dedicated flag article. It expresses Ulsan's pioneering ambition as an advanced industrial and cultural city for the Pacific Rim era, and a future-facing image where nature and people, industry and culture, come together.",
    sources: [
      { title: "울산광역시기 — 위키백과", url: "https://ko.wikipedia.org/wiki/울산광역시기" },
    ],
  },
  "KR-42": {
    description:
      "Gangwon's flag was adopted 9 June 2023, taking effect 11 June 2023 when Gangwon-do became Gangwon Special Self-Governing Province. Its official logo, built from the province's own name, uses an ascending motif: Korean Wikipedia's dedicated flag article reads the consonant ㄱ (from \"Gang\") and vowel ㅜ (from \"won\") as styled after ㄱ, the first letter of Hunminjeongeum and the Hangul alphabet's own first consonant — marking Gangwon as the place where a new chapter of Korea's history, and a new departure, begins.",
    sources: [
      { title: "강원특별자치도기 — 위키백과", url: "https://ko.wikipedia.org/wiki/강원특별자치도기" },
    ],
  },
  "KR-43": {
    description:
      "North Chungcheong's flag, adopted 6 October 2023, shows the province's official logo on a white field. Korean Wikipedia's dedicated flag article reads the design as the mirrored consonants ㅊ and ㅂ (from \"Chungbuk\"), symmetrical left and right to express balanced growth toward the centre in every field, with an arrow-shaped space between them standing for the province's ambition to soar past the centre of Korea toward the centre of the world; the white ground stands for the purity of Chungbuk's people and their unlimited potential to reach the world.",
    sources: [
      { title: "충청북도기 — 위키백과", url: "https://ko.wikipedia.org/wiki/충청북도기" },
    ],
  },
  "KR-44": {
    description:
      "South Chungcheong's flag, adopted 5 November 2012, carries the province's official logo on a white field — white standing, per Korean Wikipedia's dedicated flag article, for the plainness of Chungnam's people as descendants of the \"white-clad people\" and their will to create something from nothing. The logo itself is built on the motif of a great old tree, long regarded as a symbol of harmony, coexistence, abundance, peace, happiness, trust and communication — a gathering-place where neighbours shared affection and courtesy — expressing a wish for a happy Chungnam centred on its own people.",
    sources: [
      { title: "충청남도기 — 위키백과", url: "https://ko.wikipedia.org/wiki/충청남도기" },
    ],
  },
  "KR-45": {
    description:
      "North Jeolla's flag was adopted 29 December 2023, taking effect 18 January 2024 when Jeollabuk-do became Jeonbuk Special Self-Governing Province. Its logo, per Korean Wikipedia's dedicated flag article, is built on the province's own name combined with the horizon seen across the Saemangeum reclamation area and the Honam plain — joining the land's historical memory with its unlimited possibility, and expressing Jeonbuk opening a new horizon toward the future. A green semicircle stretches along the flag's base.",
    sources: [
      { title: "전북특별자치도기 — 위키백과", url: "https://ko.wikipedia.org/wiki/전북특별자치도기" },
    ],
  },
  "KR-46": {
    description:
      "South Jeolla's flag, established 3 January 2000 and revised 1 August 2016, shows the province's official logo on a white field: a gold square holding an orange circle, a rhythmic green leafy curve and a blue wave pattern, per Korean Wikipedia's dedicated flag article. Together they depict Jeonnam's own landscape — golden fields, the sun, green nature and the blue sea — with gold, the design's dominant colour, standing for abundance and the gold square for the province's fertile, golden fields and the hope-filled richness of its land.",
    sources: [
      { title: "전라남도기 — 위키백과", url: "https://ko.wikipedia.org/wiki/전라남도기" },
    ],
  },
  "KR-47": {
    description:
      "North Gyeongsang's diamond-shaped symbol, explained on the province's own government site, draws on traditional patterns: the upper section reads as mountains stretching grandly, the right-centre as the East Sea advancing toward the world, and the lower-left as abundant plains. At the centre a crane flies above a river — the Nakdong, called \"the lifeblood of Yeongnam\" — for future development and prosperity, the whole expressing the pride, unity and pioneering spirit of \"Great Province Gyeongbuk\".",
    sources: [
      { title: "경북의 상징 — 심볼마크 — 경상북도청", url: "https://www.gb.go.kr/Main/page.do?mnu_uid=6808&LARGE_CODE=720&MEDIUM_CODE=60&SMALL_CODE=10&SMALL_CODE2=40" },
    ],
  },
  "KR-48": {
    description:
      "South Gyeongsang's flag centres a circular mark of five coloured sections around a white core, documented in detail by Flags of the World: red at the top for the passionate spirit of Gyeongnam's people, who love their province and nation; green at the left for nature and industry in harmony; yellow at the right for the fertile earth as the base of life; blue at the bottom for the cleanliness of the Nakdong River and the South Sea; and white at the centre for a strong Gyeongnam that shines like the rising sun — the circle as a whole expressing unity, balanced development and the province's aspiration for continued growth.",
    sources: [
      { title: "South Gyeongsang Province, South Korea — Flags of the World", url: "https://www.crwflags.com/fotw/flags/kr-48.html" },
    ],
  },
  "KR-49": {
    description:
      "Jeju's flag, adopted 20 April 2009, is built from three coloured semicircles, per Korean Wikipedia's dedicated flag article: blue for the clean sea facing the Pacific, green for Hallasan — the sacred, highest mountain at Jeju's centre — and orange for Jeju's status as a UNESCO World Natural Heritage site and international free city, standing for its rising 21st-century vision.",
    sources: [
      { title: "제주특별자치도기 — 위키백과", url: "https://ko.wikipedia.org/wiki/제주특별자치도기" },
    ],
  },
  "KR-50": {
    description:
      "Sejong's CI, explained on the city's own government site, takes the Hangul letter ㅅ as its core motif — marking Sejong as Korea's first Hangul-named city — shaped into a traditional roof tile to express \"a happy living city built on optimal environmental infrastructure.\" The design also draws on the four trigrams of Korea's own national flag (乾坤坎離) for \"harmony and balance, creation and development,\" with upturned eaves for a forward-looking, globally exemplary city image; its three official colours — Sejong Sky Blue, Sejong Blue and Sejong Gray — are read as conveying a smart, future-oriented, developed city.",
    sources: [
      { title: "상징물(CI) — 세종특별자치시청", url: "https://www.sejong.go.kr/kor/sub01_0301.do" },
    ],
  },
  "KR-41": {
    description:
      "Gyeonggi's current flag, adopted in 2021, is built from two diagonal wing-like shapes on a white field, per the province's own government site and Korean Wikipedia: green for a straight road moving forward, and for nature and peace, and blue for a flexible yet resolute spirit, trust, energy and future value — together expressing Gyeonggi's own onward momentum.",
    sources: [
      { title: "경기도기 — 위키백과", url: "https://ko.wikipedia.org/wiki/경기도기" },
      { title: "경기도청 — 도기(道旗)", url: "https://www.gg.go.kr/" },
    ],
  },
  "FM-KSA": {
    description:
      "Kosrae's state flag, adopted in 1983, sets a white silhouette of the island on a deep blue field for the Pacific Ocean surrounding it. Four white five-pointed stars are arranged in a diamond above the island, one for each of the Federated States of Micronesia's four states — Kosrae, Pohnpei, Chuuk and Yap — while a fafa pounding stone below stands for Kosrae's own distinct culture.",
    sources: [
      { title: "Kosrae (Micronesia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/fm-kos.html" },
    ],
  },
  "FM-PNI": {
    description:
      "Pohnpei's state flag, adopted in December 1977 after a design competition won by student Rosendo Alex, shows a half coconut shell — a sakau cup, for the ceremonial drink central to Pohnpeian culture — at the centre of a blue field for the surrounding ocean. Eleven stars circle the cup, one for each of Pohnpei's municipalities, and a wreath of coconut leaves frames the whole design for the plant's importance to the state's economy and culture.",
    sources: [
      { title: "Pohnpei (Micronesia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/fm-pon.html" },
    ],
  },
  "FM-TRK": {
    description:
      "Chuuk's state flag, first adopted in 1979 when the state was still called Truk, rings a white coconut palm at the centre of a blue field — for the Pacific Ocean — with 38 white stars, one for each of Chuuk's municipalities. The coconut tree stands for the state's natural resources and cultural heritage, and the circle of stars for the unity and harmony among its municipalities.",
    sources: [
      { title: "Chuuk State — Vexillology Wiki", url: "https://vexillology.miraheze.org/wiki/Chuuk_State" },
    ],
  },
  "FM-YAP": {
    description:
      "Yap's state flag, adopted 30 May 1980 and first raised 1 March 1981, sets two of the state's own traditions on a blue field for the surrounding Pacific: a large white ring around a blue disc is Yap's famous rai — stone money carved with a hole through its centre, standing for wealth, history, trust and community — and beside it the silhouette of a traditional Yapese sailing canoe honours the navigators who read stars, wind and current to cross the ocean. A white five-pointed star inside the rai's centre marks Yap as one of the Federated States of Micronesia's four states.",
    sources: [
      { title: "Understanding the Yap State Flag — Visit Yap", url: "https://www.visityap.com/wp/yapblog/understanding-the-yap-state-flag/" },
      { title: "Emblems and Symbols — Yap State Code, Title 1, Chapter 5", url: "http://fsmlaw.org/yap/code/title01/T01_Ch05.htm" },
    ],
  },
  "HR-21": {
    description:
      "Zagreb's flag is blue bearing the city's coat of arms bordered in yellow: a silver three-towered castle on a green hill, with a golden eight-pointed star and a silver crescent moon above. The castle stands for the city on its hill, while the star and crescent — widely used in medieval heraldry as symbols of eternity — reach back to Gradec's own historical seals, the oldest of which survives from the 14th century, not long after King Béla IV granted Gradec status as a Free Royal City by the Golden Bull.",
    sources: [
      { title: "Coat of arms of Zagreb — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Zagreb" },
      { title: "Coat of arms (crest) of Zagreb — Heraldry-Wiki", url: "https://www.heraldry-wiki.com/wiki/Zagreb" },
    ],
  },
  "TH-30": {
    description:
      "Nakhon Ratchasima's provincial seal, on an orange field, shows the Thao Suranari Monument before the city's Chumphon Gate. The monument depicts Khun Ying Mo — later honoured with the royally-bestowed title Thao Suranari — commemorating her role rallying the city's people to defeat the invading army of Chao Anouvong of Vientiane in 1826; the Chumphon Gate behind her is a surviving gate of the old city wall, built in the reign of King Narai.",
    sources: [
      { title: "ตราสัญลักษณ์ จังหวัดนครราชสีมา — nakhonratchasima.go.th", url: "https://www2.nakhonratchasima.go.th/content/logo" },
    ],
  },
  "PH-ILI": {
    description:
      "Iloilo's provincial seal, per the province's own government site, divides its shield into three fields: three green mountain peaks at the top for the range separating Iloilo from Capiz and Antique; a carabao head over waves at the left for agriculture and the province's rice production; and a ship before a smoking factory at the right for commerce, trade and industry.",
    sources: [
      { title: "Vision, Mission — Iloilo Provincial Government", url: "https://iloilo.gov.ph/en/vision-mission" },
    ],
  },
  "PH-SLU": {
    description:
      "Sulu's provincial seal quarters a shield with a red field bearing a Christian cross, a yellow field bearing the Philippine sun, and a green field bearing a Muslim crescent and star, framing a walled structure at the centre — the province's own emblem deliberately joining Christian and Muslim symbols, alongside the national sun, in one design.",
    sources: [
      { title: "Sulu, Philippines — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ph-armm.html" },
    ],
  },
  "PH-ZAS": {
    description:
      "Zamboanga del Sur's provincial seal, dated 1952, quarters trees for the forested land the province held at its creation, a fish for its rich fishing resources, coloured bands for its agricultural produce, and — in the centre — a vinta, the outrigger sail-boat emblematic of the Muslim-majority communities across Mindanao's southern coast, over logs for its lumber industry and ore for its mining potential, per the province's own official explanation.",
    sources: [
      { title: "Zamboanga Peninsula, Region IX, Philippines — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ph-ix.html" },
    ],
  },

  // ── Czech regions (kraje) ─────────────────────────────────────────────────────
  // Czech regional flags are heraldic: each region's arms laid out on a 2:3 field, granted by the
  // Chair of the Chamber of Deputies. Symbolism from the Czech Wikipedia "Symboly … kraje" articles.
  "CZ-PR": {
    description:
      "Prague’s flag has two equal horizontal stripes, yellow over red, on a 2:3 field. The colours " +
      "come from the city’s arms, gold walls and towers on a red shield. The gold dates to a privilege " +
      "of Emperor Frederick III of 9 June 1475, which turned the silver walls and towers of the Old " +
      "Town arms gold (all but the battlements); Vladislaus II confirmed the change in 1477. The city " +
      "archivist Josef Emler fixed yellow and red as Prague’s colours in 1891, for the city’s pavilion " +
      "at the Jubilee Exhibition. The present flag is set by municipal decree No. 21/2004, in force " +
      "since 1 January 2005.",
    sources: [
      { title: "Vlajka Prahy — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Vlajka_Prahy" },
    ],
  },

  "CZ-ST": {
    description:
      "A heraldic flag: the Central Bohemian Region’s arms laid out on a 2:3 field, quartered red and " +
      "white, granted on 22 November 2001. The Bohemian lion (upper hoist and lower fly) marks the " +
      "historic land of Bohemia, in which the region lies. The black flaming eagle of St Wenceslas " +
      "(upper fly) is the dynastic emblem of the Přemyslids. The two wavy blue stripes (lower hoist) " +
      "stand for the two largest Czech rivers, the Elbe and the Vltava, which both flow through the " +
      "region.",
    sources: [
      { title: "Symboly Středočeského kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Středočeského_kraje" },
    ],
  },

  "CZ-JC": {
    description:
      "A heraldic flag: the South Bohemian Region’s arms laid out on a 2:3 field. The Bohemian lion " +
      "(upper hoist) stands for historic Bohemia, which covers most of the region. The rose on white " +
      "and blue (upper fly) recalls, in its first half, the arms of the Rosenberg family and their " +
      "domain, and in its second the arms of the Lords of Hradec and their prominent place in today’s " +
      "region. The green, gold and white stripes (lower hoist) are the region’s forests and natural " +
      "wealth, the Golden Trail (Zlatá stezka) and the Vltava. The three-towered wall on red (lower " +
      "fly) is taken from the arms of České Budějovice, the regional capital.",
    sources: [
      { title: "Symboly Jihočeského kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Jihočeského_kraje" },
    ],
  },

  "CZ-PL": {
    description:
      "A heraldic flag: the Plzeň Region’s arms laid out on a 2:3 field, granted on 31 January 2002. " +
      "The Bohemian lion (upper hoist) is the historic arms of Bohemia. The gold two-humped camel on " +
      "green (upper fly) comes from Plzeň’s arms: Emperor Sigismund added it after 1433, recalling how " +
      "the townspeople, in a sortie against the Hussites besieging the city, captured a camel the " +
      "Hussites had received as a gift from the King of Poland. In the stripes (lower hoist), green is " +
      "the forested border of the Šumava and the Bohemian Forest; the white and gold stripes are the " +
      "Berounka and the gold-bearing Otava, the two rivers that drain the region. The white rotunda on " +
      "red (lower fly) is the Rotunda of Saints Peter and Paul at Starý Plzenec, the oldest surviving " +
      "building in today’s Czech Republic and the main church of Old Plzeň, the region’s first " +
      "administrative centre.",
    sources: [
      { title: "Symboly Plzeňského kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Plzeňského_kraje" },
    ],
  },

  "CZ-KA": {
    description:
      "A heraldic flag: the Karlovy Vary Region’s arms laid out on a 2:3 field, quartered red and blue, " +
      "granted on 27 June 2001. The Bohemian lion (upper hoist) stands for historic Bohemia, in which " +
      "the region lies. The fountain of spouting water (upper fly) stands for the region’s spas, and " +
      "the crossed miners’ hammers (lower hoist) for its mining. The red and white wavy stripes with a " +
      "crowned two-tailed lion (lower fly) are taken from the arms of the city of Karlovy Vary.",
    sources: [
      { title: "Symboly Karlovarského kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Karlovarského_kraje" },
    ],
  },

  "CZ-US": {
    description:
      "A heraldic flag: the Ústí nad Labem Region’s arms laid out on a 2:3 field, granted on 9 April " +
      "2002. The Bohemian lion (upper hoist) stands for historic Bohemia. The white gate-tower on green " +
      "hills above wavy water (upper fly) is a stylised Porta Bohemica, the Elbe’s gateway into " +
      "Bohemia, and stands for prosperity; the waves are the region’s waters and the three hills its " +
      "mountains. The plough (lower hoist) recalls that Přemysl the Ploughman, mythical founder of the " +
      "first ruling dynasty, came from this region. The crowned, helmeted white lion (lower fly) comes " +
      "from the arms of Ústí nad Labem, the regional capital.",
    sources: [
      { title: "Symboly Ústeckého kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Ústeckého_kraje" },
    ],
  },

  "CZ-LI": {
    description:
      "A heraldic flag: the Liberec Region’s arms laid out on a 2:3 field, quartered red and blue, " +
      "granted on 8 October 2001. The Bohemian lion (upper hoist and lower fly) stands for historic " +
      "Bohemia. The white eight-spoked cartwheel (upper fly) comes from the arms of the Redern family; " +
      "it has been in Liberec’s arms since 12 April 1577, when Rudolf II raised Liberec to a town. The " +
      "white triangle with curved sides (lower hoist) is the silhouette of Ještěd, the mountain that " +
      "dominates the regional capital.",
    sources: [
      { title: "Symboly Libereckého kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Libereckého_kraje" },
    ],
  },

  "CZ-KR": {
    description:
      "A heraldic flag: the Hradec Králové Region’s arms laid out on a 2:3 field, quartered red and " +
      "blue, granted on 8 October 2001. The Bohemian lion (upper hoist and lower fly) stands for " +
      "historic Bohemia. The gold letter G (upper fly) comes from the arms of Hradec Králové, the " +
      "regional seat. The gold crown (lower hoist) stands for the five historic dowry towns of the " +
      "Czech queens (Hradec Králové, Jaroměř, Dvůr Králové, Trutnov and Nový Bydžov), for the historic " +
      "Hradec region, and for the word Králové (“Queen’s”) in the names of the city and the region.",
    sources: [
      { title: "Symboly Královéhradeckého kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Královéhradeckého_kraje" },
    ],
  },

  "CZ-PA": {
    description:
      "A heraldic flag: the Pardubice Region’s arms laid out on a 2:3 field, quartered red and blue, " +
      "granted on 27 June 2001. The Bohemian lion and the Moravian eagle (upper row) mark the two " +
      "historic lands the region spans. The lower hoist is the region’s own emblem: the silver wall is " +
      "the belt of mountains around it, and its four merlons are its four areas (the Elbe lowlands, the " +
      "Orlické foothills, the Bohemian-Moravian Highlands and the Iron Mountains). The open gate with a " +
      "gold globe is its openness to the world, and the black lyre recalls the composers who lived " +
      "here, such as Smetana, Martinů and Tomášek. The blue stands for its many rivers, lakes and " +
      "ponds. The half white horse (lower fly) is the arms of Pardubice, the regional seat.",
    sources: [
      { title: "Symboly Pardubického kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Pardubického_kraje" },
    ],
  },

  "CZ-VY": {
    description:
      "A heraldic flag: the Vysočina Region’s arms laid out on a 2:3 field, granted on 14 March 2002. " +
      "The Moravian eagle (upper hoist) and the Bohemian lion (lower fly) mark the two historic lands " +
      "the region spans. The red hedgehog (upper fly) is taken from the arms of Jihlava, the regional " +
      "capital. The cluster of rowan berries (lower hoist) is the region’s own emblem: the rowan, the " +
      "typical tree of the Highlands, expresses the region’s resilience and plain beauty.",
    sources: [
      { title: "Symboly Kraje Vysočina — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Kraje_Vysočina" },
    ],
  },

  "CZ-JM": {
    description:
      "A heraldic flag: the South Moravian Region’s arms laid out on a 2:3 field, granted on 25 " +
      "November 2003, the last Czech region to receive its symbols. Both eagles are Moravia’s. The " +
      "red-and-white chequered eagle (upper hoist) is the land’s arms before 1915 and after 1918; the " +
      "gold-and-red chequered, crowned eagle (lower fly) is the version used from 1915 to 1918, based " +
      "on a privilege of Emperor Frederick III of 1462 whose legal effect is unclear. The white and red " +
      "stripes (upper fly) come from the arms of Brno, and the bunch of grapes (lower hoist) is the " +
      "emblem of the whole region.",
    sources: [
      { title: "Symboly Jihomoravského kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Jihomoravského_kraje" },
    ],
  },

  "CZ-OL": {
    description:
      "A heraldic flag: the Olomouc Region’s arms laid out on a 2:3 field, quartered blue and yellow, " +
      "granted on 27 June 2001. The Moravian and Silesian eagles (upper row) mark the two historic " +
      "lands the region spans. The wavy blue diagonal on gold (lower hoist) is the Morava river flowing " +
      "through the wheat fields of the fertile Haná, running the way the river crosses the region. The " +
      "letters SPQO (lower fly) come from the arms of Olomouc and stand for Senatus Populusque " +
      "Olomucensis, after Rome’s SPQR. Maria Theresa added them on 12 November 1758 in honour of the " +
      "citizens’ resistance during the second Prussian siege.",
    sources: [
      { title: "Symboly Olomouckého kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Olomouckého_kraje" },
    ],
  },

  "CZ-ZL": {
    description:
      "A heraldic flag: the Zlín Region’s arms laid out on a 2:3 field, quartered blue and yellow, " +
      "granted on 22 November 2002. The Moravian eagle (upper hoist) stands for historic Moravia. The " +
      "book with a patriarchal cross (upper fly) carries the symbol of Great Moravia and recalls the " +
      "mission of Saints Cyril and Methodius. The lower hoist shows the region’s variety: crossed " +
      "valaška axes for Moravian Wallachia around Vsetín and Zlín, a ploughshare for the Haná around " +
      "Kroměříž, and grapes for the Uherské Hradiště area. The eight-pointed star (lower fly) comes " +
      "from the arms of Zlín.",
    sources: [
      { title: "Symboly Zlínského kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Zlínského_kraje" },
    ],
  },

  "CZ-MO": {
    description:
      "A heraldic flag: the Moravian-Silesian Region’s arms laid out on a 2:3 field, granted on 13 " +
      "November 2002. The Silesian eagle (upper hoist) takes precedence over the Moravian eagle (upper " +
      "fly) because most of the region lies in Silesia. The white horse with a rose (lower hoist) is " +
      "the arms of Ostrava, the regional seat. In the lower fly, the white and red stripes stand for " +
      "the Opava area and the half gold eagle for the Těšín area.",
    sources: [
      { title: "Symboly Moravskoslezského kraje — Wikipedia (Czech)", url: "https://cs.wikipedia.org/wiki/Symboly_Moravskoslezského_kraje" },
    ],
  },

  // ── Polish voivodeships ───────────────────────────────────────────────────────
  // Flag and arms symbolism from the Polish Wikipedia flag/arms articles, FOTW and the voivodeships'
  // own publications. Łódzkie and Opolskie have no documented symbolism (subdiv-meaning-omitted.txt).
  "PL-DS": {
    description:
      "A gold 5:8 field with the black Lower Silesian eagle at its centre, adopted on 17 December 2009. " +
      "The eagle, with a crescent-shaped band bearing a cross across its breast, comes straight from " +
      "the historic arms of Silesia. It was the arms of Duke Henry II the Pious: he inherited the " +
      "crescent and cross from his father, Henry I the Bearded, and added the eagle to show the power " +
      "of Silesia and its dominance over the other Polish provinces. In time it became the symbol of " +
      "all Silesia.",
    sources: [
      { title: "Flaga województwa dolnośląskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_dolnośląskiego" },
      { title: "Herb województwa dolnośląskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_dolnośląskiego" },
    ],
  },

  "PL-KP": {
    description:
      "Three horizontal stripes, red, white and black in the ratio 1:2:1, on a 5:8 field, designed by " +
      "Lech Tadeusz Karczewski and adopted on 10 July 2000. The flag is drawn from the voivodeship’s " +
      "arms: a red half-eagle and a black half-lion under one crown on a silver field. That Kuyavian " +
      "half-eagle, half-lion comes from the arms of the old Inowrocław and Brześć Kujawski " +
      "voivodeships, and the white shield recalls the arms of the old Chełmno Voivodeship. Heraldic " +
      "order would put red and black, the colours of the charge, above the white of the field. But a " +
      "white bottom stripe looks the lightest, so the visually heaviest colour, black, was placed at " +
      "the bottom. The unequal widths set the flag apart from the historic flag of the German Empire, " +
      "which had the same three colours in a different order and in equal stripes.",
    sources: [
      { title: "Flag leaflet of the Kuyavian-Pomeranian Voivodeship (archived)", url: "https://web.archive.org/web/20170805221423/https://www.kujawsko-pomorskie.pl/pliki/promocja/ulotka_flaga_2.pdf" },
      { title: "Herb województwa kujawsko-pomorskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_kujawsko-pomorskiego" },
      { title: "Kujawsko-Pomorskie Voivodship (Poland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pl-kp.html" },
    ],
  },

  "PL-LU": {
    description:
      "Three horizontal stripes, white (silver), red and gold, with the outer two each two-fifths of " +
      "the height and the red one a fifth, and the voivodeship’s arms at the centre; adopted on 14 June " +
      "2004. The arms show a white stag leaping on red, with a gold royal crown around its neck. The " +
      "same crowned stag stood in the voivodeship’s interwar arms, which combined the arms of the old " +
      "Lublin Voivodeship of the Polish–Lithuanian Commonwealth with those of Chełm Land.",
    sources: [
      { title: "Flaga województwa lubelskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_lubelskiego" },
      { title: "Herb województwa lubelskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_lubelskiego" },
    ],
  },

  "PL-LB": {
    description:
      "Horizontal stripes of yellow and green, with a narrower white-over-red band between them, " +
      "approved on 26 June 2000. Its colours are taken from the voivodeship’s arms. There, green stands " +
      "for the forests that cover half the voivodeship, the crowned silver half-eagle for the region’s " +
      "ties with Poland, and the two gold six-pointed stars for its two capitals, Gorzów and Zielona " +
      "Góra.",
    sources: [
      { title: "Flaga województwa lubuskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_lubuskiego" },
      { title: "Herb województwa lubuskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_lubuskiego" },
      { title: "Lubuskie Voivodship (Poland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pl-lb.html" },
    ],
  },

  "PL-MA": {
    description:
      "Three horizontal stripes, white, gold and red, with the outer two each two-fifths of the height " +
      "and the gold one a fifth, on a 5:8 field; adopted on 24 May 1999. The colours reproduce the " +
      "voivodeship’s arms: the white stripe is the white eagle, the gold one its golden crown, beak, " +
      "talons and wing band, and the red one the red field of the shield. The arms recall those of the " +
      "Kraków Voivodeship of the Polish–Lithuanian Commonwealth, which date from the reign of Casimir " +
      "III the Great in the 14th century.",
    sources: [
      { title: "Flaga województwa małopolskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_małopolskiego" },
      { title: "Herb województwa małopolskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_małopolskiego" },
    ],
  },

  "PL-MZ": {
    description:
      "A red 5:8 field with a white (silver) eagle with a golden beak and talons at the hoist, designed " +
      "by Andrzej Heidrich and adopted on 29 May 2006; it replaced a flag with a slightly different " +
      "eagle. The eagle is the voivodeship’s arms. It recalls the arms of the Piast dukes of Masovia, " +
      "in the form used for 200 years from Masovia’s incorporation into the Polish Crown until the " +
      "Third Partition of Poland.",
    sources: [
      { title: "Flaga województwa mazowieckiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_mazowieckiego" },
      { title: "Herb województwa mazowieckiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_mazowieckiego" },
    ],
  },

  "PL-PD": {
    description:
      "Four equal horizontal stripes, white, red, yellow and blue, on a 5:8 field, adopted on 30 August " +
      "2002. Each colour is taken from the voivodeship’s arms. White is for the White Eagle and the " +
      "mounted knight of the Pogoń, and red for the shield. Yellow is for the eagle’s gold crown, beak " +
      "and legs and for the knight’s cross, sword hilt, spur and harness; blue is for the knight’s " +
      "shield, saddle and caparison. The arms place Poland’s White Eagle above Lithuania’s Pogoń " +
      "because Podlasie belonged to both the Polish Crown and Lithuania.",
    sources: [
      { title: "Flaga województwa podlaskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_podlaskiego" },
      { title: "Herb województwa podlaskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_podlaskiego" },
    ],
  },

  "PL-PK": {
    description:
      "A white field between two narrower sky-blue bands at the hoist and the fly, each a fifth of the " +
      "length, with the voivodeship’s arms at the centre; adopted on 28 August 2000. The arms reflect " +
      "the region’s history and geography: the crowned silver griffin stands for the old Bełz " +
      "Voivodeship, the crowned gold lion for the Ruthenian Voivodeship, and the silver cross above " +
      "them comes from the arms of Rzeszów.",
    sources: [
      { title: "Flaga województwa podkarpackiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_podkarpackiego" },
      { title: "Herb województwa podkarpackiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_podkarpackiego" },
      { title: "Podkarpackie Voivodship (Poland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pl-pk.html" },
    ],
  },

  "PL-PM": {
    description:
      "A gold field with a black Pomeranian griffin, wings raised and red tongue out; adopted on 25 " +
      "March 2002. The griffin follows a 16th-century fresco in the presbytery of Oliwa Cathedral in " +
      "Gdańsk. A black griffin on gold is also the emblem of Kashubia.",
    sources: [
      { title: "Flaga województwa pomorskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_pomorskiego" },
      { title: "Herb województwa pomorskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_pomorskiego" },
    ],
  },

  "PL-SL": {
    description:
      "Three horizontal stripes, blue, yellow and blue in the ratio 2:1:2, on a 5:8 field, designed by " +
      "Barbara Widłak and adopted in 2001. They are the colours of the voivodeship’s arms, an uncrowned " +
      "gold eagle on blue. The eagle, emblem of the Piast dynasty, follows the arms of the Upper " +
      "Silesian Piasts of the Duchy of Opole and Racibórz, whose eagle already appears on a seal of " +
      "1222. Silesian Flag Day is celebrated in the voivodeship on 15 July.",
    sources: [
      { title: "Flaga województwa śląskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_śląskiego" },
      { title: "Herb województwa śląskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_śląskiego" },
      { title: "Śląskie Voivodship (Poland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pl-sl.html" },
    ],
  },

  "PL-SK": {
    description:
      "Adopted on 28 December 2012. Following the rules of heraldry and vexillology, its colours " +
      "reproduce those of the voivodeship’s arms, which it carries on its white field. The gold double " +
      "cross on blue is the emblem of the Benedictines of Łysa Góra, whose relic of the Holy Cross was " +
      "given to the abbey in the early 14th century. The white eagle on red is the arms of the old " +
      "Kraków Land. The stripes and gold stars are the arms of the old Sandomierz Voivodeship, which " +
      "covered most of today’s region; the number of stars probably reflected its districts. It " +
      "replaced the 2001–2013 flag, which had a gold stripe at the hoist beside blue, silver and red " +
      "stripes.",
    sources: [
      { title: "Flaga województwa świętokrzyskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_świętokrzyskiego" },
      { title: "Herb województwa świętokrzyskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_świętokrzyskiego" },
    ],
  },

  "PL-WN": {
    description:
      "A red flag in the ratio 1:2 whose fly end narrows to a point with a rounded lower edge, bordered " +
      "on three sides by a white stripe; on the red is the head of the crowned White Eagle with a " +
      "golden beak. It was approved in August 2002. The White Eagle comes from the first field of the " +
      "voivodeship’s arms, where it recalls the arms of Poland under Władysław Jagiełło. The arms’ " +
      "other fields hold the Lamb of God for Warmia and the black Prussian eagle with the letter S (for " +
      "Sigismund the Old) from the arms of Ducal Prussia, sometimes taken to stand for Masuria.",
    sources: [
      { title: "Flaga województwa warmińsko-mazurskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_warmińsko-mazurskiego" },
      { title: "Herb województwa warmińsko-mazurskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_warmińsko-mazurskiego" },
      { title: "Warmińsko-Mazurskie Voivodship (Poland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/pl-wm.html" },
    ],
  },

  "PL-WP": {
    description:
      "An unusual trapezoid flag in the ratio 5:11: a red square at the hoist bearing the voivodeship’s " +
      "eagle, and a white trapezoid whose top edge is twice as long as its bottom. The uncrowned silver " +
      "eagle follows the eagle on the majestic seal of Przemysł II, crowned King of Poland in 1295. " +
      "Five years before his coronation the eagle was already associated with the Polish Piast dynasty.",
    sources: [
      { title: "Flaga województwa wielkopolskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_wielkopolskiego" },
      { title: "Herb województwa wielkopolskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_wielkopolskiego" },
    ],
  },

  "PL-ZP": {
    description:
      "Three equal vertical stripes, white, red and white, on a 5:8 field, with the voivodeship’s arms " +
      "on the red stripe, following Polish tradition; designed by Hanna Dąbrowska. The arms show a red " +
      "rampant Pomeranian griffin on silver. The red griffin has been the symbol of the Griffin dynasty " +
      "that ruled Pomerania since the 12th century. It is modelled on the griffin on the banner of Duke " +
      "Casimir V of Szczecin, captured by King Władysław Jagiełło at Grunwald. From the 1530s it was " +
      "the emblem of all Pomerania, united by Duke Bogislaw X.",
    sources: [
      { title: "Flaga województwa zachodniopomorskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Flaga_województwa_zachodniopomorskiego" },
      { title: "Herb województwa zachodniopomorskiego — Wikipedia (Polish)", url: "https://pl.wikipedia.org/wiki/Herb_województwa_zachodniopomorskiego" },
    ],
  },

  // ── Estonian counties (maakonnad) ─────────────────────────────────────────────
  // Every county flag follows the 1939 pattern (white over green, county arms on the white): FOTW
  // ee-sub.html and the Estonian Wikipedia "… maakonna lipp" / "… maakonna vapp" articles.
  "EE-37": {
    description:
      "Harju County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 24 December " +
      "1996. The arms, a silver cross on red, are based on the small arms of Tallinn and were " +
      "confirmed on 5 February 1937.",
    sources: [
      { title: "Harju maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Harju_maakonna_lipp" },
      { title: "Harju maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Harju_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-39": {
    description:
      "Hiiu County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 25 November " +
      "1996. The arms show a vertical red rope tied in three knots between four red lilies on silver. " +
      "The lilies, drawn from the arms of the Ungern-Sternberg family, stand for Hiiumaa’s four " +
      "parishes. The rope comes from a legend in the collection Esivanemate varandus: an old man of " +
      "Hiiumaa gave men from Tallinn, stranded on the island in distress at sea, a length of rope with " +
      "three knots so that they would get home safely.",
    sources: [
      { title: "Hiiu maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Hiiu_maakonna_lipp" },
      { title: "Hiiu maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Hiiu_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-44": {
    description:
      "Ida-Viru County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 " +
      "August 1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the " +
      "county’s arms at the centre of the white stripe as its distinguishing mark. It was registered on " +
      "9 June 1997. The arms show, on blue, a silver castle wall ending in a red-roofed tower, with two " +
      "crossed silver swords above it. They come from the arms of the old Virumaa county, first granted " +
      "in 1928; the castle and wall are explained as defence against the enemy from the east, " +
      "protecting the people’s culture and freedom.",
    sources: [
      { title: "Ida-Viru maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Ida-Viru_maakonna_lipp" },
      { title: "Ida-Viru maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Ida-Viru_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-49": {
    description:
      "Jõgeva County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 10 October " +
      "1996. The arms are divided diagonally, blue over green, by a silver wavy band carrying two blue " +
      "wavy lines, with a gold clover leaf on the blue and three gold ears of grain on the green.",
    sources: [
      { title: "Jõgeva maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Jõgeva_maakonna_lipp" },
      { title: "Jõgeva maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Jõgeva_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-51": {
    description:
      "Järva County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 3 October " +
      "1996. The arms, confirmed on 5 February 1937, show a silver castle with a tower on blue, above " +
      "three silver wavy bars.",
    sources: [
      { title: "Järva maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Järva_maakonna_lipp" },
      { title: "Järva maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Järva_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-57": {
    description:
      "Lääne County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 11 October " +
      "1996. The arms, confirmed on 5 February 1937, show on red a silver eagle rising and looking " +
      "back, with a golden halo around its head. They are based on the arms of the Bishopric of " +
      "Ösel–Wiek (Saare-Lääne).",
    sources: [
      { title: "Lääne maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Lääne_maakonna_lipp" },
      { title: "Lääne maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Lääne_maakonna_vapp" },
      { title: "Lääne maakonna vapp, lipp ja teenetemärk — Riigikantselei", url: "https://www.riigikantselei.ee/laane-maakonna-vapp-lipp-ja-teenetemark" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-59": {
    description:
      "Lääne-Viru County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 " +
      "August 1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the " +
      "county’s arms at the centre of the white stripe as its distinguishing mark. It was registered on " +
      "26 September 1996. The arms show, on blue, a silver castle wall ending in a gold-roofed tower, " +
      "with two crossed silver swords above it. They come from the arms of the old Virumaa county (on " +
      "the heraldry council’s advice their red was replaced with gold); the castle and wall are read as " +
      "defence against the enemy from the east, protecting the people’s culture and freedom.",
    sources: [
      { title: "Lääne-Viru maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Lääne-Viru_maakonna_lipp" },
      { title: "Lääne-Viru maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Lääne-Viru_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-65": {
    description:
      "Põlva County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 7 November " +
      "1996. The arms show three black beavers sitting in a diagonal row on gold. Põlva is a newcomer " +
      "to Estonia’s administrative map, just as beavers are newcomers to its wildlife: a native species " +
      "that had vanished through heavy hunting. People and beavers here are said to share traits too: " +
      "they keep somewhat to themselves, are tenacious and hard-working, and go their own way. There " +
      "are three beavers because the county’s parishes were formed from three earlier administrative " +
      "units.",
    sources: [
      { title: "Põlva maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Põlva_maakonna_lipp" },
      { title: "Põlva maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Põlva_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-67": {
    description:
      "Pärnu County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 26 September " +
      "1996. The arms, a black bear rampant on gold, were confirmed on 5 February 1937 and registered " +
      "again on the same day as the flag.",
    sources: [
      { title: "Pärnu maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Pärnu_maakonna_lipp" },
      { title: "Pärnu maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Pärnu_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-70": {
    description:
      "Rapla County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 7 November " +
      "1996. The arms are quartered by a silver cross, red, gold, blue and red. The colours are " +
      "borrowed from the arms of the neighbouring counties: red from Harju and Lääne, blue from Järva " +
      "and gold from Pärnu.",
    sources: [
      { title: "Rapla maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Rapla_maakonna_lipp" },
      { title: "Rapla maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Rapla_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-74": {
    description:
      "Saare County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 26 September " +
      "1996. The arms, confirmed on 5 February 1937, show a silver Viking ship under sail, with seven " +
      "round shields along its side, on three silver wavy bars on blue. The Viking ship at sea stands " +
      "for the islanders’ once-powerful navy.",
    sources: [
      { title: "Saare maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Saare_maakonna_lipp" },
      { title: "Saare maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Saare_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-78": {
    description:
      "Tartu County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 25 September " +
      "1996. The arms are divided diagonally, blue over green, by a silver wavy band carrying two blue " +
      "wavy lines, with a gold six-pointed star above and a gold oak branch below; Günther Reindorff " +
      "drew the present version in 1937. The elements go back to the county’s 1926 design, which " +
      "explained the wavy band as the Emajõgi river that divides the county, the star as Tartu " +
      "University spreading culture and education across Estonia, and the oak as the oak grove of Taara " +
      "known from folk songs.",
    sources: [
      { title: "Tartu maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Tartu_maakonna_lipp" },
      { title: "Tartu maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Tartu_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-82": {
    description:
      "Valga County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 17 September " +
      "1996. The arms are divided diagonally, with four silver five-pointed stars on the blue upper " +
      "half and a plain silver lower half. The four stars are the four counties whose parts formed " +
      "Valga County in 1920.",
    sources: [
      { title: "Valga maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Valga_maakonna_lipp" },
      { title: "Valga maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Valga_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-84": {
    description:
      "Viljandi County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 " +
      "August 1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the " +
      "county’s arms at the centre of the white stripe as its distinguishing mark. It was registered on " +
      "26 August 1996. The arms, confirmed on 5 February 1937, show on blue a silver eagle with raised " +
      "wings, golden beak and legs, holding a silver sword with a golden hilt; on its breast is a green " +
      "shield with three golden ears of grain on one stalk.",
    sources: [
      { title: "Viljandi maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Viljandi_maakonna_lipp" },
      { title: "Viljandi maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Viljandi_maakonna_vapp" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  "EE-86": {
    description:
      "Võru County’s flag follows the common pattern of Estonia’s county flags, confirmed on 7 August " +
      "1939: two equal horizontal stripes, white over green, in the ratio 7:11, with the county’s arms " +
      "at the centre of the white stripe as its distinguishing mark. It was registered on 12 December " +
      "1996. The arms show, on blue, a gold ring and the silver sword of Kalevipoeg with a golden hilt, " +
      "set diagonally with its hilt at the lower left and its blade pointing to the upper right. Blue stands for a hopeful future and Võrumaa’s blue sky; the gold ring " +
      "(võru) names the county, and the sword stands for its readiness to defend itself.",
    sources: [
      { title: "Võru maakonna lipp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Võru_maakonna_lipp" },
      { title: "Võru maakonna vapp — Wikipedia (Estonian)", url: "https://et.wikipedia.org/wiki/Võru_maakonna_vapp" },
      { title: "Võru maakonna vapp, lipp ja teenetemärk — Riigikantselei", url: "https://www.riigikantselei.ee/voru-maakonna-vapp-lipp-ja-teenetemark" },
      { title: "Estonia: Subdivisions — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ee-sub.html" },
    ],
  },

  // ── Slovak self-governing regions (kraje) ─────────────────────────────────────
  "SK-BL": {
    description:
      "Bratislava Region’s flag is divided into four fields, with the vertical division a third " +
      "of the way from the hoist: a yellow square in the upper hoist beside a blue field, and a " +
      "blue field beneath it beside a white one. Yellow, blue and white are the tinctures of the " +
      "region’s coat of arms, which shows on blue a golden stag rising from a silver wheel above " +
      "a golden wavy bar. The arms are based on those of the old Pressburg (Bratislava) County, " +
      "which bore the arms of the Pálffy family, its hereditary župans: a golden stag rising from " +
      "a golden wheel above a green triple hill. The region replaced the hill with the wavy bar, " +
      "for the Danube and the Morava, the rivers that form its natural borders, and made the " +
      "stag’s antlers and hooves and the wheel silver.",
    sources: [
      { title: "Bratislava region symbols (Slovakia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sk-0-.html" },
      { title: "Význam a dedičstvo Pálfiovcov na území Bratislavského samosprávneho kraja — Bratislava Self-Governing Region (Slovak)", url: "https://bratislavskykraj.sk/vyznam-a-dedicstvo-palfiovcov-na-uzemi-bratislavskeho-samospravneho-kraja/" },
      { title: "Bratislavský samosprávny kraj — SKsymbol (Slovak)", url: "https://sksymbol.sk/bratislavsky-samospravny-kraj/" },
    ],
  },

  "SK-BC": {
    description:
      "Banská Bystrica Region’s flag, adopted in 2002, is divided into four fields with the " +
      "vertical division set towards the hoist: blue over white at the hoist, white over red in " +
      "the fly. Blue, white and red are the tinctures of the region’s quartered coat of arms. " +
      "Each quarter is derived from the arms of the historical counties of the area. Spruces, " +
      "counterchanged on blue and silver, recall Zvolen. A golden-haired knight in silver armour, " +
      "holding a shield with the silver double cross, recalls Novohrad. A silver bend between a " +
      "crescent and a star recalls Tekov and Hont. A silver castle with an open gate recalls " +
      "Gemer-Malohont.",
    sources: [
      { title: "Banská Bystrica region symbols (Slovakia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sk-6-.html" },
      { title: "Banskobystrický samosprávny kraj — SKsymbol (Slovak)", url: "https://sksymbol.sk/banskobystricky-samospravny-kraj/" },
    ],
  },

  // ── Swiss cantons ─────────────────────────────────────────────────────────────
  "CH-AG": {
    description:
      "Aargau’s flag is its coat of arms on a square banner. The hoist half is black, with a " +
      "white wavy river divided by two thin blue wavy lines; the fly half is light blue, with " +
      "three white five-pointed stars, two above one. Samuel Ringier of Zofingen designed the " +
      "arms in 1803, when the canton was created, with no reference to the region’s earlier " +
      "heraldry. The 1803 decree gave them no meaning, but 19th-century sources agree on one. The " +
      "black field crossed by a river is the former Bernese Aargau on the Aare. The three stars " +
      "are the three parts of eastern Aargau: the County of Baden, the Freie Ämter and the " +
      "Fricktal. The number of the stars’ points and their arrangement were fixed only in 1930.",
    myths: [
      {
        claim:
          "The black stands for fertile soil, and the wavy lines for the Aare, Reuss and Limmat " +
          "rivers.",
        reality:
          "The 1803 decree explained nothing and blazoned simply “a river”. These readings date " +
          "from the 20th century, as do others: the stars as the Reformed, Catholic and Jewish " +
          "faiths, or blue as abundant water. The 19th-century explanation is the Bernese Aargau " +
          "on the Aare, and three stars for Baden, the Freie Ämter and the Fricktal.",
      },
    ],
    sources: [
      { title: "Wappen des Kantons Aargau — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_des_Kantons_Aargau" },
      { title: "Aargau canton (Switzerland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ch-ag.html" },
    ],
  },

  "CH-AI": {
    description:
      "Appenzell Innerrhoden’s flag is its coat of arms: on white, an upright black bear with red " +
      "claws and tongue. The bear comes from the arms of the Prince-Abbey of St. Gallen, as the " +
      "attribute of Saint Gall. Appenzell carried it on its banners when it threw off the abbey’s " +
      "rule in the Appenzell Wars of the early 15th century; a banner is recorded as early as " +
      "1390. These were the arms of the whole of Appenzell until the division of 1597 along " +
      "confessional lines. Arbitrators then let Innerrhoden keep them, and Ausserrhoden added the " +
      "letters V R to the same bear. Appenzell always insisted the bear be shown as male: when a " +
      "calendar of 1477 left this unclear, the government demanded that every copy be destroyed.",
    sources: [
      { title: "Wappen des Kantons Appenzell Innerrhoden — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Wappen_des_Kantons_Appenzell_Innerrhoden" },
      { title: "Appenzell Innerrhoden canton (Switzerland) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ch-ai.html" },
    ],
  },

  // ── Liechtenstein municipalities (Gemeinden) ──────────────────────────────────
  "LI-01": {
    description:
      "Balzers flies three equal vertical stripes, blue, yellow and blue, as a long vertical " +
      "banner. The flag is identical to Gamprin’s. Blue and yellow are also the tinctures of the " +
      "municipal arms, granted by Prince Franz Joseph II on 16 August 1956: a golden griffin with " +
      "red tongue and claws on blue. The griffin comes from the arms of the Barons of Frauenberg, " +
      "who held Gutenberg Castle in Balzers around 1300. It replaced the village’s original arms, " +
      "the “Balzner Förkle”, a three-pronged hayfork.",
    sources: [
      { title: "Balzers — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Balzers" },
      { title: "Balzers (Liechtenstein) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/li-ba.html" },
    ],
  },

  "LI-02": {
    description:
      "Eschen’s flag is blue, divided down the middle by a white wavy band: the silver band of " +
      "the Esche stream. It repeats the lower part of the municipal arms, granted on 16 April " +
      "1942, which show above the stream a silver dove holding a blood-stained wood chip in its " +
      "beak. The dove comes from the arms of Pfäfers Abbey and recalls the abbey’s founding " +
      "legend. Pfäfers held Eschen’s parish benefice until the abbey was dissolved in 1838.",
    sources: [
      { title: "Eschen (Liechtenstein) — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Eschen_(Liechtenstein)" },
      { title: "Eschen (Liechtenstein) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/li-es.html" },
    ],
  },

  "LI-03": {
    description:
      "Gamprin flies three equal vertical stripes, blue, yellow and blue, the same flag as " +
      "Balzers. Gamprin had no recognised arms, colours or flag of its own until the 1950s. A " +
      "commission set up in 1957 designed them around the village’s old name, campus Rheni, " +
      "“field on the Rhine”. The arms show a golden wavy band for the Rhine on blue, between two " +
      "silver roses. The roses bring in the historic village of Bendern: they come from the arms " +
      "of the knight Rüdiger von Limbach, who owned the old parsonage and large estates there. " +
      "Prince Franz Joseph II granted the arms and the right to fly the flag by a decree of 30 " +
      "April 1958.",
    sources: [
      { title: "Gamprin — Wikipedia (German)", url: "https://de.wikipedia.org/wiki/Gamprin" },
      { title: "Gamprin (Liechtenstein) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/li-ga.html" },
    ],
  },

  // ── Dutch provinces ───────────────────────────────────────────────────────────
  "NL-LI": {
    description:
      "Limburg’s flag was adopted by the Provincial States on 28 July 1953, from a design by the " +
      "Maastricht architect Maris. Two equal stripes, white over yellow, are separated by a " +
      "narrower blue stripe, and a red lion with a crown and a forked tail stands towards the " +
      "hoist. The lion is that of the old Duchy of Limburg, from which the province takes its " +
      "name, though the duchy lay almost entirely outside the present province. Its forked tail " +
      "distinguishes it from the lion of the Netherlands. The blue stripe stands for the Maas. " +
      "The colours come from the provincial arms granted in 1886. Red is taken from the arms of " +
      "Valkenburg, Horne and Limburg, and white from Limburg and Valkenburg. Blue comes from " +
      "Guelders, and yellow from Horne, Guelders and Jülich. Limburg had long wanted a flag: in " +
      "the 1880s the national government twice refused it a white-and-red one.",
    sources: [
      { title: "Vlag van Limburg (Nederland) — Wikipedia (Dutch)", url: "https://nl.wikipedia.org/wiki/Vlag_van_Limburg_(Nederland)" },
      { title: "Limburg province (The Netherlands) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/nl-li.html" },
    ],
  },

  // ── Comoros autonomous islands ────────────────────────────────────────────────
  "KM-A": {
    description:
      "Anjouan’s island flag is red, with the white crescent and four white stars of the Comorian " +
      "national emblem at its centre. Red and white are Anjouan’s traditional colours, while the " +
      "emblem stands for the Union of the Comoros. Its four stars also represent the four " +
      "islands. On the national flag, whose four stripes stand for the four islands, yellow is " +
      "Mohéli, white Mayotte, red Anjouan and blue Grande Comore. The flag was adopted in 2012, " +
      "replacing an earlier red flag with a white open hand and crescent.",
    sources: [
      { title: "Anjouan (Comoros) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/km-nz.html" },
      { title: "Flag of the Comoros — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Comoros" },
    ],
  },

  "KM-M": {
    description:
      "Mohéli’s island flag is yellow with a red five-pointed star. Yellow is Mohéli’s colour. On " +
      "the national flag, whose four stripes stand for the four islands, yellow is Mohéli, white " +
      "Mayotte, red Anjouan and blue Grande Comore.",
    sources: [
      { title: "Mohéli (Comoros) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/km-mw.html" },
      { title: "Flag of the Comoros — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Comoros" },
    ],
  },

  "KM-G": {
    description:
      "Grande Comore (Ngazidja) flies a blue flag. As the island’s 2002 constitution describes " +
      "it, a white crescent sits at the hoist, with four white stars aligned from one tip of the " +
      "crescent to the other. Blue is Grande Comore’s colour. On the national flag, whose four " +
      "stripes stand for the four islands, yellow is Mohéli, white Mayotte, red Anjouan and blue " +
      "Grande Comore. The crescent and four stars are the national emblem, the stars again " +
      "standing for the islands.",
    sources: [
      { title: "Grande Comore (Comoros) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/km-gk.html" },
      { title: "Flag of the Comoros — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Comoros" },
    ],
  },

  // ── Saint Helena, Ascension and Tristan da Cunha ──────────────────────────────
  "SH-TA": {
    description:
      "Tristan da Cunha’s flag was adopted on 20 October 2002, under a Royal Warrant. It is a " +
      "Blue Ensign, the Union Jack in the canton of a blue field, defaced with the territory’s " +
      "coat of arms, granted the same day. The shield bears four yellow-nosed albatrosses around " +
      "a central diamond taken from the arms of the da Cunha family of Admiral Tristão da Cunha, " +
      "after whom the island is named. Cunha means “wedge” in Portuguese, and the family bore " +
      "blue wedges as a pun on its name. Two Tristan rock lobsters, found in the waters around " +
      "the island, support the shield. Above the shield, a Tristan longboat sits on a naval " +
      "crown, and the scroll below reads “Our faith is our strength”. Before 2002 Tristan used " +
      "Saint Helena’s arms.",
    sources: [
      { title: "Flag of Tristan da Cunha — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tristan_da_Cunha" },
      { title: "Coat of arms of Tristan da Cunha — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Tristan_da_Cunha" },
      { title: "Tristan da Cunha — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sh-tc.html" },
    ],
  },

  "SH-AC": {
    description:
      "Ascension Island’s flag is a Blue Ensign defaced with the island’s coat of arms. Before " +
      "it, the island flew the Union Flag. The Island Council agreed in 2009 to develop a flag of " +
      "its own, and after public consultation the design was approved by the Queen in April 2013. " +
      "It was raised for the first time on 11 May 2013, Ascension Day; the island was named after " +
      "Ascension Day in 1503. The arms were approved in 2012. The College of Arms drew them up " +
      "from the features islanders asked for. They show Green Mountain, which dominates the " +
      "island’s skyline, and three wideawake birds. Two green turtles support the shield, for the " +
      "turtles that famously lay their eggs on Ascension’s beaches.",
    sources: [
      { title: "Flag of Ascension Island — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Ascension_Island" },
      { title: "Ascension Island — Flags of the World", url: "https://www.crwflags.com/fotw/flags/sh-ac.html" },
    ],
  },

  // ── Russian federal subjects ──────────────────────────────────────────────────
  "RU-MOW": {
    description:
      "Moscow’s flag is dark red, with the main charge of the city’s arms at its centre: Saint " +
      "George on horseback, facing away from the hoist, striking a serpent with his spear. It was " +
      "adopted in 1995, and its current description was set by Moscow law in 2003; it is No. 197 " +
      "in the State Heraldic Register. The arms were restored in 1993 on the model granted by " +
      "Catherine II in 1781. They show George in silver armour and a blue cloak on a silver " +
      "horse, killing a black serpent with a golden spear. Moscow celebrates the Day of its arms " +
      "and flag every year on 6 May.",
    myths: [
      {
        claim:
          "The horseman on Moscow’s arms has always been Saint George.",
        reality:
          "From Ivan III in the 15th century, a rider slaying a dragon was one of the two " +
          "constant symbols on the seals of Russia’s rulers, beside the double-headed eagle. It " +
          "stood for the sovereign defeating his enemies. Only from the 1710s, under Peter I, did " +
          "the rider come to be read as Saint George, whose image it resembled. From then on it " +
          "was also taken as the arms of Moscow.",
      },
    ],
    sources: [
      { title: "Флаг Москвы — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/Флаг_Москвы" },
      { title: "Герб Москвы — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/Герб_Москвы" },
      { title: "Moscow (Russia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ru-mow.html" },
    ],
  },

  "RU-MOS": {
    description:
      "Moscow Oblast’s flag is red, with the figure from the oblast’s arms in the upper hoist. " +
      "Saint George, in white armour and a blue cloak on a white horse, is turned towards the " +
      "hoist. He spears a golden dragon with green wings, using a spear topped by an " +
      "eight-pointed cross. Unlike the city of Moscow’s black serpent, the oblast’s dragon is " +
      "golden. The flag was approved on 3 December 1997 (State Heraldic Register No. 777), and a " +
      "law of 2005 redescribed it. It is based on the arms of the old Moscow Governorate. Its " +
      "published symbolism calls George the patron of the Russian people and guardian of the " +
      "Russian land, embodying the victory of good over evil and light over darkness. It gives " +
      "the red as courage, bravery and self-sacrifice.",
    sources: [
      { title: "Флаг Московской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/Флаг_Московской_области" },
      { title: "Moscow Oblast (Russia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ru-50.html" },
    ],
  },

  "RU-ORL": {
    description:
      "Oryol Oblast’s flag, adopted on 26 July 2002 (State Heraldic Register No. 1217), is red. A " +
      "blue stripe, a fifth of the flag’s height, runs along the bottom, and the oblast’s coat of " +
      "arms sits at the centre of the red. Red is explained as courage, bravery and fearlessness, " +
      "and blue as beauty, grandeur and purity of thought. The arms show a silver fortress of " +
      "three towers crowned by a golden double-headed eagle. The eagle echoes the region’s name, " +
      "since orel means “eagle”, and both the eagle and the fortress come from the Oryol " +
      "Governorate arms of 1878. The fortress recalls the line of strongholds, Oryol, Mtsensk and " +
      "Kromy, that defended Rus’. On the green base, golden ears of grain mark a farming region. " +
      "An open silver book honours the region’s literary tradition, the land of Turgenev, Leskov, " +
      "Fet and Bunin.",
    sources: [
      { title: "Флаг Орловской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/Флаг_Орловской_области" },
      { title: "Герб Орловской области — Wikipedia (Russian)", url: "https://ru.wikipedia.org/wiki/Герб_Орловской_области" },
      { title: "Oryol Oblast (Russia) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/ru-57.html" },
    ],
  },

  // ── Guatemala departments ────────────────────────────────────────────────────
  // FOTW documents a flag for all 22 departments; seven carry sourced symbolism, mostly from
  // the governors' own 1997–98 communications. Petén's comes from the 1998 agreement that
  // created its flag. The other ten shown are logged in subdiv-meaning-omitted.txt.

  "GT-AV": {
    description:
      "Alta Verapaz’s flag is white, with the departmental arms at the centre between two leafy branches. " +
      "The white stands for the peace and brotherhood of its people, who have lived in harmony, work and " +
      "unity since the department was created. The shield has two fields within a gold border. The upper, " +
      "fuchsia field holds a rainbow. The lower, purple field holds the Earth, showing the Americas, with a " +
      "white dove of peace above it. Across the middle runs the motto “Yo pondré mi arco” (“I will set my " +
      "bow”), from the Book of Genesis, where the rainbow is the sign of God’s covenant with the Earth. The " +
      "branches around the shield stand for the department’s nature.",
    sources: [
      { title: "Alta Verapaz Department (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-av.html" },
    ],
  },

  "GT-CM": {
    description:
      "Chimaltenango’s flag, described by the departmental governor in September 1998, is dark green with a " +
      "gold fringe. It carries the departmental arms in a white disc, ringed by the words “Departamento de " +
      "Chimaltenango”. The green stands for a people living in democracy, faith and hope, and the white for " +
      "purity, calm, honesty, peace, integrity and firmness. In the arms, blue stands for justice, loyalty, " +
      "truth and strength, for the summer sky and for the seas around Guatemala, and the national flag at " +
      "the top for the country. The lyre honours Rafael Álvarez Ovalle, who composed the music of the " +
      "national anthem, and the department’s musicians and marimba players. The colonial fountain of " +
      "Chimaltenango’s central park drains to both oceans, one channel to the Pacific and one to the " +
      "Atlantic. The swans are those of the Los Aposentos resort, and wheat, maize and coffee are the " +
      "department’s crops. Two circles show the ruins of Iximché at Tecpán, the first capital of the " +
      "Kaqchikel Maya, and the volcanoes of Acatenango, which with the nearby mountains shelter the " +
      "surrounding towns from hurricane winds.",
    sources: [
      { title: "Chimaltenango Department (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-cm.html" },
    ],
  },

  "GT-CQ": {
    description:
      "Chiquimula’s flag, sky blue, white and yellow with the departmental arms on the white, was " +
      "inaugurated on 11 September 2012. Its designer, Carlos Humberto Guerra Pinto of Ipala, won a public " +
      "contest run by the cable television programme “Chiquimula De Visión”. In the arms, the column stands " +
      "for the arts and the flame for Chiquimula as a source of enlightenment. The mountain recalls the " +
      "town’s title, Chiquimula de la Sierra, and the rivers stand for the department’s water. The two " +
      "birds recall the meaning of the name, “land of birds”, and the gold its mining, traditions and " +
      "culture. The eleven white stars are its eleven municipalities, which its promoters said made it the " +
      "first department with a flag representing all of them.",
    sources: [
      { title: "Chiquimula Department (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-cq.html" },
    ],
  },

  "GT-HU": {
    description:
      "Huehuetenango’s flag was designed by José Osberto Mackepeace Palacios, then a teenager, and " +
      "presented on 2 July 1955, during the town’s patron-saint festival. Since 1987 it has been the " +
      "official symbol of both the municipality and the department. Green edges frame a light-yellow " +
      "centre, with a deep-yellow triangle at the hoist. The designer drew its colours from Maya culture " +
      "and the Popol Vuh: deep yellow is the colour of divinity and green the colour of hope. The emblem " +
      "shows the ruins of Zaculeu, a shrine of the pre-Columbian Mam, recalling the people’s Maya lineage. " +
      "They stand before a sun, within a ring of stars, one for each municipality.",
    sources: [
      { title: "Huehuetenango (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-hu-hu.html" },
      { title: "La Bandera de Huehuetenango — Centro Internacional de Comercio Electrónico de Huehuetenango", url: "http://mihuehue.com/ecommhuehue/banderahuehue.html" },
    ],
  },

  "GT-JU": {
    description:
      "Jutiapa’s flag, described by the departmental governor in August 1998, is mainly white, with the " +
      "departmental arms between two laurel branches. The branches stand for the daily triumphs of the " +
      "people of Jutiapa. In the arms, a cornucopia marks Jutiapa as the granary of the east, supplying " +
      "most of the grain the country eats. A horse and a cow stand for cattle raising, and the books for " +
      "education and culture. Behind them rises Cerro La Cruz, guardian of the departmental capital, under " +
      "the clouds, sky and sun that earn Jutiapa its name, “the City of the Sun”.",
    sources: [
      { title: "Jutiapa Department (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-ju.html" },
    ],
  },

  "GT-PE": {
    description:
      "Petén’s flag was created by Agreement No. 3-98 of the Departmental Government of Petén, signed by " +
      "Governor Macario Efraín Oliva Muralles on 14 September 1998. Its three vertical stripes are green at " +
      "the hoist, for hope and the department’s forests; white in the centre, for purity and peace; and sky " +
      "blue at the fly, for its lakes, justice and loyalty. On the white is the departmental emblem, a map " +
      "of Petén containing the Temple of the Great Jaguar at Tikal, a tree, a branch of xate palm, an oil " +
      "derrick and two hands. The agreement says these identify the cultural and commercial activity of its " +
      "people.",
    sources: [
      { title: "Acuerdo No. 3-98 de la Gobernación Departamental de Petén (1998), transcribed by the Flores historian Luis José Hernández González", url: "http://elchilamitza.blogspot.com/2010/10/acuerdo-gobernacion-deptal-3-98-bandera.html" },
    ],
  },

  "GT-RE": {
    description:
      "Retalhuleu’s flag is green, white and green, with the departmental arms on the white, as the " +
      "departmental governor described it in April 1997. The green stands for the lush vegetation and the " +
      "white for the foam of the waves on the department’s coast. In the arms, the palm is the department’s " +
      "symbol. Nine stars stand for its municipalities, the larger one for the capital, Retalhuleu. The " +
      "national flag, laid diagonally, marks its allegiance to Guatemala, and five volcanoes lit by a " +
      "bright sun stand for Central American unity.",
    sources: [
      { title: "Retalhuleu Department (Guatemala) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/gt-re.html" },
    ],
  },

  // ── Territories, de facto states and three municipal flags (2026-09 audit, batch 8c) ──
  // Each subdivision view shows the territory's own flag, but the explainer is looked up by the
  // subdivision code, so none rendered until now. Sources are the flags' own articles, FOTW and,
  // for New Taipei, the city government.

  "GB-AI": {
    description:
      "Anguilla’s flag is a British Blue Ensign with the territory’s arms in the fly. The arms show three " +
      "orange dolphins in a circle, taken from the island’s earlier Dolphin flag, standing for unity, " +
      "strength and endurance. The white of the shield stands for peace, and the light-blue base for the " +
      "sea as well as faith, youth and hope.",
    sources: [
      { title: "Flag of Anguilla — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Anguilla" },
    ],
  },

  "GB-FK": {
    description:
      "The Falkland Islands’ flag, in its present form since 25 January 1999, is a Blue Ensign with the " +
      "islands’ arms in the fly. The arms, granted in 1948, show a ram on tussock grass above a Tudor ship " +
      "on the waves. The ram stands for sheep farming, long the islands’ main industry. The ship is the " +
      "Desire, in which the English navigator John Davis is reputed to have sighted the islands in 1592, " +
      "and the motto below reads “Desire the Right”.",
    sources: [
      { title: "Flag of the Falkland Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Falkland_Islands" },
      { title: "Coat of arms of the Falkland Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_the_Falkland_Islands" },
    ],
  },

  "GB-GG": {
    description:
      "Guernsey’s flag, adopted in 1985, adds a gold Norman cross to the red cross of St George. Guernsey " +
      "had flown England’s flag, and the confusion that caused at the 1982 Commonwealth Games prompted a " +
      "flag of its own. The gold cross represents William, Duke of Normandy, later William I of England, " +
      "who is said to have been given such a cross by Pope Alexander II and to have flown it at the Battle " +
      "of Hastings.",
    sources: [
      { title: "Flag of Guernsey — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Guernsey" },
    ],
  },

  "GB-GI": {
    description:
      "Gibraltar’s flag is a banner of the arms that Queen Isabella I of Castile granted on 10 July 1502: " +
      "white over red, with a three-towered red castle on the white and a gold key hanging from its gate. " +
      "The castle stands for the fortress of Gibraltar. The key stands for its place as the key to Spain " +
      "for the Moors and the Spanish, and later as the key to the Mediterranean for the British. It is the " +
      "only British Overseas Territory flag without the Union Flag.",
    sources: [
      { title: "Flag of Gibraltar — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Gibraltar" },
    ],
  },

  "GB-GS": {
    description:
      "The flag of South Georgia and the South Sandwich Islands is a Blue Ensign with the territory’s arms, " +
      "granted in 1992; the Queen approved the flag and it is recorded at the College of Arms. The motto " +
      "reads Leo Terram Propriam Protegat, “let the lion protect its own land”. In Roman Klimes’s Symbols " +
      "of Antarctica, the lion stands for Britain and the torch for exploration, while the reindeer, seal " +
      "and penguin are animals of the islands.",
    sources: [
      { title: "Flag of South Georgia and the South Sandwich Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_South_Georgia_and_the_South_Sandwich_Islands" },
    ],
  },

  "GB-IM": {
    description:
      "The Isle of Man’s flag, official since 1 December 1932, is red with a triskelion: three armoured " +
      "legs with golden spurs, taken from the Manx arms of the 13th century. The triskelion, “three-legged” " +
      "in Greek, is one of the oldest symbols known, found in prehistoric rock carvings and on Greek vases " +
      "and coins. The Manx believe it came to them from Scandinavia, where in Norse mythology it stood for " +
      "the movement of the sun through the heavens. Since 1968 the legs have run clockwise, with one " +
      "planted at the bottom.",
    sources: [
      { title: "Flag of the Isle of Man — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Isle_of_Man" },
      { title: "Isle of Man — Flags of the World", url: "https://www.crwflags.com/fotw/flags/im.html" },
    ],
  },

  "GB-IO": {
    description:
      "The British Indian Ocean Territory’s flag was granted in 1990, the territory’s 25th anniversary. " +
      "Below the Union Flag in the canton, white and blue wavy lines stand for the waters of the Indian " +
      "Ocean. A palm tree rises above the Tudor Crown, both symbols of the territory. It was made for the " +
      "territory’s commissioner in London and has only semi-official status as a territorial flag.",
    sources: [
      { title: "Flag of the British Indian Ocean Territory — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_British_Indian_Ocean_Territory" },
    ],
  },

  "GB-JE": {
    description:
      "Jersey’s flag is a red saltire on white, flown unofficially since at least the 1830s. The States of " +
      "Jersey adopted it in 1979 with the island’s badge added in the upper quarter, and it was first " +
      "officially hoisted on 7 April 1981. The badge is the three leopards (lions passant guardant) of the " +
      "island’s arms, under a gold Plantagenet crown. It was a compromise between keeping the traditional " +
      "saltire, which could be mistaken for St Patrick’s cross or a maritime signal flag, and adopting a " +
      "banner of the three leopards.",
    sources: [
      { title: "Flag of Jersey — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Jersey" },
    ],
  },

  "GB-KY": {
    description:
      "The Cayman Islands’ flag, adopted in 1959, is a Blue Ensign with the territory’s arms, granted in " +
      "1958. The blue and white waves stand for the Caribbean Sea, and the three green stars for Grand " +
      "Cayman, Little Cayman and Cayman Brac. The gold lion on red is England’s, the islands’ mother " +
      "country. The turtle recalls their first Spanish name, Las Tortugas, and their seafaring, and the " +
      "pineapple their link with Jamaica, whose arms carry five. The motto, “He hath founded it upon the " +
      "seas”, comes from Psalm 24.",
    sources: [
      { title: "Flag of the Cayman Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Cayman_Islands" },
    ],
  },

  "GB-MS": {
    description:
      "A British Blue Ensign with Montserrat’s arms in the fly: a woman in green — Erin, the figure of " +
      "Ireland — holding a golden harp and embracing a cross. The Irish symbols recall the island’s many " +
      "settlers of Irish descent, which give it the name “the Emerald Isle of the Caribbean”.",
    sources: [
      { title: "Flag of Montserrat — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Montserrat" },
    ],
  },

  "GB-PN": {
    description:
      "The Pitcairn Islands’ flag, adopted in 1984, is a Blue Ensign with the islands’ arms, granted in " +
      "1969. The blue, yellow and green of the shield show Pitcairn rising from the Pacific. The anchor and " +
      "the Bible stand for HMS Bounty, whose mutineers settled the island and from whom most islanders " +
      "descend; the Bible also stands for the Christianity they brought. On the crest, the wheelbarrow and " +
      "the slip of miro, a local tree, recall the farming that kept the settlers alive; miro is also the " +
      "wood islanders carve into souvenirs.",
    sources: [
      { title: "Flag and coat of arms of the Pitcairn Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_and_coat_of_arms_of_the_Pitcairn_Islands" },
    ],
  },

  "GB-TC": {
    description:
      "The Turks and Caicos Islands’ flag, adopted in 1968 and modified in 1999, is a Blue Ensign with the " +
      "islands’ arms, granted in 1965. The gold shield bears a queen conch shell, a lobster and a Turk’s " +
      "head cactus. The cactus, whose shape recalls a Turkish fez, gives the islands the first half of " +
      "their name.",
    sources: [
      { title: "Flag of the Turks and Caicos Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Turks_and_Caicos_Islands" },
    ],
  },

  "GB-VG": {
    description:
      "The British Virgin Islands’ flag, adopted by Royal Warrant on 15 November 1960, is a Blue Ensign " +
      "with the territory’s arms. They show Saint Ursula holding a flaming gold lamp, surrounded by eleven " +
      "more lamps for her 11,000 virgin followers. Christopher Columbus named the islands after them in " +
      "1493, their number reminding him of the saint’s companions. The motto, Vigilate, means “be " +
      "watchful”.",
    sources: [
      { title: "Flag of the British Virgin Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_British_Virgin_Islands" },
    ],
  },

  "AU-CC": {
    description:
      "The Cocos (Keeling) Islands’ flag was designed by the teenager Mohammed Minkom in a 2003 competition " +
      "and declared on 6 April 2004. It uses green and gold, Australia’s national colours. The palm tree on " +
      "a gold disc stands for the islands’ tropical flora, and the crescent for Islam, the religion of the " +
      "Cocos Malays who make up most of the population. The Southern Cross stands for Australia and the " +
      "Southern Hemisphere. The Australian Government has not formally recognised the flag.",
    sources: [
      { title: "Flag of the Cocos (Keeling) Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Cocos_(Keeling)_Islands" },
    ],
  },

  "AU-CX": {
    description:
      "Christmas Island’s flag, chosen in a 1986 competition and adopted on 26 January 2002, was designed " +
      "by Tony Couch of Sydney. It is split diagonally into green for the land and blue for the sea. The " +
      "Southern Cross echoes Australia’s flag, and the golden bosun bird, a white-tailed tropicbird, is the " +
      "island’s symbol. The green map of the island sits on a gold disc, added to set the map off and since " +
      "linked with the island’s mining.",
    sources: [
      { title: "Flag of Christmas Island — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Christmas_Island" },
    ],
  },

  "AU-NF": {
    description:
      "Norfolk Island’s flag, adopted on 6 June 1979 when the island gained limited self-government, is a " +
      "green-white-green triband with a green Norfolk Island pine in the centre. The green stands for the " +
      "island’s plentiful vegetation and fertile land. The pine is native to the island and is its official " +
      "tree.",
    sources: [
      { title: "Flag of Norfolk Island — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Norfolk_Island" },
    ],
  },

  "NZ-CK": {
    description:
      "The Cook Islands’ flag, officially the Cook Islands Ensign, is a Blue Ensign with a ring of fifteen " +
      "white stars in the fly. The Union Flag stands for the islands’ historic ties with the United Kingdom " +
      "and the Commonwealth, and the fifteen stars for the fifteen islands. The blue stands for the ocean " +
      "and the peaceful nature of the people.",
    sources: [
      { title: "Flag of the Cook Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Cook_Islands" },
    ],
  },

  "NZ-NU": {
    description:
      "Niue’s flag, adopted on 15 October 1975, was designed by Patricia Rex, wife of the then premier. The " +
      "Niue Flag Act explains it. The Union Flag stands for the protection the United Kingdom granted in " +
      "1900 at the request of Niue’s kings and chiefs. The yellow is for the bright sunshine of Niue and " +
      "its people’s warm feelings towards New Zealand, which took over Niue’s administration in 1901. The " +
      "four small stars of the Southern Cross mark that link, and the larger star on a blue disc the deep " +
      "blue sea around the self-governing island.",
    sources: [
      { title: "Flag of Niue — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Niue" },
    ],
  },

  "NZ-TK": {
    description:
      "Tokelau’s flag, adopted in 2009 in place of New Zealand’s, shows a Tokelauan canoe sailing towards " +
      "the Southern Cross on blue. According to Tokelau’s government, the canoe stands for the territory’s " +
      "journey towards the best form of government for its people. The Southern Cross stands for a " +
      "navigational aid on that journey.",
    sources: [
      { title: "Flag of Tokelau — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tokelau" },
    ],
  },

  "DK-FO": {
    description:
      "The Faroese flag, Merkið, is a white Nordic cross flag with a red cross edged in blue. Faroese " +
      "students in Copenhagen led by Jens Oliver Lisberg designed it in 1919, and it was first hoisted at " +
      "Fámjin on 22 June that year. The British authorities recognised it for Faroese ships on 25 April " +
      "1940, a date kept as Flag Day. Like other Nordic crosses it is usually read as a Christian symbol. " +
      "Its colours are often explained by Faroese nature and Nordic ties: white for sea foam and the bright " +
      "sky, and red and blue from traditional Faroese dress and the other Nordic flags.",
    sources: [
      { title: "Flag of the Faroe Islands — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Faroe_Islands" },
    ],
  },

  "FI-AX": {
    description:
      "Åland’s flag, adopted in 1954 and first hoisted in Mariehamn on 3 April that year, resembles " +
      "Sweden’s flag with a red cross added for Finland. An earlier proposal with a blue cross, too close " +
      "to Sweden’s flag, was rejected by President Paasikivi. A blue-yellow-blue flag used unofficially in " +
      "the 1920s had been banned in 1935.",
    sources: [
      { title: "Flag of Åland — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_%C3%85land" },
    ],
  },

  "CN-TW": {
    description:
      "A red field with a blue canton bearing a white sun of twelve rays — the “Blue Sky, White Sun.” The " +
      "twelve rays stand for the twelve two-hour periods of the traditional day and the twelve months, a " +
      "call to constant progress; the red field was added by Sun Yat-sen for the blood of the " +
      "revolutionaries who overthrew the Qing dynasty. The three colours are also read for the Three " +
      "Principles of the People — blue for nationalism and liberty, white for democracy and equality, red " +
      "for the people's livelihood and fraternity.",
    sources: [
      { title: "Flag of the Republic of China — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_the_Republic_of_China" },
    ],
  },

  "CN-XZ": {
    description:
      "The Snow Lion Flag was adopted by the 13th Dalai Lama in 1916 and flown until 1959. It is now the " +
      "flag of the Central Tibetan Administration in exile, and it is banned in the People’s Republic of " +
      "China. According to the Central Tibetan Administration, the white triangle is a snow-clad mountain " +
      "for the highlands, and the six red bands on the blue sky are the six ancestral tribes: Se, Mu, Dong, " +
      "Tong, Dru and Ra. The yellow sun stands for freedom, spiritual and material happiness and prosperity " +
      "for all beings in Tibet, and the two snow lions for a unified spiritual and secular life. The three " +
      "jewels the lions hold are the Buddha, the Dharma and the Sangha, and the two-coloured swirling jewel " +
      "is the people’s cherishing of ethical self-discipline. The yellow border stands for the flourishing " +
      "of the Buddha’s teachings.",
    sources: [
      { title: "Flag of Tibet — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Tibet" },
    ],
  },

  "RS-KM~": {
    description:
      "Kosovo’s flag was adopted by its Assembly straight after the declaration of independence on 17 " +
      "February 2008. Muhamer Ibrahimi’s design won an international competition with almost a thousand " +
      "entries. It shows a golden map of Kosovo under an arc of six white stars on blue. Officially the " +
      "stars stand for Kosovo’s six major ethnic groups: Albanians, Serbs, Bosniaks, Turks, Romani (often " +
      "grouped with the Ashkali and Egyptians) and Gorani.",
    sources: [
      { title: "Flag of Kosovo — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Kosovo" },
    ],
    myths: [
      { claim: "The six stars stand for the six regions of a “Greater Albania”.", reality: "That is an unofficial nationalist reading. Officially the stars represent Kosovo’s six major ethnic groups." },
    ],
  },

  "MA-EH~": {
    description:
      "The flag of the Sahrawi Arab Democratic Republic was adopted on 27 February 1976 and is said to have " +
      "been designed by its first president, El Uali Mustafa Sayed. It combines the Pan-Arab colours of the " +
      "Arab Revolt of 1916–1918 with the star and crescent of Islam. The green stands for the Sahrawi " +
      "people’s hope of returning to their lands, the white for peace and purity, the black for grief for " +
      "the martyrs and the red for the blood they shed. The star marks the SADR as an Arab republic, and " +
      "the crescent as a Muslim country.",
    sources: [
      { title: "Flag of Western Sahara — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Western_Sahara" },
    ],
  },

  "CY-NC~": {
    description:
      "The flag of the Turkish Republic of Northern Cyprus, drawn by the Turkish Cypriot artist Emin " +
      "Çizenel and adopted in 1984, reverses the colours of Turkey’s flag: a red crescent and star on " +
      "white, with a red stripe near the top and the bottom. The flag law defines the design but gives it " +
      "no official meaning. A common reading takes the crescent and star for Turkishness, the red for the " +
      "blood of Turkish Cypriots killed in the intercommunal violence, the white for peace, and the two " +
      "stripes for Turkey and Northern Cyprus.",
    sources: [
      { title: "Flag of Northern Cyprus — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Northern_Cyprus" },
    ],
    myths: [
      { claim: "The two stripes stand for the Nile and the Euphrates.", reality: "A conspiracy theory spread in 2019 claimed this; it is false. The law gives the stripes no meaning, and the flag was drawn by Emin Çizenel." },
    ],
  },

  "TR-NC~": {
    description:
      "The flag of the Turkish Republic of Northern Cyprus, drawn by the Turkish Cypriot artist Emin " +
      "Çizenel and adopted in 1984, reverses the colours of Turkey’s flag: a red crescent and star on " +
      "white, with a red stripe near the top and the bottom. The flag law defines the design but gives it " +
      "no official meaning. A common reading takes the crescent and star for Turkishness, the red for the " +
      "blood of Turkish Cypriots killed in the intercommunal violence, the white for peace, and the two " +
      "stripes for Turkey and Northern Cyprus.",
    sources: [
      { title: "Flag of Northern Cyprus — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Northern_Cyprus" },
    ],
    myths: [
      { claim: "The two stripes stand for the Nile and the Euphrates.", reality: "A conspiracy theory spread in 2019 claimed this; it is false. The law gives the stripes no meaning, and the flag was drawn by Emin Çizenel." },
    ],
  },

  "FR-75": {
    description:
      "Paris’s flag is divided blue and red, the city’s traditional colours, both taken from its arms: red " +
      "is associated with Saint Denis, a martyr who shed his blood, and blue with Saint Martin, a bishop. " +
      "The colours of Paris are the source of the blue and red in France’s tricolour. The version shown " +
      "carries the city’s arms: a silver ship on the waves under a chief of royal fleurs-de-lis. The ship " +
      "comes from the emblem of the Marchands de l’eau, the guild that from 1170 held the right to trade by " +
      "boat on the Seine. The motto, Fluctuat nec mergitur, means “tossed by the waves but not sunk”.",
    sources: [
      { title: "Flag of Paris — Wikipedia", url: "https://en.wikipedia.org/wiki/Flag_of_Paris" },
      { title: "Coat of arms of Paris — Wikipedia", url: "https://en.wikipedia.org/wiki/Coat_of_arms_of_Paris" },
    ],
  },

  "HU-ED": {
    description:
      "Érd’s flag, set by the town council in 1997 (Resolution 36/1997), is green, cut into a swallowtail " +
      "at the fly, with the town’s arms near the hoist. In the arms, the green tree on gold recalls the " +
      "medieval name Erdő (“forest”) and its royal foresters. The three points of the gold crown in its " +
      "foliage stand for the Sárkány, Batthyány and Illésházy families, prominent in the town’s history, " +
      "and its petals for Érd’s nine historic village centres. The blue base is the Danube, once far more " +
      "important to the town for its ferry, port and water mills. The red dragon piercing its own throat " +
      "with a cross formed by its tail recalls the Sárkány family, knights of the Order of the Dragon that " +
      "King Sigismund founded to fight the Turks.",
    sources: [
      { title: "Érd (Hungary) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/hu-pe-er.html" },
      { title: "Érd — Wikipedia (Hungarian)", url: "https://hu.wikipedia.org/wiki/%C3%89rd" },
    ],
  },

  "TW-TPQ": {
    description:
      "New Taipei’s flag, first hoisted on 25 December 2010 when Taipei County became the special " +
      "municipality of New Taipei, is white with the city logo above its name, 新北市. The logo bends the " +
      "character 北 (“north”) out of four hearts, red, yellow, blue and green, turned inward. The city says " +
      "they stand for its different communities joining together for New Taipei. A stem and leaves turn the " +
      "hearts into a four-petalled lucky flower, marking the blossoming of the county’s 2007 upgrade to a " +
      "quasi-special municipality. The logo is tilted fifteen degrees to look lively and approachable.",
    sources: [
      { title: "Hsin-pei (New Taipei) — Flags of the World", url: "https://www.crwflags.com/fotw/flags/tw-xbi.html" },
      { title: "新北市標誌 — New Taipei City Government", url: "https://www.ntpc.gov.tw/ch/home.jsp?id=27739b44386e91a3" },
    ],
  },

};

/** True when a sourced flag-meaning explanation exists for the given code. */
export function hasFlagMeaning(code: string | null | undefined): boolean {
  return !!code && code in FLAG_MEANINGS;
}


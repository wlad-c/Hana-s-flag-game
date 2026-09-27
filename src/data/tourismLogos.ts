import type { TourismLogo } from "../types/tourismLogo";

/**
 * National tourism-board logos for Learn mode.
 *
 * Shown both in the world-map grid's "Show" dropdown (one card per country) and
 * as a "Tourism" section in each country's National symbols tab, following the
 * same pattern as Commercial airlines / Public broadcasters (see
 * `src/lib/tourismLogos.ts`, `FlagGrid.tsx`, `NationalFlagGrid.tsx`).
 *
 * Every entry's logo is the OFFICIAL national tourism-board / destination-
 * marketing logo — the mark the country's own tourism promotion body uses, not
 * a generic government seal or an unrelated brand. Where no authoritative image
 * could be sourced after an exhaustive search, the entry carries `noImageReason`
 * instead of a fabricated logo (never invented — same discipline as every other
 * flag/logo/crest in this repo).
 *
 * `visitors` is the one comparable data point requested across every country: the
 * most recent authoritative annual visitor figure, always paired with its exact
 * `metric` so two entries are never implied to be more comparable than they
 * really are (a country's "international tourist arrivals" total is not the same
 * measurement as, say, a single museum's visitor count). Where no authoritative
 * figure could be sourced, `visitorsNote` documents the gap honestly instead of
 * approximating one.
 *
 * Coverage is a growing set — see CLAUDE.md's football-crest/political-party
 * sweeps for the discipline this collection follows: source properly, never pad.
 */
export const TOURISM_LOGOS: Record<string, readonly TourismLogo[]> = {
  JP: [
    {
      id: "jp-endless-discovery",
      countryCode: "JP",
      name: "Japan. Endless Discovery.",
      slogan: "Japan. Endless Discovery.",
      agency: "Japan National Tourism Organization (JNTO), an independent administrative agency",
      launched: 2010,
      visitors: {
        count: 36900000,
        year: 2024,
        metric:
          "International visitor arrivals, calendar year (Japan National Tourism Organization) — a record high, 5 million more than the pre-pandemic 2019 record",
      },
      logo: "/tourism-logos/jp/japan-endless-discovery.svg",
      logoExplainer:
        "The consumer-facing destination mark JNTO puts on japan.travel: a solid red disc — the sun of the national flag — from which five cherry-blossom petals break away to the right, set beside the two-line wordmark \"Japan. Endless Discovery.\" The sakura is Japan's most widely recognised seasonal emblem, and the petals leaving the disc carry the campaign's \"endless discovery\" idea of a journey opening outward. This is the brand tourists actually see, not JNTO's plain \"JNTO\" corporate acronym mark.",
      sources: [
        "https://www.jnto.go.jp/en/about-us/brand.html",
        "https://en.wikipedia.org/wiki/Japan_National_Tourism_Organization",
        "https://aboutourism.wordpress.com/2010/04/17/destination-brandwatch-japan-endless-discovery/",
        "https://www.japan.travel/en/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Japan National Tourism Organization, downloaded from JNTO's own consumer site japan.travel and bundled here for identification of the destination brand — the same non-free basis this repository already uses for football-association crests and passport covers. Not freely licensed; JNTO retains all trademark rights.",
    },
  ],
  SG: [
    {
      id: "sg-passion-made-possible",
      countryCode: "SG",
      name: "Singapore — \"Passion Made Possible\"",
      slogan: "Passion Made Possible",
      agency:
        "Singapore Tourism Board (STB), jointly with the Singapore Economic Development Board (EDB)",
      launched: 2017,
      visitors: {
        count: 16500000,
        year: 2024,
        metric:
          "International visitor arrivals excluding Malaysian arrivals by land, calendar year (Singapore Tourism Board)",
      },
      logo: "/tourism-logos/sg/passion-made-possible.png",
      logoExplainer:
        "\"Passion Made Possible\", launched 24 August 2017, replaced the earlier \"YourSingapore\" campaign as Singapore's unified destination brand, used by STB and EDB together across tourism and trade promotion. The mark's red \"SG\" roundel plays on the idea of an official trademark or stamp, tying into the brand's framing of Singapore as a nation of innovators and makers.",
      sources: [
        "https://en.wikipedia.org/wiki/Passion_Made_Possible",
        "https://commons.wikimedia.org/wiki/File:PassionMadePossible.png",
        "https://www.marketing-interactive.com/passion-made-possible-stb-and-edb-launch-new-brand-identity-for-singapore",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain text/geometric-shape logo.",
    },
  ],
  ES: [
    {
      id: "es-sol-de-miro",
      countryCode: "ES",
      name: "Spain — the Sol de Miró",
      agency: "Turespaña (Instituto de Turismo de España), under the Ministry of Industry, Trade and Tourism",
      launched: 1983,
      visitors: {
        count: 93800000,
        year: 2024,
        metric:
          "International tourist arrivals, calendar year (INE, Instituto Nacional de Estadística — FRONTUR) — an all-time record",
      },
      logo: "/tourism-logos/es/sol-de-miro.png",
      logoExplainer:
        "Commissioned in 1983 from the painter Joan Miró, the \"Sol de Miró\" (Miró's Sun) was the first time a work of fine art was used as a country's tourism logo. Miró, in poor health, assembled it from elements of his own earlier work — the lettering from his 1982 FIFA World Cup poster and the sun-and-star motif from a 1968 poster for the Fondation Maeght — and refused payment or royalties for it. He described the black as symbolising strength and character, yellow the sun's light and joy, red passion, and green the country's landscapes.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Sol_de_Mir%C3%B3_(vectorizado).svg",
        "https://www.spain.info/en/40-anniversary/",
        "https://www.ttgmedia.com/features/sponsored-features/meet-the-spanish-icon-celebrating-its-40th-anniversary-43570",
        "https://www.ine.es/dyngs/Prensa/en/FRONTUR1224.htm",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain simple-shapes logo; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  TH: [
    {
      id: "th-amazing-thailand",
      countryCode: "TH",
      name: "Amazing Thailand",
      slogan: "Amazing Thailand",
      agency: "Tourism Authority of Thailand (TAT), a state enterprise established 1979",
      launched: 1998,
      visitors: {
        count: 35320000,
        year: 2024,
        metric: "International visitor arrivals, calendar year (Tourism Authority of Thailand)",
      },
      logo: "/tourism-logos/th/amazing-thailand.png",
      logoExplainer:
        "The \"Amazing Thailand\" destination mark in the form the Tourism Authority of Thailand adopted at World Travel Market in 2015: the word \"amazing\" in pink script above \"THAILAND\" in heavy magenta capitals, underlined by a broad upward-curving stroke that runs from pink through orange to yellow. The curve is drawn as a smile, the centrepiece of the redesign and a direct reference to Thailand's long-standing framing as the Land of Smiles.",
      sources: [
        "https://en.wikipedia.org/wiki/Amazing_Thailand",
        "https://www.tatnews.org/2015/11/tat-launches-new-amazing-thailand-logo-at-wtm-2015/",
        "https://en.wikipedia.org/wiki/Tourism_Authority_of_Thailand",
      ],
      licenceNote:
        "Copyrighted brand mark of the Tourism Authority of Thailand, taken from TAT's own newsroom at tatnews.org and bundled for identification of the destination brand, on the same non-free basis this repository uses for football-association crests and passport covers.",
    },
  ],
  GE: [
    {
      id: "ge-gnta",
      countryCode: "GE",
      name: "Georgian National Tourism Administration",
      agency:
        "Georgian National Tourism Administration (GNTA), a legal entity of public law under the Ministry of Economy and Sustainable Development",
      launched: 2019,
      visitors: {
        count: 5090000,
        year: 2024,
        metric:
          "International visitors, calendar year (Georgian National Tourism Administration) — on par with the pre-pandemic 2019 level",
      },
      logo: "/tourism-logos/ge/gnta.png",
      logoExplainer:
        "GNTA's 2019 destination-brand mark pairs the country's name with a stylised red flower/starburst motif, used across the administration's international marketing to present Georgia as a single, unified travel destination distinct from its regions.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:GNTA_logo_2019_v3.svg",
        "https://en.wikipedia.org/wiki/Tourism_in_Georgia_(country)",
        "https://civil.ge/archives/717769",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain simple-shapes logo. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  IN: [
    {
      id: "in-incredible-india",
      countryCode: "IN",
      name: "Incredible India",
      slogan: "Incredible India",
      agency: "Ministry of Tourism, Government of India",
      launched: 2002,
      visitors: {
        count: 9950000,
        year: 2024,
        metric:
          "Foreign Tourist Arrivals (FTA), calendar year (Ministry of Tourism, Government of India)",
      },
      logo: "/tourism-logos/in/incredible-india.png",
      logoExplainer:
        "Launched in 2002 and conceptualised under Amitabh Kant (then Joint Secretary for Tourism), \"Incredible India\" is one of the longest-running national tourism campaigns in the world. Its wordmark famously reshapes the exclamation mark into the dot of the \"I\" in \"India\", rendered as a small red circle.",
      sources: [
        "https://en.wikipedia.org/wiki/Incredible_India",
        "https://commons.wikimedia.org/wiki/File:Incredible_India_Logo.svg",
        "https://www.data.tourism.gov.in/mrd/Uploads/tourism_data/India%20Tourism%20Data%20Compendium%202024.pdf",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain text logo, dedicated under CC0. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  CH: [
    {
      id: "ch-switzerland-tourism",
      countryCode: "CH",
      name: "Switzerland Tourism",
      agency: "Schweiz Tourismus / Suisse Tourisme / Switzerland Tourism, Switzerland's national tourism-marketing organisation",
      visitors: {
        count: 11818000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Switzerland)",
      },
      logo: "/tourism-logos/ch/switzerland-tourism.png",
      logoExplainer:
        "Switzerland Tourism's wordmark integrates the Swiss flag's white cross on a red square directly into the word \"Switzerland\", in place of the letter \"t\" — a direct, literal pairing of the national flag with the organisation's own name.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Switzerland_Tourism_Logo.svg",
        "https://de.wikipedia.org/wiki/Datei:Switzerland_Tourism_Logo.svg",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain simple-shapes logo; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  NP: [
    {
      id: "np-nepal-tourism-board",
      countryCode: "NP",
      name: "Nepal",
      agency: "Nepal Tourism Board (NTB), operator of the welcomenepal.com brand",
      visitors: {
        count: 1147000,
        year: 2024,
        metric:
          "International tourist arrivals, calendar year (Nepal Tourism Board) — 96% of the pre-pandemic 2019 level, up 13.1% on 2023",
      },
      logo: "/tourism-logos/np/nepal.svg",
      logoExplainer:
        "The \"nepal\" destination wordmark the Nepal Tourism Board leads with: the country name in heavy lower-case golden-yellow letters, with a red disc sitting above the \"l\" like a sun cresting a ridge. Red and the crimson-and-blue palette are the colours of Nepal's flag, whose upper pennant carries the moon and lower pennant the sun. This is the brand mark alone, without the Board's \"official website of Nepal Tourism Board\" administrative strapline.",
      sources: [
        "https://en.wikipedia.org/wiki/File:Nepal_Tourism_Board_logo.svg",
        "https://en.wikipedia.org/wiki/Nepal_Tourism_Board",
        "https://risingnepaldaily.com/news/54769",
        "https://ntb.gov.np/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Nepal Tourism Board, taken from the Board's own site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  FI: [
    {
      id: "fi-visit-finland",
      countryCode: "FI",
      name: "Visit Finland",
      agency: "Visit Finland, part of Business Finland",
      visitors: {
        count: 896000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Finland)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Finland, Category:Tourism in Finland) and the English Wikipedia article for \"Tourism in Finland\" — no usable Visit Finland logo file could be found; the one Commons file returned by search (\"Visit-suomi-2009-05-by-RalfR-061.jpg\") is a photograph of a physical sign, not the brand mark itself.",
      sources: [
        "https://www.visitfinland.com/en/",
        "https://en.wikipedia.org/wiki/Tourism_in_Finland",
      ],
    },
  ],
  GT: [
    {
      id: "gt-asombrosa-e-imparable",
      countryCode: "GT",
      name: "Guatemala — \"Asombrosa e Imparable\"",
      slogan: "Asombrosa e Imparable (Amazing and Unstoppable)",
      agency: "Instituto Guatemalteco de Turismo (INGUAT)",
      launched: 2022,
      visitors: {
        count: 594000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Guatemala)",
      },
      noImageReason:
        "Guatemala's tourism brand changed in 2022 from the long-running \"Guatemala, Corazón del Mundo Maya\" (\"Heart of the Mayan World\") to \"Guatemala, Asombrosa e Imparable\" under President Alejandro Giammattei's government. Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Guatemala\" — no usable logo for either brand could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Guatemala",
        "https://concriterio.gt/no-somos-mas-corazon-del-mundo-maya-hay-nueva-marca-y-costo-q6-8-millones/",
      ],
    },
  ],
  JM: [
    {
      id: "jm-jamaica-tourist-board",
      countryCode: "JM",
      name: "Jamaica",
      agency: "Jamaica Tourist Board (JTB)",
      visitors: {
        count: 1329700,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Jamaica)",
      },
      logo: "/tourism-logos/jm/jamaica.png",
      logoExplainer:
        "The Jamaica destination wordmark used by the Jamaica Tourist Board: \"JAMAICA\" set in heavy black italic capitals with a registered-trademark mark, a plain typographic signature carried across the Board's \"Come Back to Jamaica\" and successor campaigns.",
      sources: [
        "https://www.jtbonline.org/jtb/",
        "https://www.travelweekly.com/Caribbean-Travel/Jamaica-ditches-longtime-slogan",
        "https://www.visitjamaica.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Jamaica Tourist Board, taken from its official visitjamaica.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  GH: [
    {
      id: "gh-ghana-tourism-authority",
      countryCode: "GH",
      name: "Visit Ghana",
      agency: "Ghana Tourism Authority, under the Ministry of Tourism, Culture and Creative Arts",
      visitors: {
        count: 897000,
        year: 2015,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Ghana)",
      },
      logo: "/tourism-logos/gh/visit-ghana.webp",
      logoExplainer:
        "The \"visitGhana\" mark of the Ghana Tourism Authority: \"visit\" in plain black lower-case joined to \"Ghana\", whose letters are filled with woven kente strip-cloth patterning in red, gold, green and black — the colours of the national flag and of Ghana's best-known textile tradition. A small map-pin replaces the dot of the \"i\".",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Ministry_of_Tourism,_Ghana_(Ghana_Tourist_Board)_logo.jpg",
        "https://en.wikipedia.org/wiki/Year_of_Return,_Ghana_2019",
        "https://en.wikipedia.org/wiki/Tourism_in_Ghana",
        "https://visitghana.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Ghana Tourism Authority, taken from the official visitghana.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  NZ: [
    {
      id: "nz-100-pure-new-zealand",
      countryCode: "NZ",
      name: "100% Pure New Zealand",
      slogan: "100% Pure New Zealand",
      agency: "Tourism New Zealand",
      launched: 1999,
      visitors: {
        count: 996000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for New Zealand)",
      },
      noImageReason:
        "\"100% Pure New Zealand\", launched in 1999, is one of the world's longest-running destination-marketing campaigns — its mark stylises \"100% PURE\" above \"NEW ZEALAND\" with the percentage sign's crossbar formed from the shape of the New Zealand islands — but searching Wikimedia Commons and the English Wikipedia articles for \"Tourism New Zealand\" and \"Tourism in New Zealand\" found no usable copy of the logo.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_New_Zealand",
        "https://www.tourismnewzealand.com/news-and-activity/tourism-new-zealands-100-pure-new-zealand-campaign-celebrates-25-years/",
      ],
    },
  ],
  DK: [
    {
      id: "dk-visitdenmark-heart",
      countryCode: "DK",
      name: "VisitDenmark — the Danish Heart",
      agency: "VisitDenmark, Denmark's official tourism organisation",
      launched: 1968,
      visitors: {
        count: 15595000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Denmark)",
      },
      logo: "/tourism-logos/dk/visitdenmark.svg",
      logoExplainer:
        "VisitDenmark's mark: the single word \"VisitDenmark\" in a bold dark sans-serif, followed by a red heart bearing the white Nordic cross of the Dannebrog — the national flag folded into a heart shape.",
      sources: [
        "https://en.wikipedia.org/wiki/VisitDenmark",
        "https://www.toolbox.visitdenmark.com/logo",
        "https://www.visitdenmark.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of VisitDenmark (Denmark's national tourism organisation), taken from its official visitdenmark.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  DO: [
    {
      id: "do-go-dominican-republic",
      countryCode: "DO",
      name: "Go Dominican Republic",
      agency:
        "Ministerio de Turismo (MITUR), the Dominican Republic's Ministry of Tourism, operator of the godominicanrepublic.com consumer brand",
      visitors: {
        count: 2748000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Dominican Republic)",
      },
      logo: "/tourism-logos/do/dominican-republic.svg",
      logoExplainer:
        "The Dominican Republic's destination symbol as used on godominicanrepublic.com: a loose cluster of angular petal and leaf shapes in blue, red, green, orange and yellow arranged as a stylised flower opening upward — a brightly coloured abstract device carrying the tropical palette the Ministry of Tourism markets the country with.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_the_Dominican_Republic",  "https://www.godominicanrepublic.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Dominican Republic Ministry of Tourism, taken from its official godominicanrepublic.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  EG: [
    {
      id: "eg-experience-egypt",
      countryCode: "EG",
      name: "Experience Egypt",
      agency: "Ministry of Tourism and Antiquities, Egypt",
      visitors: {
        count: 13026000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Egypt)",
      },
      logo: "/tourism-logos/eg/experience-egypt.png",
      logoExplainer:
        "The \"Experience Egypt\" destination mark: the word \"Egypt\" drawn as a single flowing blue calligraphic line in which the letter \"y\" is formed into an ankh — the ancient Egyptian hieroglyph for life — tying the modern brand to the pharaonic heritage the campaign promotes.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Ministry_of_Tourism_and_Antiquities_logo.png",
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_and_Antiquities_(Egypt)",
        "https://www.experienceegypt.eg/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Egyptian Tourism Promotion Board, taken from the official experienceegypt.eg site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  CA: [
    {
      id: "ca-destination-canada",
      countryCode: "CA",
      name: "Destination Canada — \"Keep Exploring\"",
      slogan: "Keep Exploring",
      agency:
        "Destination Canada (formerly the Canadian Tourism Commission), a Crown corporation wholly owned by the Government of Canada",
      launched: 2006,
      visitors: {
        count: 32430000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Canada)",
      },
      logo: "/tourism-logos/ca/destination-canada.png",
      logoExplainer:
        "Destination Canada's world-famous \"Keep Exploring\" destination brand: the word \"CANADA\" in bold black capitals alongside the iconic red maple leaf, with the \"KEEP EXPLORING\" slogan in Canadian red below. The campaign served as Canada's primary international tourism brand, inviting travelers worldwide to discover the country's vast wilderness, diverse cultures, and vibrant cities.",
      sources: [
        "https://en.wikipedia.org/wiki/Destination_Canada",
        "https://www.creativebloq.com/news/destination-canada-logo",
        "https://www.canada.travel/",
      ],
      licenceNote:
        "Brand mark of Destination Canada (the federal Crown corporation for tourism marketing), reproduced for destination brand identification.",
    },
  ],
  CL: [
    {
      id: "cl-chile-nature-that-transforms",
      countryCode: "CL",
      name: "Chile — \"Nature That Transforms You\"",
      slogan: "Nature That Transforms You",
      agency:
        "Servicio Nacional de Turismo (SERNATUR), Chile's National Tourism Service, under the Ministry of Economy — country-image promotion is handled separately by the Fundación Imagen de Chile (\"Marca Chile\")",
      visitors: {
        count: 5431000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Chile)",
      },
      logo: "/tourism-logos/cl/chile-travel.svg",
      logoExplainer:
        "The Chile destination mark on chile.travel: a solid red square carrying the word \"Chile\" in white, with a cluster of four white stars of differing sizes rising from the final letter, and the address \"chile.travel\" on a white bar beneath. The lone white star is the emblem of the national flag; the scattered cluster evokes the southern night sky Chile markets for its astronomy tourism.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Sernatur.png",
        "https://en.wikipedia.org/wiki/Tourism_in_Chile",
        "https://www.amchamchile.cl/en/2013/10/turismo-vender-el-chile-real",
        "https://www.chile.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of Chile's national tourism promotion body, taken from the official chile.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  CO: [
    {
      id: "co-the-answer-is-colombia",
      countryCode: "CO",
      name: "Colombia — \"El país de la belleza\"",
      slogan: "El país de la belleza (The country of beauty)",
      agency:
        "ProColombia, under the Ministry of Commerce, Industry and Tourism (the country-brand campaign launched in 2012, replacing the earlier \"Colombia is Passion\")",
      launched: 2012,
      visitors: {
        count: 1396000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Colombia)",
      },
      logo: "/tourism-logos/co/colombia-pais-de-la-belleza.svg",
      logoExplainer:
        "Colombia's destination brand \"El país de la belleza\" (\"the country of beauty\"), launched in 2023: the word \"COLOMBIA\" in navy capitals followed by the country brand's \"CO\" tile — a small square quartered in yellow, blue and red with the letters CO across it — above the tagline in navy. The yellow, blue and red are the national flag's, and the \"CO\" tile is the mark ProColombia uses across tourism, export and investment promotion alike.",
      sources: [
        "https://skift.com/2012/09/12/colombia-launches-new-brand-identity-focusing-on-its-megadiversity/",
        "https://en.wikipedia.org/wiki/Tourism_in_Colombia",
        "https://colombia.co/en/faq-colombia-country-brand",
        "https://colombia.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of ProColombia / the Colombian Ministry of Commerce, Industry and Tourism, taken from the official colombia.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for football-association crests and passport covers.",
    },
  ],
  CR: [
    {
      id: "cr-pura-vida",
      countryCode: "CR",
      name: "esencial COSTA RICA",
      slogan: "Pura Vida (Essential Costa Rica)",
      agency: "Instituto Costarricense de Turismo (ICT), founded 1955",
      visitors: {
        count: 1146500,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Costa Rica)",
      },
      logo: "/tourism-logos/cr/esencial-costa-rica.png",
      logoExplainer:
        "Costa Rica's unified country brand, \"esencial COSTA RICA\": the word \"esencial\" in a flowing green script above \"COSTA RICA\" in black capitals. The brand was adopted in 2013 to carry tourism, exports and investment under one identity, and the green reads directly to the biodiversity and conservation positioning the country markets itself on.",
      sources: [
        "https://en.wikipedia.org/wiki/Pura_Vida",
        "https://www.ict.go.cr/en/institutional-services/country-brand.html",
        "https://www.visitcostarica.com/press/press-releases/general-travel/livin-la-vida-pura",
      ],
      licenceNote:
        "Copyrighted brand mark administered by PROCOMER and the Instituto Costarricense de Turismo, taken from the ICT's official site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  HR: [
    {
      id: "hr-full-of-life",
      countryCode: "HR",
      name: "Croatia — \"Full of Life\"",
      slogan: "Full of Life",
      agency: "Croatian National Tourist Board (Hrvatska turistička zajednica, HTZ)",
      visitors: {
        count: 21608000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Croatia)",
      },
      logo: "/tourism-logos/hr/croatia.webp",
      logoExplainer:
        "The Croatian National Tourist Board's destination mark: the word \"CROATIA\" in rough hand-painted capitals, the letters alternating orange, blue and yellow, with the first A reversed out in white on a blue block, a red-orange painted square above the word and a blue brush stroke trailing off the final letters like water. The faint line \"Croatian National Tourist Board\" sits beneath. The brush-painted treatment and the Adriatic blue carry the board's \"Full of Life\" campaign.",
      sources: [
        "https://www.hina.hr/news/8593016",
        "https://total-croatia-news.com/news/travel/croatia-full-of-life/",
        "https://www.wikidata.org/wiki/Q224",
        "https://croatia.hr/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Croatian National Tourist Board (Hrvatska turistička zajednica), taken from its official croatia.hr site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  CZ: [
    {
      id: "cz-visitczechia",
      countryCode: "CZ",
      name: "VisitCzechia",
      agency: "CzechTourism (agency of the Ministry of Regional Development)",
      visitors: {
        count: 37202000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Czechia)",
      },
      logo: "/tourism-logos/cz/czechia.svg",
      logoExplainer:
        "The Czechia destination wordmark used by CzechTourism on visitczechia.com: the single word \"Czechia\" set in a light red-brown serif and underscored by a thick red rule, a plain typographic mark that leads on the short-form country name adopted for international use in 2016.",
      sources: [
        "https://www.visitczechia.com/en-us/about-us",
        "https://en.wikipedia.org/wiki/Tourism_in_the_Czech_Republic",
      ],
      licenceNote:
        "Copyrighted brand mark of CzechTourism (the Czech Tourist Authority), taken from the official visitczechia.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BA: [
    {
      id: "ba-heart-shaped-land",
      countryCode: "BA",
      name: "Bosnia and Herzegovina — \"The Heart-Shaped Land\"",
      slogan: "The Heart-Shaped Land",
      agency:
        "Tourism promotion in Bosnia and Herzegovina is split between entity-level bodies (the Tourist Board of the Federation of Bosnia and Herzegovina and the Tourist Organisation of Republika Srpska) rather than a single national board",
      visitors: {
        count: 197000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bosnia and Herzegovina)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Bosnia and Herzegovina), the English Wikipedia article for \"Tourism in Bosnia and Herzegovina\", and general web search — the country's own roughly heart-shaped outline gives rise to the widely-used \"Heart-Shaped Land\" tourism slogan, but no single national tourism-board logo could be found: the country's tourism promotion is constitutionally split between the two entities' own tourist boards rather than unified under one national brand mark.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Bosnia_and_Herzegovina",
        "https://emerging-europe.com/the-heart-shaped-land/",
      ],
    },
  ],
  BB: [
    {
      id: "bb-visit-barbados",
      countryCode: "BB",
      name: "Visit Barbados",
      agency: "Barbados Tourism Marketing Inc.",
      visitors: {
        count: 966000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Barbados)",
      },
      logo: "/tourism-logos/bb/barbados.svg",
      logoExplainer:
        "Barbados's destination wordmark: \"BARBADOS\" in heavy dark-teal capitals, the \"O\" replaced by the broken trident head taken from the national flag. The broken trident stands for the island's break with its colonial past and is the country's central national symbol.",
      sources: [
        "https://www.visitbarbados.org/",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Barbados",
      ],
      licenceNote:
        "Copyrighted brand mark of Barbados Tourism Marketing Inc., taken from the official visitbarbados.org site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BE: [
    {
      id: "be-visitflanders",
      countryCode: "BE",
      name: "VISITFLANDERS",
      agency:
        "Belgium has no single national tourism board — tourism promotion is a competence of its three regions, each with its own body and brand: VISITFLANDERS (Flanders), Wallonie Belgique Tourisme / Visit Wallonia (Wallonia), and visit.brussels (Brussels-Capital Region)",
      visitors: {
        count: 2584000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Belgium)",
      },
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia article for \"Tourism in Belgium\", and each region's own site (visitflanders.com, visitwallonia.be, visit.brussels) — no usable logo file for any of the three regional tourism boards could be found on Commons or Wikipedia. Belgium's tourism branding is federated (like the UK's four home-nation football associations), so a single \"Belgium\" mark would misrepresent how the country actually promotes itself.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Belgium",
        "https://www.visitflanders.com/en",
        "https://www.visit.brussels/en/press/branding",
      ],
    },
  ],
  BH: [
    {
      id: "bh-visit-bahrain",
      countryCode: "BH",
      name: "Bahrain Tourism and Exhibitions Authority",
      agency:
        "Bahrain Tourism and Exhibitions Authority (BTEA), established by Royal Decree 76/2015, operator of the \"Visit Bahrain\" brand",
      launched: 2015,
      visitors: {
        count: 1909000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bahrain)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Bahrain), the English Wikipedia article for \"Tourism in Bahrain\", and the BTEA's own bahrain.com / portal.btea.bh sites — no usable BTEA / Visit Bahrain logo file could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Bahrain",
        "https://portal.btea.bh/MainP/AboutUs",
      ],
    },
  ],
  BI: [
    {
      id: "bi-tourism-office",
      countryCode: "BI",
      name: "Burundi — \"Heart of Africa\"",
      agency: "Office National du Tourisme, Burundi's national tourism authority",
      visitors: {
        count: 299000,
        year: 2017,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Burundi)",
      },
      logo: "/tourism-logos/bi/burundi-heart-of-africa.png",
      logoExplainer:
        "Burundi's destination mark: the country's outline drawn in red and green enclosing a heart shape, with a traditional Burundian drum above it and the words \"Burundi\" and \"Heart of Africa\" in red and green script. The karyenda drum is Burundi's central national symbol — its drummers are inscribed on UNESCO's intangible-heritage list — and the heart makes the slogan literal while nodding to the country's position in the middle of the continent.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Burundi", "https://www.tourisme.gov.bi/"],
      licenceNote:
        "Copyrighted brand mark of Burundi's Office National du Tourisme, bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BJ: [
    {
      id: "bj-un-monde-de-splendeurs",
      countryCode: "BJ",
      name: "Benin — \"A World of Splendors\"",
      slogan: "A World of Splendors",
      agency: "Bénin Tourisme, under the Ministry of Tourism, Culture and Arts",
      visitors: {
        count: 337000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Benin)",
      },
      noImageReason:
        "Benin unveiled a new country-brand visual identity, \"Bénin, un Monde de Splendeurs\" (\"Benin, a World of Splendors\"), drawing on the Amazones, Bio Guéra, Gèlèdè and Egungun motifs — but the logo is only published on the government's own benin.bj site, and no usable copy could be found on Wikimedia Commons or Wikipedia after searching both.",
      sources: [
        "https://benin.bj/en/sectors/tourism",
        "https://jumelages-partenariats.com/en/actualites.php?n=23522&art=Benin_unveils_the_visual_identity_of_its_country_brand%3A_%22Benin%2C_a_World_of_Splendors%22.",
        "https://en.wikipedia.org/wiki/Tourism_in_Benin",
      ],
    },
  ],
  BN: [
    {
      id: "bn-brunei-tourism",
      countryCode: "BN",
      name: "Brunei — \"Abode of Peace\"",
      slogan: "Abode of Peace",
      agency:
        "Brunei Tourism, under the Ministry of Primary Resources and Tourism",
      visitors: {
        count: 1071000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Brunei)",
      },
      logo: "/tourism-logos/bn/brunei-abode-of-peace.webp",
      logoExplainer:
        "Brunei's destination mark: the word \"BRUNEI\" in widely spaced capitals, each letter a different colour — red, green, blue, yellow and black — above the line \"ABODE OF PEACE\". \"Abode of Peace\" is the translation of Darussalam in the country's full name, Negara Brunei Darussalam.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Brunei",
        "https://www.bruneitourism.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of Brunei Tourism, taken from the official bruneitourism.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BT: [
    {
      id: "bt-bhutan-believe",
      countryCode: "BT",
      name: "Bhutan — \"Believe\"",
      slogan: "Believe",
      agency: "Tourism Council of Bhutan",
      launched: 2022,
      visitors: {
        count: 29800,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bhutan; a pandemic-year figure — Bhutan's tourism reopened in September 2022 under the current brand)",
      },
      noImageReason:
        "The Tourism Council of Bhutan launched the country's current national brand, \"Bhutan: Believe\", on 22 September 2022 (replacing the earlier \"Happiness Is a Place\" brand, which paired a blue-poppy motif with its tagline). Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Bhutan\" — no usable logo for either brand could be found on Commons or Wikipedia.",
      sources: [
        "https://www.dailybhutan.com/article/bhutan-has-a-new-brand-and-tagline-bhutan-believe",
        "https://www.fastcompany.com/90801783/heres-why-bhutan-just-gave-itself-a-new-brand",
        "https://en.wikipedia.org/wiki/Tourism_in_Bhutan",
      ],
    },
  ],
  BO: [
    {
      id: "bo-corazon-del-sur",
      countryCode: "BO",
      name: "Bolivia — \"Corazón del Sur\"",
      slogan: "Corazón del Sur (Heart of the South)",
      agency:
        "Viceministerio de Turismo, under Bolivia's Ministry of Culture, Decolonisation and Depatriarchalisation",
      launched: 2017,
      visitors: {
        count: 323300,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bolivia)",
      },
      noImageReason:
        "Bolivia's current official country brand, \"Bolivia Corazón del Sur\" (\"Bolivia, Heart of the South\"), was established by Supreme Decree in 2017, replacing the earlier \"Bolivia te espera\" (\"Bolivia awaits you\") tourism logo used from 2010. Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Bolivia\" — no usable logo for either brand could be found on Commons or Wikipedia; copies of the older \"Bolivia te espera\" mark exist only on commercial logo-aggregator sites with no verifiable licence.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Bolivia",
        "https://www.rigobertoparedes.com/en/country-brand-registration/",
      ],
    },
  ],
  AU: [
    {
      id: "au-come-and-say-gday",
      countryCode: "AU",
      name: "Come and Say G'day",
      slogan: "Come and Say G'day",
      agency:
        "Tourism Australia — the Australian Government's tourism-marketing statutory authority, established under the Tourism Australia Act 2004",
      launched: 2022,
      visitors: {
        count: 7630000,
        year: 2024,
        metric:
          "International short-term visitor arrivals, calendar year (Australian Bureau of Statistics, Overseas Arrivals and Departures)",
      },
      logo: "/tourism-logos/au/australia-kangaroo.svg",
      logoExplainer:
        "The country lockup of Tourism Australia's kangaroo brandmark as it appears on australia.com: the word \"Australia\" in warm ochre beside a stylised kangaroo mid-leap, formed from a golden sun disc and sweeping green, blue and ochre strokes. The palette is drawn from the Australian landscape — sun, bush and sea — and the kangaroo has been the country's tourism signature since the mark's 2012 Interbrand redesign. This is the consumer lockup, not the corporate \"TOURISM AUSTRALIA\" version.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_Australia",
        "https://www.designweek.co.uk/issues/may-2012/interbrand-creates-new-identity-for-tourism-australia/",
        "https://www.tourism.australia.com/en/news-and-events/news/global-campaign-to-invite-the-world-to-come-and-say-gday-media-release.html",
        "https://www.australia.com/",
      ],
      licenceNote:
        "Copyrighted brandmark of Tourism Australia (the Australian Government's statutory tourism-marketing authority), taken from its own consumer site australia.com and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers. Tourism Australia retains all trademark rights.",
    },
  ],
  MY: [
    {
      id: "my-tourism-malaysia",
      countryCode: "MY",
      name: "Tourism Malaysia",
      slogan: "Malaysia, Truly Asia",
      agency:
        "Tourism Malaysia (Malaysia Tourism Promotion Board), under the Ministry of Tourism, Arts and Culture",
      launched: 1999,
      visitors: {
        count: 25016698,
        year: 2024,
        metric:
          "International tourist arrivals (Tourism Malaysia, \"Malaysia Tourism Statistics in Brief 2024\")",
      },
      logo: "/tourism-logos/my/tourism-malaysia.svg",
      logoExplainer:
        "A red hibiscus — bunga raya, Malaysia's national flower — sits at the centre of the mark beside the \"Malaysia\" wordmark and the \"Truly Asia\" tagline the board has used since 1999. As the national flower, the hibiscus's five petals are commonly read as representing the five principles of the Rukun Negara (the national philosophy), extending that civic symbolism into the tourism brand.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Malaysia_Truly_Asia_logo.svg",
        "https://en.wikipedia.org/wiki/Tourism_Malaysia",
        "https://data.tourism.gov.my/frontend/pdf/New_Final_Malaysia%20Tourism%20Statistics%20in%20Brief%202024.pdf",
      ],
      licenceNote:
        "Public domain: the mark consists of simple geometric shapes and text below the threshold of copyright originality (per its Wikimedia Commons file page), sourced from the official tourism.gov.my website. It remains a protected trademark of Tourism Malaysia in commerce.",
    },
  ],
  BR: [
    {
      id: "br-marca-brasil",
      countryCode: "BR",
      name: "Marca Brasil",
      slogan: "It's Spectacular. It's Brasil",
      agency: "Embratur (Instituto Brasileiro de Turismo), together with ApexBrasil",
      visitors: {
        count: 6621000,
        year: 2024,
        metric:
          "International tourist arrivals, consolidated Embratur / Ministry of Tourism / Federal Police data",
      },
      logo: "/tourism-logos/br/marca-brasil.webp",
      logoExplainer:
        "Marca Brasil, the consumer-facing destination brand Embratur promotes Brazil under: the word \"BRASIL\" in white capitals set on a cluster of overlapping translucent organic curves in green, yellow, blue, red and orange. Designed by Kiko Farkas in 2005 for the Plano Aquarela and relaunched by Embratur in February 2023, the mark takes the green, yellow and blue of the national flag and adds the reds and oranges Farkas associated with Brazilian exuberance; the soft interlocking shapes, rather than a geometric device, are meant to read as the country's diversity and informality.",
      sources: [
        "https://pt.wikipedia.org/wiki/Instituto_Brasileiro_de_Turismo",
        "https://embratur.com.br/2023/02/14/brasil-reafirma-compromisso-com-sustentabilidade-com-retomada-de-logomarca-internacional/",
        "https://www.printmag.com/branding-identity-design/kiko-farkas-talks-about-his-curvaceous-marca-brasil/",
        "https://www.gov.br/secom/en/latest-news/2024/12/brazil-welcomed-6-6-million-international-tourists-in-2024-its-best-historical-mark",
        "https://www.itij.com/latest/news/brazil-records-record-tourist-numbers",
        "https://embratur.com.br/2023/07/24/spetacular-sustainable-embratur-assume-brasil-com-s-em-campanha-nos-eua/",
        "https://marca.visitbrasil.com",
      ],
      licenceNote:
        "Copyrighted brand mark of Embratur (Instituto Brasileiro de Turismo). The live marca.visitbrasil.com and visitbrasil.com domains sit behind a Cloudflare bot challenge that returns HTTP 403 to every automated request, so the asset was recovered from the Internet Archive's December 2024 capture of Embratur's own visitbrasil.com (the file the site itself serves as its brand logo). Bundled for identification of the destination brand, on the same non-free basis this repository uses for football-association crests and passport covers.",
    },
  ],
  ID: [
    {
      id: "id-wonderful-indonesia",
      countryCode: "ID",
      name: "Wonderful Indonesia",
      agency:
        "Ministry of Tourism and Creative Economy of Indonesia (Kementerian Pariwisata dan Ekonomi Kreatif)",
      launched: 2011,
      visitors: {
        count: 13900000,
        year: 2024,
        metric:
          "International visitor arrivals, calendar year (BPS-Statistics Indonesia)",
      },
      logo: "/tourism-logos/id/wonderful-indonesia.png",
      logoExplainer:
        "\"Wonderful Indonesia\" was inaugurated on 1 January 2011 as the country's unified destination brand, replacing several earlier, less consistent slogans (including \"Visit Indonesia\"). The wordmark pairs the country's name with the tagline in a rounded, colourful sans-serif treatment intended to read as approachable and diverse — echoing the ministry's own framing of Indonesia's appeal as spanning nature, culture and modern city life across its many islands.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Logo_Wonderful_Indonesia.png",
        "https://en.wikipedia.org/wiki/Wonderful_Indonesia",
        "https://www.bps.go.id/en/pressrelease/2025/02/03/2407/the-international-visitor-arrivals-in-december-2024-were-1-24-million--whichincreased-by-8-72-percent-year-on-year--y-on-y--.html",
      ],
      licenceNote:
        "Public domain in Indonesia — published and distributed by the Government of the Republic of Indonesia under Article 43 of Law 28 of 2014 on copyrights, which exempts government publications from copyright restriction (per the file's Wikimedia Commons licence tag).",
    },
  ],
  IT: [
    {
      id: "it-italia",
      countryCode: "IT",
      name: "Italia",
      slogan: "Made in Italy",
      agency:
        "ENIT S.p.A. (Agenzia Nazionale del Turismo / Italian Government Tourist Board), under the Ministry of Tourism",
      visitors: {
        count: 89000000,
        year: 2024,
        metric:
          "International (non-resident) tourist arrivals at accommodation establishments, calendar year (ISTAT, Istituto Nazionale di Statistica)",
      },
      logo: "/tourism-logos/it/enit.png",
      logoExplainer:
        "The famous \"ITALIA\" destination brandmark: the country's name hand-painted in vibrant blue brush strokes, accented by the green, red, and yellow paint dashes celebrating Italian culture, style, and landscape. Developed for Italy's national tourism campaigns and the official italia.it portal, it represents the country's celebrated heritage and creative spirit.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:ENIT_logo.png",
        "https://en.wikipedia.org/wiki/ENIT",
        "https://www.italia.it/",
        "https://www.istat.it/en/press-release/tourist-flows-fourth-quarter-2024/",
      ],
      licenceNote:
        "Official brand mark of the Italian National Tourist Board (ENIT), taken from its official promotional materials and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  AF: [
    {
      id: "af-tourism-directorate",
      countryCode: "AF",
      name: "Tourism Directorate, Ministry of Information and Culture",
      agency:
        "Tourism Directorate, Ministry of Information and Culture (Afghanistan's national tourism authority; the earlier Afghan Tourist Organization, founded 1958, is now defunct)",
      visitorsNote:
        "No comprehensive, authoritative recent international-arrivals count for Afghanistan could be sourced. The World Bank's tourism indicator (ST.INT.ARVL) carries no recent figure for Afghanistan, and no other authoritative statistical body publishes a current count; media coverage of Afghan tourism is limited to isolated visitor-number claims from the Tourism Directorate that are not independently verifiable.",
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia articles for \"Tourism in Afghanistan\" and the Ministry of Information and Culture, and the Ministry's own website (moic.gov.af) and the Tourism Directorate's coverage — no distinct tourism-board logo or destination-marketing brand mark (comparable to Malaysia's or Indonesia's) is documented or freely licensed anywhere found. Afghanistan's tourism promotion is handled directly by a Ministry directorate rather than a separate branded body.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Afghanistan",
        "https://moic.gov.af/en/official-establishment-tourism-directorate-0",
      ],
    },
  ],
  AD: [
    {
      id: "ad-andorra-turisme",
      countryCode: "AD",
      name: "Visit Andorra",
      agency:
        "Andorra Turisme SAU, the public tourism-promotion company established 21 September 2007, operator of the Visit Andorra brand",
      launched: 2007,
      visitorsNote:
        "No dated, authoritative Andorra-specific arrivals figure distinct from cross-border day-trip traffic could be sourced within this search; Andorra's own tourism statistics largely track overnight stays and skier-days rather than a single comparable \"international arrivals\" total.",
      logo: "/tourism-logos/ad/visit-andorra.webp",
      logoExplainer:
        "Andorra's destination mark: the word \"Andorra\" in a black serif preceded by a triangular arrow-like device split into the yellow, blue and red of the national flag, its point facing right as a mark of forward movement.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Andorra",
        "https://visitandorra.com/en/about-us/",
      ],
      licenceNote:
        "Copyrighted brand mark of Andorra Turisme, taken from the official visitandorra.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  AL: [
    {
      id: "al-go-your-own-way",
      countryCode: "AL",
      name: "Albania — \"All Senses\"",
      slogan: "All Senses",
      agency:
        "National Tourism Agency of Albania (Agjencia Kombëtare e Turizmit), under the Ministry of Tourism and Environment",
      launched: 2014,
      visitors: {
        count: 2658000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Albania; more recent Albanian government figures report substantially higher post-pandemic totals but were not found in a form citable to a single authoritative dated release)",
      },
      logo: "/tourism-logos/al/albania-all-senses.svg",
      logoExplainer:
        "The \"Albania — All Senses\" brand of the National Tourism Agency: the country name in tall capitals above the words \"ALL SENSES\", both filled with a gradient running from sea-blue through turquoise to green, the letter shapes cut with angular peaks that read as mountains against the coast.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Albania",
        "https://www.tiranatimes.com/albania-go-your-own-way-to-lead-new-global-ad-campaign_116662/",
        "https://albania.al/",
      ],
      licenceNote:
        "Copyrighted brand mark of Agjencia Kombëtare e Turizmit (Albanian National Tourism Agency), taken from the official albania.al site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  AR: [
    {
      id: "ar-visit-argentina",
      countryCode: "AR",
      name: "Visit Argentina",
      agency:
        "INPROTUR (Instituto Nacional de Promoción Turística), a public-private body established under Argentina's National Tourism Law 25,997 (2004)",
      visitors: {
        count: 10930000,
        year: 2024,
        metric:
          "International visitors (tourists + day-trippers), calendar year (INDEC, Instituto Nacional de Estadística y Censos)",
      },
      logo: "/tourism-logos/ar/visit-argentina.svg",
      logoExplainer:
        "The \"Visit Argentina\" lockup used on argentina.travel: a navy roundel built from interlocking petal shapes radiating from a small centre — a sun rosette echoing the Sol de Mayo of the national flag — set beside the words \"Visit Argentina\" in the same navy.",
      sources: [
        "https://es.wikipedia.org/wiki/Instituto_Nacional_de_Promoci%C3%B3n_Tur%C3%ADstica",
        "https://www.argentina.travel/en/institutional",
      ],
      licenceNote:
        "Copyrighted brand mark of INPROTUR / Visit Argentina, taken from the official argentina.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  AT: [
    {
      id: "at-austrian-national-tourist-office",
      countryCode: "AT",
      name: "Austria",
      agency:
        "Österreich Werbung (Austrian National Tourist Office / ANTO), Austria's national tourism-marketing organisation",
      visitors: {
        count: 46710000,
        year: 2024,
        metric:
          "Arrivals at Austrian accommodation establishments, calendar year (Statistik Austria) — Austria's own published measure of visitor arrivals; not broken out here into a separate international-only figure",
      },
      logo: "/tourism-logos/at/austria.svg",
      logoExplainer:
        "Österreich Werbung's destination mark as shown on austria.info: the word \"Austria\" set in a heavy black serif, with the dot of the \"i\" replaced by two short red bars separated by white — the red-white-red of the national flag, tilted as if brushed on.",
      sources: [
        "https://www.wikidata.org/wiki/Q298700",
        "https://b2b.austria.info/us/about-us-1/the-austrian-national-tourist-office/",
        "https://www.theinternational.at/austria-is-the-worlds-13th-most-visited-country-in-2024/",
        "https://www.austria.info/en",
      ],
      licenceNote:
        "Copyrighted brand mark of Österreich Werbung (the Austrian National Tourist Office), taken from its official austria.info site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  AZ: [
    {
      id: "az-land-of-fire",
      countryCode: "AZ",
      name: "Azerbaijan",
      slogan: "Land of Fire",
      agency:
        "Azerbaijan Tourism Board, under the Ministry of Culture and Tourism",
      visitors: {
        count: 796000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Azerbaijan)",
      },
      logo: "/tourism-logos/az/azerbaijan.svg",
      logoExplainer:
        "The Azerbaijan destination mark: the country name in lower-case purple type beside a device of two overlapping rounded shapes in crimson and purple, the pair reading as a stylised pomegranate cut open — the fruit Azerbaijan uses as its best-known national emblem and the subject of its own annual festival.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Azerbaijan",
        "https://en.wikipedia.org/wiki/Land_of_Fire",
        "https://azerbaijan.travel/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Azerbaijan Tourism Board, taken from the official azerbaijan.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BG: [
    {
      id: "bg-discovery-to-share",
      countryCode: "BG",
      name: "Bulgaria",
      slogan: "A Discovery to Share",
      agency:
        "Ministry of Tourism of Bulgaria (Bulgaria Travel brand)",
      launched: 2013,
      visitors: {
        count: 4973000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bulgaria)",
      },
      logo: "/tourism-logos/bg/bulgaria.png",
      logoExplainer:
        "Bulgaria's destination mark: a solid orange square carrying the word \"BULGARIA\" in a rough white hand-drawn capital, above which a rose is sketched in a single continuous white line. The rose is Bulgaria's defining national emblem — the Rose Valley around Kazanlak supplies a large share of the world's rose oil and has its own annual festival.",
      sources: [
        "https://sofiaglobe.com/2013/01/17/new-brand-bulgaria-tourism-promotional-logo-and-slogans-unveiled/",
        "https://www.tourism.government.bg/sites/trsm.gateway.bg/archive/en/themes/official-logo-of-bulgaria-274-308.html",
        "https://bulgariatravel.org/",
      ],
      licenceNote:
        "Copyrighted brand mark of Bulgaria's Ministry of Tourism, taken from its official bulgariatravel.org site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BD: [
    {
      id: "bd-bangladesh-tourism-board",
      countryCode: "BD",
      name: "Bangladesh Tourism Board",
      agency:
        "Bangladesh Tourism Board, a statutory body established 2010 under the Ministry of Civil Aviation and Tourism",
      launched: 2010,
      visitors: {
        count: 323000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bangladesh)",
      },
      logo: "/tourism-logos/bd/bangladesh-tourism-board.png",
      logoExplainer:
        "The mark of the Bangladesh Tourism Board, the country's national tourism organisation: the word \"Bangladesh\" in a flowing green script whose initial B is drawn as an open curve, above a red bar carrying \"Tourism Board\" in white and the line \"National Tourism Organization\" beneath. Green and red are the colours of the national flag, where a red disc sits on a green field.",
      sources: [
        "https://en.wikipedia.org/wiki/Bangladesh_Tourism_Board",
        "https://www.wikidata.org/wiki/Q28225452",
        "https://tourismboard.gov.bd/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Bangladesh Tourism Board, taken from its official tourismboard.gov.bd site and bundled for identification of the national tourism brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  AE: [
    {
      id: "ae-visit-uae",
      countryCode: "AE",
      name: "Visit UAE",
      agency:
        "Ministry of Economy and Tourism, United Arab Emirates",
      launched: 2026,
      visitorsNote:
        "The UAE has no single published federal international-arrivals total for a full year: tourism statistics are reported separately by emirate (Dubai alone recorded 18.72 million international overnight visitors in 2024, per the Dubai Department of Economy and Tourism), and no consolidated seven-emirate figure could be sourced.",
      noImageReason:
        "\"Visit UAE\" was unveiled by the Ministry of Economy and Tourism at Arabian Travel Market on 16 September 2026 as the country's first unified national tourism brand at the federal level, replacing separate emirate-level identities (Visit Dubai, Abu Dhabi's Abu Moments, Visit Sharjah, and others). It is too newly launched for any usable logo image to exist on Wikimedia Commons or elsewhere yet; this entry will be updated once an authoritative image becomes available.",
      sources: [
        "https://gulfnews.com/business/tourism/uae-launches-visit-uae-brand-to-unite-seven-emirates-under-one-tourism-identity-1.500676742",
        "https://www.gccbusinessnews.com/uae-launches-visit-uae-uae-grand-tour/",
        "https://www.dubaidet.gov.ae/en/research-and-insights/annual-visitor-report-2024",
      ],
    },
  ],
  NR: [
    {
      id: "nr-nauru-tourism-corporation",
      countryCode: "NR",
      name: "Nauru Tourism Corporation",
      agency:
        "Nauru Tourism Corporation, a statutory corporation established under the Nauru Tourism Corporation Act 2019",
      launched: 2019,
      visitorsNote:
        "No comprehensive or recent international tourist-arrival statistics are published for Nauru. The most recent sourced figure found is a 2008 Australian outbound-travel survey recording 478 Australian visitors to Nauru that year (Pacific Islands Trade & Investment Commission, cited via Wikipedia's \"Tourism in Nauru\"); Nauru is widely reported in travel media as one of the world's least-visited countries, but no authoritative up-to-date arrivals count could be sourced to cite here.",
      noImageReason:
        "Searched Wikimedia Commons, Wikipedia (\"Tourism in Nauru\", \"Nauru Tourism Corporation\"), the Corporation's official Facebook and X/Twitter accounts, and general web search for an official Nauru Tourism Corporation logo or emblem. No usable or otherwise citable official logo image could be found — only the Corporation's name, its founding legislation and a social-media presence with no confirmed distinct brand mark are documented online.",
      sources: [
        "https://faolex.fao.org/docs/pdf/nau188240.pdf",
        "https://en.wikipedia.org/wiki/Tourism_in_Nauru",
        "https://x.com/nauru_tourismco",
      ],
    },
  ],
  VA: [
    {
      id: "va-vatican-museums",
      countryCode: "VA",
      name: "Vatican Museums",
      agency: "Governorate of Vatican City State — Musei Vaticani (Vatican Museums)",
      visitors: {
        count: 6800000,
        year: 2024,
        metric:
          "Vatican Museums annual visitors — not directly comparable to other entries' international-arrivals figures, since Vatican City has no border crossing or arrivals count of its own",
      },
      logo: "/tourism-logos/va/vatican-museums.svg",
      logoExplainer:
        "The Holy See has no dedicated national tourism-promotion board of the kind other states maintain; its principal visitor-facing institution is the Vatican Museums, the Governorate of Vatican City State body that receives the millions of pilgrims and tourists who visit each year. The mark shown is the Vatican Museums' own coat of arms — original artwork by Fabio Mochi — used as the institution's visual identity on signage and publications.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Musei_vaticani_Coat_of_Arms.svg",
        "https://en.wikipedia.org/wiki/Vatican_Museums",
        "https://dioceseofraleigh.org/news/nearly-7-million-visitors-vatican-museums-numbers-climb-back-pre-pandemic-times",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons under CC BY 4.0 (vector conversion by Commons user Kaidor of original artwork by Fabio Mochi); reproduced here with attribution.",
    },
  ],
  KR: [
    {
      id: "kr-korea-tourism-organization",
      countryCode: "KR",
      name: "Korea Tourism Organization",
      slogan: "Imagine your Korea",
      agency: "Korea Tourism Organization (KTO)",
      visitors: {
        count: 16370000,
        year: 2024,
        metric:
          "International visitor arrivals, calendar year (Korea Tourism Organization) — up 48% on 2023, 94% of the pre-pandemic 2019 record",
      },
      logo: "/tourism-logos/kr/kto.png",
      logoExplainer:
        "The Korea Tourism Organization's own mark — a multicoloured abstract dancing figure formed from overlapping rings — is the symbol KTO uses across its consumer-facing \"Imagine your Korea\" marketing, not a government-ministry seal.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Korea-Tourism-Organization-en.png",
        "https://en.wikipedia.org/wiki/Korea_Tourism_Organization",
      ],
      licenceNote:
        "Public domain per its Commons file page — \"consists only of simple geometric shapes or text\", below the threshold of originality — but carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original file could not be downloaded directly within this session's rate limits.",
    },
  ],
  PE: [
    {
      id: "pe-marca-peru",
      countryCode: "PE",
      name: "Marca Perú",
      slogan: "Perú, Imperio de Tesoros Escondidos",
      agency: "PromPerú (Comisión de Promoción del Perú para la Exportación y el Turismo), under MINCETUR",
      launched: 2011,
      visitors: {
        count: 3256693,
        year: 2024,
        metric:
          "International tourist arrivals, calendar year (Mincetur / Superintendencia Nacional de Migraciones) — up 29% on 2023",
      },
      logo: "/tourism-logos/pe/marca-peru.jpg",
      logoExplainer:
        "The Marca Perú mark is a stylised red-and-white \"P\" drawn as a spiral echoing pre-Columbian Nazca and textile motifs, trailing into the cursive word \"Perú\" — PromPerú's country brand launched in 2011 and used across all of Peru's consumer tourism and export promotion.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Marca_Per%C3%BA.jpg",
        "https://en.wikipedia.org/wiki/PromPer%C3%BA",
      ],
      licenceNote:
        "Public domain per its Commons file page — \"consists only of simple geometric shapes or text\" — attributed to PromPerú (MINCETUR); carries a trademark notice for commercial use.",
    },
  ],
  TR: [
    {
      id: "tr-goturkiye",
      countryCode: "TR",
      name: "Go Türkiye",
      agency: "Türkiye Tourism Promotion and Development Agency (TGA), under the Ministry of Culture and Tourism",
      launched: 2021,
      visitors: {
        count: 62270000,
        year: 2024,
        metric:
          "International visitor arrivals, calendar year (Republic of Türkiye Ministry of Culture and Tourism) — a record high, up 9.8% on 2023",
      },
      logo: "/tourism-logos/tr/turkiye.png",
      logoExplainer:
        "The Go Türkiye mark renders the word \"Türkiye\" in a bold brush-script hand, with a small tulip motif — the flower long emblematic of Turkish and Ottoman decorative art — worked into the accent above the \"ü\". It is the country's official tourism promotion brand, published by the Türkiye Tourism Promotion and Development Agency's own branding guidelines site.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:T%C3%BCrkiye_logo.svg",
        "https://en.wikipedia.org/wiki/Turkey_Home",
        "https://branding.goturkiye.com/",
      ],
      licenceNote:
        "Public domain per its Commons file page — \"consists only of simple geometric shapes or text\" — attributed to the Türkiye Tourism Promotion and Development Agency; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  MX: [
    {
      id: "mx-visitmexico",
      countryCode: "MX",
      name: "VisitMéxico",
      agency: "Secretaría de Turismo (SECTUR), Mexico's federal Secretariat of Tourism",
      visitors: {
        count: 38331000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Mexico)",
      },
      noImageReason:
        "SECTUR took over Mexico's tourism-branding responsibilities after the former Mexico Tourism Board (Consejo de Promoción Turística de México) was dissolved in 2019; searched Wikimedia Commons (Category:Logos of Mexico, Category:Logos of governments and government agencies of Mexico) and English/Spanish Wikipedia — the only shown tourism-related file found (\"Logo Secretaría de Turismo.png\") is SECTUR's own institutional department seal, not the consumer-facing \"VisitMéxico\" wordmark shown at visitmexico.com, and no usable copy of that consumer mark could be found.",
      sources: [
        "https://en.wikipedia.org/wiki/Secretariat_of_Tourism_(Mexico)",
        "https://en.wikipedia.org/wiki/Mexico_Tourism_Board",
        "https://visitmexico.com/eng/home-2/",
      ],
    },
  ],
  PT: [
    {
      id: "pt-visitportugal",
      countryCode: "PT",
      name: "Turismo de Portugal",
      agency: "Turismo de Portugal, Portugal's National Tourism Authority under the Ministry of the Economy",
      visitors: {
        count: 16240000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Portugal)",
      },
      logo: "/tourism-logos/pt/turismo-de-portugal.png",
      logoExplainer:
        "The national tourism identity Portugal uses across Turismo de Portugal and its Visit Portugal consumer channels: the words \"TURISMO DE PORTUGAL\" beside a device in which a stylised human figure in the green and red of the national flag stands with arms raised above three blue wave lines — the figure reading as a welcome and the waves as the Atlantic coast Portuguese tourism is built around.",
      sources: [
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Portugal",
        "https://www.visitportugal.com/en",
        "https://en.wikipedia.org/wiki/Tourism_in_Portugal",
        "https://www.turismodeportugal.pt/",
      ],
      licenceNote:
        "Copyrighted brand mark of Turismo de Portugal, I.P., taken from its official turismodeportugal.pt site and bundled for identification of the national tourism brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  GR: [
    {
      id: "gr-greek-national-tourism-organisation",
      countryCode: "GR",
      name: "Greece — \"All You Want Is Greece\"",
      slogan: "All You Want Is Greece",
      agency: "Greek National Tourism Organisation (GNTO / ΕΟΤ), under the Ministry of Tourism",
      launched: 2021,
      visitors: {
        count: 31347000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Greece)",
      },
      logo: "/tourism-logos/gr/visit-greece.webp",
      logoExplainer:
        "The Visit Greece mark as shown on visitgreece.gr: the word \"GREECE\" in white serif capitals, outlined by a thin white keyline, on a solid cyan field — the blue of the Greek flag and of the Aegean the brand is built around.",
      sources: [
        "https://en.wikipedia.org/wiki/Greek_National_Tourism_Organisation",
        "https://commons.wikimedia.org/wiki/Category:Ministry_of_Tourism_(Greece)",
        "https://www.visitgreece.gr/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Greek National Tourism Organisation (EOT), taken from its official visitgreece.gr site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  VN: [
    {
      id: "vn-vietnam-timeless-charm",
      countryCode: "VN",
      name: "Vietnam — \"Vietnam: Timeless Charm\"",
      slogan: "Vietnam: Timeless Charm",
      agency: "Vietnam National Authority of Tourism (VNAT), under the Ministry of Culture, Sports and Tourism",
      visitors: {
        count: 18009000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Vietnam)",
      },
      logo: "/tourism-logos/vn/vietnam-timeless-charm.png",
      logoExplainer:
        "The \"Vietnam — Timeless Charm\" national tourism brand: the word \"Vietnam\" in a blue script whose initial V rises into a five-petalled lotus rendered in graduated blue, green, yellow, pink and purple, with the tagline \"Timeless Charm\" beneath. The lotus is Vietnam's national flower and its five petals stand for the five elements and the five brand values the campaign names.",
      sources: [
        "https://en.wikipedia.org/wiki/Vietnam_National_Authority_of_Tourism",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Vietnam",
        "https://vietnam.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Vietnam National Authority of Tourism, taken from the official vietnam.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  JO: [
    {
      id: "jo-jordan-tourism-board",
      countryCode: "JO",
      name: "Jordan Tourism Board",
      agency: "Jordan Tourism Board (JTB), under the Ministry of Tourism and Antiquities",
      visitors: {
        count: 5367000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Jordan)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Symbols of Jordan, Category:National emblem of Jordan) and the English Wikipedia articles for the Ministry of Tourism and Antiquities (Jordan) and Tourism in Jordan — no usable Jordan Tourism Board logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_and_Antiquities_(Jordan)",
        "https://en.wikipedia.org/wiki/Tourism_in_Jordan",
      ],
    },
  ],
  PL: [
    {
      id: "pl-polska-travel",
      countryCode: "PL",
      name: "Polska",
      agency: "Polska Organizacja Turystyczna (POT), the Polish Tourism Organisation",
      visitors: {
        count: 21165000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Poland)",
      },
      logo: "/tourism-logos/pl/polska.svg",
      logoExplainer:
        "The \"Polska\" national brand used by the Polish Tourism Organisation: the country's own name for itself hand-lettered in red, with the loop of the initial P drawn as a kite flying on a string and a scribbled wave beneath the final letters. The mark, designed in 2002, uses the red of the national flag; the kite reads as lightness and openness and the wave as the Baltic coast.",
      sources: [
        "https://en.wikipedia.org/wiki/Polish_Tourism_Organisation",
        "https://www.poland.travel/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Polska Organizacja Turystyczna (Polish Tourism Organisation), taken from its official poland.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  IL: [
    {
      id: "il-ministry-of-tourism",
      countryCode: "IL",
      name: "Israel Ministry of Tourism",
      agency: "Ministry of Tourism (Israel)",
      visitors: {
        count: 4550000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Israel)",
      },
      noImageReason:
        "The only tourism-related file found on Wikimedia Commons (\"IL-Isr-tour-logo.png\", Category:Logo of the Ministry of Tourism (Israel)) is captioned on its own file-history page as a re-creation \"similar to\" the Ministry's logo (German: \"ähnlich Israel-Tourismus\") rather than a verbatim upload of the official mark — bundling a fan approximation would violate this repo's ban on invented/approximated logo content, so the entry is left without an image. No other usable copy of the Ministry's actual emblem could be found on Commons or Wikipedia.",
      sources: [
        "https://commons.wikimedia.org/wiki/Category:Logo_of_the_Ministry_of_Tourism_(Israel)",
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(Israel)",
      ],
    },
  ],
  MA: [
    {
      id: "ma-visitmorocco",
      countryCode: "MA",
      name: "Visit Morocco",
      agency: "Office National Marocain du Tourisme (ONMT), the Moroccan National Tourist Office",
      visitors: {
        count: 13000000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Morocco)",
      },
      logo: "/tourism-logos/ma/visit-morocco.png",
      logoExplainer:
        "The Morocco destination mark used by the Office National Marocain du Tourisme: a deep-red keyhole arch built from concentric arched lines — the horseshoe arch of Moroccan and Andalusian architecture — above the word \"MOROCCO\" in matching red capitals.",
      sources: [
        "https://en.wikipedia.org/wiki/Moroccan_National_Tourist_Office",
        "https://commons.wikimedia.org/wiki/File:Tourism_in_Morocco.svg",
        "https://www.visitmorocco.com/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Office National Marocain du Tourisme, taken from its official visitmorocco.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  EC: [
    {
      id: "ec-all-you-need-is-ecuador",
      countryCode: "EC",
      name: "Ecuador — \"All You Need Is Ecuador\"",
      slogan: "All You Need Is Ecuador",
      agency: "Ministerio de Turismo del Ecuador",
      launched: 2014,
      visitors: {
        count: 2108000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Ecuador)",
      },
      logo: "/tourism-logos/ec/ecuador.png",
      logoExplainer:
        "Ecuador's destination mark: the word \"ECUADOR\" in yellow capitals preceded by a device of three stacked horizontal bars beside a small radiating sun — the bars reading as the yellow, blue and red of the national flag and the sun as the equator the country is named for.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Ecuador",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Ecuador",
        "https://ecuador.travel/en/",
      ],
      licenceNote:
        "Copyrighted brand mark of Ecuador's Ministerio de Turismo, taken from the official ecuador.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  PA: [
    {
      id: "pa-visit-panama",
      countryCode: "PA",
      name: "Panamá",
      agency: "Autoridad de Turismo de Panamá (ATP)",
      launched: 2015,
      visitors: {
        count: 647000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Panama)",
      },
      logo: "/tourism-logos/pa/panama.png",
      logoExplainer:
        "Panama's country brand symbol: four squares set in a pinwheel — a navy square and a crimson square on the diagonal, each paired with a white square carrying a single star in the opposite colour. It is the design of the Panamanian flag, whose four quarters are white with a blue star, plain red, plain blue and white with a red star, rebuilt as a rotating device.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Panama",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Panama",
        "https://www.atp.gob.pa/",
      ],
      licenceNote:
        "Copyrighted country-brand mark administered by the Autoridad de Turismo de Panamá, taken from its official atp.gob.pa site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  KH: [
    {
      id: "kh-kingdom-of-wonder",
      countryCode: "KH",
      name: "Cambodia — \"Kingdom of Wonder\"",
      slogan: "Kingdom of Wonder",
      agency: "Ministry of Tourism, Cambodia",
      launched: 2008,
      visitors: {
        count: 1306000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Cambodia)",
      },
      noImageReason:
        "\"Kingdom of Wonder\", Cambodia's tourism brand since 2008, has a documented golden-orange identity built around Angkor Wat, but searching Wikimedia Commons (Category:Tourism in Cambodia) and the English Wikipedia article for \"Tourism in Cambodia\" found no usable copy of the logo.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Cambodia",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Cambodia",
      ],
    },
  ],
  IS: [
    {
      id: "is-inspired-by-iceland",
      countryCode: "IS",
      name: "Inspired by Iceland",
      slogan: "Inspired by Iceland",
      agency: "Visit Iceland, part of Business Iceland (Íslandsstofa)",
      launched: 2010,
      visitors: {
        count: 488000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Iceland)",
      },
      noImageReason:
        "\"Inspired by Iceland\", launched in 2010 in response to the Eyjafjallajökull eruption's impact on tourism, is a well-documented campaign, but searching Wikimedia Commons (Category:Logos of Iceland, Category:Tourism in Iceland) and the English Wikipedia article for \"Tourism in Iceland\" found no usable copy of the logo.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Iceland",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Iceland",
      ],
    },
  ],
  OM: [
    {
      id: "om-ministry-of-heritage-and-tourism",
      countryCode: "OM",
      name: "Experience Oman",
      agency: "Ministry of Heritage and Tourism, Oman",
      visitors: {
        count: 869000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Oman)",
      },
      logo: "/tourism-logos/om/experience-oman.png",
      logoExplainer:
        "The \"experience OMAN\" destination brand: the word \"experience\" in a dark plum lower-case above \"OMAN\" in large rounded capitals whose letters alternate between plum, terracotta and teal. The palette is drawn from Omani building stone, desert and sea rather than from the national flag, and the soft geometric letterforms echo the rounded domes of Omani architecture.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Oman",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Oman",
        "https://www.experienceoman.om/",
      ],
      licenceNote:
        "Copyrighted brand mark of Oman's Ministry of Heritage and Tourism. The live experienceoman.om domain was unreachable from this environment, so the asset was recovered from the Internet Archive's capture of that same official site. Bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  QA: [
    {
      id: "qa-visit-qatar",
      countryCode: "QA",
      name: "Visit Qatar",
      agency: "Qatar Tourism (formerly the Qatar Tourism Authority)",
      visitors: {
        count: 582000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Qatar)",
      },
      logo: "/tourism-logos/qa/visit-qatar.svg",
      logoExplainer:
        "The Visit Qatar mark: the words \"visit\" and \"QATAR\" stacked in a dark teal, with the dot of the \"i\" replaced by a small maroon serrated shape echoing the nine-point serrated band of Qatar's maroon-and-white national flag.",
      sources: [
        "https://en.wikipedia.org/wiki/Qatar_Tourism_Authority",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Qatar",
        "https://visitqatar.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of Visit Qatar (Qatar Tourism), taken from the official visitqatar.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  PH: [
    {
      id: "ph-love-the-philippines",
      countryCode: "PH",
      name: "Love the Philippines",
      slogan: "Love the Philippines",
      agency: "Department of Tourism, Philippines",
      launched: 2023,
      visitors: {
        count: 1483000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Philippines)",
      },
      logo: "/tourism-logos/ph/love-the-philippines.png",
      logoExplainer:
        "The \"Love the Philippines\" brand launched by the Department of Tourism in 2023, replacing \"It's More Fun in the Philippines\": a shield-shaped badge in which the script word \"Love\" sits above \"Philippines\" against a radiating golden sunburst, with three gold stars along the lower edge. The eight-rayed sun and three stars are the emblems of the national flag, standing for the first provinces to revolt and for Luzon, the Visayas and Mindanao.",
      sources: [
        "https://en.wikipedia.org/wiki/It%27s_More_Fun_in_the_Philippines!",
        "https://en.wikipedia.org/wiki/Love_the_Philippines",
        "https://philippines.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Philippine Department of Tourism, taken from its official philippines.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  LK: [
    {
      id: "lk-sri-lanka-tourism-promotion-bureau",
      countryCode: "LK",
      name: "Sri Lanka",
      agency: "Sri Lanka Tourism Promotion Bureau (SLTPB)",
      visitors: {
        count: 540000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Sri Lanka)",
      },
      logo: "/tourism-logos/lk/sri-lanka.png",
      logoExplainer:
        "The Sri Lanka destination wordmark used by the Sri Lanka Tourism Promotion Bureau: the country's name written as a single flowing cyan script, the long tail of the initial S sweeping beneath the whole word. Cyan carries the island-and-ocean framing of the Bureau's \"So Sri Lanka\" campaign.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Sri_Lanka",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Sri_Lanka",
        "https://www.srilanka.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Sri Lanka Tourism Promotion Bureau, taken from its official srilanka.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  NO: [
    {
      id: "no-visitnorway",
      countryCode: "NO",
      name: "Visitnorway",
      agency: "Innovation Norway, operator of the visitnorway.com consumer brand",
      visitors: {
        count: 1397000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Norway)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Norway) and general web search — no usable \"Visitnorway\" logo could be found on Commons or Wikipedia; the only Commons file returned by search (\"Tour of Norway logo.svg\") is for an unrelated cycling race.",
      sources: [
        "https://www.visitnorway.com/info/about-visitnorway/",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Norway",
      ],
    },
  ],
  SE: [
    {
      id: "se-visitsweden",
      countryCode: "SE",
      name: "Visit Sweden",
      agency: "VisitSweden AB, jointly owned by the Swedish state and the Swedish travel industry",
      visitors: {
        count: 1957000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Sweden)",
      },
      logo: "/tourism-logos/se/visit-sweden.svg",
      logoExplainer:
        "Visit Sweden's mark: the words \"Visit Sweden\" stacked in a blue serif, beside a yellow Nordic cross rendered in four loose brush strokes rather than as a solid flag — the Swedish flag redrawn by hand.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Sweden",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Sweden",
        "https://visitsweden.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of Visit Sweden AB (the state-owned national tourism marketing company), taken from its official visitsweden.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  UY: [
    {
      id: "uy-uruguay-natural",
      countryCode: "UY",
      name: "Uruguay Natural",
      slogan: "Uruguay Natural",
      agency: "Ministerio de Turismo (Ministry of Tourism, Uruguay)",
      visitors: {
        count: 3480000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Uruguay)",
      },
      logo: "/tourism-logos/uy/uruguay-natural.png",
      logoExplainer:
        "The Uruguay Natural mark pairs a golden sun rising over a blue crescent — echoing the Sun of May on Uruguay's own flag — with the wordmark \"Uruguay\" set beside an italic \"Natural\", the Ministry of Tourism's motto for the country's consumer-facing destination brand.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Uruguay_natural.svg",
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(Uruguay)",
      ],
      licenceNote:
        "Released by its Commons uploader under CC0 1.0 Universal Public Domain Dedication; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  KE: [
    {
      id: "ke-magical-kenya",
      countryCode: "KE",
      name: "Magical Kenya",
      slogan: "Magical Kenya",
      agency: "Kenya Tourism Board (KTB)",
      launched: 2019,
      visitors: {
        count: 2049000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Kenya)",
      },
      logo: "/tourism-logos/ke/magical-kenya.png",
      logoExplainer:
        "The \"Magical Kenya\" destination brand of the Kenya Tourism Board: the words \"Magical\" in a black script and \"Kenya\" in a red script, beneath an arch of triangular beadwork shapes in red, green, blue, yellow and black flanked by small dots. The beadwork arch draws on Maasai beaded collar patterning, one of Kenya's most recognisable craft traditions. This is the consumer brand, not the Board's own \"KENYA TOURISM BOARD\" institutional lockup.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Kenya",
        "https://voyagesafriq.com/2019/05/16/kenya-tourism-board-unveils-new-visual-identity/",
        "https://magicalkenya.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Kenya Tourism Board. The live magicalkenya.com domain returns HTTP 403 to automated requests, so the asset was recovered from the Internet Archive's capture of the Board's own site. Bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  ZM: [
    {
      id: "zm-ministry-of-tourism",
      countryCode: "ZM",
      name: "Zambia",
      agency: "Ministry of Tourism, Zambia",
      visitors: {
        count: 502000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Zambia)",
      },
      logo: "/tourism-logos/zm/zambia.png",
      logoExplainer:
        "Zambia's destination mark: the word \"ZAMBIA\" in green capitals, preceded by three vertical blue brush strokes reading as falling water and followed by an orange sun — Victoria Falls and the African sun, the two images Zambian tourism marketing leads with. The eagle and the orange, red, black and green of the national flag inform the palette.",
      sources: [
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(Zambia)",
        "https://en.wikipedia.org/wiki/Tourism_in_Zambia",
        "https://www.zambiatourism.com/",
      ],
      licenceNote:
        "Copyrighted brand mark used by the Zambia Tourism Agency, taken from its official zambiatourism.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  NA: [
    {
      id: "na-namibia-tourism-board",
      countryCode: "NA",
      name: "Namibia Tourism Board",
      agency: "Namibia Tourism Board (NTB)",
      visitors: {
        count: 187100,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Namibia)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Namibia, Category:Symbols of Namibia) and the English Wikipedia articles for the Namibia Tourism Board and \"Tourism in Namibia\" — no usable NTB consumer-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Namibia_Tourism_Board",
        "https://en.wikipedia.org/wiki/Tourism_in_Namibia",
      ],
    },
  ],
  RW: [
    {
      id: "rw-visit-rwanda",
      countryCode: "RW",
      name: "Visit Rwanda",
      agency: "Rwanda Development Board (RDB)",
      visitors: {
        count: 1634000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Rwanda)",
      },
      logo: "/tourism-logos/rw/visit-rwanda.png",
      logoExplainer:
        "The \"Visit Rwanda\" wordmark of the Rwanda Development Board: the two words stacked in heavy black capitals, the letter A of RWANDA drawn as an unclosed peak. The mark is best known internationally from the Visit Rwanda sleeve sponsorships the Board took on several European football clubs.",
      sources: [
        "https://en.wikipedia.org/wiki/Rwanda_Development_Board",
        "https://visitrwanda.com/",
        "https://www.visitrwanda.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Rwanda Development Board, taken from its official visitrwanda.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  TZ: [
    {
      id: "tz-tanzania-tourist-board",
      countryCode: "TZ",
      name: "Tanzania Tourist Board",
      slogan: "Tanzania. Unforgettable.",
      agency: "Tanzania Tourist Board (TTB)",
      visitors: {
        count: 1527000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Tanzania)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Tanzania) and the English Wikipedia article for \"Tourism in Tanzania\" — no usable Tanzania Tourist Board consumer-brand logo could be found; the only tourism-labelled Commons file returned by search (\"Ministry of Tourism and Antiquities logo.png\") is Egypt's ministry logo, wrongly surfaced by a generic category match — not Tanzania's own.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Tanzania",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Tanzania",
      ],
    },
  ],
  ZW: [
    {
      id: "zw-a-world-of-wonders",
      countryCode: "ZW",
      name: "Zimbabwe — \"A World of Wonders\"",
      slogan: "A World of Wonders",
      agency: "Zimbabwe Tourism Authority (ZTA)",
      visitors: {
        count: 639000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Zimbabwe)",
      },
      noImageReason:
        "\"A World of Wonders\" is the Zimbabwe Tourism Authority's documented brand, but searching Wikimedia Commons and the English Wikipedia articles for the Zimbabwe Tourism Authority and \"Tourism in Zimbabwe\" found no usable copy of the logo on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Zimbabwe_Tourism_Authority",
        "https://en.wikipedia.org/wiki/Tourism_in_Zimbabwe",
      ],
    },
  ],
  SN: [
    {
      id: "sn-ministry-of-tourism",
      countryCode: "SN",
      name: "Senegal Ministry of Tourism",
      agency: "Ministry of Tourism, Senegal",
      visitors: {
        count: 1376000,
        year: 2017,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Senegal)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia articles for the Ministry of Tourism (Senegal) and \"Tourism in Senegal\" — no usable Senegalese tourism-board consumer-brand logo could be found; the only Commons file returned by a \"Sunugal\"-brand search (\"SNT Motiv Logo.svg\") is confirmed on its own file page to be an unrelated South Korean company's logo, not Senegal's tourism board.",
      sources: [
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(Senegal)",
        "https://en.wikipedia.org/wiki/Tourism_in_Senegal",
      ],
    },
  ],
  CI: [
    {
      id: "ci-ministry-of-tourism",
      countryCode: "CI",
      name: "Côte d'Ivoire Ministry of Tourism",
      agency: "Ministère du Tourisme, Côte d'Ivoire",
      visitors: {
        count: 668000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Côte d'Ivoire)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Symbols of Ivory Coast) and general web search for a Côte d'Ivoire tourism-board consumer-brand logo — no usable file could be found; Commons results returned only unrelated Ivorian logos (Air Côte d'Ivoire, the coat of arms).",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Ivory_Coast"],
    },
  ],
  MZ: [
    {
      id: "mz-ministry-of-tourism",
      countryCode: "MZ",
      name: "Mozambique Ministry of Tourism",
      agency: "Ministério do Turismo, Mozambique",
      visitors: {
        count: 2033000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Mozambique)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Mozambique\" — no usable Mozambican tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Mozambique"],
    },
  ],
  AO: [
    {
      id: "ao-ministry-of-tourism",
      countryCode: "AO",
      name: "Angola Ministry of Tourism",
      agency: "Ministério da Cultura, Turismo e Ambiente, Angola",
      visitors: {
        count: 218000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Angola)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Angola\" — no usable Angolan tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Angola"],
    },
  ],
  EE: [
    {
      id: "ee-welcome-to-estonia",
      countryCode: "EE",
      name: "Visit Estonia",
      agency: "EAS (Enterprise Estonia) / Visit Estonia",
      launched: 2012,
      visitors: {
        count: 1695000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Estonia)",
      },
      logo: "/tourism-logos/ee/visit-estonia.svg",
      logoExplainer:
        "The \"visit estonia\" wordmark the Estonian Tourist Board uses today: the two words in a light grey lower-case sans-serif whose letters are drawn with open, unjoined strokes and small gaps, giving a spare, modern look in keeping with Estonia's digital-society positioning. This replaces the earlier \"Welcome to Estonia\" mark, which was retired when the country moved to its current brand system.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Welcome_To_Estonia_logo.jpeg",
        "https://en.wikipedia.org/wiki/Tourism_in_Estonia",
        "https://www.visitestonia.com/en",
      ],
      licenceNote:
        "Copyrighted brand mark of Visit Estonia (Enterprise Estonia's tourism development centre), taken from the official visitestonia.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for football-association crests and passport covers.",
    },
  ],
  SI: [
    {
      id: "si-i-feel-slovenia",
      countryCode: "SI",
      name: "I Feel Slovenia",
      slogan: "I Feel Slovenia",
      agency: "Slovenian Tourist Board (STO)",
      launched: 2007,
      visitors: {
        count: 1216000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Slovenia)",
      },
      logo: "/tourism-logos/si/i-feel-slovenia.png",
      logoExplainer:
        "The \"I feel Slovenia\" national brand, adopted in 2007 and used for tourism and country promotion alike: the phrase set in white and grey-green capitals on a solid green slanted panel. The wordplay is the point — the letters of \"Slovenia\" contain the word LOVE, which the mark highlights, and the green field stands for the forest cover over more than half the country.",
      sources: [
        "https://commons.wikimedia.org/wiki/Commons:Copyright_rules_by_territory/Slovenia",
        "https://en.wikipedia.org/wiki/Tourism_in_Slovenia",
        "https://www.slovenia.info/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Slovenian Tourist Board, taken from its official slovenia.info site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  LV: [
    {
      id: "lv-latvia-tourism-board",
      countryCode: "LV",
      name: "Latvia Travel",
      agency: "Latvian Tourism Development Agency, under the Investment and Development Agency of Latvia",
      visitors: {
        count: 3204000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Latvia)",
      },
      logo: "/tourism-logos/lv/latvia-travel.svg",
      logoExplainer:
        "The Latvia Travel mark: the words \"Latvia\" and \"travel\" stacked in a black serif, with two short horizontal bars in Latvian carmine-red and white to the right — the carmine-white-carmine of the national flag reduced to two strokes.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Latvia",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Latvia",
        "https://www.latvia.travel/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Investment and Development Agency of Latvia (LIAA) tourism department, taken from the official latvia.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  LT: [
    {
      id: "lt-real-is-beautiful",
      countryCode: "LT",
      name: "Lithuania — \"Real Is Beautiful\"",
      slogan: "Real Is Beautiful",
      agency: "State Department of Tourism, Lithuania",
      launched: 2016,
      visitors: {
        count: 2284000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Lithuania)",
      },
      noImageReason:
        "\"Real Is Beautiful\", a postage-stamp-centred identity introduced by the State Department of Tourism in 2016, is well documented, but searching Wikimedia Commons (Category:Tourism in Lithuania) and the English Wikipedia article for \"Tourism in Lithuania\" found no usable copy of the logo.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Lithuania",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Lithuania",
      ],
    },
  ],
  MD: [
    {
      id: "md-ministry-of-tourism",
      countryCode: "MD",
      name: "Moldova — \"A Place to Find Yourself\"",
      slogan: "A Place to Find Yourself",
      agency: "National Inbound Tourism Association of Moldova / tourism.gov.md",
      visitors: {
        count: 29000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Moldova)",
      },
      logo: "/tourism-logos/md/moldova-tree-of-life.png",
      logoExplainer:
        "Moldova's \"a place to find yourself\" brand: the word \"MOLDOVA\" in heavy black capitals beneath a stylised tree built from embroidered-looking motifs — flowers, leaves and geometric blocks in red, green, blue and yellow — drawn in the manner of Moldovan folk cross-stitch. The device is known as the tree of life, a recurring motif in Moldovan traditional embroidery.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Moldova",  "https://moldova.travel/en/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Moldova Investment Agency's tourism directorate, taken from the official moldova.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  RS: [
    {
      id: "rs-serbia-tourism-organisation",
      countryCode: "RS",
      name: "Experience Serbia",
      slogan: "Experience! Serbia",
      agency: "Tourism Organisation of Serbia (TOS)",
      visitors: {
        count: 446000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Serbia)",
      },
      logo: "/tourism-logos/rs/experience-serbia.png",
      logoExplainer:
        "The \"Experience! Serbia\" brand of the National Tourism Organisation of Serbia: the word \"Experience!\" in a red handwritten script above \"SERBIA\" in heavy red capitals, the exclamation mark carried into the logo itself.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Serbia",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Serbia",
        "https://www.serbia.travel/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the National Tourism Organisation of Serbia, taken from its official serbia.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  ME: [
    {
      id: "me-wild-beauty",
      countryCode: "ME",
      name: "Montenegro — \"Wild Beauty\"",
      slogan: "Wild Beauty",
      agency: "National Tourism Organisation of Montenegro",
      visitors: {
        count: 351000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Montenegro)",
      },
      logo: "/tourism-logos/me/wild-beauty.png",
      logoExplainer:
        "The MONTENEGRO wordmark is built from bold geometric shapes — triangles, circles, and angular letterforms in green, gold, blue and pale teal — echoing the country's mountains, coastline and forests behind the \"Wild Beauty\" campaign.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Logo_Montenegro.svg",
        "https://en.wikipedia.org/wiki/Tourism_in_Montenegro",
      ],
      licenceNote:
        "Public domain per its Commons file page — \"consists only of simple geometric shapes or text\" — vector-extracted from an official montenegro.travel PDF; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  CU: [
    {
      id: "cu-marca-cuba",
      countryCode: "CU",
      name: "Marca Cuba",
      slogan: "Cuba Única",
      agency: "Ministerio de Turismo (MINTUR), Cuba",
      launched: 2001,
      visitors: {
        count: 1086000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Cuba)",
      },
      logo: "/tourism-logos/cu/marca-cuba.png",
      logoExplainer:
        "A red triangle bearing a single white star — echoing the triangle and lone star of the Cuban flag — beside the word \"Cuba\" in blue. Designed 2001–2003 by MINTUR specifically to mark the country's tourism communications, it was later adopted as Cuba's national Marca País (country brand) in 2024.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Marca_pa%C3%ADs_Cuba.svg",
        "https://www.ics.gob.cu/en/la-marca-pais-cuba-signo-de-elevado-valor-comunicacional/",
        "https://www.mintur.gob.cu/cuba-unica-una-campana-de-exito-en-la-promocion-del-turismo-cubano/",
      ],
      licenceNote:
        "Public domain per its Commons file page — \"consists only of simple geometric shapes or text\" — attributed to Cuba's Instituto de Información y Comunicación Social; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  NG: [
    {
      id: "ng-nigerian-tourism-development-corporation",
      countryCode: "NG",
      name: "Nigerian Tourism Development Corporation",
      agency: "Nigerian Tourism Development Corporation (NTDC)",
      visitors: {
        count: 5265000,
        year: 2016,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Nigeria)",
      },
      noImageReason:
        "The only NTDC logo shown on Wikimedia Commons (\"NTDC Logo new.png\") is filed in the \"Coats of arms of Nigeria\" category — the agency's own institutional emblem, not a consumer destination-marketing mark — the same category error the Brazil/Embratur entry in this dataset was corrected away from. No separate consumer tourism-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:NTDC_Logo_new.png",
        "https://en.wikipedia.org/wiki/Nigerian_Tourism_Development_Corporation",
      ],
    },
  ],
  PK: [
    {
      id: "pk-salam-pakistan",
      countryCode: "PK",
      name: "Salam Pakistan",
      slogan: "Salam Pakistan",
      agency: "Pakistan Tourism Development Corporation (PTDC)",
      launched: 2025,
      visitors: {
        count: 966000,
        year: 2012,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Pakistan)",
      },
      noImageReason:
        "\"Salam Pakistan\", Pakistan's first-ever national tourism brand, launched by the PTDC in 2025, is too new to have a usable logo on Wikimedia Commons or Wikipedia yet — searches turned up only the brand's own social-media/video announcements.",
      sources: [
        "https://www.nativeplanet.com/news/salam-pakistan-first-ever-national-tourism-brand-to-promote-tourism-in-pakistan-008789.html",
        "https://en.wikipedia.org/wiki/Tourism_in_Pakistan",
      ],
    },
  ],
  MM: [
    {
      id: "mm-ministry-of-hotels-and-tourism",
      countryCode: "MM",
      name: "Myanmar — \"Be Enchanted\"",
      agency: "Ministry of Hotels and Tourism, Myanmar",
      visitors: {
        count: 903000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Myanmar)",
      },
      logo: "/tourism-logos/mm/myanmar-be-enchanted.png",
      logoExplainer:
        "Myanmar's destination brand: the country's name written in gold in a rounded, looping script whose letterforms echo the circular strokes of the Burmese alphabet, above the tagline \"Be enchanted\" in a gold cursive. Gold is the colour of the gilded stupas — Shwedagon above all — that dominate the country's tourism imagery.",
      sources: [
        "https://en.wikipedia.org/wiki/Ministry_of_Hotels_and_Tourism_(Myanmar)",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Myanmar",
        "https://www.myanmar.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Myanmar Ministry of Hotels and Tourism, recovered from the Internet Archive's capture of the ministry's own myanmar.travel site after the live domain became unreachable from this environment. Bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  LA: [
    {
      id: "la-simply-beautiful",
      countryCode: "LA",
      name: "Laos — \"Simply Beautiful\"",
      slogan: "Simply Beautiful",
      agency: "Lao National Tourism Administration",
      launched: 2012,
      visitors: {
        count: 886400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Laos)",
      },
      logo: "/tourism-logos/la/laos-simply-beautiful.webp",
      logoExplainer:
        "The \"Laos — Simply Beautiful\" national brand: a deep-blue panel carrying a yellow dok champa (plumeria) flower above the word \"LAOS\" in white capitals and the italic tagline \"Simply Beautiful\". The dok champa is the national flower of Laos.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Laos",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Laos",
        "https://www.tourismlaos.org/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Lao National Tourism Administration, taken from its official tourismlaos.org site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  HN: [
    {
      id: "hn-instituto-hondureno-de-turismo",
      countryCode: "HN",
      name: "Instituto Hondureño de Turismo",
      agency: "Instituto Hondureño de Turismo (IHT)",
      visitors: {
        count: 669000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Honduras)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Honduras, Category:Tourism in Honduras) and the English Wikipedia article for \"Tourism in Honduras\" — no usable Instituto Hondureño de Turismo consumer-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Honduras",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Honduras",
      ],
    },
  ],
  SV: [
    {
      id: "sv-ministerio-de-turismo",
      countryCode: "SV",
      name: "El Salvador",
      agency: "Ministerio de Turismo de El Salvador (MITUR)",
      visitors: {
        count: 707000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for El Salvador)",
      },
      logo: "/tourism-logos/sv/el-salvador.png",
      logoExplainer:
        "El Salvador's destination wordmark: the words \"EL SALVADOR\" in blocky outlined capitals, each letter filled with brightly coloured naive folk-art scenes — villages, birds, flowers, figures and mountains. The style is that of La Palma, the artisan town whose painted-wood tradition founded by Fernando Llort is El Salvador's best-known craft idiom, so the country's name is written in its own folk art.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Logo_oficial_del_Ministerio_de_Turismo_de_El_Salvador.png",
        "https://en.wikipedia.org/wiki/Tourism_in_El_Salvador",
        "https://elsalvador.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of El Salvador's Ministerio de Turismo / CORSATUR, taken from the official elsalvador.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for football-association crests and passport covers.",
    },
  ],
  NI: [
    {
      id: "ni-intur",
      countryCode: "NI",
      name: "Nicaragua — \"Única... Original!\"",
      slogan: "Única... Original!",
      agency: "Instituto Nicaragüense de Turismo (INTUR)",
      visitors: {
        count: 474000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Nicaragua)",
      },
      logo: "/tourism-logos/ni/nicaragua-unica-original.png",
      logoExplainer:
        "Nicaragua's destination mark: the country name in magenta type above the hand-written tagline \"Única... Original!\" in turquoise, with a small multicoloured flower device above the initial letter.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Logo_Intur_Nicaragua.png",
        "https://en.wikipedia.org/wiki/Tourism_in_Nicaragua",
        "https://www.visitanicaragua.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Instituto Nicaragüense de Turismo (INTUR), taken from its official visitanicaragua.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BS: [
    {
      id: "bs-bahamas-ministry-of-tourism",
      countryCode: "BS",
      name: "The Islands of the Bahamas",
      agency: "Ministry of Tourism, Investments & Aviation, The Bahamas",
      visitors: {
        count: 1794500,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Bahamas)",
      },
      logo: "/tourism-logos/bs/islands-of-the-bahamas.svg",
      logoExplainer:
        "The destination mark of the Bahamas Ministry of Tourism: the words \"THE ISLANDS OF THE\" in small grey capitals set above \"bahamas\" in large rounded lower-case grey type. The brand deliberately names the archipelago rather than a single island, reflecting a marketing identity built around the country's many separate island destinations.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_the_Bahamas",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_the_Bahamas",
        "https://www.bahamas.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Bahamas Ministry of Tourism, Investments & Aviation, taken from the official bahamas.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  TT: [
    {
      id: "tt-tourism-trinidad-and-tobago",
      countryCode: "TT",
      name: "Visit Trinidad",
      agency: "Tourism Trinidad Limited",
      visitors: {
        count: 141000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Trinidad and Tobago)",
      },
      logo: "/tourism-logos/tt/visit-trinidad.png",
      logoExplainer:
        "The Visit Trinidad wordmark of Trinidad and Tobago's destination-management company: \"VisitTrinidad.com\" set in heavy red italic type, a plain typographic mark naming the campaign's web address.",
      sources: ["https://commons.wikimedia.org/wiki/Category:Tourism_in_Trinidad_and_Tobago",  "https://www.visittrinidad.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of Tourism Trinidad Limited, taken from its official visittrinidad.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BZ: [
    {
      id: "bz-belize-tourism-board",
      countryCode: "BZ",
      name: "Belize Tourism Board",
      agency: "Belize Tourism Board (BTB)",
      visitors: {
        count: 487000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Belize)",
      },
      logo: "/tourism-logos/bz/belize-tourism-board.png",
      logoExplainer:
        "The Belize Tourism Board's mark: the lower-case letters \"btb\" in orange, yellow and teal, with a keel-billed toucan perched on the final b. The keel-billed toucan is Belize's national bird and appears on the country's coat of arms-bearing flag.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Belize", "https://belizetourismboard.org/"],
      licenceNote:
        "Copyrighted brand mark of the Belize Tourism Board, taken from its official belizetourismboard.org site and bundled for identification of the national tourism brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  PG: [
    {
      id: "pg-papua-new-guinea-tourism-promotion-authority",
      countryCode: "PG",
      name: "Papua New Guinea",
      agency: "Papua New Guinea Tourism Promotion Authority (PNGTPA)",
      visitors: {
        count: 39000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Papua New Guinea)",
      },
      logo: "/tourism-logos/pg/papua-new-guinea.webp",
      logoExplainer:
        "The Papua New Guinea destination mark: the country's name in a fine brown script beside a bird-of-paradise rendered in soft orange and yellow plume strokes radiating from a small body. The raggiana bird-of-paradise is Papua New Guinea's national bird and appears on the national flag.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Papua_New_Guinea",  "https://www.papuanewguinea.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Papua New Guinea Tourism Promotion Authority, taken from its official papuanewguinea.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  FJ: [
    {
      id: "fj-tourism-fiji",
      countryCode: "FJ",
      name: "Fiji",
      agency: "Tourism Fiji, established under the Tourism Fiji Act 2004",
      visitors: {
        count: 168000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Fiji)",
      },
      logo: "/tourism-logos/fj/fiji.png",
      logoExplainer:
        "Tourism Fiji's wordmark: the four letters of \"FIJI\" in heavy capitals, each letter filled with black-and-white masi (tapa cloth) patterning — the geometric bark-cloth designs that are Fiji's signature traditional art form, so the country's name is literally drawn in its own craft.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_Fiji",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Fiji",
        "https://www.fiji.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of Tourism Fiji, taken from its official fiji.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  KZ: [
    {
      id: "kz-ministry-of-tourism-and-sports",
      countryCode: "KZ",
      name: "Kazakhstan.travel",
      agency: "Ministry of Tourism and Sports, Kazakhstan",
      visitors: {
        count: 2035000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Kazakhstan)",
      },
      logo: "/tourism-logos/kz/kazakhstan-travel.svg",
      logoExplainer:
        "Kazakhstan's destination mark: the words \"kazakhstan.travel\" in a heavy black lower-case sans-serif beneath a broad arch that runs from deep orange at its feet through to pale yellow at its crown — a rising sun rendered as a gateway. The sun is the central device of the Kazakh national flag, where a golden sun sits above a steppe eagle.",
      sources: [
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_and_Sports_(Kazakhstan)",
        "https://en.wikipedia.org/wiki/Tourism_in_Kazakhstan",
        "https://kazakhstan.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of Kazakh Tourism, taken from its official kazakhstan.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  UZ: [
    {
      id: "uz-ministry-of-tourism-and-sports",
      countryCode: "UZ",
      name: "Uzbekistan Ministry of Tourism and Sports",
      agency: "Ministry of Tourism and Sports, Uzbekistan",
      visitors: {
        count: 6749000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Uzbekistan)",
      },
      noImageReason:
        "The only tourism-labelled logo found on Wikimedia Commons (in Category:Logos of Uzbekistan, titled in Russian for the \"Ministry of Tourism and Sports of the Republic of Uzbekistan\") is the ministry's own institutional seal, not a consumer destination-marketing mark — the same category error the Brazil/Embratur entry in this dataset was corrected away from. No separate consumer tourism-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Uzbekistan",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Uzbekistan",
      ],
    },
  ],
  AM: [
    {
      id: "am-armenia-tourism-committee",
      countryCode: "AM",
      name: "Armenia",
      agency: "Tourism Committee, Ministry of Economy, Armenia",
      visitors: {
        count: 375000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Armenia)",
      },
      logo: "/tourism-logos/am/armenia.svg",
      logoExplainer:
        "Armenia's destination wordmark on armenia.travel: the name spelled in orange-gold mixed-case letters whose strokes are drawn with the angular, wedge-cut terminals of Armenian manuscript lettering, tying the Latin spelling to the Armenian alphabet the country treats as a national emblem.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Armenia",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Armenia",
        "https://armenia.travel/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Armenia Tourism Committee, taken from the official armenia.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  ET: [
    {
      id: "et-land-of-origins",
      countryCode: "ET",
      name: "Ethiopia — \"Land of Origins\"",
      slogan: "Land of Origins",
      agency: "Ethiopian Tourism Organization, replacing the earlier \"13 Months of Sunshine\" brand",
      launched: 2016,
      visitors: {
        count: 518000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Ethiopia)",
      },
      noImageReason:
        "\"Land of Origins\", launched in 2016 to replace \"13 Months of Sunshine\", is a well-documented rebrand, but searching Wikimedia Commons and the English Wikipedia article for \"Tourism in Ethiopia\" found no usable copy of the logo.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Ethiopia"],
    },
  ],
  DZ: [
    {
      id: "dz-office-national-du-tourisme",
      countryCode: "DZ",
      name: "Visit Algeria",
      agency: "Office National du Tourisme (ONT), Algeria",
      visitors: {
        count: 591000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Algeria)",
      },
      logo: "/tourism-logos/dz/visit-algeria.png",
      logoExplainer:
        "The \"Visit Algeria\" promotional mark: the words \"visit Algeria\" in a red script, with a red star above the capital A, set against a fan of fine curving lines in green, blue, orange and red that sweep upward like dunes or a wind-blown trace. The star and crescent are the emblems of the national flag. This is the promotional brand rather than the Ministry of Tourism's Arabic-script institutional seal.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Algeria",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Algeria",
        "https://www.mta.gov.dz/",
      ],
      licenceNote:
        "Copyrighted promotional brand mark used by Algeria's Ministère du Tourisme et de l'Artisanat, taken from the ministry's official site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  TN: [
    {
      id: "tn-office-national-du-tourisme-tunisien",
      countryCode: "TN",
      name: "Tunisia — \"Inspiring\"",
      slogan: "Inspiring",
      agency: "Office National du Tourisme Tunisien (ONTT)",
      visitors: {
        count: 2012000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Tunisia)",
      },
      logo: "/tourism-logos/tn/tunisia-inspiring.png",
      logoExplainer:
        "The \"Tunisia — Inspiring\" destination brand: the country name written as a single flowing blue script line, its opening stroke sweeping over the whole word, with the word \"INSPIRING\" in small blue capitals to the right.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Tunisia",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Tunisia",
        "https://www.discovertunisia.com/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Office National du Tourisme Tunisien, taken from its official discovertunisia.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  SR: [
    {
      id: "sr-tourism-corporation-of-suriname",
      countryCode: "SR",
      name: "Suriname Tourism Board",
      agency: "Tourism Corporation of Suriname (STICHTING TCS)",
      visitors: {
        count: 279000,
        year: 2017,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Suriname)",
      },
      logo: "/tourism-logos/sr/suriname-tourism-board.png",
      logoExplainer:
        "The Suriname Tourism Board's mark: an oval scene of a river at sunset framed by forested banks, with a long-legged pink wading bird standing in the foreground and the words \"SURINAME TOURISM BOARD\" arched in yellow along the lower edge. Suriname's rainforest interior — more than 90% of its land area — and its river and coastal birdlife are what the country's tourism is built on.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Suriname",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Suriname",
        "https://www.surinametourism.sr/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Suriname Tourism Board, recovered from the Internet Archive's capture of the Board's own surinametourism.sr site after the live domain became unreachable from this environment. Bundled for identification of the national tourism brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  GY: [
    {
      id: "gy-ministry-of-tourism-industry-and-commerce",
      countryCode: "GY",
      name: "Guyana — \"South America Undiscovered\"",
      agency: "Ministry of Tourism, Industry and Commerce, Guyana",
      visitors: {
        count: 86400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Guyana)",
      },
      logo: "/tourism-logos/gy/guyana-undiscovered.png",
      logoExplainer:
        "Guyana's destination mark: a textured olive-green disc carrying the word \"GUYANA\" in white capitals, with the tagline \"South America Undiscovered\" curving around the lower edge and a white line tracing a waterfall down the disc from top to bottom. The falls evoke Kaieteur, the single-drop waterfall in the interior rainforest that is the country's best-known natural landmark.",
      sources: [
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Guyana",
        "https://en.wikipedia.org/wiki/Tourism_in_Guyana",
        "https://www.guyanatourism.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Guyana Tourism Authority, recovered from the Internet Archive's capture of the Authority's own guyanatourism.com site after the live domain became unreachable from this environment. Bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  PY: [
    {
      id: "py-secretaria-nacional-de-turismo",
      countryCode: "PY",
      name: "Paraguay — Secretaría Nacional de Turismo",
      agency: "Secretaría Nacional de Turismo (SENATUR), Paraguay",
      visitors: {
        count: 1077000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Paraguay)",
      },
      noImageReason:
        "Searched Wikimedia Commons and general web search — no usable SENATUR consumer-brand logo could be found on Commons or Wikipedia.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Paraguay"],
    },
  ],
  IQ: [
    {
      id: "iq-ministry-of-culture-tourism-and-antiquities",
      countryCode: "IQ",
      name: "Iraq Ministry of Culture, Tourism and Antiquities",
      agency: "Ministry of Culture, Tourism and Antiquities, Iraq",
      visitors: {
        count: 892000,
        year: 2013,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Iraq)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Iraq, Category:Tourism in Iraq) and the English Wikipedia article for \"Tourism in Iraq\" — no usable Iraqi tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Iraq",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Iraq",
      ],
    },
  ],
  SY: [
    {
      id: "sy-ministry-of-tourism",
      countryCode: "SY",
      name: "Syria Ministry of Tourism",
      agency: "Ministry of Tourism, Syria",
      visitors: {
        count: 2424000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Syria)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Syria\" — no usable Syrian tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Syria"],
    },
  ],
  YE: [
    {
      id: "ye-ministry-of-tourism",
      countryCode: "YE",
      name: "Yemen Tourism",
      agency: "Ministry of Tourism, Yemen",
      visitors: {
        count: 398000,
        year: 2015,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Yemen)",
      },
      logo: "/tourism-logos/ye/yemen-tourism.png",
      logoExplainer:
        "The Yemen Tourism Promotion Board's mark: the word \"YEMEN\" in tall gold capitals whose letterforms are drawn as the stepped tower-houses of Yemeni mudbrick architecture, with \"TOURISM\" set vertically beside it and the Board's name in Arabic and English beneath.",
      sources: [
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(Yemen)",
        "https://en.wikipedia.org/wiki/Tourism_in_Yemen",
        "https://www.yementourism.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Yemen Tourism Promotion Board, taken from its official yementourism.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  LB: [
    {
      id: "lb-ministry-of-tourism",
      countryCode: "LB",
      name: "Lebanon Ministry of Tourism",
      agency: "Ministry of Tourism, Lebanon",
      visitors: {
        count: 1936000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Lebanon)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Lebanon) and the English Wikipedia article for the Ministry of Tourism (Lebanon) — no usable Lebanese tourism-board consumer-brand logo could be found; the only tourism-labelled Commons file returned by search (\"Logo OMT (Lebanon).svg\") is confirmed to be OMT, an unrelated Lebanese money-transfer/fintech company, not the tourism ministry.",
      sources: [
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_(Lebanon)",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Lebanon",
      ],
    },
  ],
  SD: [
    {
      id: "sd-ministry-of-tourism-antiquities-and-wildlife",
      countryCode: "SD",
      name: "Sudan Ministry of Tourism, Antiquities and Wildlife",
      agency: "Ministry of Tourism, Antiquities and Wildlife, Sudan",
      visitors: {
        count: 836000,
        year: 2018,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Sudan)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Sudan, Category:Tourism in Sudan) and the English Wikipedia article for \"Tourism in Sudan\" — no usable Sudanese tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Sudan",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Sudan",
      ],
    },
  ],
  SS: [
    {
      id: "ss-ministry-of-wildlife-conservation-and-tourism",
      countryCode: "SS",
      name: "South Sudan Ministry of Wildlife Conservation and Tourism",
      agency: "Ministry of Wildlife Conservation and Tourism, South Sudan",
      visitorsNote:
        "No World Bank or other authoritative international-tourist-arrivals figure is published for South Sudan.",
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia articles for \"Tourism in South Sudan\" and the Ministry of Wildlife Conservation and Tourism — no usable South Sudanese tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_South_Sudan",
        "https://en.wikipedia.org/wiki/Ministry_of_Wildlife_Conservation_and_Tourism",
      ],
    },
  ],
  SO: [
    {
      id: "so-ministry-of-tourism-and-wildlife",
      countryCode: "SO",
      name: "Somalia Ministry of Tourism and Wildlife",
      agency: "Ministry of Tourism and Wildlife, Somalia",
      visitorsNote:
        "No World Bank or other authoritative international-tourist-arrivals figure is published for Somalia.",
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Somalia, Category:Symbols of Somalia) and the English Wikipedia article for \"Tourism in Somalia\" — no usable Somali tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Somalia"],
    },
  ],
  LY: [
    {
      id: "ly-ministry-of-tourism",
      countryCode: "LY",
      name: "Libya Ministry of Tourism",
      agency: "Ministry of Tourism, Libya",
      visitors: {
        count: 760000,
        year: 2008,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Libya, predating the 2011 civil war)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Libya, Category:Tourism in Libya) and the English Wikipedia article for \"Tourism in Libya\" — no usable Libyan tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Libya",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Libya",
      ],
    },
  ],
  TD: [
    {
      id: "td-ministry-of-tourism",
      countryCode: "TD",
      name: "Chad Ministry of Tourism",
      agency: "Ministère du Tourisme, de la Culture, de l'Artisanat et du Développement Touristique, Chad",
      visitors: {
        count: 10400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Chad)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Chad, Category:Symbols of Chad) and the English Wikipedia article for \"Tourism in Chad\" — no usable Chadian tourism-board consumer-brand logo could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Chad",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Chad",
      ],
    },
  ],
  MN: [
    {
      id: "mn-nomadic-by-nature",
      countryCode: "MN",
      name: "Mongolia — \"Nomadic by Nature\"",
      slogan: "Nomadic by Nature",
      agency: "Mongolian Tourism Association, under the Ministry of Environment and Tourism",
      visitors: {
        count: 66900,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Mongolia)",
      },
      noImageReason:
        "Mongolia's tourism slogan changed from \"Go Nomadic, Experience Mongolia\" (2013) to \"Mongolia — Nomadic by Nature\", but searching Wikimedia Commons (Category:Tourism in Mongolia, Category:Logos of Mongolia) and the English Wikipedia article for \"Tourism in Mongolia\" found no usable copy of either campaign's logo; Commons results returned only unrelated Mongolian logos (a forum, the e-Mongolia digital-government service, the Ministry of Environment and Tourism's institutional emblem).",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Mongolia",
        "https://commons.wikimedia.org/wiki/Category:Tourism_in_Mongolia",
      ],
    },
  ],
  MV: [
    {
      id: "mv-visit-maldives",
      countryCode: "MV",
      name: "Visit Maldives",
      agency: "Maldives Marketing and Public Relations Corporation (MMPRC)",
      visitors: {
        count: 555000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Maldives)",
      },
      logo: "/tourism-logos/mv/maldives-sunny-side.png",
      logoExplainer:
        "The \"Maldives — the sunny side of life\" brand: the word \"Maldives\" in blue type above the tagline, beside a device of a coconut palm and curving wave strokes in green, orange and blue with a small sun, condensing the island-and-lagoon imagery the brand is built on.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_the_Maldives",  "https://visitmaldives.com/en",
      ],
      licenceNote:
        "Copyrighted brand mark of Visit Maldives (the Maldives Marketing & Public Relations Corporation), taken from the official visitmaldives.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  TL: [
    {
      id: "tl-ministry-of-tourism-commerce-and-industry",
      countryCode: "TL",
      name: "Timor-Leste",
      agency: "Ministry of Tourism, Commerce and Industry (MTCI), Timor-Leste",
      visitors: {
        count: 74800,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Timor-Leste)",
      },
      logo: "/tourism-logos/tl/timor-leste.svg",
      logoExplainer:
        "Timor-Leste's destination mark: the words \"TIMOR-LESTE\" in dark type beside a magenta device shaped like a traditional uma lulik (sacred house) with its steep pitched roof and raised posts, under a yellow sun. The uma lulik is the central emblem of Timorese custom and identity.",
      sources: ["https://commons.wikimedia.org/wiki/Category:Ministry_of_Tourism_(East_Timor)",  "https://www.timorleste.tl/",
      ],
      licenceNote:
        "Copyrighted brand mark of Timor-Leste's Ministry of Tourism and Environment, taken from its official site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  SB: [
    {
      id: "sb-visit-solomons",
      countryCode: "SB",
      name: "Tourism Solomons",
      agency: "Solomon Islands Visitors Bureau",
      visitors: {
        count: 4400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Solomon Islands)",
      },
      logo: "/tourism-logos/sb/tourism-solomons.png",
      logoExplainer:
        "Tourism Solomons' mark: a line drawing of a traditional outrigger canoe with a paddler at the bow, its hull carrying an ochre panel of geometric shell-inlay patterning, with the words \"Tourism Solomons\" written along the hull. The canoe and shell-inlay work are central to Solomon Islands material culture.",
      sources: ["https://en.wikipedia.org/wiki/Solomon_Islands",  "https://www.visitsolomons.com.sb/",
      ],
      licenceNote:
        "Copyrighted brand mark of Tourism Solomons (the Solomon Islands Visitors Bureau), taken from its official visitsolomons.com.sb site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  VU: [
    {
      id: "vu-vanuatu-tourism-office",
      countryCode: "VU",
      name: "Vanuatu — \"Answer the Call\"",
      slogan: "Answer the Call of Vanuatu",
      agency: "Vanuatu Tourism Office",
      visitors: {
        count: 82400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Vanuatu)",
      },
      logo: "/tourism-logos/vu/answer-the-call-of-vanuatu.png",
      logoExplainer:
        "The \"Answer the Call of Vanuatu\" brand: the words \"ANSWER THE CALL OF\" in black hand-drawn capitals above \"Vanuatu\" in a large orange brush script, with a small red-and-green leaf device at the end. Red, green, black and yellow are the colours of the Vanuatu flag.",
      sources: ["https://commons.wikimedia.org/wiki/Category:Tourism_in_Vanuatu",  "https://vanuatu.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Vanuatu Tourism Office, taken from its official vanuatu.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  FR: [
    {
      id: "fr-explore-france",
      countryCode: "FR",
      name: "Explore France",
      slogan: "Explore France",
      agency: "Atout France (France Tourism Development Agency)",
      launched: 2019,
      visitors: {
        count: 117109000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for France)",
      },
      logo: "/tourism-logos/fr/explore-france.png",
      logoExplainer:
        "A navy-blue \"Explore France\" wordmark with a small French tricolour flag set beside the text. Unveiled by the French Prime Minister on 28 August 2019 and run by Atout France, replacing the earlier \"Rendez-vous en France\" trade slogan as the country's consumer-facing destination brand.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Explore-France-wordmark.png",
        "https://www.atout-france.fr/en/explore-france-int",
      ],
      licenceNote:
        "Public domain per its Commons file page — \"consists only of simple geometric shapes or text\" (PD-textlogo), sourced from france.fr and uploaded directly by Explore France in 2021. Bundled here as a small (120px) thumbnail export because upload.wikimedia.org rejected this session's request for the full-resolution original and all standard intermediate thumbnail widths with a rate-limit error, accepting only sizes at or below the source's native 168px width.",
    },
  ],
  GB: [
    {
      id: "gb-visitbritain",
      countryCode: "GB",
      name: "VisitBritain",
      agency: "VisitBritain (British Tourist Authority)",
      visitors: {
        count: 11101000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the United Kingdom)",
      },
      logo: "/tourism-logos/gb/visitbritain.png",
      logoExplainer:
        "A white \"VISIT BRITAIN\" wordmark stacked over a stylised Union Jack rendered as radiating triangular beams, set on a solid red background — VisitBritain's own consumer-facing logo, distinct from the separate multi-department \"GREAT Britain & Northern Ireland\" government campaign mark.",
      sources: [
        "https://en.wikipedia.org/wiki/File:VisitBritain_logo.png",
        "https://en.wikipedia.org/wiki/VisitBritain",
        "https://www.visitbritain.org/",
      ],
      licenceNote:
        "Non-free/fair-use logo hosted locally on English Wikipedia (not Wikimedia Commons) — used there under a non-free-content rationale for identifying the organisation. Bundled here on the same basis this repo already uses for non-Commons crests and passport covers: a copyrighted organisational logo, cited to its source, for identification rather than decoration.",
    },
  ],
  IE: [
    {
      id: "ie-tourism-ireland",
      countryCode: "IE",
      name: "Ireland",
      slogan: "Fill Your Heart With Ireland",
      agency: "Tourism Ireland",
      visitors: {
        count: 10951000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Ireland)",
      },
      logo: "/tourism-logos/ie/ireland.png",
      logoExplainer:
        "The \"Ireland\" destination mark used across ireland.com — the consumer brand Tourism Ireland markets the island under, not the organisation's own \"Tourism Ireland\" corporate lockup. The word \"Ireland\" is set in a rounded green sans-serif beside a shamrock drawn as three overlapping outlined leaves in two greens. The shamrock is the island's best-known national symbol and Tourism Ireland describes it as the memory trigger at the centre of its global identity.",
      sources: [
        "https://en.wikipedia.org/wiki/File:Tourism_Ireland_logo.svg",
        "https://www.tourismireland.com/about-us/our-brand",
        "https://www.tourismireland.com/what-we-do/global-marketing-campaigns/tourism-ireland-s-fill-your-heart-with-ireland",
        "https://www.ireland.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of Tourism Ireland, taken from its own consumer site ireland.com and bundled for identification of the destination brand, on the same non-free basis this repository uses for football-association crests and passport covers.",
    },
  ],
  DE: [
    {
      id: "de-germany-travel",
      countryCode: "DE",
      name: "Germany — \"Simply inspiring\"",
      slogan: "Germany. Simply inspiring.",
      agency: "Deutsche Zentrale für Tourismus e.V. (GNTB / germany.travel)",
      visitors: {
        count: 12449000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Germany)",
      },
      logo: "/tourism-logos/de/germany-simply-inspiring.svg",
      logoExplainer:
        "The German National Tourist Board's destination lockup on germany.travel: \"Germany\" in heavy black type above the italic line \"Simply inspiring\", beside a circular emblem in which a stylised eagle's head in black, red and gold curls into a ring. The eagle is the federal coat-of-arms bird and the three colours are the national flag's.",
      sources: [
        "https://en.wikipedia.org/wiki/German_National_Tourist_Board",
        "https://www.germany.travel/en/about-us/about-us.html",
        "https://www.germany.travel/en/home.html",
      ],
      licenceNote:
        "Copyrighted brand mark of the Deutsche Zentrale für Tourismus (German National Tourist Board), taken from its official germany.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  NL: [
    {
      id: "nl-holland-nbtc",
      countryCode: "NL",
      name: "Netherlands",
      agency: "Netherlands Board of Tourism & Conventions (NBTC) / Holland.com",
      launched: 2019,
      visitors: {
        count: 7265000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Netherlands)",
      },
      logo: "/tourism-logos/nl/nl-netherlands.svg",
      logoExplainer:
        "The \"NL\" national brand mark the Netherlands Board of Tourism & Conventions adopted in place of the older \"Holland\" tulip mark: the letters \"NL\" in heavy orange type, the L drawn as an open right angle, beside the word \"Netherlands\". Orange is the colour of the House of Orange-Nassau and the Dutch national colour. The change of mark accompanied the country's 2020 decision to promote itself as the Netherlands rather than Holland.",
      sources: [
        "https://www.holland.com/global/meetings/contact/about-nbtc",
        "https://www.dezeen.com/2019/11/20/netherlands-identity-nl-logo-studio-dumbar/",
      ],
      licenceNote:
        "Copyrighted brand mark of NBTC Holland Marketing, taken from its official site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  US: [
    {
      id: "us-brand-usa",
      countryCode: "US",
      name: "Brand USA — \"Visit The USA\"",
      agency: "Brand USA (Corporation for Travel Promotion)",
      launched: 2010,
      visitors: {
        count: 45037000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the United States)",
      },
      logo: "/tourism-logos/us/brand-usa.png",
      logoExplainer:
        "The mark of Brand USA, the public-private corporation that markets the United States as a destination: the letters \"USA\" built from a grid of white dots on a light-blue panel, with \"VisitTheUSA.com\" beneath, above a darker blue band reading \"Brand USA\". The dot grid reads as the star field of the national flag, and the two blues are the flag's own.",
      sources: ["https://en.wikipedia.org/wiki/Brand_USA", "https://www.thebrandusa.com/"],
      licenceNote:
        "Copyrighted brand mark of Brand USA (the Corporation for Travel Promotion). The live visittheusa.com and thebrandusa.com domains return HTTP 403 to automated requests, so the asset was recovered from the Internet Archive's capture of Brand USA's own site. Bundled for identification of the destination brand, on the same non-free basis this repository uses for football-association crests and passport covers.",
    },
  ],
  RU: [
    {
      id: "ru-discover-russia",
      countryCode: "RU",
      name: "Discover Russia",
      slogan: "Discover Russia",
      agency: "National Tourism Development Corporation, Russia",
      launched: 2024,
      visitors: {
        count: 6359000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Russia)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos associated with tourism in Russia and Category:Tourism in Russia — neither holds a matching file) and the English Wikipedia \"Discover Russia\" article, whose only infobox image is an unrelated 2018–2019 sister-cities contest logo, not the 2024 Möbius-loop \"Discover Russia\" brand mark. No usable copy of the current brand could be found.",
      sources: [
        "https://en.wikipedia.org/wiki/Discover_Russia",
        "https://discoverrussia.ru/en",
      ],
    },
  ],
  CN: [
    {
      id: "cn-beautiful-china",
      countryCode: "CN",
      name: "Beautiful China",
      slogan: "Beautiful China",
      agency: "Ministry of Culture and Tourism (formerly the China National Tourism Administration)",
      launched: 2013,
      visitors: {
        count: 30402000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for China)",
      },
      noImageReason:
        "Searched Wikimedia Commons for the 2013 \"Beautiful China\" traditional-seal logo (a red seal-script rendering of the phrase over a blue backdrop) — no usable copy could be found; the China National Tourism Administration that launched it was itself dissolved in 2018 and its duties merged into the Ministry of Culture and Tourism.",
      sources: [
        "https://www.unwto.org/archive/asia/news/2013-07-24/china-unveils-new-tourism-logo",
        "https://en.wikipedia.org/wiki/China_National_Tourism_Administration",
      ],
    },
  ],
  ZA: [
    {
      id: "za-south-african-tourism",
      countryCode: "ZA",
      name: "South Africa",
      slogan: "Inspiring new ways",
      agency: "South African Tourism",
      visitors: {
        count: 3886600,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for South Africa)",
      },
      logo: "/tourism-logos/za/south-africa.svg",
      logoExplainer:
        "South Africa's destination mark: the words \"South Africa\" in a white brush script on black, beside the horizontal Y-shape of the national flag rendered in its green, gold, red, blue and white. The flag's converging Y is officially described as the convergence of diverse elements taking the road ahead in unity, and the brand carries that device as its whole right-hand half.",
      sources: [
        "https://en.wikipedia.org/wiki/File:South_African_Tourism_logo.svg",
        "https://en.wikipedia.org/wiki/South_African_Tourism",
        "https://www.southafrica.net/",
      ],
      licenceNote:
        "Copyrighted brand mark of South African Tourism, taken from the official southafrica.net site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  UA: [
    {
      id: "ua-ukraine-now",
      countryCode: "UA",
      name: "Ukraine NOW",
      slogan: "Ukraine NOW",
      agency: "Ukrainian Institute / Ministry of Foreign Affairs of Ukraine",
      launched: 2018,
      visitors: {
        count: 3382000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Ukraine)",
      },
      logo: "/tourism-logos/ua/ukraine-now.png",
      logoExplainer:
        "The word \"Ukraine\" in dark grey beside \"NOW\" highlighted in yellow, with a small blue-and-yellow \".ua\" domain tab set into the wordmark. Approved by the Ukrainian government on 10 May 2018 (designed by Banda Agency) as the country's unified national brand across tourism, investment and cultural promotion, built around the country's own top-level internet domain.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Ua_now-logo_SVG_2.svg",
        "https://en.wikipedia.org/wiki/Ukraine_NOW",
        "https://www.kmu.gov.ua/en/news/uryad-shvaliv-novij-brend-ukrayina-zaraz-sho-zabezpechit-yedinij-stil-prezentaciyi-derzhavi-v-sviti",
      ],
      licenceNote:
        "Dual-licensed on its Commons file page as CC BY-SA 4.0 and, separately, as public domain for not meeting the threshold of originality (a simple wordmark). Bundled here as a small (120px) thumbnail export because upload.wikimedia.org rejected this session's request for the full-resolution original and intermediate thumbnail widths with a rate-limit error, accepting only sizes at or below a small rendered width.",
    },
  ],
  HU: [
    {
      id: "hu-wow-hungary",
      countryCode: "HU",
      name: "WOW Hungary",
      slogan: "Wellspring of Wonders",
      agency: "Hungarian Tourism Agency",
      launched: 2018,
      visitors: {
        count: 31641000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Hungary)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Hungary, Category:Logos of Hungary — neither holds a matching file) and the English Wikipedia \"Tourism in Hungary\" article, which names no current brand or logo — no usable copy of the Hungarian Tourism Agency's 2018 \"WOW Hungary\" (Wellspring of Wonders), designed by Graphasel Design Studio around an ancient Hungarian motif, could be found.",
      sources: [
        "https://xpatloop.com/channels/2018/10/wow-hungary-national-brand-unveiled-at-tourism-summit.html",
        "https://en.wikipedia.org/wiki/Tourism_in_Hungary",
      ],
    },
  ],
  RO: [
    {
      id: "ro-carpathian-garden",
      countryCode: "RO",
      name: "Romania — \"Natural and Cultural\"",
      agency: "Ministry of Economy, Entrepreneurship and Tourism, Romania",
      launched: 2009,
      visitors: {
        count: 5023000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Romania)",
      },
      logo: "/tourism-logos/ro/romania-natural-cultural.jpg",
      logoExplainer:
        "Romania's destination mark: a green mountain range drawn in layered peaks above the word \"ROMANIA\" in navy capitals, the tagline \"Natural and Cultural\" beneath, and two curving green and blue lines below reading as hills and water. The Carpathians are the landscape Romanian tourism marketing leads with.",
      sources: [
        "https://www.romania-insider.com/romanias-new-tourism-brand-explore-the-carpathian-garden",
        "https://en.wikipedia.org/wiki/Tourism_in_Romania",
        "https://www.romaniatourism.com/",
      ],
      licenceNote:
        "Copyrighted brand mark used by Romania's national tourism promotion, taken from the official romaniatourism.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  SA: [
    {
      id: "sa-visit-saudi",
      countryCode: "SA",
      name: "Visit Saudi — \"Welcome to Arabia\"",
      slogan: "Welcome to Arabia",
      agency: "Saudi Tourism Authority",
      launched: 2020,
      visitors: {
        count: 20292000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Saudi Arabia)",
      },
      logo: "/tourism-logos/sa/saudi-welcome-to-arabia.svg",
      logoExplainer:
        "The English lockup of Saudi Arabia's destination brand: the word \"Saudi\" written in a flowing magenta calligraphic script whose strokes are shaped after Arabic letterforms, above the words \"Welcome to Arabia\" in a magenta serif. The script deliberately reads in both directions at once — Latin letters drawn with the rhythm of Arabic calligraphy — and the magenta is the brand's signature colour, chosen to break from the green of the national flag.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Visit_Saudi_Logo.svg",
        "https://en.wikipedia.org/wiki/Saudi_Tourism_Authority",
        "https://www.visitsaudi.com/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Saudi Tourism Authority, taken from the official visitsaudi.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  CY: [
    {
      id: "cy-love-cyprus",
      countryCode: "CY",
      name: "Love Cyprus",
      slogan: "Love Cyprus",
      agency: "Cyprus Deputy Ministry of Tourism / Visit Cyprus",
      launched: 2021,
      visitors: {
        count: 4117000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Cyprus)",
      },
      logo: "/tourism-logos/cy/love-cyprus.png",
      logoExplainer:
        "The \"Love Cyprus\" brand of the Deputy Ministry of Tourism: the word \"LOVE\" set as a two-by-two block of letters, the \"V\" formed by a yellow heart, above \"CYPRUS\" in blue capitals. Blue and yellow carry the sea-and-sun framing the campaign uses across its advertising.",
      sources: [
        "https://www.visitcyprus.com/news/new-logo-and-brand-identity-2/",
        "https://1000logos.net/news/love-cyprus-new-visual-identity-for-the-island-of-aphrodite/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Cyprus Deputy Ministry of Tourism, taken from the official visitcyprus.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  MT: [
    {
      id: "mt-visit-malta",
      countryCode: "MT",
      name: "Visit Malta",
      agency: "Malta Tourism Authority",
      visitors: {
        count: 718000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Malta)",
      },
      logo: "/tourism-logos/mt/visitmalta.png",
      logoExplainer:
        "The VisitMalta mark: the word \"VisitMalta\" in red type beside a rounded chevron shape filled with blue, yellow and red bands and carrying a small white eight-pointed Maltese cross — the cross of the Order of St John, Malta's defining national emblem.",
      sources: [
        "https://lovinmalta.com/lifestyle/art/revealed-new-malta-tourism-authority-logo-appears-on-website/",
        "https://en.wikipedia.org/wiki/Tourism_in_Malta",
        "https://www.visitmalta.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Malta Tourism Authority, taken from the official visitmalta.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  SK: [
    {
      id: "sk-good-idea-slovakia",
      countryCode: "SK",
      name: "Good Idea Slovakia",
      slogan: "Good Idea Slovakia",
      agency: "Ministry of Foreign and European Affairs of the Slovak Republic",
      visitors: {
        count: 15299000,
        year: 2018,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Slovakia)",
      },
      logo: "/tourism-logos/sk/good-idea-slovakia.jpg",
      logoExplainer:
        "The \"Good Idea Slovakia\" national brand in its travel lockup: the words \"TRAVEL TO SLOVAKIA\" in white above \"GOOD IDEA\" in pale blue, on a deep blue panel with a thin red rule beneath. Blue, white and red are the colours of the Slovak flag; \"Good Idea Slovakia\" has been the country's unified state brand since 2016.",
      sources: [
        "https://fontsinuse.com/uses/13705/good-idea-slovakia",
        "https://scd.sk/dielo-ncd/good-idea-slovakia/",
        "https://slovakia.travel/en",
      ],
      licenceNote:
        "Copyrighted brand mark of the Slovak Tourist Board, taken from its official slovakia.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  LU: [
    {
      id: "lu-visit-luxembourg",
      countryCode: "LU",
      name: "Visit Luxembourg",
      agency: "Luxembourg for Tourism (LFT)",
      visitors: {
        count: 525000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Luxembourg)",
      },
      logo: "/tourism-logos/lu/visit-luxembourg.svg",
      logoExplainer:
        "The Visit Luxembourg mark: the words \"VISIT LUXEMBOURG\" stacked in black capitals beside a device of four rounded petal shapes arranged around an empty centre, forming an open pinwheel.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Luxembourg", "https://www.visitluxembourg.com/"],
      licenceNote:
        "Copyrighted brand mark of Luxembourg for Tourism, taken from the official visitluxembourg.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  VE: [
    {
      id: "ve-mintur",
      countryCode: "VE",
      name: "Ministerio del Poder Popular para el Turismo",
      agency: "Ministerio del Poder Popular para el Turismo (MINTUR), Venezuela",
      visitors: {
        count: 429000,
        year: 2017,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Venezuela)",
      },
      noImageReason:
        "Searched Wikidata (the organisation's Wikidata item) and Wikimedia Commons for a MINTUR consumer tourism-brand logo — the only linked image, \"Política de Venezuela.png\", is confirmed on its own Commons file page to be a GENERIC Venezuelan government seal reused across many unrelated ministries (Education, Foreign Affairs, Culture, Planning, Communication), not MINTUR's own or any consumer-facing tourism mark, so it was not used as a substitute per this repo's consumer-brand-not-institutional-seal standard.",
      sources: [
        "https://www.wikidata.org/wiki/Q16607782",
        "https://commons.wikimedia.org/wiki/File:Pol%C3%ADtica_de_Venezuela.png",
      ],
    },
  ],
  BW: [
    {
      id: "bw-rediscover-botswana",
      countryCode: "BW",
      name: "Botswana Tourism",
      agency: "Botswana Tourism Organisation",
      visitors: {
        count: 1830000,
        year: 2018,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Botswana)",
      },
      logo: "/tourism-logos/bw/botswana-tourism.png",
      logoExplainer:
        "Botswana Tourism's consumer mark: the word \"botswana\" in a flowing lower-case brush script whose letters run through red, orange, yellow and green, with the word \"tourism\" in plain grey beneath. The mark is the organisation's public-facing brand rather than the Department of Tourism's circular zebra-head departmental seal.",
      sources: [
        "https://en.wikipedia.org/wiki/Rediscover_Botswana",
        "https://www.botswanatourism.co.bw/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Botswana Tourism Organisation, taken from its official botswanatourism.co.bw site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  MW: [
    {
      id: "mw-warm-heart-of-africa",
      countryCode: "MW",
      name: "Malawi Tourism",
      slogan: "The Warm Heart of Africa",
      agency: "Malawi Tourism",
      visitors: {
        count: 871000,
        year: 2018,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Malawi)",
      },
      logo: "/tourism-logos/mw/malawi-warm-heart.png",
      logoExplainer:
        "Malawi's destination mark: the word \"Malawi\" in blue over a large heart shape in red, yellow and green, with the line \"the warm heart of africa\" beneath. The heart makes the country's long-standing tourism slogan literal; red, black and green are the colours of the national flag.",
      sources: ["https://www.malawitourism.com/", "https://en.wikipedia.org/wiki/Tourism_in_Malawi",  "https://www.visitmalawi.mw/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Malawi Department of Tourism, taken from its official visitmalawi.mw site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  MU: [
    {
      id: "mu-mtpa",
      countryCode: "MU",
      name: "Mauritius",
      slogan: "It's a Pleasure",
      agency: "Mauritius Tourism Promotion Authority (MTPA)",
      launched: 1996,
      visitors: {
        count: 316000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Mauritius)",
      },
      logo: "/tourism-logos/mu/mauritius.png",
      logoExplainer:
        "The Mauritius destination mark: the island's name written as a single sweeping red script line, with the dots over the two \"i\" letters picked out in yellow, blue and green — the four colours of the Mauritian flag distributed across the word.",
      sources: [
        "https://en.wikipedia.org/wiki/Mauritius_Tourism_Promotion_Authority",
        "https://mauritiusnow.com/mtpa/",
        "https://www.mauritiusnow.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Mauritius Tourism Promotion Authority, taken from its official site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  SC: [
    {
      id: "sc-seychelles-tourism-board",
      countryCode: "SC",
      name: "The Seychelles Islands",
      agency: "Seychelles Tourism Board",
      launched: 2006,
      visitors: {
        count: 124500,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Seychelles)",
      },
      logo: "/tourism-logos/sc/seychelles-islands.png",
      logoExplainer:
        "The Seychelles Islands destination mark: the words \"the Seychelles islands\" in blue type beneath a fan of five leaf or petal shapes in blue, yellow, red, green and pink. The five colours and the fanned arrangement echo the five oblique bands of the Seychellois national flag.",
      sources: [
        "https://en.wikipedia.org/wiki/Seychelles_Tourism_Board",
        "https://www.union.co.uk/our-news/union-reveals-new-brand-for-seychelles-tourism",
        "https://www.seychelles.travel/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Seychelles Tourism Board, taken from its official seychelles.travel site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  BY: [
    {
      id: "by-hospitable-belarus",
      countryCode: "BY",
      name: "Hospitable Belarus",
      slogan: "Hospitable Belarus",
      agency: "Ministry of Sports and Tourism of the Republic of Belarus",
      launched: 2016,
      visitors: {
        count: 3598000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Belarus)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Belarus) for the government's 2016–2020 \"Hospitable Belarus\" state tourism-development programme — no usable logo/brand mark distinct from the programme's name could be found.",
      sources: [
        "https://president.gov.by/en/belarus/tourism/hospitable-belarus",
        "https://usa.mfa.gov.by/en/visit_Belarus/hospitality/",
      ],
    },
  ],
  IR: [
    {
      id: "ir-majestic-iran",
      countryCode: "IR",
      name: "Majestic Iran",
      slogan: "Majestic Iran, a Different Experience",
      agency: "Ministry of Cultural Heritage, Tourism and Handicrafts, Iran",
      launched: 2020,
      visitors: {
        count: 1550000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Iran)",
      },
      noImageReason:
        "Searched Wikimedia Commons for Iran's 2020 national tourism brand \"Majestic Iran\" — a turquoise Simurgh (mythical bird) mark with Muqarnas-patterned wings and the word \"Iran\" in terracotta, registered with UN Tourism — no usable copy of that specific brand mark could be found; Commons' Simurgh category holds only unrelated historical/artistic depictions of the mythological bird. The Ministry's own institutional seal (a separate, broader heritage/handicrafts emblem, not the tourism consumer brand) was not used as a substitute per this repo's consumer-brand-not-institutional-seal standard.",
      sources: [
        "https://www.destinationiran.com/iran-national-brand-tourism.htm",
        "https://www.untourism.int/asia/iran-s-new-national-brand-majestic-iran",
      ],
    },
  ],
  KW: [
    {
      id: "kw-tourism",
      countryCode: "KW",
      name: "Tourism in Kuwait",
      agency: "General Secretariat of the Supreme Council for Planning and Development, Kuwait",
      visitors: {
        count: 2161000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Kuwait)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Kuwait, which holds only attraction/hotel photographs, no logo) and the English Wikipedia \"Tourism in Kuwait\" article, which names no national tourism authority, brand or slogan at all — Kuwait does not appear to have a dedicated consumer-facing tourism-promotion brand comparable to its Gulf neighbours' \"Visit Saudi\"/\"Visit Qatar\".",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Kuwait"],
    },
  ],
  MK: [
    {
      id: "mk-macedonia-timeless",
      countryCode: "MK",
      name: "Macedonia Timeless",
      slogan: "Macedonia Timeless",
      agency: "Agency for Promotion and Support of Tourism of the Republic of North Macedonia",
      launched: 2008,
      visitors: {
        count: 118000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for North Macedonia)",
      },
      logo: "/tourism-logos/mk/macedonia-timeless.png",
      logoExplainer:
        "The \"Macedonia Timeless\" campaign mark as the brand itself publishes it: a golden sun with straight rays rising behind a hill, above the two hand-lettered words \"MACEDONIA\" and \"TIMELESS\" in red and gold. The rayed sun echoes the sun motif long used in Macedonian visual identity, and the hand-drawn lettering carries the campaign's heritage framing.",
      sources: [
        "https://en.wikipedia.org/wiki/Macedonia_Timeless",
        "https://macedonia-timeless.com/eng",
      ],
      licenceNote:
        "Copyrighted brand mark of the Agency for Promotion and Support of Tourism of the Republic of North Macedonia, taken from the campaign's own macedonia-timeless.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  MC: [
    {
      id: "mc-visit-monaco",
      countryCode: "MC",
      name: "Visit Monaco",
      agency: "Direction du Tourisme et des Congrès de Monaco",
      visitors: {
        count: 159000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Monaco)",
      },
      logo: "/tourism-logos/mc/visit-monaco.png",
      logoExplainer:
        "The Visit Monaco mark: a red monogram in which a broad V and a narrower M interlock, the M's centre stroke descending into a small diamond below the baseline. Red and white are the colours of Monaco's flag and of the Grimaldi arms.",
      sources: [
        "https://cvb.visitmonaco.com/fr/actus/22072/un-nouveau-logo-pour-la-direction-du-tourisme-des-congres",
        "https://www.gouv.mc/Action-Gouvernementale/L-Economie/Tourisme-et-Congres",
        "https://www.visitmonaco.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Monaco Government Tourist and Convention Authority, taken from its official visitmonaco.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  SM: [
    {
      id: "sm-visit-san-marino",
      countryCode: "SM",
      name: "Visit San Marino",
      slogan: "Imagining It Is Not Enough. Come and Experience It.",
      agency: "Ufficio del Turismo (San Marino Tourist Office)",
      visitors: {
        count: 1904000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for San Marino)",
      },
      logo: "/tourism-logos/sm/san-marino.png",
      logoExplainer:
        "San Marino's destination mark: the words \"Repubblica di SanMarino\" with the tagline \"Oltre ogni immaginazione\" (\"beyond all imagination\") beneath, beside a device of overlapping curved blades in red, blue, yellow and dark grey fanning out from a point — an abstraction of the three towers on Monte Titano that define the republic's skyline and its coat of arms.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_San_Marino", "https://www.visitsanmarino.com/"],
      licenceNote:
        "Copyrighted brand mark of the Republic of San Marino's tourism office, taken from its official visitsanmarino.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  CV: [
    {
      id: "cv-instituto-do-turismo",
      countryCode: "CV",
      name: "Instituto do Turismo de Cabo Verde",
      slogan: "No Stress",
      agency: "Instituto do Turismo de Cabo Verde",
      visitors: {
        count: 180000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Cabo Verde)",
      },
      noImageReason:
        "Searched Wikimedia Commons and Wikidata for an Instituto do Turismo de Cabo Verde / turismo.cv logo — no usable copy could be found. \"No Stress\" (Cabo Verde's well-known morabeza motto, widely printed on souvenirs and murals) is a cultural catchphrase rather than a registered agency logo, so it is recorded as the slogan, not treated as if it had its own emblem.",
      sources: ["https://turismo.cv/", "https://www.wikidata.org/wiki/Q1011"],
    },
  ],
  MG: [
    {
      id: "mg-ontm",
      countryCode: "MG",
      name: "Office National du Tourisme de Madagascar",
      agency: "Office National du Tourisme de Madagascar (ONTM)",
      visitors: {
        count: 87100,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Madagascar)",
      },
      noImageReason:
        "Searched Wikimedia Commons for the Office National du Tourisme de Madagascar (ONTM) logo — no usable copy could be found.",
      sources: [
        "https://www.developmentaid.org/organizations/view/221601/office-national-du-tourisme-de-madagascar-ontm",
        "https://www.mta.gov.mg/",
      ],
    },
  ],
  AG: [
    {
      id: "ag-abta",
      countryCode: "AG",
      name: "Antigua and Barbuda Tourism Authority",
      agency: "Antigua and Barbuda Tourism Authority",
      visitors: {
        count: 384500,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Antigua and Barbuda)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia \"Tourism in Antigua and Barbuda\" article — no usable copy of the Antigua and Barbuda Tourism Authority's logo could be found.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Antigua_and_Barbuda",
        "https://www.theantiguan.com/antigua-and-barbuda-tourism-authority",
      ],
    },
  ],
  DM: [
    {
      id: "dm-discover-dominica",
      countryCode: "DM",
      name: "Dominica — \"The Nature Island\"",
      slogan: "The Nature Island",
      agency: "Discover Dominica Authority",
      visitors: {
        count: 140000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Dominica)",
      },
      logo: "/tourism-logos/dm/dominica-nature-island.webp",
      logoExplainer:
        "Dominica's destination mark: the word \"Dominica\" in a green script in which the dot of the \"i\" is drawn as a small leaf, above the line \"THE NATURE ISLAND\". The island has marketed itself as the Nature Island of the Caribbean for decades on the strength of its rainforest interior and volcanic terrain.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Dominica", "https://discoverdominica.com/"],
      licenceNote:
        "Copyrighted brand mark of the Discover Dominica Authority, taken from the official discoverdominica.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  LC: [
    {
      id: "lc-saint-lucia-tourism-authority",
      countryCode: "LC",
      name: "Saint Lucia",
      slogan: "Simply Beautiful",
      agency: "Saint Lucia Tourism Authority",
      visitors: {
        count: 432500,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Saint Lucia)",
      },
      logo: "/tourism-logos/lc/saint-lucia.png",
      logoExplainer:
        "Saint Lucia's destination mark: two black peaks rising from a single sweeping curve, above the words \"SAINT LUCIA\" in spaced capitals. The twin peaks are the Pitons — Gros Piton and Petit Piton, the volcanic plugs on the island's south-west coast that are a UNESCO World Heritage site and the country's defining landmark, appearing on its national flag as two triangles.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Saint_Lucia", "https://www.stlucia.org/"],
      licenceNote:
        "Copyrighted brand mark of the Saint Lucia Tourism Authority, recovered from the Internet Archive's capture of the Authority's own stlucia.org site after the live domain proved unreachable from this environment. Bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  VC: [
    {
      id: "vc-svg-tourism-authority",
      countryCode: "VC",
      name: "St Vincent and the Grenadines",
      slogan: "The Caribbean You're Looking For",
      agency: "Saint Vincent and the Grenadines Tourism Authority",
      launched: 2009,
      visitors: {
        count: 392000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Saint Vincent and the Grenadines)",
      },
      logo: "/tourism-logos/vc/st-vincent-grenadines.png",
      logoExplainer:
        "The destination mark of St Vincent and the Grenadines: the words \"st Vincent and The Grenadines\" in blue and green type with the tagline \"The Caribbean you're looking for\" beneath, beside a device of a bird in flight drawn in blue, yellow and green strokes — the colours of the national flag, whose three green diamonds give the country its \"Gems of the Antilles\" nickname.",
      sources: [
        "https://tourism.gov.vc/tourism/index.php/svg-tourism-authority",
        "https://www.routesonline.com/destinations/9424/st-vincent-and-the-grenadines-tourism-authority/about/",
        "https://www.discoversvg.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the St Vincent and the Grenadines Tourism Authority, taken from its official discoversvg.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  GD: [
    {
      id: "gd-pure-grenada",
      countryCode: "GD",
      name: "Pure Grenada",
      slogan: "Pure Grenada, the Spice of the Caribbean",
      agency: "Grenada Tourism Authority",
      launched: 2013,
      visitors: {
        count: 217000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Grenada)",
      },
      logo: "/tourism-logos/gd/pure-grenada.png",
      logoExplainer:
        "The \"Pure Grenada\" brand of the Grenada Tourism Authority: the words \"PURE GRENADA\" in crimson capitals beside a stylised opened nutmeg drawn in fine crimson lines. Nutmeg is Grenada's defining export — the island is known as the Isle of Spice and the fruit appears on its national flag.",
      sources: ["https://www.puregrenada.com/", "https://ghta.org/directory/all-members/grenada-tourism-authority/"],
      licenceNote:
        "Copyrighted brand mark of the Grenada Tourism Authority, taken from the official puregrenada.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  KN: [
    {
      id: "kn-st-kitts-tourism-authority",
      countryCode: "KN",
      name: "St Kitts Tourism Authority",
      agency: "St Kitts Tourism Authority",
      visitors: {
        count: 301400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Saint Kitts and Nevis)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Saint Kitts and Nevis) — no usable copy of the St Kitts Tourism Authority's or Nevis Tourism Authority's logo could be found.",
      sources: [
        "https://www.routesonline.com/destinations/9413/st-kitts-tourism-authority/about/",
        "https://www.visitstkitts.com/media",
      ],
    },
  ],
  CM: [
    {
      id: "cm-mintoul",
      countryCode: "CM",
      name: "Ministry of Tourism and Leisure",
      agency: "Ministry of Tourism and Leisure (MINTOUL), Cameroon",
      visitors: {
        count: 1021000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Cameroon)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Cameroon, Category:Logos of Cameroon) — no usable copy of MINTOUL's own logo could be found. The only \"Ministry of Tourism\" file this search surfaced (\"Ministry of Tourism and Antiquities logo.png\") is the SAME Egyptian ministry file that has repeatedly, wrongly resurfaced for Zambia/Tanzania/Myanmar earlier in this sweep — it is Egypt's file, not Cameroon's, and was not used.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Cameroon", "https://mintoul.gov.cm/en/the-ministry/"],
    },
  ],
  CD: [
    {
      id: "cd-tourism",
      countryCode: "CD",
      name: "Tourism in the Democratic Republic of the Congo",
      agency: "Ministry of Tourism, Democratic Republic of the Congo",
      visitors: {
        count: 351000,
        year: 2016,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Democratic Republic of the Congo)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in the Democratic Republic of the Congo) — no usable national tourism-board logo could be found.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_the_Democratic_Republic_of_the_Congo"],
    },
  ],
  CG: [
    {
      id: "cg-tourism",
      countryCode: "CG",
      name: "Tourism in the Republic of the Congo",
      agency: "Ministry of Tourism and Environment, Republic of the Congo",
      visitors: {
        count: 158000,
        year: 2018,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Republic of the Congo)",
      },
      noImageReason:
        "Searched Wikimedia Commons and Wikipedia for a Republic of the Congo national tourism-board name and logo — no dedicated tourism-promotion brand or usable logo could be found.",
      sources: ["https://republic-congo.com/en/tourism/"],
    },
  ],
  GA: [
    {
      id: "ga-agatour",
      countryCode: "GA",
      name: "AGATOUR",
      agency: "Agence Gabonaise de Développement et de Promotion du Tourisme et de l'Hôtellerie (AGATOUR)",
      launched: 2014,
      visitors: {
        count: 526000,
        year: 2005,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Gabon; this is an older figure, no newer one is published)",
      },
      noImageReason:
        "Searched Wikimedia Commons for AGATOUR (Gabon's national tourism development and promotion agency, established 2014) — no usable copy of its logo could be found.",
      sources: ["https://fr.wikipedia.org/wiki/Tourisme_au_Gabon", "https://www.tourisme.gouv.ga/"],
    },
  ],
  GM: [
    {
      id: "gm-gambia-tourism-board",
      countryCode: "GM",
      name: "The Gambia — \"The Smiling Coast of Africa\"",
      slogan: "The Smiling Coast of Africa",
      agency: "Gambia Tourism Board",
      visitors: {
        count: 246000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Gambia)",
      },
      logo: "/tourism-logos/gm/gambia-smiling-coast.jpg",
      logoExplainer:
        "The Gambia's national tourism mark: a circular scene of a woman in a red headwrap against a beach with palms, a sail and blue water, above the words \"Gambia Tourism Board\" in a hand-drawn script and the line \"The Smiling Coast of Africa\". The slogan plays on the shape of the country — a narrow strip following the Gambia River, which on a map curves like a smile.",
      sources: [
        "https://theculturetrip.com/africa/the-gambia/articles/why-the-gambia-is-known-as-the-smiling-coast",
        "https://www.africatouroperators.org/gambia/president-gambia-tourism-logo/",
        "https://www.visitthegambia.gm/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Gambia Tourism Board, taken from its official visitthegambia.gm site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  GN: [
    {
      id: "gn-ont-guinee",
      countryCode: "GN",
      name: "Office National du Tourisme",
      agency: "Office National du Tourisme de Guinée (ONT)",
      launched: 1997,
      visitors: {
        count: 99000,
        year: 2017,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Guinea)",
      },
      noImageReason:
        "Searched Wikimedia Commons for a Guinean consumer destination brand — the only usable file found (\"Logo_ONT.jpg\") reads solely \"Office National du Tourisme\", the tourism office's own institutional name, with no country name or destination slogan of any kind, so it was not used as a substitute per this repo's consumer-brand-not-institutional-logo standard.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Logo_ONT.jpg",
        "https://fr.wikipedia.org/wiki/Office_national_du_tourisme_de_Guin%C3%A9e",
      ],
    },
  ],
  BF: [
    {
      id: "bf-faso-tourisme",
      countryCode: "BF",
      name: "Faso Tourisme",
      agency: "Agence Faso Tourisme, Burkina Faso",
      launched: 2024,
      visitors: {
        count: 67000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Burkina Faso)",
      },
      noImageReason:
        "Searched Wikimedia Commons for a logo of \"Faso Tourisme\", the national tourism-promotion agency the Burkinabè government created in November 2024 to replace the Office National du Tourisme Burkinabè (ONTB) — no usable copy could be found.",
      sources: [
        "https://www.presidencedufaso.bf/promotion-du-tourisme-au-burkina-faso-le-gouvernement-cree-lagence-faso-tourisme/",
        "https://en.wikipedia.org/wiki/Tourism_in_Burkina_Faso",
      ],
    },
  ],
  CF: [
    {
      id: "cf-tourism",
      countryCode: "CF",
      name: "Tourism in the Central African Republic",
      agency: "Ministère du Tourisme, Central African Republic",
      visitors: {
        count: 87000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Central African Republic)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia \"Tourism in the Central African Republic\" article — no usable national tourism-board logo could be found.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_the_Central_African_Republic"],
    },
  ],
  DJ: [
    {
      id: "dj-visit-djibouti",
      countryCode: "DJ",
      name: "Visit Djibouti",
      agency: "Office National du Tourisme de Djibouti (ONTD)",
      visitors: {
        count: 63000,
        year: 2013,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Djibouti; this is an older figure, no newer one is published)",
      },
      logo: "/tourism-logos/dj/visit-djibouti.png",
      logoExplainer:
        "The mark of Djibouti's national tourism office: four interlocking square outlines in green, blue, orange and red arranged in a pinwheel around an open centre, a flat geometric device carrying the light blue and green of the Djiboutian flag alongside warm desert tones.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Djibouti", "https://visitdjibouti.dj/"],
      licenceNote:
        "Copyrighted brand mark of the Office National du Tourisme de Djibouti, taken from its official visitdjibouti.dj site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  ML: [
    {
      id: "ml-mali-tourisme",
      countryCode: "ML",
      name: "Mali Tourisme",
      agency: "Agence de Promotion Touristique du Mali (Mali Tourisme)",
      visitors: {
        count: 217000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Mali)",
      },
      noImageReason:
        "Searched Wikimedia Commons for a logo of the Agence de Promotion Touristique du Mali (\"Mali Tourisme\", which succeeded the Office Malien du Tourisme et de l'Hôtellerie, OMATHO) — no usable copy could be found.",
      sources: ["https://fr.wikipedia.org/wiki/Tourisme_au_Mali", "https://officetourismemali.com/"],
    },
  ],
  NE: [
    {
      id: "ne-tourism",
      countryCode: "NE",
      name: "Tourism in Niger",
      agency: "Ministère du Tourisme et de l'Artisanat, Niger",
      visitors: {
        count: 85000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Niger)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia \"Tourism in Niger\" article, which names no national tourism authority at all — no sourced tourism-promotion brand or logo could be found for Niger.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Niger"],
    },
  ],
  TG: [
    {
      id: "tg-tourism",
      countryCode: "TG",
      name: "Togo Tourisme",
      agency: "Ministère du Tourisme, Togo",
      visitors: {
        count: 482000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Togo)",
      },
      logo: "/tourism-logos/tg/togo-tourisme.png",
      logoExplainer:
        "Togo's destination mark: the word \"Togo\" in rounded green outlined capitals — the two \"o\" letters drawn as concentric rings — above \"Tourisme\" in a red script, with a small national flag above the T. Green, yellow and red are the colours of Togo's flag.",
      sources: ["https://www.nz.kayak.com/Togo.239.dc.guide",  "https://www.togotourisme.tg/",
      ],
      licenceNote:
        "Copyrighted brand mark of Togo's tourism promotion body, taken from its official togotourisme.tg site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  HT: [
    {
      id: "ht-ministry-of-tourism",
      countryCode: "HT",
      name: "Ministère du Tourisme d'Haïti",
      agency: "Ministère du Tourisme, Haiti",
      visitors: {
        count: 938000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Haiti)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia \"Ministry of Tourism (Haiti)\" article — the article's infobox carries only Haiti's national coat of arms as a generic placeholder, not the ministry's own distinct logo, and no usable copy of an actual ministry logo could be found.",
      sources: ["https://en.wikipedia.org/wiki/Ministry_of_Tourism_(Haiti)"],
    },
  ],
  LR: [
    {
      id: "lr-lnta",
      countryCode: "LR",
      name: "Liberia National Tourism Authority",
      slogan: "The Choicest Destination",
      agency: "Liberia National Tourism Authority (LNTA)",
      launched: 2024,
      visitorsNote:
        "No World Bank international-tourist-arrivals figure is published for Liberia.",
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Liberia) for the Liberia National Tourism Authority's logo (established 2024) — no usable copy could be found.",
      sources: ["https://lnta.gov.lr/", "https://en.wikipedia.org/wiki/Tourism_in_Liberia"],
    },
  ],
  LS: [
    {
      id: "ls-ltdc",
      countryCode: "LS",
      name: "Lesotho Tourism Development Corporation",
      agency: "Lesotho Tourism Development Corporation (LTDC)",
      launched: 2002,
      visitors: {
        count: 1142000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Lesotho)",
      },
      noImageReason:
        "Searched Wikimedia Commons for the Lesotho Tourism Development Corporation's (LTDC, established 2002) logo — no usable copy could be found.",
      sources: [
        "https://lndc.org.ls/knowledge-base/lesotho-tourism-development-corporation-ltdc/",
        "https://www.visitlesotho.org.ls/",
      ],
    },
  ],
  SZ: [
    {
      id: "sz-eswatini-tourism-authority",
      countryCode: "SZ",
      name: "Eswatini Tourism Authority",
      agency: "Eswatini Tourism Authority (ETA)",
      visitors: {
        count: 345300,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Eswatini)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Eswatini) for the Eswatini Tourism Authority's logo — no usable copy could be found.",
      sources: ["https://eswatinitourismauthority.org/", "https://www.thekingdomofeswatini.com/"],
    },
  ],
  PS: [
    {
      id: "ps-ministry-of-tourism-and-antiquities",
      countryCode: "PS",
      name: "Palestine",
      agency: "Ministry of Tourism and Antiquities, Palestine",
      launched: 1994,
      visitors: {
        count: 93000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (West Bank and Gaza, World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries)",
      },
      logo: "/tourism-logos/ps/palestine.png",
      logoExplainer:
        "The tourism mark of the State of Palestine: the word \"Palestine\" in olive-green type beneath a skyline drawn as a single continuous gold line — domes, minarets and towers running left to right, with the Dome of the Rock among them and a star above — and a small Palestinian flag shield at its centre. The continuous line renders the country's built heritage as one unbroken silhouette.",
      sources: ["https://en.wikipedia.org/wiki/Ministry_of_Tourism_and_Antiquities_(Palestine)", "https://www.travelpalestine.ps/"],
      licenceNote:
        "Copyrighted brand mark of the State of Palestine Ministry of Tourism and Antiquities, taken from its official site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  UG: [
    {
      id: "ug-explore-uganda",
      countryCode: "UG",
      name: "Uganda Tourism Board",
      slogan: "Explore Uganda, the Pearl of Africa",
      agency: "Uganda Tourism Board",
      launched: 2022,
      visitors: {
        count: 473000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Uganda)",
      },
      logo: "/tourism-logos/ug/uganda-tourism-board.png",
      logoExplainer:
        "The Uganda Tourism Board's mark: \"UGANDA\" in wide black geometric capitals — the U drawn as an open-topped rounded form — above \"TOURISM BOARD\". The Board promotes the country under the \"Explore Uganda: The Pearl of Africa\" campaign, and this wordmark is the identity carried across it.",
      sources: [
        "https://utb.go.ug/explore-uganda-the-pearl-of-africa-the-new-destination-uganda-brand-represents-a-new-dawn-in-ugandas-tourism-sector/",
        "https://en.wikipedia.org/wiki/Tourism_in_Uganda",
      ],
      licenceNote:
        "Copyrighted brand mark of the Uganda Tourism Board, taken from its official utb.go.ug site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  ER: [
    {
      id: "er-ministry-of-tourism",
      countryCode: "ER",
      name: "Ministry of Tourism, Eritrea",
      agency: "Ministry of Tourism, Eritrea",
      visitors: {
        count: 142000,
        year: 2016,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Eritrea; this is an older figure, no newer one is published)",
      },
      noImageReason:
        "Searched Wikimedia Commons for an Eritrea tourism-board/ministry logo — no usable copy could be found; only the country's national emblem exists on Commons, which is not a consumer tourism brand and was not used as a substitute.",
      sources: ["https://us.embassyeritrea.org/tourism/", "http://www.eritrea.be/MoT.htm"],
    },
  ],
  FM: [
    {
      id: "fm-visit-micronesia",
      countryCode: "FM",
      name: "Tourism FSM",
      agency: "Federated States of Micronesia Visitors Board",
      visitors: {
        count: 18000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Federated States of Micronesia)",
      },
      logo: "/tourism-logos/fm/tourism-fsm.jpg",
      logoExplainer:
        "The tourism mark of the Federated States of Micronesia: the words \"FEDERATED STATES OF MICRONESIA\" beside a circular device carrying four stars over a band of geometric patterning, with \"TOURISM FSM\" set across it. The four stars are those of the national flag, standing for the four states — Yap, Chuuk, Pohnpei and Kosrae.",
      sources: ["https://southpacificislands.travel/discover/countries/federated-states-of-micronesia/", "https://www.visit-micronesia.fm/"],
      licenceNote:
        "Copyrighted brand mark of the FSM Tourism Office, taken from its official visit-micronesia.fm site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  GQ: [
    {
      id: "gq-ministry-of-tourism",
      countryCode: "GQ",
      name: "Ministerio de Turismo, Guinea Ecuatorial",
      agency: "Ministerio de Turismo, Equatorial Guinea",
      visitorsNote:
        "No World Bank or other authoritative international-tourist-arrivals figure is published for Equatorial Guinea.",
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Equatorial Guinea, 16 files — none tourism-related) and the English Wikipedia \"Tourism in Equatorial Guinea\" article — no usable national tourism-board logo could be found.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Equatorial_Guinea"],
    },
  ],
  GW: [
    {
      id: "gw-tourism",
      countryCode: "GW",
      name: "Tourism in Guinea-Bissau",
      agency: "Ministério do Turismo, Guinea-Bissau",
      visitors: {
        count: 52400,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Guinea-Bissau)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Guinea-Bissau, which holds no tourism-related file) — no usable tourism-board logo could be found. The US Department of State notes no formal tourism industry infrastructure exists in the country, consistent with the absence of a distinct consumer tourism brand.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Guinea-Bissau"],
    },
  ],
  KG: [
    {
      id: "kg-kyrgyz-tourism",
      countryCode: "KG",
      name: "Kyrgyz Republic Tourism",
      agency: "Ministry of Culture, Information, Sports and Youth Policy, Kyrgyzstan",
      visitors: {
        count: 8508000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Kyrgyzstan)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Kyrgyzstan) for the Kyrgyz Republic's national tourism logo (presented jointly by the tourism ministry and the International Business Council) — no usable copy could be found.",
      sources: [
        "https://akipress.com/news:515254:Tourism_Ministry,_IBC_to_present_tourism_logo_and_website_of_Kyrgyzstan/",
        "https://en.wikipedia.org/wiki/Tourism_in_Kyrgyzstan",
      ],
    },
  ],
  LI: [
    {
      id: "li-liechtenstein-tourism",
      countryCode: "LI",
      name: "Liechtenstein Tourism",
      agency: "Liechtenstein Marketing (tourism division)",
      visitors: {
        count: 58400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Liechtenstein)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Liechtenstein, Category:Tourism in Liechtenstein) — the logos found are all other institutions (parliament, government, university), and no usable copy of a dedicated tourism-board logo could be found.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Liechtenstein"],
    },
  ],
  MR: [
    {
      id: "mr-ont-mauritanie",
      countryCode: "MR",
      name: "Office National de Tourisme de Mauritanie",
      agency: "Office National de Tourisme de Mauritanie (ONTM)",
      visitors: {
        count: 30000,
        year: 2000,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Mauritania; this is an old figure, no newer one is published)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Mauritania, Category:Tourism in Mauritania) — no usable copy of the Office National de Tourisme de Mauritanie's logo could be found.",
      sources: ["https://isto.international/isto_members/office-national-de-tourisme-de-mauritanie/"],
    },
  ],
  SL: [
    {
      id: "sl-explore-freedom",
      countryCode: "SL",
      name: "Sierra Leone — \"Explore Freedom\"",
      slogan: "Explore Freedom",
      agency: "Sierra Leone National Tourist Board",
      visitors: {
        count: 71000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Sierra Leone)",
      },
      logo: "/tourism-logos/sl/sierra-leone-explore-freedom.png",
      logoExplainer:
        "Sierra Leone's \"Explore Freedom\" destination mark: the country's name in a green script beneath a scene drawn in green and blue line work of palm trees on a shore with a bird in flight, above the tagline \"Explore Freedom\". The tagline plays on Freetown, the capital founded as a settlement for freed people.",
      sources: [
        "https://acorntourism.co.uk/projects/sierra-leone-national-tourism-marketing-strategy-and-rebranding-p677521",
        "https://ntb.gov.sl/about-us/",
        "https://www.visitsierraleone.org/",
      ],
      licenceNote:
        "Copyrighted brand mark of Sierra Leone's National Tourist Board, taken from its official visitsierraleone.org site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  TJ: [
    {
      id: "tj-committee-for-tourism-development",
      countryCode: "TJ",
      name: "Committee for Tourism Development",
      agency: "Committee for Tourism Development, Tajikistan",
      visitors: {
        count: 1035000,
        year: 2018,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Tajikistan)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Tajikistan) for the Committee for Tourism Development's logo — no usable copy could be found.",
      sources: ["https://ctd.tj/en/"],
    },
  ],
  TM: [
    {
      id: "tm-state-committee-for-tourism",
      countryCode: "TM",
      name: "Turkmenistan — \"Altyn asyr\"",
      slogan: "Altyn asyr (Golden Age)",
      agency: "State Committee for Tourism of Turkmenistan",
      visitorsNote:
        "No World Bank international-tourist-arrivals figure is published for Turkmenistan.",
      logo: "/tourism-logos/tm/turkmenistan-altyn-asyr.png",
      logoExplainer:
        "Turkmenistan's promotional mark: the country's name in green capitals with the words \"Altyn asyr\" (\"golden age\") beneath in gold, set over a faint globe of dotted green geometry. The gold-and-green palette follows the national flag, whose green field carries the carpet guls Turkmenistan treats as its defining national ornament.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Turkmenistan", "http://tourism.gov.tm/",  "https://turkmenistan.gov.tm/",
      ],
      licenceNote:
        "Copyrighted promotional mark used by the Government of Turkmenistan, taken from its official state portal and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  KM: [
    {
      id: "km-office-national-du-tourisme",
      countryCode: "KM",
      name: "Office National du Tourisme des Comores",
      agency: "Office National du Tourisme des Comores",
      visitors: {
        count: 7000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Comoros)",
      },
      noImageReason:
        "Searched Wikimedia Commons for a Comoros national tourism office logo — no usable copy could be found.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_the_Comoros"],
    },
  ],
  KP: [
    {
      id: "kp-korea-international-travel-company",
      countryCode: "KP",
      name: "Korea International Travel Company",
      agency: "Korea International Travel Company (KITC)",
      launched: 1953,
      visitorsNote:
        "No World Bank international-tourist-arrivals figure is published for North Korea.",
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in North Korea) for a logo of the Korea International Travel Company (KITC, North Korea's largest and oldest state tourism bureau, founded 1953) — no usable copy could be found.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_North_Korea", "https://rockyroadtravel.com/korea-international-travel-company/"],
    },
  ],
  KI: [
    {
      id: "ki-kiribati-national-tourism-office",
      countryCode: "KI",
      name: "Kiribati Tourism Authority",
      agency: "Kiribati National Tourism Office (KNTO)",
      visitors: {
        count: 12000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Kiribati)",
      },
      logo: "/tourism-logos/ki/kiribati-tourism-authority.webp",
      logoExplainer:
        "Kiribati's tourism mark: the word \"KIRIBATI\" in heavy brown capitals whose letters are cut with notched, carved edges recalling Kiribati woodwork and pandanus weaving, beneath the small line \"TOURISM AUTHORITY\".",
      sources: ["https://www.kiribatitourism.gov.ki/kiribati-national-tourism-office/"],
      licenceNote:
        "Copyrighted brand mark of the Kiribati National Tourism Office, taken from its official kiribatitourism.gov.ki site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  MH: [
    {
      id: "mh-marshall-islands-visitors-authority",
      countryCode: "MH",
      name: "Marshall Islands Visitors Authority",
      agency: "Marshall Islands Visitors Authority (MIVA)",
      visitors: {
        count: 6100,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Marshall Islands)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in the Marshall Islands) for a Marshall Islands Visitors Authority (MIVA) logo — no usable copy could be found.",
      sources: ["https://www.micronesiatour.com/marshall-islands-visitors-authority-miva"],
    },
  ],
  PW: [
    {
      id: "pw-palau-visitors-authority",
      countryCode: "PW",
      name: "Pristine Paradise Palau",
      slogan: "Pristine Paradise Palau",
      agency: "Palau Visitors Authority (PVA)",
      launched: 1982,
      visitors: {
        count: 18400,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Palau)",
      },
      logo: "/tourism-logos/pw/pristine-paradise-palau.png",
      logoExplainer:
        "The \"Pristine Paradise Palau\" brand: the tagline in blue script above \"PALAU\" in heavy blue capitals, overlaid on a large yellow disc, with \"Palau Visitors Authority\" beneath. A yellow disc on blue is the design of Palau's national flag, where it represents the full moon on the ocean.",
      sources: ["https://pristineparadisepalau.com/palau-visitors-authority/"],
      licenceNote:
        "Copyrighted brand mark of the Palau Visitors Authority, taken from its official pristineparadisepalau.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  ST: [
    {
      id: "st-sao-tome-tourism",
      countryCode: "ST",
      name: "São Tomé e Príncipe Tourism",
      agency: "Direção Geral do Turismo, São Tomé and Príncipe",
      visitors: {
        count: 33400,
        year: 2018,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for São Tomé and Príncipe)",
      },
      noImageReason:
        "Searched Wikimedia Commons for a São Tomé and Príncipe national tourism logo — a nature-themed consumer destination brand (forest, turtles, whales, parrots and the traditional Roça plantation houses) was designed for the country by the agency Extractdesign, but no usable copy of it could be found on Commons.",
      sources: ["https://www.extractdesign.com/case-studies/saotomeeprincipe/"],
    },
  ],
  TO: [
    {
      id: "to-tonga-tourism-authority",
      countryCode: "TO",
      name: "Kingdom of Tonga — \"The True South Pacific\"",
      slogan: "The True South Pacific",
      agency: "Tonga Tourism Authority",
      visitors: {
        count: 94000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Tonga)",
      },
      logo: "/tourism-logos/to/kingdom-of-tonga.png",
      logoExplainer:
        "Tonga's destination mark: a deep red panel carrying a white crown above the words \"KINGDOM OF\" and \"TONGA\" in white capitals, with the line \"THE TRUE SOUTH PACIFIC\" beneath. Red and white are the colours of the Tongan flag, and the crown marks Tonga's standing as the only Pacific island nation never to have relinquished its monarchy.",
      sources: ["https://www.tongatourism.gov.to/",  "https://www.thekingdomoftonga.com/",
      ],
      licenceNote:
        "Copyrighted brand mark of the Tonga Tourism Authority, taken from its official site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  TV: [
    {
      id: "tv-timeless-tuvalu",
      countryCode: "TV",
      name: "Timeless Tuvalu",
      slogan: "Timeless Tuvalu",
      agency: "Tuvalu Department of Tourism",
      visitors: {
        count: 3600,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Tuvalu)",
      },
      logo: "/tourism-logos/tv/timeless-tuvalu.png",
      logoExplainer:
        "The mark of Tuvalu's national tourism brand, Timeless Tuvalu: a five-petalled frangipani drawn in pale blue outline with white petals, the flower that grows across the atolls and is worn in garlands and headdresses throughout the islands. Pale blue is the colour of the Tuvaluan flag's field and of the lagoon the country is built around.",
      sources: ["https://www.timelesstuvalu.com/about-us/", "https://timelesstuvalu.com/"],
      licenceNote:
        "Copyrighted brand mark of the Tuvalu Tourism Office, taken from its official timelesstuvalu.com site and bundled for identification of the destination brand, on the same non-free basis this repository uses for crests and passport covers.",
    },
  ],
  WS: [
    {
      id: "ws-samoa-tourism-authority",
      countryCode: "WS",
      name: "Samoa Tourism Authority",
      agency: "Samoa Tourism Authority (STA)",
      visitors: {
        count: 23900,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Samoa)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Samoa, which holds only a newspaper and an Olympic-committee logo, neither tourism-related) for the Samoa Tourism Authority's logo (refreshed to a full-colour version in late 2018) — no usable copy could be found; the only file matching \"Samoa Tourism\" is a 2009 photograph of the STA's office building, not a logo.",
      sources: ["https://en.wikipedia.org/wiki/Samoa_Tourism_Authority", "https://www.samoatourism.org/"],
    },
  ],
};

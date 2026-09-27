#!/usr/bin/env node
/**
 * Batch 2: fill remaining countries toward 5 general-interest newspapers;
 * replace leftover business-only / non-newspaper slots.
 */
import { readFileSync, writeFileSync } from "node:fs";

const DATA_PATH = "src/data/nationalNewspapers.ts";
const NO_IMAGE =
  "No verified masthead image is available in the app for this newspaper yet, so it is listed without one rather than with an invented logo.";

function loadConst(src, marker) {
  const start = src.indexOf(marker);
  const eq = src.indexOf("= {", start);
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) { if (c === "\\") { i++; continue; } if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  return Function(`"use strict"; return (${src.slice(open, i)});`)();
}

function p(partial) {
  return {
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    revenueModel: "Advertising, subscriptions, and/or print sales",
    noImageReason: NO_IMAGE,
    ...partial,
    owner: partial.owner,
    readership: partial.readership,
    sources: partial.sources,
  };
}

/** removeIds → drop; add → append (and used to rebuild to exactly the keep+add set when replace is set) */
const OPS = {
  KE: {
    remove: ["ke-business-daily"],
    add: [
      p({ id: "ke-the-standard", countryCode: "KE", name: "The Standard", founded: 1902, language: "English", headquarters: "Nairobi",
        owner: { name: "Standard Group", type: "Commercial media group" },
        editorialStance: "Kenya's oldest newspaper; national politics and general news",
        readership: { metric: "Major Kenyan national daily", source: "https://en.wikipedia.org/wiki/The_Standard_(Kenya)" },
        sources: ["https://www.standardmedia.co.ke", "https://en.wikipedia.org/wiki/The_Standard_(Kenya)"] }),
      p({ id: "ke-the-star", countryCode: "KE", name: "The Star", founded: 2007, language: "English", headquarters: "Nairobi",
        owner: { name: "Radio Africa Group", type: "Commercial media group" },
        editorialStance: "National general-interest daily; politics and current affairs",
        readership: { metric: "Major Kenyan daily", source: "https://en.wikipedia.org/wiki/The_Star_(Kenya)" },
        sources: ["https://www.the-star.co.ke", "https://en.wikipedia.org/wiki/The_Star_(Kenya)"] }),
      p({ id: "ke-people-daily", countryCode: "KE", name: "People Daily", founded: 1998, language: "English", headquarters: "Nairobi",
        owner: { name: "Mediamax Network", type: "Commercial media" },
        editorialStance: "National free-to-reader general-interest daily; politics and popular news",
        readership: { metric: "Widely distributed Kenyan daily", source: "https://en.wikipedia.org/wiki/People_Daily_(Kenya)" },
        sources: ["https://www.pd.co.ke", "https://en.wikipedia.org/wiki/People_Daily_(Kenya)"] }),
      p({ id: "ke-taifa-leo", countryCode: "KE", name: "Taifa Leo", founded: 1958, language: "Swahili", headquarters: "Nairobi",
        owner: { name: "Nation Media Group", type: "Commercial media group" },
        editorialStance: "Leading Swahili-language national daily; politics and general news",
        readership: { metric: "Principal Swahili daily in Kenya", source: "https://en.wikipedia.org/wiki/Taifa_Leo" },
        sources: ["https://taifaleo.nation.africa", "https://en.wikipedia.org/wiki/Taifa_Leo"] }),
    ],
  },
  PE: {
    remove: ["pe-gestion"],
    add: [
      p({ id: "pe-peru-21", countryCode: "PE", name: "Perú.21", founded: 2002, language: "Spanish", headquarters: "Lima",
        owner: { name: "Empresa Editora El Comercio", type: "Commercial media group" },
        editorialStance: "National general-interest daily; politics and current affairs",
        readership: { metric: "Major Peruvian daily", source: "https://en.wikipedia.org/wiki/Perú.21" },
        sources: ["https://peru21.pe", "https://en.wikipedia.org/wiki/Perú.21"] }),
      p({ id: "pe-correo", countryCode: "PE", name: "Correo", founded: 1962, language: "Spanish", headquarters: "Lima",
        owner: { name: "Empresa Periodística Nacional (EPENSA) / El Comercio group", type: "Commercial media group" },
        editorialStance: "National and regional general-interest daily network",
        readership: { metric: "Large multi-city Peruvian daily", source: "https://en.wikipedia.org/wiki/Diario_Correo" },
        sources: ["https://diariocorreo.pe", "https://en.wikipedia.org/wiki/Diario_Correo"] }),
      p({ id: "pe-rpp-noticias", countryCode: "PE", name: "RPP Noticias", founded: 1963, language: "Spanish", headquarters: "Lima", format: "Digital news portal",
        owner: { name: "Grupo RPP", type: "Commercial media group" },
        editorialStance: "Peru's leading digital general-interest newsroom (radio-affiliated press site); politics and breaking news",
        readership: { metric: "Among Peru's most-visited news sites", source: "https://en.wikipedia.org/wiki/Radio_Programas_del_Perú" },
        sources: ["https://rpp.pe", "https://en.wikipedia.org/wiki/Radio_Programas_del_Perú"] }),
    ],
  },
  RO: {
    remove: ["ro-ziarul-financiar"],
    add: [
      p({ id: "ro-libertatea", countryCode: "RO", name: "Libertatea", founded: 1989, language: "Romanian", headquarters: "Bucharest", format: "Tabloid & digital",
        owner: { name: "Ringier Romania", type: "Commercial media group" },
        editorialStance: "Highest-circulation Romanian general-interest daily; politics and popular news",
        readership: { metric: "Romania's highest-circulation daily", source: "https://en.wikipedia.org/wiki/Libertatea" },
        sources: ["https://www.libertatea.ro", "https://en.wikipedia.org/wiki/Libertatea"] }),
      p({ id: "ro-hotnews", countryCode: "RO", name: "HotNews.ro", founded: 1999, language: "Romanian", headquarters: "Bucharest", format: "Digital news portal",
        owner: { name: "HotNews Media", type: "Independent commercial media" },
        editorialStance: "Leading Romanian digital general-interest news portal; politics and investigation",
        readership: { metric: "Major Romanian news website", source: "https://en.wikipedia.org/wiki/HotNews.ro" },
        sources: ["https://www.hotnews.ro", "https://en.wikipedia.org/wiki/HotNews.ro"] }),
    ],
  },
  SI: {
    remove: ["si-finance"],
    add: [
      p({ id: "si-slovenske-novice", countryCode: "SI", name: "Slovenske novice", founded: 1991, language: "Slovene", headquarters: "Ljubljana", format: "Tabloid & digital",
        owner: { name: "Delo d.o.o.", type: "Commercial media" },
        editorialStance: "Slovenia's highest-circulation general-interest daily; news and current affairs",
        readership: { metric: "Highest-circulation Slovene daily", source: "https://en.wikipedia.org/wiki/Slovenske_novice" },
        sources: ["https://www.slovenskenovice.si", "https://en.wikipedia.org/wiki/Slovenske_novice"] }),
      p({ id: "si-necenzurirano", countryCode: "SI", name: "Necenzurirano.si / N1 Slovenija news", founded: 2021, language: "Slovene", headquarters: "Ljubljana", format: "Digital news portal",
        owner: { name: "United Media / N1", type: "Commercial media" },
        editorialStance: "Digital general-interest newsroom; national politics and investigation",
        readership: { metric: "Major Slovene digital news brand", source: "https://n1info.si" },
        sources: ["https://n1info.si"] }),
    ],
  },
  SK: {
    remove: ["sk-hospodarske-noviny"],
    add: [
      p({ id: "sk-aktuality", countryCode: "SK", name: "Aktuality.sk", founded: 2005, language: "Slovak", headquarters: "Bratislava", format: "Digital news portal",
        owner: { name: "Ringier Slovakia", type: "Commercial media group" },
        editorialStance: "Slovakia's most-visited general-interest news portal; politics and breaking news",
        readership: { metric: "Highest-traffic Slovak news website", source: "https://en.wikipedia.org/wiki/Aktuality.sk" },
        sources: ["https://www.aktuality.sk", "https://en.wikipedia.org/wiki/Aktuality.sk"] }),
      p({ id: "sk-plus-jeden-den", countryCode: "SK", name: "Plus jeden deň", founded: 2006, language: "Slovak", headquarters: "Bratislava", format: "Tabloid & digital",
        owner: { name: "News and Media Holding", type: "Commercial media" },
        editorialStance: "Mass-circulation Slovak general-interest daily",
        readership: { metric: "Major Slovak daily by circulation", source: "https://en.wikipedia.org/wiki/Plus_jeden_deň" },
        sources: ["https://www1.pluska.sk", "https://en.wikipedia.org/wiki/Plus_jeden_deň"] }),
    ],
  },
  BG: {
    remove: ["bg-capital"],
    add: [
      p({ id: "bg-sega", countryCode: "BG", name: "Sega", founded: 1997, language: "Bulgarian", headquarters: "Sofia",
        owner: { name: "Sega AD", type: "Independent commercial media" },
        editorialStance: "National general-interest daily; politics and current affairs",
        readership: { metric: "Established Bulgarian daily", source: "https://en.wikipedia.org/wiki/Sega_(newspaper)" },
        sources: ["https://www.segabg.com", "https://en.wikipedia.org/wiki/Sega_(newspaper)"] }),
      p({ id: "bg-mediapool", countryCode: "BG", name: "Mediapool", founded: 2000, language: "Bulgarian", headquarters: "Sofia", format: "Digital news portal",
        owner: { name: "Mediapool EOOD", type: "Independent commercial media" },
        editorialStance: "Leading Bulgarian digital news portal; politics and investigation",
        readership: { metric: "Major Bulgarian news website", source: "https://www.mediapool.bg" },
        sources: ["https://www.mediapool.bg"] }),
    ],
  },
  QA: {
    remove: ["qa-aljazeera"],
    add: [
      p({ id: "qa-the-peninsula", countryCode: "QA", name: "The Peninsula", founded: 1996, language: "English", headquarters: "Doha",
        owner: { name: "Dar Al Sharq", type: "Commercial media" },
        editorialStance: "Qatari English-language general-interest daily",
        readership: { metric: "Major Qatari English daily", source: "https://en.wikipedia.org/wiki/The_Peninsula_(newspaper)" },
        sources: ["https://thepeninsulaqatar.com", "https://en.wikipedia.org/wiki/The_Peninsula_(newspaper)"] }),
      p({ id: "qa-qatar-tribune", countryCode: "QA", name: "Qatar Tribune", founded: 2006, language: "English", headquarters: "Doha",
        owner: { name: "Qatar Tribune / local publishers", type: "Commercial media" },
        editorialStance: "English-language general-interest daily; local and regional news",
        readership: { metric: "Qatari English daily", source: "https://en.wikipedia.org/wiki/Qatar_Tribune" },
        sources: ["https://www.qatar-tribune.com", "https://en.wikipedia.org/wiki/Qatar_Tribune"] }),
    ],
  },
  TN: {
    remove: ["tn-business-news"],
    add: [
      p({ id: "tn-mosaique-fm-news", countryCode: "TN", name: "Mosaique Info", founded: 2003, language: "Arabic / French", headquarters: "Tunis", format: "Digital news portal",
        owner: { name: "Mosaique FM / private", type: "Commercial media" },
        editorialStance: "Leading Tunisian digital general-interest newsroom; politics and breaking news",
        readership: { metric: "Among Tunisia's most-consumed news brands", source: "https://www.mosaiquefm.net" },
        sources: ["https://www.mosaiquefm.net"] }),
      p({ id: "tn-kapitalis", countryCode: "TN", name: "Kapitalis", founded: 2009, language: "French / Arabic", headquarters: "Tunis", format: "Digital news portal",
        owner: { name: "Kapitalis", type: "Independent commercial media" },
        editorialStance: "Independent Tunisian digital news site; politics and society (general interest, not finance-only)",
        readership: { metric: "Established Tunisian digital news brand", source: "https://kapitalis.com" },
        sources: ["https://kapitalis.com"] }),
    ],
  },
  BT: {
    remove: ["bt-business-bhutan", "bt-journal-of-bhutan-studies"],
    add: [
      p({ id: "bt-bhutan-times", countryCode: "BT", name: "Bhutan Times", founded: 2006, language: "English", headquarters: "Thimphu",
        owner: { name: "Bhutan Times Ltd", type: "Independent commercial media" },
        editorialStance: "Private English-language weekly/daily news brand; national affairs",
        readership: { metric: "Major private Bhutanese newspaper", source: "https://en.wikipedia.org/wiki/Bhutan_Times" },
        sources: ["https://www.bhutantimes.bt", "https://en.wikipedia.org/wiki/Bhutan_Times"] }),
      p({ id: "bt-bhutan-today", countryCode: "BT", name: "Bhutan Today", founded: 2008, language: "English", headquarters: "Thimphu",
        owner: { name: "Bhutan Today", type: "Independent commercial media" },
        editorialStance: "Private general-interest newspaper; politics and society",
        readership: { metric: "Private Bhutanese daily/weekly news brand", source: "https://www.bhutantoday.bt" },
        sources: ["https://www.bhutantoday.bt"] }),
      p({ id: "bt-the-journalistin", countryCode: "BT", name: "The Journalist", founded: 2011, language: "English", headquarters: "Thimphu",
        owner: { name: "The Journalist", type: "Independent commercial media" },
        editorialStance: "Private Bhutanese newspaper; current affairs and general news",
        readership: { metric: "Private Bhutanese news title", source: "https://en.wikipedia.org/wiki/Media_of_Bhutan" },
        sources: ["https://en.wikipedia.org/wiki/Media_of_Bhutan"] }),
    ],
  },
};

const FILL_MAP = {
  AE: [p({ id: "ae-al-khaleej", countryCode: "AE", name: "Al Khaleej", founded: 1970, language: "Arabic", headquarters: "Sharjah",
    owner: { name: "Dar Al Khaleej", type: "Commercial media" },
    editorialStance: "UAE Arabic general-interest daily; regional and national news",
    readership: { metric: "Major UAE Arabic daily", source: "https://en.wikipedia.org/wiki/Al_Khaleej_(newspaper)" },
    sources: ["https://www.alkhaleej.ae", "https://en.wikipedia.org/wiki/Al_Khaleej_(newspaper)"] })],
  AL: [p({ id: "al-tema", countryCode: "AL", name: "Gazeta Tema", founded: 1999, language: "Albanian", headquarters: "Tirana", format: "Digital & print",
    owner: { name: "Tema Media", type: "Independent commercial media" },
    editorialStance: "Influential Albanian general-interest news brand; politics and investigation",
    readership: { metric: "Major Albanian news brand", source: "https://en.wikipedia.org/wiki/Tema_(newspaper)" },
    sources: ["https://www.gazetatema.net", "https://en.wikipedia.org/wiki/Tema_(newspaper)"] })],
  AO: [p({ id: "ao-angonoticias", countryCode: "AO", name: "AngoNotícias", founded: 2003, language: "Portuguese", headquarters: "Luanda", format: "Digital news portal",
    owner: { name: "AngoNotícias", type: "Independent commercial media" },
    editorialStance: "Leading Angolan digital general-interest news portal",
    readership: { metric: "Major Angolan news website", source: "https://www.angonoticias.com" },
    sources: ["https://www.angonoticias.com"] })],
  BD: [
    p({ id: "bd-the-daily-star", countryCode: "BD", name: "The Daily Star", founded: 1991, language: "English", headquarters: "Dhaka",
      owner: { name: "Transcom Group", type: "Commercial media" },
      editorialStance: "Bangladesh's leading English daily; politics and general news",
      readership: { metric: "Principal English daily of Bangladesh", source: "https://en.wikipedia.org/wiki/The_Daily_Star_(Bangladesh)" },
      sources: ["https://www.thedailystar.net", "https://en.wikipedia.org/wiki/The_Daily_Star_(Bangladesh)"] }),
    p({ id: "bd-jugantor", countryCode: "BD", name: "Jugantor", founded: 2000, language: "Bengali", headquarters: "Dhaka",
      owner: { name: "Jamuna Group", type: "Commercial media" },
      editorialStance: "Major Bengali general-interest daily",
      readership: { metric: "Among Bangladesh's largest Bengali dailies", source: "https://en.wikipedia.org/wiki/Jugantor" },
      sources: ["https://www.jugantor.com", "https://en.wikipedia.org/wiki/Jugantor"] }),
    p({ id: "bd-samakal", countryCode: "BD", name: "Samakal", founded: 2005, language: "Bengali", headquarters: "Dhaka",
      owner: { name: "Times Media Ltd", type: "Commercial media" },
      editorialStance: "Major Bengali general-interest daily; politics and national news",
      readership: { metric: "Large Bengali daily", source: "https://en.wikipedia.org/wiki/Samakal" },
      sources: ["https://samakal.com", "https://en.wikipedia.org/wiki/Samakal"] }),
  ],
  BO: [p({ id: "bo-el-diario", countryCode: "BO", name: "El Diario", founded: 1904, language: "Spanish", headquarters: "La Paz",
    owner: { name: "Editorial El Diario", type: "Independent commercial media" },
    editorialStance: "Historic La Paz general-interest daily; national politics and news",
    readership: { metric: "Long-standing Bolivian daily", source: "https://en.wikipedia.org/wiki/El_Diario_(La_Paz)" },
    sources: ["https://www.eldiario.net", "https://en.wikipedia.org/wiki/El_Diario_(La_Paz)"] })],
  CR: [p({ id: "cr-ameliarueda", countryCode: "CR", name: "AmeliaRueda.com", founded: 2012, language: "Spanish", headquarters: "San José", format: "Digital news portal",
    owner: { name: "Amelia Rueda / private", type: "Independent commercial media" },
    editorialStance: "Leading Costa Rican digital general-interest newsroom; politics and breaking news",
    readership: { metric: "Major Costa Rican digital news brand", source: "https://www.ameliarueda.com" },
    sources: ["https://www.ameliarueda.com"] })],
  EC: [p({ id: "ec-gk", countryCode: "EC", name: "GK", founded: 2011, language: "Spanish", headquarters: "Quito", format: "Digital news portal",
    owner: { name: "GK.city", type: "Independent commercial media" },
    editorialStance: "Independent Ecuadorian digital newsroom; politics, investigation, and general affairs",
    readership: { metric: "Major Ecuadorian digital news brand", source: "https://gk.city" },
    sources: ["https://gk.city"] })],
  UA: [
    p({ id: "ua-ukrainska-pravda", countryCode: "UA", name: "Ukrainska Pravda", founded: 2000, language: "Ukrainian / English", headquarters: "Kyiv", format: "Digital news portal",
      owner: { name: "Dragon Capital / private", type: "Independent commercial media" },
      editorialStance: "Ukraine's leading independent digital newspaper; politics and investigation",
      readership: { metric: "Among Ukraine's most-read news sites", source: "https://en.wikipedia.org/wiki/Ukrayinska_Pravda" },
      sources: ["https://www.pravda.com.ua", "https://en.wikipedia.org/wiki/Ukrayinska_Pravda"] }),
    p({ id: "ua-lb-ua", countryCode: "UA", name: "LB.ua", founded: 2009, language: "Ukrainian / Russian", headquarters: "Kyiv", format: "Digital news portal",
      owner: { name: "Committee of Voters / private", type: "Independent commercial media" },
      editorialStance: "Major Ukrainian digital news outlet; politics and current affairs",
      readership: { metric: "Major Ukrainian news website", source: "https://en.wikipedia.org/wiki/LB.ua" },
      sources: ["https://lb.ua", "https://en.wikipedia.org/wiki/LB.ua"] }),
    p({ id: "ua-dzerkalo-tyzhnya", countryCode: "UA", name: "Dzerkalo Tyzhnia", founded: 1994, language: "Ukrainian / English", headquarters: "Kyiv", frequency: "Weekly newspaper",
      owner: { name: "Dzerkalo Tyzhnia", type: "Independent commercial media" },
      editorialStance: "Influential Ukrainian quality weekly; politics, analysis, and investigation",
      readership: { metric: "Leading Ukrainian analytical weekly", source: "https://en.wikipedia.org/wiki/Dzerkalo_Tyzhnia" },
      sources: ["https://zn.ua", "https://en.wikipedia.org/wiki/Dzerkalo_Tyzhnia"] }),
  ],
  RU: [
    p({ id: "ru-novaya-gazeta", countryCode: "RU", name: "Novaya Gazeta", founded: 1993, language: "Russian", headquarters: "Moscow",
      owner: { name: "Novaya Gazeta publishing", type: "Independent commercial media" },
      editorialStance: "Independent investigative newspaper; politics and human rights (Europe edition continues after wartime restrictions)",
      readership: { metric: "Russia's best-known independent investigative paper", source: "https://en.wikipedia.org/wiki/Novaya_Gazeta" },
      sources: ["https://novayagazeta.eu", "https://en.wikipedia.org/wiki/Novaya_Gazeta"] }),
    p({ id: "ru-moskovsky-komsomolets", countryCode: "RU", name: "Moskovsky Komsomolets", founded: 1919, language: "Russian", headquarters: "Moscow",
      owner: { name: "MK Publishing House", type: "Commercial media" },
      editorialStance: "Major Moscow general-interest daily with national distribution",
      readership: { metric: "Among Russia's highest-circulation dailies", source: "https://en.wikipedia.org/wiki/Moskovskij_Komsomolets" },
      sources: ["https://www.mk.ru", "https://en.wikipedia.org/wiki/Moskovskij_Komsomolets"] }),
  ],
  FJ: [
    p({ id: "fj-fiji-village", countryCode: "FJ", name: "FijiVillage", founded: 2000, language: "English", headquarters: "Suva", format: "Digital news portal",
      owner: { name: "Communications Fiji Ltd", type: "Commercial media" },
      editorialStance: "Major Fijian digital general-interest news portal",
      readership: { metric: "Leading Fijian news website", source: "https://www.fijivillage.com" },
      sources: ["https://www.fijivillage.com"] }),
    p({ id: "fj-fbc-news", countryCode: "FJ", name: "FBC News", founded: 1998, language: "English", headquarters: "Suva", format: "Digital news portal",
      owner: { name: "Fiji Broadcasting Corporation", type: "Public media" },
      editorialStance: "National digital newsroom of Fiji's public broadcaster — press-led web news, not a TV channel listing",
      readership: { metric: "Major Fijian public news website", source: "https://www.fbcnews.com.fj" },
      sources: ["https://www.fbcnews.com.fj"] }),
    p({ id: "fj-islands-business", countryCode: "FJ", name: "The Jet Newspaper", founded: 2010, language: "English", headquarters: "Suva",
      owner: { name: "Private Fijian publishers", type: "Independent commercial media" },
      editorialStance: "Fijian general-interest newspaper / news brand covering national affairs",
      readership: { metric: "Fijian print/digital news title", source: "https://en.wikipedia.org/wiki/Media_of_Fiji" },
      sources: ["https://en.wikipedia.org/wiki/Media_of_Fiji"] }),
  ],
  PK: [p({ id: "pk-nawaiwaqt", countryCode: "PK", name: "Nawaiwaqt", founded: 1940, language: "Urdu", headquarters: "Lahore",
    owner: { name: "Nawaiwaqt Group", type: "Commercial media" },
    editorialStance: "Major Urdu general-interest daily; politics and national news",
    readership: { metric: "Among Pakistan's leading Urdu dailies", source: "https://en.wikipedia.org/wiki/Nawaiwaqt" },
    sources: ["https://www.nawaiwaqt.com.pk", "https://en.wikipedia.org/wiki/Nawaiwaqt"] })],
  VN: [p({ id: "vn-lao-dong", countryCode: "VN", name: "Lao Động", founded: 1951, language: "Vietnamese", headquarters: "Hanoi",
    owner: { name: "Vietnam General Confederation of Labour", type: "State / labour media" },
    editorialStance: "National general-interest daily; politics, labour, and society",
    readership: { metric: "Major Vietnamese national daily", source: "https://en.wikipedia.org/wiki/Lao_Động" },
    sources: ["https://laodong.vn", "https://en.wikipedia.org/wiki/Lao_Động"] })],
  RS: [p({ id: "rs-nova-rs", countryCode: "RS", name: "Nova.rs", founded: 2019, language: "Serbian", headquarters: "Belgrade", format: "Digital news portal",
    owner: { name: "United Group", type: "Commercial media" },
    editorialStance: "Major Serbian digital general-interest news portal",
    readership: { metric: "Leading Serbian digital news brand", source: "https://nova.rs" },
    sources: ["https://nova.rs"] })],
  SA: [p({ id: "sa-al-watan", countryCode: "SA", name: "Al-Watan", founded: 2000, language: "Arabic", headquarters: "Abha / Riyadh",
    owner: { name: "Al-Watan Publishing", type: "Commercial media" },
    editorialStance: "Saudi general-interest daily; national and regional news",
    readership: { metric: "Major Saudi daily", source: "https://en.wikipedia.org/wiki/Al-Watan_(Saudi_Arabia)" },
    sources: ["https://www.alwatan.com.sa", "https://en.wikipedia.org/wiki/Al-Watan_(Saudi_Arabia)"] })],
  JM: [p({ id: "jm-rjr-news", countryCode: "JM", name: "Jamaica Star", founded: 1951, language: "English", headquarters: "Kingston", format: "Tabloid & digital",
    owner: { name: "The Gleaner Company", type: "Commercial media" },
    editorialStance: "Popular Jamaican general-interest daily; news and current affairs",
    readership: { metric: "Major Jamaican daily", source: "https://en.wikipedia.org/wiki/Jamaica_Star" },
    sources: ["http://jamaica-star.com", "https://en.wikipedia.org/wiki/Jamaica_Star"] })],
  JO: [p({ id: "jo-ammon", countryCode: "JO", name: "Ammon News", founded: 2006, language: "Arabic", headquarters: "Amman", format: "Digital news portal",
    owner: { name: "Ammon News", type: "Independent commercial media" },
    editorialStance: "Leading Jordanian digital general-interest news portal",
    readership: { metric: "Major Jordanian news website", source: "https://en.wikipedia.org/wiki/Ammon_News" },
    sources: ["https://www.ammonnews.net", "https://en.wikipedia.org/wiki/Ammon_News"] })],
  LB: [p({ id: "lb-al-akhbar", countryCode: "LB", name: "Al-Akhbar", founded: 2006, language: "Arabic", headquarters: "Beirut",
    owner: { name: "Al-Akhbar", type: "Independent commercial media" },
    editorialStance: "Lebanese general-interest daily; politics and current affairs",
    readership: { metric: "Major Lebanese Arabic daily", source: "https://en.wikipedia.org/wiki/Al-Akhbar_(Lebanon)" },
    sources: ["https://al-akhbar.com", "https://en.wikipedia.org/wiki/Al-Akhbar_(Lebanon)"] })],
  LU: [p({ id: "lu-reporter", countryCode: "LU", name: "Reporter.lu", founded: 2012, language: "German / French / English", headquarters: "Luxembourg City", format: "Digital news portal",
    owner: { name: "Reporter.lu", type: "Independent commercial media" },
    editorialStance: "Independent Luxembourgish digital newsroom; politics and investigation",
    readership: { metric: "Major Luxembourg digital news brand", source: "https://www.reporter.lu" },
    sources: ["https://www.reporter.lu"] })],
  MT: [p({ id: "mt-newsbook", countryCode: "MT", name: "Newsbook", founded: 2011, language: "English / Maltese", headquarters: "Blata l-Bajda", format: "Digital news portal",
    owner: { name: "Media.link Communications / Church media", type: "Independent media" },
    editorialStance: "Maltese digital general-interest news portal",
    readership: { metric: "Major Maltese news website", source: "https://newsbook.com.mt" },
    sources: ["https://newsbook.com.mt"] })],
  NP: [
    p({ id: "np-nagarik", countryCode: "NP", name: "Nagarik", founded: 2009, language: "Nepali", headquarters: "Kathmandu",
      owner: { name: "Nepal Republic Media", type: "Commercial media" },
      editorialStance: "Major Nepali general-interest daily",
      readership: { metric: "Leading Nepali daily", source: "https://en.wikipedia.org/wiki/Nagarik" },
      sources: ["https://nagariknews.nagariknetwork.com", "https://en.wikipedia.org/wiki/Nagarik"] }),
    p({ id: "np-onlinekhabar", countryCode: "NP", name: "Onlinekhabar", founded: 2008, language: "Nepali", headquarters: "Kathmandu", format: "Digital news portal",
      owner: { name: "Onlinekhabar", type: "Independent commercial media" },
      editorialStance: "Nepal's leading digital general-interest news portal",
      readership: { metric: "Highest-traffic Nepali news website", source: "https://www.onlinekhabar.com" },
      sources: ["https://www.onlinekhabar.com"] }),
  ],
  PA: [
    p({ id: "pa-critica", countryCode: "PA", name: "Crítica", founded: 1958, language: "Spanish", headquarters: "Panama City",
      owner: { name: "Editorial El Panama America / related", type: "Commercial media" },
      editorialStance: "Popular Panamanian general-interest daily",
      readership: { metric: "Major Panamanian daily", source: "https://en.wikipedia.org/wiki/Crítica_(Panama)" },
      sources: ["https://www.critica.com.pa", "https://en.wikipedia.org/wiki/Media_of_Panama"] }),
    p({ id: "pa-tvn-noticias", countryCode: "PA", name: "TVN Noticias (digital)", founded: 1962, language: "Spanish", headquarters: "Panama City", format: "Digital news portal",
      owner: { name: "Televisora Nacional", type: "Commercial media" },
      editorialStance: "Leading Panamanian digital general-interest newsroom",
      readership: { metric: "Major Panamanian news website", source: "https://www.tvn-2.com" },
      sources: ["https://www.tvn-2.com"] }),
  ],
  PY: [
    p({ id: "py-extra", countryCode: "PY", name: "Diario Extra", founded: 1992, language: "Spanish", headquarters: "Asunción", format: "Tabloid & digital",
      owner: { name: "Editorial Extra", type: "Commercial media" },
      editorialStance: "Mass-circulation Paraguayan general-interest daily",
      readership: { metric: "Among Paraguay's highest-circulation dailies", source: "https://en.wikipedia.org/wiki/Media_of_Paraguay" },
      sources: ["https://www.extra.com.py"] }),
    p({ id: "py-hoy", countryCode: "PY", name: "Hoy", founded: 2004, language: "Spanish", headquarters: "Asunción",
      owner: { name: "Grupo Nación de Comunicaciones", type: "Commercial media" },
      editorialStance: "Paraguayan general-interest daily; politics and news",
      readership: { metric: "Major Asunción daily", source: "https://www.hoy.com.py" },
      sources: ["https://www.hoy.com.py"] }),
  ],
  AM: [
    p({ id: "am-azatutyun", countryCode: "AM", name: "Azatutyun (RFE/RL Armenian)", founded: 1950, language: "Armenian", headquarters: "Yerevan", format: "Digital news portal",
      owner: { name: "RFE/RL", type: "Public international media" },
      editorialStance: "Major Armenian-language digital newsroom; politics and current affairs",
      readership: { metric: "Leading Armenian independent news brand", source: "https://www.azatutyun.am" },
      sources: ["https://www.azatutyun.am"] }),
    p({ id: "am-civilnet", countryCode: "AM", name: "CivilNet", founded: 2011, language: "Armenian / English", headquarters: "Yerevan", format: "Digital news portal",
      owner: { name: "Civilitas Foundation", type: "Independent non-profit media" },
      editorialStance: "Independent Armenian digital newsroom; politics and investigation",
      readership: { metric: "Major Armenian digital news brand", source: "https://www.civilnet.am" },
      sources: ["https://www.civilnet.am"] }),
  ],
  BA: [
    p({ id: "ba-klix", countryCode: "BA", name: "Klix.ba", founded: 2000, language: "Bosnian / Croatian / Serbian", headquarters: "Sarajevo", format: "Digital news portal",
      owner: { name: "Klix.ba", type: "Independent commercial media" },
      editorialStance: "Bosnia and Herzegovina's leading digital general-interest news portal",
      readership: { metric: "Highest-traffic BiH news website", source: "https://www.klix.ba" },
      sources: ["https://www.klix.ba"] }),
    p({ id: "ba-radio-sarajevo-news", countryCode: "BA", name: "Radiosarajevo.ba", founded: 2004, language: "Bosnian", headquarters: "Sarajevo", format: "Digital news portal",
      owner: { name: "Radio Sarajevo digital", type: "Commercial media" },
      editorialStance: "Major BiH digital general-interest news portal",
      readership: { metric: "Major BiH news website", source: "https://radiosarajevo.ba" },
      sources: ["https://radiosarajevo.ba"] }),
  ],
  BY: [
    p({ id: "by-tut-by-archive", countryCode: "BY", name: "Zerkalo.io (TUT.BY successor)", founded: 2022, language: "Russian / Belarusian", headquarters: "Exile / digital", format: "Digital news portal",
      owner: { name: "TUT.BY team in exile", type: "Independent media" },
      editorialStance: "Leading independent Belarusian digital newsroom (successor to TUT.BY); politics and general news",
      readership: { metric: "Principal independent Belarusian news site", source: "https://en.wikipedia.org/wiki/TUT.BY" },
      sources: ["https://zerkalo.io", "https://en.wikipedia.org/wiki/TUT.BY"] }),
    p({ id: "by-belsat", countryCode: "BY", name: "Belsat News (digital)", founded: 2007, language: "Belarusian / Russian", headquarters: "Warsaw", format: "Digital news portal",
      owner: { name: "Belsat / TVP", type: "Public international media" },
      editorialStance: "Major Belarusian-language digital newsroom; politics and current affairs",
      readership: { metric: "Leading Belarusian exile news brand", source: "https://en.wikipedia.org/wiki/Belsat_TV" },
      sources: ["https://belsat.eu", "https://en.wikipedia.org/wiki/Belsat_TV"] }),
  ],
  LT: [
    p({ id: "lt-lrt-news", countryCode: "LT", name: "LRT.lt News", founded: 1926, language: "Lithuanian", headquarters: "Vilnius", format: "Digital news portal",
      owner: { name: "Lithuanian National Radio and Television", type: "Public media" },
      editorialStance: "National public digital newsroom; politics and general news",
      readership: { metric: "Major Lithuanian public news website", source: "https://www.lrt.lt" },
      sources: ["https://www.lrt.lt"] }),
    p({ id: "lt-lrytas", countryCode: "LT", name: "Lrytas.lt", founded: 2005, language: "Lithuanian", headquarters: "Vilnius", format: "Digital news portal",
      owner: { name: "Lietuvos rytas group", type: "Commercial media" },
      editorialStance: "Major Lithuanian digital general-interest news portal",
      readership: { metric: "Leading Lithuanian news website", source: "https://www.lrytas.lt" },
      sources: ["https://www.lrytas.lt"] }),
  ],
  LV: [
    p({ id: "lv-lsm", countryCode: "LV", name: "LSM.lv", founded: 2013, language: "Latvian / Russian / English", headquarters: "Riga", format: "Digital news portal",
      owner: { name: "Latvian Public Media", type: "Public media" },
      editorialStance: "National public digital newsroom; politics and general news",
      readership: { metric: "Major Latvian public news website", source: "https://www.lsm.lv" },
      sources: ["https://www.lsm.lv"] }),
    p({ id: "lv-tvnet", countryCode: "LV", name: "Tvnet.lv", founded: 1999, language: "Latvian / Russian", headquarters: "Riga", format: "Digital news portal",
      owner: { name: "Ekspress Grupp", type: "Commercial media" },
      editorialStance: "Leading Latvian digital general-interest news portal",
      readership: { metric: "Among Latvia's most-visited news sites", source: "https://www.tvnet.lv" },
      sources: ["https://www.tvnet.lv"] }),
  ],
  MA: [
    p({ id: "ma-medias24", countryCode: "MA", name: "Médias24", founded: 2013, language: "French", headquarters: "Casablanca", format: "Digital news portal",
      owner: { name: "Médias24", type: "Independent commercial media" },
      editorialStance: "Moroccan digital newsroom with broad politics and economy-as-news coverage (general portal, not a finance-only paper)",
      readership: { metric: "Major Moroccan French-language news site", source: "https://medias24.com" },
      sources: ["https://medias24.com"] }),
    p({ id: "ma-assabah", countryCode: "MA", name: "Assabah", founded: 2000, language: "Arabic", headquarters: "Casablanca",
      owner: { name: "Groupe Eco-Médias", type: "Commercial media" },
      editorialStance: "Major Moroccan Arabic general-interest daily",
      readership: { metric: "Leading Moroccan Arabic daily", source: "https://en.wikipedia.org/wiki/Assabah" },
      sources: ["https://assabah.ma", "https://en.wikipedia.org/wiki/Assabah"] }),
  ],
  DZ: [
    p({ id: "dz-el-khabar", countryCode: "DZ", name: "El Khabar", founded: 1990, language: "Arabic", headquarters: "Algiers",
      owner: { name: "El Khabar", type: "Independent commercial media" },
      editorialStance: "Major Algerian Arabic general-interest daily",
      readership: { metric: "Among Algeria's highest-circulation Arabic dailies", source: "https://en.wikipedia.org/wiki/El_Khabar" },
      sources: ["https://www.elkhabar.com", "https://en.wikipedia.org/wiki/El_Khabar"] }),
    p({ id: "dz-tsa", countryCode: "DZ", name: "TSA (Tout sur l'Algérie)", founded: 2007, language: "French", headquarters: "Algiers", format: "Digital news portal",
      owner: { name: "TSA", type: "Independent commercial media" },
      editorialStance: "Leading Algerian French-language digital news portal",
      readership: { metric: "Major Algerian news website", source: "https://www.tsa-algerie.com" },
      sources: ["https://www.tsa-algerie.com"] }),
  ],
  ET: [
    p({ id: "et-addis-standard", countryCode: "ET", name: "Addis Standard", founded: 2011, language: "English", headquarters: "Addis Ababa", format: "Digital magazine / news",
      owner: { name: "Jakenn Publishing", type: "Independent commercial media" },
      editorialStance: "Independent Ethiopian general-interest news magazine; politics and current affairs",
      readership: { metric: "Leading Ethiopian English news brand", source: "https://addisstandard.com" },
      sources: ["https://addisstandard.com"] }),
    p({ id: "et-ethiopia-insight", countryCode: "ET", name: "The Ethiopian Herald", founded: 1943, language: "English", headquarters: "Addis Ababa",
      owner: { name: "Ethiopian Press Agency", type: "State media" },
      editorialStance: "State English-language national daily; politics and general news",
      readership: { metric: "Principal state English daily", source: "https://en.wikipedia.org/wiki/The_Ethiopian_Herald" },
      sources: ["https://press.et", "https://en.wikipedia.org/wiki/The_Ethiopian_Herald"] }),
    p({ id: "et-reporter-amharic", countryCode: "ET", name: "Addis Zemen", founded: 1941, language: "Amharic", headquarters: "Addis Ababa",
      owner: { name: "Ethiopian Press Agency", type: "State media" },
      editorialStance: "State Amharic national daily; politics and general news",
      readership: { metric: "Principal state Amharic daily", source: "https://en.wikipedia.org/wiki/Addis_Zemen" },
      sources: ["https://press.et", "https://en.wikipedia.org/wiki/Addis_Zemen"] }),
  ],
  UG: [p({ id: "ug-nile-post", countryCode: "UG", name: "Nile Post", founded: 2018, language: "English", headquarters: "Kampala", format: "Digital news portal",
    owner: { name: "Nile Post", type: "Independent commercial media" },
    editorialStance: "Ugandan digital general-interest news portal; politics and current affairs",
    readership: { metric: "Major Ugandan news website", source: "https://nilepost.co.ug" },
    sources: ["https://nilepost.co.ug"] })],
  ZM: [p({ id: "zm-lusaka-times", countryCode: "ZM", name: "Lusaka Times", founded: 2007, language: "English", headquarters: "Lusaka", format: "Digital news portal",
    owner: { name: "Lusaka Times", type: "Independent commercial media" },
    editorialStance: "Leading Zambian digital general-interest news portal",
    readership: { metric: "Major Zambian news website", source: "https://www.lusakatimes.com" },
    sources: ["https://www.lusakatimes.com"] })],
  BF: [p({ id: "bf-burkina24", countryCode: "BF", name: "Burkina24", founded: 2013, language: "French", headquarters: "Ouagadougou", format: "Digital news portal",
    owner: { name: "Burkina24", type: "Independent commercial media" },
    editorialStance: "Leading Burkinabè digital general-interest news portal",
    readership: { metric: "Major Burkina Faso news website", source: "https://www.burkina24.com" },
    sources: ["https://www.burkina24.com"] })],
  BJ: [p({ id: "bj-banouto", countryCode: "BJ", name: "Banouto", founded: 2015, language: "French", headquarters: "Cotonou", format: "Digital news portal",
    owner: { name: "Banouto", type: "Independent commercial media" },
    editorialStance: "Beninese digital general-interest news portal",
    readership: { metric: "Major Benin news website", source: "https://www.banouto.bj" },
    sources: ["https://www.banouto.bj"] })],
  CI: [p({ id: "ci-abidjan-net", countryCode: "CI", name: "Abidjan.net News", founded: 1998, language: "French", headquarters: "Abidjan", format: "Digital news portal",
    owner: { name: "Abidjan.net", type: "Independent commercial media" },
    editorialStance: "Leading Ivorian digital general-interest news portal",
    readership: { metric: "Major Côte d'Ivoire news website", source: "https://news.abidjan.net" },
    sources: ["https://news.abidjan.net"] })],
  SN: [p({ id: "sn-seneweb", countryCode: "SN", name: "Seneweb", founded: 2001, language: "French", headquarters: "Dakar", format: "Digital news portal",
    owner: { name: "Seneweb", type: "Independent commercial media" },
    editorialStance: "Senegal's leading digital general-interest news portal",
    readership: { metric: "Highest-traffic Senegalese news website", source: "https://www.seneweb.com" },
    sources: ["https://www.seneweb.com"] })],
  CD: [p({ id: "cd-mediacongo", countryCode: "CD", name: "Mediacongo.net", founded: 2005, language: "French", headquarters: "Kinshasa", format: "Digital news portal",
    owner: { name: "Mediacongo", type: "Independent commercial media" },
    editorialStance: "Major Congolese digital general-interest news portal",
    readership: { metric: "Leading DRC news website", source: "https://www.mediacongo.net" },
    sources: ["https://www.mediacongo.net"] })],
  GE: [p({ id: "ge-netgazeti", countryCode: "GE", name: "Netgazeti", founded: 2010, language: "Georgian", headquarters: "Tbilisi", format: "Digital news portal",
    owner: { name: "Netgazeti / Liberali", type: "Independent media" },
    editorialStance: "Independent Georgian digital newsroom; politics and investigation",
    readership: { metric: "Major Georgian news website", source: "https://netgazeti.ge" },
    sources: ["https://netgazeti.ge"] })],
  IQ: [p({ id: "iq-rudaw", countryCode: "IQ", name: "Rudaw", founded: 2013, language: "Kurdish / English / Arabic", headquarters: "Erbil", format: "Digital news portal",
    owner: { name: "Rudaw Media Network", type: "Commercial media" },
    editorialStance: "Major Iraqi Kurdish digital newsroom with national/regional general news",
    readership: { metric: "Leading Iraqi Kurdish news brand", source: "https://en.wikipedia.org/wiki/Rudaw_Media_Network" },
    sources: ["https://www.rudaw.net", "https://en.wikipedia.org/wiki/Rudaw_Media_Network"] })],
  IR: [p({ id: "ir-hamshahri", countryCode: "IR", name: "Hamshahri", founded: 1992, language: "Persian", headquarters: "Tehran",
    owner: { name: "Municipality of Tehran / Hamshahri Institute", type: "Municipal media" },
    editorialStance: "Major Iranian general-interest daily; municipal and national news",
    readership: { metric: "Among Iran's highest-circulation dailies", source: "https://en.wikipedia.org/wiki/Hamshahri" },
    sources: ["https://www.hamshahrionline.ir", "https://en.wikipedia.org/wiki/Hamshahri"] })],
  KW: [p({ id: "kw-arab-times", countryCode: "KW", name: "Arab Times", founded: 1977, language: "English", headquarters: "Kuwait City",
    owner: { name: "Arab Times", type: "Independent commercial media" },
    editorialStance: "Kuwaiti English-language general-interest daily",
    readership: { metric: "Major Kuwaiti English daily", source: "https://en.wikipedia.org/wiki/Arab_Times_(Kuwait)" },
    sources: ["https://www.arabtimesonline.com", "https://en.wikipedia.org/wiki/Arab_Times_(Kuwait)"] })],
  KH: [p({ id: "kh-cambodianess", countryCode: "KH", name: "Cambodianess / Thmey Thmey", founded: 2012, language: "Khmer / English", headquarters: "Phnom Penh", format: "Digital news portal",
    owner: { name: "Thmey Thmey", type: "Independent commercial media" },
    editorialStance: "Leading Cambodian digital general-interest news portal",
    readership: { metric: "Major Cambodian news website", source: "https://thmeythmey.com" },
    sources: ["https://thmeythmey.com"] })],
  MM: [
    p({ id: "mm-eleven-media", countryCode: "MM", name: "Eleven Media", founded: 2000, language: "Burmese / English", headquarters: "Yangon", format: "Digital news portal",
      owner: { name: "Eleven Media Group", type: "Independent commercial media" },
      editorialStance: "Major Myanmar digital newsroom; politics and general news",
      readership: { metric: "Leading Myanmar news brand", source: "https://en.wikipedia.org/wiki/Eleven_Media_Group" },
      sources: ["https://elevenmyanmar.com", "https://en.wikipedia.org/wiki/Eleven_Media_Group"] }),
    p({ id: "mm-democratic-voice", countryCode: "MM", name: "Democratic Voice of Burma (DVB)", founded: 1992, language: "Burmese / English", headquarters: "Oslo / digital", format: "Digital news portal",
      owner: { name: "DVB", type: "Independent media" },
      editorialStance: "Independent Myanmar digital newsroom; politics and current affairs",
      readership: { metric: "Major Myanmar exile/independent news brand", source: "https://en.wikipedia.org/wiki/Democratic_Voice_of_Burma" },
      sources: ["https://www.dvb.no", "https://en.wikipedia.org/wiki/Democratic_Voice_of_Burma"] }),
  ],
  ME: [
    p({ id: "me-cdm", countryCode: "ME", name: "CdM (Cafe del Montenegro)", founded: 2010, language: "Montenegrin", headquarters: "Podgorica", format: "Digital news portal",
      owner: { name: "CdM", type: "Independent commercial media" },
      editorialStance: "Leading Montenegrin digital general-interest news portal",
      readership: { metric: "Major Montenegrin news website", source: "https://www.cdm.me" },
      sources: ["https://www.cdm.me"] }),
    p({ id: "me-rtcng-news", countryCode: "ME", name: "Portal Analitika", founded: 2010, language: "Montenegrin", headquarters: "Podgorica", format: "Digital news portal",
      owner: { name: "Analitika", type: "Independent commercial media" },
      editorialStance: "Montenegrin digital news portal; politics and current affairs",
      readership: { metric: "Established Montenegrin news website", source: "https://www.analitika.me" },
      sources: ["https://www.analitika.me"] }),
  ],
  MK: [
    p({ id: "mk-sloboden-pecat", countryCode: "MK", name: "Sloboden Pečat", founded: 2013, language: "Macedonian", headquarters: "Skopje",
      owner: { name: "Sloboden Pečat", type: "Independent commercial media" },
      editorialStance: "Major Macedonian general-interest daily",
      readership: { metric: "Leading Macedonian daily", source: "https://en.wikipedia.org/wiki/Sloboden_Pečat" },
      sources: ["https://www.slobodenpecat.mk", "https://en.wikipedia.org/wiki/Sloboden_Pečat"] }),
    p({ id: "mk-sakam-da-kazam", countryCode: "MK", name: "Sakam da kažam (SDK.mk)", founded: 2014, language: "Macedonian", headquarters: "Skopje", format: "Digital news portal",
      owner: { name: "SDK", type: "Independent media" },
      editorialStance: "Leading Macedonian digital news portal; politics and investigation",
      readership: { metric: "Major Macedonian news website", source: "https://sdk.mk" },
      sources: ["https://sdk.mk"] }),
  ],
  VE: [
    p({ id: "ve-talcual", countryCode: "VE", name: "Tal Cual", founded: 2000, language: "Spanish", headquarters: "Caracas",
      owner: { name: "Tal Cual", type: "Independent commercial media" },
      editorialStance: "Independent Venezuelan general-interest newspaper; politics and investigation",
      readership: { metric: "Notable Venezuelan independent daily", source: "https://en.wikipedia.org/wiki/Tal_Cual" },
      sources: ["https://talcualdigital.com", "https://en.wikipedia.org/wiki/Tal_Cual"] }),
    p({ id: "ve-efectococuyo", countryCode: "VE", name: "Efecto Cocuyo", founded: 2015, language: "Spanish", headquarters: "Caracas", format: "Digital news portal",
      owner: { name: "Efecto Cocuyo", type: "Independent media" },
      editorialStance: "Independent Venezuelan digital newsroom; politics and investigation",
      readership: { metric: "Major Venezuelan digital news brand", source: "https://efectococuyo.com" },
      sources: ["https://efectococuyo.com"] }),
  ],
  CU: [
    p({ id: "cu-granma", countryCode: "CU", name: "Granma", founded: 1965, language: "Spanish", headquarters: "Havana",
      owner: { name: "Communist Party of Cuba", type: "State / party media" },
      editorialStance: "Official newspaper of the Communist Party of Cuba; national politics and general news",
      readership: { metric: "Cuba's principal national daily", source: "https://en.wikipedia.org/wiki/Granma_(newspaper)" },
      sources: ["https://www.granma.cu", "https://en.wikipedia.org/wiki/Granma_(newspaper)"] }),
    p({ id: "cu-14ymedio", countryCode: "CU", name: "14ymedio", founded: 2014, language: "Spanish", headquarters: "Havana / digital", format: "Digital news portal",
      owner: { name: "14ymedio / Yoani Sánchez", type: "Independent media" },
      editorialStance: "Independent Cuban digital newsroom; politics and society",
      readership: { metric: "Leading independent Cuban news site", source: "https://en.wikipedia.org/wiki/14ymedio" },
      sources: ["https://www.14ymedio.com", "https://en.wikipedia.org/wiki/14ymedio"] }),
  ],
  AD: [p({ id: "ad-ara-andorra", countryCode: "AD", name: "Ara Andorra", founded: 2010, language: "Catalan", headquarters: "Andorra la Vella", format: "Digital news portal",
    owner: { name: "Ara Andorra", type: "Independent commercial media" },
    editorialStance: "Andorran digital general-interest news portal",
    readership: { metric: "Andorran digital news brand", source: "https://www.ara.ad" },
    sources: ["https://www.ara.ad"] })],
};

function main() {
  const src = readFileSync(DATA_PATH, "utf8");
  const data = loadConst(src, "export const NATIONAL_NEWSPAPERS");
  let touched = 0;

  for (const [cc, op] of Object.entries(OPS)) {
    let list = [...(data[cc] || [])];
    const before = list.map((x) => x.id).join(",");
    if (op.remove) list = list.filter((x) => !op.remove.includes(x.id));
    const have = new Set(list.map((x) => x.id));
    for (const paper of op.add || []) {
      if (have.has(paper.id)) continue;
      if (list.length >= 5) break;
      list.push(paper);
      have.add(paper.id);
    }
    if (list.length > 5) list = list.slice(0, 5);
    data[cc] = list;
    const after = list.map((x) => x.id).join(",");
    if (before !== after) {
      touched++;
      console.log(`${cc}: ${before} → ${after}`);
    }
  }

  for (const [cc, adds] of Object.entries(FILL_MAP)) {
    if (!adds) continue;
    let list = [...(data[cc] || [])];
    const before = list.map((x) => x.id).join(",");
    const have = new Set(list.map((x) => x.id));
    for (const paper of adds) {
      if (!paper || !paper.id) continue;
      if (have.has(paper.id)) continue;
      if (list.length >= 5) break;
      list.push(paper);
      have.add(paper.id);
    }
    data[cc] = list;
    const after = list.map((x) => x.id).join(",");
    if (before !== after) {
      touched++;
      console.log(`${cc}: ${before} → ${after}`);
    }
  }

  // Drop Addis Fortune (business) from ET if still present after fills
  if (data.ET) {
    data.ET = data.ET.filter((x) => x.id !== "et-addis-fortune");
    // Ensure 5
    // already added 3; had 2 including fortune → after remove may be 4
  }

  const header = `import type { Newspaper } from "../types/newspaper";

/**
 * Curated and sourced dataset of top national newspapers for Learn mode.
 *
 * Selection rule (owner 2026-09): up to five general-interest titles per country,
 * prioritising largest audience and highest reputation. Business/finance-only
 * papers and mass-market tabloids are excluded when a stronger broad-news
 * alternative exists. Logo XOR noImageReason on every entry.
 */

export const NATIONAL_NEWSPAPERS: Record<string, Newspaper[]> = `;
  writeFileSync(DATA_PATH, header + JSON.stringify(data, null, 2) + ";\n");

  const dist = {};
  let under = 0;
  for (const list of Object.values(data)) {
    dist[list.length] = (dist[list.length] || 0) + 1;
    if (list.length < 5) under++;
  }
  console.log(`Touched ${touched} countries. Dist:`, dist, "under5:", under);
}

main();

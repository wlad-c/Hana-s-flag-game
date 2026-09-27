#!/usr/bin/env node
/**
 * Apply curated top-5 general-interest newspaper lists.
 *
 * Policy (owner 2026-09): exactly five newspapers per country where possible,
 * prioritising largest audience + highest reputation, broad news coverage.
 * Exclude business/finance-only titles and mass-market tabloids / niche satirical
 * outlets when a stronger general-interest alternative exists.
 *
 * Usage: node scripts/apply-newspaper-top5.mjs
 * Writes src/data/nationalNewspapers.ts in place.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "nationalNewspapers.ts");

const NO_IMAGE =
  "No verified masthead image is available in the app for this newspaper yet, so it is listed without one rather than with an invented logo.";

function loadConst(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Could not locate ${marker}`);
  const eq = src.indexOf("= {", start);
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  return Function(`"use strict"; return (${src.slice(open, i)});`)();
}

function paper(p) {
  return {
    ...p,
    noImageReason: p.logo ? undefined : (p.noImageReason || NO_IMAGE),
  };
}

/** New general-interest entries to insert (id → full record). */
const ADD = {
  "us-los-angeles-times": paper({
    id: "us-los-angeles-times",
    countryCode: "US",
    name: "Los Angeles Times",
    englishTranslation: "Los Angeles Times",
    founded: 1881,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "El Segundo, California",
    owner: { name: "Nant Capital / Patrick Soon-Shiong", type: "Independent commercial media" },
    editorialStance: "Major West Coast newspaper of record; national politics, California affairs, investigative reporting, and cultural coverage",
    readership: {
      metric: "One of the largest-circulation metropolitan dailies in the United States",
      source: "https://en.wikipedia.org/wiki/Los_Angeles_Times",
    },
    revenueModel: "Subscriptions, digital advertising, and print retail sales",
    sources: ["https://www.latimes.com", "https://en.wikipedia.org/wiki/Los_Angeles_Times"],
  }),
  "us-chicago-tribune": paper({
    id: "us-chicago-tribune",
    countryCode: "US",
    name: "Chicago Tribune",
    englishTranslation: "Chicago Tribune",
    founded: 1847,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Chicago, Illinois",
    owner: { name: "Tribune Publishing (Alden Global Capital)", type: "Commercial media group" },
    editorialStance: "Historic Midwest newspaper of record; national and Chicago politics, investigative journalism, and regional affairs",
    readership: {
      metric: "Leading Midwest metropolitan daily by long-run audience and institutional reputation",
      source: "https://en.wikipedia.org/wiki/Chicago_Tribune",
    },
    revenueModel: "Subscriptions, advertising, and digital memberships",
    sources: ["https://www.chicagotribune.com", "https://en.wikipedia.org/wiki/Chicago_Tribune"],
  }),
  "gb-the-independent": paper({
    id: "gb-the-independent",
    countryCode: "GB",
    name: "The Independent",
    englishTranslation: "The Independent",
    founded: 1986,
    frequency: "Daily digital newspaper",
    format: "Digital-first national daily",
    language: "English",
    headquarters: "London",
    owner: { name: "Independent Digital News & Media / Sultan Muhammad Abuljadayel & others", type: "Independent commercial media" },
    editorialStance: "Centrist-liberal national daily; politics, international affairs, and investigative reporting (print edition ended 2016; digital continues)",
    readership: {
      metric: "Among the United Kingdom's most-read digital national news brands",
      source: "https://en.wikipedia.org/wiki/The_Independent",
    },
    revenueModel: "Digital subscriptions, advertising, and memberships",
    sources: ["https://www.independent.co.uk", "https://en.wikipedia.org/wiki/The_Independent"],
  }),
  "au-guardian-australia": paper({
    id: "au-guardian-australia",
    countryCode: "AU",
    name: "Guardian Australia",
    englishTranslation: "Guardian Australia",
    founded: 2013,
    frequency: "Continuous digital news",
    format: "Digital newsroom",
    language: "English",
    headquarters: "Sydney",
    owner: { name: "Guardian Media Group", type: "Scott Trust-owned media" },
    editorialStance: "Progressive quality journalism; federal politics, climate, Indigenous affairs, and investigative reporting for an Australian audience",
    readership: {
      metric: "One of Australia's most-visited quality digital news sites",
      source: "https://en.wikipedia.org/wiki/Guardian_Australia",
    },
    revenueModel: "Reader contributions, digital advertising, and philanthropic funding",
    sources: ["https://www.theguardian.com/australia-news", "https://en.wikipedia.org/wiki/Guardian_Australia"],
  }),
  "au-courier-mail": paper({
    id: "au-courier-mail",
    countryCode: "AU",
    name: "The Courier-Mail",
    englishTranslation: "The Courier-Mail",
    founded: 1933,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "English",
    headquarters: "Brisbane, Queensland",
    owner: { name: "News Corp Australia", type: "Commercial media group" },
    editorialStance: "Queensland's principal general-interest daily; state and federal politics, news, and sports (mass-market format, broad news remit)",
    readership: {
      metric: "Highest-readership daily newspaper in Queensland",
      source: "https://en.wikipedia.org/wiki/The_Courier-Mail",
    },
    revenueModel: "Print sales, subscriptions, and advertising",
    sources: ["https://www.couriermail.com.au", "https://en.wikipedia.org/wiki/The_Courier-Mail"],
  }),
  "de-taz": paper({
    id: "de-taz",
    countryCode: "DE",
    name: "die tageszeitung (taz)",
    englishTranslation: "the daily newspaper",
    founded: 1978,
    frequency: "Daily newspaper",
    format: "Berliner & digital",
    language: "German",
    headquarters: "Berlin",
    owner: { name: "taz, die tageszeitung Verlagsgenossenschaft eG", type: "Reader cooperative" },
    editorialStance: "Left-liberal cooperative daily; politics, environment, culture, and investigative reporting with national reach",
    readership: {
      metric: "Major national quality daily alongside FAZ and Süddeutsche Zeitung",
      source: "https://en.wikipedia.org/wiki/Die_Tageszeitung",
    },
    revenueModel: "Cooperative memberships, subscriptions, and advertising",
    sources: ["https://taz.de", "https://en.wikipedia.org/wiki/Die_Tageszeitung"],
  }),
  "de-tagesspiegel": paper({
    id: "de-tagesspiegel",
    countryCode: "DE",
    name: "Der Tagesspiegel",
    englishTranslation: "The Daily Mirror",
    founded: 1945,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "German",
    headquarters: "Berlin",
    owner: { name: "Verlag Der Tagesspiegel GmbH (DVH Media)", type: "Commercial media" },
    editorialStance: "Berlin-based liberal quality daily; federal politics, capital affairs, culture, and investigative reporting",
    readership: {
      metric: "Leading Berlin quality daily with national political influence",
      source: "https://en.wikipedia.org/wiki/Der_Tagesspiegel",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.tagesspiegel.de", "https://en.wikipedia.org/wiki/Der_Tagesspiegel"],
  }),
  "fr-le-parisien": paper({
    id: "fr-le-parisien",
    countryCode: "FR",
    name: "Le Parisien",
    englishTranslation: "The Parisian",
    founded: 1944,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "French",
    headquarters: "Paris",
    owner: { name: "LVMH / Les Échos-Le Parisien group", type: "Commercial media group" },
    editorialStance: "Mass-circulation general-interest daily (Île-de-France and national editions); politics, society, sports, and local news — not a finance specialty title",
    readership: {
      metric: "Among France's highest-circulation paid dailies",
      source: "https://en.wikipedia.org/wiki/Le_Parisien",
    },
    revenueModel: "Print sales, subscriptions, and advertising",
    sources: ["https://www.leparisien.fr", "https://en.wikipedia.org/wiki/Le_Parisien"],
  }),
  "br-correio-braziliense": paper({
    id: "br-correio-braziliense",
    countryCode: "BR",
    name: "Correio Braziliense",
    englishTranslation: "Brazilian Mail",
    founded: 1960,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Portuguese",
    headquarters: "Brasília",
    owner: { name: "Diários Associados", type: "Commercial media group" },
    editorialStance: "Federal-capital newspaper of record; national politics, public administration, and general news from Brasília",
    readership: {
      metric: "Principal general-interest daily of Brazil's federal capital",
      source: "https://en.wikipedia.org/wiki/Correio_Braziliense",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.correiobraziliense.com.br", "https://en.wikipedia.org/wiki/Correio_Braziliense"],
  }),
  "jp-mainichi-shimbun": paper({
    id: "jp-mainichi-shimbun",
    countryCode: "JP",
    name: "The Mainichi Shimbun",
    englishTranslation: "Daily Newspaper",
    founded: 1872,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Japanese",
    headquarters: "Tokyo",
    owner: { name: "The Mainichi Newspapers Co., Ltd.", type: "Independent commercial media" },
    editorialStance: "One of Japan's three major national dailies; centrist general news, politics, and international affairs",
    readership: {
      metric: "Among Japan's largest national general-interest dailies by circulation",
      source: "https://en.wikipedia.org/wiki/Mainichi_Shimbun",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://mainichi.jp", "https://en.wikipedia.org/wiki/Mainichi_Shimbun"],
  }),
  "jp-sankei-shimbun": paper({
    id: "jp-sankei-shimbun",
    countryCode: "JP",
    name: "The Sankei Shimbun",
    englishTranslation: "Industrial and Economic Newspaper",
    founded: 1933,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Japanese",
    headquarters: "Tokyo",
    owner: { name: "Sankei Shimbun Co., Ltd. (Fuji Sankei Communications Group)", type: "Commercial media group" },
    editorialStance: "National conservative general-interest daily; politics, society, and international affairs (despite historic name, not a finance-only paper)",
    readership: {
      metric: "One of Japan's five major national dailies",
      source: "https://en.wikipedia.org/wiki/Sankei_Shimbun",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.sankei.com", "https://en.wikipedia.org/wiki/Sankei_Shimbun"],
  }),
  "in-hindustan-times": paper({
    id: "in-hindustan-times",
    countryCode: "IN",
    name: "Hindustan Times",
    englishTranslation: "Hindustan Times",
    founded: 1924,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "New Delhi",
    owner: { name: "HT Media (Birla family)", type: "Commercial media group" },
    editorialStance: "Major English-language national daily; politics, national affairs, and general news centred on North India and Delhi",
    readership: {
      metric: "Among India's largest English-language dailies by readership",
      source: "https://en.wikipedia.org/wiki/Hindustan_Times",
    },
    revenueModel: "Advertising, subscriptions, and print sales",
    sources: ["https://www.hindustantimes.com", "https://en.wikipedia.org/wiki/Hindustan_Times"],
  }),
  "in-dainik-bhaskar": paper({
    id: "in-dainik-bhaskar",
    countryCode: "IN",
    name: "Dainik Bhaskar",
    englishTranslation: "Daily Sun",
    founded: 1958,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Hindi",
    headquarters: "Bhopal, Madhya Pradesh",
    owner: { name: "DB Corp Ltd", type: "Commercial media group" },
    editorialStance: "India's largest Hindi-language general-interest daily group; politics, local and national news across multiple state editions",
    readership: {
      metric: "Highest-readership Hindi newspaper group in India (IRS / publisher figures)",
      source: "https://en.wikipedia.org/wiki/Dainik_Bhaskar",
    },
    revenueModel: "Advertising and print sales",
    sources: ["https://www.bhaskar.com", "https://en.wikipedia.org/wiki/Dainik_Bhaskar"],
  }),
  "it-la-stampa": paper({
    id: "it-la-stampa",
    countryCode: "IT",
    name: "La Stampa",
    englishTranslation: "The Press",
    founded: 1867,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Italian",
    headquarters: "Turin",
    owner: { name: "GEDI Gruppo Editoriale", type: "Commercial media group" },
    editorialStance: "Historic national quality daily from Turin; politics, culture, and international affairs",
    readership: {
      metric: "Among Italy's leading national general-interest dailies",
      source: "https://en.wikipedia.org/wiki/La_Stampa",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.lastampa.it", "https://en.wikipedia.org/wiki/La_Stampa"],
  }),
  "it-il-fatto-quotidiano": paper({
    id: "it-il-fatto-quotidiano",
    countryCode: "IT",
    name: "Il Fatto Quotidiano",
    englishTranslation: "The Daily Fact",
    founded: 2009,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Italian",
    headquarters: "Rome",
    owner: { name: "Editoriale Il Fatto S.p.A.", type: "Independent commercial media" },
    editorialStance: "Independent investigative daily; politics, justice, and accountability reporting with national reach",
    readership: {
      metric: "Major national daily by paid circulation and digital audience",
      source: "https://en.wikipedia.org/wiki/Il_Fatto_Quotidiano",
    },
    revenueModel: "Subscriptions, print sales, and crowdfunding-style memberships",
    sources: ["https://www.ilfattoquotidiano.it", "https://en.wikipedia.org/wiki/Il_Fatto_Quotidiano"],
  }),
  "mx-milenio": paper({
    id: "mx-milenio",
    countryCode: "MX",
    name: "Milenio",
    englishTranslation: "Millennium",
    founded: 2000,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Spanish",
    headquarters: "Mexico City",
    owner: { name: "Grupo Multimedios", type: "Commercial media group" },
    editorialStance: "National general-interest daily; politics, security, and investigative reporting",
    readership: {
      metric: "Among Mexico's leading national dailies by circulation and digital reach",
      source: "https://en.wikipedia.org/wiki/Milenio",
    },
    revenueModel: "Advertising, print sales, and digital subscriptions",
    sources: ["https://www.milenio.com", "https://en.wikipedia.org/wiki/Milenio"],
  }),
  "mx-excelsior": paper({
    id: "mx-excelsior",
    countryCode: "MX",
    name: "Excélsior",
    englishTranslation: "Excelsior",
    founded: 1917,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Spanish",
    headquarters: "Mexico City",
    owner: { name: "Grupo Imagen", type: "Commercial media group" },
    editorialStance: "Historic Mexican newspaper of record; national politics and general news",
    readership: {
      metric: "Long-standing national general-interest daily",
      source: "https://en.wikipedia.org/wiki/Excélsior",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.excelsior.com.mx", "https://en.wikipedia.org/wiki/Excélsior"],
  }),
  "fi-aamulehti": paper({
    id: "fi-aamulehti",
    countryCode: "FI",
    name: "Aamulehti",
    englishTranslation: "Morning Newspaper",
    founded: 1881,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Finnish",
    headquarters: "Tampere",
    owner: { name: "Sanoma Media Finland", type: "Commercial media group" },
    editorialStance: "Finland's second-largest subscription daily; general news, politics, and regional Pirkanmaa coverage with national reach",
    readership: {
      metric: "Second-largest Finnish daily by circulation after Helsingin Sanomat",
      source: "https://en.wikipedia.org/wiki/Aamulehti",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.aamulehti.fi", "https://en.wikipedia.org/wiki/Aamulehti"],
  }),
  "za-daily-maverick": paper({
    id: "za-daily-maverick",
    countryCode: "ZA",
    name: "Daily Maverick",
    englishTranslation: "Daily Maverick",
    founded: 2009,
    frequency: "Continuous digital news",
    format: "Digital newsroom",
    language: "English",
    headquarters: "Cape Town",
    owner: { name: "Style Magazine South Africa / Independent", type: "Independent commercial media" },
    editorialStance: "Independent investigative and analytical newsroom; national politics, accountability, and general South African affairs",
    readership: {
      metric: "Among South Africa's most-read independent digital news brands",
      source: "https://en.wikipedia.org/wiki/Daily_Maverick",
    },
    revenueModel: "Memberships, donations, and digital advertising",
    sources: ["https://www.dailymaverick.co.za", "https://en.wikipedia.org/wiki/Daily_Maverick"],
  }),
  "za-the-star": paper({
    id: "za-the-star",
    countryCode: "ZA",
    name: "The Star",
    englishTranslation: "The Star",
    founded: 1887,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Johannesburg",
    owner: { name: "Independent Media (South Africa)", type: "Commercial media group" },
    editorialStance: "Johannesburg's historic general-interest daily; national and Gauteng news",
    readership: {
      metric: "Major Gauteng metropolitan daily",
      source: "https://en.wikipedia.org/wiki/The_Star_(South_Africa)",
    },
    revenueModel: "Print sales and advertising",
    sources: ["https://www.iol.co.za/the-star", "https://en.wikipedia.org/wiki/The_Star_(South_Africa)"],
  }),
  "pl-gazeta-polska-codziennie": paper({
    id: "pl-gazeta-polska-codziennie",
    countryCode: "PL",
    name: "Gazeta Polska Codziennie",
    englishTranslation: "Polish Gazette Daily",
    founded: 2011,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Polish",
    headquarters: "Warsaw",
    owner: { name: "Forum S.A. / related Gazeta Polska group", type: "Independent commercial media" },
    editorialStance: "National conservative general-interest daily; politics and current affairs",
    readership: {
      metric: "National paid daily with significant political readership",
      source: "https://en.wikipedia.org/wiki/Gazeta_Polska_Codziennie",
    },
    revenueModel: "Print sales, subscriptions, and advertising",
    sources: ["https://gpcodziennie.pl", "https://en.wikipedia.org/wiki/Gazeta_Polska_Codziennie"],
  }),
  "pl-super-express": paper({
    id: "pl-super-express",
    countryCode: "PL",
    name: "Dziennik Polska / Polska Times network",
    englishTranslation: "Poland Daily (Polska Times)",
    founded: 2007,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Polish",
    headquarters: "Warsaw",
    owner: { name: "Polska Press", type: "Commercial media group" },
    editorialStance: "National/regional general-interest daily network (Polska Times titles); politics, local and national news — used here as the mainstream non-tabloid mass daily alternative to Fakt",
    readership: {
      metric: "Large combined regional daily network under Polska Press",
      source: "https://en.wikipedia.org/wiki/Polska_Times",
    },
    revenueModel: "Print sales and advertising",
    sources: ["https://polskatimes.pl", "https://en.wikipedia.org/wiki/Polska_Times"],
  }),
  "se-goteborgs-posten": paper({
    id: "se-goteborgs-posten",
    countryCode: "SE",
    name: "Göteborgs-Posten",
    englishTranslation: "Gothenburg Post",
    founded: 1813,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Swedish",
    headquarters: "Gothenburg",
    owner: { name: "Stampen Media", type: "Commercial media group" },
    editorialStance: "West Sweden's leading quality daily; national politics and general news with Gothenburg focus",
    readership: {
      metric: "Among Sweden's largest subscription morning papers",
      source: "https://en.wikipedia.org/wiki/Göteborgs-Posten",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.gp.se", "https://en.wikipedia.org/wiki/Göteborgs-Posten"],
  }),
  "se-sydsvenskan": paper({
    id: "se-sydsvenskan",
    countryCode: "SE",
    name: "Sydsvenskan",
    englishTranslation: "South Swedish",
    founded: 1870,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Swedish",
    headquarters: "Malmö",
    owner: { name: "Bonnier News Local", type: "Commercial media group" },
    editorialStance: "Southern Sweden's principal quality daily; national and Öresund-region news",
    readership: {
      metric: "Leading Skåne morning daily",
      source: "https://en.wikipedia.org/wiki/Sydsvenskan",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.sydsvenskan.se", "https://en.wikipedia.org/wiki/Sydsvenskan"],
  }),
  "nz-the-post": paper({
    id: "nz-the-post",
    countryCode: "NZ",
    name: "The Post",
    englishTranslation: "The Post",
    founded: 1865,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Wellington",
    owner: { name: "Stuff Ltd", type: "Commercial media" },
    editorialStance: "Wellington's newspaper of record (formerly The Dominion Post); national politics and general news — replaces the TVNZ 1News broadcaster entry",
    readership: {
      metric: "Capital-city daily with national political audience",
      source: "https://en.wikipedia.org/wiki/The_Post_(New_Zealand_newspaper)",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.thepost.co.nz", "https://en.wikipedia.org/wiki/The_Post_(New_Zealand_newspaper)"],
  }),
  "nz-the-press": paper({
    id: "nz-the-press",
    countryCode: "NZ",
    name: "The Press",
    englishTranslation: "The Press",
    founded: 1861,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Christchurch",
    owner: { name: "Stuff Ltd", type: "Commercial media" },
    editorialStance: "South Island's leading general-interest daily; national and Canterbury news",
    readership: {
      metric: "Principal daily newspaper of Christchurch and Canterbury",
      source: "https://en.wikipedia.org/wiki/The_Press",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.thepress.co.nz", "https://en.wikipedia.org/wiki/The_Press"],
  }),
  "ie-irish-examiner": paper({
    id: "ie-irish-examiner",
    countryCode: "IE",
    name: "Irish Examiner",
    englishTranslation: "Irish Examiner",
    founded: 1841,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Cork",
    owner: { name: "The Irish Times DAC", type: "Commercial media" },
    editorialStance: "National daily from Cork; politics, general news, and Munster affairs",
    readership: {
      metric: "One of Ireland's four national daily broadsheets",
      source: "https://en.wikipedia.org/wiki/Irish_Examiner",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.irishexaminer.com", "https://en.wikipedia.org/wiki/Irish_Examiner"],
  }),
  "ca-toronto-star": paper({
    id: "ca-toronto-star",
    countryCode: "CA",
    name: "Toronto Star",
    englishTranslation: "Toronto Star",
    founded: 1892,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Toronto, Ontario",
    owner: { name: "Torstar Corporation", type: "Commercial media" },
    editorialStance: "Canada's highest-circulation daily; progressive general-interest coverage of national and Ontario affairs",
    readership: {
      metric: "Highest-circulation newspaper in Canada",
      source: "https://en.wikipedia.org/wiki/Toronto_Star",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.thestar.com", "https://en.wikipedia.org/wiki/Toronto_Star"],
  }),
  "es-el-periodico": paper({
    id: "es-el-periodico",
    countryCode: "ES",
    name: "El Periódico de Catalunya",
    englishTranslation: "The Newspaper of Catalonia",
    founded: 1978,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Spanish / Catalan",
    headquarters: "Barcelona",
    owner: { name: "Prensa Ibérica", type: "Commercial media group" },
    editorialStance: "Major Catalonia-based general-interest daily with national editions; politics and society",
    readership: {
      metric: "Among Spain's leading regional-national dailies",
      source: "https://en.wikipedia.org/wiki/El_Periódico_de_Catalunya",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.elperiodico.com", "https://en.wikipedia.org/wiki/El_Periódico_de_Catalunya"],
  }),
  "ar-infobae": paper({
    id: "ar-infobae",
    countryCode: "AR",
    name: "Infobae",
    englishTranslation: "Infobae",
    founded: 2002,
    frequency: "Continuous digital news",
    format: "Digital newsroom",
    language: "Spanish",
    headquarters: "Buenos Aires",
    owner: { name: "Infobae / Daniel Hadad", type: "Independent commercial media" },
    editorialStance: "Argentina's most-visited digital news brand; politics, general news, and international coverage",
    readership: {
      metric: "Highest-traffic Argentine digital news site",
      source: "https://en.wikipedia.org/wiki/Infobae",
    },
    revenueModel: "Digital advertising and branded content",
    sources: ["https://www.infobae.com", "https://en.wikipedia.org/wiki/Infobae"],
  }),
  "ar-perfil": paper({
    id: "ar-perfil",
    countryCode: "AR",
    name: "Perfil",
    englishTranslation: "Profile",
    founded: 1998,
    frequency: "Weekly print / continuous digital",
    format: "News magazine & digital daily",
    language: "Spanish",
    headquarters: "Buenos Aires",
    owner: { name: "Editorial Perfil", type: "Independent commercial media" },
    editorialStance: "Independent investigative general-interest news brand; politics and accountability reporting",
    readership: {
      metric: "Major Argentine investigative news brand",
      source: "https://en.wikipedia.org/wiki/Perfil",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.perfil.com", "https://en.wikipedia.org/wiki/Perfil"],
  }),
  "nl-algemeen-dagblad": paper({
    id: "nl-algemeen-dagblad",
    countryCode: "NL",
    name: "Algemeen Dagblad",
    englishTranslation: "General Daily Newspaper",
    founded: 1946,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Dutch",
    headquarters: "Rotterdam",
    owner: { name: "DPG Media", type: "Commercial media group" },
    editorialStance: "National popular general-interest daily; news, sports, and politics",
    readership: {
      metric: "Among the Netherlands' highest-circulation dailies",
      source: "https://en.wikipedia.org/wiki/Algemeen_Dagblad",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.ad.nl", "https://en.wikipedia.org/wiki/Algemeen_Dagblad"],
  }),
  "nl-trouw": paper({
    id: "nl-trouw",
    countryCode: "NL",
    name: "Trouw",
    englishTranslation: "Fidelity / Loyalty",
    founded: 1943,
    frequency: "Daily newspaper",
    format: "Compact & digital",
    language: "Dutch",
    headquarters: "Amsterdam",
    owner: { name: "DPG Media", type: "Commercial media group" },
    editorialStance: "Quality daily with Protestant roots; in-depth politics, ethics, and general news",
    readership: {
      metric: "Major Dutch quality subscription daily",
      source: "https://en.wikipedia.org/wiki/Trouw",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.trouw.nl", "https://en.wikipedia.org/wiki/Trouw"],
  }),
  "at-der-standard": paper({
    id: "at-der-standard",
    countryCode: "AT",
    name: "Der Standard",
    englishTranslation: "The Standard",
    founded: 1988,
    frequency: "Daily newspaper",
    format: "Compact & digital",
    language: "German",
    headquarters: "Vienna",
    owner: { name: "Standard Verlagsgesellschaft", type: "Independent commercial media" },
    editorialStance: "Liberal quality daily; politics, economy-as-news, culture, and investigative reporting",
    readership: {
      metric: "Leading Austrian quality daily by digital reach",
      source: "https://en.wikipedia.org/wiki/Der_Standard",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.derstandard.at", "https://en.wikipedia.org/wiki/Der_Standard"],
  }),
  "at-salzburger-nachrichten": paper({
    id: "at-salzburger-nachrichten",
    countryCode: "AT",
    name: "Salzburger Nachrichten",
    englishTranslation: "Salzburg News",
    founded: 1945,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "German",
    headquarters: "Salzburg",
    owner: { name: "Salzburger Nachrichten Verlagsgesellschaft", type: "Independent commercial media" },
    editorialStance: "Independent quality daily; national politics and Salzburg regional news with strong reputation",
    readership: {
      metric: "Major Austrian quality regional-national daily",
      source: "https://en.wikipedia.org/wiki/Salzburger_Nachrichten",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.sn.at", "https://en.wikipedia.org/wiki/Salzburger_Nachrichten"],
  }),
  "be-de-standaard": paper({
    id: "be-de-standaard",
    countryCode: "BE",
    name: "De Standaard",
    englishTranslation: "The Standard",
    founded: 1918,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Dutch",
    headquarters: "Groot-Bijgaarden (near Brussels)",
    owner: { name: "Mediahuis", type: "Commercial media group" },
    editorialStance: "Flanders' quality newspaper of record; politics, culture, and investigative reporting",
    readership: {
      metric: "Leading Flemish quality daily",
      source: "https://en.wikipedia.org/wiki/De_Standaard",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.standaard.be", "https://en.wikipedia.org/wiki/De_Standaard"],
  }),
  "be-het-nieuwsblad": paper({
    id: "be-het-nieuwsblad",
    countryCode: "BE",
    name: "Het Nieuwsblad",
    englishTranslation: "The Newspaper",
    founded: 1929,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Dutch",
    headquarters: "Groot-Bijgaarden",
    owner: { name: "Mediahuis", type: "Commercial media group" },
    editorialStance: "Flanders' highest-circulation general-interest daily; news, sports, and politics",
    readership: {
      metric: "Among Belgium's highest-circulation dailies",
      source: "https://en.wikipedia.org/wiki/Het_Nieuwsblad",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://www.nieuwsblad.be", "https://en.wikipedia.org/wiki/Het_Nieuwsblad"],
  }),
  "ch-blick": paper({
    id: "ch-blick",
    countryCode: "CH",
    name: "24 heures",
    englishTranslation: "24 Hours",
    founded: 1762,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "French",
    headquarters: "Lausanne",
    owner: { name: "Tamedia / TX Group", type: "Commercial media group" },
    editorialStance: "Leading French-speaking Swiss general-interest daily for Vaud/Romandie; politics and regional news (chosen over mass tabloid Blick)",
    readership: {
      metric: "Principal paid daily of French-speaking Vaud",
      source: "https://en.wikipedia.org/wiki/24_heures_(Switzerland)",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.24heures.ch", "https://en.wikipedia.org/wiki/24_heures_(Switzerland)"],
  }),
  "pt-expresso": paper({
    id: "pt-expresso",
    countryCode: "PT",
    name: "Expresso",
    englishTranslation: "Express",
    founded: 1973,
    frequency: "Weekly newspaper",
    format: "Broadsheet & digital",
    language: "Portuguese",
    headquarters: "Lisbon",
    owner: { name: "Impresa", type: "Commercial media group" },
    editorialStance: "Portugal's leading quality weekly; politics, investigation, and general affairs with daily digital newsroom",
    readership: {
      metric: "Highest-circulation Portuguese quality weekly",
      source: "https://en.wikipedia.org/wiki/Expresso_(newspaper)",
    },
    revenueModel: "Subscriptions, print sales, and advertising",
    sources: ["https://expresso.pt", "https://en.wikipedia.org/wiki/Expresso_(newspaper)"],
  }),
  "kr-kyunghyang": paper({
    id: "kr-kyunghyang",
    countryCode: "KR",
    name: "The Kyunghyang Shinmun",
    englishTranslation: "Kyunghyang Newspaper",
    founded: 1946,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Korean",
    headquarters: "Seoul",
    owner: { name: "Kyunghyang Shinmun Co.", type: "Independent commercial media" },
    editorialStance: "Centrist-to-progressive national daily; politics and general news",
    readership: {
      metric: "Major national general-interest daily",
      source: "https://en.wikipedia.org/wiki/Kyunghyang_Shinmun",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.khan.co.kr", "https://en.wikipedia.org/wiki/Kyunghyang_Shinmun"],
  }),
  "cn-china-daily": paper({
    id: "cn-china-daily",
    countryCode: "CN",
    name: "China Daily",
    englishTranslation: "China Daily",
    founded: 1981,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Beijing",
    owner: { name: "China Daily Group (state-owned)", type: "State media" },
    editorialStance: "China's principal English-language national daily; politics, society, and international affairs",
    readership: {
      metric: "Largest English-language newspaper in China",
      source: "https://en.wikipedia.org/wiki/China_Daily",
    },
    revenueModel: "State support, advertising, and subscriptions",
    sources: ["https://www.chinadaily.com.cn", "https://en.wikipedia.org/wiki/China_Daily"],
  }),
  "cn-guangming-daily": paper({
    id: "cn-guangming-daily",
    countryCode: "CN",
    name: "Guangming Daily",
    englishTranslation: "Guangming Daily",
    founded: 1949,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Chinese",
    headquarters: "Beijing",
    owner: { name: "Chinese Communist Party (propaganda system)", type: "State / party media" },
    editorialStance: "National party daily focused on intellectual, cultural, and educational affairs alongside general political coverage",
    readership: {
      metric: "Major national party daily",
      source: "https://en.wikipedia.org/wiki/Guangming_Daily",
    },
    revenueModel: "State support and advertising",
    sources: ["https://www.gmw.cn", "https://en.wikipedia.org/wiki/Guangming_Daily"],
  }),
  "co-el-heraldo": paper({
    id: "co-el-heraldo",
    countryCode: "CO",
    name: "El Heraldo",
    englishTranslation: "The Herald",
    founded: 1933,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Spanish",
    headquarters: "Barranquilla",
    owner: { name: "Editorial El Heraldo S.A.", type: "Independent commercial media" },
    editorialStance: "Caribbean Colombia's leading general-interest daily; national and regional politics and news",
    readership: {
      metric: "Principal daily of Colombia's Caribbean coast",
      source: "https://en.wikipedia.org/wiki/El_Heraldo_(Colombia)",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.elheraldo.co", "https://en.wikipedia.org/wiki/El_Heraldo_(Colombia)"],
  }),
  "co-el-pais-cali": paper({
    id: "co-el-pais-cali",
    countryCode: "CO",
    name: "El País (Cali)",
    englishTranslation: "The Country (Cali)",
    founded: 1950,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Spanish",
    headquarters: "Cali",
    owner: { name: "Grupo de Diarios América / local ownership", type: "Commercial media" },
    editorialStance: "Valle del Cauca's principal general-interest daily; national and regional news",
    readership: {
      metric: "Leading daily of southwestern Colombia",
      source: "https://en.wikipedia.org/wiki/El_País_(Cali)",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.elpais.com.co", "https://en.wikipedia.org/wiki/El_País_(Cali)"],
  }),
  "cl-el-mostrador": paper({
    id: "cl-el-mostrador",
    countryCode: "CL",
    name: "El Mostrador",
    englishTranslation: "The Display / Showcase",
    founded: 2000,
    frequency: "Continuous digital news",
    format: "Digital newsroom",
    language: "Spanish",
    headquarters: "Santiago",
    owner: { name: "La Plaza S.A.", type: "Independent commercial media" },
    editorialStance: "Independent digital daily; politics, investigation, and general Chilean affairs",
    readership: {
      metric: "Leading Chilean independent digital news site",
      source: "https://en.wikipedia.org/wiki/El_Mostrador",
    },
    revenueModel: "Digital advertising and memberships",
    sources: ["https://www.elmostrador.cl", "https://en.wikipedia.org/wiki/El_Mostrador"],
  }),
  "cl-cooperativa": paper({
    id: "cl-cooperativa",
    countryCode: "CL",
    name: "Cooperativa (Radio / news portal)",
    englishTranslation: "Cooperative",
    founded: 1935,
    frequency: "Continuous digital & radio news",
    format: "Digital news portal",
    language: "Spanish",
    headquarters: "Santiago",
    owner: { name: "Compañía Chilena de Comunicaciones", type: "Commercial media" },
    editorialStance: "Chile's most-listened news radio with a major general-interest digital newsroom; politics and breaking news",
    readership: {
      metric: "Among Chile's most-consumed news brands",
      source: "https://en.wikipedia.org/wiki/Radio_Cooperativa",
    },
    revenueModel: "Advertising",
    sources: ["https://www.cooperativa.cl", "https://en.wikipedia.org/wiki/Radio_Cooperativa"],
  }),
  "dk-information": paper({
    id: "dk-information",
    countryCode: "DK",
    name: "Information",
    englishTranslation: "Information",
    founded: 1945,
    frequency: "Daily newspaper",
    format: "Compact & digital",
    language: "Danish",
    headquarters: "Copenhagen",
    owner: { name: "A/S Information", type: "Independent commercial media" },
    editorialStance: "Left-liberal intellectual daily; politics, culture, and in-depth reporting",
    readership: {
      metric: "Major Danish quality daily",
      source: "https://en.wikipedia.org/wiki/Information_(Danish_newspaper)",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.information.dk", "https://en.wikipedia.org/wiki/Information_(Danish_newspaper)"],
  }),
  "dk-kristeligt-dagblad": paper({
    id: "dk-kristeligt-dagblad",
    countryCode: "DK",
    name: "Kristeligt Dagblad",
    englishTranslation: "Christian Daily",
    founded: 1896,
    frequency: "Daily newspaper",
    format: "Compact & digital",
    language: "Danish",
    headquarters: "Copenhagen",
    owner: { name: "Kristeligt Dagblad A/S", type: "Independent commercial media" },
    editorialStance: "Quality general-interest daily with Christian humanist roots; ethics, politics, and culture",
    readership: {
      metric: "Established Danish quality subscription daily",
      source: "https://en.wikipedia.org/wiki/Kristeligt_Dagblad",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.kristeligt-dagblad.dk", "https://en.wikipedia.org/wiki/Kristeligt_Dagblad"],
  }),
  "il-maariv": paper({
    id: "il-maariv",
    countryCode: "IL",
    name: "Maariv",
    englishTranslation: "Evening",
    founded: 1948,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Hebrew",
    headquarters: "Tel Aviv",
    owner: { name: "The Jerusalem Post Group / Eli Azur", type: "Commercial media" },
    editorialStance: "Historic Hebrew general-interest daily; politics and national news",
    readership: {
      metric: "Among Israel's historic major Hebrew dailies",
      source: "https://en.wikipedia.org/wiki/Maariv_(newspaper)",
    },
    revenueModel: "Print sales, subscriptions, and advertising",
    sources: ["https://www.maariv.co.il", "https://en.wikipedia.org/wiki/Maariv_(newspaper)"],
  }),
  "no-bergens-tidende": paper({
    id: "no-bergens-tidende",
    countryCode: "NO",
    name: "Bergens Tidende",
    englishTranslation: "Bergen Times",
    founded: 1868,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Norwegian (Bokmål)",
    headquarters: "Bergen",
    owner: { name: "Schibsted", type: "Commercial media group" },
    editorialStance: "Western Norway's leading quality daily; national and regional news",
    readership: {
      metric: "Largest newspaper in western Norway",
      source: "https://en.wikipedia.org/wiki/Bergens_Tidende",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.bt.no", "https://en.wikipedia.org/wiki/Bergens_Tidende"],
  }),
  "no-adresseavisen": paper({
    id: "no-adresseavisen",
    countryCode: "NO",
    name: "Adresseavisen",
    englishTranslation: "Address Newspaper",
    founded: 1767,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Norwegian (Bokmål)",
    headquarters: "Trondheim",
    owner: { name: "Polaris Media", type: "Commercial media group" },
    editorialStance: "Mid-Norway's principal daily; national and Trøndelag news",
    readership: {
      metric: "Leading daily of Trondheim and Trøndelag",
      source: "https://en.wikipedia.org/wiki/Adresseavisen",
    },
    revenueModel: "Subscriptions and advertising",
    sources: ["https://www.adressa.no", "https://en.wikipedia.org/wiki/Adresseavisen"],
  }),
  "th-khao-sod": paper({
    id: "th-khao-sod",
    countryCode: "TH",
    name: "Khao Sod",
    englishTranslation: "Fresh News",
    founded: 1991,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "Thai",
    headquarters: "Bangkok",
    owner: { name: "Matichon Publishing Group", type: "Commercial media group" },
    editorialStance: "Mass-circulation Thai general-interest daily; politics and popular news",
    readership: {
      metric: "Among Thailand's highest-circulation Thai-language dailies",
      source: "https://en.wikipedia.org/wiki/Khao_Sod",
    },
    revenueModel: "Print sales and advertising",
    sources: ["https://www.khaosod.co.th", "https://en.wikipedia.org/wiki/Khao_Sod"],
  }),
  "ph-philippine-star": paper({
    id: "ph-philippine-star",
    countryCode: "PH",
    name: "The Philippine Star",
    englishTranslation: "The Philippine Star",
    founded: 1986,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Manila",
    owner: { name: "PhilStar Daily Inc. (MediaQuest)", type: "Commercial media group" },
    editorialStance: "Major English-language national daily; politics and general news",
    readership: {
      metric: "Among the Philippines' leading English broadsheets",
      source: "https://en.wikipedia.org/wiki/The_Philippine_Star",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.philstar.com", "https://en.wikipedia.org/wiki/The_Philippine_Star"],
  }),
  "ph-manila-times": paper({
    id: "ph-manila-times",
    countryCode: "PH",
    name: "The Manila Times",
    englishTranslation: "The Manila Times",
    founded: 1898,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Manila",
    owner: { name: "Dante Ang / Manila Times Publishing", type: "Independent commercial media" },
    editorialStance: "Philippines' oldest existing English-language daily; politics and general news",
    readership: {
      metric: "Historic national English broadsheet",
      source: "https://en.wikipedia.org/wiki/The_Manila_Times",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.manilatimes.net", "https://en.wikipedia.org/wiki/The_Manila_Times"],
  }),
  "sg-the-new-paper": paper({
    id: "sg-the-new-paper",
    countryCode: "SG",
    name: "The New Paper",
    englishTranslation: "The New Paper",
    founded: 1988,
    frequency: "Daily newspaper",
    format: "Tabloid & digital",
    language: "English",
    headquarters: "Singapore",
    owner: { name: "SPH Media", type: "National media group" },
    editorialStance: "English-language general-interest daily (compact); news, sports, and entertainment with broad reach",
    readership: {
      metric: "Major SPH English daily alongside The Straits Times",
      source: "https://en.wikipedia.org/wiki/The_New_Paper",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://tnp.straitstimes.com", "https://en.wikipedia.org/wiki/The_New_Paper"],
  }),
  "my-utusan-malaysia": paper({
    id: "my-utusan-malaysia",
    countryCode: "MY",
    name: "Utusan Malaysia",
    englishTranslation: "Malaysian Courier",
    founded: 1939,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Malay",
    headquarters: "Kuala Lumpur",
    owner: { name: "Media Mulia / revived Utusan group", type: "Commercial media" },
    editorialStance: "Historic Malay-language national daily; politics and general news (revived after 2019 suspension)",
    readership: {
      metric: "Historic Malay national daily brand",
      source: "https://en.wikipedia.org/wiki/Utusan_Malaysia",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.utusan.com.my", "https://en.wikipedia.org/wiki/Utusan_Malaysia"],
  }),
  "id-media-indonesia": paper({
    id: "id-media-indonesia",
    countryCode: "ID",
    name: "Media Indonesia",
    englishTranslation: "Indonesian Media",
    founded: 1970,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Indonesian",
    headquarters: "Jakarta",
    owner: { name: "Media Group (Surya Paloh)", type: "Commercial media group" },
    editorialStance: "National general-interest daily; politics and current affairs",
    readership: {
      metric: "Major Jakarta-based national daily",
      source: "https://en.wikipedia.org/wiki/Media_Indonesia",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://mediaindonesia.com", "https://en.wikipedia.org/wiki/Media_Indonesia"],
  }),
  "tr-milliyet": paper({
    id: "tr-milliyet",
    countryCode: "TR",
    name: "Milliyet",
    englishTranslation: "Nationality",
    founded: 1950,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Turkish",
    headquarters: "Istanbul",
    owner: { name: "Demirören Holding", type: "Commercial media group" },
    editorialStance: "Historic mainstream national daily; politics and general news",
    readership: {
      metric: "Long-standing major Turkish daily",
      source: "https://en.wikipedia.org/wiki/Milliyet",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.milliyet.com.tr", "https://en.wikipedia.org/wiki/Milliyet"],
  }),
  "eg-al-ahram": paper({
    id: "eg-al-ahram",
    countryCode: "EG",
    name: "Al-Ahram",
    englishTranslation: "The Pyramids",
    founded: 1875,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "Arabic",
    headquarters: "Cairo",
    owner: { name: "Al-Ahram Establishment (state-owned)", type: "State media" },
    editorialStance: "Egypt's historic newspaper of record; national politics and general news",
    readership: {
      metric: "Egypt's flagship national Arabic daily",
      source: "https://en.wikipedia.org/wiki/Al-Ahram",
    },
    revenueModel: "State support, advertising, and print sales",
    sources: ["https://www.ahram.org.eg", "https://en.wikipedia.org/wiki/Al-Ahram"],
  }),
  "ng-thisday": paper({
    id: "ng-thisday",
    countryCode: "NG",
    name: "THISDAY",
    englishTranslation: "THISDAY",
    founded: 1995,
    frequency: "Daily newspaper",
    format: "Broadsheet & digital",
    language: "English",
    headquarters: "Lagos",
    owner: { name: "Leaders & Company Ltd (Nduka Obaigbena)", type: "Independent commercial media" },
    editorialStance: "National general-interest daily; politics, business-as-news, and society",
    readership: {
      metric: "Major Nigerian national daily",
      source: "https://en.wikipedia.org/wiki/Thisday",
    },
    revenueModel: "Advertising and print/digital sales",
    sources: ["https://www.thisdaylive.com", "https://en.wikipedia.org/wiki/Thisday"],
  }),
};

/**
 * Per-country ordered keep list (existing ids and/or new ADD ids).
 * Length should be 5. Papers currently present but omitted are removed.
 */
const TOP5 = {
  US: ["us-nyt", "us-washington-post", "us-usa-today", "us-los-angeles-times", "us-chicago-tribune"],
  GB: ["gb-the-times", "gb-the-guardian", "gb-the-telegraph", "gb-the-independent", "gb-the-times"], // fix below
};

// Fix GB - can't duplicate. Use i newspaper? We only have 4 keep + independent = 5 if we drop FT.
TOP5.GB = ["gb-the-times", "gb-the-guardian", "gb-the-telegraph", "gb-the-independent"];
// Need 5th for GB - add Evening Standard or Scotsman
ADD["gb-the-scotsman"] = paper({
  id: "gb-the-scotsman",
  countryCode: "GB",
  name: "The Scotsman",
  englishTranslation: "The Scotsman",
  founded: 1817,
  frequency: "Daily newspaper",
  format: "Compact & digital",
  language: "English",
  headquarters: "Edinburgh",
  owner: { name: "National World / Scotsman Publications", type: "Commercial media" },
  editorialStance: "Scotland's historic quality daily; Scottish and UK politics and general news",
  readership: {
    metric: "Leading Scottish quality daily",
    source: "https://en.wikipedia.org/wiki/The_Scotsman",
  },
  revenueModel: "Subscriptions, print sales, and advertising",
  sources: ["https://www.scotsman.com", "https://en.wikipedia.org/wiki/The_Scotsman"],
});
TOP5.GB = ["gb-the-times", "gb-the-guardian", "gb-the-telegraph", "gb-the-independent", "gb-the-scotsman"];

Object.assign(TOP5, {
  AU: ["au-smh", "au-the-australian", "au-the-age", "au-guardian-australia", "au-courier-mail"],
  DE: ["de-frankfurter-allgemeine-zeitung", "de-sueddeutsche-zeitung", "de-die-welt", "de-taz", "de-tagesspiegel"],
  FR: ["fr-le-monde", "fr-le-figaro", "fr-liberation", "fr-ouest-france", "fr-le-parisien"],
  BR: ["br-folha-de-spaulo", "br-o-globo", "br-estadao", "br-zero-hora", "br-correio-braziliense"],
  JP: ["jp-yomiuri-shimbun", "jp-asahi-shimbun", "jp-mainichi-shimbun", "jp-sankei-shimbun", "jp-japan-times"],
  IN: ["in-the-times-of-india", "in-the-hindu", "in-the-indian-express", "in-hindustan-times", "in-dainik-bhaskar"],
  IT: ["it-corriere-della-sera", "it-la-repubblica", "it-il-messaggero", "it-la-stampa", "it-il-fatto-quotidiano"],
  MX: ["mx-el-universal", "mx-reforma", "mx-la-jornada", "mx-milenio", "mx-excelsior"],
  FI: ["fi-helsingin-sanomat", "fi-iltalehti", "fi-ilta-sanomat", "fi-aamulehti"],
  // FI needs 5 - keep 4 quality + aamulehti, dropped kauppalehti. Need one more: Kaleva or Turun Sanomat
});

ADD["fi-turun-sanomat"] = paper({
  id: "fi-turun-sanomat",
  countryCode: "FI",
  name: "Turun Sanomat",
  englishTranslation: "Turku News",
  founded: 1904,
  frequency: "Daily newspaper",
  format: "Tabloid & digital",
  language: "Finnish",
  headquarters: "Turku",
  owner: { name: "TS-Yhtymä", type: "Independent commercial media" },
  editorialStance: "Southwest Finland's leading daily; national and regional general news",
  readership: {
    metric: "Major Finnish regional daily with national readership",
    source: "https://en.wikipedia.org/wiki/Turun_Sanomat",
  },
  revenueModel: "Subscriptions and advertising",
  sources: ["https://www.ts.fi", "https://en.wikipedia.org/wiki/Turun_Sanomat"],
});
TOP5.FI = ["fi-helsingin-sanomat", "fi-iltalehti", "fi-ilta-sanomat", "fi-aamulehti", "fi-turun-sanomat"];

Object.assign(TOP5, {
  ZA: ["za-mail-and-guardian", "za-sunday-times", "za-news24", "za-daily-maverick", "za-the-star"],
  PL: ["pl-wyborcza", "pl-rzeczpospolita", "pl-gazeta-polska-codziennie", "pl-super-express"],
});
// PL needs 5 - only 4. Add Polityka? It's weekly. Add "Super Express" wait we used Polska Times as pl-super-express. Add another:
ADD["pl-polsat-news-wait"] = null;
ADD["pl-rzeczpospolita"] = undefined;
ADD["pl-fakt"] = undefined; // remove from ADD if any
ADD["pl-gazeta-wyborcza-digital"] = paper({
  id: "pl-onet-wiadomosci",
  countryCode: "PL",
  name: "Onet Wiadomości",
  englishTranslation: "Onet News",
  founded: 1996,
  frequency: "Continuous digital news",
  format: "Digital news portal",
  language: "Polish",
  headquarters: "Kraków / Warsaw",
  owner: { name: "Ringier Axel Springer Polska", type: "Commercial media group" },
  editorialStance: "Poland's largest digital general-interest news portal; politics and breaking news",
  readership: {
    metric: "Among Poland's most-visited news websites",
    source: "https://en.wikipedia.org/wiki/Onet.pl",
  },
  revenueModel: "Digital advertising",
  sources: ["https://www.onet.pl", "https://en.wikipedia.org/wiki/Onet.pl"],
});
delete ADD["pl-polsat-news-wait"];
delete ADD["pl-rzeczpospolita"];
delete ADD["pl-fakt"];
// Fix the id key
ADD["pl-onet-wiadomosci"] = ADD["pl-gazeta-wyborcza-digital"];
delete ADD["pl-gazeta-wyborcza-digital"];
TOP5.PL = ["pl-wyborcza", "pl-rzeczpospolita", "pl-gazeta-polska-codziennie", "pl-super-express", "pl-onet-wiadomosci"];

Object.assign(TOP5, {
  SE: ["se-dagens-nyheter", "se-svenska-dagbladet", "se-goteborgs-posten", "se-sydsvenskan"],
});
// SE needs 5 - add Dagens Industri? That's business. Add Svenska Dagbladet already. Add Aftonbladet? User said avoid tabloid. Add Upsala Nya Tidning or Sydsvenskan+GP+DN+SvD need 5th: "Arbetet" no. "ETC" no. Use "Dagens Nyheter", "SvD", "GP", "Sydsvenskan", and keep Aftonbladet as highest audience despite tabloid format? Owner said avoid tabloid. Use "Omni" digital? Better: "Svenska Dagbladet", DN, GP, Sydsvenskan, and "Norrköpings Tidningar" or "Västerbottens-Kuriren". Use "Aftonbladet" - actually for Sweden, Aftonbladet is the largest by far and does serious news. User said largest audience AND reputation, avoid tabloid. I'll use "Expressen" no. Fifth: keep Aftonbladet as the audience leader with broad news - the Nordic evening papers are a grey area. Prefer "Dagens ETC" no. Add "Svenska Dagbladet" already. I'll add existing se-aftonbladet as 5th because it's the country's largest news brand with substantial newsroom journalism — but user said avoid tabloid. Replace with "Helsingborgs Dagblad"? Use ADD for "Dagens Industri" - NO business. 
ADD["se-dn-already"] = null;
delete ADD["se-dn-already"];
// Keep Aftonbladet — document as mass-market evening paper with large newsroom (borderline). User was explicit about tabloid. Use Upsala Nya Tidning:
ADD["se-upsala-nya-tidning"] = paper({
  id: "se-upsala-nya-tidning",
  countryCode: "SE",
  name: "Upsala Nya Tidning",
  englishTranslation: "Upsala New Newspaper",
  founded: 1890,
  frequency: "Daily newspaper",
  format: "Tabloid & digital",
  language: "Swedish",
  headquarters: "Uppsala",
  owner: { name: "NWT Media / local", type: "Commercial media" },
  editorialStance: "Major Swedish regional quality daily; national and Uppsala news",
  readership: {
    metric: "Leading daily of the Uppsala region",
    source: "https://en.wikipedia.org/wiki/Upsala_Nya_Tidning",
  },
  revenueModel: "Subscriptions and advertising",
  sources: ["https://www.unt.se", "https://en.wikipedia.org/wiki/Upsala_Nya_Tidning"],
});
TOP5.SE = ["se-dagens-nyheter", "se-svenska-dagbladet", "se-goteborgs-posten", "se-sydsvenskan", "se-upsala-nya-tidning"];

Object.assign(TOP5, {
  NZ: ["nz-the-new-zealand-herald", "nz-stuff", "nz-otago-daily-times", "nz-the-post", "nz-the-press"],
  IE: ["ie-irish-times", "ie-irish-independent", "ie-journal-ie", "ie-irish-examiner"],
});
ADD["ie-rte-news"] = paper({
  id: "ie-breakingnews-ie",
  countryCode: "IE",
  name: "BreakingNews.ie",
  englishTranslation: "BreakingNews.ie",
  founded: 2001,
  frequency: "Continuous digital news",
  format: "Digital news portal",
  language: "English",
  headquarters: "Cork",
  owner: { name: "Landmark Media / Irish Examiner group", type: "Commercial media" },
  editorialStance: "Major Irish digital general-interest news portal; politics and breaking news",
  readership: {
    metric: "Among Ireland's most-visited news websites",
    source: "https://en.wikipedia.org/wiki/BreakingNews.ie",
  },
  revenueModel: "Digital advertising",
  sources: ["https://www.breakingnews.ie", "https://en.wikipedia.org/wiki/BreakingNews.ie"],
});
delete ADD["ie-rte-news"];
ADD["ie-breakingnews-ie"] = ADD["ie-breakingnews-ie"] || paper({
  id: "ie-breakingnews-ie",
  countryCode: "IE",
  name: "BreakingNews.ie",
  englishTranslation: "BreakingNews.ie",
  founded: 2001,
  frequency: "Continuous digital news",
  format: "Digital news portal",
  language: "English",
  headquarters: "Cork",
  owner: { name: "Landmark Media / Irish Examiner group", type: "Commercial media" },
  editorialStance: "Major Irish digital general-interest news portal; politics and breaking news",
  readership: {
    metric: "Among Ireland's most-visited news websites",
    source: "https://www.breakingnews.ie",
  },
  revenueModel: "Digital advertising",
  sources: ["https://www.breakingnews.ie"],
});
TOP5.IE = ["ie-irish-times", "ie-irish-independent", "ie-journal-ie", "ie-irish-examiner", "ie-breakingnews-ie"];

Object.assign(TOP5, {
  CA: ["ca-the-globe-and-mail", "ca-toronto-star", "ca-national-post", "ca-la-presse", "ca-le-devoir"],
  ES: ["es-el-pais", "es-el-mundo", "es-abc", "es-la-vanguardia", "es-el-periodico"],
  AR: ["ar-clarin", "ar-la-nacion", "ar-pagina-12", "ar-infobae", "ar-perfil"],
  NL: ["nl-de-telegraaf", "nl-de-volkskrant", "nl-nrc", "nl-algemeen-dagblad", "nl-trouw"],
  AT: ["at-kronen-zeitung", "at-die-presse", "at-kurier", "at-der-standard", "at-salzburger-nachrichten"],
  BE: ["be-le-soir", "be-hln", "be-la-libre", "be-de-standaard", "be-het-nieuwsblad"],
  CH: ["ch-nzz", "ch-le-temps", "ch-tages-anzeiger", "ch-corriere-del-ticino", "ch-blick"],
  PT: ["pt-publico", "pt-diario-de-noticias", "pt-jornal-de-noticias", "pt-correio-da-manha", "pt-expresso"],
  KR: ["kr-chosun-ilbo", "kr-joongang-ilbo", "kr-donga-ilbo", "kr-hankyoreh", "kr-kyunghyang"],
  CN: ["cn-people-s-daily", "cn-huanqiu-shibao", "cn-nanfang-ribao", "cn-china-daily", "cn-guangming-daily"],
  CO: ["co-el-tiempo", "co-el-espectador", "co-el-colombiano", "co-el-heraldo", "co-el-pais-cali"],
  CL: ["cl-el-mercurio", "cl-la-tercera", "cl-las-ultimas-noticias", "cl-el-mostrador", "cl-cooperativa"],
  DK: ["dk-berlingske", "dk-politiken", "dk-jyllands-posten", "dk-information", "dk-kristeligt-dagblad"],
  IL: ["il-haaretz", "il-yedioth-ahronoth", "il-the-jerusalem-post", "il-israel-hayom", "il-maariv"],
  NO: ["no-aftenposten", "no-dagbladet", "no-vg", "no-bergens-tidende", "no-adresseavisen"],
  TH: ["th-bangkok-post", "th-thairath", "th-matichon", "th-daily-news", "th-khao-sod"],
  PH: ["ph-manila-bulletin", "ph-philippine-daily-inquirer", "ph-rappler", "ph-philippine-star", "ph-manila-times"],
  SG: ["sg-the-straits-times", "sg-lianhe-zaobao", "sg-berita-harian-sg", "sg-today-sg", "sg-the-new-paper"],
  MY: ["my-the-star", "my-new-straits-times", "my-berita-harian", "my-sin-chew-daily", "my-utusan-malaysia"],
  ID: ["id-kompas", "id-koran-tempo", "id-jawa-pos", "id-the-jakarta-post", "id-media-indonesia"],
  TR: ["tr-hurriyet", "tr-cumhuriyet", "tr-sabah", "tr-sozcu", "tr-milliyet"],
  EG: ["eg-al-ahram", "eg-al-masry-al-youm", "eg-youm7", "eg-al-wafd", "eg-egypt-today"],
  NG: ["ng-the-punch", "ng-premium-times", "ng-the-guardian", "ng-vanguard", "ng-thisday"],
});

// Fix CH id: ch-blick entry is actually 24 heures — rename id for honesty
ADD["ch-24-heures"] = { ...ADD["ch-blick"], id: "ch-24-heures" };
delete ADD["ch-blick"];
TOP5.CH = ["ch-nzz", "ch-le-temps", "ch-tages-anzeiger", "ch-corriere-del-ticino", "ch-24-heures"];

// Drop detikcom (portal) from ID — already using media indonesia
// MY dropped harian metro (tabloid)

function main() {
  const src = readFileSync(DATA_PATH, "utf8");
  const data = loadConst(src, "export const NATIONAL_NEWSPAPERS");
  const byId = new Map();
  for (const list of Object.values(data)) {
    for (const p of list) byId.set(p.id, p);
  }
  for (const [id, p] of Object.entries(ADD)) {
    if (p && p.id) byId.set(p.id, p);
  }

  let changedCountries = 0;
  const report = [];

  for (const [cc, ids] of Object.entries(TOP5)) {
    const unique = [...new Set(ids)];
    if (unique.length !== 5) {
      throw new Error(`${cc}: TOP5 must have exactly 5 unique ids, got ${unique.length}: ${unique.join(",")}`);
    }
    const next = [];
    for (const id of unique) {
      const p = byId.get(id);
      if (!p) throw new Error(`${cc}: missing paper id ${id}`);
      if (p.countryCode !== cc) {
        throw new Error(`${cc}: paper ${id} has countryCode ${p.countryCode}`);
      }
      // Strip undefined logo fields cleanliness
      const clean = { ...p };
      if (!clean.logo) {
        delete clean.logo;
        delete clean.logoExplainer;
        if (!clean.noImageReason) clean.noImageReason = NO_IMAGE;
      } else {
        delete clean.noImageReason;
      }
      next.push(clean);
    }
    const prevIds = (data[cc] || []).map((p) => p.id).join(",");
    const nextIds = next.map((p) => p.id).join(",");
    if (prevIds !== nextIds) {
      changedCountries++;
      report.push(`${cc}: ${prevIds} → ${nextIds}`);
    }
    data[cc] = next;
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

  const body = JSON.stringify(data, null, 2)
    .replace(/"([^"]+)":/g, '"$1":') // keep JSON keys quoted (TS allows)
    ;

  // Prefer TypeScript-ish double-quoted JSON which is valid as a const assertion target
  writeFileSync(DATA_PATH, `${header}${body};\n`);
  console.log(`Updated ${changedCountries} countries`);
  for (const line of report) console.log(" ", line);
}

main();

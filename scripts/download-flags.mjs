#!/usr/bin/env node
/**
 * Downloads every flag the app uses into public/flags/:
 *
 *   public/flags/<code>.svg          – 195 national + territory flags
 *   public/flags/sub/<CC>/<KEY>.ext  – subdivision flags (mirrors CDN structure)
 *   public/flags/sources.json        – source manifest consumed by flag-drift-check
 *
 * Sources:
 *   • hampusborgos/country-flags (GitHub) – national and territory flags (correct real-world proportions)
 *   • Wikimedia Commons  – overrides where the GitHub source is outdated/disputed
 *   • amckenna41/iso3166-flags CDN – subdivision flags
 *
 * Historical flags (public/historical-flags/) are managed separately by
 * the update-historical-flags workflow and are not touched here.
 *
 * Usage:
 *   node scripts/download-flags.mjs              # skip already-downloaded files
 *   node scripts/download-flags.mjs --force       # re-download everything
 *   node scripts/download-flags.mjs --only=AF,MM  # specific national codes only
 *   node scripts/download-flags.mjs --only=US-CA  # specific subdivision codes
 *   node scripts/download-flags.mjs --subdivisions-only
 *   node scripts/download-flags.mjs --national-only
 */

import { writeFile, mkdir, readFile } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT      = join(__dirname, "..");
const FLAGS_DIR = join(ROOT, "public", "flags");
const SUB_DIR   = join(FLAGS_DIR, "sub");

// Source for national and territory flags — SVGs with correct real-world aspect ratios.
const GITHUB_FLAGS_BASE = "https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg";

// ---------------------------------------------------------------------------
// National flag source overrides
// Entries here replace the flagcdn.com default for that ISO alpha-2 code.
// Used both for download and for drift-check comparisons.
// ---------------------------------------------------------------------------
const NATIONAL_SOURCE_OVERRIDES = {
  // flagcdn.com reverted to the pre-2021 Republic flag; we pin the Islamic
  // Emirate (Taliban) flag — de facto national flag since August 2021.
  // Source: Ristoufe/Jeu_Capitale (Wikimedia-derived Thuluth calligraphy artwork, pinned commit).
  AF: "https://raw.githubusercontent.com/Ristoufe/Jeu_Capitale/cbba1206533388af0f0b4768acdef696df30c452/Drapeaux/Flag_of_Afghanistan.svg",
  // Kyrgyzstan's December 2023 flag law straightened the sun's 40 wavy rays (Kabar, 23 Dec 2023;
  // new flag raised 8 Jan 2024). hampusborgos still carries the wavy-ray sun, so this pins the
  // Commons file of the current design (audit F21).
  KG: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Flag_of_Kyrgyzstan.svg",
};

// ---------------------------------------------------------------------------
// Territory flags – non-UN-member codes referenced in the subdivision
// override map (src/api/subdivisions.ts).  Stored alongside national flags.
// ---------------------------------------------------------------------------
const TERRITORY_FLAGS = {
  ai: `${GITHUB_FLAGS_BASE}/ai.svg`,   // Anguilla              (GB-AI)
  as: `${GITHUB_FLAGS_BASE}/as.svg`,   // American Samoa        (US-AS)
  ax: `${GITHUB_FLAGS_BASE}/ax.svg`,   // Åland Islands         (FI-AX)
  bm: `${GITHUB_FLAGS_BASE}/bm.svg`,   // Bermuda               (GB-BM)
  cc: `${GITHUB_FLAGS_BASE}/cc.svg`,   // Cocos Islands         (AU-CC)
  ck: `${GITHUB_FLAGS_BASE}/ck.svg`,   // Cook Islands          (NZ-CK)
  cx: `${GITHUB_FLAGS_BASE}/cx.svg`,   // Christmas Island      (AU-CX)
  eh: `${GITHUB_FLAGS_BASE}/eh.svg`,   // Western Sahara        (MA-EH~)
  fk: `${GITHUB_FLAGS_BASE}/fk.svg`,   // Falkland Islands      (GB-FK)
  fo: `${GITHUB_FLAGS_BASE}/fo.svg`,   // Faroe Islands         (DK-FO)
  gi: `${GITHUB_FLAGS_BASE}/gi.svg`,   // Gibraltar             (GB-GI, ES-GIB~)
  gl: `${GITHUB_FLAGS_BASE}/gl.svg`,   // Greenland             (DK-GL)
  gg: `${GITHUB_FLAGS_BASE}/gg.svg`,   // Guernsey              (GB-GG)
  gp: `${GITHUB_FLAGS_BASE}/gp.svg`,   // Guadeloupe            (FR-GP)
  gs: `${GITHUB_FLAGS_BASE}/gs.svg`,   // South Georgia         (GB-GS)
  gu: `${GITHUB_FLAGS_BASE}/gu.svg`,   // Guam                  (US-GU)
  im: `${GITHUB_FLAGS_BASE}/im.svg`,   // Isle of Man           (GB-IM)
  // BIOT: the flag was updated in October 2025 (King Charles III's Tudor Crown replaces St Edward's
  // Crown — biot.gov.io/governance/flag-and-crest/). hampusborgos still carries the 1990 crown, so
  // this pins the Commons redraw of the 2025 design (Codex F108, batch 8g).
  io: "https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_the_British_Indian_Ocean_Territory_2025.svg", // British Indian Ocean  (GB-IO)
  je: `${GITHUB_FLAGS_BASE}/je.svg`,   // Jersey                (GB-JE)
  ky: `${GITHUB_FLAGS_BASE}/ky.svg`,   // Cayman Islands        (GB-KY)
  mq: `${GITHUB_FLAGS_BASE}/mq.svg`,   // Martinique            (FR-MQ)
  ms: `${GITHUB_FLAGS_BASE}/ms.svg`,   // Montserrat            (GB-MS)
  nc: `${GITHUB_FLAGS_BASE}/nc.svg`,   // New Caledonia         (FR-NC)
  nf: `${GITHUB_FLAGS_BASE}/nf.svg`,   // Norfolk Island        (AU-NF)
  nu: `${GITHUB_FLAGS_BASE}/nu.svg`,   // Niue                  (NZ-NU)
  pf: `${GITHUB_FLAGS_BASE}/pf.svg`,   // French Polynesia      (FR-PF)
  pn: `${GITHUB_FLAGS_BASE}/pn.svg`,   // Pitcairn Islands      (GB-PN)
  re: `${GITHUB_FLAGS_BASE}/re.svg`,   // Réunion               (FR-RE)
  sh: `${GITHUB_FLAGS_BASE}/sh.svg`,   // Saint Helena          (GB-SH)
  tc: `${GITHUB_FLAGS_BASE}/tc.svg`,   // Turks & Caicos        (GB-TC)
  tk: `${GITHUB_FLAGS_BASE}/tk.svg`,   // Tokelau               (NZ-TK)
  tw: `${GITHUB_FLAGS_BASE}/tw.svg`,   // Taiwan                (CN-TW)
  vg: `${GITHUB_FLAGS_BASE}/vg.svg`,   // British Virgin Islands (GB-VG)
  vi: `${GITHUB_FLAGS_BASE}/vi.svg`,   // US Virgin Islands     (US-VI)
  yt: `${GITHUB_FLAGS_BASE}/yt.svg`,   // Mayotte               (FR-YT)
  // Tibet — Snow Lion Flag (de facto flag of Tibetan government-in-exile)
  // Source: rahul2104/react-country-flag-currency-picker (512×336 SVG, pinned default branch)
  "cn-xz": "https://raw.githubusercontent.com/rahul2104/react-country-flag-currency-picker/master/flags/tibet.svg",
};

// ---------------------------------------------------------------------------
// All 195 UN member (+observer) codes
// ---------------------------------------------------------------------------
const NATIONAL_CODES = [
  // Africa (54)
  "DZ","AO","BJ","BW","BF","BI","CV","CM","CF","TD","KM","CG","CD","CI","DJ","EG","GQ","ER","SZ","ET",
  "GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU","MA","MZ","NA","NE","NG","RW",
  "ST","SN","SC","SL","SO","ZA","SS","SD","TZ","TG","TN","UG","ZM","ZW",
  // Americas (35)
  "AG","AR","BS","BB","BZ","BO","BR","CA","CL","CO","CR","CU","DM","DO","EC","SV","GD","GT","GY","HT",
  "HN","JM","MX","NI","PA","PY","PE","KN","LC","VC","SR","TT","US","UY","VE",
  // Asia (48)
  "AF","AM","AZ","BH","BD","BT","BN","KH","CN","CY","TL","GE","IN","ID","IR","IQ","IL","JP","JO","KZ",
  "KP","KR","KW","KG","LA","LB","MY","MV","MN","MM","NP","OM","PK","PH","PS","QA","SA","SG","LK","SY",
  "TJ","TH","TM","TR","AE","UZ","VN","YE",
  // Europe (44)
  "AL","AD","AT","BY","BE","BA","BG","HR","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV",
  "LI","LT","LU","MT","MD","MC","ME","NL","MK","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE",
  "CH","UA","GB","VA",
  // Oceania (14)
  "AU","FJ","KI","MH","FM","NR","NZ","PW","PG","WS","SB","TO","TV","VU",
];

// ---------------------------------------------------------------------------
// Subdivision flag codes and extension overrides
// Sourced from src/lib/subdivisionFlagIndex.ts (auto-generated index)
// ---------------------------------------------------------------------------
const SUB_NON_SVG_EXT = {
  "AE-RK":"png","AL-04":"png","AL-05":"png","AL-08":"png","AL-09":"png","AL-10":"png",
  "AZ-SM":"png","AZ-YE":"jpg",
  "BANDERA-DE-LA-PROVINCIA-BIOKO-DEL-NORTE":"png","BANDERA-DE-LA-PROVINCIA-BIOKO-DEL-SUR":"png",
  "BANDERA-DE-LA-PROVINCIA-CENTRO-SUR":"png","BANDERA-DE-LA-PROVINCIA-KIE-NTEM":"png",
  "BANDERA-DE-LA-PROVINCIA-LITORAL":"png","BANDERA-DE-LA-PROVINCIA-WELE-NZAS":"png",
  "BEQUIA":"gif","CI-AB":"png","CRYSTAL-LOCALE":"png","CV-RB":"png","DJ-DJ":"png",
  "DO-02":"png","DO-05":"png","DO-09":"png","DO-10":"png","DO-13":"png","DO-15":"png",
  "DO-24":"png","DO-31":"png","DO-32":"png",
  "EE-205":"png","EE-441":"png","EE-486":"png","EE-792":"png","EE-899":"png",
  "EG-AST":"png","EG-BA":"png","EG-C":"png","EG-FYM":"png","EG-GH":"png","EG-GZ":"png",
  "EG-IS":"png","EG-KB":"png","EG-KN":"png","EG-LX":"png","EG-MNF":"png","EG-MT":"png",
  "EG-SHG":"png","EG-WAD":"png","ET-DD":"png",
  "FI-02":"png","FI-09":"png","FI-10":"png","FI-12":"png","FI-14":"png","FI-19":"png",
  "FR-67":"jpeg",
  "GB-ANS":"png","GB-BFS":"png","GB-BNH":"png","GB-BRD":"png","GB-BUR":"png","GB-DND":"png",
  "GB-HPL":"jpeg","GB-LBC":"png","GB-LCE":"png","GB-NSM":"png","GB-NWP":"jpeg","GB-OLD":"png",
  "GB-RDB":"jpeg","GB-SAW":"png","GB-SHF":"png","GB-SOS":"png","GB-STH":"png","GB-STY":"png",
  "GB-SWA":"jpeg","GB-WGN":"png","GH-TV":"png",
  "GT-02":"jpg","GT-10":"png","GT-14":"png","GT-15":"png","GT-17":"png","GT-19":"png",
  "GW-BS":"png","HN-CM":"png","HN-OL":"jpg","HR-03":"png","HR-05":"png","HR-06":"png",
  "HR-08":"png","HR-10":"png","HR-11":"png","HR-13":"png","HR-19":"png",
  "IQ-AR":"png","IQ-BB":"png","IQ-BG":"png","IQ-DI":"png","IQ-KI":"png","IQ-MU":"png",
  "IQ-NI":"png","IQ-WA":"png",
  "IS-AKU":"png","IS-BOG":"png","IS-BOL":"png","IS-DAB":"png","IS-GRN":"png","IS-GRU":"png",
  "IS-HAF":"png","IS-HRU":"png","IS-HUV":"png","IS-HVA":"png","IS-HVE":"png","IS-ISA":"png",
  "IS-KJO":"png","IS-KOP":"png","IS-MOS":"png","IS-MYR":"png","IS-RGE":"png","IS-SDN":"png",
  "IS-SDV":"png","IS-SNF":"png","IS-SOG":"png","IS-SSS":"png","IS-STR":"png","IS-STY":"png",
  "IS-TAL":"png","IS-THG":"png","IS-VER":"png",
  "IT-AP":"png","IT-BT":"jpeg","IT-MC":"png","IT-RO":"png","IT-VI":"png",
  "JUANA-DIAZ":"jpg","JUBA":"png",
  "KE-01":"png","KE-02":"png","KE-05":"png","KE-06":"png","KE-08":"png","KE-10":"png",
  "KE-12":"png","KE-14":"png","KE-15":"png","KE-17":"png","KE-20":"png","KE-22":"png",
  "KE-25":"png","KE-26":"png","KE-29":"png","KE-35":"png","KE-37":"png","KE-38":"png",
  "KE-39":"png","KE-41":"png","KE-42":"png","KE-43":"png","KE-44":"png","KE-47":"png",
  "KG-J":"png","LES-DORIS-DE-SAINT-PIERRE-ET-MIQUELON":"jpg",
  "LK-1":"png","LK-2":"png","LK-3":"png","LK-5":"png","LK-7":"png","LK-9":"png",
  "LT-05":"png","LT-06":"png","LT-07":"png","LT-11":"png","LT-12":"png","LT-13":"png",
  "LT-14":"png","LT-16":"png","LT-17":"png","LT-18":"png","LT-19":"png","LT-21":"png",
  "LT-22":"png","LT-23":"png","LT-24":"png","LT-26":"png","LT-27":"png","LT-29":"png",
  "LT-30":"png","LT-34":"png","LT-36":"png","LT-41":"png","LT-42":"png","LT-46":"png",
  "LT-48":"png","LT-50":"png","LT-PN":"png","LT-TA":"png","LT-TE":"png",
  "LV-002":"png","LV-007":"png","LV-015":"png","LV-016":"png","LV-026":"png","LV-033":"png",
  "LV-047":"png","LV-054":"png","LV-056":"png","LV-058":"png","LV-067":"png","LV-068":"png",
  "LV-073":"png","LV-087":"jpg","LV-088":"png","LV-089":"png","LV-091":"png","LV-094":"png",
  "LV-099":"png","LV-101":"png","LV-102":"png","LV-DGV":"png",
  "MD-BA":"png","MD-BD":"jpeg","MD-BS":"png","MD-CS":"jpg","MD-DR":"png","MD-TE":"jpg",
  "ME-02":"png","ME-03":"png","ME-04":"png","ME-08":"jpg","ME-11":"png","ME-13":"png",
  "ME-14":"png","ME-21":"png","ME-22":"png","MH-UTI":"png",
  "MK-108":"jpeg","MK-209":"png","MK-310":"png","MK-405":"png","MK-406":"png","MK-813":"png",
  "MM-02":"png","MN-069":"png","MN-073":"png","MX-CMX":"png","MZ-MPM":"png",
  "NG-AD":"jpeg","NG-AN":"png","NG-BA":"png","NG-BE":"png","NG-EB":"png","NG-ED":"png",
  "NG-EN":"png","NG-IM":"png","NG-JI":"png","NG-KD":"png","NG-KE":"png","NG-KN":"png",
  "NG-KO":"png","NG-KW":"jpg","NG-NA":"png","NG-NI":"png","NG-OG":"jpeg","NG-ON":"jpg",
  "NG-PL":"jpg","NG-RI":"png","NG-SO":"png","NG-YO":"png","NG-ZA":"png",
  "PA-NT":"png","PE-SAM":"png","PG-EPW":"png","PG-ESW":"png","PG-GPK":"png","PG-MPL":"png",
  "PG-NPP":"png","PH-15":"png","PH-ABR":"png","PH-AGN":"png","PH-AGS":"png","PH-AKL":"png",
  "PH-ALB":"png","PH-ANT":"png","PH-APA":"png","PH-AUR":"png","PH-BAN":"png","PH-BEN":"png",
  "PH-BIL":"png","PH-BTN":"png","PH-BUL":"png","PH-CAM":"png","PH-CAP":"png","PH-CAS":"png",
  "PH-CAT":"png","PH-CAV":"png","PH-COM":"jpg","PH-DAV":"png","PH-DIN":"png","PH-DVO":"png",
  "PH-EAS":"png","PH-GUI":"png","PH-IFU":"png","PH-ILI":"png","PH-ILN":"png","PH-ILS":"png",
  "PH-KAL":"png","PH-LAG":"png","PH-LAN":"png","PH-LAS":"png","PH-LEY":"png","PH-LUN":"png",
  "PH-MAD":"png","PH-MAS":"png","PH-MDC":"png","PH-MDR":"png","PH-MOU":"png","PH-MSR":"png",
  "PH-NCO":"png","PH-NEC":"png","PH-NER":"png","PH-NSA":"png","PH-NUV":"png","PH-PAM":"png",
  "PH-PLW":"png","PH-QUI":"png","PH-RIZ":"png","PH-ROM":"png","PH-SAR":"png","PH-SCO":"png",
  "PH-SIG":"png","PH-SLE":"png","PH-SOR":"png","PH-SUK":"png","PH-SUR":"png","PH-TAW":"png",
  "PH-ZAN":"png","PH-ZAS":"png","PH-ZMB":"png","PH-ZSI":"png",
  "PT-01":"png","PT-02":"png","PT-03":"png","PT-04":"png","PT-05":"png","PT-06":"png",
  "PT-07":"png","PT-10":"png","PT-12":"png","PT-13":"png","PT-15":"png","PT-17":"png",
  "PW-004":"png","PW-150":"png","PW-212":"png","PW-222":"png","PW-228":"png",
  "PY-2":"jpg","PY-3":"jpg","PY-7":"png","PY-9":"jpg",
  "RO-AG":"png","RO-BV":"png","RO-BZ":"png","RO-CS":"png","RO-CT":"png","RO-HD":"png",
  "RO-IF":"png","RO-MH":"png","RO-MM":"jpg","RO-OT":"png","RO-SB":"png","RO-SM":"png",
  "RO-SV":"png","RO-TM":"png","RUWENG":"png","SABANAGRANDE":"jpg",
  "SB-CE":"png","SB-CH":"png","SB-GU":"png","SB-IS":"png","SB-MK":"png","SB-WE":"png",
  "SD-DC":"png","SD-DE":"png","SD-DN":"png","SD-DS":"png","SD-DW":"png","SD-GD":"png",
  "SD-GK":"png","SD-GZ":"png","SD-KA":"png","SD-KH":"png","SD-KS":"png","SD-NB":"png",
  "SD-NO":"png","SD-NR":"png","SD-NW":"png","SD-RS":"png","SD-SI":"png",
  "SO-GE":"png","SS-BN":"png","SS-BW":"png","SS-EC":"png","SS-EE":"png","SS-EW":"png",
  "SS-JG":"png","SS-LK":"png","SS-NU":"png","SS-UY":"png","SS-WR":"png",
  "SV-AH":"png","SV-CU":"png","SV-PA":"jpg","SV-SM":"png","SV-SO":"png","SV-SS":"png",
  "TH-16":"png","TH-17":"png","TH-23":"png","TH-24":"png","TH-30":"png","TH-31":"png",
  "TH-32":"png","TH-36":"png","TH-37":"png","TH-38":"png","TH-39":"png","TH-40":"png",
  "TH-44":"png","TH-49":"png","TH-52":"png","TH-60":"png","TH-66":"png",
  "TH-72":"png","TH-75":"png","TH-86":"png","TH-91":"png","TH-95":"png","TH-S":"png",
  "TT-ARI":"png","TT-CHA":"png","TT-CTT":"png","TT-DMN":"png","TT-MRC":"png","TT-PRT":"png",
  "UY-FD":"png","UY-FS":"png","UY-MA":"png","UY-MO":"png","UY-RV":"png","UY-TA":"png",
  "VANNES-SEMAINE-DU-GOLFE-2015-2":"jpg","YAUCO-THROUGH-2004":"gif",
  "ZA-EC":"png","ZA-FS":"png","ZA-GP":"png","ZA-KZN":"png","ZA-LP":"png","ZA-NC":"png",
  "ZA-NW":"png","ZA-WC":"png","ZM-08":"png","ZM-09":"png",
};

const SUB_CODES = [
  "1868-LARES-REVOLUTIONAY","AD-02","AD-03","AD-04","AD-05","AD-06","AD-07","AD-08",
  "ADJUNTAS-PUERTO-RICO","AE-AJ","AE-AZ","AE-DU","AE-FU","AE-RK","AE-SH","AE-UQ",
  "AG-10","AGUADA-PR","AGUAS-BUENAS","AL-01","AL-02","AL-03","AL-04","AL-05","AL-06",
  "AL-07","AL-08","AL-09","AL-10","AL-11","AL-12","ALAVA","AM-ER","ANASCO","AO-CAB",
  "AR-A","AR-B","AR-C","AR-D","AR-E","AR-F","AR-G","AR-H","AR-J","AR-K","AR-L","AR-M",
  "AR-N","AR-P","AR-Q","AR-R","AR-S","AR-T","AR-U","AR-V","AR-W","AR-X","AR-Y","AR-Z",
  "AT-1","AT-2","AT-3","AT-4","AT-5","AT-6","AT-7","AT-8","AT-9",
  "AU-ACT","AU-NSW","AU-NT","AU-QLD","AU-SA","AU-TAS","AU-VIC","AU-WA",
  "AZ-BA","AZ-SM","AZ-YE","BA-BRC","BA-SRP",
  "BANDERA-DE-AGUADILLA-PUERTO-RICO","BANDERA-DE-AIBONITO-PUERTO-RICO","BANDERA-DE-ARECIBO-PUERTO-RICO",
  "BANDERA-DE-CANOVANAS-PUERTO-RICO","BANDERA-DE-CIDRA-PUERTO-RICO",
  "BANDERA-DE-LA-PROVINCIA-BIOKO-DEL-NORTE","BANDERA-DE-LA-PROVINCIA-BIOKO-DEL-SUR",
  "BANDERA-DE-LA-PROVINCIA-CENTRO-SUR","BANDERA-DE-LA-PROVINCIA-KIE-NTEM",
  "BANDERA-DE-LA-PROVINCIA-LITORAL","BANDERA-DE-LA-PROVINCIA-WELE-NZAS",
  "BANDERA-DE-LUQUILLO","BANDERA-DE-MOROVIS-PUERTO-RICO","BANDERA-DE-NAGUABO-PUERTO-RICO",
  "BANDERA-DE-NAVARRA","BANDERA-DE-SAN-GERMAN","BANDERA-DE-VIZCAYA",
  "BANDERA-DE-YAUCO-PUERTO-RICO","BANDERA-PENUELAS",
  "BARCELONETA-PUERTO-RICO","BARRANQUITAS","BASQUE-COUNTRY","BAYAMON",
  "BE-BRU","BE-VAN","BE-VBR","BE-VLG","BE-VLI","BE-VOV","BE-VWV","BE-WAL","BE-WBR",
  "BE-WHT","BE-WLG","BE-WLX","BE-WNA","BEQUIA","BG-23","BH-13","BH-14","BH-15","BH-17",
  "BO-B","BO-C","BO-H","BO-L","BO-N","BO-O","BO-P","BO-S","BO-T",
  "BQ-BO","BQ-SA","BQ-SE",
  "BR-AC","BR-AL","BR-AM","BR-AP","BR-BA","BR-CE","BR-DF","BR-ES","BR-GO","BR-MA",
  "BR-MG","BR-MS","BR-MT","BR-PA","BR-PB","BR-PE","BR-PI","BR-PR","BR-RJ","BR-RN",
  "BR-RO","BR-RR","BR-RS","BR-SC","BR-SE","BR-SP","BR-TO","BUBI-TRIBAL",
  "BW-GA","BY-BR","BY-HM","BY-HO","BY-HR","BY-MA","BY-MI","BY-VI","BZ-BZ",
  "CA-AB","CA-BC","CA-MB","CA-NB","CA-NL","CA-NS","CA-NT","CA-NU","CA-ON","CA-PE",
  "CA-QC","CA-SK","CA-YT",
  "CABO-ROJO","CAGUAS","CAMUYFLAG","CAROLINA-PUERTO-RICO","CATANO-PUERTO-RICO","CAYEY",
  "CH-AR","CH-BE","CH-BL","CH-BS","CH-FR","CH-GE","CH-GL","CH-GR","CH-JU","CH-LU",
  "CH-NE","CH-NW","CH-OW","CH-SG","CH-SH","CH-SO","CH-SZ","CH-TG","CH-TI","CH-UR",
  "CH-VD","CH-VS","CH-ZG","CH-ZH","CI-AB","CIALES","CIENFUEGOS-PROVINCEPROPOSAL",
  "CITY-OF-HAVANA","CL-AI","CL-AN","CL-AP","CL-AR","CL-AT","CL-BI","CL-CO","CL-LI",
  "CL-LL","CL-LR","CL-MA","CL-ML","CL-NB","CL-RM","CL-TA","CL-VS",
  "CN-HK","CN-MO","CN-TW",
  "CO-AMA","CO-ANT","CO-ARA","CO-ATL","CO-BOL","CO-BOY","CO-CAL","CO-CAQ","CO-CAS",
  "CO-CAU","CO-CES","CO-CHO","CO-COR","CO-CUN","CO-DC","CO-GUA","CO-GUV","CO-HUI",
  "CO-LAG","CO-MAG","CO-MET","CO-NAR","CO-NSA","CO-PUT","CO-QUI","CO-RIS","CO-SAN",
  "CO-SAP","CO-SUC","CO-TOL","CO-VAC","CO-VAU","CO-VID",
  "COAMO","COMERIO","COROZAL",
  "CR-A","CR-C","CR-G","CR-H","CR-L","CR-P","CR-SJ","CRYSTAL-LOCALE",
  "CU-01","CU-03","CU-06","CU-07","CU-08","CU-09","CU-10","CU-11","CU-12","CU-13",
  "CU-14","CU-15","CU-16","CU-99","CULEBRA-PUERTO-RICO",
  "CV-MO","CV-PR","CV-RB","CV-SM","CY-01",
  "CZ-10","CZ-20","CZ-31","CZ-32","CZ-41","CZ-42","CZ-51","CZ-52","CZ-53","CZ-63",
  "CZ-64","CZ-71","CZ-72","CZ-80",
  "DE-BB","DE-BE","DE-BW","DE-BY","DE-HB","DE-HE","DE-HH","DE-MV","DE-NI","DE-NW",
  "DE-RP","DE-SH","DE-SL","DE-SN","DE-ST","DE-TH","DJ-DJ",
  "DK-81","DK-82","DK-83","DK-84","DK-85",
  "DO-01","DO-02","DO-04","DO-05","DO-07","DO-08","DO-09","DO-10","DO-12","DO-13",
  "DO-15","DO-18","DO-20","DO-22","DO-23","DO-24","DO-25","DO-27","DO-28","DO-31",
  "DO-32","DORADOFLAG","DRAPEAU-PROPOSE-POUR-LES-PYRENEES-ATLANTIQUES",
  "EC-A","EC-B","EC-C","EC-D","EC-E","EC-F","EC-G","EC-H","EC-I","EC-L","EC-M",
  "EC-N","EC-O","EC-P","EC-R","EC-S","EC-SD","EC-SE","EC-T","EC-U","EC-W","EC-X",
  "EC-Y","EC-Z",
  "EE-130","EE-142","EE-171","EE-184","EE-191","EE-198","EE-205","EE-214","EE-245",
  "EE-247","EE-251","EE-255","EE-272","EE-283","EE-284","EE-291","EE-293","EE-296",
  "EE-303","EE-305","EE-317","EE-321","EE-338","EE-353","EE-37","EE-39","EE-424",
  "EE-430","EE-431","EE-432","EE-441","EE-442","EE-446","EE-45","EE-478","EE-480",
  "EE-486","EE-50","EE-503","EE-511","EE-514","EE-52","EE-528","EE-557","EE-56",
  "EE-567","EE-586","EE-60","EE-615","EE-618","EE-622","EE-624","EE-638","EE-64",
  "EE-651","EE-653","EE-661","EE-663","EE-668","EE-68","EE-689","EE-698","EE-708",
  "EE-71","EE-712","EE-714","EE-719","EE-726","EE-732","EE-735","EE-74","EE-784",
  "EE-79","EE-792","EE-793","EE-796","EE-803","EE-809","EE-81","EE-824","EE-834",
  "EE-84","EE-855","EE-87","EE-890","EE-897","EE-899","EE-901","EE-903","EE-907",
  "EE-917","EE-919","EE-928",
  "EG-ALX","EG-ASN","EG-AST","EG-BA","EG-BH","EG-BNS","EG-C","EG-DK","EG-DT",
  "EG-FYM","EG-GH","EG-GZ","EG-IS","EG-JS","EG-KB","EG-KFS","EG-KN","EG-LX",
  "EG-MNF","EG-MT","EG-PTS","EG-SHG","EG-SHR","EG-SIN","EG-SUZ","EG-WAD",
  "ES-A","ES-AB","ES-AL","ES-AN","ES-AR","ES-AS","ES-AV","ES-B","ES-BA","ES-BI",
  "ES-BU","ES-CA","ES-CB","ES-CC","ES-CE","ES-CL","ES-CM","ES-CN","ES-CO","ES-CR",
  "ES-CS","ES-CT","ES-CU","ES-EX","ES-GA","ES-GC","ES-GI","ES-GR","ES-GU","ES-H",
  "ES-HU","ES-IB","ES-J","ES-L","ES-LE","ES-LO","ES-LU","ES-M","ES-MA","ES-MC",
  "ES-MD","ES-ML","ES-MU","ES-NA","ES-NC","ES-O","ES-OR","ES-P","ES-PM","ES-PO",
  "ES-PV","ES-RI","ES-S","ES-SA","ES-SE","ES-SG","ES-SO","ES-SS","ES-T","ES-TE",
  "ES-TF","ES-TO","ES-V","ES-VA","ES-VC","ES-VI","ES-Z","ES-ZA",
  "ESTONIA","ESTUAIRE-PROVINCE-GABON",
  "ET-AA","ET-AF","ET-AM","ET-BE","ET-DD","ET-GA","ET-HA","ET-HARJU-MAAKOND","ET-OR",
  "ET-SI","ET-SN","ET-SO","ET-TI",
  "FAJARDO","FI-01","FI-02","FI-03","FI-04","FI-05","FI-06","FI-07","FI-08","FI-09",
  "FI-10","FI-11","FI-12","FI-13","FI-14","FI-15","FI-16","FI-17","FI-18","FI-19",
  "FLORIDA-PUERTO-RICO","FM-KSA","FM-PNI","FM-TRK","FM-YAP",
  "FORMER-LA-HABANA-1976-2010","FORMER-LA-HABANA-PROVINCE-1976---2010",
  "FORMER-LA-HABANA-PROVINCE-1976-2010",
  "FR-01","FR-02","FR-03","FR-04","FR-05","FR-06","FR-07","FR-08","FR-09","FR-10",
  "FR-11","FR-12","FR-13","FR-14","FR-15","FR-16","FR-17","FR-18","FR-19","FR-20R",
  "FR-21","FR-22","FR-23","FR-24","FR-25","FR-26","FR-27","FR-28","FR-29","FR-2A",
  "FR-2B","FR-30","FR-32","FR-33","FR-34","FR-35","FR-36","FR-37","FR-38","FR-39",
  "FR-40","FR-41","FR-42","FR-43","FR-44","FR-45","FR-46","FR-47","FR-48","FR-49",
  "FR-50","FR-51","FR-52","FR-53","FR-54","FR-55","FR-56","FR-57","FR-58","FR-59",
  "FR-60","FR-61","FR-62","FR-63","FR-64","FR-65","FR-66","FR-67","FR-68","FR-69",
  "FR-6AE","FR-70","FR-71","FR-72","FR-73","FR-74","FR-75C","FR-76","FR-77","FR-78",
  "FR-79","FR-80","FR-81","FR-82","FR-83","FR-84","FR-85","FR-86","FR-87","FR-88",
  "FR-89","FR-90","FR-91","FR-92","FR-93","FR-94","FR-95","FR-971","FR-972","FR-973",
  "FR-974","FR-976","FR-ARA","FR-BFC","FR-BL","FR-BRE","FR-CP","FR-CVL","FR-GES",
  "FR-HDF","FR-IDF","FR-MF","FR-NAQ","FR-NC","FR-NOR","FR-OCC","FR-PAC","FR-PDL",
  "FR-PF","FR-PM","FR-TF","FR-WF","FRANCE",
  "GA-1","GA-2","GA-3","GA-4","GA-6","GA-7","GA-8","GA-9",
  "GB-ABE","GB-AGB","GB-AGY","GB-ANS","GB-BBD","GB-BDF","GB-BDG","GB-BEN","GB-BEX",
  "GB-BFS","GB-BRY","GB-BST","GB-BUR","GB-CAM","GB-CBF","GB-CGN","GB-CHE","GB-CHW",
  "GB-CLK","GB-CMA","GB-CMD","GB-CMN","GB-CON","GB-COV","GB-CRF","GB-CRY","GB-DBY",
  "GB-DEN","GB-DEV","GB-DGY","GB-DND","GB-DOR","GB-DUR","GB-EAL","GB-EDH","GB-EDU",
  "GB-ELN","GB-ENF","GB-ENG","GB-ERW","GB-ERY","GB-ESS","GB-ESX","GB-FAL","GB-FIF",
  "GB-FLN","GB-GLG","GB-GLS","GB-GWN","GB-HAM","GB-HAV","GB-HCK","GB-HEF","GB-HIL",
  "GB-HLD","GB-HMF","GB-HNS","GB-HPL","GB-HRT","GB-HRW","GB-HRY","GB-IOS","GB-IOW",
  "GB-ISL","GB-IVC","GB-KEC","GB-KEN","GB-KHL","GB-KTT","GB-LAN","GB-LBC","GB-LBH",
  "GB-LCE","GB-LDS","GB-LEC","GB-LEW","GB-LIN","GB-LIV","GB-LND","GB-MAN","GB-MDB",
  "GB-MDW","GB-MLN","GB-MON","GB-MRT","GB-MRY","GB-NBL","GB-NEL","GB-NET","GB-NFK",
  "GB-NGM","GB-NIR","GB-NSM","GB-NTH","GB-NTT","GB-NWM","GB-NWP","GB-NYK","GB-OLD",
  "GB-ORK","GB-OXF","GB-PEM","GB-PKN","GB-PLY","GB-POR","GB-POW","GB-RCC","GB-RCT",
  "GB-RDB","GB-RFW","GB-RIC","GB-RUT","GB-SAW","GB-SCB","GB-SCT","GB-SFK","GB-SHF",
  "GB-SHN","GB-SHR","GB-STS","GB-STY","GB-SWA","GB-SWK","GB-TAM","GB-TOF","GB-TWH",
  "GB-VGL","GB-WAR","GB-WBK","GB-WFT","GB-WGN","GB-WIL","GB-WLS","GB-WLV","GB-WND",
  "GB-WNM","GB-WOR","GB-WSM","GB-WSX","GB-YOR","GB-ZET",
  "GE-AB","GE-AJ","GE-TB",
  "GH-AA","GH-AF","GH-AH","GH-EP","GH-TV",
  "GL-AV","GL-KU","GL-QE","GL-SM",
  "GM-B","GQ-AN","GQ-C","GQ-DJ","GR-M",
  "GT-01","GT-02","GT-03","GT-14","GT-15","GT-16","GT-17","GT-19","GT-21",
  "GUAYANILLA","GUAYNABO","GUIPUZCOA","GURABO","GW-BS",
  "HATILLO-PUERTO-RICO","HAUT-OGOOUE-PROVINCE-GABON",
  "HN-CM","HN-CP","HN-FM","HN-OC","HN-OL","HN-SB",
  "HOLGUIN-PROVINCEPROPOSAL","HOLGUINPROPOSAL","HORMIGUEROSFLAG",
  "HR-01","HR-02","HR-03","HR-04","HR-05","HR-06","HR-08","HR-09","HR-10","HR-11",
  "HR-12","HR-13","HR-14","HR-15","HR-16","HR-17","HR-18","HR-19","HR-20","HR-21",
  "HU-BA","HU-BC","HU-BE","HU-BK","HU-BU","HU-BZ","HU-CS","HU-DE","HU-DU","HU-EG",
  "HU-ER","HU-FE","HU-GS","HU-GY","HU-HB","HU-HE","HU-HV","HU-JN","HU-KE","HU-KM",
  "HU-KV","HU-MI","HU-NK","HU-NO","HU-NY","HU-PE","HU-PS","HU-SD","HU-SF","HU-SH",
  "HU-SK","HU-SN","HU-SO","HU-SS","HU-ST","HU-SZ","HU-TB","HU-TO","HU-VA","HU-VE",
  "HU-VM","HU-ZA","HU-ZE","HUMACAO",
  "ID-AC","ID-BA","ID-BB","ID-BE","ID-BT","ID-GO","ID-JA","ID-JB","ID-JI","ID-JK",
  "ID-JT","ID-KB","ID-KI","ID-KR","ID-KS","ID-KT","ID-KU","ID-LA","ID-MA","ID-MU",
  "ID-NB","ID-NT","ID-PA","ID-PB","ID-RI","ID-SA","ID-SB","ID-SG","ID-SN","ID-SR",
  "ID-SS","ID-ST","ID-SU","ID-YO","IE-C","IN-HP","IN-HR","IN-MH",
  "IS-BOL","IS-DAB","IS-DAV","IS-EYF","IS-FJD","IS-GAR","IS-GRN","IS-GRU","IS-HAF",
  "IS-HRU","IS-HUV","IS-HVA","IS-HVE","IS-ISA","IS-KJO","IS-KOP","IS-MOS","IS-MYR",
  "IS-RGE","IS-RHH","IS-RKN","IS-RKV","IS-SDN","IS-SDV","IS-SEL","IS-SKO",
  "IT-21","IT-23","IT-25","IT-32","IT-34","IT-36","IT-42","IT-45","IT-52","IT-55",
  "IT-57","IT-62","IT-65","IT-67","IT-72","IT-75","IT-77","IT-78","IT-82","IT-88",
  "IT-AG","IT-AL","IT-AN","IT-AP","IT-AQ","IT-AR","IT-AT","IT-AV","IT-BA","IT-BG",
  "IT-CE","IT-CH","IT-CL","IT-CN","IT-CO","IT-CR","IT-CT","IT-CZ","IT-FC","IT-FE",
  "IT-FG","IT-FI","IT-FR","IT-GO","IT-GR","IT-IM","IT-IS","IT-KR","IT-LC","IT-LE",
  "IT-LI","IT-LO","IT-LT","IT-LU","IT-MB","IT-MC","IT-ME","IT-MI","IT-MN","IT-MO",
  "IT-MS","IT-MT","IT-NA","IT-NO","IT-OR","IT-PA","IT-PC","IT-PD","IT-PE","IT-PG",
  "IT-PI","IT-PN","IT-PO","IT-PR","IT-PT","IT-PU","IT-PV","IT-PZ","IT-RA","IT-RC",
  "IT-RE","IT-RG","IT-RI","IT-RM","IT-RN","IT-RO","IT-SA","IT-SI","IT-SO","IT-SP",
  "IT-SR","IT-SS","IT-SV","IT-TA","IT-TE","IT-TN","IT-TO","IT-TP","IT-TR","IT-TS",
  "IT-TV","IT-UD","IT-VA","IT-VB","IT-VC","IT-VE","IT-VI","IT-VR","IT-VT","IT-VV",
  "JAYUYA",
  "JP-01","JP-02","JP-03","JP-04","JP-05","JP-06","JP-07","JP-08","JP-09","JP-10",
  "JP-11","JP-12","JP-13","JP-14","JP-15","JP-16","JP-17","JP-18","JP-19","JP-20",
  "JP-21","JP-22","JP-23","JP-24","JP-25","JP-26","JP-27","JP-28","JP-29","JP-30",
  "JP-31","JP-32","JP-33","JP-34","JP-35","JP-36","JP-37","JP-38","JP-39","JP-40",
  "JP-41","JP-42","JP-43","JP-44","JP-45","JP-46","JP-47",
  "JUANA-DIAZ","JUBA","JUNCOS",
  "KE-01","KE-02","KE-04","KE-05","KE-06","KE-17","KE-19","KE-20","KE-22","KE-24",
  "KE-25","KE-26","KE-37","KE-38","KE-39","KE-41","KE-42","KE-43","KE-44","KE-45",
  "KE-46","KE-47","KG-B","KG-C","KG-GB","KG-GO","KG-J","KG-N","KG-O","KG-T","KG-Y",
  "KR-27","KR-28","KR-29","KR-30","KR-31","KR-41","KR-42","KR-43","KR-44","KR-45",
  "KR-46","KR-47","KR-48","KR-49","KR-50",
  "KZ-ALA","KZ-AST",
  "LI-04","LI-05","LI-06","LI-07","LI-08","LI-09","LI-10","LI-11",
  "LK-1","LK-2","LR-BM","LR-CM","LR-GB","LR-GG","LR-GK","LR-GP","LR-LO","LR-MG",
  "LR-MO","LR-MY","LR-NI","LR-RG","LR-RI","LR-SI",
  "LT-01","LT-04","LT-05","LT-06","LT-07","LT-08","LT-09","LT-10","LT-11","LT-12",
  "LT-13","LT-14","LT-15","LT-16","LT-17","LT-18","LT-19","LT-20","LT-21","LT-22",
  "LT-23","LT-24","LT-25","LT-26","LT-27","LT-28","LT-29","LT-30","LT-32","LT-33",
  "LT-34","LT-35","LT-36","LT-37","LT-40","LT-41","LT-42","LT-43","LT-44","LT-45",
  "LT-46","LT-47","LT-48","LT-49","LT-50","LT-51","LT-52","LT-53","LT-54","LT-55",
  "LT-56","LT-57","LT-58","LT-59","LT-60","LT-AL","LT-KL","LT-KU","LT-MR","LT-PN",
  "LT-SA","LT-TA","LT-TE","LT-UT","LT-VL",
  "LV-016","LV-022","LV-026","LV-033","LV-041","LV-042","LV-047","LV-050","LV-052",
  "LV-054","LV-056","LV-058","LV-059","LV-062","LV-067","LV-068","LV-073","LV-077",
  "LV-080","LV-087","LV-088","LV-089","LV-091","LV-094","LV-097","LV-099","LV-101",
  "LV-102","LV-106","LV-113","LV-DGV","LV-JEL","LV-JUR","LV-LPX","LV-REZ","LV-RIX",
  "LV-VEN",
  "ME-06","ME-08","ME-11","ME-13","ME-14","ME-15","ME-16","ME-17","ME-18","ME-19",
  "ME-20","ME-21","ME-22","ME-24",
  "MH-ALK","MH-EBO","MH-KIL","MH-KWA","MH-MAJ","MH-NMK","MH-UJA","MH-UTI","MH-WTH",
  "MIQUELON-LANGLADE",
  "MK-101","MK-103","MK-104","MK-105","MK-106","MK-107","MK-108","MK-109","MK-201",
  "MK-202","MK-203","MK-204","MK-205","MK-206","MK-207","MK-208","MK-209","MK-210",
  "MK-211","MK-301","MK-303","MK-304","MK-307","MK-308","MK-310","MK-311","MK-312",
  "MK-313","MK-401","MK-402","MK-403","MK-404","MK-405","MK-406","MK-407","MK-408",
  "MK-409","MK-410","MK-501","MK-502","MK-503","MK-504","MK-505","MK-506","MK-507",
  "MK-508","MK-509","MK-601","MK-602","MK-603","MK-604","MK-605","MK-606","MK-607",
  "MK-608","MK-609","MK-701","MK-702","MK-703","MK-704","MK-705","MK-706","MK-801",
  "MK-802","MK-803","MK-804","MK-805","MK-806","MK-807","MK-808","MK-809","MK-810",
  "MK-811","MK-812","MK-813","MK-814","MK-815","MK-817",
  "MM-01","MM-02","MM-03","MM-04","MM-05","MM-06","MM-07","MM-11","MM-12","MM-13",
  "MM-14","MM-15","MM-16","MM-17","MM-18",
  "MN-035","MN-037","MN-039","MN-041","MN-043","MN-046","MN-047","MN-049","MN-051",
  "MN-053","MN-055","MN-057","MN-059","MN-061","MN-063","MN-064","MN-065","MN-067",
  "MN-069","MN-071","MN-073","MN-1",
  "MOCA","MOYEN-OGOOUE-PROVINCE-GABON",
  "MT-01","MT-02","MT-03","MT-04","MT-06","MT-07","MT-08","MT-09","MT-10","MT-11",
  "MT-12","MT-13","MT-14","MT-15","MT-16","MT-17","MT-18","MT-19","MT-20","MT-31",
  "MT-32","MT-33","MT-34","MT-35","MT-36","MT-37","MT-38","MT-40","MT-41","MT-42",
  "MT-43","MT-44","MT-45","MT-46","MT-47","MT-48","MT-49","MT-50","MT-51","MT-52",
  "MT-53","MT-54","MT-55","MT-56","MT-57","MT-58","MT-59","MT-60","MT-61","MT-62",
  "MT-63","MT-64","MT-65","MT-66","MT-67","MT-68",
  "MU-PL","MU-RO",
  "MX-AGU","MX-BCN","MX-BCS","MX-CAM","MX-CHH","MX-CHP","MX-CMX","MX-COA","MX-COL",
  "MX-DUR","MX-GRO","MX-GUA","MX-HID","MX-JAL","MX-MEX","MX-MIC","MX-MOR","MX-NAY",
  "MX-NLE","MX-OAX","MX-PUE","MX-QUE","MX-ROO","MX-SIN","MX-SLP","MX-SON","MX-TAB",
  "MX-TAM","MX-TLA","MX-VER","MX-YUC","MX-ZAC",
  "MY-01","MY-02","MY-03","MY-04","MY-05","MY-06","MY-07","MY-08","MY-09","MY-10",
  "MY-11","MY-12","MY-13","MY-14","MY-15","MY-16","MZ-MPM",
  "NARANJITO-PUERTO-RICO",
  "NG-AD","NG-AK","NG-AN","NG-BA","NG-BE","NG-BY","NG-EB","NG-ED","NG-EN","NG-FC",
  "NG-GO","NG-IM","NG-JI","NG-KD","NG-KE","NG-KN","NG-KO","NG-KT","NG-KW","NG-LA",
  "NG-NA","NG-NI","NG-OG","NG-ON","NG-OS","NG-OY","NG-PL","NG-RI","NG-SO","NG-TA",
  "NG-YO","NG-ZA","NGOUNIE-PROVINCE-GABON",
  "NI-AN","NI-AS","NI-BO","NI-CA","NI-CI","NI-CO","NI-ES","NI-GR","NI-LE","NI-MD",
  "NI-MN","NI-MS","NI-MT","NI-NS","NI-RI","NI-SJ",
  "NL-AW","NL-BQ1","NL-BQ2","NL-BQ3","NL-CW","NL-DR","NL-FL","NL-FR","NL-GE","NL-GR",
  "NL-NB","NL-NH","NL-OV","NL-SX","NL-UT","NL-ZE","NL-ZH",
  "NO-03","NO-15","NO-18",
  "PA-1","PA-10","PA-2","PA-3","PA-4","PA-5","PA-6","PA-7","PA-9","PA-EM","PA-KY",
  "PA-NB","PA-NT","PALAU","PATILLAS",
  "PE-AMA","PE-ANC","PE-APU","PE-ARE","PE-AYA","PE-CAJ","PE-CAL","PE-CUS","PE-HUC",
  "PE-HUV","PE-ICA","PE-JUN","PE-LAL","PE-LAM","PE-LIM","PE-LMA","PE-LOR","PE-MDD",
  "PE-MOQ","PE-PAS","PE-PIU","PE-PUN","PE-SAM","PE-TAC","PE-TUM","PE-UCA","PETSERIMAA",
  "PG-CPK","PG-CPM","PG-EBR","PG-EHG","PG-EPW","PG-ESW","PG-GPK","PG-HLA","PG-JWK",
  "PG-MBA","PG-MPL","PG-MPM","PG-MRL","PG-NCD","PG-NIK","PG-NPP","PG-NSB","PG-SAN",
  "PG-SHM","PG-WBK","PG-WHM","PG-WPD",
  "PH-14","PH-15","PH-ABR","PH-AGN","PH-AGS","PH-AKL","PH-ALB","PH-ANT","PH-APA",
  "PH-AUR","PH-BAN","PH-BAS","PH-BEN","PH-BIL","PH-BOH","PH-CAV","PH-CEB","PH-COM",
  "PH-DAO","PH-DAV","PH-DIN","PH-DVO","PH-EAS","PH-GUI","PH-IFU","PH-ILI","PH-ILN",
  "PH-ILS","PH-ISA","PH-KAL","PH-LAG","PH-LAN","PH-LAS","PH-LEY","PH-LUN","PH-MAD",
  "PH-MAS","PH-MDC","PH-MDR","PH-MOU","PH-MSC","PH-MSR","PH-NCO","PH-NEC","PH-NER",
  "PH-NSA","PH-NUV","PH-PAM","PH-PAN","PH-PLW","PH-QUE","PH-QUI","PH-RIZ","PH-ROM",
  "PH-SAR","PH-SCO","PH-SIG","PH-SLE","PH-SLU","PH-SOR","PH-SUK","PH-SUN","PH-SUR",
  "PH-TAR","PH-TAW","PH-ZAN","PH-ZAS","PH-ZMB","PH-ZSI",
  "PINAR-DEL-RIO-PROVINCEPROPOSAL",
  "PK-BA","PK-GB","PK-JK","PK-KP","PK-PB","PK-SD",
  "PL-02","PL-04","PL-06","PL-08","PL-10","PL-12","PL-14","PL-16","PL-18","PL-20",
  "PL-22","PL-24","PL-26","PL-28","PL-30","PL-32",
  "PT-01","PT-02","PT-03","PT-04","PT-05","PT-06","PT-07","PT-08","PT-20","PT-30",
  "PW-002","PW-004","PW-010","PW-050","PW-100","PW-150","PW-212","PW-214","PW-218",
  "PW-222","PW-224","PW-226","PW-227","PW-228","PW-350","PW-370",
  "PY-1","PY-10","PY-11","PY-12","PY-13","PY-14","PY-15","PY-16","PY-19","PY-2",
  "PY-3","PY-4","PY-5","PY-6","PY-7","PY-8","PY-9","PY-ASU",
  "QUEBRADILLAS","RINCON","RIO-GRANDE-PUERTO-RICO",
  "RO-AB","RO-AG","RO-AR","RO-B","RO-BC","RO-BH","RO-BN","RO-BR","RO-BT","RO-BV",
  "RO-BZ","RO-CJ","RO-CL","RO-CS","RO-CT","RO-CV","RO-DB","RO-DJ","RO-GJ","RO-GL",
  "RO-GR","RO-HD","RO-HR","RO-IF","RO-IL","RO-IS","RO-MH","RO-MM","RO-MS","RO-NT",
  "RO-OT","RO-PH","RO-SB","RO-SJ","RO-SM","RO-SV","RO-TL","RO-TM","RO-TR","RO-VL",
  "RO-VN","RO-VS","ROTUMA-1987-1988",
  "RS-OO","RS-VO",
  "RU-AD","RU-AL","RU-ALT","RU-AMU","RU-ARK","RU-AST","RU-BA","RU-BEL","RU-BRY",
  "RU-BU","RU-CE","RU-CHE","RU-CHU","RU-CU","RU-DA","RU-IN","RU-IRK","RU-IVA",
  "RU-KAM","RU-KB","RU-KC","RU-KDA","RU-KEM","RU-KGD","RU-KGN","RU-KHA","RU-KHM",
  "RU-KIR","RU-KK","RU-KL","RU-KLU","RU-KO","RU-KOS","RU-KR","RU-KRS","RU-KYA",
  "RU-LEN","RU-LIP","RU-MAG","RU-ME","RU-MO","RU-MUR","RU-NEN","RU-NGR","RU-NIZ",
  "RU-NVS","RU-OMS","RU-ORE","RU-PER","RU-PNZ","RU-PRI","RU-PSK","RU-ROS","RU-RYA",
  "RU-SA","RU-SAK","RU-SAM","RU-SAR","RU-SE","RU-SMO","RU-SPE","RU-STA","RU-SVE",
  "RU-TA","RU-TAM","RU-TOM","RU-TUL","RU-TVE","RU-TY","RU-TYU","RU-UD","RU-ULY",
  "RU-VGG","RU-VLA","RU-VLG","RU-VOR","RU-YAN","RU-YAR","RU-YEV","RU-ZAB",
  "RUWENG","SABANAGRANDE","SAINT-PIERRE-AND-MIQUELON","SALINAS-PUERTO-RICO",
  "SAN-JUAN-PUERTO-RICO","SAN-LORENZO","SAN-SEBASTIAN-PUERTO-RICO","SANKURU-PROVINCE",
  "SANTA-ISABEL",
  "SB-CE","SB-CH","SB-CT","SB-GU","SB-IS","SB-MK","SB-ML","SB-RB","SB-TE","SB-WE",
  "SD-DE","SD-DN","SD-DS","SD-DW","SD-GD","SD-GK","SD-GZ","SD-KA","SD-KH","SD-KN",
  "SD-KS","SD-NB","SD-NO","SD-NR","SD-NW","SD-RS","SD-SI",
  "SE-AB","SE-AC","SE-BD","SE-C","SE-D","SE-E","SE-F","SE-G","SE-H","SE-I","SE-K",
  "SE-M","SE-N","SE-O","SE-S","SE-T","SE-U","SE-W","SE-X","SE-Y","SE-Z",
  "SI-026","SI-027","SI-029","SI-030","SI-032","SI-033","SI-034","SI-036","SI-040",
  "SI-041","SI-043","SI-096","SI-099","SI-104","SI-106","SI-108","SI-109","SI-147",
  "SI-150","SI-151","SI-167","SI-168","SI-172","SI-187","SI-192",
  "SK-KI","SK-NI","SK-PV","SK-TA","SK-TC","SK-ZI",
  "SM-01","SM-02","SM-03","SM-04","SM-05","SM-06","SM-07","SM-08","SM-09",
  "SO-BK","SO-BN","SO-BR","SO-BY","SO-GE","SO-SH",
  "SS-BN","SS-BW","SS-EC","SS-EE","SS-EW","SS-JG","SS-LK","SS-NU","SS-UY","SS-WR",
  "ST-P",
  "SV-AH","SV-CA","SV-CH","SV-CU","SV-LI","SV-MO","SV-PA","SV-SA","SV-SM","SV-SO",
  "SV-SS","SV-SV","SV-UN","SV-US",
  "TH-10","TH-11","TH-12","TH-13","TH-14","TH-15","TH-16","TH-17","TH-18","TH-19",
  "TH-20","TH-21","TH-22","TH-23","TH-24","TH-25","TH-26","TH-27","TH-30","TH-31",
  "TH-32","TH-33","TH-34","TH-35","TH-36","TH-37","TH-38","TH-39","TH-40","TH-41",
  "TH-42","TH-43","TH-44","TH-45","TH-46","TH-47","TH-48","TH-49","TH-50","TH-51",
  "TH-52","TH-53","TH-54","TH-55","TH-56","TH-57","TH-58","TH-60","TH-61","TH-62",
  "TH-63","TH-64","TH-65","TH-66","TH-67","TH-70","TH-71","TH-72","TH-73","TH-74",
  "TH-75","TH-76","TH-77","TH-80","TH-81","TH-82","TH-83","TH-84","TH-85","TH-86",
  "TH-90","TH-91","TH-92","TH-93","TH-94","TH-95","TH-96","TH-S",
  "TL-AL","TL-AN","TL-BO","TL-DI","TL-LA","TL-MT","TL-VI",
  "TT-CTT","TT-DMN","TT-MRC","TT-PRT",
  "TW-CHA","TW-CYI","TW-CYQ","TW-HSQ","TW-HSZ","TW-HUA","TW-ILA","TW-KEE","TW-KHH",
  "TW-KIN","TW-LIE","TW-MIA","TW-NAN","TW-NWT","TW-PEN","TW-PIF","TW-TAO","TW-TNN",
  "TW-TPE","TW-TTT","TW-TXG","TW-YUN",
  "UA-05","UA-07","UA-09","UA-12","UA-14","UA-18","UA-21","UA-23","UA-26","UA-30",
  "UA-32","UA-35","UA-40","UA-43","UA-46","UA-48","UA-51","UA-53","UA-56","UA-59",
  "UA-61","UA-63","UA-65","UA-68","UA-71","UA-74","UA-77","UG-206",
  "US-AK","US-AL","US-AR","US-AS","US-AZ","US-CA","US-CO","US-CT","US-DC","US-DE",
  "US-FL","US-GA","US-GU","US-HI","US-IA","US-ID","US-IL","US-IN","US-KS","US-KY",
  "US-LA","US-MA","US-MD","US-ME","US-MI","US-MN","US-MO","US-MP","US-MS","US-MT",
  "US-NC","US-ND","US-NE","US-NH","US-NJ","US-NM","US-NV","US-NY","US-OH","US-OK",
  "US-OR","US-PA","US-PR","US-RI","US-SC","US-SD","US-TN","US-TX","US-UM","US-UT",
  "US-VA","US-VI","US-VT","US-WA","US-WI","US-WV","US-WY","UTUADOFLAG",
  "UY-AR","UY-CA","UY-CL","UY-CO","UY-DU","UY-FD","UY-FS","UY-LA","UY-MA","UY-MO",
  "UY-PA","UY-RN","UY-RO","UY-RV","UY-SA","UY-SJ","UY-SO","UY-TA","UY-TT",
  "UZ-QR","UZ-TK","VANNES-SEMAINE-DU-GOLFE-2015-2",
  "VE-B","VE-C","VE-D","VE-E","VE-F","VE-G","VE-H","VE-I","VE-J","VE-K","VE-L",
  "VE-M","VE-N","VE-O","VE-P","VE-R","VE-S","VE-T","VE-U","VE-V","VE-W","VE-X",
  "VE-Y","VE-Z","VEGA-ALTA","VEGA-BAJA","VIEQUES","VILLALBA",
  "VN-HN","VU-MAP","VU-PAM","VU-SAM","VU-SEE","VU-TAE","VU-TOB",
  "WF-AL","WF-SG","WF-UV","WOLEU-NTEM-PROVINCE-GABON",
  "YABUCOA","YAUCO-THROUGH-2004",
  "YE-AD","YE-DH","YE-HD","YE-LA",
  "ZA-EC","ZA-FS","ZA-GP","ZA-KZN","ZA-LP","ZA-MP","ZA-NC","ZA-NW","ZA-WC",
  "ZM-01","ZM-02","ZM-03","ZM-04","ZM-05","ZM-06","ZM-07","ZM-08","ZM-09","ZM-10",
  "ZUBEROA","ZW-BU","ZW-HA",
];

const SUB_CDN = "https://cdn.jsdelivr.net/gh/amckenna41/iso3166-flags@main/iso3166-2-flags";

// Subdivision flags where the amckenna41 CDN serves a broken/blank/degraded file
// (a corrupt thumbnail, a solid-colour stub, etc.). Pinned to an authoritative
// Wikimedia Commons source so a forced re-download does NOT clobber the good file
// with the bad CDN one. The file extension is taken from the override URL.
// Caught by scripts/check-flag-image-quality.mjs — see that script for the bug.
const SUB_SOURCE_OVERRIDES = {
  // amckenna41 served a 105×90 blurry thumbnail (not the real flag).
  "TH-58": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Flag_of_Mae_Hong_Son_Province.svg",
  // amckenna41 served a 111-byte solid-green field with no emblem.
  "NG-ZA": "https://upload.wikimedia.org/wikipedia/commons/9/94/Zamfara_flag.png",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchFlag(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "hana-flag-game/flag-downloader (+github.com/wladimirchagas/hana-s-flag-game)" },
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.arrayBuffer();
}

async function save(destPath, data, url) {
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, Buffer.from(data));
  process.stdout.write(`  ✓  ${url.replace(/^https?:\/\//, "")}\n`);
}

async function downloadOne(destPath, sourceUrl, force) {
  if (!force && existsSync(destPath)) return "skipped";
  try {
    const data = await fetchFlag(sourceUrl);
    await save(destPath, data, sourceUrl);
    return "downloaded";
  } catch (err) {
    process.stderr.write(`  ✗  ${sourceUrl}: ${err.message}\n`);
    return "failed";
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const force         = args.includes("--force");
  const subOnly       = args.includes("--subdivisions-only");
  const nationalOnly  = args.includes("--national-only");
  const onlyArg       = args.find((a) => a.startsWith("--only="));
  const onlyCodes     = onlyArg ? onlyArg.replace("--only=", "").split(",").map((c) => c.trim()) : null;

  await mkdir(FLAGS_DIR, { recursive: true });
  await mkdir(SUB_DIR,   { recursive: true });

  const sources = {};
  const counts = { downloaded: 0, skipped: 0, failed: 0 };
  // National/territory flags come from a stable, curated source — a failure there
  // is a real problem and must fail the run. Subdivision flags come from the
  // third-party amckenna41 CDN, whose file listing churns constantly (files get
  // renamed/removed upstream); a 404 there just leaves any existing bundled file
  // untouched, so it is expected drift, not an error. A subdivision download is
  // only treated as fatal if the file is currently bundled (so we never silently
  // lose a flag the game actually ships).
  const failedNational = [];
  const failedSub = [];

  function tally(code, result, localPath, srcUrl, { isNational = false, destPath } = {}) {
    sources[localPath] = srcUrl;
    if (result === "downloaded") counts.downloaded++;
    else if (result === "skipped") counts.skipped++;
    else {
      counts.failed++;
      if (isNational || (destPath && existsSync(destPath))) failedNational.push(code);
      else failedSub.push(code);
    }
  }

  // ---- National + territory flags ----------------------------------------
  if (!subOnly) {
    const nationalEntries = [
      ...NATIONAL_CODES.map((c) => [c, NATIONAL_SOURCE_OVERRIDES[c] ?? `${GITHUB_FLAGS_BASE}/${c.toLowerCase()}.svg`]),
      ...Object.entries(TERRITORY_FLAGS),
    ];
    for (const [code, src] of nationalEntries) {
      if (onlyCodes && !onlyCodes.includes(code.toUpperCase())) continue;
      const filename = code.includes("-") ? code.toLowerCase() : code.toLowerCase();
      const dest = join(FLAGS_DIR, `${filename}.svg`);
      const result = await downloadOne(dest, src, force);
      tally(code, result, `flags/${filename}.svg`, src, { isNational: true });
      if (result !== "skipped") await new Promise((r) => setTimeout(r, 80));
    }
  }

  // ---- Subdivision flags --------------------------------------------------
  if (!nationalOnly) {
    for (const key of SUB_CODES) {
      if (onlyCodes && !onlyCodes.includes(key.toUpperCase())) continue;
      const cc  = key.split("-")[0];
      const override = SUB_SOURCE_OVERRIDES[key];
      const ext = override
        ? override.split(".").pop().toLowerCase()
        : (SUB_NON_SVG_EXT[key] ?? "svg");
      const src  = override ?? `${SUB_CDN}/${cc}/${key}.${ext}`;
      const dest = join(SUB_DIR, cc, `${key}.${ext}`);
      const localPath = `flags/sub/${cc}/${key}.${ext}`;
      const result = await downloadOne(dest, src, force);
      tally(key, result, localPath, src, { destPath: dest });
      if (result !== "skipped") await new Promise((r) => setTimeout(r, 60));
    }
  }

  // ---- Persist sources manifest ------------------------------------------
  let existing = {};
  const manifestPath = join(FLAGS_DIR, "sources.json");
  if (existsSync(manifestPath)) {
    try { existing = JSON.parse(await readFile(manifestPath, "utf8")); } catch {}
  }
  const merged = { ...existing, ...sources };
  const sorted = Object.fromEntries(Object.keys(merged).sort().map((k) => [k, merged[k]]));
  await writeFile(manifestPath, JSON.stringify(sorted, null, 2) + "\n", "utf8");

  const total = counts.downloaded + counts.skipped + counts.failed;
  console.log(`\nDone: ${total} total | ${counts.downloaded} downloaded | ${counts.skipped} skipped | ${counts.failed} failed`);

  // Non-fatal: third-party subdivision-CDN files that no longer exist upstream.
  // These are not bundled, so there is nothing to update — just report them.
  if (failedSub.length > 0) {
    console.warn(
      `\nNote: ${failedSub.length} subdivision flag(s) are unavailable from the amckenna41 CDN ` +
      `(expected upstream churn — none are bundled, so nothing changed):`
    );
    console.warn(failedSub.join(", "));
  }

  // Fatal: a national/territory flag, or a currently-bundled subdivision flag,
  // failed to download. These come from stable sources / ship with the game.
  if (failedNational.length > 0) {
    console.error("\nFailed (must succeed):", failedNational.join(", "));
    process.exit(1);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });

// Corruption Perceptions Index 2025 — Transparency International.
// Source: CPI2025_Results.xlsx (files.transparencycdn.org/images/CPI2025_Results.xlsx),
// published 10 February 2026. Score 0 (highly corrupt) – 100 (very clean).
// Rank uses TI’s standard competition ranking (ties share a rank).
// rankChange = Rank_2024 − Rank_2025 (positive = improved). Belize & Brunei
// have no 2024 rank (new/returning coverage) so rankChange is 0.
// rating = TI map score band (90–100 … 0–9), matching the official CPI map legend.
//
// Do not invent scores. Re-extract from the official Results workbook when
// refreshing; never hand-type a country’s figure from memory.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, rankChange?: number, score: number }>}
 */
export const CPI_2025_DATA = {
  "AE": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 2, "score": 69 }, // United Arab Emirates
  "AF": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -4, "score": 16 }, // Afghanistan
  "AL": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": -11, "score": 39 }, // Albania
  "AM": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": -2, "score": 46 }, // Armenia
  "AO": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 1, "score": 32 }, // Angola
  "AR": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": -5, "score": 36 }, // Argentina
  "AT": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 4, "score": 69 }, // Austria
  "AU": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": -2, "score": 76 }, // Australia
  "AZ": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 24, "score": 30 }, // Azerbaijan
  "BA": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 }, // Bosnia and Herzegovina
  "BB": { "year": 2025, "rating": "60–69", "rank": 24, "rankChange": -1, "score": 68 }, // Barbados
  "BD": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": 1, "score": 24 }, // Bangladesh
  "BE": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 1, "score": 69 }, // Belgium
  "BF": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }, // Burkina Faso
  "BG": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -8, "score": 40 }, // Bulgaria
  "BH": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": -3, "score": 50 }, // Bahrain
  "BI": { "year": 2025, "rating": "10–19", "rank": 167, "rankChange": -2, "score": 17 }, // Burundi
  "BJ": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -1, "score": 45 }, // Benin
  "BN": { "year": 2025, "rating": "60–69", "rank": 31, "score": 63 }, // Brunei Darussalam
  "BO": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -3, "score": 28 }, // Bolivia
  "BR": { "year": 2025, "rating": "30–39", "rank": 107, "rankChange": 0, "score": 35 }, // Brazil
  "BS": { "year": 2025, "rating": "60–69", "rank": 29, "rankChange": -1, "score": 64 }, // Bahamas
  "BT": { "year": 2025, "rating": "70–79", "rank": 18, "rankChange": 0, "score": 71 }, // Bhutan
  "BW": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": 2, "score": 58 }, // Botswana
  "BY": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -10, "score": 31 }, // Belarus
  "BZ": { "year": 2025, "rating": "30–39", "rank": 104, "score": 36 }, // Belize
  "CA": { "year": 2025, "rating": "70–79", "rank": 16, "rankChange": -1, "score": 75 }, // Canada
  "CD": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": 0, "score": 20 }, // Democratic Republic of the Congo
  "CF": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": -1, "score": 24 }, // Central African Republic
  "CG": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -2, "score": 23 }, // Congo
  "CH": { "year": 2025, "rating": "80–89", "rank": 6, "rankChange": -1, "score": 80 }, // Switzerland
  "CI": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": -7, "score": 43 }, // Cote d\'Ivoire
  "CL": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 1, "score": 63 }, // Chile
  "CM": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -2, "score": 26 }, // Cameroon
  "CN": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": 0, "score": 43 }, // China
  "CO": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -7, "score": 37 }, // Colombia
  "CR": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": -4, "score": 56 }, // Costa Rica
  "CU": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }, // Cuba
  "CV": { "year": 2025, "rating": "60–69", "rank": 35, "rankChange": 0, "score": 62 }, // Cabo Verde
  "CY": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": -3, "score": 55 }, // Cyprus
  "CZ": { "year": 2025, "rating": "50–59", "rank": 39, "rankChange": 7, "score": 59 }, // Czechia
  "DE": { "year": 2025, "rating": "70–79", "rank": 10, "rankChange": 5, "score": 77 }, // Germany
  "DJ": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": 3, "score": 31 }, // Djibouti
  "DK": { "year": 2025, "rating": "80–89", "rank": 1, "rankChange": 0, "score": 89 }, // Denmark
  "DM": { "year": 2025, "rating": "60–69", "rank": 37, "rankChange": -1, "score": 60 }, // Dominica
  "DO": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": 5, "score": 37 }, // Dominican Republic
  "DZ": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 }, // Algeria
  "EC": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": 5, "score": 33 }, // Ecuador
  "EE": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": 1, "score": 76 }, // Estonia
  "EG": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 0, "score": 30 }, // Egypt
  "ER": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 }, // Eritrea
  "ES": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": -3, "score": 55 }, // Spain
  "ET": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": 3, "score": 38 }, // Ethiopia
  "FI": { "year": 2025, "rating": "80–89", "rank": 2, "rankChange": 0, "score": 88 }, // Finland
  "FJ": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": 1, "score": 55 }, // Fiji
  "FR": { "year": 2025, "rating": "60–69", "rank": 27, "rankChange": -2, "score": 66 }, // France
  "GA": { "year": 2025, "rating": "20–29", "rank": 135, "rankChange": 0, "score": 29 }, // Gabon
  "GB": { "year": 2025, "rating": "70–79", "rank": 20, "rankChange": 0, "score": 70 }, // United Kingdom
  "GD": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": 0, "score": 56 }, // Grenada
  "GE": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": -3, "score": 50 }, // Georgia
  "GH": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": 4, "score": 43 }, // Ghana
  "GM": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -3, "score": 37 }, // Gambia
  "GN": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -9, "score": 26 }, // Guinea
  "GQ": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": 1, "score": 15 }, // Equatorial Guinea
  "GR": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": 3, "score": 50 }, // Greece
  "GT": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": 4, "score": 26 }, // Guatemala
  "GW": { "year": 2025, "rating": "20–29", "rank": 161, "rankChange": -3, "score": 21 }, // Guinea Bissau
  "GY": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": 8, "score": 40 }, // Guyana
  "HN": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": -3, "score": 22 }, // Honduras
  "HR": { "year": 2025, "rating": "40–49", "rank": 63, "rankChange": 0, "score": 47 }, // Croatia
  "HT": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -1, "score": 16 }, // Haiti
  "HU": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }, // Hungary
  "ID": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -10, "score": 34 }, // Indonesia
  "IE": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": -2, "score": 76 }, // Ireland
  "IL": { "year": 2025, "rating": "60–69", "rank": 35, "rankChange": -5, "score": 62 }, // Israel
  "IN": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 5, "score": 39 }, // India
  "IQ": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": 4, "score": 28 }, // Iraq
  "IR": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -2, "score": 23 }, // Iran
  "IS": { "year": 2025, "rating": "70–79", "rank": 10, "rankChange": 0, "score": 77 }, // Iceland
  "IT": { "year": 2025, "rating": "50–59", "rank": 52, "rankChange": 0, "score": 53 }, // Italy
  "JM": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 0, "score": 44 }, // Jamaica
  "JO": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": 3, "score": 50 }, // Jordan
  "JP": { "year": 2025, "rating": "70–79", "rank": 18, "rankChange": 2, "score": 71 }, // Japan
  "KE": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": -9, "score": 30 }, // Kenya
  "KG": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": 4, "score": 26 }, // Kyrgyzstan
  "KH": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": -5, "score": 20 }, // Cambodia
  "KM": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": -5, "score": 20 }, // Comoros
  "KP": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": -2, "score": 15 }, // Korea, North
  "KR": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": -1, "score": 63 }, // Korea, South
  "KW": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 0, "score": 46 }, // Kuwait
  "KZ": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": -8, "score": 38 }, // Kazakhstan
  "LA": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 }, // Laos
  "LB": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": 1, "score": 23 }, // Lebanon
  "LC": { "year": 2025, "rating": "50–59", "rank": 39, "rankChange": -1, "score": 59 }, // Saint Lucia
  "LK": { "year": 2025, "rating": "30–39", "rank": 107, "rankChange": 14, "score": 35 }, // Sri Lanka
  "LR": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 }, // Liberia
  "LS": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": 0, "score": 37 }, // Lesotho
  "LT": { "year": 2025, "rating": "60–69", "rank": 28, "rankChange": 4, "score": 65 }, // Lithuania
  "LU": { "year": 2025, "rating": "70–79", "rank": 8, "rankChange": -3, "score": 78 }, // Luxembourg
  "LV": { "year": 2025, "rating": "60–69", "rank": 37, "rankChange": 1, "score": 60 }, // Latvia
  "LY": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 }, // Libya
  "MA": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 8, "score": 39 }, // Morocco
  "MD": { "year": 2025, "rating": "40–49", "rank": 80, "rankChange": -4, "score": 42 }, // Moldova
  "ME": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 0, "score": 46 }, // Montenegro
  "MG": { "year": 2025, "rating": "20–29", "rank": 148, "rankChange": -8, "score": 25 }, // Madagascar
  "MK": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": 4, "score": 40 }, // North Macedonia
  "ML": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 }, // Mali
  "MM": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -1, "score": 16 }, // Myanmar
  "MN": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -10, "score": 31 }, // Mongolia
  "MR": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 0, "score": 30 }, // Mauritania
  "MT": { "year": 2025, "rating": "40–49", "rank": 60, "rankChange": 5, "score": 49 }, // Malta
  "MU": { "year": 2025, "rating": "40–49", "rank": 61, "rankChange": -5, "score": 48 }, // Mauritius
  "MV": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 5, "score": 39 }, // Maldives
  "MW": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 }, // Malawi
  "MX": { "year": 2025, "rating": "20–29", "rank": 141, "rankChange": -1, "score": 27 }, // Mexico
  "MY": { "year": 2025, "rating": "50–59", "rank": 54, "rankChange": 3, "score": 52 }, // Malaysia
  "MZ": { "year": 2025, "rating": "20–29", "rank": 161, "rankChange": -15, "score": 21 }, // Mozambique
  "NA": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": -6, "score": 46 }, // Namibia
  "NE": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -17, "score": 31 }, // Niger
  "NG": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -2, "score": 26 }, // Nigeria
  "NI": { "year": 2025, "rating": "10–19", "rank": 175, "rankChange": -3, "score": 14 }, // Nicaragua
  "NL": { "year": 2025, "rating": "70–79", "rank": 8, "rankChange": 1, "score": 78 }, // Netherlands
  "NO": { "year": 2025, "rating": "80–89", "rank": 4, "rankChange": 1, "score": 81 }, // Norway
  "NP": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 }, // Nepal
  "NZ": { "year": 2025, "rating": "80–89", "rank": 4, "rankChange": 0, "score": 81 }, // New Zealand
  "OM": { "year": 2025, "rating": "50–59", "rank": 54, "rankChange": -4, "score": 52 }, // Oman
  "PA": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -2, "score": 33 }, // Panama
  "PE": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": -3, "score": 30 }, // Peru
  "PG": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -15, "score": 26 }, // Papua New Guinea
  "PH": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": -6, "score": 32 }, // Philippines
  "PK": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 }, // Pakistan
  "PL": { "year": 2025, "rating": "50–59", "rank": 52, "rankChange": 1, "score": 53 }, // Poland
  "PT": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": -3, "score": 56 }, // Portugal
  "PY": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": -1, "score": 24 }, // Paraguay
  "QA": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": -3, "score": 58 }, // Qatar
  "RO": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -5, "score": 45 }, // Romania
  "RS": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -11, "score": 33 }, // Serbia
  "RU": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": -3, "score": 22 }, // Russia
  "RW": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": 2, "score": 58 }, // Rwanda
  "SA": { "year": 2025, "rating": "50–59", "rank": 45, "rankChange": -7, "score": 57 }, // Saudi Arabia
  "SB": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 3, "score": 44 }, // Solomon Islands
  "SC": { "year": 2025, "rating": "60–69", "rank": 24, "rankChange": -6, "score": 68 }, // Seychelles
  "SD": { "year": 2025, "rating": "10–19", "rank": 175, "rankChange": -5, "score": 14 }, // Sudan
  "SE": { "year": 2025, "rating": "80–89", "rank": 6, "rankChange": 2, "score": 80 }, // Sweden
  "SG": { "year": 2025, "rating": "80–89", "rank": 3, "rankChange": 0, "score": 84 }, // Singapore
  "SI": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": -5, "score": 58 }, // Slovenia
  "SK": { "year": 2025, "rating": "40–49", "rank": 61, "rankChange": -2, "score": 48 }, // Slovakia
  "SL": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 }, // Sierra Leone
  "SN": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 4, "score": 46 }, // Senegal
  "SO": { "year": 2025, "rating": "0–9", "rank": 181, "rankChange": -2, "score": 9 }, // Somalia
  "SR": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": -8, "score": 38 }, // Suriname
  "SS": { "year": 2025, "rating": "0–9", "rank": 181, "rankChange": -1, "score": 9 }, // South Sudan
  "ST": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -1, "score": 45 }, // Sao Tome and Principe
  "SV": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 10, "score": 32 }, // El Salvador
  "SY": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": 5, "score": 15 }, // Syria
  "SZ": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -18, "score": 23 }, // Eswatini
  "TD": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": 1, "score": 22 }, // Chad
  "TG": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 1, "score": 32 }, // Togo
  "TH": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -9, "score": 33 }, // Thailand
  "TJ": { "year": 2025, "rating": "10–19", "rank": 166, "rankChange": -2, "score": 19 }, // Tajikistan
  "TL": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 0, "score": 44 }, // Timor-Leste
  "TM": { "year": 2025, "rating": "10–19", "rank": 167, "rankChange": -2, "score": 17 }, // Turkmenistan
  "TN": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 1, "score": 39 }, // Tunisia
  "TR": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -17, "score": 31 }, // Turkey
  "TT": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 1, "score": 41 }, // Trinidad and Tobago
  "TZ": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }, // Tanzania
  "UA": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": 1, "score": 36 }, // Ukraine
  "UG": { "year": 2025, "rating": "20–29", "rank": 148, "rankChange": -8, "score": 25 }, // Uganda
  "US": { "year": 2025, "rating": "60–69", "rank": 29, "rankChange": -1, "score": 64 }, // United States of America
  "UY": { "year": 2025, "rating": "70–79", "rank": 17, "rankChange": -4, "score": 73 }, // Uruguay
  "UZ": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -3, "score": 31 }, // Uzbekistan
  "VC": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 1, "score": 63 }, // Saint Vincent and the Grenadines
  "VE": { "year": 2025, "rating": "10–19", "rank": 180, "rankChange": -2, "score": 10 }, // Venezuela
  "VN": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 7, "score": 41 }, // Vietnam
  "VU": { "year": 2025, "rating": "40–49", "rank": 63, "rankChange": -6, "score": 47 }, // Vanuatu
  "YE": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 }, // Yemen
  "ZA": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 1, "score": 41 }, // South Africa
  "ZM": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -7, "score": 37 }, // Zambia
  "ZW": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": 1, "score": 22 }, // Zimbabwe
};

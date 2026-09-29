/**
 * Wikidata P300 (ISO 3166-2) → app subdivisionMeta code remap.
 *
 * Wikidata's P300 sometimes carries a subdivision's *current* ISO 3166-2 code
 * while this app's subdivisionMeta.ts still uses an older code for the same
 * subdivision (ISO reassigned France's overseas departments from letter codes
 * to numeric ones, Finland's regions to numeric ones, Norway's counties in the
 * 2020/2024 reforms, etc. after our meta was built). Remap the Wikidata code to
 * the app's code so a Wikidata figure/capital isn't silently orphaned under a
 * key the app never looks up. Each entry was confirmed by querying Wikidata
 * directly and checking the item's English label matches.
 *
 * Shared by scripts/build-subdivision-population.mjs and
 * scripts/build-subdivision-capitals.mjs so the two generators can never drift
 * apart on how a Wikidata code maps to an app code.
 */
export const CODE_ALIASES = {
  "FR-971": "FR-GP", // Guadeloupe
  "FR-972": "FR-MQ", // Martinique
  "FR-973": "FR-GF", // French Guiana
  "FR-974": "FR-RE", // Réunion
  "FR-976": "FR-YT", // Mayotte
  "FI-01": "FI-AX", // Åland Islands
  // CI
  "CI-ZZ": "CI-08", // Zanzan
  // CZ
  "CZ-31": "CZ-JC", // South Bohemian
  "CZ-80": "CZ-MO", // Moravian-Silesian
  "CZ-64": "CZ-JM", // South Moravian
  "CZ-63": "CZ-VY", // Vysočina
  "CZ-20": "CZ-ST", // Central Bohemian
  "CZ-42": "CZ-US", // Ústí nad Labem Region
  "CZ-51": "CZ-LI", // Liberec Region
  "CZ-41": "CZ-KA", // Karlovy Vary Region
  "CZ-32": "CZ-PL", // Plzeň Region
  "CZ-52": "CZ-KR", // Hradec Králové Region
  "CZ-71": "CZ-OL", // Olomouc Region
  "CZ-53": "CZ-PA", // Pardubice Region
  "CZ-72": "CZ-ZL", // Zlín Region
  "CZ-10": "CZ-PR", // Prague
  // EE
  "EE-68": "EE-67", // Pärnu
  "EE-81": "EE-82", // Valga
  "EE-87": "EE-86", // Võru
  "EE-45": "EE-44", // Ida-Viru
  "EE-64": "EE-65", // Põlva
  "EE-79": "EE-78", // Tartu
  "EE-50": "EE-49", // Jõgeva
  "EE-56": "EE-57", // Lääne
  "EE-60": "EE-59", // Lääne-Viru
  "EE-71": "EE-70", // Rapla
  "EE-52": "EE-51", // Järva
  // ES
  "ES-NC": "ES-NA", // Navarre
  "ES-MC": "ES-MU", // Murcia
  "ES-CB": "ES-S", // Cantabria
  "ES-RI": "ES-LO", // La Rioja
  "ES-MD": "ES-M", // Community of Madrid
  // FR
  "FR-75C": "FR-75", // Paris
  // GN
  "GN-D": "GN-KD", // Kindia
  "GN-B": "GN-BK", // Boké
  // GR
  "GR-I": "GR-A1", // Attica
  // GT
  "GT-22": "GT-JU", // Jutiapa
  "GT-20": "GT-CQ", // Chiquimula
  "GT-17": "GT-PE", // Petén
  "GT-12": "GT-SM", // San Marcos
  "GT-13": "GT-HU", // Huehuetenango
  "GT-14": "GT-QC", // Quiché
  "GT-16": "GT-AV", // Alta Verapaz
  "GT-18": "GT-IZ", // Izabal
  "GT-19": "GT-ZA", // Zacapa
  "GT-11": "GT-RE", // Retalhuleu
  "GT-10": "GT-SU", // Suchitepéquez
  "GT-05": "GT-ES", // Escuintla
  "GT-06": "GT-SR", // Santa Rosa
  "GT-04": "GT-CM", // Chimaltenango
  "GT-03": "GT-SA", // Sacatepéquez
  "GT-01": "GT-GU", // Guatemala
  "GT-21": "GT-JA", // Jalapa
  "GT-02": "GT-PR", // El Progreso
  "GT-07": "GT-SO", // Sololá
  "GT-09": "GT-QZ", // Quetzaltenango
  "GT-15": "GT-BV", // Baja Verapaz
  "GT-08": "GT-TO", // Totonicapán
  // HU
  "HU-ER": "HU-ED", // Érd
  // IN
  "IN-UK": "IN-UT", // Uttarakhand
  "IN-OD": "IN-OR", // Odisha
  "IN-CG": "IN-CT", // Chhattisgarh
  "IN-TS": "IN-TG", // Telangana
  // IQ
  "IQ-KI": "IQ-TS", // Kirkuk
  // IR — no aliases: public/subdivisions/IR.json carries the current ISO 3166-2:IR
  //   codes since the 2026-09 audit (batch 7a), the same codes Wikidata's P300 uses.
  // KZ
  "KZ-63": "KZ-VOS", // East Kazakhstan
  "KZ-31": "KZ-ZHA", // Jambyl
  "KZ-61": "KZ-YUZ", // Turkistan
  "KZ-47": "KZ-MAN", // Mangystau
  "KZ-43": "KZ-KZY", // Kyzylorda
  "KZ-15": "KZ-AKT", // Aktobe
  "KZ-59": "KZ-SEV", // North Kazakhstan
  "KZ-39": "KZ-KUS", // Kostanay
  "KZ-55": "KZ-PAV", // Pavlodar
  "KZ-27": "KZ-ZAP", // West Kazakhstan
  "KZ-23": "KZ-ATY", // Atyrau
  "KZ-11": "KZ-AKM", // Akmola
  "KZ-35": "KZ-KAR", // Karaganda
  "KZ-75": "KZ-ALA", // Almaty City
  "KZ-19": "KZ-ALM", // Almaty Region
  // MA
  "MA-OUD": "MA-16", // Oued Ed-Dahab
  // MK
  "MK-312": "MK-72", // Struga
  "MK-313": "MK-78", // Centar Župa
  "MK-303": "MK-21", // Debar
  "MK-604": "MK-19", // Gostivar
  "MK-301": "MK-12", // Vevčani
  "MK-310": "MK-58", // Ohrid
  "MK-304": "MK-22", // Debarca
  "MK-509": "MK-66", // Resen
  "MK-408": "MK-56", // Novo Selo
  "MK-406": "MK-26", // Dojran
  "MK-403": "MK-10", // Valandovo
  "MK-410": "MK-73", // Strumica
  "MK-401": "MK-05", // Bogdanci
  "MK-405": "MK-18", // Gevgelija
  "MK-104": "MK-36", // Kavadarci
  "MK-507": "MK-55", // Novaci
  "MK-508": "MK-62", // Prilep
  "MK-501": "MK-04", // Bitola
  "MK-704": "MK-48", // Lipkovo
  "MK-816": "MK-82", // Čučer-Sandevo
  "MK-811": "MK-68", // Saraj
  "MK-606": "MK-35", // Jegunovce
  "MK-608": "MK-75", // Tearce
  "MK-609": "MK-76", // Tetovo
  "MK-601": "MK-06", // Bogovinje
  "MK-603": "MK-16", // Vrapčište
  "MK-702": "MK-44", // Kriva Palanka
  "MK-705": "MK-65", // Rankovce
  "MK-706": "MK-71", // Staro Nagoričane
  "MK-203": "MK-23", // Delčevo
  "MK-207": "MK-51", // Makedonska Kamenica
  "MK-201": "MK-03", // Berovo
  "MK-208": "MK-60", // Pehčevo
  "MK-605": "MK-30", // Želino
  "MK-602": "MK-08", // Brvenica
  "MK-308": "MK-52", // Makedonski Brod
  "MK-812": "MK-70", // Sopište
  "MK-808": "MK-38", // Karpoš
  "MK-817": "MK-84", // Šuto Orizari
  "MK-803": "MK-09", // Butel
  "MK-815": "MK-79", // Čair
  "MK-814": "MK-77", // Centar
  "MK-503": "MK-27", // Dolneni
  "MK-504": "MK-45", // Krivogaštani
  "MK-506": "MK-53", // Mogila
  "MK-109": "MK-80", // Čaška
  "MK-107": "MK-67", // Rosoman
  "MK-106": "MK-54", // Negotino
  "MK-804": "MK-17", // Gazi Baba
  "MK-505": "MK-46", // Kruševo
  "MK-502": "MK-25", // Demir Hisar
  "MK-801": "MK-01", // Aerodrom
  "MK-813": "MK-74", // Studeničani
  "MK-809": "MK-39", // Kisela Voda
  "MK-209": "MK-63", // Probištip
  "MK-210": "MK-81", // Češinovo-Obleševo
  "MK-802": "MK-02", // Aračinovo
  "MK-806": "MK-32", // Zelenikovo
  "MK-307": "MK-40", // Kičevo
  "MK-311": "MK-61", // Plasnica
  "MK-105": "MK-49", // Lozovo
  "MK-108": "MK-69", // Sveti Nikole
  "MK-701": "MK-43", // Kratovo
  "MK-807": "MK-34", // Ilinden
  "MK-205": "MK-37", // Karbinci
  "MK-211": "MK-83", // Štip
  "MK-206": "MK-42", // Kočani
  "MK-204": "MK-33", // Zrnovci
  "MK-101": "MK-13", // Veles
  "MK-103": "MK-24", // Demir Kapija
  "MK-202": "MK-14", // Vinica
  "MK-402": "MK-07", // Bosilovo
  "MK-409": "MK-64", // Radoviš
  "MK-404": "MK-11", // Vasilevo
  "MK-407": "MK-41", // Konče
  // NO
  "NO-55": "NO-19", // Troms
  "NO-32": "NO-02", // Akershus
  "NO-31": "NO-01", // Østfold
  "NO-56": "NO-20", // Finnmark
  "NO-33": "NO-06", // Buskerud
  "NO-39": "NO-07", // Vestfold
  "NO-40": "NO-08", // Telemark
  // PL
  "PL-12": "PL-MA", // Lesser Poland Voivodeship
  "PL-18": "PL-PK", // Podkarpackie Voivodeship
  "PL-02": "PL-DS", // Lower Silesian Voivodeship
  "PL-16": "PL-OP", // Opole Voivodeship
  "PL-20": "PL-PD", // Podlaskie Voivodeship
  "PL-28": "PL-WN", // Warmian-Masurian Voivodeship
  "PL-08": "PL-LB", // Lubusz Voivodeship
  "PL-32": "PL-ZP", // West Pomeranian Voivodeship
  "PL-06": "PL-LU", // Lublin Voivodeship
  "PL-22": "PL-PM", // Pomeranian Voivodeship
  "PL-14": "PL-MZ", // Masovian Voivodeship
  "PL-10": "PL-LD", // Łódź Voivodeship
  "PL-04": "PL-KP", // Kuyavian-Pomeranian Voivodeship
  "PL-30": "PL-WP", // Greater Poland Voivodeship
  "PL-26": "PL-SK", // Świętokrzyskie Voivodeship
  // SI
  "SI-142": "SI-05", // Zagorje ob Savi
  // TW
  "TW-NWT": "TW-TPQ", // New Taipei
  // ZA
  "ZA-KZN": "ZA-NL", // KwaZulu-Natal
  "ZA-GP": "ZA-GT", // Gauteng
};

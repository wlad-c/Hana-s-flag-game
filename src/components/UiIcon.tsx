const paths = {
  home: "m3 10 9-7 9 7v10H3Z M9 20v-7h6v7",
  back: "m10 5-7 7 7 7 M3 12h18",
  flag: "M5 21V3 M5 4c5-4 9 4 14 0v10c-5 4-9-4-14 0",
  pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z M14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  passport: "M5 3h14v18H5Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0 M9 17h6",
  globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 12h18 M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z",
  sun: "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5 19 19 M5 19l1.5-1.5 M17.5 6.5 19 5",
  moon: "M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z",
  volume: "M11 4 6 8H3v8h3l5 4Z M15 8a6 6 0 0 1 0 8 M18 5a10 10 0 0 1 0 14",
  muted: "M11 4 6 8H3v8h3l5 4Z M16 9l6 6 M22 9l-6 6",
  share: "M12 15V3 m-4 4 4-4 4 4 M5 11v10h14V11",
  expand: "M8 3H3v5 M16 3h5v5 M21 16v5h-5 M8 21H3v-5",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  check: "m4 12 5 5L20 6",
  close: "m6 6 12 12 M18 6 6 18",
  previous: "m15 5-7 7 7 7",
  next: "m9 5 7 7-7 7",
  play: "m7 4 14 8-14 8Z",
  pause: "M8 4v16 M16 4v16",
  undo: "M3 4v6h6 M3 10a9 9 0 1 1 1 8",
  redo: "M21 4v6h-6 M21 10a9 9 0 1 0-1 8",
  more: "M12 5h.01 M12 12h.01 M12 19h.01",
  trophy: "M7 3h10v6a5 5 0 0 1-10 0Z M7 5H3v3a4 4 0 0 0 4 4 M17 5h4v3a4 4 0 0 1-4 4 M12 14v7 M8 21h8",
  search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0 m-2 5 6 6",
  settings: "m9 3-.6 2.3-2 .9-2.2-.6-2 3.4 1.6 1.7v2.6L2.2 15l2 3.4 2.2-.6 2 .9L9 21h4l.6-2.3 2-.9 2.2.6 2-3.4-1.6-1.7v-2.6L19.8 9l-2-3.4-2.2.6-2-.9L13 3Z M14 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  democracy: "M3 21h18 M3 10h18 M5 10v8 M9 10v8 M13 10v8 M17 10v8 M12 3L2 8h20Z",
  /** Travel & migration map control (visas, migrant intake, diaspora). */
  plane: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z",
} as const;

/** Decorative UI artwork only. The parent control owns its accessible name. */
export function UiIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg className="ui-icon" width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[name]} />
    </svg>
  );
}

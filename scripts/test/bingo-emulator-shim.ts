// Test-only stand-in for src/lib/firebase.ts: each bundle instance gets its
// own Firebase app + anonymous user against the local emulators, so one Node
// process can act as two separate devices.
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth, signInAnonymously } from "firebase/auth";

const g = globalThis as { __bingoClientSeq?: number };
g.__bingoClientSeq = (g.__bingoClientSeq ?? 0) + 1;
const app = initializeApp(
  { apiKey: "demo-key", projectId: "demo-bingo", authDomain: "demo-bingo.firebaseapp.com" },
  `client-${g.__bingoClientSeq}`,
);
export const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);
export const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });

export async function ensureAnonymousAuth(): Promise<string | null> {
  if (auth.currentUser) return auth.currentUser.uid;
  const cred = await signInAnonymously(auth);
  return cred.user.uid;
}

// Defaults match the "studio-4673760772-9d1b0" Firebase project this app
// was originally scaffolded against. Override any of these per-environment
// with NEXT_PUBLIC_FIREBASE_* env vars (e.g. to point at a staging project).
export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-4673760772-9d1b0",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:27776436185:web:db695cd6214759ead0fbc8",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCaje7Hi9X8nSnRJzupcwegCgUEqTLKCf8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-4673760772-9d1b0.firebaseapp.com",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "27776436185",
};

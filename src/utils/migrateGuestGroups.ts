// import admin from "firebase-admin";
// import path from "path";
// import { fileURLToPath } from "url";

// import serviceAccount from "../lib/serviceAccountKey.json" assert { type: "json" };
// import groups from "./guestGroups_final-GI.json" assert { type: "json" };

// // 🔧 fix __dirname for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 🔐 init admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
// });

// const db = admin.firestore();

// async function migrate() {
//   console.log(`🚀 Starting migration for ${groups.length} groups...\n`);

//   for (const group of groups) {
//     const { id, familyLabel, members, maxGuests, representative } = group;

//     if (!id || !members) {
//       console.warn("⚠️ Skipping invalid group:", group);
//       continue;
//     }

//     const docRef = db.collection("guestGroups").doc(id);

//     const data = {
//       id,
//       familyLabel: familyLabel || "",
//       members: members || [],
//       maxGuests: maxGuests ?? members.length,
//       representative: representative || members[0] || "",
//       hasResponded: false,
//     };

//     await docRef.set(data, { merge: true });

//     console.log(`✅ Migrated: ${id}`);
//   }

//   console.log("\n🎉 Migration complete!");
// }

// migrate().catch((err) => {
//   console.error("❌ Migration failed:", err);
// });

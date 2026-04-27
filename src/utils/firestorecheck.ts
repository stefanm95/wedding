import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function testFirestore() {
  // write
  await addDoc(collection(db, "rsvps"), {
    name: "test",
  });

  // read
  const snapshot = await getDocs(collection(db, "test"));

  snapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}

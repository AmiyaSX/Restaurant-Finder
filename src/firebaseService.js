import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, get, set, push, onValue } from "firebase/database";
import firebaseConfig from "./firebaseConfig";

// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbFirestore = getFirestore(app);

async function getKey() {
    const docRef = doc(dbFirestore, "google_place_key", "google_place_key");
    const docSnap = await getDoc(docRef);
    return docSnap.data().key;
    
}


export {
    getKey,
};

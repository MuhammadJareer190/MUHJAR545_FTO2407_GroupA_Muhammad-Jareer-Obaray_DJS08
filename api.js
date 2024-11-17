import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, getDocs, getDoc, query, where } from firebase/firebase/lite

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEObkD6STOEtD0L3Q5R2MCJ-xz2CFLrqM",
  authDomain: "vanlife-12a01.firebaseapp.com",
  projectId: "vanlife-12a01",
  storageBucket: "vanlife-12a01.firebasestorage.app",
  messagingSenderId: "75186903851",
  appId: "1:75186903851:web:2891c060f55e80aa02436e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, vans)

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data()
        id: doc.id
    }))
    return vans
}

export async function  getVan(id) {
    const docRef =(db, "vans", id)
    const snapshot = getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123")) 
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data()
        id: doc.id
    }))
    return vans
}
/* export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
} */

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
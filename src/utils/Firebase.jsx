import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; // ✅ full Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBWdfjlq35zUTeXOn0IVNuofiUTZmrQZEE",
  authDomain: "olxclone-fyz.firebaseapp.com",
  projectId: "olxclone-fyz",
  storageBucket: "olxclone-fyz.firebasestorage.app",
  messagingSenderId: "23122033300",
  appId: "1:23122033300:web:77e0575a0e4c6d08ea1281",
  measurementId: "G-PYPCGTLW12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();
const fireStore = getFirestore(app); // ✅ pass app here

const fetchFromFireStore = async () => {
  try {
    const productsCollection = collection(fireStore, 'products');
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('fetched products from firestore', productList);
    return productList;
  } catch (error) {
    console.log('error fetching products from firestore: ', error);
    return [];
  }
};

export {
  auth,
  provider,
  storage,
  fireStore,
  fetchFromFireStore,
  collection,
  getDocs,
  addDoc, // ✅ Exporting in case you want to import directly
};

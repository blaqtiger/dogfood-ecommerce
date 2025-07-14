// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // <-- Firestore imports

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAE82hmsNZLVTya3E5PxFHO8Do_xCQFb-s",
  authDomain: "dogfoodstore-25f9c.firebaseapp.com",
  projectId: "dogfoodstore-25f9c",
  storageBucket: "dogfoodstore-25f9c.firebasestorage.app",
  messagingSenderId: "183905204972",
  appId: "1:183905204972:web:7f36ee4c1925cfe13503c9",
  measurementId: "G-1SXXE21TZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

// 🔄 Example: Add a product to the "products" collection
export async function addProduct(name, price, inStock) {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name: name,
      price: price,
      inStock: inStock
    });
    console.log("Product added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding product: ", e);
  }
}

// 📦 Example: Get all products from the "products" collection
export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => `, doc.data());
    });
  } catch (e) {
    console.error("Error fetching products: ", e);
  }
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    console.error("Logout error:", error.message);
  });
}


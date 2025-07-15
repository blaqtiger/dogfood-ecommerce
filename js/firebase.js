// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAE82hmsNZLVTya3E5PxFHO8Do_xCQFb-s",
  authDomain: "dogfoodstore-25f9c.firebaseapp.com",
  projectId: "dogfoodstore-25f9c",
  storageBucket: "dogfoodstore-25f9c.firebasestorage.app",
  messagingSenderId: "183905204972",
  appId: "1:183905204972:web:7f36ee4c1925cfe13503c9",
  measurementId: "G-1SXXE21TZ8"
};

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// 📥 Add Product (Optional Utility)
export async function addProduct(name, price, inStock) {
  try {
    const docRef = await addDoc(collection(db, "products"), {
      name,
      price,
      inStock
    });
    console.log("✅ Product added with ID:", docRef.id);
  } catch (e) {
    console.error("❌ Error adding product:", e);
  }
}

// 📤 Save Order to Firestore
export async function saveOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), orderData);
    console.log("✅ Order saved with ID:", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("❌ Error saving order:", e);
    throw e;
  }
}

// 📦 Get Products (Optional Utility)
export async function getProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
  } catch (e) {
    console.error("❌ Error fetching products:", e);
  }
}

// 🔓 Logout Helper
export async function logoutUser() {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (error) {
    console.error("❌ Logout error:", error.message);
  }
}

// Export auth and db for other uses
export { auth, db };

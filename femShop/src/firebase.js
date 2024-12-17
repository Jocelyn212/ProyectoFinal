import { getDatabase, ref, set, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
export const db = getDatabase(app);

//setter method
export function updateCarts(userId, items) {
  console.log("aca");
  set(ref(db, `carts/${userId}`), items);
}

//getter method
export async function getCarts(userId) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `carts/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}

// Getter method for products
export async function getProduct(productId) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `productos/`));
    if (snapshot.exists()) {
      const products = snapshot.val();
      const product = products.find((product) => product.id == productId);
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

// Getter method for all products
export async function getAllProducts() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `productos`));
    console.log("snap", snapshot);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    console.error("error", error);
  }
}

// Funciones para favoritos en firebase.js
export async function updateFavorites(userId, items) {
  try {
    await set(ref(db, `favorites/${userId}`), items);
  } catch (error) {
    console.error("Error updating favorites:", error);
    throw error;
  }
}

export async function getFavorites(userId) {
  try {
    const snapshot = await get(child(ref(db), `favorites/${userId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    throw error;
  }
}

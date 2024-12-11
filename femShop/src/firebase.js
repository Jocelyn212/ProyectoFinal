// Import the functions you need from the SDKs you need
import { getDatabase, ref, set, get, child } from "firebase/database";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCWOoXFv8MTNA-A8IAEcGHu7YRcJkU8VxE",
  authDomain: "shop-1656d.firebaseapp.com",
  databaseURL: "https://shop-1656d-default-rtdb.firebaseio.com",
  projectId: "shop-1656d",
  storageBucket: "shop-1656d.firebasestorage.app",
  messagingSenderId: "420163986032",
  appId: "1:420163986032:web:6007bc8b7166478eee8ab5",
};

const firebaseConfig2 = {
  apiKey: "AIzaSyCj6ME5O_gIrVHGqNgZBc7_S2dGz0mdXFg",
  authDomain: "test-8cff7.firebaseapp.com",
  databaseURL: "https://test-8cff7-default-rtdb.firebaseio.com",
  projectId: "test-8cff7",
  storageBucket: "test-8cff7.firebasestorage.app",
  messagingSenderId: "576112958325",
  appId: "1:576112958325:web:bc3b3d5a39c6516fd1913c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const db = getDatabase(app);

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
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
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
    const snapshot = await get(child(dbRef, `productos/${productId}`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
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
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}
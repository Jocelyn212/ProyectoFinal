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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const db = getDatabase(app);

//setter method
export function updateCarts(items) {
  set(ref(db, "carts/"), items);
}

//getter method
export async function getCarts() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, "carts/"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}

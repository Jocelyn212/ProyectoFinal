import { defineStore } from "pinia";
import { useActiveUserStore } from "./user";
import { ref, set, get, child } from "firebase/database";
import { db } from "../firebase";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    items: [],
  }),
  actions: {
    getUserID() {
      const userStore = useActiveUserStore();
      return userStore.profile.id;
    },

    toggleFavorite(product) {
      const userID = this.getUserID();
      const index = this.items.findIndex(item => item.id === product.id);
      
      if (index >= 0) {
        this.items.splice(index, 1);
      } else {
        this.items.push(product);
      }

      if (userID) {
        this.updateFavoritesInFirebase(userID);
      } else {
        localStorage.setItem("favorites", JSON.stringify(this.items));
      }
    },

    async updateFavoritesInFirebase(userID) {
      try {
        await set(ref(db, `favorites/${userID}`), this.items);
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    },

    async getFavoritesFromFirebase() {
      const userID = this.getUserID();
      if (!userID) return;

      try {
        const snapshot = await get(child(ref(db), `favorites/${userID}`));
        if (snapshot.exists()) {
          this.items = snapshot.val();
        } else {
          this.items = [];
        }
      } catch (error) {
        console.error("Error getting favorites:", error);
        this.items = [];
      }
    },

    getLocalStorageFavorites() {
      const favorites = localStorage.getItem("favorites");
      if (favorites !== null) {
        this.items = JSON.parse(favorites);
      }
    },

    clearFavorites() {
      this.items = [];
      localStorage.removeItem("favorites");
      const userID = this.getUserID();
      if (userID) {
        this.updateFavoritesInFirebase(userID);
      }
    }
  },
  getters: {
    isFavorite: (state) => (productId) => {
      return state.items.some(item => item.id === productId);
    },
    favoritesCount: (state) => {
      return state.items.length;
    }
  }
});
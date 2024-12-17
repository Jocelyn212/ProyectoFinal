
import { defineStore } from "pinia";
import { useCartStore } from "./cart";
import { useFavoritesStore } from "./favorites"; // Añade esta importación
import axios from "axios";
import { updateCarts, getCarts } from "../firebase";

export const useActiveUserStore = defineStore("activeUser", {
  state: () => ({
    login: false,
    profile: {
      id: null,
      email: null,
      name: null,
      role: null,
      avatar: null,
    },
  }),
  actions: {
    async getUserData(token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/auth/profile",
          config
        );
        this.profile = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          avatar: response.data.avatar,
        };
        this.login = true;
        this.storeLogin(token);
        
        // Carga el cart y los favoritos del usuario
        const cartStore = useCartStore();
        const favoritesStore = useFavoritesStore();
        
        await Promise.all([
          cartStore.getUserCart(this.profile.id),
          favoritesStore.getFavoritesFromFirebase()
        ]);
      } catch (error) {
        console.log(error);
      }
    },

    storeLogin(token) {
      localStorage.setItem("token", token);
    },

    updateItems(items) {
      const cartStore = useCartStore();
      cartStore.setItems(items);
    },

    checkIfUserIsLogged() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUserData(token);
      } else {
        const cartStore = useCartStore();
        const favoritesStore = useFavoritesStore();
        cartStore.getLocalStorageCart();
        favoritesStore.getLocalStorageFavorites();
      }
    },

    logOut() {
      localStorage.removeItem("token");
      const cartStore = useCartStore();
      const favoritesStore = useFavoritesStore();
      cartStore.clearItems();
      favoritesStore.clearFavorites();
      this.profile = {
        id: null,
        email: null,
        name: null,
        role: null,
        avatar: null,
      };
      this.login = false;
    },
  },
  getters: {},
});
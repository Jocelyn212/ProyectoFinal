import { defineStore } from "pinia";
import { useCartStore } from "./cart";
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
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          },
        };
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/auth/profile",
          config
        );
        console.log(response);
        this.profile = {
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          avatar: response.data.avatar,
        };
        this.login = true;
        this.storeLogin(token);
        const cart = await getCarts(this.profile.id);
        // Reviso si hay un cart en el LocalStorage
        // Si hay, los agrego a los items
        // this.updateItems(cart);
        if (this.getLocalStorageCart() !== null) {
          //Los items del localstorage tienen que estar en el cartStorage
          //Añado cada item guardado en firebase
          const cartStore = useCartStore();
          cart.forEach((product) => {
            cartStore.addItemToCart(product, product.cantidad);
          });
          console.log("Borro item");
          localStorage.removeItem("cart");
        } else {
          this.updateItems(cart);
        }
      } catch (error) {
        console.log(error);
      }
      console.log(token);
    },
    storeLogin(token) {
      localStorage.setItem("token", token);
    },
    getLocalStorageCart() {
      const cart = localStorage.getItem("cart");
      return JSON.parse(cart);
    },
    updateItems(items) {
      const cartStore = useCartStore();
      cartStore.setItems(items);
    },
    // La hice asincrona para que la otra función espere antes de cargar el carrito
    checkLogin() {
      // Reviso si hay un token en localstorage
      const token = localStorage.getItem("token");
      // Si hay token => llamo a la API y busco los datos del usuario
      if (token) {
        this.getUserData(token);
        // Si no hay token, reviso si hay un carrito en el localStorage y, si hay, actualizo el cartStore
      } else {
        const cart = localStorage.getItem("cart");
        if (cart !== null) {
          this.updateItems(JSON.parse(cart)); //Json parse porque me trae un objeto y necesito un array
        }
      }
      token && this.getUserData(token);
      console.log(this.profile);
    },
    logOut() {
      this.profile = {
        email: null,
        name: null,
        role: null,
        avatar: null,
      };
      this.login = false;
      localStorage.removeItem("token");
      const cartStore = useCartStore();
      this.updateItems([]);
    },
  },
  getters: {},
});

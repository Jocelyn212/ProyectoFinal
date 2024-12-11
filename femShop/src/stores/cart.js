import { defineStore } from "pinia";
import { updateCarts, getCarts } from "../firebase";
import { useActiveUserStore } from "./user";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    // Método para traer el user id
    getUserID() {
      const userStore = useActiveUserStore();
      return userStore.profile.id;
    },
    addItemToCart(product, q) {
      const userID = this.getUserID();
      //Veo si ya tengo el objeto en el array
      const item = this.items.find((item) => item.id === product.id);
      if (item) {
        item.cantidad = item.cantidad + q;
      } else {
        this.items.push({ ...product, cantidad: q });
      }
      // Reviso si hay un usuario logueado
      console.log("reviso el userId", userID);
      if (userID == null) {
        //Si no esta logueado => guardo en localstorage. Como es un array hay que guardarlo como objeto (JSON stringify)
        console.log("Guardo en localstorage");
        localStorage.setItem("cart", JSON.stringify(this.items));
        console.log("items actualizados", this.items);
      } else {
        // Si esta logueado => guardo en la BD (Firebase)
        updateCarts(userID, this.items);
      }
    },

    setItems(items) {
      console.log("setting items", items);
      this.items = items;
      console.log(this.items);
    },

    async getItemsFromFirebase() {
      const userID = this.getUserID();
      this.items = await getCarts(userID); //leer de la DB los items
    },

    deleteItem(index) {
      this.items.splice(index, 1);
      // const userID = this.getUserID();
      const userID = useActiveUserStore().profile.id;
      updateCarts(userID, this.items);
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    clearCart() {
      this.items = [];
      localStorage.removeItem("cart");
      const userID = this.getUserID();
      updateCarts(userID, this.items);
    },

    clearItems() {
      this.items = [];
    },

    // Trae el cart del usuario
    async getUserCart(userID) {
      // Trae los datos de Firebase del usuario
      const cart = await getCarts(userID);
      // Revisa si hay items en el carrito actual (del localStorage)
      if (this.cartSize === 0) {
        // Si hay 0 items solamente actualiza el estado con los items que trajo de Firebase
        this.items = cart;
      } else {
        // Si ya hay items, agrega uno a uno (esto es para que revise si algun producto ya esta y no se repitan.)
        console.log("Hay items", this.items);
        cart.forEach((product) => {
          this.addItemToCart(product, product.cantidad);
        });
        // Borra el localStorage
        localStorage.removeItem("cart");
      }
    },
    getLocalStorageCart() {
      const cart = localStorage.getItem("cart");
      if (cart !== null) {
        this.items = JSON.parse(cart);
      }
    },
  },
  getters: {
    cartSize() {
      if (this.items !== null) {
        const cantidades = this.items.map((i) => i.cantidad);
        return cantidades.reduce((acc, i) => acc + i, 0);
      } else {
        return 0;
      }
    },
    cartTotal() {
      if (this.items !== null) {
        const total = this.items.map((i) => i.price * i.cantidad);
        return total.reduce((acc, i) => acc + i, 0);
      } else {
        return 0;
      }
    },
  },
});

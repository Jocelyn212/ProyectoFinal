import { defineStore } from "pinia";
import { updateCarts, getCarts } from "../firebase";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    addItemToCart(product, q) {
      //Veo si ya tengo el objeto en el array
      const item = this.items.find((item) => item.id === product.id);
      if (item) {
        item.cantidad = item.cantidad + q;
      } else {
        this.items.push({ ...product, cantidad: q });
      }
      updateCarts(this.items);
    },

    async getItemsFromFirebase() {
      this.items = await getCarts(); //leer de la DB los items
    },

    deleteItem(index) {
      this.items.splice(index, 1);
      updateCarts(this.items);
    },
    clearCart() {
      this.items = [];
      updateCarts(this.items);
    },
  },
  getters: {
    cartSize() {
      const cantidades = this.items.map((i) => i.cantidad);
      return cantidades.reduce((acc, i) => acc + i, 0);
    },
    cartTotal() {
      const total = this.items.map((i) => i.price * i.cantidad);
      return total.reduce((acc, i) => acc + i, 0);
    },
  },
});

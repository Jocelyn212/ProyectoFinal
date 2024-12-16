<template>
  <div class="card">
    <figure class="relative cursor-pointer" @click="showProductDetails">
      <img
        v-if="product.images"
        :src="product.images[0]"
        :alt="product.title"
      />
      <span class="favorite fa-regular fa-heart"></span>
      <span class="favorite fa-solid fa-heart"></span>
    </figure>
    <div class="product-details">
      <h3 class="title flex items-center">{{ product.title }}</h3>
      <p class="price">€ {{ product.price }}</p>
    </div>
    <div class="buttons flex p-1 justify-between items-end">
      <button
        class="button button-secondary whitespace-nowrap mr-2 rounded-xl"
        @click="cartStore.addItemToCart(product, 1)"
      >
        Add to cart
      </button>
      <button
        class="button button-secondary rounded-xl"
        @click="showProductDetails"
      >
        <span class="fa-regular fa-eye"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cart";
import { useFavoritesStore } from "../stores/favorites";
import { useActiveUserStore } from "../stores/user";
import { mapStores } from "pinia";

export default {
  name: "Card",
  props: ["product"],

  computed: {
    ...mapStores(useCartStore, useFavoritesStore, useActiveUserStore),
  },

  methods: {
    showProductDetails() {
      this.$router.push(`/product/${this.product.id}`);
    },
    handleFavoriteClick() {
      if (!this.activeUserStore.profile) {
        alert("Please login to add favorites");
        return;
      }
      this.favoritesStore.toggleFavorite(this.product);
    },
  },

  async mounted() {
    if (this.activeUserStore.profile) {
      await this.favoritesStore.getFavoritesFromFirebase();
    } else {
      this.favoritesStore.getLocalStorageFavorites();
    }
  },
};
</script>

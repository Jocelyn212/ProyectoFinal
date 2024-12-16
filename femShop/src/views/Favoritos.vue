<template>
    <main>
      <div class="container">
        <h1 class="text-2xl font-bold mb-4">My Favorites</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="item in favoritesStore.items" :key="item.id" class="product-card">
            <img v-if="item.images" :src="item.images[0]" :alt="item.title" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h2 class="text-xl font-bold">{{ item.title }}</h2>
              <p class="text-gray-600">{{ item.price }} €</p>
              <div class="flex justify-between mt-4">
                <button class="button button-primary" @click="goToProduct(item.id)">
                  View Details
                </button>
                <button class="button button-red" @click="favoritesStore.toggleFavorite(item)">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import { useFavoritesStore } from "../stores/favorites";
  import { mapStores } from "pinia";
  
  export default {
    name: "Favorites",
    computed: {
      ...mapStores(useFavoritesStore)
    },
    methods: {
      goToProduct(productId) {
        this.$router.push(`/product/${productId}`);
      }
    }
  }
  </script>
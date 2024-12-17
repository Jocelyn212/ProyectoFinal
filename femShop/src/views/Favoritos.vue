<template>
    <main>
      <Breadcrumb />
      <div class="container flex-col relative">
        <p class="text-center font-bold" v-if="isAuthenticated" >Hello <span class="capitalize">{{ activeUserStore.profile.name }}</span>!</p>
        <h2 class="title-1 text-center mt-1 mb-12 relative z-20" >Your favorites </h2>
            <div class="shop-container " >
              <Card :product="item" v-for="item in favoritesStore.items" :key="item.id" />
            </div>
            <button class="button button-primary mt-8 mx-auto" @click="favoritesStore.deleteFavorites()">
              Clear all favorites
            </button>
      </div>
    </main>
  </template>
  
  <script>
  import { useFavoritesStore } from "../stores/favorites";
  import { useActiveUserStore } from "../stores/user";
  import Breadcrumb from "../components/Breadcrumb.vue";
  import { mapStores } from "pinia";
  import Card from "../components/Card.vue";
  
  export default {
    name: "Favorites",
    computed: {
      ...mapStores(useFavoritesStore, useActiveUserStore),
      isAuthenticated() {
          return this.activeUserStore.profile?.name;
      },
    },
    components: {
         Card, Breadcrumb
     },
    methods: {
      goToProduct(productId) {
        this.$router.push(`/product/${productId}`);
      }
    }
  }
  </script>
  <style>
  @media (max-width: 640px) {
        .favorites .shop-container{
            margin-top:0!important
        }
    }
  </style>
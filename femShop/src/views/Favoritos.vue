<template>
    <main>
      <Breadcrumb />
      <div class="container flex-col relative">
        <h2 class="title-1 text-center mt-4 mb-12 relative z-20">My Favorites</h2>
       
            <div class="shop-container " >
              <Card :product="item" v-for="item in favoritesStore.items" :key="item.id" />
  
            </div>
      </div>
    </main>
  </template>
  
  <script>
  import { useFavoritesStore } from "../stores/favorites";
  import Breadcrumb from "../components/Breadcrumb.vue";
  import { mapStores } from "pinia";
  import Card from "../components/Card.vue";
  
  export default {
    name: "Favorites",
    computed: {
      ...mapStores(useFavoritesStore)
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
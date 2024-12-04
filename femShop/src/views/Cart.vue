<template>
    <!--  <div class="cart">
         <div v-for="(item) in cartStore.items">
         {{ item.title }}
         <button class="btn btn-danger" @click="cartStore.deleteItem(index)">X</button>
     </div> -->
     <div v-for="item in cartStore.items">
         <p>{{item.title}}</p>
         <p>{{item.price}}</p>
         <button class="btn btn-danger" @click="cartStore.deleteItem(index)">X</button>
     </div>
     
  </template>
  <script>
  import { useCartStore} from "../stores/cart"
 import {mapStores} from "pinia"
  export default {
      name: "Cart",
      computed:{
         ...mapStores(useCartStore)
      }
  }
  </script>
  <style>
  </style>
 
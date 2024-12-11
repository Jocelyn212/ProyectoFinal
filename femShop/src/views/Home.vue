<template>
    <main>
     <div class="container flex-col">
         <h2 v-if="products" class="title-1 mt-10">Category: {{ selectedCategory ? selectedCategory.name : 'All' }}</h2>
         <form class="self-center mb-8" @submit.prevent="searchProducts">
             <label for="pr-search" class="hidden">Search</label>
             <input v-model="searchQuery" id="pr-search" type="text" placeholder="Search ..." class="form-input" />
             <button class="button button-primary -ml-[12px] relative">Search</button>
         </form>
         <div class="category-filter mb-8">
             <button @click="filterByCategory(null)" class="button">All</button>
             <button v-for="category in categories" :key="category.id" @click="filterByCategory(category)" class="button">{{ category.name }}</button>
         </div>
         <div class="shop-container">
             <Card v-for="product in filteredProducts" :key="product.id" :product="product" @click=""/>
         </div>
     </div>
    </main>
 </template>
 
 <script>
 import axios from "axios";
 import Card from "../components/Card.vue";
 import { getAllProducts } from "../firebase"; // Asegúrate de importar el método correcto
 
 export default {
     name: "Home",
     components: {
         Card
     },
     data() {
         return {
             products: null,
             searchQuery: "",
             filteredProducts: null,
             categories: [], // Lista de categorías
             selectedCategory: null, // Categoría seleccionada
         }
     },
     methods: {
         async getProductData() {
             try {
                 const response = await getAllProducts();
                 this.products = response;
                 this.filteredProducts = this.products; 
                 this.extractCategories(); // Extraer categorías de los productos
                 console.log(response)
             } catch(error) {
                 console.log(error)
             }
         },
         searchProducts() {
             this.filterProducts();
             this.searchQuery = ""; // Borrar el campo de búsqueda
         },
         filterProducts() {
             let filtered = this.products;
             if (this.selectedCategory) {
                 filtered = filtered.filter(product => product.category.id === this.selectedCategory.id);
             }
             if (this.searchQuery) {
                 filtered = filtered.filter(product =>
                     product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                 );
             }
             this.filteredProducts = filtered;
         },
         filterByCategory(category) {
             this.selectedCategory = category;
             this.filterProducts();
         },
         extractCategories() {
             const categories = this.products.map(product => product.category);
             this.categories = [...new Set(categories.map(category => JSON.stringify(category)))].map(category => JSON.parse(category));
         }
     },
     mounted() {
         this.getProductData();
     }
 }
 </script>
 
 <style>
 
 </style>
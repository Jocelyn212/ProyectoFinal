<template>
    <main>
     <div class="container flex-col relative">
        <!-- <div class="category-filter mb-8">
             <button @click="filterByCategory(null)" class="button">All</button>
             <button v-for="category in categories" :key="category.id" @click="filterByCategory(category)" class="button">{{ category.name }}</button>
         </div> -->
         
         <h2 v-if="products" class="title-1 text-center mt-4 relative z-20 sm:block hidden">{{ selectedCategory ? selectedCategory.name : 'All products' }}</h2>

         <div class="catalog-headings">
        <!-- Dropdown categorias -->
            <div class="relative inline-block w-[70%] sm:w-auto z-20 ">
                <button class="dropdown-button w-full " @click="toggleMenu">Browse categories 
                    <span v-if="CatisOpen" class="fa-solid fa-chevron-up ml-2 text-dark-grey"></span>
                    <span  v-else class="fa-solid fa-chevron-down ml-2 text-dark-grey"></span>
                </button>
                <ul v-if="CatisOpen" class="dropdown-menu" @click="toggleMenu">
                    <li @click="filterByCategory(null)" >Al products</li>
                    <li v-for="category in categories" :key="category.id" @click="filterByCategory(category)" >{{ category.name }}</li>
                </ul>
            </div>
        
         <!-- Search -->
            <form class="self-center mb-0 z-10 relative" @submit.prevent="searchProducts">
                <label for="pr-search" class="hidden">Search</label>
                <input v-model="searchQuery" id="pr-search" type="text" placeholder="Search ..." class="form-input sm:w-[220px] !border-amarillo" />
                <button class="button button-primary -ml-[12px] relative !border-amarillo">Search</button>
            </form>
            <h2 v-if="products" class="title-2 text-center pb-2 relative  sm:hidden block">{{ selectedCategory ? selectedCategory.name : 'All products' }}</h2>
        </div>
        <!-- Shop -->
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
             CatisOpen: false, 
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
         },
         toggleMenu() {
            this.CatisOpen = !this.CatisOpen;
            },
     },
     mounted() {
         this.getProductData();
     }
 }
 </script>
 
 <style>

 </style>
<template>
    <main>
    <Breadcrumb :categoryName="selectedCategory ? selectedCategory.name : ''" />
    <div class="container" v-if="!loaded"><div class="loader">Loading...</div></div>
     <div class="container flex-col relative" v-if="loaded">      
         <h2 v-if="products" class="title-1 text-center mt-4 relative z-20 sm:block hidden">{{ selectedCategory ? selectedCategory.name : 'All products' }}</h2>
         <div class="catalog-headings bg-black">
        <!-- Dropdown categorias -->
            <div class="relative inline-block w-[70%] sm:w-auto z-20">
                <button class="dropdown-button w-full " @click="toggleMenu">Browse categories 
                    <span v-if="CatisOpen" class="fa-solid fa-chevron-up ml-2 text-dark-grey"></span>
                    <span  v-else class="fa-solid fa-chevron-down ml-2 text-dark-grey"></span>
                </button>
                <ul v-if="CatisOpen" class="dropdown-menu" @click="toggleMenu">
                    <li @click="filterByCategory(null)" >All products</li>
                    <li v-for="category in categories" :key="category.id" @click="filterByCategory(category)" >{{ category.name }}</li>
                </ul>
            </div>
            <div v-if="this.activeSearch"><span class="mr-3 text-2xl">'{{ this.activeSearch}}'</span><router-link :to="{ name: 'shop' }"> <sup><i class="fa-solid fa-x cursor-pointer"  @click="searchProducts"></i></sup></router-link></div>
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
        <!-- You searched for -->
            <div class="lg:col-span-4 md:col-span-3">
              
              <div v-if="this.activeSearch" class="border  rounded-md p-2 text-center text-base min-w-[200px] max-w-[300px] self-center mb-5  border-gray-300 relative mx-auto">
                <span class="border border-gray-300 rounded-md px-1  hover:bg-gray-100 bg-gray-200 fa-solid fa-xmark cursor-pointer absolute top-2 right-2"  @click="searchProducts"></span>
                <p class="mt-2">You searched for: <span class="font-bold">'{{ this.activeSearch}}'</span></p>
              </div>
              <div v-if="this.filteredProducts.length === 0">
                <p class="text-2xl font-bold text-lila-primary text-center mb-10">Sorry, no products were found for your search.
                </p>
              </div>
            </div>
            
             <Card v-for="product in filteredProducts" :key="product.id" :product="product" @click=""/>
         </div>
     </div>
    </main>
 </template>
 
 <script>
 import Breadcrumb from "../components/Breadcrumb.vue";
 import Card from "../components/Card.vue";
 import { getAllProducts } from "../firebase"; // Asegúrate de importar el método correcto
 
 export default {
     name: "Home",
     components: {
         Card, Breadcrumb
     },
     data() {
         return {
             CatisOpen: false, 
             products: null,
             searchQuery: "",
             filteredProducts: [],
             categories: [], // Lista de categorías
             selectedCategory: null, // Categoría seleccionada
             loaded: false,
             activeSearch: null,
             errorMessage: null
         }
     },
     methods: {
         async getProductData() {
             try {
                 const response = await getAllProducts();
                 this.products = response;
                 this.filteredProducts = this.products; 
                 this.extractCategories(); // Extraer categorías de los productos
                 this.loaded = true
             } catch(error) {
                 console.log(error)
             }
         },
         searchProducts() {
             this.filterProducts();
             this.activeSearch = this.searchQuery
             setTimeout(() => {
                  this.searchQuery = "";
              }, 10);
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
     async mounted() {
         await this.getProductData();
         const route = this.$route;
         if(route.query.category) {
            if(this.categories.find((category) => category.id == route.query.category)) {
                this.filterByCategory(this.categories.find((category) => category.id == route.query.category))
            }
         }
         if(route.query.keywords) {
            this.searchQuery = route.query.keywords;
            this.searchProducts()
         }
     },
     watch: {
        //Esto hace que si hay algun cambio en la query, se actualice la página
    '$route.query.keywords': function (newSearchQuery) {
      this.searchQuery = this.$route.query.keywords;
      this.searchProducts();
      //Vuelve al inicio de la página
      window.scrollTo(0, 0)
    },
    '$route.query.category': function (newSearchQuery) {
      this.searchQuery = this.$route.query.keywords;
      this.filterByCategory(this.categories.find((category) => category.id == this.$route.query.category))
      //Vuelve al inicio de la página
      window.scrollTo(0, 0)
    },
    selectedCategory(newCategory) {
            this.$root.$emit( newCategory ? newCategory.name : 'All Products');
        }
  },
 }
 </script>
 
 <style>
.loader {
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #540d6e, 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.5), -1.8em -1.8em 0 0em rgba(84,13,110, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.7), 1.8em -1.8em 0 0em #540d6e, 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.5), 1.8em -1.8em 0 0em rgba(84,13,110, 0.7), 2.5em 0em 0 0em #540d6e, 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.5), 2.5em 0em 0 0em rgba(84,13,110, 0.7), 1.75em 1.75em 0 0em #540d6e, 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.5), 1.75em 1.75em 0 0em rgba(84,13,110, 0.7), 0em 2.5em 0 0em #540d6e, -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.5), 0em 2.5em 0 0em rgba(84,13,110, 0.7), -1.8em 1.8em 0 0em #540d6e, -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.5), -1.8em 1.8em 0 0em rgba(84,13,110, 0.7), -2.6em 0em 0 0em #540d6e, -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.5), -2.6em 0em 0 0em rgba(84,13,110, 0.7), -1.8em -1.8em 0 0em #540d6e;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #540d6e, 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.5), -1.8em -1.8em 0 0em rgba(84,13,110, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.7), 1.8em -1.8em 0 0em #540d6e, 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.5), 1.8em -1.8em 0 0em rgba(84,13,110, 0.7), 2.5em 0em 0 0em #540d6e, 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.5), 2.5em 0em 0 0em rgba(84,13,110, 0.7), 1.75em 1.75em 0 0em #540d6e, 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.5), 1.75em 1.75em 0 0em rgba(84,13,110, 0.7), 0em 2.5em 0 0em #540d6e, -1.8em 1.8em 0 0em rgba(84,13,110, 0.2), -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.5), 0em 2.5em 0 0em rgba(84,13,110, 0.7), -1.8em 1.8em 0 0em #540d6e, -2.6em 0em 0 0em rgba(84,13,110, 0.2), -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.5), -1.8em 1.8em 0 0em rgba(84,13,110, 0.7), -2.6em 0em 0 0em #540d6e, -1.8em -1.8em 0 0em rgba(84,13,110, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(84,13,110, 0.2), 1.8em -1.8em 0 0em rgba(84,13,110, 0.2), 2.5em 0em 0 0em rgba(84,13,110, 0.2), 1.75em 1.75em 0 0em rgba(84,13,110, 0.2), 0em 2.5em 0 0em rgba(84,13,110, 0.2), -1.8em 1.8em 0 0em rgba(84,13,110, 0.5), -2.6em 0em 0 0em rgba(84,13,110, 0.7), -1.8em -1.8em 0 0em #540d6e;
  }
}

 </style>
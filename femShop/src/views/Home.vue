<!-- <template>
   <main>
    <div class="container flex-col">
        <h2 v-if="products" class="title-1 mt-10">Category: {{ products[0].category.name }}</h2>
        <form class="self-center mb-8">
            <label for="pr-search" class="hidden">Search</label>
            <input  id="pr-search"  type="text" placeholder="Search ..." class="form-input" />
            <button class="button button-primary -ml-[12px] relative">Search</button>
        </form>
        <div class="shop-container">
            <Card v-for="product in products" :product="product" @click=""/>
        </div>
    </div>
   </main>
</template>
<script>
import axios from "axios";
import Card from "../components/Card.vue";


export default {
    name: "Home",
    components: {
        Card
    },
    data() {
        return {
            products: null,
        }
    },
    methods: {
        async getProductData() {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=5`);
                this.products = response.data;
                console.log("aca",this.products)
                this.products.forEach(prod => {
                    if(prod.images[0].startsWith("[")) {
                        if(prod.images[0].endsWith("]")) {
                            prod.images[0] = prod.images[0].slice(2,-2)
                         } else {
                            prod.images[0] = prod.images[0].slice(2,-1)
                        }
                    }})
                    console.log("aca2",this.products)
            } catch(error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.getProductData();
    }
}

</script>
<style>

</style> -->
<template>
   <main>
    <div class="container flex-col">
        <h2 v-if="products" class="title-1 mt-10">Category: {{ products[0].category.name }}</h2>
        <form class="self-center mb-8" @submit.prevent="searchProducts">
            <label for="pr-search" class="hidden">Search</label>
            <input v-model="searchQuery" id="pr-search" type="text" placeholder="Search ..." class="form-input" />
            <button class="button button-primary -ml-[12px] relative">Search</button>
        </form>
        <div class="shop-container">
            <Card v-for="product in filteredProducts" :key="product.id" :product="product" @click=""/>
        </div>
    </div>
   </main>
</template>

<script>
import axios from "axios";
import Card from "../components/Card.vue";

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
        }
    },
    methods: {
        async getProductData() {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=5`);
                this.products = response.data;
                this.filteredProducts = this.products; // Inicialmente, mostrar todos los productos
            } catch(error) {
                console.log(error)
            }
        },
        searchProducts() {
            if (!this.searchQuery) {
                this.filteredProducts = this.products;
            } else {
                this.filteredProducts = this.products.filter(product =>
                    product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }
            this.searchQuery = "";
        }
    },
    mounted() {
        this.getProductData();
    }
}
</script>

<style>

</style>
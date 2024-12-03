<template>
   <main  class="w-full">
    <div class="container flex-col">
        <h2 v-if="products" class="title-1 mt-4">{{ products[0].category.name }}</h2>
        <form class="self-center mb-8">
            <label for="pr-search" class="hidden">Search</label>
          <input  id="pr-search"  type="text" placeholder="Search ..." class="rounded-md border px-3 py-2 text-dark-grey border-grey outline-none relative">
          <button class="button button-primary -ml-[8px] relative">Search</button>
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
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=4`);
                this.products = response.data;
                console.log(this.products)
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

</style>
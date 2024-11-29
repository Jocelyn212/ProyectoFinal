<template>
   <div class="main">
    <div class="shop-container grid grid-cols-4 gap-4">
    <Card v-for="product in products" :product="product" @click=""/>
</div>
   </div>
</template>
<script>
import axios from "axios";
import Card from "../components/Card.vue"

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
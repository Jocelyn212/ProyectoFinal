<template>
    <div class="card">
        <figure class="relative"><img v-if="product.images" :src="product.images[0]" :alt="product.title">
        <span class="favorite fa-regular fa-heart"></span>
        <span class="favorite fa-solid fa-heart"></span>
        </figure>
        <div class="product-details">
            <h3 class="title flex items-center">{{ product.title}}</h3>
            <p class="price">€ {{ product.price}}</p>
        </div>
        <div class="buttons flex  p-1 justify-between items-end">    
            <button class="button button-secondary whitespace-nowrap mr-2 rounded-xl " @click="cartStore.addItemToCart(product,1)"> Add to cart </button>
            <button class="button button-secondary rounded-xl "><span class="fa-regular fa-eye"></span></button>
        </div>
    </div>
</template>
<script>
import { useCartStore} from "../stores/cart"
import {mapStores} from "pinia"

export default {
    name: "Card",
    props: ["product"],

    computed:{
    ...mapStores(useCartStore)
}

}
</script>
<style></style>
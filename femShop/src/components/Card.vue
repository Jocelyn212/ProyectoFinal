<template>
    <div class="card">
        <figure><img v-if="product.images" :src="product.images[0]" :alt="product.title"></figure>
        <h3 class="title flex items-center">{{ product.title}}</h3>
        <p class="price">€ {{ product.price}}</p>
        <div class="buttons flex mt-2 justify-center">    
            <button class="button button-secondary whitespace-nowrap mr-2">Add to cart</button>
            <button class="button button-secondary"><span class="fa-regular fa-eye"></span></button>
        </div>
    
    </div>
</template>
<script>
export default {
    name: "Card",
    props: ["product"]

}
</script>
<style></style>
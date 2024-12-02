<template>
    <div class="card border cursor-pointer text-ellipsis overflow-hidden">
        <h2>{{ product.title}}</h2>
        <figure><img v-if="product.images" :src="product.images[0]"></figure>
        <p>{{ product.price}}</p>
        <div class="buttons">    
        <button class="button add-to-cart">Add to cart</button>
        <button class="button details">Details</button>
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
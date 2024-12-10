<template>
    <main>
        <div class="container">
            <div class="product-card" >
                <div class="product-images">
                    <div class="image-primary mb-6">
                        <img 
                        v-if="product.images && product.images.length" 
                        :src="product.images[0]" 
                        :alt="product.title"
                      
                    >
                    </div>
                    <div class="images-secondary sm:flex hidden flex-nowrap gap-4" >
                        <img 
                        v-if="product.images[1] && product.images[1].length" 
                        :src="product.images[1]" 
                        :alt="product.title"
                        class="w-[110px]"
                    >
                        <img 
                            v-if="product.images[2] && product.images[2].length" 
                            :src="product.images[2]" 
                            :alt="product.title"
                            class="w-[110px]"
                        >
                    </div>
                </div>
                <div class="product-data sm:col-span-2">
                    <h2 class="title">
                        {{ product.title }}
                     
                    </h2>
                    <p class="price">
                         {{ product.price }} €
                    </p>
                    <p class="description">
                         {{ product.description }} €
                    </p>
                   
                    <div class="availability"></div>

                    <div class="qty">
                        <span></span>
                        <div></div>
                    </div>

                    <button class="button button-primary"  @click="cartStore.addItemToCart(product, 1)"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </main>
 </template>
 <script>
    import { useCartStore} from "../stores/cart"
    import {mapStores} from "pinia"

 export default {
     name: "Product",

  data() {
        return {
            product: {
                id: null,
                title: '',
                price: 0,
                description: '',
                images: []
            }
        }
    },
     computed:{
    ...mapStores(useCartStore)
    },
    mounted() {
        const productId = this.$route.params.id
        fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                this.product = data
                console.log(this.product);
            })
            .catch(error => {
                console.error("Error fetching product details:", error)
            })
    }
    
 }
 </script>
 <style>
 
 </style>
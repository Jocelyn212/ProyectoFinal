<template>
    <main>
        <div class="container">
            <div class="product-card" >
                <div class="product-images">
                    <div class="image-primary mb-4">
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
                        class="w-[46.5%]"
                    >
                        <img 
                            v-if="product.images[2] && product.images[2].length" 
                            :src="product.images[2]" 
                            :alt="product.title"
                            class="w-[46.5%]"
                        >
                    </div>
                </div>
                <div class="product-data ">
                    <h2 class="title">
                        {{ product.title }}
                     
                    </h2>
                    <p class="price">
                         {{ product.price }} €
                    </p>
                    <div class=" mb-4">
                        <span class="txt mr-2">Availability:  </span>
                        <span class=" text-green"><span class="fa-solid fa-check"></span> in stock</span>
                    </div>
                    <p class="description">
                         {{ product.description }} 
                    </p>

                    <div class="qty ">
                        <span class="txt">Quantity:</span>
                        <button 
                        @click="decrementQuantity"
                        :disabled="quantity <= 1"
                        >
                        -
                        </button>
                        <span class="txt text-rosa">{{ quantity }}</span>
                        <button 
                        @click="incrementQuantity"
                        >
                        +
                        </button>
                    </div>

                    <button class="button button-primary"  @click="addToCart"
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
    import {getProduct} from "../firebase"
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
                },
                quantity: 1,
            }
        },
        computed:{
            ...mapStores(useCartStore)
        },
        methods: {
            incrementQuantity() {
                this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        addToCart() {
            this.cartStore.addItemToCart(this.product, this.quantity);
        },
        async getProduct(productId) {
            try {
                const response = await getProduct(productId);
                this.product = response;
                console.log(response)
            } catch(error) {
                console.log(error)
            }
        }
    },
        mounted() {
            const productId = this.$route.params.id
            this.getProduct(productId)
            
           /*  fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
                .then(response => response.json())
                .then(data => {
                    this.product = data
                    console.log(this.product);
                })
                .catch(error => {
                    console.error("Error fetching product details:", error)
                }) */
        }
        
    }
 </script>
 <style>
 
 </style>
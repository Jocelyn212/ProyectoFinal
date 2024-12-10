<template>
<main  class="w-full">
    <div class="container">
        <!--  <div class="cart">
            <div v-for="(item) in cartStore.items">
            {{ item.title }}
            <button class="btn btn-danger" @click="cartStore.deleteItem(index)">X</button>
        </div> -->
        <div class="cart-container max-w-screen-lg mx-auto">
            <div class="product-list">
                <div class="titles cart-cols">
                    <div class="col-span-3 ">Product</div>
                    <div class="text-center">Price</div>
                    <div class="text-center">Quantity</div>
                    <div class="text-center">Subtotal</div>
                    <div class="text-center">Delete</div>
                </div>
                <div v-for="item in cartStore.items" class="items cart-cols ">
                    <div class="item flex text-xs col-span-3 items-center">
                        <img v-if="item.images" :src="item.images[0]" :alt="item.title" class="card-img" />
                        <h2 class="text-lila-primary font-bold">    {{item.title}}
                        </h2>
                    </div>
                    <p class="price">{{item.price}} €</p>
                    <div class="price cantidad">
                        <span>{{ item.cantidad }}</span>
                    </div>
                    <div class="price subtotal"><span> {{  item.price * item.cantidad }}</span> €</div>
                    <button class="btn btn-danger" @click="cartStore.deleteItem(index)"><span class="fa-regular fa-circle-xmark text-lg text-red"></span>
                    </button>
                </div>

                <div class="buttons">
                    <button class="button button-primary text-xs">
                        Continue shopping
                    </button>
                    <!-- <button class="button button-white">
                        Update cart shopping
                    </button> -->
                    <button class="button button-red" @click="cartStore.clearCart">
                        Clear cart
                    </button>
                    
                </div>
            </div>
            <div class="cart-total">
                <div class="titles text-center py-2 px-4">
                    <span>Cart total</span>
                </div>
                <div class="cont" >
                    <div class="amount border-b border-grey">
                        <span>Subtotal</span>
                        <span>{{ cartStore.cartTotal}} €</span>
                    </div>
                    <div class="coupon border-b border-grey p-2 flex justify-center">
                        <label for="pr-coupon" class="hidden">coupon</label>
                        <input id="pr-coupon"  type="text" placeholder="Enter coupon code" class="form-input text-sm">
                    </div>
                    <div class="amount">
                        <span>Total amount</span>
                        <span>{{ cartStore.cartTotal}} €</span>
                    </div>
                    <button class="button button-primary text-xs">Proceed to checkout</button>

                </div>
  
            </div>
            
        

        
    </div>
</div>
    </main>
</template>
<script>
    import { useCartStore} from "../stores/cart"
    import {mapStores} from "pinia"
    export default {
        name: "Cart",
        computed:{
            ...mapStores(useCartStore)
        }
     }
  </script>
  <style>
  </style>
 
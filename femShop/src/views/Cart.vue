<template>
<main  class="w-full">
    <div class="container mt-8">
        <!--  <div class="cart">
            <div v-for="(item) in cartStore.items">
            {{ item.title }}
            <button class="btn btn-danger" @click="cartStore.deleteItem(index)">X</button>
        </div> -->
        <div class="cart-container">
            <div class="product-list ">
                <div class="titles cart-cols">
                    <div class="col-span-2 ">Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Subtotal</div>
                    <div></div>
                </div>
                <div v-for="item in cartStore.items" class="items cart-cols">
                    <div class="item flex text-xs col-span-2 items-center">
                        <img v-if="item.images" :src="item.images[0]" :alt="item.title" class="w-[50px] mr-4 rounded-lg border border-grey">
                       <h2 class="text-lila-primary font-bold ">{{item.title}}</h2>
                    </div>
                    <p class="font-bold">{{item.price}} €</p>
                    <div class="qty"></div>
                    <div class="subtot"></div>
                    <button class="btn btn-danger" @click="cartStore.deleteItem(index)"><span class="fa-regular fa-circle-xmark text-lg text-red"></span></button>
                </div>
            
            <div class="cart-total">
    
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
 
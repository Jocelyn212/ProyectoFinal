<template>
    <header>
        <div class="container flex  items-center justify-between py-4 text-xs">
            <span contenteditable="true">Need help? Call us: (+98) 0234 456 789</span>
            <span contenteditable="true"><span class="fa-solid fa-truck mr-2"></span>Track your order</span>
        </div>     
        <div class="header-gradient ">
            <div class="container items-center justify-between py-4">
                <div class="logo">
                    <img src="../img/FemShopH.png" alt="FemShop - Online Shop">
                    <h1 class="h-slogan">Online Shop</h1>
                </div>
                <div class="h-buttons">
                    <ul class="flex ">
                        <li contenteditable="true" class="link"><span class="fa-regular fa-user mr-2"></span>Sign in</li>
                    
                        <li contenteditable="true" class="link"><RouterLink to="/cart"><span class="fa-solid fa-cart-shopping  mr-2"></span>Cart<sup class="item-num">{{ cartStore.cartSize }}</sup></RouterLink></li>
                    </ul>
                </div>
            </div>
        </div>
        <nav class="w-full bg-light-grey shadow">
            <div class="container justify-between py-0 items-end">
                <div class="relative inline-block">
                    <button class="dropdown-button " @click="toggleMenu">Browse categories 
                        <span v-if="isOpen" class="fa-solid fa-chevron-up ml-2 text-white"></span>
                        <span  v-else class="fa-solid fa-chevron-down ml-2 text-white"></span>
                    </button>
                    <div v-if="isOpen" class="dropdown-menu">
                        <a href="#" class="dropdown-item">Bags</a>
                        <a href="#" class="dropdown-item">Clothing</a>
                        <a href="#" class="dropdown-item">Technology</a>
                    </div>
                </div>
                <ul class="links">
                    <li class="link" contenteditable="true"><RouterLink to="/">Home <span class="fa-solid fa-chevron-down ml-2"></span></RouterLink></li>
                    <li class="link" contenteditable="true">About us<span class="fa-solid fa-chevron-down ml-2"></span></li>
                </ul>
            </div>
        </nav>
    </header>
</template>
<script>
import { useCartStore} from "../stores/cart"
import {mapStores} from "pinia"
export default {
    name: "Header",
    data() {
        return {
        isOpen: false, 
        };
    },
    methods: {
        toggleMenu() {
        this.isOpen = !this.isOpen;
        },
    },
        computed:{
        ...mapStores(useCartStore)
    }
}
</script>
<style>

</style>
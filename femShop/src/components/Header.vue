<template>
    <header>

        <div class="container flex  items-center justify-between py-2">
            <span>Need Help?</span>
            <span>Track your order</span>
        </div>     
        <div class="header-gradient ">
            <div class="container items-center justify-between py-4">
                <div class="logo">
                    <img src="../img/FemShopH.png" alt="FemShop - Online Shop">
                    <h1 class="h-slogan">Online Shop</h1>
                </div>
                <div class="h-buttons">
                    <ul class="flex">
                        <li class="mr-4">Sign in</li>
                    
                        <li><RouterLink to="/cart">Cart<sup class="item-num">{{ cartStore.cartSize }}</sup></RouterLink></li>
                    </ul>
                </div>
            </div>
        </div>
        <nav class="w-full bg-light-grey">
            <div class="container items-center justify-between py-2">
                Nav     
            </div>
        </nav>
    </header>
</template>
<script>
import { useCartStore} from "../stores/cart"
import {mapStores} from "pinia"
export default {
    name: "Header",
    computed:{
    ...mapStores(useCartStore)
}
}
</script>
<style></style>
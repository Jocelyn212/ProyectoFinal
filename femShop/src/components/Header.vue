<template>
    <header>
        <div class="container flex  items-center justify-between py-4 text-xs bg-white">
            <span>Need help? Call us: (+98) 0234 456 789</span>
            <span><span class="fa-solid fa-truck mr-2"></span>Track your order</span>
        </div> 
    <!-- Header with gradient -->
        <div class="header-gradient ">
            <div class="container items-center justify-between py-4">
                <RouterLink to="/">
                    <div class="logo">
                            <img src="../img/FemShopH.png" alt="FemShop - Online Shop">
                            <h1 class="h-slogan">Online Shop</h1>
                    </div>
                </RouterLink>
                <div class="h-buttons">
                    <ul class="flex sm:items-center items-start gap-x-4 sm:gap-x-8 sm:gap-y-0 gap-y-4 sm:flex-nowrap flex-wrap  sm:w-auto w-[120px] ">
                        <li class="link" v-if="!activeUserStore.profile.avatar" @click="toggleSignIn">
                            <span class="fa-regular fa-user sm:mr-2 mr-3" ></span>Sign in
                        </li>
                        <li class="link flex items-center  whitespace-nowrap gap-2" v-if="activeUserStore.profile.avatar">
                            <img :src="activeUserStore.profile.avatar" class="sm:w-8 w-5 rounded-full border-amarillo sm:border-2 sm:shadow-md">{{activeUserStore.profile.name}}
                        </li>
                        <li class="link whitespace-nowrap" v-if="activeUserStore.profile.avatar" @click="logOut">
                            <span class="fa-regular fa-user sm:mr-2 mr-4" ></span>Log out
                        </li>
                        <li class="link whitespace-nowrap">
                            <RouterLink to="/">
                            <span class="fa-solid fa-store  sm:mr-2 mr-3"></span>Shop
                            </RouterLink>
                        </li>
                        <li class="link whitespace-nowrap">
                            <RouterLink to="/cart">
                            <span class="fa-solid fa-cart-shopping  sm:mr-2 mr-3"></span>Cart<sup class="item-num">{{ cartStore.cartSize }}</sup>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    <!-- Old Nav -->
        <!-- <nav class="w-full bg-light-grey shadow">
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
                    <li class="link">
                        <RouterLink to="/">Home <span class="fa-solid fa-chevron-down ml-2"></span></RouterLink>
                    </li>
                    <li class="link">
                        <RouterLink to="/">Catalog<span class="fa-solid fa-chevron-down ml-2"></span></RouterLink>
                    </li>
                </ul>
            </div>
        </nav> -->

    <!-- MODAL Log In -->
        <div v-if="isHidden" class="modal-overlay" @click.self="toggleSignIn()">
            <div class="modal">
                <button class="close-btn" @click="toggleSignIn()"><i class="fa-solid fa-xmark"></i></button>
                <h2 class="text-lg font-bold mb-4">Sign In</h2>
                <div>
                    <div>
                        <input v-model="this.usuario" type="text" id="usuario" placeholder="Username"  class="input-field"><label for="usuario" class="hidden">Usuario</label>
                    </div>
                    <div>
                        <input v-model="this.password" type="password" id="password" placeholder="Password" class="input-field"><label for="password" class="hidden">Password</label>
                    </div>
                    <button @click="login" class="button button-primary">Login</button>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { useCartStore} from "../stores/cart"
import { useActiveUserStore} from "../stores/user"
import {mapStores} from "pinia"
import axios from "axios";
export default {
    name: "Header",
    data() {
        return {
        isHidden: false,
        usuario: "",
        password: ""
        };
    },
    methods: {
        toggleSignIn() {
          this.isHidden = !this.isHidden
        },
        async login() {
            try {
                console.log(this.usuario)
                const user = {
	                "email": this.usuario,
	                "password": this.password
                }
                const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login",user);
                const token = response.data.access_token;
                console.log(token)
                this.activeUserStore.getUserData(token);
                this.toggleSignIn()
            } catch(error) {
                console.log(error)
            }
        },
        logOut() {
            this.activeUserStore.logOut();
        }
    },
        computed:{
        ...mapStores(useCartStore, useActiveUserStore)
    }
}
</script>
<style>
</style>
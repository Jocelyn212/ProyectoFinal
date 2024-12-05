<template>
    <header class="relative">
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
                    <ul class="flex items-center">
                        <li contenteditable="true" class="link" v-if="!activeUserStore.profile.avatar" @click="toggleSignIn"><span class="fa-regular fa-user mr-2" ></span>Sign in</li>
                        <li contenteditable="true" class="link flex items-center gap-2" v-if="activeUserStore.profile.avatar"><img :src="activeUserStore.profile.avatar" class="w-8 rounded-full border-amarillo"> {{activeUserStore.profile.name}}</li>
                        <li contenteditable="true" class="link" v-if="activeUserStore.profile.avatar" @click="logOut"><span class="fa-regular fa-user mr-2" ></span>Log out</li>
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
        <div v-if="isHidden" class="absolute sign-in bg-gray-200 p-5 left-40 top-10">
            Formulario de sign in 
            <div><input v-model="this.usuario" type="text" id="usuario"><label for="usuario" class="hidden">Usuario</label></div>
            <div><input v-model="this.password" type="password" id="password"><label for="password" class="hidden">Password</label></div>
            <button @click="login" class="border m-2">Login</button>
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
        isOpen: false, 
        isHidden: false,
        usuario: "",
        password: ""
        };
    },
    methods: {
        toggleMenu() {
        this.isOpen = !this.isOpen;
        },
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
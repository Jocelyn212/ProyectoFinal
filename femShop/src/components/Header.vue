<template>
    <header>
        <div class="container flex sm:h-auto h-0   items-center justify-between sm:py-4 p-0 text-xs bg-white">
            <span class="sm:inline-block hidden">Need help? Call us: (+98) 0234 456 789</span>
            <span class="sm:inline-block hidden"><span class="fa-solid fa-truck mr-2"></span>Track your order</span>
        </div> 
    <!-- Header with gradient -->
        <div class="header-gradient ">
            <div class="container items-center justify-between sm:py-4 py-1">
                <RouterLink to="/">
                    <div class="logo">
                            <img src="../img/FemShopH.png" alt="FemShop - Online Shop">
                            <h1 class="h-slogan">Online Shop</h1>
                    </div>
                </RouterLink>
            <!-- Mobile Menu -->
                <div class="sm:hidden flex justify-end w-1/2 mr-5 gap-[40%]"  >
                    <div class="link flex items-center  whitespace-nowrap font-bold text-xs gap-2 " v-if="activeUserStore.profile.avatar">
                        <img :src="activeUserStore.profile.avatar" class="w-8 rounded-full border-amarillo border-2 shadow-md" />
                        {{activeUserStore.profile.name}}
                    </div>
                    <div class="mobile-menu relative">
                        <div class="hamburger cursor-pointer rounded-lg px-2 py-1 hover:bg-lila-secondary hover:transition-all" @click="toggleMobileMenu()">
                            <span class="fa-solid fa-bars text-4xl"></span>
                        </div>
                        <ul v-if="mobileMenu" class="flex flex-col absolute items-start gap-4 flex-nowrap  w-auto text-dark-grey bg-white p-6 rounded-lg border right-0"   @click="toggleMobileMenu()">
                            <li class="link hover:text-lila-primary" v-if="!activeUserStore.profile.avatar" @click="toggleSignIn">
                                <span class="fa-regular fa-user mr-2" ></span>Sign in
                            </li>
                            <li class="link whitespace-nowrap hover:text-lila-primary" v-if="activeUserStore.profile.avatar" @click="logOut">
                                <span class="fa-regular fa-user mr-2 " ></span>Log out
                            </li>
                            <li class="link whitespace-nowrap hover:text-lila-primary">
                                <RouterLink to="/">
                                <span class="fa-solid fa-store mr-2 "></span>Shop
                                </RouterLink>
                            </li>
                            <li class="link whitespace-nowrap hover:text-lila-primary">
                                <RouterLink to="/cart">
                                <span class="fa-solid fa-cart-shopping mr-2 "></span>Cart<sup class="item-num">{{ cartStore.cartSize }}</sup>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                    
                </div> 
            <!-- Standard Menu -->
                <div class="h-buttons sm:block hidden">
                    <ul class="flex items-center gap-x-8 gap-y-0 flex-nowrap  w-auto">
                        <li class="link" v-if="!activeUserStore.profile.avatar" @click="toggleSignIn">
                            <span class="fa-regular fa-user mr-2" ></span>Sign in
                        </li>
                        <li class="link flex items-center  whitespace-nowrap gap-2" v-if="activeUserStore.profile.avatar">
                            <img :src="activeUserStore.profile.avatar" class="w-8 rounded-full border-amarillo sm:border-2 sm:shadow-md">{{activeUserStore.profile.name}}
                        </li>
                        <li class="link whitespace-nowrap" v-if="activeUserStore.profile.avatar" @click="logOut">
                            <span class="fa-regular fa-user mr-2 " ></span>Log out
                        </li>
                        <li class="link whitespace-nowrap">
                            <RouterLink to="/">
                            <span class="fa-solid fa-store mr-2 "></span>Shop
                            </RouterLink>
                        </li>
                        <li class="link whitespace-nowrap">
                            <RouterLink to="/cart">
                            <span class="fa-solid fa-cart-shopping mr-2 "></span>Cart<sup class="item-num">{{ cartStore.cartSize }}</sup>
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
                    <div class="modal-error">
                        <span v-if="this.errors.usuario">{{ this.errors.usuario }}</span>
                    </div>
                    <div>
                        <input v-model="this.password" type="password" id="password" placeholder="Password" class="input-field"><label for="password" class="hidden">Password</label>
                    </div>
                    <div class="modal-error">
                        <span v-if="this.errors.password">{{ this.errors.password }}</span>
                    </div>
                    <div class="modal-error">
                        <span v-if="this.errors.login">{{ this.errors.login }}</span>
                    </div>
                    <button @click="checkForm" class="button button-primary">Login</button>
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
        mobileMenu: false,
        usuario: null,
        password: null,
        errors: {},
        };
    },
    methods: {
        toggleSignIn() {
          this.isHidden = !this.isHidden
          this.errors = {}
        },
        toggleMobileMenu() {
          this.mobileMenu = !this.mobileMenu
        },
        checkForm() {
            this.errors = {};
            if (!this.usuario) {
                this.errors.usuario = "User is mandatory";
                console.log("falta el nombre")
            }
            if (!this.password) {
                this.errors.password = "Password is mandatory";
                console.log("falta el password")
            }
            if (Object.keys(this.errors).length === 0) {
                this.login()
            }

        },
        async login() {
            try {
                const user = {
	                "email": this.usuario,
	                "password": this.password
                }
                const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login",user);
                const token = response.data.access_token;
                this.activeUserStore.getUserData(token);
                this.toggleSignIn()
            } catch(error) {
                console.log("error", error)
                if (error.status === 401) {
                    this.errors.login = "Incorrect user or password"
                } else {
                    this.errors.login = error.message
                }
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
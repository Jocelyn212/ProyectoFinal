<template>
    <header>
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
                        <RouterLink to="/favorites" class="flex items-center  whitespace-nowrap gap-2">
                            <img :src="activeUserStore.profile.avatar" class="w-8 rounded-full border-amarillo border-2 shadow-md" />
                            {{activeUserStore.profile.name}}
                            <span class="fa-solid fa-heart text-lila-secondary"></span>
                        </RouterLink>
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
                                <RouterLink to="/shop">
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
                    <ul class="flex items-center gap-x-6 gap-y-0 flex-nowrap  w-auto">
                        <li class="link" v-if="!activeUserStore.profile.avatar" @click="toggleSignIn">
                            <span class="fa-regular fa-user mr-2" ></span>Sign in
                        </li>
                        <li class="link flex items-center  whitespace-nowrap gap-2" v-if="activeUserStore.profile.avatar">
                            <RouterLink to="/favorites" class="flex items-center  whitespace-nowrap gap-2 text-white hover:text-amarillo">
                                <img :src="activeUserStore.profile.avatar" class="w-8 rounded-full border-amarillo sm:border-2 sm:shadow-md">{{activeUserStore.profile.name}}
                                <span class="fa-solid fa-heart "></span>
                            </RouterLink>
                        </li>
                        <li class="link whitespace-nowrap" v-if="activeUserStore.profile.avatar" @click="logOut">
                            <span class="fa-regular fa-user mr-2 " ></span>Log out
                        </li>
                        <li class="link whitespace-nowrap">
                            <RouterLink to="/shop">
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

    <!-- MODAL Log In -->
        <LoginModal v-if="isHidden" :isHidden="isHidden" @close="toggleSignIn" />
        <Banner />
        </header>
</template>
<script>
import { useCartStore} from "../stores/cart"
import { useActiveUserStore} from "../stores/user"
import LoginModal from "../components/LoginModal.vue";
import Banner from "../components/Banner.vue";
import {mapStores} from "pinia"
import axios from "axios";
export default {
    name: "Header",
    components: {
        LoginModal, Banner
    },
    data() {
        return {
            isHidden: false,
            mobileMenu: false,

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
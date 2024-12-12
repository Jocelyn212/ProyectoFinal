<template>
<main  class="w-full">
    <div class="container mt-5">
        <div class="cart-container max-w-screen-lg mx-auto">
            <div class="product-list">
                <div class="titles cart-cols">
                    <div class="md:col-span-3 col-span-2 ">Product</div>
                    <div class="">Price</div>
                    <div class="md:col-span-3 col-span-2 sm:text-left text-center">Quantity</div>
                    <div class="col-span-2 ">Subtotal</div>
                    <div class="">Delete</div>
                </div>
                <div v-for="item in cartStore.items" class="items cart-cols ">
                    <div class="item flex text-xs md:col-span-3 col-span-2 items-center cursor-pointer md:flex-row flex-col"
                        @click="showProductDetails(item.id)">
                        <img v-if="item.images" :src="item.images[0]" :alt="item.title" class="card-img " />
                        <h2 class="text-lila-primary font-bold md:mt-0 mt-1 md:text-left text-center">    {{item.title}}
                        </h2>
                    </div>
                    <p class="price ">{{item.price}} €</p>
                    <div class="cantidad md:col-span-3 col-span-2">
                        <span><QuantitySelector v-model="item.cantidad" /></span>
                    </div>
                    <div class="price subtotal col-span-2"><span> {{  item.price * item.cantidad }}</span> €</div>
                    <button class="btn btn-danger !text-left" @click="cartStore.deleteItem(index)"><span class="fa-regular fa-circle-xmark text-lg text-red"></span>
                    </button>
                </div>

                <div class="buttons">
                    <button  class="button button-primary  text-center text-sm">
                        <RouterLink to="/" >
                            Continue shopping
                        </RouterLink>
                    </button>
                    <button class="button button-white text-sm" @click="saveCart">
                        Update cart
                    </button>
                    <button class="button button-red text-sm" @click="cartStore.clearCart">
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
                    <button class="button button-primary text-xs" v-if="isAuthenticated" @click="toggleCheckout()">Proceed to checkout</button>
                    <button v-else class="button button-white text-xs" @click="toggleSignIn">Login to checkout</button>
            <!-- MODAL Checkout -->
                    <div v-if="isCheckout" class="modal-overlay" @click.self="toggleCheckout()">
                        <div class="modal">
                            <button class="close-btn" @click="toggleCheckout()"><i class="fa-solid fa-xmark"></i></button>
                            <h2 class="text-lg font-bold mb-4">Checkout</h2>
                            <div>
                                    <span>Total amount</span>
                                    <span>{{ cartStore.cartTotal}} €</span>
                                <button class="button button-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
            <!-- MODAL Log In -->
                <LoginModal v-if="isHidden" :isHidden="isHidden" @close="toggleSignIn" />
       
                </div>
            </div>
        </div>
    </div>
</main>
</template>
<script>
    import QuantitySelector from "../components/QuantitySelector.vue";
    import LoginModal from "../components/LoginModal.vue";
    import { useCartStore} from "../stores/cart"
    import { useActiveUserStore} from "../stores/user"
    import {mapStores} from "pinia"
    
    export default {
        name: "Cart",
        data() {
            return {
                isHidden: false,
                isCheckout: false,
            };
        },
        components: { QuantitySelector, LoginModal },

        computed:{
            ...mapStores(useCartStore, useActiveUserStore),
            isAuthenticated() {
                return !!this.activeUserStore.profile?.avatar;
            },
        },
        methods: {
            showProductDetails(productId) {
                this.$router.push(`/product/${productId}`);
            },
            saveCart() {
                const cartStore = useCartStore()
                cartStore.updateAllCart()
            },
            toggleCheckout() {
                this.isCheckout = !this.isCheckout
            },
            toggleSignIn() {
                this.isHidden = !this.isHidden
            },
        }
     }
  </script>
  <style>
  @media  (max-width: 640px) {
    .QuantitySelector{
            flex-direction: column-reverse!important;
        }
    }
    .QuantitySelector .qty{
        display:none!important
    }
  </style>
 
<template>
<main  class="w-full">
    <div class="container mt-5">
        <div class="cart-container max-w-screen-lg mx-auto">
            <div class="product-list">
                <div class="titles cart-cols">
                    <div class="colProd">Product</div>
                    <div class="colPrice">Price</div>
                    <div class="colQty">Quantity</div>
                    <div class="colSub">Subtotal</div>
                    <div class="colDel">Delete</div>
                </div>
                <div v-for="item in cartStore.items" class="items cart-cols">
                    <div class="colProd item flex text-xs  items-center cursor-pointer md:flex-row flex-col"
                        @click="showProductDetails(item.id)">
                        <img v-if="item.images" :src="item.images[0]" :alt="item.title" class="card-img " />
                        <h2 class="text-lila-primary font-bold md:mt-0 mt-1 md:text-left text-center">    {{item.title}}
                        </h2>
                    </div>
                    <p class="price colPrice">{{item.price}} €</p>
                    <div class="cantidad colQty">
                        <span><QuantitySelector v-model="item.cantidad" /></span>
                    </div>
                    <div class="price subtotal colSub"><span> {{  item.price * item.cantidad }}</span> €</div>
                    <button class="btn btn-danger !text-left colDel" @click="cartStore.deleteItem(index)"><span class="fa-regular fa-circle-xmark text-lg text-red"></span>
                    </button>
                </div>

                <div class="buttons" v-if="!isCartEmpty">
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
                <div v-else class="block text-center mt-10 flex-col">
                    <p class="text-3xl font-bold text-lila-primary text-center mb-10">Your cart is empty!</p>
                    <button  class="button button-secondary  text-center text-xl">
                        <RouterLink to="/" >
                            Continue shopping
                        </RouterLink>
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
                        <input id="pr-coupon"  type="text" placeholder="Enter coupon code" class="form-input text-sm" @input="checkCode" v-model="inputCode">
                    </div>
                    <div class="amount">
                        <span>Total amount</span>
                        <span>{{ totalWithDiscount}} €</span>
                    </div>

            <!-- Checkout button -->
                    <button v-if="isAuthenticated"  class="button button-checkout text-sm" @click="toggleCheckout()" :disabled="isCartEmpty" >Proceed to checkout</button>
    
                    <button v-else class="button button-white text-sm" @click="toggleSignIn">Login to checkout</button>
            <!-- MODAL Checkout -->
                    <div v-if="isCheckout" class="modal-overlay" @click.self="toggleCheckout()">
                        <div class="modal">
                            <button class="close-btn" @click="toggleCheckout()"><i class="fa-solid fa-xmark"></i></button>
                            <div class="confirm" v-if="!confirmed">
                                <h2 class="text-xl font-bold mb-4 text-green text-center">Payment details</h2>
                                <div>
                                    <p class="text-lg mb-5 text-center">Total amount: <span class="font-bold">{{ cartStore.cartTotal}} €</span></p>
                                  
                                <button class="button button-checkout w-full" @click="togglConfirmed()">Confirm payment</button>
                                </div>
                            </div>
                            <div v-else>
                                <p class="text-xl font-bold text-red text-center mb-5">Payment Successful!</p>

                                <p class="text-center" >Thank you for your payment.</p>
                                <p class="text-center mb-5" >You’ll receive a confirmation email with your order details shortly.</p>

                                
                                <button class="button button-red text-sm w-full" @click="toggleCheckout()">
                                    Close
                                </button>
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
                activeDiscount: 1,
                inputCode: null
                isHidden: false,
                isCheckout: false,
                confirmed: false,
            }
        },
        components: { QuantitySelector, LoginModal },

        computed:{
            ...mapStores(useCartStore, useActiveUserStore),
             isAuthenticated() {
                return !!this.activeUserStore.profile?.avatar;
            },
            isCartEmpty() {
                return this.cartStore.items.length === 0; 
            },
            totalWithDiscount() {
                const cartStore = useCartStore();
                return Math.round(cartStore.cartTotal * this.activeDiscount)
            }
        },
        methods: {
            showProductDetails(productId) {
                this.$router.push(`/product/${productId}`);
            },
            saveCart() {
                const cartStore = useCartStore()
                cartStore.updateAllCart()
            },
            checkCode() {
                const codes = {
                    "20LESS": 0.8,
                    "ALLFREE": 0,
                    "BLACKFRIDAY": 0.5,
                }
                if(Object.keys(codes).includes(this.inputCode)) {
                    this.activeDiscount = codes[this.inputCode]
                } else {
                    this.activeDiscount = 1
                }
            },
            toggleCheckout() {
                this.isCheckout = !this.isCheckout;
                this.confirmed = false;
            },
            toggleSignIn() {
                this.isHidden = !this.isHidden
            },
            togglConfirmed() {
                this.confirmed = !this.confirmed;
                this.cartStore.clearCart();
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
 
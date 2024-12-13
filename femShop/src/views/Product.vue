<!-- <template>
    <main>
        <div class="container">
            <div class="product-card" >
                <div class="product-images">
                    <div class="image-primary mb-4">
                        <img 
                        v-if="product.images && product.images.length" 
                        :src="product.images[0]" 
                        :alt="product.title"
                      
                    >
                    </div>
                    <div class="images-secondary sm:flex hidden flex-nowrap gap-4" >
                        <img 
                        v-if="product.images[1] && product.images[1].length" 
                        :src="product.images[1]" 
                        :alt="product.title"
                        class="w-[46.5%]"
                    >
                        <img 
                            v-if="product.images[2] && product.images[2].length" 
                            :src="product.images[2]" 
                            :alt="product.title"
                            class="w-[46.5%]"
                        >
                    </div>
                </div>
                <div class="product-data ">
                    <h2 class="title">
                        {{ product.title }}
                     
                    </h2>
                    <p class="price">
                         {{ product.price }} €
                    </p>
                    <div class=" mb-4">
                        <span class="txt mr-2">Availability:  </span>
                        <span class=" text-green"><span class="fa-solid fa-check"></span> in stock</span>
                    </div>
                    <p class="description">
                         {{ product.description }} 
                    </p>

                    <div class="qty ">
                        <span class="txt">Quantity:</span>
                        <button 
                        @click="decrementQuantity"
                        :disabled="quantity <= 1"
                        >
                        -
                        </button>
                        <span class="txt text-rosa">{{ quantity }}</span>
                        <button 
                        @click="incrementQuantity"
                        >
                        +
                        </button>
                    </div>

                    <button class="button button-primary"  @click="addToCart"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    </main>
 </template>
 <script>
    import { useCartStore} from "../stores/cart"
    import {mapStores} from "pinia"
    import {getProduct} from "../firebase"
    import {use}
    export default {
        name: "Product",
    data() {
            return {
                product: {
                    id: null,
                    title: '',
                    price: 0,
                    description: '',
                    images: []
                },
                quantity: 1,
            }
        },
        computed:{
            ...mapStores(useCartStore)
        },
        methods: {
            incrementQuantity() {
                this.quantity++;
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        addToCart() {
            this.cartStore.addItemToCart(this.product, this.quantity);
        },
        async getProduct(productId) {
            try {
                const response = await getProduct(productId);
                this.product = response;
                console.log(response)
            } catch(error) {
                console.log(error)
            }
        }
    },
        mounted() {
            const productId = this.$route.params.id
            this.getProduct(productId)
            
           /*  fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
                .then(response => response.json())
                .then(data => {
                    this.product = data
                    console.log(this.product);
                })
                .catch(error => {
                    console.error("Error fetching product details:", error)
                }) */
        }
        
    }
 </script>
 <style>
 
 </style> -->
 <template>
    <main>
        <div class="container">
            <div class="product-card">
                <div class="product-images">
                    <div class="image-primary mb-4">
                        <img 
                            v-if="product.images && product.images.length" 
                            :src="product.images[0]" 
                            :alt="product.title"
                        >
                    </div>
                    <div class="images-secondary sm:flex hidden flex-nowrap gap-4">
                        <img 
                            v-if="product.images[1] && product.images[1].length" 
                            :src="product.images[1]" 
                            :alt="product.title"
                            class="w-[46.5%]"
                        >
                        <img 
                            v-if="product.images[2] && product.images[2].length" 
                            :src="product.images[2]" 
                            :alt="product.title"
                            class="w-[46.5%]"
                        >
                    </div>
                </div>
                <div class="product-data">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="title">
                            {{ product.title }}
                        </h2>
                        <button 
                            class="button button-icon"
                            @click="toggleFavorite"
                            :title="favoritesStore.isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'"
                        >
                            <span 
                                :class="[
                                    'fa-heart text-2xl', 
                                    favoritesStore.isFavorite(product.id) 
                                        ? 'fa-solid text-red' 
                                        : 'fa-regular text-dark-grey hover:text-red'
                                ]"
                            ></span>
                        </button>
                    </div>
                    <p class="price text-xl font-bold text-lila-primary mb-4">
                        {{ product.price }} €
                    </p>
                    <div class="mb-4">
                        <span class="txt mr-2">Availability:</span>
                        <span class="text-green">
                            <span class="fa-solid fa-check"></span> in stock
                        </span>
                    </div>
                    <p class="description text-dark-grey mb-6">
                        {{ product.description }}
                    </p>
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-32">
                            <QuantitySelector v-model="quantity" />
                        </div>
                        <button 
                            class="button button-primary"
                            @click="addToCart"
                        >
                            <span class="fa-solid fa-cart-plus mr-2"></span>
                            Add to cart
                        </button>
                        <RouterLink 
                            to="/cart"
                            class="button button-white text-center"
                        >
                            <span class="fa-solid fa-cart-shopping mr-2"></span>
                            Go to cart
                        </RouterLink>
                    </div>
                    <!-- Mensaje de confirmación -->
                    <div 
                        v-if="showMessage" 
                        :class="[
                            'message p-4 rounded-lg mb-4 transition-all duration-300',
                            cartMessage.type === 'success' ? 'bg-green-100 text-green' : 'bg-red-100 text-red'
                        ]"
                    >
                        {{ cartMessage.text }}
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import QuantitySelector from "../components/QuantitySelector.vue";
import { useCartStore } from "../stores/cart";
import { useFavoritesStore } from "../stores/favorites";
import { mapStores } from "pinia";
import { getProduct } from "../firebase";

export default {
    name: "Product",
    components: { 
        QuantitySelector 
    },
    data() {
        return {
            product: {
                id: null,
                title: '',
                price: 0,
                description: '',
                images: []
            },
            quantity: 1,
            showMessage: false,
            cartMessage: {
                text: '',
                type: 'success'
            },
            messageTimeout: null
        }
    },
    computed: {
        ...mapStores(useCartStore, useFavoritesStore)
    },
    methods: {
        addToCart() {
            try {
                this.cartStore.addItemToCart(this.product, this.quantity);
                this.showSuccessMessage('Product added to cart successfully!');
                this.quantity = 1; // Reset quantity after adding to cart
            } catch (error) {
                this.showErrorMessage('Error adding product to cart. Please try again.');
                console.error('Error adding to cart:', error);
            }
        },

        toggleFavorite() {
            try {
                this.favoritesStore.toggleFavorite(this.product);
                const isNowFavorite = this.favoritesStore.isFavorite(this.product.id);
                this.showSuccessMessage(
                    isNowFavorite 
                        ? 'Product added to favorites!' 
                        : 'Product removed from favorites!'
                );
            } catch (error) {
                this.showErrorMessage('Error updating favorites. Please try again.');
                console.error('Error toggling favorite:', error);
            }
        },

        showSuccessMessage(text) {
            this.showMessage = true;
            this.cartMessage = {
                text: text,
                type: 'success'
            };
            this.setMessageTimeout();
        },

        showErrorMessage(text) {
            this.showMessage = true;
            this.cartMessage = {
                text: text,
                type: 'error'
            };
            this.setMessageTimeout();
        },

        setMessageTimeout() {
            // Clear existing timeout if there is one
            if (this.messageTimeout) {
                clearTimeout(this.messageTimeout);
            }
            // Set new timeout to hide message after 3 seconds
            this.messageTimeout = setTimeout(() => {
                this.showMessage = false;
            }, 3000);
        },

        async getProduct(productId) {
            try {
                const response = await getProduct(productId);
                if (response) {
                    this.product = response;
                } else {
                    this.showErrorMessage('Product not found');
                }
            } catch(error) {
                this.showErrorMessage('Error loading product details');
                console.error('Error fetching product:', error);
            }
        }
    },
    mounted() {
        const productId = this.$route.params.id;
        if (productId) {
            this.getProduct(productId);
        }
    },
    beforeUnmount() {
        // Clear any existing timeout when component is destroyed
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }
    }
}
</script>

<style>


</style>
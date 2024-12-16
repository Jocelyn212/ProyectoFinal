<!-- <template>
    <main>
        <Breadcrumb :productTitle="product.title" :categoryName="product.category.name" />
        <div class="container"> 
            <div class="product-card" >
            <!-- Images -->
                <div class="product-images">
                    <div class="image-primary mb-4">
                        <img 
                        v-if="product.images && product.images.length" 
                        :src="product.images[0]" 
                        :alt="product.title"
                        @click="openImgModal(0)"  class="cursor-pointer" />
                    </div>
            <!-- Secondary Images -->
                    <div class="images-secondary sm:flex hidden flex-nowrap gap-4" >
                        <img 
                            v-for="(image, index) in product.images.slice(1)" 
                            :key="index"
                            :src="image" 
                            :alt="product.title"
                            class="w-[46.5%] cursor-pointer"
                            @click="openImgModal(index + 1)" 
                        />
                    </div>
                </div>
             <!-- Product Data -->
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
                    <div class="mb-6">
                        <QuantitySelector v-model="quantity" />
                    </div>
                    <button class="button button-primary mr-2 !bg-lila-primary !text-white text-sm "  @click="addToCart"
                    >
                        Add to cart
                    </button>
                    <RouterLink to="/cart"  class="button button-secondary text-center text-sm mr-2">
                        Go to cart
                    </RouterLink>
                    <RouterLink to="/shop"  class="button button-white text-center text-sm text-nowrap inline-block mt-2">
                        Continue shopping
                    </RouterLink>
                </div>
            </div>
        </div>
    <!-- Modal Imagenes -->
        <div v-if="isImgModalOpen" class="modal-overlay" @click.self="closeImgModal">
            <div class="modal-content">
                <button class="close-btn" @click="closeImgModal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <div class="slider">
                    <button class="prev" @click="prevImage"><span class="fa-solid fa-chevron-left text-lila-secondary hover:text-white hover:transition-all"></span></button>
                    <img :src="product.images[activeImage]" :alt="product.title" class="slider-image" />
                    <button class="next" @click="nextImage"><span class="fa-solid fa-chevron-right text-lila-secondary hover:text-white hover:transition-all"></span></button>
                </div>
                <p class="image-caption text-center mt-2 text-lila-primary font-bold text-lg">{{ activeImage + 1 }} / {{ product.images.length }}</p>
            </div>
        </div>
    </main>
 </template>
 <script>
    import QuantitySelector from "../components/QuantitySelector.vue";
    import Breadcrumb from "../components/Breadcrumb.vue";
    import { useCartStore} from "../stores/cart"
    import {mapStores} from "pinia"
    import {getProduct} from "../firebase"
    export default {
        name: "Product",
        components: { QuantitySelector, Breadcrumb },
    data() {
            return {
                product: {
                    id: null,
                    title: '',
                    price: 0,
                    description: '',
                    images: [],
                    category: { name: '' },
                },
                quantity: 1,
                isImgModalOpen: false, 
                activeImage: 0 
            }
        },
        computed:{
            ...mapStores(useCartStore)
        },
        methods: {
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
        },
        openImgModal(index) {
            this.activeImage = index;
            this.isImgModalOpen = true;
        },
        closeImgModal() {
            this.isImgModalOpen = false;
        },
        nextImage() {
            this.activeImage = (this.activeImage + 1) % this.product.images.length;
        },
        prevImage() {
            this.activeImage =
                (this.activeImage - 1 + this.product.images.length) %
                this.product.images.length;
        }
    },
        mounted() {
            const productId = this.$route.params.id
            this.getProduct(productId)
        }
        
    }
 </script>
 <style>
 
 </style>
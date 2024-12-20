<template>
  <main>
    <Breadcrumb
      :productTitle="product.title"
      :categoryName="product.category.name"
      :categoryId="product.category.id"
    />
    <div class="container">
      <div class="product-card">
    <!-- Images -->
        <div class="product-images">
          <div class="image-primary mb-4">
            <img
              v-if="product.images && product.images.length"
              :src="product.images[0]"
              :alt="product.title"
              @click="openImgModal(0)"
              class="cursor-pointer"
            />
          </div>
          <!-- Secondary Images -->
          <div class="images-secondary sm:flex hidden flex-nowrap gap-4">
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
        <div class="product-data">
          <div class="flex justify-between items-start ">
            <h2 class="title">
              {{ product.title }}
            </h2>
        <!-- Agregar a favorito -->
            <a
              class="mr-4"
              @click="toggleFavorite"
              :title="
                favoritesStore.isFavorite(product.id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              "
            >
              <div
                :class="[
                  'fa-heart text-2xl',
                  favoritesStore.isFavorite(product.id)
                    ? 'fa-solid text-red hover:text-red-dark'
                    : 'fa-regular text-red hover:text-red-dark',
                ]" :title="favoritesStore.isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'">
            </div>
             
            </a>
          </div>
    <!-- Message -->
         <div class="h-[25px] flex items-start content-center">
            <div v-if="showMessage"
                :class="[
                'message rounded-lg transition-all duration-300 self-start text-sm relative -top-[2px]',
                cartMessage.type === 'success'
                ? 'bg-green-100 text-green'
                : 'bg-red-100 text-red',
                ]"
                >
                {{ cartMessage.text }}
            </div>
         </div>
          
          <p class="price">{{ product.price }} €</p>
          <div class="mb-4">
            <span class="txt mr-2">Availability: </span>
            <span class="text-green"
              ><span class="fa-solid fa-check"></span> in stock</span
            >
          </div>
          <p class="description">
            {{ product.description }}
          </p>
          <div class="mb-6">
            <QuantitySelector v-model="quantity" />
          </div>
        <!-- Buttons -->
          <button
            class="button button-primary mr-2 !bg-lila-primary !text-white text-sm"
            @click="addToCart"
          >
            <span class="fa-solid fa-cart-plus mr-2"></span>
            Add to cart
          </button>
          <RouterLink to="/cart"
            class="button button-secondary text-center text-sm mr-2"
            >
            Go to cart
          </RouterLink>
          <RouterLink
            to="/shop"
            class="button button-white text-center text-sm text-nowrap inline-block mt-2"
          >
            Continue shopping
          </RouterLink>
        </div>
      </div>
     

      
    </div>
    
  </main>
  <!-- Modal Imagenes -->
  <div
        v-if="isImgModalOpen"
        class="modal-overlay"
        @click.self="closeImgModal"
      >
        <div class="modal-content modal-images relative">
          <button class="close-btn text-white hover:text-lila-secondary" @click="closeImgModal">
            <span class="fa-solid fa-xmark text-3xl "></span>
          </button>
          <div class="slider">
            <button class="prev" @click="prevImage">
              <span
                class="fa-solid fa-chevron-left text-white hover:text-lila-secondary hover:transition-all"
              ></span>
            </button>
            <img
              :src="product.images[activeImage]"
              :alt="product.title"
              class="slider-image"
            />
            <button class="next" @click="nextImage">
              <span
                class="fa-solid fa-chevron-right text-white hover:text-lila-secondary hover:transition-all"
              ></span>
            </button>
          </div>
          <div
            class="image-caption text-center mt-2 text-lila-primary font-bold text-sm "
          >
            {{ activeImage + 1 }} / {{ product.images.length }}
          </div>
        </div>
      </div>
</template>
<script>
import QuantitySelector from "../components/QuantitySelector.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import { useCartStore } from "../stores/cart";
import { mapStores } from "pinia";
import { getProduct } from "../firebase";
import { useFavoritesStore } from "../stores/favorites";
export default {
  name: "Product",
  components: { QuantitySelector, Breadcrumb },
  data() {
    return {
      product: {
        id: null,
        title: "",
        price: 0,
        description: "",
        images: [],
        category: { name: "" },
      },
      quantity: 1,
      showMessage: false,
      cartMessage: {
        text: "",
        type: "success",
      },
      messageTimeout: null,
      isImgModalOpen: false,
      activeImage: 0,
    };
  },
  computed: {
    ...mapStores(useCartStore, useFavoritesStore),
  },
  methods: {
    addToCart() {
      try {
        this.cartStore.addItemToCart(this.product, this.quantity);
        this.showSuccessMessage("Product added to cart successfully!");
        this.quantity = 1; // Reset quantity after adding to cart
      } catch (error) {
        this.showErrorMessage(
          "Error adding product to cart. Please try again."
        );
        console.error("Error adding to cart:", error);
      }
    },
    toggleFavorite() {
      try {
        this.favoritesStore.toggleFavorite(this.product);
        const isNowFavorite = this.favoritesStore.isFavorite(this.product.id);
        this.showSuccessMessage(
          isNowFavorite
            ? "Product added to favorites!"
            : "Product removed from favorites!"
        );
      } catch (error) {
        this.showErrorMessage("Error updating favorites. Please try again.");
        console.error("Error toggling favorite:", error);
      }
    },
    showSuccessMessage(text) {
      this.showMessage = true;
      this.cartMessage = {
        text: text,
        type: "success",
      };
      this.setMessageTimeout();
    },
    showErrorMessage(text) {
      this.showMessage = true;
      this.cartMessage = {
        text: text,
        type: "error",
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
          this.showErrorMessage("Product not found");
        }
      } catch (error) {
        this.showErrorMessage("Error loading product details");
        console.error("Error fetching product:", error);
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
    },
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
  },
};
</script>
<style>
    .slider {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        max-width: 100%;
    }
    .modal-images .close-btn{
        z-index:100!important;
        right:20px
    }
    .slider-image {
        max-width: 100%;
        max-height: 400px;
        border-radius: 10px;
        border: 5px solid #ca9bdd;
    }
    .image-caption{
        position: relative;
        z-index: 100;
        top: -30px;
        background-color: #ca9bdd80;
    }
    .prev,
    .next {
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
    }
    .prev {
        left: 10px;
    }
    .next {
        right: 10px;
    }
</style>

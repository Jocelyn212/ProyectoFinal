
<template>

    <Header />
    <RouterView />
    <Footer />

</template>
<script >
import Home from "./views/Home.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import { useCartStore} from "./stores/cart"
import { useActiveUserStore } from "./stores/user";
import {mapStores} from "pinia"

export default {
    name: "App",
    components: {
    Home,
    Header,
    Footer
  },
  mounted() {
    this.cartStore.getItemsFromFirebase()
  },
  computed:{
    ...mapStores(useCartStore, useActiveUserStore)
},
setup() {
    const activeUserStore = useActiveUserStore();
    activeUserStore.checkLogin();
  }

}
</script>
<style >

</style>

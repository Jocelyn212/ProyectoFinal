
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
import { onMounted } from "vue";

export default {
    name: "App",
    components: {
    Home,
    Header,
    Footer
  },
  computed:{
    ...mapStores(useCartStore, useActiveUserStore)
},
// async mounted() {
//     const activeUserStore = useActiveUserStore();
//     const cartStore = useCartStore();
//     await activeUserStore.checkLogin();
//     cartStore.getItemsFromFirebase()
//   }
setup() {
    const activeUserStore = useActiveUserStore();
    activeUserStore.checkLogin();
    // cartStore.getItemsFromFirebase()
  }

}
</script>
<style >

</style>


<template>

    <Header />
    <RouterView />
    <Footer />

</template>
<script >
import Home from "./views/Landing.vue";
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
setup() {
    const activeUserStore = useActiveUserStore();
    activeUserStore.checkIfUserIsLogged();
  }
}
</script>
<style >

</style>

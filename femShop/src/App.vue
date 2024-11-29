

<template>
  <div class="container">
    <Header />
    <Home />
    <Footer />
  </div>
</template>
<script >
import Home from "./views/Home.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
    name: "App",
    components: {
    Home,
    Header,
    Footer
  },
}
</script>
<style >

</style>

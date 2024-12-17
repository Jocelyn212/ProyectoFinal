<template>
    <footer>
        <div class="container sm:flex-row flex-col">
            <div class="logo lg:mr-12 mr-6 mb-5 sm:mb-0 flex md:justify-start justify-center items-center"> <router-link to="/">
                <img src="../img/logo-lila.png" alt="FemShop - Online Shop" class="f-logo"></router-link>
            </div>
            <div class="links grid sm:grid-cols-2 md:grid-cols-4 items-start md:justify-start justify-center gap-2 w-full leading-8">
                <div class="p-4 pt-0 ">
                    <h3 class="mb-2 font-semibold ">Find product</h3>
                    <ul>
                         <li class="hover:opacity-70"><router-link :to="{ name: 'shop', query: { keywords: 'table', category: '3' } }">Tables</router-link></li> 
                         <li class="hover:opacity-70"><router-link :to="{ name: 'shop', query: { keywords: 'cap', category: '1' } }">Caps</router-link></li> 
                         <li class="hover:opacity-70"><router-link :to="{ name: 'shop', query: { keywords: 'shorts', category: '1' } }">Shorts</router-link></li> 
                         <li class="hover:opacity-70"><router-link :to="{ name: 'shop', query: { keywords: 'headphones', category: '2' } }">Headphones</router-link></li> 
                    </ul>
                </div>
                <div class="p-4 pt-0">
                    <h3 class="mb-2 font-semibold ">Site map</h3>
                    <ul>
                        <li class="hover:opacity-70"><router-link :to="{ name: 'home' }">Home</router-link></li> 
                         <li class="hover:opacity-70"><router-link :to="{ name: 'shop' }">Shop</router-link></li> 
                         <li class="hover:opacity-70"><router-link :to="{ name: 'cart' }">Cart</router-link></li> 
                         <li class="hover:opacity-70"><router-link :to="{ name: 'favorites' }">Favorites</router-link></li> 
                    </ul>
                </div>
                <div class="justify-start p-4 pt-0 ">
                    <h3 class="mb-2 font-semibold ">Contact us</h3>
                    <div class="flex flex-col">
                        <div class="flex items-center gap-2 text-start">
                            <span>Cristiana</span>
                            <a href="https://www.linkedin.com/in/cristianasollini/" target="_blank"><i class="fa-brands fa-linkedin text-lg cursor-pointer hover:opacity-70"></i></a>
                            <a href="https://github.com/papercri" target="_blank"><i class="fa-brands fa-github text-lg cursor-pointer hover:opacity-70"></i></a>
                        </div>
                        <div class="flex items-center gap-2 text-start">
                            <span>Daniela</span>
                            <a href="https://www.linkedin.com/in/dperezro/" target="_blank"><i class="fa-brands fa-linkedin text-lg cursor-pointer hover:opacity-70"></i></a>
                            <a href="https://github.com/dperezca" target="_blank"><i class="fa-brands fa-github text-lg cursor-pointer hover:opacity-70"></i></a>
                        </div>
                        <div class="flex items-center gap-2 text-start">
                            <span>Jocelyn</span>
                            <a href="https://www.linkedin.com/in/jocelyn-castro-flores" target="_blank"><i class="fa-brands fa-linkedin text-lg cursor-pointer hover:opacity-70"></i></a>
                            <a href="https://github.com/Jocelyn212" target="_blank"><i class="fa-brands fa-github text-lg cursor-pointer hover:opacity-70"></i></a>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:justify-center justify-start items-center p-4">
                    <a href="https://github.com/Jocelyn212/ProyectoFinal" target="_blank" class="flex flex-col items-center justify-center hover:opacity-70">
                        <div class="flex items-center text-center"><i class="fa-brands fa-github text-5xl cursor-pointer"></i></div>
                        <h3 class="text-center text-sm">Check our repository!</h3>
                    </a>
                </div>
                <p class="sm:col-span-2 md:col-span-4 text-center !text-xs pt-5  border-t border-lila-primary"> FemShop © {{ new Date().getFullYear() }}.  All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: "Footer",
}
</script>
<style></style>
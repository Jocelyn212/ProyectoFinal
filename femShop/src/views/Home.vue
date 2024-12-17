<template>
    <main class="w-full h-screen p-0 m-0 absolute top-0 left-0">
        <div class="home w-full h-screen">
            <div  class="bg">
                <div class="shop-now container  h-screen flex flex-wrap relative items-center content-center text-white font-bold gap-8 drop-shadow-md !max-w-screen-md">      
                    <h2 class="w-full text-center sm:text-6xl text-5xl uppercase ">
                        Our Black Friday sale is finally here!
                    </h2>
                    <p class="w-full text-center sm:text-5xl text-4xl">50% off sitewide</p>
                    <div  class="w-full text-center mt-8">
                        <RouterLink to="/shop">
                            <buton class="button button-white text-3xl uppercase !text-white !border-lila-primary hover:bg-lila-primary">Shop now</buton>
                        </RouterLink>
                    </div>
                    
                </div>
            </div>
        </div>
    </main>
 </template>
 
 <script>

 export default {
     name: "Home",
 }
 </script>
 
 <style>
   .home .home{
        width:100%;
        height: 100vh;
        background:  url('../img/home3.webp') no-repeat center/cover;
        position:relative;
        
    }
    .home header > div.container.flex{
        display:none
    }
    .home header .header-gradient{
        background-color: #540D6E!important;
        background-image: none!important;
        box-shadow: none!important;
    }
    .home .bg{
        background-color: #00000040;
    }
    .home footer{
        display:none!important
    }
    .home  .shop-now{
        -webkit-text-stroke: 3px #540D6E;
        text-shadow: 0 0 0 #232323;
        transition: all 250ms;
    }
    .home .shop-now a{
        -webkit-text-stroke: 1.5px #540D6E;
        outline:1.5px!important;
        text-decoration:none
    }
    .home .banner{
        display:none!important
    }
    @media (min-width: 640px) {
        .home header .logo img {
            width: 160px;
        }
    }
 </style>
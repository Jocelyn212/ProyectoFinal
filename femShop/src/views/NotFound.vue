<template>
<main class="h-full">
    <div class="container flex flex-wrap justify-center items-center h-[40vh] ">
        <h2 class="title-1 !text-9xl !font-normal w-full text-center mt-10">404</h2>
        <span class="title-1 !text-4xl mt-[-20px] w-full text-center">Not Found</span>
        <RouterLink to="/shop" >
            <button class="button button-secondary mt-10">Take me back to FemShop</button>
        </RouterLink>
    </div>
</main>
 </template>
 <script>
 export default {
     name: "NotFound",
 }
 </script>
 <style>
 
 </style>
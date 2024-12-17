<template>
    <nav class="breadcrumb" v-if="breadcrumbs.length">
      <ul>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <router-link :to="crumb.path" v-if="crumb.path">{{ crumb.label }}</router-link>
          <span v-else>{{ crumb.label }}</span>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
    export default {
        name: "Breadcrumb",
        props: {
            productTitle: "",
            categoryName: "",
            categoryId: null,
        },
        
        data() {
            return {
                breadcrumbs: [],
            };
        },
        watch: {
            productTitle: {
                handler: "generateBreadcrumbs",
                immediate: true, 
            },
             categoryName(newCategory) {
                this.generateBreadcrumbs(newCategory);
            },
        },
        mounted() {
            this.generateBreadcrumbs(this.categoryName);
        },
        methods: {
            getBreadcrumbMap() {
                return {
                    home: [{ label: "Home", path: "/" }],
                    shop: [
                        { label: "Home", path: "/" },
                        { label: "Shop", path: "/shop" },
                    ],
                    category: [
                        { label: "Home", path: "/" },
                        { label: "Shop", path: "/shop" },
                        { label: this.categoryName || "Category",  path: null },
                    ],
                    product: [
                        { label: "Home", path: "/" },
                        { label: "Shop", path: "/shop" },
                        { label: this.categoryName || "All products", path: `/shop?category=${this.categoryId}`},
                        { label: this.productTitle || "Product", path: null },
                    ],
                    cart: [
                        { label: "Home", path: "/" },
                        { label: "Cart", path: "/cart" },
                    ],
                    favorites: [
                        { label: "Home", path: "/" },
                        { label: "Shop", path: "/shop" },
                        { label: "Favorites", path: "/favorites" },
                    ],
                };
            },
            generateBreadcrumbs(categoryName) {
                const appEl = document.getElementById("app");
                if (appEl) {
                    const classList = Array.from(appEl.classList); 
                    const breadcrumbMap = this.getBreadcrumbMap();
                    const activeClass = classList.find((cls) => breadcrumbMap[cls]);
                    if (activeClass) {
                    this.breadcrumbs = breadcrumbMap[activeClass];
                 // Si estamos en la página Shop, agregamos la categoría al breadcrumb   
                        if (activeClass === "shop" && categoryName) {
                            this.breadcrumbs.push({ label: categoryName, path: null });
                        }
                        
                    }
                }
            },
        },
    };
  </script>
  
  <style>
    .breadcrumb ul {
        list-style: none;
        display: flex;
        gap: 10px;
        padding: 0;
        margin: 0;
    }
    .breadcrumb li {
        display: inline;
        font-size: small;
        color: #7a7a7a;
    }
    .breadcrumb li a:hover{
        text-decoration: underline;
    }
    .breadcrumb li:not(:last-child)::after {
        content: ">";
        margin: 0 8px;
        color: #7a7a7a;
    }
  </style>
  
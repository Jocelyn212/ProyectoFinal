import { defineStore} from 'pinia'

export const useCartStore = defineStore('cart',{
    state: ()=> ({
        items: [],
    }),
    actions: {
        addItemToCart(item) {
            this.items.push(item)
            console.log(this.items)
           /*  updateCart(this.items) */
        },
       /*  async getItemsFromFirebase() {
            this.items = await getCart() //leer de la DB los items
        }, */
        deleteItem(index) {
            this.items.splice(index, 1)
            updateCart(this.items)
        }
    },
    getters:{
        cartSize() {
            return this.items.length
        }
    }
})
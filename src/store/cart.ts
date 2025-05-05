import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as any[],
    total: 0,
    totalItems: 0,
  }),
  getters: {
    getCart(state) {
      return state.cart;
    },
    getTotal(state) {
      return state.total;
    },
    getTotalItems(state) {
      return state.totalItems;
    },
  },
  actions: {
    addToCart(product: any) {
      this.cart.push(product);
      this.total += product.price;
      this.totalItems += 1;
    },
    removeFromCart(productId: number) {
      const index = this.cart.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.total -= this.cart[index].price;
        this.cart.splice(index, 1);
        this.totalItems -= 1;
      }
    },
  },
});
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => set(state => {
    const existing = state.items.find(item => item.id === product.id);
    if (existing) {
      return { items: state.items.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ) };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set(state => ({ items: state.items.filter(item => item.id !== id) })),
  changeQuantity: (id, quantity) => set(state => ({
    items: quantity < 1
      ? state.items.filter(item => item.id !== id)
      : state.items.map(item => item.id === id ? { ...item, quantity } : item)
  })),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () => get().items.reduce((sum, item) => sum + item.quantity * item.price, 0)
}));

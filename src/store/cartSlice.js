import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.selectedOption === newItem.selectedOption
      );
      // Increase quantity if item already exists in the cart
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.totalAmount += parseFloat(newItem.price);
    },
    removeFromCart(state, action) {
      const { id, selectedOption } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedOption === selectedOption
      );

      if (existingItem) {
        state.totalAmount -=
          parseFloat(existingItem.price) * existingItem.quantity;
        state.items = state.items.filter(
          (item) => !(item.id === id && item.selectedOption === selectedOption)
        );
      }
    },
    updateQuantity(state, action) {
      const { id, selectedOption, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.selectedOption === selectedOption
      );

      if (existingItem) {
        const pricePerUnit = parseFloat(existingItem.price);
        state.totalAmount -= pricePerUnit * existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalAmount += pricePerUnit * quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

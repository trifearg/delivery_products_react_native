import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
    products: [],
    totalAmount: 0
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.count += 1;
      state.totalAmount += action.payload.price * action.payload.count;
    },
    removeProduct: (state, action) => {
      let tempCounter = state.count;
      let tempAmount = state.totalAmount;
      const filteredArray = state.products.filter((product) => {
        if (product.id === action.payload) {
          tempCounter -= 1;
          tempAmount -= product.price * product.count;
        }
        return product.id !== action.payload;
      });
      return {
        count: tempCounter,
        products: filteredArray,
        totalAmount: tempAmount
      };
    },
    incrementProductCount: (state, action) => {
      const foundIndex = state.products.findIndex(product => product.id === action.payload.id);
      state.products[foundIndex].count += action.payload.count;
      state.totalAmount += state.products[foundIndex].price;
    }, 
    decrementProductCount: (state, action) => {
      const foundIndex = state.products.findIndex(product => product.id === action.payload.id);
      state.products[foundIndex].count -= action.payload.count;
      state.totalAmount -= state.products[foundIndex].price;
    }
  },
});

export const { addProduct, removeProduct, incrementProductCount, decrementProductCount } = cartSlice.actions;

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Product } from '../screens/ProductScreen';
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { Provider } from 'react-redux';
import { cartSlice } from '../redux/slices/cartSlice';
import { userSlice } from '../redux/slices/userSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Cart } from '../screens/CartScreen';

const Stack = createStackNavigator();
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

setupListeners(store.dispatch);

const ProductStack = ({ route }) => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Product" initialParams={{ product: route.params.product }} component={Product} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

it('should navigate to the Cart screen when ProductAddToCart is pressed', async () => {
  const route = { 
    params: { 
      product: {
        name: 'Milk',
        description: 'Good product',
        price: 100,
        energyValue: 200,
        photos: [{ photo: 'http://example.com/photo.png' }],
      }
    } 
  };
  const { getByTestId } = render(<ProductStack route={route} />);
  const addToCartButton = getByTestId('addToCartButton');

  fireEvent.press(addToCartButton);

  const cartScreenTitle = await getByTestId('cartName');

  expect(cartScreenTitle).toBeDefined();
});
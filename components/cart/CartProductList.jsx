import { CartProduct } from "./CartProduct";
import styled from "styled-components/native";

const ProductsContainer = styled.FlatList`
  width: 100%;
  padding: 0 24px;
  margin: 75px 0 175px 0;
`;

export const CartProductList = ({ products, removeProductFromCart, decrementProduct, incrementProduct }) => {
  return (
    <ProductsContainer
      data={products}
      extraData={products}
      showsVerticalScrollIndicator
      renderItem={({ item, index }) => (
        <CartProduct
          {...item}
          key={index}
          removeProductFromCart={removeProductFromCart}
          decrementProduct={decrementProduct}
          incrementProduct={incrementProduct}
        />
      )}
    />
  );
};

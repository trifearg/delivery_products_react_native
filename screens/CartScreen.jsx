import React, { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import {
  removeProduct,
  decrementProductCount,
  incrementProductCount,
  clearCart
} from "../redux/slices/cartSlice";
import { CartProductList } from "../components/cart/CartProductList";
import i18n from "../assets/translations/i18n";
import { useCreateOrderMutation } from "../redux/api/ordersApi";

const CartContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #ffffff;
`;

const CartBackButton = styled.Pressable`
  position: absolute;
  left: 24px;
  top: 34px;
`;

const CartName = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-family: "DM-Sans-Medium";
  position: absolute;
  left: 96px;
  top: 36px;
`;

const CartEmptyContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CartEmptyText = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-family: "DM-Sans-Medium";
`;

const PaymentBlock = styled.View`
  width: 100%;
  height: 170px;
  background-color: #fafafa;
  position: absolute;
  bottom: 0;
  flex-direction: column;
  padding: 10px 15px 20px 15px;
`;

const PaymentTitle = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-family: "DM-Sans-Medium";
`;

const PaymentAddress = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: #606060;
  font-family: "DM-Sans";
  padding-left: 8px;
`;

const PaymentAddressBlock = styled.View`
  flex-direction: row;
  margin-top: 12px;
`;

const SubmitButton = styled.Pressable`
  width: 100%;
  height: 57px;
  margin-top: 24px;
  background: #f00808;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const SubmitText = styled.Text`
  font-size: 22px;
  line-height: 29px;
  font-family: "DM-Sans-Medium";
  color: #ffffff;
`;

const backButton = require("../assets/img/back_button.png");
const locationIcon = require("../assets/img/location_icon.png");

export const Cart = ({ navigation }) => {
  const products = useSelector((state) => state.cart.products);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const location = useSelector((state) => state.user.location);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [createOrder, result] = useCreateOrderMutation();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(clearCart());
      navigation.navigate("SuccessOrder");
    }
  }, [result]);

  const removeProductFromCart = (id) => {
    dispatch(removeProduct(id));
  };

  const decrementProduct = (product) => {
    if (product.count > 1) {
      dispatch(decrementProductCount({ id: product.id, count: 1 }));
    }
  };

  const incrementProduct = (product) => {
    dispatch(incrementProductCount({ id: product.id, count: 1 }));
  };

  const emptyCart = (
    <CartEmptyContainer>
      <CartEmptyText>{i18n.t('cartScreen.cartEmptyText')}</CartEmptyText>
    </CartEmptyContainer>
  );

  const paymentBlock = (
    <PaymentBlock>
      <PaymentTitle>{`${i18n.t('cartScreen.paymentTitle')}: ${totalAmount}₽`}</PaymentTitle>
      <PaymentAddressBlock>
        {location && (
          <>
            <Image source={locationIcon} />
            <PaymentAddress>{location}</PaymentAddress>
          </>
        )}
      </PaymentAddressBlock>
      <SubmitButton style={{ zIndex: 0.5 }} onPress={() => {
        if (user?.token) {
          createOrder({
            customerId: user.userId,
            price: totalAmount,
            status: "Delivered"
          })
        } else {
          navigation.navigate("Login/Register")
        }
      }}>
        <SubmitText>{i18n.t('cartScreen.submitText')}</SubmitText>
      </SubmitButton>
    </PaymentBlock>
  );

  const cartWithProducts = (
    <>
      <CartProductList
        products={products}
        removeProductFromCart={removeProductFromCart}
        decrementProduct={decrementProduct}
        incrementProduct={incrementProduct}
      />
      {paymentBlock}
    </>
  );

  return (
    <CartContainer>
      <CartBackButton
        style={{ zIndex: 0.5 }}
        onPress={() => navigation.navigate("Home")}
      >
        <Image source={backButton} />
      </CartBackButton>
      <CartName testID="cartName">{i18n.t('cartScreen.cartName')}</CartName>
      {products && products.length > 0 ? cartWithProducts : emptyCart}
    </CartContainer>
  );
};

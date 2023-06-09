import React, { useState } from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { addProduct, incrementProductCount } from "../redux/slices/cartSlice";
import i18n from "../assets/translations/i18n";
import {isIOS} from "../assets/environment";

const ProductContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #fff1e5;
  flex-direction: column;
  position: relative;
`;

const ProductBackButton = styled.Pressable`
  position: absolute;
  left: 24px;
  top: ${props => isIOS ? '55px' : '36px'};
`;

const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-top: 48px;
`;

const ProductBlock = styled.View`
  height: 90%;
  width: 100%;
  background: #ffffff;
  border-radius: 25px;
  padding: 24px;
`;

const ProductName = styled.Text`
  font-size: 24px;
  line-height: 31px;
  color: #0d0d0d;
  font-family: "DM-Sans-Bold";
`;

const ProductPriceContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  margin-top: 24px;
  align-items: center;
  flex-direction: row;
`;

const ProductPrice = styled.Text`
  font-size: 24px;
  line-height: 31px;
  color: #f00808;
  font-family: "DM-Sans-Bold";
`;

const ProductButtonsContainer = styled.View`
  width: 120px;
  background: #fff1e5;
  border-radius: 26px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProductCounter = styled.Text`
  font-weight: 400;
  font-size: 24px;
  line-height: 31px;
`;

const ProductEnergyContainer = styled.View`
  padding: 8px;
  border: 1px solid #a0007d;
  border-radius: 10px;
  max-width: 200px;
  margin-top: 32px;
`;

const ProductEnergyTitle = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #f00808;
  font-family: "DM-Sans-Medium";
`;

const ProductEnergy = styled.Text`
  font-size: 18px;
  line-height: 23px;
  color: #0d0d0d;
  margin-top: 8px;
  font-family: "DM-Sans-Medium";
`;

const ProductDesriptionContainer = styled.Text`
  width: 100%;
  margin-top: 32px;
  height: 120px;
`;

const ProductDesriptionTitle = styled.Text`
  font-size: 18px;
  line-height: 23px;
  color: #0d0d0d;
  font-family: "DM-Sans-Medium";
`;

const ProductDesription = styled.Text`
  font-size: 14px;
  line-height: 20px;
  padding-top: 16px;
  font-family: "DM-Sans";
`;

const ProductAddToCart = styled.Pressable`
  background: #f00808;
  border-radius: 16px;
  padding: 16px;
`;

const ProductAddToCartText = styled.Text`
  font-size: 22px;
  line-height: 29px;
  color: #ffffff;
  text-align: center;
  font-family: "DM-Sans-Medium";
`;

const addButton = require("../assets/img/add_button.png");
const removeButton = require("../assets/img/remove_button.png");
const backButton = require("../assets/img/back_button.png");

export const Product = ({ route, navigation }) => {
  const [countProduct, setCountProduct] = useState(1);
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cart.products);
  const { product } = route.params;
  const { name, description, price, energyValue, photos } = product;

  const incrementProductCounter = () => {
    setCountProduct(prev => prev + 1);
  }

  const decrementProductCounter = () => {
    if (countProduct > 1) {
      setCountProduct(prev => prev - 1);
    }
  }

  return (
    <ProductContainer contentContainerStyle={styles.center}>
      <ProductBackButton onPress={() => navigation.navigate("Home")}>
        <Image source={backButton} />
      </ProductBackButton>
      <ProductImage resizeMode="center" source={{ uri: photos[0].photo }} />
      <ProductBlock>
        <ProductName>{name}</ProductName>
        <ProductPriceContainer>
          <ProductPrice>{price}₽</ProductPrice>
          <ProductButtonsContainer>
            <Pressable onPress={decrementProductCounter}>
              <Image source={removeButton} />
            </Pressable>
            <ProductCounter>{countProduct}</ProductCounter>
            <Pressable onPress={incrementProductCounter}>
              <Image source={addButton} />
            </Pressable>
          </ProductButtonsContainer>
        </ProductPriceContainer>
        <ProductEnergyContainer>
          <ProductEnergyTitle>{i18n.t('productScreen.productEnergyTitle')}</ProductEnergyTitle>
          <ProductEnergy>{`${energyValue} ${i18n.t('productScreen.productEnergy')}`}</ProductEnergy>
        </ProductEnergyContainer>
        <ProductDesriptionContainer>
          <ProductDesriptionTitle>{i18n.t('productScreen.productDesriptionTitle')}{"\n"}</ProductDesriptionTitle>
          <ProductDesription>{description}</ProductDesription>
        </ProductDesriptionContainer>
        <ProductAddToCart
          testID="addToCartButton"
          onPress={() => {
            const checkItem = cartProducts.some(item => item.id === product.id)
            if (
              cartProducts &&
              cartProducts.length > 0 &&
              checkItem
            ) {
              dispatch(incrementProductCount({id: product.id, count: countProduct}));
            } else {
              const cartProduct = {
                id: product.id, 
                name: product.name,
                price: product.price,
                image: photos[0].photo,
                count: countProduct
              }
              dispatch(addProduct(cartProduct));
            }
            setCountProduct(1);
            navigation.navigate("Cart");
          }}
        >
          <ProductAddToCartText>{i18n.t('productScreen.productAddToCartText')}</ProductAddToCartText>
        </ProductAddToCart>
      </ProductBlock>
    </ProductContainer>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
});
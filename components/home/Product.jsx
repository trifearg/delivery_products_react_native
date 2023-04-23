import { TouchableOpacity, Image, Pressable } from "react-native";
import styled from "styled-components/native";
import i18n from "../../assets/translations/i18n";

const ProductView = styled.View`
  border-radius: 10px;
  margin: 8px;
  padding: 8px 16px;
  padding-top: 16px;
  width: 150px;
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const ProductImage = styled.Image`
  width: 120px;
  height: 100px;
`;

const ProductTitle = styled.Text`
  font-size: 18px;
  line-height: 23px;
  color: #0d0d0d;
  text-align: center;
  font-family: "DM-Sans-Bold";
`;

const ProductWeight = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #0d0d0d;
  padding-top: 4px;
  font-family: "DM-Sans";
`;

const ProductPrice = styled.Text`
  font-family: "DM-Sans-Bold";
  font-size: 14px;
  line-height: 18px;
  color: #ff9431;
`;

const ProductFooter = styled.View`
  justify-content: space-between;
  padding-top: 8px;
  flex-direction: row;
  align-items: center;
`;

const addProductButton = require("../../assets/img/add_product.png");

export const Product = ({ item, navigation, addProductToCart }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product", { product: item })}
    >
      <ProductView>
        <ProductImage
          resizeMode="center"
          source={{
            uri: item.image,
          }}
        />
        <ProductTitle>{item.name}</ProductTitle>
        <ProductWeight>{`${item.weight} ${i18n.t('homeScreen.productWeight')}`}</ProductWeight>
        <ProductFooter>
          <ProductPrice>{item.price}₽</ProductPrice>
          <Pressable onPress={() => addProductToCart(item)}>
            <Image source={addProductButton} />
          </Pressable>
        </ProductFooter>
      </ProductView>
    </TouchableOpacity>
  );
};

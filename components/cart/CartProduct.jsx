import { Image, Pressable } from "react-native";
import styled from "styled-components/native";
import i18n from '../../assets/translations/i18n';

const ProductContainer = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 24px;
`;

const ProductImageContainer = styled.View`
  width: 120px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100px;
  height: 80px;
  margin-top: 5px;
`;

const ProductInfoContainer = styled.View`
  width: 200px;
  height: 100px;
  padding-left: 8px;
`;

const ProductNamePrice = styled.View`
  flex-direction: column;
  padding-left: 8px;
`;

const ProductText = styled.Text`
  font-size: 16px;
  line-height: 21px;
  font-family: "DM-Sans-Medium";
`;

const ProductButtons = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

const ProductAddRemove = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  width: 100px;
  justify-content: space-between;
`;

const AddButton = styled.Image`
  width: 40px;
  height: 40px;
`;

const ProductCounter = styled.Text`
  font-weight: 400;
  font-size: 24px;
  line-height: 31px;
`;

const ProductTrash = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  justify-content: space-between;
`;

const addButton = require("../../assets/img/add_button.png");
const removeButton = require("../../assets/img/remove_button.png");
const trashButton = require("../../assets/img/trash.png");

export const CartProduct = ({
  image,
  name,
  price,
  id,
  count,
  removeProductFromCart,
  decrementProduct,
  incrementProduct,
}) => {
  const product = {
    image, 
    name,
    price,
    id,
    count
  }
  return (
    <ProductContainer>
      <ProductImageContainer>
        <ProductImage
          resizeMode="center"
          source={{
            uri: image,
          }}
        />
      </ProductImageContainer>
      <ProductInfoContainer>
        <ProductNamePrice>
          <ProductText>{name}</ProductText>
          <ProductText>{`${i18n.t('cartScreen.productPriceText')}: ${price}₽`}</ProductText>
        </ProductNamePrice>
        <ProductButtons>
          <ProductAddRemove>
            <Pressable onPress={() => decrementProduct(product)}>
              <AddButton source={removeButton} />
            </Pressable>
            <ProductCounter>{count}</ProductCounter>
            <Pressable onPress={() => incrementProduct(product)}>
              <AddButton source={addButton} />
            </Pressable>
          </ProductAddRemove>
          <ProductTrash>
            <Pressable onPress={() => removeProductFromCart(id)}>
              <Image source={trashButton} />
            </Pressable>
          </ProductTrash>
        </ProductButtons>
      </ProductInfoContainer>
    </ProductContainer>
  );
};

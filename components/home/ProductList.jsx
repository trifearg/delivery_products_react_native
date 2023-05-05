import { FlatList, ActivityIndicator } from "react-native";
import { Product } from "./Product";
import styled from "styled-components/native";
import i18n from "../../assets/translations/i18n";

const ProductListContainer = styled.View`
  margin-top: 24px;
  align-items: center;
  flex: 1;
`;

const StateContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 50%;
`;

const ErrorText = styled.Text`
  color: #f00808;
  font-family: "DM-Sans-Bold";
  font-size: 24px;
`;

export const ProductList = ({
  navigation,
  products,
  error,
  isLoading,
  addProductToCart,
}) => {
  if (isLoading) {
    return (
      <StateContainer>
        <ActivityIndicator size="large" color="#f00808" />
      </StateContainer>
    );
  }

  if (error) {
    return (
      <StateContainer>
        <ErrorText>{i18n.t("commonError")}</ErrorText>
      </StateContainer>
    );
  }

  return (
    <ProductListContainer>
      <FlatList
        numColumns={2}
        data={products}
        extraData={products}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Product
            item={item}
            key={index}
            navigation={navigation}
            addProductToCart={addProductToCart}
          />
        )}
      />
    </ProductListContainer>
  );
};

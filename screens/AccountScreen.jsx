import React from "react";
import { Image } from "react-native";
import styled from "styled-components";
import { useSelector } from "react-redux";
import i18n from "../assets/translations/i18n";

const AccountContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #ffffff;
`;

const AccountBackButton = styled.Pressable`
  position: absolute;
  left: 24px;
  top: 34px;
`;

const AccountName = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-family: "DM-Sans-Medium";
  position: absolute;
  left: 96px;
  top: 36px;
`;

const UserName = styled.Text`
  margin-top: 95px;
  margin-left: 24px;
  font-size: 28px;
  line-height: 33px;
  font-family: "DM-Sans-Medium";
`;

const OrdersText = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-family: "DM-Sans-Medium";
  margin: 15px 0;
  margin-left: 24px;
`;

const OrdersContainer = styled.FlatList`
  width: 100%;
  padding: 0 24px;
  margin-bottom: 24px;
`;

const OrderContainer = styled.View`
  height: 140px;
  border: 1px solid #a0007d;
  border-radius: 40px;
  padding: 24px;
  margin-top: 24px;
`;

const OrderFirstBlock = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const OrderFirstText = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-family: "DM-Sans-Medium";
`;

const OrderStatus = styled.View`
  background: #00d24e;
  border: 1px solid #00d24e;
  border-radius: 10px;
  width: 150px;
  padding: 8px;
  margin-top: 24px;
  justify-content: center;
  align-items: center;
`;

const OrderStatusText = styled.Text`
  font-size: 20px;
  line-height: 26px;
  color: #ffffff;
  font-family: "DM-Sans-Medium";
`;

const OrdersEmptyContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const OrdersEmptyText = styled.Text`
  font-size: 20px;
  line-height: 26px;
  font-family: "DM-Sans-Medium";
`;

// const tempOrders = [
//   { id: 1, status: "Delivered", totalAmount: 100, orderNumber: 123123 },
//   { id: 1, status: "Delivered", totalAmount: 100, orderNumber: 123123 },
//   { id: 1, status: "Delivered", totalAmount: 100, orderNumber: 123123 },
//   { id: 1, status: "Delivered", totalAmount: 100, orderNumber: 123123 },
//   { id: 1, status: "Delivered", totalAmount: 100, orderNumber: 123123 },
//   { id: 1, status: "Delivered", totalAmount: 100, orderNumber: 123123 },
// ];

const backButton = require("../assets/img/back_button.png");

export const Account = ({ navigation }) => {
  const name = useSelector((state) => state.user.name);
  const orders = useSelector((state) => state.user.orders);

  const emptyOrders = (
    <OrdersEmptyContainer>
      <OrdersEmptyText>{i18n.t('accountScreen.ordersEmptyText')}</OrdersEmptyText>
    </OrdersEmptyContainer>
  );

  const accountWithOrders = (
    <>
      <OrdersText>{i18n.t('accountScreen.ordersText')}</OrdersText>
      <OrdersContainer
        data={orders}
        extraData={orders}
        showsVerticalScrollIndicator
        renderItem={({ item, index }) => (
          <OrderContainer key={index}>
            <OrderFirstBlock>
              <OrderFirstText>№{item.orderNumber}</OrderFirstText>
              <OrderFirstText>{item.totalAmount}₽</OrderFirstText>
            </OrderFirstBlock>
            <OrderStatus>
              <OrderStatusText>{item.status}</OrderStatusText>
            </OrderStatus>
          </OrderContainer>
        )}
      />
    </>
  );

  return (
    <AccountContainer>
      <AccountBackButton onPress={() => navigation.navigate("Home")}>
        <Image source={backButton} />
      </AccountBackButton>
      <AccountName>{i18n.t('accountScreen.yourProfile')}</AccountName>
      <UserName>{name ? name : "Anonymous"}</UserName>
      {orders && orders.length > 0 ? accountWithOrders : emptyOrders}
    </AccountContainer>
  );
};

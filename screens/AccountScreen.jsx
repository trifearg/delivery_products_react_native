import React from "react";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native";
import styled from "styled-components";
import { useSelector } from "react-redux";
import i18n from "../assets/translations/i18n";
import { useGetUserOrdersQuery } from "../redux/api/ordersApi";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

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

const AccountLogoutButton = styled.Pressable`
  position: absolute;
  top: 34px;
  right: 24px;
  border: 1px solid black;
  border-radius: 10px;
`;

const AccountLogoutButtonText = styled.Text`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  padding: 4px 16px;
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

const backButton = require("../assets/img/back_button.png");

export const Account = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const {
    data = [],
    error,
    isLoading,
  } = useGetUserOrdersQuery(user?.userId, {
    pollingInterval: 1000,
    skip: !user?.userId
  });
  const dispatch = useDispatch();

  const emptyOrders = (
    <OrdersEmptyContainer>
      <OrdersEmptyText>
        {i18n.t("accountScreen.ordersEmptyText")}
      </OrdersEmptyText>
    </OrdersEmptyContainer>
  );

  const accountWithOrders = () => {
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
      <>
        <OrdersText>{i18n.t("accountScreen.ordersText")}</OrdersText>
        <OrdersContainer
          data={data}
          extraData={data}
          showsVerticalScrollIndicator
          renderItem={({ item, index }) => (
            <OrderContainer key={index}>
              <OrderFirstBlock>
                <OrderFirstText>№{index + 1}</OrderFirstText>
                <OrderFirstText>{item.price}₽</OrderFirstText>
              </OrderFirstBlock>
              <OrderStatus>
                <OrderStatusText>{item.status}</OrderStatusText>
              </OrderStatus>
            </OrderContainer>
          )}
        />
      </>
    );
  };

  return (
    <AccountContainer>
      <AccountBackButton onPress={() => navigation.navigate("Home")}>
        <Image source={backButton} />
      </AccountBackButton>
      {user?.name && (
        <AccountLogoutButton
          onPress={() => {
            dispatch(clearUser());
            navigation.navigate("Home");
          }}
        >
          <AccountLogoutButtonText>{i18n.t("accountScreen.logout")}</AccountLogoutButtonText>
        </AccountLogoutButton>
      )}
      <AccountName>{i18n.t("accountScreen.yourProfile")}</AccountName>
      <UserName>{user?.name ? user?.name : "Anonymous"}</UserName>
      {data && data.length > 0 && user?.token ? accountWithOrders() : emptyOrders}
    </AccountContainer>
  );
};

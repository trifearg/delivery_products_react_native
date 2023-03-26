import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../screens/HomeScreen";
import { Product } from "../screens/ProductScreen";
import { Cart } from "../screens/CartScreen";
import { Start } from "../screens/StartScreen";
import { Account } from "../screens/AccountScreen";
import { useSelector } from "react-redux";
import { LoginRegisterScreen } from "../screens/LoginRegisterScreen";

const Tab = createBottomTabNavigator();

const initHomeIcon = require("../assets/img/init_home.png");
const initiAccountIcon = require("../assets/img/init_account.png");
const initCartIcon = require("../assets/img/init_cart.png");

const focusedHomeIcon = require("../assets/img/focused_home.png");
const focusedAccountIcon = require("../assets/img/focused_account.png");
const focusedCartIcon = require("../assets/img/focused_cart.png");

export const Navigation = () => {
  const cartCounter = useSelector((state) => state.cart.count);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
        initialRouteName="Start"
      >
        <Tab.Screen
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
          name="Start"
          component={Start}
        />
        <Tab.Screen
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
          name="Login/Register"
          component={LoginRegisterScreen}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? focusedHomeIcon : initHomeIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? focusedCartIcon : initCartIcon} />
            ),
            tabBarBadge: cartCounter > 0 ? cartCounter : undefined,
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image source={focused ? focusedAccountIcon : initiAccountIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="Product"
          component={Product}
          options={{
            tabBarStyle: { display: "none" },
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

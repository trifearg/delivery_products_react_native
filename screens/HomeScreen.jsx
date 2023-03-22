import React, { useState, useEffect } from "react";
import { Image, Alert } from "react-native";
import styled from "styled-components/native";
import { FilterButtons } from "../components/FilterButtons";
import { ProductList } from "../components/home/ProductList";
import { useGetProductsQuery } from "../redux/api/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, incrementProductCount } from "../redux/slices/cartSlice";
import * as Location from 'expo-location';

const HomeContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #ffffff;
`;

const HeaderContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 32px;
  padding-top: 48px;
`;

const HeaderTitle = styled.Text`
  color: #0d0d0d;
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  flex-shrink: 1;
`;

const SearchingContainer = styled.View`
  align-items: center;
  margin-top: 12px;
  padding: 0 32px;
`;

const SearchingInput = styled.TextInput`
  border: 1px solid #f00808;
  border-radius: 10px;
  width: 100%;
  height: 48px;
  padding: 12px;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  padding-left: 44px;
  position: relative;
`;

const SearchingIcon = styled.Image`
  position: absolute;
  left: 42px;
  top: 12px;
`;

const deliverHomeImg = require("../assets/img/deliver_home.png");
const searchingIcon = require("../assets/img/searching.png");

export const Home = ({ navigation }) => {
  const [currentFilter, setCurrentFilter] = useState("");
  const [searchingProduct, setSearchingProduct] = useState("");

  const { data, error, isLoading } = useGetProductsQuery();

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  useEffect(() => {
    checkLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    console.log(enabled);
    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      console.log(response);
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const getProducts = () => {
    let products = currentFilter
      ? data.filter((product) => product.type === currentFilter)
      : data;
    let searchingProducts = [];

    if (searchingProduct) {
      searchingProducts = data.filter((product) =>
        product.name.toLowerCase().includes(searchingProduct.toLowerCase())
      );
      products = [...searchingProducts];
    }

    return products;
  };

  const addProductToCart = (item) => {
    const checkItem = cartProducts.some(product => product.id === item.id)
    if (
      cartProducts &&
      cartProducts.length > 0 &&
      checkItem
    ) {
      dispatch(incrementProductCount({id: item.id, count: 1}));
    } else {
      const cartProduct = {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        count: 1,
      };
      dispatch(addProduct(cartProduct));
    }
  };

  return (
    <HomeContainer>
      <HeaderContainer>
        <HeaderTitle>Order Your Products Fast and Free</HeaderTitle>
        <Image source={deliverHomeImg} />
      </HeaderContainer>
      <SearchingContainer>
        <SearchingInput
          placeholder="Search"
          cursorColor="#000000"
          value={searchingProduct}
          onChangeText={(text) => setSearchingProduct(text)}
        />
        <SearchingIcon source={searchingIcon} />
      </SearchingContainer>
      <FilterButtons
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />
      <ProductList
        navigation={navigation}
        error={error}
        isLoading={isLoading}
        products={getProducts()}
        addProductToCart={addProductToCart}
      />
    </HomeContainer>
  );
};

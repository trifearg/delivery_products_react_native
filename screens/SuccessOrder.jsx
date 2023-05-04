import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import i18n from "../assets/translations/i18n";

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #ffffff;
`;

const ImageContainer = styled.View`
  margin-top: 120px;
`;

const SuccessText = styled.Text`
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 10px;
  top: 310px;
`;

const ContinueButton = styled.Pressable`
  border-radius: 16px;
  background: #f00808;
  padding: 16px;
  margin: 0 16px;
  margin-top: 65px;
`;

const ContinueButtonText = styled.Text`
  font-size: 22px;
  line-height: 29px;
  text-align: center;
  color: #ffffff;
  font-family: "DM-Sans-Medium";
`;

const successImg = require("../assets/img/success.png");

export const SuccessOrder = ({ navigation }) => {
  return (
    <Container>
      <ImageContainer>
        <Image source={successImg} />
        <SuccessText>{i18n.t("successOrderScreen.text")}</SuccessText>
      </ImageContainer>
      <ContinueButton onPress={() => navigation.navigate("Home")}>
        <ContinueButtonText>
          {i18n.t("successOrderScreen.buttonText")}
        </ContinueButtonText>
      </ContinueButton>
    </Container>
  );
};

import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image } from "react-native";
import styled from "styled-components/native";

const MainContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #fff1e5;
`;

const BackButton = styled.Pressable`
  position: absolute;
  left: 24px;
  top: 34px;
`;

const LoginRegisterImage = styled.Image`
  height: 197px;
`;

const LoginRegisterContainer = styled.View`
  flex-direction: column;
  align-items: center;
  padding: 50px 40px 0 40px;
`;

const LoginRegisterButtons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;

const SwitchButton = styled.Pressable`
  padding-bottom: 5px;
`;

const LoginResiterText = styled.Text`
  font-size: 23px;
  line-height: 29px;
  font-family: "DM-Sans-Bold";
`;

const LoginRegisterForm = styled.ScrollView`
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  flex-direction: column;
  padding-top: 60px;
`;

const FormTextInput = styled.TextInput`
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #adadad;
  width: 320px;
  font-family: "DM-Sans";
  font-size: 15px;
  line-height: 19px;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const FormText = styled.Text`
  font-size: 18px;
  line-height: 22px;
  font-family: "DM-Sans-Bold";
`;

const SubmitButton = styled.Pressable`
  background-color: #f00808;
  border-radius: 16px;
  height: 50px;
  width: 320px;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
`;

const SubmitText = styled.Text`
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  font-family: "DM-Sans-Bold";
`;

const loginBg = require("../assets/img/login.png");
const registerBg = require("../assets/img/register.png");
const backButton = require("../assets/img/back_button.png");

export const LoginRegisterScreen = ({ navigation }) => {
  const [loginOrRegister, setLoginOrRegister] = useState("login");
  return (
    <MainContainer>
      <BackButton
        style={{ zIndex: 0.5 }}
        onPress={() => navigation.navigate("Cart")}
      >
        <Image source={backButton} />
      </BackButton>
      <LoginRegisterContainer>
        <LoginRegisterImage
          source={loginOrRegister === "login" ? loginBg : registerBg}
        />
        <LoginRegisterButtons>
          <SwitchButton
            style={() => [loginOrRegister === "login" && styles.focused]}
            onPress={() => setLoginOrRegister("login")}
          >
            <LoginResiterText>Login</LoginResiterText>
          </SwitchButton>
          <SwitchButton
            style={() => [loginOrRegister === "register" && styles.focused]}
            onPress={() => setLoginOrRegister("register")}
          >
            <LoginResiterText>Register</LoginResiterText>
          </SwitchButton>
        </LoginRegisterButtons>
      </LoginRegisterContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LoginRegisterForm contentContainerStyle={styles.center}>
          {loginOrRegister === "register" && (
            <View>
              <FormText>Name</FormText>
              <FormTextInput cursorColor="#000" placeholder="Enter your name" />
            </View>
          )}
          <View>
            <FormText>Email</FormText>
            <FormTextInput cursorColor="#000" placeholder="Enter your email" />
          </View>
          <View>
            <FormText>Password</FormText>
            <FormTextInput
              cursorColor="#000"
              placeholder="Enter your password"
            />
          </View>
          <SubmitButton>
            <SubmitText>
              {loginOrRegister === "register" ? "Register" : "Login"}
            </SubmitText>
          </SubmitButton>
        </LoginRegisterForm>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  focused: {
    borderBottomWidth: 3,
    borderBottomColor: "#f00808",
  },
  center: {
    alignItems: "center",
  },
});

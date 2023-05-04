import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Image } from "react-native";
import styled from "styled-components/native";
import i18n from "../assets/translations/i18n";
import { useRegisterMutation, useLoginMutation } from "../redux/api/customersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

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
  padding-top: 10px;
`;

const FormTextInput = styled.TextInput`
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.isError ? '#f00808' : '#adadad'};
  width: 320px;
  font-family: "DM-Sans";
  font-size: 15px;
  line-height: 19px;
  margin-top: 10px;
`;

const FormText = styled.Text`
  font-size: 18px;
  line-height: 22px;
  font-family: "DM-Sans-Bold";
  margin-top: 25px;
`;

const SubmitButton = styled.Pressable`
  background-color: #f00808;
  border-radius: 16px;
  height: 50px;
  width: 320px;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
  margin-top: 40px;
`;

const SubmitText = styled.Text`
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  font-family: "DM-Sans-Bold";
`;

const InputTextError = styled.Text`
  font-family: "DM-Sans";
  font-size: 15px;
  line-height: 19px;
  color: #F00808;
  margin-top: 10px;
`;

const EmailContainer = styled.View`
  width: 100%;
  padding: 0 35px;
`

const loginBg = require("../assets/img/login.png");
const registerBg = require("../assets/img/register.png");
const backButton = require("../assets/img/back_button.png");

export const LoginRegisterScreen = ({ navigation }) => {
  const [loginOrRegister, setLoginOrRegister] = useState("login");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailExistedError, setEmailExistedError] = useState(false);

  const [ regiser, registeredUser ] = useRegisterMutation();
  const [ login, authorizedUser ] = useLoginMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (registeredUser.isSuccess) {
      dispatch(setUser(registeredUser.data));
      navigation.navigate("Cart");
    }

    if (registeredUser.isError) {
      if (registeredUser.error.status === 403) {
        setEmailExistedError(true);
      }
    }
  }, [registeredUser]);

  useEffect(() => {
    if (authorizedUser.isSuccess) {
      dispatch(setUser(authorizedUser.data));
      navigation.navigate("Cart");
    }

    if (authorizedUser.isError) {
      if (authorizedUser.error.status === 404) {
        setEmailError(true);
      }
      if (authorizedUser.error.status === 401) {
        setPasswordError(true);
      }
    }
  }, [authorizedUser]);


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
            onPress={() => {
              setEmailError(false);
              setPasswordError(false);
              setEmailExistedError(false);
              setEmail("");
              setPassword("");
              setLoginOrRegister("login");
            }}
          >
            <LoginResiterText>
              {i18n.t("loginRegisterScreen.loginText")}
            </LoginResiterText>
          </SwitchButton>
          <SwitchButton
            style={() => [loginOrRegister === "register" && styles.focused]}
            onPress={() => {
              setEmailError(false);
              setPasswordError(false);
              setEmailExistedError(false);
              setEmail("");
              setPassword("");
              setLoginOrRegister("register");
            }}
          >
            <LoginResiterText>
              {i18n.t("loginRegisterScreen.registerText")}
            </LoginResiterText>
          </SwitchButton>
        </LoginRegisterButtons>
      </LoginRegisterContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <LoginRegisterForm contentContainerStyle={styles.center}>
          {loginOrRegister === "register" && (
            <View>
              <FormText>{i18n.t("loginRegisterScreen.name.text")}</FormText>
              <FormTextInput
                cursorColor="#000"
                placeholder={i18n.t("loginRegisterScreen.name.placeholder")}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
          )}
          <EmailContainer>
            <FormText>{i18n.t("loginRegisterScreen.email.text")}</FormText>
            <FormTextInput
              cursorColor="#000"
              placeholder={i18n.t("loginRegisterScreen.email.placeholder")}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
              isError={emailError || emailExistedError}
              placeholderTextColor={emailError || emailExistedError ? '#f00808' : '#ADADAD'}
            />
            {emailError && <InputTextError>{i18n.t("loginRegisterScreen.email.errorLogin")}</InputTextError>}
            {emailExistedError && <InputTextError>{i18n.t("loginRegisterScreen.email.errorRegister")}</InputTextError>}
          </EmailContainer>
          <View>
            <FormText>{i18n.t("loginRegisterScreen.password.text")}</FormText>
            <FormTextInput
              cursorColor="#000"
              placeholder={i18n.t("loginRegisterScreen.password.placeholder")}
              value={password}
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholderTextColor={passwordError ? '#f00808' : '#ADADAD'}
              isError={passwordError}
            />
            {passwordError && <InputTextError>{i18n.t("loginRegisterScreen.password.errorLogin")}</InputTextError>}
          </View>
          <SubmitButton onPress={() => {
            if (loginOrRegister === 'register') {
              regiser({
                name,
                email,
                password
              });
            }
            if (loginOrRegister === 'login') {
              login({
                email,
                password
              });
            }
            setEmailError(false);
            setPasswordError(false);
            setEmailExistedError(false);
          }}>
            <SubmitText>
              {loginOrRegister === "register"
                ? i18n.t("loginRegisterScreen.registerButtonText")
                : i18n.t("loginRegisterScreen.loginText")}
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

import styled from "styled-components/native";
import i18n from '../assets/translations/i18n';

const StartContainer = styled.View`
  width: 100%;
  height: 100%;
  background: #ffffff;
`;

const StartImage = styled.Image`
  margin-top: 76px;
`;

const StartTextPartOne = styled.Text`
  font-weight: 600;
  font-size: 38px;
  line-height: 45px;
  text-align: center;
`;
const StartTextPartTwo = styled.Text`
  font-weight: 600;
  font-size: 38px;
  line-height: 45px;
  text-align: center;
`;

const StartTextPartThree = styled.Text`
  color: #f00808;
`;

const StartButton = styled.Pressable`
  border-radius: 16px;
  background: #F00808;
  padding: 16px;
  margin: 0 16px;
  margin-top: 65px;
`;

const StartButtonText = styled.Text`
  font-size: 22px;
  line-height: 29px;
  text-align: center;
  color: #FFFFFF;
  font-family: 'DM-Sans-Medium';
`;

const startImg = require("../assets/img/start.png");

export const Start = ({ navigation }) => {
  return (
    <StartContainer>
      <StartImage source={startImg} />
      <StartTextPartOne>{i18n.t('startScreen.startTextPartOne')}</StartTextPartOne>
      <StartTextPartTwo>
        {i18n.t('startScreen.startTextPartTwo')} <StartTextPartThree>{i18n.t('startScreen.startTextPartThree')}</StartTextPartThree>
      </StartTextPartTwo>
      <StartButton onPress={() => navigation.navigate("Home")}>
        <StartButtonText>{i18n.t('startScreen.startButtonText')}</StartButtonText>
      </StartButton>
    </StartContainer>
  );
};
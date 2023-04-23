import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import i18n from "../assets/translations/i18n";

const FilterContainer = styled.ScrollView`
  width: 100%;
  margin-top: 24px;
`;

const FilterButton = styled.Pressable`
  border: 1px solid #f00808;
  border-radius: 10px;
  padding: 8px 20px 8px 8px;
  margin: 0 6px;
`;

const FilterButtonText = styled.Text`
  font-size: 18px;
  line-height: 23px;
  font-family: "DM-Sans-Bold";
`;

const currentFilterButtonStyled = {
  backgroundColor: "#F00808",
};

const currentFilterTextStyled = {
  color: "#FFFFFF",
};

const filters = [
  {
    text: `🥐 ${i18n.t('homeScreen.filters.pastry')}`,
    type: "Pastry",
    id: 1,
  },
  {
    text: `🧀 ${i18n.t('homeScreen.filters.dairyProducts')}`,
    type: "Dairy products",
    id: 2,
  },
  {
    text: `🥦 ${i18n.t('homeScreen.filters.vegetables')}`,
    type: "Vegetables",
    id: 3,
  },
];

export const FilterButtons = ({ currentFilter, setCurrentFilter }) => {
  return (
    <SafeAreaView>
      <FilterContainer horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((element) => (
          <FilterButton
            style={currentFilter === element.type && currentFilterButtonStyled}
            onPress={() => {
              if (currentFilter === element.type) {
                setCurrentFilter("");
              } else {
                setCurrentFilter(element.type);
              }
            }}
            key={element.id}
          >
            <FilterButtonText
              style={currentFilter === element.type && currentFilterTextStyled}
            >
              {element.text}
            </FilterButtonText>
          </FilterButton>
        ))}
      </FilterContainer>
    </SafeAreaView>
  );
};

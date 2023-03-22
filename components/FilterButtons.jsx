import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

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
    text: "🥐 Pastry",
    type: "Pastry",
  },
  {
    text: "🧀 Dairy products",
    type: "Dairy products",
  },
  {
    text: "🥦 Vegetables",
    type: "Vegetables",
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
                setCurrentFilter("")
              } else {
                setCurrentFilter(element.type)
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

import React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Navigation } from "./components/Navigation";

const App = () => {
  const [fontsLoaded] = useFonts({
    "DM-Sans": require("./assets/fonts/DMSans-Regular.ttf"),
    "DM-Sans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
    "DM-Sans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

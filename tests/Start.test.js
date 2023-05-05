import React from "react";
import { render } from "@testing-library/react-native";
import { Start } from "../screens/StartScreen";

describe("Start screen", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<Start />);
    const startScreen = getByTestId("startScreen");
    expect(startScreen).toBeTruthy();
  });
});

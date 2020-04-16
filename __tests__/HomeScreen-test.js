import React from "react";
import NavigationTestUtils from "react-navigation/NavigationTestUtils";
import renderer from "react-test-renderer";

import App from "../App";
import HomeScreen from "../screens/HomeScreen";

jest.mock("expo", () => ({
  AppLoading: "AppLoading",
}));

jest.mock("../navigation/AppNavigator", () => "AppNavigator");

describe("HomeScreen", () => {
  jest.useFakeTimers();

  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it(`renders the home screen`, () => {
    const home = renderer
      .create(
        // App provides the Provider
        <App>
          <HomeScreen />
        </App>
      )
      .toJSON();
    expect(home).toMatchSnapshot();
  });
});

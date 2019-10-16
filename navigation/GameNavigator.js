import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import IdiomIntroScreen from "../components/idioms/intro";
import IdiomPlayScreen from "../components/idioms/idiomsPlay";
import HomeScreen from "../screens/HomeScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {
    defaultNavigationOptions: {
      headerTintColor: "darkslateblue",
      headerStyle: {
        backgroundColor: "whitesmoke"
      }
    }
  }
});

const IdiomStack = createStackNavigator(
  {
    Home: HomeScreen,
    IdiomsIntro: IdiomIntroScreen,
    IdiomsPlay: IdiomPlayScreen
  },
  config
);

IdiomStack.path = "";

const gameNavigator = createSwitchNavigator({
  IdiomStack
});

gameNavigator.path = "";

export default gameNavigator;

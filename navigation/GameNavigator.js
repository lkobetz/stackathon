import React from "react";
import { Platform } from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import IdiomIntroScreen from "../components/idioms/intro";
import IdiomPlayScreen from "../components/idioms/idiomsPlay";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const IdiomStack = createStackNavigator(
  {
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

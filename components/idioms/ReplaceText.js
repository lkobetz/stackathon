import React from "react";
import { Text } from "react-native";

export default ReplaceText = props => {
  return (
    // callback is removeFromSolution
    <Text onPress={() => props.callback(props.letterInfo, props.idx)}>
      {props.letterInfo.letter}
    </Text>
  );
};

import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class ReplaceText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text
        onPress={() =>
          this.props.callback(this.props.letterInfo, this.props.idx)
        }
      >
        {this.props.letterInfo.letter}
      </Text>
    );
  }
}

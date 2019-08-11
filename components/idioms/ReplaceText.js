import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

// create a function that generates a solutionBox based on the solution sentence. For each letter, create an onPress function that restores the letter to '_', finds a matching letter in this.state.chosenLetters, and removes it from this.state.chosenLetters

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

const styles = StyleSheet.create({
  scrambledText: {
    fontSize: 40,
    color: "whitesmoke",
    lineHeight: 60,
    textAlign: "center"
  },
  chosenLetters: {
    fontSize: 40,
    color: "blue",
    lineHeight: 60,
    textAlign: "center"
  }
});

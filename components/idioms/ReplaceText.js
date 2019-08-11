import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

// create a function that generates a solutionBox based on the solution sentence. For each letter, create an onPress function that restores the letter to '_', finds a matching letter in this.state.chosenLetters, and removes it from this.state.chosenLetters

export default class ReplaceText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // need to find a way to send this info back to removeFromSolution in idiomsPlay in order to remove this letterInfo from state and return the clicked index back to _
      // make sure the arguments in the callback below are correct (key should be the index of the clicked letter in solutionBox)
      <Text onPress={() => this.props.callback(this.props.letterInfo)}>
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

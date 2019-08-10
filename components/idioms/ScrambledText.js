import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class ScrambledText extends Component {
  constructor(props) {
    super(props);
  }
  fillInBox(letter, solutionBox) {
    let newSolution = "";
    for (let i = 0; i < solutionBox.length; i++) {
      // first, look for index of solutionBox that matches index of letter's word
      if (solutionBox[i] == "_") {
        newSolution = solutionBox.replace(solutionBox[i], letter);
        break;
      }
    }
    this.props.callback(newSolution, letter);
  }
  render() {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Text
        style={styles.scrambledText}
        key={this.props.props.idx}
        // eslint-disable-next-line no-loop-func
        onPress={() =>
          this.fillInBox(this.props.props.letter, this.props.props.solutionBox)
        }
      >
        {this.props.props.letter}
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
  }
});

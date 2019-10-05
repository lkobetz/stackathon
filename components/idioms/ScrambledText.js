import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default class ScrambledText extends Component {
  constructor(props) {
    super(props);
  }
  fillInBox(letter, solutionBox) {
    solutionBox = solutionBox.split(" ");
    let newWord = "";
    let newSolution = "";
    let wordBox = solutionBox[letter.wordIdx];
    for (let i = 0; i < wordBox.length; i++) {
      if (wordBox[i] == "_") {
        newWord = wordBox.replace(wordBox[i], letter.letter);
      }
    }
    solutionBox.splice(letter.wordIdx, 1, newWord);
    newSolution = solutionBox.join(" ");
    this.props.callback(newSolution, letter);
  }
  render() {
    var contains = this.props.chosenLetters.some(letter => {
      return JSON.stringify(this.props.letterInfo) === JSON.stringify(letter);
    });
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <TouchableOpacity
        disabled={contains}
        onPress={() =>
          this.fillInBox(this.props.letterInfo, this.props.solutionBox)
        }
      >
        <Text
          key={this.props.letterInfo.letterIdx}
          style={contains ? styles.chosenLetters : styles.scrambledText}
          // eslint-disable-next-line no-loop-func
        >
          {this.props.letterInfo.letter}
        </Text>
      </TouchableOpacity>
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
    color: "midnightblue",
    lineHeight: 60,
    textAlign: "center"
  }
});

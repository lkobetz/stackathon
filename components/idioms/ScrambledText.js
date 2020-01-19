import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// I think all of the state can be passed down from the parent component, not redux

export default class ScrambledText extends Component {
  constructor(props) {
    super(props);
  }
  // maybe just put this in idiomsPlay?
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
    // callback is addToSolution
    this.props.callback(newSolution, letter);
  }
  render() {
    var contains = this.props.chosenLetters.some(letter => {
      return JSON.stringify(this.props.letterInfo) === JSON.stringify(letter);
    });
    // console.log("contains letter info?", this.props.letterInfo, contains);
    // console.log(
    //   "solutionBox:",
    //   this.props.solutionBox,
    //   "chosenLetters:",
    //   this.props.chosenLetters
    // );
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
    fontSize: 60,
    color: "aquamarine",
    lineHeight: 70,
    textAlign: "center"
  },
  chosenLetters: {
    fontSize: 60,
    color: "midnightblue",
    lineHeight: 70,
    textAlign: "center"
  }
});

// need to use mergeProps to get access to store props(solutionBox and chosenLetters) as well as parentProps(letterIdx)

const mapStateToProps = (state, ownProps) => ({
  letterInfo: ownProps.letterInfo,
  solutionBox: state.solutionBox,
  chosenLetters: state.chosenLetters
});

module.exports = connect(mapStateToProps)(ScrambledText);

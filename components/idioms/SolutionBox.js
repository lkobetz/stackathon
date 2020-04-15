import React, { Component } from "react";
import ReplaceText from "./ReplaceText";
import { connect } from "react-redux";
import { makeSolutionBox, removeFromChosen } from "../../store/actions";
import { Text, View, StyleSheet } from "react-native";

export default class SolutionBox extends Component {
  constructor(props) {
    super(props);
  }
  createInteractiveSolutionBox(solutionBox) {
    let wordIdx = 0;
    let interactive = [];
    for (let i = 0; i < solutionBox.length; i++) {
      let letter = solutionBox[i];
      if (letter === " ") {
        interactive.push(
          <Text key={i} style={styles.solutionText}>
            {" "}
          </Text>
        );
        wordIdx++;
      } else if (letter === "_") {
        interactive.push(
          <Text key={i} style={styles.solutionText}>
            _
          </Text>
        );
      } else {
        let chosenLetters = this.props.chosenLetters.slice();
        let letterInfoArr = chosenLetters.filter(
          // eslint-disable-next-line no-loop-func
          (letterObj) =>
            letterObj.letter === letter && letterObj.wordIdx === wordIdx
        );
        let letterInfo = letterInfoArr.pop();
        interactive.push(
          <ReplaceText
            idx={i}
            key={i}
            letterInfo={letterInfo}
            callback={this.removeFromSolution.bind(this)}
          />
        );
      }
    }
    return interactive;
  }
  // can this be moved to the ReplaceText component?
  removeFromSolution(letterInfo, solutionIdx) {
    if (!this.props.correct) {
      let solutionBoxCopy = this.props.solutionBox.slice(0);
      let newSolution =
        solutionBoxCopy.slice(0, solutionIdx) +
        "_" +
        solutionBoxCopy.slice(solutionIdx + 1);
      this.props.makeSolutionBox(newSolution);
      this.props.removeFromChosen(letterInfo);
    }
  }
  render() {
    return (
      // do we need to define this style in this component?
      <View style={styles.sampleContainer}>
        <Text
          style={
            this.props.correct === false
              ? styles.solutionText
              : styles.correctSolution
          }
        >
          {this.createInteractiveSolutionBox(this.props.solutionBox)}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  solutionBox: state.solutionBox,
  correct: state.correct,
  chosenLetters: state.chosenLetters,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromChosen: (letter) => dispatch(removeFromChosen(letter)),
  makeSolutionBox: (box) => dispatch(makeSolutionBox(box)),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(SolutionBox);

const styles = StyleSheet.create({
  solutionText: {
    fontSize: 60,
    color: "orange",
    lineHeight: 70,
    textAlign: "center",
  },
  correctSolution: {
    fontSize: 60,
    color: "greenyellow",
    lineHeight: 70,
    textAlign: "center",
  },
});

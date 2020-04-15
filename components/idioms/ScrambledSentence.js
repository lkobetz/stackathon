import React, { Component } from "react";
import ScrambledText from "./ScrambledText";
import { connect } from "react-redux";
import { makeSolutionBox, addToChosen, addPoint } from "../../store/actions";
import { Text, View, StyleSheet } from "react-native";

export default class ScrambledSentence extends Component {
  constructor(props) {
    super(props);
  }
  createInteractiveSentence(sentence) {
    let scrambledCopy = this.props.scrambled.split("");
    const interactive = [];
    let wordIdx = 0;
    let word = [];
    for (let i = 0; i < sentence.length; i++) {
      let letter = sentence[i];
      if (letter === " ") {
        interactive.push(
          <View style={styles.word} key={wordIdx + sentence.length}>
            {word}
          </View>
        );
        word = [];
        wordIdx++;
        interactive.push(
          <Text style={styles.scrambledText} key={i} wordIdx={wordIdx}>
            {" "}
          </Text>
        );
      } else {
        let letterInfo = {
          letter: letter,
          letterIdx: this.props.getScrambledIdx(wordIdx, letter, scrambledCopy),
          wordIdx: wordIdx,
        };
        word.push(this.scrambleText(letterInfo));
      }
    }
    return interactive;
  }
  scrambleText(letterInfo) {
    return (
      <ScrambledText
        letterInfo={letterInfo}
        key={i}
        callback={this.addToSolution.bind(this)}
      />
    );
  }
  // this should probably go in ScrambledText component
  addToSolution(newSolution, letterProps) {
    if (newSolution === this.props.solution) {
      this.props.addPoint();
    }
    this.props.makeSolutionBox(newSolution);
    this.props.addToChosen(letterProps);
  }
  render() {
    return (
      <View style={styles.scrambledContainer}>
        {this.props.showSolution
          ? this.createInteractiveSentence(this.props.solution)
          : this.createInteractiveSentence(this.props.scrambled)}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  solution: state.solution,
  scrambled: state.scrambled,
  showSolution: ownProps.showSolution,
});

const mapDispatchToProps = (dispatch) => ({
  makeSolutionBox: (box) => dispatch(makeSolutionBox(box)),
  addPoint: () => dispatch(addPoint()),
  addToChosen: (letter) => dispatch(addToChosen(letter)),
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrambledSentence);

const styles = StyleSheet.create({
  scrambledContainer: {
    flexWrap: "wrap",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  word: {
    fontSize: 60,
    lineHeight: 70,
    flexWrap: "nowrap",
    flexDirection: "row",
    marginHorizontal: 0,
  },
  scrambledText: {
    fontSize: 60,
    color: "aquamarine",
    lineHeight: 70,
    textAlign: "center",
  },
});

/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import congrats from "../../data/congrats.json";
import Modal from "react-native-modal";
import ScrambledSentence from "./ScrambledSentence";
import SolutionBox from "./SolutionBox";
import Timer from "./Timer";
import ConfettiCannon from "react-native-confetti-cannon";
import { Platform } from "@unimodules/core";
import { throwStatement } from "@babel/types";
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import {
  saveCurrent,
  saveIdiom,
  saveDefinition,
  scrambleIdiom,
  makeSolutionBox,
  addToChosen,
  removeFromChosen,
  clear,
  saveInitialBox,
  addPoint,
  removePoint,
  startGame,
  endGame,
  removeChosenLetters,
  timeFinished,
  saveHintSolution,
} from "../../store/actions";

// To do:

// individual words turn green when correct?
// going back and choosing a category causes an error
// prevent solution box from jumping when letters are added/taken away (use a monospace font?)
// write tests

export default class Idioms extends Component {
  constructor(props) {
    super(props);
    // this clears chosen letters if player goes back then returns to this screen
    this.props.removeChosenLetters();
    let idioms = this.props.idioms;
    let current = this.randomNumber(idioms.length - 1);
    this.props.saveCurrent(current);
    let definition = idioms[current].definition;
    this.props.saveDefinition(definition);
    let solution = idioms[current].idiom;
    this.props.saveIdiom(solution);
    let shuffled = this.shuffle(solution);
    this.props.scrambleIdiom(shuffled);
    let newEmptyBox = this.createSolutionBox(solution);
    this.props.saveInitialBox(newEmptyBox);
    this.props.makeSolutionBox(newEmptyBox);
    this.props.saveHintSolution(solution);
    this.state = {
      showSolution: false,
      modal: false,
    };
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    this.props.startGame();
  }
  shuffle(sentence) {
    let shuffled = sentence.split(" ");
    let shuffledSolution = [];
    shuffled.map((word) => {
      let wordArr = word.split(""),
        wordLength = wordArr.length;

      for (var i = wordLength - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = wordArr[i];
        wordArr[i] = wordArr[j];
        wordArr[j] = tmp;
      }
      wordArr = wordArr.join("");
      shuffledSolution.push(wordArr);
    });
    shuffledSolution = shuffledSolution.join(" ");
    return shuffledSolution;
  }
  createSolutionBox(sentence) {
    let newBox = "";
    for (let i = 0; i < sentence.length; i++) {
      let letter = sentence[i];
      if (letter === " ") {
        newBox += " ";
      } else {
        newBox += "_";
      }
    }
    return newBox;
  }
  randomNumber(max) {
    let random = Math.random() * max;
    return Math.round(random);
  }
  reset() {
    let newCurrent = this.randomNumber(this.props.idioms.length - 1);
    let newDefinition = this.props.idioms[newCurrent].definition;
    let newSolution = this.props.idioms[newCurrent].idiom;
    let newShuffled = this.shuffle(newSolution);
    let newInitialBox = this.createSolutionBox(newSolution);
    this.props.saveCurrent(newCurrent);
    this.props.saveDefinition(newDefinition);
    this.props.saveIdiom(newSolution);
    Promise.resolve(this.props.saveInitialBox(newInitialBox)).then(() =>
      this.props.makeSolutionBox(this.props.initialBox)
    );

    this.props.scrambleIdiom(newShuffled);
    this.props.clear(this.props.initialBox);
    this.props.endGame();
    this.props.saveHintSolution(newSolution);
    this.setState({
      showSolution: false,
      modal: false,
    });
  }
  showSolution() {
    this.setState({ showSolution: true });
    this.props.removePoint();
    this.clearBox();
  }
  clearBox() {
    if (this.props.correct) {
      this.props.removePoint();
    }
    this.props.clear(this.props.initialBox);
  }
  showHint() {
    // copies of arrays to get the first and last letters of each word in the solution
    let hintSolutionArr = this.props.hintSolution.split(" ");
    let solutionBoxArr = this.props.solutionBox.split(" ");
    solutionBoxArr.pop();
    let replacementSolution = solutionBoxArr.map((word) => word.split(""));
    let newSolution = "";
    let scrambledCopy = this.props.scrambled.split("");
    for (let i = 0; i < hintSolutionArr.length - 1; i++) {
      let word = hintSolutionArr[i];
      let first = word[0];
      let letterInfoFirst = {
        letter: first,
        letterIdx: this.getScrambledIdx(i, first, scrambledCopy),
        wordIdx: i,
      };
      let last = word[word.length - 1];
      let letterInfoLast = {
        letter: last,
        letterIdx: this.getScrambledIdx(i, last, scrambledCopy),
        wordIdx: i,
      };
      replacementSolution[i][0] = first;
      replacementSolution[i][replacementSolution[i].length - 1] = last;
      newSolution = this.stringify(replacementSolution);
      newSolution = newSolution.trim();
      newSolution = newSolution + " ";
      this.props.addToChosen(letterInfoFirst);
      this.props.addToChosen(letterInfoLast);
      this.props.makeSolutionBox(newSolution);
    }
  }
  getScrambledIdx(wordIdx, letter, scrambled) {
    let wordIndex = 0;
    let idxToReturn = -1;
    for (let i = 0; i < scrambled.length; i++) {
      if (scrambled[i] === " ") {
        wordIndex++;
      }
      if (wordIndex === wordIdx) {
        let thisLetter = scrambled[i];
        if (thisLetter === letter) {
          idxToReturn = i;
          scrambled.splice(i, 1, "_");
          return idxToReturn;
        }
      }
    }
  }
  stringify(arr) {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i];
      if (Array.isArray(elem)) {
        string += this.stringify(elem);
      } else {
        string += elem;
      }
    }
    string += " ";
    return string;
  }
  showModal() {
    setTimeout(() => {
      this.setState({ modal: true });
    }, 600);
  }
  render() {
    return (
      <View style={styles.wholeScreen}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.playContainer}>
            <View style={styles.footer}>
              <Text style={styles.footer}>Points: {this.props.points} </Text>
              {this.props.timeUp ? (
                <Button
                  onPress={() => this.showSolution()}
                  title="Show Solution"
                  color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
                ></Button>
              ) : (
                <Timer />
              )}
            </View>
            <View style={styles.definitionContainer}>
              <Text style={styles.definitionText}>
                Meaning: {this.props.definition}
              </Text>
            </View>
            <ScrambledSentence
              showSolution={this.state.showSolution}
              getScrambledIdx={this.getScrambledIdx}
              showModal={this.showModal.bind(this)}
            />

            <SolutionBox />

            <View style={styles.footer}>
              <Button
                color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
                title="Clear"
                onPress={() => this.clearBox()}
              />
              <Button
                color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
                title="Next"
                onPress={!this.props.correct ? () => this.reset() : null}
              />
            </View>
            <Text style={styles.footer}>
              Categories:
              {this.props.idioms[this.props.current].categories.join(", ")}
            </Text>
            <Button
              color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
              title="Show Hint"
              onPress={() =>
                Promise.resolve(this.clearBox()).then(() => this.showHint())
              }
            />
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.modal}
          style={styles.modal}
          onBackdropPress={() => this.reset()}
          animationIn={"rotate"}
          backdropTransitionOutTiming={0}
        >
          <Text style={styles.modalText}>
            {congrats[this.randomNumber(congrats.length)]}
          </Text>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "darkslateblue",
    marginVertical: 0,
  },
  playContainer: {
    backgroundColor: "darkslateblue",
    alignItems: "center",
    marginTop: 50,
  },
  definitionContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  definitionText: {
    fontStyle: "italic",
    fontSize: 20,
    color: "yellow",
    lineHeight: 25,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    color: "lavender",
    alignItems: "center",
    fontSize: 17,
    justifyContent: "space-between",
  },
  wholeScreen: {
    width: width,
    height: 810,
  },
  modal: {
    marginTop: Dimensions.get("window").height / 3,
    alignItems: "center",
    alignSelf: "center",
    maxHeight: Dimensions.get("window").height / 6,
    width: width * 0.6,
    backgroundColor: "greenyellow",
  },
  modalText: {
    color: "darkslateblue",
    fontSize: 35,
  },
});

const mapStateToProps = (state) => ({
  idioms: state.idioms,
  current: state.currentIdx,
  solution: state.solution,
  definition: state.definition,
  scrambled: state.scrambled,
  solutionBox: state.solutionBox,
  correct: state.correct,
  initialBox: state.initialBox,
  points: state.points,
  timeUp: state.timeUp,
  hintSolution: state.hintSolution,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrent: (current) => dispatch(saveCurrent(current)),
  saveIdiom: (solution) => dispatch(saveIdiom(solution)),
  saveDefinition: (definition) => dispatch(saveDefinition(definition)),
  scrambleIdiom: (scrambled) => dispatch(scrambleIdiom(scrambled)),
  makeSolutionBox: (box) => dispatch(makeSolutionBox(box)),
  addToChosen: (letter) => dispatch(addToChosen(letter)),
  startGame: () => dispatch(startGame()),
  clear: (box) => dispatch(clear(box)),
  saveInitialBox: (box) => dispatch(saveInitialBox(box)),
  removePoint: () => dispatch(removePoint()),
  endGame: () => dispatch(endGame()),
  removeChosenLetters: () => dispatch(removeChosenLetters()),
  saveHintSolution: (solution) => dispatch(saveHintSolution(solution)),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Idioms);

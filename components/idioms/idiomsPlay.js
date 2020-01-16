/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import ScrambledText from "./ScrambledText";
import ReplaceText from "./ReplaceText";
import Timer from "./Timer";
import ConfettiCannon from "react-native-confetti-cannon";
import { Platform } from "@unimodules/core";
import { throwStatement } from "@babel/types";
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";

// import connect from react-redux for mapState and mapDispatch

// thunks: -getSolutionBox -
//   addToChosen -
//   removeFromChosen -
//   incrementPoints -
//   decrementPoints -
//   getCategories -
//   clearBox -
//   nextIdiom -
//   addToSolution -
//   removeFromSolution -
//   showHint
//   showSolution
//   startGame
//   correctSolution
//   startTimer
//   timeUp

// state from redux:
// - idioms
// - current(idx of idioms)
// - definition
// - solution
// - shuffled / scrambled (can they be the same?)
// - initialBox
// - solutionBox
// - correct (boolean)
// - chosenLetters
// - points (number)
// - timeUp (boolean)
// - started (boolean)
// - showSolution (boolean)
// - categories (of current idiom), here are passed down from parent componentDidMount
// - hintSolution (distinct from solution because it modifies it. necessary?)

export default class Idioms extends Component {
  constructor(props) {
    super(props);
    let idioms = this.props.idioms;
    let current = this.randomNumber(idioms.length - 1);
    let definition = idioms[current].definition;
    let solution = idioms[current].idiom;
    let shuffled = this.shuffle(solution);
    let initialBox = this.createSolutionBox(solution);
    this.state = {
      solutionBox: initialBox,
      correct: false,
      chosenLetters: [],
      scrambled: shuffled,
      points: 0,
      timeUp: false,
      showSolution: false,
      started: true,
      categories: this.props.chosenCategories,
      definition,
      solution,
      current,
      initialBox,
      idioms,
      hintSolution: solution
    };
  }
  componentDidMount() {
    this.setState({ started: true });
  }
  shuffle(sentence) {
    let shuffled = sentence.split(" ");
    let shuffledSolution = [];
    shuffled.map(word => {
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
  createInteractiveSentence(sentence) {
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
          letterIdx: i,
          wordIdx: wordIdx
        };
        word.push(
          <ScrambledText
            letterInfo={letterInfo}
            solutionBox={this.state.solutionBox}
            chosenLetters={this.state.chosenLetters}
            key={i}
            callback={this.addToSolution.bind(this)}
          />
        );
      }
    }
    return interactive;
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
        let chosenLetters = this.state.chosenLetters.slice();
        let letterInfoArr = chosenLetters.filter(
          // eslint-disable-next-line no-loop-func
          letterObj =>
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
  addToSolution(newSolution, letterProps) {
    if (newSolution === this.state.solution) {
      this.setState({ correct: true });
    }
    this.setState(previous => ({
      solutionBox: newSolution,
      chosenLetters: previous.chosenLetters.concat(letterProps)
    }));
  }
  removeFromSolution(letterInfo, solutionIdx) {
    let solutionBoxCopy = this.state.solutionBox.slice(0);
    let newSolution =
      solutionBoxCopy.slice(0, solutionIdx) +
      "_" +
      solutionBoxCopy.slice(solutionIdx + 1);
    this.setState({ solutionBox: newSolution });
    let chosenLettersCopy = this.state.chosenLetters;
    let newChosenLetters = chosenLettersCopy.filter(
      letter => letter.letterIdx !== letterInfo.letterIdx
    );
    this.setState({ chosenLetters: newChosenLetters });
  }
  clearBox() {
    this.setState({ solutionBox: this.state.initialBox });
    this.setState({ correct: false });
    this.setState({ chosenLetters: [] });
  }
  reset() {
    if (this.state.correct) {
      this.setState({ points: this.state.points + 1 });
    }
    let newCurrent = this.randomNumber(this.props.idioms.length - 1);
    let newDefinition = this.props.idioms[newCurrent].definition;
    let newSolution = this.props.idioms[newCurrent].idiom;
    let newShuffled = this.shuffle(newSolution);
    let newInitialBox = this.createSolutionBox(newSolution);
    this.setState({ solutionBox: newInitialBox });
    this.setState({ correct: false });
    this.setState({ chosenLetters: [] });
    this.setState({ scrambled: newShuffled });
    this.setState({ timeUp: false });
    this.setState({ showSolution: false });
    this.setState({ started: false });
    this.setState({ definition: newDefinition });
    this.setState({ solution: newSolution });
    this.setState({ current: newCurrent });
    this.setState({ initialBox: newInitialBox });
    this.setState({ hintSolution: newSolution });
  }
  showSolution() {
    this.setState({ showSolution: true });
    this.setState(prev => ({ points: prev.points - 1 }));
    this.clearBox();
  }
  showHint() {
    let hintSolutionArr = this.state.hintSolution.split(" ");
    let solutionBoxArr = this.state.solutionBox.split(" ");
    // hintSolutionArr = hintSolutionArr.slice(0, hintSolutionArr.length - 1);
    // solutionBoxArr = solutionBoxArr.slice(0, solutionBoxArr.length - 1);
    let replacementSolution = solutionBoxArr.map(word => word.split(""));
    let newSolution = "";
    for (let i = 0; i < hintSolutionArr.length - 1; i++) {
      let word = hintSolutionArr[i];
      let first = word[0];
      let letterInfoFirst = {
        letter: first,
        letterIdx: 0,
        wordIdx: i
      };
      let last = word[word.length - 1];
      let letterInfoLast = {
        letter: last,
        letterIdx: word.length - 1,
        wordIdx: i
      };
      replacementSolution[i][0] = first;
      replacementSolution[i][replacementSolution[i].length - 1] = last;
      newSolution = this.stringify(replacementSolution);
      this.addToSolution(newSolution, letterInfoFirst);
      // if (i === hintSolutionArr.length - 1) {
      // this.addToSolution(newSolution + " ", letterInfoLast);
      // } else {
      this.addToSolution(newSolution, letterInfoLast);
      // }
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
  startTimer() {
    this.setState({ started: true });
  }
  timeFinished() {
    this.setState({ timeUp: true });
    this.setState({ started: false });
  }

  render() {
    return (
      <View style={styles.wholeScreen}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.playContainer}>
            <View style={styles.footer}>
              <Text style={styles.footer}>Points: {this.state.points} </Text>
              {this.state.timeUp ? (
                <Button
                  onPress={() => this.showSolution()}
                  title="Show Solution"
                  color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
                ></Button>
              ) : (
                <Timer
                  started={this.state.started}
                  startTimer={this.startTimer.bind(this)}
                  timeFinished={this.timeFinished.bind(this)}
                  current={this.state.current}
                />
              )}
            </View>
            <View style={styles.definitionContainer}>
              <Text style={styles.definitionText}>
                Meaning: {this.state.definition}
              </Text>
            </View>

            <View style={styles.scrambledContainer}>
              {this.state.showSolution
                ? this.createInteractiveSentence(this.state.solution)
                : this.createInteractiveSentence(this.state.scrambled)}
            </View>

            <View style={styles.sampleContainer}>
              <Text
                style={
                  this.state.correct === false
                    ? styles.solutionText
                    : styles.correctSolution
                }
              >
                {this.createInteractiveSolutionBox(this.state.solutionBox)}
              </Text>
            </View>

            <View style={styles.footer}>
              <Button
                color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
                title="Clear"
                onPress={() => this.clearBox()}
              />
              <Button
                color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
                title="Next"
                onPress={() => this.reset()}
              />
            </View>
            <Text style={styles.footer}>
              Categories:{" "}
              {this.props.idioms[this.state.current].categories.join(", ")}
            </Text>
            <Button
              color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
              title="Show Hint"
              onPress={() => this.showHint()}
            />
          </View>
        </ScrollView>
        {this.state.correct && (
          <ConfettiCannon
            count={300}
            origin={{
              x: this.props.navigation.state.params.width, // 414
              y: this.props.navigation.state.params.height // 896
            }}
            explosionSpeed={300}
            fallSpeed={2000}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "darkslateblue",
    marginVertical: 0
  },
  playContainer: {
    paddingTop: 15,
    backgroundColor: "darkslateblue",
    alignItems: "center"
  },
  definitionContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  definitionText: {
    fontStyle: "italic",
    fontSize: 20,
    color: "yellow",
    lineHeight: 25,
    textAlign: "center"
  },
  scrambledContainer: {
    flexWrap: "wrap",
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  scrambledText: {
    fontSize: 60,
    color: "aquamarine",
    lineHeight: 70,
    textAlign: "center"
  },
  solutionText: {
    fontSize: 60,
    color: "orange",
    lineHeight: 70,
    textAlign: "center"
  },
  correctSolution: {
    fontSize: 60,
    color: "greenyellow",
    lineHeight: 70,
    textAlign: "center"
  },
  footer: {
    flexDirection: "row",
    color: "lavender",
    alignItems: "center",
    fontSize: 17,
    justifyContent: "space-between"
  },
  word: {
    fontSize: 60,
    lineHeight: 70,
    flexWrap: "nowrap",
    flexDirection: "row",
    marginHorizontal: 0
  },
  wholeScreen: {
    width: width,
    height: 810
  }
});

const mapStateToProps = state => ({
  chosenCategories: state.chosenCategories,
  idioms: state.idioms
});

const mapDispatchToProps = dispatch => ({});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Idioms);

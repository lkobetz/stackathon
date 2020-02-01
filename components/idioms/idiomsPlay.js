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
import {
  start,
  saveCurrent,
  saveIdiom,
  saveDefinition,
  scrambleIdiom,
  makeSolutionBox,
  addToChosen,
  removeFromChosen,
  clear,
  saveInitialBox
} from "../../store/gameReducer";

// To fix:

// sometimes showHint letters appear green
// timer is broken

export default class Idioms extends Component {
  constructor(props) {
    super(props);
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
    this.state = {
      correct: false,
      points: 0,
      timeUp: false,
      showSolution: false,
      categories: this.props.chosenCategories,
      hintSolution: solution,
      started: false
    };
  }
  componentDidMount() {
    this.setState({ started: true });
    // this.props.start();
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
          letterIdx: this.getScrambledIdx(wordIdx, letter, scrambledCopy),
          wordIdx: wordIdx
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
    if (newSolution === this.props.solution) {
      this.setState({ correct: true });
    }
    this.props.makeSolutionBox(newSolution);
    this.props.addToChosen(letterProps);
  }
  removeFromSolution(letterInfo, solutionIdx) {
    let solutionBoxCopy = this.props.solutionBox.slice(0);
    let newSolution =
      solutionBoxCopy.slice(0, solutionIdx) +
      "_" +
      solutionBoxCopy.slice(solutionIdx + 1);
    this.props.makeSolutionBox(newSolution);
    this.props.removeFromChosen(letterInfo);
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
    this.props.saveCurrent(newCurrent);
    this.props.saveDefinition(newDefinition);
    this.props.saveIdiom(newSolution);
    Promise.resolve(this.props.saveInitialBox(newInitialBox)).then(() =>
      this.props.makeSolutionBox(this.props.initialBox)
    );

    this.props.scrambleIdiom(newShuffled);
    this.props.clear(this.props.initialBox);
    this.setState({ started: false });
    this.setState({ correct: false });
    this.setState({ timeUp: false });
    this.setState({ showSolution: false });
    this.setState({ hintSolution: newSolution });
  }
  showSolution() {
    this.setState({ showSolution: true });
    this.setState(prev => ({ points: prev.points - 1 }));
    this.clearBox();
  }
  changeHint() {
    this.setState({ hint: !false });
  }
  clearBox() {
    this.setState({ correct: false });
    this.props.clear(this.props.initialBox);
  }
  showHint() {
    // copies of arrays to get the first and last letters of each word in the solution
    let hintSolutionArr = this.state.hintSolution.split(" ");
    let solutionBoxArr = this.props.solutionBox.split(" ");
    solutionBoxArr.pop();
    let replacementSolution = solutionBoxArr.map(word => word.split(""));
    let newSolution = "";
    let scrambledCopy = this.props.scrambled.split("");
    for (let i = 0; i < hintSolutionArr.length - 1; i++) {
      let word = hintSolutionArr[i];
      let first = word[0];
      let letterInfoFirst = {
        letter: first,
        letterIdx: this.getScrambledIdx(i, first, scrambledCopy),
        wordIdx: i
      };
      let last = word[word.length - 1];
      let letterInfoLast = {
        letter: last,
        letterIdx: this.getScrambledIdx(i, last, scrambledCopy),
        wordIdx: i
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
    // }
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
                  current={this.props.current}
                />
              )}
            </View>
            <View style={styles.definitionContainer}>
              <Text style={styles.definitionText}>
                Meaning: {this.props.definition}
              </Text>
            </View>

            <View style={styles.scrambledContainer}>
              {this.state.showSolution
                ? this.createInteractiveSentence(this.props.solution)
                : this.createInteractiveSentence(this.props.scrambled)}
            </View>

            <View style={styles.sampleContainer}>
              <Text
                style={
                  this.state.correct === false
                    ? styles.solutionText
                    : styles.correctSolution
                }
              >
                {this.createInteractiveSolutionBox(this.props.solutionBox)}
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
  started: state.started,
  chosenCategories: state.chosenCategories,
  idioms: state.idioms,
  current: state.currentIdx,
  solution: state.solution,
  definition: state.definition,
  scrambled: state.scrambled,
  solutionBox: state.solutionBox,
  chosenLetters: state.chosenLetters,
  initialBox: state.initialBox
});

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(start()),
  saveCurrent: current => dispatch(saveCurrent(current)),
  saveIdiom: solution => dispatch(saveIdiom(solution)),
  saveDefinition: definition => dispatch(saveDefinition(definition)),
  scrambleIdiom: scrambled => dispatch(scrambleIdiom(scrambled)),
  makeSolutionBox: box => dispatch(makeSolutionBox(box)),
  addToChosen: letter => dispatch(addToChosen(letter)),
  removeFromChosen: letter => dispatch(removeFromChosen(letter)),
  clear: box => dispatch(clear(box)),
  saveInitialBox: box => dispatch(saveInitialBox(box))
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Idioms);

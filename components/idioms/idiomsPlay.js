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
import idioms from "../../data/data.json";
import Timer from "./Timer";
import ConfettiCannon from "react-native-confetti-cannon";
import { Platform } from "@unimodules/core";
const { height, width } = Dimensions.get("window");

function shuffle(sentence) {
  let shuffled = sentence.split(" ");
  let shuffledSolution = [];
  shuffled.map(word => {
    let a = word.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    a = a.join("");
    shuffledSolution.push(a);
  });
  shuffledSolution = shuffledSolution.join(" ");
  return shuffledSolution;
}

function createSolutionBox(sentence) {
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

function randomNumber(max) {
  let random = Math.random() * max;
  return Math.round(random);
}
let current = randomNumber(idioms.length - 1);
let definition = idioms[current].definition;
let solution = idioms[current].idiom;
let shuffled = shuffle(solution);
let initialBox = createSolutionBox(solution);

export default class Idioms extends Component {
  constructor() {
    super();
    this.state = {
      solutionBox: initialBox,
      correct: false,
      chosenLetters: [],
      scrambled: shuffled,
      points: 0,
      timeUp: false,
      showSolution: false,
      started: true
    };
  }
  componentDidMount() {
    this.setState({ started: true });
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
    if (newSolution === solution) {
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
    this.setState({ solutionBox: initialBox });
    this.setState({ correct: false });
    this.setState({ chosenLetters: [] });
  }
  reset() {
    if (this.state.correct) {
      this.setState({ points: this.state.points + 1 });
    }
    current = randomNumber(idioms.length - 1);
    definition = idioms[current].definition;
    solution = idioms[current].idiom;
    shuffled = shuffle(solution);
    initialBox = createSolutionBox(solution);
    this.setState({ solutionBox: initialBox });
    this.setState({ correct: false });
    this.setState({ chosenLetters: [] });
    this.setState({ scrambled: shuffled });
    this.setState({ timeUp: false });
    this.setState({ showSolution: false });
    this.setState({ started: false });
  }
  showSolution() {
    this.setState({ showSolution: true });
    this.setState(prev => ({ points: prev.points - 1 }));
    this.clearBox();
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
            <View style={styles.definitionContainer}>
              <Text style={styles.definitionText}>Meaning: {definition}</Text>
            </View>

            <View style={styles.scrambledContainer}>
              {this.state.showSolution
                ? this.createInteractiveSentence(solution)
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
                  current={current}
                />
              )}
            </View>
          </View>
        </ScrollView>
        {this.state.correct && (
          <ConfettiCannon
            count={300}
            origin={{
              x: this.props.navigation.state.params.width, // 414
              y: this.props.navigation.state.params.height // 896
            }}
            explosionSpeed={400}
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

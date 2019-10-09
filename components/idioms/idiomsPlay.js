/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import ScrambledText from "./ScrambledText";
import ReplaceText from "./ReplaceText";
import idioms from "../../data/data.json";

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

function randomNumber(min, max) {
  let random = Math.random() * (max - min) + min;
  return Math.round(random);
}
let current = randomNumber(0, idioms.length - 1);
let definition = idioms[current].definition;
let solution = idioms[current].idiom;
let shuffled = shuffle(solution);
let initialBox = createSolutionBox(solution);

export default class Idioms extends Component {
  state = {
    solutionBox: initialBox,
    correct: false,
    chosenLetters: [],
    scrambled: shuffled,
    points: 0
  };
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
    current = randomNumber(0, idioms.length - 1);
    definition = idioms[current].definition;
    solution = idioms[current].idiom;
    shuffled = shuffle(solution);
    initialBox = createSolutionBox(solution);
    this.setState({ solutionBox: initialBox });
    this.setState({ correct: false });
    this.setState({ chosenLetters: [] });
    this.setState({ scrambled: shuffled });
  }

  render() {
    return (
      <View style={styles.playContainer}>
        <View style={styles.definitionContainer}>
          <Text style={styles.definitionText}>Meaning: {definition}</Text>
        </View>

        <View style={styles.scrambledContainer}>
          {this.createInteractiveSentence(this.state.scrambled)}
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
            color="lavender"
            title="Clear"
            onPress={() => this.clearBox()}
          />
          <Button color="lavender" title="Next" onPress={() => this.reset()} />
          <Text style={styles.footer}>Points: {this.state.points}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "steelblue",
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
    fontSize: 40,
    color: "whitesmoke",
    lineHeight: 60,
    textAlign: "center"
  },
  solutionText: {
    fontSize: 40,
    color: "firebrick",
    lineHeight: 60,
    textAlign: "center"
  },
  correctSolution: {
    fontSize: 40,
    color: "springgreen",
    lineHeight: 60,
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
    flexWrap: "nowrap",
    flexDirection: "row",
    marginHorizontal: 0
  }
});

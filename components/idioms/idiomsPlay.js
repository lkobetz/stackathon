/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import ScrambledText from "./ScrambledText";
import ReplaceText from "./ReplaceText";
import { conditionalExpression } from "@babel/types";
// import Database from "./database";
// import ShuffleFunc from "./ShuffleFunc";

// this info will ultimately come from the database
let definition = "Being far away from someone makes you love them more.";
// remember that the solution needs an empty space after the period
let solution = "Absence makes the heart grow fonder. ";

// it would be nice to put the function in another file (instead of under Idioms) for modularity
let shuffled = shuffle(solution);
let initialBox = createSolutionBox(solution);

export default class Idioms extends Component {
  state = {
    solutionBox: initialBox,
    correct: false,
    chosenLetters: [],
    scrambled: shuffled
  };
  createInteractiveSentence(sentence) {
    const interactive = [];
    let wordIdx = 0;
    let word = [];
    for (let i = 0; i < sentence.length; i++) {
      let letter = sentence[i];
      if (letter === " ") {
        interactive.push(word);
        word = [];
        wordIdx = wordIdx + 1;
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

  render() {
    return (
      <View style={styles.container}>
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

        <Button
          style={styles.buttonText}
          color="white"
          backgroundColor="black"
          title="Clear"
          onPress={() => this.clearBox()}
        />
      </View>
    );
  }
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
    backgroundColor: "steelblue"
  },
  definitionContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: "row"
    // flexWrap: "wrap"
  },
  definitionText: {
    fontSize: 20,
    color: "whitesmoke",
    lineHeight: 25,
    textAlign: "center"
  },
  scrambledContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  scrambledText: {
    fontSize: 40,
    color: "whitesmoke",
    lineHeight: 60,
    textAlign: "center"
  },
  chosenLetters: {
    fontSize: 40,
    color: "blue",
    lineHeight: 60,
    textAlign: "center"
  },
  solutionText: {
    fontSize: 40,
    color: "red",
    lineHeight: 60,
    textAlign: "center"
  },
  correctSolution: {
    fontSize: 40,
    color: "springgreen",
    lineHeight: 60,
    textAlign: "center"
  }
});

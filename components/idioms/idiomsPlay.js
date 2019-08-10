/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import ScrambledText from "./ScrambledText";
// import ShuffleFunc from "./ShuffleFunc";

// this info will ultimately come from the database
let definition =
  "When a person you love is far away from you, your love for them grows stronger.";
let solution = "Absence makes the heart grow fonder.";

// it would be nice to put the function in another file (instead of under Idioms) for modularity
let scrambled = shuffle(solution);

export default class Idioms extends Component {
  state = {
    solutionBox: "_______ _____ ___ _____ ____ _______",
    correct: false,
    chosenLetters: []
  };
  createInteractiveSentence(sentence) {
    const interactive = [];
    let wordIdx = 0;
    for (let i = 0; i < sentence.length; i++) {
      let letter = sentence[i];
      if (letter == " ") {
        wordIdx = wordIdx + 1;
        interactive.push(
          <Text style={styles.scrambledText} key={i} wordIdx={wordIdx}>
            {" "}
          </Text>
        );
      } else {
        let letterProps = {
          letter: letter,
          letterIdx: i,
          wordIdx: wordIdx,
          solutionBox: this.state.solutionBox
        };
        interactive.push(
          <ScrambledText
            props={letterProps}
            key={i}
            callback={this.updateSolution.bind(this)}
          />
        );
      }
    }
    return interactive;
  }
  updateSolution(newSolution, letter) {
    if (newSolution === solution) {
      this.setState({ correct: true });
    }
    this.setState(previous => ({
      solutionBox: newSolution,
      chosenLetters: previous.chosenLetters.concat(letter)
    }));
  }
  clearBox() {
    this.setState({ solutionBox: "_______ _____ ___ _____ ____ _______" });
    this.setState({ correct: false });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.definitionContainer}>
          <Text style={styles.definitionText}>Meaning: {definition}</Text>
        </View>

        <View style={styles.scrambledContainer}>
          {this.createInteractiveSentence(scrambled)}
        </View>

        <View style={styles.sampleContainer}>
          <Text
            style={
              this.state.correct === false
                ? styles.solutionText
                : styles.correctSolution
            }
          >
            {this.state.solutionBox}
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
    flexDirection: "row",
    flexWrap: "wrap"
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

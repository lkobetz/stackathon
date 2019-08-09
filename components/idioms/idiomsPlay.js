/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import React, { Component } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

let definition =
  "When a person you love is far away from you, your love for them grows stronger.";
// let sentence = "ebscnAe kseam eth rhtea rwgo dfreon.";
let solution = "Absence makes the heart grow fonder.";

function shuffle(solution) {
  let shuffled = solution.split(" ");
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

let scrambled = shuffle(solution);

export default class Idioms extends Component {
  state = {
    solutionBox: "_______ _____ ___ _____ ____ _______",
    correct: false,
    chosenLetters: []
  };
  createInteractiveSentence(sentence) {
    const interactive = [];
    for (let i = 0; i < sentence.length; i++) {
      let letter = sentence[i];
      interactive.push(
        <Text
          style={styles.scrambledText}
          key={i}
          onPress={() => {
            this.setState(previous => ({
              solutionBox: this.fillInBox(letter, this.state.solutionBox),
              chosenLetters: previous.chosenLetters.concat({
                [letter]: i
              })
            }));
          }}
          // style={
          //   this.state.chosenLetters[letter] === i
          //     ? console.log(this.state.chosenLetters[letter])
          //     : console.log(sentence[i], false)
          // }
        >
          {letter}
        </Text>
      );
    }
    return interactive;
  }
  fillInBox(letter, solutionBox) {
    let newSolution = "";
    if (!letter) {
      return solutionBox;
    }
    for (let i = 0; i < solutionBox.length; i++) {
      if (solutionBox[i] == "_") {
        newSolution = solutionBox.replace(solutionBox[i], letter);
        break;
      }
    }
    if (newSolution === solution) {
      this.setState({ correct: true });
    }
    console.log(newSolution === solution);
    return newSolution;
  }
  clearBox() {
    this.setState({ solutionBox: "_______ _____ ___ _____ ____ _______" });
    this.setState({ correct: false });
  }
  render() {
    console.log(solution);
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
            {this.fillInBox(null, this.state.solutionBox)}
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

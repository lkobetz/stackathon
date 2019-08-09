import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class Idioms extends Component {
  state = {
    showInstructions: false
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText}>
          Do you want to read the instructions first?
        </Text>
        <Button
          style={styles.buttonText}
          title="Instructions"
          color="white"
          onPress={() => this.setState({ showInstructions: true })}
        />
        {this.state.showInstructions && (
          <Text style={styles.instructionText}>
            Read the definition of the idiom at the top of the page. Below the
            definition, you will see all of the words that belong in the idiom,
            but the letters in each word are out of order! Click on a letter to
            add it to the blanks below. See if you can complete the whole idiom
            before time runs out! Have fun and good luck!
          </Text>
        )}
        <Button
          style={styles.buttonText}
          title="Play!"
          color="white"
          onPress={() => this.props.navigation.navigate("IdiomsPlay")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "steelblue"
  },
  buttonText: {
    fontSize: 25,
    lineHeight: 30,
    color: "white"
  },
  getStartedText: {
    fontSize: 20,
    color: "whitesmoke",
    lineHeight: 24,
    textAlign: "center"
  },
  instructionText: {
    fontSize: 17,
    color: "gainsboro",
    lineHeight: 24,
    textAlign: "center",
    marginHorizontal: 10
  }
});

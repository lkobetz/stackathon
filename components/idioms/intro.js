import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  Platform
} from "react-native";
import data from "../../data/data.json";
import CountIdioms from "../idioms/CountIdioms";

const { height, width } = Dimensions.get("window");

export default class Idioms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInstructions: false,
      categories: this.props.navigation.state.params.categories,
      idioms: data
    };
  }
  componentDidMount() {
    let filteredIdioms = this.filterIdioms(data);
    this.setState({ idioms: filteredIdioms });
  }
  filterIdioms(idioms) {
    let filtered = [];
    idioms.forEach(idiom => {
      let value = this.matchIdioms(idiom, this.state.categories);
      if (value) {
        filtered.push(value);
      }
    });
    return filtered;
  }
  matchIdioms(idiom, categories) {
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      if (idiom.categories.includes(category)) {
        return idiom;
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.getStartedText}>
          Do you want to read the instructions first?
        </Text>
        <Button
          style={styles.buttonText}
          title="Instructions"
          color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
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
          color={Platform.OS === "ios" ? "lavender" : "darkslateblue"}
          onPress={() =>
            this.props.navigation.navigate("IdiomsPlay", {
              height: height,
              width: width,
              categories: this.state.categories,
              idioms: this.state.idioms
            })
          }
        />
        <View>
          <Text>
            <CountIdioms idioms={data} categories={this.state.categories} />
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "darkslateblue"
  },
  buttonText: {
    fontSize: 25,
    lineHeight: 30,
    color: "white"
  },
  getStartedText: {
    fontSize: 20,
    color: "yellow",
    lineHeight: 24,
    textAlign: "center"
  },
  instructionText: {
    fontSize: 17,
    color: "yellow",
    lineHeight: 24,
    textAlign: "center",
    marginHorizontal: 10
  }
});

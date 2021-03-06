import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { addCategories, removeCategories } from "../store/actions";
import CountIdioms from "../components/idioms/CountIdioms";

import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  setCategories(input) {
    if (this.props.chosenCategories.includes(input)) {
      // allow the user to remove a category if they change their mind
      this.props.removeCategories(input);
    } else {
      // add a category that the user chooses
      this.props.addCategories(input);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>IDIOMATIC</Text>
          </View>
          <Text style={styles.text}>Choose a Category:</Text>
          <View style={styles.categories}>
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Animals"
              onPress={() => this.setCategories("animals")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Body Parts"
              onPress={() => this.setCategories("body parts")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Colors"
              onPress={() => this.setCategories("colors")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Food"
              onPress={() => this.setCategories("food")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Money"
              onPress={() => this.setCategories("money")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Nature"
              onPress={() => this.setCategories("nature")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Other"
              onPress={() => this.setCategories("other")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Recreation"
              onPress={() => this.setCategories("recreation")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Sleep"
              onPress={() => this.setCategories("sleep")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Time"
              onPress={() => this.setCategories("time")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Traveling"
              onPress={() => this.setCategories("traveling")}
            />
            <Button
              style={styles.buttonText}
              color={Platform.OS === "ios" ? "yellow" : "darkslateblue"}
              title="Wisdom"
              onPress={() => this.setCategories("wisdom")}
            />
          </View>
          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push("IdiomsIntro", {
                  categories: this.props.chosenCategories,
                })
              }
            >
              <Text style={styles.text}>Start!</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.chosenCategories}>
              <CountIdioms />
            </Text>
          </View>
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}
        >
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View> */}
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use
//         useful development tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkslateblue",
    display: "flex",
    height: height,
    width: width,
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: "center",
    display: "flex",
    height: height,
    width: width,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 60,
    lineHeight: 80,
    color: "yellow",
    marginTop: 150,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "yellow",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 50,
    color: "white",
  },
  sampleContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  sampleText: {
    fontSize: 50,
    color: "whitesmoke",
    lineHeight: 60,
    textAlign: "center",
  },
  text: {
    color: "aquamarine",
    fontSize: 30,
    textAlignVertical: "center",
    marginVertical: 30,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    fontSize: 30,
  },
  chosenCategories: {
    fontSize: 17,
    color: "aquamarine",
    lineHeight: 24,
    textAlign: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    chosenCategories: state.chosenCategories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addCategories: (categories) => dispatch(addCategories(categories)),
  removeCategories: (categories) => dispatch(removeCategories(categories)),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

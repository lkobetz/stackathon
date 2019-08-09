import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import { MonoText } from "../components/StyledText";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>IDIOMATIC</Text>
        </View>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>
            What would you like to learn today?
          </Text>
        </View>

        <View style={styles.helpContainer}>
          {/* <TouchableOpacity style={styles.helpLink}> */}
          <Button
            style={styles.buttonText}
            color="white"
            backgroundColor="black"
            title="Idioms"
            onPress={() => props.navigation.navigate("IdiomsIntro")}
          />
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.helpLink}> */}
          <Button
            style={styles.buttonText}
            color="white"
            backgroundColor="black"
            title="Jokes"
            onPress={() => props.navigation.navigate("IdiomsIntro")}
          />
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.helpLink}> */}
          <Button
            style={styles.buttonText}
            color="white"
            backgroundColor="black"
            title="Quotes"
            onPress={() => props.navigation.navigate("IdiomsIntro")}
          />
          {/* </TouchableOpacity> */}
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

HomeScreen.navigationOptions = {
  header: null
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

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "steelblue"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    color: "whitesmoke"
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "whitesmoke",
    lineHeight: 24,
    textAlign: "center"
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
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  buttonText: {
    fontSize: 20,
    color: "white"
  },
  sampleContainer: {
    alignItems: "center",
    marginHorizontal: 10
  },
  sampleText: {
    fontSize: 50,
    color: "whitesmoke",
    lineHeight: 60,
    textAlign: "center"
  }
});

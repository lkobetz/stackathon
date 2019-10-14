import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import TimerMachine from "react-timer-machine";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

export default Timer = props => {
  return (
    <View>
      {!props.started && props.startTimer()}
      <Text style={styles.footer}>
        Time:{" "}
        <TimerMachine
          timeStart={60000}
          timeEnd={0}
          started={props.started}
          paused={false}
          countdown={true}
          interval={1000}
          onComplete={props.timeFinished}
          formatTimer={(time, ms) =>
            moment.duration(ms, "milliseconds").format("h:mm:ss")
          }
        />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    color: "lavender",
    alignItems: "center",
    fontSize: 17,
    justifyContent: "space-between"
  }
});

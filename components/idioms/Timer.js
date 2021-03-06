import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { startGame, timeFinished } from "../../store/actions";
import TimerMachine from "react-timer-machine";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

export default class Timer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.startTimer();
  }
  componentDidUpdate() {
    !this.props.started && this.startTimer();
  }
  startTimer() {
    this.props.startGame();
  }
  render() {
    return (
      <View>
        <Text style={styles.footer}>
          Time:{" "}
          <TimerMachine
            timeStart={60000}
            timeEnd={0}
            started={this.props.started}
            paused={false}
            countdown={true}
            interval={1000}
            onComplete={this.props.timeFinished}
            formatTimer={(time, ms) =>
              moment.duration(ms, "milliseconds").format("h:mm:ss")
            }
          />
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  started: state.started,
});

const mapDispatchToProps = (dispatch) => ({
  startGame: () => dispatch(startGame()),
  timeFinished: () => dispatch(timeFinished()),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Timer);

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    color: "lavender",
    alignItems: "center",
    fontSize: 17,
    justifyContent: "space-between",
  },
});

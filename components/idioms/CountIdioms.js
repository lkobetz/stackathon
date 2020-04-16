import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";

import allIdioms from "../../data/idioms";

// necessary to include props from store in parameters since this is a functional component
export default countCategories = (props) => {
  const idioms = allIdioms;
  let count = {};
  for (let i = 0; i < idioms.length; i++) {
    let idiom = idioms[i];
    for (let key in idiom) {
      if (key === "categories") {
        idiom.categories.forEach((item) => {
          count[item] = count[item] + 1 || 1;
        });
      }
    }
  }
  let countArr = Object.entries(count);
  countArr = countArr.map((item) => {
    return { name: item[0], count: item[1] };
  });
  countArr.sort((a, b) => {
    return a.count > b.count;
  });
  // uncomment this to see the frequency of each category
  // console.log(countArr);
  if (props.chosenCategories.length) {
    return <Text>Chosen categories: {props.chosenCategories.join(", ")}</Text>;
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  chosenCategories: state.chosenCategories,
});

module.exports = connect(mapStateToProps)(countCategories);

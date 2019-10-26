import React from "react";
import { Text } from "react-native";

export default countCategories = props => {
  const idioms = props.idioms;
  let count = {};
  for (let i = 0; i < idioms.length; i++) {
    let idiom = idioms[i];
    for (let key in idiom) {
      if (key === "categories") {
        idiom.categories.forEach(item => {
          count[item] = count[item] + 1 || 1;
        });
      }
    }
  }
  let countArr = Object.entries(count);
  countArr = countArr.map(item => {
    return { name: item[0], count: item[1] };
  });
  countArr.sort((a, b) => {
    return a.count > b.count;
  });
  return <Text>Categories: {props.categories}</Text>;
};

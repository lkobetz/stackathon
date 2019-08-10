// import React, { Component } from "react";

// class Shuffle extends Component {
//   shuffle(sentence) {
//     let shuffled = sentence.split(" ");
//     let shuffledSolution = [];
//     shuffled.map(word => {
//       let a = word.split(""),
//         n = a.length;

//       for (var i = n - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var tmp = a[i];
//         a[i] = a[j];
//         a[j] = tmp;
//       }
//       a = a.join("");
//       shuffledSolution.push(a);
//     });
//     shuffledSolution = shuffledSolution.join(" ");
//     return shuffledSolution;
//   }
// }

// export default this.shuffle(this.props.sentence);

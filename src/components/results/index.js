import React from "react";
import { baseUrl } from "../../config.json";

export default class Results extends React.Component {
  render() {
    const { results, fileName } = this.props;

    if (Object.keys(results).length === 0) {
      return <></>;
    }

    const sortedGuesses = Object.keys(results).sort(
      (a, b) => results[b] - results[a]
    );

    const bestGuess = sortedGuesses[Object.keys(sortedGuesses)[0]];

    return (
      <div className="border border-info p-4 m-4">
        <h1>Best Guess</h1>
        <p>Our AI model predicts you've just seen:</p>
        <h2>
          {bestGuess.toUpperCase()}, with{" "}
          {(results[bestGuess] * 100).toFixed(2)}% accuracy
        </h2>
        {/* <img
          alt="Your image"
          src={`${baseUrl}/guessed-images/${folder}/${fileName}`}
          className="w-100"
        /> */}
      </div>
    );
  }
}

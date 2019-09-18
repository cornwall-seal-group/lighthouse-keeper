import React from "react";
import { baseUrl } from "../../config.json";
import SealPics from "../../components/seal-pics";

export default class Results extends React.Component {
  render() {
    const { results, angle } = this.props;

    if (Object.keys(results).length === 0) {
      return <></>;
    }

    const { matches, image } = results;
    const formattedImage = image.replace("..", "");
    const sortedGuesses = Object.keys(matches).sort(
      (a, b) => matches[b] - matches[a]
    );

    const bestGuess = sortedGuesses[Object.keys(sortedGuesses)[0]];

    return (
      <div>
        <p>Our AI model predicts you've just seen:</p>
        <h2>{bestGuess.toUpperCase()}</h2>
        <h4>With {(matches[bestGuess] * 100).toFixed(2)}% accuracy</h4>
        <img
          alt="Your image"
          src={`${baseUrl}/${formattedImage}`}
          className="w-100"
        />
        <SealPics seal={bestGuess} angle={angle} />
      </div>
    );
  }
}

import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./welcome.css";

class Welcome extends Component {
  slides = [
    {
      id: "head-right",
      text: "Head Right",
      img: "head-right.svg"
    },
    {
      id: "bottling-right",
      text: "Bottling Right",
      img: "Seals_Icons-04.svg"
    },
    {
      id: "lying-right",
      text: "Lying Right",
      img: "lying-right.svg"
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      screen: 1
    };
  }

  selectScreen = screen => {
    this.setState({ screen });
  };

  render() {
    const { screen } = this.state;
    if (screen === 1) {
      return (
        <div className="welcome1 h-100">
          <div class="message">
            <h2>Welcome</h2>
            <p>
              <b>Upload</b> your seal sightings to help support the Cornwall
              Seal Group Research Trust.
            </p>
          </div>
          <Route
            render={({ history }) => (
              <button
                onClick={() => history.push("/pick-angle")}
                className="btn-lg btn-outline-light bg-transparent welcome-btn welcome-skip"
              >
                SKIP
              </button>
            )}
          />

          <button
            onClick={() => this.selectScreen(2)}
            className="btn-lg btn-outline-light bg-transparent welcome-btn welcome-next"
          >
            NEXT
          </button>
        </div>
      );
    }
    if (screen === 2) {
      return (
        <div className="welcome2 h-100">
          <div class="message">
            <h2>Help Us</h2>
            <p>
              Raise awareness about marine life disturbance and limit the impact
              of plastic, chemical, pharmaceutical and noise pollution on all
              marine life.
            </p>
          </div>
          <Route
            render={({ history }) => (
              <button
                onClick={() => history.push("/pick-angle")}
                className="btn-lg btn-outline-light bg-transparent welcome-btn welcome-skip"
              >
                SKIP
              </button>
            )}
          />
          <button
            onClick={() => this.selectScreen(3)}
            className="btn-lg btn-outline-light bg-transparent welcome-btn welcome-next"
          >
            NEXT
          </button>
        </div>
      );
    }
    if (screen === 3) {
      return (
        <div className="welcome3 h-100">
          <div class="message">
            <h2>Seal Identification</h2>
            <p>
              Each grey seal has a unique pattern in its fur that it keeps for
              life. This enables us to learn about our seals as individuals in a
              completely non invasive way.
            </p>
          </div>
          <Route
            render={({ history }) => (
              <button
                onClick={() => history.push("/pick-angle")}
                className="btn-lg bg-light welcome-btn welcome-start"
              >
                LETS GET STARTED
              </button>
            )}
          />
        </div>
      );
    }
  }
}

export default Welcome;

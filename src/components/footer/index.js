import React from "react";
import "./footer.css";
import { Route } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    const {
      primaryButtonText,
      primaryButtonLink,
      primaryButtonClickHandler,
      secondaryButtonText,
      secondaryButtonLink
    } = this.props;

    let primaryClasses = "";
    if (!secondaryButtonText) {
      primaryClasses = "btn-block";
    }
    return (
      <footer className="footer pt-2 px-2">
        <div className="container">
          <div className="row justify-content-between">
            {secondaryButtonText && (
              <Route
                render={({ history }) => (
                  <button
                    className="btn btn-lg btn-seal-primary-outline"
                    onClick={() => history.push(secondaryButtonLink)}
                  >
                    {secondaryButtonText}
                  </button>
                )}
              />
            )}
            {primaryButtonClickHandler && (
              <button
                className={`btn btn-lg btn-seal-primary ${primaryClasses}`}
                onClick={() => primaryButtonClickHandler()}
              >
                {primaryButtonText}
              </button>
            )}
            {!primaryButtonClickHandler && primaryButtonText && (
              <Route
                render={({ history }) => (
                  <button
                    className={`btn btn-lg btn-seal-primary ${primaryClasses}`}
                    onClick={() => history.push(primaryButtonLink)}
                  >
                    {primaryButtonText}
                  </button>
                )}
              />
            )}
          </div>
        </div>
      </footer>
    );
  }
}

import React from "react";
import "./navbar.css";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-seal-primary justify-content-between">
        <h3>Upload your seal image</h3>
      </nav>
    );
  }
}

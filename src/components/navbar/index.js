import React from "react";
import "./navbar.css";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    const { pathname } = this.props.location;

    if (pathname !== "/") {
      return (
        <nav className="navbar navbar-light bg-seal-primary justify-content-between">
          <h3 className="menu-text w-100 py-2 m-0">Upload your seal image</h3>
        </nav>
      );
    }
    return <></>;
  }
}

export default withRouter(props => <Navbar {...props} />);

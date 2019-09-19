import React from "react";
import "./navbar.css";
import { withRouter } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    const { pathname, search } = this.props.location;
    let title = "Upload your seal image";

    if (pathname === "/pick-angle") {
      title = "Select the seal angle";
    }

    if (search.indexOf("?results") > -1) {
      title = "Your Results";
    }
    if (pathname !== "/") {
      return (
        <nav className="navbar navbar-light bg-seal-primary justify-content-between">
          <h3 className="menu-text w-100 py-2 m-0">{title}</h3>
        </nav>
      );
    }
    return <></>;
  }
}

export default withRouter(props => <Navbar {...props} />);

import React from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import Welcome from "./screens/welcome";
import ImageUpload from "./screens/image-upload";
import PickSealAngle from "./screens/pick-seal-angle";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App h-100">
        <Navbar />
        <main class="h-100">
          <Route exact path="/" component={Welcome} />
          <Route path="/pick-angle" component={PickSealAngle} />
          <Route path="/upload-image/:angle" component={ImageUpload} />
        </main>
      </div>
    </Router>
  );
}

export default App;

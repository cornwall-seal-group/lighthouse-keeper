import React, { Component } from "react";
import Footer from "../../components/footer";
import "./upload.css";

class Upload extends Component {
  left = [
    {
      id: "head-left",
      text: "Head left",
      img: "head-left.svg"
    },
    {
      id: "bottling-left",
      text: "Bottling Left",
      img: "Seals_Icons-04.svg"
    },
    {
      id: "lying-left",
      text: "Lying left",
      img: "lying-left.svg"
    }
  ];
  right = [
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
      selectedHead: null
    };
  }

  selectHead = angle => {
    this.setState({ selectedHead: angle });
  };

  render() {
    const { selectedHead } = this.state;
    return (
      <>
        <div className="container">
          <div className="row justify-content-center">
            {this.right.map(item => {
              const selected = selectedHead === item.id ? "selected" : "";
              return (
                <div
                  className={`col-5 head-card ${selected}`}
                  onClick={() => this.selectHead(item.id)}
                >
                  <h2>{item.text}</h2> <img src={item.img} alt={item.text} />
                </div>
              );
            })}
            {this.left.map(item => {
              const selected = selectedHead === item.id ? "selected" : "";
              return (
                <div
                  className={`col-5 head-card ${selected}`}
                  onClick={() => this.selectHead(item.id)}
                >
                  <h2>{item.text}</h2> <img src={item.img} alt={item.text} />
                </div>
              );
            })}
          </div>
        </div>
        <Footer
          primaryButtonText="Next"
          primaryButtonLink={`/upload-image/${selectedHead}`}
        />
      </>
    );
  }
}

export default Upload;

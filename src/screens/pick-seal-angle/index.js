import React, { Component } from "react";
import Footer from "../../components/footer";
import "./pick-seal.css";

class Upload extends Component {
  angles = [
    {
      id: "wet-head-left",
      text: "Head left",
      img: "head-left.svg"
    },
    {
      id: "wet-head-right",
      text: "Head Right",
      img: "head-right.svg"
    },
    {
      id: "bottling-left",
      text: "Bottling Left",
      img: "bottling-left.svg"
    },
    {
      id: "bottling-right",
      text: "Bottling Right",
      img: "bottling-right.svg"
    },
    {
      id: "lying-left",
      text: "Lying left",
      img: "lying-left.svg"
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
            {this.angles.map(item => {
              const selected = selectedHead === item.id ? "selected" : "";
              return (
                <div
                  className={`col-5 col-lg-3 head-card ${selected}`}
                  onClick={() => this.selectHead(item.id)}
                >
                  <h4>{item.text}</h4> <img src={item.img} alt={item.text} />
                </div>
              );
            })}
          </div>
        </div>
        <Footer
          primaryButtonDisabled={selectedHead === null}
          primaryButtonText="Next"
          primaryButtonLink={`/upload-image/${selectedHead}`}
        />
      </>
    );
  }
}

export default Upload;

import React from "react";
import {
  baseUrl,
  harbourmasterUrl,
  harbourmasterApiKey
} from "../../config.json";
import Axios from "axios";
import "./seals.css";

export default class SealPics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  componentDidMount() {
    const { seal, angle } = this.props;
    const options = {
      url: `${harbourmasterUrl}/api/v1/seal/${seal}/poses/${angle}`,
      headers: {
        "x-api-key": harbourmasterApiKey
      }
    };
    Axios(options).then(({ data }) => {
      this.setState({
        pictures: data
      });
    });
  }

  render() {
    const { pictures } = this.state;
    const { seal, angle } = this.props;
    if (pictures.length === 0) {
      return <></>;
    }

    if (pictures.length > 6) {
      pictures.splice(7);
    }

    return (
      <div className="mt-3 p-2 seal-container">
        <h3>Similar photos of {seal.toUpperCase()}</h3>
        <div className="container">
          <div className="row">
            {pictures.map(picture => {
              return (
                <div className="col-4">
                  <img
                    className="seal-img"
                    src={`${baseUrl}/minio-images/${seal}/${angle}/${picture}`}
                    alt={picture}
                  />{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

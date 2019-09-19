import React, { Component } from "react";
import Footer from "../../components/footer";
import Dropzone from "../../components/dropzone";
import "./upload.css";
import Progress from "../../components/progress";
import Results from "../../components/results";

import Axios from "axios";
import { baseUrl } from "../../config.json";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      results: {},
      fileName: "",
      error: null
    };

    this.uploadFiles = this.uploadFiles.bind(this);
  }

  onFilesAdded = files => {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  };

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest = file => {
    const that = this;

    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.set("angle", this.props.match.params.angle);
      formData.append("file", file, file.name);

      Axios({
        method: "post",
        url: `${baseUrl}/beagle/guess-image`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(function(response) {
          window.location.hash = window.location.hash + "?results=true";
          that.setState({
            results: response.data,
            successfullUploaded: true,
            fileName: file.name,
            uploading: false,
            error: null
          });
        })
        .catch(function(response) {
          //handle error

          that.setState({ error: response.toJSON().message, uploading: false });
        });
    });
  };

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="check-circle.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  render() {
    const {
      results,
      fileName,
      uploading,
      successfullUploaded,
      files,
      error
    } = this.state;
    return (
      <>
        {Object.keys(results).length === 0 && (
          <div className="container">
            <div className="Content d-flex justify-content-center">
              <div>
                <Dropzone
                  onFilesAdded={this.onFilesAdded}
                  disabled={uploading || successfullUploaded}
                />
              </div>
              <div className="Files">
                {files.map(file => {
                  return (
                    <div key={file.name} className="Row">
                      <span className="Filename">{file.name}</span>
                      {this.renderProgress(file)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {!error && uploading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="d-flex justify-content-center p-4 m-4 bg-danger text-white">
            {error}
          </div>
        )}

        <Results
          results={results}
          fileName={fileName}
          angle={this.props.match.params.angle}
        />
        {Object.keys(results).length === 0 && (
          <Footer
            primaryButtonText="Submit Your Image"
            primaryButtonClickHandler={this.uploadFiles}
            secondaryButtonText="Back"
            secondaryButtonLink={`/pick-angle`}
          />
        )}

        {Object.keys(results).length > 0 && (
          <Footer
            primaryButtonText="Agree?"
            negativeButtonText="Disagree?"
            secondaryButtonText="Start Over"
            secondaryButtonLink={`/pick-angle`}
          />
        )}
      </>
    );
  }
}

export default Upload;

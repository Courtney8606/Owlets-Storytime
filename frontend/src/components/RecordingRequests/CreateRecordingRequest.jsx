import { useState } from "react";
import { createRecordingRequest } from "../../services/recordings";
import PropTypes from "prop-types";
import "./CreateRecordingRequest.css";
import MainViewButton from "../../components/Buttons/MainViewButton";

const CreateRecordingRequest = ({ username, connections, onSubmit }) => {
  const [requestDescription, setRequestDescription] = useState("");
  const [readerUsername, setReaderUsername] = useState("");
  const [error, setError] = useState([]);
  const parentUsername = username;

  const handleRecordingDescriptionChange = (event) => {
    setRequestDescription(event.target.value);
  };
  const handleReaderUsernameChange = (event) => {
    setReaderUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createRecordingRequest(
        requestDescription,
        parentUsername,
        readerUsername
      );
      setRequestDescription("");
      setReaderUsername("");
      onSubmit(username);
    } catch (err) {
      console.error(err);
      setError([err.message]);
    }
  };

  return (
    <div data-testid="create-recording-component">
      <h2 className="request-title">Request a story</h2>
      <br></br>
      <form onSubmit={handleSubmit} className="request-form">
        <div>
          <label htmlFor="recording-description">Request Description:</label>
          <input
            className="request-input"
            data-testid="description"
            type="text"
            value={requestDescription}
            onChange={handleRecordingDescriptionChange}
          ></input>
          <br></br>
          <label htmlFor="reader-dropdown">Select a reader:</label>
          <select
            data-testid="reader-dropdown"
            value={readerUsername}
            onChange={handleReaderUsernameChange}
          >
            <option value="">Select a reader</option>
            {connections
              .filter((connection) => connection.status === "approved")
              .map((connection) => (
                <option key={connection.id} value={connection.reader_username}>
                  {connection.reader_username}
                </option>
              ))}
          </select>
          <br />
          <MainViewButton text="Send" />
        </div>
      </form>
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
};

CreateRecordingRequest.propTypes = {
  username: PropTypes.string.isRequired,
  connections: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateRecordingRequest;

{
  /* <div data-testid="create-recording-component">
<form
  onSubmit={handleSubmit}
  className="border border-2 rounded recording-request-form-bg mt-3 p-4"
  id="border-mulberry"
>
  <h4 className="text-center">Request a recording here!</h4>
  <br></br>
  <div className="form-group">
    <label
      htmlFor="recording-description"
      className="col-sm-3 col-form-label pt-0"
    >
      Request Description:
    </label>
    <input
      data-testid="description"
      type="text"
      value={requestDescription}
      onChange={handleRecordingDescriptionChange}
    ></input>
    <br></br>
    <label htmlFor="reader-dropdown" className="col-form-label pt-4 pe-4">
      Select a reader:
    </label>
    <select
      data-testid="reader-dropdown"
      value={readerUsername}
      onChange={handleReaderUsernameChange}
    >
      <option value="">Select a reader</option>
      {connections
        .filter((connection) => connection.status === "approved")
        .map((connection) => (
          <option key={connection.id} value={connection.reader_username}>
            {connection.reader_username}
          </option>
        ))}
    </select>
    <br />
    <input
      className="button mt-3 request-recording-submit-button"
      role="submit-button"
      id="submit"
      type="submit"
      value="Submit"
    />
  </div>
</form>
<div>
  <p>{error}</p>
</div>
</div>
);
}; */
}

import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { createRecordingRequest } from "../../services/recordings";
import PropTypes from "prop-types";
import "./CreateRecordingRequestChild.css";
import ChildViewButtonV2 from "../Buttons/ChildViewButtonV2";

const CreateRecordingRequestChild = ({ username, connections, onSubmit }) => {
  const [requestDescription, setRequestDescription] = useState("");
  const [readerUsername, setReaderUsername] = useState("");
  // const navigate = useNavigate();
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
    <div
      data-testid="create-recording-component"
      className="child-request-container"
    >
      <form onSubmit={handleSubmit} className="child-request-form">
        <label></label>
        <label htmlFor="recording-description">
          <h3>Would you like a new story?</h3>
        </label>
        <p className="childmode-text">
          You can ask for it to be about anything you want! Or even ask them to
          read one of your favourite books.
        </p>
        <textarea
          className="child-request-input"
          data-testid="description"
          type="text"
          value={requestDescription}
          onChange={handleRecordingDescriptionChange}
        />
        <br></br>
        <label htmlFor="reader-dropdown">Choose your reader: </label>
        <select
          data-testid="reader-dropdown"
          value={readerUsername}
          onChange={handleReaderUsernameChange}
        >
          <option value="">click here for your readers </option>
          {connections
            .filter((connection) => connection.status === "approved")
            .map((connection) => (
              <option key={connection.id} value={connection.reader_username}>
                {connection.reader_username}
              </option>
            ))}
        </select>
        <br />
        <ChildViewButtonV2 text="Send" />
      </form>
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
};
CreateRecordingRequestChild.propTypes = {
  username: PropTypes.string.isRequired,
  connections: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateRecordingRequestChild;

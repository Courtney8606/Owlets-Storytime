import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { createConnectionRequest } from "../../services/connections";
import "./RequestConnection.css";
import MainViewButton from "../../components/Buttons/MainViewButton";

const RequestConnection = ({ username, onSubmit }) => {
  const [readerUsername, setReaderUsername] = useState("");
  // const navigate = useNavigate();
  const [error, setError] = useState([]);
  const parentUsername = username;

  const handlerReaderUsernameChange = (event) => {
    setReaderUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createConnectionRequest(parentUsername, readerUsername);
      setReaderUsername("");
      onSubmit(username);
      // props.onCreateComment();
    } catch (err) {
      console.error(err);
      setError([err.message]);
      // navigate("/posts");
    }
  };

  return (
    <div data-testid="create-recording-component">
      <h2 className="connection-title">Make a connection request here!</h2>
      <form className="connection-form" onSubmit={handleSubmit}>
        <label htmlFor="reader-username">
          Request Reader Connection (please input their username):
        </label>
        <input
          className="connection-input"
          data-testid="reader-username"
          type="text"
          value={readerUsername}
          onChange={handlerReaderUsernameChange}
        ></input>
        <br></br>
        <MainViewButton text="Send" />
      </form>
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
};
RequestConnection.propTypes = {
  username: PropTypes.string.isRequired,
  connections: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RequestConnection;

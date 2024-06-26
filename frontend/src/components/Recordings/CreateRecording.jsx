import { useState } from "react";
import { createRecording } from "../../services/recordings";
import { cloudinaryUpload } from "../../services/recordings";
import { AudioRecorder } from "react-audio-voice-recorder";
import "./CreateRecording.css";
import PropTypes from 'prop-types';

const CreateRecording = ({username, connections, onSubmit}) => {
    const [recordingTitle, setRecordingTitle] = useState("")
    const [parentUsername, setParentUsername] = useState("")
    const [recordedData, setRecordedData] = useState(null)
    const [recordedUrl, setRecordedUrl] = useState(null);
    const [publicID, setPublicID] = useState(null);
    const [error, setError] = useState([])
    const readerUsername = username

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!recordedData) {
        throw new Error(
          "Oops! You forgot to record your story, please try again!"
        );
      }
      const formData = new FormData();
      formData.append("audio_file", recordedData);
      const data = await cloudinaryUpload(formData);
      setRecordedUrl(data.audio_url);
      setPublicID(data.public_id); // here...setRecordedUrl and then immed using it

      await createRecording(
        // here
        data.audio_url,
        recordingTitle,
        parentUsername,
        readerUsername,
        data.public_id
      );
      setRecordingTitle("");
      setParentUsername("");
      setRecordedData(null);
      onSubmit(username);
      setError("");
    } catch (err) {
      console.error(err);
      setError([err.message]);
    }
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setRecordedData(blob);
    // document.body.appendChild(audio);
  };

  return (
    <div
      data-testid="create-recording-component"
      className="create-recording-component"
    >
      <form className="recording-form" onSubmit={handleSubmit}>
        <div classname="audio">
          <AudioRecorder
            onRecordingComplete={addAudioElement} // in built function
            className="microphone"
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
              // autoGainControl,
              // channelCount,
              // deviceId,
              // groupId,
              // sampleRate,
              // sampleSize,
            }}
            onNotAllowedOrFound={(err) => console.table(err)}
            downloadOnSavePress={true}
            downloadFileExtension="webm"
            mediaRecorderOptions={{
              audioBitsPerSecond: 128000,
            }}
            // showVisualizer={true}
          />
        </div>
        <label style={{ marginTop: "20px" }}>Send your recording:</label>
        <br />
        <label htmlFor="recording-title">Recording Title:</label>
        <input
          data-testid="recording-title"
          type="text"
          value={recordingTitle}
          onChange={(e) => setRecordingTitle(e.target.value)}
          className="recording-input"
        />
        <br />
        <label htmlFor="parent-dropdown">Sending to:</label>
        <select
          data-testid="parent-dropdown"
          value={parentUsername}
          onChange={(e) => setParentUsername(e.target.value)}
        >
          <option value="">Select a parent</option>
          {connections
            .filter((connection) => connection.status === "approved")
            .map((connection) => (
              <option key={connection.id} value={connection.parent_username}>
                {connection.parent_username}
              </option>
            ))}
        </select>
        <br />
        <button
          className="button"
          role="submit-button"
          id="submit"
          type="submit"
        >
          Send story
        </button>
      </form>
      <div>
        <p>{error}</p>
      </div>
    </div>
  );
};
CreateRecording.propTypes = {
  username: PropTypes.string.isRequired,
  connections: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateRecording;

import CreateRecording from "../../components/Recordings/CreateRecording";
import ViewRecordings from "../../components/Recordings/ViewRecordings";
import ViewConnections from "../../components/Connections/ViewConnections";
import ViewRecordingRequests from "../../components/RecordingRequests/ViewRecordingRequests";
import {
  getRecordingsByReader,
  getRecordingRequestsByReader,
} from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByReader } from "../../services/connections";
import ChildViewButton from "../../components/Buttons/ChildModeButton";
// import NavigationBar from "../../components/NavigationBar/NavigationBar";

export const ReaderPage = () => {
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [recordingRequests, setRecordingRequests] = useState([]);
  const navigate = useNavigate();
  const view = "reader";

  if (!username) {
    navigate("/login");}

    const getAllRecordingsTrigger = async (username) => {
      try {
        const response = await getRecordingsByReader(username);
        if (response.message === "Unauthorised") {
          setErrorMessage("Unauthorised");
        } else {
          const allRecordings = response;
          allRecordings.sort((a, b) => new Date(b.date_recorded) - new Date(a.date_recorded));
          await setRecordings(allRecordings);
        }
      } catch (error) {
        console.error("Error fetching data");
        setErrorMessage("Error fetching data");
      }
    };

    const getAllRecordingRequestsTrigger = async (username) => {
      try {
        const response = await  getRecordingRequestsByReader(username);
        if (response.message === "Unauthorised") {
          setErrorMessage("Unauthorised");
        } else {
          const allRecordingRequests = response;
          allRecordingRequests.sort((a, b) => new Date(b.date_requested) - new Date(a.date_requested));
          await setRecordingRequests(allRecordingRequests);
        }
      } catch (error) {
        console.error("Error fetching data");
        setErrorMessage("Error fetching data");
      }
    };

  const getAllConnectionsTrigger = async (username) => {
    getConnectionsByReader(username).then((data) => {
      console.log(data);
      const allConnections = data;
      console.log(allConnections);
      setConnections(allConnections);
    });
  };
  useEffect(() => {
    getAllRecordingsTrigger(username);
    getAllConnectionsTrigger(username);
    getAllRecordingRequestsTrigger(username);
  }, [navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          {/* <NavigationBar
            connections={connections}
            recording_requests={recordingRequests}
          /> */}
          <h2>Reader View</h2>
          <CreateRecording
            username={username}
            connections={connections}
            onSubmit={getAllRecordingsTrigger}
          />
          <ViewRecordings 
            data={recordings} 
            view={view} 
            onUpdate={getAllRecordingsTrigger} />
          <ViewConnections
            data={connections}
            view={view}
            onUpdate={getAllConnectionsTrigger}
          />
          <ViewRecordingRequests
            data={recordingRequests}
            view={view}
            onUpdate={getAllRecordingRequestsTrigger}
          />
          <ChildViewButton />
        </>
      )}
    </>
  );
};

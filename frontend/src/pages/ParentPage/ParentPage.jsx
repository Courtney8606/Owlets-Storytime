import {
  getRecordingRequestsByParent,
  getRecordingsByParent,
} from "../../services/recordings";
// import ViewRecordingsArchive from "../../Archive/ViewRecordings";
import ViewConnections from "../../components/Connections/ViewConnections";
import ViewRecordings from "../../components/Recordings/ViewRecordings";
import ViewRecordingRequests from "../../components/RecordingRequests/ViewRecordingRequests";
import CreateRecordingRequest from "../../components/RecordingRequests/CreateRecordingRequest";
import RequestConnection from "../../components/Connections/RequestConnection";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChildViewButton from "../../components/Buttons/ChildModeButton";
import { getConnectionsByParent } from "../../services/connections";
// import NavigationBar from "../../components/NavigationBar/NavigationBar";
import ChildNameOrEditForm from "../../components/ChildSetorEdit/ChildSetorEditForm";

export const ParentPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const [recordingRequests, setRecordingRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();
  const view = "parent";

  if (!username) {
    navigate("/login");}

  const getAllRecordingsTrigger = async (username) => {
    try {
      const response = await getRecordingsByParent(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        const allRecordings = response;
        allRecordings.sort(
          (a, b) => new Date(b.date_recorded) - new Date(a.date_recorded)
        );
        setRecordings(allRecordings);
      }
    } catch (error) {
      console.error("Error fetching data");
      setErrorMessage("Error fetching data");
    }
  };

  const getAllRecordingRequestsTrigger = async (username) => {
    try {
      const response = await getRecordingRequestsByParent(username);
      if (response.message === "Unauthorised") {
        setErrorMessage("Unauthorised");
      } else {
        const allRecordingRequests = response;
        allRecordingRequests.sort(
          (a, b) => new Date(b.date_requested) - new Date(a.date_requested)
        );
        setRecordingRequests(allRecordingRequests);
      }
    } catch (error) {
      console.error("Error fetching data");
      setErrorMessage("Error fetching data");
    }
  };

  const getAllConnectionsTrigger = async (username) => {
    await getConnectionsByParent(username).then((data) => {
      const allConnections = data;
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
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                <p>I am parent: {username} </p>
                <ChildNameOrEditForm />

                <RequestConnection
                  username={username}
                  connections={connections}
                  onSubmit={getAllConnectionsTrigger}
                />
                <ViewConnections
                  data={connections}
                  view={view}
                  onUpdate={getAllConnectionsTrigger}
                />
              </div>
              <div className="col-sm-6">
                <CreateRecordingRequest
                  username={username}
                  connections={connections}
                  onSubmit={getAllRecordingRequestsTrigger}
                />
                <ViewRecordingRequests
                  data={recordingRequests}
                  view={view}
                  onUpdate={getAllRecordingRequestsTrigger}
                />
                <ViewRecordings
                  data={recordings}
                  view={view}
                  onUpdate={getAllRecordingsTrigger}
                />
              </div>
              </div>
            </div>
            <ChildViewButton />
          </div>
        </>
      )}
    </>
  );
};

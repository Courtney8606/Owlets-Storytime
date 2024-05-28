import { getRecordingRequestsByParent } from "../../services/recordings";
import ViewRecordingRequests from "../../components/RecordingRequests/ViewRecordingRequests";
import CreateRecordingRequest from "../../components/RecordingRequests/CreateRecordingRequest";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getConnectionsByParent } from "../../services/connections";

export const ParentRequestsPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const username = localStorage.getItem("username");
  const [recordingRequests, setRecordingRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();
  const view = "parent";

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
              <div className="row justify-content-around">
                <div className="col-sm-5">
                  <CreateRecordingRequest
                    username={username}
                    connections={connections}
                    onSubmit={getAllRecordingRequestsTrigger}
                  />
                </div>
              </div>

              <div className="row">
                <ViewRecordingRequests
                  data={recordingRequests}
                  view={view}
                  onUpdate={getAllRecordingRequestsTrigger}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

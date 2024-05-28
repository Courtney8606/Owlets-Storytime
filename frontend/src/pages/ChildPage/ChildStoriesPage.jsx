/* eslint-disable react-hooks/exhaustive-deps */
import ViewRecordingsChild from "../../components/Recordings/ViewRecordingsChild";
import {
  getRecordingsByChild,
  getRecordingRequestsByParent,
} from "../../services/recordings";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUserDetails } from "../../services/users";
import { getConnectionsByParent } from "../../services/connections";
import CreateRecordingRequestChild from "../../components/RecordingRequests/CreateRecordingRequestChild";
import ViewRecordingRequestsChild from "../../components/RecordingRequests/ViewRecordingRequestChild";
import ChildViewButtonV2 from "../../components/Buttons/ChildViewButtonV2";
import backgroundImage from "../../assets/childmode.png";
import LogoutButtonChild from "../../components/Buttons/LogoutButtonChild";
import "./ChildStoriesPage.css";

export const ChildStoriesPage = () => {
  const username = localStorage.getItem("username");
  const [recordings, setRecordings] = useState([]);
  const [childName, setChildName] = useState("");
  const [recordingRequests, setRecordingRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  if (!username) {
    navigate("/login");
  }

  const getAllRecordingsTrigger = async (username) => {
    try {
      const response = await getRecordingsByChild(username);
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

  const getAllConnectionsTrigger = async (username) => {
    await getConnectionsByParent(username).then((data) => {
      const allConnections = data;
      setConnections(allConnections);
    });
  };

  const getLoggedInUserDetails = async () => {
    try {
      const response = await getUserDetails(username);
      if (response.message === "Unauthorised") {
        errorMessage("Unauthorised");
      } else {
        const userDetails = response;
        await setChildName(userDetails.child);
        console.log(childName);
      }
    } catch (error) {
      setErrorMessage("Error fetching data");
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    getAllRecordingsTrigger(username);
    getLoggedInUserDetails();
    getAllConnectionsTrigger(username);
  }, [navigate]);

  return (
    <>
      <div
        className="childmode-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <div className="recordings-child">
          <ViewRecordingsChild data={recordings} />
        </div>
        <div className="buttons-childmode">
          <LogoutButtonChild />
          <Link to="/childstoryrequests">
            <ChildViewButtonV2 text="Request a story" />
          </Link>
        </div>
      </div>
    </>
  );
};

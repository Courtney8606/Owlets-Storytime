import { useState, useEffect } from "react";
import { useDataContext } from "../../data/data";
import { useNavigate } from "react-router-dom";
import {
  updateConnectionsDisplayIcon,
  updateRecordingRequestsDisplayIcon,
  updateRecordingsDisplayIcon,
} from "../../services/notifications";
import "./NotificationsPage.css";
import MainViewButton from "../../components/Buttons/MainViewButton";

export const NotificationsPage = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const {
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
    recordingsReader,
    recordingsParent
  } = useDataContext();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    if (!username) {
      navigate("/login");}
      
    const allNotifications = [];

    const approvedConnection = connectionsParent.find(
      (connection) =>
        connection.status === "approved" && connection.display_message_icon
    );
    if (approvedConnection) {
      allNotifications.push(
        `Your connection request to ${approvedConnection.reader_username} has been approved!`
      );
    }
    const pendingConnectionReader = connectionsReader.find(
      (connection) =>
        connection.status === "pending" && connection.display_message_icon
    );
    if (pendingConnectionReader) {
      allNotifications.push(
        `You have received a connection request from ${pendingConnectionReader.parent_username}. Head to your Reader account page to manage this request.`
      );
    }
    const rejectedConnectionParent = connectionsParent.find(
      (connection) =>
        connection.status === "rejected" && connection.display_message_icon
    );
    if (rejectedConnectionParent) {
      allNotifications.push(
        `Your connection request to ${rejectedConnectionParent.reader_username} has been rejected.`
      );
    }
    const pendingRequestReader = recordingRequestsReader.find(
      (request) =>
        request.reader_status === "pending" && request.display_message_icon
    );
    if (pendingRequestReader) {
      allNotifications.push(
        `You have been sent a story request by ${pendingRequestReader.parent_username}. Head over to your Reader account page to review the details.`
      );
    }
    const acceptedRequestParent = recordingRequestsParent.find(
      (request) =>
        request.reader_status === "accepted" && request.display_message_icon
    );
    if (acceptedRequestParent) {
      allNotifications.push(
        `Your story request has been accepted by ${acceptedRequestParent.reader_username}. Get ready for a story coming your way soon!`
      );
    }
    const rejectedRequestParent = recordingRequestsParent.find(
      (request) =>
        request.reader_status === "rejected" && request.display_message_icon
    );
    if (rejectedRequestParent) {
      allNotifications.push(
        `Your story request has been rejected by ${rejectedRequestParent.reader_username}. Get ready for a story coming your way soon!`
      );
    }
    const completedRequestParent = recordingRequestsParent.find(
      (request) =>
        request.reader_status === "completed" && request.display_message_icon
    );
    if (completedRequestParent) {
      allNotifications.push(
        `Your story request to ${completedRequestParent.reader_username} has been marked as complete.`
      );
    }
    
    const pendingRecordingParent = recordingsParent.find(
      (request) =>
        request.recording_status === "pending" && request.display_message_icon
    );
    if (pendingRecordingParent) {
      allNotifications.push(
        `You have been sent a new story by ${pendingRecordingParent.reader_username}. Head over to your Parent account page to review. You will need to accept it before it can be available to your child.`
      );
    }
    const acceptedRecordingReader = recordingsReader.find(
      (request) =>
        request.recording_status === "approved" && request.display_message_icon
    );
    if (acceptedRecordingReader) {
      allNotifications.push(
        `Your story has been approved by ${acceptedRecordingReader.parent_username}!`
      );
    }
    const rejectedRecordingReader = recordingsReader.find(
      (request) =>
        request.recording_status === "rejected" && request.display_message_icon
    );
    if (rejectedRecordingReader) {
      allNotifications.push(
        `Your story has been rejected by ${rejectedRecordingReader.parent_username}.`
      );
    }
    setNotifications(allNotifications);
  }, [
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
    recordingsParent,
    recordingsReader,
    navigate,
  ]);

  const handleClearNotifications = async () => {
    try {
      await Promise.all([
        updateConnectionsDisplayIcon(),
        updateRecordingRequestsDisplayIcon(),
        updateRecordingsDisplayIcon(),
      ]);
      setNotifications([]);
    } catch (error) {
      console.error("Error updating display_message_icon:", error);
    }
  };

  return (
    <>
      <h3 className="notifications-title">Notifications</h3>
      {notifications.map((notification, index) => (
        <div key={index}>{notification}</div>
      ))}
      {notifications.length > 0 && (
        <MainViewButton text="Clear Notifications" onClick={handleClearNotifications}/>
      )}
    </>
  );
};

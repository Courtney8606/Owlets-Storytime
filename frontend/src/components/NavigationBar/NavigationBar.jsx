import { useLocation, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NavigationBar.css";
import logoImage from "../../assets/logo.png";
import LogoutButton from "../../components/Buttons/LogoutButton";
import { useDataContext } from "../../data/data";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavigationBar.css";
import ChildViewButton from "../Buttons/ChildModeButton";
import MainViewButton from "../../components/Buttons/MainViewButton";

export const NavigationBar = () => {
  const location = useLocation();
  const [showNewMessage, setShowNewMessage] = useState(false);
  const showNavbar = !["/signup", "/login"].includes(location.pathname);

  const isChildModePage = [
    "/childstories",
    "/childstoryrequests",
    "/child",
  ].includes(location.pathname);

  const {
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
    recordingsReader,
    recordingsParent,
  } = useDataContext();

  useEffect(() => {
    const newMessage =
      connectionsParent.some(
        (connection) =>
          connection.display_message_icon && connection.status === "approved"
      ) ||
      connectionsReader.some(
        (connection) =>
          connection.display_message_icon &&
          (connection.status === "pending" || connection.status === "rejected")
      ) ||
      recordingRequestsParent.some(
        (request) =>
          request.display_message_icon &&
          (request.reader_status === "accepted" ||
            request.reader_status === "rejected" ||
            request.reader_status === "completed")
      ) ||
      recordingRequestsReader.some(
        (request) =>
          request.display_message_icon && request.reader_status === "pending"
      ) ||
      recordingsReader.some(
        (request) =>
          request.display_message_icon &&
          (request.recording_status === "accepted" ||
            request.recording_status === "rejected")
      ) ||
      recordingRequestsParent.some(
        (request) =>
          request.display_message_icon && request.reader_status === "pending"
      );
    setShowNewMessage(newMessage);
  }, [
    connectionsParent,
    connectionsReader,
    recordingRequestsParent,
    recordingRequestsReader,
    recordingsReader,
    recordingsParent,
  ]);

  if (!showNavbar) {
    return null;
  }

  if (isChildModePage) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <span className="navbar-brand">
              <img
                className="LogoImage"
                role="logoImg"
                alt="logo"
                src={logoImage}
              />
            </span>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className="LogoImage"
              role="logoImg"
              alt="logo"
              src={logoImage}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/familyhub"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                >
                  <MainViewButton
                    text="Family Hub"
                    style={{
                      backgroundColor: "transparent",
                      border: "None",
                      color: "#00215e",
                    }}
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/storystudio"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                >
                  <MainViewButton
                    text="Story Studio"
                    style={{
                      backgroundColor: "transparent",
                      border: "None",
                      color: "#00215e",
                    }}
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                >
                  <MainViewButton
                    text="Notifications"
                    style={{
                      backgroundColor: "transparent",
                      border: "None",
                      color: "#00215e",
                    }}
                  />
                  {showNewMessage && ( // Conditional rendering of New Message
                    <p className="alignment message">
                      New <span id="message-icon">&#9993;</span>
                    </p>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/child"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                >
                  <ChildViewButton
                    text="Child Mode"
                    style={{
                      backgroundColor: "transparent",
                      border: "None",
                      color: "#00215e",
                    }}
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <LogoutButton
                    style={{
                      backgroundColor: "transparent",
                      border: "None",
                      color: "#00215e",
                    }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;

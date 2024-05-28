import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import recordingImage from "../../assets/recording.png";
import storyRequestsImage from "../../assets/storyrequests2.png";
import connectionsImage from "../../assets/family.png";
import ConnectionsViewButton from "../../components/Connections/ConnectionsViewButton";
import ReaderStoryRequestsButton from "../../components/StoryRequestsButton/ReaderStoryRequestsButton";
import ReaderStoriesButton from "../../components/StoriesButton/ReaderStoriesButton";
import childImage from "../../assets/child.jpg";
import "./ReaderLandingPage.css";

export const ReaderLandingPage = () => {
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/storystudio");
      } else {
        navigate("/login");
      }
    } else {
      setErrorMessage("Unauthorised");
    }
  }, [username, storedRole, navigate]);

  return (
    <>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <div style={{ marginTop: "3rem" }} className="container text-center">
            <h2 style={{ marginBottom: "3rem" }}>Story Studio</h2>
            <div className="row row-cols-3 justify-content-center">
              <div className="col">
                <div
                  className="card"
                  id="custom-card-storystudio"
                  style={{ width: "18rem" }}
                >
                  <Link to="/storystudioconnections">
                    <i className="fa-solid fa-children storystudioicons"></i>
                    <ConnectionsViewButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-storystudio"
                >
                  <Link to="/storystudiorequests">
                    <i className="fa-brands fa-fort-awesome storystudioicons"></i>
                    <ReaderStoryRequestsButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-storystudio"
                >
                  <Link to="/storystudiostories">
                    <i className="fa-solid fa-book storystudioicons"></i>
                    <ReaderStoriesButton className="button-storystudio" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

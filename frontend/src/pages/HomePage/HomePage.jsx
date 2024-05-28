import MainViewButton from "../../components/Buttons/MainViewButton";
import ChildViewButton from "../../components/Buttons/ChildModeButton";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import parentImage from "../../assets/parent.jpg";
import readerImage from "../../assets/reader3.jpg";
import childImage from "../../assets/child2.jpg";
import "./HomePage.css";

export const HomePage = () => {
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (storedRole === "parent") {
      if (username) {
        navigate("/");
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
          <h3 style={{ marginTop: "2rem" }}>Welcome {username}!</h3>
          <p>Please select from the below</p>
          <div style={{ marginTop: "3rem" }} className="container text-center">
            <div className="row row-cols-3 justify-content-center">
              <div className="col">
                <div
                  className="card"
                  id="custom-card-homepage"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={parentImage}
                    className="card-img-top"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Manage your family connections and approvals
                    </p>
                    <Link to="/familyhub">
                      <MainViewButton text="Family Hub" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-homepage"
                >
                  <img
                    src={readerImage}
                    className="card-img-top"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      View your story requests and start recording
                    </p>
                    <Link to="/storystudio">
                      <MainViewButton text="Story Studio" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{ width: "18rem" }}
                  id="custom-card-homepage"
                >
                  <img
                    src={childImage}
                    className="card-img-top"
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Let your child safely request or listen to stories
                    </p>
                    <ChildViewButton/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

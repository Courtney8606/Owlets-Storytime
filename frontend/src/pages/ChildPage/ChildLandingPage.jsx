import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../ReaderLandingPage/ReaderLandingPage.css";
import ChildModeStoriesButton from "../../components/ChildViewButton/ChildModeStoriesButton";
import ChildModeStoryRequestsButton from "../../components/ChildViewButton/ChildModeStoryRequestsButton";
import "./ChildLandingPage.css";
import backgroundImage from "../../assets/childmode.png";
import LogoutButtonChild from "../../components/LogoutButton/LogoutButtonChild";
import owlImage from "../../assets/owl.png";

export const ChildLandingPage = () => {
  const username = localStorage.getItem("username");
  const storedRole = localStorage.getItem("role");
  const [childName, setChildName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      navigate("/child");
      getLoggedInUserDetails;
    } else {
      navigate("/login");
    }
  }, [username, storedRole, navigate]);

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

  return (
    <>
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
          <div
            style={{ marginTop: "3rem" }}
            className="container text-center test"
          >
            <img
              className="loginlogo"
              role="logoImg"
              alt="logo"
              src={owlImage}
            />
            <h2
              style={{
                fontFamily: "Chalkboard",
                fontWeight: "bold",
                color: "blue",
              }}
            >
              Hello {childName}!
            </h2>
            <div className="card-container">
              <div className="row row-cols-3 justify-content-center">
                <div className="col">
                  <div
                    className="card"
                    id="custom-card-child"
                    style={{ width: "18rem" }}
                  >
                    <Link to="/childstories">
                      <i className="fa-solid fa-book childstoriesicons"></i>
                      <ChildModeStoriesButton className="button-storystudio" />
                    </Link>
                  </div>
                </div>
                <div className="col">
                  <div
                    className="card"
                    style={{ width: "18rem" }}
                    id="custom-card-child"
                  >
                    <Link to="/childstoryrequests">
                      <i className="fa-brands fa-fort-awesome childstoriesicons"></i>
                      <ChildModeStoryRequestsButton className="button-storystudio" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="logout-child-landing">
              <LogoutButtonChild />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

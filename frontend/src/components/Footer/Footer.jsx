import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Footer.css";

export const Footer = () => {
  const location = useLocation();
  const showFooter = ![
    "/signup",
    "/login",
    "/childstories",
    "/childstoryrequests",
    "/child",
  ].includes(location.pathname);
  console.log(location);

  if (!showFooter) {
    return null; // Return null to not render the navbar
  }

  return (
    <div>
      <Helmet>
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></script>
      </Helmet>
      <footer>
        <div className="footer col-12">
          <p style={{ color: "#00215e" }}>
            {" "}
            Owlets Storytime: Connecting children with their relatives all around the
            world
          </p>
          <a className="social-icon" href="#" target="blank">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>

          <a className="social-icon" href="#" target="blank">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>

          <a className="social-icon" href="#" target="blank">
            <ion-icon name="logo-youtube"></ion-icon>
          </a>

          <a className="social-icon" href="#" target="blank">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

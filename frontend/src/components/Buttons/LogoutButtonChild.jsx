import { useNavigate } from "react-router-dom";
import { logoutservice } from "../../services/logout";

const LogoutButtonChild = ({ className }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    logoutservice();
    navigate("/login");
  };

  return (
    <div className="logout">
      <button
        type="button"
        className={`logout-button ${className}`}
        onClick={logout}
        style={{
          backgroundColor: "white",
          border: "2px solid #e72ba5",
          color: "#e72ba5",
          height: "70px",
          width: "200px",
          fontSize: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButtonChild;

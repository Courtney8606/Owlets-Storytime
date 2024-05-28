import { useNavigate } from "react-router-dom";
import { logoutservice } from "../../services/logout";
import MainViewButton from "../../components/Buttons/MainViewButton";

const LogoutButton = ({ style }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    logoutservice();
    navigate("/login");
  };

  return (
    <div className="logout">
      <MainViewButton
        type="button"
        onClick={logout}
        text="Log out"
        style={style}
      />
    </div>
  );
};

export default LogoutButton;

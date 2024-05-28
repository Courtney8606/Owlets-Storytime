import { useNavigate, Link } from "react-router-dom";
import { childSafetyMode } from "../../services/childSafetyMode";
import MainViewButton from "./MainViewButton";

const ChildViewButton = ({ style }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    childSafetyMode();
    localStorage.setItem("role", "child");
    navigate(`/child`);
  };

  return (
    <div className="child-view">
      <Link to="/child">
      <MainViewButton text="Child Mode" onClick={handleSubmit} style={style}/>
      </Link>
    </div>
  );
};

export default ChildViewButton;

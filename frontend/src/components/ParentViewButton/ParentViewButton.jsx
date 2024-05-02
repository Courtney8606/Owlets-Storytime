import { useNavigate } from "react-router-dom";

const ParentViewButton = ({ className }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/familyhub`);
  };

  return (
    <div className="parent-view">
      <button
        type="button"
        className={`parent-view-button ${className}`}
        onClick={handleSubmit}
        style={{
          backgroundColor: "transparent",
          border: "None",
        }}
      >
        Family Hub
      </button>
    </div>
  );
};

export default ParentViewButton;

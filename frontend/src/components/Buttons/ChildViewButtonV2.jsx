const ChildViewButtonV2 = ({ text }) => {
    return (
      <div className="child-stories-view">
        <button
          className="submit-button"
          role="submit-button"
          id="submit"
          type="submit"
          style={{
            backgroundColor: "white",
            border: "2px solid #e72ba5",
            color: "#e72ba5",
            height: "70px",
            width: "200px",
            fontSize: "20px",
          }}
        >
          {text}
        </button>
      </div>
    );
  };
  
  export default ChildViewButtonV2;
  
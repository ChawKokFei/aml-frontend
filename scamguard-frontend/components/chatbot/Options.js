import ImageUpload from "./ImageUpload";

const optionItemStyle = {
  padding: "8px 15px",
  border: "1px solid #2898ec",
  borderRadius: "25px",
  color: "#1f91e7",
  fontSize: "0.9rem",
  margin: "3px",
  boxShadow: "inset 0px 0px 0px #2273c4",
  // transition: "all 0.5s",
  // cursor: "pointer",
};

const optionsStyle = {
  paddingBottom: "15px",
};

const optionsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const Options = (props) => {
  return (
    <div style={optionsStyle}>
      <div style={optionsContainerStyle}>
        {props.options.map((option) => {
          return (
            <div
              style={optionItemStyle}
              key={option.id}
              onClick={() => {
                console.log("asdf");
              }}
            >
              {`${option.name} type "${option.id == 1 ? "image" : "audio"}"`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;

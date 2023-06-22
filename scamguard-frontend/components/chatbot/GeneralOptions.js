import Options from "./Options";

const optionItemStyle = {
  padding: "8px 15px",
  border: "1px solid #2898ec",
  borderRadius: "25px",
  color: "#1f91e7",
  fontSize: "0.9rem",
  margin: "3px",
  boxShadow: "inset 0px 0px 0px #2273c4",
  transition: "all 0.5s",
  cursor: "pointer",
};

const optionsStyle = {
  paddingBottom: "15px",
};

const optionsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const GeneralOptions = (props) => {
  const options = [
    {
      name: "Upload image file",
      handler: props.actionProvider.handleUploadImage,
      id: 1,
    },
    {
      name: "Upload audio file",
      handler: props.actionProvider.handleUploadAudio,
      id: 2,
    },
  ];
  return (
    <div style={optionsStyle}>
      <div style={optionsContainerStyle}>
        {options.map((option) => {
          return (
            <div
              style={optionItemStyle}
              key={option.id}
              onClick={option.handler}
            >
              {`${option.name} type "${option.id == 1 ? "image" : "audio"}"`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralOptions;

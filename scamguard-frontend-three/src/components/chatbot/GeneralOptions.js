const optionItemStyle = {
  padding: "8px 15px",
  border: "1px solid #2898ec",
  borderRadius: "25px",
  color: "#1f91e7",
  fontSize: "0.9rem",
  margin: "3px",
  boxShadow: "inset 0px 0px 0px #2273c4",
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
    {
      name: "Send website URL",
      id: 3,
    },
  ];
  console.log(props);

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
              {`${option.name} type "${
                option.id === 1 ? "image" : option.id === 2 ? "audio" : "url"
              }"`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralOptions;

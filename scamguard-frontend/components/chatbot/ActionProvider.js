import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleOptions = (options) => {
    const message = createChatBotMessage(
      "Fantastic, I've got the following options for you.",
      {
        widget: "overview",
        loading: true,
        terminateLoading: true,
        ...options,
      }
    );

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  const handleUploadImage = () => {
    console.log("hello handle image action");
    const message = createChatBotMessage("Upload your image file", {
      widget: "uploadImage",
      // loading: true,
      // terminateLoading: true,
    });

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: { handleOptions, handleUploadImage },
        });
      })}
    </div>
  );
};

export default ActionProvider;

import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    message = message.toLowerCase();

    if (
      message.includes("options") ||
      message.includes("help") ||
      message.includes("do for me")
    ) {
      actions.handleOptions({ withAvatar: true });
    }

    if (message.includes("image")) {
      actions.handleUploadImage();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;

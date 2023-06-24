import { createChatBotMessage } from "react-chatbot-kit";
import GeneralOptions from "./GeneralOptions";
import ImageUpload from "@components/chatbot/ImageUpload";

const BOT_NAME = "ScamGuard";

const config = {
  initialMessages: [createChatBotMessage(`Welcome to ScamGuard`)],
  botName: BOT_NAME,
  state: {
    ocrResult: "tests",
  },
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props) => <GeneralOptions {...props} />,
    },
    {
      widgetName: "uploadImage",
      widgetFunc: (props) => <ImageUpload {...props} />,
      mapStateToProps: ["ocrResult"],
    },
  ],
};

export default config;

import { createChatBotMessage } from "react-chatbot-kit";
import GeneralOptions from "./GeneralOptions";
import ImageUpload from "./ImageUpload";
import AudioUpload from "./AudioUpload";

const BOT_NAME = "ScamGuard";

const config = {
  initialMessages: [
    createChatBotMessage(`Welcome to ScamGuard`),
    createChatBotMessage(
      'You may paste your text here or type "options" for more.'
    ),
  ],
  botName: BOT_NAME,
  state: {
    ocrResult: "tests",
    audioResult: "tests",
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
    {
      widgetName: "uploadAudio",
      widgetFunc: (props) => <AudioUpload {...props} />,
      mapStateToProps: ["audioResult"],
    },
  ],
};

export default config;

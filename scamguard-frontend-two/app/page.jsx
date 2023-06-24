"use client";

import Chatbot from "react-chatbot-kit";
import MessageParser from "@components/chatbot/MessageParser";
import ActionProvider from "@components/chatbot/ActionProvider";
import config from "@components/chatbot/config";
import "react-chatbot-kit/build/main.css";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text test-center">
        ScamGuard
        <br className="max-md:hidden" />
        <span className="green_gradient text-center">
          {" "}
          Your Online Safety Companion
        </span>
      </h1>
      <p className="desc text-center">
        ScamGuard provides personalized suggestions and performs fraud detection
        on user-provided content, such as text, URLs, or audio. By leveraging
        advanced AI algorithms, the chatbot can identify potential fraudulent
        content and offer actionable advice based on the user&apos;s specific
        situation.
      </p>
      <br />
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </section>
  );
};

export default Home;

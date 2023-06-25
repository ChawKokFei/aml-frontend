import React from "react";
import ChatBot from "./components/chatbot/ChatBot";

function App() {
  return (
    <section
      className="w-full flex-center flex-col"
      style={{ flexDirection: "column" }}
    >
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
      <ChatBot />
    </section>
  );
}

export default App;

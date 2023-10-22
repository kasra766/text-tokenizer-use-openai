import { useRef } from "react";
import { ChatGpt, TokenizeInput } from "./components";

import "./App.css";

function App() {
  const ref = useRef();

  return (
    <div>
      <TokenizeInput ref={ref} />
      <ChatGpt ref={ref} />
    </div>
  );
}

export default App;

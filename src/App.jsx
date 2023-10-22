import { useRef } from "react";
import { TokenizeInput,OpenAi } from "./components";

import "./App.css";

function App() {
  const ref = useRef();

  return (
    <div>
      <TokenizeInput ref={ref} />
      <OpenAi ref={ref} />
    </div>
  );
}

export default App;

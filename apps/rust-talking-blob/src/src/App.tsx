import { useState } from "react";
import "./App.css";
import ThreeScene from "./ThreeScene";

function App() {
  const [showScene, setShowScene] = useState(false);

  const handleClick = () => setShowScene(true);

  return (
    <>
      {/* {!showScene && (
          <div className="button-container">
            <button onClick={handleClick}>Render Scene</button>
          </div>
        )}
        {showScene && (
          <div className="talking-blob">
            <ThreeScene />
          </div>
        )} */}
      <div className="app-container">
        {!showScene && (
          <>
            {/* ⚠️ Debug for build: Hello 🙈 */}
            <button className="center-button" onClick={handleClick}>
              Render Scene
            </button>
          </>
        )}
        {showScene && <ThreeScene />}
      </div>
    </>
  );
}

export default App;

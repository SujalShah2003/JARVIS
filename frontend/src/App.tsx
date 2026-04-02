import { useState } from "react";
import { SpeechDemo } from "./components/SpeechDemo";
import { PixelSnowBackground } from "./components/PixelSnowBackground";
import { QAPanel } from "./components/QAPanel";
import type { AppMode } from "./components/ModeToggle";

const App = () => {
  const [mode, setMode] = useState<AppMode>("speech");

  return (
    <div className="appFrame">
      <PixelSnowBackground />
      {/* <div className="grassGround" aria-hidden="true" /> */}

      <div className="appContent">
        {mode === "speech" ? (
          <SpeechDemo mode={mode} onModeChange={setMode} />
        ) : (
          <QAPanel mode={mode} onModeChange={setMode} />
        )}
      </div>
    </div>
  );
};

export default App;
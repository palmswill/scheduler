import  { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(preState=>preState?preState:initial);
  const [history, setHistory] = useState(preState=>preState?preState:[initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
      setHistory([...history.filter((_, i) => i !== history.length - 1)]);
    } else {
      setHistory([...history, mode]);
      setMode(newMode);
    }
  };

  const back = () => {
    if (history.length >= 1) {
      setHistory([...history.filter((_, i) => i !== history.length - 1)]);
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;

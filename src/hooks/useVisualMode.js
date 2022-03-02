import { useState } from "react";

const useVisualMode = (initial) => {
  // if have preState use preState, else use intial values
  const [mode, setMode] = useState((preState) =>
    preState ? preState : initial
  );
  const [history, setHistory] = useState((preState) =>
    preState ? preState : [initial]
  );

  const transition = (newMode, replace = false) => {
    // if replace , remove one mode from history;
    if (replace) {
      setMode(newMode);
      setHistory([...history.filter((_, i) => i !== history.length - 1)]);
    } else {
      setHistory([...history, mode]);
      setMode(newMode);
    }
  };

  const back = () => {
    // only works if have more history to back
    if (history.length >= 1) {
      // remove one mode from history;
      setHistory([...history.filter((_, i) => i !== history.length - 1)]);
      // back to previous mode (top of history);
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;

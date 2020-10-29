import { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }

  function transition(newMode, replace=false) {
    
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), newMode]);
      setMode(newMode)


    } else {
      setHistory([...history, newMode])
      setMode(newMode)

    }
  }

  return {
    mode,
    transition,
    back
  }
} 
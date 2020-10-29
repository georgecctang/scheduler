import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
      setHistory(history);
    }
  }

  function transition(newMode, replace=false) {
    const currentHistory = [...history];
    
    if (replace) {
      currentHistory.pop();
    }

    setHistory([...currentHistory, newMode])
    setMode(newMode);
    }
  
  return {
    mode,
    transition,
    back
  }
} 
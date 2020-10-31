import { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  console.log('mode: ', mode)
  console.log('history: ', history);

  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }

  function transition(newMode, replace=false) {
    
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
      setMode(newMode)


    } else {
      setHistory(prev => [...prev, newMode])
      setMode(newMode)

    }
  }

  return {
    mode,
    transition,
    back
  }
} 
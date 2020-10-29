import { useState, useEffect } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState('');
  const [history, setHistory] = useState([initial]);

  useEffect(() => {
    setMode(history[history.length - 1]);
  }, [history])

  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  }

  function transition(newMode, replace=false) {
    
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode])

    } else {
      setHistory(prev => [...prev, newMode])
    }
  }

  return {
    mode,
    transition,
    back
  }
} 
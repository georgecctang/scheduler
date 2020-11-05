// Custom hook to control the display of Appointment Components

import { useState } from 'react';

export default function useVisualMode(initial) {
  
  // The mode controls which component to display
  const [mode, setMode] = useState(initial);
  
  // A sequence of previously displayed modes
  const [history, setHistory] = useState([initial]);

  // Function to switch to the last mode
  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }

  // Function to switch to new mode
  function transition(newMode, replace = false) {
    
    // Replace the most recent mode with new mode
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
      setMode(newMode);

    // No replacement
    } else {
      setHistory(prev => [...prev, newMode]);
      setMode(newMode);

    }
  }

  return {
    mode,
    transition,
    back
  };
}
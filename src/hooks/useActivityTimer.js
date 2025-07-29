import { useState, useEffect } from 'react';

export const useActivityTimer = (lastOnlineTimestamp) => {
  const [secondsSinceLastOnline, setSecondsSinceLastOnline] = useState(null);

  useEffect(() => {
    if (!lastOnlineTimestamp) {
      setSecondsSinceLastOnline(null);
      return;
    }

    const updateTimer = () => {
      setSecondsSinceLastOnline(Math.floor(Date.now() / 1000) - lastOnlineTimestamp);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [lastOnlineTimestamp]);

  const formatDuration = (seconds) => {
    if (seconds == null) return "-";
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    return [
      d > 0 ? `${d}d` : null,
      h > 0 ? `${h}h` : null,
      m > 0 ? `${m}m` : null,
      `${s}s`
    ].filter(Boolean).join(" ");
  };

  return {
    secondsSinceLastOnline,
    formatDuration: () => formatDuration(secondsSinceLastOnline)
  };
}; 
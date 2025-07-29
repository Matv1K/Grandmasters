import { useState, useEffect } from 'react';
import { UI_CONFIG } from '../constants';

export const useActivityTimer = (lastOnlineTimestamp) => {
  const [secondsSinceLastOnline, setSecondsSinceLastOnline] = useState(null);

  useEffect(() => {
    if (!lastOnlineTimestamp) {
      setSecondsSinceLastOnline(null);
      return;
    }

    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      setSecondsSinceLastOnline(currentTime - lastOnlineTimestamp);
    };

    updateTimer();
    
    const interval = setInterval(updateTimer, UI_CONFIG.ACTIVITY_TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [lastOnlineTimestamp]);

  return { secondsSinceLastOnline, formatDuration: () => secondsSinceLastOnline };
}; 
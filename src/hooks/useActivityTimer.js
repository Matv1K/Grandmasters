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

  const formatDuration = () => {
    if (secondsSinceLastOnline === null || secondsSinceLastOnline < 0) {
      return 'Unknown';
    }

    const d = Math.floor(secondsSinceLastOnline / 86400);
    const h = Math.floor((secondsSinceLastOnline % 86400) / 3600);
    const m = Math.floor((secondsSinceLastOnline % 3600) / 60);
    const s = secondsSinceLastOnline % 60;

    return `${d > 0 ? d + 'd ' : ''}${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return { secondsSinceLastOnline, formatDuration };
};

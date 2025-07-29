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

    const totalSeconds = secondsSinceLastOnline;
    
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    
    if (days > 0) {
      parts.push(`${days}d`);
    }
    if (hours > 0 || days > 0) {
      parts.push(`${hours.toString().padStart(2, '0')}h`);
    }
    if (minutes > 0 || hours > 0 || days > 0) {
      parts.push(`${minutes.toString().padStart(2, '0')}m`);
    }
    parts.push(`${seconds.toString().padStart(2, '0')}s`);

    return parts.join(' ');
  };

  return { secondsSinceLastOnline, formatDuration };
};

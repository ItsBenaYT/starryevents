import { useState, useEffect } from "react";

interface CountdownTimerProps {
  endTime: string;
  className?: string;
}

export function CountdownTimer({ endTime, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(endTime).getTime();
      const distance = target - now;

      if (distance > 0) {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className={`countdown-timer rounded-lg p-3 ${className}`} data-testid="countdown-timer">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
        <div className="flex justify-center space-x-2 text-lg font-bold">
          <span data-testid="hours">{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span>:</span>
          <span data-testid="minutes">{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span>:</span>
          <span data-testid="seconds">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}

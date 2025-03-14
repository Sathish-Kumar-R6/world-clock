import { useEffect, useRef, useState } from "react";
import "./world-clock.css";
import { getTimeValue } from "../helper";

type Props = {
  timeZone: string;
};

function WorldClock({ timeZone }: Props) {
  const clockRef = useRef<HTMLDivElement | null>(null);
  const [circleWidth, setCircleWidth] = useState<number>(300);
  const [time, setTime] = useState(() => getTimeValue(new Date()));

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCircleWidth(entry.contentRect.width);
      }
    });

    if (clockRef.current) {
      resizeObserver.observe(clockRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const formatTime = new Date().toLocaleString("en-US", { timeZone })
      const now = new Date(formatTime)
      setTime(getTimeValue(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  const radius = circleWidth / 2 - 15;
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex">
      <div className="circle" ref={clockRef}>
        {/* Numbers around the clock */}
        {numbers.map((num) => {
          const angle = ((num - 3) * 30 * Math.PI) / 180;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <div
              key={num}
              className="number"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {num}
            </div>
          );
        })}

        {/* Clock Hands */}
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${time.hourDegrees}deg)` }}
        ></div>
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${time.minsDegrees}deg)` }}
        ></div>
        <div
          className="hand seconds-hand"
          style={{ transform: `rotate(${time.secondsDegrees}deg)` }}
        ></div>
      </div>
    </div>
  );
}

export default WorldClock;

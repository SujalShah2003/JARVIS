import { useMemo } from "react";

type SnowflakeConfig = {
  leftPct: number;
  sizePx: number;
  opacity: number;
  durationSec: number;
  delaySec: number;
  driftVw: number;
};

const makeFlakes = (count: number): SnowflakeConfig[] => {
  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  return Array.from({ length: count }, () => {
    const sizePx = Math.round(rand(2, 5));
    return {
      leftPct: rand(0, 100),
      sizePx,
      opacity: rand(0.35, 0.95),
      durationSec: rand(6, 14),
      delaySec: rand(0, 10),
      driftVw: rand(-8, 8),
    };
  });
};

export const PixelSnowBackground = ({ count = 70 }: { count?: number }) => {
  const flakes = useMemo(() => makeFlakes(count), [count]);

  return (
    <div className="pixelSnow" aria-hidden="true">
      {flakes.map((f, idx) => {
        const style = {
          ["--snow-left" as any]: `${f.leftPct}%`,
          ["--snow-size" as any]: `${f.sizePx}px`,
          ["--snow-opacity" as any]: `${f.opacity}`,
          ["--snow-duration" as any]: `${f.durationSec}s`,
          ["--snow-delay" as any]: `-${f.delaySec}s`,
          ["--snow-drift" as any]: `${f.driftVw}vw`,
        } as React.CSSProperties;

        return <div key={idx} className="snowflake" style={style} />;
      })}
    </div>
  );
};

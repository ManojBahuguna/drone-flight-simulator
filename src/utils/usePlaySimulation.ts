import { type Dispatch, type SetStateAction, useEffect } from "react";

export function usePlaySimulation({
  startAt,
  endAt,
  setCurrentTimestamp,
  isPlaying,
  onDone,
}: {
  startAt: number;
  endAt: number;
  setCurrentTimestamp: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  onDone: () => void;
}) {
  // update timestamp in drone simulation
  useEffect(() => {
    if (!isPlaying) return;
    let stopAnimation = false;

    let rafId: number;
    let simulationStartTime = Date.now();

    function animate() {
      if (stopAnimation) return;

      const elapsedSimulationTime = Date.now() - simulationStartTime;
      const currentTimestampInPath = startAt + elapsedSimulationTime;
      if (currentTimestampInPath > endAt) {
        setCurrentTimestamp(endAt);
        onDone();
        return; // stop animation loop when reached end
      }
      setCurrentTimestamp(currentTimestampInPath);

      rafId = window.requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      stopAnimation = true;
    };
  }, [isPlaying, setCurrentTimestamp, startAt, endAt, onDone]);
}

import { Dispatch, SetStateAction, useEffect } from "react";
import { type Path } from "./types";

export function usePlaySimulation({
  paths,
  startAt,
  endAt,
  setStartAt,
  isPlaying,
}: {
  paths: Path[];
  startAt: number;
  endAt: number;
  setStartAt: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
}) {
  // Play simulation
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
        setStartAt(endAt);
        return;
      }
      setStartAt(currentTimestampInPath);

      rafId = window.requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      stopAnimation = true;
    };
  }, [startAt, isPlaying, setStartAt, endAt]);
}

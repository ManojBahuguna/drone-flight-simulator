import { useEffect } from "react";
import { getPointAtTimestamp } from "./pathSeek";
import { type Path } from "./types";
import { useSetupMarkers } from "./useSetupMarkers";

export function useDronePath({
  paths,
  map,
  startAt,
  isPlaying,
}: {
  paths: Path[];
  map: google.maps.Map | null;
  startAt: number;
  isPlaying: boolean;
}) {
  const markers = useSetupMarkers({ paths, map, startAt });

  // Play simulation
  useEffect(() => {
    if (!isPlaying) return;
    if (markers.length !== paths.length || paths.length < 2) return;
    let stopAnimation = false;

    let rafId: number;
    let simulationStartTime = Date.now();

    function animate() {
      if (stopAnimation) return;

      markers.forEach((marker, i) => {
        const elapsedSimulationTime = Date.now() - simulationStartTime;
        const currentTimestampInPath = startAt + elapsedSimulationTime;

        const [point] = getPointAtTimestamp(
          paths[i].waypoints,
          currentTimestampInPath
        );
        marker.setPosition(point);
      });

      rafId = window.requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      stopAnimation = true;
    };
  }, [paths, markers, startAt, isPlaying]);
}

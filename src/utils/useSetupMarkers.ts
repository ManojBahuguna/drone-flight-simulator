import { useEffect, useState } from "react";
import { type Path } from "./types";
import { useSyncDroneMarkers } from "./useSyncDroneMarkers";

export function useSetupMarkers({
  paths,
  map,
  currentTimestamp,
}: {
  paths: Path[];
  map: google.maps.Map | null;
  currentTimestamp: number;
}) {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Create marker for each path.
  useEffect(() => {
    if (!map) return;

    const newMarkers = paths.map((path) => {
      return new window.google.maps.Marker({
        map,
        label: {
          text: path.name,
          className: "DroneMarker",
          color: "white",
          fontSize: "12px",
        },
      });
    });
    setMarkers(newMarkers);

    return () => {
      newMarkers.forEach((m) => m.setMap(null));
      setMarkers([]);
    };
  }, [paths, map]);

  useSyncDroneMarkers({ markers, paths, currentTimestamp });

  return markers;
}

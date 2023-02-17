import { useEffect, useState } from "react";
import { type Path } from "./types";
import { getPointAtTimestamp } from "./pathSeek";

export function useSetupMarkers({
  paths,
  map,
  startAt,
}: {
  paths: Path[];
  map: google.maps.Map | null;
  startAt: number;
}) {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Create marker for each path.
  useEffect(() => {
    if (!map) return;

    const markersAtStartPosition = paths.map((path) => {
      const [position] = getPointAtTimestamp(path.waypoints, startAt);

      return new window.google.maps.Marker({
        map,
        label: {
          text: path.name,
          className: "DroneMarker",
          color: "white",
          fontSize: "12px",
        },
        position,
      });
    });
    setMarkers(markersAtStartPosition);

    return () => {
      markersAtStartPosition.forEach((m) => m.setMap(null));
      setMarkers([]);
    };
  }, [paths, map, startAt]);

  return markers;
}

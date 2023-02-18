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

  // set marker position to `startAt`
  useEffect(() => {
    if (markers.length !== paths.length) return;
    markers.forEach((marker, i) => {
      const [position] = getPointAtTimestamp(paths[i].waypoints, startAt);
      marker.setPosition(position);
    });
  }, [paths, markers, startAt]);

  return markers;
}

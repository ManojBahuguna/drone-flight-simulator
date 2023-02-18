import { useEffect } from "react";
import { getPointAtTimestamp } from "./pathSeek";
import { type Path } from "./types";

/** Sync drone markers with current timestamp */
export function useSyncDroneMarkers({
  markers,
  paths,
  currentTimestamp,
}: {
  paths: Path[];
  markers: google.maps.Marker[];
  currentTimestamp: number;
}) {
  // set marker position to `startAt`
  useEffect(() => {
    if (markers.length !== paths.length) return;
    markers.forEach((marker, i) => {
      const [position] = getPointAtTimestamp(
        paths[i].waypoints,
        currentTimestamp
      );
      marker.setPosition(position);
    });
  }, [paths, markers, currentTimestamp]);
}

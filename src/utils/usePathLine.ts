import { useEffect } from "react";
import { Path } from "./types";

export function usePathLine(paths: Path[], map: google.maps.Map | null) {
  useEffect(() => {
    if (!map) return;

    const lines = paths.map(({ waypoints }) => {
      return new google.maps.Polyline({
        path: waypoints,
        geodesic: true,
        strokeColor: "#fff8",
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map,
      });
    });

    return () => {
      lines.forEach((l) => l.setMap(null));
    };
  }, [paths, map]);
}

import { useMemo, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { MapView } from "./components/MapView";
import { PathsManager } from "./components/PathsManager";
import { type Path } from "./utils/types";
import { usePathLine } from "./utils/usePathLine";
import { useDronePath } from "./utils/useDronePath";

const defaultPaths: Path[] = [
  {
    name: "Drone 1",
    waypoints: [
      { timestamp: 0, lat: 18.5675, lng: 73.77 },
      { timestamp: 500, lat: 18.568, lng: 73.771 },
      { timestamp: 1000, lat: 18.567, lng: 73.772 },
      { timestamp: 2000, lat: 18.568, lng: 73.773 },
      { timestamp: 3000, lat: 18.5675, lng: 73.774 },
    ],
  },
  {
    name: "Drone 2",
    waypoints: [
      { timestamp: 500, lat: 18.5655, lng: 73.77 },
      { timestamp: 1000, lat: 18.565, lng: 73.771 },
      { timestamp: 1500, lat: 18.566, lng: 73.772 },
      { timestamp: 2000, lat: 18.565, lng: 73.773 },
      { timestamp: 3000, lat: 18.5655, lng: 73.774 },
    ],
  },
];

export function App() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [paths, setPaths] = useState<Path[]>(defaultPaths);

  const minTimestamp = useMemo(() => {
    const allTimestamps = paths.flatMap((p) =>
      p.waypoints.map((w) => w.timestamp)
    );
    return Math.min(...allTimestamps);
  }, [paths]);

  // drone flight simulation
  useDronePath({ paths, map, startAt: minTimestamp, isPlaying: true });

  // drone path line
  usePathLine(paths, map);

  return (
    <div className="relative h-full">
      <div className="fixed top-0 left-0 z-10">
        <PathsManager paths={paths} setPaths={setPaths} />
      </div>

      <Wrapper apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <MapView setMap={setMap} paths={paths} />
      </Wrapper>
    </div>
  );
}

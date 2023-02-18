import { useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { MapView } from "./components/MapView";
import { PathsManager } from "./components/PathsManager";
import { SeekControls } from "./components/SeekControls";
import { type Path } from "./utils/types";
import { usePathLine } from "./utils/usePathLine";

const defaultPaths: Path[] = [
  {
    id: 1,
    name: "Drone 1",
    waypoints: [
      { id: 1, timestamp: 0, lat: 18.5675, lng: 73.77 },
      { id: 2, timestamp: 500, lat: 18.568, lng: 73.771 },
      { id: 3, timestamp: 1000, lat: 18.567, lng: 73.772 },
      { id: 4, timestamp: 2000, lat: 18.568, lng: 73.773 },
      { id: 5, timestamp: 3000, lat: 18.5675, lng: 73.774 },
    ],
  },
  {
    id: 2,
    name: "Drone 2",
    waypoints: [
      { id: 1, timestamp: 500, lat: 18.5655, lng: 73.77 },
      { id: 2, timestamp: 1000, lat: 18.565, lng: 73.771 },
      { id: 3, timestamp: 1500, lat: 18.566, lng: 73.772 },
      { id: 4, timestamp: 2000, lat: 18.565, lng: 73.773 },
      { id: 5, timestamp: 3000, lat: 18.5655, lng: 73.774 },
    ],
  },
];

export function App() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [paths, setPaths] = useState<Path[]>(defaultPaths);

  // drone path line
  usePathLine(paths, map);

  return (
    <div className="relative h-full">
      <div className="fixed top-0 left-0 z-10">
        <PathsManager paths={paths} setPaths={setPaths} />
      </div>

      <div className="fixed z-10 bottom-5 w-[calc(100vw-200px)] left-[100px]">
        <SeekControls paths={paths} map={map} />
      </div>

      <Wrapper apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <MapView setMap={setMap} />
      </Wrapper>
    </div>
  );
}

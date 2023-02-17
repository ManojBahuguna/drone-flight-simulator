import { Wrapper } from "@googlemaps/react-wrapper";
import { MapView } from "./components/MapView";
import { PathsManager } from "./components/PathsManager";

export function App() {
  return (
    <div className="relative h-full">
      <div className="fixed top-0 left-0 z-10">
        <PathsManager />
      </div>

      <Wrapper apiKey={import.meta.env.VITE_MAPS_API_KEY}>
        <MapView />
      </Wrapper>
    </div>
  );
}

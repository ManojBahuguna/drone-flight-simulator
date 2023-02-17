import { Wrapper } from "@googlemaps/react-wrapper";
import { MapView } from "./components/MapView";

export function App() {
  return (
    <Wrapper apiKey={import.meta.env.VITE_MAPS_API_KEY}>
      <MapView />
    </Wrapper>
  );
}

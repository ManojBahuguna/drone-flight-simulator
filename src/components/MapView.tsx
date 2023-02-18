import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";

export function MapView({
  setMap,
}: {
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new window.google.maps.Map(ref.current, {
      center: { lat: 18.5664, lng: 73.7719 }, // flytbase location
      zoom: 17,
      mapTypeId: window.google.maps.MapTypeId.SATELLITE,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });
    setMap(map);

    return () => {
      map.unbindAll();
      setMap(null);
    };
  }, [setMap]);

  return <div className="w-full h-full" ref={ref} id="map" />;
}

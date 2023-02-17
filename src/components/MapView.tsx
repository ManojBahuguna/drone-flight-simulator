import { useEffect, useRef } from "react";

export function MapView() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    new window.google.maps.Map(ref.current, {
      center: { lat: 18.566412212712482, lng: 73.77197735812 }, // flytbase location
      zoom: 17,
      mapTypeId: window.google.maps.MapTypeId.SATELLITE,
      streetViewControl: false,
      mapTypeControl: false,
    });
  }, []);

  return <div className="w-full h-full" ref={ref} id="map" />;
}

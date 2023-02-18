import { ChangeEvent, useMemo, useState } from "react";
import { type Path } from "../utils/types";
import { usePlaySimulation } from "../utils/usePlaySimulation";
import { useSetupMarkers } from "../utils/useSetupMarkers";

export function SeekControls({
  paths,
  map,
}: {
  paths: Path[];
  map: google.maps.Map | null;
}) {
  const [minTimestamp, maxTimestamp] = useMemo(() => {
    const allTimestamps = paths.flatMap((p) =>
      p.waypoints.map((w) => w.timestamp)
    );
    return [Math.min(...allTimestamps), Math.max(...allTimestamps)];
  }, [paths]);

  const [startAt, setStartAt] = useState(minTimestamp);
  const [isPlaying, setIsPlaying] = useState(true);

  // Setup markers depicting drones
  useSetupMarkers({ paths, map, startAt });

  // drone flight simulation
  usePlaySimulation({
    paths,
    startAt,
    endAt: maxTimestamp,
    isPlaying,
    setStartAt,
  });

  const handleStartAtChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    setStartAt(+e.target.value);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setStartAt(minTimestamp); // reset to initial position
  };

  return (
    <div className="flex bg-black/70 py-2 px-4 rounded-full text-3xl">
      <button onClick={() => setIsPlaying((v) => !v)}>
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <button onClick={handleStop} className="mr-4">
        ⏹️
      </button>
      <input
        className="flex-grow"
        type="range"
        min={minTimestamp}
        max={maxTimestamp}
        value={startAt}
        onChange={handleStartAtChange}
      />
    </div>
  );
}

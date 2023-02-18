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

  const [startAt, setStartAt] = useState(minTimestamp - 2000); // initially start after 2 seconds
  const [currentTimestamp, setCurrentTimestamp] = useState(startAt);
  const [isPlaying, setIsPlaying] = useState(true);

  // Setup markers depicting drones
  useSetupMarkers({ paths, map, currentTimestamp });

  // drone flight simulation
  usePlaySimulation({
    startAt,
    isPlaying,
    endAt: maxTimestamp,
    setCurrentTimestamp,
  });

  const handleTimestampChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);

    const newTimestamp = +e.target.value;
    setCurrentTimestamp(newTimestamp);
    setStartAt(newTimestamp);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      // when pausing, set currentTimestamp to startAt, so that simulation starts from here only next time
      setStartAt(currentTimestamp);
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);

    // reset to initial position
    setCurrentTimestamp(minTimestamp);
    setStartAt(minTimestamp);
  };

  return (
    <div className="flex bg-black/70 py-2 px-4 rounded-full text-3xl">
      <button onClick={handleTogglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
      <button onClick={handleStop} className="mr-4">
        ⏹️
      </button>
      <input
        className="flex-grow"
        type="range"
        min={minTimestamp}
        max={maxTimestamp}
        value={currentTimestamp}
        onChange={handleTimestampChange}
      />
    </div>
  );
}

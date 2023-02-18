import { type ChangeEvent, type FormEvent, Fragment, useState } from "react";
import { type PathPoint, type Path } from "../utils/types";

export function PathEditForm({
  defaultPath,
  onPathChange,
}: {
  defaultPath: Path;
  onPathChange: (change: Path) => void;
}) {
  const [isTouched, setIsTouched] = useState(false);
  const [waypoints, setWaypoints] = useState(defaultPath.waypoints);

  const handleUpdatePathPoint = (
    pointIdx: number,
    field: "lat" | "lng" | "timestamp",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setIsTouched(true);
    setWaypoints(
      waypoints.map((p, i) =>
        i === pointIdx ? { ...p, [field]: +e.target.value } : p
      )
    );
  };

  const handleRemovePoint = (pointIdx: number) => {
    setIsTouched(true);
    setWaypoints(waypoints.filter((_, i) => i !== pointIdx));
  };

  const handleAddPoint = () => {
    setIsTouched(true);
    const lastWaypoint = waypoints[waypoints.length - 1];
    const newWaypoint: PathPoint = {
      id: Math.random(),
      timestamp: (lastWaypoint?.timestamp || 0) + 1000,
      lat: lastWaypoint?.lat || 18.5675,
      lng: (lastWaypoint?.lng || 73.77) + 0.003,
    };
    setWaypoints([...waypoints, newWaypoint]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTouched(false);
    onPathChange({ ...defaultPath, waypoints });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-[1fr,1fr,1fr,auto] text-sm gap-y-1">
        <div className="font-semibold text-xs text-gray-400 p-2">Timestamp</div>
        <div className="font-semibold text-xs text-gray-400 p-2">Lat</div>
        <div className="font-semibold text-xs text-gray-400 p-2">Lng</div>
        <div>{/* actions column */}</div>

        {waypoints.map((point, pointIdx) => (
          <Fragment key={point.id}>
            <input
              className="max-w-[120px]"
              value={point.timestamp}
              onChange={(e) => handleUpdatePathPoint(pointIdx, "timestamp", e)}
              placeholder="timestamp"
            />
            <input
              className="max-w-[120px]"
              value={point.lat}
              onChange={(e) => handleUpdatePathPoint(pointIdx, "lat", e)}
              placeholder="lat"
            />
            <input
              className="max-w-[120px]"
              value={point.lng}
              onChange={(e) => handleUpdatePathPoint(pointIdx, "lng", e)}
              placeholder="lng"
            />
            <div className="px-2 py-1">
              {waypoints.length > 1 && (
                <button
                  onClick={() => handleRemovePoint(pointIdx)}
                  className="text-sm"
                  type="button"
                >
                  ❌
                </button>
              )}
            </div>
          </Fragment>
        ))}
      </div>

      <button
        onClick={handleAddPoint}
        type="button"
        className="Button bg-gray-700 mt-2 py-1 px-2"
      >
        ➕ Add
      </button>

      <div className="mt-5 text-right text-black">
        <button
          disabled={!isTouched}
          type="submit"
          className="PrimaryButton shadow ml-auto"
        >
          💾 Save
        </button>
      </div>
    </form>
  );
}

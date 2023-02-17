export interface PathPoint {
  timestamp: number;
  lat: number;
  lng: number;
}

const lerp = (x: number, y: number, v: number) => (1 - v) * x + v * y; // convert 0-1 range to x-y range
const unlerp = (x: number, y: number, v: number) => (v - x) / (y - x); // x-y -> 0-1

/**
 * returns index of PathPoint which comes at or before the provided timestamp
 *
 * Suppose timestamps in path are `10, 20, 25` and `timestamp` provided in argument is `24`,
 * this function will return `1` (since 20 is at idx `1`)
 */
function searchInPath(path: PathPoint[], timestamp: number) {
  /** @TODO use binary search to improve performance */
  return path.findIndex((p) => p.timestamp > timestamp) - 1;
}

/**
 * Returns a tuple
 * 1. where lat/lng should be at given percentage (i.e `timePercent`)
 * 1. floor index of current path-point/way-point
 *
 *
 * Assumptions:
 * - path is already sorted in ascending order
 * - atleast two points exists in path
 * - timestamp is within range of timestamps provided in path
 */
export function getPointAtTimestamp(
  path: PathPoint[],
  timestamp: number
): [PathPoint, number] {
  // const minTime = path[0].timestamp;
  const maxTime = path[path.length - 1].timestamp;

  if (timestamp === maxTime) {
    // reached end. return last path-point
    return [path[path.length - 1], path.length - 1];
  }

  const startTimePointIdx = searchInPath(path, timestamp);
  const startTimePoint = path[startTimePointIdx];
  const endTimePoint = path[startTimePointIdx + 1];

  const timestampInterpolated = unlerp(
    startTimePoint.timestamp,
    endTimePoint.timestamp,
    timestamp
  );

  return [
    {
      lat: lerp(startTimePoint.lat, endTimePoint.lat, timestampInterpolated),
      lng: lerp(startTimePoint.lng, endTimePoint.lng, timestampInterpolated),
      timestamp,
    },
    startTimePointIdx,
  ];
}

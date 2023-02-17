export interface PathPoint {
  timestamp: number;
  lat: number;
  lng: number;
}

export interface Path {
  name: string;
  waypoints: PathPoint[];
  disabled?: boolean;
}

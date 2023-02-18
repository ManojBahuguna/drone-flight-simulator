export interface PathPoint {
  id: number;
  timestamp: number;
  lat: number;
  lng: number;
}

export interface Path {
  id: number;
  name: string;
  waypoints: PathPoint[];
  disabled?: boolean;
}

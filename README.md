# Drone Flight Simulator

## Demo

Link: https://flyt.surge.sh

<img src="./assets/drone-flight-simulator.gif" alt="Drone Flight Simulator Demo" />

## Instructions

- Install dependencies
  ```
  yarn
  ```
- create `.env` file with valid google maps token
  ```
  VITE_MAPS_API_KEY=<token here>
  ```
- Start dev server
  ```
  yarn dev
  ```

## Feature highlights

- Configurable drone flight path
- Play/Pause flight simulation
- Time travel in the simulation (seek)
- Support for multiple drones/flight-paths
- Support for flexible time intervals
- File import support for path data (sample in _public/drone-path.txt_)

## Missing features

- Proper validation of input/import etc. are missing.
- Tests are missing currently.
- Could improve experience by allowing to add lat/lng points by clicking on map. Not implemented currently.
- Didn't focus too much on UI as of now.

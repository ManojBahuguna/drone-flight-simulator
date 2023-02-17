import { Tab } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { PathPoint } from "../utils/pathProgress";

interface Path {
  name: string;
  waypoints: PathPoint[];
  disabled: boolean;
}

const defaultPaths: Path[] = [
  {
    name: "Path 1",
    disabled: false,
    waypoints: [
      { timestamp: 0, lat: 18.5664, lng: 73.7719 },
      { timestamp: 1000, lat: 18.5664, lng: 73.7721 },
      { timestamp: 1200, lat: 18.5664, lng: 73.7723 },
    ],
  },
  {
    name: "Path 2",
    disabled: false,
    waypoints: [
      { timestamp: 0, lat: 18.5666, lng: 73.7719 },
      { timestamp: 500, lat: 18.5666, lng: 73.7721 },
      { timestamp: 1500, lat: 18.5666, lng: 73.7723 },
    ],
  },
];

export function PathsManager() {
  const [paths, setPaths] = useState<Path[]>(defaultPaths);

  return (
    <Tab.Group as="div" className="bg-black/20 p-2 rounded-br-2xl">
      <Tab.List>
        {/** @TODO Allow naming Tabs */}
        {paths.map((path, pathIdx) => (
          <Tab className="Tab" key={path.name + pathIdx}>
            Path {pathIdx + 1}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="TabPanel mt-2">
        {paths.map((path, pathIdx) => (
          <Tab.Panel
            className="max-h-[calc(100vh-120px)] rounded-lg bg-white/80 p-3 pb-4"
            key={path.name + pathIdx}
          >
            <div className="grid grid-cols-[1fr,1fr,1fr,auto] text-sm gap-y-1">
              <div className="font-semibold text-xs text-gray-700 p-2">
                Timestamp
              </div>
              <div className="font-semibold text-xs text-gray-700 p-2">Lat</div>
              <div className="font-semibold text-xs text-gray-700 p-2">Lng</div>
              <div>{/* actions column */}</div>

              {path.waypoints.map((point, pointIdx) => (
                <Fragment key={point.timestamp + pointIdx}>
                  <input
                    className="max-w-[120px]"
                    value={point.timestamp}
                    placeholder="timestamp"
                  />
                  <input
                    className="max-w-[120px]"
                    value={point.lat}
                    placeholder="lat"
                  />
                  <input
                    className="max-w-[120px]"
                    value={point.lat}
                    placeholder="lng"
                  />
                  <div className="px-2 py-1">
                    <button className="text-sm" type="button">
                      ❌
                    </button>
                  </div>
                </Fragment>
              ))}
            </div>

            <button className="Button mt-2 py-1 px-2">➕ Add</button>

            <div className="mt-5 text-right">
              <button className="PrimaryButton shadow ml-auto">💾 Save</button>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

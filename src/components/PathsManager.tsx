import { Tab } from "@headlessui/react";
import {
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  Fragment,
} from "react";
import { type Path } from "../utils/types";

export function PathsManager({
  paths,
  setPaths,
}: {
  paths: Path[];
  setPaths: Dispatch<SetStateAction<Path[]>>;
}) {
  const handleAddPath = () => {
    setPaths((p) => {
      return [
        ...p,
        {
          name: `Drone ${p.length + 1}`,
          waypoints: [{ lat: 18.5675, lng: 73.77, timestamp: 0 }],
        },
      ];
    });
  };

  const handleRemovePath = (e: MouseEvent, path: Path) => {
    e.preventDefault();
    setPaths((paths) => paths.filter((p) => p !== path));
  };

  return (
    <Tab.Group as="div" className="bg-black/20 p-2 rounded-br-2xl">
      <Tab.List>
        {/** @TODO Allow naming Tabs */}
        {paths.map((path, pathIdx) => (
          <Tab className="Tab" key={path.name + pathIdx}>
            {path.name}

            <span
              className="text-xs ml-1"
              onClick={(e) => handleRemovePath(e, path)}
            >
              ❌
            </span>
          </Tab>
        ))}

        <button
          onClick={handleAddPath}
          className="bg-white/70 rounded-full py-0.5 px-1"
        >
          ➕
        </button>
      </Tab.List>

      <Tab.Panels className="TabPanel mt-2">
        {paths.map((path, pathIdx) => (
          <Tab.Panel
            className="max-h-[calc(100vh-150px)] rounded-lg bg-black/70 text-white p-3 pb-4 overflow-y-auto"
            key={path.name + pathIdx}
          >
            <div className="grid grid-cols-[1fr,1fr,1fr,auto] text-sm gap-y-1">
              <div className="font-semibold text-xs text-gray-400 p-2">
                Timestamp
              </div>
              <div className="font-semibold text-xs text-gray-400 p-2">Lat</div>
              <div className="font-semibold text-xs text-gray-400 p-2">Lng</div>
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

            <button className="Button bg-gray-700 mt-2 py-1 px-2">
              ➕ Add
            </button>

            <div className="mt-5 text-right text-black">
              <button className="PrimaryButton shadow ml-auto">💾 Save</button>
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

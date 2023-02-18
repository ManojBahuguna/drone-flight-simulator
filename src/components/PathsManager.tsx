import { Tab } from "@headlessui/react";
import { type Dispatch, type MouseEvent, type SetStateAction } from "react";
import { type Path } from "../utils/types";
import { PathEditForm } from "./PathEditForm";

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
          id: Math.random(),
          name: `Drone ${p.length + 1}`,
          waypoints: [
            { id: Math.random(), lat: 18.5675, lng: 73.77, timestamp: 0 },
          ],
        },
      ];
    });
  };

  const handlePathChange = (change: Path) => {
    setPaths((_paths) => _paths.map((p) => (p.id === change.id ? change : p)));
  };

  const handleRemovePath = (e: MouseEvent, path: Path) => {
    e.preventDefault();
    setPaths((paths) => paths.filter((p) => p !== path));
  };

  return (
    <Tab.Group as="div" className="bg-black/20 p-2 rounded-br-2xl">
      <Tab.List>
        {/** @TODO Allow naming Tabs */}
        {paths.map((path) => (
          <Tab className="Tab" key={path.id}>
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
        {paths.map((path) => (
          <Tab.Panel
            className="max-h-[calc(100vh-150px)] rounded-lg bg-black/70 text-white p-3 pb-4 overflow-y-auto"
            key={path.id}
          >
            <PathEditForm defaultPath={path} onPathChange={handlePathChange} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

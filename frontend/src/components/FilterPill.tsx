import { Pill } from "@mantine/core";
import { useShallow } from "zustand/react/shallow";
import type { Sighting } from "../api";
import { useAppState } from "../states/app";

export default function FilterPill({ label, filter }: { label: string; filter: (sightings: Sighting[]) => void }) {
  const sightings = useAppState(useShallow((state) => state.sightings));
  const activeFilter = useAppState(useShallow((state) => state.activeFilter));

  return (
    <Pill bg={activeFilter === label ? "white" : "gray"} c={activeFilter === label ? "black" : "white"} onClick={() => filter(sightings)} size="xl">
      {label}
    </Pill>
  );
}

import { create } from "zustand";
import type { Sighting } from "../api";

const initial = {
  sightings: [] as Sighting[],
  filteredSightings: [] as Sighting[],
};

type AppState = typeof initial & {
  setSightings: (sightings: typeof initial.sightings) => void;
  setFilteredSightings: (filteredSightings: typeof initial.filteredSightings) => void;
};

export const useAppState = create<AppState>()((set) => ({
  ...initial,
  setSightings: (sightings: typeof initial.sightings) => set({ sightings }),
  setFilteredSightings: (filteredSightings: typeof initial.filteredSightings) => set({ filteredSightings }),
}));

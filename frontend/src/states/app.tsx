import { create } from "zustand";
import type { Sighting } from "../api";

type Filters = "All" | "Today" | "This Week" | "This Month" | "Past 4 Months" | "This Year";

const initial = {
  sightings: [] as Sighting[],
  filteredSightings: [] as Sighting[],
  activeFilter: "All" as Filters,
};

type AppState = typeof initial & {
  setSightings: (sightings: typeof initial.sightings) => void;
  setFilteredSightings: (filteredSightings: typeof initial.filteredSightings) => void;
  setActiveFilter: (filter: Filters) => void;
};

export const useAppState = create<AppState>()((set) => ({
  ...initial,
  setSightings: (sightings: typeof initial.sightings) => set({ sightings }),
  setFilteredSightings: (filteredSightings: typeof initial.filteredSightings) => set({ filteredSightings }),
  setActiveFilter: (filter: Filters) => set({ activeFilter: filter }),
}));

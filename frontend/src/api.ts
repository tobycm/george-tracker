import { buildings } from "./constants";
/**
  {
    "id": 3,
    "location": "Sngequ Residence",
    "date": "2026-09-05",
    "notes": "george detected",
    "image": "/uploads/sighting-1790461978696-132471605.jpg"
  }
 */

export interface Sighting {
  id: string;
  location: keyof typeof buildings;
  date: string;
  notes: string;
  image: string;
}

import { Group, Image, ScrollArea, Stack, Text, Title } from "@mantine/core";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import type { Sighting } from "./api";
import ReportPopup from "./components/AddSightingPopup";
import FirstOpen from "./components/FirstOpen";
import { buildings } from "./constants";
import { useAppState } from "./states/app";

import { Icon } from "leaflet";
import peacock from "./assets/noun_Peacock_7981682.svg";
import FilterPill from "./components/FilterPill";

function App() {
  const sightingsQuery = useQuery({
    queryKey: ["sightings"],
    queryFn: () => fetch("/api/sightings").then((res) => res.json() as unknown as Sighting[]),
  });

  const filteredSightings = useAppState(useShallow((state) => state.filteredSightings));
  const setSightings = useAppState(useShallow((state) => state.setSightings));
  const setFilteredSightings = useAppState(useShallow((state) => state.setFilteredSightings));
  const setActiveFilter = useAppState(useShallow((state) => state.setActiveFilter));

  useEffect(() => {
    if (!sightingsQuery.data) return;

    setSightings(sightingsQuery.data);
    setFilteredSightings(sightingsQuery.data);
  }, [sightingsQuery.data]);

  return (
    <>
      <Stack mah="100vh" bg="#096C6C" c="white">
        <Title h={60} ta="center" p="md">
          George Tracker
        </Title>
        <ScrollArea h={40} w="100vw">
          <Group h="100%" wrap="nowrap" px="md">
            <FilterPill
              label="All"
              filter={(sightings) => {
                setFilteredSightings(sightings);
                setActiveFilter("All");
              }}
            />
            <FilterPill
              label="Today"
              filter={(sightings) => {
                setFilteredSightings(sightings.filter((s) => s.date === new Date().toISOString().split("T")[0]));
                setActiveFilter("Today");
              }}
            />
            <FilterPill
              label="This Week"
              filter={(sightings) => {
                setFilteredSightings(sightings.filter((s) => s.date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]));
                setActiveFilter("This Week");
              }}
            />
            <FilterPill
              label="This Month"
              filter={(sightings) => {
                setFilteredSightings(sightings.filter((s) => s.date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]));
                setActiveFilter("This Month");
              }}
            />
            <FilterPill
              label="Past 4 Months"
              filter={(sightings) => {
                setFilteredSightings(
                  sightings.filter((s) => s.date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 * 4).toISOString().split("T")[0]),
                );
                setActiveFilter("Past 4 Months");
              }}
            />
            <FilterPill
              label="This Year"
              filter={(sightings) => {
                setFilteredSightings(sightings.filter((s) => s.date >= new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]));
                setActiveFilter("This Year");
              }}
            />
          </Group>
        </ScrollArea>

        <MapContainer
          center={[48.46312403910019, -123.3121029101059]}
          zoom={17}
          style={{ height: "calc(100vh - 60px - 40px)", width: "100%", zIndex: 1 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredSightings.map((sighting) => (
            <Marker key={sighting.id} position={buildings[sighting.location]} icon={new Icon({ iconUrl: peacock, iconSize: [72, 72] })}>
              <Popup>
                <Text>{sighting.notes}</Text>
                <Text>{sighting.date}</Text>
                {sighting.image && <Image src={"/api" + sighting.image} alt="Sighting" />}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Stack>
      <FirstOpen />
      <ReportPopup></ReportPopup>
    </>
  );
}

export default App;

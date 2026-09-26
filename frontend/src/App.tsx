import { MantineProvider, Stack, Title } from "@mantine/core";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

import ReportPopup from "./components/ReportPopup";
import ViewReportPopup from "./components/ViewReportPopup";

function App() {
  return (
    <MantineProvider>
      <Stack mah="100vh">
        <Title h={60} ta="center" p="md">
          George Tracker
        </Title>
        <MapContainer center={[48.46312403910019, -123.3121029101059]} zoom={17} style={{ height: "calc(100vh - 60px)", width: "100%", zIndex: 1 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ViewReportPopup></ViewReportPopup>
        </MapContainer>
      </Stack>
      <ReportPopup></ReportPopup>
    </MantineProvider>
  );
}

export default App;

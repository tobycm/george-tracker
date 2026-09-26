import peacock from "../assets/noun_Peacock_7981682.svg";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

export default function ViewReportPopup() {
  return (
    <>
      <Marker position={[48.46312403910019, -123.3121029101059]} icon={new Icon({ iconUrl: peacock, iconSize: [72, 72] })}>
        <Popup>
          <script src="getEncounter.js">
          </script>
        </Popup>
      </Marker>
    </>
  );
}
import peacock from "../assets/noun_Peacock_7981682.svg";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function ViewReportPopup() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Marker position={[48.46312403910019, -123.3121029101059]} icon={new Icon({ iconUrl: peacock, iconSize: [72, 72] })}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <Modal opened={opened} onClose={close} title="INSERT LOCATION HERE">

        <button type="submit">Submit</button>

      </Modal>
    </>
  );
}
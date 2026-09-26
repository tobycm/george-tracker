import { Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { ActionIcon, MantineProvider, Stack, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function ReportPopup() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
    <ActionIcon pos="fixed" bottom={10} right={10} style={{ zIndex: 9999 }} size="xl" onClick={open}>
      <IconPlus size={32} />
    </ActionIcon>

    <Modal opened={opened} onClose={close} title="Report sighting" zIndex={10000}>
        {<Select
          label="Location:"
          placeholder="Pick value"
          style={{zIndex: 100000}}
          data={['Bob Wright Centre', 'Business & Economics Building', 'CARSA', 'Campus Services Building (Bookstore/Starbucks/ONECard Office)', 'Centennial Stadium', "Cheko'nien Residence/The Cove", 'Clearihue Building', 'Cluster Housing', 'Continuing Studies Building', 'Cornett Building', 'Craigdarroch Office Building', 'Craigdarroch Residences', 'Cunningham Building', 'David Strong Building', 'David Turpin Building', 'Elliott Building', 'Engineering Lab Wing', 'Engineering/Computer Science Building', 'Family Housing Complex', 'Fine Arts Building', 'Finnerty Gardens', 'First Peoples House', 'Fraser Building', 'Gordon Head Residences', 'Halpern Centre', 'Harry Hickman Building', 'Human & Social Development building', 'Jamie Cassels Centre', 'Lansdowne Residences', 'MacLaurin Building', 'McGill Residences', 'McKinnon Building', 'McPherson Library', 'Medical Sciences Building', 'Michael Williams Building', 'Multifaith Centre', 'Mystic Vale', 'Park Residence', 'Petch Building', 'Phoenix Building', 'Ring Road Residence', 'Saunders Annex', 'Sedgewick Building', 'Sngequ Residence', 'South Tower Residence', 'Student Union Building (SUB)', 'Tower Residence', 'University Club', 'University House 1/2/3/4/5', 'Visual Arts Building']}
          
        />}
      </Modal>
    </>
  );
}
import { Anchor, Button, Group, Image, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

import peacock from "../assets/noun_Peacock_7981682.svg";

export default function FirstOpen() {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
  }, []);
  return (
    <Modal opened={opened} onClose={close}>
      <Stack>
        <Title>Welcome to the George Tracker!</Title>
        <Text>This is your first time using the George Tracker. Please report any sightings of George!</Text>
        <Text truncate>
          Inspired by{" "}
          <Anchor href="https://www.reddit.com/r/uvic/comments/1wpfekq/where_is_george/">
            https://www.reddit.com/r/uvic/comments/1wpfekq/where_is_george/
          </Anchor>
        </Text>
        <Title order={2}>Legend</Title>
        <Group>
          <Image src={peacock} alt="Peacock" w={72} h={72} />
          <Text>Where George was seen</Text>
        </Group>
        <Button variant="filled" style={{ justifySelf: "right" }} onClick={close}>
          OK
        </Button>
      </Stack>
    </Modal>
  );
}

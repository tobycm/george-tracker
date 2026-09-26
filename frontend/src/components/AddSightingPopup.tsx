import { ActionIcon, Button, FileInput, Modal, Select, Stack, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { buildings } from "../constants";

export default function ReportPopup() {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<{
    location: string;
    date: Date | null;
    notes: string;
    image: File | null;
  }>({
    initialValues: {
      location: "",
      date: new Date(),
      notes: "",
      image: null,
    },
    validate: {
      location: (val) => (!val ? "Please select a location" : null),
    },
  });

  return (
    <>
      <ActionIcon pos="fixed" bottom={10} right={10} style={{ zIndex: 2 }} size="xl" onClick={open}>
        <IconPlus size={32} />
      </ActionIcon>

      <Modal opened={opened} onClose={close} title="Report sighting">
        <form
          onSubmit={form.onSubmit(async (values) => {
            setSubmitting(true);
            try {
              const formData = new FormData();
              formData.append("location", values.location);
              formData.append("date", values.date ? dayjs(values.date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD"));
              formData.append("notes", values.notes);
              if (values.image) {
                formData.append("image", values.image);
              }

              const res = await fetch("/api/sightings", {
                method: "POST",
                body: formData,
              });

              if (res.ok) {
                form.reset();
                close();
              }
            } catch (err) {
              console.error("Failed to submit sighting:", err);
            } finally {
              setSubmitting(false);
            }
          })}>
          <Stack gap="md">
            <Select
              label="Location (pick nearest):"
              placeholder="Pick value"
              searchable
              data={Object.keys(buildings)}
              {...form.getInputProps("location")}
            />
            <DatePickerInput label="Date:" firstDayOfWeek={0} maxDate={new Date()} {...form.getInputProps("date")} />
            <TextInput label="Comment (optional):" placeholder="Type a comment here" {...form.getInputProps("notes")} />
            <FileInput
              accept="image/png,image/jpeg,image/tiff,image/bmp,image/heif,image/heic"
              label="Upload a photo (optional):"
              placeholder="Upload"
              clearable
              {...form.getInputProps("image")}
            />
            <Button type="submit" disabled={submitting} loading={submitting}>
              Submit
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

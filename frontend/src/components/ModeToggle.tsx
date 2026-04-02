import { Button, Group } from "@mantine/core";

export type AppMode = "speech" | "qa";

export const ModeToggle = ({
  mode,
  onModeChange,
}: {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}) => {
  return (
    <Group justify="center" gap="sm">
      <Button
        size="md"
        variant={mode === "speech" ? "filled" : "light"}
        color={mode === "speech" ? "violet" : "gray"}
        onClick={() => onModeChange("speech")}
      >
        Speech Recognition
      </Button>
      <Button
        size="md"
        variant={mode === "qa" ? "filled" : "light"}
        color={mode === "qa" ? "violet" : "gray"}
        onClick={() => onModeChange("qa")}
      >
        QA
      </Button>
    </Group>
  );
};

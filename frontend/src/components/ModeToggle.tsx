import { Button, Group } from "@mantine/core";

export type AppMode = "command" | "qa";

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
        variant={mode === "command" ? "filled" : "light"}
        color={mode === "command" ? "violet" : "gray"}
        onClick={() => onModeChange("command")}
      >
        Command Mode
      </Button>
      <Button
        size="md"
        variant={mode === "qa" ? "filled" : "light"}
        color={mode === "qa" ? "violet" : "gray"}
        onClick={() => onModeChange("qa")}
      >
        QA Mode
      </Button>
    </Group>
  );
};

import { Text, Button, Stack, Timeline, ScrollArea } from "@mantine/core";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import type { CommandResult } from "../services/commandExecutor";

interface CommandHistoryProps {
  history: CommandResult[];
  onClear: () => void;
}

export const CommandHistory = ({ history, onClear }: CommandHistoryProps) => {
  if (history.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        No commands executed yet. Start speaking!
      </Text>
    );
  }

  return (
    <ScrollArea h={{ base: 300, sm: 400 }}>
      <Stack gap="md">
        <Button variant="light" size="sm" onClick={onClear} fullWidth>
          Clear History
        </Button>
        <Timeline active={-1} bulletSize={24} lineWidth={2}>
          {history.map((cmd, idx) => (
            <Timeline.Item
              key={idx}
              bullet={
                cmd.success ? (
                  <IconCheck size={12} />
                ) : (
                  <IconAlertCircle size={12} />
                )
              }
              title={<Text fw={500} fz={{ base: "sm", sm: "md" }}>{cmd.action}</Text>}
              color={cmd.success ? "green" : "red"}
            >
              <Text c="dimmed" size="sm" mt={4}>
                "{cmd.command}"
              </Text>
              <Text size="xs" c="dimmed" mt={2}>
                {cmd.timestamp.toLocaleTimeString()}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Stack>
    </ScrollArea>
  );
};

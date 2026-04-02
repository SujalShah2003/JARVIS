import { Text, Card, Stack, SimpleGrid } from "@mantine/core";
import { getSupportedCommands } from "../services/commandExecutor";

export const SupportedCommandsList = () => {
  const commands = getSupportedCommands();

  return (
    <Card withBorder p={{ base: "md", sm: "lg" }} radius='lg'>
      <Stack gap="md">
        <Text fw={500} size="md">Try these commands:</Text>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
          {commands.map((cmd) => (
            <Card key={cmd} withBorder p="sm">
              <code style={{ fontSize: "14px" }}>{cmd}</code>
            </Card>
          ))}
        </SimpleGrid>

        <Text size="sm" c="dimmed" mt="lg">
          💡 Tip: Speak clearly and wait for the beep to know recording stopped.
        </Text>
      </Stack>
    </Card>
  );
};
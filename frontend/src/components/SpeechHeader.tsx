import { Text, Group, Image, Box } from "@mantine/core";

interface SpeechHeaderProps {
  title?: string;
  description?: string;
}

export const SpeechHeader = ({
  title = "Jarvis Voice Assistant",
  description = "Speak commands to open websites, search, and more. Try saying: 'Open YouTube' or 'Search for cute cats on Google'.",
}: SpeechHeaderProps) => {
  return (
    <Box pos="relative" mb="lg">
      <div style={{ textAlign: "center", paddingLeft: "60px" }}>
        <Group gap={20} justify="center" align="center">
          <Image src="/favicon.svg" alt="Jarvis Logo" w={40} h={40} />
          <Text
            fz={{ base: "xl", sm: "30px" }}
            fw={800}
            mb="xs"
            ta="center"
            tt="uppercase"
          >
            {title}
          </Text>
        </Group>
        <Text fz={{ base: "sm", sm: "md" }} c="dimmed" ta="center">
          {description}
        </Text>
      </div>
    </Box>
  );
};

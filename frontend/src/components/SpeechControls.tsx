import { Button, Group, Badge, ThemeIcon, Flex } from "@mantine/core";
import { IconMicrophone, IconMicrophoneOff } from "@tabler/icons-react";

interface SpeechControlsProps {
  isListening: boolean;
  error: string | null;
  hasTranscript: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onClear: () => void;
}

export const SpeechControls = ({
  isListening,
  error,
  hasTranscript,
  onStartListening,
  onStopListening,
  onClear,
}: SpeechControlsProps) => {
  return (
    <>
      {/* Status Badge */}
      <Group justify="space-between">
        <Badge
          size="xl"
          variant={isListening ? "light" : "default"}
          color={isListening ? "red" : "gray"}
          leftSection={
            <ThemeIcon
              size="xs"
              radius="xl"
              variant="light"
              color={isListening ? "red" : "gray"}
            >
              {isListening ? (
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "currentColor",
                  }}
                />
              ) : (
                <div style={{ marginBottom: 2 }}>●</div>
              )}
            </ThemeIcon>
          }
        >
          {isListening ? "Listening..." : "Ready"}
        </Badge>
        {error && <Badge color="red">{error}</Badge>}
      </Group>

      {/* Control Buttons */}
      <Flex gap="sm" wrap={{ base: "wrap", sm: "nowrap" }}>
        <Button
          size="lg"
          leftSection={isListening ? <IconMicrophoneOff /> : <IconMicrophone />}
          onClick={isListening ? onStopListening : onStartListening}
          color={isListening ? "red" : "#9135ff"}
          variant={isListening ? "light" : "filled"}
          fullWidth
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </Button>
        <Button
          size="lg"
          variant="light"
          onClick={onClear}
          disabled={!hasTranscript}
          fullWidth
        >
          Clear
        </Button>
      </Flex>
    </>
  );
};

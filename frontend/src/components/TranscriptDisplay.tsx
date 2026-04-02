import { Text } from "@mantine/core";

interface TranscriptDisplayProps {
  finalTranscript: string;
  interimTranscript: string;
}

export const TranscriptDisplay = ({
  finalTranscript,
  interimTranscript,
}: TranscriptDisplayProps) => {
  return (
    <div style={{ minHeight: "60px" }}>
      {finalTranscript && <Text size="md">{finalTranscript}</Text>}
      {interimTranscript && (
        <Text size="md" c="blue" style={{ fontStyle: "italic" }}>
          {interimTranscript}
        </Text>
      )}
      {!finalTranscript && !interimTranscript && (
        <Text size="md" c="dimmed">
          Click the microphone button and start speaking...
        </Text>
      )}
    </div>
  );
};

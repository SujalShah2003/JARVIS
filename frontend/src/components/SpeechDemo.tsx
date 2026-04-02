import { useEffect } from "react";
import { Container, Paper, Stack, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { parseAndExecuteCommand } from "../services/commandExecutor";
import type { AppMode } from "./ModeToggle";
import { SpeechHeader } from "./SpeechHeader";
import { SpeechControls } from "./SpeechControls";
import { TranscriptDisplay } from "./TranscriptDisplay";
import { SupportedCommandsList } from "./SupportedCommandsList";
import { ModeToggle } from "./ModeToggle";

export const SpeechDemo = ({
  mode,
  onModeChange,
}: {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
}) => {
  const {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    continuous: false,
    language: "en-US",
  });

  useEffect(() => {
    if (transcript && !isListening) {
      const result = parseAndExecuteCommand(transcript);
      if (result) {
        if (result.success && result.url) {
          window.open(result.url, "_blank");
          stopListening();
          resetTranscript();
        }
      }
    }
  }, [transcript, isListening]);

  const handleStartListening = () => {
    resetTranscript();
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
  };

  const handleClearTranscript = () => {
    resetTranscript();
  };

  if (!isSupported) {
    return (
      <Container
        size="md"
        py={40}
        h="100vh"
        style={{
          alignContent: "center",
        }}
      >
        <Alert icon={<IconAlertCircle />} title="Not Supported" color="red">
          Speech Recognition is not supported in your browser. Please use
          Chrome, Firefox, or Edge.
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      size="lg"
      py={{ base: 20, sm: 40 }}
      px={{ base: 20, sm: 40 }}
      h="100vh"
      style={{
        alignContent: "center",
      }}
    >
      <Stack gap="lg">
        <SpeechHeader />

        <ModeToggle mode={mode} onModeChange={onModeChange} />

        {/* Main Control Panel */}
        <Paper shadow="md" p={{ base: "lg", sm: "xl" }} radius="lg">
          <Stack gap="lg">
            <SpeechControls
              isListening={isListening}
              error={error}
              hasTranscript={!!transcript || !!interimTranscript}
              onStartListening={handleStartListening}
              onStopListening={handleStopListening}
              onClear={handleClearTranscript}
            />

            {/* Current Transcript Display */}
            <Paper withBorder p={{ base: "md", sm: "lg" }}>
              <Stack gap="sm">
                <TranscriptDisplay
                  finalTranscript={transcript}
                  interimTranscript={interimTranscript}
                />
              </Stack>
            </Paper>
          </Stack>
        </Paper>

        {/* Supported Commands */}
        <Stack gap="lg">
          <SupportedCommandsList />
        </Stack>
      </Stack>
    </Container>
  );
};

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { chat } from "../services/jarvisApi";
import type { AppMode } from "./ModeToggle";
import { ModeToggle } from "./ModeToggle";
import { SpeechControls } from "./SpeechControls";
import { SpeechHeader } from "./SpeechHeader";

const speak = (text: string) => {
  if (!text.trim()) return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
};

export const QAPanel = ({
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

  const [typed, setTyped] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [isAsking, setIsAsking] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const effectiveQuestion = useMemo(() => {
    const spoken = `${transcript} ${interimTranscript}`.trim();
    return (typed.trim() || spoken).trim();
  }, [typed, transcript, interimTranscript]);

  useEffect(() => {
    if (answer) speak(answer);
  }, [answer]);

  const onAsk = async () => {
    const text = effectiveQuestion;
    if (!text) return;

    setIsAsking(true);
    setApiError(null);
    try {
      const result = await chat(text);
      if (result.error) {
        setApiError(result.error);
        setAnswer("");
      } else {
        setAnswer(result.reply || "");
      }
    } catch (e: any) {
      setApiError(String(e?.message || e));
      setAnswer("");
    } finally {
      setIsAsking(false);
    }
  };

  const handleStartListening = () => {
    resetTranscript();
    startListening();
  };

  const handleClear = () => {
    resetTranscript();
    setTyped("");
    setAnswer("");
    setApiError(null);
    window.speechSynthesis?.cancel?.();
  };

  return (
    <Container size="lg" py={{ base: 20, sm: 40 }} px={{ base: 20, sm: 40 }}>
      <Stack gap="lg">
        <SpeechHeader
          title="Jarvis Q&A"
          description="Ask a question by speaking or typing. Jarvis will reply and speak the answer."
        />

        <ModeToggle mode={mode} onModeChange={onModeChange} />

        {!isSupported ? (
          <Paper shadow="md" p={{ base: "lg", sm: "xl" }} radius="lg">
            <Text c="dimmed">
              Speech Recognition is not supported in your browser. You can still
              type a question.
            </Text>
          </Paper>
        ) : null}

        <Paper shadow="md" p={{ base: "lg", sm: "xl" }} radius="lg">
          <Stack gap="lg">
            <Title order={3}>Q&A</Title>

            <Group align="flex-start" gap="lg" wrap="wrap">
              <Stack style={{ flex: 1, minWidth: 280 }} gap="md">
                <SpeechControls
                  isListening={isListening}
                  error={error}
                  hasTranscript={
                    !!typed.trim() || !!transcript || !!interimTranscript
                  }
                  onStartListening={handleStartListening}
                  onStopListening={stopListening}
                  onClear={handleClear}
                />

                <Textarea
                  label="Type your question"
                  placeholder="e.g. Explain what this app does"
                  minRows={3}
                  value={typed}
                  onChange={(e) => setTyped(e.currentTarget.value)}
                />

                <Button
                  size="lg"
                  color="violet"
                  onClick={onAsk}
                  loading={isAsking}
                  disabled={!effectiveQuestion}
                >
                  Ask
                </Button>
              </Stack>

              <Stack style={{ flex: 1, minWidth: 280 }} gap="md">
                <Paper withBorder p={{ base: "md", sm: "lg" }} radius="lg">
                  <Stack gap="xs">
                    <Text fw={600}>Answer</Text>
                    {apiError ? (
                      <Text c="red">{apiError}</Text>
                    ) : answer ? (
                      <Text>{answer}</Text>
                    ) : (
                      <Text c="dimmed">
                        Ask a question to see the response here.
                      </Text>
                    )}
                  </Stack>
                </Paper>

                <Group justify="space-between">
                  <Button
                    variant="light"
                    onClick={() => speak(answer)}
                    disabled={!answer}
                  >
                    Speak Answer
                  </Button>
                  <Button
                    variant="light"
                    color="gray"
                    onClick={() => window.speechSynthesis?.cancel?.()}
                    disabled={!answer}
                  >
                    Stop Speaking
                  </Button>
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

import { useState, useCallback, useRef, useEffect } from "react";

interface UseSpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

interface ISpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

type SpeechRecognitionErrorCode =
  | "no-speech"
  | "audio-capture"
  | "network"
  | "aborted"
  | "service-not-allowed"
  | "bad-grammar"
  | "unknown";

interface ISpeechRecognitionErrorEvent extends Event {
  error: SpeechRecognitionErrorCode;
}

export const useSpeechRecognition = (options: UseSpeechRecognitionOptions = {}) => {
  const { language = "en-US", continuous = true, interimResults = true } = options;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcriptSegment + " ";
        } else {
          interim += transcriptSegment;
        }
      }

      setInterimTranscript(interim);
      if (final) {
        setTranscript((prev) => prev + final);
      }
    };

    recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [continuous, interimResults, language]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript("");
      setInterimTranscript("");
      setError(null);
      recognitionRef.current.start();
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  return {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
};

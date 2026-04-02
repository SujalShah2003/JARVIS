export interface CommandResult {
  command: string;
  action: string;
  url?: string;
  success: boolean;
  timestamp: Date;
}

const commandPatterns = [
  {
    regex: /open\s+youtube/i,
    action: () => {
      return { action: "Open YouTube", url: "https://www.youtube.com" };
    },
  },
  {
    regex: /open\s+google/i,
    action: () => {
      return { action: "Open Google", url: "https://www.google.com" };
    },
  },
  {
    regex: /open\s+github/i,
    action: () => {
      return { action: "Open GitHub", url: "https://www.github.com" };
    },
  },
  {
    regex: /search\s+(?:on\s+google\s+)?(.*)/i,
    action: (match: string[]) => {
      const query = match[1]?.trim() || "";
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      return { action: `Search: "${query}"`, url };
    },
  },
  {
    regex: /search\s+(?:on\s+youtube\s+)?(.*)/i,
    action: (match: string[]) => {
      const query = match[1]?.trim() || "";
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      return { action: `Search YouTube: "${query}"`, url };
    },
  },
  {
    regex: /(?:react|npm)\s+package\s+(.*)/i,
    action: (match: string[]) => {
      const packageName = match[1]?.trim() || "";
      const url = `https://www.npmjs.com/package/${encodeURIComponent(packageName)}`;
      return { action: `Open npm package: "${packageName}"`, url };
    },
  },
  {
    regex: /github\s+(.*)/i,
    action: (match: string[]) => {
      const query = match[1]?.trim() || "";
      const url = `https://github.com/search?q=${encodeURIComponent(query)}`;
      return { action: `Search GitHub: "${query}"`, url };
    },
  },
  {
    regex: /open\s+github/i,
    action: () => {
      return { action: "Open GitHub", url: "https://www.github.com" };
    },
  },
];

export const parseAndExecuteCommand = (transcript: string): CommandResult | null => {
  if (!transcript.trim()) return null;

  for (const pattern of commandPatterns) {
    const match = transcript.match(pattern.regex);
    if (match) {
      try {
        const result = pattern.action(match);
        return {
          command: transcript,
          ...result,
          success: true,
          timestamp: new Date(),
        };
      } catch (error) {
        console.error("Error executing command:", error);
        return {
          command: transcript,
          action: "Error executing command",
          success: false,
          timestamp: new Date(),
        };
      }
    }
  }

  return {
    command: transcript,
    action: "Command not recognized",
    success: false,
    timestamp: new Date(),
  };
};

export const getSupportedCommands = () => [
  "Open YouTube",
  "Open Google",
  "Open GitHub",
  "Search [query]",
  "Search on Google [query]",
  "Search on YouTube [query]",
  "React package [package name]",
  "GitHub [search query]",
];

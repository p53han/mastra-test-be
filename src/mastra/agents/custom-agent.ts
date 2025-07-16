import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const customAgent = new Agent({
  name: "custom-agent",
  instructions:
    "You are a helpful assistant.",
  model: openai("gpt-4o-mini"),
});
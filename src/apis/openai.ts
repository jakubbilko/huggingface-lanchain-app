import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

const prompt = PromptTemplate.fromTemplate(`
You are a horror writer and your specialty is coming up with short horror stories
based on a simple narration, the stories are no longer than 100 words.

CONTEXT: {desc}
STORY:
`);

const llm = new OpenAI({
  openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export const getStoryFromDescription = async (desc: string) => {
  const chain = new LLMChain({
    llm,
    prompt,
  });

  const result = await chain.run(desc);
  return result;
};

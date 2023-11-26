import { pipeline } from "@xenova/transformers";

const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

export async function getTokens(documents) {
  const sentences = [documents];
  const sentenceEmbeddings = await extractor(sentences);
  const embeddingsArray = sentenceEmbeddings.data;
  return Array.from(embeddingsArray)[0];
}

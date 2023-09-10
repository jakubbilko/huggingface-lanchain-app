import { HfInference } from "@huggingface/inference";

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

export const getImageDescription = async (data: File) => {
  const res = await hf.imageToText({
    data,
    model: "Salesforce/blip-image-captioning-large",
  });
  return res.generated_text;
};

export const getVoiceOver = async (inputs: string) => {
  const res = await hf.textToSpeech({
    inputs,
    model: "espnet/kan-bayashi_ljspeech_vits",
  });

  return res;
};

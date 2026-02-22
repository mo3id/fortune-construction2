import { GoogleGenAI, Modality, Type } from "@google/genai";

const getApiKey = () => process.env.GEMINI_API_KEY || "";

export const geminiService = {
  async generateImage(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: size
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  },

  async editImage(base64Image: string, prompt: string) {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: "image/png",
            },
          },
          { text: prompt },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No edited image generated");
  },

  async generateVideo(prompt: string, imageBase64?: string) {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      image: imageBase64 ? {
        imageBytes: imageBase64.split(',')[1] || imageBase64,
        mimeType: 'image/png',
      } : undefined,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed");

    const response = await fetch(downloadLink, {
      method: 'GET',
      headers: { 'x-goog-api-key': getApiKey() },
    });
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  },

  async generateSpeech(text: string) {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return `data:audio/wav;base64,${base64Audio}`;
    }
    throw new Error("Speech generation failed");
  },

  async chat(message: string) {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite-latest",
      contents: message,
    });
    return response.text;
  }
};

import { GoogleGenerativeAI } from '@google/generative-ai';
import { useStore } from '../store/useStore';

export async function generateResponse(prompt: string): Promise<string> {
  const { settings } = useStore.getState();
  
  if (!settings.apiKey) {
    throw new Error('API key not found');
  }

  try {
    const genAI = new GoogleGenerativeAI(settings.apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response. Please check your API key and try again.');
  }
}
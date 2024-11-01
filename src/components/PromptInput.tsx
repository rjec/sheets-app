import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateResponse } from '../services/gemini';
import { v4 as uuidv4 } from 'uuid';

export function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { activeConversation, updateConversation } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !activeConversation || isLoading) return;

    setIsLoading(true);
    try {
      const response = await generateResponse(prompt);
      const timestamp = Date.now();
      
      const newRow = {
        id: uuidv4(),
        cells: [
          {
            id: uuidv4(),
            content: new Date(timestamp).toLocaleString(),
            type: 'timestamp' as const,
            timestamp,
          },
          {
            id: uuidv4(),
            content: 'User',
            type: 'user' as const,
            timestamp,
          },
          {
            id: uuidv4(),
            content: prompt,
            type: 'data' as const,
            timestamp,
          },
        ],
      };

      const aiRow = {
        id: uuidv4(),
        cells: [
          {
            id: uuidv4(),
            content: new Date(timestamp).toLocaleString(),
            type: 'timestamp' as const,
            timestamp,
          },
          {
            id: uuidv4(),
            content: 'AI',
            type: 'ai' as const,
            timestamp,
          },
          {
            id: uuidv4(),
            content: response,
            type: 'data' as const,
            timestamp,
          },
        ],
      };

      updateConversation({
        ...activeConversation,
        rows: [...activeConversation.rows, newRow, aiRow],
        updatedAt: timestamp,
      });

      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate response. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          disabled={!activeConversation || isLoading}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || !activeConversation || isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {isLoading ? 'Generating...' : 'Send'}
        </button>
      </div>
    </form>
  );
}
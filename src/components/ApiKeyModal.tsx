import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ApiKeyModal() {
  const { settings, setApiKey } = useStore();
  const [key, setKey] = useState(settings.apiKey);
  const [googleClientId, setGoogleClientId] = useState(settings.googleClientId || '');
  const [isVisible, setIsVisible] = useState(!settings.apiKey);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-6">
          <KeyRound className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">API Configuration</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gemini API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Get a Gemini API key
            </a>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google OAuth Client ID (optional)
            </label>
            <input
              type="text"
              value={googleClientId}
              onChange={(e) => setGoogleClientId(e.target.value)}
              placeholder="Enter your Google OAuth Client ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Get a Google OAuth Client ID
            </a>
          </div>
        </div>

        <button
          onClick={() => {
            if (key.trim()) {
              setApiKey(key.trim());
              setIsVisible(false);
            }
          }}
          disabled={!key.trim()}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          Save Configuration
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Your API keys are stored locally in your browser and are never sent to our servers.
        </p>
      </div>
    </div>
  );
}
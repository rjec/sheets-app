import React from 'react';
import { Settings, KeyRound } from 'lucide-react';
import { useStore } from '../store/useStore';
import { GoogleSheetsButton } from './GoogleSheetsButton';

export function Header() {
  const { setApiKey } = useStore();

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="SheetsAI" className="h-8 w-8" />
        <h1 className="text-xl font-semibold">SheetsAI</h1>
      </div>
      <div className="flex items-center gap-4">
        <GoogleSheetsButton />
        <button
          onClick={() => setApiKey('')}
          className="p-2 hover:bg-gray-100 rounded-full"
          title="Change API Key"
        >
          <KeyRound className="w-5 h-5" />
        </button>
        <a
          href="https://github.com/yourusername/sheets-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
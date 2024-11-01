import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Spreadsheet } from './components/Spreadsheet';
import { PromptInput } from './components/PromptInput';
import { ApiKeyModal } from './components/ApiKeyModal';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden">
            <Spreadsheet />
          </div>
          <PromptInput />
        </div>
      </div>
      <ApiKeyModal />
    </div>
  );
}

export default App;
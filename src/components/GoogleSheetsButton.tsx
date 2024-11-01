import React, { useState } from 'react';
import { FileSpreadsheet, Link2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { initGoogleSheetsApi, createSpreadsheet, syncRowsToSheet } from '../services/sheets';

export function GoogleSheetsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { activeConversation, updateConversation, settings } = useStore();

  const handleLinkSheet = async () => {
    if (!activeConversation || !settings.googleClientId || isLoading) return;

    setIsLoading(true);
    try {
      await initGoogleSheetsApi(settings.googleClientId);
      
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await gapi.auth2.getAuthInstance().signIn();
      }

      const { id, url } = await createSpreadsheet(activeConversation.title);
      await syncRowsToSheet(id, activeConversation.rows);

      updateConversation({
        ...activeConversation,
        spreadsheetId: id,
        spreadsheetUrl: url,
      });

    } catch (error) {
      console.error('Error linking Google Sheet:', error);
      alert('Failed to link Google Sheet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!settings.googleClientId) return null;

  return activeConversation?.spreadsheetUrl ? (
    <a
      href={activeConversation.spreadsheetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
    >
      <FileSpreadsheet className="w-4 h-4" />
      View Sheet
    </a>
  ) : (
    <button
      onClick={handleLinkSheet}
      disabled={isLoading || !activeConversation}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
    >
      <Link2 className="w-4 h-4" />
      {isLoading ? 'Linking...' : 'Link to Sheets'}
    </button>
  );
}
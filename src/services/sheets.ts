import { gapi } from 'gapi-script';
import { useStore } from '../store/useStore';
import { Row } from '../types';

const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

export async function initGoogleSheetsApi(clientId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init({
          clientId,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function createSpreadsheet(title: string): Promise<{ id: string; url: string }> {
  const response = await gapi.client.sheets.spreadsheets.create({
    resource: {
      properties: {
        title,
      },
      sheets: [
        {
          properties: {
            title: 'Conversation',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
        },
      ],
    },
  });

  return {
    id: response.result.spreadsheetId!,
    url: response.result.spreadsheetUrl!,
  };
}

export async function syncRowsToSheet(spreadsheetId: string, rows: Row[]): Promise<void> {
  const values = rows.map(row => 
    row.cells.map(cell => 
      cell.type === 'timestamp' 
        ? new Date(cell.timestamp).toLocaleString() 
        : cell.content
    )
  );

  // Add header row if this is the first sync
  if (values.length === 0) {
    values.unshift(['Timestamp', 'Type', 'Content']);
  }

  await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Conversation!A1',
    valueInputOption: 'USER_ENTERED',
    resource: { values },
  });
}
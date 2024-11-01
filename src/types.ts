export interface Cell {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'data';
  timestamp: number;
}

export interface Row {
  id: string;
  cells: Cell[];
}

export interface Conversation {
  id: string;
  title: string;
  rows: Row[];
  createdAt: number;
  updatedAt: number;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
}

export interface Settings {
  apiKey: string;
  googleClientId?: string;
}
import React from 'react';
import { useStore } from '../store/useStore';

export function Spreadsheet() {
  const { activeConversation } = useStore();

  if (!activeConversation) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Create a new conversation or select an existing one to get started
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-4 py-2 w-32">Timestamp</th>
            <th className="border px-4 py-2 w-24">Type</th>
            <th className="border px-4 py-2">Content</th>
          </tr>
        </thead>
        <tbody>
          {activeConversation.rows.map((row) => (
            <tr key={row.id}>
              {row.cells.map((cell) => (
                <td
                  key={cell.id}
                  className={`border px-4 py-2 ${
                    cell.type === 'ai' ? 'bg-blue-50' : ''
                  }`}
                >
                  {cell.type === 'timestamp'
                    ? new Date(cell.timestamp).toLocaleString()
                    : cell.content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
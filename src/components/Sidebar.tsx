import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Conversation } from '../types';
import { v4 as uuidv4 } from 'uuid';

export function Sidebar() {
  const { conversations, activeConversation, setActiveConversation, addConversation, deleteConversation } = useStore();

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: `Conversation ${conversations.length + 1}`,
      rows: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addConversation(newConversation);
  };

  return (
    <div className="w-64 border-r bg-gray-50 flex flex-col h-full">
      <div className="p-4">
        <button
          onClick={createNewConversation}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Conversation
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-3 cursor-pointer flex items-center justify-between hover:bg-gray-100 ${
              activeConversation?.id === conversation.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => setActiveConversation(conversation)}
          >
            <span className="truncate">{conversation.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteConversation(conversation.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
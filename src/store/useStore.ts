import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Conversation, Settings } from '../types';

interface State {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  settings: Settings;
  setApiKey: (apiKey: string) => void;
  setActiveConversation: (conversation: Conversation) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (conversation: Conversation) => void;
  deleteConversation: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      conversations: [],
      activeConversation: null,
      settings: {
        apiKey: '',
      },
      setApiKey: (apiKey) =>
        set((state) => ({
          settings: {
            ...state.settings,
            apiKey,
          },
        })),
      setActiveConversation: (conversation) =>
        set({ activeConversation: conversation }),
      addConversation: (conversation) =>
        set((state) => ({
          conversations: [...state.conversations, conversation],
          activeConversation: conversation,
        })),
      updateConversation: (conversation) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversation.id ? conversation : c
          ),
          activeConversation:
            state.activeConversation?.id === conversation.id
              ? conversation
              : state.activeConversation,
        })),
      deleteConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          activeConversation:
            state.activeConversation?.id === id ? null : state.activeConversation,
        })),
    }),
    {
      name: 'sheets-ai-storage',
    }
  )
);
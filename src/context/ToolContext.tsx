import React, { createContext, useContext, useReducer } from 'react';
import { ToolState } from '../types';

// Initial state for tool selection
const initialState: ToolState = {
  activeTool: 'select',
  isDrawing: false,
};

// Actions for the tool reducer
type ToolAction =
  | { type: 'SET_ACTIVE_TOOL'; tool: 'select' | 'rectangle' | 'circle' | 'text' | 'container' }
  | { type: 'SET_DRAWING'; isDrawing: boolean };

// Tool reducer function
const toolReducer = (state: ToolState, action: ToolAction): ToolState => {
  switch (action.type) {
    case 'SET_ACTIVE_TOOL':
      return {
        ...state,
        activeTool: action.tool,
      };
    case 'SET_DRAWING':
      return {
        ...state,
        isDrawing: action.isDrawing,
      };
    default:
      return state;
  }
};

// Create context
interface ToolContextType {
  state: ToolState;
  dispatch: React.Dispatch<ToolAction>;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

// Tool provider component
export const ToolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(toolReducer, initialState);

  return (
    <ToolContext.Provider value={{ state, dispatch }}>
      {children}
    </ToolContext.Provider>
  );
};

// Hook to use the tool context
export const useTool = () => {
  const context = useContext(ToolContext);
  if (context === undefined) {
    throw new Error('useTool must be used within a ToolProvider');
  }
  return context;
};
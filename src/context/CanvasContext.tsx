import React, { createContext, useContext, useReducer } from 'react';
import { CanvasState, CanvasElement } from '../types';

// Initial state for the canvas
const initialState: CanvasState = {
  elements: [],
  selectedElementId: null,
  history: {
    past: [],
    future: [],
  },
  scale: 1,
  offset: { x: 0, y: 0 },
};

// Actions for the canvas reducer
type CanvasAction =
  | { type: 'ADD_ELEMENT'; element: CanvasElement }
  | { type: 'UPDATE_ELEMENT'; element: CanvasElement }
  | { type: 'DELETE_ELEMENT'; id: string }
  | { type: 'SELECT_ELEMENT'; id: string | null }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET_SCALE'; scale: number }
  | { type: 'SET_OFFSET'; offset: { x: number; y: number } };

// Canvas reducer function
const canvasReducer = (state: CanvasState, action: CanvasAction): CanvasState => {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const newElements = [...state.elements, action.element];
      return {
        ...state,
        elements: newElements,
        selectedElementId: action.element.id,
        history: {
          past: [...state.history.past, state.elements],
          future: [],
        },
      };
    }
    case 'UPDATE_ELEMENT': {
      const newElements = state.elements.map((el) =>
        el.id === action.element.id ? action.element : el
      );
      return {
        ...state,
        elements: newElements,
        history: {
          past: [...state.history.past, state.elements],
          future: [],
        },
      };
    }
    case 'DELETE_ELEMENT': {
      const newElements = state.elements.filter((el) => el.id !== action.id);
      return {
        ...state,
        elements: newElements,
        selectedElementId: null,
        history: {
          past: [...state.history.past, state.elements],
          future: [],
        },
      };
    }
    case 'SELECT_ELEMENT': {
      return {
        ...state,
        selectedElementId: action.id,
      };
    }
    case 'UNDO': {
      if (state.history.past.length === 0) return state;
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, state.history.past.length - 1);
      return {
        ...state,
        elements: previous,
        history: {
          past: newPast,
          future: [state.elements, ...state.history.future],
        },
      };
    }
    case 'REDO': {
      if (state.history.future.length === 0) return state;
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      return {
        ...state,
        elements: next,
        history: {
          past: [...state.history.past, state.elements],
          future: newFuture,
        },
      };
    }
    case 'SET_SCALE': {
      return {
        ...state,
        scale: action.scale,
      };
    }
    case 'SET_OFFSET': {
      return {
        ...state,
        offset: action.offset,
      };
    }
    default:
      return state;
  }
};

// Create context
interface CanvasContextType {
  state: CanvasState;
  dispatch: React.Dispatch<CanvasAction>;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// Canvas provider component
export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(canvasReducer, initialState);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

// Hook to use the canvas context
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};
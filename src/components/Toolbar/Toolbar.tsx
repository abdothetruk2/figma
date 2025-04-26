import React from 'react';
import { useTool } from '../../context/ToolContext';
import { useCanvas } from '../../context/CanvasContext';
import { MousePointer, Square, Circle, Type, Trash2, Undo, Redo, ZoomIn, ZoomOut, Layout } from 'lucide-react';

const Toolbar: React.FC = () => {
  const { state, dispatch } = useTool();
  const { state: canvasState, dispatch: canvasDispatch } = useCanvas();
  
  const handleToolSelect = (tool: 'select' | 'rectangle' | 'circle' | 'text' | 'container') => {
    dispatch({ type: 'SET_ACTIVE_TOOL', tool });
  };
  
  const handleDelete = () => {
    if (canvasState.selectedElementId) {
      canvasDispatch({ type: 'DELETE_ELEMENT', id: canvasState.selectedElementId });
    }
  };
  
  const handleUndo = () => {
    canvasDispatch({ type: 'UNDO' });
  };
  
  const handleRedo = () => {
    canvasDispatch({ type: 'REDO' });
  };
  
  const handleZoomIn = () => {
    canvasDispatch({ type: 'SET_SCALE', scale: Math.min(canvasState.scale + 0.1, 3) });
  };
  
  const handleZoomOut = () => {
    canvasDispatch({ type: 'SET_SCALE', scale: Math.max(canvasState.scale - 0.1, 0.5) });
  };
  
  const ToolButton: React.FC<{
    tool: 'select' | 'rectangle' | 'circle' | 'text' | 'container' | 'delete' | 'undo' | 'redo' | 'zoomIn' | 'zoomOut';
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
    shortcut?: string;
  }> = ({ tool, icon, onClick, isActive = false, shortcut }) => (
    <button
      className={`p-2 rounded-md transition-colors duration-200 relative group ${
        isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
      }`}
      onClick={onClick}
      title={`${tool.charAt(0).toUpperCase() + tool.slice(1)}${shortcut ? ` (${shortcut})` : ''}`}
    >
      {icon}
      {shortcut && (
        <span className="absolute bottom-0 right-0 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100">
          {shortcut}
        </span>
      )}
    </button>
  );
  
  return (
    <div className="flex flex-col p-2 bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col space-y-1 mb-4">
        <ToolButton 
          tool="select"
          icon={<MousePointer size={20} />}
          onClick={() => handleToolSelect('select')}
          isActive={state.activeTool === 'select'}
          shortcut="V"
        />
        <ToolButton 
          tool="container"
          icon={<Layout size={20} />}
          onClick={() => handleToolSelect('container')}
          isActive={state.activeTool === 'container'}
          shortcut="N"
        />
        <ToolButton 
          tool="rectangle"
          icon={<Square size={20} />}
          onClick={() => handleToolSelect('rectangle')}
          isActive={state.activeTool === 'rectangle'}
          shortcut="R"
        />
        <ToolButton 
          tool="circle"
          icon={<Circle size={20} />}
          onClick={() => handleToolSelect('circle')}
          isActive={state.activeTool === 'circle'}
          shortcut="C"
        />
        <ToolButton 
          tool="text"
          icon={<Type size={20} />}
          onClick={() => handleToolSelect('text')}
          isActive={state.activeTool === 'text'}
          shortcut="T"
        />
      </div>
      
      <div className="flex flex-col space-y-1 mb-4">
        <ToolButton 
          tool="delete"
          icon={<Trash2 size={20} />}
          onClick={handleDelete}
          shortcut="Del"
        />
      </div>
      
      <div className="flex flex-col space-y-1 mb-4">
        <ToolButton 
          tool="undo"
          icon={<Undo size={20} />}
          onClick={handleUndo}
          shortcut="⌘Z"
        />
        <ToolButton 
          tool="redo"
          icon={<Redo size={20} />}
          onClick={handleRedo}
          shortcut="⌘⇧Z"
        />
      </div>
      
      <div className="flex flex-col space-y-1">
        <ToolButton 
          tool="zoomIn"
          icon={<ZoomIn size={20} />}
          onClick={handleZoomIn}
          shortcut="⌘+"
        />
        <ToolButton 
          tool="zoomOut"
          icon={<ZoomOut size={20} />}
          onClick={handleZoomOut}
          shortcut="⌘-"
        />
        <div className="text-center text-xs text-gray-500 mt-1">
          {Math.round(canvasState.scale * 100)}%
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
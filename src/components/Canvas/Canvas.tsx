import React, { useRef, useEffect, useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { useTool } from '../../context/ToolContext';
import CanvasElement from './CanvasElement';
import { v4 as uuidv4 } from 'uuid';

const Canvas: React.FC = () => {
  const { state, dispatch } = useCanvas();
  const { state: toolState, dispatch: toolDispatch } = useTool();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    elementId?: string;
  }>({ show: false, x: 0, y: 0 });

  // Track container elements for quick access
  const containerElements = state.elements.filter(el => el.type === 'container');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isEditing) return;
      
      if (e.key === 'v') {
        toolDispatch({ type: 'SET_ACTIVE_TOOL', tool: 'select' });
      } else if (e.key === 'r') {
        toolDispatch({ type: 'SET_ACTIVE_TOOL', tool: 'rectangle' });
      } else if (e.key === 'c') {
        toolDispatch({ type: 'SET_ACTIVE_TOOL', tool: 'circle' });
      } else if (e.key === 't') {
        toolDispatch({ type: 'SET_ACTIVE_TOOL', tool: 'text' });
      } else if (e.key === 'n') {
        toolDispatch({ type: 'SET_ACTIVE_TOOL', tool: 'container' });
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (state.selectedElementId) {
          dispatch({ type: 'DELETE_ELEMENT', id: state.selectedElementId });
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        dispatch({ type: 'UNDO' });
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        dispatch({ type: 'REDO' });
      } else if (e.key === ' ' && !isPanning) {
        setIsPanning(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setIsPanning(false);
      }
    };

    const handleClickOutside = () => {
      setContextMenu({ show: false, x: 0, y: 0 });
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [state.selectedElementId, dispatch, toolDispatch, isEditing, isPanning]);

  const findElementAtPosition = (x: number, y: number, elements: any[], scale: number = 1, parentOffset = { x: 0, y: 0 }) => {
    // First check Bootstrap components
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (!el.position || !el.style) continue;

      const absX = (el.position.x || 0) + parentOffset.x;
      const absY = (el.position.y || 0) + parentOffset.y;

      // Check if the element has Bootstrap content
      if (el.content?.includes('class="') || el.type === 'bootstrap') {
        const isInside = (
          x >= absX * scale &&
          x <= (absX + el.style.width) * scale &&
          y >= absY * scale &&
          y <= (absY + el.style.height) * scale
        );

        if (isInside) {
          // Check for clickable elements within Bootstrap components
          if (el.content && !isDragging) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = el.content;
            const clickableElements = tempDiv.querySelectorAll('button, input, a, .nav-link, .dropdown-item');
            
            // If we found clickable elements and we're in edit mode, return null to allow interaction
            if (clickableElements.length > 0 && isEditing) {
              return null;
            }
          }
          return { ...el, absolutePosition: { x: absX, y: absY } };
        }
      }
    }

    // Then check regular elements and containers
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (!el.position || !el.style) continue;

      const absX = (el.position.x || 0) + parentOffset.x;
      const absY = (el.position.y || 0) + parentOffset.y;

      const isInside = (
        x >= absX * scale &&
        x <= (absX + el.style.width) * scale &&
        y >= absY * scale &&
        y <= (absY + el.style.height) * scale
      );

      if (isInside) {
        // Check children first
        if (el.children?.length) {
          const childElement = findElementAtPosition(x, y, el.children, scale, { x: absX, y: absY });
          if (childElement) return childElement;
        }

        // If no child was clicked and this is a container, return the container
        if (el.type === 'container' || el.content?.includes('class="container"')) {
          return { ...el, absolutePosition: { x: absX, y: absY } };
        }

        return { ...el, absolutePosition: { x: absX, y: absY } };
      }
    }
    return null;
  };

  const findContainersForElement = (elementId: string) => {
    const element = state.elements.find(el => el.id === elementId);
    if (!element) return [];

    return containerElements.filter(container => {
      if (container.id === elementId) return false;
      const isChild = isElementChildOf(container.id, elementId, state.elements);
      if (isChild) return false;
      return true;
    });
  };

  const isElementChildOf = (elementId: string, parentId: string, elements: any[]): boolean => {
    const parent = elements.find(el => el.id === parentId);
    if (!parent || !parent.children) return false;

    if (parent.children.some((child: any) => child.id === elementId)) {
      return true;
    }

    return parent.children.some((child: any) => 
      isElementChildOf(elementId, child.id, parent.children)
    );
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / state.scale - state.offset.x;
    const y = (e.clientY - rect.top) / state.scale - state.offset.y;
    
    const clickedElement = findElementAtPosition(x, y, state.elements);
    
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      elementId: clickedElement?.id,
    });
  };

  const handleAddToContainer = () => {
    if (!contextMenu.elementId || !state.selectedElementId) return;

    const container = state.elements.find(el => el.id === contextMenu.elementId);
    const element = state.elements.find(el => el.id === state.selectedElementId);

    if (!container || !element || container.type !== 'container') return;

    const updatedElement = {
      ...element,
      position: {
        x: (element.position?.x || 0) - (container.position?.x || 0),
        y: (element.position?.y || 0) - (container.position?.y || 0),
      },
    };

    const updatedContainer = {
      ...container,
      children: [...(container.children || []), updatedElement],
    };

    dispatch({ type: 'UPDATE_ELEMENT', element: updatedContainer });
    dispatch({ type: 'DELETE_ELEMENT', id: element.id });
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const handleMakeContainer = () => {
    if (!contextMenu.elementId) return;

    const element = state.elements.find(el => el.id === contextMenu.elementId);
    if (!element) return;

    const updatedElement = {
      ...element,
      type: 'container',
      children: element.children || [],
      style: {
        ...element.style,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        boxShadow: {
          ...element.style.boxShadow,
          offsetY: 4,
          blurRadius: 8,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        backdropFilter: {
          blur: 4,
          brightness: 100,
        }
      }
    };

    dispatch({ type: 'UPDATE_ELEMENT', element: updatedElement });
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const handleRemoveFromContainer = () => {
    if (!contextMenu.elementId) return;

    const parentContainer = state.elements.find(el => 
      el.children?.some((child: any) => child.id === contextMenu.elementId)
    );

    if (!parentContainer) return;

    const childElement = parentContainer.children?.find((child: any) => child.id === contextMenu.elementId);
    if (!childElement) return;

    const newElement = {
      ...childElement,
      id: uuidv4(),
      position: {
        x: (parentContainer.position?.x || 0) + (childElement.position?.x || 0),
        y: (parentContainer.position?.y || 0) + (childElement.position?.y || 0),
      },
    };

    const updatedContainer = {
      ...parentContainer,
      children: parentContainer.children?.filter((child: any) => child.id !== contextMenu.elementId),
    };

    dispatch({ type: 'UPDATE_ELEMENT', element: updatedContainer });
    dispatch({ type: 'ADD_ELEMENT', element: newElement });
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / state.scale - state.offset.x;
    const y = (e.clientY - rect.top) / state.scale - state.offset.y;
    
    if (isPanning) {
      setPanStart({ x: e.clientX, y: e.clientY });
      return;
    }

    if (toolState.activeTool === 'select') {
      const clickedElement = findElementAtPosition(x, y, state.elements);
      
      if (clickedElement) {
        dispatch({ type: 'SELECT_ELEMENT', id: clickedElement.id });
        setIsDragging(true);
        
        if (clickedElement.absolutePosition) {
          setDragOffset({
            x: x - clickedElement.absolutePosition.x,
            y: y - clickedElement.absolutePosition.y
          });
        } else {
          setDragOffset({
            x: x - (clickedElement.position?.x || 0),
            y: y - (clickedElement.position?.y || 0)
          });
        }
      } else {
        dispatch({ type: 'SELECT_ELEMENT', id: null });
      }
    } else if (toolState.activeTool === 'text') {
      const newElement = {
        id: uuidv4(),
        type: 'text',
        position: { x, y },
        style: {
          width: 200,
          height: 40,
          backgroundColor: 'transparent',
          borderRadius: 0,
          boxShadow: {
            offsetX: 0,
            offsetY: 0,
            blurRadius: 0,
            spreadRadius: 0,
            color: 'transparent',
            inset: false,
          },
          opacity: 1,
          transform: '',
          zIndex: state.elements.length,
          gradient: null,
          filter: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturate: 100,
          },
          backdropFilter: {
            blur: 0,
            brightness: 100,
          },
          font: {
            family: 'Inter',
            size: 16,
            weight: 400,
            color: '#000000',
          },
        },
        content: 'Double click to edit',
      };
      dispatch({ type: 'ADD_ELEMENT', element: newElement });
    } else if (toolState.activeTool === 'container') {
      const newContainer = {
        id: uuidv4(),
        type: 'container',
        position: { x, y },
        style: {
          width: 400,
          height: 300,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 8,
          boxShadow: {
            offsetX: 0,
            offsetY: 4,
            blurRadius: 8,
            spreadRadius: 0,
            color: 'rgba(0, 0, 0, 0.1)',
            inset: false,
          },
          opacity: 1,
          transform: '',
          zIndex: state.elements.length,
          gradient: null,
          filter: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturate: 100,
          },
          backdropFilter: {
            blur: 4,
            brightness: 100,
          },
        },
        children: [],
      };
      dispatch({ type: 'ADD_ELEMENT', element: newContainer });
    } else {
      setStartPosition({ x, y });
      toolDispatch({ type: 'SET_DRAWING', isDrawing: true });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / state.scale - state.offset.x;
    const y = (e.clientY - rect.top) / state.scale - state.offset.y;

    if (isPanning && panStart) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      dispatch({ 
        type: 'SET_OFFSET', 
        offset: { 
          x: state.offset.x + dx / state.scale, 
          y: state.offset.y + dy / state.scale 
        } 
      });
      setPanStart({ x: e.clientX, y: e.clientY });
      return;
    }

    if (isDragging && state.selectedElementId) {
      const selectedElement = state.elements.find(el => el.id === state.selectedElementId);
      
      if (selectedElement) {
        const parentContainer = state.elements.find(el => 
          el.children?.some((child: any) => child.id === state.selectedElementId)
        );

        if (parentContainer) {
          const childElement = parentContainer.children?.find((child: any) => child.id === state.selectedElementId);
          const updatedChild = {
            ...childElement,
            position: {
              x: x - dragOffset.x - (parentContainer.position?.x || 0),
              y: y - dragOffset.y - (parentContainer.position?.y || 0)
            }
          };
          
          const updatedChildren = parentContainer.children?.map((child: any) => 
            child.id === state.selectedElementId ? updatedChild : child
          );
          
          const updatedContainer = {
            ...parentContainer,
            children: updatedChildren
          };
          
          dispatch({ type: 'UPDATE_ELEMENT', element: updatedContainer });
        } else {
          const updatedElement = {
            ...selectedElement,
            position: {
              x: x - dragOffset.x,
              y: y - dragOffset.y
            }
          };
          dispatch({ type: 'UPDATE_ELEMENT', element: updatedElement });
        }
      }
    } else if (startPosition && toolState.isDrawing) {
      const width = Math.abs(x - startPosition.x);
      const height = Math.abs(y - startPosition.y);
      const left = Math.min(x, startPosition.x);
      const top = Math.min(y, startPosition.y);

      const element = state.elements.find(el => el.id === 'temp');
      const newElement = {
        id: element ? element.id : 'temp',
        type: toolState.activeTool,
        position: { x: left, y: top },
        style: {
          width,
          height,
          backgroundColor: '#E2E8F0',
          borderRadius: toolState.activeTool === 'circle' ? Math.max(width, height) : 0,
          boxShadow: {
            offsetX: 0,
            offsetY: 2,
            blurRadius: 4,
            spreadRadius: 0,
            color: 'rgba(0, 0, 0, 0.1)',
            inset: false,
          },
          opacity: 1,
          transform: '',
          zIndex: state.elements.length,
          gradient: null,
          filter: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturate: 100,
          },
          backdropFilter: {
            blur: 0,
            brightness: 100,
          },
        },
      };

      if (element) {
        dispatch({ type: 'UPDATE_ELEMENT', element: newElement });
      } else {
        dispatch({ type: 'ADD_ELEMENT', element: newElement });
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (toolState.isDrawing) {
      const tempElement = state.elements.find(el => el.id === 'temp');
      if (tempElement) {
        const finalElement = {
          ...tempElement,
          id: uuidv4(),
        };
        dispatch({ type: 'DELETE_ELEMENT', id: 'temp' });
        dispatch({ type: 'ADD_ELEMENT', element: finalElement });
      }
      toolDispatch({ type: 'SET_DRAWING', isDrawing: false });
    }
    setStartPosition(null);
    setIsDragging(false);
    setPanStart({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    if (toolState.isDrawing) {
      dispatch({ type: 'DELETE_ELEMENT', id: 'temp' });
      toolDispatch({ type: 'SET_DRAWING', isDrawing: false });
    }
    setStartPosition(null);
    setIsDragging(false);
    setPanStart({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(state.scale * delta, 0.1), 5);
      
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const mouseX = (e.clientX - rect.left) / state.scale;
      const mouseY = (e.clientY - rect.top) / state.scale;
      
      const newOffset = {
        x: mouseX - (mouseX - state.offset.x) * (newScale / state.scale),
        y: mouseY - (mouseY - state.offset.y) * (newScale / state.scale),
      };
      
      dispatch({ type: 'SET_SCALE', scale: newScale });
      dispatch({ type: 'SET_OFFSET', offset: newOffset });
    } else {
      const newOffset = {
        x: state.offset.x - e.deltaX / state.scale,
        y: state.offset.y - e.deltaY / state.scale,
      };
      dispatch({ type: 'SET_OFFSET', offset: newOffset });
    }
  };

  return (
    <div 
      ref={canvasRef}
      className={`relative w-full h-full overflow-hidden bg-gray-50 ${isPanning ? 'cursor-grab' : 'cursor-crosshair'}`}
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
        backgroundSize: `${20 * state.scale}px ${20 * state.scale}px`,
        backgroundPosition: `${state.offset.x * state.scale}px ${state.offset.y * state.scale}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onContextMenu={handleContextMenu}
    >
      <div
        className="absolute"
        style={{
          transform: `scale(${state.scale}) translate(${state.offset.x}px, ${state.offset.y}px)`,
          transformOrigin: '0 0',
        }}
      >
        {state.elements.map((element) => (
          <CanvasElement
            key={element.id}
            element={element}
            isSelected={state.selectedElementId === element.id}
            isEditing={isEditing}
            onStartEditing={() => setIsEditing(true)}
            onFinishEditing={() => setIsEditing(false)}
          />
        ))}
      </div>

      {contextMenu.show && (
        <div
          className="fixed bg-white rounded-lg shadow-lg py-1 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          {contextMenu.elementId && state.selectedElementId && (
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
              onClick={handleAddToContainer}
              disabled={state.elements.find(el => el.id === contextMenu.elementId)?.type !== 'container'}
            >
              Add to Container
            </button>
          )}
          
          {contextMenu.elementId && (
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
              onClick={handleMakeContainer}
            >
              Convert to Container
            </button>
          )}
          
          {contextMenu.elementId && isElementChildOf(contextMenu.elementId, '', state.elements) && (
            <button
              className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
              onClick={handleRemoveFromContainer}
            >
              Remove from Container
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Canvas;
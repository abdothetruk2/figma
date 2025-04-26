import React, { useState, useRef, useEffect } from 'react';
import { CanvasElement as CanvasElementType } from '../../types';
import { useCanvas } from '../../context/CanvasContext';
import { generateCSSObject } from '../../utils/cssGenerator';

interface CanvasElementProps {
  element: CanvasElementType;
  isSelected: boolean;
  isEditing: boolean;
  onStartEditing: () => void;
  onFinishEditing: () => void;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ 
  element, 
  isSelected,
  isEditing,
  onStartEditing,
  onFinishEditing
}) => {
  const { dispatch } = useCanvas();
  const { id, type, position = { x: 0, y: 0 }, style, content, children } = element;
  const [resizeType, setResizeType] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startDims, setStartDims] = useState({ width: 0, height: 0 });
  const [isTextEditing, setIsTextEditing] = useState(false);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Convert style to CSS properties
  const cssProperties = generateCSSObject(style);
  
  // Additional styling for selected elements
  const selectedStyles = isSelected ? {
    outline: '2px solid #3B82F6',
    outlineOffset: '2px',
  } : {};

  // Add container-specific styles
  const containerStyles = type === 'container' ? {
    border: isSelected ? '2px solid #3B82F6' : '1px dashed #94a3b8'
  } : {};

  // Handle text editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTextEditing(true);
    onStartEditing();

    // For Bootstrap components, make them editable
    if (elementRef.current) {
      const inputs = elementRef.current.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
      });

      const buttons = elementRef.current.querySelectorAll('button');
      buttons.forEach(button => {
        button.removeAttribute('disabled');
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedElement = {
      ...element,
      content: e.target.value,
    };
    dispatch({ type: 'UPDATE_ELEMENT', element: updatedElement });
  };

  const handleTextBlur = () => {
    setIsTextEditing(false);
    onFinishEditing();
  };

  useEffect(() => {
    if (isTextEditing && textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.select();
    }
  }, [isTextEditing]);

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    setResizeType(type);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartDims({ width: style.width, height: style.height });
  };

  // Handle resize
  const handleResize = (e: MouseEvent) => {
    if (!resizeType) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    let newWidth = startDims.width;
    let newHeight = startDims.height;

    switch (resizeType) {
      case 'e':
        newWidth = startDims.width + dx;
        break;
      case 'w':
        newWidth = startDims.width - dx;
        break;
      case 's':
        newHeight = startDims.height + dy;
        break;
      case 'n':
        newHeight = startDims.height - dy;
        break;
      case 'se':
        newWidth = startDims.width + dx;
        newHeight = startDims.height + dy;
        break;
      case 'sw':
        newWidth = startDims.width - dx;
        newHeight = startDims.height + dy;
        break;
      case 'ne':
        newWidth = startDims.width + dx;
        newHeight = startDims.height - dy;
        break;
      case 'nw':
        newWidth = startDims.width - dx;
        newHeight = startDims.height - dy;
        break;
    }

    // Update element dimensions
    const updatedElement = {
      ...element,
      style: {
        ...style,
        width: Math.max(20, newWidth),
        height: Math.max(20, newHeight),
      },
    };

    dispatch({ type: 'UPDATE_ELEMENT', element: updatedElement });
  };

  // Handle resize end
  const handleResizeEnd = () => {
    setResizeType(null);
  };

  // Add resize event listeners
  React.useEffect(() => {
    if (resizeType) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizeType, startPos, startDims]);

  return (
    <div
      ref={elementRef}
      className={`absolute ${type === 'circle' ? 'rounded-full' : ''} select-none transition-shadow duration-150`}
      style={{
        ...cssProperties,
        left: `${position.x}px`,
        top: `${position.y}px`,
        ...selectedStyles,
        ...containerStyles,
      }}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: 'SELECT_ELEMENT', id });
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Text editing mode */}
      {isTextEditing ? (
        <textarea
          ref={textInputRef}
          className="w-full h-full bg-transparent resize-none outline-none p-0 m-0 border-none"
          style={{
            fontFamily: style.font?.family,
            fontSize: `${style.font?.size}px`,
            fontWeight: style.font?.weight,
            color: style.font?.color,
          }}
          value={content || ''}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
        />
      ) : (
        content && <div dangerouslySetInnerHTML={{ __html: content }} />
      )}
      
      {/* Render children if they exist */}
      {children?.map((child) => (
        <CanvasElement
          key={child.id}
          element={child}
          isSelected={isSelected}
          isEditing={isEditing}
          onStartEditing={onStartEditing}
          onFinishEditing={onFinishEditing}
        />
      ))}
      
      {/* Resize handles */}
      {isSelected && !isTextEditing && (
        <>
          <div
            className="absolute top-0 right-0 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute top-0 left-0 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          <div
            className="absolute top-1/2 right-0 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-e-resize transform -translate-y-1/2"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div
            className="absolute top-1/2 left-0 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-w-resize transform -translate-y-1/2"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute top-0 left-1/2 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-n-resize transform -translate-x-1/2"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
          <div
            className="absolute bottom-0 left-1/2 w-2 h-2 bg-white border border-blue-500 rounded-sm cursor-s-resize transform -translate-x-1/2"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
        </>
      )}

      {/* Optional: Add a visual indicator for containers */}
      {type === 'container' && (
        <div className="absolute -top-6 left-0 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-t-md">
          Container
        </div>
      )}
    </div>
  );
};

export default CanvasElement;
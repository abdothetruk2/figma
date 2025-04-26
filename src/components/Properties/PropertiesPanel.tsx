import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { generateCSS, copyToClipboard } from '../../utils/cssGenerator';
import ShadowControls from './ShadowControls';
import StyleControls from './StyleControls';
import ComponentLibrary from '../ComponentPresets/ComponentLibrary';
import { Copy, X, Layers, FolderPlus } from 'lucide-react';

const PropertiesPanel: React.FC = () => {
  const { state, dispatch } = useCanvas();
  const [copied, setCopied] = React.useState(false);
  
  // Get the selected element
  const selectedElement = state.elements.find(el => el.id === state.selectedElementId);
  
  // Find parent container if element is nested
  const parentContainer = selectedElement ? 
    state.elements.find(el => 
      el.children?.some((child: any) => child.id === selectedElement.id)
    ) : null;
  
  // Function to update element style
  const updateElementStyle = (styleUpdates: Partial<typeof selectedElement.style>) => {
    if (!selectedElement) return;
    
    // If element is in a container, update it through the parent
    if (parentContainer) {
      const updatedChild = {
        ...selectedElement,
        style: {
          ...selectedElement.style,
          ...styleUpdates,
        },
      };
      
      const updatedContainer = {
        ...parentContainer,
        children: parentContainer.children.map((child: any) => 
          child.id === selectedElement.id ? updatedChild : child
        ),
      };
      
      dispatch({ type: 'UPDATE_ELEMENT', element: updatedContainer });
    } else {
      // Direct element update
      const updatedElement = {
        ...selectedElement,
        style: {
          ...selectedElement.style,
          ...styleUpdates,
        },
      };
      
      dispatch({ type: 'UPDATE_ELEMENT', element: updatedElement });
    }
  };

  // Function to update element content
  const updateElementContent = (content: string) => {
    if (!selectedElement) return;

    // If element is in a container, update it through the parent
    if (parentContainer) {
      const updatedChild = {
        ...selectedElement,
        content
      };
      
      const updatedContainer = {
        ...parentContainer,
        children: parentContainer.children.map((child: any) => 
          child.id === selectedElement.id ? updatedChild : child
        ),
      };
      
      dispatch({ type: 'UPDATE_ELEMENT', element: updatedContainer });
    } else {
      // Direct element update
      const updatedElement = {
        ...selectedElement,
        content
      };

      dispatch({ type: 'UPDATE_ELEMENT', element: updatedElement });
    }
  };
  
  // Handle copy CSS
  const handleCopyCSS = async () => {
    if (!selectedElement) return;
    
    const css = generateCSS(selectedElement.style);
    const success = await copyToClipboard(css);
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle moving an element to a container
  const handleMoveToContainer = (containerId: string) => {
    if (!selectedElement || !selectedElement.position || !containerId) return;
    
    const container = state.elements.find(el => el.id === containerId);
    
    if (!container || !container.position || container.type !== 'container') return;
    
    // Create a copy of the element with position adjusted relative to the container
    const elementCopy = {
      ...selectedElement,
      position: {
        x: selectedElement.position.x - container.position.x,
        y: selectedElement.position.y - container.position.y,
      },
    };
    
    // Update the container with the new child
    const updatedContainer = {
      ...container,
      children: [...(container.children || []), elementCopy],
    };
    
    // Update container and remove original element
    dispatch({ type: 'UPDATE_ELEMENT', element: updatedContainer });
    dispatch({ type: 'DELETE_ELEMENT', id: selectedElement.id });
  };
  
  // Get a list of available containers (exclude the currently selected element)
  const availableContainers = state.elements.filter(el => 
    el.type === 'container' && el.id !== selectedElement?.id
  );
  
  return (
    <div className="w-72 bg-white border-l border-gray-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Properties</h2>
        {selectedElement && (
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => dispatch({ type: 'SELECT_ELEMENT', id: null })}
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {selectedElement ? (
          <>
            {/* Parent Container Info */}
            {parentContainer && (
              <div className="mb-4 p-2 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center text-sm text-blue-700 mb-1">
                  <Layers size={16} className="mr-1.5" />
                  <span>Inside Container:</span>
                </div>
                <div className="text-xs text-blue-800 font-medium">
                  {parentContainer.id.substring(0, 8)}...
                </div>
              </div>
            )}
            
            {/* Container Options */}
            {!parentContainer && availableContainers.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-gray-700 flex items-center">
                    <FolderPlus size={16} className="mr-1.5" />
                    Add to Container
                  </h3>
                </div>
                <select
                  className="w-full border border-gray-300 rounded-md text-sm p-1"
                  onChange={(e) => handleMoveToContainer(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select container...</option>
                  {availableContainers.map(container => (
                    <option key={container.id} value={container.id}>
                      Container {container.id.substring(0, 8)}...
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Style controls */}
            <StyleControls 
              elementStyle={selectedElement.style}
              elementType={selectedElement.type}
              content={selectedElement.content}
              onUpdate={updateElementStyle}
              onContentUpdate={updateElementContent}
            />
            
            {/* Shadow controls */}
            <ShadowControls 
              shadowStyle={selectedElement.style.boxShadow} 
              onUpdate={(boxShadow) => updateElementStyle({ boxShadow })} 
            />
            
            {/* CSS Output */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm text-gray-700">CSS</h3>
                <button
                  className={`flex items-center text-xs px-2 py-1 rounded ${
                    copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={handleCopyCSS}
                >
                  {copied ? 'Copied!' : (
                    <>
                      <Copy size={12} className="mr-1" />
                      Copy CSS
                    </>
                  )}
                </button>
              </div>
              <div className="bg-gray-50 rounded p-2 text-xs font-mono whitespace-pre overflow-x-auto">
                {generateCSS(selectedElement.style)}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="py-8 text-center text-gray-500">
              <p>Select an element to view and edit its properties</p>
            </div>
            <ComponentLibrary />
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
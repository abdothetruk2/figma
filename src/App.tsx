import React from 'react';
import { CanvasProvider } from './context/CanvasContext';
import { ToolProvider } from './context/ToolContext';
import Canvas from './components/Canvas/Canvas';
import Toolbar from './components/Toolbar/Toolbar';
import PropertiesPanel from './components/Properties/PropertiesPanel';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <CanvasProvider>
      <ToolProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <Navbar />
          <div className="flex flex-1 overflow-hidden">
            <Toolbar />
            <div className="flex-1 overflow-hidden">
              <Canvas />
            </div>
            <PropertiesPanel />
          </div>
        </div>
      </ToolProvider>
    </CanvasProvider>
  );
}

export default App;
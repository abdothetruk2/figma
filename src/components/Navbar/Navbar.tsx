import React from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { Download, Code, Share2 } from 'lucide-react';
import { generateHTMLPreview } from '../../utils/htmlGenerator';

const Navbar: React.FC = () => {
  const { state } = useCanvas();
  
  const handleExportHTML = () => {
    const html = generateHTMLPreview(state.elements);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <nav className="h-12 bg-white border-b border-gray-200 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg font-semibold text-gray-900">CSS Whiteboard</h1>
        <span className="text-xs text-gray-500">Create, style, and export CSS</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => document.getElementById('htmlPreview')?.showModal()}
          icon={<Code size={16} />}
        >
          View HTML
        </Button>
        <Button
          onClick={handleExportHTML}
          icon={<Download size={16} />}
          variant="primary"
        >
          Export
        </Button>
      </div>
      
      <HTMLPreviewDialog />
    </nav>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, icon, variant = 'default' }) => {
  const baseClasses = "flex items-center px-3 py-1.5 rounded text-sm font-medium transition-colors duration-200";
  const variantClasses = variant === 'primary' 
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <button 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </button>
  );
};

const HTMLPreviewDialog: React.FC = () => {
  const { state } = useCanvas();
  
  return (
    <dialog id="htmlPreview" className="rounded-lg shadow-xl p-0 w-full max-w-3xl">
      <div className="bg-gray-100 p-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">HTML Preview</h3>
        <button 
          onClick={() => document.getElementById('htmlPreview')?.close()}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="p-4">
        <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm font-mono">
          {generateHTMLPreview(state.elements)}
        </pre>
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
        <Button
          onClick={() => {
            navigator.clipboard.writeText(generateHTMLPreview(state.elements));
            document.getElementById('htmlPreview')?.close();
          }}
          icon={<Share2 size={16} />}
        >
          Copy to Clipboard
        </Button>
      </div>
    </dialog>
  );
};

export default Navbar;
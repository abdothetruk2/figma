import React, { useState } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  allowAlpha?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, allowAlpha = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Parse the color value to handle different formats
  const parseColor = (colorValue: string | undefined): { hex: string; alpha: number } => {
    // Handle undefined or empty color value
    if (!colorValue) {
      return { hex: '#000000', alpha: 1 };
    }
    
    // Handle rgba format
    if (colorValue.startsWith('rgba')) {
      const match = colorValue.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (match) {
        const [, r, g, b, a] = match;
        const hex = `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
        return { hex, alpha: parseFloat(a) };
      }
    }
    
    // Handle rgb format
    if (colorValue.startsWith('rgb')) {
      const match = colorValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [, r, g, b] = match;
        const hex = `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
        return { hex, alpha: 1 };
      }
    }
    
    // Handle hex format
    if (colorValue.startsWith('#')) {
      return { hex: colorValue, alpha: 1 };
    }
    
    // Default fallback
    return { hex: '#000000', alpha: 1 };
  };
  
  const { hex, alpha } = parseColor(color);
  
  // Convert hex and alpha to rgba
  const hexToRgba = (hexValue: string, alphaValue: number): string => {
    // Convert hex to rgb
    const r = parseInt(hexValue.slice(1, 3), 16);
    const g = parseInt(hexValue.slice(3, 5), 16);
    const b = parseInt(hexValue.slice(5, 7), 16);
    
    // Return rgba format
    return `rgba(${r}, ${g}, ${b}, ${alphaValue})`;
  };
  
  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (allowAlpha) {
      onChange(hexToRgba(e.target.value, alpha));
    } else {
      onChange(e.target.value);
    }
  };
  
  // Handle alpha change
  const handleAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = parseFloat(e.target.value);
    onChange(hexToRgba(hex, newAlpha));
  };
  
  return (
    <div className="relative">
      <div 
        className="flex items-center border border-gray-300 rounded p-1 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div 
          className="w-6 h-6 rounded mr-2 border border-gray-300" 
          style={{ backgroundColor: color || '#000000' }}
        />
        <span className="text-xs text-gray-700 flex-1">{color || '#000000'}</span>
      </div>
      
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 p-3 bg-white border border-gray-200 rounded shadow-lg z-10">
          <input
            type="color"
            value={hex}
            onChange={handleColorChange}
            className="w-full h-8 mb-2"
          />
          
          {allowAlpha && (
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs text-gray-500">Opacity</label>
                <span className="text-xs text-gray-500">{alpha.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={handleAlphaChange}
                className="w-full"
              />
            </div>
          )}
          
          <div className="flex flex-wrap mt-2">
            {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'].map((presetColor) => (
              <div
                key={presetColor}
                className="w-5 h-5 rounded-sm m-1 border border-gray-300 cursor-pointer"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  if (allowAlpha) {
                    onChange(hexToRgba(presetColor, alpha));
                  } else {
                    onChange(presetColor);
                  }
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
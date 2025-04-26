import React from 'react';
import { ElementStyle } from '../../types';
import Slider from '../Common/Slider';
import ColorPicker from '../Common/ColorPicker';

interface ShadowControlsProps {
  shadowStyle: ElementStyle['boxShadow'];
  onUpdate: (shadow: ElementStyle['boxShadow']) => void;
}

const ShadowControls: React.FC<ShadowControlsProps> = ({ shadowStyle, onUpdate }) => {
  const { offsetX, offsetY, blurRadius, spreadRadius, color, inset } = shadowStyle;
  
  // Update shadow with changes
  const updateShadow = (updates: Partial<ElementStyle['boxShadow']>) => {
    onUpdate({
      ...shadowStyle,
      ...updates,
    });
  };
  
  return (
    <div className="mb-6">
      <h3 className="font-medium text-sm text-gray-700 mb-3">Shadow</h3>
      
      {/* Shadow Color */}
      <div className="mb-3">
        <label className="block text-xs text-gray-500 mb-1">Shadow Color</label>
        <ColorPicker
          color={color}
          onChange={(newColor) => updateShadow({ color: newColor })}
          allowAlpha={true}
        />
      </div>
      
      {/* Shadow Offset X */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="block text-xs text-gray-500">Offset X</label>
          <span className="text-xs text-gray-500">{offsetX}px</span>
        </div>
        <Slider
          value={offsetX}
          min={-50}
          max={50}
          onChange={(value) => updateShadow({ offsetX: value })}
        />
      </div>
      
      {/* Shadow Offset Y */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="block text-xs text-gray-500">Offset Y</label>
          <span className="text-xs text-gray-500">{offsetY}px</span>
        </div>
        <Slider
          value={offsetY}
          min={-50}
          max={50}
          onChange={(value) => updateShadow({ offsetY: value })}
        />
      </div>
      
      {/* Shadow Blur */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="block text-xs text-gray-500">Blur</label>
          <span className="text-xs text-gray-500">{blurRadius}px</span>
        </div>
        <Slider
          value={blurRadius}
          min={0}
          max={100}
          onChange={(value) => updateShadow({ blurRadius: value })}
        />
      </div>
      
      {/* Shadow Spread */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <label className="block text-xs text-gray-500">Spread</label>
          <span className="text-xs text-gray-500">{spreadRadius}px</span>
        </div>
        <Slider
          value={spreadRadius}
          min={-25}
          max={25}
          onChange={(value) => updateShadow({ spreadRadius: value })}
        />
      </div>
      
      {/* Inset toggle */}
      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          id="inset-shadow"
          checked={inset}
          onChange={(e) => updateShadow({ inset: e.target.checked })}
          className="mr-2"
        />
        <label htmlFor="inset-shadow" className="text-xs text-gray-700">
          Inset Shadow
        </label>
      </div>
    </div>
  );
};

export default ShadowControls;
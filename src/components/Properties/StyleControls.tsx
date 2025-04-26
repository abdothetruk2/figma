import React, { useEffect, useState } from 'react';
import { ElementStyle } from '../../types';
import Slider from '../Common/Slider';
import ColorPicker from '../Common/ColorPicker';
import { Layers, Image as ImageIcon, Type, Filter, Palette, AlignLeft, AlignCenter, AlignRight, Upload } from 'lucide-react';
import WebFont from 'webfontloader';
import { uploadImage } from '../../utils/supabase';

interface StyleControlsProps {
  elementStyle: ElementStyle;
  elementType: string;
  content?: string;
  onUpdate: (updates: Partial<ElementStyle>) => void;
  onContentUpdate?: (content: string) => void;
}

const POPULAR_GOOGLE_FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Source Sans Pro',
  'Raleway',
  'Nunito',
  'Ubuntu',
  'Playfair Display',
  'Merriweather',
  'Roboto Mono',
  'Roboto Condensed',
  'Noto Sans'
];

const StyleControls: React.FC<StyleControlsProps> = ({ 
  elementStyle, 
  elementType,
  content = '',
  onUpdate,
  onContentUpdate 
}) => {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Load all popular fonts initially
    WebFont.load({
      google: {
        families: POPULAR_GOOGLE_FONTS
      }
    });
  }, []);

  const handleFontChange = (fontFamily: string) => {
    handleFontUpdate({ family: fontFamily });
  };

  const { 
    width, 
    height, 
    backgroundColor, 
    borderRadius, 
    opacity, 
    gradient, 
    zIndex, 
    image,
    filter = { 
      blur: 0, 
      brightness: 100, 
      contrast: 100, 
      saturate: 100 
    },
    backdropFilter = {
      blur: 0,
      brightness: 100
    },
    font = {
      family: 'Inter',
      size: 16,
      weight: 400,
      color: '#000000'
    }
  } = elementStyle;

  const handleGradientUpdate = (type: 'linear' | 'radial', colors: string[], angle?: number) => {
    onUpdate({
      gradient: {
        type,
        colors,
        angle
      }
    });
  };

  const handleImageUpdate = (updates: Partial<ElementStyle['image']>) => {
    onUpdate({
      image: {
        ...elementStyle.image,
        ...updates,
      } as ElementStyle['image']
    });
  };

  const handleFilterUpdate = (updates: Partial<ElementStyle['filter']>) => {
    onUpdate({
      filter: {
        ...elementStyle.filter,
        ...updates,
      }
    });
  };

  const handleBackdropFilterUpdate = (updates: Partial<ElementStyle['backdropFilter']>) => {
    onUpdate({
      backdropFilter: {
        ...elementStyle.backdropFilter,
        ...updates,
      }
    });
  };

  const handleFontUpdate = (updates: Partial<ElementStyle['font']>) => {
    onUpdate({
      font: {
        ...elementStyle.font,
        ...updates,
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        onUpdate({
          image: {
            url: imageUrl,
            fit: 'cover',
            position: 'center',
          }
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setIsUploading(false);
  };

  return (
    <div className="mb-6 space-y-6">
      {/* Image Upload */}
      <div>
        <h3 className="font-medium text-sm text-gray-700 mb-3 flex items-center">
          <ImageIcon size={14} className="mr-2" />
          Background Image
        </h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <label className="flex-1">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm flex items-center justify-center space-x-2 hover:bg-gray-50"
                  disabled={isUploading}
                >
                  <Upload size={14} />
                  <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                </button>
              </div>
            </label>
            {elementStyle.image?.url && (
              <button
                onClick={() => onUpdate({ image: undefined })}
                className="px-3 py-2 border border-red-300 text-red-600 rounded-md text-sm hover:bg-red-50"
              >
                Remove
              </button>
            )}
          </div>
          {elementStyle.image?.url && (
            <div className="space-y-2">
              <select
                value={elementStyle.image.fit}
                onChange={(e) => onUpdate({
                  image: { ...elementStyle.image!, fit: e.target.value as 'cover' | 'contain' | 'fill' | 'none' }
                })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="fill">Fill</option>
                <option value="none">None</option>
              </select>
              <select
                value={elementStyle.image.position}
                onChange={(e) => onUpdate({
                  image: { ...elementStyle.image!, position: e.target.value }
                })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <h3 className="font-medium text-sm text-gray-700 mb-3 flex items-center">
          <Type size={14} className="mr-2" />
          Content
        </h3>
        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => onContentUpdate?.(e.target.value)}
            placeholder="Enter text content..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm min-h-[100px]"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => onContentUpdate?.(`<div class="text-left">${content}</div>`)}
              className="p-1.5 rounded hover:bg-gray-100"
              title="Align Left"
            >
              <AlignLeft size={14} />
            </button>
            <button
              onClick={() => onContentUpdate?.(`<div class="text-center">${content}</div>`)}
              className="p-1.5 rounded hover:bg-gray-100"
              title="Align Center"
            >
              <AlignCenter size={14} />
            </button>
            <button
              onClick={() => onContentUpdate?.(`<div class="text-right">${content}</div>`)}
              className="p-1.5 rounded hover:bg-gray-100"
              title="Align Right"
            >
              <AlignRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Dimensions & Position */}
      <div>
        <h3 className="font-medium text-sm text-gray-700 mb-3">Dimensions & Position</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Width</label>
            <input
              type="number"
              value={width}
              onChange={(e) => onUpdate({ width: Number(e.target.value) })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => onUpdate({ height: Number(e.target.value) })}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center text-xs text-gray-500">
              <Layers size={14} className="mr-1" />
              Layer Position
            </label>
            <span className="text-xs text-gray-500">{zIndex}</span>
          </div>
          <Slider
            value={zIndex}
            min={0}
            max={100}
            onChange={(value) => onUpdate({ zIndex: value })}
          />
        </div>
      </div>

      {/* Typography Controls */}
      <div>
        <h3 className="font-medium text-sm text-gray-700 mb-3 flex items-center">
          <Type size={14} className="mr-2" />
          Typography
        </h3>
        <div className="space-y-3">
          <select
            value={font.family}
            onChange={(e) => handleFontChange(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            style={{ fontFamily: font.family }}
          >
            {POPULAR_GOOGLE_FONTS.map((fontFamily) => (
              <option key={fontFamily} value={fontFamily} style={{ fontFamily }}>
                {fontFamily}
              </option>
            ))}
          </select>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Size</label>
              <input
                type="number"
                value={font.size}
                onChange={(e) => handleFontUpdate({ size: Number(e.target.value) })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Weight</label>
              <select
                value={font.weight}
                onChange={(e) => handleFontUpdate({ weight: Number(e.target.value) })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="300">Light</option>
                <option value="400">Regular</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Color</label>
            <ColorPicker
              color={font.color}
              onChange={(color) => handleFontUpdate({ color })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleControls;
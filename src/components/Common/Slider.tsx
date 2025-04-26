import React from 'react';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, min, max, step = 1, onChange }) => {
  // Calculate the percentage for styling the slider
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="relative h-6 flex items-center">
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
        }}
      />
      <style jsx>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          border: 2px solid #3B82F6;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        
        input[type=range]::-webkit-slider-thumb:hover {
          background: #EFF6FF;
        }
        
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          border: 2px solid #3B82F6;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        
        input[type=range]::-moz-range-thumb:hover {
          background: #EFF6FF;
        }
      `}</style>
    </div>
  );
};

export default Slider;
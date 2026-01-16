import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ImageGallery = () => {
  const { isLowStim } = useTheme();
  const [focusedId, setFocusedId] = useState(null);

  // Mock Data for Learning
  const items = [
    { id: 1, name: "Apple", color: "bg-red-400", emoji: "🍎" },
    { id: 2, name: "Banana", color: "bg-yellow-300", emoji: "🍌" },
    { id: 3, name: "Leaf", color: "bg-green-400", emoji: "🍃" },
  ];

  return (
    <div>
      <p className="mb-4 opacity-80">
        Click an item to focus on it. This helps reduce visual noise.
      </p>

      {/* Grid Container */}
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => {
          const isFocused = focusedId === item.id;
          const isDimmed = focusedId !== null && !isFocused;

          return (
            <button
              key={item.id}
              onClick={() => setFocusedId(isFocused ? null : item.id)}
              className={`
                h-24 rounded-lg flex flex-col items-center justify-center transition-all duration-500
                ${isDimmed ? 'opacity-20 scale-90 blur-[1px]' : 'opacity-100 scale-100'}
                ${isLowStim ? 'bg-stone-200 grayscale' : `${item.color} bg-opacity-20`}
                border-2 ${isFocused ? 'border-asd-accent ring-2 ring-asd-accent ring-offset-2' : 'border-transparent'}
              `}
            >
              <span className="text-3xl mb-1">{item.emoji}</span>
              <span className="text-xs font-bold uppercase tracking-wider">{item.name}</span>
            </button>
          );
        })}
      </div>
      
      {focusedId && (
        <div className="mt-4 text-center text-sm text-asd-accent font-medium animate-pulse">
          Focus Mode Active: Click again to reset.
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import SafeCard from './components/SafeCard';
import SafeMessage from './components/SafeMessage';
import ImageGallery from './components/ImageGallery';

// Wrapper component to handle background color changes
const AppContent = () => {
  const { isLowStim } = useTheme();
  const [showGallery, setShowGallery] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans p-4 md:p-8 ${
      isLowStim ? 'bg-[#FDFCF0]' : 'bg-asd-bg'
    }`}>
      
      <div className="max-w-3xl mx-auto">
        <Header />

        <main className="max-w-2xl mx-auto space-y-6">
          
          {/* Section 1: Interactive Learning */}
          <SafeCard title="Sensory Learning">
            <p className="text-lg leading-relaxed mb-6">
              Identify the objects below.
            </p>
            
            {!showGallery ? (
               <button 
                 onClick={() => setShowGallery(true)}
                 className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors ${
                   isLowStim
                     ? 'bg-stone-200 text-stone-700 hover:bg-stone-300' 
                     : 'bg-asd-accent text-white hover:bg-sky-500 shadow-sm' 
                 }`}
               >
                 Open Image Gallery
               </button>
            ) : (
              <ImageGallery />
            )}
          </SafeCard>

          {/* Section 2: Alerts Demo */}
          <SafeCard title="System Alerts">
            <p className="mb-4 text-sm opacity-80">
              Research-backed soft error colors.
            </p>
            <SafeMessage type="error" text="Internet connection lost. Retrying..." />
            <SafeMessage type="success" text="Progress saved automatically." />
          </SafeCard>

        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
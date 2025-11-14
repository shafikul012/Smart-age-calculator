
import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import CalculatorScreen from './components/CalculatorScreen';

type Screen = 'home' | 'calculator';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');

  const handleStart = () => {
    setScreen('calculator');
  };

  const handleReset = () => {
    setScreen('home');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-500 via-blue-600 to-purple-700 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto">
        {screen === 'home' && <HomeScreen onStart={handleStart} />}
        {screen === 'calculator' && <CalculatorScreen onReset={handleReset} />}
      </div>
    </div>
  );
};

export default App;

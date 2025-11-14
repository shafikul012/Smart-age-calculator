
import React from 'react';

interface HomeScreenProps {
  onStart: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 text-white transition-all duration-500 ease-in-out transform hover:scale-105">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
        Smart Age Calculator
      </h1>
      <p className="text-lg text-white/80 mb-8">
        Discover your age in years, months, and days.
      </p>
      <button
        onClick={onStart}
        className="w-full bg-white text-purple-700 font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:bg-purple-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Calculate Age
      </button>
    </div>
  );
};

export default HomeScreen;

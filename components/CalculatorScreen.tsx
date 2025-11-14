
import React, { useState, useMemo } from 'react';
import { AgeResult } from '../types';
import ResultCard from './ResultCard';
import { RefreshIcon } from './icons';

interface CalculatorScreenProps {
  onReset: () => void;
}

const calculateAge = (dobString: string): AgeResult | null => {
  if (!dobString) return null;

  const birthDate = new Date(dobString);
  const today = new Date();
  
  // Set time to 0 to compare dates only
  birthDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (birthDate > today) return {
    age: { years: 0, months: 0, days: 0 },
    nextBirthdayIn: -1, // Indicates future date
  };

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Next birthday calculation
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const msInDay = 1000 * 60 * 60 * 24;
  const nextBirthdayIn = Math.ceil((nextBirthday.getTime() - today.getTime()) / msInDay);

  return { age: { years, months, days }, nextBirthdayIn };
};


const CalculatorScreen: React.FC<CalculatorScreenProps> = ({ onReset }) => {
  const [dob, setDob] = useState<string>('');
  
  const ageResult = useMemo(() => calculateAge(dob), [dob]);

  return (
    <div className="space-y-6 text-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Select your Date of Birth</h2>
            <p className="text-gray-500 mb-6">Let's calculate your age!</p>
            <div className="relative">
                <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    max={new Date().toISOString().split("T")[0]} // Prevents selecting future dates
                    className="w-full p-4 text-lg bg-gray-100 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                />
            </div>
        </div>

      {ageResult && ageResult.nextBirthdayIn !== -1 && (
        <ResultCard ageResult={ageResult} />
      )}
      
      {ageResult && ageResult.nextBirthdayIn === -1 && (
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 text-red-600 font-semibold">
              Please select a date in the past.
          </div>
      )}

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <RefreshIcon className="h-5 w-5" />
        Reset
      </button>
    </div>
  );
};

export default CalculatorScreen;

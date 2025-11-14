import React from 'react';
import type { AgeResult } from '../types';
import { CalendarIcon, CakeIcon } from './icons';

interface ResultCardProps {
  ageResult: AgeResult;
}

interface StatBoxProps {
    value: number;
    label: string;
}

const StatBox: React.FC<StatBoxProps> = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg w-full">
        <span className="text-4xl font-bold text-purple-700">{value}</span>
        <span className="text-md text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
);

const Confetti: React.FC = () => {
    const confettiCount = 150;
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const shapes = ['square', 'circle', 'rectangle'];

    const confetti = Array.from({ length: confettiCount }).map((_, i) => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const animationName = `confetti-fall-${Math.ceil(Math.random() * 3)}`;
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}%`,
            animationName,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        };
        return <div key={i} className={`confetti-piece ${shape}`} style={style} />;
    });

    return <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">{confetti}</div>;
};


const ResultCard: React.FC<ResultCardProps> = ({ ageResult }) => {
  const { age, nextBirthdayIn } = ageResult;
  
  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 space-y-6 transition-all duration-500 ease-in-out animate-fade-in relative overflow-hidden">
        <div>
            <div className="flex items-center justify-center gap-2 mb-4">
                 <CalendarIcon className="h-6 w-6 text-gray-500" />
                 <h3 className="text-xl font-bold text-gray-700 text-center">Your Current Age</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <StatBox value={age.years} label="Years" />
                <StatBox value={age.months} label="Months" />
                <StatBox value={age.days} label="Days" />
            </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
             {nextBirthdayIn === 0 ? (
                <>
                    <Confetti />
                    <div className="text-center relative z-10">
                        <CakeIcon className="h-12 w-12 text-pink-500 mx-auto mb-4 animate-birthday-bounce" />
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-text-pop">
                            Happy Birthday!
                        </h3>
                        <p className="text-gray-600 mt-2">Have a wonderful day!</p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <CakeIcon className="h-6 w-6 text-gray-500" />
                        <h3 className="text-xl font-bold text-gray-700 text-center">Next Birthday</h3>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-sky-50 rounded-lg">
                        <div className="text-4xl font-bold text-sky-600">{nextBirthdayIn}</div>
                        <div className="text-md text-gray-500 uppercase tracking-wider ml-3">Days Away</div>
                    </div>
                </>
            )}
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-in-out;
            }
            .confetti-piece {
                position: absolute;
                width: 10px;
                height: 10px;
                top: -5%;
                opacity: 0;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
            }
            .confetti-piece.circle {
                border-radius: 50%;
            }
            .confetti-piece.rectangle {
                width: 8px;
                height: 15px;
            }
            @keyframes confetti-fall-1 {
                0% { transform: translateY(0) rotateZ(0deg); opacity: 1; }
                100% { transform: translateY(110vh) translateX(100px) rotateZ(360deg); opacity: 0; }
            }
            @keyframes confetti-fall-2 {
                0% { transform: translateY(0) rotateZ(0deg); opacity: 1; }
                100% { transform: translateY(110vh) translateX(-100px) rotateZ(720deg); opacity: 0; }
            }
            @keyframes confetti-fall-3 {
                0% { transform: translateY(0) rotateZ(0deg) rotateY(0deg); opacity: 1; }
                100% { transform: translateY(110vh) translateX(50px) rotateZ(1080deg) rotateY(360deg); opacity: 0; }
            }
            @keyframes birthday-bounce {
              0%, 100% {
                transform: translateY(-15%);
                animation-timing-function: cubic-bezier(0.8,0,1,1);
              }
              50% {
                transform: translateY(0);
                animation-timing-function: cubic-bezier(0,0,0.2,1);
              }
            }
            .animate-birthday-bounce {
              animation: birthday-bounce 1s infinite;
            }
            @keyframes text-pop {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }
            .animate-text-pop {
              animation: text-pop 2s ease-in-out infinite;
            }
        `}</style>
    </div>
  );
};

export default ResultCard;

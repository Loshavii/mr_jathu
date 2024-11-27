import React, { useState, useRef, useEffect } from 'react';
import { Gift, Music, Lock, Unlock, Cake, Star, Heart } from 'lucide-react';
import birthdaySong from './ja.mp3';
const BirthdayGreeting = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const audioRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handlePasswordCheck = () => {
    const password = prompt("enoda birthday date type panu da dherila na slack la par:");
    
    if (password === "13") {
      setIsUnlocked(true);
      // audioRef.current.play();
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } else {
      setPasswordAttempts(prev => prev + 1);
      alert(passwordAttempts < 2 
        ? "Dhappu Dhappu odu angala" 
        : "Enna da... Seriously? Check your birthday date!");
    }
  };

  const renderConfetti = () => {
    return Array.from({ length: 100 }).map((_, index) => {
      const colors = ['bg-pink-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return (
        <div 
          key={index} 
          className={`absolute ${randomColor} w-2 h-2 rounded-full animate-[fall_3s_ease-in-out_infinite]`} 
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            top: `-10%`
          }}
        />
      );
    });
  };

  const renderStars = () => {
    return Array.from({ length: 50 }).map((_, index) => (
      <div 
        key={index} 
        className="absolute bg-white/50 w-1 h-1 rounded-full animate-twinkle" 
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ));
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative flex items-center justify-center overflow-hidden"
    >
      {/* Starry background effect */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {renderStars()}
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {renderConfetti()}
        </div>
      )}
      
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-md w-full transform transition-all hover:scale-105 duration-300 relative z-20 border border-white/30">
        {!isUnlocked ? (
          <button 
            onClick={handlePasswordCheck} 
            className="w-full flex items-center justify-center gap-2 bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800 transition-colors group"
          >
            <Lock className="mr-2 group-hover:animate-pulse" /> 
            Click here for UN Porandha Day wish
          </button>
        ) : (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3 animate-bounce">
              <Cake className="text-pink-400 animate-spin" /> 
              Happy Birthday! Panni
            </h1>
            
            <div className="mx-auto w-64 h-64 overflow-hidden rounded-full shadow-2xl transform hover:scale-110 transition-transform relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 opacity-50 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="text-white w-32 h-32 animate-heartbeat" />
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-xl text-white font-semibold animate-fadeIn">
                Wishing you a fantastic day filled with joy and surprises!
              </p>
              <p className="text-lg text-yellow-300 font-bold animate-pulse">
                11.00 am kulla Assignment submit pananum poi submit panu da panni...
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => audioRef.current.play()}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors group"
              >
                <Music className="group-hover:animate-spin" /> Play Birthday Song
              </button>
              <audio ref={audioRef} src={birthdaySong}></audio>
              <button 
                onClick={() => setIsUnlocked(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors group"
              >
                <Unlock className="group-hover:animate-bounce" /> Lock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayGreeting;
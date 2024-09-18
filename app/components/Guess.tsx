import React from 'react';

const Guess = ({ word, guess = '', isGuessed }) => {
  return (
    <div className="grid grid-cols-5 gap-2 mb-2">
      {
        new Array(5).fill(0).map((_, i) => {
          // Assign background color based on the guess and word matching logic
          const bgColor = !isGuessed
            ? 'bg-black'
            : guess[i] === word[i]
            ? 'bg-green-400'
            : word.includes(guess[i])
            ? 'bg-yellow-400'
            : 'bg-black';

          return (
            <div
              key={i}
              className={`flex items-center justify-center uppercase text-white w-16 h-16 border border-gray-100 ${bgColor}`}
            >
              {guess[i]?.toUpperCase() || ''}
            </div>
          );
        })
      }
    </div>
  );
};

export default Guess;

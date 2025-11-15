import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="loading-indicator">
            <div className="flex flex-col items-center space-y-4">

                {/* 🔥 Animated Fire Emoji */}
                <span 
                    className="text-6xl animate-bounce"
                    role="img"
                    aria-label="fire"
                >
                    🔥
                </span>

                {/* Text */}
                <p className="text-lg font-medium text-gray-500">
                    Habit Tracking...
                </p>

            </div>
        </div>
    );
};

export default LoadingSpinner;

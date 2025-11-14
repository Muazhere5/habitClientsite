import React from 'react';

const LoadingSpinner = () => {
    return (
        // Uses the custom CSS class for consistent center positioning (index.css)
        <div className="loading-indicator">
            <div className="flex flex-col items-center space-y-4">
                {/* DaisyUI Loading Component (Using habit-primary color) */}
                <span className="loading loading-spinner loading-lg text-habit-primary"></span>
                <p className="text-lg font-medium text-gray-500">Loading data...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
import React from 'react';
import FeaturedHabitCard from './FeaturedHabitCard'; 

const FeaturedHabits = ({ habits }) => {
    
    return (
        <div>
            <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
                ⭐ Featured Habits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {habits.map(habit => (
                    
                    <FeaturedHabitCard key={habit._id} habit={habit} />
                ))}
            </div>
            {habits.length === 0 && (
                <p className="text-center text-xl text-gray-500 p-8 bg-base-200 rounded-lg">
                    No featured habits found.
                </p>
            )}
        </div>
    );
};

export default FeaturedHabits;
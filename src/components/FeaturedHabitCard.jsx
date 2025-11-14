import React from 'react';
import { Link } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
//import HabitPlaceholder from '../assets/habit_placeholder.jpg'; // [Image: habit_placeholder.jpg]

const FeaturedHabitCard = ({ habit }) => {
    // ⬇️ Backend Data Usage: Accessing habit data directly from the MongoDB document.
    const hasHistory = habit.completionHistory && habit.completionHistory.length > 0;
    
    return (
        <div className="card bg-base-100 shadow-xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
            <figure>
                <img 
                    src={habit.image || HabitPlaceholder} 
                    alt={habit.title} 
                    className="w-full h-48 object-cover" 
                />
            </figure>
            <div className="card-body flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-2xl text-habit-primary">
                        {habit.title}
                    </h3>
                    {hasHistory && (
                        <div className="badge badge-error gap-2 text-white">
                            <FaFire /> Streak
                        </div>
                    )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                    {habit.description.substring(0, 90)}{habit.description.length > 90 ? '...' : ''}
                </p>
                
                <div className="badge badge-outline badge-sm mb-4">
                    Category: {habit.category}
                </div>
                <div className="text-xs text-gray-500">
                    {/* ⬇️ Backend Data Usage: Displaying Creator Info */}
                    Created by: **{habit.creatorName}**
                </div>

                <div className="card-actions justify-end mt-4">
                    {/* ⬇️ Backend Link: Uses habit._id (MongoDB ID) for linking to details page */}
                    <Link to={`/habit/${habit._id}`} className="btn btn-primary btn-sm">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedHabitCard;
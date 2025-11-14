import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

import { FaFire, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const HabitDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentStreak, setCurrentStreak] = useState(0);

    const fetchHabitDetails = () => {
        setLoading(true);
        axiosInstance.get(`/habit/${id}`) 
            .then(res => {
                if (!res.data || res.data === 'Not Found') {
                    toast.error("Habit not found.");
                    navigate('/404');
                    return;
                }
                setHabit(res.data);
                setCurrentStreak(calculateCurrentStreak(res.data.completionHistory));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching habit details:", error);
                toast.error("Failed to load habit details.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchHabitDetails();
    }, [id, user, axiosInstance]);

    const handleMarkComplete = () => {
        if (!user) {
            toast.error("You must be logged in to mark a habit complete.");
            return;
        }

        axiosInstance.patch(`/habit/complete/${id}`)
            .then(res => {
                if (res.data.message === "Habit already completed today.") {
                    toast('You already marked this habit complete today!', { icon: '👏' });
                } else if (res.data.acknowledged) {
                    toast.success('Task Completed! Keep the streak going!');
                    fetchHabitDetails(); // Refresh data instantly
                }
            })
            .catch(error => {
                console.error("Mark Complete Error:", error);
                toast.error("Failed to update habit status.");
            });
    };
    
    // Logic for Progress Bar (% of days completed in last 30)
    const calculateProgressPercentage = (history) => {
        if (!history || history.length === 0) return 0;
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const uniqueCompletedDays = new Set(
            history
                .map(dateStr => new Date(dateStr))
                .filter(date => date >= thirtyDaysAgo)
                .map(date => date.toISOString().split('T')[0])
        ).size;

        return Math.min(100, Math.round((uniqueCompletedDays / 30) * 100)); // Cap at 100%
    };

    if (loading || !habit) {
        return <LoadingSpinner />;
    }

    const progressPercent = calculateProgressPercentage(habit.completionHistory);

    return (
        <div className="container mx-auto px-4 py-10">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto bg-base-100 p-8 shadow-2xl rounded-xl"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Image and Streak */}
                    <div className="lg:col-span-1 flex flex-col items-center">
                        <img 
                            src={habit.image || 'https://i.ibb.co/default-habit.jpg'} 
                            alt={habit.title} 
                            className="w-full max-h-72 object-cover rounded-lg shadow-xl mb-6"
                        />
                        
                        {/* Streak Badge Display */}
                        <div className="p-4 bg-primary text-white rounded-lg text-center shadow-lg w-full">
                            <FaFire className="mx-auto text-3xl mb-2" />
                            <p className="text-xl font-bold">Current Streak</p>
                            <p className="text-5xl font-extrabold">{currentStreak}</p>
                            <p className="text-sm">Day{currentStreak !== 1 && 's'}</p>
                        </div>
                    </div>
                    
                    {/* Right Column: Details and Actions */}
                    <div className="lg:col-span-2">
                        <h1 className="text-5xl font-extrabold text-habit-primary mb-4">{habit.title}</h1>
                        <p className="text-lg text-gray-700 mb-6">{habit.description}</p>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-sm">
                            <div className="badge badge-lg badge-primary">Category: {habit.category}</div>
                            <div className="badge badge-lg badge-outline">Reminder: {habit.reminderTime}</div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">30-Day Progress ({progressPercent}%)</h3>
                            <progress 
                                className="progress progress-primary w-full" 
                                value={progressPercent} 
                                max="100"
                            ></progress>
                        </div>
                        
                        {/* Creator Info */}
                        <div className="mb-8 p-4 border rounded-lg bg-base-200 shadow-inner">
                            <p className="font-semibold text-gray-800">Habit Creator</p>
                            <p className="text-sm">Name: {habit.creatorName}</p>
                            <p className="text-sm">Email: {habit.creatorEmail}</p>
                        </div>

                        {/* Mark Complete Button */}
                        <button 
                            onClick={handleMarkComplete} 
                            className="btn btn-lg btn-success text-white w-full"
                        >
                            <FaCheckCircle className="text-xl" /> Mark Complete Today
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HabitDetails;
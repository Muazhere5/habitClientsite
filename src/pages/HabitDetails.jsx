import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

// ⬇️ CRITICAL FIX: Importing the streak calculator from utils
import { calculateCurrentStreak } from '../utils/streakCalculator'; 

import { FaFire, FaCheckCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// ⬇️ Recharts imports for streak graph
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

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
                // ⬇️ FUNCTION CALL: Uses imported utility to calculate streak
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

    // ⬇️ Build data for streak graph (last 30 days, cumulative streak)
    const buildStreakChartData = (history = []) => {
        if (!Array.isArray(history)) return [];

        const completedSet = new Set(
            history.map(d => new Date(d).toISOString().split('T')[0])
        );

        const data = [];
        const today = new Date();
        let runningStreak = 0;

        // Go from 29 days ago up to today
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const iso = date.toISOString().split('T')[0];

            if (completedSet.has(iso)) {
                runningStreak += 1;
            } else {
                runningStreak = 0;
            }

            const label = date.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
            });

            data.push({
                date: label,
                streak: runningStreak,
            });
        }

        return data;
    };

    if (loading || !habit) {
        return <LoadingSpinner />;
    }

    const progressPercent = calculateProgressPercentage(habit.completionHistory);
    const streakChartData = buildStreakChartData(habit.completionHistory);

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
                        <h1 className="text-5xl font-extrabold text-habit-primary mb-4">
                            {habit.title}
                        </h1>
                        <p className="text-lg text-gray-700 mb-6">{habit.description}</p>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-sm">
                            <div className="badge badge-lg badge-primary">
                                Category: {habit.category}
                            </div>
                            <div className="badge badge-lg badge-outline">
                                Reminder: {habit.reminderTime}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">
                                30-Day Progress ({progressPercent}%)
                            </h3>
                            <progress 
                                className="progress progress-primary w-full" 
                                value={progressPercent} 
                                max="100"
                            ></progress>
                        </div>

                        {/* Streak Graph (Recharts) */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-3">
                                Streak Trend (Last 30 Days)
                            </h3>
                            <div className="w-full h-64 bg-base-200 rounded-lg p-3">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={streakChartData}>
                                        <defs>
                                            <linearGradient id="streakColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#1A56DB" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#1A56DB" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="date"
                                            tick={{ fontSize: 10 }}
                                            stroke="#6b7280"
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            tick={{ fontSize: 10 }}
                                            stroke="#6b7280"
                                        />
                                        <Tooltip
                                            contentStyle={{ fontSize: '0.8rem' }}
                                            formatter={(value) => [`Streak: ${value} day(s)`, '']}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="streak"
                                            stroke="#1A56DB"
                                            fillOpacity={1}
                                            fill="url(#streakColor)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* Creator Info */}
                        <div className="mb-8 p-4 border rounded-lg bg-base-200 shadow-inner">
                            <p className="font-semibold text-gray-800">Habit Creator</p>
                            <p className="text-sm">Name: {habit.creatorName}</p>
                            <p className="text-sm">Email: {habit.creatorEmail}</p>
                        </div>

                        {/* Mark Complete Button - deep blue */}
                        <button 
                            onClick={handleMarkComplete} 
                            className="btn btn-lg text-white w-full border-none flex items-center justify-center gap-2"
                            style={{ backgroundColor: '#1A56DB' }}
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

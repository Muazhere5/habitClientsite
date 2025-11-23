import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import LoadingSpinner from '../components/LoadingSpinner';
import FeaturedHabitCard from '../components/FeaturedHabitCard'; 
import { motion } from 'framer-motion';

const categories = ['All', 'Morning', 'Work', 'Fitness', 'Evening', 'Study'];

const BrowsePublicHabits = () => {
    const axiosInstance = useAxios();
    const [publicHabits, setPublicHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    
    useEffect(() => {
        setLoading(true);
        const queryParams = new URLSearchParams();
        
        if (selectedCategory !== 'All') {
            queryParams.append('category', selectedCategory);
        }
        if (searchTerm) {
            queryParams.append('search', searchTerm);
        }

        axiosInstance.get(`/public-habits?${queryParams.toString()}`)
            .then(res => {
                setPublicHabits(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching public habits:", error);
                setLoading(false);
            });
    }, [axiosInstance, selectedCategory, searchTerm]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const input = searchInput.trim();
        setSearchTerm(input);
        setSuggestions([]);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const lower = value.toLowerCase();
        const matched = publicHabits
            .filter(habit => habit.title && habit.title.toLowerCase().includes(lower))
            .slice(0, 5);

        setSuggestions(matched);
    };
    
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSuggestionClick = (title) => {
        setSearchInput(title);
        setSearchTerm(title);
        setSuggestions([]);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-habit-primary">
                Browse All Public Habits
            </h1>
            
            
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-base-100 shadow-2xl rounded-xl"
            >
                <form onSubmit={handleSearchSubmit} className="w-full">
                    <div className="flex flex-row flex-wrap gap-4 items-center">
                        
                        
                        <div className="relative flex-[2] min-w-[260px]">
                            <div className="flex w-full gap-2 items-center">
                                <input 
                                    type="text" 
                                    name="search"
                                    value={searchInput}
                                    onChange={handleSearchChange}
                                    placeholder="Search by title or keyword..." 
                                    className="input input-bordered bg-blue-50 border-2 border-blue-300 text-black h-10 text-sm max-w-xs w-full"
                                />
                                <button 
                                    type="submit" 
                                    className="btn bg-blue-700 text-white hover:bg-blue-800 border-none h-10 px-6 text-sm md:text-base"
                                >
                                    Search
                                </button>
                            </div>

                            
                            {suggestions.length > 0 && searchInput.trim() && (
                                <ul className="absolute z-20 mt-1 w-full bg-base-100 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {suggestions.map(s => (
                                        <li
                                            key={s._id}
                                            className="px-3 py-2 cursor-pointer hover:bg-blue-50"
                                            onClick={() => handleSuggestionClick(s.title)}
                                        >
                                            {s.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        
                        <div className="form-control flex-[0.5] min-w-[140px]">
                            <label className="label hidden md:block">
                                <span className="label-text font-semibold">Filter:</span>
                            </label>
                            <select 
                                className="select select-bordered bg-blue-50 border-blue-300 text-black h-10 text-sm"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                </form>
            </motion.div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publicHabits.length > 0 ? (
                    publicHabits.map(habit => (
                        <FeaturedHabitCard key={habit._id} habit={habit} />
                    ))
                ) : (
                    <div className="lg:col-span-3 text-center py-16 bg-base-100 rounded-lg shadow-xl">
                        <p className="text-xl text-gray-600">
                            No habits match your search or filter criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowsePublicHabits;

import React, { useContext } from 'react';
import useAxios from '../utils/useAxios';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddHabit = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

    const handleAddHabit = (e) => {
        e.preventDefault();

        const form = e.target;
        const habitData = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            reminderTime: form.reminderTime.value,
            image: form.image.value || '', 
            
            creatorName: user?.displayName,
            creatorEmail: user?.email,
            
            currentStreak: 0, 
        };

        if (!habitData.title || !habitData.description || !habitData.category || !habitData.reminderTime) {
            toast.error("Please fill in all required fields.");
            return;
        }

        axiosInstance.post('/add-habit', habitData)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Habit added successfully! Start tracking your streak.');
                    form.reset();
                    navigate('/my-habits');
                } else {
                    toast.error('Failed to add habit.');
                }
            })
            .catch(error => {
                console.error("Habit creation error:", error);
                toast.error('An unexpected error occurred.');
            });
    };

    return (
        <div className="flex justify-center items-center py-10 bg-base-200">
            <div className="card w-full max-w-3xl shadow-2xl bg-base-100">
                <form onSubmit={handleAddHabit} className="card-body">
                    <h2 className="text-3xl font-bold text-center text-habit-primary mb-8">
                        Add a New Habit
                    </h2>

                    {/* Habit Title & Description */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Habit Title</span></label>
                        <input type="text" name="title" placeholder="e.g., Read 30 minutes" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Description</span></label>
                        <textarea name="description" placeholder="Describe the specifics of this habit." className="textarea textarea-bordered h-24" required></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category Dropdown */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Category</span></label>
                            <select name="category" className="select select-bordered" required>
                                <option value="">Select a Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Reminder Time Picker */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-semibold">Reminder Time</span></label>
                            <input type="time" name="reminderTime" className="input input-bordered" required />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Image URL (Optional)</span></label>
                        <input type="url" name="image" placeholder="Paste ImgBB or direct image URL" className="input input-bordered" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Read-only User Info */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Name (Read-only)</span></label>
                            <input type="text" value={user?.displayName || 'N/A'} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Email (Read-only)</span></label>
                            <input type="email" value={user?.email || 'N/A'} readOnly className="input input-bordered bg-gray-100" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary text-white">
                            Add Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHabit;
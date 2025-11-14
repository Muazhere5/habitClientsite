import React, { useContext } from 'react';
import useAxios from '../utils/useAxios';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddHabit = () => {
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios(); // Backend: custom Axios instance configured with API base URL / interceptors
    const navigate = useNavigate();

    const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

    const handleAddHabit = (e) => {
        e.preventDefault();

        const form = e.target;

        // Backend: this object is what we send to the API to be stored in the database
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

        // Backend: POST request that actually creates/saves the habit on the server
        axiosInstance.post('/add-habit', habitData)
            .then(res => {
                // Backend: server responds with insertedId if the habit was successfully stored
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

                    {/* Habit Title */}
                    <div className="form-control mb-5">
                        <div className="mb-2">
                            <label className="label">
                                <span className="label-text font-semibold">Habit Title</span>
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g., Read 30 minutes"
                                className="input input-bordered"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="form-control mb-5">
                        <div className="mb-2">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                        </div>
                        <div>
                            <textarea
                                name="description"
                                placeholder="Describe the specifics of this habit."
                                className="textarea textarea-bordered h-24"
                                required
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category Dropdown */}
                        <div className="form-control mb-3">
                            <div className="mb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Category</span>
                                </label>
                            </div>
                            <div>
                                <select
                                    name="category"
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">Select a Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {/* Reminder Time Picker */}
                        <div className="form-control mb-3">
                            <div className="mb-2">
                                <label className="label">
                                    <span className="label-text font-semibold">Reminder Time</span>
                                </label>
                            </div>
                            <div>
                                <input
                                    type="time"
                                    name="reminderTime"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control mb-5">
                        <div className="mb-2">
                            <label className="label">
                                <span className="label-text font-semibold">Image URL (Optional)</span>
                            </label>
                        </div>
                        <div>
                            <input
                                type="url"
                                name="image"
                                placeholder="Paste ImgBB or direct image URL"
                                className="input input-bordered"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Read-only User Info: Name */}
                        <div className="form-control mb-3">
                            <div className="mb-2">
                                <label className="label">
                                    <span className="label-text">Your Name (Read-only)</span>
                                </label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={user?.displayName || 'N/A'}
                                    readOnly
                                    className="input input-bordered bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Read-only User Info: Email */}
                        <div className="form-control mb-3">
                            <div className="mb-2">
                                <label className="label">
                                    <span className="label-text">Your Email (Read-only)</span>
                                </label>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    value={user?.email || 'N/A'}
                                    readOnly
                                    className="input input-bordered bg-gray-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn text-white text-lg py-3 border-none w-full"
                            style={{ backgroundColor: "#1A56DB" }} // Deep blue like rest of project
                        >
                            Add Habit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHabit;

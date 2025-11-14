import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import toast from 'react-hot-toast';

const categories = ['Morning', 'Work', 'Fitness', 'Evening', 'Study'];

const UpdateHabitModal = ({ isOpen, setIsOpen, habit, refreshData }) => {
    const axiosInstance = useAxios();
    const [formData, setFormData] = useState({});

    // ⬇️ Backend Data Initialization: Populates form with existing habit data
    useEffect(() => {
        if (habit) {
            setFormData({
                title: habit.title || '',
                description: habit.description || '',
                category: habit.category || categories[0],
                reminderTime: habit.reminderTime || '09:00',
                image: habit.image || '',
            });
        }
    }, [habit]);

    // ⬇️ Local state update: handles input edits
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        // ⬇️ Backend Connection: Sends PUT request to update habit
        // API Route: PUT /update-habit/:id 
        axiosInstance.put(`/update-habit/${habit._id}`, formData)
            .then(res => {
                // ⬇️ Backend Response: Checks MongoDB update results (modifiedCount)
                if (res.data.modifiedCount > 0) {
                    toast.success('Habit updated successfully!');
                } else if (res.data.matchedCount > 0) {
                    toast('No changes detected.', { icon: 'ℹ️' });
                } else {
                    toast.error('Failed to update habit.');
                }
                setIsOpen(false);
                refreshData();   // ⬇️ UI Update: Refreshes table after successful update
            })
            .catch(error => {
                console.error("Habit update error:", error);
                toast.error('An error occurred during update.');
            });
    };

    // Don’t render modal at all when closed or no habit selected
    if (!isOpen || !habit) return null;

    return (
        <dialog
            id="update_modal"
            className="modal modal-open"
        >
            <div className="modal-box w-11/12 max-w-2xl shadow-2xl">
                <h3 className="font-bold text-2xl text-habit-primary mb-4">
                    Update Habit: {habit?.title}
                </h3>
                
                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Title */}
                    <div className="form-control">
                        <label className="label mb-2">
                            <span className="label-text font-semibold">Habit Title</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title || ''}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="e.g., Read 30 minutes"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label mb-2">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full h-24"
                            placeholder="Describe the specifics of this habit."
                            required
                        />
                    </div>

                    {/* Category + Reminder Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label mb-2">
                                <span className="label-text font-semibold">Category</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category || categories[0]}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label mb-2">
                                <span className="label-text font-semibold">Reminder Time</span>
                            </label>
                            <input
                                type="time"
                                name="reminderTime"
                                value={formData.reminderTime || '09:00'}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="form-control">
                        <label className="label mb-2">
                            <span className="label-text font-semibold">Image URL (Optional)</span>
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image || ''}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            placeholder="Paste ImgBB or direct image URL"
                        />
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                        {/* ⬇️ Backend Data Usage: Read-only creator info */}
                        Creator: {habit?.creatorName} | Email: {habit?.creatorEmail} (Cannot be edited)
                    </p>

                    <div className="modal-action">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="btn text-white border-none"
                            style={{ backgroundColor: '#1A56DB' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn text-white border-none"
                            style={{ backgroundColor: '#1A56DB' }}
                        >
                            Update Habit
                        </button>
                    </div>
                </form>
            </div>

            {/* Backdrop – closes modal on click */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => setIsOpen(false)}>close</button>
            </form>
        </dialog>
    );
};

export default UpdateHabitModal;

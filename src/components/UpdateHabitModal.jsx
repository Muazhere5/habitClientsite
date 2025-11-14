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

    // ... handleChange function ...

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

    // ... modal return structure ...
    return (
        <dialog id="update_modal" className="modal modal-open">
            <div className="modal-box w-11/12 max-w-2xl shadow-2xl">
                <h3 className="font-bold text-2xl text-habit-primary mb-4">Update Habit: {habit?.title}</h3>
                
                <form onSubmit={handleUpdate}>
                    {/* ... form fields using formData state ... */}
                    
                    <p className="text-sm text-gray-500 mb-4">
                        {/* ⬇️ Backend Data Usage: Read-only creator info */}
                        Creator: {habit?.creatorName} | Email: {habit?.creatorEmail} (Cannot be edited)
                    </p>

                    <div className="modal-action">
                        <button type="button" onClick={() => setIsOpen(false)} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Update Habit</button>
                    </div>
                </form>
            </div>
            {/* ... backdrop ... */}
        </dialog>
    );
};

export default UpdateHabitModal;
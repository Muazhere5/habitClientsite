import React from 'react';
import { calculateCurrentStreak } from '../utils/streakCalculator'; 
import { FaEdit, FaTrash, FaCheckCircle, FaFire } from 'react-icons/fa';
import useAxios from '../utils/useAxios';
import toast from 'react-hot-toast';

const HabitTable = ({ habits, onUpdateClick, onDeleteClick, refreshData }) => {
    const axiosInstance = useAxios();

    
    const handleMarkComplete = (id) => {
        
        axiosInstance.patch(`/habit/complete/${id}`)
            .then(res => {
                
                if (res.data.message === "Habit already completed today.") {
                    toast('Already marked complete today!', { icon: '👏' });
                } else if (res.data.acknowledged) {
                    toast.success("Habit marked complete!");
                    refreshData(); 
                }
            })
            .catch(error => {
                console.error("Mark Complete Error:", error);
                toast.error("Failed to mark complete.");
            });
    };
    
    

    return (
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-2xl">
            <table className="table w-full">
                
                <tbody>
                    {habits.map((habit) => {
                        
                        const streak = calculateCurrentStreak(habit.completionHistory);
                        const createdDate = new Date(habit.createdAt).toLocaleDateString();

                        return (
                            <tr key={habit._id} className="hover:bg-base-200 transition-colors">
                                
                                
                                <td className="space-x-2">
                                    
                                    <button 
                                        onClick={() => onUpdateClick(habit)}
                                        className="btn btn-sm btn-warning btn-square tooltip"
                                        data-tip="Update"
                                    >
                                        <FaEdit />
                                    </button>
                                    
                                    <button 
                                        onClick={() => onDeleteClick(habit._id)}
                                        className="btn btn-sm btn-error btn-square tooltip"
                                        data-tip="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                   
                                    <button 
                                        onClick={() => handleMarkComplete(habit._id)}
                                        className="btn btn-sm btn-success btn-square tooltip"
                                        data-tip="Mark Complete"
                                    >
                                        <FaCheckCircle />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HabitTable;
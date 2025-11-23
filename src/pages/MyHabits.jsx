import React, { useContext, useEffect, useState, useCallback } from 'react';
import useAxios from '../utils/useAxios';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import UpdateHabitModal from '../components/UpdateHabitModal';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router-dom'; 


const HabitPlaceholder =
  'https://via.placeholder.com/80x80?text=Habit';

const MyHabits = () => {
  const { user, loading: userLoading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [myHabits, setMyHabits] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const fetchMyHabits = useCallback(() => {
    if (!user?.email) return;

    setDataLoading(true);
    axiosInstance
      .get(`/my-habits/${user.email}`)
      .then((res) => {
        setMyHabits(res.data);
        setDataLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user habits:', error);
        toast.error('Failed to load your habits.');
        setDataLoading(false);
      });
  }, [user, axiosInstance]);

  useEffect(() => {
    if (user && !userLoading) {
      fetchMyHabits();
    }
  }, [user, userLoading, fetchMyHabits]);

  
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Confirm Deletion?',
      text: "You won't be able to revert this habit!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/habit/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your habit has been deleted.', 'success');
              fetchMyHabits(); 
            } else {
              toast.error('Delete failed.');
            }
          })
          .catch((error) => {
            console.error('Delete Error:', error);
            toast.error('Failed to delete habit.');
          });
      }
    });
  };

  
  const handleOpenUpdateModal = (habit) => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  };

  
  const handleMarkComplete = (id) => {
    axiosInstance
      .patch(`/habit/complete/${id}`)
      .then((res) => {
        if (res.data?.message === 'Habit already completed today.') {
          toast(res.data.message, { icon: 'ℹ️' });
        } else if (res.data.modifiedCount > 0) {
          toast.success('Habit marked as completed for today!');
        } else {
          toast('No changes detected.', { icon: 'ℹ️' });
        }
        fetchMyHabits();
      })
      .catch((error) => {
        console.error('Complete habit error:', error);
        toast.error('Failed to mark habit as complete.');
      });
  };

  if (userLoading || dataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-habit-primary mb-2">
            My Habits
          </h1>
          <p className="text-gray-600">
            Track, update, and complete your habits to build unstoppable streaks.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-2">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-sm font-semibold text-gray-600">Total Habits</span>
            <span
              className="text-lg font-extrabold text-white px-3 py-1 rounded-full"
              style={{ backgroundColor: '#1A56DB' }}
            >
              {myHabits.length}
            </span>
          </div>

          
          <Link
            to="/add-habit"
            className="mt-1 inline-flex items-center justify-center rounded-md text-white font-semibold px-5 py-2 text-sm md:text-base shadow-md hover:shadow-lg transition"
            style={{ backgroundColor: '#1A56DB' }}
          >
            + Add New Habit
          </Link>
        </div>
      </div>

      
      {myHabits.length > 0 ? (
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-slate-200 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-bold text-gray-800">Your Active Habits</h2>
            <p className="text-sm text-gray-500">
              Click <span className="font-semibold">Update</span> to edit,&nbsp;
              <span className="font-semibold">Delete</span> to remove, or&nbsp;
              <span className="font-semibold">Mark Complete</span> to track today&apos;s streak.
            </p>
          </div>

          <div className="space-y-4">
            {myHabits.map((habit) => {
              const completionCount = habit.completionHistory
                ? habit.completionHistory.length
                : 0;

              return (
                <div
                  key={habit._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 px-3 rounded-xl border border-slate-100 bg-white hover:shadow-md transition"
                >
                  
                  <div className="flex items-start gap-4">
                    <img
                      src={habit.image || HabitPlaceholder}
                      alt={habit.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {habit.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Category:{' '}
                        <span className="font-medium text-gray-700">
                          {habit.category}
                        </span>{' '}
                        • Reminder:{' '}
                        <span className="font-medium text-gray-700">
                          {habit.reminderTime || 'Not set'}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Streak days completed:{' '}
                        <span className="font-semibold text-gray-600">
                          {completionCount}
                        </span>
                      </p>
                    </div>
                  </div>

                  
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenUpdateModal(habit)}
                      className="px-4 py-2 rounded-md text-sm font-semibold text-white shadow-sm hover:shadow-md transition"
                      style={{ backgroundColor: '#1A56DB' }}
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(habit._id)}
                      className="px-4 py-2 rounded-md text-sm font-semibold text-white shadow-sm hover:shadow-md transition bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMarkComplete(habit._id)}
                      className="px-4 py-2 rounded-md text-sm font-semibold text-white shadow-sm hover:shadow-md transition"
                      style={{ backgroundColor: '#16A34A' }} 
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-base-100 rounded-2xl shadow-2xl border border-slate-200">
          <p className="text-xl text-gray-700 mb-3">
            You haven&apos;t added any habits yet.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Start with one small habit and build your streak day by day.
          </p>
          <Link
            to="/add-habit"
            className="btn btn-lg text-white border-none"
            style={{ backgroundColor: '#1A56DB' }}
          >
            Start Building a New Habit
          </Link>
        </div>
      )}

     
      <UpdateHabitModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        habit={selectedHabit}
        refreshData={fetchMyHabits}
      />
    </div>
  );
};

export default MyHabits;

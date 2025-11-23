import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer';

const App = () => {
    const location = useLocation();

   
    useEffect(() => {
        const path = location.pathname;
        let title = 'Habit Builder | Consistency Starts Here'; 

        if (path === '/') {
            title = 'Habit Builder | Build Streaks and Boost Productivity';
        } else if (path === '/my-habits') {
            title = 'Habit Builder | My Habits & Progress';
        } else if (path.startsWith('/habit/')) {
            title = 'Habit Builder | Habit Details'; 
        } else if (path === '/add-habit') {
            title = 'Habit Builder | Add New Habit';
        } else if (path === '/browse') {
            title = 'Habit Builder | Browse Public Habits';
        } else if (path === '/login') {
            title = 'Habit Builder | Login';
        } else if (path === '/signup') {
            title = 'Habit Builder | Register Account';
        } else {
            title = 'Habit Builder | 404 Not Found';
        }

        document.title = title;
    }, [location.pathname]);

    
    const isNotFound = location.pathname === '/404'; 

    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            
            {!isNotFound && <Header />}
            
            <main className="flex-grow">
                
                <Outlet />
            </main>
            
            
            {!isNotFound && <Footer />}
        </div>
    );
};

export default App;
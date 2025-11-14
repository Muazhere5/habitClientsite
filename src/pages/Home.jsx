import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import LoadingSpinner from '../components/LoadingSpinner';
import HeroSlider from '../components/HeroSlider';
import FeaturedHabits from '../components/FeaturedHabits';
import WhyBuildHabits from '../components/WhyBuildHabits';
import Testimonials from '../components/Testimonials';
import DailyMotivation from '../components/DailyMotivation';
import { motion } from 'framer-motion';

const Home = () => {
    const [featuredHabits, setFeaturedHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios(); 

    useEffect(() => {
        setLoading(true);
        // Fetch 6 newest public habits from the server
        axiosInstance.get('/featured-habits')
            .then(res => {
                setFeaturedHabits(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching featured habits:", error);
                setLoading(false);
            });
    }, [axiosInstance]);

    if (loading) {
        return <LoadingSpinner />;
    }

    // Animation Variants for Framer Motion entrance (consistent animation across sections)
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            
            {/* 1. Hero Banner / Slider */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="mb-12"
            >
                <HeroSlider />
            </motion.section>

            {/* 2. Featured Habits Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-16"
            >
                <FeaturedHabits habits={featuredHabits} />
            </motion.section>

            {/* 3. Why Build Habits Section */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-16"
            >
                <WhyBuildHabits />
            </motion.section>

            {/* 4. Extra Section 1: Testimonials */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-16"
            >
                <Testimonials />
            </motion.section>
            
            {/* 5. Extra Section 2: Daily Motivation */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="mb-8"
            >
                <DailyMotivation />
            </motion.section>

        </div>
    );
};

export default Home;
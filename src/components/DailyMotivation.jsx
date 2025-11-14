import React from 'react';
import { FaRegLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const quotes = [
    "Consistency is more important than intensity.",
    "The journey of a thousand miles begins with a single step.",
    "Small daily improvements are the key to staggering long-term results.",
    "Don't break the chain. Even if it's just 5 minutes.",
];

const DailyMotivation = () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="py-12">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="p-10 bg-habit-primary text-white rounded-2xl shadow-2xl text-center"
            >
                <FaRegLightbulb className="text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Today's Motivation</h3>
                <p className="text-xl italic">"{quote}"</p>
            </motion.div>
        </div>
    );
};

export default DailyMotivation;
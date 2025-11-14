import React from 'react';
import { FaBrain, FaHeartbeat, FaMoon, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const benefitData = [
    { 
        icon: FaBrain, 
        title: "Better Focus", 
        description: "Routines minimize decision fatigue, freeing up mental energy for deeper tasks." 
    },
    { 
        icon: FaHeartbeat, 
        title: "Improved Health", 
        description: "Consistent daily actions, like exercise and hydration, lead to significant long-term wellness." 
    },
    { 
        icon: FaMoon, 
        title: "Better Sleep", 
        description: "Establishing a predictable evening routine improves sleep quality." 
    },
    { 
        icon: FaBolt, 
        title: "Increased Productivity", 
        description: "Habits automate necessary tasks, allowing you to tackle key objectives faster." 
    },
];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

const WhyBuildHabits = () => {
    return (
        <div className="py-12">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
                Why Build Habits?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefitData.map((benefit, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: index * 0.15 }}
                        className="card text-center shadow-xl p-6 bg-base-100 h-full"
                    >
                        <div className="flex justify-center mb-4">
                            <benefit.icon className="text-5xl text-habit-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WhyBuildHabits;
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
// Import dummy profile image
import ProfileOne from '../assets/profile_1.jpg'; // [Image: profile_1.jpg]
import ProfileTwo from '../assets/profile_2.jpg'; // [Image: profile_2.jpg]

const testimonialData = [
    { 
        quote: "Since tracking my 'Deep Work' habit here, my focus time has doubled. This app is simple and effective.", 
        name: "Jessica P.", 
        habit: "Deep Work Sprint",
        avatar: ProfileOne
    },
    { 
        quote: "The streak counter is the motivation I never knew I needed! It pushed me to hit my 100th day of exercise.", 
        name: "Mark T.", 
        habit: "Resistance Training",
        avatar: ProfileTwo 
    },
    { 
        quote: "Easy to use and the Mark Complete feature updates instantly. My mornings are completely transformed!", 
        name: "Sofia A.", 
        habit: "Mindful Morning Stretch",
        avatar: ProfileOne 
    },
];

const Testimonials = () => {
    return (
        <div className="py-12 bg-base-200 rounded-xl">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
                What Users Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                {testimonialData.map((t, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-6 bg-base-100 rounded-lg shadow-lg relative h-full flex flex-col justify-between"
                    >
                        <FaQuoteLeft className="text-3xl text-habit-primary/30 mb-4" />
                        <p className="italic text-gray-700 flex-grow mb-4">"{t.quote}"</p>
                        <div className="mt-4 border-t pt-3 flex items-center">
                            <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                            <div>
                                <p className="font-semibold">{t.name}</p>
                                <p className="text-sm text-habit-secondary">{t.habit}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
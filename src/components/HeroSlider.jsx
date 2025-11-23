import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'; 

import slideImage1 from '../assets/habit1.png';
import slideImage2 from '../assets/habit2.png';
import slideImage3 from '../assets/habit3.png';
import slideImage4 from '../assets/habit4.png';

const slides = [
    {
        title: "Small Steps Every Day → Big Results",
        text: "Habits are the compound interest of self-improvement. Start small, be consistent.",
        url: slideImage1,
    },
    {
        title: "Build Consistency, Build Success",
        text: "Don't aim for perfection; aim for consistency. The repetition is where the magic happens.",
        url: slideImage2,
    },
    {
        title: "Your Future Self Will Thank You",
        text: "Every 'Mark Complete' button press is a vote for the person you want to become.",
        url: slideImage3,
    },
    {
        title: "Focus on the Process, Not the Outcome",
        text: "The system is the master. Your daily routine determines your success over time.",
        url: slideImage4,
    }
];

const sliderVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HeroSlider = () => {
    const { user } = useContext(AuthContext); 
    const [current, setCurrent] = useState(0);

    
    
    const destinationPath = user ? "/add-habit" : "/login"; 

    useEffect(() => {
       
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goNext = () => {
        setCurrent(current === slides.length - 1 ? 0 : current + 1);
    };

    const goPrev = () => {
        setCurrent(current === 0 ? slides.length - 1 : current - 1);
    };

    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] rounded-box overflow-hidden shadow-2xl">

            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700
                    ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >

                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80"
                        style={{ backgroundImage: `url(${slide.url})` }}
                    ></div>

                    <div className="absolute inset-0 bg-black/45"></div>

                    <div className="relative z-20 flex items-center justify-center w-full h-full p-6 md:p-16">
                        <motion.div
                            variants={sliderVariants}
                            initial="initial"
                            animate="animate"
                            key={current}
                            className="text-center bg-black/30 p-6 rounded-xl backdrop-blur-md shadow-xl"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-white drop-shadow-lg">
                                {slide.title}
                            </h2>

                            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-white">
                                {slide.text}
                            </p>

                            
                            <Link
                                to={destinationPath}
                                className="mt-6 btn btn-lg shadow-xl 
                                bg-[#570DF8] hover:bg-[#4403C7] text-white border-none"
                            >
                                Start Building
                            </Link>
                        </motion.div>
                    </div>
                </div>
            ))}

            <div className="absolute flex justify-between items-center w-full px-5 top-1/2 -translate-y-1/2 z-30">
                <button
                    onClick={goPrev}
                    className="btn btn-circle btn-sm shadow-md 
                    bg-[#570DF8] hover:bg-[#4403C7] text-white border-none"
                >
                    ❮
                </button>

                <button
                    onClick={goNext}
                    className="btn btn-circle btn-sm shadow-md 
                    bg-[#570DF8] hover:bg-[#4403C7] text-white border-none"
                >
                    ❯
                </button>
            </div>

            <div className="absolute flex justify-center w-full py-3 gap-2 bottom-1 z-30">
                {slides.map((_, dotIndex) => (
                    <button
                        key={dotIndex}
                        onClick={() => setCurrent(dotIndex)}
                        className={`btn btn-xs rounded-full border-none 
                        ${dotIndex === current 
                            ? "bg-[#570DF8] hover:bg-[#4403C7]" 
                            : "bg-white/30 hover:bg-white/50"}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
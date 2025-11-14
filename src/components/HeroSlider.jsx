import React from 'react';
import { motion } from 'framer-motion';

const slides = [
    { 
        title: "Small Steps Every Day → Big Results", 
        text: "Habits are the compound interest of self-improvement. Start small, be consistent." 
    },
    { 
        title: "Build Consistency, Build Success", 
        text: "Don't aim for perfection; aim for consistency. The repetition is where the magic happens." 
    },
    { 
        title: "Your Future Self Will Thank You", 
        text: "Every 'Mark Complete' button press is a vote for the person you want to become." 
    }
];

const sliderVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const HeroSlider = () => {
    return (
        // DaisyUI Carousel structure
        <div className="carousel w-full h-80 rounded-box shadow-2xl bg-primary/90 text-white overflow-hidden">
            {slides.map((slide, index) => (
                <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full flex items-center justify-center p-8">
                    <motion.div
                        variants={sliderVariants}
                        initial="initial"
                        animate="animate"
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto">
                            {slide.text}
                        </p>
                    </motion.div>
                    
                    {/* Navigation Buttons */}
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${index === 0 ? slides.length : index}`} className="btn btn-circle btn-sm">❮</a> 
                        <a href={`#slide${index === slides.length - 1 ? 1 : index + 2}`} className="btn btn-circle btn-sm">❯</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroSlider;
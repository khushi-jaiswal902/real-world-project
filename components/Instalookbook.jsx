import React, { useState, useRef } from 'react'
import p_img1 from '../assets/p_img1.png'
import p_img2 from '../assets/p_img2_1.png'
import p_img3 from '../assets/p_img3.png'
import p_img4 from '../assets/p_img4.png'
import p_img5 from '../assets/p_img5.png'

const MuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
)

const SoundIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
)

const Instalookbook = () => {
    // Example sound URLs that can simulate the feel
    const soundCream = "https://actions.google.com/sounds/v1/water/water_drop.ogg"; // soft liquid drop for creams
    const soundJewelry = "https://actions.google.com/sounds/v1/cartoon/magic_chime.ogg"; // magical chime for jewelry/idols
    const soundModern = "https://actions.google.com/sounds/v1/foley/whoosh.ogg"; // modern whoosh sound

    const lookbookData = [
        { id: 1, title: 'Stone Studded Doli Style Kumkum Dabbi', image: p_img1, soundUrl: soundCream },
        { id: 2, title: 'Premium Anklet', image: p_img2, soundUrl: soundCream }, // Using cream image initially
        { id: 3, title: 'Idols', image: p_img3, soundUrl: soundJewelry },
        { id: 4, title: 'Stunning 3D Tortoise', image: p_img4, soundUrl: soundCream }, // Using cream image initially
        { id: 5, title: 'Modern Trends', image: p_img5, soundUrl: soundModern },
    ];

    const [mutedStates, setMutedStates] = useState(
      lookbookData.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
    );
    
    // Store audio instances
    const audioRefs = useRef({});

    const toggleMute = (e, id, soundUrl) => {
        e.stopPropagation(); // prevent card click
        
        const isCurrentlyMuted = mutedStates[id];
        
        // Pause all other audios first
        Object.keys(audioRefs.current).forEach(key => {
            if (audioRefs.current[key]) {
                 audioRefs.current[key].pause();
                 audioRefs.current[key].currentTime = 0;
            }
        });
        
        // Set all to muted, except the one we clicked if it was muted
        const newMutedStates = lookbookData.reduce((acc, item) => ({ ...acc, [item.id]: true }), {});

        if (isCurrentlyMuted) {
            // It was muted, now playing sound
            newMutedStates[id] = false;
            
            if (!audioRefs.current[id]) {
                 audioRefs.current[id] = new Audio(soundUrl);
                 audioRefs.current[id].loop = true; // Optional: loop the sound while playing
            }
            audioRefs.current[id].play().catch(e => console.error("Audio playback failed:", e));
        } else {
             // We are muting it, audio is already paused by the loop above
        }
        
        setMutedStates(newMutedStates);
    };

    return (
        <div className='my-16 bg-[#f8f7f5] py-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
            <div className='text-center mb-10'>
                <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4' style={{fontFamily: "sans-serif"}}>Instalookbook</h2>
                <p className='text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed'>
                    Discover the latest trends and styling inspiration through our curated collection.
                </p>
            </div>

            <div className='flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x justify-start xl:justify-center px-2'>
                {lookbookData.map((item) => (
                    <div 
                        key={item.id} 
                        className='relative flex-none w-[200px] sm:w-[240px] md:w-[280px] h-[340px] sm:h-[400px] md:h-[460px] rounded-xl overflow-hidden group cursor-pointer snap-center shadow-lg border border-gray-200 bg-white'
                    >
                        {/* Ensure image fills the container fully like a video player */}
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' 
                        />

                        {/* Gradient Overlay for text readability at the bottom, and icon at top right */}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 transition-opacity duration-300'></div>
                        
                        {/* Clickable Sound Icon */}
                        <div 
                            onClick={(e) => toggleMute(e, item.id, item.soundUrl)}
                            className='absolute top-3 right-3 bg-black/50 hover:bg-black/80 p-2.5 rounded-full backdrop-blur-sm shadow-md transition-colors cursor-pointer z-10'
                            title={mutedStates[item.id] ? "Unmute" : "Mute"}
                        >
                            {mutedStates[item.id] ? <MuteIcon /> : <SoundIcon />}
                        </div>
                        
                        {/* Title text */}
                        <div className='absolute bottom-5 left-4 right-4 z-10'>
                            <h3 className='text-white font-semibold text-sm sm:text-base md:text-lg leading-snug drop-shadow-md tracking-wide'>
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Instalookbook

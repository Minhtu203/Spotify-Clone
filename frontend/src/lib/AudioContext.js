import { createContext, useRef } from 'react';

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(null);
    return (
        <AudioContext.Provider value={audioRef}>
            <audio ref={audioRef} />
            {children}
        </AudioContext.Provider>
    );
};

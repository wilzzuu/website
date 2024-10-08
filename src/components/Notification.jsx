import React, { useEffect, useRef } from 'react';

const Notification = ({ message, style, soundURL, onClick }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (message && soundURL && audioRef.current) {
            audioRef.current.volume = 0.3
            audioRef.current.play().catch((err) => {
                console.warn("Failed to play sound: ", err);
            });
        }
    }, [message, soundURL]);

    return (
        <div style={style}>
            {onClick ? (
            <button onClick={onClick} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            {message}
            </button>
            ) : (
                message
            )}
        {soundURL && (
            <audio ref={audioRef}>
                <source src={soundURL} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        )}
        </div>
    );
};

export default Notification;
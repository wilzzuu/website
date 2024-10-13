import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomLeftArrow = ({ style, onClick }) => (
    <button
        className="slick-prev"
        style={{ ...style, top: '50%', zIndex: 1000 }}
        onClick={onClick}
    >
        ◄
    </button>
);

const CustomRightArrow = ({ style, onClick }) => (
    <button
        className="slick-next"
        style={{ ...style, top: '50%', zIndex: 1000 }}
        onClick={onClick}
    >
        ►
    </button>
);

const Carousel = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Slider settings
    const settings = {
        dots: true,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomLeftArrow />,
        nextArrow: <CustomRightArrow />,
        beforeChange: (_, next) => setActiveIndex(next),
    };

    return (
        <div className="carousel-container" style={{ width: '100%', maxHeight: '500px' }}>
        <Slider {...settings}>
            {images.map((url, index) => (
            <div key={index} className="image-wrapper">
                <img
                src={url}
                alt={`Slide ${index + 1}`}
                style={{
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: '500px', // Set a fixed max-height to limit image size
                    objectFit: 'contain', // Keep aspect ratio intact
                    margin: '0 auto', // Center the image horizontally
                }}
                />
            </div>
            ))}
        </Slider>
        </div>
    );
};

export default Carousel;

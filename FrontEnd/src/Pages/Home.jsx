import "../App.css"
import React from 'react'
import { useEffect, useState } from 'react';
import Combine from '../components/Combine';
import BottomBar from '../components/BottomBar';
import Faq from '../components/Faq';
import Certificate from '../components/Certificate';
import Testimonials from '../components/Testimonials';
import OurCourses from '../components/OurCourses';
import WhatOffer from '../components/WhatOffer';
import Promo from "../components/Promo";
import promo from "../Data/promo.mp4";
import Combinebottom from "../components/Combinebottom";

const Home = () => {
    const [showBottomBar, setShowBottomBar] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            // Setting the number of components to scroll past before showing the bottom bar
            const componentsToScrollPast = 2;
            const scrollPositionToTrigger = window.innerHeight * componentsToScrollPast;

            if (window.scrollY > scrollPositionToTrigger) {
                setShowBottomBar(true);
            } else {
                setShowBottomBar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Combine />
            <Promo src={promo} />
            <Combinebottom/>
            <OurCourses />
            <WhatOffer />
            <Testimonials />
            <Certificate />
            <Faq />
            {showBottomBar && (
                <div>
                    <BottomBar />
                </div>
            )}
        </>
    )
}

export default Home
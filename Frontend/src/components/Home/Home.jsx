import React from 'react'
import HeroSection from './HeroSection';
import Categories from './Categories';
import Companies from './Companies';
import Testimonials from './Testimonials';

function Home() {
    return (
        <section className='w-full h-full p-12'>
            <HeroSection/>
            <Categories/>
            <Companies/>
            <Testimonials/>
        </section>
    );
}

export default Home;
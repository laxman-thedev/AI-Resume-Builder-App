import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

/**
 * Home component serves as the main landing page of the application.
 * It aggregates various sections of the homepage, including:
 * - Banner: A top banner for announcements or promotions.
 * - Hero: The main hero section with a headline and call to action.
 * - Features: Highlights the key features of the application.
 * - Testimonial: Displays user testimonials.
 * - CallToAction: A section encouraging users to take action.
 * - Footer: The footer section of the page.
 */
const Home = () => {
    return (
        <div>
            <Banner />
            <Hero />
            <Features />
            <Testimonial />
            <CallToAction />
            <Footer />
        </div>
    )
}

export default Home
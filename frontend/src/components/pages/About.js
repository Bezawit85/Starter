import React from 'react'
import cart from '../images/cart.jpg'
import './About.css'



const About = () => {
    return (
     
        <div className='about' id='about'>
            <div className='container'>
                <img src={cart} alt='premium' />
                <div className='col-2'>
                    <h2>About</h2>
                    <span className='line'></span>
                    <p>
                        Welcome to Elite market, where elegance meets tradition in the vibrant
                        world of Habeshan dresses. We are passionate about celebrating the rich
                        cultural heritage of Ethiopia and Ertrea through our exwuisite collection
                        of traditional dresses, each meticulously crafted to embody the essence of
                        Habeshan beauty.
                         </p>
                    <p>We curate a diverse range of Habeshan dresses that seamlessly
                        blend tradition with contemporary style.
                    </p>
                  
                </div>
            </div>
        </div>
    )
}

export default About

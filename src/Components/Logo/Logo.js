import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';
const Logo = () => {
    return (
        <div className='ma mt0'>
            <Tilt className=" br2 shadow-2" style={{ height: '100px', width: '120px' }}>
                <div className="Tilt-inner pa2" >
                    <img alt='logo' src={brain} />
                </div>
            </Tilt>            
        </div>
    );
}

export default Logo;

import React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";

import './Banner.css'

import banner from '../items/Banner.png';

function Banner(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
	};

    return(
        <div className = 'Banner'>  
        <Slider {...settings}>
            <div>
            <img src = {banner} alt = ''/>
            </div>
            <div>
            <img src = {banner} alt = ''/>
            </div>
            <div>
            <img src = {banner} alt = ''/>
            </div>
            <div>
            <img src = {banner} alt = ''/>
            </div>
            <div>
            <img src = {banner} alt = ''/>
            </div>
            <div>
            <img src = {banner} alt = ''/>
            </div>
        </Slider>
        </div>
    );
}




export default Banner;
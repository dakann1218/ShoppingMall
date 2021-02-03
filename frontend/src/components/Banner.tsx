import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import './Banner.css'

//import banner from '../items/Banner.png';

interface Props{
	src: string;
	alt: string;
	index: number;
	target: number;
	key: number;
}

const Image = styled.img`
	transform: scale(${(props: Props) => props.index === props.target ? 1.2 : 1 });
	z-index: ${(props: Props) => props.index === props.target ? 1 : 0 };
	opacity: ${(props: Props) => props.index === props.target ? 1 : 0.6 };
	&:hover{
		transform: scale( ${(props: Props) => props.index === props.target ? 1.3 : 1} );
		transition: transform 0.5s;
	}	
`
const TOTAL_SLIDES = 5;
function Banner(){
    const [currentSlide, setCurrentSlide] = useState(0);
	const [img_arr, setImgArr] = useState([6,1,2,3,4,5]);
	const slideRef = useRef<any>(null);
	const image_list = useRef<any>()
	
	useEffect(() =>{
	}, [currentSlide]);
	
	const nextSlide = () => {
		const next_slide = currentSlide + 1;
		if (currentSlide >= TOTAL_SLIDES) {
		  	setCurrentSlide(0);
		} else {
		  	setCurrentSlide(next_slide);
		}
		setImgArr(img_arr.slice(1,6).concat(img_arr[0]));
	  };
	
  	const prevSlide = () => {
		const prev_slide = currentSlide - 1;
		if (currentSlide === 0) {
		  	setCurrentSlide(TOTAL_SLIDES);
		} else {
		  	setCurrentSlide(prev_slide);
		}
		setImgArr([img_arr[5]].concat(img_arr.slice(0,5)));
	};
	
	const img_list = img_arr.map((img_num,index) => {
		return <Image src = {require(`../items/${img_num}.jpg`).default} alt = '' index = {img_num} target = {currentSlide + 1} key = {index}/>
	});
	
    return(
        <div className = 'Banner'>
			<div className = 'Container' ref={slideRef}>
			  {img_list}
			</div>
			<div>
			<h1>{currentSlide + 1}/6</h1>
			</div>
			<div className = 'Buttons'>
				<button onClick={prevSlide}>{'<'}</button>
				<button onClick={nextSlide}>{'>'}</button>
			</div>
        </div>
    );
}

export default Banner;
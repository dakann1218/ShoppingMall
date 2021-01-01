import React from 'react';
import {History} from 'history';

import './BestChoice.css';

import image1 from '../items/1.jpg'; 
import image2 from '../items/2.jpg'; 
import image3 from '../items/3.jpg'; 
import image4 from '../items/4.jpg'; 
import image5 from '../items/5.jpg'; 
import image6 from '../items/6.jpg'; 

interface Props {
	history : History;
}

function BestChoice(props: Props){
	const {history} = props
	
	return(
		<div className = 'BestChoice'>
            <h1>Best Choice</h1>
            <div className = 'Items'>
                <img onClick ={ ()=> history.push('/item')} src = {image1} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image2} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image3} alt = ''/>
            </div>
        
            <div className = 'Items'>
                <img onClick ={ ()=> history.push('/item') } src = {image4} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image5} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image6} alt = ''/>
            </div>
        </div>
	);
}

export default BestChoice
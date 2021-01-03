import React from 'react';
import {History} from 'history';

import './BestChoice.css';

import Item from './Item';

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
    
    /* Get all item lists and map */
    const imagelist1: string[] = [image1,image2,image3];
    const imagelist2: string[] = [image4,image5,image6];

    const row1 = imagelist1.map((img) => {
        return(
            <Item history = {history} image = {img} category = {''} number = {0}/>
        );
    });

    const row2 = imagelist2.map((img) => {
        return(
            <Item history = {history} image = {img} category = {''} number = {0}/>
        );
    });

	return(
		<div className = 'BestChoice'>
            <h1>Best Choice</h1>
            <div className = 'Items'>
                {row1}
            </div>
        
            <div className = 'Items'>
                {row2}
            </div>
        </div>
	);
}

export default BestChoice
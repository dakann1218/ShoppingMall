import React from 'react';
import {History} from 'history';

import './BestChoice.css';

import Item from './Item';

interface Props {
	history : History;
}

type dict = {
	[key: string]: any
}


function BestChoice(props: Props){
	const { history } = props	
	
	/* Pick 6 random images and make list */
	var imagelist: dict[] = [];
	for(var i = 0; i < 6; i++){
		const categories: string[] = ['neat', 'sweatshirt', 'coat'];
		const category: string = categories[Math.floor(Math.random() * categories.length)];
		const number: number = 1 + Math.floor(Math.random() * 39);
		/* Check if there is duplicate image */
		imagelist.push({ 'category': category, 'number': number });
	}

	/* Make Bestchoice from the list */
	var count: number = 0;
	let rowlist: JSX.Element[];
	const bestchoice = imagelist.map((dict) => {
		if(count % 3 === 0 ){
			rowlist = []
		}
		count = count + 1;
		
        rowlist.push(
            <Item
				history = { history }
				image = { require(`../items/${dict.category}/${dict.number}.jpg`).default }
				category = { dict.category }
				number = { dict.number }
				/>
        );
		
		if(count % 3 === 0){        
			return(
				<div className = 'Row'>
					{rowlist} 
				</div>
			);
		}
    });
	
	
	
	return(
		<div className = 'BestChoice'>
            <h1>Best Choice</h1>
			{bestchoice}
        </div>
	);
}

export default BestChoice;
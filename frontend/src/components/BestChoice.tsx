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
		imagelist.push({ 'category': category, 'number': number });
	}

	/* Make Bestchoice from the list */
	var count: number = 0;
	let rowlist: JSX.Element[];
	const bestchoice: JSX.Element[] = []
	imagelist.forEach((dict, index) => {
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
				key = { count }
				/>
        );
		
		if(count % 3 === 0){        
			bestchoice.push(
				<div className = 'Row' key = { index }>
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
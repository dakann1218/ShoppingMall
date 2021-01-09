import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import Item from '../components/Item';

import './ItemList.css'

interface URLProps{
    itemclass: string;
}

interface Props{
	history: History;
}

function ItemList( props: Props & RouteComponentProps<URLProps> ){
	/* props */
	const { history } = props;
	const { itemclass } = props.match.params;
								
	
	/* Push all images that matches itemclass to imagelist */
	let imagelist: string[] = [];
	var count: number = 1;
	
	while(true){
		try{
			imagelist.push( require(`../items/${ itemclass }/${ count }.jpg`).default )
			count = count + 1;
		} catch(error){
			break;
		}
	}

	/* Map imagelist to HTML of 4 column image table */
	var count2: number = 0;
	let rowlist: JSX.Element[];
	const images = imagelist.map((image) =>{
		if(count2 % 4 === 0 ){
			rowlist = []
		}

		count2 = count2 + 1;
		rowlist.push(
			<Item
				 history = { history }
				 image = { image }
				 category = { itemclass }
				 number = {count2}
				 />
		);

		if((count2 % 4 === 0) || (count2 === count-1)){        
			return(
				<div className = 'Row'>
					{rowlist} 
				</div>
			);
		}
	});  


	return(
		<div className = 'ItemList'>
			{images}
		</div>
	);
}
					   
export default ItemList;
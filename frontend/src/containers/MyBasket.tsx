import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History } from 'history';

import './MyBasket.css';

import Item from '../components/Item';

interface Props{
	history: History;	
}

interface States{
	basket_list: basket[];
}

type basket = {
	[key: string]: string | number ,
}

function MyBasket(props: Props){
	/* props */
	const { history } = props;
	
	/* states */
	const [ basket_list, setBasketList ] = useState([{'category': '', 'number': 0}]);
	
	/* Get basket_list from backend */
	useEffect(() => {
		const id = window.sessionStorage.getItem('id');
		if(id === null){
			alert('Please login to see your basket')
		}else{
			axios.get(`/api/getBasket/${id}`)
			.then(res => {
				if (res.data.basket_list[0] !== undefined){
					setBasketList( res.data.basket_list );
				}
			})
			.catch(err => alert('Basket Error'));
		}
	},[]);


	/* Show loading until api request ends */
	if ( window.sessionStorage.getItem('id') === null || basket_list[0].number === 0 ){
		return(
			<div className = 'MyBasket'>
			</div>
		);
	}

	/* Map <Item/> component from basket_list */
	var count: number = 0;
	let rowlist: JSX.Element[];
	const basket = basket_list.map((dict) => {
		if(count % 4 === 0 ){
			rowlist = []
		}
		count = count + 1;

		rowlist.push(
			<Item
				history = { history }
				image = { require(`../items/${dict.category}/${dict.number}.jpg`).default }
				category = {dict.category}
				number = {dict.number}
				/>
		);

		if((count % 4 === 0) || (count === basket_list.length)){        
			return(
				<div className = 'Row'>
					{rowlist} 
				</div>
			);
		}
	});

	return(
		<div className = 'MyBasket'>
			{basket}
		</div>
	);
}

export default MyBasket;
import React, { Component } from 'react';
import axios from 'axios';
import { History } from 'history';

import './MyBasket.css';

import Item from '../components/Item';

interface Props{
	history: History;	
}

interface States{
	basket_list: basket[];
	loading: boolean;
}

type basket = {
	[key: string]: string | number ,
}

class MyBasket extends Component<Props,States>{
	state = {
		basket_list: [{ 'category': '', 'number': 0 }],
		loading: true,
	}
	
	/* Get basket_list from backend */
	componentDidMount(){
		axios.get('/api/getBasket')
		.then(res => {
			this.setState({ basket_list: res.data.basket_list });
			this.setState({ loading: false });
		})
		.catch(err => alert('Basket Error'));
	}

	
	render(){
		/* Show loading until api request ends */
		if (this.state.loading){
			return(
				<div className = 'MyBasket'>
					<h1>loading...</h1>
				</div>
			);
		}
		
		/* Map <Item/> component from basket_list */
		var count: number = 0;
		let rowlist: JSX.Element[];
		const basket = this.state.basket_list.map((dict) => {
			if(count % 4 === 0 ){
				rowlist = []
			}
			count = count + 1;
			
			rowlist.push(
				<Item
					history = {this.props.history}
					image = { require(`../items/${dict.category}/${dict.number}.jpg`).default }
					category = {dict.category}
					number = {dict.number}
					/>
			);
			
			if((count % 4 === 0) || (count === this.state.basket_list.length)){        
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
}

export default MyBasket;
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
}

type basket = {
	[key: string]: string | number ,
}

class MyBasket extends Component<Props,States>{
	state = {
		basket_list: [{ 'category': '', 'number': 0 }],
	}
	
	/* Get basket_list from backend */
	componentDidMount(){
		const id = window.sessionStorage.getItem('id');
		if(id === null){
			alert('Please login to see your basket')
		}else{
			axios.get(`/api/getBasket/${id}`)
			.then(res => {
				this.setState({ basket_list: res.data.basket_list });
			})
			.catch(err => alert('Basket Error'));
		}
	}

	
	render(){
		/* Show loading until api request ends */
		if ( window.sessionStorage.getItem('id') === null || this.state.basket_list[0].number === 0 ){
			return(
				<div className = 'MyBasket'>
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
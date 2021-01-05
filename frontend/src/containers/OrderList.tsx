import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './OrderList.css';

type OrderType ={
	[key: string]: any;
}

function OrderList(){
	const [address, setAddress] = useState('');
	const [orders, setOrders] = useState([]);
	
	useEffect(() => {
		axios.get('/api/getOrder')
		.then(res => {
			setOrders(res.data.order_list.map((order: OrderType) =>{
				setAddress(order.address);
				return(
					<div className = 'OrderBox'>
						<img src = {require(`../items/${order.category}/${order.number}.jpg`).default}/>
						<div className = 'Info'>
							<h1>{ 'Item: ' + order.category + String(order.number) }</h1>
							<h1>{ 'Size: ' + order.size }</h1>
							<h1>{ 'Color: ' + order.color }</h1>
							<h1>{ 'Address: ' + order.address }</h1>
						</div>
					</div>
				);
			}));			
		})
		.catch((err) => alert('Order list loading error'));
	},[]);
	
	
	return(
		<div className = 'OrderList'>
			{ orders }
		</div>
		
	);
}

export default OrderList;
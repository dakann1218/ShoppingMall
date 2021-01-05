import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import axios from 'axios';

import './OrderPage.css';

interface MatchProps{
	category: string;
	number: string;
	size: string;
	color: string;
}

interface Props{
	history: History;
}



function OrderPage(props: (Props & RouteComponentProps<MatchProps>)){
	const { history, match } = props;
	const [address, setAddress] = useState('');
	
	
	const onClickBuy = () => {
		if (address === ''){
			alert('Write your address!');
		}else{
			axios.post('/api/addOrder', { 'category': match.params.category, 'number': Number(match.params.number), 'size': match.params.size, 'color': match.params.color, 'address': address })
			.then((res) => null)
			.catch((err) => alert('Buy Error'))
			/* Wait until response with middleware? */
			history.push('/orderlist');
		}
	}
	
	return(
		<div className = 'OrderPage'>
			<img src = {require(`../items/${match.params.category}/${match.params.number}.jpg`).default} alt = ''/>
			
			<div className = 'Info'>
				<label>{'Item: ' + match.params.category + match.params.number}</label>

				<label>{'Size: ' + match.params.size}</label>

				<label>{'Color: ' + match.params.color}</label>
	
				<div>
					<h1>Address</h1>
					<input
						onChange = {(e) => setAddress(e.target.value)}
						placeholder = 'Write your address here'
						/>
				</div>
				
				<div>
					<button onClick = {onClickBuy}>Buy</button>
					<button onClick = {() => history.push(`/item/${match.params.category}/${match.params.number}`)}>Cancel</button>
				</div>
				
			</div>
		</div>
	);
}

export default OrderPage;
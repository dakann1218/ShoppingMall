import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { History } from 'history';
import axios from 'axios';

import './ItemPage.css';

import ComboBox from '../components/ComboBox';

interface UrlProps{
	category: string;
	number: string;
}

interface Props{
	history: History;
}

interface States{
	likeimg: string;
	loveimg: string;
	size: string;
	color: string;
}

function ItemPage ( props: Props & RouteComponentProps<UrlProps> ){
	/* props */
	const { category, number } = props.match.params;
	const { history } = props;
	
	/* states */
	const [ likeimg, setLikeImg ] = useState( require('../items/like_gray.png').default );
	const [ loveimg, setLoveImg ] = useState( require('../items/love_gray.png').default );
	const [ size, setSize ] = useState( '' );
	const [ color, setColor ] = useState( '' );
	
	
	/*	1. Check if a user is logged in.
		2. If not logged in, do nothing.
		3. If logged in, send HTTP request to backend and get 'like', 'love' data.
		4. Set state like, love according to the data.
	*/
	useEffect(() => {
		const id = window.sessionStorage.getItem('id');
		
		if ( id !== null ){
			axios.get(`/api/getLikeLove/${id}/${ category }/${ number }` ) 
			.then(res => {
				if (res.data.liked){
					setLikeImg( require('../items/like.PNG').default );
				}
				if (res.data.loved){
					setLoveImg( require('../items/love.PNG').default );
				}
			})
			.catch(err =>{
				if ( category !== '' ){
				   alert('Component Mount Error')
				}});
		}
		
	},[]);
	
	/*	1. Check if a user is logged in.
		2. If not, alert message.
		3. If logged in, send HTTP request to backend and get data if 'like' should be turned on/off.
		4. Set appropriate 'like' image and push/delete to session storage.
	*/
	const onClickLike = () =>{
		const id = window.sessionStorage.getItem('id');
		const liked = window.sessionStorage.getItem('liked');
		const liked_list: string[] = (liked === null? []: liked.split(','));
		const name = category + number;
		
		if (id === null){
			alert('Please log in to like it')
		}else{
			axios.post('/api/changeLike/', {'id': id, 'category': category, 'number': Number( number ) })
			.then(res => {
				if (res.data.liked){
					setLikeImg( require('../items/like.PNG').default );
					liked_list.push( name );
					window.sessionStorage.setItem( 'liked', String(liked_list) );
				}else{
					setLikeImg( require('../items/like_gray.png').default );
					liked_list.splice( liked_list.indexOf(name), 1 );
					window.sessionStorage.setItem( 'liked', String(liked_list) );
				}		
			})
			.catch(err => alert('Error'));
		}
	}
	
	/*	1. Check if a user is logged in.
		2. If not, alert message.
		3. If logged in, send HTTP request to backend and get data if 'love' should be turned on/off.
		4. Set appropriate 'love' image and push/delete to session storage.
	*/
	const onClickLove = () =>{
		const id = window.sessionStorage.getItem('id');
		const loved = window.sessionStorage.getItem('loved');
		const loved_list: string[] = ( loved === null? [] : loved.split(',') );
		const name: string = category + number;
		
		if (id === null){
			alert('Please log in to love it')
		}else{
			axios.post('/api/changeLove/', {'id': id, 'category': category, 'number': Number( number ) })
			.then(res => {
				if (res.data.loved){
					setLoveImg( require('../items/love.PNG').default );
					loved_list.push( name );
					window.sessionStorage.setItem( 'loved', String(loved_list) );
				}else{
					setLoveImg( require('../items/love_gray.png').default );
					loved_list.splice( loved_list.indexOf(name), 1 );
					window.sessionStorage.setItem( 'loved', String(loved_list) );
				}		
			})
			.catch(err => alert('Error'));
		}
	}
	
	/* Set state size/color by combo box value */
	const onChangeSize = (value: string) =>{
		setSize( value );
	}
	
	const onChangeColor = (value: string) =>{
		setColor( value );
	}
	
	/*	1. Check if a user is logged in.
		2. If not, alert message.
		3. If logged in, check if size/color is set appropriately.
		4. If not , alert message.
		5. else, push to '/orderpage'.
	*/
	const onClickBuyNow = () => {
		if (window.sessionStorage.getItem('id') === null){
			
			alert('Please log in to buy item!')
		
		}else{
			if ( size ===  '' || color === '' ){
			
				alert('Choose option!')
		
			}else{
			
				history.push(`/orderpage/${ category }/${ number }/${ size }/${ color }`)
				
			}
		}
	}
	
	return(
		<div className = 'ItemPage'>                
			<img
				className = 'ItemImage'
				src = { require(`../items/${ category }/${ number }.jpg`).default }
				alt = ''
				/>
			<div className = 'RightSide'>
				<h1 className = 'Title'>{ category + number }</h1>
				<div className = 'Options'>
					<ComboBox
						label = {'Size'}
						onChangeBox = { onChangeSize }
						placeholder = {'Pick Size'}
						items = {['S','M','L','XL']}/>
					<ComboBox
						label = {'Color'}
						onChangeBox = { onChangeColor }
						placeholder = {'Pick Color'}
						items = {['Red','Orange','Yellow','Green']}/>
				</div>
				<div className = 'Buttons'>
					<button
						className = 'BuyNow'
						onClick ={ onClickBuyNow }
						>
						Buy Now
					</button>
					<img
						className = 'Like' 
						onClick ={ onClickLike }
						src = { likeimg } alt=''/>
					<img
						className = 'Love'
						onClick ={ onClickLove }
						src = { loveimg } alt=''/>
				</div>
			</div>
		</div>
	);
}




export default ItemPage;
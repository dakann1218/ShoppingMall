import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { History } from 'history';
import axios from 'axios';

import './Item.css';


interface Props{
    history: History;
    image: string;
	category: string;
	number: number;
}

interface States{
	name: string;
	likeimg: string;
	loveimg: string;
}

function Item(props: Props){
	/* props */
	const { history, image, category, number } = props;
	
	/* states */
	const [ name, setName ] = useState( category + String(number));
	const [ likeimg, setLikeImg ] = useState( require('../items/like_gray.png').default );
	const [ loveimg, setLoveImg ] = useState( require('../items/love_gray.png').default );
	
	/* Read session storage and turn on/off like/love */
	useEffect(()=> {
		const likelist: string | null = window.sessionStorage.getItem('liked');
		const lovelist: string | null = window.sessionStorage.getItem('loved');
		if (likelist !== null && lovelist !== null){
			if (likelist.indexOf( name ) >= 0){
				setLikeImg( require('../items/like.PNG').default );
			}
			if (lovelist.indexOf( name ) >= 0){
				setLoveImg( require('../items/love.PNG').default );
			}
		}
	},[])
	
	/* When clicked 'like'->1. Check from session storage if a user is logged in.
							2. If not logged in -> alert message.
							3. If logged in -> send HTTP request to backend.
								3-1. Backend saves data that describes if 'like' is turned on/off in DB and send back message to frontend.
								3-2. Frontend push/delete the item in session storage.
	*/
	const onClickLike = () => {
		const id: string | null = window.sessionStorage.getItem('id');
		const liked: string | null = window.sessionStorage.getItem('liked');
		const liked_list: string[] = (liked === null? []: liked.split(','));
		
		if (id === null){
			
			alert('Please login to like it');
			
		}else{
			
			axios.post('/api/changeLike/', {'id': id, 'category': category, 'number': number })
			.then(res => {
				if (res.data.liked){
					setLikeImg( require('../items/like.PNG').default );
					liked_list.push( name );
					window.sessionStorage.setItem( 'liked', String(liked_list) );
				}else{
					setLikeImg( require('../items/like_gray.png').default );
					liked_list.splice( liked_list.indexOf( name ), 1 );
					window.sessionStorage.setItem( 'liked', String(liked_list) );
				}		
			})
			.catch(err => alert('Error'));
			
		}
	}
	
	/* When clicked 'love'->1. Check from session storage if a user is logged in.
							2. If not logged in -> alert message.
							3. If logged in -> send HTTP request to backend.
								3-1. Backend saves data that describes if 'love' is turned on/off in DB and send back message to frontend.
								3-2. Frontend push/delete the item in session storage.
	*/
	const onClickLove = () => {
		const id: string | null = window.sessionStorage.getItem('id');
		const loved: string | null = window.sessionStorage.getItem('loved');
		const loved_list: string[] = (loved === null? []: loved.split(','));
		
		if (id === null){
			
			alert('Please login to love it');
			
		}else{
			axios.post('/api/changeLove/', {'id': id, 'category': category, 'number': number })
			.then(res => {
				if (res.data.loved){
					setLoveImg( require('../items/love.PNG').default );
					loved_list.push( name );
					window.sessionStorage.setItem( 'loved', String(loved_list) );
				}else{
					setLoveImg( require('../items/love_gray.png').default );
					loved_list.splice( loved_list.indexOf( name ),1 );
					window.sessionStorage.setItem( 'loved', String(loved_list) );
				}
			})
			.catch(err => alert('Error'));
			
		}
	}
	
	return(
		<div className = 'Item'>
			<img
				onClick ={ ()=> history.push(`/item/${ category }/${ number }`)}
				src = { image }
				alt = ''
				/>
			<div>{'Title: ...'}</div>
			<div>{'Description: ...'}</div>
			<div>{'Price: 20000'}</div>
			<div>
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
	);
}

export default Item;
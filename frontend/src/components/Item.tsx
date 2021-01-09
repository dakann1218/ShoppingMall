import React, { Component } from 'react';
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
	loading: boolean;
}

class Item extends Component<Props, States>{
	state = {
		name: this.props.category + String(this.props.number),
		likeimg: require('../items/like_gray.png').default,
		loveimg: require('../items/love_gray.png').default,
		loading: false,
	}
	
	/* Read session storage and turn on/off like/love */
	componentDidMount() {
		const likelist: string|null = window.sessionStorage.getItem('liked');
		const lovelist: string|null = window.sessionStorage.getItem('loved');
		if (likelist !== null && lovelist !== null){
			if (likelist.indexOf(this.state.name) >= 0){
				this.setState({ likeimg: require('../items/like.PNG').default });
			}
			if (lovelist.indexOf(this.state.name) >= 0){
				this.setState({ loveimg: require('../items/love.PNG').default });
			}
		}
	}
	
	/* When clicked 'like'->1. Check from session storage if a user is logged in.
							2. If not logged in -> alert message.
							3. If logged in -> send HTTP request to backend.
								3-1. Backend saves data that describes if 'like' is turned on/off in DB and send back message to frontend.
								3-2. Frontend push/delete the item in session storage.
	*/
	onClickLike = () =>{
		const id: string|null = window.sessionStorage.getItem('id');
		const liked: string|null = window.sessionStorage.getItem('liked');
		const liked_list: string[] = (liked === null? []: liked.split(','));
		
		if (id === null){
			
			alert('Please login to like it');
			
		}else{
			
			axios.post('/api/changeLike/', {'id': id, 'category': this.props.category, 'number': this.props.number })
			.then(res => {
				if (res.data.liked){
					this.setState({likeimg: require('../items/like.PNG').default});
					liked_list.push(this.state.name);
					window.sessionStorage.setItem('liked', String(liked_list));
				}else{
					this.setState({likeimg: require('../items/like_gray.png').default});
					liked_list.splice(liked_list.indexOf(this.state.name),1);
					window.sessionStorage.setItem('liked', String(liked_list));
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
	onClickLove = () =>{
		const id: string|null = window.sessionStorage.getItem('id');
		const loved: string|null = window.sessionStorage.getItem('loved');
		const loved_list: string[] = (loved === null? []: loved.split(','));
		
		if (id === null){
			
			alert('Please login to love it');
		}else{
			axios.post('/api/changeLove/', {'id': id, 'category': this.props.category, 'number': this.props.number })
			.then(res => {
				
				if (res.data.loved){
					this.setState({loveimg: require('../items/love.PNG').default});
					loved_list.push(this.state.name);
					window.sessionStorage.setItem('loved', String(loved_list));
				}else{
					this.setState({loveimg: require('../items/love_gray.png').default});
					loved_list.splice(loved_list.indexOf(this.state.name),1);
					window.sessionStorage.setItem('loved', String(loved_list));
				}
			})
			.catch(err => alert('Error'));
			
		}
	}
	
	render(){
		
		return(
			<div className = 'Item'>
				<img
					onClick ={ ()=> this.props.history.push(`/item/${this.props.category}/${this.props.number}`)}
					src = {this.props.image}
					alt = ''
					/>
				<div>{'Title: ...'}</div>
				<div>{'Description: ...'}</div>
				<div>{'Price: 20000'}</div>
				<div>
					<img
						className = 'Like' 
						onClick ={ ()=> this.onClickLike()}
						src = {this.state.likeimg} alt=''/>
					<img
						className = 'Love'
						onClick ={ ()=> this.onClickLove()}
						src = {this.state.loveimg} alt=''/>
				</div>
			</div>
		);
	}
}

export default Item;
import React, { Component } from 'react';
import {History} from 'history';
import axios from 'axios';

import './Item.css';


interface Props{
    history: History;
    image: string;
	name: string;
}

interface States{
	likeimg: string;
	loveimg: string;
}
class Item extends Component<Props, States>{
    /*const {history, image, name} = props;*/
	state = {
		likeimg: require('../items/like_gray.png').default,
		loveimg: require('../items/love_gray.png').default,
	}
	/*let likeimg: string = require('../items/like_gray.png').default*/
	
	onClickLike = () =>{
		axios.post('/api/changeLike/',{name: this.props.name})
		.then(res => {
			if (res.data.liked){
				this.setState({likeimg: require('../items/like.PNG').default});
			}else{
				this.setState({likeimg: require('../items/like_gray.png').default});
			}		
		})
		.catch(err => alert('Error'));
	}
	
	onClickLove = () =>{
		axios.post('/api/changeBasket/',{name: this.props.name})
		.then(res => {
			if (res.data.loved){
				this.setState({loveimg: require('../items/love.PNG').default});
			}else{
				this.setState({loveimg: require('../items/love_gray.png').default});
			}		
		})
		.catch(err => alert('Error'));
	}
	
	render(){
		return(
			<div className = 'Item'>
				<img onClick ={ ()=> this.props.history.push('/item')} src = {this.props.image} alt = ''/>
				<div>{'Title: ...'}</div>
				<div>{'Description: ...'}</div>
				<div>{'Price: 20000'}</div>
				<img
					className = 'Like' 
					onClick ={ ()=> this.onClickLike()}
					src = {this.state.likeimg} alt=''/>
				<img
					className = 'Love'
					onClick ={ ()=> this.onClickLove()}
					src = {this.state.loveimg} alt=''/>
			</div>
		);
	}
}

export default Item;
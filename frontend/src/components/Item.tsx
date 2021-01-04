import React, { Component } from 'react';
import {History} from 'history';
import axios from 'axios';

import './Item.css';


interface Props{
    history: History;
    image: string;
	category: string;
	number: number;
}

interface States{
	likeimg: string;
	loveimg: string;
	loading: boolean;
}

class Item extends Component<Props, States>{
	state = {
		likeimg: require('../items/like_gray.png').default,
		loveimg: require('../items/love_gray.png').default,
		loading: true,
	}
	
	componentDidMount() {
		axios.get(`/api/getLikeLove/${this.props.category}/${this.props.number}` ) 
		.then(res => {
			if (res.data.liked){
				this.setState({likeimg: require('../items/like.PNG').default});
			}
			if (res.data.loved){
				this.setState({loveimg: require('../items/love.PNG').default});
			}
			this.setState({ loading: false });
		})
		.catch(err =>{
			if (this.props.category !== ''){		/*To be changed after making Best Choice image's name*/
			   alert('Component Mount Error')
			}});
	}
	
	onClickLike = () =>{
		axios.post('/api/changeLike/', {'category': this.props.category, 'number': this.props.number })
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
		axios.post('/api/changeLove/', {'category': this.props.category, 'number': this.props.number })
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
		
		if (this.state.loading){
			return(
				<div className = 'Item'>
				<img onClick ={ ()=> this.props.history.push('/item')} src = {this.props.image} alt = ''/>
				<div>{'Title: ...'}</div>
				<div>{'Description: ...'}</div>
				<div>{'Price: 20000'}</div>
				<h5>loading like...</h5>
				<h5>loading love...</h5>
			</div>
			);
		}
		
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
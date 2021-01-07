import React, { Component } from 'react';
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
	category: string;
	number: string;
	Size: string;
	Color: string;
}

class ItemPage extends Component< (Props & RouteComponentProps<UrlProps>), States >{
	state = {
		likeimg: require('../items/like_gray.png').default,
		loveimg: require('../items/love_gray.png').default,
		category: this.props.match.params.category,
		number: this.props.match.params.number,
		Size: '',
		Color: ''
	}
	
	
	
	componentDidMount(){
		const id = window.sessionStorage.getItem('id');
		if ( id !== null){
			axios.get(`/api/getLikeLove/${id}/${this.state.category}/${this.state.number}` ) 
			.then(res => {
				if (res.data.liked){
					this.setState({likeimg: require('../items/like.PNG').default});
				}
				if (res.data.loved){
					this.setState({loveimg: require('../items/love.PNG').default});
				}
			})
			.catch(err =>{
				if (this.props.match.params.category !== ''){		/*To be changed after making Best Choice image's name*/
				   alert('Component Mount Error')
				}});
		}
	}
	
	onClickLike = () =>{
		const id = window.sessionStorage.getItem('id');
		const liked = window.sessionStorage.getItem('liked');
		const liked_list: string[] = (liked === null? []: liked.split(','));
		const name = this.state.category + this.state.number;
		
		if (id === null){
			alert('Please log in to like it')
		}else{
			axios.post('/api/changeLike/', {'id': id, 'category': this.state.category, 'number': Number(this.state.number) })
			.then(res => {
				if (res.data.liked){
					this.setState({likeimg: require('../items/like.PNG').default});
					liked_list.push(name);
					window.sessionStorage.setItem('liked', String(liked_list));
				}else{
					this.setState({likeimg: require('../items/like_gray.png').default});
					liked_list.splice(liked_list.indexOf(name),1);
					window.sessionStorage.setItem('liked', String(liked_list));
				}		
			})
			.catch(err => alert('Error'));
		}
	}
	
	onClickLove = () =>{
		const id = window.sessionStorage.getItem('id');
		const loved = window.sessionStorage.getItem('loved');
		const loved_list: string[] = (loved === null? []: loved.split(','));
		const name: string = this.state.category + this.state.number;
		
		if (id === null){
			alert('Please log in to love it')
		}else{
			axios.post('/api/changeLove/', {'id': id, 'category': this.state.category, 'number': Number(this.state.number) })
			.then(res => {
				if (res.data.loved){
					this.setState({loveimg: require('../items/love.PNG').default});
					loved_list.push(name);
					window.sessionStorage.setItem('loved', String(loved_list));
				}else{
					this.setState({loveimg: require('../items/love_gray.png').default});
					loved_list.splice(loved_list.indexOf(name),1);
					window.sessionStorage.setItem('loved', String(loved_list));
				}		
			})
			.catch(err => alert('Error'));
		}
	}
	
	onChangeSize = (value: string) =>{
		this.setState({ Size: value });
	}
	
	onChangeColor = (value: string) =>{
		this.setState({ Color: value });
	}
	
	onClickBuyNow = () => {
		if (window.sessionStorage.getItem('id') === null){
			
			alert('Plese log in to buy item!')
		
		}else{
			if (this.state.Size ==='' || this.state.Color ===''){
			
				alert('Choose option!')
		
			}else{
			
				this.props.history.push(`/orderpage/${this.state.category}/${this.state.number}/${this.state.Size}/${this.state.Color}`)
				
			}
		}
	}
	
	render(){
		
		return(
			<div className = 'ItemPage'>                
				<img
					className = 'ItemImage'
					src = {require(`../items/${this.state.category}/${this.state.number}.jpg`).default}
					alt = ''
					/>
				<div className = 'RightSide'>
					<h1 className = 'Title'>{this.state.category + this.state.number}</h1>
					<div className = 'Options'>
						<ComboBox
							label = {'Size'}
							onChangeBox = {this.onChangeSize}
							placeholder = {'Pick Size'}
							items = {['S','M','L','XL']}/>
						<ComboBox
							label = {'Color'}
							onChangeBox = {this.onChangeColor}
							placeholder = {'Pick Color'}
							items = {['Red','Orange','Yellow','Green']}/>
					</div>
					<div className = 'Buttons'>
						<button
							className = 'BuyNow'
							onClick ={this.onClickBuyNow}
							>
							Buy Now
						</button>
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
			</div>
		);
	}
}




export default ItemPage;
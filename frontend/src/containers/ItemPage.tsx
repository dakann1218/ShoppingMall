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
	loading: boolean;
	category: string;
	number: string;
	Size: string;
	Color: string;
}

class ItemPage extends Component< (Props & RouteComponentProps<UrlProps>), States >{
	state = {
		likeimg: require('../items/like_gray.png').default,
		loveimg: require('../items/love_gray.png').default,
		loading: true,
		category: this.props.match.params.category,
		number: this.props.match.params.number,
		Size: '',
		Color: '',
	}
	
	
	
	componentDidMount(){
		axios.get(`/api/getLikeLove/${this.state.category}/${this.state.number}` ) 
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
			if (this.props.match.params.category !== ''){		/*To be changed after making Best Choice image's name*/
			   alert('Component Mount Error')
			}});
	}
	
	onClickLike = () =>{
		axios.post('/api/changeLike/', {'category': this.state.category, 'number': Number(this.state.number) })
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
		axios.post('/api/changeLove/', {'category': this.state.category, 'number': Number(this.state.number) })
		.then(res => {
			if (res.data.loved){
				this.setState({loveimg: require('../items/love.PNG').default});
			}else{
				this.setState({loveimg: require('../items/love_gray.png').default});
			}		
		})
		.catch(err => alert('Error'));
	}
	
	onChangeSize = (value: string) =>{
		this.setState({ Size: value });
	}
	
	onChangeColor = (value: string) =>{
		this.setState({ Color: value });
	}
	
	onClickBuyNow = () => {
		if(this.state.Size ==='' || this.state.Color ===''){
			alert('Choose option!')
		}else{
			this.props.history.push(`/orderpage/${this.state.category}/${this.state.number}/${this.state.Size}/${this.state.Color}`)
		}
	}
	
	render(){
		let likelove: JSX.Element;
		if (this.state.loading){
			likelove =(
				<div>
				<h5>loading like...</h5>
				<h5>loading love...</h5>
				</div>
			);
		}else{
			likelove =(
				<>
				<img
					className = 'Like' 
					onClick ={ ()=> this.onClickLike()}
					src = {this.state.likeimg} alt=''/>
				<img
					className = 'Love'
					onClick ={ ()=> this.onClickLove()}
					src = {this.state.loveimg} alt=''/>
				</>
			);
		}
		
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
						{likelove}
					</div>
				</div>
			</div>
		);
	}
}




export default ItemPage;
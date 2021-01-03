import React, { Component } from 'react';
import {History} from 'history';

/* redux */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actionTypes from '../store/actions/actionTypes';

import './Item.css';


interface Props{
    history: History;
    image: string;
	category: string;
	number: number;
	onChangeLiked: (category: string , number: number) => void;
	onChangeLoved: (category: string , number: number) => void;
	storedLiked: LikeLoveDict;
	storedLoved: LikeLoveDict;
}

type LikeLoveDict = {
	[key: string]: number[],
}

interface States{
	likeimg: string;
	loveimg: string;
}

class Item extends Component<Props, States>{
    /*const {history, image, category, number} = props;*/
	state = {
		likeimg: require('../items/like_gray.png').default,
		loveimg: require('../items/love_gray.png').default,
	}
	/*let likeimg: string = require('../items/like_gray.png').default*/
	
	componentDidMount(){
		if (this.props.number !== 0){
			const liked = this.props.storedLiked[this.props.category][this.props.number - 1];
			if (liked){
				this.setState({ likeimg: require('../items/like.PNG').default });
			}else{
				this.setState({ likeimg: require('../items/like_gray.png').default });
			}

			const loved = this.props.storedLoved[this.props.category][this.props.number - 1];
			if (loved){
				this.setState({ loveimg: require('../items/love.PNG').default });
			}else{
				this.setState({ loveimg: require('../items/love_gray.png').default });
			}
		}
	}
	
	onClickLike = () =>{
		/*Change redux state - liked*/
		this.props.onChangeLiked(this.props.category, this.props.number);
		const liked = this.props.storedLiked[this.props.category][this.props.number - 1];
		if (liked){
			this.setState({ likeimg: require('../items/like.PNG').default });
		}else{
			this.setState({ likeimg: require('../items/like_gray.png').default });
		}
	}
	
	onClickLove = () =>{
		/*Change redux state - loved*/
		this.props.onChangeLoved(this.props.category, this.props.number);
		const loved = this.props.storedLoved[this.props.category][this.props.number - 1]
		if (loved){
			this.setState({ loveimg: require('../items/love.PNG').default })
		}else{
			this.setState({ loveimg: require('../items/love_gray.png').default })
		}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		onChangeLiked: (category: string , number: number) =>
		dispatch({ type: actionTypes.CHANGE_LIKED, category: category, number: number }),
		onChangeLoved: (category: string , number: number) =>
		dispatch({ type: actionTypes.CHANGE_LOVED, category: category, number: number })
	};
};

const mapStateToProps = (state: any) => {
	return {
		storedLiked: state.llr.liked,
		storedLoved: state.llr.loved,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
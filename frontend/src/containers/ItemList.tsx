import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

/* redux */
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';

import Item from '../components/Item';

import './ItemList.css'

interface Props{
    itemclass: string;
}

interface Propss{
	storedLiked: LikeLoveDict;
}

type LikeLoveDict = {
	[key: string]: number[],
}

type Propsss = RouteComponentProps<Props> & Propss

class ItemList extends Component<Propsss>{
    /*const {history, match} = props;

    let imagelist: string[] = [];*/
	componentDidMount(){
		console.log(this.props.storedLiked[this.props.match.params.itemclass]);
	}
	
	render(){
		let imagelist: string[] = [];
		
		var count: number = 1;
		while(true){
			try{
				imagelist.push((require(`../items/${this.props.match.params.itemclass}/${count}.jpg`).default))
				count = count + 1;
			} catch(error){
				break;
			}
		}

		var count2: number = 0;
		let rowlist: JSX.Element[];
		const images = imagelist.map((image) =>{
			if(count2 % 4 === 0 ){
				rowlist = []
			}
			count2 = count2 + 1
			rowlist.push(<Item
							 history = {this.props.history}
							 image = {image}
							 category = {this.props.match.params.itemclass}
							 number = {count2}
							 />) 
			if((count2 % 4 === 0) || (count2 === count-1)){        
				return(
					<div className = 'Row'>
						{rowlist} 
					</div>
				);
			}
		});    



		return(
			<div className = 'ItemList'>
				{images}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		storedLiked: state.llr.liked,
		storedLoved: state.llr.loved,
	};
};

export default connect(mapStateToProps, null)(ItemList);
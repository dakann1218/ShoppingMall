import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import Item from '../components/Item';

import './ItemList.css'

interface Props{
    itemclass: string;
}

class ItemList extends Component<RouteComponentProps<Props>>{
    /*const {history, match} = props;

    let imagelist: string[] = [];*/
	
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
							 name = {this.props.match.params.itemclass + String(count2)}
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

export default ItemList;
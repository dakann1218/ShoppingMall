import React from 'react';
import {History} from 'history';

import './Item.css';


interface Props{
    history: History;
    image: string;
}

function Item(props: Props){
    const {history, image} = props;

    return(
        <div className = 'Item'>
            <img onClick ={ ()=> history.push('/item')} src = {image} alt = ''/>
            <div>{'Title: ...'}</div>
            <div>{'Description: ...'}</div>
            <div>{'Price: 20000'}</div>
			<img
				className = 'Like' 
				onClick ={ ()=> alert('Like it!')}
				src = {require('../items/like.PNG').default} alt=''/>
			<img
				className = 'Love'
				onClick ={ ()=> alert('Pick it!')}
				src = {require('../items/love.PNG').default} alt=''/>
        </div>
    );
}

export default Item;
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
            <h1>{'Title...'}</h1>
            <h1>{'Description...'}</h1>
            <h1>{'Price: 20000'}</h1>
        </div>
    );
}

export default Item;
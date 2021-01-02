import React from 'react';
import {History} from 'history';
import { withRouter } from 'react-router-dom';

import './Category.css';

interface Props{
	history: History;
}

function Category(props: Props){
	const {history} = props;
	
	return(
		<div className = 'Category'>
            <button onClick = {() => history.push('/itemlist/neat')}>Neat</button>
            <button onClick = {() => history.push('/itemlist/sweatshirt')}>Sweat shirt</button>
            <button onClick = {() => history.push('/itemlist/coat')}>Coat</button>            
        </div>
	);
}

export default Category;
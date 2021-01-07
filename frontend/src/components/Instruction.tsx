import React,{ useState, useEffect } from 'react';

import './Instruction.css';

function Instruction(){
	const [X, setX] = useState(true);
	
	useEffect(() => {
		
	},[X])
	
	
	const instruction = ( X ? (
		<div className = 'FloatingInstruction'>
			<button onClick = { () => setX(false) }>X</button>
			<div className = 'Content'>
				<div className = 'Instruction'>
					<img src = {require('../items/like_gray.png').default} alt = ''></img>
					<img className = 'Arrow' src = {require('../items/arrow.png').default} alt = ''></img>
					<img src = {require('../items/like.PNG').default} alt = ''></img>
				</div>
				<h5>You can click 'like' to turn it on. It actually has no function yet.</h5>
				<div className = 'Instruction'>
					<img src = {require('../items/love_gray.png').default} alt = ''></img>
					<img className = 'Arrow' src = {require('../items/arrow.png').default} alt = ''></img>
					<img src = {require('../items/love.PNG').default} alt = ''></img>
				</div>
				<h5>You can put your item in your basket by clicking 'love'</h5>
			</div>
		</div>
		) : []
	);
	
	return(
		<>
			{ instruction }
		</>
	);
}

export default Instruction;
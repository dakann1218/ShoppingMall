import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './QnAContent.css';

interface Props{
	onClickRefresh: () => void;
}

function QnAContent(props: Props){
	const { onClickRefresh } = props;
	const [ title, setTitle ] = useState<string>('');
	const [ content, setContent ] = useState<string>('');
	
	useEffect(() =>{
		
	},[title,content]);
	
	const onClickSubmit = () => {
		const id: string | null = window.sessionStorage.getItem('id');
		
		if (id === null){
			
			alert('Please login to submit QnA.');
			
		}else{
			
			axios.post('/api/addQnA/', {'id': id, 'title': title, 'content': content })
			.then(res => {
				alert('QnA submitted!');
				onClickRefresh();
			})
			.catch(err => alert('Error'));
			
		}
	}
	
	
	return(
		<div className = 'QnAContent'>
			<label>Title</label>
			<input 
			className = 'Title'
			placeholder = {'Please write your QnA title!'}
			value = { title }
			onChange = {(e) => setTitle( e.target.value )}>
			</input>

			<label>Content</label>
			<textarea
			className = 'Content'
			placeholder = 'Please write your QnA content!'
			value = { content }
			onChange = {(e) => setContent( e.target.value )}>
			</textarea>
			<button className = 'Submit' onClick = { onClickSubmit }>Submit</button>
		</div>
	
	);
}

export default QnAContent;
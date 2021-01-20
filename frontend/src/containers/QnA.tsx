import React, { useState, useEffect } from 'react';
import { History } from 'history';
import axios from 'axios';

import './QnA.css';

import QnAList from '../components/QnAList';
import QnAContent from '../components/QnAContent';

interface Props{
	history: History;
}

/*
	크게 3개 레이어로 나누고
	왼쪽은 리스트랑 QnA
	map으로 컴포넌트 배열
*/
function QnA(props: Props){
	const { history } = props;
	const [	content_flag, setContentFlag ] = useState<string>( 'INSTRUCTION' );
	const [ content, setContent ] = useState<JSX.Element>( <></> );
	const [ qna_list, setQnAList ] = useState<{[id: string] : string}[]>([{'id': 'id' , 'title': 'b' , 'content': 'c' }]);
	
	useEffect(() => {
		if (content_flag === 'INSTRUCTION'){
			setContent( <h1>Instruction</h1> );
		}else if (content_flag === 'NEWQNA'){
			setContent( <QnAContent onClickRefresh = { onClickRefresh }/> );
		}
	},[content_flag]);
	
	const onClickRefresh = () => {
		axios.get('/api/getQnA/')
		.then((res) => {
			setQnAList(res.data.qna_list);			
		})
		.catch((err) => { alert('QnA List Error') });
	}
	
	const onClickDelete = (dict: { [id: string] : string }) => {
		axios.delete('/api/deleteQnA/', { data: dict })
		.then((res) => {
			alert('Deleted QnA.');
			setContentFlag('INSTRUCTION');
			onClickRefresh();
		})
		.catch((err) => alert('Delete Error'));
	}
	
	const onClickQnA = (dict: { [id: string] : string }) => {
		setContent(
			<>
			<h1 className = 'QnA_ID'>{`ID: ${dict.id}`}</h1>
			<div className = 'QnA_Title'>{`Title: ${dict.title}`}</div>
			<div className = 'QnA_Content'>{`Content: ${dict.content}`}</div>
			<button onClick = { () => onClickDelete(dict) }>Delete</button>
			</>
		);
		setContentFlag('QNA');
	}
	
    return(
        <div className = 'QnA'>
			<div className = 'Left'>
				<button className = 'Refresh' onClick = { onClickRefresh }>Refresh</button>	
				<QnAList qna_list = { qna_list }  onClickQnA = { onClickQnA }></QnAList>
				<button className = 'NewQnA' onClick = {() => setContentFlag('NEWQNA')}>
					New QnA
				</button>
			</div>
			
			<div className = 'Right'>
				<button className = 'Instruction' onClick = {() => setContentFlag('INSTRUCTION')}>?</button>
				{content}
			</div>
		</div>
    );
}




export default QnA;
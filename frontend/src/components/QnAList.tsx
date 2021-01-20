import React, { useState, useEffect } from 'react';

import './QnAList.css';

interface Props{
	qna_list: { [id: string]: string }[];
	onClickQnA: (value: { [id: string]: string }) => void;
}

function QnAList(props: Props){
	const { qna_list, onClickQnA } = props;
	
	const qnas: JSX.Element[] = qna_list.map((dict) => {
		return (
			<button className = 'Row' onClick = { () => onClickQnA(dict) }>{dict.title}</button>
		);
	})
	 /* [{'id':.. , 'title':.. , 'content':.. }] */
	
	return (
		<div className = 'QnAList'>
			{qnas}
		</div>
	);
}

export default QnAList;
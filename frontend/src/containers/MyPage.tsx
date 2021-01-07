import React from 'react';
import { History } from 'history';

import './MyPage.css'

interface Props{
    history: History;
}

function MyPage(props: Props){
    const {history} = props;

	const onClickOrderList = () => {
		if ( window.sessionStorage.getItem('id') === null ){
			alert('Please log in to see your order list!')
		}else{
			history.push('/orderlist')
		}
	}
	
	const onClickMyBasket = () => {
		if ( window.sessionStorage.getItem('id') === null ){
			alert('Please log in to see your basket!')
		}else{
			history.push('/mybasket')
		}
	}
	
    return(
        <div className = 'MyPage'>                
        <h1>My page</h1>
        <div className = 'Buttons'>
            <button>정보 변경</button>

            <button onClick = { onClickOrderList }>주문 내역</button>

            <button onClick = { onClickMyBasket }>장바구니</button>

            <button>My QnA</button>
        </div>
        </div>
    );
}




export default MyPage;
import React from 'react';
import { History } from 'history';

import './MyPage.css'

interface Props{
    history: History;
}

function MyPage(props: Props){
    const {history} = props;

    return(
        <div className = 'MyPage'>                
        <h1>My page</h1>
        <div className = 'Buttons'>
            <button>정보 변경</button>

            <button onClick = {() => history.push('/orderlist')}>주문 내역</button>

            <button onClick = {() => history.push('/mybasket')}>장바구니</button>

            <button>My QnA</button>
        </div>
        </div>
    );
}




export default MyPage;
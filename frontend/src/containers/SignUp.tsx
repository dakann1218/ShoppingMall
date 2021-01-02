import React, {useState} from 'react';
import { History } from 'history';

import './SignUp.css'

interface Props{
    history: History;
} 

function SignUp(props: Props){
    /*history*/
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    /*props*/
    const {history} = props;
    
    return(
        <div className = 'SignUp'>

            <div className = 'InputBox'>
                <div>
                <label>Email</label>
                <input 
                className = 'Email'
                placeholder = 'Insert Email'
                value = {Email}
                onChange = {(event) => setEmail(event.target.value)}
                ></input>
                </div>

                <div>
                <label>Address</label>
                <input 
                className = 'Address'
                placeholder = 'Insert Address'
                value = {Address}
                onChange = {(event) => setAddress(event.target.value)}
                ></input>
                </div>

                <div>
                <label>ID</label>
                <input 
                className = 'ID'
                placeholder = 'Insert ID'
                value = {ID}
                onChange = {(event) => setID(event.target.value)}
                ></input>
                </div>

                <div>
                <label>PW</label>
                <input 
                className = 'PW'
                placeholder = 'Insert PW'
                value = {PW}
                onChange = {(event) => setPW(event.target.value)}
                ></input>
                </div>

                <button onClick = {() => history.push('/signin')}>Sign up</button>
            </div>
        </div>
    );
}




export default SignUp;
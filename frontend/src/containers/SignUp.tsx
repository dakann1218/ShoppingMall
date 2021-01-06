import React, {useState} from 'react';
import { History } from 'history';
import axios from 'axios';

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
    
	const onClickSignUp = () =>{
		if(Email === ''){
			alert('Write your email!');
			
		}
		else if(Address === ''){
			alert('Write your address!');
		}
		else if(ID === ''){
			alert('Write your ID!');
		}
		else if(PW === ''){
			alert('Write your PW!')
		}
		else{
			axios.post('/api/signUp',{'id': ID, 'pw': PW, 'address': Address, 'email': Email})
			.then((res) => {
				if(res.data.no_duplicate){
					alert('Sign up success!');
					history.push('/signin');
				}else{
					alert('Duplicate ID!');
				}
			})
			.catch((err) => alert('Sign up error'))
		}
	}
	
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

                <button onClick = {onClickSignUp}>Sign up</button>
            </div>
        </div>
    );
}




export default SignUp;
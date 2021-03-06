import React, { useState } from 'react';
import { History } from 'history';
import axios from 'axios';

import './SignIn.css'

interface Props{
	history: History;
}


function SignIn(props: Props){
	/*state*/
	const [ID,setID] = useState<string>('');
	const [PW,setPW] = useState<string>('');
	/*props*/
	const {history} = props

	/* When clicked sign in ->	1. Check if ID/PW are written properly.
								2. If ID/PW are not written properly -> do nothing.
								3. If ID/PW are written properly
								->	3-1. Send input ID/PW to backend.
									3-2. Backend checks if ID/PW exists on DB and send message to frontend.
									3-3. If ID/PW exists, set data in session storage and push to '/main'.
									3-4. If not, alert message.
	*/
	const onClickSignIn = () => {
		
		if (ID === ''){
			alert('Write your ID!');
		}
		else if (PW === ''){
			alert('Write your PW!');
		}
		else{
			axios.get(`/api/signIn/${ID}/${PW}`)
			.then((res) => {
				if (res.data.certification){
					window.sessionStorage.setItem('id', ID);
					
					axios.get(`/api/getAllLikeLove/${ID}`)
					.then((res) => {
						window.sessionStorage.setItem('liked', res.data.liked)
						window.sessionStorage.setItem('loved', res.data.loved)
						history.push('/main');
					})
					.catch((err) => alert('Loading like love error'))
				}else{
					alert('Wrong ID or PW!');
				}
			})
			.catch((err) => alert('Sign in error'))
		}
		
	}
	
	
	
    return(
        <div className = 'SignIn'>
			
			<div className = 'InputBox'>
				<div>
				<label>ID</label>
				<input
				placeholder = 'Insert ID'
				value = {ID}
				onChange = {(event) => setID(event.target.value)}
				/>
				</div>
				
				<div>
				<label>PW</label>
				<input
				placeholder = 'Insert PW'
				value = {PW}
				onChange = {(event) => setPW(event.target.value)}
				/>
				</div>
			</div>

			<div>
				<button	className = 'SignIn' onClick = { onClickSignIn }>
					Sign in
				</button>
				<button className = 'SignUp' onClick = {() => history.push('/signup')}>
					Sign up
				</button>
			</div>
			
        </div>
    );
}




export default SignIn;
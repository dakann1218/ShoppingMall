import React, { useState } from 'react';
import {History} from 'history';
/* redux */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actionTypes from '../store/actions/actionTypes';

import './SignIn.css'

interface Props{
	history: History;
	onInitialize: () => void;
}

function SignIn(props: Props){
	/*state*/
	const [ID,setID] = useState<string>('');
	const [PW,setPW] = useState<string>('');
	/*props*/
	const {history, onInitialize} = props

	const onClickSignIn = () =>{
		if (ID === 'JaeJoon' && PW === 'dakann1218'){
			onInitialize();
			/*history.push('/main');*/
		}else{
			alert('Invalid ID or PW')
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
				<button	className = 'SignIn' onClick = {() => onClickSignIn()}>
					Sign in
				</button>

				<button className = 'SignUp' onClick = {() => history.push('/signup')}>
					Sign up
				</button>
			</div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		onInitialize: () =>
		dispatch({ type: actionTypes.GET_INITIAL }),
	};
};

export default connect(null, mapDispatchToProps)(SignIn);
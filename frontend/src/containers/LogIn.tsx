import React from 'react';


function LogIn(){
    return(
        <div className = 'LogIn'>                
        	<h1>This is log in page</h1>
			
			<label>ID</label>
			<input 
			className = 'ID'
			placeholder = 'ID' 
			/>
			
			<label>PW</label>
			<input
			className = 'PW'
			placeholder = 'PW'
			/>
			
			<button	className = 'SignIn' onClick = {() => alert('Sign in!')}>
				Sign in
			</button>
	
			<button className = 'SignUp' onClick = {() => alert('Sign up!')}>
				Sign up
			</button>
        </div>
    );
}




export default LogIn;
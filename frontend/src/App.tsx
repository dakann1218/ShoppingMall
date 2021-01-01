import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { Router } from 'react-router';
import { History } from 'history';

import Header from './components/Header';
import Category from './components/Category';
import MainPage from './containers/MainPage'
import LogIn from './containers/LogIn'
import SignUp from './containers/SignUp'
import MyPage from './containers/MyPage'
import QnA from './containers/QnA'
import Item from './containers/Item'

interface Props{
	history: History;
}

function App(props: Props) {
	
	const {history} = props;
	
	return (
    	<Router history = {history}>
    	<div className="App">
			<Header history = {history}/>
			<Category history = {history}/>
			<Switch>
				<Route path = '/main' exact component = { MainPage } />
				<Route path = '/login' exact component = { LogIn } />
				<Route path = '/signup' exact component = { SignUp }  />
				<Route path = '/mypage' exact component = { MyPage } />
				<Route path = '/qna' exact component = { QnA } />
				<Route path = '/item' exact component = { Item }/>
				<Redirect exact from = '/' to = '/main' />
				<Route render = {()=> <h1>Not Found</h1>}/>
			</Switch>
		</div>
		</Router>
	  );
	}

export default App;

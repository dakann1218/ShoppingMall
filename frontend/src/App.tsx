import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { Router } from 'react-router';
import { History } from 'history';

import Header from './components/Header';
import Footer from './components/Footer';
import Category from './components/Category';
import MainPage from './containers/MainPage';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import MyPage from './containers/MyPage';
import QnA from './containers/QnA';
import ItemPage from './containers/ItemPage';
import ItemList from './containers/ItemList';
import MyBasket from './containers/MyBasket';
import OrderPage from './containers/OrderPage';
import OrderList from './containers/OrderList';

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
				<Route path = '/signin'  render = {() => <SignIn history = {history}/> } />
				<Route path = '/signup' render = {() => <SignUp history = {history}/> }  />
				<Route path = '/mypage' render = {() => <MyPage history = {history}/> } />
				<Route path = '/qna' exact component = { QnA } />
				<Route path = '/item/:category/:number' exact component = { ItemPage } />
				<Route path = '/itemlist/:itemclass' exact component = { ItemList } />
				<Route path = '/mybasket' exact component = { MyBasket } />
				<Route path = '/orderpage/:category/:number/:size/:color' exact component = {OrderPage} />
				<Route path = '/orderlist' exact component = {OrderList}/>
				<Redirect exact from = '/' to = '/main' />
				<Route render = {()=> <h1>Not Found</h1>}/>
			</Switch>
			<Footer/>
		</div>
		</Router>
	  );
	}

export default App;

import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import MainPage from './containers/MainPage'
import LogIn from './containers/LogIn'
import SignUp from './containers/SignUp'
import MyPage from './containers/MyPage'
import QnA from './containers/QnA'
import Item from './containers/Item'



function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
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
    </BrowserRouter>
  );
}

export default App;

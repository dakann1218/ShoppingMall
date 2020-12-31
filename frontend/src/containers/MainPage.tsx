import React from 'react';
import { History } from 'history';

import './MainPage.css';

import Banner from '../components/Banner'
import Footer from '../components/Footer'

import image1 from '../items/1.jpg'; 
import image2 from '../items/2.jpg'; 
import image3 from '../items/3.jpg'; 
import image4 from '../items/4.jpg'; 
import image5 from '../items/5.jpg'; 
import image6 from '../items/6.jpg'; 

interface Props {
    history: History;
}

function MainPage(props: Props){
    const {history} = props;

    return(
        <div className = 'MainPage'>
        
        {/*Header*/}
        <div className = 'Header'>
            <h1>JarDek</h1>
            <div className = 'Menu'>
                <button onClick = {() => history.push('/login')}>Log in</button>
                <button onClick = {() => history.push('/signup')}>Sign up</button>
                <button onClick = {() => history.push('/mypage')}>My Page</button>
                <button onClick = {() => history.push('/qna')}>QnA</button>
            </div>
        </div>

        {/*Category*/}
        <div className = 'Category'>
            <button onClick = {() => history.push('/neat')}>Neat</button>
            <button onClick = {() => history.push('/sweatshirt')}>Sweat shirt</button>
            <button onClick = {() => history.push('/coat')}>Coat</button>            
        </div>

        {/*Banner*/}
        <Banner/>


        {/*Best Choice*/}
        {/*To be changed with .map function*/}
        <div className = 'BestChoice'>
            <h1>Best Choice</h1>
            <div className = 'Items'>
                <img onClick ={ ()=> history.push('/item')} src = {image1} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image2} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image3} alt = ''/>
            </div>
        
            <div className = 'Items'>
                <img onClick ={ ()=> history.push('/item') } src = {image4} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image5} alt = ''/>
                <img onClick ={ ()=> history.push('/item') } src = {image6} alt = ''/>
            </div>
        </div>

        {/*Footer*/}
        <Footer/>







        </div>
    );
}




export default MainPage;
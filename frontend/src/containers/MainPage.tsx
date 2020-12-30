import React from 'react';
import {NavLink} from 'react-router-dom';

import './MainPage.css';

import image1 from '../items/1.jpg'; 
import image2 from '../items/2.jpg'; 
import image3 from '../items/3.jpg'; 
import image4 from '../items/4.jpg'; 
import image5 from '../items/5.jpg'; 
import image6 from '../items/6.jpg'; 

function MainPage(){

    const onClickImage = () =>{
        alert('Image Clicked!')
    }

    return(
        <div className = 'MainPage'>
        
        <div className = 'Header'>
        <h1>JarDek</h1>
        <div className = 'Menu'>
        <NavLink to ='/login'>Log in</NavLink>
        <NavLink to ='/signup'>Sign up</NavLink>
        <NavLink to ='/mypage'>My Page</NavLink>
        <NavLink to ='/qna'>QnA</NavLink>
        </div>
        </div>

        <div className = 'Category'>
        <NavLink to ='/neat'>Neat</NavLink>
        <NavLink to ='/sweatshirt'>Sweat shirt</NavLink>
        <NavLink to ='/coat'>Coat</NavLink>            
        </div>

        <div className = 'Best choice'>
        
        <div className = 'Items'>
        <img onClick ={ ()=> onClickImage } src = {image1} alt = ''/>
        <img onClick ={ ()=> onClickImage } src = {image2} alt = ''/>
        <img onClick ={ ()=> onClickImage } src = {image3} alt = ''/>
        </div>
        <div className = 'Items'>
        <img onClick ={ ()=> onClickImage } src = {image4} alt = ''/>
        <img onClick ={ ()=> onClickImage } src = {image5} alt = ''/>
        <img onClick ={ ()=> onClickImage } src = {image6} alt = ''/>
        </div>
        
        </div>

        </div>
    );
}




export default MainPage;
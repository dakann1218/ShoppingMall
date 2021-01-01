import React from 'react';
import { History } from 'history';

import './MainPage.css';

import Banner from '../components/Banner';
import BestChoice from '../components/BestChoice'
import Footer from '../components/Footer';



interface Props {
    history: History;
}



function MainPage(props: Props){
    const {history} = props;

    return(
        <div className = 'MainPage'>

        {/*Banner*/}
        <Banner/>

        {/*Best Choice*/}
        {/*To be changed with .map function*/}
        <BestChoice history = {history}/>

        {/*Footer*/}
        <Footer/>

        </div>
    );
}




export default MainPage;
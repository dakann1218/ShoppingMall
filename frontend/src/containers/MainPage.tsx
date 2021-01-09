import React, { useState, useEffect } from 'react';
import { History } from 'history';

import './MainPage.css';

import Banner from '../components/Banner';
import BestChoice from '../components/BestChoice'
import Instruction from '../components/Instruction'


interface Props {
    history: History;
}

function MainPage(props: Props){
    const {history} = props;
	
    return(
        <div className = 'MainPage'>
			
			<Banner/>
			
			<BestChoice history = {history}/>

			<Instruction/>
			
        </div>
    );
}




export default MainPage;
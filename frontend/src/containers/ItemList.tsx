import React from 'react';
import { RouteComponentProps } from 'react-router';

import Item from '../components/Item';

import './ItemList.css'

interface Props{
    itemclass: string;
}

function ItemList(props: RouteComponentProps<Props>){
    const {history, match} = props;

    let imagelist: string[] = [];

    var count = 1;
    while(true){
        try{
            imagelist.push(require(`../items/${match.params.itemclass}/${count}.jpg`).default);
            count = count + 1;
        } catch(error){
            break;
        }
    }

    var count2 = 0;
    let rowlist: JSX.Element[];
    const images = imagelist.map((image) =>{
        if(count2 % 4 == 0 ){
            rowlist = []
        }
        rowlist.push(<Item history = {history} image = {image} />)
        count2 = count2 + 1
        if((count2 % 4 == 0) || (count2 == count-1)){        
            return(
                <div className = 'Row'>
                    {rowlist} 
                </div>
            );
        }
    });    



    return(
        <div className = 'ItemList'>
            {images}
        </div>
    );
}

export default ItemList;
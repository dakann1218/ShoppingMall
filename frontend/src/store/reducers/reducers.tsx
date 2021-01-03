import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';


const initialState: StateType = {
	liked: {'neat':[...Array(39).fill(0)],
			'sweatshirt':[...Array(39).fill(0)],
			'coat':[...Array(39).fill(0)]
		   },
	loved: {'neat':[...Array(39).fill(0)],
			'sweatshirt':[...Array(39).fill(0)],
			'coat':[...Array(39).fill(0)]
		   },
};

type StateType = {
	[key: string]: LikedLovedType,
}

type LikedLovedType = {
	[key: string]: number[],
}

type Actiontype ={
	[key: string]: any,
}

const reducer = (state = initialState, action: Actiontype) =>{
	
	switch(action.type){
		
		/* Initialize liked & loved */
		case actionTypes.GET_INITIAL:
			for (var index in Object.keys(state.liked)){
				const category:string = Object.keys(state.liked)[index];

				for(var i:number = 1; i < 40; i ++){
					axios.get(`/api/getLikeLove/${category}/${i}` ) 
					.then(res => {
						state.liked[category][i-1] = res.data.liked
						state.loved[category][i-1] = res.data.loved
					})
					.catch(err =>{
						   alert('Loading Error')
					});
				}
			}
			return state;
		
		/* Change liked */
		case actionTypes.CHANGE_LIKED:
			/* Change redux state - liked */
			const liked = state.liked[action.category][action.number - 1]
			if (liked){
				state.liked[action.category][action.number - 1] = 0
			}else{
				state.liked[action.category][action.number - 1] = 1
			}
			/*Change backend DB - liked*/
			axios.post('/api/changeLike/',{category: action.category, number: action.number})
			.then(res => null)
			.catch(err => alert('Error'));
			return state;
			
		/* Change loved */
		case actionTypes.CHANGE_LOVED:
			/* Change redux state - loved */
			const loved = state.loved[action.category][action.number - 1]
			if (loved){
				state.loved[action.category][action.number - 1] = 0
			}else{
				state.loved[action.category][action.number - 1] = 1
			}
			/*Change backend DB - loved*/
			axios.post('/api/changeLove/',{category: action.category, number: action.number})
			.then(res => null)
			.catch(err => alert('Error'));
			return state;
			
		/* Default */
		default:
			return state;
			
	}
	return state;
};

export default reducer;
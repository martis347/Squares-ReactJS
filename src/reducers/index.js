import {combineReducers} from 'redux';
import list from './listReducer';
import points from './pointsReducer';
import squares from './squaresReducer';

const rootReducer = combineReducers({
	list,
	points,
	squares
});

export default rootReducer;

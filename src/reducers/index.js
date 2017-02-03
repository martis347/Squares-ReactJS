import {combineReducers} from 'redux';
import list from './listReducer';
import points from './pointsReducer';
import squares from './squaresReducer';
import navigation from './navigationReducer';

const rootReducer = combineReducers({
	list,
	points,
	squares,
	//navigation
});

export default rootReducer;

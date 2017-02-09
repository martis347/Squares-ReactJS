import {combineReducers} from 'redux';
import list from './listReducer';
import points from './pointsReducer';
import squares from './squaresReducer';
import paging from './pagingReducer';

const rootReducer = combineReducers({
	list,
	points,
	squares,
	paging
});

export default rootReducer;

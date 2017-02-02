import * as types from './actionTypes';
import {beginApiCall, apiCallError, ApiEndpoint} from './apiCallActions';

export function getSquaresSuccess(squares) {
	return {type: types.GET_SQUARES_SUCCESS, squares};
}

export function getSquares(listName, page, pageSize) {
	return function (dispatch) {
		const params = {
			method: "GET"
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/squares/${listName}?page=${page}&pageSize=${pageSize}`, params)
			.then(squares => {
				dispatch(getSquaresSuccess(squares));
			}).catch(error => {
				dispatch(apiCallError());
				throw(error);
			});
	};
}

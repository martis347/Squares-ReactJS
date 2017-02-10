import * as types from './actionTypes';

export function getSquaresSuccess(squares) {
	return {type: types.GET_SQUARES_SUCCESS, squares};
}

export function getSquares(listName, page, pageSize) {
	return function (dispatch) {
		const params = {
			method: "GET"
		};
		return fetch(`${types.ApiEndpoint}/squares/${listName}?pageNumber=${page}&pageSize=${pageSize}`, params).then(result => {
			if(!result.ok) throw result;
			return result.json();
		}).then(squares => {
			dispatch(getSquaresSuccess(squares));
		}).catch(error => {
			throw(error);
		});
	};
}

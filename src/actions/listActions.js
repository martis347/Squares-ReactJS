import * as types from './actionTypes';
import {beginApiCall, apiCallError, ApiEndpoint} from './apiCallActions';

export function getListsSuccess(lists) {
	return {type: types.GET_LISTS_SUCCESS, lists};
}

export function postListSuccess() {
	return {type: types.POST_LIST_SUCCESS};
}

export function deleteListSuccess() {
	return {type: types.DELETE_LIST_SUCCESS};
}

export function getLists(direction) {
	return function (dispatch) {
		const params = {
			method: "GET"
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/lists?sort=${direction}`, params)
			.then(listNames => {
				dispatch(getListsSuccess(listNames));
			}).catch(error => {
				dispatch(apiCallError());
				throw(error);
			});
	};
}

export function addList(listName) {
	return function (dispatch) {
		const params = {
			method: "POST",
			body: {
				ListName: listName
			}
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/lists`, params)
			.then(() => {
				dispatch(postListSuccess());
			})
			.catch(error => {
				dispatch(apiCallError());
				throw(error);
			});
	};
}

export function deleteList(listName) {
	return function (dispatch) {
		const params = {
			method: "DELETE",
			body: {
				ListName: listName
			}
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/lists`, params)
			.then(() => {
				dispatch(deleteListSuccess());
			})
			.catch(error => {
				dispatch(apiCallError());
				throw(error);
			});
	};
}

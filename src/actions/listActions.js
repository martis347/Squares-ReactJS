import * as types from './actionTypes';
import {beginApiCall, apiCallError, ApiEndpoint} from './apiCallActions';

export function getListsSuccess(lists) {
	return {type: types.GET_LISTS_SUCCESS, lists};
}

export function postListSuccess(listName) {
	return {type: types.POST_LIST_SUCCESS, listName};
}

export function deleteListSuccess(listName) {
	return {type: types.DELETE_LIST_SUCCESS, listName};
}

export function getLists(direction) {
	return function (dispatch) {
		const params = {
			method: "GET"
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/lists?sort=${direction}`, params)
			.then(result => {
				return result.json();
			})
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
				dispatch(postListSuccess(listName));
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
				dispatch(deleteListSuccess(listName));
			})
			.catch(error => {
				dispatch(apiCallError());
				throw(error);
			});
	};
}

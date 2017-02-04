import * as types from './actionTypes';
import {beginApiCall, apiCallError, ApiEndpoint} from './apiCallActions';
import toastr from 'toastr';

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
		return fetch(`${ApiEndpoint}/lists?sort=${direction}`, params).then(result => {
			if (!result.ok) throw result;
			return result.json();
		}).then(listNames => {
			dispatch(getListsSuccess(listNames));
		}).catch(error => {
			error.json().then(error =>{
				toastr.error(error.Message);
			});
			dispatch(apiCallError());
		});
	};
}

export function addList(listName) {
	return function (dispatch) {
		const params = {
			method: "POST",
			body: JSON.stringify({
				ListName: listName
			}),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/lists`, params).then(result => {
			if(!result.ok) throw result;
			return result.json();
		}).then(() => {
			dispatch(postListSuccess(listName));
		}).catch(error => {
			dispatch(apiCallError());
			throw(error);
		});
	};
}

export function deleteList(listName) {
	return function (dispatch) {
		const params = {
			method: "DELETE",
			body: JSON.stringify({
				ListName: listName
			}),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		};
		debugger;
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/lists`, params).then((result) => {
			if(!result.ok) throw result;
			dispatch(deleteListSuccess(listName));
		}).catch(error => {
			dispatch(apiCallError());
			throw(error);
		});
	};
}

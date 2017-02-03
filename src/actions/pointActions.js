import * as types from './actionTypes';
import {beginApiCall, apiCallError, ApiEndpoint} from './apiCallActions';

export function getPointsSuccess(points) {
	return {type: types.GET_POINTS_SUCCESS, points};
}

export function putPointsSuccess() {
	return {type: types.PUT_POINTS_SUCCESS};
}

export function deletePointsSuccess() {
	return {type: types.DELETE_POINTS_SUCCESS};
}

export function getPoints(listName, direction, page, pageSize) {
	return function (dispatch) {
		const params = {
			method: "GET"
		};
		dispatch(beginApiCall());
		debugger;
		return fetch(`${ApiEndpoint}/points/${listName}?sort=${direction}&pageNumber=${page}&pageSize=${pageSize}`, params).then(result => {
			return result.json();
		}).then(points => {
			dispatch(getPointsSuccess(points));
		}).catch(error => {
			dispatch(apiCallError());
			throw(error);
		});
	};
}

export function addPoints(listName, points) {
	return function (dispatch) {
		const params = {
			method: "PUT",
			body: {
				ListName: listName,
				Points: points
			}
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/points`, params).then(result => {
			return result.json();
		}).then(() => {
			dispatch(putPointsSuccess());
		}).catch(error => {
			dispatch(apiCallError());
			throw(error);
		});
	};
}

export function deletePoints(listName, points) {
	return function (dispatch) {
		const params = {
			method: "DELETE",
			body: {
				ListName: listName,
				Points: points
			}
		};
		dispatch(beginApiCall());
		return fetch(`${ApiEndpoint}/points`, params).then(result => {
			return result.json();
		}).then(() => {
			dispatch(deletePointsSuccess());
		}).catch(error => {
			dispatch(apiCallError());
			throw(error);
		});
	};
}

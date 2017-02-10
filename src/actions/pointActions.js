import * as types from './actionTypes';

export function getPointsSuccess(points) {
	return {type: types.GET_POINTS_SUCCESS, points};
}

export function putPointsSuccess() {
	return {type: types.PUT_POINTS_SUCCESS};
}

export function deletePointsSuccess() {
	return {type: types.DELETE_POINTS_SUCCESS};
}

export function getPoints(listName, page, pageSize) {
	return function (dispatch) {
		const params = {
			method: "GET"
		};
		return fetch(`${types.ApiEndpoint}/points/${listName}?pageNumber=${page}&pageSize=${pageSize}`, params).then(result => {
			if(!result.ok) throw result;
			return result.json();
		}).then(points => {
			dispatch(getPointsSuccess(points));
		});
	};
}

export function addPoints(listName, points) {
	return function (dispatch) {
		const params = {
			method: "PUT",
			body: JSON.stringify({
				ListName: listName,
				Points: points
			}),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		};
		return fetch(`${types.ApiEndpoint}/points`, params).then(result => {
			if(!result.ok) throw result;
			return result.json();
		}).then(() => {
			dispatch(putPointsSuccess());
		}).catch(error => {
			throw(error);
		});
	};
}

export function deletePoints(listName, points) {
	return function (dispatch) {
		const params = {
			method: "DELETE",
			body: JSON.stringify({
				ListName: listName,
				Points: points
			}),
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		};
		return fetch(`${types.ApiEndpoint}/points`, params).then((result) => {
			if(!result.ok) throw result;
			dispatch(deletePointsSuccess());
		}).catch(error => {
			throw(error);
		});
	};
}

import expect from 'expect';
import React from 'react';
import * as pointActions from '../../src/actions/pointActions';
import pointsReducer from '../../src/reducers/pointsReducer';

describe('Points Reducer', () => {
	it('don`t change when passed PUT_POINTS_SUCCESS', () => {
		const initialState = {
			points: {
				Points: [{
					X: 5,
					Y: 7
				}, {
					X: 1,
					Y: 3
				}],
				PointsCount: 10
			}
		};
		const action = pointActions.putPointsSuccess();
		const newState = pointsReducer(initialState, action);

		expect(newState).toEqual(initialState);
	});

	it('don`t change when passed DELETE_POINTS_SUCCESS', () => {
		const initialState = {
			points: {
				Points: [{
					X: 5,
					Y: 7
				}, {
					X: 1,
					Y: 3
				}],
				PointsCount: 10
			}
		};
		const action = pointActions.deletePointsSuccess();
		const newState = pointsReducer(initialState, action);

		expect(newState).toEqual(initialState);
	});

	it('replace points when passed GET_POINTS_SUCCESS', () => {
		const initialState = {
			points: {
				Points: [{
					X: 5,
					Y: 7
				}, {
					X: 1,
					Y: 3
				}],
				PointsCount: 10
			}
		};
		const newPoints = {points: {Points: [{X:1, Y:2}, {X:3, Y:4}, {X:5, Y:6}], PointsCount: 15}};
		const action = pointActions.getPointsSuccess(newPoints);
		const newState = pointsReducer(initialState, action);

		expect(newState).toEqual(newPoints);
	});
});



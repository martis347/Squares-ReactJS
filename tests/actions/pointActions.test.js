import expect from 'expect';
import React from 'react';
import * as pointActions from '../../src/actions/pointActions';
import * as types from '../../src/actions/actionTypes';

describe('Point actions', () => {
	it('create GET_POINTS_SUCCESS action', () => {
		const points = {Points: [], PointsCount: 1};
		const expectedAction = {
			type: types.GET_POINTS_SUCCESS,
			points: points
		};

		const action = pointActions.getPointsSuccess(points);
		expect(action).toEqual(expectedAction);
	});

	it('create PUT_POINTS_SUCCESS action', () => {
		const expectedAction = {
			type: types.PUT_POINTS_SUCCESS
		};

		const action = pointActions.putPointsSuccess();
		expect(action).toEqual(expectedAction);
	});

	it('create DELETE_POINTS_SUCCESS action', () => {
		const expectedAction = {
			type: types.DELETE_POINTS_SUCCESS
		};

		const action = pointActions.deletePointsSuccess();
		expect(action).toEqual(expectedAction);
	});
});

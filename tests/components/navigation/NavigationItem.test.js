import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import NavigationItem from '../../../src/components/navigation/NavigationItem';

function setup() {
	const props = {
		listName: 'listName', paging: {},
		pointsActions: {}, squaresActions: {}, listActions: {}
	};

	return shallow(<NavigationItem {...props} />);
}

describe('Navigation item markup', () => {
	it('renders as list item', () => {
		const wrapper = setup();
		expect(wrapper.find('li').length).toBe(1);
	});

	it('has value of list name', () => {
		const wrapper = setup();
		expect(wrapper.find('.navigation-item').text()).toBe('listName');
	});

	it('has delete icon', () => {
		const wrapper = setup();
		expect(wrapper.find('img').prop('src')).toBe('./delete.png')
	});
});

describe('Navigation item behaviour', () => {
	let receivedValues = {getSquares: {}, getPoints: {}, router: {}, deleteList: {}};
	const props = {
		listName: 'listName', paging: {points: {page: 1, pageSize: 2}, squares: {page: 3, pageSize: 4}},
		pointsActions: {
			getPoints: (listName, page, pageSize) => {
				receivedValues.getPoints.listName = listName;
				receivedValues.getPoints.page = page;
				receivedValues.getPoints.pageSize = pageSize;

				return Promise.resolve()
			}
		},
		squaresActions: {
			getSquares: (listName, page, pageSize) => {
				receivedValues.getSquares.listName = listName;
				receivedValues.getSquares.page = page;
				receivedValues.getSquares.pageSize = pageSize;

				return Promise.resolve()
			}
		},
		listActions: {
			deleteList: (listName) => {
				receivedValues.deleteList.listName = listName;
			}
		}
	};

	before(done => {
		const context = {
			router: {
				push: (url) => {
					receivedValues.router.url = url;
					done();
				}
			}
		};
		const wrapper = mount(<NavigationItem {...props}/>, {context});
		const item = wrapper.find('.navigation-item a');
		item.simulate('click');
	});

	it('navigates on click and passes correct values to actions', () => {
		expect(receivedValues.getPoints.listName).toBe(props.listName);
		expect(receivedValues.getPoints.page).toBe(props.paging.points.page);
		expect(receivedValues.getPoints.pageSize).toBe(props.paging.points.pageSize);
		expect(receivedValues.getSquares.listName).toBe(props.listName);
		expect(receivedValues.getSquares.page).toBe(props.paging.squares.page);
		expect(receivedValues.getSquares.pageSize).toBe(props.paging.squares.pageSize);
		expect(receivedValues.router.url).toBe(`/${props.listName}`);
	});
});

describe('Navigation item behaviour', () => {
	let receivedValues = {deleteList: {}, router: {}};
	const props = {
		listName: 'listName', paging: {points: {page: 1, pageSize: 2}, squares: {page: 3, pageSize: 4}},
		pointsActions: {},
		squaresActions: {},
		listActions: {
			deleteList: (listName) => {
				receivedValues.deleteList.listName = listName;

				return Promise.resolve()
			}
		}
	};

	before(done => {
		const context = {
			router: {
				push: (url) => {
					receivedValues.router.url = url;
					done();
				}
			}
		};
		const wrapper = shallow(<NavigationItem {...props}/>, {context});
		const item = wrapper.find('.navigation-item img');
		item.simulate('click');

	});

	it('deletes item on click', () => {
		expect(receivedValues.deleteList.listName).toBe(props.listName);
		expect(receivedValues.router.url).toBe('/');
	});
});

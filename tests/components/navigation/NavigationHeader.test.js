import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import NavigationHeader from '../../../src/components/navigation/NavigationHeader';

function setup() {
	const props = {
		listAdd: () => {}
	};

	return shallow(<NavigationHeader {...props} />);
}

describe('Navigation header mark-up', () => {
	it('has link to home and add icon', () => {
		const wrapper = setup();
		expect(wrapper.find('li').length).toBe(1);
		expect(wrapper.find('h1').text()).toBe('Squares');
		expect(wrapper.find('img').prop('src')).toBe('./add.png');
	});
});

describe('Navigation header behaviour', () => {
	let receivedValues = {addList: {}, router: {}};
	const props = {
		listAdd: () => {}
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
		const wrapper = mount(<NavigationHeader listAdd={props.listAdd}/>, {context});
		const item = wrapper.find('.home');
		item.simulate('click');
	});

	it('routes to home on click', () => {
		expect(receivedValues.router.url).toBe('/');
	});
});

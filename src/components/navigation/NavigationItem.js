import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class NavigationItem extends React.Component {
	render() {
		return (
			<li>
				<a>{this.props.listName}</a>
			</li>
		);
	}
}

NavigationItem.propTypes = {
	listName: PropTypes.string.isRequired
};

NavigationItem.contextTypes = {
	router: PropTypes.object
};

export default NavigationItem;

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class NavigationItem extends React.Component {
	render() {
		debugger;
		return (
			<div className="navigation-item">
				<Link to={`/${this.props.listName}`}>
					{this.props.listName}
				</Link>
			</div>
		);
	}
}

NavigationItem.propTypes = {
	listName: PropTypes.string.isRequired
};

export default NavigationItem;

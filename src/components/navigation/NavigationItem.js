import React, {PropTypes} from 'react';

class NavigationItem extends React.Component {
	render() {
		return (
			<li>
				<a href="#" onClick={this.props.onClick} >{this.props.listName}</a>
			</li>
		);
	}
}

NavigationItem.propTypes = {
	listName: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

NavigationItem.contextTypes = {
	router: PropTypes.object
};

export default NavigationItem;

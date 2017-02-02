import React, {PropTypes} from 'react';

class NavigationComponent extends React.Component {
	render() {
		return (
			<div className="navigation">
				{this.props.children}
			</div>
		);
	}
}

NavigationComponent.propTypes = {
	children: PropTypes.array
};

export default NavigationComponent;

import React, {PropTypes} from 'react';

class NavigationComponent extends React.Component {
	render() {
		return (
			<div>
				<ul className="sidebar-nav">
					{this.props.children}
				</ul>
			</div>
		);
	}
}

NavigationComponent.propTypes = {
	children: PropTypes.array
};

export default NavigationComponent;

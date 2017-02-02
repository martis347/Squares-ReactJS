import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Navigation from '../containers/NavigationContainer';

class App extends React.Component {
	render() {
		return (
			<div id="wrapper">
				<div id="sidebar-wrapper">
					<Navigation />
				</div>
				<div id="page-content-wrapper">
					{this.props.children}
				</div>
			</div>

		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired
};

export default connect()(App);

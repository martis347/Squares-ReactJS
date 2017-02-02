import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';

class NavigationContainer extends React.Component {
	render() {
		return (
			<div>
				<p>Testing navigation</p>
			</div>
		);
	}
}

export default connect()(NavigationContainer)

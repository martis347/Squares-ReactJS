import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';

class HomeContainer extends React.Component {
	render() {
		return (
			<div>
				<p>Testing home</p>
			</div>
		);
	}
}

export default connect()(HomeContainer)

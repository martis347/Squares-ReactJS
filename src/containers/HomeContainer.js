import React from 'react';
import {connect} from 'react-redux';

class HomeContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}


	render() {
		return (
			<div>
				<h1>Squares application.</h1>
			</div>

		);
	}
}

HomeContainer.propTypes = {
};

function mapStateToProps() {
	return {
	};
}

function mapDispatchToProps() {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

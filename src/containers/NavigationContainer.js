import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../actions/listActions';
import * as pointsActions from '../actions/pointActions';
import * as squaresActions from '../actions/squareActions';
import NavigationComponent from '../components/navigation/NavigationComponent';
import NavigationItem from '../components/navigation/NavigationItem';

class NavigationContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeRequests: 0,
			listNames: []
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.listNames != nextProps.listNames) {
			this.setState({listNames: nextProps.listNames});
		}
	}

	handleLoadingStateChange = request => {
		this.setState({state: this.state.activeRequests + request});
	};

	render() {
		return (
			<NavigationComponent>
				{this.state.listNames.map((name, index) => {
					return (<NavigationItem listName={name}
											key={index}
											activeRequests={this.handleLoadingStateChange}
											pointsActions={this.props.pointsActions}
											squaresActions={this.props.squaresActions}
					/>);
				})}
			</NavigationComponent>
		);
	}
}

NavigationContainer.propTypes = {
	listNames: PropTypes.array,
	pointsActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		listNames: state.list.ListNames
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listActions: bindActionCreators(listActions, dispatch),
		squaresActions: bindActionCreators(squaresActions, dispatch),
		pointsActions: bindActionCreators(pointsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);

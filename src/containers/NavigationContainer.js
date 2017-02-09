import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../actions/listActions';
import * as pointsActions from '../actions/pointActions';
import * as squaresActions from '../actions/squareActions';
import NavigationComponent from '../components/navigation/NavigationComponent';
import NavigationItem from '../components/navigation/NavigationItem';
import NavigationHeader from '../components/navigation/NavigationHeader';

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
				<NavigationHeader
					listAdd={this.props.listActions.addList}
				/>
				{this.state.listNames.map((name, index) => {
					return (<NavigationItem listName={name}
											key={index}
											activeRequests={this.handleLoadingStateChange}
											pointsActions={this.props.pointsActions}
											squaresActions={this.props.squaresActions}
											listActions={this.props.listActions}
											paging={this.props.paging}
					/>);
				})}
			</NavigationComponent>
		);
	}
}

NavigationContainer.propTypes = {
	listNames: PropTypes.array,
	paging: PropTypes.object.isRequired,
	pointsActions: PropTypes.object.isRequired,
	listActions: PropTypes.object.isRequired,
	squaresActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		listNames: state.list.ListNames,
		paging: state.paging
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listActions: bindActionCreators(listActions, dispatch),
		squaresActions: bindActionCreators(squaresActions, dispatch),
		pointsActions: bindActionCreators(pointsActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pointsActions from '../actions/pointActions';
import * as squareActions from '../actions/squareActions';
import PointsComponent from '../components/dataPage/PointsTableComponent';
import SquaresComponent from '../components/dataPage/SquaresTableComponent';
import PointsAdditionComponent from '../components/dataPage/PointsAdditionComponent';
import toastr from 'toastr';

class DataContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			points: {
				Points: [],
				PointsCount: 0
			},
			squares: {
				Squares: [{
					Points: []
				}],
				SquaresCount: 0
			},
			paging: {
				page: 1,
				pageSize: 5
			},
			sort: "asc",
			activeRequests: 0
		};
	}

	componentWillMount() {
		this.setState({activeRequests: this.state.activeRequests + 1});
		this.props.pointsActions.getPoints(this.props.listName, "asc", 1, this.state.paging.pageSize).catch(error => {
			error.json().then(error => {
				toastr.error(error.Message);
			});
			this.state.activeRequests(-1);
		});

		this.setState({activeRequests: this.state.activeRequests + 1});
		this.props.squareActions.getSquares(this.props.listName, 1, this.state.paging.pageSize).catch(error => {
			error.json().then(error => {
				toastr.error(error.Message);
			});
			this.state.activeRequests(-1);
		});
	}

	componentWillReceiveProps(nextProp) {
		if (this.props.points !== nextProp.points) {
			this.setState({points: nextProp.points});
		}
		if (this.props.squares !== nextProp.squares) {
			this.setState({squares: nextProp.squares});
		}
	}

	render() {
		return (
			<div>
				<h1>Points that belong to current list.</h1>
				<PointsComponent
					getPoints={this.props.pointsActions.getPoints}
					points={this.state.points}
					listName={this.props.listName}
					deletePoint={this.props.pointsActions.deletePoints}
				/>
				<PointsAdditionComponent
					listName={this.props.listName}
					addPoints={this.props.pointsActions.addPoints}
					paging={this.state.paging}
					direction={"asc"}
					getPoints={this.props.pointsActions.getPoints}
					getSquares={this.props.squareActions.getSquares}
				/>
				<SquaresComponent
					getSquares={this.props.squareActions.getSquares}
					listName={this.props.listName}
					squares={this.props.squares}
				/>


			</div>
		);
	}
}

DataContainer.propTypes = {
	pointsActions: PropTypes.object.isRequired,
	squareActions: PropTypes.object.isRequired,
	points: PropTypes.object.isRequired,
	squares: PropTypes.object.isRequired,
	listName: PropTypes.string.isRequired
};

DataContainer.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		points: state.points,
		squares: state.squares,
		listName: ownProps.params.listName
	};
}

function mapDispatchToProps(dispatch) {
	return {
		pointsActions: bindActionCreators(pointsActions, dispatch),
		squareActions: bindActionCreators(squareActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);

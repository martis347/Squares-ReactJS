import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pointsActions from '../actions/pointActions';
import * as squareActions from '../actions/squareActions';
import * as pagingActions from '../actions/pagingActions';
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
			activeRequests: 0
		};
	}

	componentWillMount() {
		this.setState({activeRequests: this.state.activeRequests + 1});
		this.props.pointsActions.getPoints(this.props.listName, this.props.paging.points.page, this.props.paging.points.pageSize).then(() => {
			this.setState({activeRequests: this.state.activeRequests + 1});
			this.props.squareActions.getSquares(this.props.listName, this.props.paging.squares.page, this.props.paging.squares.pageSize).catch(() => {
				this.state.activeRequests(-1);
			});
		}).catch(error => {
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
					pagingActions={this.props.pagingActions}
					paging={this.props.paging.points}
				/>
				<PointsAdditionComponent
					listName={this.props.listName}
					addPoints={this.props.pointsActions.addPoints}
					paging={this.props.paging}
					getPoints={this.props.pointsActions.getPoints}
					getSquares={this.props.squareActions.getSquares}
				/>
				<SquaresComponent
					getSquares={this.props.squareActions.getSquares}
					listName={this.props.listName}
					squares={this.props.squares}
					paging={this.props.paging.squares}
					pagingActions={this.props.pagingActions}
				/>
			</div>
		);
	}
}

DataContainer.propTypes = {
	pointsActions: PropTypes.object.isRequired,
	squareActions: PropTypes.object.isRequired,
	pagingActions: PropTypes.object.isRequired,
	points: PropTypes.object.isRequired,
	squares: PropTypes.object.isRequired,
	listName: PropTypes.string.isRequired,
	paging: PropTypes.object.isRequired
};

DataContainer.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		points: state.points,
		squares: state.squares,
		paging: state.paging,
		listName: ownProps.params.listName,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		pointsActions: bindActionCreators(pointsActions, dispatch),
		squareActions: bindActionCreators(squareActions, dispatch),
		pagingActions: bindActionCreators(pagingActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);

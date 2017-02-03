import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import {bindActionCreators} from 'redux';
import * as pointsActions from '../actions/pointActions';
import toastr from 'toastr';

class HomeContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pageSize: 10,
			page: 1,
			order: "asc",
			points: [],
			loading: false,
			pointsCount: 1
		};
	}

	componentWillReceiveProps(nextProp) {
		if (this.props.points !== nextProp.points) {
			this.setState({points: nextProp.points.Points, pointsCount: nextProp.points.PointsCount});
		}
	}

	handlePageClick = (data) => {
		this.setState({page: (data.selected + 1), loading: true});
		debugger;
		this.props.pointsAction.getPoints(this.props.listName, this.state.order, data.selected + 1, this.state.pageSize).then(() =>{
			this.setState({loading: false});
		}).catch(error => {
			toastr.error(error);
			this.setState({loading: false});
		});
	};

	render() {
		return (
			<div className="pointsTable">
				<table className="table table-hover">
					<thead>
					<tr>
						<th>X</th>
						<th>Y</th>
					</tr>
					</thead>
					<tbody>
					{this.state.points.map((point, key) => {
						return (<tr key={key}>
							<td>{point.X}</td>
							<td>{point.Y}</td>
						</tr>);
					})}
					</tbody>
				</table>
				<ReactPaginate 	previousLabel={"previous"}
								nextLabel={"next"}
								breakLabel={<a>...</a>}
								breakClassName={"break-me"}
								pageCount={Math.ceil(this.state.pointsCount / this.state.pageSize)}
								marginPagesDisplayed={1}
								pageRangeDisplayed={4}
								onPageChange={this.handlePageClick}
								containerClassName={"pagination"}
								subContainerClassName={"pages pagination"}
								activeClassName={"active"}/>
			</div>
		);
	}
}

HomeContainer.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		listName: ownProps.params.listName,
		points: state.points
	};
}

function mapDispatchToProps(dispatch) {
	return {
		pointsAction: bindActionCreators(pointsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

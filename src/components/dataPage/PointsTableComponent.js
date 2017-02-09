import React, {PropTypes} from 'react';
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';

class PointsTableComponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			paging: {
				pageSize: 5,
				page: 1,
			},
			points: {
				Points: [],
				PointsCount: 0
			},
			order: "asc",
			loading: false
		};
	}

	componentWillReceiveProps(nextProp) {
		if (this.props.points !== nextProp.points) {
			this.setState({points: nextProp.points});
		}
	}

	handleRowDelete = (data) => {
		const deletedItem = data;
		this.setState({loading: true});
		this.props.deletePoint(this.props.listName, [deletedItem]).then(() => {
			this.props.getPoints(this.props.listName, this.state.order, this.state.paging.page, this.state.paging.pageSize).then(() => {
				this.setState({loading: false});
			}).then(() => {
				toastr.success(`Successfully deleted point {${deletedItem.X};${deletedItem.Y}}`);
			}).catch(error => {
				error.text().then(error => {
					toastr.error(error);
				});
				this.setState({loading: false});
			});
		});
	};

	handlePageClick = (data) => {
		this.setState({
			paging: Object.assign({}, this.state.paging, {page: (data.selected + 1)}),
			loading: true
		});
		this.props.getPoints(this.props.listName, this.state.order, data.selected + 1, this.state.paging.pageSize).then(() => {
			this.setState({loading: false});
		}).catch(error => {
			toastr.error("Failed to receive data from server");
			this.setState({loading: false});
		});
	};

	emptyLines = () => {
		let array = [];
		for (let i = this.state.points.Points.length; i < this.state.paging.pageSize; i++){
			array.push(" ");
		}
		return array;
	};

	render() {
		console.log(this.props.listName);
		return (
			<div key={this.props.listName} className="pointsComponent">
				<table className="table table-hover pointsTable">
					<thead>
					<tr>
						<th colSpan="6">Point</th>
					</tr>
					<tr>
						<th>X</th>
						<th>Y</th>
						<th/>
					</tr>
					</thead>
					<tbody>
					{this.state.points.Points.map((point, key) => {
						return (
							<tr key={key} className="table-row">
								<td>{point.X}</td>
								<td>{point.Y}</td>
								<td onClick={() => this.handleRowDelete(point)}>
									<img src="./styles/delete.png"/>
								</td>
							</tr>);
					})}
					{this.emptyLines().map((point, key) => {
						return (
							<tr key={key} className="table-row">
								<td/>
								<td/>
								<td><br/></td>
							</tr>);
					})}
					</tbody>
				</table>

				<div className="tablePaginator" key={this.props.listName}>
					<ReactPaginate previousLabel={"previous"}
								   nextLabel={"next"}
								   breakLabel={<a>...</a>}
								   breakClassName={"break-me"}
								   pageCount={Math.ceil(this.state.points.PointsCount / this.state.paging.pageSize)}
								   marginPagesDisplayed={1}
								   pageRangeDisplayed={4}
								   onPageChange={this.handlePageClick}
								   containerClassName={"pagination"}
								   subContainerClassName={"pages pagination"}
								   activeClassName={"active"}

					/>
				</div>
			</div>
		);
	}
}

PointsTableComponent.propTypes = {
	getPoints: PropTypes.func.isRequired,
	points: PropTypes.object.isRequired,
	listName: PropTypes.string.isRequired,
	deletePoint: PropTypes.func
};

export default PointsTableComponent;

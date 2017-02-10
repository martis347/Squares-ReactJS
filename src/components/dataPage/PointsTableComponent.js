import React, {PropTypes} from 'react';
import ReactPaginate from 'react-paginate';
import PageSizeComponent from './PageSizeComponent';
import toastr from 'toastr';

class PointsTableComponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			points: {
				Points: [],
				PointsCount: 0
			}
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.props.points !== nextProps.points){
			this.setState({points: nextProps.points});
		}
	}

	handleRowDelete = (data) => {
		const deletedItem = data;
		this.props.deletePoint(this.props.listName, [deletedItem]).then(() => {
			this.props.getPoints(this.props.listName, this.props.paging.page, this.props.paging.pageSize).then(() => {
				toastr.success(`Successfully deleted point {${deletedItem.X};${deletedItem.Y}}`);
			}).catch(error => {
				error.text().then(error => {
					toastr.error(error);
				});
			});
		});
	};

	handlePageClick = (data) => {
		const nextPage = data.selected + 1;
		this.props.pagingActions.changePointsPage(nextPage);
		this.props.getPoints(this.props.listName, nextPage, this.props.paging.pageSize).catch(() => {
			toastr.error("Failed to receive data from server");
		});
	};

	handlePageSizeChange = (data) => {
		const nextPageSize = data.target.value;
		this.props.pagingActions.changePointsPageSize(nextPageSize);
		this.props.getPoints(this.props.listName, 1, nextPageSize).catch(() => {
			toastr.error("Failed to receive data from server");
		});
	};

	emptyLines = () => {
		let array = [];
		if (Math.ceil(this.state.points.PointsCount / this.props.paging.pageSize) > 1) {
			for (let i = this.state.points.Points.length; i < this.props.paging.pageSize; i++) {
				array.push(" ");
			}
		}

		return array;
	};

	render() {
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
									<img src="./delete.png"/>
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

				<div className="tablePaginator" key={this.props.paging.pageSize}>
					<ReactPaginate previousLabel={"previous"}
								   nextLabel={"next"}
								   breakLabel={<a>...</a>}
								   breakClassName={"break-me"}
								   pageCount={Math.ceil(this.state.points.PointsCount / this.props.paging.pageSize)}
								   marginPagesDisplayed={1}
								   pageRangeDisplayed={4}
								   onPageChange={this.handlePageClick}
								   containerClassName={"pagination"}
								   subContainerClassName={"pages pagination"}
								   activeClassName={"active"}

					/>
				</div>
				<PageSizeComponent onChange={this.handlePageSizeChange} listName={this.props.listName}/>
			</div>
		);
	}
}

PointsTableComponent.propTypes = {
	getPoints: PropTypes.func.isRequired,
	points: PropTypes.object.isRequired,
	paging: PropTypes.object.isRequired,
	listName: PropTypes.string.isRequired,
	pagingActions: PropTypes.object.isRequired,
	deletePoint: PropTypes.func
};

export default PointsTableComponent;

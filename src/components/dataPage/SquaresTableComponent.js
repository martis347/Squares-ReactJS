import React, {PropTypes} from 'react';
import ReactPaginate from 'react-paginate';
import PageSizeComponent from './PageSizeComponent';
import toastr from 'toastr';

class SquaresTableComponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			squares: {
				Squares: [{
					Points: []
				}],
				SquaresCount: 0
			},
			loading: false
		};
	}

	componentWillReceiveProps(nextProp) {
		if (this.props.squares !== nextProp.squares) {
			this.setState({squares: nextProp.squares});
		}
	}

	handlePageClick = (data) => {
		this.setState({
			loading: true
		});
		const nextPage = data.selected + 1;
		this.props.pagingActions.changeSquaresPage(nextPage);
		this.props.getSquares(this.props.listName, nextPage, this.props.paging.pageSize).then(() => {
			this.setState({loading: false});
		}).catch(() => {
			toastr.error("Failed to receive data from server");
			this.setState({loading: false});
		});
	};

	handlePageSizeChange = (data) => {
		this.setState({loading: true});
		const nextPageSize = data.target.value;
		this.props.pagingActions.changeSquaresPageSize(nextPageSize);
		this.props.getSquares(this.props.listName, 1, nextPageSize).then(() => {
			this.setState({loading: false});
		}).catch(() => {
			toastr.error("Failed to receive data from server");
			this.setState({loading: false});
		});
	};

	emptyLines = () => {
		let array = [];
		for (let i = this.state.squares.Squares.length; i < this.props.paging.pageSize; i++){
			array.push(" ");
		}
		return array;
	};

	render() {
		return (
			<div className="squaresTable" key={this.props.listName}>
				<table className="table table-hover">
					<thead>
					<tr>
						<th colSpan="2">Point 1</th>
						<th colSpan="2">Point 2</th>
						<th colSpan="2">Point 3</th>
						<th colSpan="2">Point 4</th>
					</tr>
					<tr>
						<th>X</th>
						<th>Y</th>
						<th>X</th>
						<th>Y</th>
						<th>X</th>
						<th>Y</th>
						<th>X</th>
						<th>Y</th>
					</tr>
					</thead>
					<tbody>
					{this.state.squares.Squares.map((square, key) => {

						if (square.Points.length > 0) {
							return (
							<tr key={key}>
								<td>{square.Points[0].X}</td>
								<td>{square.Points[0].Y}</td>
								<td>{square.Points[1].X}</td>
								<td>{square.Points[1].Y}</td>
								<td>{square.Points[2].X}</td>
								<td>{square.Points[2].Y}</td>
								<td>{square.Points[3].X}</td>
								<td>{square.Points[3].Y}</td>
							</tr>);
						}
					})}
					{this.emptyLines().map((square, key) => {
						return (
							<tr key={key}>
								<td><br/></td>
								<td><br/></td>
								<td><br/></td>
								<td><br/></td>
								<td><br/></td>
								<td><br/></td>
								<td><br/></td>
								<td><br/></td>
							</tr>
						);
					})}
					</tbody>
				</table>

				<div className="tablePaginator">
					<ReactPaginate previousLabel={"previous"}
								   nextLabel={"next"}
								   breakLabel={<a>...</a>}
								   breakClassName={"break-me"}
								   pageCount={Math.ceil(this.state.squares.SquaresCount / this.props.paging.pageSize)}
								   marginPagesDisplayed={1}
								   pageRangeDisplayed={4}
								   onPageChange={this.handlePageClick}
								   containerClassName={"pagination"}
								   subContainerClassName={"pages pagination"}
								   activeClassName={"active"}/>
				</div>
				<PageSizeComponent onChange={this.handlePageSizeChange} listName={this.props.listName}/>
			</div>

		);
	}
}

SquaresTableComponent.propTypes = {
	squares: PropTypes.object.isRequired,
	getSquares: PropTypes.func.isRequired,
	listName: PropTypes.string.isRequired,
	pagingActions: PropTypes.object.isRequired,
	paging: PropTypes.object.isRequired
};

export default SquaresTableComponent;

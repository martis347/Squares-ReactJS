import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';

//import {bindActionCreators} from 'redux';

class HomeContainer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			pageSize: 10,
			page: 1,
			order: "asc",
		};
	}

	handlePageClick = (data) => {
		let selected = data.selected;
		let offset = Math.ceil(selected * this.props.perPage);

		this.setState({offset: offset}, () => {
			this.loadCommentsFromServer();
		});
	};

	render() {
		debugger;
		return (
			<div id="page-content-wrapper">
				<div className="container-fluid">
					<h1>AAAAAAAAAAAAAAAAAAAAAAAAAA</h1>
					<h2>{this.props.listName}</h2>
					<ReactPaginate 	previousLabel={"previous"}
									nextLabel={"next"}
									breakLabel={<a>...</a>}
									breakClassName={"break-me"}
									pageCount={20}
									marginPagesDisplayed={2}
									pageRangeDisplayed={4}
									onPageChange={this.handlePageClick}
									containerClassName={"pagination"}
									subContainerClassName={"pages pagination"}
									activeClassName={"active"} />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		listName: ownProps.params.listName
	};
}

export default connect(mapStateToProps)(HomeContainer);

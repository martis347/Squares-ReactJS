import React, {PropTypes} from 'react';
import toastr from 'toastr';

class NavigationItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	handleItemClick = e => {
		this.props.activeRequests(1);
		const listName = e.currentTarget.textContent;
		this.props.pointsActions.getPoints(listName, this.props.paging.points.page, this.props.paging.points.pageSize).then(() => {
			this.props.activeRequests(1);
			this.props.squaresActions.getSquares(listName, this.props.paging.squares.page, this.props.paging.squares.pageSize).then(() => {
				this.redirect(listName);
			}).catch(() => {
				this.props.activeRequests(-1);
			});
		}).catch(() => {
			toastr.error("Failed to receive data from server.");
			this.props.activeRequests(-1);
		});


	};

	redirect(url) {
		this.context.router.push(`/${url}`);
		this.props.activeRequests(-1);
	}

	handleDelete = () => {
		const listName = this.props.listName;
		this.props.listActions.deleteList(listName).then(() => {
			debugger;
			toastr.success(`Successfully deleted list ${listName}`);
		}).catch(() => {
			toastr.error("Failed to delete item from list.");
		});
	};

	render() {
		return (
			<li className="navigation-item">
				<a href="#" onClick={this.handleItemClick}>
					<text>{this.props.listName}</text>
				</a>
				<img src="./styles/delete.png" onClick={this.handleDelete}/>
			</li>
		);
	}
}

NavigationItem.propTypes = {
	listName: PropTypes.string.isRequired,
	paging: PropTypes.object.isRequired,
	pointsActions: PropTypes.object.isRequired,
	squaresActions: PropTypes.object.isRequired,
	listActions: PropTypes.object.isRequired,
	activeRequests: PropTypes.func.isRequired
};

NavigationItem.contextTypes = {
	router: PropTypes.object
};

export default NavigationItem;

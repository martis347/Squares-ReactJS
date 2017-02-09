import React, {PropTypes} from 'react';
import toastr from 'toastr';

class NavigationItem extends React.Component {
	constructor(props){
		super(props);

		this.state = {
		};
	}

	handleItemClick = e => {
		this.props.activeRequests(1);
		const listName = e.currentTarget.textContent;
		this.props.pointsActions.getPoints(listName, "asc", 1, 5).then(() =>{
			this.props.activeRequests(1);
			this.props.squaresActions.getSquares(listName, 1, 5).then(() =>{
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
		this.props.listActions.deleteList(this.props.listName).then(() => {
			toastr.success(`Successfully deleted list ${this.props.listName}`);
		}).catch(() => {
			toastr.error("Failed to delete item from list.");
		})
	};

	render() {
		return (
			<li className="navigation-item">
				<a href="#" onClick={this.handleItemClick} ><text>{this.props.listName}</text></a>
				<img src="./styles/delete.png" onClick={this.handleDelete}/>
			</li>
		);
	}
}

NavigationItem.propTypes = {
	listName: PropTypes.string.isRequired,
	pointsActions: PropTypes.object.isRequired,
	squaresActions: PropTypes.object.isRequired,
	listActions: PropTypes.object.isRequired,
	activeRequests: PropTypes.func.isRequired
};

NavigationItem.contextTypes = {
	router: PropTypes.object
};

export default NavigationItem;

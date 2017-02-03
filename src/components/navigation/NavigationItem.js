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
			}).catch(error => {
				error.json().then(error =>{
					toastr.error(error.Message);
				});
				this.props.activeRequests(-1);
			});
		}).catch(error => {
			error.json().then(error =>{
				toastr.error(error.Message);
			});
			this.props.activeRequests(-1);
		});


	};

	redirect(url) {
		this.context.router.push(`/${url}`);
		this.props.activeRequests(-1);
	}

	render() {
		return (
			<li>
				<a href="#" onClick={this.handleItemClick} >{this.props.listName}</a>
			</li>
		);
	}
}

NavigationItem.propTypes = {
	listName: PropTypes.string.isRequired,
	pointsActions: PropTypes.object.isRequired,
	squaresActions: PropTypes.object.isRequired,
	activeRequests: PropTypes.func.isRequired
};

NavigationItem.contextTypes = {
	router: PropTypes.object
};

export default NavigationItem;

import React, {PropTypes} from 'react';
import toastr from 'toastr';

class NavigationHeader extends React.Component {

	handleAddList = () => {
		let listName = window.prompt("Please enter a name for the new list");
		if(listName != null){
			this.props.listAdd(listName).then(() => {
				toastr.success("Successfully added a list!");
			});
		}
	};

	render() {
		return (
			<li className="navigation-header">
				<h1 className="home" onClick={() => this.context.router.push("/")}>Squares</h1>
				<img src="./styles/add.png" onClick={this.handleAddList}/>
			</li>
		);
	}
}

NavigationHeader.propTypes = {
	listAdd: PropTypes.func.isRequired
};

NavigationHeader.contextTypes = {
	router: PropTypes.object
};

export default NavigationHeader;

import React, {PropTypes} from 'react';
import toastr from 'toastr';

class PointsAdditionComponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			xCoord: "",
			yCoord: ""
		};
	}

	handleAdd = () => {
		this.setState({
			xCoord: "",
			yCoord: ""
		});
		this.props.addPoints(this.props.listName, [{X: this.state.xCoord, Y: this.state.yCoord}]).then(() => {
			this.props.getPoints(this.props.listName, this.props.direction, this.props.paging.page, this.props.paging.pageSize).then(() => {
				toastr.success("Successfully added new point!");
			}).catch(error => {
				error.json().then(error => {
					toastr.error(error.Message);
				});
			});
		}).catch(error => {
			error.json().then(error => {
				toastr.error(error.Message);
			});
		});
	};

	render() {
		return (
			<div>
				<div className="form-group">
					<label>Add new coordinates</label>
					<input className="form-control" id="coordinates" placeholder="X" value={this.state.xCoord}
						   onChange={(e) => this.setState({xCoord: e.target.value})}/>
					<input className="form-control" id="coordinates" placeholder="Y" value={this.state.yCoord}
						   onChange={(e) => this.setState({yCoord: e.target.value})}/>
					<button className="form-control" id="coordinates-btn" placeholder="" onClick={this.handleAdd}>Add
					</button>
				</div>
			</div>
		);
	}
}

PointsAdditionComponent.propTypes = {
	addPoints: PropTypes.func.isRequired,
	getPoints: PropTypes.func.isRequired,
	listName: PropTypes.string.isRequired,
	paging: PropTypes.object.isRequired,
	direction: PropTypes.string.isRequired
};

export default PointsAdditionComponent;

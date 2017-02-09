import React, {PropTypes} from 'react';
import toastr from 'toastr';
import Formsy from 'formsy-react';
import InputForm from './InputForm';


class PointsAdditionComponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			xCoord: "",
			yCoord: "",
			canAdd: true
		};
		this.enableButton = this.enableButton.bind(this);
		this.disableButton = this.disableButton.bind(this);
	}

	handleAdd = () => {
		const X = this.state.xCoord, Y = this.state.yCoord;
		this.props.addPoints(this.props.listName, [{X: this.state.xCoord, Y: this.state.yCoord}]).then(() => {
			this.props.getPoints(this.props.listName, this.props.direction, this.props.paging.page, this.props.paging.pageSize).then(() => {
				this.props.getSquares(this.props.listName, this.props.paging.page, this.props.paging.pageSize).catch(() => {
					toastr.error("Failed to receive data from server");
				});
			}).then(() => {
				toastr.success(`Successfully added new point {${X};${Y}}`);
			}).catch(() => {
				toastr.error("Failed to receive data from server");
			});
		}).catch(error => {
			if(error.message !== undefined){
				toastr.error("Unable to add a new point. Server is not responding.");
			} else {
				error.json().then(error => {
					if(error.Message.substring(0, 19) === "Requests is invalid"){
						toastr.warning("Invalid coordinates provided. Point not added.");
					} else {
						toastr.error(error.Message);
					}
				});
			}
			error.json().then(error => {
				toastr.error(error.Message);
			});
		});
	};

	enableButton() {
		this.setState(Object.assign({}, this.state, {canAdd: true}));
	}

	disableButton() {
		this.setState(Object.assign({}, this.state, {canAdd: false}));
	}

	validSubmit() {
		this.setState(Object.assign({}, this.state, {
			xCoord: "",
			yCoord: ""
		}));
	}

	render() {
		return (
			<div className="addition-form">
				<div className="form-group">
					<label>Add new coordinates</label>
					<Formsy.Form onValidSubmit={this.validSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
						<InputForm name="coordinatesX"
								   placeholder="X"
								   validationError="Coordinates value must be numeric and between {-5000;5000}"
								   required
								   value={this.state.xCoord}
								   onChange={(e) => this.setState({xCoord: e.target.value})}
								   validations={{
									validateCoordinate: function (values, value) {
										return value <= 5000 && value >= -5000;
									}
						}}/>
						<InputForm name="coordinatesY"
								   placeholder="Y"
								   validationError="Coordinates value must be numeric and between {-5000;5000}"
								   required
								   value={this.state.yCoord}
								   onChange={(e) => this.setState({yCoord: e.target.value})}
								   validations={{
									validateCoordinate: function (values, value) {
										return value <= 5000 && value >= -5000;
									}
						}}/>
						<button type="submit" disabled={!this.state.canAdd} onClick={this.handleAdd} className="btn btn-primary" id="coordinates-btn" placeholder="">Add</button>
					</Formsy.Form>
					{/*<label>Add new coordinates</label>
					<input className="form-control" id="coordinates" placeholder="X" value={this.state.xCoord}
						   onChange={(e) => this.setState({xCoord: e.target.value})}/>
					<input className="form-control" id="coordinates" placeholder="Y" value={this.state.yCoord}
						   onChange={(e) => this.setState({yCoord: e.target.value})}/>
					<button className="form-control" id="coordinates-btn" placeholder="" onClick={this.handleAdd}>Add
					</button>*/}
				</div>
			</div>
		);
	}
}

PointsAdditionComponent.propTypes = {
	addPoints: PropTypes.func.isRequired,
	getPoints: PropTypes.func.isRequired,
	getSquares: PropTypes.func.isRequired,
	listName: PropTypes.string.isRequired,
	paging: PropTypes.object.isRequired,
	direction: PropTypes.string.isRequired
};

export default PointsAdditionComponent;

import React, {PropTypes} from 'react';
import toastr from 'toastr';
import Formsy from 'formsy-react';
import InputForm from './InputForm';
import FileInput from './FileInput';

class PointsAdditionComponent extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			xCoord: "",
			yCoord: ""
		};

		this.handleError = this.handleError.bind(this);
		this.updateData = this.updateData.bind(this);
	}

	handleAdd = () => {
		const X = this.state.xCoord, Y = this.state.yCoord;

		this.props.addPoints(this.props.listName, [{X: this.state.xCoord, Y: this.state.yCoord}]).then(() => {
			this.updateData(`Successfully added new point {${X};${Y}}`, this.props.paging);
		}).catch(error => {
			this.handleError(error, "Invalid coordinates provided.");
		});
	};

	handleFileUpload = coordinatesList => {
		let request = [];
		for (let coordinate of coordinatesList) {
			if (coordinate !== undefined) {
				const points = coordinate.split(" ");
				request.push({X: points[0], Y: points[1]});
			}
		}

		this.props.addPoints(this.props.listName, request).then(() => {
			this.updateData(`Successfully added list of points`, this.props.paging);
		}).catch(error => {
			this.handleError(error, "File is invalid.");
		});
	};

	updateData = (successMessage, paging) => {
		debugger;
		this.props.getPoints(this.props.listName, paging.points.page, paging.points.pageSize).then(() => {
			this.props.getSquares(this.props.listName, paging.squares.page, paging.squares.pageSize).catch(() => {
				toastr.error("Failed to receive data from server");
			});
		}).then(() => {
			toastr.success(successMessage);
		}).catch(() => {
			toastr.error("Failed to receive data from server");
		});
	};

	handleError = (error, message) => {
		debugger;
		if (error.message !== undefined) {
			toastr.error("Unable to add a new points. Server is not responding.");
		} else {
			error.json().then(error => {
				if (error.Message.substring(0, 19) === "Requests is invalid") {
					toastr.warning(message);
				} else {
					toastr.error(error.Message);
				}
			});
		}
		error.json().then(error => {
			toastr.error(error.Message);
		});
	};

	submit = () => {
		this.setState({
			xCoord: "",
			yCoord: ""
		});
	};

	render() {
		return (
			<div className="addition-form" key={this.props.listName}>
				<div className="form-group">
					<label>Add new coordinates</label>
					<Formsy.Form onValidSubmit={this.submit}>
						<InputForm name="coordinatesX"
								   placeholder="X"
								   validationError="Coordinates values must be numeric and between {-5000;5000}"
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
								   validationError="Coordinates values must be numeric and between {-5000;5000}"
								   required
								   value={this.state.yCoord}
								   onChange={(e) => this.setState({yCoord: e.target.value})}
								   validations={{
									   validateCoordinate: function (values, value) {
										   return value <= 5000 && value >= -5000;
									   }
								   }}/>
						<button type="submit" onClick={this.handleAdd} className="btn btn-primary" id="coordinates-btn"
								placeholder="">Add
						</button>
					</Formsy.Form>
				</div>
				<FileInput onUpload={this.handleFileUpload}/>
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
	deletePoints: PropTypes.func
};

export default PointsAdditionComponent;

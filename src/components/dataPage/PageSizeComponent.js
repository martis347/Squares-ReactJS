import React, {PropTypes} from 'react';


class PageSizeComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentWillMount(){
		this.props.onChange({target: {value: 5}});
	}

	render() {
		return (
			<div className="pageSizePicker" key={this.props.listName}>
				<span>Page size</span>
				<div className="form-group">
					<select className="form-control" onChange={this.props.onChange}>
						<option>5</option>
						<option>10</option>
						<option>20</option>
						<option>50</option>
					</select>
				</div>
			</div>
		);
	}
}

PageSizeComponent.propTypes = {
	onChange: PropTypes.func.isRequired,
	listName: PropTypes.string.isRequired
};

export default PageSizeComponent;

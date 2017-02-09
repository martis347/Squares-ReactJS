import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';

const InputForm = React.createClass({
	propTypes: {
		placeholder: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired
	},

	mixins: [Formsy.Mixin],

	render() {
		const errorMessage = this.getErrorMessage();

		return (
			<div>
				<input className="form-control" id="coordinates" type="text" placeholder={this.props.placeholder} onChange={this.props.onChange}/>
				<span>{errorMessage}</span>
			</div>
		);
	}
});

export default InputForm;

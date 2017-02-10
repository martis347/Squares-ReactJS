import React, {PropTypes} from 'react';
import Formsy from 'formsy-react';
import toastr from 'toastr';

const InputForm = React.createClass({
	propTypes: {
		placeholder: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired
	},

	mixins: [Formsy.Mixin],

	render() {
		const errorMessage = this.getErrorMessage();
		if(errorMessage){
			toastr.warning(errorMessage)
		}
		return (
			<div>
				<input className="form-control" id="coordinates" type="text" placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value}/>
			</div>
		);
	}
});

export default InputForm;

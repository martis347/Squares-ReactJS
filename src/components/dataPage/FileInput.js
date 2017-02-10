import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import toastr from 'toastr';

class FileInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	onDrop = element => {
		const file = element[0];
		let coordinates;
		if (file) {
			let reader = new FileReader();
			reader.onload = e => {
				coordinates = e.target.result.split("\r\n");
				this.props.onUpload(coordinates);
			};
			reader.readAsText(file);
		} else {
			toastr.error("Failed to load file.");
		}

	};
	render() {
		return (
			<div className="fileInput">
				<Dropzone onDrop={this.onDrop}>
					<div>Drag & Drop a file here or simply click to choose.</div>
				</Dropzone>
			</div>
		);
	}
}

FileInput.propTypes = {
	onUpload: PropTypes.func.isRequired
};

export default FileInput;

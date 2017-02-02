import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../actions/listActions';
import NavigationComponent from '../components/navigation/NavigationComponent';
import NavigationItem from '../components/navigation/NavigationItem';

class NavigationContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			listNames: []
		};
	}

	componentWillReceiveProps(nextProps) {
		debugger;
		if (this.props.listNames != nextProps.listNames) {
			this.setState({listNames: nextProps.listNames});
		}
	}

	render() {
		return (
			<div>
				<NavigationComponent>
					{this.state.listNames.map((name, index) => {
						return <NavigationItem listName={name} key={index}/>;
					})}
				</NavigationComponent>
			</div>
		);
	}
}

NavigationContainer.propTypes = {
	listNames: PropTypes.array
};

function mapStateToProps(state) {
	return {
		listNames: state.list.ListNames
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listActions: bindActionCreators(listActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps())(NavigationContainer);

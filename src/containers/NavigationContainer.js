import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../actions/listActions';
import * as pointsActions from '../actions/pointActions';
import NavigationComponent from '../components/navigation/NavigationComponent';
import NavigationItem from '../components/navigation/NavigationItem';
import toastr from 'toastr';

class NavigationContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			listNames: []
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.listNames != nextProps.listNames) {
			this.setState({listNames: nextProps.listNames});
		}
	}

	handleListItemClick = e => {
		this.setState({loading: true});
		const listName = e.currentTarget.textContent;
		this.props.pointsAction.getPoints(listName, "asc", 1, 10).then(() =>{
			this.redirect(listName);
		}).catch(error => {
			toastr.error(error);
			this.setState({loading: false});
		});
	};

	redirect(url) {
		this.context.router.push(`/${url}`);
		this.setState({loading: false});
	}

	render() {
		return (
			<NavigationComponent>
				{this.state.listNames.map((name, index) => {
					return <NavigationItem listName={name} key={index} onClick={this.handleListItemClick}/>;
				})}
			</NavigationComponent>
		);
	}
}

NavigationContainer.propTypes = {
	listNames: PropTypes.array
};

NavigationContainer.contextTypes = {
	router: PropTypes.object
};

function mapStateToProps(state) {
	return {
		listNames: state.list.ListNames
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listActions: bindActionCreators(listActions, dispatch),
		pointsAction: bindActionCreators(pointsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);

/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import Navigation from './containers/NavigationContainer';
import routes from './components/routes';
import './styles/styles.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import '../node_modules/toastr/build/toastr.min.css';

const store = configureStore();

render(
	<Provider store={store}>
		<div>
			<Navigation/>
			<Router history={browserHistory} routes={routes}/>
		</div>
	</Provider>,
	document.getElementById("app")
);


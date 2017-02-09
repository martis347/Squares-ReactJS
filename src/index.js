/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './components/routes';
import './styles/styles.css';
import './styles/delete.png';
import './styles/add.png';
import {getLists} from "./actions/listActions";
import {apiCallError} from "./actions/apiCallActions";
import toastr from 'toastr';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/startbootstrap-simple-sidebar/css/simple-sidebar.css';

const store = configureStore();
store.dispatch(getLists("asc")).catch((error) => {
		toastr.error("Unable to connect to server.");
		store.dispatch(apiCallError());
		throw(error);
	});

render(
	<Provider store={store}>
		<div>
			<Router history={browserHistory} routes={routes}/>
		</div>
	</Provider>,
	document.getElementById("app")
);


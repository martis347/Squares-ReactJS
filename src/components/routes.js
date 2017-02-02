import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import Home from '../containers/HomeContainer';
import Home2 from '../containers/HomeContainer2';

export default (
	<div>
		<Route path="/" component={App} >
			<IndexRoute component={Home}/>
			<Route path="/:listName" component={Home2}/>
		</Route>
	</div>
);

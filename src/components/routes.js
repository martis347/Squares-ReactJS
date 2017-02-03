import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import Home from '../containers/HomeContainer';
import Data from '../containers/DataContainer';

export default (
	<div>
		<Route path="/" component={App} >
			<IndexRoute component={Home}/>
			<Route path="/:listName" component={Data}/>
		</Route>
	</div>
);

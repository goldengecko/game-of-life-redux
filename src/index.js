import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// We'll use the version from the cdn instead
// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux'

// These are the actions that can be performed in the application
import * as actionCreators from './actions/actionCreators';

// This is the owner and controller of the business logic behind the actions
import reducer from './business-logic';

// This is where we get the initial state for the system from
import { defaultState } from './initial-data';


export const store = createStore(reducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Make sure the properties and actions get bound so they can be accessed by the required components
function mapStateToProps(state) {
	return state;
}

function mapDispachToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

const AppWrapper = connect(mapStateToProps, mapDispachToProps) (App);

ReactDOM.render(
	<Provider store={store}>
		<AppWrapper />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();

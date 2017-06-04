import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// We'll use the version from the cdn instead
// import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux'

import * as actionCreators from './actions/actionCreators';

// Create a reducer to handle our actions
function reducer(state = {}, action) {
	let newState = Object.assign({}, state);
	switch(action.type) {
	case 'SET_ROWS':
		newState['rows'] = action.count;
		return newState;
	case 'SET_COLUMNS':
		newState['columns'] = action.count;
		return newState;
	case 'SET_BIRTH_FLAG':
		newState['birth'+action.number] = action.flag;
		return newState;
	case 'SET_SURVIVAL_FLAG':
		newState['survival'+action.number] = action.flag;
		return newState;
	case 'SET_FPS':
		newState['fps'] = action.fps;
		return newState;
	default:
		return state;
	}
}

// Set up the default state of the settings for the app
const defaultState = {
	rows: 25,
	columns:25,
	
	birth1:false,
	birth2:false,
	birth3:true,
	birth4:false,
	birth5:false,
	birth6:false,
	birth7:false,
	birth8:false,

	survival1:false,
	survival2:true,
	survival3:true,
	survival4:false,
	survival5:false,
	survival6:false,
	survival7:false,
	survival8:false,
	
	fps: 10,
}

const store = createStore(reducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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

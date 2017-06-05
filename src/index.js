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

// The size of history to keep when checking for oscillating loops
const HISTORY_CHECK_LENGTH = 5;

let stateHistory = [];
let animationFrame = null;

// Create a reducer to handle our actions
function reducer(state = {}, action) {
	let newState = Object.assign({}, state);
	// Ensure a deep copy of the selections
	newState.selection = Object.assign({}, state.selection);
	
	switch(action.type) {
	case 'SET_ROWS':
		newState.rows = action.count;
		return newState;
	case 'SET_COLUMNS':
		newState.columns = action.count;
		return newState;
	case 'SET_BIRTH_FLAG':
		newState['birth'+action.number] = action.flag;
		return newState;
	case 'SET_SURVIVAL_FLAG':
		newState['survival'+action.number] = action.flag;
		return newState;
	case 'SET_FPS':
		newState.fps = action.fps;
		return newState;
	case 'RANDOMIZE':
		newState.selection = generateRandomCellStates(state['rows'], state['columns']);
		newState.exitReason = '';
		newState.currentGeneration = 0;
		return newState;
	case 'CLEAR_BOARD':
		newState.selection = generateEmptyBoard(state['rows'], state['columns']);
		newState.exitReason = '';
		newState.currentGeneration = 0;
		return newState;
	case 'TOGGLE_RUNNING':
		const shouldRun = !state.running;
		newState.running = shouldRun;
		
		if (shouldRun) {
			stateHistory = [];
			stateHistory.push(JSON.stringify(state.selection));
			newState.currentGeneration = state.currentGeneration+1;
			newState.exitReason = '';
						
	        animationFrame = requestAnimationFrame(fireNextFrameAction);
		} else {
			cancelAnimationFrame(animationFrame);
		}
		
		return newState;
	case 'NEXT_FRAME':		
		let stateChanged = false;
		
		for (let row = 0 ; row < state.rows ; row ++ ) {
			for (let col = 0 ; col < state.columns; col ++ ) {
				let count = countAdjacentCells(state, row, col);
				
				// console.log(count + " cells adjacent to " + row + ", " + col + " (currently " + this.state.selection[[row,col]] + ")");
				
				// Now see if we want to change the state.
				if (state.selection[[row,col]]) {
					// It is currently turned on - see whether it has the right number of lives to survive
					if (!state['survival' + count]) {
						newState.selection[[row,col]] = 0;
						stateChanged = true;
						// console.log("Cell died at " + row + ", " + col);
					} 
				} else {
					// Currently not on - see if one should be born here
					if (state['birth' + count]) {
						newState.selection[[row,col]] = 1;
						stateChanged = true;
						// console.log("Cell born at " + row + ", " + col);
					} 
				}
			}
		};
		
		if (stateChanged) {			
			// Now check whether we are just oscillating in a repeated loop. 
			// To do this, we will go back a defined number of generations and see if any of them match our current generation
			const newSelection = JSON.stringify(newState.selection);
			
			const oldSelections = stateHistory.slice(-HISTORY_CHECK_LENGTH);
			
			for (let thisSelection of oldSelections) {
				if (newSelection === thisSelection) {
					newState.running = false;
					newState.exitReason = 'Exited because of a loop after ' + state.currentGeneration + ' generations.'
					return newState;
				}
			}

			// No need to keep endless state history around
			stateHistory = oldSelections;
			stateHistory.push(newSelection);
			
			newState.currentGeneration = state.currentGeneration+1;
			
			let speed = 1000 / state.fps;
			setTimeout(() => {
				if (state.running) {
					animationFrame = requestAnimationFrame(fireNextFrameAction);
				}
			}, speed);
		} else {
			newState.running = false;
			newState.exitReason = 'Exited in stable state after ' + state.currentGeneration + ' generations.';
		}
		return newState;
	case 'CELL_CLICKED':
		newState.selection[[action.row,action.column]] = state.selection[[action.row,action.column]] ? 0: 1;
		newState.exitReason = '';
		newState.currentGeneration = 0;
		return newState;
	default:
		return state;
	}
}

function fireNextFrameAction() {
	store.dispatch(actionCreators.nextFrame());
}

function generateRandomCellStates(rows, columns) {
	let state = {};
	for (let row = 0 ; row < rows ; row ++ ) {
		for (let col = 0 ; col < columns; col ++ ) {
			state[[row,col]] = Math.round(Math.random());
		}
	};
	return state;	
}

function generateEmptyBoard(rows, columns) {
	let state = {};
	for (let row = 0 ; row < rows ; row ++ ) {
		for (let col = 0 ; col < columns; col ++ ) {
			state[[row,col]] = 0;
		}
	};
	return state;	
}

/**
 * Count the number of cells adjacent to the given location which are on. This checks up to 8 cells
 * but needs to respect edges too.
 */
function countAdjacentCells(state, row, col) {
	if (row < 0 || row > state.rows-1 || col < 0 || col > state.columns-1) {
		// TODO: Handle error nicely
		return 0;
	}
	let count = 0;
	// Previous row
	if (row - 1 >= 0) {
		count += (col - 1 < 0) ? 0 : state.selection[[row-1,col-1]];
		count += state.selection[[row-1,col]];
		count += (col + 1 >= state.columns) ? 0 : state.selection[[row-1,col+1]];
	}
	// Current row
	count += (col - 1 < 0) ? 0 : state.selection[[row,col-1]];
	count += (col + 1 >= state.columns) ? 0 : state.selection[[row,col+1]];
	// Next row
	if (row + 1 < state.rows) {
		count += (col - 1 < 0) ? 0 : state.selection[[row+1,col-1]];
		count += state.selection[[row+1,col]];
		count += (col + 1 >= state.columns) ? 0 : state.selection[[row+1,col+1]];
	}
	return count;
};


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
	running:false,
	selection: generateRandomCellStates(25,25),
	currentGeneration: 0,
	exitReason: ''
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

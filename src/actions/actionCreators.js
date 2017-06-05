export function setRowCount(count) {
	return {
		type: 'SET_ROWS',
		count
	}
}
export function setColumnCount(count) {
	return {
		type: 'SET_COLUMNS',
		count
	}
}

/**
 * Records the state of the flag for requiring that number of adjacent cells 
 * for a new cell to be born.
 */
export function setBirthFlag(number, flag) {
	return {
		type: 'SET_BIRTH_FLAG',
		number,
		flag
	}
}

/**
 * Records the state of the flag for requiring that number of adjacent cells 
 * for a cell to stay alive.
 */
export function setSurvivalFlag(number, flag) {
	return {
		type: 'SET_SURVIVAL_FLAG',
		number,
		flag
	}
}

/**
 * Sets the animation speed in frames per second.
 */
export function setFps(fps) {
	return {
		type: 'SET_FPS',
		fps
	}
}

/**
 * Initialize the board with randomly selected cells
 */
export function randomize() {
	return {
		type: 'RANDOMIZE'
	}
}

/**
 * Empty all the cells
 */
export function clearBoard() {
	return {
		type: 'CLEAR_BOARD'
	}
}

/**
 * Either start or stop the running of the simulation.
 */
export function toggleRunning() {
	return {
		type: 'TOGGLE_RUNNING'
	}
}

/**
 * Go to the next frame in the animation by sorting out which cells should be born and which should die.
 */
export function nextFrame() {
	return {
		type: 'NEXT_FRAME'
	}
}

/**
 * Called when the user clicks on a cell on the board to toggle it.
 */
export function handleCellClicked(row, column) {
	return {
		type: 'CELL_CLICKED',
		row,
		column
	}
}

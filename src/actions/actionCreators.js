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
export function setBirthFlag(number, flag) {
	return {
		type: 'SET_BIRTH_FLAG',
		number,
		flag
	}
}
export function setSurvivalFlag(number, flag) {
	return {
		type: 'SET_SURVIVAL_FLAG',
		number,
		flag
	}
}
export function setFps(fps) {
	return {
		type: 'SET_FPS',
		fps
	}
}
export function randomize() {
	return {
		type: 'RANDOMIZE'
	}
}
export function clearBoard() {
	return {
		type: 'CLEAR_BOARD'
	}
}
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

export function handleCellClicked(row, column) {
	return {
		type: 'CELL_CLICKED',
		row,
		column
	}
}

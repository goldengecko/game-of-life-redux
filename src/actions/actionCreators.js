export function setRowCount(count) {
	console.log(count);
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

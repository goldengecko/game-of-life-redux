import { generateRandomCellStates } from './business-logic'

// Set up the default state of the settings for the app
export const defaultState = {
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
  exitReason: '',
}

// action types

export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const FILTER_IDIOMS = "FILTER_IDIOMS";
export const UPDATE_CURRENT = "UPDATE_CURRENT";
export const UPDATE_IDIOM = "UPDATE_IDIOM";
export const SCRAMBLE_IDIOM = "SCRAMBLE_IDIOM";
export const UPDATE_DEFINITION = "UPDATE_DEFINITION";
export const UPDATE_SOLUTIONBOX = "UPDATE_SOLUTIONBOX";
export const CLEAR = "CLEAR";
export const ADD_LETTER = "ADD_LETTER";
export const REMOVE_LETTER = "REMOVE_LETTER";
export const INITIAL_BOX = "INITIAL_BOX";
export const ADD_POINT = "ADD_POINT";
export const REMOVE_POINT = "REMOVE_POINT";
export const START_GAME = "START_GAME";
export const GAME_OVER = "GAME_OVER";
export const RESET_CHOSEN_LETTERS = "RESET_CHOSEN_LETTERS";
export const TIME_UP = "TIME_UP";
export const HINT_SOLUTION = "HINT_SOLUTION";

// action creators

export const addCategories = (categories) => {
  return {
    type: ADD_CATEGORY,
    categories,
  };
};

export const removeCategories = (categories) => {
  return {
    type: REMOVE_CATEGORY,
    categories,
  };
};

export const filterIdioms = (filtered) => {
  return {
    type: FILTER_IDIOMS,
    filtered,
  };
};

export const saveCurrent = (newIdx) => {
  return {
    type: UPDATE_CURRENT,
    newIdx,
  };
};

export const saveIdiom = (newIdiom) => {
  return {
    type: UPDATE_IDIOM,
    newIdiom,
  };
};

export const saveDefinition = (newDef) => {
  return {
    type: UPDATE_DEFINITION,
    newDef,
  };
};

export const scrambleIdiom = (scrambledIdiom) => {
  return {
    type: SCRAMBLE_IDIOM,
    scrambledIdiom,
  };
};

export const makeSolutionBox = (newBox) => {
  return {
    type: UPDATE_SOLUTIONBOX,
    newBox,
  };
};

export const clear = (box) => {
  return {
    type: CLEAR,
    box,
  };
};

export const addToChosen = (letter) => {
  return {
    type: ADD_LETTER,
    letter,
  };
};

export const removeFromChosen = (letter) => {
  return {
    type: REMOVE_LETTER,
    letter,
  };
};

export const saveInitialBox = (box) => {
  return {
    type: INITIAL_BOX,
    box,
  };
};

export const addPoint = () => {
  return {
    type: ADD_POINT,
  };
};

export const removePoint = () => {
  return {
    type: REMOVE_POINT,
  };
};

export const endGame = () => {
  return {
    type: GAME_OVER,
  };
};

export const removeChosenLetters = () => {
  return {
    type: RESET_CHOSEN_LETTERS,
  };
};

export const startGame = () => {
  return {
    type: START_GAME,
  };
};

export const timeFinished = () => {
  return {
    type: TIME_UP,
  };
};

export const saveHintSolution = (solution) => {
  return {
    type: HINT_SOLUTION,
    solution,
  };
};

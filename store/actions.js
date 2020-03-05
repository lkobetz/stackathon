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
export const GAME_OVER = "GAME_OVER";

// action creators

export const addToCategories = categories => {
  return {
    type: ADD_CATEGORY,
    categories
  };
};

export const removeFromCategories = categories => {
  return {
    type: REMOVE_CATEGORY,
    categories
  };
};

export const idiomFilter = filtered => {
  return {
    type: FILTER_IDIOMS,
    filtered
  };
};

export const updateCurrentIdx = newIdx => {
  return {
    type: UPDATE_CURRENT,
    newIdx
  };
};

export const updateIdiom = newIdiom => {
  return {
    type: UPDATE_IDIOM,
    newIdiom
  };
};

export const updateDefinition = newDef => {
  return {
    type: UPDATE_DEFINITION,
    newDef
  };
};

export const scrambleThisIdiom = scrambledIdiom => {
  return {
    type: SCRAMBLE_IDIOM,
    scrambledIdiom
  };
};

export const updateSolutionBox = newBox => {
  return {
    type: UPDATE_SOLUTIONBOX,
    newBox
  };
};

export const clearBox = box => {
  return {
    type: CLEAR,
    box
  };
};

export const addLetterToChosen = letter => {
  return {
    type: ADD_LETTER,
    letter
  };
};

export const removeLetterFromChosen = letter => {
  return {
    type: REMOVE_LETTER,
    letter
  };
};

export const saveEmptyBox = box => {
  return {
    type: INITIAL_BOX,
    box
  };
};

export const incrementPoints = () => {
  return {
    type: ADD_POINT
  };
};

export const decrementPoints = () => {
  return {
    type: REMOVE_POINT
  };
};

export const gameOver = () => {
  return {
    type: GAME_OVER
  };
};

// thunks

export function addCategories(cats) {
  return async dispatch => {
    try {
      dispatch(addToCategories(cats));
    } catch (error) {
      next(error);
    }
  };
}

export function removeCategories(categories) {
  return async dispatch => {
    try {
      dispatch(removeFromCategories(categories));
    } catch (error) {
      next(error);
    }
  };
}

export function filterIdioms(filtered) {
  return async dispatch => {
    try {
      dispatch(idiomFilter(filtered));
    } catch (error) {
      next(error);
    }
  };
}

export function saveCurrent(idx) {
  return async dispatch => {
    try {
      dispatch(updateCurrentIdx(idx));
    } catch (error) {
      next(error);
    }
  };
}

export function saveIdiom(idiom) {
  return async dispatch => {
    try {
      dispatch(updateIdiom(idiom));
    } catch (error) {
      next(error);
    }
  };
}

export function saveDefinition(def) {
  return async dispatch => {
    try {
      dispatch(updateDefinition(def));
    } catch (error) {
      next(error);
    }
  };
}

export function scrambleIdiom(scrambled) {
  return async dispatch => {
    try {
      dispatch(scrambleThisIdiom(scrambled));
    } catch (error) {
      next(error);
    }
  };
}

export function makeSolutionBox(box) {
  return async dispatch => {
    try {
      dispatch(updateSolutionBox(box));
    } catch (error) {
      next(error);
    }
  };
}

export function clear(box) {
  return async dispatch => {
    try {
      dispatch(clearBox(box));
    } catch (error) {
      next(error);
    }
  };
}

export function addToChosen(letter) {
  return async dispatch => {
    try {
      dispatch(addLetterToChosen(letter));
    } catch (error) {
      next(error);
    }
  };
}

export function removeFromChosen(letter) {
  return async dispatch => {
    try {
      dispatch(removeLetterFromChosen(letter));
    } catch (error) {
      next(error);
    }
  };
}

export function saveInitialBox(box) {
  return async dispatch => {
    try {
      dispatch(saveEmptyBox(box));
    } catch (error) {
      next(error);
    }
  };
}

export function addPoint() {
  return async dispatch => {
    try {
      dispatch(incrementPoints());
    } catch (error) {
      next(error);
    }
  };
}

export function removePoint() {
  return async dispatch => {
    try {
      dispatch(decrementPoints());
    } catch (error) {
      next(error);
    }
  };
}

export function endGame() {
  return async dispatch => {
    try {
      dispatch(gameOver());
    } catch (error) {
      next(error);
    }
  };
}

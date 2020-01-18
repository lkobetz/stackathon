import idioms from "../data/data.json";

// action creators

export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const FILTER_IDIOMS = "FILTER_IDIOMS";
export const UPDATE_CURRENT = "UPDATE_CURRENT";
export const UPDATE_IDIOM = "UPDATE_IDIOM";
export const SCRAMBLE_IDIOM = "SCRAMBLE_IDIOM";
export const UPDATE_DEFINITION = "UPDATE_DEFINITION";
export const START_GAME = "START_GAME";

// action types

export const startGame = () => {
  return {
    type: START_GAME
  };
};

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

// thunks

export function start() {
  return async dispatch => {
    try {
      dispatch(startGame());
    } catch (error) {
      next(error);
    }
  };
}

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

let initialState = {
  started: false,
  chosenCategories: [],
  idioms: idioms,
  currentIdx: 0,
  solution: "",
  definition: "",
  scrambled: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return { ...state, start: !start };
    case ADD_CATEGORY:
      return {
        ...state,
        chosenCategories: [...state.chosenCategories, action.categories]
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        chosenCategories: [
          ...state.chosenCategories.filter(
            element => element !== action.categories
          )
        ]
      };
    case FILTER_IDIOMS:
      return { ...state, idioms: action.filtered };
    case UPDATE_CURRENT:
      return {
        ...state,
        currentIdx: action.newIdx
      };
    case UPDATE_IDIOM:
      return { ...state, solution: action.newIdiom };
    case UPDATE_DEFINITION:
      return { ...state, definition: action.newDef };
    case SCRAMBLE_IDIOM:
      return { ...state, scrambled: action.scrambledIdiom };
    default:
      return state;
  }
}

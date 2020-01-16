import idioms from "../data/data.json";

// action creators
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const FILTER_IDIOMS = "FILTER_IDIOMS";

// action types
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

let initialState = {
  chosenCategories: [],
  idioms: idioms
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

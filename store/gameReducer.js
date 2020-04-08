import idioms from "../data/data.json";
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  FILTER_IDIOMS,
  UPDATE_CURRENT,
  UPDATE_IDIOM,
  SCRAMBLE_IDIOM,
  UPDATE_DEFINITION,
  UPDATE_SOLUTIONBOX,
  CLEAR,
  ADD_LETTER,
  REMOVE_LETTER,
  INITIAL_BOX,
  ADD_POINT,
  REMOVE_POINT,
  GAME_OVER,
  RESET_CHOSEN_LETTERS,
} from "./actions";

let initialState = {
  chosenCategories: [],
  idioms: idioms,
  currentIdx: 0,
  solution: "",
  definition: "",
  scrambled: "",
  solutionBox: "",
  chosenLetters: [],
  initialBox: "",
  points: 0,
  correct: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        chosenCategories: [...state.chosenCategories, action.categories],
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        chosenCategories: [
          ...state.chosenCategories.filter(
            (element) => element !== action.categories
          ),
        ],
      };
    case FILTER_IDIOMS:
      return { ...state, idioms: action.filtered };
    case UPDATE_CURRENT:
      return {
        ...state,
        currentIdx: action.newIdx,
      };
    case UPDATE_IDIOM:
      return { ...state, solution: action.newIdiom };
    case UPDATE_DEFINITION:
      return { ...state, definition: action.newDef };
    case SCRAMBLE_IDIOM:
      return { ...state, scrambled: action.scrambledIdiom };
    case UPDATE_SOLUTIONBOX:
      return { ...state, solutionBox: action.newBox };
    case ADD_LETTER:
      return {
        ...state,
        chosenLetters: [...state.chosenLetters, action.letter],
      };
    case REMOVE_LETTER:
      return {
        ...state,
        chosenLetters: [
          ...state.chosenLetters.filter((element) => element !== action.letter),
        ],
      };
    case CLEAR:
      return {
        ...state,
        chosenLetters: [],
        solutionBox: action.box,
        correct: false,
      };
    case INITIAL_BOX:
      return {
        ...state,
        initialBox: action.box,
      };
    case ADD_POINT:
      return {
        ...state,
        points: state.points + 1,
        correct: true,
      };
    case REMOVE_POINT:
      return {
        ...state,
        points: state.points - 1,
      };
    case GAME_OVER:
      return {
        ...state,
        correct: false,
      };
    case RESET_CHOSEN_LETTERS:
      return {
        ...state,
        chosenLetters: [],
      };
    default:
      return state;
  }
}

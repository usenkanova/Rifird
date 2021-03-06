import { FETCH_PERKS } from "../constants/action-types";
import { FETCH_MERCHANT } from "../constants/action-types";

const initialState = {
  perks: [],
  merchant: {}
};

function rootReducer(state = initialState, action) {
  // console.log('action', action)
  if (action.type === FETCH_PERKS) {
    return {
      ...state,
      perks: action.payload.perks
    };
  } else if (action.type === FETCH_MERCHANT) {
    return {
      ...state,
      merchant: action.payload
    };
  }
  return state;
}

export default rootReducer;

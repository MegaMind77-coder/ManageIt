import {
  GET_ITEMS,
  REFRESH_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REFRESH_ITEMS:
      console.log(action.payload)
      if(action.payload.type==="add"){
        return {
          ...state,
          items: [action.payload.complains, ...state.items]
        };
      }
      else if(action.payload.type==="delete"){
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload.complainID)
      };
    }
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
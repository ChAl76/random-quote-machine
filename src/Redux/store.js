import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  quote: '',
  author: '',
  color: '#e74c3c',
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUOTE':
      return {
        ...state,
        quote: action.payload.quote,
        author: action.payload.author,
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: quoteReducer,
  preloadedState: initialState,
});

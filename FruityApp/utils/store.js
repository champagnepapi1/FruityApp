import { configureStore, createSelector } from '@reduxjs/toolkit';

// Action types
export const FETCH_FRUITS = 'FETCH_FRUITS';
export const FETCH_FRUITS_SUCCESS = 'FETCH_FRUITS_SUCCESS';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

// Selectors for fruits
const fruitsSelector = (state) => state.fruits;

export const getFruitsList = createSelector(
  [fruitsSelector],
  (fruits) => fruits.fruitsList
);

export const getLoadingState = createSelector(
  [fruitsSelector],
  (fruits) => fruits.loading
);

// Selectors for favorites
const favoriteSelector = (state) => state.favorite;

export const getFavoriteList = createSelector(
  [favoriteSelector],
  (favorite) => favorite.favoriteList
);

// Initial state
const fruitsInitialState = {
  fruitsList: [],
  loading: false,
};

const favoriteInitialState = {
  favoriteList: [],
};

// Reducer for the fruits list
const fruitsReducer = (state = fruitsInitialState, action) => {
  switch (action.type) {
    case FETCH_FRUITS:
      return { ...state, loading: true };
    case FETCH_FRUITS_SUCCESS:
      const newFruitsList = action.payload.map((fruit) => ({
        ...fruit, // Spread the properties of each fruit to create a new object
      }));
      return { ...state, fruitsList: newFruitsList, loading: false };
    default:
      return state;
  }
};

const favoriteReducer = (state = favoriteInitialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, favoriteList: [...state.favoriteList, action.payload] };
    case REMOVE_FROM_FAVORITES:
      const updatedFavorites = state.favoriteList.filter(fruit => fruit.id !== action.payload.id);
      return { ...state, favoriteList: updatedFavorites };
    default:
      return state;
  }
};

// Store configuration
const store = configureStore({
  reducer: {
    fruits: fruitsReducer,
    favorite: favoriteReducer
  },
});

export default store;

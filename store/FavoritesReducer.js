export default function FavReducer(state, action) {
  switch (action.type) {
    case "Add":
      return [action.payload, ...state]

    case "Remove":
      return state.filter(
        (movie) => movie.id !== action.payload
      );

    default:
      return state;
  }
};
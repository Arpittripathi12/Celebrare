export default function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const photoId = action.payload;
      const alreadyFavourite = state.includes(photoId);
      return alreadyFavourite
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];
    }
    case "LOAD_FAVOURITES":
      return Array.isArray(action.payload) ? action.payload : [];
    default:
      return state;
  }
}
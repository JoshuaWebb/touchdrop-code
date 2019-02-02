export default (state, action) => {
  return {
    ...state,
    menu: action.menu,
  };
};

const aspectRatio = (state = (4/5), action) => {
  switch(action.type) {
    case "changeAspectRatio":
      return action.payload;
    default:
      return state;
  }
};

export default aspectRatio;
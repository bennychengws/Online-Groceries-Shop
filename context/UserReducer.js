export const initialState = {};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }
  }
};

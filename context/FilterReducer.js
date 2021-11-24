export const initialState = {};

export const FilterReducer = (state, action) => {
  switch (action.type) {
    case "filter_stored": {
      return action.value;
    }
  }
};

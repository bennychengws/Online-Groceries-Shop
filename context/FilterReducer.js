export const initialState = {};

export const FilterReducer = (state, action) => {
  switch (action.type) {
    case "filter_stored": {
      return action.value;
    }
    // case "catCheckedState_stored": {
    //   return action.value;
    // }
    // case "brandCheckedState_stored": {
    //   return action.value;
    // }
  }
};

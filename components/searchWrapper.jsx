import React, { createContext, useContext, useReducer } from 'react';

const searchContext = createContext();
const initialState = {count: 0, message: ""};

const reducer = (state, action) => {
    switch(action.type) {
      case "increment":
        return {
          count: state.count + 1,
          message: action.message
        }
      case "decrement":
        return {
          count: state.count - 1,
          message: action.message
        }
        case "reset":
          return {
            count: 0,
            message: action.message
          }
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  
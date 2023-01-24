import { createContext, useReducer } from "react";

// Create the WorkoutsContext 
export const WorkoutsContext = createContext();

// Define the workoutsReducer to handle different actions
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      // Sets the workout data to the payload
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      // Adds a new workout to the array of workouts
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      // Filters out the workout to be deleted
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

// Create the WorkoutsContextProvider component
export const WorkoutsContextProvider = ({ children }) => {
  // Use the useReducer hook to manage the state
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  // Return the WorkoutsContext.Provider with the state and dispatch
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
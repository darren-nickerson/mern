import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

// Custom hook to access the WorkoutsContext
export const useWorkoutContext = () => {
  // Use the useContext hook to get the context
  const context = useContext(WorkoutsContext);

  // If context is not found, throw an error
  if (!context)
    throw new Error(
      "useWorkoutContext must be used within a WorkoutContextProvider"
    );

  // Return the context
  return context;
};
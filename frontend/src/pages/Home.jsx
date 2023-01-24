import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

// Home component that displays the workout form and the workout details
function Home() {
  // Use the useWorkoutContext hook to access the workouts and dispatch
  const { workouts, dispatch } = useWorkoutContext();

  // Use the useEffect hook to fetch workouts when the component mounts
  useEffect(() => {
    const fetchWorkouts = async () => {
      // Send a GET request to the server to fetch the workouts
      const response = await fetch("http://localhost:3000/api/workouts");
      const json = await response.json();

      // If the response is ok, dispatch an action to set the workouts
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="container">
      {/* Render the WorkoutForm component */}
      <WorkoutForm />

      {/* Render the WorkoutDetails component for each workout */}
      {workouts &&
        workouts.map((workout) => (
          <WorkoutDetails className="red" key={workout._id} workout={workout} />
        ))}
    </div>
  );
}

export default Home;

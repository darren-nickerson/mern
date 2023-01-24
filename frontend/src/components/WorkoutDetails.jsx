import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();
  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      console.log("Workout deleted");
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <div className="workout">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg) </strong>
          {workout.load}
        </p>

        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>{workout.createdAt}</p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="delete-button">
        <span onClick={handleClick}>delete</span>
      </div>
    </div>
  );
}

export default WorkoutDetails;

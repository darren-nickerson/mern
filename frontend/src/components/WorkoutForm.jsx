import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

// WorkoutForm component to add new workout
function WorkoutForm() {
  // Use the useWorkoutContext hook to access the dispatch function
  const { dispatch } = useWorkoutContext();
  
  // Use the useState hook to manage the form's state
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = {
      title,
      load,
      reps,
    };
    // Send a POST request to the server
    const response = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    // Handle the response from the server
    if (!response.ok) {
      // If the response is not ok, set the error and empty fields
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      console.log("Workout added");
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      // Dispatch an action to add the new workout to the state
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setEmptyFields([]);
    }
  };

  return (
    <div>
      <form className="action" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label htmlFor="">Exercise Title</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label htmlFor="">Load:</label>
        <input
          type="text"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label htmlFor="">Reps:</label>
        <input
          type="text"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button>Add Workout</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default WorkoutForm;
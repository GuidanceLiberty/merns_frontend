import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { RiDeleteBinLine } from '@remixicon/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const BASE_URL = process.env.REACT_APP_MAIN_URL || 'http://localhost:4000/api';

  const handleClick = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${BASE_URL}/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Delete failed:', errorText);
        return;
      }

      const json = await response.json();
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (error) {
      console.error('❌ Error deleting workout:', error.message);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick}>
        <RiDeleteBinLine size={24} color="red" />
      </span>
    </div>
  );
};

export default WorkoutDetails;

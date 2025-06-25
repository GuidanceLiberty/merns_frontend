// pages/Home.js
import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from '../hooks/useAuthContext';

// Components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const BASE_URL = process.env.REACT_APP_MAIN_URL || 'http://localhost:4000/api';

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/workouts`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const json = await response.json();
        dispatch({ type: 'SET_WORKOUTS', payload: json });

      } catch (err) {
        console.error('❌ Error fetching workouts:', err.message);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, BASE_URL, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

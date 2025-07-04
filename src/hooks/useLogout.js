import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: workoutsDispatch } = useWorkoutsContext()

  const logout = () => {
    // remove user from localStorage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
  }

  return { logout }
}

import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from '../reducers/application';

export default function useAppliationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // fetch data from server on load
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }});
    });
  }, []);

  // function to change selected day
  const setDay = day => dispatch({type: SET_DAY, value: day});

  // function to calculate remaining spots and create new days state
  function setDays(appointmentsObj) {
    const newDays = [];
    for (const day of state.days) {
      const spots = day.appointments.reduce((acc, appointmentId) => {
        let spot = (appointmentsObj[appointmentId].interview === null) ? 1 : 0;
        return acc + spot;
      }, 0);
      newDays.push({...day, spots});
    }
    
    return newDays;
  }


  // function to send book interview data to server
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        // Create local new days objects with new appointments objects
        const days = setDays(appointments);
        // Set new appointments and days states
        dispatch({type: SET_INTERVIEW, value: { days, appointments } });
      });
      
  }
  // function to send cancel interview data to server
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        const days = setDays(appointments);
        dispatch({type: SET_INTERVIEW, value: { days, appointments } });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
import { useEffect, useReducer } from 'react';
import axios from "axios";

export default function useAppliationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_DAYS = "SET_DAYS";

  function reducer(state, action) {
    const actions = {
      [SET_DAY]: {...state, day: action.value},
      [SET_APPLICATION_DATA]: action.value,
      [SET_INTERVIEW]: {...state, appointments: action.value},
      [SET_DAYS]: {...state, days: action.value}
    };

    if (action.type in actions) {
      return actions[action.type];
    }

    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );
    
  }

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
              }})})
  }, [])

  useEffect(() => setDays()
  ,[state.appointments])

  // function to change selected day
  const setDay = day => dispatch({type: SET_DAY, value: day});

  // change spots remaining upon change in state
  function setDays () {
    // console.log('updateDays - appointments',state.appointments);
    const newDays = [];
    for (const day of state.days) {
        const spots = day.appointments.reduce((acc, appointmentId) => {
        let spot = (state.appointments[appointmentId].interview === null) ? 1 : 0;
        return acc + spot;
      }, 0)
      newDays.push({...day, spots});
    }
    dispatch({type: SET_DAYS, value: newDays})
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
      .then((data) => dispatch({type: SET_INTERVIEW, value: appointments}))        
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
      .then((data) => dispatch({type: SET_INTERVIEW, value: appointments}))
  }

  return { state, setDay, bookInterview, cancelInterview };
}
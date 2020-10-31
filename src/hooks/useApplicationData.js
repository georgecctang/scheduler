import { useState, useEffect } from 'react';
import axios from "axios";

export default function useVisualMode() {

  // Initialize state (before fetch)
  const [state, setState] = useState({
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
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  },[])

  // function to change selected day
  const setDay = day => setState(prev => ({ ...prev, day }));

  // change spots remaining upon change in state
  
  function updateDays (appointments) {
    const newDays = [];    
    for (const day of state.days) {
      const spots = day.appointments.reduce((acc, appointmentId) => {
        let spot = (appointments[appointmentId].interview === null) ? 1 : 0;
        return acc + spot;
      }, 0)
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
        const days = updateDays(appointments);
        setState(prev => ({...prev, appointments, days}))
      })
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
        const days = updateDays(appointments);
        setState(prev => ({...prev, appointments, days}))
      }) 
  }

  return { state, setDay, bookInterview, cancelInterview };
}
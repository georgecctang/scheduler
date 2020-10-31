import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";
import "./Application.scss";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => setState({...state, appointments}))


  }

  function cancelInterview(id) {
    console.log('cancelInterview', id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log(appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments);
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => setState({...state, appointments}))
    // .catch(error => console.log(error))
  }


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  },[])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {dailyAppointments.map(appointment => {

          
          return (
            <Appointment 
                  key={appointment.id} 
                  id={appointment.id}
                  time={appointment.time}
                  interview={getInterview(state, appointment.interview)}
                  interviewers={getInterviewersForDay(state, state.day)}
                  bookInterview={bookInterview}
                  cancelInterview={cancelInterview}
             />
          )
        })}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
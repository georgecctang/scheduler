export function getAppointmentsForDay(state, day) {
  
  if (!state.days.find(dayItem => dayItem.name === day)) {
    return [];
  }
  
  const appointmentIds = state.days.find(dayItem => dayItem.name === day).appointments;
  const appointments = appointmentIds.map(id => state.appointments[id]);
  return appointments;
}

export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }
  return (
    {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  )
};

export function getAppointmentsForDay(state, day) {
  
  const dayObject = state.days.find(dayItem => dayItem.name === day);
  
  if (!dayObject) {
    return [];
  }

  const appointmentIds = dayObject.appointments;
  return appointmentIds.map(id => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  
  const dayObject = state.days.find(dayItem => dayItem.name === day);
  
  if (!dayObject) {
    return [];
  }

  const interviewerIds = dayObject.interviewers;
  return interviewerIds.map(id => state.interviewers[id]);
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

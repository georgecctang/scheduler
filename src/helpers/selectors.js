// function to create an array of appointments from the state for a specific day
// => [{id, time, interview}, ...]
export function getAppointmentsForDay(state, day) {
  
  const dayObject = state.days.find(dayItem => dayItem.name === day);
  
  if (!dayObject) {
    return [];
  }

  const appointmentIds = dayObject.appointments;
  return appointmentIds.map(id => state.appointments[id]);
}

// function to create an array of interviewers from the state for a specific day
// => [{id, name, avatar}, ... ]

export function getInterviewersForDay(state, day) {
  
  const dayObject = state.days.find(dayItem => dayItem.name === day);
  
  if (!dayObject) {
    return [];
  }

  const interviewerIds = dayObject.interviewers;
  return interviewerIds.map(id => state.interviewers[id]);
}

// Return  information for a specific interview
// input: interview = {student: <student name>, interviewer: <interviewer number> }
export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }
  return (
    {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  );
}

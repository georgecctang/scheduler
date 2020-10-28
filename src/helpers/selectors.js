export function getAppointmentsForDay(state, day) {
  
  if (!state.days.find(dayItem => dayItem.name === day)) {
    return [];
  }
  
  const appointmentIds = state.days.find(dayItem => dayItem.name === day).appointments;
  const appointments = appointmentIds.map(id => state.appointments[id]);
  return appointments;
}

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_DAYS = "SET_DAYS";

export default function reducer(state, action) {
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

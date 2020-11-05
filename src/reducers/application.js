
// reducer function to control state

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// SET_INTERVIEW updates both the appointments and days objects in state
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  const actions = {
    [SET_DAY]: {...state, day: action.value},
    [SET_APPLICATION_DATA]: action.value,
    [SET_INTERVIEW]: {...state, ...action.value},
  };

  if (action.type in actions) {
    return actions[action.type];
  }

  throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
}

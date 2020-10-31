const dayList = [
  {
  "id": 1,
  "name": "Monday",
  "appointments": [
  1,
  2,
  3,
  4,
  5
  ],
  "interviewers": [
  1,
  2,
  4,
  7,
  10
  ],
  "spots": 0
  },
  {
  "id": 2,
  "name": "Tuesday",
  "appointments": [
  6,
  7,
  8,
  9,
  10
  ],
  "interviewers": [
  1,
  4,
  5,
  8,
  9
  ],
  "spots": 0
  }
];

const appointments = {
  "1": {
  "id": 1,
  "time": "12pm",
  "interview": {
  "student": "Amy",
  "interviewer": 10
  }
  },
  "2": {
  "id": 2,
  "time": "1pm",
  "interview": {
  "student": "John",
  "interviewer": 2
  }
  },
  "3": {
  "id": 3,
  "time": "2pm",
  "interview": null
  },
  "4": {
  "id": 4,
  "time": "3pm",
  "interview": {
  "student": "Archie Cohen",
  "interviewer": 2
  }
  },
  "5": {
  "id": 5,
  "time": "4pm",
  "interview": null
  },
  "6": {
  "id": 6,
  "time": "12pm",
  "interview": {
  "student": "Chad Takahashi",
  "interviewer": 1
  }
  },
  "7": {
  "id": 7,
  "time": "1pm",
  "interview": null
  },
  "8": {
  "id": 8,
  "time": "2pm",
  "interview": null
  },
  "9": {
  "id": 9,
  "time": "3pm",
  "interview": {
  "student": "Jamal Jordan",
  "interviewer": 1
  }
  },
  "10": {
  "id": 10,
  "time": "4pm",
  "interview": null
  }
}

let updatedDayList = [];

// for (const day of dayList) {
//   let spots = 0;
//   for (let appointmentId of day.appointments) {
//     if (appointments[appointmentId].interview === null) {
//       spots++;
//     }
//   }
//   updatedDayList.push({...day, spots})
// }

for (const day of dayList) {
  const spots = day.appointments.reduce((acc, appointmentId) => {
    let spot = (appointments[appointmentId].interview === null) ? 1 : 0;
    return acc + spot;
  },0)
  updatedDayList.push({...day, spots});
}


console.log(updatedDayList);

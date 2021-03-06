export const getAppointmentsForDay = (state, targetDay) => {
  const { days, appointments } = state;

  let targetAppointments = [];

  for (const day of days) {
    if (day.name === targetDay) {
      targetAppointments = [
        ...day.appointments.map((id) => {
          return appointments[id];
        }),
      ];
    }
  }

  return targetAppointments;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
};

export const getInterviewersForDay = (state, targetDay) => {
  const { days, interviewers } = state;

  let targetInterviewers = [];

  for (const day of days) {
    if (day.name === targetDay) {
      targetInterviewers = day.interviewers.map((id) => {
        return interviewers[id];
      });
    }
  }

  return targetInterviewers;
};

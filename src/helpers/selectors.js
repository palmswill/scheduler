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
    interviewer:
      state.interviewers[interview.interviewer]
  };
};

export const getInterviewersForDay = (state, targetDay) => {
  const { days,  interviewers,appointments } = state;

  let  targetInterviewers = [];

  for (const day of days) {
    if (day.name === targetDay) {
      targetInterviewers = [
        ...day.appointments.map((id) => {
          const appointment = appointments[id];
          if (appointment.interview){
            return interviewers[appointment.interview.interviewer];
          }
          else{
            return null;
          }

        }),
      ];
    }
  }

  targetInterviewers = targetInterviewers.filter ((value)=>value !== null);


  return  targetInterviewers;
};

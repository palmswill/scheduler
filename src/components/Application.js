import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: [],
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview, setLoadingStatus, ERROR, SHOW) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        if (res.status === 204) {
          setState({
            ...state,
            appointments,
          });
          setLoadingStatus(SHOW);
        } else {
          setLoadingStatus(ERROR);
        }
      })
      .catch(() => {
        setLoadingStatus(ERROR);
      });
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    return interview;
  }

  function deleteInterview(id, setLoadingStatus, ERROR, EMPTY) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        if (res.status === 204) {
          setState({
            ...state,
            appointments,
          });
          setLoadingStatus(EMPTY);
        } else {
          console.log(res);
          setLoadingStatus(ERROR,true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatus(ERROR,true);
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((results) => {
      setState((preState) => {
        return {
          ...preState,
          days: results[0].data,
          appointments: results[1].data,
          interviewers: results[2].data,
        };
      });
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const { id, time, interview } = appointment;
    const interviewers = getInterviewersForDay(state, state.day);
    const dInterview = getInterview(state, interview);
    return (
      <Appointment
        key={id}
        {...{ id, time, save, bookInterview, deleteInterview, interviewers }}
        interview={dInterview}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{schedule}</section>
    </main>
  );
}

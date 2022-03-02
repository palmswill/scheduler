import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
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
          // find the target day when appointment is added
          const targetDay = state.days.filter(
            (day) => day.name === state.day
          )[0];

          setState({
            ...state,
            days: [
              ...state.days.filter((day) => day.name !== state.day),
              // delete one spot when appointment is added

              { ...targetDay, spots: targetDay.spots - 1 },
              // sort in id
            ].sort((a, b) => a.id - b.id),
            // input the updated appointments list
            appointments,
          });
          // if sucessful, load show
          setLoadingStatus(SHOW);
        } else {
          // if failed, load error
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
      // set up a new interview
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      // update the appointment according to id
      [id]: appointment,
    };

    axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then((res) => {
        if (res.status === 204) {
          //  find the targetday that appointment got deleted
          const targetDay = state.days.filter(
            (day) => day.name === state.day
          )[0];

          setState({
            ...state,
            days: [
              ...state.days.filter((day) => day.name !== state.day),
              // add one spots to the targeted day
              { ...targetDay, spots: targetDay.spots + 1 },
              // sort in id
            ].sort((a, b) => a.id - b.id),
            // update the appointment list 
            appointments,
          });
          // if sucessful, load empty 
          setLoadingStatus(EMPTY);
        } else {
          console.log(res);
          // if failed, load error message
          setLoadingStatus(ERROR, true);
        }
      })
      .catch((err) => {
        console.log(err);

        setLoadingStatus(ERROR, true);
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

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
    save,
  };
}

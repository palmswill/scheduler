import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

const Appointment = ({ time, interview, interviewers = [] }) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={() => {
            transition(SHOW);
          }}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer}
          onSave={() => {
            transition(SHOW);
          }}
          onCancel={back}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => {
            transition(EMPTY);
          }}
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>
  );
};

export default Appointment;

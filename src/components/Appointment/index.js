import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = ({
  id,
  save,
  time,
  interview,
  bookInterview,
  deleteInterview,
  interviewers = [],
}) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const ERROR = "ERROR";
  const CONFIRM = "CONFIRM";
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
          onSave={(name, interviewer) => {
            transition(SAVE);
            bookInterview(id, save(name, interviewer), transition, ERROR, SHOW);
          }}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onSave={(name, interviewer) => {
            transition(SAVE);
            bookInterview(id, save(name, interviewer), transition, ERROR, SHOW);
          }}
          onCancel={back}
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete this?"}
          onConfirm={() => {
            transition(DELETE,true);
            deleteInterview(id, transition, ERROR, EMPTY);
          }}
          onCancel={back}
        />
      )}
      {mode === SAVE && <Status message="SAVING" />}
      {mode === DELETE && <Status message="DELETING" />}
      {mode === ERROR && <Error onClose={back}/>}
    </article>
  );
};

export default Appointment;

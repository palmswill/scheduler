import React from "react";
import "../styles/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const Interviewerlist = ({ interviewers, value, onChange }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map((interviewer) => {
          const { id, name, avatar } = interviewer;

          return (
            <InterviewerListItem
              key={id}
              name={name}
              avatar={avatar}
              selected={id === Number(value)}
              setInterviewer={() => onChange(id)}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Interviewerlist;

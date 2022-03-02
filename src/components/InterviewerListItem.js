import React from "react";
import "../styles/InterviewerListItem.scss";
import classNames from "classnames";

const Interviewerlistitem = ({
  avatar,
  name,
  setInterviewer,
  selected,
}) => {
  const itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li  className={itemClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default Interviewerlistitem;

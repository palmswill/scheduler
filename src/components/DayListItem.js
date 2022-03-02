import React from "react";
import "../styles/DayListItem.scss";
import classNames from "classnames";

const Daylistitem = (props) => {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = (spots) => {
    return `${spots ? spots : "no"} spot${
      spots > 1 || spots === 0 ? "s" : ""
    } remaining`;
  };

  return (
    <li
      className={dayClass}
      onClick={()=>props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
};

export default Daylistitem;

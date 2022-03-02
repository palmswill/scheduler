import React from "react";
import Daylistitem from "./DayListItem";

const Daylist = (props) => {
  const { days, value, onChange } = props;
  return (
    <ul>
      {days &&
        days.map((dayItem) => {
          const { id, name, spots } = dayItem;
          return (
            <Daylistitem
              key={id}
              name={name}
              spots={spots}
              selected={name === value}
              setDay={onChange}
            />
          );
        })}
    </ul>
  );
};

export default Daylist;

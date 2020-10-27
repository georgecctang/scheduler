import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer} = props;

  const liClass = classNames("interviewers__item", 
  {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={liClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
  </li>
  )
} 


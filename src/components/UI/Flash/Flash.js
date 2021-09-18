import React from 'react';

import classes from './Flash.module.css';


const Flash = props => {

  let flashClass = classes.Warning;

  switch (props.type) {
    case "alert":
      flashClass = classes.Alert;
      break;
    case "warning":
      flashClass = classes.Warning;
      break;
    case "success":
      flashClass = classes.Success;
      break;
    default:
      flashClass = classes.Warning;
  }

  return (
    <div className={flashClass}>
      <p className={classes.messages}>{props.messages}</p>
      <p className={classes.closeButton} onClick={props.close}>X</p>
    </div>
  )
}

export default Flash;
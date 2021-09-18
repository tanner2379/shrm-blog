import React, { useState, useContext } from 'react';
import axios from '../../axios-orders';

import { inputChangedHandler } from '../../shared/utility';
import { UserContext } from '../../contexts/UserContext';
import { FlashContext } from '../../contexts/FlashContext';

import classes from './Registration.module.css';


const Registration = props => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const setFlash = useContext(FlashContext)[1];

  const [formValue, setFormValue] = useState({
    username: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    password: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
    password_confirmation: {
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false,
    },
  })

  const setFormIsValid = useState(false)[1];

  const handleChange = event => {
    const [valueOut, validOut] = inputChangedHandler(event, formValue);

    setFormValue(valueOut);
    setFormIsValid(validOut);
  }

  const handleLogin = event => {
    axios.post('/sessions', {
      user: {
        username: formValue.username.value,
        password: formValue.password.value,
      }
    })
    .then(response => {
      if (response.data.logged_in) {
        setUserInfo({...userInfo, loggedIn: 'LOGGED_IN', user: response.data.user});
        setFlash({ messages: ['Login Successful'], visible: true, type: 'success' });
        props.history.push('/');
      } else {
        setFlash({ messages: response.data.errors, visible: true, type: 'alert' })
      }
    }).catch(error => {
      console.log("login error", error);
    });
    
    event.preventDefault();
  }



  return (
    <div className={classes.registration}>
      <p className={classes.title}>Log In</p>
      <div className = {classes.formWrapper} >
        <form onSubmit={handleLogin} className={classes.logForm}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => handleChange(event)}
            required 
            className={classes.logInput} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => handleChange(event)}
            required 
            className={classes.logInput} />
          <button type="submit" className={[classes.authButton, classes.logButton].join(' ')}>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
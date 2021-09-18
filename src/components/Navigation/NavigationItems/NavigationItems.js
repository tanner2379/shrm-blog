import React, { useContext } from 'react';
import axios from '../../../axios-orders';

import { UserContext } from '../../../contexts/UserContext';

import NavigationItem from './NavigationItem/NavigationItem';
import SearchBar from '../../Forms/SearchBar/SearchBar';

import classes from './NavigationItems.module.css';

const NavigationItems = props => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  const handleLogout = () => {
    axios.delete(`/logout`, {
    })
    .then(response => {
      if (response.data.logged_out) {
        setUserInfo({...userInfo, loggedIn: 'NOT_LOGGED_IN', user: {}});
        props.history.push('/');
      } else {
        console.log("Logout Error")
      }
    }).catch(error => {
      console.log("Logout Error", error);
    });   
  }

  let profileLink = (
    <NavigationItem link={'/sign_in'}>
      Log In
    </NavigationItem>
  )

  if (userInfo.loggedIn === "LOGGED_IN") {
    profileLink = (
      <div className={classes.Logout} onClick={handleLogout}>Log Out</div>
    )
  }

  return (
    <div className={classes.NavigationWrapper}>
      <ul className={classes.NavigationItems} >
        <NavigationItem link={'/'} exact>
          Home
        </NavigationItem>
        <NavigationItem link={'/posts'}>
          Posts
        </NavigationItem>
        <NavigationItem link={'/about'}>
          About
        </NavigationItem>
        <NavigationItem link={'/contact'}>
          Contact
        </NavigationItem>
        {profileLink}
        <SearchBar className={classes.Search} history={props.history} />
      </ul>
    </div>
  );
};

export default NavigationItems;
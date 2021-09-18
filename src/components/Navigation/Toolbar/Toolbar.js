import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import navBar from '../../../assets/images/cloud-background.png'

import classes from './Toolbar.module.css';

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle {...props} clicked={props.drawerToggleClicked} />
      <img src={navBar} alt="navImage" className={classes.navBackground} />
      <nav className={classes.DesktopOnly}>
        <NavigationItems {...props} />
      </nav>
    </header>
  );
};

export default Toolbar;
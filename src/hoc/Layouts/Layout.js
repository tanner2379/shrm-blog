import React, { useState, useContext } from 'react';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Flash from '../../components/UI/Flash/Flash';

import { FlashContext }  from '../../contexts/FlashContext'

import classes from './Layout.module.css'

const Layout = props => {
  const [flash, setFlash] = useContext(FlashContext);
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisible(!sideDrawerVisible);
  }

  const closeFlash = () => {
    setFlash({messages: [], visible: false, type: null})
  }

  return (
    <Aux>
      <Toolbar {...props} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer {...props} open={sideDrawerVisible} closed={sideDrawerClosedHandler} />
        {flash.visible
          ? <Flash close={closeFlash} messages={flash.messages} type={flash.type} />
          : null
        }
        <div className={classes.Content}>
          {props.children}
        </div>
      
      {/* <div className={classes.Footer}>
        <Footer />
      </div> */}
    </Aux>
  );
};

export default Layout;
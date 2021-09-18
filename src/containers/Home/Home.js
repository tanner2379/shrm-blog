import React from 'react';

import classes from './Home.module.css';

const Home = props => {
  return (
    <div className={classes.home}>
      <p className={classes.title}>
        Soaring High Renewal Ministries
      </p>
      <div className={classes.textBox}>
        <p className={classes.text}>
          Are you ready for inspiration and insight from Biblical truth, Scriptural information and teaching to enhance your journey in Christian faith and life?  Then, welcome to this site to be challenged and encouraged!
        </p>
      </div>
    </div>
  )
}

export default Home;
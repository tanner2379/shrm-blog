import React from 'react';

import classes from './About.module.css';
import ken_picture2 from '../../assets/images/ken_picture2.jpg'
import { statementOfFaithP1, statementOfFaithP2, statementOfFaithP3 } from './aboutText'

const About = props => {
  return (
    <div className={classes.about}>
      <div className={classes.infoWrapper}>
        <img src={ken_picture2} alt="profile_picture" className={classes.kenPicture}/>
      
        <div className={classes.textBox}>
          <p className={classes.text}>
            {statementOfFaithP1}
          </p>
        <p className={classes.text}>
          {statementOfFaithP2}
        </p>
        <p className={classes.text}>
          {statementOfFaithP3}
        </p>
        </div>
      </div>
    </div>
  )
}

export default About;
import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({
  experience: { company, title, location, from, to, current, description },
}) => {
  return (
    <div>
      <h3 class='text-dark'>{company}</h3>
      <p>
        <Moment format='DD/MM/YYYY'>{from}</Moment> -
        {current ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileExperience;

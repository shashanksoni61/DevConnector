import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience }) => {
  const dispatch = useDispatch();

  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  const noExperience = (
    <div className='my-2'>You have not updated your Experience Details</div>
  );
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        {/* <tbody>{experiences}</tbody> */}
        <tbody>{experiences.length > 0 ? experiences : noExperience}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;

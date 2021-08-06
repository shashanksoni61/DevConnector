import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education }) => {
  const dispatch = useDispatch();
  const educationList = education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducation(edu._id))}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  const noEducation = (
    <div className='my-2'>You have not updated your Education Details</div>
  );

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School/Bootcamp</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educationList.length > 0 ? educationList : noEducation}</tbody>
      </table>
    </Fragment>
  );
};

export default Education;

import React, { Fragment, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEducation, experimentAction } from '../../actions/profile';

const AddEducation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const formInput = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = e => {
    e.preventDefault();
    console.log('this data coming from add Experience');
    console.log(formData);
    dispatch(addEducation(formData, history));
    dispatch(experimentAction());
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={formSubmit}>
        <div className='form-group'>
          <input
            type='text'
            onChange={formInput}
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            onChange={formInput}
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            onChange={formInput}
            placeholder='Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input type='date' value={from} onChange={formInput} name='from' />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              value={current}
              checked={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
              name='current'
            />{' '}
            Currently Studying
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            value={to}
            onChange={formInput}
            name='to'
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            onChange={formInput}
            value={description}
            cols='30'
            rows='5'
            placeholder='Course/Program Description'
          ></textarea>
        </div>
        <input
          type='submit'
          className='btn btn-primary my-1'
          value='Add Education'
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AddEducation;

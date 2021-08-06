import React, { Fragment, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;

  const formInput = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = e => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
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
            placeholder='* Job Title'
            value={title}
            name='title'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            onChange={formInput}
            placeholder='* Company'
            value={company}
            name='company'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            onChange={formInput}
            placeholder='Location'
            value={location}
            name='location'
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
            Current Job
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
            placeholder='Job Description'
          ></textarea>
        </div>
        <input
          type='submit'
          className='btn btn-primary my-1'
          value='Add Experience'
        />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

export default AddExperience;

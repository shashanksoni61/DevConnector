import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const formInput = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('passwords do not match', 'danger'));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={formSubmit}>
        <div className='form-group'>
          <input
            type='text'
            value={name}
            onChange={e => formInput(e)}
            placeholder='Name'
            name='name'
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            onChange={e => formInput(e)}
            placeholder='Email Address'
            name='email'
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            onChange={e => formInput(e)}
            placeholder='Password'
            name='password'
            // minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password2}
            onChange={e => formInput(e)}
            placeholder='Confirm Password'
            name='password2'
            // minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;

/*
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { useSelector,useDispatch } from 'react-redux';

const Register = ({ setAlert, register, isAuthenticated }) => {
  c
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const formInput = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={formSubmit}>
        <div className='form-group'>
          <input
            type='text'
            value={name}
            onChange={e => formInput(e)}
            placeholder='Name'
            name='name'
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            onChange={e => formInput(e)}
            placeholder='Email Address'
            name='email'
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            onChange={e => formInput(e)}
            placeholder='Password'
            name='password'
            // minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password2}
            onChange={e => formInput(e)}
            placeholder='Confirm Password'
            name='password2'
            // minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(null, { setAlert, register })(Register);

*/

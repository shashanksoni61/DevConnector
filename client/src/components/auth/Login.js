import { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const formInput = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const formSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Redirecting if autheticated/ logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into Your Account
      </p>
      <form className='form' onSubmit={formSubmit}>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            onChange={e => formInput(e)}
            placeholder='Email Address'
            name='email'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            onChange={e => formInput(e)}
            placeholder='Password'
            name='password'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

// Login.propTypes = {
//   login: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { login })(Login);

export default Login;

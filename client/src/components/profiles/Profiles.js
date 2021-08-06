import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../actions/profile';
import { useSelector, useDispatch } from 'react-redux';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(state => state.profile);
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i>Browse and connect with
        Developers
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles found</h4>
        )}
      </div>
    </Fragment>
  );
};

export default Profiles;

import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileById } from '../../actions/profile';

const Profile = ({ match }) => {
  const { profile } = useSelector(state => state.profile);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch, match]);

  if (!profile) return <Spinner />;

  return (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {isAuthenticated && user._id === profile.user._id && (
        <Link to='/edit-profile' className='btn btn-primary'>
          Edit Profile
        </Link>
      )}

      <div className='profile-grid my-1'>
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <div class='profile-exp bg-white p-2'>
          <h2 class='text-primary'>Experience</h2>
          {profile.experience.length > 0 ? (
            <Fragment>
              {profile.experience.map(experience => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))}
            </Fragment>
          ) : (
            <h4>No Experience Credentials Found</h4>
          )}
        </div>
        <div class='profile-edu bg-white p-2'>
          <h2 class='text-primary'>Education</h2>
          {profile.education.length > 0 ? (
            <Fragment>
              {profile.education.map(education => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </Fragment>
          ) : (
            <h4>No Education Credentials Found</h4>
          )}
        </div>
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </Fragment>
  );
};

export default Profile;

// learning -----------
// there are many ways to get url params in react component
// 1. using useParams() hook from react-router-dom
// 2. use props.match.params property which is available to every component
// you can destructure is {match : {params}}

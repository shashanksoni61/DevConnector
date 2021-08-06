import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';
import { useSelector, useDispatch } from 'react-redux';

const ProfileGithub = ({ username }) => {
  const { repos } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [dispatch, username]);

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-2'>Github Repos</h2>
      {repos !== null ? (
        repos.map(repo => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.desciption}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Starts: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProfileGithub;

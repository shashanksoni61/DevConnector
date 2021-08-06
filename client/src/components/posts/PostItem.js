import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  showAction,
}) => {
  const { isAuthenticated, user: loggedUser } = useSelector(
    state => state.auth
  );
  const dispatch = useDispatch();
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
        </p>
        {showAction && (
          <Fragment>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => dispatch(addLike(_id))}
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              <span>{likes.length > 0 && likes.length}</span>
            </button>
            <button
              type='button'
              className='btn btn-light'
              onClick={() => dispatch(removeLike(_id))}
            >
              <i className='fas fa-thumbs-down'></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {isAuthenticated && user === loggedUser._id && (
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => dispatch(deletePost(_id))}
              >
                <i className='fas fa-times'></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true,
};

export default PostItem;

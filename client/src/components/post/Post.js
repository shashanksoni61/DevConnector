import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector(state => state.post);
  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [dispatch, match]);

  if (loading || post == null) return <Spinner />;
  return (
    <Fragment>
      <Link to='/posts' className='btn'>
        {' '}
        Back To Posts
      </Link>
      <PostItem post={post} showAction={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default Post;

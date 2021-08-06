import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  return (
    <div class='post-form'>
      <div class='bg-primary p'>
        <h3>What's on your mind...</h3>
      </div>
      <form
        class='form my-1'
        onSubmit={e => {
          e.preventDefault();
          dispatch(addPost({ text }));
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <input type='submit' class='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default PostForm;

import React from 'react';

import PostForm from '../../../components/Forms/Post/Post';

const New = props => {
  return (
    <PostForm title="Create a new Post" destination="" history={props.history} />
  )
}

export default New;
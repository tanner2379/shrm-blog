import React from 'react';

import PostForm from '../../../components/Forms/Post/Post';

const Edit = props => {
  return (
    <PostForm title="Edit Post" destination={props.destination} history={props.history}/>
  )
}

export default Edit;